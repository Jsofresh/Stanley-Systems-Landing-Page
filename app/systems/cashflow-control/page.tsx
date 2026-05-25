import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { FadedImage } from "@/components/faded-image"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"

export const metadata: Metadata = {
  title: "Cashflow Control | Stanley Systems",
  description: "Cashflow Control helps service businesses move customer intake, job handoffs, billing, payment follow-up, and collected cash faster.",
  alternates: { canonical: "https://stanley-systems.com/systems/cashflow-control" },
}

const automations = [
  ["Job detail checks", "Catch missing notes, photos, approvals, and billing details before they stall the invoice."],
  ["Billing-ready alerts", "Show the office which jobs can be invoiced now and which ones need attention."],
  ["Invoice movement", "Keep completed work moving toward billing instead of sitting in office memory."],
  ["Payment follow-up", "Keep open balances visible until the next follow-up is owned."],
  ["Owner visibility", "Show what is stuck, who owns it, and what needs attention."],
  ["Shop-specific fixes", "Fix the gaps that show up in your office, your software, and your team’s process."],
]

function CashflowHeroVisual() {
  return (
    <FadedImage
      src="/preview/images/uploaded/2026-05-25-jaden/cashflow-control-job-to-cash.jpg"
      alt="Cashflow Control job-to-cash workflow showing a customer request moving to job details, invoice, payment follow-up, and collected cash."
      width={1254}
      height={1254}
      priority
      sizes="(min-width: 1024px) 42vw, 100vw"
      fadeColor="#FBFCF7"
      fadeSize="5%"
      outerFade
      outerFadeColor="rgba(251,252,247,0.9)"
      wrapperClassName="relative mx-auto hidden w-full max-w-[560px] transition duration-300 hover:-translate-y-1 hover:scale-[1.015] lg:block lg:max-w-[640px] drop-shadow-[0_20px_48px_rgba(7,29,58,0.10)]"
    />
  )
}

function BuildImage() {
  return (
    <div className="relative mx-auto hidden w-full max-w-[760px] drop-shadow-[0_26px_54px_rgba(7,29,58,0.10)] lg:block">
      <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(244,251,245,0.92),rgba(244,251,245,0)_68%)] blur-2xl" aria-hidden="true" />
      <Image src="/preview/images/uploaded/2026-05-25-jaden/job-details-bill-readiness-unpaid-invoices-exception-routing.jpg" alt="Cashflow Control workflow showing job details, bill readiness, unpaid invoices, and exception routing." width={1280} height={960} sizes="(min-width: 1024px) 52vw, 100vw" className="relative h-auto w-full rounded-[1.2rem] object-contain" />
    </div>
  )
}

export default function SystemPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A]">
        <section data-section="cashflow-hero" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#FBFCF7] pb-12 pt-[7.5rem] sm:pb-16 lg:pt-[8rem]">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
          <div className={`${shell} relative grid w-full gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
            <div>
              <h1 className="max-w-4xl text-[2.1rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.1rem] lg:text-[3.7rem]">Turn finished work into collected cash faster</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60] sm:text-xl">Cashflow Control keeps customer requests, job details, invoices, and payment follow-up moving so finished work turns into collected cash faster.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/systems-installation-sprint" className="inline-flex min-h-12 items-center justify-center rounded-full px-2 text-sm font-extrabold text-[#116832] underline decoration-[#9ed9b2] underline-offset-4 transition hover:text-[#071D3A]">See how the Sprint works</Link>
              </div>
            </div>
            <CashflowHeroVisual />
          </div>
        </section>

        <section data-section="cashflow-systems" className="flex min-h-[100svh] items-center bg-white py-14 sm:py-16">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Find what is slowing your money down. Pick the pieces that fix it.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Every shop leaks cash in a different place. Some jobs stall before billing. Some invoices go out late. Some balances never get followed up. Stanley Systems helps identify the gaps, then builds the pieces that keep the next step moving.</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {automations.map((item) => <article key={item[0]} className="rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white"><h3 className="text-xl font-semibold tracking-[-0.025em] text-[#102033]">{item[0]}</h3><p className="mt-3 text-sm leading-6 text-[#536173]">{item[1]}</p></article>)}
            </div>
          </div>
        </section>

        <section data-section="cashflow-sprint-build" className="flex min-h-[100svh] items-center bg-[#F4FBF5] py-14 sm:py-16">
          <div className={`${shell} grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center`}>
            <div>
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">How Cashflow Control gets built</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Stanley Systems builds the workflow around your real job process: job details get captured, billing readiness becomes visible, unpaid invoices stay in view, and exceptions route to the right person before cash gets stuck.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link></div>
            </div>
            <BuildImage />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
