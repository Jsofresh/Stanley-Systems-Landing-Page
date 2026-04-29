import SlideIn from "@/components/SlideIn"
import { CTALink } from "@/components/cta-link"
import Image from "next/image"
import type { ReactNode } from "react"
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  Clock3,
  FilePenLine,
  FileSearch,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  Star,
  TriangleAlert,
  UsersRound,
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

const cashflowVisualAsset = "/images/generated/systems/cashflow-control-system-visual.webp"
const customerRevenueVisualAsset = "/images/generated/systems/customer-revenue-system-visual.webp"

const cashflowPipelineStops = [
  {
    label: "Finished work",
    detail: "Job complete",
    icon: "/images/systems/icons/completed-work.svg",
  },
  {
    label: "Billing packet",
    detail: "Details ready",
    icon: "/images/systems/icons/invoice-ready.svg",
  },
  {
    label: "Invoice sent",
    detail: "Sent cleanly",
    icon: "/images/systems/icons/invoice-sent.svg",
  },
  {
    label: "A/R follow-up",
    detail: "Stuck cash visible",
    icon: "/images/systems/icons/ar-follow-up.svg",
  },
  {
    label: "Collected cash",
    detail: "Money moving",
    icon: "/images/systems/icons/collected-cash.svg",
  },
] as const

const cashflowWarningChips = [
  { label: "Missing details", position: "left-[22%]" },
  { label: "Delay", position: "left-[43%]" },
  { label: "No follow-up", position: "left-[64%]" },
] as const

const revenueFlywheelNodes = [
  {
    label: "Bring customers back",
    icon: RefreshCw,
    position: "left-[50%] top-3 -translate-x-1/2 sm:top-0",
  },
  {
    label: "Get fresh reviews",
    icon: Star,
    position: "right-1 top-[38%] -translate-y-1/2 sm:right-0 sm:top-1/2",
  },
  {
    label: "Create referrals",
    icon: UsersRound,
    position: "left-[50%] bottom-3 -translate-x-1/2 sm:bottom-0",
  },
  {
    label: "Catch extra calls",
    icon: PhoneCall,
    position: "left-1 top-[62%] -translate-y-1/2 sm:left-0 sm:top-1/2",
  },
] as const

const revenueOutcomes = ["Repeat jobs", "Fresh reviews", "More referrals", "Captured calls"] as const

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
      <SlideIn direction="up">
        <div className="text-sm font-bold tracking-[0.12em] text-[#15803D]">{eyebrow}</div>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#071421] sm:text-5xl lg:text-[3.45rem] lg:leading-[1.02]">
          {headline}
        </h2>
      </SlideIn>
      <SlideIn direction="up" delay={110}>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#4d5a68] sm:text-xl">
          {subheadline}
        </p>
      </SlideIn>
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
    <div className="relative overflow-hidden rounded-[2rem] border border-[#e0d8cc] bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)] p-5 shadow-[0_22px_60px_rgba(16,32,51,0.1)] ring-1 ring-white/80 sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute -left-16 top-20 h-44 w-44 rounded-full bg-[#e9f8ed] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-8 h-64 w-64 rounded-full bg-[#edf8ef] blur-3xl" />
      <div className="relative min-h-[430px] overflow-hidden rounded-[1.55rem] border border-[#e8e1d6] bg-white/88 px-4 pb-5 pt-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:px-6 sm:pb-6 lg:px-7">
        <div className="absolute left-5 top-5 rounded-full border border-[#dcebdc] bg-[#f5fbf6] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#15803D]">
          Office pipeline
        </div>
        <div className="absolute right-5 top-5 hidden rounded-full border border-[#e6ddd0] bg-white px-3 py-1 text-xs font-bold text-[#506070] sm:block">
          Left to right cash movement
        </div>
        <div className="pointer-events-none absolute bottom-[128px] right-[-2%] z-0 hidden h-[240px] w-[32%] opacity-90 mix-blend-multiply lg:block">
          <Image
            src={cashflowVisualAsset}
            alt=""
            fill
            sizes="440px"
            className="object-contain object-right"
          />
        </div>
        <div className="relative z-10 mt-4">
          <div className="relative hidden h-12 lg:block">
            {cashflowWarningChips.map((chip) => (
              <div
                key={chip.label}
                className={`absolute top-0 ${chip.position} -translate-x-1/2 rounded-full border border-[#f1c8c5] bg-white px-3 py-1.5 text-xs font-bold text-[#9f2d24] shadow-[0_10px_22px_rgba(16,32,51,0.07)]`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <TriangleAlert className="h-3.5 w-3.5" />
                  {chip.label}
                </span>
                <span className="absolute left-1/2 top-full h-8 border-l border-dashed border-[#c0392f]" />
              </div>
            ))}
          </div>
          <div className="relative grid gap-4 lg:grid-cols-5 lg:gap-3">
            <div className="pointer-events-none absolute left-[9%] right-[8%] top-[70px] z-0 hidden h-5 rounded-full border border-[#d1ddd0] bg-[linear-gradient(90deg,#dfe7df_0%,#f4f8f4_42%,#15803D_100%)] shadow-[inset_0_1px_2px_rgba(16,32,51,0.1)] lg:block" />
            {cashflowPipelineStops.map((stage, index) => (
              <div key={stage.label} className="relative z-10 flex min-h-[170px] flex-col items-center justify-center rounded-[1.35rem] border border-[#e4ded3] bg-white p-4 text-center shadow-[0_14px_34px_rgba(16,32,51,0.07)]">
                <span className="absolute -top-3 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#15803D] text-sm font-bold text-white shadow-[0_10px_20px_rgba(21,128,61,0.22)]">
                  {index + 1}
                </span>
                {index < cashflowPipelineStops.length - 1 ? (
                  <span className="absolute -right-4 top-1/2 z-20 hidden h-3 w-8 -translate-y-1/2 rounded-full bg-[#15803D] shadow-[0_0_0_4px_white] lg:block" />
                ) : null}
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d9eedf] bg-[#f5fbf6]">
                  <Image src={stage.icon} alt="" width={44} height={44} className="h-11 w-11 object-contain" />
                </span>
                <h3 className="mt-4 text-base font-bold leading-6 text-[#102033]">{stage.label}</h3>
                <p className="mt-1 text-sm leading-6 text-[#506070]">{stage.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr_1fr]">
            {[
              { label: "Catch missing details", icon: FileSearch },
              { label: "Push invoices out", icon: ArrowRight },
              { label: "Surface stuck money", icon: Banknote },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-[#e4ded3] bg-white px-4 py-3 text-sm font-bold text-[#102033] shadow-[0_10px_24px_rgba(16,32,51,0.05)]">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2faf4] text-[#15803D]">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  {item.label}
                </div>
              )
            })}
          </div>
          <div className="mt-5 lg:hidden">
            <div className="relative min-h-[190px] overflow-hidden rounded-[1.35rem] border border-[#d6ebd8] bg-[#f6fcf7]">
              <Image
                src={cashflowVisualAsset}
                alt=""
                fill
                sizes="100vw"
                className="object-contain object-center opacity-95 mix-blend-multiply"
              />
            </div>
          </div>
          <div className="mt-5">
            <SupportStrip>
              Each step closes a gap between finished work and collected cash.
            </SupportStrip>
          </div>
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
      <SlideIn direction="up" delay={150} className="mt-10">
        <CashflowPipelineVisual />
      </SlideIn>
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
    <div className="relative overflow-hidden rounded-[2rem] border border-[#e0d8cc] bg-[linear-gradient(180deg,#ffffff_0%,#fbfaf7_100%)] p-5 shadow-[0_22px_60px_rgba(16,32,51,0.1)] ring-1 ring-white/80 sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-[#e9f8ed] blur-3xl" />
      <div className="relative z-10 min-h-[500px] overflow-hidden rounded-[1.55rem] border border-[#e8e1d6] bg-white/88 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-6 lg:min-h-[430px] lg:p-7">
        <div className="grid gap-6 lg:grid-cols-[0.98fr_0.56fr_0.86fr] lg:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-[430px]">
            <div className="absolute inset-5 rounded-full border border-[#cfe6d1]" />
            <div className="absolute inset-[18%] rounded-full bg-[#e9f8ed] blur-2xl" />
            <svg className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]" viewBox="0 0 100 100" aria-hidden="true">
              <path
                d="M50 9a41 41 0 1 1-29 12"
                fill="none"
                stroke="#15803D"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <path d="M18 22l10-2-3 9" fill="none" stroke="#15803D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          <div className="absolute left-1/2 top-1/2 hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#cae6cf] bg-white text-center shadow-[0_18px_42px_rgba(16,32,51,0.1)] sm:flex">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#15803D]">Customer</div>
              <div className="mt-1 text-xl font-bold leading-6 text-[#071421]">Revenue System</div>
            </div>
            {revenueFlywheelNodes.map((node) => {
              const Icon = node.icon
              return (
              <div
                key={node.label}
                className={`absolute ${node.position} flex min-w-[108px] items-center gap-1.5 rounded-full border border-[#dbe6d7] bg-white px-2 py-1.5 shadow-[0_14px_34px_rgba(16,32,51,0.08)] sm:min-w-[132px] sm:gap-2 sm:px-3 sm:py-2`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f2faf4] text-[#15803D] sm:h-9 sm:w-9">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                </span>
                <span className="text-xs font-bold leading-4 text-[#102033] sm:text-sm sm:leading-5">{node.label}</span>
              </div>
              )
            })}
          </div>
          <div className="relative hidden min-h-[270px] lg:block">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 190 270" aria-hidden="true" preserveAspectRatio="none">
              <path d="M5 135 C55 135 52 42 100 42 L170 42" fill="none" stroke="#9acfa4" strokeDasharray="4 6" strokeLinecap="round" strokeWidth="2" />
              <path d="M5 135 C64 135 58 104 108 104 L170 104" fill="none" stroke="#9acfa4" strokeDasharray="4 6" strokeLinecap="round" strokeWidth="2" />
              <path d="M5 135 C64 135 58 166 108 166 L170 166" fill="none" stroke="#9acfa4" strokeDasharray="4 6" strokeLinecap="round" strokeWidth="2" />
              <path d="M5 135 C55 135 52 228 100 228 L170 228" fill="none" stroke="#9acfa4" strokeDasharray="4 6" strokeLinecap="round" strokeWidth="2" />
              <path d="M171 42l-8-4v8zM171 104l-8-4v8zM171 166l-8-4v8zM171 228l-8-4v8z" fill="#15803D" />
            </svg>
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-[1.35rem] border border-[#d6ebd8] bg-[#f6fcf7] p-4 sm:p-5">
            <Image
              src={customerRevenueVisualAsset}
              alt=""
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-contain object-right opacity-95 mix-blend-multiply"
            />
            <div className="relative z-10 grid max-w-[240px] gap-3">
              {revenueOutcomes.map((label) => (
                <div key={label} className="flex items-center gap-3 rounded-full border border-[#dbe6d7] bg-white/90 px-3 py-2 text-sm font-bold text-[#102033] shadow-[0_12px_28px_rgba(16,32,51,0.07)] backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#15803D]" />
                  {label}
                </div>
              ))}
            </div>
            <div className="absolute left-[244px] top-1/2 z-10 hidden h-1 w-[24%] -translate-y-1/2 rounded-full bg-[#15803D] shadow-[0_0_0_4px_rgba(246,252,247,0.9)] sm:block" />
          </div>
        </div>
        <div className="mt-5">
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
      <SlideIn direction="up" delay={150} className="mt-10">
        <CustomerRevenueProcessVisual />
      </SlideIn>
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
