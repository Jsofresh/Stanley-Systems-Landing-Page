import { randomBytes } from "node:crypto"

type PortalUserShape = {
  actorId: string
  name: string
  email: string
  role: string
  roleLabel: string
  companyId: string
  companyName: string
  sessionPrefix: string
}

export type PortalSessionCore = {
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

export function createPortalSessionCore(user: PortalUserShape, now = new Date()): PortalSessionCore {
  const nonce = randomBytes(24).toString("base64url")
  return {
    actorId: user.actorId,
    name: user.name,
    email: user.email,
    role: user.role,
    roleLabel: user.roleLabel,
    companyId: user.companyId,
    companyName: user.companyName,
    sessionKey: `ui:${user.companyId}:${user.sessionPrefix}:${nonce}`,
    issuedAt: now.toISOString(),
  }
}

export function unauthenticatedPortalSessionPayload() {
  return { authenticated: false as const }
}

export function clientAddressFromHeaders(headers: { get(name: string): string | null }, trustProxy: boolean) {
  if (!trustProxy) return "untrusted-proxy"
  const realIp = headers.get("x-real-ip")?.trim()
  return (realIp || "missing-real-ip").slice(0, 128)
}
