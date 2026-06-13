"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const fieldClass = "min-h-12 rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-sm font-semibold text-[#102033] outline-none transition focus:border-[#15803D] focus:ring-2 focus:ring-[#BFE4C8]"

type Status = "idle" | "sending" | "sent" | "error"

export function AuditIntakeForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus("sending")
    setMessage("")

    const payload = {
      telegram_alert_type: "assessment_intake",
      form_type: "assessment_intake",
      status: "assessment_intake_submitted",
      source: "audit-intake-page",
      page: "/audit-intake",
      page_source: "audit-intake",
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      company: String(data.get("business") || ""),
      business: String(data.get("business") || ""),
      business_type: String(data.get("businessType") || ""),
      businessType: String(data.get("businessType") || ""),
      main_issue: String(data.get("moneyStuck") || ""),
      problem: String(data.get("moneyStuck") || ""),
      currentProcess: String(data.get("workflowContext") || ""),
      message: String(data.get("workflowContext") || ""),
      submitted_at: new Date().toISOString(),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) throw new Error(result.error || "Could not send intake.")
      setStatus("sent")
      setMessage(result.delivery === "webhook" ? "Sent. Stanley Systems received the intake and will follow up." : "The intake path is not fully connected yet. Email the same details to jaden@stanley-systems.com so Stanley Systems receives them.")
      form.reset()
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Could not send intake. Email jaden@stanley-systems.com instead.")
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 rounded-[1.5rem] border border-[#CFE8D5] bg-white p-4 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
        <div>
          <h3 className="text-lg font-extrabold tracking-[-0.02em] text-[#071D3A]">Contact info</h3>
          <p className="mt-1 text-sm font-semibold leading-6 text-[#536173]">Stanley Systems will contact you as soon as possible. Add how work moves now so the first reply is useful.</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#607080]">
          Name
          <input className={fieldClass} name="name" required autoComplete="name" />
        </label>
        <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#607080]">
          Email
          <input className={fieldClass} name="email" required type="email" autoComplete="email" />
        </label>
        <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#607080]">
          Phone
          <input className={fieldClass} name="phone" required type="tel" autoComplete="tel" />
        </label>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#607080]">
          Business
          <input className={fieldClass} name="business" required autoComplete="organization" />
        </label>
        <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#607080]">
          Business type
          <input className={fieldClass} name="businessType" placeholder="HVAC, plumbing, marine, roofing..." />
        </label>
      </div>

      <label className="mt-3 grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#607080]">
        Where is money getting stuck?
        <textarea className={`${fieldClass} min-h-24 resize-y`} name="moneyStuck" required placeholder="Late invoices, open balances, missed reviews, old customers going quiet..." />
      </label>
      <label className="mt-3 grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-[#607080]">
        How work moves now
        <textarea className={`${fieldClass} min-h-28 resize-y`} name="workflowContext" required placeholder="Tools used, who handles billing, invoice timing, review/referral process, preferred access method..." />
      </label>

      <button type="submit" disabled={status === "sending"} className="mt-5 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#15803D] px-7 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)] disabled:cursor-wait disabled:opacity-70 sm:w-auto">
        {status === "sending" ? "Sending intake..." : "Send Assessment Intake"}
        <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
      </button>
      {message ? <p className={`mt-3 text-sm font-bold ${status === "error" ? "text-[#B42318]" : "text-[#116832]"}`}>{message}</p> : null}
      <p className="mt-3 text-xs font-semibold leading-5 text-[#607080]">If the form ever fails, email the same details to jaden@stanley-systems.com.</p>
    </form>
  )
}
