import { CTALink } from "@/components/cta-link"
import Image from "next/image"
import type { ReactNode } from "react"
import {
  ArrowRight,
  Banknote,
  CalendarClock,
  CheckCircle2,
  Clock3,
  FilePenLine,
  MessageSquareText,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  Star,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react"

const cashflowResultCards = [
  {
    eyebrow: "01",
    title: "Delayed invoices delay cash",
    detail: "Finished work waits when billing details are not ready.",
    icon: Clock3,
  },
  {
    eyebrow: "02",
    title: "Manual handoffs burn payroll",
    detail: "Office time gets spent chasing what should already be clear.",
    icon: UserRound,
  },
  {
    eyebrow: "03",
    title: "Open balances need follow-up",
    detail: "A/R stays visible before stale invoices become normal.",
    icon: Banknote,
  },
  {
    eyebrow: "04",
    title: "Quoted work needs a next step",
    detail: "Open estimates get a clean path back to booked work.",
    icon: FilePenLine,
  },
] as const

const revenueLoopSteps = [
  {
    label: "Bring past customers back",
    detail: "Past customers get a clear reason to book again.",
    icon: RefreshCw,
  },
  {
    label: "Get fresh reviews",
    detail: "Happy jobs turn into new public trust.",
    icon: Star,
  },
  {
    label: "Create referrals",
    detail: "Trust becomes an easier next introduction.",
    icon: UsersRound,
  },
  {
    label: "Recover missed calls",
    detail: "Missed calls get a path back to booked work.",
    icon: PhoneCall,
  },
] as const

const revenueOutcomeItems = ["Repeat work", "Fresh reviews", "Referrals", "Recovered missed calls"] as const

const cashflowVisualAsset =
  "/images/generated/design-loop/homepage-anti-slop-current-diffs-20260430T130608Z/cashflow-pipeline-approved.png"

function SectionHeader({
  eyebrow,
  headline,
  subheadline,
}: {
  eyebrow: string
  headline: string
  subheadline: string
}) {
  return (
    <div className="mx-auto max-w-5xl text-center">
      <div className="text-sm font-bold tracking-[0.12em] text-[#15803D]">{eyebrow}</div>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#071421] sm:text-5xl lg:text-[3.45rem] lg:leading-[1.02]">
        {headline}
      </h2>
      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#4d5a68] sm:text-xl">
        {subheadline}
      </p>
    </div>
  )
}

function SupportStrip({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#cfe6d1] bg-[#f4fbf5] px-4 py-4 text-left text-base font-semibold leading-7 text-[#102033] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:items-center sm:justify-center sm:px-5 sm:text-center">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-white shadow-[0_10px_22px_rgba(21,128,61,0.2)]">
        <ShieldCheck className="h-5 w-5" />
      </span>
      <span>{children}</span>
    </div>
  )
}

function SystemCTACluster({
  primary,
  location,
}: {
  primary: string
  location: string
}) {
  return (
    <div className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
      <CTALink
        href="/contact"
        kind="book_meeting"
        location={location}
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#24964c] bg-[linear-gradient(180deg,#1ba24c_0%,#15803D_100%)] px-8 py-4 text-base font-bold text-white shadow-[0_18px_38px_rgba(21,128,61,0.22),inset_0_1px_0_rgba(255,255,255,0.25)] transition hover:bg-[#116832] sm:px-10"
      >
        {primary}
        <ArrowRight className="ml-2 h-4 w-4" />
      </CTALink>
      <CTALink
        href="/contact"
        kind="book_meeting"
        location={location}
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#cbd8c7] bg-white px-8 py-4 text-base font-bold text-[#116832] shadow-[0_12px_28px_rgba(16,32,51,0.06)] transition hover:border-[#15803D] hover:bg-[#f7fcf7]"
      >
        Book the Workflow Audit
        <ArrowRight className="ml-2 h-4 w-4" />
      </CTALink>
    </div>
  )
}

function TrustLine({ children }: { children: ReactNode }) {
  return (
    <p className="mx-auto mt-5 flex max-w-5xl items-start justify-center gap-2 text-center text-sm leading-6 text-[#506070]">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" />
      <span>{children}</span>
    </p>
  )
}

function CashflowPipelineVisual() {
  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-[#e0d8cc] bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)] p-2.5 shadow-[0_22px_60px_rgba(16,32,51,0.1)] ring-1 ring-white/80 sm:rounded-[2rem] sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute -left-16 top-20 h-44 w-44 rounded-full bg-[#e9f8ed] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-8 h-64 w-64 rounded-full bg-[#edf8ef] blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.1rem] border border-[#e8e1d6] bg-white/88 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:rounded-[1.55rem] sm:p-6 lg:p-7">
        <div className="relative min-h-[240px] overflow-hidden rounded-[0.95rem] bg-[#f7fbf7] sm:min-h-[390px] sm:rounded-[1.25rem] lg:min-h-[520px]">
          <Image
            src={cashflowVisualAsset}
            alt="Cashflow Control System pipeline showing finished work moving toward collected cash."
            fill
            sizes="(min-width: 1024px) 1120px, 100vw"
            className="object-contain"
            priority={false}
          />
        </div>
        <div className="mt-3 sm:mt-5">
          <SupportStrip>
            Each step closes a gap between finished work and collected cash.
          </SupportStrip>
        </div>
      </div>
    </div>
  )
}

function ResultIconWell({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#d9eedf] bg-[#f5fbf6] text-[#15803D]">
      <Icon className="h-5 w-5" strokeWidth={1.9} />
    </span>
  )
}

function SystemResultCard({ card }: { card: (typeof cashflowResultCards)[number] }) {
  return (
    <div className="min-h-[150px] rounded-3xl border border-[#e2dbcf] bg-white p-5 shadow-[0_14px_34px_rgba(16,32,51,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="text-xs font-bold tracking-[0.16em] text-[#15803D]">{card.eyebrow}</div>
        <ResultIconWell icon={card.icon} />
      </div>
      <h3 className="mt-4 text-base font-bold leading-6 text-[#102033]">{card.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#506070]">{card.detail}</p>
    </div>
  )
}

function CashflowControlSystemSection() {
  return (
    <div>
      <SectionHeader
        eyebrow="Cashflow Control System"
        headline="Turn finished work into collected cash faster."
        subheadline="Completed jobs should not sit in the office waiting on billing details, invoice cleanup, or follow-up."
      />
      <div className="mt-8 sm:mt-10">
        <CashflowPipelineVisual />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cashflowResultCards.map((card) => (
          <SystemResultCard key={card.title} card={card} />
        ))}
      </div>
      <SystemCTACluster primary="See where cash gets stuck" location="cashflow_system_section" />
      <TrustLine>
        Built for service businesses using tools like QuickBooks, Housecall Pro, Jobber, ServiceTitan, Wallace, and similar systems.
      </TrustLine>
    </div>
  )
}

function RevenueMomentBadge({ step, className }: { step: (typeof revenueLoopSteps)[number]; className: string }) {
  const Icon = step.icon

  return (
    <div className={`absolute w-[205px] rounded-[1.15rem] border border-[#dce9dc] bg-white/95 p-3 shadow-[0_18px_42px_rgba(16,32,51,0.08)] ${className}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] border border-[#d6ecdc] bg-[#f3fbf5] text-[#15803D]">
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </span>
        <div>
          <p className="text-sm font-bold leading-5 text-[#102033]">{step.label}</p>
          <p className="mt-0.5 text-xs leading-5 text-[#5b6875]">{step.detail}</p>
        </div>
      </div>
    </div>
  )
}

function CustomerRevenueDesktopLoop() {
  const [bringBack, reviews, referrals, missedCalls] = revenueLoopSteps

  return (
    <div className="relative hidden min-h-[560px] overflow-hidden rounded-[1.25rem] border border-[#e5ded3] bg-[#f7fbf7] p-6 lg:block">
      <div className="pointer-events-none absolute left-16 top-12 h-40 w-40 rounded-full bg-white/80 blur-2xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-48 w-48 rounded-full bg-[#dff5e5] blur-3xl" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 650 560"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <marker id="revenue-loop-arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
            <path d="M0 0L8 4L0 8Z" fill="#15803D" />
          </marker>
          <linearGradient id="revenue-flow-green" x1="90" x2="592" y1="280" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#15803D" stopOpacity="0.08" />
            <stop offset="0.54" stopColor="#15803D" stopOpacity="0.28" />
            <stop offset="1" stopColor="#15803D" stopOpacity="0.68" />
          </linearGradient>
        </defs>
        <path
          d="M140 282 C180 126 332 76 446 150 C545 215 545 356 444 414 C325 482 184 424 140 282Z"
          stroke="#15803D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 13"
          markerEnd="url(#revenue-loop-arrow)"
          opacity="0.52"
        />
        <path
          d="M84 280 C188 208 302 209 388 252 C456 286 510 289 592 250 L592 310 C512 272 456 276 388 309 C302 351 188 353 84 280Z"
          fill="url(#revenue-flow-green)"
          opacity="0.9"
        />
        <path
          d="M98 280 C210 245 310 247 405 279 C468 300 523 300 590 280"
          stroke="#15803D"
          strokeWidth="4"
          strokeLinecap="round"
          markerEnd="url(#revenue-loop-arrow)"
          opacity="0.58"
        />
      </svg>
      <div className="absolute left-6 top-1/2 flex w-[178px] -translate-y-1/2 flex-col rounded-[1.15rem] border border-[#dce9dc] bg-white p-4 shadow-[0_18px_42px_rgba(16,32,51,0.08)]">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#15803D] text-white shadow-[0_12px_24px_rgba(21,128,61,0.2)]">
          <MessageSquareText className="h-5 w-5" strokeWidth={1.9} />
        </span>
        <p className="mt-4 text-base font-bold leading-6 text-[#071421]">Customer moments already earned</p>
        <p className="mt-2 text-xs leading-5 text-[#5b6875]">Old customers, happy jobs, and inbound calls become fuel for the next booking.</p>
      </div>
      <div className="absolute left-[230px] top-1/2 flex h-60 w-60 -translate-y-1/2 items-center justify-center rounded-full border border-[#c7e7cf] bg-white/95 p-6 text-center shadow-[0_24px_60px_rgba(21,128,61,0.13)]">
        <div className="absolute inset-3 rounded-full border border-dashed border-[#b9dfc4]" aria-hidden="true" />
        <div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#15803D] text-white shadow-[0_12px_24px_rgba(21,128,61,0.2)]">
            <RefreshCw className="h-6 w-6" strokeWidth={1.9} />
          </div>
          <p className="mt-4 text-2xl font-semibold leading-7 tracking-tight text-[#071421]">Repeat revenue loop</p>
          <p className="mt-2 text-sm leading-6 text-[#5b6875]">Follow-up keeps the next job moving.</p>
        </div>
      </div>
      <RevenueMomentBadge step={bringBack} className="left-[205px] top-7" />
      <RevenueMomentBadge step={reviews} className="right-[230px] top-12" />
      <RevenueMomentBadge step={referrals} className="right-[230px] bottom-16" />
      <RevenueMomentBadge step={missedCalls} className="left-[206px] bottom-9" />
      <div className="absolute right-7 top-1/2 w-[202px] -translate-y-1/2 rounded-[1.25rem] border border-[#bfe6c9] bg-white p-5 text-left shadow-[0_24px_60px_rgba(16,32,51,0.1)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe6d1] bg-[#f4fbf5] px-3 py-2 text-xs font-bold tracking-[0.12em] text-[#15803D]">
          <CalendarClock className="h-4 w-4" strokeWidth={1.9} />
          OUTCOME
        </div>
        <h3 className="mt-5 text-4xl font-semibold leading-none tracking-tight text-[#071421]">
          More booked work
        </h3>
        <p className="mt-4 text-sm leading-6 text-[#506070]">
          The system turns already-earned trust into repeat revenue.
        </p>
      </div>
    </div>
  )
}

function CustomerRevenueMobilePath() {
  return (
    <div className="relative overflow-hidden rounded-[1.05rem] border border-[#e5ded3] bg-[#f7fbf7] p-4 lg:hidden">
      <div className="pointer-events-none absolute inset-x-8 top-24 h-[410px] rounded-full bg-[#e7f7eb] blur-3xl" />
      <div className="relative rounded-[1rem] border border-[#dce9dc] bg-white p-4 shadow-[0_14px_34px_rgba(16,32,51,0.06)]">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#15803D] text-white shadow-[0_12px_24px_rgba(21,128,61,0.2)]">
            <MessageSquareText className="h-6 w-6" strokeWidth={1.9} />
          </span>
          <div>
            <p className="text-base font-bold leading-6 text-[#071421]">Customer moments already earned</p>
            <p className="mt-1 text-sm leading-6 text-[#5b6875]">Old customers, reviews, referrals, and calls should feed the next job.</p>
          </div>
        </div>
      </div>
      <div className="relative my-4 flex justify-center" aria-hidden="true">
        <div className="h-12 w-px bg-[#bfe6c9]" />
        <ArrowRight className="absolute top-7 h-5 w-5 rotate-90 text-[#15803D]" />
      </div>
      <div className="relative grid grid-cols-2 gap-3">
        {revenueLoopSteps.map((step, index) => {
          const Icon = step.icon

          return (
            <div
              key={step.label}
              className={`rounded-[1rem] border bg-white p-3 shadow-[0_12px_28px_rgba(16,32,51,0.05)] ${
                index === 0 || index === 3 ? "border-[#cfe6d1]" : "border-[#e2dbcf]"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-[0.85rem] border border-[#d6ecdc] bg-[#f3fbf5] text-[#15803D]">
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <p className="mt-3 text-sm font-bold leading-5 text-[#102033]">{step.label}</p>
            </div>
          )
        })}
      </div>
      <div className="relative my-4 flex justify-center" aria-hidden="true">
        <div className="h-12 w-px bg-[#bfe6c9]" />
        <ArrowRight className="absolute top-7 h-5 w-5 rotate-90 text-[#15803D]" />
      </div>
      <div className="relative rounded-[1.15rem] border border-[#bfe6c9] bg-white p-5 text-center shadow-[0_18px_42px_rgba(16,32,51,0.08)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#15803D] text-white shadow-[0_12px_24px_rgba(21,128,61,0.2)]">
          <CalendarClock className="h-6 w-6" strokeWidth={1.9} />
        </div>
        <h3 className="mt-4 text-3xl font-semibold leading-none tracking-tight text-[#071421]">More booked work</h3>
        <p className="mt-3 text-sm leading-6 text-[#506070]">The next job has more ways to arrive.</p>
      </div>
    </div>
  )
}

function CustomerRevenueProcessVisual() {
  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-[#e0d8cc] bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)] p-2.5 shadow-[0_22px_60px_rgba(16,32,51,0.1)] ring-1 ring-white/80 sm:rounded-[2rem] sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#e9f8ed] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 h-64 w-64 rounded-full bg-[#edf8ef] blur-3xl" />
      <div className="relative z-10 overflow-hidden rounded-[1.1rem] border border-[#e8e1d6] bg-white/88 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:rounded-[1.55rem] sm:p-5 lg:p-7">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-stretch">
          <div>
            <CustomerRevenueDesktopLoop />
            <CustomerRevenueMobilePath />
          </div>
          <div className="flex flex-col justify-between rounded-[1.25rem] border border-[#dce9dc] bg-[#f6fcf7] p-5 lg:p-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe6d1] bg-white px-3 py-2 text-xs font-bold tracking-[0.12em] text-[#15803D]">
                <RefreshCw className="h-4 w-4" strokeWidth={1.9} />
                SYSTEM
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-tight text-[#071421] sm:text-4xl lg:text-[2.35rem] lg:leading-[1]">
                Every customer moment points back to revenue.
              </h3>
              <p className="mt-4 text-base leading-7 text-[#506070]">
                Bring past customers back, ask at the right time, make referrals easier, and follow up on missed calls while the job is still winnable.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {revenueOutcomeItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#102033] shadow-[0_10px_24px_rgba(16,32,51,0.05)]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#15803D]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CustomerRevenueCTACluster() {
  return (
    <div className="mt-6 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
      <CTALink
        href="/contact"
        kind="book_meeting"
        location="customer_revenue_system_section"
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#24964c] bg-[linear-gradient(180deg,#1ba24c_0%,#15803D_100%)] px-8 py-4 text-base font-bold text-white shadow-[0_18px_38px_rgba(21,128,61,0.22),inset_0_1px_0_rgba(255,255,255,0.25)] transition hover:bg-[#116832] sm:px-10"
      >
        Book the Workflow Audit
        <ArrowRight className="ml-2 h-4 w-4" />
      </CTALink>
      <CTALink
        href="/#systems"
        kind="systems"
        location="customer_revenue_system_section"
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#cbd8c7] bg-white px-8 py-4 text-base font-bold text-[#116832] shadow-[0_12px_28px_rgba(16,32,51,0.06)] transition hover:border-[#15803D] hover:bg-[#f7fcf7]"
      >
        Review customer revenue paths
        <ArrowRight className="ml-2 h-4 w-4" />
      </CTALink>
    </div>
  )
}

function CustomerRevenueAuditBridge() {
  return (
    <p className="mx-auto mt-7 max-w-3xl text-center text-base font-semibold leading-7 text-[#102033] sm:text-lg">
      The Workflow Audit shows which customer revenue path is costing you money first: old customers, reviews, referrals, or missed calls.
    </p>
  )
}

function CustomerRevenueSystemSection() {
  return (
    <div>
      <SectionHeader
        eyebrow="Customer Revenue System"
        headline="Get more money from the customers you already earned."
        subheadline="Stanley Systems helps service businesses bring past customers back, collect more reviews, create referral opportunities, and recover missed calls before they become missed work."
      />
      <div className="mt-8 sm:mt-10">
        <CustomerRevenueProcessVisual />
      </div>
      <CustomerRevenueAuditBridge />
      <CustomerRevenueCTACluster />
      <TrustLine>
        Built for service businesses that want more repeat work, more reviews, more referrals, and fewer missed opportunities.
      </TrustLine>
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
      data-audit-offer="Cashflow Control System, Customer Revenue System"
      data-audit-purpose="Explain the two approved Stanley Systems implementation systems without inventing offers."
      className="relative z-10 scroll-mt-28 px-4 py-16 sm:scroll-mt-32 sm:py-20 lg:scroll-mt-36 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <CashflowControlSystemSection />
        <div className="mt-20 border-t border-[#e5ded3] pt-16 sm:mt-24 sm:pt-20 lg:mt-28 lg:pt-24">
          <CustomerRevenueSystemSection />
        </div>
      </div>
    </section>
  )
}
