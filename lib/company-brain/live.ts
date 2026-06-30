import type {
  Artifact,
  CompanyBrainAttachment,
  CompanyBrainBlock,
  PreparedAction,
  SendCompanyBrainMessageInput,
  SendCompanyBrainMessageResponse,
  SourceChip,
} from "@/lib/company-brain/types"

const BRAIN_BASE_URL = "/api/company-brain"

type BrainSourceChip = {
  connector?: string
  record_type?: string
  source_id?: string
  label?: string
  brief_source?: string
}

type BrainArtifact = {
  id: string
  title: string
  kind: Artifact["kind"]
  status: Artifact["status"]
  description: string
  fileName?: string
  extension?: Artifact["extension"]
  mimeType?: string
  downloadUrl?: string
}

type BrainBlock =
  | { type: "text"; text: string }
  | { type: "artifact"; artifact?: BrainArtifact; [key: string]: unknown }
  | { type: "error"; code?: string; message?: string; title?: string }
  | { type: "attachment"; attachment?: CompanyBrainAttachment; [key: string]: unknown }

type BrainChatResponse = {
  answer: string
  blocks?: BrainBlock[]
  artifacts?: BrainArtifact[]
  errorCode?: string
  brief_sources?: string[]
  source_chips?: BrainSourceChip[]
  suggested_action?: {
    type?: string
    status?: string
    execution_mode?: string
    draft?: string
  }
  proof_id?: string
  usage_event_id?: string
  retrieval_metadata?: {
    source_record_count?: number
    source_hit_count?: number
    planner?: {
      intent?: string
      action_plan?: string
    }
  }
  model_route?: {
    decision?: string
    provider?: string
    model?: string
    reason?: string
    external_model_call_attempted?: boolean
    external_model_call_succeeded?: boolean
    fallback_used?: boolean
    source_snippet_count?: number
    raw_records_sent_to_model?: boolean
    external_side_effects_allowed?: boolean
    action_policy?: string
  }
}

export type BrainSummary = {
  runtime_status: string
  runtime_version: string
  source_record_counts?: Record<string, number>
  raw_customer_data_included?: boolean
  usage_event_count?: number
}

export type NeedsAttentionCard = {
  card_id: string
  priority: string
  type: string
  title: string
  summary: string
  next_safe_action: string
  brief_sources?: string[]
  source_ids?: string[]
  status: string
}

export type NeedsAttentionResponse = {
  endpoint_scope: string
  control_plane_safe: boolean
  cards: NeedsAttentionCard[]
  card_count: number
  source_record_counts?: Record<string, number>
  raw_customer_data_included?: boolean
}

function text(id: string, value: string): CompanyBrainBlock {
  return { type: "text", id, text: value }
}

function systemLabel(connector?: string): SourceChip["system"] {
  const value = (connector ?? "").toLowerCase()
  if (value.includes("quick") || value === "qbo") return "QBO"
  if (value.includes("jobber")) return "Jobber"
  if (value.includes("gmail") || value.includes("email")) return "Email"
  if (value.includes("file")) return "Files"
  if (value.includes("crm")) return "CRM"
  return "Notes"
}

function toSourceChip(source: BrainSourceChip, index: number): SourceChip {
  return {
    id: source.source_id || `source-${index}`,
    label: source.label || source.source_id || "Source record",
    detail: [source.brief_source, source.record_type, source.source_id].filter(Boolean).join(" · "),
    system: systemLabel(source.connector),
  }
}

function titleFromAction(type?: string) {
  if (!type || type === "none") return "Prepared office review"
  return type
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function toPreparedAction(response: BrainChatResponse): PreparedAction | null {
  const action = response.suggested_action
  if (!action || action.type === "none" || action.type === "clarify_request" || action.type === "clarify_entity" || action.type === "safety_refusal") return null
  return {
    id: `action-${response.proof_id ?? Date.now()}`,
    title: titleFromAction(action.type),
    description: `${action.status === "prepared_not_sent" ? "Prepared, not sent." : action.status ?? "Prepared."} ${action.execution_mode === "approval_required_or_manual" ? "A person must review before anything leaves the office." : "Review required."}`,
    status: action.status === "needs_review" ? "needs_review" : "prepared_not_sent",
    ctaLabel: "Review action",
    preview: action.draft || "Prepared for office review only. Nothing was sent or written back.",
  }
}

function userSafeErrorMessage(code?: string, fallback?: string) {
  const messages: Record<string, string> = {
    upload_missing_bytes: "I received the file name, but not the file contents. Please reattach it.",
    unsupported_file_type: "I can read screenshots, PDFs, CSVs, spreadsheets, docs, and text files. This file type is not supported yet.",
    file_too_large: "That file is too large for this chat. Try a smaller file or split it into smaller parts.",
    extraction_failed: "I received the file, but couldn’t read its contents yet.",
    artifact_failed: "I found the records, but couldn’t create the PDF file yet. Nothing was changed.",
    runtime_failed: "The company agent is unavailable right now. Nothing was created or changed.",
    company_agent_unavailable: "The company agent is unavailable right now. Nothing was created or changed.",
    permission_denied: "I can’t access that from this role.",
  }
  return (code ? messages[code] : undefined) ?? fallback ?? messages.runtime_failed
}

function toArtifact(artifact: BrainArtifact): Artifact {
  return {
    id: artifact.id,
    title: artifact.title,
    kind: artifact.kind,
    status: artifact.status,
    description: artifact.description,
    fileName: artifact.fileName,
    extension: artifact.extension,
    mimeType: artifact.mimeType,
    downloadUrl: artifact.downloadUrl?.startsWith("/api/company-brain/") ? artifact.downloadUrl : undefined,
    file: artifact.fileName && artifact.extension && artifact.mimeType ? {
      fileName: artifact.fileName,
      extension: artifact.extension === "csv" ? "txt" : artifact.extension,
      mimeType: artifact.mimeType,
      title: artifact.title,
      plainText: artifact.description,
    } : undefined,
  }
}

function toBlocks(response: BrainChatResponse): CompanyBrainBlock[] {
  const blocks: CompanyBrainBlock[] = []
  const seenArtifacts = new Set<string>()
  const rawBlocks = response.blocks ?? []
  rawBlocks.forEach((block, index) => {
    if (block.type === "text" && typeof block.text === "string") {
      blocks.push(text(`answer-${response.proof_id ?? Date.now()}-${index}`, block.text))
    } else if (block.type === "artifact") {
      const artifact = block.artifact ?? (block.id ? block as unknown as BrainArtifact : undefined)
      if (artifact?.id) {
        seenArtifacts.add(artifact.id)
        blocks.push({ type: "artifact", id: `artifact-${artifact.id}`, artifact: toArtifact(artifact) })
      }
    } else if (block.type === "error") {
      const code = block.code
      blocks.push({ type: "error", id: `error-${index}`, title: "Company Brain couldn’t finish that", message: userSafeErrorMessage(typeof code === "string" ? code : undefined, block.message) })
    } else if (block.type === "attachment" && block.attachment) {
      blocks.push({ type: "attachment", id: `attachment-${block.attachment.id}`, attachment: block.attachment })
    }
  })
  ;(response.artifacts ?? []).forEach((artifact) => {
    if (!seenArtifacts.has(artifact.id)) blocks.push({ type: "artifact", id: `artifact-${artifact.id}`, artifact: toArtifact(artifact) })
  })
  if (!blocks.some((block) => block.type === "text") && response.answer) {
    blocks.unshift(text(`answer-${response.proof_id ?? Date.now()}`, response.answer))
  }
  if (!blocks.length) {
    blocks.push({ type: "error", id: `error-${Date.now()}`, title: "Company Brain couldn’t finish that", message: userSafeErrorMessage(response.errorCode) })
  }
  return blocks
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), init?.method === "POST" ? 90000 : 12000)
  const headers = new Headers(init?.headers)
  if (!(init?.body instanceof FormData) && !headers.has("content-type")) headers.set("content-type", "application/json")
  const response = await fetch(`${BRAIN_BASE_URL}${path}`, {
    ...init,
    signal: controller.signal,
    headers,
  }).finally(() => window.clearTimeout(timeout))
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { errorCode?: string; error?: string } | null
    throw new Error(userSafeErrorMessage(body?.errorCode, body?.error))
  }
  return (await response.json()) as T
}

export async function getCompanyBrainSummary(): Promise<BrainSummary> {
  return fetchJson<BrainSummary>("/control/summary")
}

export async function getNeedsAttention(): Promise<NeedsAttentionResponse> {
  return fetchJson<NeedsAttentionResponse>("/control/needs-attention")
}

export async function uploadCompanyBrainFiles(conversationId: string, files: File[]): Promise<CompanyBrainAttachment[]> {
  if (!files.length) return []
  const form = new FormData()
  form.set("conversation_id", conversationId)
  files.forEach((file) => form.append("file", file, file.name))
  const data = await fetchJson<{ attachments: CompanyBrainAttachment[] }>("/brain/uploads", {
    method: "POST",
    body: form,
  })
  return data.attachments.map((attachment) => ({
    ...attachment,
    type: attachment.type ?? attachment.mimeType,
  }))
}

export async function sendCompanyBrainMessage(
  input: SendCompanyBrainMessageInput,
): Promise<SendCompanyBrainMessageResponse> {
  const data = await fetchJson<BrainChatResponse>("/brain/chat", {
    method: "POST",
    body: JSON.stringify({
      message: input.message,
      attachments: input.attachments ?? [],
      conversation_id: input.conversationId,
    }),
  })

  return {
    conversationId: input.conversationId,
    message: {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      createdAt: new Date().toISOString(),
      blocks: toBlocks(data),
    },
  }
}
