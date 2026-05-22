import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { FadedImage } from "@/components/faded-image"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

export const metadata: Metadata = {
  title: "Repeat Revenue | Stanley Systems",
  description: "Repeat Revenue helps service businesses bring past customers back, ask for reviews and referrals, recover missed calls, and keep customer follow-up moving.",
  alternates: { canonical: "https://stanley-systems.com/systems/repeat-revenue" },
}

const automations = [
  ["Past customer follow-up", "Bring old customers back with simple reminders and next-step messages."],
  ["Review asks", "Ask happy customers while the good job is still fresh."],
  ["Referral asks", "Give trusted customers a clean way to send the next lead."],
  ["Missed-call recovery", "Keep new demand from disappearing when the office is busy."],
  ["Private feedback routing", "Catch unhappy feedback before it turns into a public problem."],
  ["Shop-specific follow-up", "Build the follow-up gaps that matter in your shop, even when they are too specific to list publicly."],
]
const leakCards = ["Past customers are not contacted again.", "Reviews and referrals depend on memory.", "Missed calls go cold before anyone owns the next step.", "Good jobs end without creating the next lead."]

export default function SystemPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A]">
        <section data-section="repeat-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-[7.5rem] sm:pb-16 lg:pt-[8rem]">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
          <div className={`${shell} relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
            <div>
              <h1 className="max-w-4xl text-[2.1rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.1rem] lg:text-[3.7rem]">Repeat Revenue turns good work into reviews, referrals, and the next job.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60] sm:text-xl">Use this system category when past customers, reviews, referrals, missed calls, and follow-up are not being worked consistently.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/contact?path=pre-buy" className={lightButton}>Ask us a question</Link>
              </div>
              <p className="mt-4 max-w-xl text-sm font-bold leading-6 text-[#607080]">Customers can choose individual automations, but Repeat Revenue works best when the billing, customer record, and follow-up handoffs are clean too.</p>
            </div>
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_22px_60px_rgba(7,29,58,0.08)]">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">This system helps when:</h2>
              <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-[#536173]">
                {leakCards.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section data-section="repeat-systems" className="bg-white py-14 sm:py-16">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Bring past customers back without making it cheap marketing automation.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Stanley Systems builds practical follow-up around the work your shop already did: missed calls, completed jobs, review requests, referral asks, past-customer reminders, and the next booked job.</p>
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

        <section data-section="repeat-sprint-bridge" className="bg-[#F4FBF5] py-14 sm:py-16">
          <div className={`${shell} grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
            <div>
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">The Sprint can include Repeat Revenue, Cashflow Control, or both.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Some shops need old customers and referrals cleaned up first. Some need faster billing before follow-up can work. The Cash Flow Assessment shows what is actually slowing the business down, then Stanley Systems builds the fix that fits.</p>
            </div>
            <div className="rounded-[2rem] border border-[#BFE4C8] bg-white p-6 shadow-[0_24px_70px_rgba(21,128,61,0.13)]">
              <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#102033]">Build the follow-up system your shop will actually use.</h3>
              <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">The Systems Installation Sprint builds the first full version of the systems your business chooses to put in place.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/how-the-assessment-works" className={lightButton}>See how it works</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
