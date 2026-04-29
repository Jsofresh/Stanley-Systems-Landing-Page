"use client"

import {
  IconChartLine,
  IconClockDollar,
  IconCoin,
  IconDropletDollar,
  IconFileInvoice,
  IconFilePencil,
  IconPhoneX,
  IconRefresh,
  IconTargetArrow,
  IconUserDollar,
} from "@tabler/icons-react"
import type { ComponentType } from "react"
import { CTALink } from "@/components/cta-link"

const calculatorHref = "/invoicing-delay-cash-flow-calculator"
const auditHref = "/contact"

const summaryCards: Array<{
  Icon: ComponentType<{ className?: string; stroke?: number; "aria-hidden"?: boolean }>
  number: string
  label: string
}> = [
  { Icon: IconDropletDollar, number: "4", label: "revenue leaks" },
  { Icon: IconChartLine, number: "1", label: "monthly estimate" },
  { Icon: IconTargetArrow, number: "1", label: "clear next step" },
]

const leakTiles = [
  {
    label: "Delayed Invoices",
    Icon: DelayedInvoiceIcon,
  },
  {
    label: "Dormant Customers",
    Icon: DormantCustomersIcon,
  },
  {
    label: "Open Estimates",
    Icon: OpenEstimatesIcon,
  },
  {
    label: "Missed Calls",
    Icon: MissedCallsIcon,
  },
]

export function CalculatorPathSection() {
  return (
    <section
      id="calculator"
      data-audit-page="/"
      data-audit-section="home.calculator-path"
      data-audit-priority="4"
      data-audit-offer="Workflow Audit"
      data-audit-purpose="Move visitors from a visible money leak into the Workflow Audit as the next step."
      className="relative z-10 scroll-mt-28 overflow-hidden px-5 py-16 sm:scroll-mt-32 sm:px-6 sm:py-20 lg:scroll-mt-36 lg:px-8 lg:py-28 xl:py-[7.5rem]"
    >
      <div className="mx-auto max-w-[80rem]">
        <div className="grid items-center gap-12 md:gap-14 xl:grid-cols-[minmax(0,0.49fr)_minmax(0,0.51fr)] xl:gap-16">
          <div className="min-w-0 rounded-[2rem] border border-white/65 bg-white/[0.58] p-7 shadow-[0_24px_70px_rgba(16,32,51,0.08),0_1px_0_rgba(255,255,255,0.72)_inset] backdrop-blur-[18px] sm:p-9 lg:p-10 xl:max-w-[40rem] xl:p-11">
            <h2 className="max-w-[39rem] text-[2.65rem] font-semibold leading-[1.02] tracking-[-0.055em] text-[#102033] sm:text-[3.45rem] sm:leading-[0.99] lg:text-[3.3rem] xl:text-[3.35rem]">
              <span className="block">Start with the number,</span>
              <span className="block">not a sales call.</span>
            </h2>

            <div className="mt-6 h-1 w-20 rounded-full bg-[#15803D]" />

            <p className="mt-7 max-w-[38.5rem] text-[1.19rem] leading-[1.72] text-[#47566C] sm:text-[1.27rem]">
              The Revenue Calculator estimates what delayed invoices, dormant customers, open estimates, and missed calls may be costing each month. Then the Workflow Audit turns that range into a clear next step.
            </p>

            <div className="mt-9 grid gap-3.5 sm:gap-4">
              <CTALink
                href={calculatorHref}
                kind="calculator"
                location="homepage_calculator_primary"
                className="inline-flex h-[60px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#15803D] px-5 text-[0.95rem] font-semibold text-white shadow-[0_18px_36px_rgba(21,128,61,0.22)] transition hover:bg-[#116832] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:whitespace-nowrap"
              >
                Use the Revenue Calculator →
              </CTALink>
              <CTALink
                href={auditHref}
                kind="book_meeting"
                location="homepage_calculator_secondary"
                className="inline-flex h-[60px] w-full items-center justify-center rounded-2xl border border-[#CFE0C5] bg-white px-5 text-[0.95rem] font-semibold text-[#102033] shadow-[0_12px_28px_rgba(16,32,51,0.06)] transition hover:border-[#15803D]/40 hover:bg-[#FBF8F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:whitespace-nowrap"
              >
                Book the Workflow Audit
              </CTALink>
            </div>

            <div className="mt-11 grid gap-4 sm:grid-cols-3 sm:gap-4 lg:max-w-[39rem]">
              {summaryCards.map(({ Icon, number, label }) => (
                <div key={label} className="flex min-h-[8.75rem] items-center gap-5 rounded-[1.25rem] border border-[#DED6C8]/80 bg-white/85 px-6 py-5 shadow-[0_16px_42px_rgba(16,32,51,0.055)] sm:min-h-[9rem] sm:flex-col sm:items-start sm:justify-center sm:gap-0 sm:px-5 sm:py-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DDF7E8] text-[#15803D]">
                    <Icon className="h-7 w-7" stroke={1.8} aria-hidden />
                  </span>
                  <div className="sm:mt-4">
                    <div className="text-[2.15rem] font-bold leading-none tracking-tight text-[#102033]">{number}</div>
                    <div className="mt-2 text-[1.05rem] font-medium leading-tight text-[#3E4D63]">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 rounded-[2rem] border border-[#DED6C8] bg-white p-7 shadow-[0_28px_80px_rgba(16,32,51,0.10)] sm:p-9 lg:p-10 xl:p-12">
            <div className="text-center text-[0.82rem] font-bold uppercase tracking-[0.16em] text-[#15803D] sm:text-sm">
              REVENUE CALCULATOR PREVIEW
            </div>

            <h3 className="mx-auto mt-4 max-w-[26rem] text-center text-[1.65rem] font-bold leading-[1.16] tracking-[-0.035em] text-[#102033] sm:text-[2rem]">
              4 common revenue leaks.
              <br />
              1 monthly estimate.
            </h3>

            <div className="relative mt-8 sm:mt-10">
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7 xl:gap-x-10">
                {leakTiles.map(({ label, Icon }) => (
                  <div key={label} className="relative flex min-h-[8rem] flex-col items-center justify-center rounded-[1.25rem] border border-[#E8DFD0] bg-[#FBF8F2] px-5 py-6 text-center shadow-[0_12px_30px_rgba(16,32,51,0.045)] sm:min-h-[8.5rem] sm:px-6 sm:after:absolute sm:after:left-1/2 sm:after:top-full sm:after:h-7 sm:after:w-px sm:after:-translate-x-1/2 sm:after:bg-[#15803D]/20">
                    <Icon />
                    <div className="mt-4 text-[1.08rem] font-bold leading-tight text-[#102033] sm:text-xl">{label}</div>
                  </div>
                ))}
              </div>
              <ConnectorLines />
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-[#15803D]/25 bg-[#EEF9F2] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] sm:flex sm:items-center sm:gap-5 sm:p-7 lg:gap-6">
              <div className="mb-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#15803D]/20 bg-white text-[#15803D] shadow-[0_14px_32px_rgba(21,128,61,0.13)] sm:mb-0 sm:h-16 sm:w-16">
                <IconCoin className="h-8 w-8" stroke={1.8} aria-hidden />
              </div>
              <div className="min-w-0">
                <div className="text-[0.98rem] font-bold leading-tight text-[#15803D] sm:text-[1.05rem]">Potential Monthly Revenue Being Held Back</div>
                <div className="mt-3 text-[2.05rem] font-bold leading-none tracking-[-0.04em] text-[#102033] sm:whitespace-nowrap sm:text-[2.2rem] lg:text-[2.28rem] xl:text-[2.35rem]">$3,000 to $25,000+</div>
                <p className="mt-4 max-w-[29rem] text-[0.98rem] leading-7 text-[#47566C] sm:text-[1.02rem]">
                  The calculator estimates your range based on the leaks that apply to your business.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <CTALink
                href={calculatorHref}
                kind="calculator"
                location="homepage_calculator_preview"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#15803D]/25 bg-[#EEF9F2] px-5 py-3 text-[1.05rem] font-bold text-[#15803D] shadow-[0_10px_24px_rgba(21,128,61,0.08)] transition hover:border-[#15803D]/40 hover:bg-[#DDF7E8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D]"
              >
                Open Calculator →
              </CTALink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ConnectorLines() {
  return (
    <div className="relative my-7 h-[5.25rem] sm:my-8 sm:h-[5.75rem]">
      <svg className="hidden h-full w-full sm:block" viewBox="0 0 640 104" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="calculatorConnector" x1="0" y1="0" x2="0" y2="104" gradientUnits="userSpaceOnUse">
            <stop stopColor="#15803D" stopOpacity="0.18" />
            <stop offset="1" stopColor="#15803D" stopOpacity="0.68" />
          </linearGradient>
        </defs>
        <path d="M114 0V26C114 38 124 48 136 48H282C303 48 320 65 320 86" stroke="url(#calculatorConnector)" strokeWidth="2.25" strokeLinecap="round" />
        <path d="M248 0V28C248 39 257 48 268 48H292C308 48 320 61 320 77" stroke="url(#calculatorConnector)" strokeWidth="2.25" strokeLinecap="round" />
        <path d="M392 0V28C392 39 383 48 372 48H348C332 48 320 61 320 77" stroke="url(#calculatorConnector)" strokeWidth="2.25" strokeLinecap="round" />
        <path d="M526 0V26C526 38 516 48 504 48H358C337 48 320 65 320 86" stroke="url(#calculatorConnector)" strokeWidth="2.25" strokeLinecap="round" />
        <path d="M320 70V99" stroke="#15803D" strokeOpacity="0.7" strokeWidth="2.25" strokeLinecap="round" />
        <path d="M311 91L320 100L329 91" stroke="#15803D" strokeOpacity="0.74" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="320" cy="58" r="4.5" fill="#15803D" fillOpacity="0.22" />
      </svg>
      <div className="mx-auto h-full w-px rounded-full bg-[#15803D]/35 sm:hidden" />
      <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-[#15803D]/70 sm:hidden" />
    </div>
  )
}

function DelayedInvoiceIcon() {
  return (
    <div className="relative h-14 w-14 text-[#15803D]" aria-hidden="true">
      <IconFileInvoice className="absolute inset-0 h-14 w-14" stroke={1.75} />
      <IconClockDollar className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[#FBF8F2] p-0.5" stroke={1.9} />
    </div>
  )
}

function DormantCustomersIcon() {
  return (
    <div className="relative h-14 w-14 text-[#15803D]" aria-hidden="true">
      <IconUserDollar className="absolute left-0 top-0.5 h-[3.25rem] w-[3.25rem]" stroke={1.75} />
      <IconRefresh className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-[#FBF8F2] p-0.5" stroke={1.9} />
    </div>
  )
}

function OpenEstimatesIcon() {
  return <IconFilePencil className="h-14 w-14 text-[#15803D]" stroke={1.75} aria-hidden />
}

function MissedCallsIcon() {
  return <IconPhoneX className="h-14 w-14 text-[#15803D]" stroke={1.75} aria-hidden />
}
