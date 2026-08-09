import { createHash } from "node:crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"
import { verifyPortalCredential } from "@/lib/portal/auth-credentials"
import { createPortalSessionCore } from "@/lib/portal/session-core"
import {
  assertPortalSessionStoreAvailable,
  activatePortalSessionFile,
  isPortalSessionFileActive,
  revokePortalSessionFile,
} from "@/lib/portal/session-store"
import { findPortalUserByEmail, type PortalTestUser } from "@/lib/portal/test-users"
import { decodePortalSessionToken, encodePortalSessionToken } from "@/lib/portal/session-token"

export const PORTAL_SESSION_COOKIE = "stanley_portal_session"
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000

type PortalSession = {
  actorId: string
  name: string
  email: string
  role: PortalTestUser["role"]
  roleLabel: string
  companyId: string
  companyName: string
  sessionKey: string
  issuedAt: string
}

export type PublicPortalSession = Omit<PortalSession, "sessionKey"> & { loginSessionId: string }

function sessionSecret() {
  const secret = process.env.PORTAL_SESSION_SECRET
  if (!secret || secret.length < 32) throw new Error("PORTAL_SESSION_SECRET is not configured")
  return secret
}

export function portalSessionStoreDir() {
  const storeDir = process.env.PORTAL_SESSION_STORE_DIR
  if (!storeDir) throw new Error("PORTAL_SESSION_STORE_DIR is not configured")
  if (process.env.NODE_ENV === "production" && process.env.PORTAL_SESSION_DEPLOYMENT_MODE !== "single-host-shared-filesystem") {
    throw new Error("PORTAL_SESSION_DEPLOYMENT_MODE is not configured")
  }
  return storeDir
}

export function assertPortalSessionStoreReady() {
  assertPortalSessionStoreAvailable(portalSessionStoreDir())
}

function decodeSignedPortalSession(value: string | undefined): PortalSession | null {
  const parsed = decodePortalSessionToken(value, sessionSecret(), Date.now(), SESSION_MAX_AGE_MS)
  if (!parsed) return null
  const currentUser = findPortalUserByEmail(parsed.email)
  if (!currentUser || currentUser.actorId !== parsed.actorId || currentUser.companyId !== parsed.companyId || currentUser.role !== parsed.role) return null
  return parsed as PortalSession
}

function decodeActivePortalSession(value: string | undefined): PortalSession | null {
  const parsed = decodeSignedPortalSession(value)
  if (!parsed) return null
  try {
    if (!isPortalSessionFileActive(portalSessionStoreDir(), parsed.sessionKey)) return null
    return parsed
  } catch {
    return null
  }
}

export function createPortalSession(user: PortalTestUser): PortalSession {
  const session = { ...createPortalSessionCore(user), role: user.role }
  activatePortalSessionFile(portalSessionStoreDir(), session.sessionKey, Date.parse(session.issuedAt), SESSION_MAX_AGE_MS)
  return session
}

export function getPortalSession(): PortalSession | null {
  return decodeActivePortalSession(cookies().get(PORTAL_SESSION_COOKIE)?.value)
}

export function getPortalSessionForRevocation(): PortalSession | null {
  return decodeSignedPortalSession(cookies().get(PORTAL_SESSION_COOKIE)?.value)
}

export function requirePortalSession(): PortalSession {
  const session = getPortalSession()
  if (!session) redirect("/login")
  return session
}

export function setPortalSessionCookie(response: NextResponse, session: PortalSession) {
  response.cookies.set(PORTAL_SESSION_COOKIE, encodePortalSessionToken(session, sessionSecret()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })
}

export function clearPortalSessionCookie(response: NextResponse) {
  response.cookies.set(PORTAL_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
}

export function revokePortalSession(session: PortalSession | null) {
  if (!session) return false
  return revokePortalSessionFile(portalSessionStoreDir(), session.sessionKey)
}

export function verifyPortalLogin(email: string, password: string) {
  const credentialVerified = verifyPortalCredential(email, password)
  const user = findPortalUserByEmail(email)
  if (!credentialVerified || !user) return null
  return user
}

export function publicPortalSession(session: PortalSession): PublicPortalSession {
  const { sessionKey: _sessionKey, ...publicSession } = session
  return {
    ...publicSession,
    loginSessionId: createHash("sha256").update(session.sessionKey).digest("base64url").slice(0, 24),
  }
}
