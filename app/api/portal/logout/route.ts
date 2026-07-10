import { NextResponse } from "next/server"
import {
  clearPortalSessionCookie,
  getPortalSessionForRevocation,
  revokePortalSession,
} from "@/lib/portal/session"

export const dynamic = "force-dynamic"

export async function POST() {
  const session = getPortalSessionForRevocation()
  try {
    if (session) revokePortalSession(session)
  } catch {
    return NextResponse.json(
      { ok: false, error: "logout_temporarily_unavailable" },
      { status: 503, headers: { "cache-control": "no-store" } },
    )
  }
  const response = NextResponse.json({ ok: true }, { headers: { "cache-control": "no-store" } })
  clearPortalSessionCookie(response)
  return response
}
