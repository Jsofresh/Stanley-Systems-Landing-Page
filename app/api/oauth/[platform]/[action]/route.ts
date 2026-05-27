import { NextResponse } from "next/server"
import { buildAuthorizationRedirect, handleCallback, knownPlatform } from "@/lib/content-system-oauth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Params = { params: { platform: string; action: string } }

function htmlPage(message: string, status = 200) {
  return new NextResponse(`<!doctype html><html><body><p>${message}</p></body></html>`, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  })
}

export async function GET(request: Request, { params }: Params) {
  const platform = params.platform.toLowerCase()
  const action = params.action.toLowerCase()
  if (!knownPlatform(platform)) return NextResponse.json({ error: "not_found" }, { status: 404 })

  if (action === "start") {
    const result = await buildAuthorizationRedirect(platform)
    if ("redirect" in result) return NextResponse.redirect(result.redirect, { status: 302 })
    return htmlPage(
      result.error === "missing_fields"
        ? `Missing OAuth configuration fields: ${result.missingFields.join(", ")}`
        : "Unknown OAuth platform.",
      result.status,
    )
  }

  if (action === "callback") {
    const result = await handleCallback(platform, request.url)
    if (result.ok) return htmlPage(`${result.platformName} connected. You can close this tab.`)
    return htmlPage(result.message, result.status)
  }

  return NextResponse.json({ error: "not_found" }, { status: 404 })
}
