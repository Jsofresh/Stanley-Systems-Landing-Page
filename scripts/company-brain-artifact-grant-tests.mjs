import test from "node:test"
import assert from "node:assert/strict"
import { mkdtempSync, readdirSync, rmSync, statSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import {
  grantPortalArtifactAccess,
  portalArtifactAccessAllowed,
} from "../lib/portal/artifact-grants.ts"

test("artifact grants are session-bound, expire, and never store raw session keys", () => {
  const storeDir = mkdtempSync(resolve(tmpdir(), "portal-artifact-grant-test-"))
  try {
    const sessionA = "ui:company:owner:secret-a"
    const sessionB = "ui:company:owner:secret-b"
    const issuedAt = 1_000
    grantPortalArtifactAccess(storeDir, sessionA, ["artifact_abc123"], issuedAt, 60_000)
    assert.equal(portalArtifactAccessAllowed(storeDir, sessionA, "artifact_abc123", issuedAt + 1_000), true)
    assert.equal(portalArtifactAccessAllowed(storeDir, sessionB, "artifact_abc123", issuedAt + 1_000), false)
    assert.equal(portalArtifactAccessAllowed(storeDir, sessionA, "artifact_abc123", issuedAt + 60_001), false)
    const root = resolve(storeDir, "artifact-grants")
    const sessionDirs = readdirSync(root)
    assert.equal(sessionDirs.length, 1)
    assert.equal(sessionDirs[0].includes(sessionA), false)
    assert.equal(statSync(resolve(root, sessionDirs[0])).mode & 0o777, 0o700)
  } finally {
    rmSync(storeDir, { recursive: true, force: true })
  }
})

test("invalid artifact identifiers are never granted", () => {
  const storeDir = mkdtempSync(resolve(tmpdir(), "portal-artifact-grant-test-"))
  try {
    assert.throws(() => grantPortalArtifactAccess(storeDir, "session", ["../secret"], 1_000, 60_000))
    assert.equal(portalArtifactAccessAllowed(storeDir, "session", "../secret", 2_000), false)
  } finally {
    rmSync(storeDir, { recursive: true, force: true })
  }
})
