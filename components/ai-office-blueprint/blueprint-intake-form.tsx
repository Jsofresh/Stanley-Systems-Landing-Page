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
  | "fieldServiceSoftware"
  | "informationStuck"
  | "copyCheckRewrite"
  | "billingDelays"
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
    question: "What email should we attach to the Blueprint?",
    helper: "The generic guide is on this page. The custom formatted Blueprint gets emailed here after Stanley Systems builds it from your answers.",
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
    name: "fieldServiceSoftware",
    eyebrow: "Current systems",
    question: "What software does the office already use?",
    helper: "List the main field-service, CRM, accounting, inbox, text, payment, or spreadsheet tools. One line is enough.",
    type: "text",
    placeholder: "Jobber, ServiceTitan, QuickBooks, Gmail, texts, spreadsheets...",
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
    <div className="mt-3 flex flex-wrap justify-center gap-1.5" aria-hidden="true">
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
      setMessage(result.message || "Good. Your answers were accepted. Stanley Systems will build the custom Blueprint in the formatted HTML and email it to you.")
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
          className={`${inputClass} min-h-[210px] resize-y text-left text-lg leading-8 sm:min-h-[260px] sm:text-xl`}
        />
      )
    }

    if (currentField.type === "select") {
      return (
        <div className="grid gap-4 sm:grid-cols-3">
          {currentField.options?.map((option) => {
            const selected = option === currentValue
            return (
              <button
                key={option}
                type="button"
                onClick={() => updateValue(option)}
                className={`min-h-[132px] rounded-[1.5rem] border p-5 text-left transition ${selected ? "border-[#15803D] bg-[#EEF8EE] shadow-[0_16px_34px_rgba(21,128,61,0.13)] ring-2 ring-[#15803D]/15" : "border-[#DDEBE2] bg-white hover:border-[#A7DDB6] hover:bg-[#FBFEFC]"}`}
              >
                <span className={`mb-3 flex h-7 w-7 items-center justify-center rounded-full border ${selected ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#DDEBE2] text-transparent"}`}>
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="block text-lg font-extrabold leading-6 tracking-[-0.02em] text-[#071D3A]">{option}</span>
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
        className={`${inputClass} text-center text-2xl tracking-[-0.03em] sm:min-h-[88px] sm:text-4xl`}
      />
    )
  }

  return (
    <div>
      <div className="overflow-hidden rounded-[2rem] border border-[#CFE8D5] bg-white shadow-[0_24px_74px_rgba(7,29,58,0.08)]">
        <div className="border-b border-[#E4F0E7] bg-[linear-gradient(135deg,#F7FBF6_0%,#FFFFFF_52%,#EEF8EE_100%)] p-5 sm:p-7 lg:p-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-[#15803D] text-white shadow-[0_16px_30px_rgba(21,128,61,0.24)]">
                <ClipboardList className="h-7 w-7" aria-hidden="true" />
              </span>
              <div className="max-w-4xl">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#116832]">Blueprint intake</p>
                <h2 className="mt-1 text-[2.25rem] font-semibold leading-none tracking-[-0.055em] text-[#071D3A] sm:text-[3.15rem]">One question at a time.</h2>
                <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-[#536173] sm:text-lg">Answer, tap next, and we turn the messy details into a useful first Blueprint — without making you fill out a giant consultant form.</p>
              </div>
            </div>
            <div className="justify-self-start rounded-full border border-[#DDEBE2] bg-white px-5 py-3 text-base font-extrabold text-[#071D3A] shadow-sm lg:justify-self-end">
              {answeredCount}/{fields.length} answered
            </div>
          </div>
          <ProgressDots currentIndex={currentIndex} />
        </div>

        <div className="p-5 sm:p-7 lg:p-8">
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

          <div className="mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DDEBE2] bg-[#FBF8F2] px-5 py-2.5 text-sm font-black uppercase tracking-[0.13em] text-[#116832]">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Question {currentIndex + 1} of {fields.length}
            </div>
            <p className="mt-5 text-base font-black uppercase tracking-[0.18em] text-[#799065]">{currentField.eyebrow}</p>
            <h3 className="mx-auto mt-3 max-w-5xl text-[2.55rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[#071D3A] sm:text-[4.1rem] lg:text-[4.75rem]">{currentField.question}</h3>
            <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-[#536173] sm:text-xl">{currentField.helper}</p>
          </div>

          <div className="mx-auto mt-8 max-w-6xl">{renderControl()}</div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-[0.82fr_1.18fr]">
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
