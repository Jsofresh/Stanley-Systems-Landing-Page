import { createHash, randomBytes } from "node:crypto"
import {
  chmodSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs"
import { isAbsolute, join } from "node:path"

type RateLimitScope = "global" | "ip" | "account" | "capacity"

type RateLimitOptions = {
  storeDir: string
  email: string
  clientAddress: string
  now?: number
  windowMs?: number
  accountMaxAttempts?: number
  ipMaxAttempts?: number
  globalMaxAttempts?: number
  maxBucketKeys?: number
}

type RateLimitResult = {
  allowed: boolean
  scope?: RateLimitScope
  retryAfterSeconds: number
}

const BUCKET_NAME = /^(?:global|ip|account)-[a-f0-9]{64}$/
const HIT_NAME = /^(\d+)-[a-f0-9]{16}\.hit$/

function validateRoot(storeDir: string) {
  if (!storeDir || !isAbsolute(storeDir) || storeDir.includes("\0")) throw new Error("PORTAL_SESSION_STORE_DIR is not configured")
  mkdirSync(storeDir, { recursive: true, mode: 0o700 })
  const storeMetadata = lstatSync(storeDir)
  if (!storeMetadata.isDirectory() || storeMetadata.isSymbolicLink()) throw new Error("PORTAL_SESSION_STORE_DIR is unsafe")
  const root = join(storeDir, "rate-limit")
  mkdirSync(root, { recursive: true, mode: 0o700 })
  const metadata = lstatSync(root)
  if (!metadata.isDirectory() || metadata.isSymbolicLink()) throw new Error("portal_rate_limit_store_is_unsafe")
  chmodSync(root, 0o700)
  return root
}

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex")
}

function bucketName(scope: Exclude<RateLimitScope, "capacity">, value: string) {
  return `${scope}-${digest(value)}`
}

function removeIfPresent(path: string) {
  try {
    unlinkSync(path)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
  }
}

function cleanBucket(path: string, now: number, windowMs: number) {
  let names: string[]
  try {
    const metadata = lstatSync(path)
    if (!metadata.isDirectory() || metadata.isSymbolicLink()) {
      rmSync(path, { recursive: true, force: true })
      return []
    }
    names = readdirSync(path)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return []
    throw error
  }
  const active: number[] = []
  for (const name of names) {
    const match = HIT_NAME.exec(name)
    const hitPath = join(path, name)
    if (!match) {
      removeIfPresent(hitPath)
      continue
    }
    const timestamp = Number(match[1])
    if (!Number.isFinite(timestamp) || now - timestamp >= windowMs) removeIfPresent(hitPath)
    else active.push(timestamp)
  }
  return active.sort((a, b) => a - b)
}

function bucketDirectories(root: string) {
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.isSymbolicLink() && BUCKET_NAME.test(entry.name))
    .map((entry) => entry.name)
}

function pruneEmptyBuckets(root: string, now: number, windowMs: number) {
  for (const name of bucketDirectories(root)) {
    if (name.startsWith("global-")) continue
    const path = join(root, name)
    if (cleanBucket(path, now, windowMs).length === 0) rmSync(path, { recursive: true, force: true })
  }
}

function recordAttempt(
  root: string,
  scope: Exclude<RateLimitScope, "capacity">,
  value: string,
  maximum: number,
  now: number,
  windowMs: number,
  maxBucketKeys: number,
): RateLimitResult {
  const name = bucketName(scope, value)
  const path = join(root, name)
  let exists = false
  try {
    exists = lstatSync(path).isDirectory()
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error
  }
  if (!exists) {
    let buckets = bucketDirectories(root)
    if (buckets.length >= maxBucketKeys) {
      pruneEmptyBuckets(root, now, windowMs)
      buckets = bucketDirectories(root)
      if (buckets.length >= maxBucketKeys) return { allowed: false, scope: "capacity", retryAfterSeconds: Math.max(1, Math.ceil(windowMs / 1000)) }
    }
    mkdirSync(path, { recursive: false, mode: 0o700 })
    chmodSync(path, 0o700)
  }
  const active = cleanBucket(path, now, windowMs)
  if (active.length >= maximum) {
    return {
      allowed: false,
      scope,
      retryAfterSeconds: Math.max(1, Math.ceil((active[0] + windowMs - now) / 1000)),
    }
  }
  const hit = join(path, `${now}-${randomBytes(8).toString("hex")}.hit`)
  writeFileSync(hit, "", { flag: "wx", mode: 0o600 })
  return { allowed: true, retryAfterSeconds: 0 }
}

export function checkPortalLoginRateLimit({
  storeDir,
  email,
  clientAddress,
  now = Date.now(),
  windowMs = 15 * 60 * 1000,
  accountMaxAttempts = 5,
  ipMaxAttempts = 25,
  globalMaxAttempts = 500,
  maxBucketKeys = 2_048,
}: RateLimitOptions): RateLimitResult {
  if (!Number.isFinite(now) || !Number.isFinite(windowMs) || windowMs <= 0) throw new Error("invalid_rate_limit_window")
  const root = validateRoot(storeDir)
  const normalizedEmail = email.trim().toLowerCase().slice(0, 254)
  const normalizedAddress = (clientAddress.trim() || "untrusted-proxy").slice(0, 128)
  for (const [scope, value, maximum] of [
    ["global", "portal-login", globalMaxAttempts],
    ["ip", normalizedAddress, ipMaxAttempts],
    ["account", normalizedEmail || "invalid-email", accountMaxAttempts],
  ] as const) {
    const result = recordAttempt(root, scope, value, maximum, now, windowMs, maxBucketKeys)
    if (!result.allowed) return result
  }
  return { allowed: true, retryAfterSeconds: 0 }
}

export function clearPortalAccountRateLimit(storeDir: string, email: string) {
  const root = validateRoot(storeDir)
  const name = bucketName("account", email.trim().toLowerCase().slice(0, 254) || "invalid-email")
  rmSync(join(root, name), { recursive: true, force: true })
}

export function portalRateLimitStoreStats(storeDir: string) {
  const root = validateRoot(storeDir)
  return { bucketKeys: bucketDirectories(root).length }
}
