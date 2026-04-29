import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Work Order to Invoice Process Fix | Stanley Systems",
  description:
    "See where service businesses lose time between completed work orders and invoice-ready billing, and how Stanley Systems helps fix that handoff.",
  alternates: {
    canonical: "https://stanley-systems.com/work-order-to-invoice-process-for-service-businesses",
  },
}

const failurePoints = [
  "The crew finishes the work, but billing still waits on missing details.",
  "Job notes, approvals, photos, and parts used are split across texts, calls, or different tools.",
  "The office has to rebuild the story of the job before an invoice can go out.",
  "Owners get pulled back in just to answer questions the process should have already covered.",
]

const whatBetterLooksLike = [
  "The team knows what has to be captured before a job is handed back to the office.",
  "Billing-ready details are gathered once instead of rebuilt later.",
  "Exceptions show up early, instead of delaying billing for days.",
  "Completed work moves into invoice-ready shape faster, with less chasing and less cleanup.",
]

export default function WorkOrderToInvoicePage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Problem page</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
                Fix the gap between completed work orders and invoice-ready billing.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                If the crew already finished the work, the business should not still be waiting on a clean billing handoff. Stanley Systems helps service businesses clean up the step between job complete and invoice ready so cash can move faster.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.15)] transition hover:bg-slate-800">
                  Book a meeting
                </Link>
                <a href="tel:+16179586372" className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-[#f4efe6]">
                  <Phone className="mr-2 h-4 w-4" />
                  Call +1 (617) 958-6372
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Where the gap starts</p>
              <ul className="mt-5 space-y-4">
                {failurePoints.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Why owners feel it</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">The work is done, but the money still waits</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                When completed work does not become invoice-ready quickly, the business keeps waiting on money it already earned. That delay usually starts in the office handoff, not in accounting.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What the office feels</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Billing turns into detective work</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Instead of moving a clean job into billing, the office has to chase notes, confirm approvals, and reconstruct what happened. That burns time and slows everything after it.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What Stanley Systems fixes</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">The handoff between done in the field and ready to bill</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Stanley Systems helps clean up the step that turns finished work into invoice-ready information. The goal is fewer delays, less re-entry, and less owner rescue work.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What better looks like</p>
              <ul className="mt-6 space-y-4">
                {whatBetterLooksLike.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#15803D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Next best step</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">If completed work keeps stalling before billing, that is worth fixing now.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Stanley Systems looks at the path between job complete and invoice ready, then shows where the delay is coming from and whether there is a clean fix worth building.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/invoicing-delay-cash-flow-calculator" className="inline-flex items-center justify-center rounded-full bg-[#15803D] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#166534]">
                  See what the delay is costing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/office-handoff-problems-in-field-service-businesses" className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-[#f4efe6]">
                  Read about office handoff problems
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  )
}
