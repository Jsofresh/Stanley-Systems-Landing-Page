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
    label: "Old customers",
    detail: "Past buyers hear from you before your shop becomes the last option.",
    icon: RefreshCw,
  },
  {
    label: "Fresh reviews",
    detail: "Happy customers are asked the right way, at the right time.",
    icon: Star,
  },
  {
    label: "Referrals",
    detail: "Good work becomes a simple path to the next introduction.",
    icon: UsersRound,
  },
  {
    label: "Missed calls captured",
    detail: "Missed calls are caught, answered, and turned into real chances.",
    icon: PhoneCall,
  },
  {
    label: "More booked work",
    detail: "More conversations, estimates, and jobs land on the calendar.",
    icon: CalendarClock,
  },
] as const

const revenueBusinessSignals = [
  "More money in",
  "Time back",
  "Stronger reputation",
  "Repeat revenue",
] as const

const desktopNodePositions = [
  "left-[1%] top-[26%]",
  "left-[49%] top-[2%] -translate-x-1/2",
  "right-[1%] top-[30%]",
  "right-[28%] bottom-[3%]",
  "left-[3%] bottom-[18%]",
] as const

const loopArrowPaths = [
  "M250 192 C330 112 454 104 544 170",
  "M602 228 C650 332 610 448 512 510",
  "M452 540 C330 570 224 510 184 404",
  "M166 342 C150 258 178 214 228 178",
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
}: {
  step: (typeof revenueLoopSteps)[number]
  index: number
}) {
  const Icon = step.icon

  return (
    <div
      className={`absolute ${desktopNodePositions[index]} z-20 flex w-[168px] flex-col rounded-[1.05rem] border border-[#dcefe2] bg-white px-4 py-4 text-left shadow-[0_18px_42px_rgba(16,32,51,0.08)]`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cfe8d5] bg-[#f5fbf6] text-[#15803D] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </div>
      <p className="mt-3 text-[0.95rem] font-bold leading-5 text-[#102033]">{step.label}</p>
      <p className="mt-1 text-xs leading-5 text-[#5b6875]">{step.detail}</p>
    </div>
  )
}

function CustomerRevenueHub() {
  return (
    <div
      className="absolute left-1/2 top-1/2 z-30 flex min-h-[190px] w-[236px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[8px] border-white bg-[radial-gradient(circle_at_30%_20%,#1fa454_0%,#0d7137_48%,#064823_100%)] text-center text-white shadow-[0_24px_60px_rgba(16,32,51,0.14),inset_0_1px_0_rgba(255,255,255,0.22)]"
    >
      <div className="px-6">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white ring-1 ring-white/25">
          <TrendingUp className="h-6 w-6" strokeWidth={1.9} />
        </span>
        <p className="mt-3 text-xs font-extrabold uppercase leading-4 tracking-[0.12em] text-white/85">
          More booked work
        </p>
        <p className="mt-1 text-3xl font-bold leading-[1.02] text-white">
          Repeat revenue
        </p>
        <p className="mt-2 text-xs font-semibold leading-5 text-white/82">
          Higher profit. Less owner rescue.
        </p>
      </div>
    </div>
  )
}

function RevenueLoopArrows() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      viewBox="0 0 760 560"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <marker id="revenue-loop-arrow" markerHeight="10" markerWidth="10" orient="auto" refX="9" refY="5">
          <path d="M0 0L10 5L0 10Z" fill="#15803D" />
        </marker>
      </defs>
      {loopArrowPaths.map((path, index) => (
        <path
          key={path}
          d={path}
          stroke={index % 2 === 0 ? "#15803D" : "#41a65f"}
          strokeWidth="5"
          strokeLinecap="round"
          markerEnd="url(#revenue-loop-arrow)"
        />
      ))}
      <path d="M382 170V235" stroke="#b6c2cd" strokeLinecap="round" strokeWidth="4" />
      <path d="M552 312L472 330" stroke="#b6c2cd" strokeLinecap="round" strokeWidth="4" />
      <path d="M277 392L344 356" stroke="#b6c2cd" strokeLinecap="round" strokeWidth="4" />
      <path d="M322 418L370 382" stroke="#b6c2cd" strokeLinecap="round" strokeWidth="4" />
    </svg>
  )
}

function CustomerRevenueDesktopLoop() {
  return (
    <div className="hidden lg:block">
      <div className="relative min-h-[430px] rounded-[2rem] bg-[linear-gradient(135deg,#f7fbf5_0%,#ffffff_55%,#f2f8ef_100%)] px-8 py-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]">
        <svg className="pointer-events-none absolute inset-x-10 top-24 h-44 w-[calc(100%-5rem)]" viewBox="0 0 900 180" fill="none" aria-hidden="true" preserveAspectRatio="none">
          <defs>
            <marker id="customer-revenue-path-arrow" markerHeight="9" markerWidth="9" orient="auto" refX="8" refY="4.5">
              <path d="M0 0L9 4.5L0 9Z" fill="#15803D" />
            </marker>
          </defs>
          <path d="M40 126 C190 34 330 28 450 92 C570 156 704 156 852 62" stroke="#bddfc5" strokeWidth="14" strokeLinecap="round" opacity="0.55" />
          <path d="M40 126 C190 34 330 28 450 92 C570 156 704 156 852 62" stroke="#15803D" strokeWidth="5" strokeLinecap="round" markerEnd="url(#customer-revenue-path-arrow)" />
        </svg>

        <div className="relative z-10 grid grid-cols-5 gap-4">
          {revenueLoopSteps.map((step, index) => {
            const Icon = step.icon
            const offset = ["mt-24", "mt-3", "mt-16", "mt-24", "mt-6"][index]

            return (
              <div key={step.label} className={`${offset} text-center`}>
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#15803D] shadow-[0_18px_36px_rgba(16,32,51,0.12)] ring-1 ring-[#cfe8d5]">
                  <Icon className="h-7 w-7" strokeWidth={1.9} />
                </span>
                <p className="mt-4 text-base font-bold leading-5 text-[#102033]">{step.label}</p>
                <p className="mx-auto mt-2 max-w-[150px] text-xs leading-5 text-[#5b6875]">{step.detail}</p>
              </div>
            )
          })}
        </div>

        <div className="relative z-20 mx-auto mt-5 flex max-w-2xl items-center justify-between rounded-full bg-[#0b5a33] px-6 py-4 text-white shadow-[0_22px_50px_rgba(11,90,51,0.18)]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/78">Outcome</p>
            <p className="mt-1 text-2xl font-bold leading-none">Repeat revenue without owner rescue</p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/25">
            <TrendingUp className="h-7 w-7" strokeWidth={1.9} />
          </div>
        </div>
      </div>
    </div>
  )
}

function CustomerRevenueMobileSequence() {
  return (
    <div className="lg:hidden">
      <div className="rounded-[1.4rem] bg-[radial-gradient(circle_at_30%_20%,#1fa454_0%,#0d7137_50%,#064823_100%)] p-6 text-center text-white shadow-[0_16px_38px_rgba(16,32,51,0.12)]">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/14 text-white ring-1 ring-white/25">
          <TrendingUp className="h-6 w-6" strokeWidth={1.9} />
        </span>
        <p className="mt-4 text-xs font-extrabold uppercase leading-4 tracking-[0.12em] text-white/85">Outcome</p>
        <p className="mt-1 text-3xl font-bold leading-tight text-white">Repeat revenue</p>
        <p className="mt-2 text-sm leading-6 text-white/82">Old customers, reviews, referrals, and captured calls feed more booked work.</p>
      </div>
      <div className="relative mt-6 space-y-5 pl-5">
        <div className="absolute bottom-10 left-[2.15rem] top-8 w-[3px] rounded-full bg-[#bddfc5]" aria-hidden="true" />
        {revenueLoopSteps.map((step, index) => {
          const Icon = step.icon

          return (
            <div key={step.label} className="relative flex gap-4">
              <span className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#15803D] shadow-[0_14px_30px_rgba(16,32,51,0.1)] ring-1 ring-[#cfe8d5]">
                <Icon className="h-6 w-6" strokeWidth={1.9} />
              </span>
              <span className="pt-1">
                <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Step 0{index + 1}</span>
                <span className="mt-1 block text-base font-bold leading-5 text-[#102033]">{step.label}</span>
                <span className="mt-1 block text-sm leading-6 text-[#5b6875]">{step.detail}</span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CustomerRevenueOutcomePanel() {
  return (
    <div className="rounded-[1.45rem] border border-[#dfe9dc] bg-[#fbfefb] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start gap-3 border-b border-[#dfe9dc] pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">
          <Banknote className="mt-1 h-6 w-6 shrink-0 text-[#0b6f35]" strokeWidth={1.9} />
          <span>
            <span className="block text-sm font-bold leading-5 text-[#102033]">More money in</span>
            <span className="mt-1 block text-xs leading-5 text-[#5b6875]">Past customers feed repeat jobs and new revenue.</span>
          </span>
        </div>
        <div className="flex items-start gap-3 border-b border-[#dfe9dc] pb-4 sm:border-b-0 lg:border-r lg:pb-0 lg:pr-4">
          <Clock3 className="mt-1 h-6 w-6 shrink-0 text-[#0b6f35]" strokeWidth={1.9} />
          <span>
            <span className="block text-sm font-bold leading-5 text-[#102033]">Time back</span>
            <span className="mt-1 block text-xs leading-5 text-[#5b6875]">Clear follow-up means fewer dropped balls and less owner rescue.</span>
          </span>
        </div>
        <div className="flex items-start gap-3 border-b border-[#dfe9dc] pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">
          <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-[#0b6f35]" strokeWidth={1.9} />
          <span>
            <span className="block text-sm font-bold leading-5 text-[#102033]">Stronger reputation</span>
            <span className="mt-1 block text-xs leading-5 text-[#5b6875]">Fresh reviews and referrals build trust before the first call.</span>
          </span>
        </div>
        <div className="flex items-start gap-3">
          <TrendingUp className="mt-1 h-6 w-6 shrink-0 text-[#0b6f35]" strokeWidth={1.9} />
          <span>
            <span className="block text-sm font-bold leading-5 text-[#102033]">Repeat revenue</span>
            <span className="mt-1 block text-xs leading-5 text-[#5b6875]">More calls, conversations, and booked work you can count on.</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function CustomerRevenueProcessVisual() {
  return (
    <div className="relative overflow-hidden rounded-[1.7rem] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbf7_100%)] p-4 shadow-[0_24px_70px_rgba(16,32,51,0.1)] sm:rounded-[2rem] sm:p-6 lg:p-7">
      <div className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-[#e9f8ed] blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-56 w-56 rounded-full bg-[#f2f7ef] blur-3xl" />
      <div className="relative rounded-[1.35rem] bg-[#f4faf5] p-3 sm:p-5 lg:p-6">
        <CustomerRevenueDesktopLoop />
        <CustomerRevenueMobileSequence />
      </div>
      <div className="relative mt-5">
        <CustomerRevenueOutcomePanel />
      </div>
    </div>
  )
}

function CustomerRevenueCTACluster() {
  return (
    <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
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
        href="/contact"
        kind="systems"
        location="customer_revenue_system_section"
        className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#cbd8c7] bg-white px-8 py-4 text-base font-bold text-[#102033] shadow-[0_12px_28px_rgba(16,32,51,0.06)] transition hover:border-[#15803D] hover:bg-[#f7fcf7]"
      >
        See how the system works
        <ArrowRight className="ml-2 h-4 w-4" />
      </CTALink>
    </div>
  )
}

function CustomerRevenueSystemSection() {
  return (
    <div id="customer-revenue-system" className="scroll-mt-40 px-3 sm:scroll-mt-44 sm:px-4 lg:scroll-mt-48 lg:px-5">
      <div className="mx-auto max-w-5xl text-center">
        <div className="text-sm font-bold uppercase tracking-[0.28em] text-[#0b5a33]">Customer Revenue System</div>
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-[#0b5a33]" />
        <h2 className="mx-auto mt-7 max-w-5xl text-4xl font-semibold text-[#071421] sm:text-5xl lg:text-[4.7rem] lg:leading-[0.96]">
          Get more money from the customers you already earned.
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#344455] sm:text-xl">
          Old customers, happy customers, reviews, referrals, and missed calls should feed the next job instead of getting lost after the first sale.
        </p>
      </div>
      <div className="mx-auto mt-8 max-w-6xl lg:mt-10">
        <CustomerRevenueProcessVisual />
      </div>
      <CustomerRevenueCTACluster />
      <div className="mt-7 flex flex-col gap-5 border-t border-[#e5ded3] pt-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0b5a33] text-white">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.9} />
          </span>
          <p className="max-w-xl text-sm font-semibold leading-6 text-[#102033] sm:text-base">
            Practical systems for service businesses that turn good jobs, good customers, and missed calls into more booked work.
          </p>
        </div>
        <div className="grid gap-2 text-xs font-semibold leading-5 text-[#506070] sm:grid-cols-2 lg:w-[360px]">
          {revenueBusinessSignals.map((signal) => (
            <span key={signal} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#15803D]" />
              {signal}
            </span>
          ))}
        </div>
      </div>
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
