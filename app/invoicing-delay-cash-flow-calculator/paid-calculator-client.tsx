"use client"

import { useEffect, useMemo, useState } from "react"

const severityOrder = {
  Low: 1,
  Moderate: 2,
  High: 3,
  Severe: 4,
} as const

type Severity = keyof typeof severityOrder

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

function track(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })
}

export function PaidInvoicingDelayCalculatorClient() {
  const [trade, setTrade] = useState("Plumbing")
  const [invoiceValue, setInvoiceValue] = useState("1200")
  const [jobsPerMonth, setJobsPerMonth] = useState("25")
  const [delayDays, setDelayDays] = useState("4")
  const [partialViewed, setPartialViewed] = useState(false)
  const [showGate, setShowGate] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [lead, setLead] = useState({
    firstName: "",
    workEmail: "",
    company: "",
    phone: "",
  })

  const result = useMemo(() => {
    const invoice = Number(invoiceValue) || 0
    const jobs = Number(jobsPerMonth) || 0
    const days = Number(delayDays) || 0
    const monthlyBilledValue = invoice * jobs
    const weightedCashDrag = monthlyBilledValue * (days / 30)

    let severity: Severity = "Low"
    if (weightedCashDrag >= 100000) severity = "Severe"
    else if (weightedCashDrag >= 40000) severity = "High"
    else if (weightedCashDrag >= 10000) severity = "Moderate"

    return {
      monthlyBilledValue,
      weightedCashDrag,
      severity,
    }
  }, [invoiceValue, jobsPerMonth, delayDays])

  useEffect(() => {
    track("stanley_paid_calc_view", { page: "/invoicing-delay-cash-flow-calculator/paid" })
  }, [])

  useEffect(() => {
    track("stanley_paid_calc_started", {
      trade,
      invoiceValue,
      jobsPerMonth,
      delayDays,
    })
  }, [trade, invoiceValue, jobsPerMonth, delayDays])

  function handleShowPartialResult() {
    if (!partialViewed) {
      track("stanley_paid_calc_partial_result_viewed", {
        trade,
        severity: result.severity,
        weightedCashDrag: Math.round(result.weightedCashDrag),
      })
      setPartialViewed(true)
    }
  }

  async function handleGateSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError("")
    track("stanley_paid_calc_email_submit_started", {
      severity: result.severity,
      trade,
    })

    try {
      const problem = `Paid calculator lead. Trade: ${trade}. Average invoice: ${invoiceValue}. Jobs per month: ${jobsPerMonth}. Delay days: ${delayDays}. Estimated cash timing drag: ${Math.round(result.weightedCashDrag)}. Severity: ${result.severity}.`

      const breakdown = [
        `Full breakdown for ${lead.company}`,
        `Trade: ${trade}`,
        `Severity: ${result.severity}`,
        `Average invoice: ${invoiceValue}`,
        `Jobs per month: ${jobsPerMonth}`,
        `Delay days: ${delayDays}`,
        `Estimated cash timing drag: $${Math.round(result.weightedCashDrag).toLocaleString()}`,
        "",
        "Fix checklist (quick):",
        "1) Confirm the trigger step that marks work complete.",
        "2) Make invoice prep a same-day task (no batching).",
        "3) Capture missing job details at closeout so invoicing is not blocked.",
        "4) Send invoice the same day, then follow up at 3/7/14 days.",
      ].join("\n")

      const response = await fetch("/api/send-breakdown", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: lead.workEmail,
          name: lead.firstName,
          company: lead.company,
          phone: lead.phone,
          trade,
          severity: result.severity,
          breakdown,
          // keep for internal tracking
          problem,
        }),
      })

      const payload = await response.json().catch(() => null)
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || payload?.message || "Could not submit your details.")
      }

      setSubmitted(true)
      setShowGate(false)
      // small visual reward so the submit feels real
      if (typeof window !== "undefined") {
        import("sonner").then(({ toast }) => toast.success("Sent. Check your inbox."))
      }
      track("stanley_paid_calc_email_submitted", {
        severity: result.severity,
        trade,
      })
      track("stanley_paid_calc_severity_assigned", {
        severity: result.severity,
        trade,
        weightedCashDrag: Math.round(result.weightedCashDrag),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit your details.")
    } finally {
      setSubmitting(false)
    }
  }

  const highSeverity = severityOrder[result.severity] >= severityOrder.High

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="rounded-[2rem] border border-[#e8dfd0] bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] sm:p-8">
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.3rem] lg:leading-[1.06]">
            See what slow invoicing may be doing to office workflow.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Enter a few numbers. Get your estimate first. Then decide if you want the full breakdown and fix checklist.
          </p>

          <div className="mt-8 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Trade</span>
              <select value={trade} onChange={(e) => setTrade(e.target.value)} className="rounded-2xl border border-[#d8d1c4] px-4 py-3 text-slate-900">
                <option>Plumbing</option>
                <option>HVAC</option>
                <option>Electrical</option>
                <option>Marine service</option>
                <option>General field service</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Average invoice value</span>
              <input value={invoiceValue} onChange={(e) => setInvoiceValue(e.target.value)} className="rounded-2xl border border-[#d8d1c4] px-4 py-3 text-slate-900" inputMode="decimal" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Completed jobs per month</span>
              <input value={jobsPerMonth} onChange={(e) => setJobsPerMonth(e.target.value)} className="rounded-2xl border border-[#d8d1c4] px-4 py-3 text-slate-900" inputMode="numeric" />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Average delay in days before invoicing</span>
              <input value={delayDays} onChange={(e) => setDelayDays(e.target.value)} className="rounded-2xl border border-[#d8d1c4] px-4 py-3 text-slate-900" inputMode="numeric" />
            </label>
          </div>

          <div className="mt-8 rounded-[1.4rem] border border-[#dfe8d9] bg-[linear-gradient(180deg,#f5f9f1_0%,#ffffff_100%)] px-5 py-4">
            <p className="mt-3 text-base leading-7 text-slate-700">
              This is the same kind of office-to-billing problem Stanley Systems helps a marine shop clean up: getting finished work into billing more cleanly so cash does not keep waiting on office cleanup.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-7 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:p-8">
          <div className="mt-6 grid gap-4">
            <div className="rounded-[1.4rem] border border-[#e8dfd0] bg-white px-5 py-4">
              <div className="text-sm text-slate-500">Monthly billed value moving through this workflow</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">${result.monthlyBilledValue.toLocaleString()}</div>
            </div>
            <div className="rounded-[1.4rem] border border-[#e8dfd0] bg-white px-5 py-4">
              <div className="text-sm text-slate-500">Estimated cash timing drag</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">${Math.round(result.weightedCashDrag).toLocaleString()}</div>
            </div>
            <div className="rounded-[1.4rem] border border-[#dfe8d9] bg-white px-5 py-4">
              <div className="text-sm text-slate-500">Severity band</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">{result.severity}</div>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Finished work may be sitting longer than it should before the business can collect what it already earned.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              handleShowPartialResult()
              setShowGate(true)
            }}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#15803D] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#166534]"
          >
            Email my full breakdown and fix checklist
          </button>

          <div className="mt-5 rounded-[1.4rem] border border-[#e8dfd0] bg-white px-5 py-4 text-sm leading-7 text-slate-600">
            <div className="font-semibold text-slate-900">What happens next</div>
            <ul className="mt-3 space-y-1">
              <li>1. You get the deeper breakdown and checklist.</li>
              <li>2. If the drag looks serious, you see the booking option right away.</li>
              <li>3. If it looks moderate or low, you get the checklist first and can book when ready.</li>
            </ul>
          </div>

          {showGate ? (
            <form onSubmit={handleGateSubmit} className="mt-6 grid gap-4 rounded-[1.6rem] border border-[#d8d1c4] bg-white p-5">
              <div className="text-base font-semibold text-slate-900">Get the full breakdown</div>
              <input value={lead.firstName} onChange={(e) => setLead((current) => ({ ...current, firstName: e.target.value }))} required placeholder="First name" className="rounded-2xl border border-[#d8d1c4] px-4 py-3 text-slate-900" />
              <input value={lead.workEmail} onChange={(e) => setLead((current) => ({ ...current, workEmail: e.target.value }))} required type="email" placeholder="Work email" className="rounded-2xl border border-[#d8d1c4] px-4 py-3 text-slate-900" />
              <input value={lead.company} onChange={(e) => setLead((current) => ({ ...current, company: e.target.value }))} required placeholder="Company" className="rounded-2xl border border-[#d8d1c4] px-4 py-3 text-slate-900" />
              <input value={lead.phone} onChange={(e) => setLead((current) => ({ ...current, phone: e.target.value }))} placeholder="Phone (optional)" className="rounded-2xl border border-[#d8d1c4] px-4 py-3 text-slate-900" />
              {error ? <div className="text-sm font-medium text-red-700">{error}</div> : null}
              <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70">
                {submitting ? "Sending..." : "Send my full breakdown"}
              </button>
            </form>
          ) : null}

          {submitted ? (
            <div className="mt-6 rounded-[1.6rem] border border-[#dfe8d9] bg-[linear-gradient(180deg,#f5f9f1_0%,#ffffff_100%)] p-5">
              <div className="text-base font-semibold text-slate-900">
                {highSeverity ? "This looks worth addressing quickly." : "You have the next-step breakdown."}
              </div>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {highSeverity
                  ? "When completed work keeps sitting before billing, the business usually feels it in slower cash, office cleanup, and more owner rescue work. Your next step is the $97 AI Profit Map."
                  : "This looks like a fixable office-step issue. Start with the checklist, then use the AI Profit Map to see where work is getting stuck and which workflow should be installed first."}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/ai-profit-map"
                  onClick={() => track("stanley_paid_calc_booking_cta_clicked", { severity: result.severity, trade })}
                  className="inline-flex items-center justify-center rounded-full bg-[#15803D] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#166534]"
                >
                  Buy the AI Profit Map
                </a>
                <a
                  href="mailto:jaden@stanley-systems.com?subject=Send%20my%20same-day%20invoicing%20checklist"
                  onClick={() => track("stanley_paid_calc_checklist_requested", { severity: result.severity, trade })}
                  className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-[#f4efe6]"
                >
                  Email me the checklist
                </a>
              </div>
            </div>
          ) : null}
        </section>
      </div>

      {partialViewed ? (
        <div className="fixed inset-x-0 bottom-4 z-40 px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setShowGate(true)}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.28)]"
          >
            Get my full breakdown
          </button>
        </div>
      ) : null}
    </div>
  )
}
