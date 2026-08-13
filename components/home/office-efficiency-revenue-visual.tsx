"use client"

import Image from "next/image"
import { ArrowRight, FileCheck2, MessageCircleMore, ReceiptText } from "lucide-react"

const recoveredTimeMovesTo = [
  {
    icon: ReceiptText,
    title: "Billing",
    detail: "Closeout gaps found. Invoice-ready summaries prepared.",
  },
  {
    icon: MessageCircleMore,
    title: "Estimate follow-up",
    detail: "Aged opportunities ranked. Next messages ready for approval.",
  },
  {
    icon: FileCheck2,
    title: "Record exceptions",
    detail: "Only incomplete or conflicting records reach staff.",
  },
]

export function OfficeEfficiencyRevenueVisual() {
  return (
    <div className="overflow-hidden rounded-[2.35rem] border border-[#0B3B60]/12 bg-white shadow-[0_34px_90px_rgba(7,29,58,.18)]">
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="group relative min-h-[430px] overflow-hidden border-b border-[#0B3B60]/10 lg:min-h-[590px] lg:border-b-0 lg:border-r">
          <Image
            src="/images/uploaded/homepage/ai-office/office-team-workspace.jpg"
            alt="Field-service office workspace with job board, customer records, and billing desk"
            fill
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover object-[72%_center] transition duration-700 group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/8" />
          <div className="relative flex min-h-[430px] max-w-[30rem] flex-col justify-end px-7 py-9 sm:px-10 sm:py-12 lg:min-h-[590px] lg:justify-center lg:px-12">
            <p className="text-[clamp(6.5rem,11vw,10rem)] font-black tabular-nums leading-[0.72] tracking-[-0.085em] text-[#15803D]">520</p>
            <p className="mt-7 max-w-[10ch] text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[#0B3B60] sm:text-5xl">hours reclaimed a year</p>
            <p className="mt-6 max-w-[24ch] text-lg font-extrabold leading-7 text-[#36536C]">Ten repeat-admin hours a week, redirected into work that moves revenue.</p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-7 py-9 sm:px-10 sm:py-12 lg:px-12">
          <p className="max-w-[15ch] text-3xl font-extrabold leading-[1.02] tracking-[-0.035em] text-[#0B3B60] sm:text-4xl">Put those hours where revenue moves.</p>
          <div className="mt-8 divide-y divide-[#0B3B60]/10 border-y border-[#0B3B60]/10">
            {recoveredTimeMovesTo.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="group/row grid grid-cols-[3.25rem_1fr] gap-4 py-6 sm:grid-cols-[3.5rem_0.72fr_1.28fr] sm:items-center sm:gap-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E3F4E8] text-[#15803D] transition duration-300 group-hover/row:bg-[#15803D] group-hover/row:text-white sm:h-14 sm:w-14">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="text-xl font-extrabold leading-tight tracking-[-0.02em] text-[#0B3B60] sm:text-2xl">{title}</p>
                <p className="col-start-2 text-base font-semibold leading-7 text-[#52697D] sm:col-start-auto sm:text-lg">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 bg-[#0B3B60] px-7 py-6 text-white sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:px-10">
        <p className="font-extrabold">Less searching and retyping</p>
        <ArrowRight className="hidden h-5 w-5 text-[#8DF3A4] sm:block" aria-hidden="true" />
        <p className="font-extrabold">More billing and follow-up</p>
        <ArrowRight className="hidden h-5 w-5 text-[#8DF3A4] sm:block" aria-hidden="true" />
        <p className="font-extrabold text-[#8DF3A4]">Cash moves sooner</p>
      </div>
    </div>
  )
}
