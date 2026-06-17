import type {
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

type BrainChatResponse = {
  answer: string
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
  if (!action || action.type === "none") return null
  return {
    id: `action-${response.proof_id ?? Date.now()}`,
    title: titleFromAction(action.type),
    description: `${action.status === "prepared_not_sent" ? "Prepared, not sent." : action.status ?? "Prepared."} ${action.execution_mode === "approval_required_or_manual" ? "A person must review before anything leaves the office." : "Review required."}`,
    status: action.status === "needs_review" ? "needs_review" : "prepared_not_sent",
    ctaLabel: "Review action",
    preview: action.draft || "Prepared for office review only. Nothing was sent or written back.",
  }
}

function routeLine(response: BrainChatResponse) {
  const route = response.model_route
  if (!route) return "Model route: unavailable."
  const provider = route.provider === "deepseek" ? "DeepSeek V4 Pro" : "deterministic fallback"
  const attempted = route.external_model_call_attempted ? "attempted" : "not attempted"
  const succeeded = route.external_model_call_succeeded ? "succeeded" : route.fallback_used ? "fell back" : "not used"
  const snippets = route.source_snippet_count ?? 0
  return `Model route: ${provider} · ${attempted} · ${succeeded} · ${snippets} bounded source snippet${snippets === 1 ? "" : "s"} · raw records sent: ${route.raw_records_sent_to_model ? "yes" : "no"} · external side effects: ${route.external_side_effects_allowed ? "allowed" : "disabled"}.`
}

function toBlocks(response: BrainChatResponse): CompanyBrainBlock[] {
  const blocks: CompanyBrainBlock[] = [text(`answer-${response.proof_id ?? Date.now()}`, response.answer)]
  const sourceChips = (response.source_chips ?? []).map(toSourceChip)
  if (sourceChips.length) {
    blocks.push({ type: "sources", id: `sources-${response.proof_id ?? Date.now()}`, title: "Live source records", sources: sourceChips })
  }
  const action = toPreparedAction(response)
  if (action) {
    blocks.push({ type: "action", id: `action-${response.proof_id ?? Date.now()}`, action })
  }
  blocks.push(
    text(
      `proof-${response.proof_id ?? Date.now()}`,
      `Proof: ${response.proof_id ?? "not recorded"}. ${routeLine(response)}`,
    ),
  )
  return blocks
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BRAIN_BASE_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  })
  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(`Company Brain API ${response.status}: ${body.slice(0, 180)}`)
  }
  return (await response.json()) as T
}

export async function getCompanyBrainSummary(): Promise<BrainSummary> {
  return fetchJson<BrainSummary>("/control/summary")
}

export async function getNeedsAttention(): Promise<NeedsAttentionResponse> {
  return fetchJson<NeedsAttentionResponse>("/control/needs-attention")
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
