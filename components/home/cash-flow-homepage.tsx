"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AdminDragVisual } from "@/components/home/admin-drag-visual"
import { OfficeEfficiencyRevenueVisual } from "@/components/home/office-efficiency-revenue-visual"

const primaryCta = "inline-flex min-h-[64px] items-center justify-center whitespace-nowrap rounded-full bg-[#15803D] px-9 py-[1.125rem] text-[1.05rem] font-extrabold leading-none text-white shadow-[0_20px_48px_rgba(10,85,38,.28)] transition hover:-translate-y-1 hover:bg-[#116832] hover:shadow-[0_28px_58px_rgba(10,85,38,.38)] focus:outline-none focus:ring-2 focus:ring-[#53D986] focus:ring-offset-2"

export function CashFlowHomepage() {
  return (
    <div className="overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
      <section className="flex min-h-[calc(100svh-96px)] items-center px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto w-full max-w-[92rem]">
          <OfficeEfficiencyRevenueVisual />
        </div>
      </section>

      <section className="relative flex min-h-[calc(100svh-96px)] items-center bg-[#071422] px-5 py-16 text-white sm:px-8 lg:px-12">
        <div aria-hidden="true" className="absolute left-[-12rem] top-[20%] h-[30rem] w-[30rem] rounded-full bg-[#15803D]/15 blur-[110px]" />
        <div className="relative mx-auto grid w-full max-w-[92rem] items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            <h2 className="text-4xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.65rem]">
              Find the office drag your team should not have to carry.
            </h2>
            <p className="mt-7 max-w-[560px] text-xl font-medium leading-relaxed text-white/72 sm:text-2xl">
              See which repeat office work is consuming the most hours and payroll.
            </p>
            <Link href="/ai-office-capacity-calculator" className={`${primaryCta} mt-9 focus:ring-offset-[#071422]`}>
              Calculate Your Admin Drag <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
            </Link>
          </div>
          <AdminDragVisual />
        </div>
      </section>

      <section className="flex min-h-[calc(100svh-96px)] items-center px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-[92rem] items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            <h2 className="max-w-[760px] text-4xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.7rem]">
              Put AI where <span className="text-[#15803D]">office work</span> actually happens.
            </h2>
            <p className="mt-7 max-w-[560px] text-xl font-semibold leading-relaxed text-[#536173] sm:text-2xl">
              One handoff connects completed work to billing, follow-up, and clean records.
            </p>
            <Link href="/ai-office-command-map" className={`${primaryCta} mt-9`}>
              Start With the Office Map <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
            </Link>
          </div>

          <div className="group relative min-h-[500px] overflow-hidden rounded-[2rem] border border-[#D5E5DA] bg-white shadow-[0_28px_80px_rgba(7,29,58,.12)]">
            <Image
              src="/images/uploaded/homepage/ai-office/office-desk-invoice-checklist-highvis.jpg"
              alt="Field-service office desk with job paperwork, invoice files, and a completed workflow checklist"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[62%_center] transition duration-700 group-hover:scale-[1.015]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071422]/88 via-transparent to-transparent" />
            <p className="absolute inset-x-7 bottom-7 text-2xl font-bold leading-tight tracking-[-0.025em] text-white sm:inset-x-9 sm:bottom-9 sm:text-3xl">
              Job complete → bill ready → follow-up queued.
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-h-[calc(100svh-96px)] items-center bg-[#0B3B60] px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-[92rem] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <h2 className="max-w-[780px] text-4xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.8rem]">
              A working <span className="text-[#53D986]">AI Office</span>, used by your team.
            </h2>
            <p className="mt-7 max-w-[570px] text-xl font-medium leading-relaxed text-white/72 sm:text-2xl">
              We build around your software, train your staff, and manage the launch.
            </p>

            <div className="mt-8 border-y border-white/16 py-6">
              <p className="text-3xl font-bold tracking-[-0.025em]">Installation Sprint — $3,500 one time</p>
              <p className="mt-2 text-lg font-semibold text-white/65">AI Office Ops — $500/month after the included first 30 days.</p>
            </div>

            <div className="mt-9 flex flex-col items-start gap-5">
              <Link href="/systems-installation-sprint" className={`${primaryCta} focus:ring-offset-[#0B3B60]`}>
                Apply for Installation <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
              </Link>
              <Link href="/ai-office-command-map" className="inline-flex items-center text-lg font-extrabold text-white underline decoration-white/35 underline-offset-8 transition hover:text-[#8DF3A4] hover:decoration-[#8DF3A4] focus:outline-none focus:ring-2 focus:ring-[#53D986] focus:ring-offset-4 focus:ring-offset-[#0B3B60]">
                Start with the Office Map <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="group relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/12 shadow-[0_34px_90px_rgba(0,0,0,.3)]">
            <Image
              src="/images/uploaded/homepage/ai-office/service-owner-office-admin-shot.jpg"
              alt="Service business owner reviewing office documents at a laptop"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center transition duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071422]/28 via-transparent to-transparent" />
          </div>
        </div>
      </section>
    </div>
  )
}
