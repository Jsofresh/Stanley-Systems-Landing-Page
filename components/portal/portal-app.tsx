"use client"

import { FormEvent, KeyboardEvent, useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowUp,
  Check,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  FileText,
  Menu,
  MessageSquare,
  MessageSquarePlus,
  Paperclip,
  Search,
  Save,
  Settings,
  Sheet,
  Sparkles,
  Table2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  getCompanyBrainSessionMessages,
  getCompanyBrainSessions,
  getCompanyBrainSummary,
  getCompanyBrainSupportedActions,
  hydrateCompanyBrainWorkflow,
  streamCompanyBrainMessage,
  cancelCompanyBrainSession,
  uploadCompanyBrainFiles,
  type BrainSummary,
  type NativeCompletion,
} from "@/lib/company-brain/live"
import {
  applyWorkflowCommand,
  canSaveWorkflowAsRoutine,
  completionToWorkflowReceipt,
  createWorkflowAdapterState,
  safeWorkflowText,
  type WorkflowAdapterCommand,
} from "@/lib/company-brain/workflow"
import type {
  Artifact,
  CompanyBrainAttachment,
  CompanyBrainBlock,
  CompanyBrainMessage,
  SourceChip,
  TablePreview,
  WorkflowAdapterState,
  WorkflowReceipt,
  SupportedActionMatrix as SupportedActionMatrixContract,
  SupportedActionMatrixState,
} from "@/lib/company-brain/types"

type RecentConversation = {
  id: string
  title: string
  lastActive?: number
  messageCount?: number
  preview?: string
}

const initialMessages: CompanyBrainMessage[] = []

type PortalSession = {
  actorId: string
  name: string
  email: string
  role: string
  roleLabel: string
  companyId: string
  companyName: string
  loginSessionId: string
}

const sensitiveDisplayPatterns = [
  /access_token/gi,
  /refresh_token/gi,
  /client_secret/gi,
  /authorization_code/gi,
  /DEEPSEEK_API_KEY/gi,
  /credential file path/gi,
  /\/opt\/company-brain-runtime(?:\/[^\s]*)?/gi,
  /\/secrets(?:\/[^\s]*)?/gi,
  /secrets\/(?:[^\s]*)?/gi,
  /\bHermes\b/gi,
  /\bCodex\b/gi,
  /\bOpenClaw\b/gi,
  /\bn8n\b/gi,
  /\bHCP\b/gi,
]

function sanitizePortalDisplayText(value: string) {
  return sensitiveDisplayPatterns.reduce((current, pattern) => current.replace(pattern, "[redacted]"), value)
}

function messageText(message: CompanyBrainMessage) {
  return message.blocks
    .filter((block): block is Extract<CompanyBrainBlock, { type: "text" }> => block.type === "text")
    .map((block) => block.text)
    .join(" ")
}

function conversationMetadata(id: string, messages: CompanyBrainMessage[], fallbackTitle = "New conversation"): RecentConversation {
  const firstUserText = messages.find((message) => message.role === "user")
  const latest = messages.at(-1)
  return {
    id,
    title: messageText(firstUserText ?? { blocks: [], id: "", role: "user", createdAt: "" }).slice(0, 54) || fallbackTitle,
    preview: messageText(latest ?? { blocks: [], id: "", role: "assistant", createdAt: "" }).slice(0, 220),
    messageCount: messages.length,
    lastActive: Date.now(),
  }
}

type PreviewState =
  | { type: "artifact"; artifact: Artifact }
  | { type: "table"; table: TablePreview }
  | { type: "sources"; sources: SourceChip[]; title?: string }
  | null

function nativeArtifactBlock(value: unknown, index: number): Extract<CompanyBrainBlock, { type: "artifact" }> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null
  const item = value as Record<string, unknown>
  const id = typeof item.id === "string" ? item.id : ""
  if (!/^artifact_[A-Za-z0-9_-]{6,160}$/.test(id)) return null
  const rawKind = typeof item.kind === "string" ? item.kind : "text"
  const kind: Artifact["kind"] = rawKind === "xlsx" || rawKind === "csv" ? "spreadsheet" : ["pdf", "html", "document", "text", "spreadsheet"].includes(rawKind) ? rawKind as Artifact["kind"] : "text"
  const status: Artifact["status"] = item.status === "ready" || item.status === "failed" || item.status === "preparing" || item.status === "needs_revision"
    ? item.status
    : "ready"
  return {
    type: "artifact",
    id: `artifact-${id}-${index}`,
    artifact: {
      id,
      title: typeof item.title === "string" ? item.title : typeof item.name === "string" ? item.name : "Company artifact",
      kind,
      status,
      description: typeof item.description === "string" ? item.description : "Authorized company artifact.",
      fileName: typeof item.fileName === "string" ? item.fileName : undefined,
      extension: typeof item.extension === "string" ? item.extension as Artifact["extension"] : undefined,
      mimeType: typeof item.mimeType === "string" ? item.mimeType : undefined,
      downloadUrl: typeof item.downloadUrl === "string" ? item.downloadUrl : undefined,
    },
  }
}

function nativeCompletionBlocks(response: NativeCompletion, receipt?: WorkflowReceipt): CompanyBrainBlock[] {
  const blocks: CompanyBrainBlock[] = []
  const seenArtifactIds = new Set<string>()
  const rawBlocks = Array.isArray(response.blocks) ? response.blocks : []

  rawBlocks.forEach((value, index) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return
    const block = value as Record<string, unknown>
    const type = typeof block.type === "string" ? block.type : ""
    if (type === "text" && typeof block.text === "string") {
      blocks.push({ type: "text", id: `native-text-${index}`, text: block.text })
      return
    }
    if (type === "artifact") {
      const artifact = nativeArtifactBlock(block.artifact ?? block, index)
      if (artifact) {
        seenArtifactIds.add(artifact.artifact.id)
        blocks.push(artifact)
      }
      return
    }
    if (type === "table" && block.table && typeof block.table === "object" && !Array.isArray(block.table)) {
      const table = block.table as Record<string, unknown>
      const columns = Array.isArray(table.columns)
        ? table.columns.filter((column): column is string => typeof column === "string").slice(0, 24)
        : []
      const rows = Array.isArray(table.rows)
        ? table.rows
          .filter((row): row is Record<string, unknown> => Boolean(row && typeof row === "object" && !Array.isArray(row)))
          .slice(0, 200)
          .map((row) => Object.fromEntries(Object.entries(row).map(([key, cell]) => [key, typeof cell === "string" ? cell : String(cell ?? "")])) as Record<string, string>)
        : []
      if (columns.length) {
        blocks.push({
          type: "table",
          id: `native-table-${index}`,
          table: {
            id: typeof table.id === "string" ? table.id : `native-table-${index}`,
            title: typeof table.title === "string" ? table.title : "Company records",
            columns,
            rows,
            rowCount: typeof table.rowCount === "number" ? table.rowCount : rows.length,
          },
        })
      }
      return
    }
    if (type === "clarification" && typeof block.question === "string") {
      blocks.push({
        type: "clarification",
        id: `native-clarification-${index}`,
        question: block.question,
        options: Array.isArray(block.options)
          ? block.options.filter((option): option is string => typeof option === "string").slice(0, 8)
          : [],
      })
      return
    }
    if (type === "error") {
      blocks.push({
        type: "error",
        id: `native-error-${index}`,
        title: "Company Brain couldn’t finish that",
        message: typeof block.message === "string" ? block.message : "Company Brain could not complete that request.",
      })
    }
  })

  if (!blocks.some((block) => block.type === "text") && response.answer) {
    blocks.unshift({ type: "text", id: "native-answer", text: response.answer })
  }
  ;(response.artifacts ?? []).forEach((artifact, index) => {
    if (seenArtifactIds.has(artifact.id)) return
    const block = nativeArtifactBlock(artifact, index)
    if (block) blocks.push(block)
  })
  if (receipt) blocks.push({ type: "workflow", id: `workflow-${receipt.workflowId}`, receipt })
  return blocks.length
    ? blocks
    : [{
      type: "error",
      id: "native-empty",
      title: "Company Brain couldn’t finish that",
      message: "Company Brain completed without a user-visible response. Check the conversation again before retrying.",
    }]
}

export function PortalApp() {
  const router = useRouter()
  const [session, setSession] = useState<PortalSession | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [messages, setMessages] = useState<CompanyBrainMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [attachments, setAttachments] = useState<CompanyBrainAttachment[]>([])
  const [isSending, setIsSending] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [preview, setPreview] = useState<PreviewState>(null)
  const [summary, setSummary] = useState<BrainSummary | null>(null)
  const [statusError, setStatusError] = useState<string | null>(null)
  const [activityLabel, setActivityLabel] = useState("Stanley is working…")
  const [workflowState, setWorkflowState] = useState<WorkflowAdapterState | null>(null)
  const [supportedActionMatrix, setSupportedActionMatrix] = useState<SupportedActionMatrixContract | null>(null)
  const [supportedActionState, setSupportedActionState] = useState<SupportedActionMatrixState>("loading")
  const [currentConversationId, setCurrentConversationId] = useState(() => `conversation-${Date.now()}`)
  const [recentConversations, setRecentConversations] = useState<RecentConversation[]>([])
  const [historyReady, setHistoryReady] = useState(false)
  const currentConversationIdRef = useRef(currentConversationId)
  const activeConversationIdRef = useRef<string | null>(null)
  const isSendingRef = useRef(false)
  const historyLoadedRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const workflowSequenceRef = useRef(0)
  const workflowIdentityRef = useRef(new Map<string, { sequence: number; eventId: string }>())

  const hasMessages = messages.length > 0

  useEffect(() => {
    currentConversationIdRef.current = currentConversationId
  }, [currentConversationId])

  useEffect(() => {
    let cancelled = false
    async function loadSession() {
      try {
        const response = await fetch("/api/portal/session", { cache: "no-store" })
        if (!response.ok) {
          router.replace("/login")
          return
        }
        const data = (await response.json()) as { session: PortalSession }
        if (!cancelled) setSession(data.session)
      } finally {
        if (!cancelled) setAuthLoading(false)
      }
    }
    void loadSession()
    return () => {
      cancelled = true
    }
  }, [router])

  useEffect(() => {
    if (!session) return
    let cancelled = false
    async function loadLiveWorkflow() {
      try {
        const summaryResponse = await getCompanyBrainSummary()
        if (cancelled) return
        setSummary(summaryResponse)
        setSupportedActionState("loading")
        try {
          const matrix = await getCompanyBrainSupportedActions(summaryResponse.runtime_version)
          if (cancelled) return
          setSupportedActionMatrix(matrix)
          setSupportedActionState(matrix.state)
        } catch (error) {
          if (cancelled) return
          const message = error instanceof Error ? error.message : ""
          setSupportedActionState(/permission/i.test(message) ? "denied" : /unavailable/i.test(message) ? "unavailable" : "error")
        }
        setStatusError(null)
      } catch (error) {
        if (cancelled) return
        setStatusError(error instanceof Error ? error.message : "Company Brain is unavailable")
      }
    }
    void loadLiveWorkflow()
    return () => {
      cancelled = true
    }
  }, [session])

  async function restoreWorkflow(conversationId: string) {
    if (!session) return
    const restored = await hydrateCompanyBrainWorkflow(conversationId, session.companyId)
    workflowIdentityRef.current.set(restored.workflowId, { sequence: restored.sequence, eventId: restored.eventId ?? "" })
    workflowSequenceRef.current = restored.sequence
    if (currentConversationIdRef.current === conversationId) setWorkflowState(restored)
  }

  useEffect(() => {
    if (!session) return
    let cancelled = false
    async function loadRemoteHistory() {
      try {
        const remote = await getCompanyBrainSessions()
        if (cancelled) return
        const summaries: RecentConversation[] = remote.map((conversation) => ({
          id: conversation.id,
          title: conversation.title || "New conversation",
          lastActive: conversation.last_active,
          messageCount: conversation.message_count,
          preview: conversation.preview,
        }))
        if (summaries.length) {
          const activeId = summaries[0].id
          currentConversationIdRef.current = activeId
          setCurrentConversationId(activeId)
          setRecentConversations(summaries.slice(0, 8))
          const history = await getCompanyBrainSessionMessages(activeId)
          if (cancelled) return
          setMessages(history.map((message) => ({
            id: message.id,
            role: message.role,
            createdAt: message.timestamp ? new Date(message.timestamp * 1000).toISOString() : new Date().toISOString(),
            blocks: [{ type: "text", id: `${message.id}-text`, text: message.content }],
          })))
          await restoreWorkflow(activeId).catch(() => undefined)
        } else {
          setRecentConversations([])
          setMessages([])
        }
      } catch {
        // Do not restore a stale browser-owned transcript or sidebar index.
        // Hermes history is the only authoritative reload source.
        if (!cancelled) {
          setRecentConversations([])
          setMessages([])
        }
      } finally {
        if (!cancelled) {
          historyLoadedRef.current = true
          setHistoryReady(true)
        }
      }
    }
    void loadRemoteHistory()
    return () => {
      cancelled = true
    }
  }, [session])

  useEffect(() => {
    if (!session || !workflowState || !["planning", "running", "approval_required", "cancelling", "reconciliation_required", "unknown_outcome"].includes(workflowState.phase)) return
    let stopped = false
    let attempts = 0
    const timer = window.setInterval(() => {
      if (stopped || attempts >= 15) return
      attempts += 1
      void hydrateCompanyBrainWorkflow(workflowState.conversationId, session.companyId).then((restored) => {
        if (stopped || currentConversationIdRef.current !== restored.conversationId) return
        setWorkflowState((current) => {
          if (current && restored.sequence <= current.sequence) return current
          workflowIdentityRef.current.set(restored.workflowId, { sequence: restored.sequence, eventId: restored.eventId ?? "" })
          workflowSequenceRef.current = restored.sequence
          return restored
        })
      }).catch(() => undefined)
    }, 4000)
    return () => { stopped = true; window.clearInterval(timer) }
  }, [session, workflowState?.conversationId, workflowState?.phase])


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" })
  }, [messages, isSending])

  useEffect(() => {
    if (!messages.length) return
    const metadata = conversationMetadata(currentConversationId, messages)
    setRecentConversations((current) => [
      metadata,
      ...current.filter((item) => item.id !== currentConversationId),
    ].slice(0, 8))
  }, [messages, currentConversationId])

  async function handleLogout() {
    let response: Response
    try {
      response = await fetch("/api/portal/logout", { method: "POST" })
    } catch {
      setStatusError("Logout could not be confirmed. You are still signed in; try again.")
      return
    }
    if (!response.ok) {
      setStatusError("Logout could not be confirmed. You are still signed in; try again.")
      return
    }
    historyLoadedRef.current = false
    setRecentConversations([])
    setMessages([])
    router.replace("/login")
  }

  async function sendMessage(messageText = input, messageAttachments = attachments) {
    const rawMessage = messageText
    const hasText = rawMessage.trim().length > 0
    const hasUnreadyAttachment = messageAttachments.some((attachment) => attachment.status !== "ready" || attachment.extractionStatus !== "ready")
    if (hasUnreadyAttachment) {
      setStatusError("Remove any attachment that has not finished processing before sending.")
      return
    }
    if ((!hasText && messageAttachments.length === 0) || isSendingRef.current) return
    isSendingRef.current = true
    const originConversationId = currentConversationIdRef.current
    activeConversationIdRef.current = originConversationId
    const originTitle = hasText
      ? rawMessage.trim().slice(0, 54)
      : messageAttachments[0]?.name.slice(0, 54) || "New conversation"
    const existingApproval = workflowState?.conversationId === originConversationId ? workflowState.approval : undefined
    const approvalDecision = existingApproval && (rawMessage === "Approve" || rawMessage === "Cancel") ? rawMessage : undefined
    const applyWorkflowUpdate = (command: WorkflowAdapterCommand) => {
      setWorkflowState((current) => applyWorkflowCommand(
        current?.conversationId === originConversationId
          ? current
          : createWorkflowAdapterState(originConversationId, session?.companyId ?? "", command.at),
        command,
      ))
    }
    if (!approvalDecision) {
      workflowSequenceRef.current = 0
      workflowIdentityRef.current.delete(originConversationId)
      const initial = createWorkflowAdapterState(originConversationId, session?.companyId ?? "")
      setWorkflowState({ ...initial, operation: "start_work", phase: "planning", updatedAt: new Date().toISOString() })
    }

    const userMessage: CompanyBrainMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      createdAt: new Date().toISOString(),
      blocks: [
        ...(hasText ? [{ type: "text" as const, id: `user-text-${Date.now()}`, text: rawMessage }] : []),
        ...messageAttachments.map((attachment) => ({
          type: "attachment" as const,
          id: `user-attachment-${attachment.id}`,
          attachment,
        })),
      ],
    }
    const originMessages = [...messages, userMessage]
    setMessages((current) => currentConversationIdRef.current === originConversationId ? [...current, userMessage] : current)
    setRecentConversations((current) => [
      conversationMetadata(originConversationId, originMessages, originTitle),
      ...current.filter((item) => item.id !== originConversationId),
    ].slice(0, 8))
    setInput("")
    setAttachments([])
    setIsSending(true)

    const streamingMessageId = `assistant-stream-${Date.now()}`
    let streamedText = ""
    const updateStreamingMessage = (text: string) => {
      const partial: CompanyBrainMessage = {
        id: streamingMessageId,
        role: "assistant",
        createdAt: new Date().toISOString(),
        blocks: [{ type: "text", id: `${streamingMessageId}-text`, text }],
      }
      if (currentConversationIdRef.current === originConversationId) {
        setMessages((current) => [...current.filter((message) => message.id !== streamingMessageId), partial])
      }
    }

    try {
      const response = await streamCompanyBrainMessage({
        companyId: session?.companyId ?? "",
        conversationId: originConversationId,
        message: rawMessage,
        attachments: messageAttachments,
        approvalDecision: approvalDecision && existingApproval ? {
          decision: approvalDecision,
          approvalRef: existingApproval.approvalRef,
          approvalVersion: existingApproval.approvalVersion,
          approvalBinding: existingApproval.binding,
        } : undefined,
        lastServerSequence: approvalDecision ? workflowState?.sequence : 0,
        lastEventId: approvalDecision ? workflowState?.eventId : undefined,
      }, (event) => {
        const workflowId = typeof event.data.workflow_id === "string" ? event.data.workflow_id : ""
        const serverSequence = typeof event.data.server_sequence === "number" && Number.isSafeInteger(event.data.server_sequence) ? event.data.server_sequence : 0
        const eventId = typeof event.data.event_id === "string" ? event.data.event_id : ""
        if (!["done", "error"].includes(event.event)) {
          const accepted = workflowIdentityRef.current.get(originConversationId)
          if (workflowId !== originConversationId || serverSequence < 1 || !eventId || (accepted && (serverSequence <= accepted.sequence || eventId === accepted.eventId))) return
          workflowIdentityRef.current.set(originConversationId, { sequence: serverSequence, eventId })
          workflowSequenceRef.current = serverSequence
        }
        if (event.event === "run.started") {
          setActivityLabel("Stanley is working…")
          applyWorkflowUpdate({ operation: "get_status", workflowId, eventId, sequence: serverSequence, at: new Date().toISOString(), phase: "running", label: approvalDecision === "Approve" ? "Approved work started" : "Plan ready. Work started" })
        }
        if (event.event === "tool.progress") {
          const state = typeof event.data.state === "string" ? event.data.state : ""
          const label = state.includes("completed") ? "Verifying the result" : state.includes("failed") ? "Checking an exception" : "Checking connected records"
          setActivityLabel(`${label}…`)
          applyWorkflowUpdate({ operation: "get_status", workflowId, eventId, sequence: serverSequence, at: new Date().toISOString(), phase: "running", label })
        }
        if (event.event === "approval.request") {
          const choices = Array.isArray(event.data.choices)
            ? event.data.choices.filter((choice): choice is string => typeof choice === "string").slice(0, 8)
            : []
          const approvalRef = typeof event.data.approval_ref === "string" ? event.data.approval_ref : ""
          const actionCount = typeof event.data.action_count === "number" ? event.data.action_count : 0
          const approvalVersion = typeof event.data.approval_version === "number" ? event.data.approval_version : 0
          const approvalBinding = typeof event.data.binding === "string" ? event.data.binding : ""
          const systems = Array.isArray(event.data.connectors)
            ? event.data.connectors.filter((system): system is string => typeof system === "string").map((system) => system === "quickbooks" ? "QuickBooks" : system === "jobber" ? "Jobber" : "Connected records")
            : []
          const actions = Array.isArray(event.data.actions) ? event.data.actions.flatMap((value) => {
            if (!value || typeof value !== "object" || Array.isArray(value)) return []
            const action = value as Record<string, unknown>
            return typeof action.order === "number" && typeof action.action_summary === "string" && typeof action.target === "string" && typeof action.consequence_class === "string" && typeof action.approval_class === "string" && typeof action.step_scope === "string"
              ? [{ order: action.order, summary: action.action_summary, target: action.target, consequenceClass: action.consequence_class, approvalClass: action.approval_class, stepScope: action.step_scope }]
              : []
          }) : []
          if (currentConversationIdRef.current === originConversationId && approvalRef && approvalVersion > 0 && approvalBinding && actionCount > 0 && actions.length === actionCount && choices[0] === "Approve" && choices[1] === "Cancel") {
            applyWorkflowUpdate({
              operation: "approve",
              workflowId,
              eventId,
              sequence: serverSequence,
              at: new Date().toISOString(),
              approval: { approvalRef, approvalVersion, binding: approvalBinding, actionCount, systems, actions, choices: ["Approve", "Cancel"] },
            })
          }
        }
        if (event.event === "assistant.delta" && typeof event.data.delta === "string") {
          streamedText += event.data.delta
          updateStreamingMessage(streamedText)
        }
      })
      const receipt = response.workflow_receipt ?? completionToWorkflowReceipt(response, {
        workflowId: originConversationId,
        tenantId: session?.companyId ?? "",
      })
      if (response.work_result?.status !== "approval_required") {
        const resultWorkflowId = typeof response.workflow_id === "string" ? response.workflow_id : originConversationId
        const resultSequence = typeof response.server_sequence === "number" ? response.server_sequence : workflowSequenceRef.current
        const resultEventId = typeof response.event_id === "string" ? response.event_id : undefined
        applyWorkflowUpdate({
          operation: "get_result",
          workflowId: resultWorkflowId,
          eventId: resultEventId,
          sequence: resultSequence,
          at: new Date().toISOString(),
          receipt,
          error: receipt ? undefined : "The structured result was missing or malformed. No success is being claimed.",
        })
      }
      const assistantMessage: CompanyBrainMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        createdAt: new Date().toISOString(),
        blocks: nativeCompletionBlocks(response, receipt),
      }
      const completedMessages = [...originMessages, assistantMessage]
      setRecentConversations((current) => [
        conversationMetadata(originConversationId, completedMessages, originTitle),
        ...current.filter((item) => item.id !== originConversationId),
      ].slice(0, 8))
      if (currentConversationIdRef.current === originConversationId) {
        setMessages((current) => [...current.filter((message) => message.id !== streamingMessageId), assistantMessage])
      }
    } catch (error) {
      const at = new Date().toISOString()
      const notice = error instanceof Error ? error.message : "The outcome could not be confirmed."
      setWorkflowState((current) => current?.conversationId === originConversationId ? {
        ...current,
        operation: "get_result",
        phase: "unknown_outcome",
        updatedAt: at,
        approval: undefined,
        receipt: undefined,
        notice,
        history: [...current.history, { id: `local-unknown-${at}`, sequence: current.sequence, at, phase: "unknown_outcome" as const, label: "Outcome needs confirmation", detail: notice }].slice(-24),
      } : current)
      const errorMessage: CompanyBrainMessage = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        createdAt: new Date().toISOString(),
        blocks: [{
          type: "error",
          id: "send-error",
          title: "Company Brain couldn’t finish that",
          message: error instanceof Error
            ? error.message
            : "The request outcome is unknown. Check recent activity before trying again.",
        }],
      }
      const failedMessages = [...originMessages, errorMessage]
      setRecentConversations((current) => [
        conversationMetadata(originConversationId, failedMessages, originTitle),
        ...current.filter((item) => item.id !== originConversationId),
      ].slice(0, 8))
      if (currentConversationIdRef.current === originConversationId) {
        setMessages((current) => [...current.filter((message) => message.id !== streamingMessageId), errorMessage])
      }
    } finally {
      if (activeConversationIdRef.current === originConversationId) activeConversationIdRef.current = null
      isSendingRef.current = false
      setIsSending(false)
      setActivityLabel("Stanley is working…")
    }
  }


  async function handleCancel() {
    const conversationId = activeConversationIdRef.current
    if (!conversationId) return
    const at = new Date().toISOString()
    setWorkflowState((current) => current?.conversationId === conversationId ? {
      ...current,
      operation: "cancel",
      phase: "cancelling",
      updatedAt: at,
      approval: undefined,
      history: [...current.history, { id: `local-cancel-${at}`, sequence: current.sequence, at, phase: "cancelling" as const, label: "Cancellation requested", detail: "The final outcome has not been confirmed yet." }].slice(-24),
    } : current)
    try {
      await cancelCompanyBrainSession(conversationId)
      setStatusError("Stopping that request…")
    } catch {
      setStatusError("The stop request could not be confirmed. Check the conversation before retrying.")
    }
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    void sendMessage()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      void sendMessage()
    }
  }

  const sidebar = (
    <PortalSidebar
      session={session!}
      onLogout={handleLogout}
      onClose={() => setSidebarOpen(false)}
      recentConversations={recentConversations}
      busy={isSending || isUploading}
      onOpenRecent={(conversation) => {
        if (isSendingRef.current) {
          setStatusError("Finish or stop the active request before switching conversations.")
          return
        }
        if (isUploading) {
          setStatusError("Wait for the attachment upload to finish before switching conversations.")
          return
        }
        currentConversationIdRef.current = conversation.id
        setCurrentConversationId(conversation.id)
        workflowSequenceRef.current = 0
        setWorkflowState(null)
        setMessages([])
        void Promise.all([getCompanyBrainSessionMessages(conversation.id), restoreWorkflow(conversation.id).catch(() => undefined)]).then(([history]) => {
          if (currentConversationIdRef.current !== conversation.id) return
          setMessages(history.map((message) => ({
            id: message.id,
            role: message.role,
            createdAt: message.timestamp ? new Date(message.timestamp * 1000).toISOString() : new Date().toISOString(),
            blocks: [{ type: "text" as const, id: `${message.id}-text`, text: message.content }],
          })))
        }).catch(() => {
          setStatusError("That conversation could not be loaded right now.")
        })
        setInput("")
        setAttachments([])
        setSidebarOpen(false)
      }}
      onNewChat={() => {
        if (isSendingRef.current) {
          setStatusError("Finish or stop the active request before starting another conversation.")
          return
        }
        if (isUploading) {
          setStatusError("Wait for the attachment upload to finish before starting another conversation.")
          return
        }
        const nextConversationId = `conversation-${Date.now()}`
        currentConversationIdRef.current = nextConversationId
        setCurrentConversationId(nextConversationId)
        workflowSequenceRef.current = 0
        setWorkflowState(null)
        setMessages([])
        setInput("")
        setAttachments([])
        setSidebarOpen(false)
      }}
    />
  )


  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f2ea] px-4 text-[#102033]">
        <div className="rounded-2xl border border-[#ded6c8] bg-white px-6 py-5 text-sm font-bold shadow-sm">
          Opening Stanley UI session…
        </div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="h-screen overflow-hidden bg-[#f7f7f5] text-[#0f1720]">
      <div className="flex h-full min-h-0">
        <aside className="hidden w-[276px] shrink-0 border-r border-[#e7e7e4] bg-[#ececea] lg:block">
          {sidebar}
        </aside>

        {sidebarOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-[#102033]/30"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="relative h-full w-[min(320px,86vw)] border-r border-[#e7e7e4] bg-[#ececea] shadow-2xl">
              {sidebar}
            </aside>
          </div>
        ) : null}

        <main className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#ececea] bg-[#f7f7f5]/90 px-3 backdrop-blur md:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="grid h-9 w-9 place-items-center rounded-lg text-[#4b5563] transition hover:bg-black/5 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="min-w-0 rounded-lg px-2 py-1.5">
                <p className="truncate text-sm font-semibold text-[#111827]">Company Brain</p>
                <p className="truncate text-xs text-[#737373]">{session.companyName} · {session.roleLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full border border-[#deded9] bg-white px-3 py-1.5 text-xs font-medium text-[#525252] sm:inline-flex">
                {summary ? "Records connected" : "Connecting"}
              </span>
              <Link
                href="/portal/settings"
                prefetch={false}
                className="grid h-8 w-8 place-items-center rounded-full bg-[#111827] text-xs font-bold text-white transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]"
                aria-label="Settings"
                title={`${session.name} settings`}
              >
                {session.companyName.slice(0, 1) || "B"}
              </Link>
            </div>
          </header>

          <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="mx-auto flex h-full min-h-0 w-full max-w-3xl flex-1 flex-col px-4 pt-5 md:px-6">
              <div className="min-h-0 flex-1 overflow-y-auto pr-1 pb-6">
                {hasMessages ? (
                  <div className="space-y-4 pb-6 pt-3">
                    {messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        onPreview={setPreview}
                        onChoice={(choice) => void sendMessage(choice, [])}
                      />
                    ))}
                    {isSending ? <TypingMessage label={activityLabel} /> : null}
                    <div ref={messagesEndRef} aria-hidden="true" />
                  </div>
                ) : (
                  <EmptyState summary={summary} statusError={statusError} />
                )}
              </div>
              {workflowState?.conversationId === currentConversationId && workflowState.phase !== "idle" ? (
                <WorkflowStatusPanel
                  state={workflowState}
                  tenantId={session.companyId}
                  onDecision={(decision) => void sendMessage(decision, [])}
                  onSaveRoutine={() => void sendMessage("Save this completed workflow as a routine for this company.", [])}
                />
              ) : null}
              <SupportedActionMatrix matrix={supportedActionMatrix} state={supportedActionState} />
              <ChatComposer
                input={input}
                attachments={attachments}
                disabled={isSending || isUploading || !historyReady}
                onInput={setInput}
                conversationId={currentConversationId}
                onAttachments={setAttachments}
                onUploading={setIsUploading}
                onUploadError={setStatusError}
                onSubmit={handleSubmit}
                onCancel={isSending ? () => void handleCancel() : undefined}
                onKeyDown={handleKeyDown}
              />
            </div>
          </section>
        </main>
        <PreviewDialog preview={preview} onClose={() => setPreview(null)} />
      </div>
    </div>
  )
}

function PortalSidebar({
  session,
  onLogout,
  onClose,
  onNewChat,
  busy,
  recentConversations,
  onOpenRecent,
}: {
  session: PortalSession
  onLogout: () => void
  onClose: () => void
  onNewChat: () => void
  busy: boolean
  recentConversations: RecentConversation[]
  onOpenRecent: (conversation: RecentConversation) => void
}) {
  return (
    <div className="flex h-full flex-col px-3 py-3">
      <div className="mb-3 flex items-center justify-between px-2 py-1.5">
        <Link href="/portal" prefetch={false} className="flex min-w-0 items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#111827] text-xs font-bold text-white">S</div>
          <div className="min-w-0">
            <span className="block truncate text-sm font-semibold text-[#111827]">Stanley Systems</span>
            <span className="block truncate text-xs text-[#737373]">Company Brain</span>
          </div>
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <button
        type="button"
        className="mb-3 flex h-11 items-center gap-2 rounded-xl border border-[#dadad7] bg-white px-3 text-sm font-medium text-[#111827] shadow-sm transition hover:bg-[#f9f9f8]"
        onClick={onNewChat}
        disabled={busy}
        aria-disabled={busy}
      >
        <MessageSquarePlus className="h-4 w-4" />
        New chat
      </button>

      <div className="min-h-0 flex-1 overflow-y-auto border-t border-black/5 pt-3">
        <div className="mb-2 flex items-center justify-between px-2 text-xs font-medium text-[#737373]">
          <span>Recent</span>
          <Search className="h-3.5 w-3.5" />
        </div>
        <div className="space-y-0.5">
          {recentConversations.length ? recentConversations.map((conversation) => (
            <button
              type="button"
              key={conversation.id}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-[#374151] transition hover:bg-white/65"
              onClick={() => onOpenRecent(conversation)}
              disabled={busy}
              aria-disabled={busy}
            >
              <MessageSquare className="h-3.5 w-3.5 shrink-0 text-[#78716c]" />
              <span className="truncate">{conversation.title}</span>
            </button>
          )) : (
            <p className="px-2.5 py-2 text-sm leading-5 text-[#737373]">Recent chats will show here after you ask Stanley something.</p>
          )}
        </div>
      </div>

      <div className="border-t border-black/5 pt-3">
        <Link
          href="/portal/settings"
          prefetch={false}
          className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-[#374151] transition hover:bg-white/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <div className="mt-2 flex items-center gap-2 rounded-xl px-2 py-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#0f1720] text-xs font-bold text-white">{session.companyName.slice(0, 1) || "B"}</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#111827]">{session.companyName}</p>
            <p className="truncate text-xs text-[#737373]">{session.name} · {session.roleLabel}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-[#737373] transition hover:bg-white/65 hover:text-[#111827]"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

function EmptyState({
  summary,
  statusError,
}: {
  summary: BrainSummary | null
  statusError: string | null
}) {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl text-center">
        <p className="mb-4 text-xs font-medium text-[#737373]">{summary ? "Bayview records connected" : "Connecting records"}</p>
        <h1 className="text-[34px] font-semibold tracking-[-0.04em] text-[#111827] md:text-[44px]">
          How can I help?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#737373]">
          Ask about billing, jobs, customers, uploaded files, or follow-up. I’ll ask before sending or changing anything.
        </p>
        {statusError ? (
          <div className="mx-auto mt-5 max-w-lg rounded-2xl border border-[#f0c6c0] bg-white p-3 text-sm font-medium text-[#9c2f24]">
            I’m having trouble reaching the office records right now. Try again in a minute.
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ChatMessage({
  message,
  onPreview,
  onChoice,
}: {
  message: CompanyBrainMessage
  onPreview: (preview: PreviewState) => void
  onChoice: (choice: string) => void
}) {
  const isUser = message.role === "user"

  return (
    <article className={cn("group flex", isUser ? "justify-end" : "justify-start")}>
      <div className={cn("min-w-0", isUser ? "max-w-[82%]" : "max-w-[min(100%,720px)] flex-1")}>
        {isUser ? (
          <div className="space-y-2 rounded-[22px] bg-[#2f3137] px-4 py-2.5 text-[15px] font-medium leading-7 text-white">
            {message.blocks.map((block) => {
              if (block.type === "text") return <AssistantText key={block.id} text={block.text} tone="dark" />
              if (block.type === "attachment") return <AttachmentPill key={block.id} attachment={block.attachment} tone="dark" />
              return null
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {message.blocks.map((block) => (
              <MessageBlock key={block.id} block={block} onPreview={onPreview} onChoice={onChoice} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function AssistantText({ text, tone = "light" }: { text: string; tone?: "light" | "dark" }) {
  const safe = sanitizePortalDisplayText(text)
  const lines = safe.split(/\n+/).map((line) => line.trim()).filter(Boolean)
  const dark = tone === "dark"
  if (!lines.length) return null
  return (
    <div className={cn("space-y-1 text-[15px] leading-[1.55]", dark ? "text-white" : "text-[#1f2937]")}>
      {lines.map((line, index) => {
        const bullet = line.match(/^[-*•]\s+(.+)$/)
        const numbered = line.match(/^(\d+[.)])\s+(.+)$/)
        if (bullet) {
          return <div key={`${index}-${line}`} className="flex gap-2"><span className={cn("mt-0.5", dark ? "text-white/75" : "text-[#15803d]")}>•</span><span>{bullet[1]}</span></div>
        }
        if (numbered) {
          return <div key={`${index}-${line}`} className="flex gap-2"><span className={cn("shrink-0 font-bold", dark ? "text-white/75" : "text-[#15803d]")}>{numbered[1]}</span><span>{numbered[2]}</span></div>
        }
        return <p key={`${index}-${line}`} className="max-w-prose">{line}</p>
      })}
    </div>
  )
}

function MessageBlock({
  block,
  onPreview,
  onChoice,
}: {
  block: CompanyBrainBlock
  onPreview: (preview: PreviewState) => void
  onChoice: (choice: string) => void
}) {
  if (block.type === "text") {
    return <AssistantText text={block.text} />
  }

  if (block.type === "sources") {
    return (
      <div className="rounded-lg border border-[#e1d8ca] bg-white p-3">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase text-[#667085]">{block.title ?? "Sources"}</p>
          <button
            type="button"
            className="text-xs font-bold text-[#15803d] hover:text-[#116832]"
            onClick={() => onPreview({ type: "sources", sources: block.sources, title: block.title })}
          >
            View all
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {block.sources.map((source) => (
            <span
              key={source.id}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#d9eadf] bg-[#f5fbf7] px-3 py-1.5 text-xs font-semibold text-[#2d4c36]"
            >
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[10px] uppercase text-[#15803d]">
                {source.system}
              </span>
              <span className="truncate">{source.label}</span>
            </span>
          ))}
        </div>
      </div>
    )
  }

  if (block.type === "artifact") {
    return (
      <ArtifactCard artifact={block.artifact} onPreview={() => onPreview({ type: "artifact", artifact: block.artifact })} />
    )
  }

  if (block.type === "table") {
    return <TableCard table={block.table} onPreview={() => onPreview({ type: "table", table: block.table })} />
  }

  if (block.type === "clarification") {
    return (
      <div className="rounded-lg border border-[#d9eadf] bg-[#f5fbf7] p-4">
        <p className="font-bold text-[#102033]">{block.question}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {block.options.map((option) => (
            <button
              type="button"
              key={option}
              className="rounded-full border border-[#cfe6d7] bg-white px-3 py-1.5 text-xs font-bold text-[#15803d]"
              onClick={() => onChoice(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (block.type === "workflow") {
    return <WorkflowReceiptCard receipt={block.receipt} />
  }

  if (block.type === "error" && "title" in block && "message" in block) {
    return (
      <div className="rounded-lg border border-[#f0c6c0] bg-[#fff7f5] p-4">
        <p className="font-bold text-[#9c2f24]">{block.title}</p>
        <p className="mt-1 text-sm leading-6 text-[#7a3b35]">{block.message}</p>
      </div>
    )
  }

  return null
}

function workflowTone(phase: WorkflowAdapterState["phase"]) {
  if (phase === "completed") return { border: "border-[#cfe6d7]", background: "bg-[#f5fbf7]", ink: "text-[#116832]" }
  if (phase === "failed" || phase === "unknown_outcome") return { border: "border-[#f0c6c0]", background: "bg-[#fff7f5]", ink: "text-[#9c2f24]" }
  if (phase === "partial" || phase === "reconciliation_required" || phase === "approval_required") return { border: "border-[#ead9ad]", background: "bg-[#fffbeb]", ink: "text-[#7a5b12]" }
  return { border: "border-[#d9e2ea]", background: "bg-white", ink: "text-[#36536b]" }
}

function workflowPhaseLabel(phase: WorkflowAdapterState["phase"]) {
  const labels: Record<WorkflowAdapterState["phase"], string> = {
    idle: "Ready",
    planning: "Planning",
    running: "In progress",
    approval_required: "Approval required",
    cancelling: "Stopping",
    cancelled: "Cancelled",
    completed: "Completed",
    partial: "Completed with exceptions",
    failed: "Not completed",
    reconciliation_required: "Reconciliation required",
    unknown_outcome: "Outcome unknown",
  }
  return labels[phase]
}

function WorkflowStatusPanel({
  state,
  tenantId,
  onDecision,
  onSaveRoutine,
}: {
  state: WorkflowAdapterState
  tenantId: string
  onDecision: (decision: "Approve" | "Cancel") => void
  onSaveRoutine: () => void
}) {
  const tone = workflowTone(state.phase)
  const recentHistory = state.history.slice(-4)
  const saveEligible = canSaveWorkflowAsRoutine(state.receipt, tenantId)
  const active = ["planning", "running", "cancelling"].includes(state.phase)
  return (
    <section
      data-testid="workflow-status"
      aria-live="polite"
      className={cn("mb-3 overflow-hidden rounded-2xl border shadow-sm", tone.border, tone.background)}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {state.phase === "completed" ? <CircleCheck className="h-5 w-5 shrink-0 text-[#15803d]" /> : state.phase === "failed" || state.phase === "unknown_outcome" ? <CircleAlert className="h-5 w-5 shrink-0 text-[#b42318]" /> : <CircleDashed className={cn("h-5 w-5 shrink-0", active && "motion-safe:animate-spin", tone.ink)} />}
          <div className="min-w-0">
            <p className={cn("text-sm font-bold", tone.ink)}>{workflowPhaseLabel(state.phase)}</p>
            <p className="truncate text-xs text-[#667085]">{state.history.at(-1)?.label ?? "Workflow update"}</p>
          </div>
        </div>
        <span className="rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#667085]">
          {state.operation.replace("_", " ")}
        </span>
      </div>

      {recentHistory.length ? (
        <ol className="border-t border-black/5 px-4 py-3" aria-label="Workflow history">
          {recentHistory.map((item, index) => (
            <li key={item.id} className="flex gap-3 pb-2 last:pb-0">
              <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", index === recentHistory.length - 1 ? "bg-[#15803d]" : "bg-[#b8c3bd]")} />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#344054]">{item.label}</p>
                {item.detail ? <p className="mt-0.5 text-xs leading-5 text-[#667085]">{item.detail}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {state.approval ? (
        <div className="border-t border-[#ead9ad] bg-white/55 px-4 py-3">
          <p className="text-sm font-bold text-[#4d3b10]">
            Review {state.approval.actionCount} action{state.approval.actionCount === 1 ? "" : "s"} for {state.approval.systems.join(" and ")}.
          </p>
          <p className="mt-1 text-xs leading-5 text-[#6b5a2f]">Approval applies only to the actions shown in this request.</p>
          <ol className="mt-3 space-y-2" aria-label="Exact actions requiring approval">
            {state.approval.actions.map((action) => (
              <li key={`${state.approval?.binding}-${action.order}`} className="rounded-xl border border-[#ead9ad] bg-white px-3 py-2">
                <p className="text-xs font-bold text-[#4d3b10]">{action.order}. {safeWorkflowText(action.summary, "Consequential action", 240)}</p>
                <p className="mt-1 text-xs text-[#6b5a2f]">Target: {safeWorkflowText(action.target, "Specified record", 160)}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.06em] text-[#7b6a42]">{action.consequenceClass.replaceAll("_", " ")} · {action.approvalClass.replaceAll("_", " ")} · {action.stepScope.replaceAll("_", " ")}</p>
              </li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" className="h-9 rounded-full bg-[#15803d] px-4 text-white hover:bg-[#116832]" onClick={() => onDecision("Approve")}>
              <Check className="mr-1.5 h-4 w-4" /> Approve
            </Button>
            <Button type="button" variant="outline" className="h-9 rounded-full border-[#d1c6aa] bg-white px-4 text-[#694e0e]" onClick={() => onDecision("Cancel")}>
              Cancel
            </Button>
          </div>
        </div>
      ) : null}

      {saveEligible ? (
        <div className="border-t border-[#d9eadf] bg-white/55 px-4 py-3">
          <button type="button" onClick={onSaveRoutine} className="inline-flex items-center gap-2 rounded-full border border-[#cfe6d7] bg-white px-3 py-2 text-xs font-bold text-[#15803d] transition hover:bg-[#eef9f2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]">
            <Save className="h-4 w-4" /> Save as routine
          </button>
        </div>
      ) : null}
    </section>
  )
}

function SupportedActionMatrix({ matrix, state }: { matrix: SupportedActionMatrixContract | null; state: SupportedActionMatrixState }) {
  const stateMessages: Record<Exclude<SupportedActionMatrixState, "ready">, string> = {
    loading: "Loading supported workflows…",
    unavailable: "Supported workflows are unavailable. No provider support is being inferred.",
    stale_version: "Supported workflows are stale for this runtime version.",
    denied: "You do not have permission to view supported workflows.",
    error: "Supported workflows could not be verified.",
  }
  if (state !== "ready" || !matrix) {
    return <div data-testid="supported-action-matrix" className="mb-3 rounded-xl border border-[#deded9] bg-white px-3 py-2 text-xs text-[#667085]">{stateMessages[state === "ready" ? "error" : state]}</div>
  }
  return (
    <details data-testid="supported-action-matrix" className="mb-3 rounded-xl border border-[#deded9] bg-white px-3 py-2 text-xs text-[#344054]">
      <summary className="cursor-pointer font-bold">Supported workflows ({matrix.actions.length})</summary>
      <div className="mt-2 space-y-1.5">
        {matrix.actions.map((action) => (
          <div key={`${matrix.matrixVersion}-${action.workflow}-${action.action}`} className="flex flex-wrap justify-between gap-2 border-t border-[#eceae5] pt-1.5">
            <span>{safeWorkflowText(action.action, "Action", 80)} · {safeWorkflowText(action.system, "system", 80)}</span>
            <span className="text-[#667085]">Approval: {action.approval} · Readback: {action.readback}</span>
          </div>
        ))}
      </div>
    </details>
  )
}

function WorkflowReceiptCard({ receipt }: { receipt: WorkflowReceipt }) {
  const success = receipt.resultSummary.status === "completed" && receipt.reconciliationStatus === "reconciled"
  const partial = receipt.resultSummary.status === "partial" || receipt.reconciliationStatus === "reconciled_with_exceptions"
  return (
    <section data-testid="workflow-receipt" className={cn("overflow-hidden rounded-xl border bg-white shadow-sm", success ? "border-[#cfe6d7]" : partial ? "border-[#ead9ad]" : "border-[#f0c6c0]") }>
      <div className="flex items-start gap-3 p-4">
        {success ? <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#15803d]" /> : <CircleAlert className={cn("mt-0.5 h-5 w-5 shrink-0", partial ? "text-[#8a681b]" : "text-[#b42318]")} />}
        <div className="min-w-0">
          <p className="font-bold text-[#102033]">{receipt.resultSummary.title}</p>
          <p className="mt-1 text-sm leading-6 text-[#5f6d7a]">{receipt.resultSummary.detail}</p>
        </div>
      </div>
      <div className="border-t border-[#eceae5] px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#667085]">Provider readback</p>
        {receipt.providerReadback.length ? (
          <div className="mt-2 space-y-2">
            {receipt.providerReadback.map((readback, index) => (
              <div key={`${readback.system}-${index}`} className="flex items-start justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-[#344054]">{safeWorkflowText(readback.system, "Connected records", 80)}</p>
                  <p className="mt-0.5 leading-5 text-[#667085]">{safeWorkflowText(readback.summary, "Readback unavailable", 300)}</p>
                </div>
                <span className={cn("shrink-0 rounded-full px-2 py-1 font-bold", readback.status === "verified" ? "bg-[#e9f8ed] text-[#116832]" : readback.status === "rejected" ? "bg-[#fff1ef] text-[#9c2f24]" : "bg-[#f3f4f6] text-[#667085]")}>{readback.status.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        ) : <p className="mt-2 text-xs leading-5 text-[#667085]">No provider readback was included. The result is not treated as reconciled.</p>}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#eceae5] bg-[#fbfbf9] px-4 py-3 text-xs">
        <span className="font-semibold text-[#667085]">Reconciliation: {receipt.reconciliationStatus.replaceAll("_", " ")}</span>
        {receipt.artifacts.length ? <span className="font-semibold text-[#344054]">{receipt.artifacts.length} artifact{receipt.artifacts.length === 1 ? "" : "s"}</span> : null}
      </div>
    </section>
  )
}

function ArtifactCard({ artifact, onPreview }: { artifact: Artifact; onPreview: () => void }) {
  const Icon = artifact.kind === "spreadsheet" ? Sheet : artifact.kind === "html" ? ArrowUp : FileText

  return (
    <div className="rounded-lg border border-[#e1d8ca] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#f1f7ef] text-[#15803d]">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-bold text-[#102033]">{artifact.title}</p>
              <span className="rounded-full border border-[#d9eadf] px-2 py-1 text-[11px] font-bold uppercase text-[#15803d]">
                {artifact.kind}
              </span>
            </div>
            <p className="mt-1 text-sm leading-6 text-[#5f6d7a]">{artifact.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {artifact.status === "ready" && artifact.downloadUrl ? (
            <Button
              type="button"
              className="h-9 rounded-lg bg-[#15803d] text-white hover:bg-[#116832]"
              onClick={() => downloadArtifact(artifact)}
            >
              Download {(artifact.extension ?? artifact.kind).toUpperCase()}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function TableCard({ table, onPreview }: { table: TablePreview; onPreview: () => void }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e1d8ca] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#ece4d8] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <Table2 className="h-4 w-4 shrink-0 text-[#15803d]" />
          <p className="truncate font-bold text-[#102033]">{table.title}</p>
        </div>
        <button type="button" className="text-xs font-bold text-[#15803d]" onClick={onPreview}>
          Open
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-[#fbf8f2] text-xs uppercase text-[#667085]">
            <tr>
              {table.columns.map((column) => (
                <th key={column} className="px-4 py-3 font-bold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ece4d8]">
            {table.rows.map((row, index) => (
              <tr key={`${table.id}-${index}`}>
                {table.columns.map((column) => (
                  <td key={column} className="px-4 py-3 text-[#2c3f52]">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function formatAttachmentSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** index
  return `${value >= 10 || index === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[index]}`
}

function AttachmentPill({
  attachment,
  onRemove,
  tone = "light",
}: {
  attachment: CompanyBrainAttachment
  onRemove?: () => void
  tone?: "light" | "dark"
}) {
  const dark = tone === "dark"

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold",
        dark ? "border-white/15 bg-white/10 text-white" : "border-[#d9eadf] bg-[#f5fbf7] text-[#2d4c36]",
      )}
    >
      <FileText className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{attachment.name}</span>
      <span className={cn("shrink-0 font-semibold", dark ? "text-white/65" : "text-[#6c7a6f]")}>{attachment.kind} · {formatAttachmentSize(attachment.size)}</span>
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className={cn("ml-0.5 rounded-full p-0.5", dark ? "hover:bg-white/15" : "hover:bg-white")}
          aria-label={`Remove ${attachment.name}`}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </span>
  )
}

function ChatComposer({
  input,
  attachments,
  disabled,
  onInput,
  conversationId,
  onAttachments,
  onUploading,
  onUploadError,
  onSubmit,
  onCancel,
  onKeyDown,
}: {
  input: string
  attachments: CompanyBrainAttachment[]
  conversationId: string
  disabled: boolean
  onInput: (value: string) => void
  onAttachments: (value: CompanyBrainAttachment[]) => void
  onUploading: (value: boolean) => void
  onUploadError: (value: string | null) => void
  onSubmit: (event: FormEvent) => void
  onCancel?: () => void
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const attachmentsReady = attachments.every((attachment) => attachment.status === "ready" && attachment.extractionStatus === "ready")
  const canSend = (input.trim().length > 0 || attachments.length > 0) && attachmentsReady && !disabled

  async function addFiles(files: File[]) {
    if (!files.length) return
    onUploading(true)
    try {
      const uploaded = await uploadCompanyBrainFiles(conversationId, files)
      onAttachments([...attachments, ...uploaded])
      onUploadError(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : "The file could not be uploaded. Remove it and try again."
      onUploadError(message)
    } finally {
      onUploading(false)
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    void addFiles(Array.from(event.target.files ?? []))
    event.target.value = ""
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    if (disabled || !event.dataTransfer.types.includes("Files")) return
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    setIsDraggingFile(true)
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDraggingFile(false)
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    if (disabled) return
    event.preventDefault()
    setIsDraggingFile(false)
    void addFiles(Array.from(event.dataTransfer.files ?? []))
  }

  function removeAttachment(id: string) {
    onAttachments(attachments.filter((attachment) => attachment.id !== id))
  }

  return (
    <form onSubmit={onSubmit} className="shrink-0 bg-[#f7f7f5] pb-4 pt-3 md:pb-6">
      <div
        data-testid="portal-attachment-dropzone"
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "rounded-[28px] border bg-white p-2 shadow-[0_10px_34px_rgba(15,23,32,0.08)] transition focus-within:shadow-[0_16px_46px_rgba(15,23,32,0.12)]",
          isDraggingFile ? "border-[#15803d] ring-4 ring-[#15803d]/15" : "border-[#deded9]",
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="sr-only"
          onChange={handleFileChange}
          aria-label="Attach files"
        />
        {attachments.length ? (
          <div className="flex flex-wrap gap-2 border-b border-[#eeeeeb] px-2 pb-2">
            {attachments.map((attachment) => (
              <AttachmentPill
                key={attachment.id}
                attachment={attachment}
                onRemove={() => removeAttachment(attachment.id)}
              />
            ))}
          </div>
        ) : null}
        <textarea
          value={input}
          disabled={disabled}
          rows={1}
          placeholder="Message Company Brain"
          onChange={(event) => onInput(event.target.value)}
          onKeyDown={onKeyDown}
          className="max-h-40 min-h-[58px] w-full resize-none bg-transparent px-3 py-4 text-[15px] leading-6 tracking-normal text-[#111827] outline-none placeholder:text-[#8a8a86] disabled:cursor-not-allowed"
        />
        <div className="flex items-center justify-between gap-3 border-t border-[#eeeeeb] px-2 pt-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
            className="grid h-9 w-9 place-items-center rounded-full text-[#5f6368] transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-1">
            {onCancel ? (
              <Button
                type="button"
                onClick={onCancel}
                className="grid h-9 w-9 rounded-full bg-[#9c2f24] p-0 text-white hover:bg-[#7f251c]"
                aria-label="Stop request"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!canSend}
                className="grid h-9 w-9 rounded-full bg-[#111827] p-0 text-white hover:bg-black disabled:bg-[#d4d4d0]"
                aria-label="Send message"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

function TypingMessage({ label }: { label: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 grid h-8 w-8 place-items-center rounded-lg bg-[#15803d] text-white">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="rounded-lg border border-[#e1d8ca] bg-white px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#15803d]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#9ac8a8] [animation-delay:120ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#c4d7c9] [animation-delay:240ms]" />
        </div>
        <p className="mt-2 text-xs font-semibold text-[#667085]">{label}</p>
      </div>
    </div>
  )
}


function downloadArtifact(artifact: Artifact) {
  if (artifact.status !== "ready" || !artifact.downloadUrl) return
  const anchor = document.createElement("a")
  anchor.href = artifact.downloadUrl
  anchor.download = artifact.fileName ?? `${artifact.title}.${artifact.extension ?? artifact.kind}`
  anchor.rel = "noopener"
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

function PreviewDialog({
  preview,
  onClose,
}: {
  preview: PreviewState
  onClose: () => void
}) {
  return (
    <Dialog open={Boolean(preview)} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent className="max-h-[85svh] overflow-y-auto rounded-xl border-[#ded6c8] bg-[#fffdf8] text-[#102033] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {preview?.type === "artifact" ? preview.artifact.title : preview?.type === "table" ? preview.table.title : "Checked records"}
          </DialogTitle>
          <DialogDescription>Preview the runtime-created result before downloading or using it.</DialogDescription>
        </DialogHeader>
        {preview ? <PreviewContent preview={preview} /> : null}
      </DialogContent>
    </Dialog>
  )
}

function PreviewContent({ preview }: { preview: NonNullable<PreviewState> }) {
  if (preview.type === "artifact") {
    return (
      <div className="rounded-lg border border-[#e1d8ca] bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-[#15803d]">{preview.artifact.kind}</p>
            {preview.artifact.fileName ? (
              <p className="mt-1 text-xs font-semibold text-[#667085]">{preview.artifact.fileName}</p>
            ) : null}
          </div>
          {preview.artifact.status === "ready" && preview.artifact.downloadUrl ? (
            <Button
              type="button"
              className="h-9 rounded-lg bg-[#15803d] text-white hover:bg-[#116832]"
              onClick={() => downloadArtifact(preview.artifact)}
            >
              Download {(preview.artifact.extension ?? preview.artifact.kind).toUpperCase()}
            </Button>
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-6 text-[#4d5d69]">{preview.artifact.description}</p>
        <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-[#f7f2ea] p-4 text-sm leading-6 text-[#102033]">
          {preview.artifact.preview ?? "Preview is preparing."}
        </pre>
      </div>
    )
  }


  if (preview.type === "table") {
    return <TableCard table={preview.table} onPreview={() => undefined} />
  }

  return (
    <div className="space-y-2">
      {preview.sources.map((source) => (
        <div key={source.id} className="rounded-lg border border-[#e1d8ca] bg-white p-3">
          <p className="text-sm font-bold text-[#102033]">{source.label}</p>
          <p className="mt-1 text-sm leading-6 text-[#667085]">{source.detail}</p>
          <p className="mt-2 text-xs font-bold uppercase text-[#15803d]">{source.system}</p>
        </div>
      ))}
    </div>
  )
}
