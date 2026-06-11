import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Marine Service Automation | Stanley Systems",
  description:
    "Stanley Systems helps marine service shops tighten handoffs, follow up faster, invoice sooner, and reactivate seasonal customers.",
  alternates: {
    canonical: "https://stanley-systems.com/marine-service-automation",
  },
  openGraph: {
    title: "Marine Service Automation | Stanley Systems",
    description:
      "Practical workflow automation for marine service shops losing money in missed calls, slow estimates, delayed invoicing, and seasonal follow-up.",
    url: "https://stanley-systems.com/marine-service-automation",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const problems = [
  ["Missed calls and inquiries", "New work comes in while the shop is busy, then disappears when nobody responds fast enough."],
  ["Estimates not followed up", "Quoted work sits open because the next touch depends on memory."],
  ["Completed work, delayed invoices", "Jobs are finished, but notes, approvals, and billing details arrive late."],
  ["Seasonal customers not reactivated", "Past boat owners already know the shop, but nobody works the list before the season moves."],
  ["Reviews and referrals not requested", "Happy customers leave with no clean ask for proof, referrals, or the next booking."],
]

const fixes = [
  ["AI Office Installation Sprint", "Moves finished work toward billing-ready, invoice follow-up, and collected cash with fewer office chases."],
  ["AI Office Ops", "Turns past customers, missed calls, reviews, referrals, and seasonal follow-up into cleaner booked-work paths."],
  ["AI Office Map", "Finds the first admin drag before the shop buys or builds the wrong system."],
]

const workflows = [
  "Missed inquiry follow-up",
  "Estimate follow-up",
  "Invoice reminders",
  "Seasonal reactivation",
  "Review and referral asks",
]

export default function MarineServiceAutomationPage() {
  return (
    <MarketingPageShell>
      <section data-nav-theme="light" className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 rounded-[2.35rem] border border-[#d8e8de] bg-[#fffdf8] p-5 shadow-[0_24px_80px_rgba(7,29,58,0.08)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
            <div>
              <h1 className="max-w-4xl text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[#071D3A] sm:text-[4.5rem] lg:text-[5rem]">
                Marine Service Systems That Move Cash Before the Season Slips Away
              </h1>
              <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-[#42596C] sm:text-xl">
                Get more jobs billed, followed up, reviewed, referred, and rebooked before the season slips away. Marine service shops lose money when missed calls, slow estimates, delayed invoicing, and seasonal follow-up depend on memory.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/workflow-audit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-base font-bold text-white shadow-[0_18px_42px_rgba(21,128,61,0.22)] transition hover:bg-[#116832]">
                  Get the AI Office Map
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/invoicing-delay-cash-flow-calculator" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c8d8cd] bg-white px-6 py-3 text-base font-bold text-[#071D3A] transition hover:bg-[#f3faf1]">
                  Use the free calculator
                </Link>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-[#d8e8de] bg-white p-5 shadow-[0_18px_50px_rgba(7,29,58,0.06)] sm:p-6">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#071D3A]">Where the money gets stuck</h2>
              <div className="mt-5 grid gap-3">
                {problems.map(([title, copy]) => (
                  <article key={title} className="rounded-2xl border border-[#e2ece5] bg-[#fbfcf7] p-4">
                    <h3 className="text-base font-semibold text-[#071D3A]">{title}</h3>
                    <p className="mt-1 text-sm font-medium leading-6 text-[#536A7D]">{copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <section data-nav-theme="light" className="mt-8 grid gap-4 lg:grid-cols-3">
            {fixes.map(([title, copy]) => (
              <article key={title} className="rounded-[1.75rem] border border-[#d8e8de] bg-white p-6 shadow-[0_16px_44px_rgba(7,29,58,0.06)]">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#eef9f2] text-[#15803D] ring-1 ring-[#cfe8d5]">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#071D3A]">{title}</h2>
                <p className="mt-3 text-base font-medium leading-7 text-[#536A7D]">{copy}</p>
              </article>
            ))}
          </section>

          <section data-nav-theme="light" className="mt-8 rounded-[2rem] border border-[#d8e8de] bg-[#071422] p-5 text-white shadow-[0_24px_80px_rgba(7,20,34,0.18)] sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
              <div>
                <h2 className="mt-3 text-[2.35rem] font-semibold leading-[1] tracking-[-0.05em] sm:text-[3.4rem]">Simple paths that stop the office from remembering everything.</h2>
                <p className="mt-4 text-base font-medium leading-7 text-[#d7e5dc]">Cleaner next steps around the calls, estimates, billing, and seasonal follow-up the marine shop already handles.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {workflows.map((workflow) => (
                  <div key={workflow} className="rounded-2xl border border-white/12 bg-white/8 p-4 text-base font-semibold text-white">
                    {workflow}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section data-nav-theme="light" className="mt-8 rounded-[2rem] border border-[#cfe8d5] bg-[#eef9f2] p-6 text-center sm:p-8">
            <h2 className="text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.045em] text-[#071D3A] sm:text-[3.25rem]">Start with the leak, not the software.</h2>
            <p className="mx-auto mt-3 max-w-3xl text-base font-medium leading-7 text-[#42596C]">Get the AI Office Map and find which handoff is costing the shop first.</p>
            <Link href="/workflow-audit" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-base font-bold text-white transition hover:bg-[#116832]">
              Get the AI Office Map
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </section>
    </MarketingPageShell>
  )
}
