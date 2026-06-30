import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

const industries = [
  {
    title: "Plumbing and HVAC",
    href: "/industries/plumbing",
    body: "Fast jobs create fast billing problems when tech notes, photos, line items, or approvals are missing.",
  },
  {
    title: "Marine and field service",
    href: "/industries/marine",
    body: "Custom work gets messy when the office has to rebuild the job story before billing or customer updates can happen.",
  },
  {
    title: "Electrical, landscaping, and trades",
    href: "/industries/electrical",
    body: "Completed work, open estimates, scheduling updates, and customer follow-up get spread across calls, texts, notes, and software.",
  },
]

const moneyPain = [
  {
    title: "5 delayed jobs",
    body: "Finished work can sit in the office before it turns into collected cash.",
  },
  {
    title: "8 hours a week chasing details",
    body: "That becomes 30+ payroll hours a month spent on preventable admin work.",
  },
  {
    title: "3 open estimates",
    body: "Quoted work can sit without a next step until someone remembers to follow up.",
  },
]

const fitSignals = [
  "Invoices go out later than they should after the work is already complete.",
  "Estimate follow-up depends on someone remembering to do it.",
  "Job details live across calls, texts, notes, whiteboards, and software.",
  "Job details live across calls, texts, notes, whiteboards, and software.",
  "The team already has tools, but the workflow between those tools still breaks.",
]

const notFitSignals = [
  "The business wants custom enterprise software before fixing the obvious admin drags.",
  "There is no repeatable workflow, no real software stack, and no clear first bottleneck.",
  "The team is not ready to clean up the workflow that is costing money.",
  "Admin time, billing delays, and missed follow-up are treated as free.",
]

export function BestFitSection({ className = "" }: { className?: string }) {
  return (
    <section
      data-audit-page="/"
      data-audit-section="home.best-fit"
      data-audit-purpose="Show which service businesses fit Stanley Systems before the final AI Profit Map CTA."
      className={`relative z-10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${className}`}
    >
      <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-[#dbe7cf] bg-[linear-gradient(180deg,#f8fbf3_0%,#ffffff_48%,#f7f7f4_100%)] px-5 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3.2rem] lg:leading-[1.05]">
            For shops where the work gets done, but the cash still gets stuck.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Stanley Systems fits service businesses already using tools like QuickBooks, Housecall Pro, Jobber, ServiceTitan, Wallace, or Yardbook, but still losing time to late invoices, stale estimates, messy handoffs, and owner cleanup.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link key={industry.title} href={industry.href} className="rounded-[1.5rem] border border-[#e3ead9] bg-white/90 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.055)] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white hover:shadow-[0_22px_52px_rgba(21,128,61,0.12)]">
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">{industry.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{industry.body}</p>
              <span className="mt-4 inline-flex text-sm font-extrabold text-[#116832]">View industry page →</span>
            </Link>
          ))}
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-[#d6e5ca] bg-[#edf7e8] p-5 sm:p-6">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">What this can cost before anyone notices</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {moneyPain.map((item) => (
              <div key={item.title} className="rounded-[1.25rem] border border-[#cfe0c0] bg-white/80 p-4">
                <p className="text-base font-semibold text-[#166534]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="rounded-[1.75rem] border border-[#dce8d0] bg-white p-6 shadow-[0_16px_48px_rgba(15,23,42,0.045)] sm:p-7">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Stanley Systems is a fit if...</h3>
            <ul className="mt-5 space-y-3.5">
              {fitSignals.map((signal) => (
                <li key={signal} className="flex gap-3 text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.75rem] border border-[#e4e1d8] bg-[#fbfaf6] p-6 shadow-[0_16px_48px_rgba(15,23,42,0.04)] sm:p-7">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Stanley Systems is not the fit if...</h3>
            <ul className="mt-5 space-y-3.5">
              {notFitSignals.map((signal) => (
                <li key={signal} className="flex gap-3 text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}
