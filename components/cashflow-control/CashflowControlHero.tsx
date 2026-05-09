import Link from "next/link"
import { ArrowRight, Mail, ClipboardCheck, ReceiptText } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { plans, sectionShell } from "./tokens"

const outputCards = [
  {
    icon: Mail,
    title: "Office alert",
    body: "Job #1842 is complete but not billing-ready. Missing: line items and tech notes. Sent to: office@shop.com",
  },
  {
    icon: ClipboardCheck,
    title: "Daily billing nudge",
    body: "4 jobs finished today. 3 are ready to invoice. 1 needs cleanup before billing.",
  },
  {
    icon: ReceiptText,
    title: "Weekly Money Leak Digest",
    body: "6 completed jobs reviewed. 2 jobs missing billing details. $4,850 in open balances surfaced. 3 invoices need follow-up.",
  },
]

export function CashflowControlHero() {
  return (
    <section className="relative overflow-hidden bg-[#FBFCF7] pb-14 pt-32 sm:pb-18 lg:pt-36">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${sectionShell} relative grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center`}>
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#15803D]">Cashflow Control System</p>
          <h1 className="mt-4 max-w-5xl text-[3.05rem] font-semibold leading-[0.95] tracking-[-0.055em] text-[#071D3A] sm:text-[4.5rem] lg:text-[5.2rem]">
            Turn finished jobs into collected cash faster.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#334B60] sm:text-xl">
            Stanley Systems automates the office checks that happen after the work is done, so completed jobs move toward billing, invoice follow-up, and collected cash with fewer manual reminders.
          </p>
          <p className="mt-5 max-w-3xl text-base font-bold leading-7 text-[#102033]">
            Built for service businesses using accounting software plus a field, job, dispatch, CRM, or shop system.
          </p>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#536173]">
            Common setups include Housecall Pro, Jobber, ServiceTitan, FieldEdge, Service Fusion, Workiz, FieldPulse, Yardbook, JobTread, ServiceTrade, Wallace, QuickBooks, Xero, Sage, FreshBooks, Stripe, Square, and similar tools.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTALink href={plans.cashflowMonthly.stripePaymentLink.url} kind="checkout" location="cashflow_hero_primary" analyticsEvent="package_checkout_clicked" analyticsSource="cashflow_control_page" packageId={plans.cashflowMonthly.analyticsPackageId} packageName="Cashflow Control System" billingPeriod="monthly" ctaLabel="Start Cashflow Control" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#15803D] px-7 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:bg-[#116832]">
              Start Cashflow Control <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </CTALink>
            <CTALink href={plans.workflowAudit.stripePaymentLink.url} kind="checkout" location="cashflow_hero_audit" analyticsEvent="audit_checkout_clicked" analyticsSource="cashflow_control_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start with the $97 Workflow Audit" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-7 py-4 text-base font-extrabold text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] transition hover:border-[#15803D] hover:bg-[#F4FBF5]">
              Start with the $97 Workflow Audit
            </CTALink>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#607080]">
            Your audit fee credits toward Cashflow Control or Repeat Revenue. Yearly buyers get a $194 credit.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[#15803D]/10 blur-3xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-[#CFE8D5] bg-white p-5 shadow-[0_26px_70px_rgba(7,29,58,0.12)] sm:p-6">
            <div className="rounded-[1.65rem] bg-[#F4FBF5] p-4">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#116832]">System outputs, not another dashboard</p>
              <div className="mt-4 grid gap-4">
                {outputCards.map((card, index) => (
                  <article key={card.title} className="rounded-[1.35rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_14px_30px_rgba(7,29,58,0.06)]" style={{ transform: `translateX(${index * 10}px)` }}>
                    <div className="flex items-start gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#EAF6E6] text-[#15803D] ring-1 ring-[#CFE8D5]"><card.icon className="h-5 w-5" /></span>
                      <div>
                        <h2 className="text-lg font-extrabold tracking-[-0.02em] text-[#071D3A]">{card.title}</h2>
                        <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">{card.body}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm font-semibold text-[#607080]">
            Prefer to compare first? <Link href="/pricing" className="font-extrabold text-[#116832] underline underline-offset-4">See all pricing</Link>.
          </div>
        </div>
      </div>
    </section>
  )
}
