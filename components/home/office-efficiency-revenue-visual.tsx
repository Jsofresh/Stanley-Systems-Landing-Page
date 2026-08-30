"use client"

import Image from "next/image"

export function OfficeEfficiencyRevenueVisual() {
  return (
    <div className="group relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#071422] text-white shadow-[0_32px_90px_rgba(7,29,58,.2)]">
      <Image
        src="/images/uploaded/homepage/ai-office/office-team-workspace.jpg"
        alt="Service-business office workspace with job records, billing work, and a team coordinating from one shared office"
        fill
        priority
        sizes="(min-width: 1024px) 92vw, 100vw"
        className="object-cover object-[68%_center] opacity-60 transition duration-700 group-hover:scale-[1.015]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,.96)_38%,rgba(7,20,34,.66)_72%,rgba(7,20,34,.74)_100%)]" />

      <div className="relative grid min-h-[560px] items-center gap-10 px-7 py-10 sm:px-11 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-16">
        <h2 className="max-w-[720px] font-bold tracking-[-0.045em]">
          <span className="mb-3 block text-2xl uppercase tracking-[.08em] text-white/68">Up to</span>
          <span className="block text-[clamp(7.5rem,14vw,12rem)] leading-[0.72] text-[#53D986]">520</span>
          <span className="mt-8 block max-w-[11ch] text-4xl leading-[0.95] sm:text-6xl lg:text-[4.6rem]">
            hours reclaimed every year.
          </span>
        </h2>

        <div className="border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
          <p className="text-[clamp(4rem,7vw,6.6rem)] font-bold leading-[0.8] tracking-[-0.055em] text-white">$60,000</p>
          <p className="mt-7 max-w-[15ch] text-3xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-4xl">
            roughly the cost of another office hire. Start by multiplying the team you already have.
          </p>
          <p className="mt-7 max-w-[34rem] text-lg font-semibold leading-relaxed text-white/72 sm:text-xl">
            Reclaim up to 520 hours before adding another role. More leverage, not fewer people.
          </p>
        </div>
      </div>
    </div>
  )
}
