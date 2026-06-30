import { NextRequest, NextResponse } from "next/server"
import { createPortalSession, publicPortalSession, setPortalSessionCookie, verifyPortalLogin } from "@/lib/portal/session"

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const user = verifyPortalLogin(body.email ?? "", body.password ?? "")
  if (!user) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 })
  }

  const session = createPortalSession(user)
  const response = NextResponse.json({ ok: true, session: publicPortalSession(session) })
  setPortalSessionCookie(response, session)
  return response
}
