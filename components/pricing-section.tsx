import type { ComponentType } from "react"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import {
  ApprovedHandoffDisplayAsset,
  BillingCheckDisplayAsset,
  CashApprovedDisplayAsset,
  CashStackDisplayAsset,
  CompletedJobDisplayAsset,
  DelayedInvoiceDisplayAsset,
  InactiveCustomersDisplayAsset,
  InvoiceSentDisplayAsset,
  MonthlyImpactTrendDisplayAsset,
  OfficeAlertDisplayAsset,
  PhoneMissedTransparentDisplayAsset,
  ReferralNetworkDisplayAsset,
  ResultCheckDisplayAsset,
  ReviewGrowthDisplayAsset,
  type DisplayAssetProps,
} from "@/components/visual-kit/display-assets"

type DisplayPrimitive = ComponentType<DisplayAssetProps>

const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
const cashflowPricingHref = "/systems/cashflow-control"
const repeatRevenuePricingHref = "/systems/repeat-revenue"

const cashflowResultCards: Array<{
  title: string
  detail: string
  Icon: DisplayPrimitive
}> = [
  {
    title: "Delayed invoices",
    detail: "Finished jobs move toward billing before they sit in the office.",
    Icon: DelayedInvoiceDisplayAsset,
  },
  {
    title: "Manual handoffs",
    detail: "The office sees what is missing before payroll hours get wasted.",
    Icon: ApprovedHandoffDisplayAsset,
  },
  {
    title: "Open balances",
    detail: "Unpaid invoices stay visible until follow-up happens.",
    Icon: CashStackDisplayAsset,
  },
]

const cashflowSteps: Array<{
  label: string
  body: string
  status: string
  Icon: DisplayPrimitive
  active?: boolean
}> = [
  { label: "Completed job", body: "Job is marked finished.", status: "Job done", Icon: CompletedJobDisplayAsset },
  { label: "Billing check", body: "Missing details trigger the next step.", status: "Fix ready", Icon: BillingCheckDisplayAsset, active: true },
  { label: "Invoice sent", body: "Invoice-ready work gets sent faster.", status: "Ready to send", Icon: InvoiceSentDisplayAsset },
  { label: "Final bill follow-up", body: "Open balances trigger the next owner-approved step.", status: "Still visible", Icon: OfficeAlertDisplayAsset },
  { label: "Cash collected", body: "Earned money stops sitting idle.", status: "Money moved", Icon: CashApprovedDisplayAsset },
]

const customerRevenueModules: Array<{
  title: string
  body: string
  detail: string
  Icon: DisplayPrimitive
}> = [
  {
    title: "Smart Re-Engagement",
    body: "Bring old customers back.",
    detail: "Past customers get a clear reason to book again.",
    Icon: InactiveCustomersDisplayAsset,
  },
  {
    title: "Review Booster",
    body: "Turn happy customers into steady review requests.",
    detail: "Strong reviews help the next customer trust you faster.",
    Icon: ReviewGrowthDisplayAsset,
  },
  {
    title: "Referral Engine",
    body: "Turn customer goodwill into referral opportunities.",
    detail: "Ask satisfied customers for referrals while the job is still fresh.",
    Icon: ReferralNetworkDisplayAsset,
  },
  {
    title: "After-Hours Intake Assistant",
    body: "Catch missed and after-hours inquiries before good jobs slip away.",
    detail: "Inquiries get logged and handed to the office while the main number stays unchanged.",
    Icon: PhoneMissedTransparentDisplayAsset,
  },
]

function SectionHeader({
  headline,
  subheadline,
}: {
  headline: string
  subheadline: string
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-[2.2rem] font-semibold leading-[1.04] text-[#071421] sm:text-[2.9rem] lg:text-[3.15rem]">
        {headline}
      </h2>
      <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-[#4d5a68] sm:text-lg">
        {subheadline}
      </p>
    </div>
  )
}

function SystemCTACluster({
  primary,
  primaryHref,
  location,
  packageId,
  packageName,
}: {
  primary: string
  primaryHref: string
  location: string
  packageId: string
  packageName: string
}) {
  return (
    <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
      <CTALink
        href={primaryHref}
        kind="systems"
        location={location}
        analyticsEvent="package_learn_more_clicked"
        analyticsSource="homepage_systems_section"
        packageId={packageId}
        packageName={packageName}
        ctaLabel={primary}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#24964c] bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(21,128,61,0.2)] transition hover:bg-[#116832] sm:px-8"
      >
        {primary}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </CTALink>
      <CTALink
        href={auditHref}
        kind="checkout"
        location={`${location}_audit`}
        analyticsEvent="audit_checkout_clicked"
        analyticsSource="homepage_systems_section"
        packageId="workflow_audit"
        packageName="Workflow Audit"
        billingPeriod="one_time"
        ctaLabel="Buy the Workflow Audit"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbd8c7] bg-white px-6 py-3 text-sm font-bold text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] transition hover:border-[#15803D] hover:bg-[#f7fcf7] sm:px-8"
      >
        Buy the Workflow Audit
      </CTALink>
    </div>
  )
}

function ResultIconWell({ Icon }: { Icon: DisplayPrimitive }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d9eedf] bg-[#f5fbf6] text-[#15803D]">
      <Icon size={44} decorative />
    </span>
  )
}

function SystemResultCard({ card }: { card: (typeof cashflowResultCards)[number] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e2dbcf] bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)] p-3 shadow-[0_14px_30px_rgba(16,32,51,0.055)]">
      <div className="flex items-start gap-3">
        <ResultIconWell Icon={card.Icon} />
        <div>
          <h3 className="text-base font-bold leading-5 text-[#102033]">{card.title}</h3>
          <p className="mt-1 text-sm leading-5 text-[#506070]">{card.detail}</p>
        </div>
      </div>
    </div>
  )
}

function CashflowPathCard() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[1.35rem] border border-[#d7e5dd] bg-[radial-gradient(circle_at_50%_0%,#effaf2_0%,#ffffff_46%,#f8fbfc_100%)] p-4 shadow-[0_28px_70px_rgba(16,32,51,0.10)] sm:p-5">
      <div className="flex min-w-0 flex-col gap-2 border-b border-[#dfe7ee] pb-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold leading-tight text-[#102033]">Cashflow Control System</h3>
          <p className="mt-1 max-w-2xl text-sm leading-5 text-[#5b6875]">
Stanley Systems builds the path from completed job to invoice, final bill follow-up, and collected cash inside the tools your team already uses.
          </p>
        </div>
        <div className="max-w-full rounded-2xl border border-[rgba(197,48,48,.22)] bg-[#fff5f5] px-3 py-1 text-xs font-bold leading-snug text-[#B42318] shadow-[0_10px_22px_rgba(21,128,61,0.08)] sm:rounded-full">
          <span className="sm:hidden">Fix path ready.</span>
          <span className="hidden sm:inline">Billing stall found. Fix path ready.</span>
        </div>
      </div>

      <div className="relative mt-4 grid min-w-0 gap-3 lg:grid-cols-5">
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-1/2 hidden h-2 -translate-y-1/2 rounded-full bg-[#e6f5ea] lg:block" aria-hidden="true" />
        {cashflowSteps.map((step, index) => {
          const Icon = step.Icon
          const isActive = "active" in step && step.active
          return (
            <div key={step.label} className="relative min-w-0">
              <div className={`relative flex min-h-[4.5rem] flex-col items-start gap-2 rounded-2xl border p-3 sm:flex-row sm:items-center sm:gap-3 lg:min-h-[5.65rem] lg:flex-col lg:items-start lg:justify-between ${isActive ? "border-[rgba(197,48,48,.25)] bg-[linear-gradient(180deg,#FFF1F1_0%,#ffffff_100%)] shadow-[0_18px_42px_rgba(197,48,48,0.12)] ring-1 ring-[rgba(197,48,48,.12)]" : "border-[#e8e1d6] bg-white/90 shadow-[0_10px_24px_rgba(16,32,51,0.045)]"}`}>
                <div className="flex w-full items-center justify-between gap-2 sm:w-auto lg:w-full">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl lg:h-12 lg:w-12 ${isActive ? "bg-white ring-1 ring-[rgba(197,48,48,.25)] shadow-[0_12px_22px_rgba(197,48,48,0.10)]" : "bg-[#f2f7f0] ring-1 ring-[#d9eedf]"}`}>
                    <Icon size={42} decorative />
                  </span>
                  <span className={`hidden rounded-full border px-2 py-1 text-[0.65rem] font-bold leading-none lg:inline-flex ${isActive ? "border-[rgba(197,48,48,.25)] bg-[#FFF1F1] text-[#C53030]" : step.label === "Cash collected" ? "border-[#cfe8d5] bg-[#f4fbf5] text-[#116832]" : "border-[#e8e1d6] bg-[#fbfaf7] text-[#5b6875]"}`}>
                    {step.status}
                  </span>
                </div>
                <div className="min-w-0 flex-1 self-stretch sm:self-auto lg:mt-2 lg:self-stretch">
                  <div className="text-sm font-bold leading-tight text-[#102033]">{step.label}</div>
                  <p className="mt-0.5 text-xs font-semibold leading-4 text-[#5b6875]">{step.body}</p>
                  {isActive ? (
                    <div className="mt-1.5 inline-flex max-w-full whitespace-normal rounded-2xl border border-[rgba(197,48,48,.22)] bg-[#fff5f5] px-2.5 py-1 text-[0.68rem] font-bold leading-tight text-[#B42318]">
                      <span className="sm:hidden">Next step sent.</span>
                      <span className="hidden sm:inline">Next step sent before the invoice stalls.</span>
                    </div>
                  ) : null}
                </div>
              </div>
              {index < cashflowSteps.length - 1 ? (
                <div className="pointer-events-none absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block" aria-hidden="true">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cfe8d5] bg-white text-[#15803D] shadow-[0_8px_18px_rgba(16,32,51,0.06)]">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.1} />
                  </span>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="mt-3 grid gap-3 rounded-2xl border border-[#bfe4c8] bg-[#eef9f2] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:grid-cols-[auto_1fr] sm:items-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-[#bfe4c8] shadow-[0_14px_28px_rgba(21,128,61,0.12)]">
          <ResultCheckDisplayAsset size={46} decorative />
        </span>
        <p className="text-sm font-extrabold leading-5 text-[#102033] sm:text-base">
          Result: Stanley Systems automates the invoice-to-final-bill path, the office sees the next step, and finished work turns into collected cash faster.
        </p>
      </div>
    </div>
  )
}

function CashflowControlSystemSection() {
  return (
    <div data-section="cashflow-control-system">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mx-auto max-w-6xl text-[2.05rem] font-semibold leading-[1.02] text-[#071421] sm:text-[2.65rem] lg:text-[2.9rem] xl:text-[3.1rem]">
          Turn finished work into collected cash <span className="inline-block text-[1.16em] italic tracking-[-0.05em] text-[#102033]">faster.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-4xl text-base font-semibold leading-7 text-[#4d5a68] sm:text-lg">
          Stanley Systems builds the billing path from completed job to invoice-ready check, final bill follow-up, and collected cash inside the tools your team already uses.
        </p>
      </div>
      <div className="mt-7">
        <CashflowPathCard />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cashflowResultCards.map((card) => (
          <SystemResultCard key={card.title} card={card} />
        ))}
      </div>
      <SystemCTACluster primary="View Cashflow Control" primaryHref={cashflowPricingHref} location="cashflow_control_system_section" packageId="cashflow_control_monthly" packageName="Cashflow Control System" />
    </div>
  )
}

function FollowUpImpactCard() {
  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-[#bfe4c8] bg-[linear-gradient(135deg,#ffffff_0%,#f2fbf4_58%,#e6f7eb_100%)] p-4 shadow-[0_24px_65px_rgba(16,32,51,0.1)] sm:p-5">
      <div className="absolute right-6 top-5 hidden h-20 w-52 rounded-full bg-white/55 blur-2xl sm:block" aria-hidden="true" />
      <div className="relative grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-[#bfe4c8] shadow-[0_18px_34px_rgba(21,128,61,0.14)]">
              <MonthlyImpactTrendDisplayAsset size={54} decorative />
            </span>
            <p className="text-lg font-extrabold leading-tight text-[#102033] sm:text-xl">Repeat customers cost about 1/5 what new customers cost to win.</p>
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#526273] sm:text-base">
            Before buying more leads, Stanley Systems checks the customer records the business already paid to earn.
          </p>
        </div>
        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          <div className="flex min-h-[9.25rem] min-w-0 flex-col justify-between rounded-2xl border border-[#cfe8d5] bg-white px-4 py-4 shadow-[0_12px_26px_rgba(16,32,51,0.055)] sm:px-5 sm:py-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#607080]">Common in established shops</p>
            <p className="mt-3 whitespace-nowrap text-[2.15rem] font-black leading-none tracking-[-0.04em] text-[#15803D] sm:text-[2.45rem] lg:text-[2.35rem] xl:text-[2.55rem]">500-3,000</p>
            <p className="mt-3 text-sm font-extrabold leading-5 text-[#102033]">saved customer records worth checking</p>
          </div>
          <div className="flex min-h-[9.25rem] min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-[#cfe8d5] bg-white px-4 py-4 shadow-[0_12px_26px_rgba(16,32,51,0.055)] sm:px-5 sm:py-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#607080]">Customer list opportunity</p>
            <p className="mt-3 -ml-1 max-w-full whitespace-nowrap text-[1.55rem] font-black leading-[0.95] tracking-[-0.07em] text-[#15803D] min-[380px]:text-[1.7rem] sm:text-[1.85rem] lg:text-[1.72rem] xl:text-[1.9rem]">$50K-$300K</p>
            <p className="mt-3 text-sm font-extrabold leading-5 text-[#102033]">re-engageable revenue worth checking</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function FollowUpModuleCard({
  module,
  index,
}: {
  module: (typeof customerRevenueModules)[number]
  index: number
}) {
  const Icon = module.Icon

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-[#dfe9dc] bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)] p-3.5 shadow-[0_14px_34px_rgba(16,32,51,0.055)] sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-xs font-black text-white shadow-[0_10px_22px_rgba(21,128,61,0.18)]">
          {index + 1}
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f2f8f0] ring-1 ring-[#d9eedf]">
          <Icon size={46} decorative />
        </span>
      </div>
      <div className="mt-3 min-w-0">
        <h3 className="text-base font-extrabold leading-5 text-[#102033]">{module.title}</h3>
        <p className="mt-1.5 text-sm font-bold leading-5 text-[#116832]">{module.body}</p>
        <p className="mt-1 text-sm leading-5 text-[#526273]">{module.detail}</p>
      </div>
    </div>
  )
}

function FollowUpModuleGrid() {
  return (
    <div className="relative">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {customerRevenueModules.map((module, index) => (
          <div key={module.title} className="relative">
            <FollowUpModuleCard module={module} index={index} />
            {index < customerRevenueModules.length - 1 ? (
              <>
                <div className="flex justify-center py-0.5 lg:hidden" aria-hidden="true">
                  <ArrowRight className="h-4 w-4 rotate-90 text-[#15803D]" strokeWidth={2.1} />
                </div>
                <div className="pointer-events-none absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block" aria-hidden="true">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cfe8d5] bg-white text-[#15803D] shadow-[0_8px_18px_rgba(16,32,51,0.06)]">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.1} />
                  </span>
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function FollowUpCTACluster() {
  return (
    <SystemCTACluster
      primary="View Repeat Revenue"
      primaryHref={repeatRevenuePricingHref}
      location="repeat_revenue_system_section"
      packageId="repeat_revenue_monthly"
      packageName="Repeat Revenue System"
    />
  )
}

function RepeatRevenueSystemSection() {
  return (
    <div id="repeat-revenue-system" data-section="repeat-revenue-system" className="scroll-mt-40">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mx-auto max-w-5xl text-[2.2rem] font-semibold leading-[1.04] text-[#071421] sm:text-[2.9rem] lg:text-[3.15rem]">
          Get more money from the customers you already earned.
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-[#4d5a68] sm:text-lg">
Old customers are not cold leads. Stanley Systems builds a repeat revenue system for your business, tailored to the way your office books jobs, asks for reviews, captures referrals, and handles missed calls.
        </p>
      </div>

      <div className="mx-auto mt-5 max-w-6xl">
        <FollowUpImpactCard />
      </div>

      <div className="mx-auto mt-4 max-w-7xl">
        <p className="mb-3 text-center text-sm font-bold leading-5 text-[#116832]">Repeat Revenue System</p>
        <FollowUpModuleGrid />
        <p className="mx-auto mt-3 max-w-3xl rounded-2xl border border-[#cfe8d5] bg-[#effaf2] px-4 py-3 text-center text-sm font-bold leading-5 text-[#102033]">
          Your saved customer list is a revenue asset. Stanley Systems builds the follow-up path around the way your business runs, then turns it into repeat jobs, review requests, referrals, and captured calls.
        </p>
      </div>

      <FollowUpCTACluster />
      <p className="mx-auto mt-3 flex max-w-5xl items-center justify-center gap-2 text-center text-sm font-semibold leading-6 text-[#607080]">
        <ResultCheckDisplayAsset size={26} decorative />
        <span>The Workflow Audit decides scope before any build path is recommended.</span>
      </p>
    </div>
  )
}

export function PricingSection() {
  return (
    <section
      id="systems"
      data-audit-page="/"
      data-audit-section="home.systems"
      data-audit-priority="5"
      data-audit-offer="Cashflow Control System, Repeat Revenue System"
      data-audit-purpose="Explain the two approved Stanley Systems implementation systems without inventing offers."
      className="relative z-10 scroll-mt-28 px-4 py-14 sm:scroll-mt-32 sm:py-16 lg:scroll-mt-36 lg:py-[4.5rem]"
    >
      <div className="mx-auto max-w-7xl">
        <CashflowControlSystemSection />
        <div className="mt-16 border-t border-[#e5ded3] pt-14 sm:mt-[4.5rem] sm:pt-16 lg:mt-20">
          <RepeatRevenueSystemSection />
        </div>
      </div>
    </section>
  )
}
