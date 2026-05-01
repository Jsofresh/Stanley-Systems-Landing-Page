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
  Mail,
  MapPin,
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
    label: "Recover missed calls",
    detail: "Every missed call gets a clean follow-up path.",
    icon: PhoneCall,
  },
  {
    label: "Bring customers back",
    detail: "Past customers get a timely reason to book again.",
    icon: RefreshCw,
  },
  {
    label: "Get fresh reviews",
    detail: "Happy jobs turn into public trust for the next buyer.",
    icon: Star,
  },
  {
    label: "Create referrals",
    detail: "Good work becomes an easier next introduction.",
    icon: UsersRound,
  },
  {
    label: "More booked work",
    detail: "More paths turn into booked work.",
    icon: CalendarClock,
  },
] as const

const revenueOutcomeItems = ["Past customers return", "Reviews build trust", "Referrals stay easy", "Missed calls get recovered"] as const

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

function RevenueMomentCard({ step, index }: { step: (typeof revenueLoopSteps)[number]; index: number }) {
  const Icon = step.icon

  return (
    <div className="relative min-h-[154px] rounded-[1.15rem] border border-[#dce9dc] bg-white p-4 text-center shadow-[0_18px_42px_rgba(16,32,51,0.08)]">
      <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-[6px] border-[#f7fbf7] bg-[#15803D] text-white shadow-[0_12px_24px_rgba(21,128,61,0.22)]">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>
      <div className="pt-5">
        <div className="mx-auto mb-3 h-1.5 w-8 rounded-full bg-[#d6ecdc]" aria-hidden="true" />
        <p className="text-[0.7rem] font-bold tracking-[0.16em] text-[#15803D]">0{index + 1}</p>
        <p className="mt-2 text-sm font-bold leading-5 text-[#102033]">{step.label}</p>
        <p className="mt-2 text-xs leading-5 text-[#5b6875]">{step.detail}</p>
      </div>
    </div>
  )
}

function CustomerRevenueDesktopJourney() {
  return (
    <div className="relative hidden min-h-[575px] overflow-hidden rounded-[1.25rem] border border-[#e5ded3] bg-[#f7fbf7] p-7 lg:block">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18px_18px,rgba(21,128,61,0.08)_1.3px,transparent_1.5px)] bg-[length:34px_34px] opacity-60" />
      <div className="pointer-events-none absolute left-10 top-14 h-52 w-52 rounded-full bg-white/90 blur-2xl" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-64 w-64 rounded-full bg-[#dff5e5] blur-3xl" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1030 575"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <marker id="revenue-journey-arrow" markerHeight="10" markerWidth="10" orient="auto" refX="9" refY="5">
            <path d="M0 0L10 5L0 10Z" fill="#116832" />
          </marker>
          <linearGradient id="revenue-journey-ribbon" x1="46" x2="900" y1="280" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#116832" />
            <stop offset="0.48" stopColor="#15803D" />
            <stop offset="1" stopColor="#0f6d35" />
          </linearGradient>
        </defs>
        <path
          d="M44 303 C136 247 190 350 279 288 C365 228 414 337 500 290 C590 240 654 335 744 286 C810 250 848 277 900 288"
          stroke="#d5ecda"
          strokeWidth="44"
          strokeLinecap="round"
        />
        <path
          d="M44 303 C136 247 190 350 279 288 C365 228 414 337 500 290 C590 240 654 335 744 286 C810 250 848 277 900 288"
          stroke="url(#revenue-journey-ribbon)"
          strokeWidth="28"
          strokeLinecap="round"
          markerEnd="url(#revenue-journey-arrow)"
        />
        <path
          d="M58 303 C150 249 199 342 281 289 C364 236 417 329 499 291 C588 248 655 326 743 288 C806 260 845 280 884 289"
          stroke="rgba(255,255,255,0.58)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 12"
        />
      </svg>

      <div className="absolute left-[58px] top-[84px] w-[150px] rotate-[-5deg] rounded-[1.35rem] border border-[#dce9dc] bg-[#102033] p-3 text-white shadow-[0_22px_45px_rgba(16,32,51,0.2)]">
        <div className="rounded-[1rem] border border-white/10 bg-[#142b45] p-3">
          <p className="text-[0.68rem] font-bold tracking-[0.14em] text-[#9ee6b4]">MISSED CALL</p>
          <p className="mt-3 text-sm font-bold leading-5">Still winnable</p>
          <div className="mt-4 flex gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#15803D]">
              <PhoneCall className="h-4 w-4" />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <MessageSquareText className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>

      <div className="absolute left-[265px] top-[76px] w-[180px] rounded-[1.15rem] border border-[#dce9dc] bg-white p-4 shadow-[0_18px_42px_rgba(16,32,51,0.08)]">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-[#15803D]">
          <Mail className="h-4 w-4" />
          FOLLOW-UP
        </div>
        <p className="mt-3 text-sm font-bold leading-5 text-[#102033]">A useful reason to return</p>
        <div className="mt-4 space-y-2">
          <div className="h-2 rounded-full bg-[#dce9dc]" />
          <div className="h-2 w-3/4 rounded-full bg-[#edf5ee]" />
        </div>
      </div>

      <div className="absolute left-[530px] top-[60px] w-[170px] rotate-[4deg] rounded-[1.15rem] border border-[#dce9dc] bg-white p-4 shadow-[0_18px_42px_rgba(16,32,51,0.08)]">
        <div className="flex gap-1 text-[#15803D]" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((star) => (
            <Star key={star} className="h-4 w-4 fill-current" strokeWidth={1.6} />
          ))}
        </div>
        <p className="mt-3 text-sm font-bold leading-5 text-[#102033]">Fresh review request</p>
        <p className="mt-1 text-xs leading-5 text-[#5b6875]">Sent after the job lands well.</p>
      </div>

      <div className="absolute right-[226px] top-[96px] w-[150px] rounded-[1.15rem] border border-[#dce9dc] bg-white p-4 shadow-[0_18px_42px_rgba(16,32,51,0.08)]">
        <div className="flex -space-x-2" aria-hidden="true">
          {[0, 1, 2].map((avatar) => (
            <span key={avatar} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#e7f7eb] text-[#15803D]">
              <UsersRound className="h-4 w-4" />
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm font-bold leading-5 text-[#102033]">Referral prompt ready</p>
      </div>

      <div className="absolute right-[86px] bottom-[86px] w-[142px] rotate-[3deg] rounded-[1.15rem] border border-[#dce9dc] bg-white p-4 shadow-[0_18px_42px_rgba(16,32,51,0.08)]">
        <div className="grid grid-cols-3 gap-1" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((cell) => (
            <span key={cell} className={`h-7 rounded-lg ${cell === 4 ? "bg-[#15803D]" : "bg-[#edf5ee]"}`} />
          ))}
        </div>
        <p className="mt-3 text-sm font-bold leading-5 text-[#102033]">Booked slot</p>
      </div>

      <div className="absolute right-[20px] top-[180px] flex h-[196px] w-[196px] items-center justify-center rounded-full border border-[#bfe6c9] bg-[#116832] p-4 text-center text-white shadow-[0_28px_70px_rgba(21,128,61,0.22)]">
        <div className="absolute inset-3 rounded-full border border-white/25" aria-hidden="true" />
        <div>
          <TrendingUp className="mx-auto h-9 w-9" strokeWidth={1.9} />
          <p className="mt-4 text-[2rem] font-semibold leading-none tracking-tight">Steady repeat revenue</p>
        </div>
      </div>

      <div className="absolute bottom-8 left-7 right-[230px] grid grid-cols-5 gap-4">
        {revenueLoopSteps.map((step, index) => (
          <RevenueMomentCard key={step.label} step={step} index={index} />
        ))}
      </div>

      <div className="absolute left-8 top-[246px] flex items-center gap-2 rounded-full border border-[#dce9dc] bg-white/90 px-3 py-2 text-xs font-bold tracking-[0.12em] text-[#15803D] shadow-[0_12px_24px_rgba(16,32,51,0.06)]">
        <MapPin className="h-4 w-4" />
        CUSTOMER MOMENTS
      </div>
    </div>
  )
}

function CustomerRevenueMobilePath() {
  return (
    <div className="relative min-h-[690px] overflow-hidden rounded-[1.05rem] border border-[#d6e6d7] bg-[#f7fbf7] p-2 sm:min-h-[650px] lg:hidden">
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-white blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#dff5e5] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14px_14px,rgba(21,128,61,0.08)_1.1px,transparent_1.3px)] bg-[length:26px_26px] opacity-70" />

      <svg
        className="pointer-events-none absolute inset-x-0 top-[106px] h-[355px] w-full"
        viewBox="0 0 360 355"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <marker id="revenue-mobile-arrow" markerHeight="9" markerWidth="9" orient="auto" refX="8" refY="4.5">
            <path d="M0 0L9 4.5L0 9Z" fill="#116832" />
          </marker>
          <linearGradient id="revenue-mobile-road" x1="48" x2="290" y1="302" y2="68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#116832" />
            <stop offset="0.5" stopColor="#15803D" />
            <stop offset="1" stopColor="#0f6d35" />
          </linearGradient>
        </defs>
        <path
          d="M65 44 C28 96 46 166 110 178 C196 194 225 76 159 58 C89 39 42 131 84 227 C123 314 246 326 292 238 C326 172 281 111 235 96"
          stroke="#d5ecda"
          strokeWidth="34"
          strokeLinecap="round"
        />
        <path
          d="M65 44 C28 96 46 166 110 178 C196 194 225 76 159 58 C89 39 42 131 84 227 C123 314 246 326 292 238 C326 172 281 111 235 96"
          stroke="url(#revenue-mobile-road)"
          strokeWidth="21"
          strokeLinecap="round"
          markerEnd="url(#revenue-mobile-arrow)"
        />
        <path
          d="M65 44 C28 96 46 166 110 178 C196 194 225 76 159 58 C89 39 42 131 84 227 C123 314 246 326 292 238 C326 172 281 111 235 96"
          stroke="rgba(255,255,255,0.62)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="9 11"
        />
      </svg>

      <div className="relative z-10 min-h-[674px] sm:min-h-[634px]">
        <div className="rounded-[1rem] border border-[#dce9dc] bg-white/92 p-3 shadow-[0_14px_34px_rgba(16,32,51,0.06)]">
          <div className="flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.12em] text-[#15803D]">
            <MapPin className="h-3.5 w-3.5" />
            CUSTOMER REVENUE PATH
          </div>
          <p className="mt-2 text-base font-bold leading-6 text-[#071421]">
            Calls, customers, reviews, and referrals.
          </p>
          <p className="mt-1 text-xs leading-5 text-[#5b6875]">
            Already-earned trust feeds the next booked job.
          </p>
        </div>

        <div className="absolute right-1 top-[112px] flex h-[120px] w-[120px] items-center justify-center rounded-full border border-[#bfe6c9] bg-[#116832] p-3 text-center text-white shadow-[0_24px_54px_rgba(21,128,61,0.24)] sm:right-3 sm:h-[132px] sm:w-[132px]">
          <div className="absolute inset-2 rounded-full border border-white/25" aria-hidden="true" />
          <div>
            <TrendingUp className="mx-auto h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.9} />
            <p className="mt-2 text-[1.18rem] font-semibold leading-[1.02] tracking-tight sm:text-[1.35rem]">Steady repeat revenue</p>
          </div>
        </div>

        <div className="absolute left-1 top-[170px] w-[106px] rotate-[-5deg] rounded-[1.05rem] border border-[#24405c]/10 bg-[#102033] p-2.5 text-white shadow-[0_18px_40px_rgba(16,32,51,0.2)] sm:left-5 sm:top-[142px] sm:w-[128px] sm:p-3">
          <div className="flex items-center gap-2 text-[0.66rem] font-bold tracking-[0.13em] text-[#9ee6b4]">
            <PhoneCall className="h-3.5 w-3.5" />
            MISSED CALL
          </div>
          <p className="mt-2 text-xs font-bold leading-4 sm:text-sm sm:leading-5">Follow up while it is still winnable.</p>
        </div>

        <div className="absolute right-1 top-[260px] w-[108px] rotate-[4deg] rounded-full border border-[#dce9dc] bg-white px-3 py-3 text-center shadow-[0_16px_34px_rgba(16,32,51,0.08)] sm:right-5 sm:top-[248px] sm:w-[120px] sm:px-4">
          <RefreshCw className="mx-auto h-5 w-5 text-[#15803D]" strokeWidth={1.9} />
          <p className="mt-1 text-xs font-bold leading-4 text-[#102033]">Past customer returns</p>
        </div>

        <div className="absolute left-[50px] top-[334px] w-[132px] rounded-[1rem] border border-[#dce9dc] bg-white p-3 shadow-[0_16px_34px_rgba(16,32,51,0.08)] sm:left-[96px] sm:top-[300px] sm:w-[154px]">
          <div className="flex gap-0.5 text-[#15803D]" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((star) => (
              <Star key={star} className="h-3.5 w-3.5 fill-current" strokeWidth={1.5} />
            ))}
          </div>
          <p className="mt-2 text-xs font-bold leading-4 text-[#102033]">Review request lands after a good job.</p>
        </div>

        <div className="absolute left-1 top-[436px] w-[112px] rounded-[1.2rem] border border-[#dce9dc] bg-white p-2.5 shadow-[0_16px_34px_rgba(16,32,51,0.08)] sm:left-4 sm:top-[394px] sm:w-[136px] sm:p-3">
          <div className="flex -space-x-2" aria-hidden="true">
            {[0, 1, 2].map((avatar) => (
              <span key={avatar} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#e7f7eb] text-[#15803D]">
                <UsersRound className="h-3.5 w-3.5" />
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs font-bold leading-4 text-[#102033]">Referral prompt stays easy.</p>
        </div>

        <div className="absolute right-1 top-[446px] w-[112px] rotate-[3deg] rounded-[1rem] border border-[#dce9dc] bg-white p-2.5 shadow-[0_16px_34px_rgba(16,32,51,0.08)] sm:right-5 sm:top-[404px] sm:w-[136px] sm:p-3">
          <div className="grid grid-cols-3 gap-1" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((cell) => (
              <span key={cell} className={`h-5 rounded-md ${cell === 4 ? "bg-[#15803D]" : "bg-[#edf5ee]"}`} />
            ))}
          </div>
          <p className="mt-2 text-xs font-bold leading-4 text-[#102033]">Booked work has more ways in.</p>
        </div>

        <div className="absolute bottom-1 left-1 right-1 rounded-[1rem] border border-[#cfe6d1] bg-white/90 px-4 py-3 shadow-[0_14px_34px_rgba(16,32,51,0.06)] sm:bottom-3 sm:left-3 sm:right-3">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-white">
              <MessageSquareText className="h-4 w-4" strokeWidth={1.9} />
            </span>
            <p className="text-sm font-bold leading-5 text-[#102033]">More paths turn into booked work.</p>
          </div>
        </div>
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
        <CustomerRevenueDesktopJourney />
        <CustomerRevenueMobilePath />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {revenueOutcomeItems.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#e2dbcf] bg-white px-4 py-3 text-sm font-bold text-[#102033] shadow-[0_10px_24px_rgba(16,32,51,0.05)]">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#15803D]" />
              <span>{item}</span>
            </div>
          ))}
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
      The Workflow Audit shows which customer revenue path is costing you money first: old customers, reviews, referrals, or missed calls.
    </p>
  )
}

function CustomerRevenueSystemSection() {
  return (
    <div id="customer-revenue-system" className="scroll-mt-40 pt-24 -mt-24 sm:scroll-mt-44 lg:scroll-mt-48">
      <SectionHeader
        eyebrow="Customer Revenue System"
        headline="Get more money from the customers you already earned."
        subheadline="Old customers, happy customers, reviews, referrals, and missed calls should feed the next job. Stanley Systems turns those moments into a simple repeat-revenue path your office can actually run."
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
