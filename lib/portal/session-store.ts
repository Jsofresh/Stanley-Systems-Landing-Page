import { createHash, randomBytes } from "node:crypto"
import {
  chmodSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs"
import { isAbsolute, join } from "node:path"

function validatedStoreDir(storeDir: string, create = false) {
  if (!storeDir || !isAbsolute(storeDir) || storeDir.includes("\0")) throw new Error("PORTAL_SESSION_STORE_DIR is not configured")
  if (create) mkdirSync(storeDir, { recursive: true, mode: 0o700 })
  const metadata = lstatSync(storeDir)
  if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error("PORTAL_SESSION_STORE_DIR is unsafe")
  chmodSync(storeDir, 0o700)
  return storeDir
}

function sessionFile(storeDir: string, sessionKey: string, create = false) {
  const digest = createHash("sha256").update(sessionKey).digest("hex")
  return join(validatedStoreDir(storeDir, create), `${digest}.json`)
}

function removeIfPresent(path: string) {
  try {
    unlinkSync(path)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
  }
}

function cleanupExpiredSessions(storeDir: string, now: number) {
  const files = readdirSync(validatedStoreDir(storeDir)).filter((name) => /^[a-f0-9]{64}\.json$/.test(name))
  if (files.length < 1_000) return
  for (const name of files.slice(0, 250)) {
    const path = join(storeDir, name)
    try {
      const metadata = lstatSync(path)
      if (!metadata.isFile() || metadata.isSymbolicLink()) {
        removeIfPresent(path)
        continue
      }
      const parsed = JSON.parse(readFileSync(path, "utf8")) as { expiresAt?: number }
      if (!Number.isFinite(parsed.expiresAt) || Number(parsed.expiresAt) <= now) removeIfPresent(path)
    } catch {
      removeIfPresent(path)
    }
  }
}

export function activatePortalSessionFile(
  storeDir: string,
  sessionKey: string,
  issuedAt: number,
  maxAgeMs: number,
) {
  if (!sessionKey || !Number.isFinite(issuedAt) || !Number.isFinite(maxAgeMs) || maxAgeMs <= 0) throw new Error("invalid_portal_session")
  const path = sessionFile(storeDir, sessionKey, true)
  const temporary = `${path}.${randomBytes(8).toString("hex")}.tmp`
  writeFileSync(temporary, JSON.stringify({ expiresAt: issuedAt + maxAgeMs }), { encoding: "utf8", mode: 0o600, flag: "wx" })
  renameSync(temporary, path)
  chmodSync(path, 0o600)
  cleanupExpiredSessions(storeDir, Date.now())
}

export function isPortalSessionFileActive(storeDir: string, sessionKey: string, now = Date.now()) {
  const path = sessionFile(storeDir, sessionKey)
  try {
    const metadata = lstatSync(path)
    if (!metadata.isFile() || metadata.isSymbolicLink()) return false
    const parsed = JSON.parse(readFileSync(path, "utf8")) as { expiresAt?: number }
    if (!Number.isFinite(parsed.expiresAt) || Number(parsed.expiresAt) <= now) {
      removeIfPresent(path)
      return false
    }
    return true
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false
    throw error
  }
}

export function revokePortalSessionFile(storeDir: string, sessionKey: string) {
  const path = sessionFile(storeDir, sessionKey)
  removeIfPresent(path)
  try {
    lstatSync(path)
    throw new Error("portal_session_revocation_not_confirmed")
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return true
    throw error
  }
}
