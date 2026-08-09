import { NextRequest, NextResponse } from "next/server"
import { hasValidRemotionToken, REMOTION_ACCESS_COOKIE } from "@/lib/remotion-access"

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const token = typeof body?.token === "string" ? body.token.trim() : ""

  if (!hasValidRemotionToken(token)) {
    return NextResponse.json({ ok: false, error: "Invalid token" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set({
    name: REMOTION_ACCESS_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 12,
  })
  return response
}
