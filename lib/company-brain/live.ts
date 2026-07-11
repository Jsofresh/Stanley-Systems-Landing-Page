import type {
  CompanyBrainAttachment,
  SendCompanyBrainMessageInput,
  SendCompanyBrainMessageResponse,
} from "@/lib/company-brain/types"
import {
  mapCompanyBrainResponseBlocks,
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
      blocks: mapCompanyBrainResponseBlocks(data),
    },
  }
}

export async function confirmCompanyBrainAction(
  conversationId: string,
  actionReference: string,
): Promise<SendCompanyBrainMessageResponse> {
  const data = await fetchJson<BrainChatResponse>("/actions/confirm", {
    method: "POST",
    headers: { "x-stanley-csrf": "portal-action" },
    body: JSON.stringify({ action_reference: actionReference, conversation_id: conversationId }),
  })
  return {
    conversationId,
    message: {
      id: `assistant-approval-${Date.now()}`,
      role: "assistant",
      createdAt: new Date().toISOString(),
      blocks: mapCompanyBrainResponseBlocks(data),
    },
  }
}
