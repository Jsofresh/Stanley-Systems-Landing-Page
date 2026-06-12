"use client"

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react"
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Loader2, Sparkles } from "lucide-react"

const inputClass = "min-h-14 w-full rounded-[1.35rem] border border-[#DDEBE2] bg-white px-4 py-3 text-base font-semibold text-[#102033] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] outline-none transition placeholder:text-[#8C98A6] focus:border-[#15803D] focus:ring-4 focus:ring-[#BFE4C8]/55"

type Status = "idle" | "sending" | "sent" | "error"
type FieldType = "text" | "email" | "textarea" | "select"

type FieldName =
  | "name"
  | "email"
  | "businessName"
  | "businessType"
  | "teamSize"
  | "fieldServiceSoftware"
  | "accountingSoftware"
  | "spreadsheetUsage"
  | "informationStuck"
  | "copyCheckRewrite"
  | "billingDelays"
  | "missedFollowUp"
  | "toolsInvolved"
  | "desiredOutputType"
  | "aiComfortLevel"
  | "messyOfficeExample"

type IntakeField = {
  name: FieldName
  eyebrow: string
  question: string
  helper: string
  placeholder?: string
  type: FieldType
  autoComplete?: string
  options?: string[]
}

const fields: IntakeField[] = [
  {
    name: "name",
    eyebrow: "First, who should we write this for?",
    question: "What is your name?",
    helper: "Use the name you want on the Blueprint email.",
    type: "text",
    autoComplete: "name",
    placeholder: "Jane Smith",
  },
  {
    name: "email",
    eyebrow: "Where should the Blueprint go?",
    question: "What email should receive the finished Blueprint?",
    helper: "We’ll send the custom AI Office Blueprint here when it is ready.",
    type: "email",
    autoComplete: "email",
    placeholder: "jane@company.com",
  },
  {
    name: "businessName",
    eyebrow: "Business context",
    question: "What is the business name?",
    helper: "This lets us write the Blueprint around the actual company instead of generic advice.",
    type: "text",
    autoComplete: "organization",
    placeholder: "Bayview Heating & Air",
  },
  {
    name: "businessType",
    eyebrow: "Trade / service type",
    question: "What kind of service business is it?",
    helper: "HVAC, plumbing, roofing, marine, landscaping, electrical, contracting, or another service trade.",
    type: "text",
    placeholder: "HVAC, plumbing, roofing, marine...",
  },
  {
    name: "teamSize",
    eyebrow: "Office load",
    question: "How big is the team or office/admin side?",
    helper: "A rough number is fine. This helps size the handoff and admin drag.",
    type: "text",
    placeholder: "8 techs, 2 office staff...",
  },
  {
    name: "fieldServiceSoftware",
    eyebrow: "Current systems",
    question: "What field-service, job, or CRM software do you use?",
    helper: "If there is no main system, say that. The gaps matter as much as the tools.",
    type: "text",
    placeholder: "Jobber, ServiceTitan, Housecall Pro, spreadsheets...",
  },
  {
    name: "accountingSoftware",
    eyebrow: "Money system",
    question: "What accounting or payment software do you use?",
    helper: "This helps us spot where job information becomes invoice/payment work.",
    type: "text",
    placeholder: "QuickBooks, Stripe, Square, Xero...",
  },
  {
    name: "spreadsheetUsage",
    eyebrow: "Shadow systems",
    question: "What Excel or Google Sheets still run part of the office?",
    helper: "Tell us what sheets people still rely on for tracking, cleanup, scheduling, billing, or follow-up.",
    type: "text",
    placeholder: "Scheduling sheet, invoice tracker, customer callback list...",
  },
  {
    name: "informationStuck",
    eyebrow: "Stuck information",
    question: "Where does information get stuck?",
    helper: "Think: tech notes, photos, customer texts, office reminders, job status, invoice details, payment updates.",
    type: "textarea",
    placeholder: "Completed job notes sit in texts until someone copies them into the job record...",
  },
  {
    name: "copyCheckRewrite",
    eyebrow: "Repeated admin work",
    question: "What do staff repeatedly copy, check, or rewrite?",
    helper: "This is usually where AI office workflows create the fastest capacity win.",
    type: "textarea",
    placeholder: "The office checks job notes, rewrites customer replies, copies totals into QuickBooks...",
  },
  {
    name: "billingDelays",
    eyebrow: "Cash drag",
    question: "What usually delays invoices or payments?",
    helper: "Be specific: missing parts, job photos, tech notes, approvals, customer signatures, payment links, corrections.",
    type: "textarea",
    placeholder: "Invoices wait because office staff have to chase techs for missing job details...",
  },
  {
    name: "missedFollowUp",
    eyebrow: "Follow-up leaks",
    question: "What customer or job follow-up falls through the cracks?",
    helper: "Estimates, missed calls, unsent review asks, annual service reminders, past customers, warranty callbacks, unpaid invoices.",
    type: "textarea",
    placeholder: "Open estimates do not get a second touch unless someone remembers...",
  },
  {
    name: "toolsInvolved",
    eyebrow: "Workflow map",
    question: "Which tools are involved in the messy workflow?",
    helper: "List everything touched: inbox, texts, phone, forms, CRM, accounting, spreadsheets, notes, Slack, Teams, paper.",
    type: "textarea",
    placeholder: "Email, texts, phone, Housecall Pro, QuickBooks, Google Sheets...",
  },
  {
    name: "desiredOutputType",
    eyebrow: "Useful output",
    question: "What should AI help produce for the team?",
    helper: "Examples: billing notes, customer replies, follow-up lists, job summaries, decision briefs, invoice prep, playbooks.",
    type: "textarea",
    placeholder: "A clean billing-ready job summary and customer follow-up message...",
  },
  {
    name: "aiComfortLevel",
    eyebrow: "Adoption fit",
    question: "How comfortable is your team with AI right now?",
    helper: "This changes how practical and staff-safe the Blueprint should be.",
    type: "select",
    options: ["New to AI", "Some use, needs structure", "Comfortable, needs workflow design"],
  },
  {
    name: "messyOfficeExample",
    eyebrow: "The important part",
    question: "Paste one messy office example we can design around.",
    helper: "Use a rough tech note, customer message, job update, spreadsheet problem, billing note, or repeated staff task. Remove private customer information first.",
    type: "textarea",
    placeholder: "Example: Customer texted about adding a filter replacement. Tech replied in the group chat, office has to update the job, add the item, and remember to invoice...",
  },
]

const blankData = Object.fromEntries(fields.map((field) => [field.name, ""])) as Record<FieldName, string>

function validateEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value)
}

function ProgressDots({ currentIndex }: { currentIndex: number }) {
  return (
    <div className="mt-5 flex flex-wrap justify-center gap-1.5" aria-hidden="true">
      {fields.map((field, index) => (
        <span
          key={field.name}
          className={`h-1.5 rounded-full transition-all duration-300 ${index <= currentIndex ? "w-7 bg-[#15803D]" : "w-2.5 bg-[#DDEBE2]"}`}
        />
      ))}
    </div>
  )
}

export function BlueprintIntakeForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")
  const [previewHtml, setPreviewHtml] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [formData, setFormData] = useState<Record<FieldName, string>>(blankData)
  const [website, setWebsite] = useState("")
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null)

  const currentField = fields[currentIndex]
  const currentValue = formData[currentField.name]
  const isLastQuestion = currentIndex === fields.length - 1
  const answeredCount = fields.filter((field) => formData[field.name].trim()).length
  const progress = useMemo(() => Math.round(((currentIndex + 1) / fields.length) * 100), [currentIndex])
  const canContinue = currentValue.trim().length > 0 && (currentField.name !== "email" || validateEmail(currentValue.trim()))

  useEffect(() => {
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(raf)
  }, [currentIndex])

  function updateValue(value: string) {
    setStatus("idle")
    setMessage("")
    setFormData((previous) => ({ ...previous, [currentField.name]: value }))
  }

  function goBack() {
    setStatus("idle")
    setMessage("")
    setCurrentIndex((index) => Math.max(index - 1, 0))
  }

  function goNext() {
    if (!canContinue) {
      setStatus("error")
      setMessage(currentField.name === "email" ? "Enter a real email so we can send the finished Blueprint." : "Answer this question before moving on.")
      return
    }
    setStatus("idle")
    setMessage("")
    setCurrentIndex((index) => Math.min(index + 1, fields.length - 1))
  }

  async function submitBlueprint() {
    const missing = fields.filter((field) => !formData[field.name].trim())

    if (missing.length) {
      const firstMissingIndex = fields.findIndex((field) => field.name === missing[0].name)
      setCurrentIndex(Math.max(firstMissingIndex, 0))
      setStatus("error")
      setMessage("Complete every question so the Blueprint can be useful instead of generic.")
      return
    }

    if (!validateEmail(formData.email.trim())) {
      setCurrentIndex(fields.findIndex((field) => field.name === "email"))
      setStatus("error")
      setMessage("Enter a real email so we can send the finished Blueprint.")
      return
    }

    setStatus("sending")
    setMessage("")
    setPreviewHtml("")

    try {
      const response = await fetch("/api/ai-office-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website: website.trim() }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) throw new Error(result.error || "Could not queue the Blueprint.")

      setStatus("sent")
      setMessage(result.message || "Your Blueprint is queued. Check your email for the finished version.")
      if (result.preview?.html) setPreviewHtml(result.preview.html)
      setFormData(blankData)
      setWebsite("")
      setCurrentIndex(0)
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Could not send the Blueprint request.")
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) {
    if (event.key !== "Enter" || event.shiftKey) return
    event.preventDefault()
    if (isLastQuestion) {
      void submitBlueprint()
    } else {
      goNext()
    }
  }

  function renderControl() {
    if (currentField.type === "textarea") {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={currentValue}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => updateValue(event.target.value)}
          placeholder={currentField.placeholder}
          className={`${inputClass} min-h-[190px] resize-y text-left leading-7 sm:min-h-[230px]`}
        />
      )
    }

    if (currentField.type === "select") {
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          {currentField.options?.map((option) => {
            const selected = option === currentValue
            return (
              <button
                key={option}
                type="button"
                onClick={() => updateValue(option)}
                className={`rounded-[1.35rem] border p-4 text-left transition ${selected ? "border-[#15803D] bg-[#EEF8EE] shadow-[0_16px_34px_rgba(21,128,61,0.13)] ring-2 ring-[#15803D]/15" : "border-[#DDEBE2] bg-white hover:border-[#A7DDB6] hover:bg-[#FBFEFC]"}`}
              >
                <span className={`mb-3 flex h-7 w-7 items-center justify-center rounded-full border ${selected ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#DDEBE2] text-transparent"}`}>
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="block text-sm font-extrabold leading-5 text-[#071D3A]">{option}</span>
              </button>
            )
          })}
          <select
            ref={inputRef as React.RefObject<HTMLSelectElement>}
            value={currentValue}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => updateValue(event.target.value)}
            onKeyDown={handleKeyDown}
            className="sr-only"
            aria-label={currentField.question}
          >
            <option value="">Select one</option>
            {currentField.options?.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
      )
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={currentValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => updateValue(event.target.value)}
        onKeyDown={handleKeyDown}
        type={currentField.type}
        autoComplete={currentField.autoComplete}
        placeholder={currentField.placeholder}
        className={`${inputClass} text-center text-xl tracking-[-0.02em] sm:min-h-[76px] sm:text-3xl`}
      />
    )
  }

  return (
    <div>
      <div className="overflow-hidden rounded-[2rem] border border-[#CFE8D5] bg-white shadow-[0_24px_74px_rgba(7,29,58,0.08)]">
        <div className="border-b border-[#E4F0E7] bg-[linear-gradient(135deg,#F7FBF6_0%,#FFFFFF_52%,#EEF8EE_100%)] p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#15803D] text-white shadow-[0_14px_26px_rgba(21,128,61,0.22)]">
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#116832]">Blueprint intake</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">One question at a time.</h2>
                <p className="mt-1 text-sm font-semibold leading-6 text-[#536173]">Like the calculator: answer, tap next, and we turn the messy details into a useful first Blueprint.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-sm font-extrabold text-[#071D3A] shadow-sm">
              {answeredCount}/{fields.length} answered
            </div>
          </div>
          <ProgressDots currentIndex={currentIndex} />
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          <input
            type="text"
            name="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DDEBE2] bg-[#FBF8F2] px-4 py-2 text-xs font-black uppercase tracking-[0.13em] text-[#116832]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Question {currentIndex + 1} of {fields.length}
            </div>
            <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-[#799065]">{currentField.eyebrow}</p>
            <h3 className="mt-3 text-[2rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#071D3A] sm:text-[3.1rem]">{currentField.question}</h3>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-[#536173]">{currentField.helper}</p>
          </div>

          <div className="mx-auto mt-8 max-w-4xl">{renderControl()}</div>

          <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-[0.75fr_1.25fr]">
            <button
              type="button"
              onClick={goBack}
              disabled={currentIndex === 0 || status === "sending"}
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#DDEBE2] bg-white px-6 py-3 text-sm font-extrabold text-[#536173] transition hover:bg-[#FBF8F2] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="button"
              onClick={() => (isLastQuestion ? void submitBlueprint() : goNext())}
              disabled={!canContinue || status === "sending"}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[linear-gradient(180deg,#179447_0%,#116832_100%)] px-7 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(21,128,61,0.28)] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Queuing Blueprint...
                </>
              ) : isLastQuestion ? (
                "Get My Free Blueprint"
              ) : (
                "Next question"
              )}
              {status !== "sending" ? <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /> : null}
            </button>
          </div>

          {message ? <p className={`mt-4 text-center text-sm font-bold ${status === "error" ? "text-[#B42318]" : "text-[#116832]"}`}>{message}</p> : null}
        </div>
      </div>

      {previewHtml ? (
        <div className="mt-6 rounded-[1.75rem] border border-[#CFE8D5] bg-white p-4 shadow-[0_18px_54px_rgba(7,29,58,0.06)]">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className="text-lg font-extrabold tracking-[-0.02em] text-[#071D3A]">Blueprint preview</h3>
            <a href="/ai-office-blueprint/sample" className="text-sm font-extrabold text-[#116832]">View sample</a>
          </div>
          <iframe title="Generated Blueprint preview" srcDoc={previewHtml} sandbox="" referrerPolicy="no-referrer" className="h-[520px] w-full rounded-2xl border border-[#DDEBE2] bg-white" />
        </div>
      ) : null}
    </div>
  )
}
