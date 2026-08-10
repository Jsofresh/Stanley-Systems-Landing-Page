import type {
  CompanyBrainAttachment,
  SendCompanyBrainMessageInput,
  SupportedActionMatrix,
  WorkflowAdapterOperation,
  WorkflowAdapterState,
  WorkflowApproval,
} from "@/lib/company-brain/types"
import {
  userSafeErrorMessage,
  type BrainChatResponse,
} from "@/lib/company-brain/response-mapper"
import { completionToWorkflowReceipt } from "@/lib/company-brain/workflow"
import type { WorkflowProviderReadback, WorkflowReceipt } from "@/lib/company-brain/types"

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

type DurableWorkflowPayload = {
  schema: "stanley.workflow.hydration.v1"
  workflow_id: string
  conversation_id: string
  server_sequence: number
  event_id: string
  phase: WorkflowAdapterState["phase"]
  operation: WorkflowAdapterOperation
  updated_at: string
  history: Array<{ server_sequence: number; at: string; phase: WorkflowAdapterState["phase"]; label: string; detail?: string }>
  approval?: {
    approval_ref: string
    approval_version: number
    binding: string
    action_count: number
    connectors: string[]
    actions: Array<{ order: number; action_summary: string; target: string; consequence_class: string; approval_class: string; step_scope: string }>
    choices: ["Approve", "Cancel"]
  }
  supported_next_actions?: WorkflowAdapterOperation[]
  status?: "completed" | "failed" | "cancelled"
  answer?: string
  artifacts?: BrainChatResponse["artifacts"]
  provider_verification?: BrainChatResponse["provider_verification"]
  work_result?: BrainChatResponse["work_result"]
}

export async function getCompanyBrainSessions(): Promise<NativeSessionSummary[]> {
  const data = await fetchJson<{ data?: NativeSessionSummary[] }>("/brain/sessions")
  return Array.isArray(data.data) ? data.data : []
}

export async function getCompanyBrainSessionMessages(conversationId: string): Promise<NativeSessionMessage[]> {
  const data = await fetchJson<{ data?: NativeSessionMessage[] }>(`/brain/sessions/${encodeURIComponent(conversationId)}/messages`)
  return Array.isArray(data.data) ? data.data : []
}

export async function getCompanyBrainWorkflowStatus(conversationId: string) {
  return fetchJson<DurableWorkflowPayload>(`/brain/sessions/${encodeURIComponent(conversationId)}/workflow/status`)
}

export async function getCompanyBrainWorkflowResult(conversationId: string) {
  return fetchJson<DurableWorkflowPayload>(`/brain/sessions/${encodeURIComponent(conversationId)}/workflow/result`)
}

function approvalFromPayload(value: DurableWorkflowPayload["approval"]): WorkflowApproval | undefined {
  if (!value || value.actions.length !== value.action_count) return undefined
  return {
    approvalRef: value.approval_ref,
    approvalVersion: value.approval_version,
    binding: value.binding,
    actionCount: value.action_count,
    systems: value.connectors.map((system) => system === "quickbooks" ? "QuickBooks" : system === "jobber" ? "Jobber" : "Connected records"),
    actions: value.actions.map((action) => ({ order: action.order, summary: action.action_summary, target: action.target, consequenceClass: action.consequence_class, approvalClass: action.approval_class, stepScope: action.step_scope })),
    choices: ["Approve", "Cancel"],
  }
}

export async function hydrateCompanyBrainWorkflow(conversationId: string, tenantId: string): Promise<WorkflowAdapterState> {
  const status = await getCompanyBrainWorkflowStatus(conversationId)
  const historyCoherent = Array.isArray(status.history) && status.history.every((item, index) => Number.isSafeInteger(item.server_sequence)
    && item.server_sequence <= status.server_sequence
    && (index === 0 || item.server_sequence > status.history[index - 1].server_sequence))
  if (status.schema !== "stanley.workflow.hydration.v1" || status.workflow_id !== conversationId || status.conversation_id !== conversationId || !Number.isSafeInteger(status.server_sequence) || status.server_sequence < 1 || !status.event_id || !historyCoherent) {
    throw new Error("The durable workflow status was invalid.")
  }
  let receipt: WorkflowReceipt | undefined
  if (["completed", "partial", "failed", "cancelled", "reconciliation_required", "unknown_outcome"].includes(status.phase)) {
    try {
      const result = await getCompanyBrainWorkflowResult(conversationId)
      if (result.schema !== "stanley.workflow.hydration.v1" || result.workflow_id !== status.workflow_id || result.conversation_id !== conversationId || result.server_sequence < status.server_sequence || !result.event_id) throw new Error("stale result")
      receipt = completionToWorkflowReceipt(result, { workflowId: conversationId, tenantId })
    } catch {
      receipt = undefined
    }
  }
  const approval = approvalFromPayload(status.approval)
  const terminalWithoutReceipt = ["completed", "partial", "failed", "cancelled"].includes(status.phase) && !receipt
  const approvalWithoutDisclosure = status.phase === "approval_required" && !approval
  return {
    schema: "stanley.workflow.adapter.v1",
    workflowId: status.workflow_id,
    conversationId: status.conversation_id,
    tenantId,
    operation: status.operation,
    phase: receipt?.resultSummary.status === "unknown_outcome" || terminalWithoutReceipt || approvalWithoutDisclosure ? "unknown_outcome" : status.phase,
    sequence: status.server_sequence,
    eventId: status.event_id,
    updatedAt: status.updated_at,
    history: status.history.map((item) => ({ id: `server-${item.server_sequence}`, sequence: item.server_sequence, at: item.at, phase: item.phase, label: item.label, detail: item.detail })),
    approval,
    receipt,
    notice: !receipt && ["completed", "partial", "failed", "reconciliation_required", "unknown_outcome"].includes(status.phase) ? "The final result still needs confirmation." : undefined,
    supportedNextActions: status.supported_next_actions,
  }
}

export async function getCompanyBrainSupportedActions(runtimeVersion: string): Promise<SupportedActionMatrix> {
  const value = await fetchJson<{ schema: string; state: SupportedActionMatrix["state"]; runtime_version: string; matrix_version: string; actions: SupportedActionMatrix["actions"] }>("/brain/supported-actions")
  if (value.schema !== "stanley.supported_actions.v1" || !value.matrix_version || !Array.isArray(value.actions)) throw new Error("Supported workflows could not be verified.")
  return {
    schema: "stanley.supported_actions.v1",
    state: value.runtime_version && value.runtime_version === runtimeVersion ? value.state : "stale_version",
    runtimeVersion: value.runtime_version,
    matrixVersion: value.matrix_version,
    actions: value.actions,
  }
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
  result_summary?: WorkflowReceipt["resultSummary"]
  provider_readback?: WorkflowProviderReadback[]
  reconciliation_status?: WorkflowReceipt["reconciliationStatus"]
  explanation?: string
  workflow_receipt?: WorkflowReceipt
  workflow_id?: string
  server_sequence?: number
  event_id?: string
}

export async function streamCompanyBrainMessage(
  input: SendCompanyBrainMessageInput,
  onEvent?: (event: NativeStreamEvent) => void,
): Promise<NativeCompletion> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 900000)
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
        approval_ref: input.approvalDecision?.approvalRef,
        approval_version: input.approvalDecision?.approvalVersion,
        approval_binding: input.approvalDecision?.approvalBinding,
        approval_decision: input.approvalDecision?.decision,
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
  let lastServerSequence = input.lastServerSequence ?? 0
  let lastEventId = input.lastEventId ?? ""
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
      if (!["done", "error"].includes(eventName)) {
        const workflowId = typeof data.workflow_id === "string" ? data.workflow_id : ""
        const serverSequence = typeof data.server_sequence === "number" && Number.isSafeInteger(data.server_sequence) ? data.server_sequence : 0
        const eventId = typeof data.event_id === "string" ? data.event_id : ""
        if (workflowId !== input.conversationId || serverSequence <= lastServerSequence || !eventId || eventId === lastEventId) continue
        lastServerSequence = serverSequence
        lastEventId = eventId
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
  const completed = completion as NativeCompletion
  const workflowReceipt = completionToWorkflowReceipt(completed, {
    workflowId: input.conversationId,
    tenantId: input.companyId,
  })
  return {
    ...completed,
    result_summary: workflowReceipt?.resultSummary,
    provider_readback: workflowReceipt?.providerReadback,
    reconciliation_status: workflowReceipt?.reconciliationStatus,
    explanation: workflowReceipt?.explanation,
    workflow_receipt: workflowReceipt,
  }
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
