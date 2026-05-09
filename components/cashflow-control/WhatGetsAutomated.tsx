import { ArrowRight, CheckCircle2 } from "lucide-react"
import { sectionShell } from "./tokens"

const steps = ["Job complete", "Billing-ready check", "Missing-info request", "Invoice nudge", "Open-balance visibility", "Weekly money leak digest"] as const
const cards = [
  ["Finished-job capture", "When work is marked complete, Stanley Systems starts the billing-readiness path."],
  ["Billing-ready check", "The system checks whether the job has the details your office needs before billing stalls."],
  ["Missing-info request", "If something is missing, the right person gets a plain request instead of the office chasing through texts and memory."],
  ["Invoice cutoff nudge", "If completed jobs are still not invoice-ready or invoiced by the cutoff, the office gets a simple reminder."],
  ["Open-balance visibility", "Unpaid invoices stay visible by age, amount, and exception type."],
  ["Weekly or monthly digest", "Leadership sees where cash got stuck and what keeps repeating."],
] as const

export function WhatGetsAutomated() {
  return (
    <section className="bg-[#FBFCF7] py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">What gets automated</p>
          <h2 className="mt-3 text-[2.4rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">The office checks get handled automatically.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Stanley Systems watches the path from finished job to collected cash and sends the right notice when something needs attention.</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#CFE8D5] bg-white p-4 shadow-[0_18px_48px_rgba(7,29,58,0.06)]">
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <div key={step} className="relative rounded-2xl border border-[#DDEBE2] bg-[#F7FCF4] p-4">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#15803D] text-xs font-black text-white">{index + 1}</span>
                <p className="mt-3 text-sm font-extrabold leading-5 text-[#071D3A]">{step}</p>
                {index < steps.length - 1 ? <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full border border-[#CFE8D5] bg-white p-1 text-[#15803D] lg:block" /> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(([title, body]) => (
            <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_14px_32px_rgba(7,29,58,0.05)]">
              <CheckCircle2 className="h-5 w-5 text-[#15803D]" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-extrabold text-[#071D3A]">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">{body}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-7 max-w-3xl rounded-[1.5rem] border border-[#BFE4C8] bg-[#F4FBF5] p-5 text-center text-xl font-extrabold leading-7 tracking-[-0.02em] text-[#102033]">
          Your office should not spend paid hours rebuilding the same billing checklist every week.
        </p>
      </div>
    </section>
  )
}
