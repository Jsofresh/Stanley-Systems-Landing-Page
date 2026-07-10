import { NextResponse } from "next/server"
import { getPortalSession, publicPortalSession } from "@/lib/portal/session"
import { unauthenticatedPortalSessionPayload } from "@/lib/portal/session-core"

export const dynamic = "force-dynamic"

export async function GET() {
  const session = getPortalSession()
  if (!session) {
    return NextResponse.json(unauthenticatedPortalSessionPayload(), {
      status: 401,
      headers: { "cache-control": "no-store" },
    })
  }
  return NextResponse.json(
    { authenticated: true, session: publicPortalSession(session) },
    { headers: { "cache-control": "no-store" } },
  )
}
