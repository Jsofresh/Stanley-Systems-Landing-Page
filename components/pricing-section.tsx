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
  TrendingUp,
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
    label: "Bring Customers Back",
    detail: "Past customers get a timely reason to book again.",
    icon: RefreshCw,
  },
  {
    label: "Get Fresh Reviews",
    detail: "Happy jobs turn into public trust for the next buyer.",
    icon: Star,
  },
  {
    label: "Create Referrals",
    detail: "Good work becomes an easier next introduction.",
    icon: UsersRound,
  },
  {
    label: "Recover Missed Calls",
    detail: "Every missed call gets a clean follow-up.",
    icon: PhoneCall,
  },
] as const

const revenueOutcomeItems = [
  {
    title: "Repeat jobs",
    detail: "Old customers hear from you before they drift.",
    icon: RefreshCw,
  },
  {
    title: "Fresh reviews",
    detail: "Good jobs become visible trust.",
    icon: Star,
  },
  {
    title: "More referrals",
    detail: "Happy customers get an easy next step.",
    icon: UsersRound,
  },
  {
    title: "Captured calls",
    detail: "Missed inbound work gets followed up.",
    icon: PhoneCall,
  },
] as const

const revenueBusinessSignals = [
  "Old customers feed repeat jobs",
  "Happy customers feed reviews",
  "Reviews and referrals feed the next buyer",
  "Missed calls feed recovered work",
] as const

const desktopNodePositions = [
  "left-[5%] top-[9%]",
  "right-[5%] top-[9%]",
  "right-[5%] bottom-[9%]",
  "left-[5%] bottom-[9%]",
] as const

const mobileNodePositions = [
  "left-0 top-0",
  "right-0 top-0",
  "right-0 bottom-0",
  "left-0 bottom-0",
] as const

const loopArrowPaths = [
  "M225 96 C306 56 414 56 495 96",
  "M565 165 C607 240 607 334 565 409",
  "M495 478 C414 518 306 518 225 478",
  "M155 409 C113 334 113 240 155 165",
] as const

const loopArrowMobilePaths = [
  "M122 76 C164 54 216 54 258 76",
  "M303 122 C324 164 324 216 303 258",
  "M258 303 C216 326 164 326 122 303",
  "M76 258 C54 216 54 164 76 122",
] as const

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

function RevenueNode({
  step,
  index,
  mobile = false,
}: {
  step: (typeof revenueLoopSteps)[number]
  index: number
  mobile?: boolean
}) {
  const Icon = step.icon

  return (
    <div
      className={`absolute ${mobile ? mobileNodePositions[index] : desktopNodePositions[index]} z-20 flex w-[42%] flex-col items-center rounded-[1.2rem] border border-[#dcefe2] bg-white px-3 py-3 text-center shadow-[0_14px_34px_rgba(16,32,51,0.07)] sm:px-4 sm:py-4 lg:w-[190px]`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#cfe8d5] bg-[#f5fbf6] text-[#15803D] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:h-14 sm:w-14">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.9} />
      </div>
      <p className="mt-2 text-[0.68rem] font-bold tracking-[0.14em] text-[#15803D]">0{index + 1}</p>
      <p className="mt-1 text-sm font-bold leading-5 text-[#102033] sm:text-[0.95rem]">{step.label}</p>
      <p className="mt-1 hidden text-xs leading-5 text-[#5b6875] sm:block">{step.detail}</p>
    </div>
  )
}

function CustomerRevenueHub({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6e9dc] bg-white text-center shadow-[0_20px_50px_rgba(16,32,51,0.1),inset_0_1px_0_rgba(255,255,255,0.95)] ${mobile ? "h-[154px] w-[154px]" : "h-[210px] w-[210px]"}`}
    >
      <div className="px-4">
        <TrendingUp className="mx-auto h-8 w-8 text-[#15803D] sm:h-9 sm:w-9" strokeWidth={1.9} />
        <p className="mt-3 text-xl font-bold leading-[1.02] tracking-tight text-[#071421] sm:text-2xl">
          Customer Revenue System
        </p>
        <p className="mt-2 text-xs font-semibold leading-5 text-[#5b6875]">
          Customer moments feed the next job.
        </p>
      </div>
    </div>
  )
}

function RevenueLoopArrows({ mobile = false }: { mobile?: boolean }) {
  const paths = mobile ? loopArrowMobilePaths : loopArrowPaths
  const viewBox = mobile ? "0 0 380 380" : "0 0 720 575"

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <marker id={mobile ? "revenue-loop-arrow-mobile" : "revenue-loop-arrow"} markerHeight="10" markerWidth="10" orient="auto" refX="9" refY="5">
          <path d="M0 0L10 5L0 10Z" fill="#15803D" />
        </marker>
      </defs>
      {paths.map((path, index) => (
        <path
          key={path}
          d={path}
          stroke={index % 2 === 0 ? "#15803D" : "#41a65f"}
          strokeWidth={mobile ? 3.5 : 4}
          strokeLinecap="round"
          markerEnd={`url(#${mobile ? "revenue-loop-arrow-mobile" : "revenue-loop-arrow"})`}
        />
      ))}
    </svg>
  )
}

function CustomerRevenueDesktopLoop() {
  return (
    <div className="relative hidden min-h-[575px] lg:block">
      <RevenueLoopArrows />
      <CustomerRevenueHub />
      {revenueLoopSteps.map((step, index) => (
        <RevenueNode key={step.label} step={step} index={index} />
      ))}
    </div>
  )
}

function CustomerRevenueMobileLoop() {
  return (
    <div className="relative min-h-[420px] sm:min-h-[470px] lg:hidden">
      <RevenueLoopArrows mobile />
      <CustomerRevenueHub mobile />
      {revenueLoopSteps.map((step, index) => (
        <RevenueNode key={step.label} step={step} index={index} mobile />
      ))}
    </div>
  )
}

function CustomerRevenueOutcomePanel() {
  return (
    <aside className="rounded-[1.35rem] border border-[#dcefe2] bg-white p-5 shadow-[0_18px_48px_rgba(16,32,51,0.07)] lg:p-6">
      <p className="text-xs font-bold tracking-[0.16em] text-[#15803D]">OUTCOMES</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <div className="rounded-[1.15rem] bg-[#15803D] p-4 text-white shadow-[0_16px_36px_rgba(21,128,61,0.18)]">
          <CalendarClock className="h-6 w-6" strokeWidth={1.9} />
          <p className="mt-3 text-2xl font-semibold leading-none tracking-tight">More booked work</p>
        </div>
        <div className="rounded-[1.15rem] border border-[#cfe8d5] bg-[#f5fbf6] p-4">
          <TrendingUp className="h-6 w-6 text-[#15803D]" strokeWidth={1.9} />
          <p className="mt-3 text-2xl font-semibold leading-none tracking-tight text-[#071421]">Steady repeat revenue</p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {revenueOutcomeItems.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.title} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ecf8ef] text-[#15803D]">
                <Icon className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span>
                <span className="block text-sm font-bold leading-5 text-[#102033]">{item.title}</span>
                <span className="block text-xs leading-5 text-[#5b6875]">{item.detail}</span>
              </span>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

function CustomerRevenueProcessVisual() {
  return (
    <div className="relative overflow-hidden rounded-[1.7rem] border border-[#e7dfd3] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbf7_100%)] p-4 shadow-[0_24px_70px_rgba(16,32,51,0.1)] sm:rounded-[2rem] sm:p-6 lg:p-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-stretch">
        <div className="rounded-[1.35rem] bg-[#f4faf5] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:p-5">
          <CustomerRevenueDesktopLoop />
          <CustomerRevenueMobileLoop />
        </div>
        <CustomerRevenueOutcomePanel />
      </div>
      <div className="mt-5 rounded-2xl border border-[#d7ebdd] bg-[#f5fbf6] px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-white shadow-[0_10px_22px_rgba(21,128,61,0.18)]">
              <MessageSquareText className="h-5 w-5" strokeWidth={1.9} />
            </span>
            <p className="text-sm font-bold leading-6 text-[#102033] sm:text-base">
              Each customer moment feeds the next. Together, they create repeat revenue.
            </p>
          </div>
          <div className="grid gap-2 text-xs font-semibold leading-5 text-[#506070] sm:grid-cols-2 lg:w-[46%]">
            {revenueBusinessSignals.map((signal) => (
              <span key={signal} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#15803D]" />
                {signal}
              </span>
            ))}
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
        Find Missed Customer Revenue
        <ArrowRight className="ml-2 h-4 w-4" />
      </CTALink>
    </div>
  )
}

function CustomerRevenueAuditBridge() {
  return (
    <p className="mx-auto mt-7 max-w-3xl text-center text-base font-semibold leading-7 text-[#102033] sm:text-lg">
      The Workflow Audit shows which customer revenue gap is costing you money first: old customers, reviews, referrals, or missed calls.
    </p>
  )
}

function CustomerRevenueSystemSection() {
  return (
    <div id="customer-revenue-system" className="scroll-mt-40 sm:scroll-mt-44 lg:scroll-mt-48">
      <SectionHeader
        eyebrow="Customer Revenue System"
        headline="Get more money from the customers you already earned."
        subheadline="Old customers, happy customers, reviews, referrals, and missed calls should feed the next job. Stanley Systems turns those moments into a simple repeat-revenue loop your office can actually run."
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
