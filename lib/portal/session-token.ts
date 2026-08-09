import { createHmac, timingSafeEqual } from "node:crypto"

export type PortalSessionToken = {
  actorId: string
  name: string
  email: string
  role: string
  roleLabel: string
  companyId: string
  companyName: string
  sessionKey: string
  issuedAt: string
}

function signPayload(payload: string, secret: string) {
  if (!secret || secret.length < 32) throw new Error("PORTAL_SESSION_SECRET is not configured")
  return createHmac("sha256", secret).update(payload).digest("base64url")
}

export function encodePortalSessionToken(session: PortalSessionToken, secret: string) {
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url")
  return `${payload}.${signPayload(payload, secret)}`
}

export function decodePortalSessionToken(
  value: string | undefined,
  secret: string,
  now = Date.now(),
  maxAgeMs = 12 * 60 * 60 * 1000,
): PortalSessionToken | null {
  if (!value || !Number.isFinite(now) || !Number.isFinite(maxAgeMs) || maxAgeMs <= 0) return null
  try {
    const parts = value.split(".")
    if (parts.length !== 2) return null
    const [payload, signature] = parts
    if (!payload || !signature) return null
    const expected = signPayload(payload, secret)
    const suppliedBuffer = Buffer.from(signature, "utf8")
    const expectedBuffer = Buffer.from(expected, "utf8")
    if (suppliedBuffer.length !== expectedBuffer.length || !timingSafeEqual(suppliedBuffer, expectedBuffer)) return null
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Partial<PortalSessionToken>
    const required = [
      parsed.actorId,
      parsed.name,
      parsed.email,
      parsed.role,
      parsed.roleLabel,
      parsed.companyId,
      parsed.companyName,
      parsed.sessionKey,
      parsed.issuedAt,
    ]
    if (required.some((field) => typeof field !== "string" || !field)) return null
    const issuedAt = Date.parse(parsed.issuedAt as string)
    if (!Number.isFinite(issuedAt) || issuedAt > now + 60_000 || now - issuedAt > maxAgeMs) return null
    return parsed as PortalSessionToken
  } catch {
    return null
  }
}
