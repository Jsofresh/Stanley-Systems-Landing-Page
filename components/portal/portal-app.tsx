"use client"

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowUp,
  CheckCircle2,
  Clock3,
  FileText,
  Menu,
  MessageSquare,
  MessageSquarePlus,
  Paperclip,
  Search,
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
import { appendMessageToConversation, replaceConversationMessages } from "@/lib/portal/conversation-state"
import {
  confirmCompanyBrainAction,
  getCompanyBrainSummary,
  sendCompanyBrainMessage,
  uploadCompanyBrainFiles,
  type BrainSummary,
} from "@/lib/company-brain/live"
import type {
  Artifact,
  CompanyBrainAttachment,
  CompanyBrainBlock,
  CompanyBrainMessage,
  PreparedAction,
  SourceChip,
  TablePreview,
} from "@/lib/company-brain/types"

type RecentConversation = {
  id: string
  title: string
  messages: CompanyBrainMessage[]
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
]

function sanitizePortalDisplayText(value: string) {
  return sensitiveDisplayPatterns.reduce((current, pattern) => current.replace(pattern, "[redacted]"), value)
}

type StoredPortalHistory = {
  version: 1
  savedAt: number
  currentConversationId: string
  recentConversations: RecentConversation[]
}

const PORTAL_HISTORY_VERSION = 1 as const
const PORTAL_HISTORY_TTL_MS = 4 * 60 * 60 * 1000
const PORTAL_HISTORY_MAX_BYTES = 1_000_000

function portalHistoryKey(session: PortalSession) {
  return `stanley-ui:company-brain-history:${session.companyId}:${session.actorId}:${session.loginSessionId}`
}

function loadPortalHistory(session: PortalSession): StoredPortalHistory | null {
  if (typeof window === "undefined") return null
  try {
    const key = portalHistoryKey(session)
    const parsed = JSON.parse(window.sessionStorage.getItem(key) || "null") as StoredPortalHistory | null
    if (parsed?.version !== PORTAL_HISTORY_VERSION || !Number.isFinite(parsed.savedAt) || Date.now() - parsed.savedAt > PORTAL_HISTORY_TTL_MS) {
      window.sessionStorage.removeItem(key)
      return null
    }
    if (!parsed.currentConversationId || !Array.isArray(parsed.recentConversations)) return null
    return {
      version: PORTAL_HISTORY_VERSION,
      savedAt: parsed.savedAt,
      currentConversationId: parsed.currentConversationId,
      recentConversations: parsed.recentConversations
        .filter((conversation) => conversation?.id && Array.isArray(conversation.messages))
        .slice(0, 8),
    }
  } catch {
    return null
  }
}

function savePortalHistory(session: PortalSession, currentConversationId: string, recentConversations: RecentConversation[]) {
  if (typeof window === "undefined") return
  const payload: StoredPortalHistory = {
    version: PORTAL_HISTORY_VERSION,
    savedAt: Date.now(),
    currentConversationId,
    recentConversations: recentConversations.slice(0, 8).map((conversation) => ({
      ...conversation,
      messages: conversation.messages.slice(-60),
    })),
  }
  try {
    let serialized = JSON.stringify(payload)
    if (serialized.length > PORTAL_HISTORY_MAX_BYTES) {
      const active = payload.recentConversations.find((conversation) => conversation.id === currentConversationId)
      serialized = JSON.stringify({
        ...payload,
        recentConversations: active ? [{ ...active, messages: active.messages.slice(-20) }] : [],
      })
    }
    window.sessionStorage.setItem(portalHistoryKey(session), serialized)
  } catch {
    // Session storage can be unavailable in private mode; chat still works in-memory.
  }
}

type PreviewState =
  | { type: "artifact"; artifact: Artifact }
  | { type: "action"; action: PreparedAction; conversationId?: string }
  | { type: "table"; table: TablePreview }
  | { type: "sources"; sources: SourceChip[]; title?: string }
  | null

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
  const [approvingActionReference, setApprovingActionReference] = useState<string | null>(null)
  const [approvalError, setApprovalError] = useState<string | null>(null)
  const [currentConversationId, setCurrentConversationId] = useState(() => `conversation-${Date.now()}`)
  const [recentConversations, setRecentConversations] = useState<RecentConversation[]>([])
  const currentConversationIdRef = useRef(currentConversationId)
  const isSendingRef = useRef(false)
  const approvalPendingRef = useRef(new Set<string>())
  const historyLoadedRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    if (!session) return
    const saved = loadPortalHistory(session)
    if (saved) {
      currentConversationIdRef.current = saved.currentConversationId
      setCurrentConversationId(saved.currentConversationId)
      setRecentConversations(saved.recentConversations)
      const active = saved.recentConversations.find((conversation) => conversation.id === saved.currentConversationId)
      setMessages(active?.messages ?? [])
    }
    historyLoadedRef.current = true
  }, [session])

  useEffect(() => {
    if (!session || !historyLoadedRef.current) return
    savePortalHistory(session, currentConversationId, recentConversations)
  }, [session, currentConversationId, recentConversations])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" })
  }, [messages, isSending])

  useEffect(() => {
    if (!messages.length) return
    const firstUserText = messages
      .find((message) => message.role === "user")
      ?.blocks.find((block) => block.type === "text")
    const title = firstUserText?.type === "text" ? firstUserText.text.slice(0, 54) : "New conversation"
    setRecentConversations((current) => {
      const next = [
        { id: currentConversationId, title, messages },
        ...current.filter((item) => item.id !== currentConversationId),
      ]
      return next.slice(0, 8)
    })
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
    if (session && typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(portalHistoryKey(session))
      } catch {
        // Cookie revocation is authoritative when browser storage is unavailable.
      }
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
    const originTitle = hasText
      ? rawMessage.trim().slice(0, 54)
      : messageAttachments[0]?.name.slice(0, 54) || "New conversation"

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
    setRecentConversations((current) => replaceConversationMessages(
      current,
      originConversationId,
      originTitle,
      originMessages,
    ).slice(0, 8))
    setInput("")
    setAttachments([])
    setIsSending(true)

    try {
      const response = await sendCompanyBrainMessage({
        companyId: session?.companyId ?? "",
        conversationId: originConversationId,
        message: rawMessage,
        attachments: messageAttachments,
      })
      setRecentConversations((current) => appendMessageToConversation(
        current,
        originConversationId,
        response.message,
        originTitle,
      ).slice(0, 8))
      if (currentConversationIdRef.current === originConversationId) {
        setMessages((current) => current.some((message) => message.id === response.message.id)
          ? current
          : [...current, response.message])
      }
    } catch (error) {
      const errorMessage: CompanyBrainMessage = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        createdAt: new Date().toISOString(),
        blocks: [
          {
            type: "error",
            id: "send-error",
            title: "Company Brain couldn’t finish that",
            message: error instanceof Error
              ? error.message
              : "The request outcome is unknown. Check recent activity before trying again.",
          },
        ],
      }
      setRecentConversations((current) => appendMessageToConversation(
        current,
        originConversationId,
        errorMessage,
        originTitle,
      ).slice(0, 8))
      if (currentConversationIdRef.current === originConversationId) {
        setMessages((current) => current.some((message) => message.id === errorMessage.id)
          ? current
          : [...current, errorMessage])
      }
    } finally {
      isSendingRef.current = false
      setIsSending(false)
    }
  }

  async function approvePreparedAction(action: PreparedAction, originConversationId: string) {
    const actionReference = action.approvalReference?.trim() ?? ""
    if (!actionReference || !/^actref_[A-Za-z0-9_-]{32,240}$/.test(actionReference)) {
      setApprovalError("This prepared action is no longer available. Prepare it again from the same conversation.")
      return
    }
    const pendingKey = `${originConversationId}:${actionReference}`
    if (approvalPendingRef.current.has(pendingKey)) return
    approvalPendingRef.current.add(pendingKey)
    setApprovingActionReference(actionReference)
    setApprovalError(null)
    try {
      const response = await confirmCompanyBrainAction(originConversationId, actionReference)
      const originTitle = recentConversations.find((conversation) => conversation.id === originConversationId)?.title ?? action.title
      setRecentConversations((current) => appendMessageToConversation(
        current,
        originConversationId,
        response.message,
        originTitle,
      ).slice(0, 8))
      if (currentConversationIdRef.current === originConversationId) {
        setMessages((current) => current.some((message) => message.id === response.message.id)
          ? current
          : [...current, response.message])
      }
      setPreview(null)
    } catch (error) {
      setApprovalError(error instanceof Error
        ? error.message
        : "Stanley could not verify the approval result. Check the original conversation before trying again.")
    } finally {
      approvalPendingRef.current.delete(pendingKey)
      setApprovingActionReference((current) => current === actionReference ? null : current)
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
      onOpenRecent={(conversation) => {
        if (isUploading) {
          setStatusError("Wait for the attachment upload to finish before switching conversations.")
          return
        }
        currentConversationIdRef.current = conversation.id
        setCurrentConversationId(conversation.id)
        setMessages(conversation.messages)
        setInput("")
        setAttachments([])
        setSidebarOpen(false)
      }}
      onNewChat={() => {
        if (isUploading) {
          setStatusError("Wait for the attachment upload to finish before starting another conversation.")
          return
        }
        const nextConversationId = `conversation-${Date.now()}`
        currentConversationIdRef.current = nextConversationId
        setCurrentConversationId(nextConversationId)
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
                        onPreview={(nextPreview) => {
                          setApprovalError(null)
                          setPreview(nextPreview?.type === "action"
                            ? { ...nextPreview, conversationId: currentConversationId }
                            : nextPreview)
                        }}
                      />
                    ))}
                    {isSending ? <TypingMessage /> : null}
                    <div ref={messagesEndRef} aria-hidden="true" />
                  </div>
                ) : (
                  <EmptyState summary={summary} statusError={statusError} />
                )}
              </div>
              <ChatComposer
                input={input}
                attachments={attachments}
                disabled={isSending || isUploading}
                onInput={setInput}
                conversationId={currentConversationId}
                onAttachments={setAttachments}
                onUploading={setIsUploading}
                onUploadError={setStatusError}
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
              />
            </div>
          </section>
        </main>
      </div>
      <PreviewDialog
        preview={preview}
        onClose={() => {
          if (!approvingActionReference) setPreview(null)
        }}
        onApprove={(action, conversationId) => void approvePreparedAction(action, conversationId)}
        approvingActionReference={approvingActionReference}
        approvalError={approvalError}
      />
    </div>
  )
}

function PortalSidebar({
  session,
  onLogout,
  onClose,
  onNewChat,
  recentConversations,
  onOpenRecent,
}: {
  session: PortalSession
  onLogout: () => void
  onClose: () => void
  onNewChat: () => void
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
}: {
  message: CompanyBrainMessage
  onPreview: (preview: PreviewState) => void
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
              <MessageBlock key={block.id} block={block} onPreview={onPreview} />
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
}: {
  block: CompanyBrainBlock
  onPreview: (preview: PreviewState) => void
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

  if (block.type === "action") {
    return <ActionCard action={block.action} onPreview={() => onPreview({ type: "action", action: block.action })} />
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
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    )
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

function ActionCard({ action, onPreview }: { action: PreparedAction; onPreview: () => void }) {
  return (
    <div className="rounded-lg border border-[#d8e7dc] bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#15803d]" />
            <p className="font-bold text-[#102033]">{action.title}</p>
            <span className="rounded-full bg-[#ddf7e8] px-2 py-1 text-[11px] font-bold uppercase text-[#116832]">
              Prepared, not sent
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-[#5f6d7a]">{action.description}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-9 rounded-lg border-[#cfe3d5] bg-[#fbfefc] text-[#15803d] hover:bg-[#eef9f2]"
          onClick={onPreview}
        >
          {action.ctaLabel}
        </Button>
      </div>
    </div>
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
          <Button
            type="button"
            variant="outline"
            className="h-9 rounded-lg border-[#d8d0c4] bg-[#fbf8f2] text-[#102033] hover:bg-white"
            onClick={onPreview}
          >
            Preview
          </Button>
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
            <Button
              type="submit"
              disabled={!canSend}
              className="grid h-9 w-9 rounded-full bg-[#111827] p-0 text-white hover:bg-black disabled:bg-[#d4d4d0]"
              aria-label="Send message"
            >
              {disabled ? <Clock3 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

function TypingMessage() {
  return (
    <div className="flex gap-3">
      <div className="mt-1 grid h-8 w-8 place-items-center rounded-lg bg-[#15803d] text-white">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-lg border border-[#e1d8ca] bg-white px-4 py-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#15803d]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#9ac8a8] [animation-delay:120ms]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#c4d7c9] [animation-delay:240ms]" />
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
  onApprove,
  approvingActionReference,
  approvalError,
}: {
  preview: PreviewState
  onClose: () => void
  onApprove: (action: PreparedAction, conversationId: string) => void
  approvingActionReference: string | null
  approvalError: string | null
}) {
  const title = useMemo(() => {
    if (!preview) return ""
    if (preview.type === "artifact") return preview.artifact.title
    if (preview.type === "action") return preview.action.title
    if (preview.type === "table") return preview.table.title
    return preview.title ?? "Sources"
  }, [preview])

  const approvalPending = preview?.type === "action"
    && Boolean(preview.action.approvalReference)
    && preview.action.approvalReference === approvingActionReference

  return (
    <Dialog open={Boolean(preview)} onOpenChange={(open) => (!open && !approvalPending ? onClose() : null)}>
      <DialogContent className="max-h-[85svh] overflow-y-auto rounded-xl border-[#ded6c8] bg-[#fffdf8] text-[#102033] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {preview?.type === "action"
              ? "Review the exact prepared change before approving it. Stanley will verify the provider result before reporting completion."
              : "Preview the runtime-created result before downloading or using it."}
          </DialogDescription>
        </DialogHeader>
        {preview ? (
          <PreviewContent
            preview={preview}
            onApprove={onApprove}
            approvalPending={approvalPending}
            approvalError={approvalError}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

function PreviewContent({
  preview,
  onApprove,
  approvalPending,
  approvalError,
}: {
  preview: NonNullable<PreviewState>
  onApprove: (action: PreparedAction, conversationId: string) => void
  approvalPending: boolean
  approvalError: string | null
}) {
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

  if (preview.type === "action") {
    const canApprove = Boolean(preview.action.approvalReference && preview.conversationId)
    return (
      <div className="rounded-lg border border-[#d8e7dc] bg-white p-4">
        <p className="text-sm leading-6 text-[#4d5d69]">{preview.action.description}</p>
        <div className="mt-4 rounded-lg bg-[#f5fbf7] p-4 text-sm leading-6 text-[#102033]">
          {preview.action.preview}
        </div>
        {approvalError ? (
          <p role="alert" className="mt-3 rounded-lg border border-[#f0c6c0] bg-[#fff7f5] p-3 text-sm text-[#9c2f24]">
            {approvalError}
          </p>
        ) : null}
        <Button
          type="button"
          disabled={!canApprove || approvalPending}
          onClick={() => {
            if (preview.conversationId) onApprove(preview.action, preview.conversationId)
          }}
          className="mt-4 rounded-lg bg-[#15803d] text-white hover:bg-[#116832] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {approvalPending ? "Approving…" : canApprove ? "Approve and execute" : "Prepare again to approve"}
        </Button>
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
