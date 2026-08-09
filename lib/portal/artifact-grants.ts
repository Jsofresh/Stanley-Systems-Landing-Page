import { createHash, randomBytes } from "node:crypto"
import {
  chmodSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs"
import { isAbsolute, join } from "node:path"

const ARTIFACT_ID = /^artifact_[A-Za-z0-9_-]{6,160}$/

function protectedRoot(storeDir: string) {
  if (!storeDir || !isAbsolute(storeDir) || storeDir.includes("\0")) throw new Error("PORTAL_SESSION_STORE_DIR is not configured")
  mkdirSync(storeDir, { recursive: true, mode: 0o700 })
  const storeMetadata = lstatSync(storeDir)
  if (!storeMetadata.isDirectory() || storeMetadata.isSymbolicLink()) throw new Error("PORTAL_SESSION_STORE_DIR is unsafe")
  const root = join(storeDir, "artifact-grants")
  mkdirSync(root, { recursive: true, mode: 0o700 })
  const metadata = lstatSync(root)
  if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error("portal_artifact_grant_store_is_unsafe")
  chmodSync(root, 0o700)
  return root
}

function sessionDirectory(storeDir: string, sessionKey: string, create: boolean) {
  if (!sessionKey) throw new Error("invalid_portal_session")
  const digest = createHash("sha256").update(sessionKey).digest("hex")
  const path = join(protectedRoot(storeDir), digest)
  if (create) {
    mkdirSync(path, { recursive: true, mode: 0o700 })
    const metadata = lstatSync(path)
    if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error("portal_artifact_session_store_is_unsafe")
    chmodSync(path, 0o700)
  }
  return path
}

function grantPath(storeDir: string, sessionKey: string, artifactId: string, create: boolean) {
  if (!ARTIFACT_ID.test(artifactId)) throw new Error("invalid_artifact_id")
  return join(sessionDirectory(storeDir, sessionKey, create), `${artifactId}.grant`)
}

function removeIfPresent(path: string) {
  try {
    unlinkSync(path)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
  }
}

export function grantPortalArtifactAccess(
  storeDir: string,
  sessionKey: string,
  artifactIds: string[],
  issuedAt = Date.now(),
  maxAgeMs = 12 * 60 * 60 * 1000,
) {
  if (!Number.isFinite(issuedAt) || !Number.isFinite(maxAgeMs) || maxAgeMs <= 0 || artifactIds.length > 20) throw new Error("invalid_artifact_grant")
  const unique = [...new Set(artifactIds)]
  unique.forEach((artifactId) => {
    const path = grantPath(storeDir, sessionKey, artifactId, true)
    const temporary = `${path}.${randomBytes(8).toString("hex")}.tmp`
    writeFileSync(temporary, JSON.stringify({ expiresAt: issuedAt + maxAgeMs }), { encoding: "utf8", mode: 0o600, flag: "wx" })
    renameSync(temporary, path)
    chmodSync(path, 0o600)
  })
}

export function portalArtifactAccessAllowed(
  storeDir: string,
  sessionKey: string,
  artifactId: string,
  now = Date.now(),
) {
  if (!ARTIFACT_ID.test(artifactId)) return false
  let path: string
  try {
    path = grantPath(storeDir, sessionKey, artifactId, false)
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
