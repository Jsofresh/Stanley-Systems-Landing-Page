import { CTALink } from "@/components/cta-link"
import Image from "next/image"
import type { ReactNode } from "react"
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock3,
  FilePenLine,
  ShieldCheck,
  UserRound,
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

const revenueSupportCards = [
  {
    title: "Bring old customers back",
    detail: "Turn forgotten customers into repeat booked work.",
    icon: "/images/systems/icons/follow-up-scheduling.webp",
  },
  {
    title: "Get more fresh reviews",
    detail: "Turn happy jobs into 5-star Google reviews.",
    icon: "/images/systems/icons/reviews.webp",
  },
  {
    title: "Turn trust into referrals",
    detail: "Make it easier for happy customers to refer friends.",
    icon: "/images/systems/icons/customer-growth.webp",
  },
  {
    title: "Catch more inbound opportunity",
    detail: "Make sure missed calls do not become missed work.",
    icon: "/images/systems/icons/voice-messaging.webp",
  },
] as const

const cashflowVisualAsset =
  "/images/generated/design-loop/homepage-anti-slop-current-diffs-20260430T130608Z/cashflow-pipeline-approved.png"
const customerRevenueVisualAsset =
  "/images/generated/design-loop/homepage-anti-slop-current-diffs-20260430T130608Z/customer-revenue-flywheel-approved.png"

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

function CustomerRevenueProcessVisual() {
  return (
    <div className="relative overflow-hidden rounded-[1.35rem] border border-[#e0d8cc] bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)] p-2.5 shadow-[0_22px_60px_rgba(16,32,51,0.1)] ring-1 ring-white/80 sm:rounded-[2rem] sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#e9f8ed] blur-3xl" />
      <div className="relative z-10 overflow-hidden rounded-[1.1rem] border border-[#e8e1d6] bg-white/88 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:rounded-[1.55rem] sm:p-6 lg:min-h-[430px] lg:p-7">
        <div className="relative min-h-[260px] overflow-hidden rounded-[0.95rem] bg-[#f6fcf7] sm:min-h-[500px] sm:rounded-[1.25rem] lg:min-h-[600px]">
          <Image
            src={customerRevenueVisualAsset}
            alt="Customer Revenue System flywheel showing repeat work, reviews, referrals, and captured calls feeding the next booked job."
            fill
            sizes="(min-width: 1024px) 1120px, 100vw"
            className="object-contain"
            priority={false}
          />
        </div>
        <div className="mt-3 sm:mt-5">
          <SupportStrip>
            Each customer moment feeds the next booked job.
          </SupportStrip>
        </div>
      </div>
    </div>
  )
}

function SystemSupportCard({ card }: { card: (typeof revenueSupportCards)[number] }) {
  return (
    <div className="flex min-h-[138px] items-start gap-4 rounded-3xl border border-[#e2dbcf] bg-white p-5 shadow-[0_14px_34px_rgba(16,32,51,0.06)]">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#e8e1d6] bg-[#fbfaf7]">
        <Image src={card.icon} alt="" width={42} height={42} className="h-10 w-10 object-contain" />
      </span>
      <div>
        <h3 className="text-base font-bold leading-6 text-[#102033]">{card.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#506070]">{card.detail}</p>
      </div>
    </div>
  )
}

function CustomerRevenueSystemSection() {
  return (
    <div>
      <SectionHeader
        eyebrow="Customer Revenue System"
        headline="Get more money from the customers you already earned."
        subheadline="Old customers, happy customers, reviews, referrals, and missed calls should feed the next job."
      />
      <div className="mt-8 sm:mt-10">
        <CustomerRevenueProcessVisual />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {revenueSupportCards.map((card) => (
          <SystemSupportCard key={card.title} card={card} />
        ))}
      </div>
      <SystemCTACluster primary="See how revenue grows" location="customer_revenue_system_section" />
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
