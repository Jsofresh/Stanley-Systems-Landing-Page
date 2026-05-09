import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Marine Shop Case Study | Stanley Systems",
  description:
    "See how Stanley Systems helps a marine shop find money stuck in office workflow, billing handoffs, intake cleanup, and repeat customer follow-up.",
  alternates: {
    canonical: "https://stanley-systems.com/stanley-systems-case-study",
  },
  openGraph: {
    title: "Marine Shop Case Study | Stanley Systems",
    description:
      "A Stanley Systems case study page focused on practical workflow cleanup for a marine shop, including billing handoffs, intake cleanup, and repeat revenue from existing customers.",
    url: "https://stanley-systems.com/stanley-systems-case-study",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const focusAreas = [
  {
    title: "1. Wallace to QuickBooks",
    body: [
      "The first priority was the billing handoff. When a job is complete, the office should not have to rebuild the job just to get the invoice moving.",
      "Stanley Systems focused on making that handoff cleaner so more completed jobs could move toward billing without extra admin drag.",
    ],
  },
  {
    title: "2. Intake to Wallace",
    body: [
      "The next priority was intake. If new job details enter the business messy, the office pays for it later.",
      "Stanley Systems looked at how intake details could move into Wallace with fewer missed fields, fewer manual checks, and less duplicate entry.",
    ],
  },
  {
    title: "3. Repeat revenue from existing customers",
    body: [
      "The third opportunity was customer reactivation.",
      "Most marine shops already have past customers sitting in their system who have not been contacted in months.",
      "That is not a small miss. That is revenue the shop already earned the right to ask for again.",
    ],
  },
]

const metricCards = [
  {
    label: "Cash movement",
    number: "$6,000 to $18,000 per month",
    body: [
      "If 8 to 12 completed jobs per month are slowed down by missing details, billing cleanup, or handoff issues, and the average job is worth $750 to $1,500, the shop can have $6,000 to $18,000 in monthly cash movement slowed down by office friction.",
      "The goal is not to create that revenue from scratch. The shop already earned it. The goal is to move it faster from finished work to collected cash.",
    ],
  },
  {
    label: "Returning customers",
    number: "15 to 30 customers",
    body: [
      "A marine shop with 300 past customers sitting in Wallace, QuickBooks, or another customer system does not need a massive win rate to create meaningful revenue.",
      "If a reactivation campaign reaches those customers and only 5% to 10% book service again, that is 15 to 30 returning customers brought back into the shop.",
    ],
  },
  {
    label: "Google reviews",
    number: "8 to 20 new reviews",
    body: [
      "When review requests go out after the right jobs, the shop has more chances to turn finished work into public proof.",
      "That gives future customers more reasons to trust the shop before they call.",
    ],
  },
  {
    label: "Office hours saved",
    number: "20 to 35 hours per month",
    body: [
      "If the office spends 5 to 8 hours per week checking job details, retyping intake information, chasing missing notes, or confirming what reached QuickBooks, that adds up to 20 to 35 hours per month spent on preventable admin work.",
      "That is time the office could use for billing, scheduling, customer updates, and higher-value work.",
    ],
  },
  {
    label: "Repeat revenue recovered",
    number: "$11,250 to $45,000",
    body: [
      "At $750 to $1,500 per job, 15 to 30 returning customers can create $11,250 to $45,000 in recovered service revenue from customers the shop already had.",
      "That is the value of following up with customers the business already earned.",
    ],
  },
]

const whyItMatters = [
  "Invoices move sooner.",
  "The office spends less time chasing details.",
  "Customers get followed up with before they forget.",
  "Past customers get brought back before a competitor gets the call.",
  "Leadership gets a clearer view of where money is stuck.",
  "The shop stops depending on memory, manual checking, and office heroics to keep cash moving.",
]

const realLesson = ["Wallace was already there.", "QuickBooks was already there.", "The customers were already there.", "The money was already there."]

export default function StanleySystemsCaseStudyPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              How a Marine Shop Found Money Sitting in Its Office Workflow
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
              The work was already getting done. The problem was what happened after the job was finished.
            </p>
          </div>

          <article className="mx-auto mt-14 max-w-3xl rounded-[1.75rem] border border-[#e8dfd0] bg-white/95 p-8 shadow-[0_18px_55px_rgba(15,23,42,0.05)]">
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">The work was done. The cash was not moving.</h2>

            <div className="mt-7 space-y-6 text-lg leading-8 text-slate-700">
              <p>
                The shop was not losing money because the team could not do the work. The jobs were getting completed. Customers were being served. The shop already had tools in place.
              </p>
              <p>
                The drag showed up after the job was finished. If 8 to 12 completed jobs per month were slowed down by missing details, billing cleanup, or handoff issues, that could leave $6,000 to $18,000 per month moving slower than it should.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Cash slowed down", "$6,000 to $18,000 per month"],
                  ["Office time tied up", "20 to 35 hours per month"],
                  ["Customers to bring back", "15 to 30 customers"],
                  ["New review upside", "8 to 20 Google reviews"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.15rem] border border-[#dfe8d9] bg-[#fbfaf7] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#15803D]">{label}</p>
                    <p className="mt-2 text-xl font-semibold leading-7 text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 border-[#15803D] bg-[#f5f9f1] px-6 py-5 text-xl font-semibold leading-8 text-slate-900">
                Finished work was slowing down inside the office handoff.
              </blockquote>
              <p>
                That is where the money was getting stuck. Stanley Systems focused on cleaning up the path from completed work to collected cash, then identifying how the shop could recover $11,250 to $45,000 from customers it had already earned.
              </p>
            </div>
          </article>

          <article className="mx-auto mt-8 max-w-3xl rounded-[1.75rem] border border-[#e8dfd0] bg-white/95 p-8 shadow-[0_18px_55px_rgba(15,23,42,0.05)]">
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">The problem was not the field work. It was the office handoff.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              The shop already had Wallace, QuickBooks, and customers. The missing piece was a cleaner path between them so finished work, repeat customers, reviews, and office hours did not keep slipping through the cracks.
            </p>

            <div className="mt-8 space-y-5 border-l border-[#dfe8d9] pl-6 text-base leading-7 text-slate-700">
              {[
                "Completed work had to move from Wallace into QuickBooks without forcing the office to reconstruct 8 to 12 jobs per month by hand.",
                "New intake details needed a cleaner path into Wallace so the office could win back 20 to 35 hours per month instead of retyping, checking, and chasing information across disconnected steps.",
                "Past customers were sitting in the system without a strong follow-up path, leaving 15 to 30 returning customers and $11,250 to $45,000 in repeat revenue on the table.",
                "Happy customers needed a better review path so 8 to 20 more Google reviews could turn finished jobs into public proof.",
              ].map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <div className="mt-8 rounded-[1.35rem] border border-[#e8dfd0] bg-[#fbfaf7] p-6">
              <p className="text-xl font-semibold leading-8 text-slate-900">The shop did not need another complicated software pitch.</p>
              <p className="mt-3 text-base leading-7 text-slate-600">
                It needed a cleaner way to make sure finished work turned into invoices, invoices turned into payment, old customers turned back into booked work, and good service turned into more Google reviews.
              </p>
            </div>
          </article>

          <section className="mt-12">
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">What Stanley Systems focused on first</h2>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {focusAreas.map((area) => (
                <article key={area.title} className="rounded-[1.6rem] border border-[#e8dfd0] bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
                  <h3 className="text-xl font-semibold text-slate-900">{area.title}</h3>
                  <div className="mt-4 space-y-4 text-base leading-7 text-slate-600">
                    {area.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[#dfe8d9] bg-[linear-gradient(180deg,#f5f9f1_0%,#ffffff_100%)] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Projected impact for a shop like this</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-slate-700">
              <p>For a marine shop with steady service volume, the upside is not theoretical.</p>
              <p>
                Better billing handoffs can help invoices move faster. Cleaner intake can save office hours every week. A customer reactivation system can turn old customers back into booked work.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {metricCards.map((metric) => (
                <article key={metric.label} className="rounded-[1.6rem] border border-[#dfe8d9] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#15803D]">{metric.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{metric.number}</p>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
                    {metric.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">The shops that clean this up get an advantage.</h2>
            <ul className="mt-6 grid gap-4 lg:grid-cols-2">
              {whyItMatters.map((item) => (
                <li key={item} className="flex gap-3 rounded-[1.35rem] border border-[#e8dfd0] bg-[#fbfaf7] px-5 py-4 text-base leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 grid gap-8 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">This shop did not need a giant software overhaul.</h2>
              <ul className="mt-6 space-y-3 text-base leading-7 text-slate-700">
                {realLesson.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-5 text-base leading-7 text-slate-600">
                The missing piece was a system that made sure the work, billing, and follow-up actually connected.
              </p>
              <p className="mt-5 text-base leading-7 text-slate-600">That is what Stanley Systems is built to fix.</p>
            </article>

            <article className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">What happens if you do not fix this</h2>
              <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
                <p>The shops that clean this up will get paid faster, bring past customers back sooner, and spend fewer office hours chasing the same details every week.</p>
                <p>The shops that ignore it will keep doing what most service businesses do:</p>
                <p className="text-xl font-semibold leading-8 text-slate-900">Finish the work, then let the money slow down in the office.</p>
                <p>That is an expensive habit.</p>
              </div>
            </article>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-slate-900 px-8 py-10 text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Already have the tools but still feel the drag?</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                  If your shop already uses Wallace, QuickBooks, Housecall Pro, Jobber, ServiceTitan, or another field and billing setup, but billing, intake, or repeat customer follow-up still feels messy, Stanley Systems can help you find the money leak.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">Find where cash, customers, and office hours are slipping through the cracks.</p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  href="/pricing#workflow-audit"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Start with the Workflow Audit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/marine-service-automation"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
                >
                  Read about marine service automation
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </MarketingPageShell>
  )
}
