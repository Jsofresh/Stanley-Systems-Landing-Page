import type {
  CompanyBrainAttachment,
  SendCompanyBrainMessageInput,
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
  object?: string
  status?: "completed" | "failed" | "cancelled"
  usage?: Record<string, unknown>
  conversation_id?: string
}

export async function streamCompanyBrainMessage(
  input: SendCompanyBrainMessageInput,
  onEvent?: (event: NativeStreamEvent) => void,
): Promise<NativeCompletion> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 480000)
  let response: Response
  try {
    response = await fetch(`${BRAIN_BASE_URL}/brain/sessions/${encodeURIComponent(input.conversationId)}/chat/stream`, {
      method: "POST",
      cache: "no-store",
      signal: controller.signal,
      headers: { "content-type": "application/json", accept: "text/event-stream" },
      body: JSON.stringify({
        conversation_id: input.conversationId,
        message: input.message,
        attachments: input.attachments ?? [],
      }),
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
  let answer = ""
  let completion: BrainChatResponse | null = null
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
      onEvent?.({ event: eventName, data })
      if (eventName === "assistant.delta") answer += typeof data.delta === "string" ? data.delta : ""
      if (eventName === "stanley.completed") completion = data as unknown as BrainChatResponse
      if (eventName === "done") sawDone = true
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
