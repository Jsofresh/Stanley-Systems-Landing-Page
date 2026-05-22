import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

export const metadata: Metadata = {
  title: "Cashflow Control | Stanley Systems",
  description: "Cashflow Control helps service businesses move finished work toward invoices, payment follow-up, and collected cash faster.",
  alternates: { canonical: "https://stanley-systems.com/systems/cashflow-control" },
}

const automations = [["Job detail checks", "Flag missing job notes, photos, approvals, or billing details before the invoice stalls."], ["Invoice movement", "Move completed work toward billing without depending on office memory."], ["Payment follow-up", "Keep open balances visible with the next follow-up owned."], ["Owner visibility", "Show what is stuck, who owns it, and what needs attention."], ["Office handoff cleanup", "Reduce the repeated chase between field work, office work, invoice, and cash collected."], ["Specific cash fixes", "Build the needed cashflow automation even if the exact issue is too specific to list publicly."]]
const leakCards = ["Finished jobs wait on missing billing details.", "Invoices go out late because the office has to chase information.", "Open balances depend on someone remembering to follow up.", "The owner or office manager keeps becoming the backup system."]

export default function SystemPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A]">
        <section className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-[7.5rem] sm:pb-16 lg:pt-[8rem]">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
          <div className={`${shell} relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
            <div>
              <h1 className="max-w-4xl text-[2.1rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.1rem] lg:text-[3.7rem]">Cashflow Control gets finished work closer to paid cash.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60] sm:text-xl">Use this system category when jobs are done but invoices, missing details, approvals, open balances, or payment follow-up still wait on people remembering.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/contact?path=pre-buy" className={lightButton}>Ask one question</Link>
              </div>
              <p className="mt-4 max-w-xl text-sm font-bold leading-6 text-[#607080]">The Systems Installation Sprint installs the systems your business needs most. It can include fixes from Cashflow Control, Repeat Revenue, or a specific need found in the assessment.</p>
            </div>
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_22px_60px_rgba(7,29,58,0.08)]">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">This system helps when:</h2>
              <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-[#536173]">
                {leakCards.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Pick the automations you need. Build the system that works together.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Customers can choose individual automations from Cashflow Control or Repeat Revenue. The systems work best together, especially Repeat Revenue, but Stanley Systems can build the specific fixes your business needs.</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {automations.map((item) => (
                <article key={item[0]} className="rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white">
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#102033]">{item[0]}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#536173]">{item[1]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4FBF5] py-14 sm:py-16">
          <div className={`${shell} grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
            <div>
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">The Sprint is not limited to this page.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">If the assessment finds that your best fix lives partly in Cashflow Control, partly in Repeat Revenue, or somewhere specific to your operation, Stanley Systems can build what the business needs when it fits the sprint scope.</p>
            </div>
            <div className="rounded-[2rem] border border-[#BFE4C8] bg-white p-6 shadow-[0_24px_70px_rgba(21,128,61,0.13)]">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Systems Installation Sprint</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#102033]">Install the systems your business needs most.</h3>
              <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">Start with the Cash Flow Assessment so Stanley Systems can see the actual leaks, produce the full fix list, and decide what should be built first.</p>
              <Link href="/workflow-audit" className={`mt-6 w-full ${greenButton}`}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
