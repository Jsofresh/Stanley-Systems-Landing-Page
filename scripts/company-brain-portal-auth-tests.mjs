import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync, mkdtempSync, readdirSync, rmSync, statSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import {
  hashPortalPassword,
  portalCredentialsFromEnv,
  verifyPortalPassword,
} from "../lib/portal/auth-credentials.ts"
import {
  clientAddressFromHeaders,
  createPortalSessionCore,
  unauthenticatedPortalSessionPayload,
} from "../lib/portal/session-core.ts"
import {
  checkPortalLoginRateLimit,
  clearPortalAccountRateLimit,
  portalRateLimitStoreStats,
} from "../lib/portal/rate-limit-store.ts"
import {
  activatePortalSessionFile,
  isPortalSessionFileActive,
  revokePortalSessionFile,
} from "../lib/portal/session-store.ts"
import {
  decodePortalSessionToken,
  encodePortalSessionToken,
} from "../lib/portal/session-token.ts"

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")

const user = {
  actorId: "sarah-owner",
  name: "Sarah Owner",
  email: "sarah.owner@bayview.test",
  role: "owner",
  roleLabel: "Owner",
  companyId: "bayview_test",
  companyName: "Bayview Service Co.",
  sessionPrefix: "sarah",
}

test("scrypt credentials verify without storing plaintext", () => {
  const credential = hashPortalPassword("correct horse battery staple", Buffer.alloc(16, 7))
  assert.match(credential, /^scrypt\$v1\$/)
  assert.equal(credential.includes("correct horse battery staple"), false)
  assert.equal(verifyPortalPassword("correct horse battery staple", credential), true)
  assert.equal(verifyPortalPassword("wrong password", credential), false)
})

test("credential configuration fails closed when missing or malformed", () => {
  assert.deepEqual(portalCredentialsFromEnv({}), {})
  assert.deepEqual(portalCredentialsFromEnv({ PORTAL_AUTH_CREDENTIALS_JSON: "not-json" }), {})
  assert.deepEqual(portalCredentialsFromEnv({ PORTAL_AUTH_CREDENTIALS_JSON: JSON.stringify({ "OWNER@EXAMPLE.COM": "plaintext" }) }), {})
  const valid = hashPortalPassword("secret", Buffer.alloc(16, 3))
  assert.deepEqual(portalCredentialsFromEnv({ PORTAL_AUTH_CREDENTIALS_JSON: JSON.stringify({ " OWNER@EXAMPLE.COM ": valid }) }), {
    "owner@example.com": valid,
  })
})

test("same actor receives a cryptographically distinct login session each time", () => {
  const first = createPortalSessionCore(user, new Date("2026-07-09T20:00:00Z"))
  const second = createPortalSessionCore(user, new Date("2026-07-09T20:00:00Z"))
  assert.notEqual(first.sessionKey, second.sessionKey)
  assert.match(first.sessionKey, /^ui:bayview_test:sarah:/)
  assert.equal(first.actorId, user.actorId)
  assert.equal(first.companyId, user.companyId)
})

test("file-backed session registry persists activation without storing raw session keys", () => {
  const storeDir = mkdtempSync(resolve(tmpdir(), "portal-session-test-"))
  try {
    const session = createPortalSessionCore(user, new Date("2026-07-09T20:00:00Z"))
    const issuedAt = Date.parse(session.issuedAt)
    activatePortalSessionFile(storeDir, session.sessionKey, issuedAt, 12 * 60 * 60 * 1000)
    assert.equal(isPortalSessionFileActive(storeDir, session.sessionKey, issuedAt + 1_000), true)
    const files = readdirSync(storeDir)
    assert.equal(files.length, 1)
    assert.equal(files[0].includes(session.sessionKey), false)
    assert.equal(statSync(resolve(storeDir, files[0])).mode & 0o777, 0o600)
    revokePortalSessionFile(storeDir, session.sessionKey)
    assert.equal(isPortalSessionFileActive(storeDir, session.sessionKey, issuedAt + 2_000), false)
  } finally {
    rmSync(storeDir, { recursive: true, force: true })
  }
})

test("signed session token can be decoded for authoritative revocation without consulting the active store", () => {
  const session = { ...createPortalSessionCore(user, new Date("2026-07-09T20:00:00Z")), role: user.role }
  const secret = "s".repeat(64)
  const token = encodePortalSessionToken(session, secret)
  const decoded = decodePortalSessionToken(token, secret, Date.parse("2026-07-09T20:10:00Z"), 12 * 60 * 60 * 1000)
  assert.equal(decoded?.sessionKey, session.sessionKey)
  assert.equal(decodePortalSessionToken(`${token}tampered`, secret, Date.parse("2026-07-09T20:10:00Z"), 12 * 60 * 60 * 1000), null)
  assert.equal(decodePortalSessionToken(token, secret, Date.parse("2026-07-10T09:00:01Z"), 12 * 60 * 60 * 1000), null)
})

test("unauthenticated session payload contains no roster or tenant hints", () => {
  assert.deepEqual(unauthenticatedPortalSessionPayload(), { authenticated: false })
})

test("client address is accepted only when the trusted proxy invariant is enabled", () => {
  const values = new Map([
    ["x-real-ip", "198.51.100.22"],
    ["x-forwarded-for", "203.0.113.9, 198.51.100.22"],
  ])
  const headers = { get: (name) => values.get(name) ?? null }
  assert.equal(clientAddressFromHeaders(headers, false), "untrusted-proxy")
  assert.equal(clientAddressFromHeaders(headers, true), "198.51.100.22")
})

test("shared file-backed limiter blocks account, IP, and global bursts with bounded bucket cardinality", () => {
  const storeDir = mkdtempSync(resolve(tmpdir(), "portal-rate-limit-test-"))
  try {
    const options = { storeDir, email: " OWNER@EXAMPLE.COM ", clientAddress: "203.0.113.8", now: 1_000, accountMaxAttempts: 3, ipMaxAttempts: 20, globalMaxAttempts: 100, windowMs: 60_000 }
    assert.equal(checkPortalLoginRateLimit(options).allowed, true)
    assert.equal(checkPortalLoginRateLimit({ ...options, now: 2_000 }).allowed, true)
    assert.equal(checkPortalLoginRateLimit({ ...options, now: 3_000 }).allowed, true)
    const blocked = checkPortalLoginRateLimit({ ...options, now: 4_000 })
    assert.equal(blocked.allowed, false)
    assert.equal(blocked.scope, "account")
    assert.ok(blocked.retryAfterSeconds > 0)
    clearPortalAccountRateLimit(storeDir, options.email)
    assert.equal(checkPortalLoginRateLimit({ ...options, now: 5_000 }).allowed, true)

    for (let index = 0; index < 150; index += 1) {
      checkPortalLoginRateLimit({
        ...options,
        email: `flood-${index}@example.com`,
        clientAddress: `198.51.100.${index % 50}`,
        now: 6_000 + index,
        accountMaxAttempts: 10,
        ipMaxAttempts: 10,
        globalMaxAttempts: 100,
        maxBucketKeys: 128,
      })
    }
    const stats = portalRateLimitStoreStats(storeDir)
    assert.ok(stats.bucketKeys <= 128)
  } finally {
    rmSync(storeDir, { recursive: true, force: true })
  }
})

test("portal integration removes fallback credentials and unauthenticated roster", () => {
  const sessionSource = readFileSync(resolve(repoRoot, "lib/portal/session.ts"), "utf8")
  const sessionRoute = readFileSync(resolve(repoRoot, "app/api/portal/session/route.ts"), "utf8")
  const loginRoute = readFileSync(resolve(repoRoot, "app/api/portal/login/route.ts"), "utf8")
  assert.equal(sessionSource.includes("stanley-test"), false)
  assert.equal(sessionSource.includes("PORTAL_TEST_PASSWORD"), false)
  assert.equal(sessionRoute.includes("portalLoginHints"), false)
  assert.equal(sessionRoute.includes("users:"), false)
  assert.match(loginRoute, /checkPortalLoginRateLimit/)
  assert.match(sessionSource, /verifyPortalLogin[\s\S]*verifyPortalCredential\(email, password\)[\s\S]*findPortalUserByEmail\(email\)/)
})

test("logout decodes the signed token independently and fails closed when authoritative revocation fails", () => {
  const sessionSource = readFileSync(resolve(repoRoot, "lib/portal/session.ts"), "utf8")
  const logoutRoute = readFileSync(resolve(repoRoot, "app/api/portal/logout/route.ts"), "utf8")
  assert.match(sessionSource, /getPortalSessionForRevocation/)
  assert.match(sessionSource, /single-host-shared-filesystem/)
  assert.match(logoutRoute, /getPortalSessionForRevocation/)
  assert.match(logoutRoute, /logout_temporarily_unavailable/)
  assert.match(logoutRoute, /status: 503/)
})

test("portal and settings pages enforce a server-side session guard", () => {
  const portalPage = readFileSync(resolve(repoRoot, "app/portal/page.tsx"), "utf8")
  const settingsPage = readFileSync(resolve(repoRoot, "app/portal/settings/page.tsx"), "utf8")
  assert.match(portalPage, /requirePortalSession/)
  assert.match(settingsPage, /requirePortalSession/)
})
