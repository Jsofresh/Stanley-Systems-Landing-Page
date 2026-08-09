import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

const cashflowProofCards = [
  ["Billing path shown", "See how intake, job details, approvals, invoices, and final bills move without another handoff spreadsheet."],
  ["Missing details routed", "Notes, photos, pricing, receipts, approvals, or payment details get sent to the person who can actually fix them."],
  ["Invoice blockers visible", "Jobs that should have moved to invoice or final bill stop hiding inside field notes, email, or memory."],
  ["Cash follow-up clear", "Open balances, payment follow-up, and owner visibility stay tied to the job instead of becoming cleanup work."],
] as const

export function AIOfficeWorkflowDemoProofStrip() {
  return (
    <section id="demo" data-section="office workflow-demo-proof" className="scroll-mt-[120px] bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-[#D5DEE8] bg-white shadow-[0_14px_42px_rgba(16,32,51,0.06)]">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-9">
            <h2 className="text-[2.05rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#102033] sm:text-[2.9rem]">
              See the office workflow path before you buy.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#33475B] sm:text-lg">
              Watch how Stanley Systems turns a customer request, field job, office handoff, billing check, invoice, final bill, and payment follow-up into one visible workflow.
            </p>
            <p className="mt-3 text-base leading-7 text-[#33475B]">
              Before you buy, the demo should show what triggers the workflow, which billing details get checked, who gets notified when something is missing, and how the job keeps moving toward collected cash.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/ai-profit-map" prefetch={false} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(21,128,61,0.18)] transition hover:bg-[#17612E]">
                Buy the AI Profit Map <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/ai-profit-map" prefetch={false} className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#15803D] bg-white px-6 py-3 text-sm font-bold text-[#102033] transition hover:bg-[#F4FBF6]">
                Buy the AI Profit Map
              </Link>
            </div>
          </div>

          <Link href="/ai-profit-map" prefetch={false} className="group relative block min-h-[285px] overflow-hidden bg-[#F8FBF9] sm:min-h-[340px] lg:min-h-[390px]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-stanley-systems-workflow-automation.jpg"
              alt="Office Workflow Control demo visual showing intake, job records, billing checks, routing, invoices, and payment follow-up connected into one workflow."
              width={1280}
              height={720}
              className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/94 text-[#15803D] shadow-[0_14px_34px_rgba(33,51,67,0.18)] ring-1 ring-[#C8D8CE]" aria-hidden="true">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </Link>
        </div>

        <div className="grid gap-3 border-t border-[#D5DEE8] bg-[#F8FBF9] p-4 md:grid-cols-2 xl:grid-cols-4">
          {cashflowProofCards.map(([title, text]) => (
            <article key={title} className="rounded-xl border border-[#D5DEE8] bg-white p-4">
              <h3 className="text-lg font-bold tracking-[-0.025em] text-[#102033]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#516F90]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
