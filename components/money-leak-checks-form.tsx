"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

type MoneyLeakChecksFormProps = {
  source: string
  pageSource: string
  headline?: string
  body?: string
  helper?: string
  currentSystemPlaceholder?: string
  className?: string
}

const defaultHeadline = "Get your first admin drag check"
const defaultBody = "Billing, follow-up, reviews, referrals, missed calls, and past customers — one practical check you can use before you buy."
const defaultHelper = "No filler. One leak to check, one way to spot it, and one next move."
const fallbackEmail = "hello@stanley-systems.com"

export function MoneyLeakChecksForm({
  source,
  pageSource,
  headline = defaultHeadline,
  body = defaultBody,
  helper = defaultHelper,
  currentSystemPlaceholder = "Housecall Pro, Jobber, QuickBooks, spreadsheet, not sure...",
  className = "",
}: MoneyLeakChecksFormProps) {
  const [form, setForm] = useState({ email: "", phone: "", current_system: "", website: "" })
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("submitting")
    setMessage("")

    if (form.website) {
      setState("success")
      setMessage("You’re in. Stanley Systems will send the next leak check.")
      return
    }

    try {
      const params = new URLSearchParams(window.location.search)
      const payload = {
        ...form,
        telegram_alert_type: "money_leak_checks",
        form_type: "money_leak_checks",
        intent: "nurture_money_leak_checks",
        status: "nurture_leak_checks",
        page_source: pageSource,
        source,
        source_page: window.location.pathname,
        source_section: source,
        current_path: window.location.pathname,
        page: window.location.pathname,
        referrer: document.referrer || "",
        consent: "Stanley Systems can send practical admin drag checks using the email provided and phone if included.",
        timestamp: new Date().toISOString(),
        submitted_at: new Date().toISOString(),
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_content: params.get("utm_content") || "",
        utm_term: params.get("utm_term") || "",
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) throw new Error(result?.error || "Could not add you.")

      setState("success")
      setMessage("You’re in. Stanley Systems will send the next leak check.")
      setForm({ email: "", phone: "", current_system: "", website: "" })
    } catch (error) {
      setState("error")
      setMessage(error instanceof Error ? error.message : `Could not add you. Email ${fallbackEmail} and ask for the leak checks.`)
    }
  }

  return (
    <section className={`rounded-[2rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_18px_48px_rgba(7,29,58,0.06)] sm:p-6 ${className}`}>
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#071D3A] sm:text-3xl">{headline}</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#536173] sm:text-base sm:leading-7">{body}</p>
          <p className="mt-4 rounded-2xl border border-[#CFE8D5] bg-[#F4FBF5] px-4 py-3 text-sm font-bold leading-6 text-[#116832]">{helper}</p>
        </div>

        <form onSubmit={submit} className="grid gap-3" data-money-leak-checks-form={source}>
          {state === "success" ? <p className="rounded-2xl border border-[#CFE8D5] bg-[#F4FBF5] p-3 text-sm font-bold text-[#116832]">{message}</p> : null}
          {state === "error" ? <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-800">{message}</p> : null}
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#102033]">Email*</span>
            <input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-[#071D3A] outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#102033]">Phone, optional</span>
            <input type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="w-full rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-[#071D3A] outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#102033]">Current system, optional</span>
            <input value={form.current_system} onChange={(event) => setForm({ ...form, current_system: event.target.value })} placeholder={currentSystemPlaceholder} className="w-full rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-[#071D3A] outline-none placeholder:text-[#8B98A5] focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" />
          </label>
          <label className="hidden" aria-hidden="true">
            Website
            <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} />
          </label>
          <button disabled={state === "submitting"} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] disabled:opacity-70" type="submit">
            {state === "submitting" ? "Sending..." : "Send me the first leak check"} <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <p className="text-xs font-semibold leading-5 text-[#607080]">Stanley Systems will send practical leak checks. No filler.</p>
        </form>
      </div>
    </section>
  )
}
