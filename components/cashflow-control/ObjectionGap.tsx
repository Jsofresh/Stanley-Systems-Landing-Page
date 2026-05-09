import { CheckCircle2 } from "lucide-react"
import { cardShell, sectionShell } from "./tokens"

const cards = [
  ["Job complete does not mean invoice-ready", "The office still has to check notes, prices, line items, photos, payment status, and whether the job reached the billing system."],
  ["Invoice sent does not mean follow-up is handled", "Some balances need a normal reminder. Some need a person. Some need owner visibility before they get old."],
  ["Reports do not fix the handoff", "A report can show what happened. Stanley Systems helps catch the issue before it becomes normal office drag."],
] as const

export function ObjectionGap() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="grid gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">The real gap</p>
            <h2 className="mt-3 text-[2.35rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">
              Your software already handles parts of billing. The gap is what happens between the steps.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#536173] sm:text-lg">
              QuickBooks, Housecall Pro, Jobber, ServiceTitan, and other tools already handle parts of invoicing, reminders, payments, and reporting. That is not the problem. The problem is the gap between job completion, billing readiness, invoice follow-up, and owner visibility. Stanley Systems does not replace your software. It makes the handoff around it harder to miss.
            </p>
          </div>
          <div className="grid gap-4">
            {cards.map(([title, body]) => (
              <article key={title} className={`${cardShell} p-5`}>
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                  <div>
                    <h3 className="text-xl font-extrabold tracking-[-0.02em] text-[#071D3A]">{title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">{body}</p>
                  </div>
                </div>
              </article>
            ))}
            <div className="rounded-[1.5rem] border border-[#BFE4C8] bg-[#F4FBF5] p-5 text-base font-extrabold leading-7 text-[#102033]">
              Already have reminders? Good. Cashflow Control watches the office path around them so missing details, stuck invoices, and open balances do not depend on memory.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
