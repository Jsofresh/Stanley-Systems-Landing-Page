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
  description: "Turn the Cash Flow Assessment into workflows, reminders, handoffs, templates, automations, and tool setup.",
  alternates: { canonical: "https://stanley-systems.com/systems-installation-sprint" },
}

const process = [
  ["1", "Start with the Cash Flow Assessment", "Stanley Systems finds the leaks, delays, handoff gaps, and follow-up problems."],
  ["2", "Choose what to build", "You approve the Sprint scope before anything is built."],
  ["3", "Stanley Systems installs the agreed workflows", "Handoffs, reminders, templates, automations, tracking, and documentation get built."],
  ["4", "Test, launch, and hand off", "The system gets checked before your team uses it."],
]

const finishedSprintCards = [
  ["Customer request to final bill", "Customer request comes in → job/customer details are captured → billing has what it needs → final bill goes out → payment follow-up does not get forgotten."],
  ["Estimate follow-up", "Estimate sent → follow-up reminders happen → stale estimates are visible → your team knows what needs another touch."],
  ["Reviews and referrals", "Happy customer → review ask sent → referral ask sent → private feedback route catches problems before they become public."],
  ["Past-customer repeat work", "Old customer list → follow-up schedule → replies routed → repeat work tracked instead of left to memory."],
  ["Owner/team visibility", "A simple view shows what is waiting, what is stuck, what needs a human, and what already moved."],
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
                Stanley Systems automates the billing handoffs, estimate follow-up, payment follow-up, review asks, referral asks, past-customer follow-up, and team reminders so your team doesn't have to worry about chasing them ever again.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/contact?path=pre-buy" className={lightButton}>Ask us a question</Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[520px] drop-shadow-[0_26px_54px_rgba(7,29,58,0.10)]">
              <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_50%_50%,rgba(251,252,247,0.95),rgba(251,252,247,0)_68%)] blur-2xl" aria-hidden="true" />
              <Image
                src="/images/uploaded/2026-05-25-jaden/repeat-revenue-office-workflow.jpg"
                alt="Office workflow showing customer requests, invoices, final bills, review asks, referral asks, and past-customer follow-up."
                width={960}
                height={1280}
                priority
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="relative mx-auto h-auto max-h-[620px] w-full rounded-[1.2rem] object-contain"
              />
            </div>
          </div>
        </section>

        <section data-section="sprint-builds" className="bg-white py-12 sm:py-14">
          <div className={`${shell} grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center`}>
            <div className="rounded-[1.7rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#102033]">What Stanley Systems actually builds</h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">Stanley Systems builds the workflows, reminders, handoffs, tracking, templates, and tool setup that move work from customer request to final bill — then keep reviews, referrals, and past-customer follow-up from depending on memory.</p>
            </div>
            <div>
              <h2 className="text-[2.05rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Built for service businesses where the work gets done, but the follow-up slips.</h2>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {process.map(([number, title, body]) => <li key={title} className="rounded-[1.15rem] border border-[#DDEBE2] bg-white p-4 text-sm font-bold leading-6 text-[#334B60]"><span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-full bg-[#E7F7EB] text-xs font-black text-[#116832]">{number}</span><span className="text-[#102033]">{title}</span><p className="mt-2 font-semibold text-[#536173]">{body}</p></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section data-section="sprint-finished-output" className="bg-[#F4FBF5] py-12 sm:py-14">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">What a finished Sprint can put in place</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Every Sprint is scoped from the assessment, but the finished build can include workflows like these:</p>
            </div>
            <div className="mt-7 grid gap-4 lg:grid-cols-5">
              {finishedSprintCards.map(([title, body]) => <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)]"><h3 className="text-xl font-semibold tracking-[-0.035em] text-[#102033]">{title}</h3><p className="mt-4 text-sm font-semibold leading-6 text-[#536173]">{body}</p></article>)}
            </div>
          </div>
        </section>

        <section data-section="sprint-pricing" className="bg-[#FBFCF7] py-12 sm:py-14">
          <div className={`${shell} grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start`}>
            <div>
              <h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Pricing</h2>
              <p className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#102033]">Systems Installation Sprint at $1,500.</p>
            </div>
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_52px_rgba(7,29,58,0.06)]">
              <p className="text-base font-semibold leading-7 text-[#536173]">Most Sprints focus on the highest-cost workflow found in the assessment: customer invoice/request to final bill, estimate follow-up, reviews/referrals, past-customer follow-up, or a scoped custom workflow.</p>
              <p className="mt-4 text-base font-extrabold leading-7 text-[#116832]">Before anything is built, you approve the Sprint scope. Your Cash Flow Assessment can count as a $194 credit toward the Sprint.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/contact?path=pre-buy" className={lightButton}>Ask us a question</Link>
              </div>
            </div>
          </div>
        </section>

        <section data-section="sprint-timeline" className="bg-white py-12 sm:py-14">
          <div className={`${shell} grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-center`}>
            <h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Timeline</h2>
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
              <p className="text-xl font-semibold leading-8 text-[#334B60]">Most Sprints take 1–2 weeks after the assessment, depending on scope, tools, and how fast access/examples are provided.</p>
            </div>
          </div>
        </section>

        <section data-section="sprint-final-cta" className="bg-[#071422] py-14 text-white sm:py-16" data-nav-theme="dark">
          <div className={`${shell} text-center`}>
            <h2 className="mx-auto max-w-4xl text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl">Ready to see what is slowing down cash, reviews, referrals, and repeat work?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-white/72 sm:text-lg">Start with the Cash Flow Assessment. If the Sprint is the right next step, Stanley Systems can build from that plan.</p>
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
