import { NextRequest, NextResponse } from "next/server"
import { getPortalSession } from "@/lib/portal/session"

const BRAIN_BASE_URL = "https://brain-test.stanley-systems.com"
const ALLOWED_PATHS = new Set([
  "control/summary",
  "control/needs-attention",
  "brain/chat",
  "brain/uploads",
  "health",
])

function isAllowedPath(path: string) {
  return ALLOWED_PATHS.has(path) || /^artifacts\/artifact_[A-Za-z0-9_-]+$/.test(path)
}

type RouteContext = {
  params: {
    path?: string[]
  }
}

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}


function chatTimeoutFallback() {
  return NextResponse.json(
    {
      answer: "The company agent is unavailable right now. Nothing was created or changed.",
      errorCode: "company_agent_unavailable",
      blocks: [
        {
          type: "error",
          code: "runtime_failed",
          message: "The company agent is unavailable right now. Nothing was created or changed.",
        },
      ],
      suggested_action: { type: "boundary_error", status: "blocked", draft: "Nothing was sent or changed." },
    },
    { status: 503, headers: { "cache-control": "no-store" } },
  )
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
  if (!isAllowedPath(path)) return jsonError("company_brain_path_not_allowed", 404)

  const upstreamPath = path === "actions/confirm" ? "brain/actions/confirm" : path.startsWith("artifacts/") ? `brain/${path}` : path
  const target = `${BRAIN_BASE_URL}/${upstreamPath}${request.nextUrl.search}`
  const headers: Record<string, string> = {
    accept: "application/json",
    "x-stanley-surface": "portal",
    "x-stanley-company-id": session.companyId,
    "x-stanley-actor-id": session.actorId,
    "x-stanley-actor-role": session.role,
    "x-stanley-session-key": session.sessionKey,
  }
  const proxyKey = process.env.COMPANY_BRAIN_PROXY_KEY
  if (!proxyKey) return jsonError("company_brain_proxy_not_configured", 503)
  headers["x-stanley-brain-proxy-key"] = proxyKey

  let body: BodyInit | undefined
  if (request.method !== "GET" && request.method !== "HEAD") {
    if (path === "brain/uploads") {
      const incoming = await request.formData()
      const form = new FormData()
      for (const [key, value] of incoming.entries()) form.append(key, value)
      form.set("company_id", session.companyId)
      form.set("surface", "portal")
      form.set("user_role", session.role)
      form.set("actor_id", session.actorId)
      form.set("actor_name", session.name)
      form.set("actor_email", session.email)
      form.set("session_key", session.sessionKey)
      body = form
      delete headers["accept"]
    } else {
      const incomingText = await request.text()
      if (path === "brain/chat" || path === "actions/confirm") {
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
  }

  const controller = new AbortController()
  const timeoutMs = path === "brain/chat" ? 45000 : path === "brain/uploads" ? 60000 : 20000
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  let response: Response
  try {
    response = await fetch(target, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      signal: controller.signal,
    })
  } catch (error) {
    if (path === "brain/chat") return chatTimeoutFallback()
    throw new Error(error instanceof Error ? error.message : "brain_fetch_failed")
  } finally {
    clearTimeout(timeout)
  }
  const contentType = response.headers.get("content-type") ?? "application/json"
  const fallback = response.status >= 500 ? safeControlFallback(path, `brain_runtime_${response.status}`) : null
  if (fallback) return fallback
  const responseBody = path.startsWith("artifacts/") ? await response.arrayBuffer() : await response.text()
  const responseHeaders: Record<string, string> = {
    "content-type": contentType,
    "cache-control": "no-store",
  }
  const disposition = response.headers.get("content-disposition")
  if (disposition) responseHeaders["content-disposition"] = disposition
  return new NextResponse(responseBody, {
    status: response.status,
    headers: responseHeaders,
  })
}

export async function GET(request: NextRequest, context: RouteContext) {
  return forward(request, context)
}

export async function POST(request: NextRequest, context: RouteContext) {
  return forward(request, context)
}
