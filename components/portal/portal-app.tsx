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
  MoreHorizontal,
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
import {
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
  sessionKey: string
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

type PreviewState =
  | { type: "artifact"; artifact: Artifact }
  | { type: "action"; action: PreparedAction }
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
  const [currentConversationId, setCurrentConversationId] = useState(() => `conversation-${Date.now()}`)
  const [recentConversations, setRecentConversations] = useState<RecentConversation[]>([])
  const isSendingRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const hasMessages = messages.length > 0

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
    await fetch("/api/portal/logout", { method: "POST" }).catch(() => null)
    router.replace("/login")
  }

  async function sendMessage(messageText = input, messageAttachments = attachments) {
    const trimmed = messageText.trim()
    if ((!trimmed && messageAttachments.length === 0) || isSendingRef.current) return
    isSendingRef.current = true

    const userMessage: CompanyBrainMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      createdAt: new Date().toISOString(),
      blocks: [
        ...(trimmed ? [{ type: "text" as const, id: `user-text-${Date.now()}`, text: trimmed }] : []),
        ...messageAttachments.map((attachment) => ({
          type: "attachment" as const,
          id: `user-attachment-${attachment.id}`,
          attachment,
        })),
      ],
    }

    setMessages((current) => [...current, userMessage])
    setInput("")
    setAttachments([])
    setIsSending(true)

    try {
      const response = await sendCompanyBrainMessage({
        companyId: "bayview_synthetic",
        conversationId: currentConversationId,
        message: trimmed || "Review attached file.",
        attachments: messageAttachments,
      })
      setMessages((current) => [...current, response.message])
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
            message: error instanceof Error ? error.message : "I couldn’t finish from the company brain right now. Try again in a minute.",
          },
        ],
      }
      setMessages((current) => [...current, errorMessage])
    } finally {
      isSendingRef.current = false
      setIsSending(false)
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
      session={session}
      onLogout={handleLogout}
      onClose={() => setSidebarOpen(false)}
      recentConversations={recentConversations}
      onOpenRecent={(conversation) => {
        setCurrentConversationId(conversation.id)
        setMessages(conversation.messages)
        setInput("")
        setAttachments([])
        setSidebarOpen(false)
      }}
      onNewChat={() => {
        setCurrentConversationId(`conversation-${Date.now()}`)
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
                  <div className="space-y-7 pb-6 pt-3">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} onPreview={setPreview} />
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
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
              />
            </div>
          </section>
        </main>
      </div>
      <PreviewDialog preview={preview} onClose={() => setPreview(null)} />
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
    <article className={cn("group flex gap-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? (
        <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#111827] text-white">
          <Sparkles className="h-4 w-4" />
        </div>
      ) : null}
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
          <div className="space-y-3">
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
    <div className={cn("space-y-1.5 text-[15px] leading-6", dark ? "text-white" : "text-[#25384b]")}>
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

  return (
    <div className="rounded-lg border border-[#f0c6c0] bg-[#fff7f5] p-4">
      <p className="font-bold text-[#9c2f24]">{block.title}</p>
      <p className="mt-1 text-sm leading-6 text-[#7a3b35]">{block.message}</p>
    </div>
  )
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
          {artifact.downloadUrl || artifact.file ? (
            <Button
              type="button"
              className="h-9 rounded-lg bg-[#15803d] text-white hover:bg-[#116832]"
              onClick={() => downloadArtifact(artifact)}
            >
              Download {(artifact.extension ?? artifact.file?.extension ?? artifact.kind).toUpperCase()}
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
  onSubmit: (event: FormEvent) => void
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const canSend = (input.trim().length > 0 || attachments.length > 0) && !disabled

  async function addFiles(files: File[]) {
    if (!files.length) return
    onUploading(true)
    try {
      const uploaded = await uploadCompanyBrainFiles(conversationId, files)
      onAttachments([...attachments, ...uploaded])
    } catch (error) {
      const message = error instanceof Error ? error.message : "I received the file, but couldn’t read its contents yet."
      onAttachments([
        ...attachments,
        ...files.map((file, index) => ({
          id: `failed-${Date.now()}-${index}`,
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          mimeType: file.type || "application/octet-stream",
          kind: "unsupported" as const,
          status: "failed" as const,
          extractionStatus: "failed" as const,
          errorCode: message,
        })),
      ])
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
            <button type="button" className="hidden h-9 items-center gap-2 rounded-full px-3 text-sm text-[#5f6368] transition hover:bg-black/5 sm:inline-flex">
              <Search className="h-4 w-4" /> Search records
            </button>
            <button type="button" className="grid h-9 w-9 place-items-center rounded-full text-[#5f6368] transition hover:bg-black/5" aria-label="More">
              <MoreHorizontal className="h-5 w-5" />
            </button>
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
  if (artifact.downloadUrl) {
    const anchor = document.createElement("a")
    anchor.href = artifact.downloadUrl
    anchor.download = artifact.fileName ?? artifact.file?.fileName ?? `${artifact.title}.${artifact.extension ?? artifact.kind}`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    return
  }
  if (!artifact.file) return

  const blob = createArtifactBlob(artifact)
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = artifact.file.fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function createArtifactBlob(artifact: Artifact): Blob {
  const file = artifact.file
  if (!file) return new Blob([artifact.preview ?? artifact.description], { type: "text/plain" })

  if (file.extension === "pdf") {
    return new Blob([buildPdf(file.title, file.plainText ?? artifact.preview ?? artifact.description)], { type: file.mimeType })
  }

  if (file.extension === "html") {
    return new Blob([file.html ?? artifact.preview ?? ""], { type: file.mimeType })
  }

  if (file.extension === "xlsx") {
    return new Blob([buildXlsx(file.table ?? { columns: ["Item"], rows: [{ Item: artifact.preview ?? artifact.title }] })], {
      type: file.mimeType,
    })
  }

  if (file.extension === "docx") {
    return new Blob([buildDocx(file.title, file.plainText ?? artifact.preview ?? artifact.description)], { type: file.mimeType })
  }

  return new Blob([file.plainText ?? artifact.preview ?? artifact.description], { type: file.mimeType })
}

function buildPdf(title: string, body: string) {
  const lines = [title, "", ...body.split("\n")].slice(0, 36)
  const escaped = lines.map((line) => line.replace(/[\\()]/g, "\\$&"))
  const textOps = escaped.map((line, index) => `BT /F1 12 Tf 72 ${720 - index * 18} Td (${line}) Tj ET`).join("\n")
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${textOps.length} >>\nstream\n${textOps}\nendstream`,
  ]
  let pdf = "%PDF-1.4\n"
  const offsets = [0]
  objects.forEach((object, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`
  })
  const xrefStart = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`
  })
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`
  return pdf
}

type SheetRows = { columns: string[]; rows: Array<Record<string, string>> }

function buildXlsx(table: SheetRows) {
  const sheetRows = [table.columns, ...table.rows.map((row) => table.columns.map((column) => row[column] ?? ""))]
  const sheetData = sheetRows
    .map((row, rowIndex) => {
      const cells = row
        .map((value, columnIndex) => {
          const ref = `${columnName(columnIndex)}${rowIndex + 1}`
          return `<c r="${ref}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`
        })
        .join("")
      return `<row r="${rowIndex + 1}">${cells}</row>`
    })
    .join("")

  return zipFiles([
    {
      name: "[Content_Types].xml",
      text: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
    },
    {
      name: "_rels/.rels",
      text: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
    },
    {
      name: "xl/workbook.xml",
      text: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Company Brain" sheetId="1" r:id="rId1"/></sheets></workbook>',
    },
    {
      name: "xl/_rels/workbook.xml.rels",
      text: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
    },
    {
      name: "xl/worksheets/sheet1.xml",
      text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheetData}</sheetData></worksheet>`,
    },
  ])
}

function buildDocx(title: string, body: string) {
  const paragraphs = [title, "", ...body.split("\n")]
    .map((line) => `<w:p><w:r><w:t>${escapeXml(line)}</w:t></w:r></w:p>`)
    .join("")

  return zipFiles([
    {
      name: "[Content_Types].xml",
      text: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
    },
    {
      name: "_rels/.rels",
      text: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
    },
    {
      name: "word/document.xml",
      text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${paragraphs}<w:sectPr/></w:body></w:document>`,
    },
  ])
}

function columnName(index: number) {
  let name = ""
  let cursor = index + 1
  while (cursor > 0) {
    const remainder = (cursor - 1) % 26
    name = String.fromCharCode(65 + remainder) + name
    cursor = Math.floor((cursor - 1) / 26)
  }
  return name
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

function zipFiles(files: Array<{ name: string; text: string }>) {
  const encoder = new TextEncoder()
  const localParts: Uint8Array[] = []
  const centralParts: Uint8Array[] = []
  let offset = 0

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.name)
    const data = encoder.encode(file.text)
    const crc = crc32(data)
    const localHeader = zipHeader(30)
    localHeader.setUint32(0, 0x04034b50, true)
    localHeader.setUint16(4, 20, true)
    localHeader.setUint16(8, 0, true)
    localHeader.setUint32(14, crc, true)
    localHeader.setUint32(18, data.length, true)
    localHeader.setUint32(22, data.length, true)
    localHeader.setUint16(26, nameBytes.length, true)
    localParts.push(localHeader.bytes, nameBytes, data)

    const centralHeader = zipHeader(46)
    centralHeader.setUint32(0, 0x02014b50, true)
    centralHeader.setUint16(4, 20, true)
    centralHeader.setUint16(6, 20, true)
    centralHeader.setUint16(10, 0, true)
    centralHeader.setUint32(16, crc, true)
    centralHeader.setUint32(20, data.length, true)
    centralHeader.setUint32(24, data.length, true)
    centralHeader.setUint16(28, nameBytes.length, true)
    centralHeader.setUint32(42, offset, true)
    centralParts.push(centralHeader.bytes, nameBytes)

    offset += localHeader.bytes.length + nameBytes.length + data.length
  })

  const centralOffset = offset
  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0)
  const endHeader = zipHeader(22)
  endHeader.setUint32(0, 0x06054b50, true)
  endHeader.setUint16(8, files.length, true)
  endHeader.setUint16(10, files.length, true)
  endHeader.setUint32(12, centralSize, true)
  endHeader.setUint32(16, centralOffset, true)

  return concatBytes([...localParts, ...centralParts, endHeader.bytes])
}

function zipHeader(size: number) {
  const bytes = new Uint8Array(size)
  return { bytes, setUint16: (offset: number, value: number, le: boolean) => new DataView(bytes.buffer).setUint16(offset, value, le), setUint32: (offset: number, value: number, le: boolean) => new DataView(bytes.buffer).setUint32(offset, value, le) }
}

function concatBytes(parts: Uint8Array[]) {
  const total = parts.reduce((sum, part) => sum + part.length, 0)
  const output = new Uint8Array(total)
  let offset = 0
  parts.forEach((part) => {
    output.set(part, offset)
    offset += part.length
  })
  return output
}

function crc32(data: Uint8Array) {
  let crc = 0xffffffff
  for (let index = 0; index < data.length; index += 1) {
    crc ^= data[index]
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

function PreviewDialog({ preview, onClose }: { preview: PreviewState; onClose: () => void }) {
  const title = useMemo(() => {
    if (!preview) return ""
    if (preview.type === "artifact") return preview.artifact.title
    if (preview.type === "action") return preview.action.title
    if (preview.type === "table") return preview.table.title
    return preview.title ?? "Sources"
  }, [preview])

  return (
    <Dialog open={Boolean(preview)} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent className="max-h-[85svh] overflow-y-auto rounded-xl border-[#ded6c8] bg-[#fffdf8] text-[#102033] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Preview only. No writebacks or external sends are connected.</DialogDescription>
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
            {preview.artifact.fileName || preview.artifact.file ? (
              <p className="mt-1 text-xs font-semibold text-[#667085]">{preview.artifact.fileName ?? preview.artifact.file?.fileName}</p>
            ) : null}
          </div>
          {preview.artifact.downloadUrl || preview.artifact.file ? (
            <Button
              type="button"
              className="h-9 rounded-lg bg-[#15803d] text-white hover:bg-[#116832]"
              onClick={() => downloadArtifact(preview.artifact)}
            >
              Download {(preview.artifact.extension ?? preview.artifact.file?.extension ?? preview.artifact.kind).toUpperCase()}
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
    return (
      <div className="rounded-lg border border-[#d8e7dc] bg-white p-4">
        <p className="text-sm leading-6 text-[#4d5d69]">{preview.action.description}</p>
        <div className="mt-4 rounded-lg bg-[#f5fbf7] p-4 text-sm leading-6 text-[#102033]">
          {preview.action.preview}
        </div>
        <Button type="button" disabled className="mt-4 rounded-lg bg-[#15803d] text-white">
          Prepared, not sent
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
