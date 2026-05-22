import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

export const metadata: Metadata = {
  title: "How the Assessment Works | Stanley Systems",
  description: "A detailed explanation of the Stanley Systems Cash Flow Assessment for service business owners who want to understand the process before starting.",
  alternates: { canonical: "https://stanley-systems.com/how-the-assessment-works" },
}

const steps = [
  ["What gets checked", "Calls, invoices, follow-ups, reviews, referrals, past customers, office handoffs, and the places money gets missed after work is done."],
  ["What you receive", "A full fix list for every money leak found, the likely cost, and which fix should happen first."],
  ["How the sprint connects", "The $97 assessment becomes a $194 credit toward the $1,500 Systems Installation Sprint."],
  ["How specific fixes get handled", "Some valuable fixes are too specific to list publicly. If the assessment finds one and it fits the sprint scope, Stanley Systems can build it."],
]

export default function HowAssessmentWorksPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
        <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 lg:pt-36">
          <div className={`${shell} text-center`}>
            <h1 className="mx-auto max-w-5xl text-[2.3rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[3.6rem] lg:text-[4.4rem]">How the Cash Flow Assessment works.</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#334B60] sm:text-xl">This page is for skeptical buyers who want more detail before starting. The assessment finds where money is being missed, gives you the fix list, and shows what should be built first.</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/invoicing-delay-cash-flow-calculator" className={lightButton}>Run the free calculator</Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className={`${shell} grid gap-5 md:grid-cols-2`}>
            {steps.map(([title, body]) => (
              <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 shadow-[0_16px_42px_rgba(7,29,58,0.05)]">
                <h2 className="flex gap-3 text-2xl font-semibold tracking-[-0.035em] text-[#102033]"><CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-[#15803D]" />{title}</h2>
                <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#F4FBF5] py-14 sm:py-16">
          <div className={`${shell} grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
            <div>
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">The assessment is not just a vague recommendation.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Stanley Systems shows where money is being missed, what it likely costs, how to fix every problem found, and which fix should happen first. From there, the Systems Installation Sprint can install the systems your business needs most.</p>
            </div>
            <div className="rounded-[2rem] border border-[#BFE4C8] bg-white p-6 shadow-[0_24px_70px_rgba(21,128,61,0.13)]">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Next step</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#102033]">Ready when you want the actual fix list.</h3>
              <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">If you already know you need diagnosis, start the Cash Flow Assessment. If you still have one simple pre-buy question, ask first.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/workflow-audit" className={greenButton}>Start the Assessment</Link>
                <Link href="/contact?path=pre-buy" className={lightButton}>Ask one question</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
