"use client"

import {
  IconArrowRight,
} from "@tabler/icons-react"
import type { ComponentType } from "react"
import { CTALink } from "@/components/cta-link"
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

type SummaryIcon = ComponentType<DisplayAssetProps>

const diagnosticTargets: Array<{
  Icon: SummaryIcon
  title: string
  body: string
}> = [
  {
    Icon: BillingCheckDisplayAsset,
    title: "AI Office Installation Sprint",
    body: "Install workflows that move billing, follow-up, records, and staff handoffs faster.",
  },
  {
    Icon: RepeatCustomerLoopDisplayAsset,
    title: "AI Office Ops",
    body: "Keep installed workflows monitored, fixed, improved, and useful to staff.",
  },
  {
    Icon: MoneyLeakRoutingDisplayAsset,
    title: "AI Office Installation Sprint + Ops",
    body: "Install workflows, then keep improving them month by month.",
  },
]

const signalCards: Array<{
  Icon: SummaryIcon
  label: string
  cost: string
  fix: string
}> = [
  {
    Icon: CashApprovedDisplayAsset,
    label: "Finished work waits before billing",
    cost: "Earned revenue waits on admin drag.",
    fix: "AI office workflows move the job toward billing readiness, follow-up, and visibility.",
  },
  {
    Icon: PhoneMissedTransparentDisplayAsset,
    label: "Missed calls turn cold",
    cost: "Paid demand becomes forgotten callbacks.",
    fix: "AI office workflows route missed volume back into follow-up.",
  },
  {
    Icon: InactiveCustomersDisplayAsset,
    label: "Past customers go untouched",
    cost: "Past customer value may be sitting in records nobody works.",
    fix: "AI Office Ops keeps follow-up, reviews, referrals, and seasonal work moving.",
  },
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
      data-audit-offer="AI Profit Map"
      data-audit-purpose="Move visitors from the calculator diagnostic into the right paid next step."
      className="relative z-10 scroll-mt-28 overflow-hidden bg-[#F7FAF7] px-5 py-12 sm:scroll-mt-32 sm:px-6 sm:py-14 lg:scroll-mt-36 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-[78rem]">
        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,0.47fr)_minmax(0,0.53fr)] lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <h2 className="max-w-[40rem] text-[2.1rem] font-semibold leading-[1.03] text-[#102033] sm:text-[2.55rem] lg:text-[2.85rem] xl:text-[3.05rem]">
              The hidden problem is not lead volume. It is office work already stuck.
            </h2>

            <p className="mt-5 max-w-[35rem] text-base leading-7 text-[#47566C] sm:text-lg sm:leading-8">
              Admin drag hides in copying, chasing, retyping, reconciling, and follow-up. The calculator shows where the same office team can process more work before another admin hire.
            </p>

            <div className="mt-6 grid max-w-[42rem] gap-3">
              {signalCards.map(({ Icon, label, cost, fix }) => (
                <div key={label} className="grid gap-3 rounded-2xl border border-[#DCE7DD] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(16,32,51,0.04)] sm:grid-cols-[auto_1fr]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4F7EA] text-[#15803D] ring-1 ring-[#CBEED8]">
                    <Icon size={34} decorative />
                  </span>
                  <span className="min-w-0 text-sm leading-5 text-[#102033]">
                    <span className="block font-extrabold">{label}</span>
                    <span className="mt-1 block font-semibold text-[#B42318]">{cost}</span>
                    <span className="mt-1 block text-[#536174]">{fix}</span>
                  </span>
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
                ctaLabel="Calculate Your Admin Drag"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(21,128,61,0.2)] transition hover:bg-[#116832] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:whitespace-nowrap"
              >
                Calculate Your Admin Drag
                <IconArrowRight className="h-4 w-4" stroke={2} aria-hidden />
              </CTALink>
              <CTALink
                href="#audit"
                kind="systems"
                location="homepage_calculator_secondary"
                analyticsEvent="package_compare_clicked"
                analyticsSource="homepage_calculator_section"
                ctaLabel="See how the AI Profit Map works"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE0C5] bg-white px-6 py-3 text-sm font-semibold text-[#102033] shadow-[0_10px_22px_rgba(16,32,51,0.05)] transition hover:border-[#15803D]/40 hover:bg-[#F2FBF5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:whitespace-nowrap"
              >
                See how the AI Profit Map works
              </CTALink>
            </div>
          </div>

          <div className="min-w-0 rounded-[1.5rem] border border-[#DCE7DD] bg-white p-5 shadow-[0_22px_55px_rgba(16,32,51,0.08)] sm:p-6 lg:p-7">
            <h3 className="text-2xl font-bold leading-tight text-[#102033] sm:text-[1.75rem] lg:text-[1.9rem]">
              Diagnose admin drag, then choose the right first workflow.
            </h3>
            <p className="mt-3 max-w-[38rem] text-sm leading-6 text-[#59687A] sm:text-base sm:leading-7">
              See which office workflow should move first: billing readiness, follow-up, staff SOP support, or monthly AI Office Ops.
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
              Use the calculator to find the drag. The AI Profit Map turns the range into a practical action map before you buy a Sprint.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
