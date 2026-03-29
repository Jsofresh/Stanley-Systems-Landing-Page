import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Who Stanley Systems Helps | Service Business Workflows",
  description:
    "See which service businesses Stanley Systems helps most, what operational bottlenecks show up most often, and when workflow automation is a good fit.",
  alternates: {
    canonical: "https://stanley-systems.com/who-stanley-systems-helps",
  },
  openGraph: {
    title: "Who Stanley Systems Helps | Service Business Workflows",
    description:
      "Stanley Systems helps owner-led and manager-led service businesses clean up invoicing, follow-up, and office handoffs without a major software replacement.",
    url: "https://stanley-systems.com/who-stanley-systems-helps",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const industries = [
  {
    title: "Plumbing and HVAC",
    body:
      "Businesses where jobs move fast, field notes are inconsistent, and the office has to rebuild the story before billing or follow-up can happen.",
  },
  {
    title: "Marine and field service",
    body:
      "Operations where work is often custom, handoffs are messy, and it is easy for billing, approvals, or customer updates to lag behind the real work.",
  },
  {
    title: "Electrical, landscaping, and adjacent trades",
    body:
      "Teams doing solid work in the field but still losing time in the gap between completed work, invoicing, scheduling, and customer communication.",
  },
]

const fitSignals = [
  "Invoices are going out later than they should after work is already complete.",
  "Estimate follow-up depends on someone remembering to do it.",
  "The owner or office manager is acting like the backup system.",
  "Important details live in calls, texts, whiteboards, or side conversations.",
  "The team already has software, but the workflow between tools is still messy.",
]

const notFitSignals = [
  "A company that wants a full custom enterprise software build before fixing the basics.",
  "A business with no repeatable workflow yet and no clear first bottleneck.",
  "A team looking for a hands-off magic tool instead of a cleaner operational process.",
]

export default function WhoStanleySystemsHelpsPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Who Stanley Systems helps</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              Stanley Systems is built for service businesses that already do good work, but still lose time in the office-side handoff.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
              The best fit is usually not a business with no system at all. It is a business with real work, real customers, and real tools already in place, but too much still depends on memory, manual re-entry, or owner cleanup.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {industries.map((industry) => (
              <article
                key={industry.title}
                className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
              >
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{industry.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{industry.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Strong fit signs</p>
              <ul className="mt-6 space-y-4">
                {fitSignals.map((signal) => (
                  <li key={signal} className="flex gap-3 text-base leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Probably not the right first move</p>
              <ul className="mt-6 space-y-4">
                {notFitSignals.map((signal) => (
                  <li key={signal} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-400" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-slate-900 px-8 py-10 text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">What the work usually targets</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">The goal is simple: fewer dropped balls, faster handoffs, and cleaner movement from one step to the next.</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                  That can mean speeding up invoicing, making estimate follow-up consistent, cleaning up dispatch-to-office communication, or giving the team a workflow that does not fall apart the second the owner gets busy.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  href="/how-stanley-systems-works"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  See how Stanley works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
                >
                  Book a meeting
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </MarketingPageShell>
  )
}
