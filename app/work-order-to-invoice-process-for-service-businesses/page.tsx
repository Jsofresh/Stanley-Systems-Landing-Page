import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
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
      <section className="bg-[#F7F4EC] px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-[#071D3A] sm:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
                Fix the gap between completed work orders and invoice-ready billing.
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-[#42596C] sm:text-xl">
                If the crew already finished the work, the business should not still be waiting on a clean billing handoff. Stanley Systems helps service businesses clean up the step between job complete and invoice ready so cash can move faster.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/ai-profit-map" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]">
                  Buy the AI Profit Map
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/invoicing-delay-cash-flow-calculator" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:bg-[#f3fbf5]">
                  Calculate Your Admin Drag
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur">
              <ul className="mt-5 space-y-4">
                {failurePoints.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-[#34495F]">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#071D3A]">The work is done, but the money still waits</h2>
              <p className="mt-4 text-base leading-7 text-[#536173]">
                When completed work does not become invoice-ready quickly, the business keeps waiting on money it already earned. That delay usually starts in the office handoff, not in accounting.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#071D3A]">Billing turns into detective work</h2>
              <p className="mt-4 text-base leading-7 text-[#536173]">
                Instead of moving a clean job into billing, the office has to chase notes, confirm approvals, and reconstruct what happened. That burns time and slows everything after it.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#071D3A]">The handoff between done in the field and ready to bill</h2>
              <p className="mt-4 text-base leading-7 text-[#536173]">
                Stanley Systems helps clean up the step that turns finished work into invoice-ready information. The goal is fewer delays, less re-entry, and less owner rescue work.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#DDEBE2] bg-[#FBFCF7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <ul className="mt-6 space-y-4">
                {whatBetterLooksLike.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-[#34495F]">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#15803D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[#DDEBE2] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#071D3A]">If completed work keeps stalling before billing, that is worth fixing now.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173]">
                Stanley Systems looks at the path between job complete and invoice ready, then shows where the delay is coming from and whether there is a clean fix worth building.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/invoicing-delay-cash-flow-calculator" className="inline-flex items-center justify-center rounded-full bg-[#15803D] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#166534]">
                  See what the delay is costing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/office-handoff-problems-in-field-service-businesses" className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3.5 text-base font-semibold text-[#071D3A] transition hover:bg-[#f4efe6]">
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
