"use client"

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react"
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Loader2 } from "lucide-react"

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
    <div className="relative flex h-full min-h-[420px] w-full flex-col justify-center gap-6 overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/78 p-6 text-center shadow-[0_28px_70px_rgba(7,29,58,0.1)] ring-1 ring-[#DCEFE2] backdrop-blur lg:min-h-[470px]">
      <div className="absolute -left-14 -top-16 h-36 w-36 rounded-full bg-[#BFE4C8]/50 blur-2xl" />
      <div className="absolute -bottom-20 right-0 h-44 w-44 rounded-full bg-[#F5E9C8]/55 blur-3xl" />
      <div className="relative">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#789184]">Progress</p>
        <div className="mx-auto mt-5 flex h-[180px] w-[180px] items-center justify-center rounded-full bg-[radial-gradient(circle,#FFFFFF_0%,#F8FCF7_58%,#EEF8EE_100%)] shadow-[inset_0_0_0_1px_rgba(216,234,221,0.9),0_20px_46px_rgba(7,29,58,0.1)]">
          <svg viewBox="0 0 128 128" className="h-[152px] w-[152px] -rotate-90" aria-hidden="true">
            <circle cx="64" cy="64" r={radius} fill="none" stroke="#E0EFE4" strokeWidth="9" strokeLinecap="round" />
            <circle cx="64" cy="64" r={radius} fill="none" stroke="#159447" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${completion} ${circumference}`} className="drop-shadow-sm" />
          </svg>
          <div className="absolute inset-x-0 top-[82px] grid place-items-center text-center">
            <div>
              <div className="text-[2.7rem] font-semibold leading-none tracking-[-0.035em] text-[#159447]">{currentIndex + 1}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-[#116832]">of {totalQuestions}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative space-y-3">
        <div className="rounded-2xl border border-[#E3F0E7] bg-white/90 px-4 py-3 shadow-[0_12px_28px_rgba(7,29,58,0.05)]">
          <p className="text-base font-semibold tracking-[-0.02em] text-[#071D3A]">{answeredCount}/{totalQuestions} answered</p>
        </div>
        <div className="rounded-2xl border border-[#E3F0E7] bg-white/62 px-4 py-3 text-left">
          <p className="text-sm font-bold leading-5 text-[#536173]">Short answers now. Useful office plays after submit.</p>
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
    const raf = requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
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
    <div className="overflow-hidden rounded-[2rem] border border-[#D8E9DC] bg-[radial-gradient(circle_at_0%_100%,rgba(191,228,200,0.55),transparent_28%),linear-gradient(115deg,#FCFBF6_0%,#FDFDF8_52%,#F1F9F1_100%)] p-5 shadow-[0_28px_82px_rgba(7,29,58,0.08)] sm:p-7 lg:rounded-[2.2rem] lg:p-8 2xl:p-9">
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

      <div className="grid gap-5 lg:grid-cols-[250px_minmax(450px,1fr)_290px] lg:items-stretch 2xl:grid-cols-[300px_minmax(560px,1fr)_minmax(340px,0.72fr)] 2xl:gap-6">
        <div className="order-2 lg:order-1 lg:flex">
          <ProgressRing currentIndex={currentIndex} answeredCount={answeredCount} />
        </div>

        <div className="order-1 flex min-h-[360px] flex-col justify-center rounded-[1.65rem] border border-[#E1E8E3] bg-white p-5 text-center shadow-[0_24px_70px_rgba(7,29,58,0.12)] sm:p-7 lg:order-2 lg:min-h-[430px] lg:p-8 xl:min-h-[470px] xl:p-10">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#116832]">{questionLabel}</p>
          <h3 className="mx-auto mt-4 max-w-[640px] text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#071D3A] sm:text-[3.25rem] lg:text-[3.25rem] xl:text-[3.65rem]">{currentField.question}</h3>
          <p className="mx-auto mt-4 max-w-[560px] text-sm font-semibold leading-6 text-[#536173] sm:text-base">{currentField.helper}</p>
          <div className="mx-auto mt-7 w-full max-w-[590px]">{renderControl()}</div>

          <div className="mx-auto mt-7 grid w-full max-w-[590px] gap-3 sm:grid-cols-[0.82fr_1.18fr]">
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

        <div className="order-3 flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[1.8rem] border border-[#DDEBE2] bg-[#071D3A] p-6 text-white shadow-[0_28px_70px_rgba(7,29,58,0.14)] lg:min-h-[470px] lg:p-7 2xl:min-h-[520px]">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#8EF0A7] ring-1 ring-white/14">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="mt-6 max-w-[270px] text-[2rem] font-semibold leading-[1.03] tracking-[-0.035em] xl:text-[2.25rem]">Built from your exact answers.</h3>
            <p className="mt-4 max-w-[280px] text-sm font-semibold leading-6 text-white/72">The custom PDF turns this intake into prompts, office workflow fixes, and staff-ready plays for the bottlenecks you name.</p>
          </div>
          <div className="mt-8 space-y-3">
            {["Tools and handoffs", "Billing and follow-up drag", "One messy office example"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 shadow-[0_18px_34px_rgba(0,0,0,0.12)]">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8EF0A7] shadow-[0_0_0_5px_rgba(142,240,167,0.12)]" />
                  <span className="text-sm font-bold leading-5 text-white/88">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
