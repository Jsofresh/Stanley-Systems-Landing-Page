import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

export const metadata: Metadata = {
  title: "Systems Installation Sprint | Stanley Systems",
  description: "Turn the Cash Flow Assessment into approved workflows, reminders, handoffs, templates, tracking, documentation, and tool setup.",
  alternates: { canonical: "https://stanley-systems.com/systems-installation-sprint" },
}

const process = [
  ["1", "Start with the Cash Flow Assessment", "We look at where work, money, customers, and follow-up move through the business."],
  ["2", "Choose what you want installed", "You approve the Sprint scope before anything is built."],
  ["3", "Stanley Systems builds the approved system", "Workflows, reminders, handoffs, templates, tracking, and documentation get installed around your real business process."],
  ["4", "Test, launch, and hand off", "The system gets checked before your business runs it."],
]

const installedItems = [
  ["Cashflow Control", "Billing handoffs, invoice readiness, payment follow-up, and owner visibility installed around the tools your team already uses."],
  ["Repeat Revenue", "Past-customer follow-up, review asks, referral asks, private feedback routing, and missed-call recovery installed as a dependable workflow."],
  ["Scoped workflow pieces", "When your assessment points to a narrower gap, Stanley Systems can install the specific reminders, templates, handoffs, and tracking your business needs."],
]

const timeline = [
  ["Assessment completed", "We find the highest-cost workflow to fix first."],
  ["Scope approved", "You approve what gets installed before the build starts."],
  ["Sprint installed and handed off", "Stanley Systems builds, tests, and hands off the workflow so your team can use it."],
]

export default function SystemsInstallationSprintPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
        <section data-section="sprint-hero" className="relative overflow-hidden pb-10 pt-32 sm:pb-14 lg:pt-36">
          <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_70%)]" aria-hidden="true" />
          <div className={`${shell} relative grid gap-8 lg:grid-cols-[0.98fr_0.82fr] lg:items-center`}>
            <div>
              <h1 className="max-w-5xl text-[2.1rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.25rem] lg:text-[4.05rem]">
                Get Customer Requests, Invoices, Final Bills, 5 Star Reviews, and Referrals Instantly
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#334B60] sm:text-xl">
                The Cash Flow Assessment helps shape the Sprint. Then Stanley Systems installs the approved mix of workflows your business needs — from billing and customer requests to reviews, referrals, repeat work, and team visibility.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/contact?path=pre-buy" className={lightButton}>Ask us a question</Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[560px] drop-shadow-[0_26px_54px_rgba(7,29,58,0.10)]">
              <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(251,252,247,0.95),rgba(251,252,247,0)_68%)] blur-2xl" aria-hidden="true" />
              <Image src="/preview/images/uploaded/2026-05-25-jaden/office-software-workflow-automation-setup.jpg" alt="Office software workflow automation setup for a Systems Installation Sprint." width={1280} height={960} priority sizes="(min-width: 1024px) 38vw, 100vw" className="relative mx-auto h-auto max-h-[620px] w-full rounded-[1.2rem] object-contain" />
            </div>
          </div>
        </section>

        <section data-section="sprint-builds" className="bg-white py-12 sm:py-14">
          <div className={`${shell} grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-center`}>
            <div>
              <h2 className="text-[2.05rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Built for service businesses that want the office side to run as clean as the field work.</h2>
              <p className="mt-5 text-base font-semibold leading-7 text-[#536173] sm:text-lg">Your team already knows how to do the work. The Sprint installs the office-side system that keeps the request, job, invoice, follow-up, and visibility from depending on memory.</p>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {process.map(([number, title, body]) => <li key={title} className="rounded-[1.15rem] border border-[#DDEBE2] bg-[#FBFCF7] p-4 text-sm font-bold leading-6 text-[#334B60]"><span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-full bg-[#E7F7EB] text-xs font-black text-[#116832]">{number}</span><span className="text-[#102033]">{title}</span><p className="mt-2 font-semibold text-[#536173]">{body}</p></li>)}
            </ol>
          </div>
        </section>

        <section data-section="sprint-finished-output" className="bg-[#F4FBF5] py-12 sm:py-14">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">What Gets Installed for Your Business</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Stanley Systems installs the Repeat Revenue System, Cashflow Control System, both, or the specific pieces your business needs directly into your existing workflows. Your team keeps using the tools it already knows; the work just moves with fewer misses.</p>
            </div>
            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {installedItems.map(([title, body]) => <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_12px_30px_rgba(7,29,58,0.04)]"><h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">{title}</h3><p className="mt-4 text-sm font-semibold leading-6 text-[#536173]">{body}</p></article>)}
            </div>
          </div>
        </section>

        <section data-section="sprint-pricing" className="relative overflow-hidden bg-[#FBFCF7] py-14 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(83,217,134,0.18),transparent_35%)]" />
          <div className={`${shell} relative`}>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.3rem] border border-[#9ED9B2] bg-white shadow-[0_30px_100px_rgba(7,29,58,0.14)]">
              <div className="bg-[#071422] px-6 py-5 text-white sm:px-8"><p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#53D986]">Build phase</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Systems Installation Sprint</h2></div>
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div><p className="text-[4rem] font-semibold leading-none tracking-[-0.07em] text-[#071D3A]">$1,500</p><p className="mt-3 text-base font-extrabold text-[#116832]">One focused installation sprint after the Cash Flow Assessment.</p></div>
                <div><p className="text-base font-semibold leading-7 text-[#536173]">Includes scoped workflow buildout, reminders, handoffs, templates, tracking, testing, documentation, and handoff around the approved business process.</p><p className="mt-4 rounded-2xl border border-[#CFE8D5] bg-[#F4FBF5] p-4 text-sm font-extrabold leading-6 text-[#116832]">Your Cash Flow Assessment can count as a $194 credit toward the Sprint.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/contact?path=pre-buy" className={lightButton}>Ask us a question</Link></div></div>
              </div>
            </div>
          </div>
        </section>

        <section data-section="sprint-timeline" className="bg-white py-12 sm:py-14">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center"><h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Timeline</h2><p className="mt-4 text-xl font-semibold leading-8 text-[#334B60]">Most Installation Sprints take 1–2 weeks after the Cash Flow Assessment.</p></div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">{timeline.map(([title, body], index) => <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 shadow-[0_12px_30px_rgba(7,29,58,0.04)]"><span className="inline-grid h-9 w-9 place-items-center rounded-full bg-[#15803D] text-sm font-black text-white">{index + 1}</span><h3 className="mt-4 text-xl font-semibold tracking-[-0.035em] text-[#102033]">{title}</h3><p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{body}</p></article>)}</div>
            <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#DDEBE2] bg-white p-4 text-center text-sm font-semibold leading-6 text-[#536173]">The timeline depends on scope, tools, and how fast access or examples are provided.</p>
          </div>
        </section>

        <section data-section="sprint-final-cta" className="bg-[#071422] py-14 text-white sm:py-16" data-nav-theme="dark"><div className={`${shell} text-center`}><h2 className="mx-auto max-w-4xl text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl">Ready to see what should be installed first?</h2><p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-white/72 sm:text-lg">Start with the Cash Flow Assessment. If the Sprint is right, Stanley Systems can build from that plan.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/contact?path=pre-buy" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/12">Ask us a question</Link></div></div></section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
