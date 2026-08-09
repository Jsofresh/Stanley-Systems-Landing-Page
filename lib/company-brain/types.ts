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

export type WorkflowPhase =
  | "idle"
  | "planning"
  | "running"
  | "approval_required"
  | "cancelling"
  | "cancelled"
  | "completed"
  | "partial"
  | "failed"
  | "reconciliation_required"
  | "unknown_outcome"

export type WorkflowAdapterOperation = "start_work" | "get_status" | "approve" | "cancel" | "get_result"

export type WorkflowHistoryItem = {
  id: string
  sequence: number
  at: string
  phase: WorkflowPhase
  label: string
  detail?: string
}

export type WorkflowApproval = {
  approvalRef: string
  actionCount: number
  systems: string[]
  choices: ["Approve", "Cancel"]
}

export type WorkflowProviderReadback = {
  system: string
  status: "verified" | "rejected" | "unknown" | "not_applicable"
  summary: string
}

export type WorkflowReceipt = {
  schema: "stanley.workflow.receipt.v1"
  workflowId: string
  tenantId: string
  resultSummary: {
    status: "completed" | "partial" | "failed" | "cancelled" | "unknown_outcome"
    title: string
    detail: string
    completedUnits: number
    totalUnits: number
  }
  providerReadback: WorkflowProviderReadback[]
  reconciliationStatus: "reconciled" | "reconciled_with_exceptions" | "reconciliation_required" | "failed" | "not_applicable"
  artifacts: Artifact[]
  explanation?: string
}

export type WorkflowAdapterState = {
  schema: "stanley.workflow.adapter.v1"
  workflowId: string
  conversationId: string
  tenantId: string
  operation: WorkflowAdapterOperation
  phase: WorkflowPhase
  sequence: number
  updatedAt: string
  history: WorkflowHistoryItem[]
  approval?: WorkflowApproval
  receipt?: WorkflowReceipt
  notice?: string
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
      type: "workflow"
      id: string
      receipt: WorkflowReceipt
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
}

export type SendCompanyBrainMessageResponse = {
  conversationId: string
  message: CompanyBrainMessage
}
