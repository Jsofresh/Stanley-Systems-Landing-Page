import type {
  Artifact,
  CompanyBrainAttachment,
  CompanyBrainBlock,
  PreparedAction,
  SourceChip,
  TablePreview,
} from "./types.ts"

export type BrainSourceChip = {
  connector?: string
  record_type?: string
  source_id?: string
  label?: string
  brief_source?: string
}

export type BrainArtifact = {
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
  | { type: "table"; table?: TablePreview; [key: string]: unknown }
  | { type: "clarification"; question?: string; options?: string[]; [key: string]: unknown }

export type BrainChatResponse = {
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
  action_plan?: {
    action_reference?: string
    status?: string
  } | null
  proof_id?: string
}

const sensitivePatterns: Array<[RegExp, string]> = [
  [/\b(?:access_token|refresh_token|client_secret|authorization_code)\b/gi, "[redacted]"],
  [/\/(?:opt|home|root)\/[A-Za-z0-9_./-]+/g, "[internal location]"],
  [/\bHermes\b/gi, "Company Brain"],
  [/\bGBrain\b/gi, "company memory"],
  [/\bMCP\b/gi, "office tools"],
]

function safeText(value: unknown, fallback = "", maxLength = 12_000) {
  let result = typeof value === "string" ? value : fallback
  result = result.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
  for (const [pattern, replacement] of sensitivePatterns) result = result.replace(pattern, replacement)
  return result.slice(0, maxLength)
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
    id: `source-${index}`,
    label: safeText(source.label, "Source record", 180),
    detail: [source.brief_source, source.record_type]
      .map((value) => safeText(value, "", 180))
      .filter(Boolean)
      .join(" · "),
    system: systemLabel(source.connector),
  }
}

function titleFromAction(type?: string) {
  if (!type || type === "none") return "Prepared office review"
  return safeText(type.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()), "Prepared office review", 160)
}

function toPreparedAction(response: BrainChatResponse): PreparedAction | null {
  const action = response.suggested_action
  if (!action || !action.type || ["none", "clarify_request", "clarify_entity", "safety_refusal", "boundary_error"].includes(action.type)) return null
  const status = action.status ?? ""
  const preparedStatuses = new Set(["prepared_not_sent", "needs_review", "needs_confirmation", "approval_required"])
  const completedStatuses = new Set(["executed", "executed_verified", "already_completed", "provider_write_receipt_available"])
  if (!preparedStatuses.has(status) && !completedStatuses.has(status)) return null
  const completed = completedStatuses.has(status)
  return {
    id: "prepared-action",
    title: titleFromAction(action.type),
    description: completed
      ? "Completed and checked against the connected office system."
      : `${status === "prepared_not_sent" ? "Prepared, not sent." : "Needs review."} ${action.execution_mode === "approval_required_or_manual" ? "A person must approve it first." : "Review required."}`,
    status: completed ? "sent" : status === "needs_review" || status === "needs_confirmation" ? "needs_review" : "prepared_not_sent",
    ctaLabel: completed ? "View result" : "Review action",
    preview: safeText(action.draft, completed ? "Completed." : "Prepared for office review only.", 4_000),
    approvalReference: !completed && typeof response.action_plan?.action_reference === "string" && /^actref_[A-Za-z0-9_-]{32,240}$/.test(response.action_plan.action_reference)
      ? response.action_plan.action_reference
      : undefined,
  }
}

const mimeByExtension: Partial<Record<NonNullable<Artifact["extension"]>, string>> = {
  pdf: "application/pdf",
  csv: "text/csv",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  txt: "text/plain",
  html: "text/html",
}

function validatedDownloadUrl(artifact: BrainArtifact) {
  if (artifact.status !== "ready" || !artifact.downloadUrl || !artifact.extension || !artifact.mimeType) return undefined
  if (mimeByExtension[artifact.extension] !== artifact.mimeType) return undefined
  if (!/^\/api\/company-brain\/artifacts\/[A-Za-z0-9._-]+$/.test(artifact.downloadUrl)) return undefined
  return artifact.downloadUrl
}

function toArtifact(artifact: BrainArtifact): Artifact {
  const fileName = artifact.fileName && !/[\\/\u0000]/.test(artifact.fileName)
    ? safeText(artifact.fileName, "", 220)
    : undefined
  return {
    id: safeText(artifact.id, "artifact", 180),
    title: safeText(artifact.title, "Company file", 240),
    kind: artifact.kind,
    status: artifact.status,
    description: safeText(artifact.description, "", 2_000),
    fileName,
    extension: artifact.extension,
    mimeType: artifact.mimeType,
    downloadUrl: validatedDownloadUrl(artifact),
  }
}

export function userSafeErrorMessage(code?: string, fallback?: string) {
  const messages: Record<string, string> = {
    upload_missing_bytes: "I received the file name, but not the file contents. Please reattach it.",
    unsupported_file_type: "This file type is not supported yet.",
    file_too_large: "That file is too large for this chat. Try a smaller file or split it into smaller parts.",
    extraction_failed: "The file arrived, but its contents could not be read.",
    artifact_failed: "The records were found, but the requested file could not be completed.",
    runtime_failed: "Company Brain is unavailable, and the request outcome is unknown. Check recent activity before trying again.",
    company_agent_unavailable: "Company Brain is unavailable, and the request outcome is unknown. Check recent activity before trying again.",
    permission_denied: "This account does not have permission for that request.",
  }
  return safeText((code ? messages[code] : undefined) ?? fallback ?? messages.runtime_failed, messages.runtime_failed, 2_000)
}

export function mapCompanyBrainResponseBlocks(response: BrainChatResponse): CompanyBrainBlock[] {
  const blocks: CompanyBrainBlock[] = []
  const seenArtifacts = new Set<string>()
  const rawBlocks = response.blocks ?? []
  rawBlocks.forEach((block, index) => {
    if (block.type === "text" && typeof block.text === "string") {
      blocks.push({ type: "text", id: `answer-${index}`, text: safeText(block.text) })
    } else if (block.type === "artifact") {
      const artifact = block.artifact ?? (typeof block.id === "string" ? block as unknown as BrainArtifact : undefined)
      if (artifact?.id) {
        seenArtifacts.add(artifact.id)
        blocks.push({ type: "artifact", id: `artifact-${index}`, artifact: toArtifact(artifact) })
      }
    } else if (block.type === "error") {
      blocks.push({ type: "error", id: `error-${index}`, title: "Company Brain couldn’t finish that", message: userSafeErrorMessage(block.code, block.message) })
    } else if (block.type === "attachment" && block.attachment) {
      blocks.push({ type: "attachment", id: `attachment-${index}`, attachment: block.attachment })
    } else if (block.type === "table" && block.table) {
      blocks.push({ type: "table", id: `table-${index}`, table: block.table })
    } else if (block.type === "clarification" && block.question) {
      blocks.push({ type: "clarification", id: `clarification-${index}`, question: safeText(block.question, "What would you like me to use?", 1_000), options: (block.options ?? []).map((option) => safeText(option, "", 160)).filter(Boolean).slice(0, 8) })
    }
  })
  ;(response.artifacts ?? []).forEach((artifact, index) => {
    if (!seenArtifacts.has(artifact.id)) blocks.push({ type: "artifact", id: `artifact-extra-${index}`, artifact: toArtifact(artifact) })
  })
  if (!blocks.some((block) => block.type === "text") && response.answer) {
    blocks.unshift({ type: "text", id: "answer", text: safeText(response.answer) })
  }
  const sources = (response.source_chips ?? []).map(toSourceChip)
  if (sources.length) blocks.push({ type: "sources", id: "sources", title: "Checked records", sources })
  const action = toPreparedAction(response)
  if (action) blocks.push({ type: "action", id: "action", action })
  const actionType = response.suggested_action?.type
  if (["clarify_request", "clarify_entity"].includes(actionType ?? "") && response.answer && !blocks.some((block) => block.type === "clarification")) {
    blocks.push({ type: "clarification", id: "clarification", question: safeText(response.answer, "What should I use?", 1_000), options: [] })
  }
  if (!blocks.length) {
    blocks.push({ type: "error", id: "error", title: "Company Brain couldn’t finish that", message: userSafeErrorMessage(response.errorCode) })
  }
  return blocks
}
