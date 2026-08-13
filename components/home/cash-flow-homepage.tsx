"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpenText, ClipboardCheck, MessageCircleMore, ReceiptText } from "lucide-react"

import { AdminDragVisual } from "@/components/home/admin-drag-visual"
import { OfficeEfficiencyRevenueVisual } from "@/components/home/office-efficiency-revenue-visual"

const primaryCta = "inline-flex min-h-[66px] items-center justify-center whitespace-nowrap rounded-full bg-[#15803D] px-9 py-5 text-[1.05rem] font-extrabold leading-none text-white shadow-[0_22px_52px_rgba(10,85,38,.28)] transition hover:-translate-y-1 hover:bg-[#116832] hover:shadow-[0_30px_62px_rgba(10,85,38,.38)] focus:outline-none focus:ring-2 focus:ring-[#53D986] focus:ring-offset-2"
const secondaryCta = "inline-flex min-h-[66px] items-center justify-center whitespace-nowrap rounded-full border border-[#0B3B60]/20 bg-white px-9 py-5 text-[1.05rem] font-extrabold leading-none text-[#0B3B60] shadow-[0_18px_40px_rgba(7,29,58,.08)] transition hover:-translate-y-1 hover:border-[#15803D]/45 hover:text-[#116832] hover:shadow-[0_24px_48px_rgba(7,29,58,.14)] focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2"

const proofCards = [
  {
    metric: "10 → 1",
    metricLabel: "manual steps",
    body: "One mapped billing handoff.",
  },
  {
    metric: "$60,000",
    metricLabel: "office hire you may delay",
    body: "Use current staff capacity before adding another salary.",
  },
  {
    metric: "520",
    metricLabel: "hours reclaimed a year",
    body: "Ten repeat-admin hours a week returned to higher-value work.",
  },
]

const workflowExamples = [
  {
    title: "Billing handoff",
    metric: "18 completed jobs",
    before: "5 closeouts missing details",
    after: "Invoice-ready summaries prepared",
    Icon: ReceiptText,
  },
  {
    title: "Customer follow-up",
    metric: "24 open estimates",
    before: "9 untouched for 7+ days",
    after: "Next follow-up ready for approval",
    Icon: MessageCircleMore,
  },
  {
    title: "Record cleanup",
    metric: "42 records checked",
    before: "11 contact or status conflicts",
    after: "One clean exception queue",
    Icon: ClipboardCheck,
  },
  {
    title: "Office answers",
    metric: "6 repeat questions",
    before: "Owner interrupted again",
    after: "Source-backed answers prepared",
    Icon: BookOpenText,
  },
]

export function CashFlowHomepage() {
  return (
    <div className="overflow-hidden bg-[#F7F4ED] text-[#0B3B60]">
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <h2 className="mx-auto max-w-[1140px] text-center text-4xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5.25rem]">
            Move more work from customer requests to <span className="text-[#15803D]">collected cash.</span>
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {proofCards.map((card) => (
              <article key={card.metricLabel} className="group relative min-h-[330px] overflow-hidden rounded-[2rem] border border-[#0B3B60]/12 bg-white px-7 py-9 text-center shadow-[0_22px_58px_rgba(7,29,58,.08)] transition duration-500 hover:-translate-y-3 hover:border-[#15803D]/38 hover:shadow-[0_34px_75px_rgba(7,29,58,.17)] sm:px-9 sm:py-10">
                <div aria-hidden="true" className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#53D986]/12 blur-3xl transition duration-500 group-hover:scale-125 group-hover:bg-[#53D986]/20" />
                <div className="relative flex min-h-[250px] flex-col items-center justify-center">
                  <h3 className="whitespace-nowrap text-center text-[clamp(3.5rem,5vw,5.2rem)] font-black tabular-nums leading-[0.88] tracking-[-0.07em] text-[#15803D]">{card.metric}</h3>
                  <p className="mt-6 max-w-[12ch] text-center text-[1.85rem] font-extrabold leading-[0.98] tracking-[-0.035em] text-[#0B3B60] sm:text-[2.1rem]">{card.metricLabel}</p>
                  <p className="mt-5 max-w-[29ch] text-center text-base font-semibold leading-7 text-[#36536C] sm:text-lg">{card.body}</p>
                </div>
                <span aria-hidden="true" className="absolute inset-x-8 bottom-0 h-1 origin-left scale-x-0 rounded-full bg-[#15803D] transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EDE7DA] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="max-w-[1120px]">
            <h2 className="text-4xl font-bold leading-[0.99] tracking-[-0.04em] sm:text-6xl lg:text-[4.75rem]">
              Turn recovered office hours into <span className="text-[#15803D]">faster billing and more won work.</span>
            </h2>
            <p className="mt-7 max-w-[820px] text-xl font-semibold leading-relaxed text-[#36536C] sm:text-2xl">
              Remove repeat admin. Return that time to invoices, estimates, and customers.
            </p>
          </div>
          <div className="mt-14">
            <OfficeEfficiencyRevenueVisual />
          </div>
        </div>
      </section>

      <section className="relative bg-[#071422] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div aria-hidden="true" className="absolute left-[-12rem] top-[20%] h-[30rem] w-[30rem] rounded-full bg-[#15803D]/15 blur-[110px]" />
        <div className="relative mx-auto grid max-w-[92rem] items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-4xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.7rem]">
              Calculate your <span className="text-[#EF4444]">office drag</span> before you hire again.
            </h2>
            <p className="mt-8 max-w-[620px] text-xl font-medium leading-relaxed text-white/72 sm:text-2xl">
              Estimate how many hours and payroll dollars repeat admin work is consuming, then see the bottleneck creating the most drag.
            </p>
            <Link href="/ai-office-capacity-calculator" className={`${primaryCta} mt-10 focus:ring-offset-[#071422]`}>
              Calculate Your Admin Drag <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
            </Link>
          </div>
          <AdminDragVisual />
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <h2 className="max-w-[1100px] text-4xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5rem]">
              Stanley Systems installs AI where <span className="text-[#15803D]">office work</span> actually happens.
            </h2>
            <Link href="/ai-office-command-map" className={secondaryCta}>
              Start With the Office Map <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
            </Link>
          </div>
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-[#0B3B60]/12 bg-white shadow-[0_24px_64px_rgba(7,29,58,.08)]">
            {workflowExamples.map(({ title, metric, before, after, Icon }) => (
              <article key={title} aria-label={title} className="group grid gap-5 border-b border-[#0B3B60]/10 px-7 py-8 transition duration-300 last:border-b-0 hover:bg-[#F4F1E9] sm:px-9 sm:py-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)_3rem_minmax(0,1.15fr)] lg:items-center lg:gap-7">
                <div className="flex items-center gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#15803D]/18 bg-[#E3F4E8] text-[#15803D] transition duration-300 group-hover:bg-[#15803D] group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-3xl font-black leading-[0.96] tracking-[-0.04em] text-[#0B3B60] sm:text-[2.35rem]">{metric}</p>
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)] items-center gap-3 lg:contents">
                  <p className="text-base font-bold leading-6 text-[#87564F] sm:text-lg sm:leading-7">{before}</p>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#15803D] text-white">
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-base font-extrabold leading-6 text-[#116832] sm:text-xl sm:leading-7">{after}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B3B60] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <h2 className="mx-auto max-w-[1200px] text-center text-4xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[5.2rem]">
            Get a working <span className="text-[#53D986]">AI Office</span> used by your team.
          </h2>
          <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div className="group relative aspect-video overflow-hidden rounded-[2.25rem] border border-white/12 shadow-[0_34px_90px_rgba(0,0,0,.34)] lg:aspect-auto lg:min-h-[520px]">
              <Image src="/images/uploaded/homepage/ai-office/service-owner-office-admin-shot.jpg" alt="Service business owner reviewing office documents at a laptop" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-center transition duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071422]/55 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center rounded-[2.25rem] border border-white/14 bg-white/[0.07] p-7 shadow-[0_28px_72px_rgba(0,0,0,.2)] backdrop-blur-sm sm:p-10">
              <p className="text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">AI Office Installation Sprint</p>
              <div className="mt-8 space-y-4">
                {["Working workflows built around your current software", "Staff trained inside real office work", "30-day managed launch and support"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-4 text-lg font-bold text-white/90 transition hover:translate-x-1 hover:border-[#53D986]/45 hover:bg-[#53D986]/10 sm:text-xl">{item}</div>
                ))}
              </div>
              <div className="mt-8 border-t border-white/14 pt-8">
                <p className="text-2xl font-extrabold">Starting at $3,500</p>
                <p className="mt-3 text-lg font-medium leading-relaxed text-white/68">AI Office Ops starts at $500/month after launch when ongoing management fits the scope.</p>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/systems-installation-sprint" className={`${primaryCta} w-full focus:ring-offset-[#0B3B60]`}>
                  Apply for Installation <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
                </Link>
                <Link href="/ai-office-command-map" className="inline-flex min-h-[66px] w-full items-center justify-center whitespace-nowrap rounded-full border border-white/28 bg-white/10 px-8 py-5 text-[1.05rem] font-extrabold leading-none text-white transition hover:-translate-y-1 hover:border-[#53D986]/70 hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-[#53D986] focus:ring-offset-2 focus:ring-offset-[#0B3B60]">
                  Start With the Office Map <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
