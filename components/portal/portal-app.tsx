"use client"

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react"
import Link from "next/link"
import {
  ArrowUp,
  CheckCircle2,
  Clock3,
  FileText,
  Menu,
  MessageSquarePlus,
  Paperclip,
  Send,
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
  getNeedsAttention,
  sendCompanyBrainMessage,
  type BrainSummary,
  type NeedsAttentionCard,
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

const prompts = [
  "Can we bill Johnson?",
  "What needs attention today?",
  "Show me the QBO invoice mismatch.",
  "What happened with Maria Ramirez?",
  "Which completed jobs are missing an invoice?",
  "Draft the follow-up but do not send it.",
]

const recentConversations = [
  "Johnson billing check",
  "Customer follow-up draft",
  "Closeout photo list",
  "Owner summary packet",
]

const initialMessages: CompanyBrainMessage[] = []

type PreviewState =
  | { type: "artifact"; artifact: Artifact }
  | { type: "action"; action: PreparedAction }
  | { type: "table"; table: TablePreview }
  | { type: "sources"; sources: SourceChip[]; title?: string }
  | null

export function PortalApp() {
  const [messages, setMessages] = useState<CompanyBrainMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [attachments, setAttachments] = useState<CompanyBrainAttachment[]>([])
  const [isSending, setIsSending] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [preview, setPreview] = useState<PreviewState>(null)
  const [summary, setSummary] = useState<BrainSummary | null>(null)
  const [attentionCards, setAttentionCards] = useState<NeedsAttentionCard[]>([])
  const [statusError, setStatusError] = useState<string | null>(null)

  const hasMessages = messages.length > 0

  useEffect(() => {
    let cancelled = false
    async function loadLiveWorkflow() {
      try {
        const [summaryResponse, attentionResponse] = await Promise.all([
          getCompanyBrainSummary(),
          getNeedsAttention(),
        ])
        if (cancelled) return
        setSummary(summaryResponse)
        setAttentionCards(attentionResponse.cards ?? [])
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
  }, [])

  async function sendMessage(messageText = input, messageAttachments = attachments) {
    const trimmed = messageText.trim()
    if ((!trimmed && messageAttachments.length === 0) || isSending) return

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
        conversationId: "live-brain-test-conversation",
        message: trimmed || "Review attached file.",
        attachments: messageAttachments,
      })
      setMessages((current) => [...current, response.message])
    } catch {
      const errorMessage: CompanyBrainMessage = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        createdAt: new Date().toISOString(),
        blocks: [
          {
            type: "error",
            id: "send-error",
            title: "Message failed",
            message: "The live Company Brain workflow could not answer. Nothing was sent or written back.",
          },
        ],
      }
      setMessages((current) => [...current, errorMessage])
    } finally {
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
      onClose={() => setSidebarOpen(false)}
      onNewChat={() => {
        setMessages([])
        setInput("")
        setAttachments([])
        setSidebarOpen(false)
      }}
    />
  )

  return (
    <div className="min-h-screen bg-[#f7f2ea] text-[#102033]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[280px] shrink-0 border-r border-[#ded6c8] bg-[#fbf8f2] lg:block">
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
            <aside className="relative h-full w-[min(320px,86vw)] border-r border-[#ded6c8] bg-[#fbf8f2] shadow-2xl">
              {sidebar}
            </aside>
          </div>
        ) : null}

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#e7decf] bg-[#fbf8f2]/92 px-4 backdrop-blur md:h-16 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg text-[#102033] lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#102033]">Bayview Service Co.</p>
                <p className="truncate text-xs text-[#667085]">Live Company Brain workflow</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#667085]">
              <span className="hidden rounded-full border border-[#d9eadf] bg-white px-3 py-1.5 text-[#15803d] sm:inline-flex">
                {summary ? `Live · ${summary.source_record_counts?.jobber ?? 0} Jobber / ${summary.source_record_counts?.quickbooks ?? 0} QBO` : "Connecting live"}
              </span>
              <Link
                href="/portal/settings"
                className="grid h-9 w-9 place-items-center rounded-lg text-[#506070] transition hover:bg-white hover:text-[#15803d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]"
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </Link>
            </div>
          </header>

          <section className="flex min-h-0 flex-1 flex-col">
            <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 pb-4 pt-5 md:px-6 md:pb-6">
              <div className="min-h-0 flex-1">
                {hasMessages ? (
                  <div className="space-y-7 pb-6">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} onPreview={setPreview} />
                    ))}
                    {isSending ? <TypingMessage /> : null}
                  </div>
                ) : (
                  <EmptyState summary={summary} attentionCards={attentionCards} statusError={statusError} onPrompt={sendMessage} />
                )}
              </div>
              <ChatComposer
                input={input}
                attachments={attachments}
                disabled={isSending}
                onInput={setInput}
                onAttachments={setAttachments}
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

function PortalSidebar({ onClose, onNewChat }: { onClose: () => void; onNewChat: () => void }) {
  return (
    <div className="flex h-full flex-col px-3 py-4">
      <div className="mb-4 flex items-center justify-between px-2">
        <Link href="/portal" className="min-w-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]">
          <span className="block truncate text-base font-bold text-[#102033]">Stanley Systems</span>
          <span className="block truncate text-xs text-[#667085]">Company Brain</span>
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

      <Button
        type="button"
        className="h-11 justify-start rounded-lg bg-[#15803d] px-3 text-white hover:bg-[#116832]"
        onClick={onNewChat}
      >
        <MessageSquarePlus className="h-4 w-4" />
        New chat
      </Button>

      <div className="mt-6 flex-1 overflow-y-auto">
        <p className="px-2 text-xs font-bold uppercase text-[#7a746b]">Recent</p>
        <div className="mt-2 space-y-1">
          {recentConversations.map((item) => (
            <button
              type="button"
              key={item}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-[#435266] transition hover:bg-white hover:text-[#102033]"
              onClick={onClose}
            >
              <FileText className="h-4 w-4 shrink-0 text-[#8a9588]" />
              <span className="truncate">{item}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#e6dccd] pt-3">
        <Link
          href="/portal/settings"
          className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-[#435266] transition hover:bg-white hover:text-[#102033] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]"
        >
          <Settings className="h-4 w-4 text-[#15803d]" />
          Settings and account
        </Link>
        <div className="mt-3 rounded-lg border border-[#e3dacb] bg-white px-3 py-3">
          <p className="text-sm font-bold text-[#102033]">Bayview Service Co.</p>
          <p className="mt-1 text-xs leading-5 text-[#667085]">Live brain-test session. Actions stay prepared, not sent.</p>
        </div>
      </div>
    </div>
  )
}

function EmptyState({
  summary,
  attentionCards,
  statusError,
  onPrompt,
}: {
  summary: BrainSummary | null
  attentionCards: NeedsAttentionCard[]
  statusError: string | null
  onPrompt: (prompt: string) => Promise<void>
}) {
  return (
    <div className="py-8 md:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-[#e1d8ca] bg-white p-5 shadow-sm md:p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-[#15803d]">Stanley Office Console</p>
              <h1 className="mt-2 text-3xl font-bold leading-tight text-[#102033] md:text-4xl">
                Ask Stanley Systems about live office work, then review the proof before anyone acts.
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#5f6d7a] md:text-base">
                This page is connected to the brain-test Company Brain runtime. It reads Jobber and QBO source records, shows what needs attention, and keeps every action prepared, not sent.
              </p>
            </div>
            <div className="shrink-0 rounded-2xl border border-[#d9eadf] bg-[#f5fbf7] p-4 text-sm">
              <p className="font-bold text-[#102033]">Live source state</p>
              <p className="mt-1 text-[#5f6d7a]">Runtime: {summary?.runtime_version ?? "connecting"}</p>
              <p className="text-[#5f6d7a]">Jobber: {summary?.source_record_counts?.jobber ?? "—"} records</p>
              <p className="text-[#5f6d7a]">QBO: {summary?.source_record_counts?.quickbooks ?? "—"} records</p>
              <p className="mt-2 text-xs font-bold text-[#15803d]">Raw control-plane data included: {summary?.raw_customer_data_included ? "yes" : "no"}</p>
            </div>
          </div>
          {statusError ? (
            <div className="mt-5 rounded-xl border border-[#f0c6c0] bg-[#fff7f5] p-3 text-sm font-semibold text-[#9c2f24]">
              Live workflow unavailable: {statusError}
            </div>
          ) : null}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-[#e1d8ca] bg-[#fbf8f2] p-4 md:p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-[#102033]">Needs attention</h2>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#15803d]">
                {attentionCards.length || "—"} live cards
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {attentionCards.slice(0, 4).map((card) => (
                <button
                  key={card.card_id}
                  type="button"
                  className="w-full rounded-xl border border-[#e1d8ca] bg-white p-3 text-left transition hover:border-[#b9d8c2] hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]"
                  onClick={() => void onPrompt(card.title)}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#102033] px-2 py-1 text-[10px] font-bold uppercase text-white">
                      {card.priority}
                    </span>
                    <span className="text-xs font-bold uppercase text-[#15803d]">{card.status.replace(/_/g, " ")}</span>
                  </div>
                  <p className="mt-2 font-bold text-[#102033]">{card.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[#5f6d7a]">{card.summary}</p>
                  <p className="mt-2 text-xs font-semibold text-[#435266]">Next safe action: {card.next_safe_action}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#e1d8ca] bg-white p-4 md:p-5">
            <h2 className="text-lg font-bold text-[#102033]">Ask Stanley</h2>
            <p className="mt-1 text-sm leading-6 text-[#5f6d7a]">
              Try a real brain-test prompt. Answers show source chips, proof IDs, model-route metadata, and a prepared action when one is useful.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {prompts.map((prompt) => (
                <button
                  type="button"
                  key={prompt}
                  className="rounded-full border border-[#d9eadf] bg-[#f5fbf7] px-3 py-2 text-xs font-bold text-[#2d4c36] transition hover:bg-[#eaf7ef] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]"
                  onClick={() => void onPrompt(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-[#d9eadf] bg-[#f5fbf7] p-3 text-xs leading-5 text-[#435266]">
              DeepSeek V4 Pro may reason over bounded source snippets when the runtime has approved config. The harness still owns all writes and sends.
            </div>
          </div>
        </div>
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
    <article className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? (
        <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#15803d] text-white">
          <Sparkles className="h-4 w-4" />
        </div>
      ) : null}
      <div className={cn("min-w-0", isUser ? "max-w-[84%]" : "max-w-[min(100%,720px)] flex-1")}>
        {isUser ? (
          <div className="space-y-2 rounded-2xl rounded-tr-md bg-[#102033] px-4 py-3 text-sm font-medium leading-6 text-white shadow-sm">
            {message.blocks.map((block) => {
              if (block.type === "text") return <p key={block.id}>{block.text}</p>
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

function MessageBlock({
  block,
  onPreview,
}: {
  block: CompanyBrainBlock
  onPreview: (preview: PreviewState) => void
}) {
  if (block.type === "text") {
    return <p className="text-[15px] leading-7 text-[#25384b]">{block.text}</p>
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
          {artifact.file ? (
            <Button
              type="button"
              className="h-9 rounded-lg bg-[#15803d] text-white hover:bg-[#116832]"
              onClick={() => downloadArtifact(artifact)}
            >
              Download {artifact.file.extension.toUpperCase()}
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
      <span className={cn("shrink-0 font-semibold", dark ? "text-white/65" : "text-[#6c7a6f]")}>{formatAttachmentSize(attachment.size)}</span>
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

function fileToAttachment(file: File, index: number): CompanyBrainAttachment {
  return {
    id: `file-${Date.now()}-${index}-${file.name.replace(/[^a-z0-9._-]+/gi, "-")}`,
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
  }
}

function ChatComposer({
  input,
  attachments,
  disabled,
  onInput,
  onAttachments,
  onSubmit,
  onKeyDown,
}: {
  input: string
  attachments: CompanyBrainAttachment[]
  disabled: boolean
  onInput: (value: string) => void
  onAttachments: (value: CompanyBrainAttachment[]) => void
  onSubmit: (event: FormEvent) => void
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  const canSend = (input.trim().length > 0 || attachments.length > 0) && !disabled

  function addFiles(files: File[]) {
    if (!files.length) return
    onAttachments([...attachments, ...files.map(fileToAttachment)])
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(event.target.files ?? []))
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
    addFiles(Array.from(event.dataTransfer.files ?? []))
  }

  function removeAttachment(id: string) {
    onAttachments(attachments.filter((attachment) => attachment.id !== id))
  }

  return (
    <form onSubmit={onSubmit} className="sticky bottom-0 bg-[#f7f2ea] pb-2 pt-3">
      <div
        data-testid="portal-attachment-dropzone"
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "rounded-2xl border bg-white p-2 shadow-[0_16px_48px_rgba(16,32,51,0.08)] transition",
          isDraggingFile ? "border-[#15803d] ring-4 ring-[#15803d]/15" : "border-[#d8d0c4]",
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
          <div className="flex flex-wrap gap-2 border-b border-[#eee7dc] px-2 pb-2">
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
          placeholder="Ask about billing, jobs, customers, files, or follow-up..."
          onChange={(event) => onInput(event.target.value)}
          onKeyDown={onKeyDown}
          className="max-h-36 min-h-14 w-full resize-none bg-transparent px-3 py-4 text-[15px] leading-6 tracking-normal text-[#102033] outline-none placeholder:text-[#8a9380] disabled:cursor-not-allowed"
        />
        <div className="flex items-center justify-between gap-3 border-t border-[#eee7dc] px-2 pt-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-semibold text-[#7b8378] transition hover:bg-[#fbf8f2] hover:text-[#102033] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Paperclip className="h-4 w-4" />
            Attach
          </button>
          <Button
            type="submit"
            disabled={!canSend}
            className="h-9 rounded-lg bg-[#15803d] px-3 text-white hover:bg-[#116832]"
            aria-label="Send message"
          >
            {disabled ? <Clock3 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-[#7a746b]">Live brain-test workflow. Prepared actions are never sent.</p>
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
            {preview.artifact.file ? (
              <p className="mt-1 text-xs font-semibold text-[#667085]">{preview.artifact.file.fileName}</p>
            ) : null}
          </div>
          {preview.artifact.file ? (
            <Button
              type="button"
              className="h-9 rounded-lg bg-[#15803d] text-white hover:bg-[#116832]"
              onClick={() => downloadArtifact(preview.artifact)}
            >
              Download {preview.artifact.file.extension.toUpperCase()}
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
