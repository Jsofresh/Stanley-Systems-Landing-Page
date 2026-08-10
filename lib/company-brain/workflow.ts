import type {
  Artifact,
  WorkflowAdapterOperation,
  WorkflowAdapterState,
  WorkflowApproval,
  WorkflowPhase,
  WorkflowProviderReadback,
  WorkflowReceipt,
} from "./types.ts"
import type {
  BrainProviderVerification,
  BrainWorkResult,
} from "./response-mapper.ts"

export type WorkflowAdapterCommand =
  | { operation: "start_work"; workflowId?: string; eventId?: string; sequence: number; at: string; label?: string }
  | { operation: "get_status"; workflowId?: string; eventId?: string; sequence: number; at: string; phase?: WorkflowPhase; label: string; detail?: string; supportedNextActions?: WorkflowAdapterOperation[] }
  | { operation: "approve"; workflowId?: string; eventId?: string; sequence: number; at: string; approval: WorkflowApproval; decision?: "Approve" | "Cancel" }
  | { operation: "cancel"; workflowId?: string; eventId?: string; sequence: number; at: string; confirmed: boolean }
  | { operation: "get_result"; workflowId?: string; eventId?: string; sequence: number; at: string; receipt?: WorkflowReceipt; error?: string }

type ReceiptCompletion = {
  status?: "completed" | "failed" | "cancelled"
  answer?: string
  artifacts?: Artifact[]
  provider_verification?: BrainProviderVerification
  work_result?: BrainWorkResult
}

const internalDisplayPatterns: Array<[RegExp, string]> = [
  [/\bHermes\b/gi, "Stanley"],
  [/\bCodex\b/gi, "Stanley"],
  [/\bOpenClaw\b/gi, "Stanley"],
  [/\bn8n\b/gi, "connected service"],
  [/\bHCP\b/gi, "connected service"],
  [/\bQBO\b/gi, "QuickBooks"],
  [/\b(?:access_token|refresh_token|client_secret|authorization_code)\b/gi, "[redacted]"],
  [/\/(?:opt|home|root|run)\/[A-Za-z0-9_./-]+/g, "[internal location]"],
]

export function safeWorkflowText(value: unknown, fallback = "", maxLength = 2_000) {
  let result = typeof value === "string" ? value : fallback
  result = result.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
  for (const [pattern, replacement] of internalDisplayPatterns) result = result.replace(pattern, replacement)
  return result.slice(0, maxLength)
}

function historyItem(
  operation: WorkflowAdapterOperation,
  phase: WorkflowPhase,
  sequence: number,
  at: string,
  label: string,
  detail?: string,
) {
  return {
    id: `${operation}-${sequence}`,
    sequence,
    at,
    phase,
    label: safeWorkflowText(label, "Workflow update", 180),
    detail: detail ? safeWorkflowText(detail, "", 500) : undefined,
  }
}

export function createWorkflowAdapterState(
  conversationId: string,
  tenantId: string,
  at = new Date().toISOString(),
): WorkflowAdapterState {
  return {
    schema: "stanley.workflow.adapter.v1",
    workflowId: conversationId,
    conversationId,
    tenantId,
    operation: "get_status",
    phase: "idle",
    sequence: 0,
    updatedAt: at,
    history: [],
  }
}

function boundedHistory(state: WorkflowAdapterState, item: WorkflowAdapterState["history"][number]) {
  return [...state.history, item].slice(-24)
}

export function applyWorkflowCommand(
  state: WorkflowAdapterState,
  command: WorkflowAdapterCommand,
): WorkflowAdapterState {
  if (command.workflowId && command.workflowId !== state.workflowId) return state
  if (!Number.isSafeInteger(command.sequence) || command.sequence <= state.sequence) return state
  if (command.eventId && state.eventId === command.eventId) return state

  if (command.operation === "start_work") {
    const phase = "planning" as const
    const item = historyItem(command.operation, phase, command.sequence, command.at, command.label ?? "Request received", "Reviewing the request and preparing a safe plan.")
    return { ...state, operation: command.operation, phase, sequence: command.sequence, eventId: command.eventId, updatedAt: command.at, history: boundedHistory(state, item), approval: undefined, receipt: undefined, notice: undefined }
  }

  if (command.operation === "get_status") {
    const phase = command.phase ?? "running"
    const item = historyItem(command.operation, phase, command.sequence, command.at, command.label, command.detail)
    return { ...state, operation: command.operation, phase, sequence: command.sequence, eventId: command.eventId, updatedAt: command.at, history: boundedHistory(state, item), notice: undefined, supportedNextActions: command.supportedNextActions ?? state.supportedNextActions }
  }

  if (command.operation === "approve") {
    if (command.decision === "Approve") {
      const item = historyItem(command.operation, "running", command.sequence, command.at, "Approval received", "Continuing only the actions shown for approval.")
      return { ...state, operation: command.operation, phase: "running", sequence: command.sequence, eventId: command.eventId, updatedAt: command.at, history: boundedHistory(state, item), approval: undefined, notice: undefined }
    }
    if (command.decision === "Cancel") {
      const item = historyItem(command.operation, "cancelling", command.sequence, command.at, "Cancellation requested", "Waiting for the current outcome to be confirmed.")
      return { ...state, operation: "cancel", phase: "cancelling", sequence: command.sequence, eventId: command.eventId, updatedAt: command.at, history: boundedHistory(state, item), approval: undefined, notice: undefined }
    }
    if (state.approval && command.approval.approvalVersion <= state.approval.approvalVersion) return state
    const item = historyItem(command.operation, "approval_required", command.sequence, command.at, "Approval required", `${command.approval.actionCount} action${command.approval.actionCount === 1 ? "" : "s"} waiting for a decision.`)
    return { ...state, operation: command.operation, phase: "approval_required", sequence: command.sequence, eventId: command.eventId, updatedAt: command.at, history: boundedHistory(state, item), approval: command.approval, notice: undefined }
  }

  if (command.operation === "cancel") {
    const phase = command.confirmed ? "cancelled" : "cancelling"
    const label = command.confirmed ? "Request cancelled" : "Cancellation requested"
    const detail = command.confirmed ? "No further actions will be started." : "The final outcome has not been confirmed yet."
    const item = historyItem(command.operation, phase, command.sequence, command.at, label, detail)
    return { ...state, operation: command.operation, phase, sequence: command.sequence, eventId: command.eventId, updatedAt: command.at, history: boundedHistory(state, item), approval: undefined, notice: undefined }
  }

  if (!command.receipt) {
    const item = historyItem(command.operation, "unknown_outcome", command.sequence, command.at, "Outcome needs confirmation", command.error ?? "The result payload could not be verified.")
    return { ...state, operation: command.operation, phase: "unknown_outcome", sequence: command.sequence, eventId: command.eventId, updatedAt: command.at, history: boundedHistory(state, item), approval: undefined, receipt: undefined, notice: command.error ?? "The result payload could not be verified." }
  }
  const phase: WorkflowPhase = command.receipt.resultSummary.status === "completed"
    ? command.receipt.reconciliationStatus === "reconciliation_required" ? "reconciliation_required" : "completed"
    : command.receipt.resultSummary.status
  const item = historyItem(command.operation, phase, command.sequence, command.at, command.receipt.resultSummary.title, command.receipt.resultSummary.detail)
  return { ...state, operation: command.operation, phase, sequence: command.sequence, eventId: command.eventId, updatedAt: command.at, history: boundedHistory(state, item), approval: undefined, receipt: command.receipt, notice: undefined }
}

function publicSystemLabel(system: string) {
  const value = system.toLowerCase()
  if (value === "quickbooks" || value === "qbo") return "QuickBooks"
  if (value === "jobber") return "Jobber"
  if (value === "source_archive") return "Connected records"
  return "Connected records"
}

function providerVerificationCoherent(completion: ReceiptCompletion) {
  const units = completion.work_result?.units ?? []
  const actions = units.filter((unit) => unit.kind === "provider_action")
  const verification = completion.provider_verification
  if (!verification) return actions.length === 0
  const countsValid = [verification.action_count, verification.verified_action_count, verification.mutation_dispatch_count]
    .every((count) => Number.isSafeInteger(count) && count >= 0)
  if (!countsValid) return false
  if (actions.length === 0) {
    return verification.status === "not_applicable"
      && verification.action_count === 0
      && verification.verified_action_count === 0
      && verification.mutation_dispatch_count === 0
      && verification.connectors.length === 0
  }
  const systems = [...new Set(actions.map((unit) => unit.system))].sort()
  const connectors = [...verification.connectors].sort()
  return verification.status === "verified"
    && verification.source === "server_turn_receipt"
    && verification.completed_batch_replay
    && verification.action_count === actions.length
    && verification.verified_action_count === actions.length
    && verification.mutation_dispatch_count === actions.length
    && systems.length === connectors.length
    && systems.every((system, index) => system === connectors[index])
    && actions.every((unit) => unit.outcome === "executed_verified")
}

function resultStatus(completion: ReceiptCompletion): WorkflowReceipt["resultSummary"]["status"] {
  if (completion.status === "cancelled") return "cancelled"
  if (completion.work_result?.status === "verified" && completion.status === "completed") return providerVerificationCoherent(completion) ? "completed" : "unknown_outcome"
  if (completion.work_result?.status === "partial") return "partial"
  if (completion.work_result?.status === "failed" || completion.status === "failed") return "failed"
  return "unknown_outcome"
}

function reconciliationStatus(completion: ReceiptCompletion): WorkflowReceipt["reconciliationStatus"] {
  const result = completion.work_result
  if (!result) return "reconciliation_required"
  if (result.status === "verified") return providerVerificationCoherent(completion) ? "reconciled" : "reconciliation_required"
  if (result.status === "partial") return "reconciled_with_exceptions"
  if (result.status === "failed") return "failed"
  return "reconciliation_required"
}

function readbacks(completion: ReceiptCompletion): WorkflowProviderReadback[] {
  const verification = completion.provider_verification
  if (!verification) return []
  if (verification.status === "not_applicable" && providerVerificationCoherent(completion)) {
    return [{ system: "Connected records", status: "not_applicable", summary: "No provider change required readback." }]
  }
  return verification.connectors.map((connector) => {
    const relevantUnits = completion.work_result?.units.filter((unit) => unit.system === connector) ?? []
    const rejected = relevantUnits.some((unit) => unit.outcome === "failed" || unit.outcome === "blocked" || unit.outcome === "stale")
    const verified = relevantUnits.length > 0 && relevantUnits.every((unit) => unit.outcome === "read_verified" || unit.outcome === "executed_verified")
    const status: WorkflowProviderReadback["status"] = rejected ? "rejected" : verification.status === "verified" && verified && providerVerificationCoherent(completion) ? "verified" : "unknown"
    return {
      system: publicSystemLabel(connector),
      status,
      summary: status === "verified"
        ? "The completed state was read back and matched."
        : status === "rejected"
          ? "The provider rejected or blocked this part of the request."
          : "The final provider state still needs confirmation.",
    }
  })
}

function receiptTitle(status: WorkflowReceipt["resultSummary"]["status"]) {
  if (status === "completed") return "Work completed"
  if (status === "partial") return "Completed with exceptions"
  if (status === "failed") return "Work was not completed"
  if (status === "cancelled") return "Request cancelled"
  return "Outcome needs confirmation"
}

function receiptDetail(status: WorkflowReceipt["resultSummary"]["status"], completed: number, total: number) {
  if (status === "completed") return `${completed} of ${total} result${total === 1 ? "" : "s"} verified.`
  if (status === "partial") return `${completed} of ${total} results verified. Review the exceptions before retrying.`
  if (status === "failed") return "No successful result is being claimed. Review the provider response before retrying."
  if (status === "cancelled") return "The request stopped. Check the history for any action that completed before cancellation."
  return "The final outcome is unknown. Check recent activity before retrying."
}

function validWorkResult(result: BrainWorkResult) {
  if (!Array.isArray(result.units) || result.units.length < 1 || result.units.length > 64) return false
  if (!Number.isSafeInteger(result.unit_count) || result.unit_count !== result.units.length) return false
  const verifiedOutcomes = new Set(["read_verified", "executed_verified", "source_verified", "nonfactual"])
  const allowedOutcomes = new Set(["pending_approval", "read_verified", "executed_verified", "executed_unverified", "unknown_outcome", "blocked", "failed", "stale", "source_verified", "nonfactual"])
  if (result.units.some((unit) => !allowedOutcomes.has(unit.outcome))) return false
  const verifiedCount = result.units.filter((unit) => verifiedOutcomes.has(unit.outcome)).length
  if (!Number.isSafeInteger(result.verified_unit_count) || result.verified_unit_count !== verifiedCount) return false
  const outcomes = new Set(result.units.map((unit) => unit.outcome))
  const everyVerified = [...outcomes].every((outcome) => verifiedOutcomes.has(outcome))
  const expectedStatus = everyVerified
    ? "verified"
    : outcomes.has("pending_approval") && [...outcomes].every((outcome) => verifiedOutcomes.has(outcome) || outcome === "pending_approval")
      ? "approval_required"
      : [...outcomes].some((outcome) => outcome === "executed_unverified" || outcome === "unknown_outcome")
        ? "reconciliation_required"
        : [...outcomes].some((outcome) => verifiedOutcomes.has(outcome))
          ? "partial"
          : "failed"
  return result.status === expectedStatus
}

export function completionToWorkflowReceipt(
  completion: ReceiptCompletion,
  context: { workflowId: string; tenantId: string },
): WorkflowReceipt | undefined {
  const result = completion.work_result
  if (!context.workflowId || !context.tenantId) return undefined
  if (!result && completion.status === "cancelled") {
    return {
      schema: "stanley.workflow.receipt.v1",
      workflowId: context.workflowId,
      tenantId: context.tenantId,
      resultSummary: {
        status: "cancelled",
        title: receiptTitle("cancelled"),
        detail: receiptDetail("cancelled", 0, 0),
        completedUnits: 0,
        totalUnits: 0,
      },
      providerReadback: [],
      reconciliationStatus: "reconciliation_required",
      artifacts: [],
      explanation: completion.answer ? safeWorkflowText(completion.answer, "", 4_000) : undefined,
    }
  }
  if (!result || result.schema !== "company_brain.work_result.v1" || !validWorkResult(result)) return undefined
  if (result.status === "approval_required") return undefined
  const status = resultStatus(completion)
  const artifacts = Array.isArray(completion.artifacts)
    ? completion.artifacts.filter((artifact) => artifact && typeof artifact.id === "string").slice(0, 20)
    : []
  return {
    schema: "stanley.workflow.receipt.v1",
    workflowId: context.workflowId,
    tenantId: context.tenantId,
    resultSummary: {
      status,
      title: receiptTitle(status),
      detail: receiptDetail(status, result.verified_unit_count, result.unit_count),
      completedUnits: result.verified_unit_count,
      totalUnits: result.unit_count,
    },
    providerReadback: readbacks(completion),
    reconciliationStatus: reconciliationStatus(completion),
    artifacts,
    explanation: completion.answer ? safeWorkflowText(completion.answer, "", 4_000) : undefined,
  }
}

export function canSaveWorkflowAsRoutine(receipt: WorkflowReceipt | undefined, tenantId: string) {
  return Boolean(
    receipt
    && receipt.tenantId === tenantId
    && receipt.resultSummary.status === "completed"
    && receipt.reconciliationStatus === "reconciled"
    && receipt.providerReadback.length > 0
    && receipt.providerReadback.every((readback) => readback.status === "verified"),
  )
}
