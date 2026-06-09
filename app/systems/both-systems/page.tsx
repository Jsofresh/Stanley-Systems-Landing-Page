import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

export const metadata: Metadata = {
  title: "Both Systems | Stanley Systems",
  description: "How Cashflow Control and Repeat Revenue work together to move customer interest into paid invoices, reviews, referrals, and repeat work.",
  alternates: { canonical: "https://stanley-systems.com/systems/both-systems" },
}

const together = [
  "Cashflow Control helps work move from customer intake, job handoff, completed work, invoice, payment follow-up, and collected cash.",
  "Repeat Revenue helps past customers, reviews, referrals, missed calls, and customer follow-up produce more future work.",
  "Together they keep work moving before the invoice is paid and after the customer is happy.",
  "You can still choose individual automations when the assessment shows that is the right move.",
]

export default function BothSystemsPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A]">
        <section data-section="both-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-32 sm:pt-36 lg:pb-20 lg:pt-32">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
          <div className={`${shell} relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center`}>
            <div>
              <h1 className="max-w-5xl text-[2.08rem] font-semibold leading-[0.96] tracking-[-0.035em] text-[#071D3A] sm:text-[3.23rem] lg:text-[3.78rem]">Cashflow Control and Repeat Revenue are separate systems. They work best together.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60]">Cashflow Control keeps jobs, billing, payment follow-up, and cash moving. Repeat Revenue brings past customers, reviews, referrals, missed calls, and customer follow-up back into booked work.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/workflow-audit" className={greenButton}>Get the Office Process Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/contact?path=pre-buy" className={lightButton}>Ask us a question</Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_22px_60px_rgba(7,29,58,0.08)] lg:mt-3">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Why both systems matter:</h2>
              <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-[#536173]">
                {together.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section data-section="both-connection" className="bg-white py-14 sm:py-16">
          <div className={`${shell} grid gap-5 md:grid-cols-3`}>
            <Link href="/systems/cashflow-control" className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Cashflow Control</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">For intake, office handoffs, completed work, invoicing, open balances, payment follow-up, and collected cash.</p>
              <span className="mt-4 inline-flex font-extrabold text-[#116832]">View Cashflow Control →</span>
            </Link>
            <Link href="/systems/repeat-revenue" className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Repeat Revenue</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">For past customers, reviews, referrals, missed calls, and follow-up that should create the next booked job.</p>
              <span className="mt-4 inline-flex font-extrabold text-[#116832]">View Repeat Revenue →</span>
            </Link>
            <div className="rounded-[1.5rem] border border-[#BFE4C8] bg-[#F4FBF5] p-6">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Systems Installation Sprint</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">The sprint can cover either system, both systems, or a shop-specific fix found in the assessment.</p>
              <Link href="/workflow-audit" className={`mt-4 w-full ${greenButton}`}>Get the Office Process Assessment</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
