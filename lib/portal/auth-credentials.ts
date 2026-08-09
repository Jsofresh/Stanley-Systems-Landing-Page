import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto"

const SCRYPT_VERSION = "v1"
const SCRYPT_N = 16_384
const SCRYPT_R = 8
const SCRYPT_P = 1
const SCRYPT_KEY_LENGTH = 32
const SCRYPT_MAX_MEMORY = 64 * 1024 * 1024
const CREDENTIAL_PATTERN = /^scrypt\$v1\$16384\$8\$1\$[A-Za-z0-9_-]+\$[A-Za-z0-9_-]+$/

type EnvLike = Record<string, string | undefined>

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function hashPortalPassword(password: string, salt?: Buffer) {
  if (!password) throw new Error("password_required")
  const safeSalt = salt ?? randomBytes(16)
  const derived = scryptSync(password, safeSalt, SCRYPT_KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
    maxmem: SCRYPT_MAX_MEMORY,
  })
  return [
    "scrypt",
    SCRYPT_VERSION,
    String(SCRYPT_N),
    String(SCRYPT_R),
    String(SCRYPT_P),
    safeSalt.toString("base64url"),
    derived.toString("base64url"),
  ].join("$")
}

const DUMMY_PORTAL_CREDENTIAL = hashPortalPassword(randomBytes(32).toString("base64url"), randomBytes(16))

export function verifyPortalPassword(password: string, credential: string) {
  if (!password || !CREDENTIAL_PATTERN.test(credential)) return false
  try {
    const [, version, rawN, rawR, rawP, rawSalt, rawHash] = credential.split("$")
    if (version !== SCRYPT_VERSION) return false
    const salt = Buffer.from(rawSalt, "base64url")
    const expected = Buffer.from(rawHash, "base64url")
    if (salt.length < 16 || expected.length !== SCRYPT_KEY_LENGTH) return false
    const actual = scryptSync(password, salt, expected.length, {
      N: Number(rawN),
      r: Number(rawR),
      p: Number(rawP),
      maxmem: SCRYPT_MAX_MEMORY,
    })
    return actual.length === expected.length && timingSafeEqual(actual, expected)
  } catch {
    return false
  }
}

export function portalCredentialsFromEnv(env: EnvLike = process.env) {
  const raw = env.PORTAL_AUTH_CREDENTIALS_JSON
  if (!raw) return {} as Record<string, string>
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {}
    const credentials: Record<string, string> = {}
    for (const [email, credential] of Object.entries(parsed)) {
      const normalized = normalizeEmail(email)
      if (!normalized || typeof credential !== "string" || !CREDENTIAL_PATTERN.test(credential)) return {}
      credentials[normalized] = credential
    }
    return credentials
  } catch {
    return {}
  }
}

export function verifyPortalCredential(email: string, password: string, env: EnvLike = process.env) {
  const credentials = portalCredentialsFromEnv(env)
  const normalized = normalizeEmail(email)
  const configured = credentials[normalized]
  const candidate = configured ?? DUMMY_PORTAL_CREDENTIAL
  const verified = verifyPortalPassword(password, candidate)
  return Boolean(configured && verified)
}
