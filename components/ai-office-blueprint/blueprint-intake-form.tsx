"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const inputClass = "min-h-12 rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-sm font-semibold text-[#102033] outline-none transition focus:border-[#15803D] focus:ring-2 focus:ring-[#BFE4C8]"
const labelClass = "grid gap-1 text-sm font-extrabold tracking-[0.01em] text-[#536173]"

type Status = "idle" | "sending" | "sent" | "error"

const fields = [
  "name",
  "email",
  "businessName",
  "businessType",
  "teamSize",
  "fieldServiceSoftware",
  "accountingSoftware",
  "spreadsheetUsage",
  "informationStuck",
  "copyCheckRewrite",
  "billingDelays",
  "missedFollowUp",
  "toolsInvolved",
  "desiredOutputType",
  "aiComfortLevel",
  "messyOfficeExample",
]

function payloadFrom(form: HTMLFormElement) {
  const data = new FormData(form)
  return Object.fromEntries(fields.map((field) => [field, String(data.get(field) || "").trim()]))
}

export function BlueprintIntakeForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")
  const [previewHtml, setPreviewHtml] = useState("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const payload = payloadFrom(form)
    const missing = fields.filter((field) => !payload[field])

    if (missing.length) {
      setStatus("error")
      setMessage("Complete the required fields so the Blueprint can be useful instead of generic.")
      return
    }

    setStatus("sending")
    setMessage("")
    setPreviewHtml("")

    try {
      const honeypot = String(new FormData(form).get("website") || "").trim()
      const response = await fetch("/api/ai-office-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website: honeypot }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) throw new Error(result.error || "Could not queue the Blueprint.")

      setStatus("sent")
      setMessage(result.message || "Your Blueprint is queued. Check your email for the finished version.")
      if (result.preview?.html) setPreviewHtml(result.preview.html)
      form.reset()
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Could not send the Blueprint request.")
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="rounded-[1.75rem] border border-[#CFE8D5] bg-white p-5 shadow-[0_18px_54px_rgba(7,29,58,0.06)] sm:p-7">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#071D3A]">Blueprint intake</h2>
            <p className="mt-1 text-sm font-semibold leading-6 text-[#536173]">Takes 5–7 minutes. Use real workflow details and remove private customer information before pasting examples.</p>
          </div>
        </div>

        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className={labelClass}>Name<input className={inputClass} name="name" required autoComplete="name" /></label>
          <label className={labelClass}>Email<input className={inputClass} name="email" type="email" required autoComplete="email" /></label>
          <label className={labelClass}>Business name<input className={inputClass} name="businessName" required autoComplete="organization" /></label>
          <label className={labelClass}>Business type / trade<input className={inputClass} name="businessType" required placeholder="HVAC, plumbing, roofing, marine..." /></label>
          <label className={labelClass}>Team size or office/admin size<input className={inputClass} name="teamSize" required placeholder="8 techs, 2 office staff..." /></label>
          <label className={labelClass}>Field-service/job/CRM software<input className={inputClass} name="fieldServiceSoftware" required placeholder="Jobber, ServiceTitan, Housecall Pro..." /></label>
          <label className={labelClass}>Accounting/payment software<input className={inputClass} name="accountingSoftware" required placeholder="QuickBooks, Stripe, Square..." /></label>
          <label className={labelClass}>Excel / Google Sheets usage<input className={inputClass} name="spreadsheetUsage" required placeholder="What sheets still run the office?" /></label>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className={labelClass}>Where information gets stuck<textarea className={`${inputClass} min-h-28 resize-y`} name="informationStuck" required /></label>
          <label className={labelClass}>What do staff repeatedly copy, check, or rewrite?<textarea className={`${inputClass} min-h-28 resize-y`} name="copyCheckRewrite" required /></label>
          <label className={labelClass}>What usually delays invoices or payments?<textarea className={`${inputClass} min-h-28 resize-y`} name="billingDelays" required /></label>
          <label className={labelClass}>What customer or job follow-up falls through the cracks?<textarea className={`${inputClass} min-h-28 resize-y`} name="missedFollowUp" required /></label>
          <label className={labelClass}>Tools involved<textarea className={`${inputClass} min-h-24 resize-y`} name="toolsInvolved" required placeholder="Email, texts, forms, CRM, accounting, spreadsheets..." /></label>
          <label className={labelClass}>Desired output type<textarea className={`${inputClass} min-h-24 resize-y`} name="desiredOutputType" required placeholder="Billing notes, customer replies, decision brief..." /></label>
        </div>

        <label className={`${labelClass} mt-3`}>
          AI comfort level
          <select className={inputClass} name="aiComfortLevel" required defaultValue="">
            <option value="" disabled>Select one</option>
            <option>New to AI</option>
            <option>Some use, needs structure</option>
            <option>Comfortable, needs workflow design</option>
          </select>
        </label>

        <label className={`${labelClass} mt-3`}>
          Paste one messy office example
          <span className="normal-case tracking-normal text-[#536173]">A rough tech note, customer message, job update, spreadsheet problem, billing note, or repeated staff task. Remove private customer info.</span>
          <textarea className={`${inputClass} min-h-36 resize-y`} name="messyOfficeExample" required />
        </label>

        <button type="submit" disabled={status === "sending"} className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#15803D] px-7 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832] disabled:cursor-wait disabled:opacity-70 sm:w-auto">
          {status === "sending" ? "Queuing Blueprint..." : "Get My Free Blueprint"}
          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </button>
        {message ? <p className={`mt-3 text-sm font-bold ${status === "error" ? "text-[#B42318]" : "text-[#116832]"}`}>{message}</p> : null}
      </form>

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
