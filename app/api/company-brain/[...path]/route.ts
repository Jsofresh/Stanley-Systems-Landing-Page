import { NextRequest, NextResponse } from "next/server"
import { getPortalSession, portalSessionStoreDir } from "@/lib/portal/session"
import {
  PORTAL_TEST_COMPANY_ID,
  STANLEY_TEST_OFFICE_COMPANY_ID,
} from "@/lib/portal/test-users"
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

function upstreamBaseUrl(companyId: string) {
  const raw = companyId === PORTAL_TEST_COMPANY_ID
    ? process.env.COMPANY_BRAIN_UPSTREAM_URL
    : companyId === STANLEY_TEST_OFFICE_COMPANY_ID
      ? process.env.COMPANY_BRAIN_STANLEY_TEST_OFFICE_UPSTREAM_URL
      : undefined
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

type PublicEventIdentity = { company_id: string; conversation_id: string; workflow_id: string; server_sequence: 3; event_id: string }

function exactObjectKeys(value: Record<string, unknown>, keys: readonly string[]) {
  const actual = Object.keys(value)
  return actual.length === keys.length && actual.every((key) => keys.includes(key))
}

function publicEventIdentity(value: Record<string, unknown>, companyId: string, conversationId: string): PublicEventIdentity | null {
  const workflowId = typeof value.workflow_id === "string" && /^[A-Za-z0-9_.:-]{1,160}$/.test(value.workflow_id) ? value.workflow_id : ""
  const eventId = typeof value.event_id === "string" && /^evt_[0-9a-f]{32}$/.test(value.event_id) ? value.event_id : ""
  return value.company_id === companyId && value.conversation_id === conversationId && workflowId === conversationId && value.server_sequence === 3 && eventId
    ? { company_id: companyId, conversation_id: conversationId, workflow_id: workflowId, server_sequence: 3, event_id: eventId }
    : null
}

function publicTerminalReceipt(value: unknown, companyId: string, conversationId: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined
  const source = value as Record<string, unknown>
  const keys = ["schema", "binding", "source", "status", "connectors", "action_count", "verified_action_count", "mutation_dispatch_count", "completed_batch_replay", "provider_readback_status", "provider_write_claimed", "safe_summary"]
  const hasActionReference = Object.hasOwn(source, "action_reference")
  const binding = source.binding && typeof source.binding === "object" && !Array.isArray(source.binding) ? source.binding as Record<string, unknown> : null
  const connectors = Array.isArray(source.connectors) ? source.connectors : []
  const safeSummary = Array.isArray(source.safe_summary) ? source.safe_summary : []
  if (!exactObjectKeys(source, hasActionReference ? [...keys, "action_reference"] : keys)
    || !binding || !exactObjectKeys(binding, ["company_id", "conversation_id"])
    || binding.company_id !== companyId || binding.conversation_id !== conversationId
    || source.schema !== "company_brain.public_turn_receipt.v1"
    || !["conversation", "provider_action_batch"].includes(String(source.source))
    || !["not_applicable", "read_verified", "executed_verified", "already_completed", "partial", "failed_before_dispatch", "failed", "unknown_outcome_reconciliation_required"].includes(String(source.status))
    || connectors.length > 100 || connectors.some((item) => item !== "jobber" && item !== "quickbooks")
    || ![source.action_count, source.verified_action_count, source.mutation_dispatch_count].every((item) => typeof item === "number" && Number.isSafeInteger(item) && item >= 0 && item <= 100)
    || typeof source.completed_batch_replay !== "boolean"
    || !["verified", "unavailable", "not_required"].includes(String(source.provider_readback_status))
    || typeof source.provider_write_claimed !== "boolean"
    || safeSummary.length > 16 || safeSummary.some((item) => typeof item !== "string" || item !== publicStreamText(item, 240))
    || hasActionReference && (typeof source.action_reference !== "string" || !/^actref_[A-Za-z0-9_-]{32,128}$/.test(source.action_reference))) return undefined
  return source
}

function publicPortalResult(value: unknown, companyId: string, conversationId: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined
  const source = value as Record<string, unknown>
  const identity = publicEventIdentity(source, companyId, conversationId)
  const keys = ["schema", "company_id", "conversation_id", "workflow_id", "server_sequence", "event_id", "status", "answer", "blocks", "artifacts", "receipt"]
  if (!exactObjectKeys(source, keys) || !identity || source.schema !== "company_brain.portal_result.v1"
    || !["completed", "partial", "failed", "cancelled", "unknown_outcome"].includes(String(source.status))
    || typeof source.answer !== "string" || source.answer !== publicStreamText(source.answer)
    || !Array.isArray(source.blocks) || source.blocks.length > 24 || !Array.isArray(source.artifacts) || source.artifacts.length > 20) return undefined
  const artifacts = source.artifacts.map(publicArtifact)
  const blocks: Array<Record<string, unknown>> = []
  if (artifacts.some((item) => !item)) return undefined
  for (const raw of source.blocks) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined
    const block = raw as Record<string, unknown>
    if (exactObjectKeys(block, ["type", "text"]) && block.type === "text" && typeof block.text === "string" && block.text === publicStreamText(block.text)) blocks.push({ type: "text", text: block.text })
    else if (exactObjectKeys(block, ["type", "artifact"]) && block.type === "artifact" && publicArtifact(block.artifact)) blocks.push({ type: "artifact", artifact: publicArtifact(block.artifact) })
    else return undefined
  }
  const receipt = publicTerminalReceipt(source.receipt, companyId, conversationId)
  return receipt ? { schema: source.schema, ...identity, status: source.status, answer: source.answer, blocks, artifacts, receipt } : undefined
}

function publicApprovalRequest(value: unknown, companyId: string, conversationId: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined
  const source = value as Record<string, unknown>
  const identity = publicEventIdentity(source, companyId, conversationId)
  const keys = ["schema", "company_id", "conversation_id", "workflow_id", "server_sequence", "event_id", "phase", "answer", "blocks", "action_reference", "action_count", "connectors", "actions", "approval_summary", "choices"]
  const actionCount = typeof source.action_count === "number"
    && Number.isSafeInteger(source.action_count)
    && source.action_count >= 1
    && source.action_count <= 8
    ? source.action_count
    : undefined
  const connectors = Array.isArray(source.connectors)
    ? source.connectors.filter((item): item is string => typeof item === "string")
    : []
  const choices = Array.isArray(source.choices) ? source.choices : []
  const actions = Array.isArray(source.actions) ? source.actions : []
  const actionConnectors = actions.map((action) => action && typeof action === "object" && !Array.isArray(action)
    && typeof (action as Record<string, unknown>).connector === "string"
    ? String((action as Record<string, unknown>).connector)
    : "")
  const projectedConnectors = [...new Set(actionConnectors)]
  const connectorsMatchActions = connectors.length === actionConnectors.length
    && connectors.every((connector, index) => connector === actionConnectors[index])
  const connectorsMatchCollapsedSingleProvider = projectedConnectors.length === 1
    && connectors.length === 1
    && connectors[0] === projectedConnectors[0]
  const approvalSummary = source.approval_summary && typeof source.approval_summary === "object" && !Array.isArray(source.approval_summary)
  if (
    !exactObjectKeys(source, keys)
    || !identity
    || source.schema !== "company_brain.portal_approval.v1"
    || source.phase !== "approval_required"
    || typeof source.answer !== "string"
    || !source.answer.trim()
    || source.answer !== publicStreamText(source.answer)
    || !Array.isArray(source.blocks)
    || source.blocks.length !== 0
    || typeof source.action_reference !== "string"
    || !/^actref_[A-Za-z0-9_-]{32,128}$/.test(source.action_reference)
    || actionCount === undefined
    || connectors.length < 1
    || connectors.length > 3
    || connectors.length !== (source.connectors as unknown[]).length
    || connectors.some((connector) => !/^[a-z][a-z0-9_]{0,31}$/.test(connector))
    || actions.length !== actionCount
    || actionConnectors.some((connector) => !/^[a-z][a-z0-9_]{0,31}$/.test(connector))
    || (!connectorsMatchActions && !connectorsMatchCollapsedSingleProvider)
    || !approvalSummary
    || choices.length !== 2
    || choices[0] !== "Approve"
    || choices[1] !== "Cancel"
  ) return undefined
  return {
    schema: source.schema,
    ...identity,
    phase: source.phase,
    answer: source.answer,
    action_count: actionCount,
    connectors: projectedConnectors,
    choices: ["Approve", "Cancel"],
  }
}

function projectNativeEvent(eventName: string, value: unknown, expectedCompanyId: string, expectedConversationId: string) {
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
    const request = publicApprovalRequest(source, expectedCompanyId, expectedConversationId)
    return request ? { event: "approval.request", data: request } : null
  }
  if (["stanley.completed", "stanley.failed", "stanley.cancelled", "stanley.unknown"].includes(eventName)) {
    const result = publicPortalResult(source, expectedCompanyId, expectedConversationId)
    const validStatus = eventName === "stanley.completed"
      ? result?.status === "completed"
      : eventName === "stanley.failed"
        ? result?.status === "failed" || result?.status === "partial"
        : eventName === "stanley.cancelled"
          ? result?.status === "cancelled"
          : result?.status === "unknown_outcome"
    return result && validStatus ? { event: eventName, data: result } : null
  }
  if (eventName === "error") return { event: "error", data: { message: "Company Brain could not finish that request." } }
  if (eventName === "done") {
    const identity = publicEventIdentity(source, expectedCompanyId, expectedConversationId)
    return identity && exactObjectKeys(source, ["company_id", "conversation_id", "workflow_id", "server_sequence", "event_id"])
      ? { event: "done", data: identity }
      : null
  }
  return null
}

type ProjectedNativeEvent = { event: string; data: Record<string, unknown> }
type NativeStreamAdmissionState = { terminal: PublicEventIdentity | null; done: boolean }

function sameEventIdentity(left: Record<string, unknown>, right: PublicEventIdentity) {
  return left.company_id === right.company_id
    && left.conversation_id === right.conversation_id
    && left.workflow_id === right.workflow_id
    && left.server_sequence === right.server_sequence
    && left.event_id === right.event_id
}

function admitProjectedNativeEvent(state: NativeStreamAdmissionState, projected: ProjectedNativeEvent) {
  if (state.done) return false
  const terminalEvent = projected.event === "approval.request"
    || ["stanley.completed", "stanley.failed", "stanley.cancelled", "stanley.unknown"].includes(projected.event)
  if (projected.event === "done") {
    if (!state.terminal || !sameEventIdentity(projected.data, state.terminal)) return false
    state.done = true
    return true
  }
  if (state.terminal) return false
  if (terminalEvent) {
    state.terminal = {
      company_id: String(projected.data.company_id),
      conversation_id: String(projected.data.conversation_id),
      workflow_id: String(projected.data.workflow_id),
      server_sequence: 3,
      event_id: String(projected.data.event_id),
    }
  }
  return true
}

async function authorizedNativeStream(response: Response, sessionKey: string, companyId: string, conversationId: string) {
  if (!response.body) return null
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  const stream = new TransformStream<Uint8Array, Uint8Array>()
  const writer = stream.writable.getWriter()
  const admissionState: NativeStreamAdmissionState = { terminal: null, done: false }

  const writeFrame = async (frame: string) => {
    if (!frame.trim()) return
    const eventMatch = frame.match(/(?:^|\n)event:\s*([^\r\n]+)/)
    const dataLines = frame.split(/\r?\n/).filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trimStart())
    if (!eventMatch || !dataLines.length) return
    let payload: unknown = {}
    try {
      payload = JSON.parse(dataLines.join("\n"))
    } catch {
      return
    }
    const projected = projectNativeEvent(eventMatch[1].trim(), payload, companyId, conversationId)
    if (!projected || !admitProjectedNativeEvent(admissionState, projected)) return
    if (["stanley.completed", "stanley.failed", "stanley.cancelled", "stanley.unknown"].includes(projected.event)) {
      const artifactIds = artifactIdsFromChatResponse(projected.data)
      if (artifactIds.length) {
        try {
          grantPortalArtifactAccess(portalSessionStoreDir(), sessionKey, artifactIds)
        } catch {
          await reader.cancel()
          return
        }
      }
    }
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
          break
        }
        buffer += decoder.decode(next.value, { stream: true })
        const frames = buffer.split(/\r?\n\r?\n/)
        buffer = frames.pop() ?? ""
        for (const frame of frames) await writeFrame(frame)
      }
    } catch {
      if (!admissionState.done) {
        try {
          await writer.write(encoder.encode(
            `event: error\ndata: ${JSON.stringify({ message: "Company Brain stream was interrupted. Check recent activity before trying again." })}\n\n`,
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
  if (session.role === "outsider" && path.startsWith("brain/")) {
    return NextResponse.json(
      { errorCode: "permission_denied", error: "This account does not have permission for that request." },
      { status: 403, headers: securityHeaders() },
    )
  }
  const baseUrl = upstreamBaseUrl(session.companyId)
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
  const timeoutMs = nativeStreamRequest || path === "brain/chat" ? 900000 : path === "brain/uploads" ? 60000 : 20000
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
    const conversationId = safeConversationId(path.split("/")[2] ?? "")
    const readable = conversationId ? await authorizedNativeStream(response, session.sessionKey, session.companyId, conversationId) : null
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
