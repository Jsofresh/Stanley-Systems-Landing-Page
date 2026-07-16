import { NextRequest, NextResponse } from "next/server"
import { getPortalSession, portalSessionStoreDir } from "@/lib/portal/session"
import { grantPortalArtifactAccess, portalArtifactAccessAllowed } from "@/lib/portal/artifact-grants"

const ALLOWED_PATHS = new Set([
  "control/summary",
  "control/needs-attention",
  "brain/chat",
  "brain/uploads",
  "health",
])
const MAX_UPLOAD_FILES = 5
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024
const MAX_UPLOAD_TOTAL_BYTES = 30 * 1024 * 1024
const MAX_JSON_BYTES = 1024 * 1024
const MAX_ARTIFACT_BYTES = 25 * 1024 * 1024
const ALLOWED_UPLOAD_TYPES = new Set([
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
  "image/webp",
])
const ALLOWED_UPLOAD_EXTENSIONS = new Set(["pdf", "txt", "csv", "docx", "xlsx", "png", "jpg", "jpeg", "webp"])
const ARTIFACT_EXTENSIONS: Record<string, string> = {
  "application/pdf": "pdf",
  "text/csv": "csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "text/plain": "txt",
  "text/html": "html",
}

function isAllowedPath(path: string) {
  return ALLOWED_PATHS.has(path)
    || /^artifacts\/artifact_[A-Za-z0-9_-]+$/.test(path)
    || /^brain\/sessions(?:\/[A-Za-z0-9_.:-]+(?:\/messages|\/chat\/stream|\/cancel))?$/.test(path)
}

type RouteContext = {
  params: {
    path?: string[]
  }
}

function securityHeaders(extra?: Record<string, string>) {
  return {
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...extra,
  }
}

function jsonError(error: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json({ error }, { status, headers: securityHeaders(headers) })
}

function unavailableResponse(path: string) {
  if (path === "control/summary") {
    return NextResponse.json(
      {
        runtime_status: "unavailable",
        runtime_version: "unavailable",
        source_record_counts: {},
        raw_customer_data_included: false,
        error: "company_brain_unavailable",
      },
      { status: 503, headers: securityHeaders() },
    )
  }
  if (path === "control/needs-attention") {
    return NextResponse.json(
      {
        endpoint_scope: "portal_control_unavailable",
        control_plane_safe: true,
        cards: [],
        card_count: 0,
        source_record_counts: {},
        raw_customer_data_included: false,
        error: "company_brain_unavailable",
      },
      { status: 503, headers: securityHeaders() },
    )
  }
  if (path === "brain/chat") {
    return NextResponse.json(
      {
        errorCode: "company_agent_unavailable",
        error: "Company Brain is unavailable, and the request outcome is unknown. Check recent activity before trying again.",
      },
      { status: 503, headers: securityHeaders() },
    )
  }
  return jsonError("company_brain_unavailable", 503)
}

function resolvedPath(parts?: string[]) {
  return (parts ?? []).join("/").replace(/^\/+/, "")
}

function upstreamBaseUrl() {
  const raw = process.env.COMPANY_BRAIN_UPSTREAM_URL
  if (!raw) return null
  try {
    const url = new URL(raw)
    const localDevelopment = process.env.NODE_ENV !== "production" && url.protocol === "http:" && ["127.0.0.1", "localhost"].includes(url.hostname)
    if (url.protocol !== "https:" && !localDevelopment) return null
    if (url.username || url.password || url.search || url.hash) return null
    url.pathname = `${url.pathname.replace(/\/+$/, "")}/`
    return url
  } catch {
    return null
  }
}

function safeConversationId(value: unknown) {
  if (typeof value !== "string") return ""
  return /^[A-Za-z0-9_.:-]{1,160}$/.test(value) ? value : ""
}

function sanitizedAttachments(value: unknown) {
  if (!Array.isArray(value) || value.length > MAX_UPLOAD_FILES) return []
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return []
    const input = item as Record<string, unknown>
    const id = typeof input.id === "string" && /^attachment_[A-Za-z0-9_-]{6,160}$/.test(input.id) ? input.id : ""
    if (!id) return []
    return [{
      id,
      name: typeof input.name === "string" ? input.name.slice(0, 240) : "attachment",
      size: typeof input.size === "number" && Number.isFinite(input.size) ? Math.max(0, Math.min(input.size, MAX_UPLOAD_BYTES)) : 0,
      mimeType: typeof input.mimeType === "string" ? input.mimeType.slice(0, 160) : "application/octet-stream",
      kind: typeof input.kind === "string" ? input.kind.slice(0, 40) : "file",
    }]
  })
}

function uploadTypeAllowed(file: File) {
  const extension = file.name.toLowerCase().split(".").at(-1) ?? ""
  const type = file.type.split(";", 1)[0].toLowerCase()
  return ALLOWED_UPLOAD_EXTENSIONS.has(extension) && (!type || ALLOWED_UPLOAD_TYPES.has(type))
}

function artifactHeaders(contentType: string, artifactId: string, size: number) {
  const extension = ARTIFACT_EXTENSIONS[contentType]
  if (!extension) return null
  return securityHeaders({
    "content-type": contentType,
    "content-length": String(size),
    "content-disposition": `attachment; filename="${artifactId}.${extension}"`,
    "content-security-policy": "default-src 'none'; sandbox",
    "x-frame-options": "DENY",
  })
}

function artifactIdsFromChatResponse(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return []
  const response = value as Record<string, unknown>
  const candidates: unknown[] = []
  if (Array.isArray(response.artifacts)) candidates.push(...response.artifacts)
  if (Array.isArray(response.blocks)) {
    response.blocks.forEach((block) => {
      if (block && typeof block === "object" && !Array.isArray(block)) candidates.push((block as Record<string, unknown>).artifact)
    })
  }
  return [...new Set(candidates.flatMap((candidate) => {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) return []
    const id = (candidate as Record<string, unknown>).id
    return typeof id === "string" && /^artifact_[A-Za-z0-9_-]{6,160}$/.test(id) ? [id] : []
  }))].slice(0, 20)
}

function publicControlResponse(path: string, responseBody: string) {
  if (path !== "control/summary" && path !== "control/needs-attention") return responseBody
  try {
    const parsed = JSON.parse(responseBody) as Record<string, unknown>
    if (!parsed || Array.isArray(parsed)) return responseBody
    if (path === "control/summary") {
      return JSON.stringify({
        runtime_status: typeof parsed.runtime_status === "string" ? parsed.runtime_status : "unavailable",
        runtime_version: typeof parsed.runtime_version === "string" ? parsed.runtime_version : "unavailable",
        source_record_counts: parsed.source_record_counts && typeof parsed.source_record_counts === "object" && !Array.isArray(parsed.source_record_counts)
          ? parsed.source_record_counts
          : {},
        raw_customer_data_included: parsed.raw_customer_data_included === true,
      })
    }
    const cards = Array.isArray(parsed.cards)
      ? parsed.cards.flatMap((card) => {
        if (!card || typeof card !== "object" || Array.isArray(card)) return []
        const { source_ids: _sourceIds, ...safeCard } = card as Record<string, unknown>
        return [safeCard]
      }).slice(0, 50)
      : []
    return JSON.stringify({
      endpoint_scope: typeof parsed.endpoint_scope === "string" ? parsed.endpoint_scope : "portal_control",
      control_plane_safe: parsed.control_plane_safe === true,
      cards,
      card_count: cards.length,
      source_record_counts: parsed.source_record_counts && typeof parsed.source_record_counts === "object" && !Array.isArray(parsed.source_record_counts)
        ? parsed.source_record_counts
        : {},
      raw_customer_data_included: parsed.raw_customer_data_included === true,
    })
  } catch {
    return JSON.stringify({ error: "invalid_upstream_response" })
  }
}

function nativeCompletionArtifactIds(frame: string) {
  const eventMatch = frame.match(/(?:^|\n)event:\s*([^\r\n]+)/)
  if (eventMatch?.[1]?.trim() !== "stanley.completed") return []
  const data = frame
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trimStart())
    .join("\n")
  try {
    return artifactIdsFromChatResponse(JSON.parse(data))
  } catch {
    return []
  }
}

function publicStreamText(value: unknown, limit = 12000) {
  if (typeof value !== "string") return ""
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").slice(0, limit)
}

function publicArtifact(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null
  const artifact = value as Record<string, unknown>
  const id = typeof artifact.id === "string" && /^artifact_[A-Za-z0-9_-]{6,160}$/.test(artifact.id) ? artifact.id : ""
  const downloadUrl = typeof artifact.downloadUrl === "string" && /^\/api\/company-brain\/artifacts\/artifact_[A-Za-z0-9_-]{6,160}$/.test(artifact.downloadUrl)
    ? artifact.downloadUrl
    : undefined
  if (!id) return null
  return {
    id,
    title: publicStreamText(artifact.title, 160),
    kind: publicStreamText(artifact.kind, 40),
    status: ["ready", "preparing", "failed", "needs_revision"].includes(String(artifact.status)) ? artifact.status : "preparing",
    description: publicStreamText(artifact.description, 1000),
    fileName: publicStreamText(artifact.fileName, 240) || undefined,
    extension: publicStreamText(artifact.extension, 16) || undefined,
    mimeType: publicStreamText(artifact.mimeType, 120) || undefined,
    downloadUrl,
    preview: publicStreamText(artifact.preview, 4000) || undefined,
  }
}

function projectNativeEvent(eventName: string, value: unknown) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {}
  if (eventName === "run.started") return { event: "run.started", data: { status: "running" } }
  if (eventName === "message.started") return { event: "message.started", data: {} }
  if (eventName === "assistant.delta") {
    const delta = publicStreamText(source.delta, 4000)
    return delta ? { event: "assistant.delta", data: { delta } } : null
  }
  if (eventName === "assistant.completed") {
    return { event: "assistant.completed", data: { content: publicStreamText(source.content), completed: true } }
  }
  if (["tool.started", "tool.completed", "tool.failed", "tool.progress", "reasoning.available"].includes(eventName)) {
    return {
      event: "tool.progress",
      data: {
        state: eventName,
        label: eventName === "tool.completed" ? "verifying" : eventName === "tool.failed" ? "failed" : "working",
      },
    }
  }
  if (eventName === "approval.request") {
    const choices = Array.isArray(source.choices)
      ? source.choices.filter((choice): choice is string => typeof choice === "string").map((choice) => publicStreamText(choice, 40)).filter(Boolean).slice(0, 8)
      : []
    return choices.length ? { event: "approval.request", data: { choices } } : null
  }
  if (eventName === "stanley.completed") {
    const artifacts = Array.isArray(source.artifacts) ? source.artifacts.map(publicArtifact).filter(Boolean).slice(0, 20) : []
    const blocks: Array<Record<string, unknown>> = []
    if (Array.isArray(source.blocks)) {
      for (const block of source.blocks.slice(0, 24)) {
        if (!block || typeof block !== "object" || Array.isArray(block)) continue
        const item = block as Record<string, unknown>
        if (item.type === "text") {
          const text = publicStreamText(item.text)
          if (text) blocks.push({ type: "text", text })
        } else if (item.type === "artifact") {
          const artifact = publicArtifact(item.artifact)
          if (artifact) blocks.push({ type: "artifact", artifact })
        }
      }
    }
    const status = source.status === "completed" || source.status === "failed" || source.status === "cancelled" ? source.status : "failed"
    const usageSource = source.usage && typeof source.usage === "object" && !Array.isArray(source.usage) ? source.usage as Record<string, unknown> : {}
    const usage = Object.fromEntries(Object.entries(usageSource).filter(([key, item]) => /^(input_tokens|output_tokens|total_tokens)$/.test(key) && typeof item === "number"))
    return {
      event: "stanley.completed",
      data: {
        object: "hermes.portal.completion",
        status,
        answer: publicStreamText(source.answer),
        blocks,
        artifacts,
        usage,
        conversation_id: publicStreamText(source.conversation_id, 160),
      },
    }
  }
  if (eventName === "error") return { event: "error", data: { message: "Company Brain could not finish that request." } }
  if (eventName === "done") return { event: "done", data: {} }
  return null
}

async function authorizedNativeStream(response: Response, sessionKey: string) {
  if (!response.body) return null
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  const stream = new TransformStream<Uint8Array, Uint8Array>()
  const writer = stream.writable.getWriter()
  let sawDone = false

  const writeFrame = async (frame: string) => {
    if (!frame.trim()) return
    const artifactIds = nativeCompletionArtifactIds(frame)
    if (artifactIds.length) {
      try {
        grantPortalArtifactAccess(portalSessionStoreDir(), sessionKey, artifactIds)
      } catch {
        sawDone = true
        await writer.write(encoder.encode(
          `event: error\ndata: ${JSON.stringify({ message: "The completed artifact could not be authorized." })}\n\nevent: done\ndata: {}\n\n`,
        ))
        await reader.cancel()
        return
      }
    }
    const eventMatch = frame.match(/(?:^|\n)event:\s*([^\r\n]+)/)
    const dataLines = frame.split(/\r?\n/).filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart())
    if (!eventMatch || !dataLines.length) return
    let payload: unknown = {}
    try {
      payload = JSON.parse(dataLines.join("\n"))
    } catch {
      return
    }
    const projected = projectNativeEvent(eventMatch[1].trim(), payload)
    if (!projected) return
    if (projected.event === "done") sawDone = true
    await writer.write(encoder.encode(`event: ${projected.event}\ndata: ${JSON.stringify(projected.data)}\n\n`))
  }

  void (async () => {
    let buffer = ""
    try {
      while (true) {
        const next = await reader.read()
        if (next.done) {
          buffer += decoder.decode()
          if (buffer.trim()) await writeFrame(buffer)
          if (!sawDone) {
            sawDone = true
            await writer.write(encoder.encode(
              `event: error\ndata: ${JSON.stringify({ message: "Company Brain stream ended before completion." })}\n\nevent: done\ndata: {}\n\n`,
            ))
          }
          break
        }
        buffer += decoder.decode(next.value, { stream: true })
        const frames = buffer.split(/\r?\n\r?\n/)
        buffer = frames.pop() ?? ""
        for (const frame of frames) await writeFrame(frame)
      }
    } catch {
      if (!sawDone) {
        try {
          sawDone = true
          await writer.write(encoder.encode(
            `event: error\ndata: ${JSON.stringify({ message: "Company Brain stream was interrupted. Check recent activity before trying again." })}\n\nevent: done\ndata: {}\n\n`,
          ))
        } catch {
          // The browser may have disconnected during cancellation.
        }
      }
    } finally {
      try {
        await writer.close()
      } catch {
        // The client may have disconnected while the stream was closing.
      }
    }
  })()

  return stream.readable
}


async function forward(request: NextRequest, context: RouteContext) {
  const session = getPortalSession()
  if (!session) return jsonError("portal_login_required", 401)

  const path = resolvedPath(context.params.path)
  if (!isAllowedPath(path)) return jsonError("company_brain_path_not_allowed", 404)
  if (path.startsWith("artifacts/")) {
    const artifactId = path.split("/").at(-1) ?? ""
    try {
      if (!portalArtifactAccessAllowed(portalSessionStoreDir(), session.sessionKey, artifactId)) return jsonError("artifact_not_found", 404)
    } catch {
      return jsonError("artifact_authorization_unavailable", 503)
    }
  }
  const baseUrl = upstreamBaseUrl()
  const proxyKey = process.env.COMPANY_BRAIN_PROXY_KEY
  if (!baseUrl || !proxyKey) return jsonError("company_brain_proxy_not_configured", 503)

  const upstreamPath = path.startsWith("artifacts/") ? `brain/${path}` : path
  const target = new URL(upstreamPath, baseUrl)
  const artifactRequest = path.startsWith("artifacts/")
  const nativeSessionRequest = /^brain\/sessions(?:\/[^/]+(?:\/messages|\/chat\/stream|\/cancel))?$/.test(path)
  const nativeStreamRequest = /^brain\/sessions\/[^/]+\/chat\/stream$/.test(path)
  const headers: Record<string, string> = {
    accept: artifactRequest ? "application/octet-stream" : nativeStreamRequest ? "text/event-stream" : "application/json",
    "x-stanley-surface": "portal",
    "x-stanley-company-id": session.companyId,
    "x-stanley-actor-id": session.actorId,
    "x-stanley-actor-name": session.name,
    "x-stanley-actor-email": session.email,
    "x-stanley-actor-role": session.role,
    "x-stanley-session-key": session.sessionKey,
    "x-stanley-brain-proxy-key": proxyKey,
  }

  let body: BodyInit | undefined
  if (request.method !== "GET" && request.method !== "HEAD") {
    const declaredLength = Number(request.headers.get("content-length") ?? "0")
    if (path === "brain/uploads") {
      if (Number.isFinite(declaredLength) && declaredLength > MAX_UPLOAD_TOTAL_BYTES) return jsonError("file_too_large", 413)
      let incoming: FormData
      try {
        incoming = await request.formData()
      } catch {
        return jsonError("invalid_upload", 400)
      }
      const files = incoming.getAll("file").filter((value): value is File => value instanceof File)
      const totalBytes = files.reduce((sum, file) => sum + file.size, 0)
      if (!files.length || files.length > MAX_UPLOAD_FILES) return jsonError("invalid_upload_count", 400)
      if (totalBytes > MAX_UPLOAD_TOTAL_BYTES || files.some((file) => file.size <= 0 || file.size > MAX_UPLOAD_BYTES)) return jsonError("file_too_large", 413)
      if (files.some((file) => !uploadTypeAllowed(file))) return jsonError("unsupported_file_type", 415)
      const conversationId = safeConversationId(incoming.get("conversation_id"))
      if (!conversationId) return jsonError("invalid_conversation", 400)
      const form = new FormData()
      form.set("conversation_id", conversationId)
      files.forEach((file) => form.append("file", file, file.name.slice(0, 240)))
      form.set("company_id", session.companyId)
      form.set("surface", "portal")
      form.set("user_role", session.role)
      form.set("actor_id", session.actorId)
      form.set("actor_name", session.name)
      form.set("actor_email", session.email)
      form.set("session_key", session.sessionKey)
      body = form
    } else {
      if (Number.isFinite(declaredLength) && declaredLength > MAX_JSON_BYTES) return jsonError("request_too_large", 413)
      const incomingText = await request.text()
      if (Buffer.byteLength(incomingText, "utf8") > MAX_JSON_BYTES) return jsonError("request_too_large", 413)
      let incoming: Record<string, unknown>
      try {
        const parsed = incomingText ? JSON.parse(incomingText) : {}
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return jsonError("invalid_json", 400)
        incoming = parsed as Record<string, unknown>
      } catch {
        return jsonError("invalid_json", 400)
      }
      if (path === "brain/chat") {
        const message = typeof incoming.message === "string" ? incoming.message.trim().slice(0, 20_000) : ""
        const conversationId = safeConversationId(incoming.conversation_id)
        if (!message && !Array.isArray(incoming.attachments)) return jsonError("invalid_message", 400)
        if (!conversationId) return jsonError("invalid_conversation", 400)
        body = JSON.stringify({
          message,
          attachments: sanitizedAttachments(incoming.attachments),
          conversation_id: conversationId,
          company_id: session.companyId,
          surface: "portal",
          user_role: session.role,
          actor_id: session.actorId,
          actor_name: session.name,
          actor_email: session.email,
          session_key: session.sessionKey,
        })
      } else if (nativeSessionRequest) {
        const pathConversation = path.split("/")[2] ?? ""
        let conversationId = pathConversation
        try {
          conversationId = decodeURIComponent(pathConversation)
        } catch {
          return jsonError("invalid_conversation", 400)
        }
        conversationId = safeConversationId(conversationId || incoming.conversation_id)
        if (path === "brain/sessions") {
          if (!conversationId) return jsonError("invalid_conversation", 400)
          body = JSON.stringify({
            conversation_id: conversationId,
            title: typeof incoming.title === "string" ? incoming.title.slice(0, 160) : "New conversation",
          })
        } else if (path.endsWith("/chat/stream")) {
          const message = typeof incoming.message === "string" ? incoming.message.trim().slice(0, 20_000) : ""
          if (!conversationId || (!message && !Array.isArray(incoming.attachments))) return jsonError("invalid_message", 400)
          body = JSON.stringify({
            conversation_id: conversationId,
            message,
            attachments: sanitizedAttachments(incoming.attachments),
            title: typeof incoming.title === "string" ? incoming.title.slice(0, 160) : "New conversation",
          })
        } else {
          if (!conversationId) return jsonError("invalid_conversation", 400)
          body = JSON.stringify({ conversation_id: conversationId })
        }
      } else {
        return jsonError("method_not_allowed", 405)
      }
      headers["content-type"] = "application/json"
    }
  }

  const controller = new AbortController()
  const timeoutMs = nativeStreamRequest || path === "brain/chat" ? 180000 : path === "brain/uploads" ? 60000 : 20000
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  let response: Response
  try {
    response = await fetch(target, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      signal: controller.signal,
      redirect: "error",
    })
  } catch {
    return unavailableResponse(path)
  } finally {
    clearTimeout(timeout)
  }

  if (response.status >= 500) return unavailableResponse(path)
  if (nativeStreamRequest && response.ok && response.body) {
    const readable = await authorizedNativeStream(response, session.sessionKey)
    return new NextResponse(readable ?? response.body, {
      status: response.status,
      headers: securityHeaders({
        "content-type": "text/event-stream",
        "cache-control": "no-cache, no-store",
        "x-accel-buffering": "no",
      }),
    })
  }
  if (artifactRequest && response.ok) {
    const rawContentType = (response.headers.get("content-type") ?? "").split(";", 1)[0].toLowerCase()
    const size = Number(response.headers.get("content-length") ?? "0")
    const artifactId = path.split("/").at(-1) ?? "artifact"
    if (!Number.isFinite(size) || size <= 0 || size > MAX_ARTIFACT_BYTES || !response.body) return jsonError("artifact_failed", 502)
    const responseHeaders = artifactHeaders(rawContentType, artifactId, size)
    if (!responseHeaders) return jsonError("artifact_type_not_allowed", 415)
    return new NextResponse(response.body, { status: response.status, headers: responseHeaders })
  }

  const responseLength = Number(response.headers.get("content-length") ?? "0")
  if (Number.isFinite(responseLength) && responseLength > MAX_JSON_BYTES) return jsonError("upstream_response_too_large", 502)
  const responseBody = await response.text()
  if (Buffer.byteLength(responseBody, "utf8") > MAX_JSON_BYTES) return jsonError("upstream_response_too_large", 502)
  if (path === "brain/chat" && response.ok) {
    let parsed: unknown
    try {
      parsed = JSON.parse(responseBody)
    } catch {
      return jsonError("invalid_upstream_response", 502)
    }
    const artifactIds = artifactIdsFromChatResponse(parsed)
    if (artifactIds.length) {
      try {
        grantPortalArtifactAccess(portalSessionStoreDir(), session.sessionKey, artifactIds)
      } catch {
        return jsonError("artifact_authorization_unavailable", 503)
      }
    }
  }
  const publicBody = publicControlResponse(path, responseBody)
  return new NextResponse(publicBody, {
    status: response.status,
    headers: securityHeaders({ "content-type": "application/json" }),
  })
}

export async function GET(request: NextRequest, context: RouteContext) {
  return forward(request, context)
}

export async function POST(request: NextRequest, context: RouteContext) {
  return forward(request, context)
}
