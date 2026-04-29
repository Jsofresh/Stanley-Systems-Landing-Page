"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"

type StepKey = "intro" | "invoice" | "jobs" | "delay" | "hours" | "unbilled" | "corrections" | "results" | "cta"

const STEP_ORDER: StepKey[] = ["intro", "invoice", "jobs", "delay", "hours", "unbilled", "corrections", "results", "cta"]

function formatMoney(value: number) {
  return `$${Math.round(value).toLocaleString()}`
}

export function InvoicingDelayCalculatorClient() {
  const [step, setStep] = useState<StepKey>("intro")
  const [invoiceValue, setInvoiceValue] = useState("1200")
  const [jobsPerMonth, setJobsPerMonth] = useState("25")
  const [delayDays, setDelayDays] = useState("4")
  const [hoursLost, setHoursLost] = useState("0.5")
  const [unbilledJobs, setUnbilledJobs] = useState("3")
  const [correctionRate, setCorrectionRate] = useState("20")

  const showSiteChrome = false
  const stepIndex = STEP_ORDER.indexOf(step)
  const progress = step === "intro" ? 5 : step === "cta" ? 100 : Math.round((stepIndex / (STEP_ORDER.length - 2)) * 100)

  const result = useMemo(() => {
    const invoice = Number(invoiceValue) || 0
    const jobs = Number(jobsPerMonth) || 0
    const days = Number(delayDays) || 0
    const hours = Number(hoursLost) || 0
    const unbilled = Number(unbilledJobs) || 0
    const correction = (Number(correctionRate) || 0) / 100

    const monthlyBilledValue = invoice * jobs
    const weightedCashDrag = monthlyBilledValue * (days / 30)
    const monthlyLaborHours = jobs * hours
    const roughAdminCost = monthlyLaborHours * 35
    const stuckUnbilledValue = invoice * unbilled
    const correctionLoss = monthlyBilledValue * correction * 0.03
    const totalImpact = weightedCashDrag + roughAdminCost + stuckUnbilledValue + correctionLoss

    let band = "Money leaking"
    if (totalImpact >= 120000 || monthlyLaborHours >= 45) band = "Critical billing bottleneck"
    else if (totalImpact >= 50000 || monthlyLaborHours >= 24) band = "Serious cash drag"

    return {
      monthlyBilledValue,
      weightedCashDrag,
      monthlyLaborHours,
      roughAdminCost,
      stuckUnbilledValue,
      correctionLoss,
      totalImpact,
      band,
    }
  }, [invoiceValue, jobsPerMonth, delayDays, hoursLost, unbilledJobs, correctionRate])

  function next(nextStep?: StepKey) {
    if (nextStep) {
      setStep(nextStep)
      return
    }
    const idx = STEP_ORDER.indexOf(step)
    if (idx < STEP_ORDER.length - 1) setStep(STEP_ORDER[idx + 1])
  }

  function back() {
    const idx = STEP_ORDER.indexOf(step)
    if (idx > 0) setStep(STEP_ORDER[idx - 1])
  }

  function StepFrame({ eyebrow, title, body, children, canContinue = true, continueLabel = "Next" }: { eyebrow: string; title: string; body: string; children?: React.ReactNode; canContinue?: boolean; continueLabel?: string }) {
    return (
      <section className="relative min-h-screen px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8 lg:pb-14 lg:pt-10">
        <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1380px] items-center justify-center">
          <div className="w-full rounded-[2.25rem] border border-[#e8dfd0] bg-white/96 p-6 shadow-[0_28px_100px_rgba(15,23,42,0.10)] backdrop-blur sm:p-8 lg:min-h-[82vh] lg:rounded-[2.75rem] lg:p-12">
            <div className="mb-8">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#efe9dc]">
                <div className="h-full rounded-full bg-[#15803D] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</div>
            </div>

            <div className="mx-auto max-w-4xl space-y-5 text-center">
              <h1 className="text-[2rem] font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[4.5rem] lg:leading-[0.98]">{title}</h1>
              <p className="mx-auto max-w-3xl text-base leading-7 text-slate-600 sm:text-xl lg:text-[1.35rem] lg:leading-9">{body}</p>
            </div>

            {children}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-between lg:mt-12">
              <button
                type="button"
                onClick={back}
                className={`inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#f4efe6] ${step === "intro" ? "invisible" : ""}`}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                onClick={() => next()}
                disabled={!canContinue}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {continueLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  function BigNumberInput({ value, onChange, prefix, suffix }: { value: string; onChange: (value: string) => void; prefix?: string; suffix?: string }) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
      const el = inputRef.current
      if (!el) return
      const raf = requestAnimationFrame(() => {
        el.focus()
        const end = el.value.length
        el.setSelectionRange(end, end)
      })
      return () => cancelAnimationFrame(raf)
    }, [])

    return (
      <div
        className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] px-5 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:px-8 sm:py-10 lg:mt-14 lg:max-w-4xl lg:rounded-[2.3rem] lg:px-12 lg:py-14"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex min-h-[88px] items-center justify-center gap-2 text-4xl font-semibold text-slate-900 sm:min-h-[110px] sm:gap-3 sm:text-6xl lg:min-h-[132px] lg:text-[5.5rem]">
          {prefix ? <span className="shrink-0 text-slate-400">{prefix}</span> : null}
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ''))}
            inputMode="decimal"
            enterKeyHint="next"
            className="min-w-0 flex-1 bg-transparent px-1 text-center outline-none"
          />
          {suffix ? <span className="shrink-0 text-xl text-slate-400 sm:text-3xl lg:text-4xl">{suffix}</span> : null}
        </div>
      </div>
    )
  }

  const quizContent = (() => {
    if (step === "intro") {
      return (
        <StepFrame
          eyebrow="Interactive assessment"
          title="See how much money slow invoicing is costing your business"
          body="Answer 6 quick questions. We will estimate how much cash is getting held up, how much payroll is being burned on invoice cleanup, and how much finished work may still be sitting unbilled."
          continueLabel="Start the calculator"
        >
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3 lg:mt-16">
            <div className="rounded-[1.8rem] border border-[#e8dfd0] bg-[#fbfaf7] px-6 py-6 text-left">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Estimate 1</div>
              <div className="mt-3 text-xl font-semibold text-slate-900">Cash getting held up</div>
            </div>
            <div className="rounded-[1.8rem] border border-[#e8dfd0] bg-[#fbfaf7] px-6 py-6 text-left">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Estimate 2</div>
              <div className="mt-3 text-xl font-semibold text-slate-900">Payroll burned on cleanup</div>
            </div>
            <div className="rounded-[1.8rem] border border-[#e8dfd0] bg-[#fbfaf7] px-6 py-6 text-left">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Estimate 3</div>
              <div className="mt-3 text-xl font-semibold text-slate-900">How bad the billing bottleneck is</div>
            </div>
          </div>
        </StepFrame>
      )
    }

    if (step === "invoice") {
      return (
        <StepFrame
          eyebrow="Step 1 of 6"
          title="How much money is tied to each invoice?"
          body="The bigger each invoice is, the more money gets trapped every time billing slips."
        >
          <BigNumberInput value={invoiceValue} onChange={setInvoiceValue} prefix="$" />
        </StepFrame>
      )
    }

    if (step === "jobs") {
      return (
        <StepFrame
          eyebrow="Step 2 of 6"
          title="How many finished jobs are waiting to turn into cash each month?"
          body="Even small invoicing delays become expensive when completed work keeps stacking up week after week."
        >
          <BigNumberInput value={jobsPerMonth} onChange={setJobsPerMonth} suffix="jobs" />
        </StepFrame>
      )
    }

    if (step === "delay") {
      return (
        <StepFrame
          eyebrow="Step 3 of 6"
          title="How many days does your money sit before you bill it?"
          body="Every extra day before the invoice goes out is another day your cash stays stuck instead of coming in."
        >
          <BigNumberInput value={delayDays} onChange={setDelayDays} suffix="days" />
        </StepFrame>
      )
    }

    if (step === "hours") {
      return (
        <StepFrame
          eyebrow="Step 4 of 6"
          title="How much office time gets burned just to get one invoice out?"
          body="Think re-entry, missing details, cleanup, and chasing field info that should have been ready the first time."
        >
          <BigNumberInput value={hoursLost} onChange={setHoursLost} suffix="hrs" />
        </StepFrame>
      )
    }

    if (step === "unbilled") {
      return (
        <StepFrame
          eyebrow="Step 5 of 6"
          title="How many completed jobs are usually sitting unbilled right now?"
          body="If work is done but the invoice is still not out, that is money already earned but still stuck in limbo."
        >
          <BigNumberInput value={unbilledJobs} onChange={setUnbilledJobs} suffix="jobs" />
        </StepFrame>
      )
    }

    if (step === "corrections") {
      return (
        <StepFrame
          eyebrow="Step 6 of 6"
          title="What percent of invoices need corrections, missing info, or extra follow-up before they can go out?"
          body="Every correction cycle slows cash down and quietly adds more payroll waste to work that should already be finished."
          continueLabel="See what it is costing"
        >
          <BigNumberInput value={correctionRate} onChange={setCorrectionRate} suffix="%" />
        </StepFrame>
      )
    }

    if (step === "results") {
      return (
        <StepFrame
          eyebrow="Estimated monthly loss"
          title="Here is how much slow invoicing may be costing you every month"
          body="This combines delayed cash, payroll tied up in invoice cleanup, work still sitting unbilled, and the drag created by corrections and missing information."
          continueLabel="Show me how to stop it"
        >
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 lg:mt-16">
            <div className="rounded-[1.8rem] border border-[#e8dfd0] bg-[#fbfaf7] px-6 py-6 lg:px-8 lg:py-8">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Monthly billing volume moving through this workflow</div>
              <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">{formatMoney(result.monthlyBilledValue)}</div>
            </div>
            <div className="rounded-[1.8rem] border border-[#f1d8d8] bg-[linear-gradient(180deg,#fff5f5_0%,#ffffff_100%)] px-6 py-6 lg:px-8 lg:py-8">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b91c1c]">Cash getting held up each month</div>
              <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">{formatMoney(result.weightedCashDrag)}</div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.8rem] border border-[#e8dfd0] bg-white px-6 py-6 lg:px-8 lg:py-8">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Payroll wasted on invoice cleanup</div>
                <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{formatMoney(result.roughAdminCost)}</div>
              </div>
              <div className="rounded-[1.8rem] border border-[#e8dfd0] bg-white px-6 py-6 lg:px-8 lg:py-8">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Finished work still sitting unbilled</div>
                <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{formatMoney(result.stuckUnbilledValue)}</div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.8rem] border border-[#e8dfd0] bg-white px-6 py-6 lg:px-8 lg:py-8">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Loss from corrections and missing info</div>
                <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{formatMoney(result.correctionLoss)}</div>
              </div>
              <div className="rounded-[1.8rem] border border-[#e8dfd0] bg-white px-6 py-6 lg:px-8 lg:py-8">
                <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Office hours lost every month</div>
                <div className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{result.monthlyLaborHours.toFixed(1)} hrs</div>
              </div>
            </div>
            <div className="rounded-[1.8rem] border border-[#d8d1c4] bg-slate-950 px-6 py-6 text-white lg:px-8 lg:py-8">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">Total monthly impact</div>
              <div className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{formatMoney(result.totalImpact)}</div>
              <div className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">Severity</div>
              <div className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{result.band}</div>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                This is what happens when completed work does not turn into invoices fast enough. Cash gets held up, payroll gets burned on cleanup, and the owner ends up carrying the mess instead of getting paid faster.
              </p>
            </div>
          </div>
        </StepFrame>
      )
    }

    return null
  })()

  return (
    <>
      {showSiteChrome ? <GlassmorphismNav /> : null}

      {step === "cta" ? (
        <section className="relative min-h-screen px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8 lg:pb-14 lg:pt-10">
          <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1380px] items-center justify-center">
            <section className="w-full rounded-[2.25rem] border border-[#e8dfd0] bg-[linear-gradient(180deg,#f9f6ef_0%,#ffffff_100%)] p-6 shadow-[0_28px_100px_rgba(15,23,42,0.10)] sm:p-8 lg:min-h-[82vh] lg:rounded-[2.75rem] lg:p-12">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#efe9dc]">
                <div className="h-full w-full rounded-full bg-[#15803D]" />
              </div>
              <div className="mt-8 text-center">
                <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">What to do next</div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[3rem] lg:leading-[1.05]">
                  This is money you should already have.
                </h2>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                  Stanley Systems helps service businesses fix the handoff between completed work, office admin, and billing so invoices go out faster, fewer details get lost, and the owner stops acting like the backup system.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-[1.6rem] border border-[#e8dfd0] bg-white px-5 py-5 text-left">
                  <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Fix 1</div>
                  <div className="mt-3 text-lg font-semibold text-slate-900">Tighten the handoff from completed work to invoice prep</div>
                </div>
                <div className="rounded-[1.6rem] border border-[#e8dfd0] bg-white px-5 py-5 text-left">
                  <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Fix 2</div>
                  <div className="mt-3 text-lg font-semibold text-slate-900">Cut the office cleanup that keeps cash waiting</div>
                </div>
                <div className="rounded-[1.6rem] border border-[#e8dfd0] bg-white px-5 py-5 text-left">
                  <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Fix 3</div>
                  <div className="mt-3 text-lg font-semibold text-slate-900">Get invoices out faster without the owner chasing everything</div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#15803D] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#166534]">
                  Book the Workflow Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/#systems" className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-[#f4efe6]">
                  Show Me the Recommended System
                </Link>
              </div>
            </section>
          </div>
        </section>
      ) : (
        quizContent
      )}

      {showSiteChrome ? <Footer /> : null}
    </>
  )
}
