export type CompanyBrainRole = "user" | "assistant"

export type PreparedActionStatus = "prepared_not_sent" | "sent" | "cancelled" | "needs_review"

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

export type PreparedAction = {
  id: string
  title: string
  description: string
  status: PreparedActionStatus
  ctaLabel: string
  preview: string
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
      type: "action"
      id: string
      action: PreparedAction
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
}

export type SendCompanyBrainMessageResponse = {
  conversationId: string
  message: CompanyBrainMessage
}
