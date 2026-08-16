import {
  companyBrainStreamRequestBody,
  type CompanyBrainAttachment,
  type SendCompanyBrainMessageInput,
} from "@/lib/company-brain/types"
import {
  userSafeErrorMessage,
  type BrainChatResponse,
} from "@/lib/company-brain/response-mapper"

const BRAIN_BASE_URL = "/api/company-brain"

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

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), init?.method === "POST" ? 180000 : 12000)
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

export type NativeSessionSummary = {
  id: string
  title: string
  last_active?: number
  message_count?: number
  preview?: string
}

export type NativeSessionMessage = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: number
}

export type NativeStreamEvent = {
  event: string
  data: Record<string, unknown>
}

export async function getCompanyBrainSessions(): Promise<NativeSessionSummary[]> {
  const data = await fetchJson<{ data?: NativeSessionSummary[] }>("/brain/sessions")
  return Array.isArray(data.data) ? data.data : []
}

export async function getCompanyBrainSessionMessages(conversationId: string): Promise<NativeSessionMessage[]> {
  const data = await fetchJson<{ data?: NativeSessionMessage[] }>(`/brain/sessions/${encodeURIComponent(conversationId)}/messages`)
  return Array.isArray(data.data) ? data.data : []
}

export async function cancelCompanyBrainSession(conversationId: string) {
  return fetchJson<{ status: string }>(`/brain/sessions/${encodeURIComponent(conversationId)}/cancel`, {
    method: "POST",
    body: JSON.stringify({ conversation_id: conversationId }),
  })
}

export type NativeCompletion = BrainChatResponse & {
  schema: "company_brain.portal_result.v1"
  company_id: string
  conversation_id: string
  workflow_id: string
  server_sequence: 3
  event_id: string
  status: "completed" | "partial" | "failed" | "cancelled" | "unknown_outcome"
  receipt: NativeTerminalReceipt
}

export type NativePendingApproval = BrainChatResponse & {
  schema: "company_brain.portal_approval.v1"
  company_id: string
  conversation_id: string
  workflow_id: string
  server_sequence: 3
  event_id: string
  phase: "approval_required"
  action_reference: string
  action_count: number
  connectors: string[]
  choices: ["Approve", "Cancel"]
}

export type NativeStreamResult = NativeCompletion | NativePendingApproval

export type NativeTerminalReceipt = {
  schema: "company_brain.public_turn_receipt.v1"
  binding: { company_id: string; conversation_id: string }
  source: "conversation" | "provider_action_batch"
  status: "not_applicable" | "read_verified" | "executed_verified" | "already_completed" | "partial" | "failed_before_dispatch" | "failed" | "unknown_outcome_reconciliation_required"
  connectors: Array<"jobber" | "quickbooks">
  action_count: number
  verified_action_count: number
  mutation_dispatch_count: number
  completed_batch_replay: boolean
  provider_readback_status: "verified" | "unavailable" | "not_required"
  provider_write_claimed: boolean
  safe_summary: string[]
  action_reference?: string
}

export async function streamCompanyBrainMessage(
  input: SendCompanyBrainMessageInput,
  onEvent?: (event: NativeStreamEvent) => void,
): Promise<NativeStreamResult> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 900000)
  let response: Response
  try {
    response = await fetch(`${BRAIN_BASE_URL}/brain/sessions/${encodeURIComponent(input.conversationId)}/chat/stream`, {
      method: "POST",
      cache: "no-store",
      signal: controller.signal,
      headers: { "content-type": "application/json", accept: "text/event-stream" },
      body: JSON.stringify(companyBrainStreamRequestBody(input)),
    })
  } catch {
    window.clearTimeout(timeout)
    throw new Error("Company Brain is unavailable, and the request outcome is unknown. Check recent activity before trying again.")
  }
  if (!response.ok || !response.body) {
    const body = await response.json().catch(() => null) as { errorCode?: string; error?: string } | null
    throw new Error(userSafeErrorMessage(body?.errorCode, body?.error))
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  let completion: NativeStreamResult | null = null
  let terminalIdentity: Pick<NativeCompletion, "company_id" | "conversation_id" | "workflow_id" | "server_sequence" | "event_id"> | null = null
  let sawDone = false
  const consume = (chunk: string) => {
    buffer += chunk
    const frames = buffer.split(/\r?\n\r?\n/)
    buffer = frames.pop() ?? ""
    for (const frame of frames) {
      let eventName = "message"
      const dataLines: string[] = []
      for (const line of frame.split(/\r?\n/)) {
        if (line.startsWith("event:")) eventName = line.slice(6).trim()
        if (line.startsWith("data:")) dataLines.push(line.slice(5).trimStart())
      }
      if (!dataLines.length) continue
      let data: Record<string, unknown>
      try {
        data = JSON.parse(dataLines.join("\n")) as Record<string, unknown>
      } catch {
        continue
      }
      if (sawDone) throw new Error("Company Brain returned an event after its completion marker.")
      if (eventName === "approval.request") {
        const keys = ["schema", "company_id", "conversation_id", "workflow_id", "server_sequence", "event_id", "phase", "answer", "action_count", "connectors", "choices"]
        if (completion || Object.keys(data).length !== keys.length || Object.keys(data).some((key) => !keys.includes(key))
          || data.schema !== "company_brain.portal_approval.v1" || data.company_id !== input.companyId
          || data.conversation_id !== input.conversationId || data.workflow_id !== input.conversationId
          || data.server_sequence !== 3 || typeof data.event_id !== "string" || data.phase !== "approval_required"
          || typeof data.answer !== "string" || !data.answer.trim()
          || typeof data.action_count !== "number" || !Number.isSafeInteger(data.action_count) || data.action_count < 1 || data.action_count > 8
          || !Array.isArray(data.connectors) || data.connectors.length < 1 || data.connectors.some((connector) => typeof connector !== "string")
          || !Array.isArray(data.choices) || data.choices.length !== 2 || data.choices[0] !== "Approve" || data.choices[1] !== "Cancel") {
          throw new Error("Company Brain returned a mismatched approval event.")
        }
        completion = data as unknown as NativePendingApproval
        terminalIdentity = completion
      }
      if (["stanley.completed", "stanley.failed", "stanley.cancelled", "stanley.unknown"].includes(eventName)) {
        if (completion || data.company_id !== input.companyId || data.conversation_id !== input.conversationId
          || data.workflow_id !== input.conversationId || data.server_sequence !== 3 || typeof data.event_id !== "string") {
          throw new Error("Company Brain returned a mismatched terminal event.")
        }
        const validStatus = eventName === "stanley.completed" ? data.status === "completed"
          : eventName === "stanley.failed" ? data.status === "failed" || data.status === "partial"
            : eventName === "stanley.cancelled" ? data.status === "cancelled" : data.status === "unknown_outcome"
        if (!validStatus) throw new Error("Company Brain returned a mismatched terminal status.")
        completion = data as unknown as NativeCompletion
        terminalIdentity = completion
      }
      if (eventName === "done") {
        const keys = ["company_id", "conversation_id", "workflow_id", "server_sequence", "event_id"]
        if (!terminalIdentity || Object.keys(data).length !== keys.length || Object.keys(data).some((key) => !keys.includes(key))
          || keys.some((key) => data[key] !== terminalIdentity?.[key as keyof typeof terminalIdentity])) {
          throw new Error("Company Brain returned a stale or mismatched completion marker.")
        }
        sawDone = true
      }
      onEvent?.({ event: eventName, data })
      if (eventName === "error") throw new Error(userSafeErrorMessage("runtime_failed", typeof data.message === "string" ? data.message : undefined))
    }
  }
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      consume(decoder.decode(value, { stream: true }))
    }
    consume(decoder.decode())
  } finally {
    window.clearTimeout(timeout)
  }
  if (!completion || !sawDone) {
    throw new Error("Company Brain could not finish that request. Check recent activity before trying again.")
  }
  return completion
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
