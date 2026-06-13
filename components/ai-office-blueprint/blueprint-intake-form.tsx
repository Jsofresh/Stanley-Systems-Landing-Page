"use client"

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react"
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Loader2, Sparkles } from "lucide-react"

const inputClass = "min-h-14 w-full rounded-[1.1rem] border border-[#BFD7C8] bg-white px-5 py-4 text-base font-semibold text-[#102033] shadow-[0_1px_0_rgba(255,255,255,0.95)_inset] outline-none transition placeholder:text-[#9AA8B6] focus:border-[#15803D] focus:ring-4 focus:ring-[#BFE4C8]/55"

const totalQuestions = 16

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
    eyebrow: "Where should the custom PDF go?",
    question: "What email should we send it to?",
    helper: "The generic PDF is available above. The custom Blueprint is built from your answers and emailed as a PDF.",
    type: "email",
    autoComplete: "email",
    placeholder: "jane@company.com",
  },
  {
    name: "businessName",
    eyebrow: "Business context",
    question: "What is the business name?",
    helper: "This lets the Blueprint speak to the actual company instead of sounding generic.",
    type: "text",
    autoComplete: "organization",
    placeholder: "Bayview Heating & Air",
  },
  {
    name: "businessType",
    eyebrow: "Trade or service type",
    question: "What kind of service business is it?",
    helper: "HVAC, plumbing, roofing, marine, landscaping, electrical, contracting, or another service trade.",
    type: "text",
    placeholder: "HVAC service company",
  },
  {
    name: "teamSize",
    eyebrow: "Office capacity",
    question: "How big is the team?",
    helper: "Include office staff and field staff if that helps explain the workload.",
    type: "text",
    placeholder: "12 total, 2 in the office",
  },
  {
    name: "fieldServiceSoftware",
    eyebrow: "Main operating system",
    question: "What field-service or CRM software do you use?",
    helper: "Name the system where jobs, customers, estimates, or service tickets live.",
    type: "text",
    placeholder: "Jobber, ServiceTitan, Housecall Pro, Service Fusion...",
  },
  {
    name: "accountingSoftware",
    eyebrow: "Money system",
    question: "What accounting or invoicing software do you use?",
    helper: "This helps the Blueprint design billing prep and closeout prompts around the right destination.",
    type: "text",
    placeholder: "QuickBooks Online, Xero, FreshBooks, built-in invoicing...",
  },
  {
    name: "spreadsheetUsage",
    eyebrow: "Side systems",
    question: "Where do spreadsheets still show up?",
    helper: "List the sheets, trackers, or side lists the office still relies on.",
    type: "textarea",
    placeholder: "We keep an invoice exception sheet, open estimates sheet, and a list of customers waiting on parts...",
  },
  {
    name: "informationStuck",
    eyebrow: "Stuck information",
    question: "Where does information get stuck?",
    helper: "Think tech notes, photos, customer texts, job status, invoice details, approvals, or payment updates.",
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
    helper: "Be specific: missing parts, job photos, tech notes, approvals, signatures, payment links, or corrections.",
    type: "textarea",
    placeholder: "Invoices wait because office staff have to chase techs for missing job details...",
  },
  {
    name: "missedFollowUp",
    eyebrow: "Follow-up drag",
    question: "Where does follow-up get missed?",
    helper: "Estimates, unpaid invoices, callbacks, review requests, recurring service, or customer updates.",
    type: "textarea",
    placeholder: "High-value estimates sit until the owner asks who followed up...",
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
    placeholder: "A clean billing-ready job summary, customer update, and missing-info checklist...",
  },
  {
    name: "aiComfortLevel",
    eyebrow: "Adoption fit",
    question: "How comfortable is your team with AI right now?",
    helper: "This changes how practical and staff-safe the custom Blueprint should be.",
    type: "select",
    options: ["New to AI", "Some use, needs structure", "Comfortable, needs workflow design"],
  },
  {
    name: "messyOfficeExample",
    eyebrow: "The important part",
    question: "Paste one messy office example we can design around.",
    helper: "Use a rough tech note, customer message, job update, spreadsheet problem, billing note, or repeated staff task. Remove private customer information first.",
    type: "textarea",
    placeholder: "Customer texted about adding a filter replacement. Tech replied in the group chat. Office has to update the job, add the item, and remember to invoice...",
  },
]

const blankData = Object.fromEntries(fields.map((field) => [field.name, ""])) as Record<FieldName, string>

function validateEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value)
}

function ProgressRing({ currentIndex, answeredCount }: { currentIndex: number; answeredCount: number }) {
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const completion = ((currentIndex + 1) / totalQuestions) * circumference

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="rounded-full border border-[#E5EEE8] bg-white px-5 py-3 text-sm font-black text-[#071D3A] shadow-[0_12px_30px_rgba(7,29,58,0.08)]">
        {answeredCount}/{totalQuestions} answered
      </div>
      <div className="relative h-[166px] w-[166px]">
        <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="#D8EADD" strokeWidth="7" strokeLinecap="round" strokeDasharray="1 10" />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="#159447"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${completion} ${circumference}`}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="text-[2.25rem] font-black leading-none tracking-[-0.06em] text-[#159447]">{currentIndex + 1}</div>
            <div className="mt-1 text-xs font-black text-[#116832]">of {totalQuestions}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function BlueprintIntakeForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [formData, setFormData] = useState<Record<FieldName, string>>(blankData)
  const [website, setWebsite] = useState("")
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null)

  const currentField = fields[currentIndex]
  const currentValue = formData[currentField.name]
  const isLastQuestion = currentIndex === fields.length - 1
  const answeredCount = fields.filter((field) => formData[field.name].trim()).length
  const canContinue = currentValue.trim().length > 0 && (currentField.name !== "email" || validateEmail(currentValue.trim()))
  const questionLabel = useMemo(() => `Question ${currentIndex + 1} of ${fields.length}`, [currentIndex])

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

    try {
      const response = await fetch("/api/ai-office-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website: website.trim() }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) throw new Error(result.error || "Could not queue the Blueprint.")

      setStatus("sent")
      setMessage(result.message || "Good. Your answers were accepted. Stanley Systems is building your custom Blueprint PDF now.")
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
          className={`${inputClass} min-h-[148px] resize-y text-left text-lg leading-7 lg:min-h-[174px]`}
        />
      )
    }

    if (currentField.type === "select") {
      return (
        <div className="grid gap-3">
          {currentField.options?.map((option) => {
            const selected = option === currentValue
            return (
              <button
                key={option}
                type="button"
                onClick={() => updateValue(option)}
                className={`flex min-h-[58px] items-center gap-3 rounded-[1.05rem] border px-4 py-3 text-left transition ${selected ? "border-[#15803D] bg-[#EEF8EE] shadow-[0_16px_34px_rgba(21,128,61,0.13)] ring-2 ring-[#15803D]/15" : "border-[#DDEBE2] bg-white hover:border-[#A7DDB6] hover:bg-[#FBFEFC]"}`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#DDEBE2] text-transparent"}`}>
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span className="block text-base font-black leading-6 tracking-[-0.02em] text-[#071D3A]">{option}</span>
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
        className={`${inputClass} text-center text-2xl tracking-[-0.03em] sm:min-h-[62px] sm:text-[1.7rem]`}
      />
    )
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#D8E9DC] bg-[radial-gradient(circle_at_0%_100%,rgba(191,228,200,0.55),transparent_28%),linear-gradient(115deg,#FCFBF6_0%,#FDFDF8_52%,#F1F9F1_100%)] p-5 shadow-[0_28px_82px_rgba(7,29,58,0.08)] sm:p-7 lg:rounded-[2.2rem] lg:p-10">
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

      <div className="grid gap-8 lg:grid-cols-[0.72fr_minmax(470px,1.1fr)_0.52fr] lg:items-center xl:grid-cols-[0.72fr_minmax(520px,1.1fr)_0.52fr]">
        <div className="self-start lg:pt-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#159447] text-white shadow-[0_12px_26px_rgba(21,148,71,0.24)]">
              <ClipboardList className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#116832]">Blueprint intake</p>
          </div>
          <h2 className="mt-5 max-w-[310px] text-[2.15rem] font-black leading-[0.94] tracking-[-0.07em] text-[#071D3A] sm:text-[2.7rem] lg:text-[2.35rem] xl:text-[2.7rem]">One question at a time.</h2>
          <p className="mt-4 max-w-[330px] text-sm font-semibold leading-6 text-[#465467]">Answer, tap next, and we turn the messy details into a useful custom Blueprint PDF without making you fill out a giant consultant form.</p>
        </div>

        <div className="rounded-[1.55rem] border border-[#E1E8E3] bg-white p-5 text-center shadow-[0_24px_70px_rgba(7,29,58,0.12)] sm:p-7 lg:p-8 xl:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF8EE] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#116832]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {questionLabel}
          </div>
          <p className="mt-6 text-[11px] font-black uppercase tracking-[0.24em] text-[#6B8756]">{currentField.eyebrow}</p>
          <h3 className="mx-auto mt-3 max-w-[620px] text-[2.25rem] font-black leading-[0.98] tracking-[-0.065em] text-[#071D3A] sm:text-[3.25rem] lg:text-[3.2rem] xl:text-[3.55rem]">{currentField.question}</h3>
          <p className="mx-auto mt-4 max-w-[560px] text-sm font-semibold leading-6 text-[#536173] sm:text-base">{currentField.helper}</p>
          <div className="mx-auto mt-7 max-w-[560px]">{renderControl()}</div>

          <div className="mx-auto mt-7 grid max-w-[560px] gap-3 sm:grid-cols-[0.82fr_1.18fr]">
            <button
              type="button"
              onClick={goBack}
              disabled={currentIndex === 0 || status === "sending"}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#E3ECE6] bg-white px-5 py-3 text-sm font-black text-[#071D3A] shadow-[0_10px_24px_rgba(7,29,58,0.04)] transition hover:bg-[#FBF8F2] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back
            </button>
            <button
              type="button"
              onClick={() => (isLastQuestion ? void submitBlueprint() : goNext())}
              disabled={!canContinue || status === "sending"}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,#19A452_0%,#12843C_100%)] px-6 py-3 text-sm font-black text-white shadow-[0_16px_34px_rgba(21,128,61,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(21,128,61,0.3)] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Building Blueprint
                </>
              ) : isLastQuestion ? (
                "Get my custom PDF"
              ) : (
                "Next question"
              )}
              {status !== "sending" ? <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /> : null}
            </button>
          </div>

          {message ? <p className={`mt-4 text-center text-sm font-bold ${status === "error" ? "text-[#B42318]" : "text-[#116832]"}`}>{message}</p> : null}
        </div>

        <div className="hidden lg:flex lg:justify-center">
          <ProgressRing currentIndex={currentIndex} answeredCount={answeredCount} />
        </div>

        <div className="lg:hidden">
          <ProgressRing currentIndex={currentIndex} answeredCount={answeredCount} />
        </div>
      </div>
    </div>
  )
}
