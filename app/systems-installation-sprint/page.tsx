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
  title: "Systems Installation Sprint | Stanley Systems",
  description: "Turn the Cash Flow Assessment into working systems for cash, follow-up, reviews, referrals, repeat work, and office handoffs.",
  alternates: { canonical: "https://stanley-systems.com/systems-installation-sprint" },
}

const buildCards = [
  {
    title: "Cashflow Control can include:",
    items: ["Customer request/intake handoffs", "Job detail checks", "Billing-ready alerts", "Invoice movement", "Payment follow-up", "Owner/manager visibility"],
  },
  {
    title: "Repeat Revenue can include:",
    items: ["Missed-call recovery", "Past-customer follow-up", "Review asks", "Referral asks", "Private feedback routing", "Repeat-work reminders"],
  },
  {
    title: "Custom/specific build scope can include:",
    items: ["Shop-specific handoffs", "Tool-specific workflows", "Process gaps found in the assessment", "Additional systems by agreement"],
  },
]

const included = ["Sprint plan from the assessment", "Build of agreed systems", "Tool/workflow setup", "Handoff rules", "Testing", "Documentation", "Launch review", "Optional Monthly Control recommendation"]

export default function SystemsInstallationSprintPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
        <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 lg:pt-36">
          <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_70%)]" aria-hidden="true" />
          <div className={`${shell} relative grid gap-9 lg:grid-cols-[1fr_0.82fr] lg:items-center`}>
            <div>
              <h1 className="max-w-5xl text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.4rem] lg:text-[4.35rem]">
                Turn the Cash Flow Assessment into working systems.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#334B60] sm:text-xl">
                The assessment shows what is broken, what it costs, and what should change. The Systems Installation Sprint is where Stanley Systems builds the systems your business chooses to put in place.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/contact?path=pre-buy" className={lightButton}>Ask us a question</Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#BFE4C8] bg-white p-6 shadow-[0_24px_70px_rgba(21,128,61,0.12)] sm:p-8">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#102033]">Systems Installation Sprint starts at $1,500.</h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">The final scope depends on what the assessment finds and what the business chooses to build.</p>
              <p className="mt-4 rounded-2xl bg-[#F4FBF5] p-4 text-sm font-extrabold leading-6 text-[#116832]">Your Cash Flow Assessment can count as a $194 credit toward the Sprint.</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">The Sprint can include Cashflow Control, Repeat Revenue, or both.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Every business has a different mix of cash, customer, follow-up, and office handoff problems. The Sprint is scoped around what the assessment finds and what the business chooses to build.</p>
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {buildCards.map((card) => (
                <article key={card.title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">{card.title}</h3>
                  <ul className="mt-4 grid gap-2 text-sm font-semibold leading-6 text-[#536173]">
                    {card.items.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" />{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4FBF5] py-14 sm:py-16">
          <div className={`${shell} grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start`}>
            <div>
              <h2 className="text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">What is included</h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {included.map((item) => <div key={item} className="rounded-2xl border border-[#DDEBE2] bg-white p-4 text-sm font-extrabold leading-6 text-[#334B60] shadow-[0_10px_24px_rgba(7,29,58,0.035)]">{item}</div>)}
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_52px_rgba(7,29,58,0.06)]">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#102033]">What it is not</h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">The Sprint is not a vague consulting call, a cheap automation bundle, or a one-step fix. It is the implementation period where Stanley Systems builds the agreed systems after the assessment.</p>
            </div>
          </div>
        </section>

        <section className="bg-[#071422] py-14 text-white sm:py-16" data-nav-theme="dark">
          <div className={`${shell} text-center`}>
            <h2 className="mx-auto max-w-4xl text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl">Ready to map the leaks first?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-white/72 sm:text-lg">Start with the Cash Flow Assessment. If you want Stanley Systems to install the systems instead of doing it yourself, the Sprint is the next step.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/contact?path=pre-buy" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/12">Ask us a question</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
