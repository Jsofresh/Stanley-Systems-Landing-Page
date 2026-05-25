import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

export const metadata: Metadata = {
  title: "About Stanley Systems | Founder-Led Diagnosis and Hands-On Build",
  description: "Stanley Systems helps service businesses find office-side cash, billing, follow-up, review, referral, and repeat-customer leaks before building the systems that fix them.",
  alternates: { canonical: "https://stanley-systems.com/about" },
}

const reasons = [
  "Service businesses lose money between tools, handoffs, and busy people.",
  "Billing slows down when field details, approvals, invoices, and payment follow-up are not connected.",
  "Reviews, referrals, and past-customer follow-up disappear when they depend on memory.",
]

const credibility = [
  "Founder-led diagnosis, not a call center intake process.",
  "Operator judgment from building real workflows, not just describing them.",
  "Coding ability to turn the approved fix into working reminders, handoffs, templates, tracking, and tool setup.",
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
        <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 lg:pt-36">
          <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.14),rgba(251,252,247,0)_70%)]" aria-hidden="true" />
          <div className={`${shell} relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center`}>
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#15803D]">About Stanley Systems</p>
              <h1 className="mt-4 max-w-5xl text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.4rem] lg:text-[4.35rem]">
                Founder-led diagnosis. Hands-on build.
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-[#334B60] sm:text-xl">
                Stanley Systems exists because service businesses do good work in the field, then lose money in the office side: late invoices, weak handoffs, missed follow-up, quiet review gaps, forgotten referrals, and past customers nobody contacts again.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/invoicing-delay-cash-flow-calculator" className={lightButton}>Run the free calculator</Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_22px_70px_rgba(7,29,58,0.08)] sm:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Why assessment comes before build</h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">
                A business does not need another random automation installed on top of a messy process. It needs the money path diagnosed first, then the right workflow installed around how the team actually works.
              </p>
              <div className="mt-6 grid gap-3">
                {credibility.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-[#DDEBE2] bg-[#F4FBF5] p-4 text-sm font-bold leading-6 text-[#334B60]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className={`${shell} grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start`}>
            <div>
              <h2 className="text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Why Stanley Systems exists</h2>
              <p className="mt-5 text-base font-semibold leading-7 text-[#536173] sm:text-lg">
                Service businesses usually already have software. The problem is that the tools do not automatically create a clean office process. Stanley Systems finds the gaps between the tools, the team, and the customer, then builds the workflow that keeps money moving.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
              {reasons.map((item) => (
                <article key={item} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
                  <p className="text-base font-extrabold leading-7 text-[#102033]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#071422] py-14 text-white sm:py-16" data-nav-theme="dark">
          <div className={`${shell} text-center`}>
            <h2 className="mx-auto max-w-4xl text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl">If you want the fix, start by finding the leak.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-white/72 sm:text-lg">The Cash Flow Assessment maps where office-side money is getting stuck, what each issue likely costs, and what to fix first.</p>
            <div className="mt-7 flex justify-center">
              <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
