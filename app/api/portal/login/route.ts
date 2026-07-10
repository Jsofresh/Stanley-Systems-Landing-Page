import { NextRequest, NextResponse } from "next/server"
import {
  createPortalSession,
  portalSessionStoreDir,
  publicPortalSession,
  setPortalSessionCookie,
  verifyPortalLogin,
} from "@/lib/portal/session"
import { clientAddressFromHeaders } from "@/lib/portal/session-core"
import { checkPortalLoginRateLimit, clearPortalAccountRateLimit } from "@/lib/portal/rate-limit-store"

export const dynamic = "force-dynamic"

const MAX_LOGIN_BODY_BYTES = 8 * 1024
const MAX_EMAIL_LENGTH = 254
const MAX_PASSWORD_LENGTH = 256

function noStoreJson(body: object, init?: { status?: number; headers?: Record<string, string> }) {
  return NextResponse.json(body, {
    status: init?.status,
    headers: { "cache-control": "no-store", ...init?.headers },
  })
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? "0")
  if (Number.isFinite(contentLength) && contentLength > MAX_LOGIN_BODY_BYTES) {
    return noStoreJson({ error: "invalid_request" }, { status: 413 })
  }

  let body: { email?: unknown; password?: unknown }
  try {
    body = await request.json()
  } catch {
    return noStoreJson({ error: "invalid_request" }, { status: 400 })
  }

  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return noStoreJson({ error: "invalid_credentials" }, { status: 401 })
  }
  const email = body.email.trim().toLowerCase()
  const password = body.password
  if (!email || email.length > MAX_EMAIL_LENGTH || !password || password.length > MAX_PASSWORD_LENGTH) {
    return noStoreJson({ error: "invalid_credentials" }, { status: 401 })
  }

  let storeDir: string
  try {
    storeDir = portalSessionStoreDir()
  } catch {
    return noStoreJson({ error: "login_temporarily_unavailable" }, { status: 503 })
  }
  const trustProxy = process.env.PORTAL_TRUST_PROXY === "nginx"
  const address = clientAddressFromHeaders(request.headers, trustProxy)
  let rateLimit: ReturnType<typeof checkPortalLoginRateLimit>
  try {
    rateLimit = checkPortalLoginRateLimit({ storeDir, email, clientAddress: address })
  } catch {
    return noStoreJson({ error: "login_temporarily_unavailable" }, { status: 503 })
  }
  if (!rateLimit.allowed) {
    return noStoreJson(
      { error: "login_temporarily_unavailable" },
      { status: 429, headers: { "retry-after": String(rateLimit.retryAfterSeconds) } },
    )
  }

  const user = verifyPortalLogin(email, password)
  if (!user) return noStoreJson({ error: "invalid_credentials" }, { status: 401 })

  clearPortalAccountRateLimit(storeDir, email)
  let session
  try {
    session = createPortalSession(user)
  } catch {
    return noStoreJson({ error: "login_temporarily_unavailable" }, { status: 503 })
  }
  const response = noStoreJson({ ok: true, session: publicPortalSession(session) })
  setPortalSessionCookie(response, session)
  return response
}
