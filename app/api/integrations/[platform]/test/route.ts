import { NextResponse } from "next/server"
import { integrationReadiness } from "@/lib/content-system-oauth"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Params = { params: { platform: string } }

export async function GET(_request: Request, { params }: Params) {
  const platform = params.platform.toLowerCase()
  const result = await integrationReadiness(platform)
  if ("error" in result) return NextResponse.json({ error: "not_found" }, { status: 404 })
  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } })
}
