"use client"

import {
  IconArrowRight,
} from "@tabler/icons-react"
import type { ComponentType } from "react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import {
  BillingCheckDisplayAsset,
  CashApprovedDisplayAsset,
  InactiveCustomersDisplayAsset,
  MoneyLeakRoutingDisplayAsset,
  PhoneMissedTransparentDisplayAsset,
  RepeatCustomerLoopDisplayAsset,
  type DisplayAssetProps,
} from "@/components/visual-kit/display-assets"

const calculatorHref = "/invoicing-delay-cash-flow-calculator"
const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url

type SummaryIcon = ComponentType<DisplayAssetProps>

const diagnosticTargets: Array<{
  Icon: SummaryIcon
  title: string
  body: string
}> = [
  {
    Icon: BillingCheckDisplayAsset,
    title: "Cashflow Control System",
    body: "Turn finished work into invoices, follow-up, and collected cash.",
  },
  {
    Icon: RepeatCustomerLoopDisplayAsset,
    title: "Repeat Revenue System",
    body: "Turn past customers, reviews, referrals, and missed calls into booked work.",
  },
  {
    Icon: MoneyLeakRoutingDisplayAsset,
    title: "Both Systems",
    body: "Fix cash collection and repeat work together when both leaks are costing you.",
  },
]

const signalCards: Array<{
  Icon: SummaryIcon
  label: string
}> = [
  { Icon: CashApprovedDisplayAsset, label: "Open invoices and estimates" },
  { Icon: PhoneMissedTransparentDisplayAsset, label: "Missed calls and unworked leads" },
  { Icon: InactiveCustomersDisplayAsset, label: "Past customers sitting idle" },
]

export function CalculatorPathSection() {
  return (
    <section
      id="calculator"
      data-section="revenue-calculator-preview"
      data-analytics-view="calculator_intro_viewed"
      data-analytics-source="homepage_calculator_section"
      data-audit-page="/"
      data-audit-section="home.calculator-path"
      data-audit-priority="4"
      data-audit-offer="Workflow Audit"
      data-audit-purpose="Move visitors from the calculator diagnostic into the right paid next step."
      className="relative z-10 scroll-mt-28 overflow-hidden bg-[#F7FAF7] px-5 py-12 sm:scroll-mt-32 sm:px-6 sm:py-14 lg:scroll-mt-36 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[78rem]">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,0.47fr)_minmax(0,0.53fr)] lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <h2 className="max-w-[40rem] text-[2.1rem] font-semibold leading-[1.03] text-[#102033] sm:text-[2.55rem] lg:text-[2.85rem] xl:text-[3.05rem]">
              Find the money leak before you buy the system.
            </h2>

            <p className="mt-5 max-w-[35rem] text-base leading-7 text-[#47566C] sm:text-lg sm:leading-8">
              The calculator checks the plain places service businesses lose revenue after the lead, job, or customer already exists: invoices, estimates, missed calls, and past customers that never get a next step.
            </p>

            <div className="mt-6 grid max-w-[35rem] gap-3 sm:grid-cols-3">
              {signalCards.map(({ Icon, label }) => (
                <div key={label} className="flex min-h-[5.25rem] items-start gap-3 rounded-2xl border border-[#DCE7DD] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(16,32,51,0.04)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4F7EA] text-[#15803D] ring-1 ring-[#CBEED8]">
                    <Icon size={34} decorative />
                  </span>
                  <span className="text-sm font-semibold leading-5 text-[#102033]">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CTALink
                href={calculatorHref}
                kind="calculator"
                location="homepage_calculator_primary"
                analyticsEvent="calculator_cta_clicked"
                analyticsSource="homepage_calculator_section"
                ctaLabel="Use the Revenue Calculator"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(21,128,61,0.2)] transition hover:bg-[#116832] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:whitespace-nowrap"
              >
                Use the Revenue Calculator
                <IconArrowRight className="h-4 w-4" stroke={2} aria-hidden />
              </CTALink>
              <CTALink
                href={auditHref}
                kind="book_meeting"
                location="homepage_calculator_secondary"
                analyticsEvent="audit_checkout_clicked"
                analyticsSource="homepage_calculator_section"
                packageId="workflow_audit"
                packageName="Workflow Audit"
                billingPeriod="one_time"
                ctaLabel="Buy the Workflow Audit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE0C5] bg-white px-6 py-3 text-sm font-semibold text-[#102033] shadow-[0_10px_22px_rgba(16,32,51,0.05)] transition hover:border-[#15803D]/40 hover:bg-[#F2FBF5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:whitespace-nowrap"
              >
                Buy the Workflow Audit
              </CTALink>
            </div>
          </div>

          <div className="min-w-0 rounded-[1.5rem] border border-[#DCE7DD] bg-white p-5 shadow-[0_22px_55px_rgba(16,32,51,0.08)] sm:p-6 lg:p-7">
            <h3 className="text-2xl font-bold leading-tight text-[#102033] sm:text-[1.75rem] lg:text-[1.9rem]">
              The calculator points to the right next move.
            </h3>
            <p className="mt-3 max-w-[38rem] text-sm leading-6 text-[#59687A] sm:text-base sm:leading-7">
              See which system should make money move first: Cashflow Control, Repeat Revenue, or Both Systems.
            </p>

            <div className="mt-6 grid gap-3">
              {diagnosticTargets.map(({ Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl border border-[#E1EAE2] bg-[#FAFCFA] p-4 shadow-[0_8px_18px_rgba(16,32,51,0.035)]">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E4F7EA] text-[#15803D] ring-1 ring-[#CBEED8]">
                    <Icon size={44} decorative />
                  </span>
                  <div className="min-w-0">
                    <div className="text-base font-bold leading-tight text-[#102033]">{title}</div>
                    <p className="mt-1 text-sm leading-6 text-[#59687A]">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#CBEED8] bg-[#EEF9F2] p-4 text-sm font-semibold leading-6 text-[#102033]">
              Use the calculator to pick the money path. Buy the Workflow Audit when you want Stanley Systems to map the leak with you before you buy a system.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
