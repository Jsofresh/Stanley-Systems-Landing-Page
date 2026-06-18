import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createHash, createHmac, timingSafeEqual } from "crypto"
import { findPortalUserByEmail, publicPortalUsers, type PortalTestUser } from "@/lib/portal/test-users"

export const PORTAL_SESSION_COOKIE = "stanley_portal_session"
const TEST_PASSWORD = "stanley-test"

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

function sessionSecret() {
  const secret = process.env.PORTAL_SESSION_SECRET
  if (!secret || secret.length < 32) throw new Error("PORTAL_SESSION_SECRET is not configured")
  return secret
}

function signPayload(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url")
}

function encodeSession(session: PortalSession) {
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url")
  return `${payload}.${signPayload(payload)}`
}

function decodeSession(value: string | undefined): PortalSession | null {
  if (!value) return null
  try {
    const [payload, signature] = value.split(".")
    if (!payload || !signature) return null
    const expected = signPayload(payload)
    const suppliedBuffer = Buffer.from(signature)
    const expectedBuffer = Buffer.from(expected)
    if (suppliedBuffer.length !== expectedBuffer.length || !timingSafeEqual(suppliedBuffer, expectedBuffer)) return null
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as PortalSession
    if (!parsed.actorId || !parsed.email || !parsed.companyId || !parsed.sessionKey) return null
    return parsed
  } catch {
    return null
  }
}

function sessionKeyFor(user: PortalTestUser) {
  const digest = createHash("sha256")
    .update(`${user.companyId}:${user.actorId}:${user.email}`)
    .digest("hex")
    .slice(0, 12)
  return `ui:${user.companyId}:${user.sessionPrefix}:${digest}`
}

export function createPortalSession(user: PortalTestUser): PortalSession {
  return {
    actorId: user.actorId,
    name: user.name,
    email: user.email,
    role: user.role,
    roleLabel: user.roleLabel,
    companyId: user.companyId,
    companyName: user.companyName,
    sessionKey: sessionKeyFor(user),
    issuedAt: new Date().toISOString(),
  }
}

export function getPortalSession(): PortalSession | null {
  return decodeSession(cookies().get(PORTAL_SESSION_COOKIE)?.value)
}

export function setPortalSessionCookie(response: NextResponse, session: PortalSession) {
  response.cookies.set(PORTAL_SESSION_COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 12,
  })
}

export function clearPortalSessionCookie(response: NextResponse) {
  response.cookies.set(PORTAL_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 0,
  })
}

export function verifyPortalLogin(email: string, password: string) {
  const user = findPortalUserByEmail(email)
  if (!user) return null
  if (password !== TEST_PASSWORD) return null
  return user
}

export function portalLoginHints() {
  return {
    users: publicPortalUsers(),
    password_hint: "Shared test password configured for non-production persona accounts.",
  }
}
