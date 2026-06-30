import { NextResponse } from "next/server"
import { getPortalSession, portalLoginHints, publicPortalSession } from "@/lib/portal/session"

export async function GET() {
  const session = getPortalSession()
  if (!session) {
    return NextResponse.json({ authenticated: false, ...portalLoginHints() }, { status: 401 })
  }
  return NextResponse.json({ authenticated: true, session: publicPortalSession(session) })
}
