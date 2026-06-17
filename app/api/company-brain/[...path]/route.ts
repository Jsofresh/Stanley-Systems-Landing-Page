import { NextRequest, NextResponse } from "next/server"
import { getPortalSession } from "@/lib/portal/session"

const BRAIN_BASE_URL = "https://brain-test.stanley-systems.com"
const ALLOWED_PATHS = new Set([
  "control/summary",
  "control/needs-attention",
  "brain/chat",
  "health",
])

type RouteContext = {
  params: {
    path?: string[]
  }
}

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}

function safeControlFallback(path: string, reason: string) {
  if (path === "control/summary") {
    return NextResponse.json(
      {
        runtime_status: "degraded",
        runtime_version: "unavailable",
        source_record_counts: {},
        raw_customer_data_included: false,
        connector_errors: [reason],
      },
      { status: 200, headers: { "cache-control": "no-store" } },
    )
  }
  if (path === "control/needs-attention") {
    return NextResponse.json(
      {
        endpoint_scope: "portal_control_fallback",
        control_plane_safe: true,
        cards: [],
        card_count: 0,
        source_record_counts: {},
        raw_customer_data_included: false,
        connector_errors: [reason],
      },
      { status: 200, headers: { "cache-control": "no-store" } },
    )
  }
  return null
}

function resolvedPath(parts?: string[]) {
  return (parts ?? []).join("/").replace(/^\/+/, "")
}

async function forward(request: NextRequest, context: RouteContext) {
  const session = getPortalSession()
  if (!session) return jsonError("portal_login_required", 401)

  const path = resolvedPath(context.params.path)
  if (!ALLOWED_PATHS.has(path)) return jsonError("company_brain_path_not_allowed", 404)

  const target = `${BRAIN_BASE_URL}/${path}${request.nextUrl.search}`
  const headers: Record<string, string> = {
    accept: "application/json",
    "x-stanley-surface": "portal",
    "x-stanley-company-id": session.companyId,
    "x-stanley-actor-id": session.actorId,
    "x-stanley-actor-role": session.role,
    "x-stanley-session-key": session.sessionKey,
  }

  let body: string | undefined
  if (request.method !== "GET" && request.method !== "HEAD") {
    const incomingText = await request.text()
    if (path === "brain/chat") {
      let incoming: Record<string, unknown> = {}
      try {
        incoming = incomingText ? JSON.parse(incomingText) : {}
      } catch {
        return jsonError("invalid_json", 400)
      }
      body = JSON.stringify({
        ...incoming,
        company_id: session.companyId,
        surface: "portal",
        user_role: session.role,
        actor_id: session.actorId,
        actor_name: session.name,
        actor_email: session.email,
        session_key: session.sessionKey,
      })
    } else {
      body = incomingText
    }
    headers["content-type"] = "application/json"
  }

  const response = await fetch(target, {
    method: request.method,
    headers,
    body,
    cache: "no-store",
  }).catch((error) => {
    throw new Error(error instanceof Error ? error.message : "brain_fetch_failed")
  })
  const responseText = await response.text()
  const contentType = response.headers.get("content-type") ?? "application/json"
  const fallback = response.status >= 500 ? safeControlFallback(path, `brain_runtime_${response.status}`) : null
  if (fallback) return fallback
  return new NextResponse(responseText, {
    status: response.status,
    headers: {
      "content-type": contentType,
      "cache-control": "no-store",
    },
  })
}

export async function GET(request: NextRequest, context: RouteContext) {
  return forward(request, context)
}

export async function POST(request: NextRequest, context: RouteContext) {
  return forward(request, context)
}
