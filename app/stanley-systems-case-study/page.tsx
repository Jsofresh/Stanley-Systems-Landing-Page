import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Stanley Systems Case Study | Field Service Office Workflow",
  description: "A Stanley Systems case study on a service business with finished work, existing tools, and office handoff gaps slowing invoices, payment, reviews, referrals, and repeat work.",
}

const metrics = [
  { value: "$9k–$18k", label: "projected monthly cash-flow exposure" },
  { value: "3–7 days", label: "billing delay pattern found" },
  { value: "4 gaps", label: "office handoffs worth fixing first" },
]

const problems = [
  "Finished jobs were not always turning into invoices fast enough.",
  "Payment follow-up, reviews, referrals, and past customers depended too much on memory.",
  "The business already had tools; the drag lived between the tools and the office process.",
]

const fixes = [
  ["Billing handoff", "Clarify what makes a job invoice-ready before the office has to chase details."],
  ["Payment follow-up", "Keep open balances visible until the next follow-up is owned."],
  ["Customer follow-up", "Turn completed work into review, referral, reminder, and repeat-work paths."],
]

export default function StanleySystemsCaseStudyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#F7F4EC] text-[#102033]">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pb-16 lg:pt-40">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl text-[2.3rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.45rem] lg:text-[4.25rem]">The work was done. The cash was not moving fast enough.</h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#42596C]">Stanley Systems found office handoff gaps inside a real service-business workflow: billing, payment follow-up, reviews, referrals, and past customers.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/ai-profit-map#assessment" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]">Buy the AI Profit Map <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/marine-service-automation" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:bg-[#F4FBF5]">See marine service fit</Link>
            </div>
          </div>
          <div className="grid gap-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_18px_54px_rgba(7,29,58,0.06)]">
                <p className="text-[2.25rem] font-semibold leading-none tracking-[-0.05em] text-[#071D3A]">{metric.value}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">{metric.label}</p>
              </div>
            ))}
            <p className="text-xs font-semibold leading-5 text-[#607080]">Projected impact is based on the workflow patterns reviewed. It is not a guaranteed result.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-[#071D3A] p-6 text-white sm:p-8 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <div>
            <h2 className="mt-3 text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[3rem]">Not a field-work problem. An office handoff problem.</h2>
          </div>
          <ul className="mt-6 space-y-3 lg:mt-0">
            {problems.map((problem) => (
              <li key={problem} className="rounded-2xl bg-white/8 p-4 text-base font-semibold leading-7 text-[#E9F7ED] ring-1 ring-white/10">{problem}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-3 text-[2.1rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#071D3A] sm:text-[3rem]">The highest-value work was between the existing tools.</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {fixes.map(([title, body]) => (
            <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_18px_54px_rgba(7,29,58,0.06)]">
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_54px_rgba(7,29,58,0.06)] sm:p-8">
            <h2 className="text-[2rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#071D3A] sm:text-[2.75rem]">Why this matters</h2>
            <p className="mt-4 text-base font-medium leading-7 text-[#536173]">The shop did not need a giant software overhaul. It needed the work, invoices, payments, customers, reviews, and referrals to stop falling between systems.</p>
            <p className="mt-4 text-base font-semibold leading-7 text-[#102033]">When that gets cleaned up, the owner gets fewer mysteries and more visible money movement.</p>
          </div>
          <div className="rounded-[2rem] bg-[#F4FBF5] p-6 ring-1 ring-[#CFE8D5] sm:p-8">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">Already have tools but still feel the drag?</h2>
            <p className="mt-3 text-base font-medium leading-7 text-[#536173]">Buy the AI Profit Map. Stanley Systems will show where the office work is costing money and which fix should happen first.</p>
            <Link href="/ai-profit-map#assessment" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#116832]">Buy the AI Profit Map</Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
