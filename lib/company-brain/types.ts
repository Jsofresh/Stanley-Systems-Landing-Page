export type CompanyBrainRole = "user" | "assistant"


export type ArtifactKind = "pdf" | "spreadsheet" | "html" | "document" | "text"

export type ArtifactStatus = "preparing" | "ready" | "failed" | "needs_revision"

export type SourceChip = {
  id: string
  label: string
  detail: string
  system: "Jobber" | "QBO" | "Files" | "Email" | "CRM" | "Notes"
}

export type AttachmentKind = "image" | "pdf" | "text" | "spreadsheet" | "document" | "unsupported"

export type CompanyBrainAttachment = {
  id: string
  name: string
  size: number
  type?: string
  mimeType: string
  kind: AttachmentKind
  status: "ready" | "failed"
  extractionStatus: "pending" | "ready" | "failed"
  errorCode?: string
}


export type ArtifactFile = {
  fileName: string
  extension: "pdf" | "html" | "xlsx" | "docx" | "txt"
  mimeType: string
  title: string
  plainText?: string
  html?: string
  table?: {
    columns: string[]
    rows: Array<Record<string, string>>
  }
}

export type Artifact = {
  id: string
  title: string
  kind: ArtifactKind
  status: ArtifactStatus
  description: string
  fileName?: string
  extension?: "pdf" | "html" | "xlsx" | "docx" | "txt" | "csv"
  mimeType?: string
  downloadUrl?: string
  preview?: string
  file?: ArtifactFile
}

export type TablePreview = {
  id: string
  title: string
  columns: string[]
  rows: Array<Record<string, string>>
  rowCount: number
}

export type CompanyBrainBlock =
  | {
      type: "text"
      id: string
      text: string
    }
  | {
      type: "attachment"
      id: string
      attachment: CompanyBrainAttachment
    }
  | {
      type: "sources"
      id: string
      title?: string
      sources: SourceChip[]
    }
  | {
      type: "artifact"
      id: string
      artifact: Artifact
    }
  | {
      type: "table"
      id: string
      table: TablePreview
    }
  | {
      type: "clarification"
      id: string
      question: string
      options: string[]
    }
  | {
      type: "error"
      id: string
      title: string
      message: string
    }

export type CompanyBrainMessage = {
  id: string
  role: CompanyBrainRole
  createdAt: string
  blocks: CompanyBrainBlock[]
}

export type SendCompanyBrainMessageInput = {
  companyId: string
  conversationId: string
  message: string
  attachments?: CompanyBrainAttachment[]
  approvalContinuation?: CompanyBrainApprovalContinuation
}

export type CompanyBrainApprovalContinuation = {
  decision: "Approve" | "Cancel"
  actionReference: string
  serverSequence: number
  eventId: string
}

export function companyBrainStreamRequestBody(input: SendCompanyBrainMessageInput) {
  const request = {
    conversation_id: input.conversationId,
    message: input.message,
    attachments: input.attachments ?? [],
  }
  if (!input.approvalContinuation) return request
  return {
    ...request,
    approval_decision: input.approvalContinuation.decision,
    action_reference: input.approvalContinuation.actionReference,
    last_server_sequence: input.approvalContinuation.serverSequence,
    last_event_id: input.approvalContinuation.eventId,
  }
}

export function isCompanyBrainApprovalEvent(
  data: Record<string, unknown>,
  companyId: string,
  conversationId: string,
) {
  const keys = ["schema", "company_id", "conversation_id", "workflow_id", "server_sequence", "event_id", "phase", "answer", "action_reference", "action_count", "connectors", "choices"]
  return Object.keys(data).length === keys.length
    && Object.keys(data).every((key) => keys.includes(key))
    && data.schema === "company_brain.portal_approval.v1" && data.company_id === companyId
    && data.conversation_id === conversationId && data.workflow_id === conversationId
    && data.server_sequence === 3 && typeof data.event_id === "string" && data.phase === "approval_required"
    && typeof data.answer === "string" && Boolean(data.answer.trim())
    && typeof data.action_reference === "string" && Boolean(data.action_reference.trim())
    && typeof data.action_count === "number" && Number.isSafeInteger(data.action_count) && data.action_count >= 1 && data.action_count <= 8
    && Array.isArray(data.connectors) && data.connectors.length >= 1 && data.connectors.every((connector) => typeof connector === "string")
    && Array.isArray(data.choices) && data.choices.length === 2 && data.choices[0] === "Approve" && data.choices[1] === "Cancel"
}

export type SendCompanyBrainMessageResponse = {
  conversationId: string
  message: CompanyBrainMessage
}
