import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Coastline Marine Service Case Study | Stanley Systems",
  description:
    "See how Stanley Systems is framing workflow cleanup for Coastline Marine Service around Wallace-to-QuickBooks handoffs, intake-to-office flow, and cleaner billing operations.",
  alternates: {
    canonical: "https://stanley-systems.com/stanley-systems-case-study",
  },
  openGraph: {
    title: "Coastline Marine Service Case Study | Stanley Systems",
    description:
      "A Stanley Systems case study page focused on practical workflow cleanup for Coastline Marine Service, including billing handoffs and operational bottlenecks.",
    url: "https://stanley-systems.com/stanley-systems-case-study",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const coastlineBefore = [
  "Completed work had to move from Wallace into QuickBooks without a clean direct system handoff.",
  "New intake details needed a more reliable path into the office workflow instead of manual re-entry and patchwork checking.",
  "Leadership priorities centered on reducing admin drag and making financial handoffs cleaner after the work was already done.",
  "The operational challenge was not field execution. It was how job information moved after the work happened.",
]

const coastlineFocus = [
  "Wallace to QuickBooks as the top workflow priority",
  "Intake to Wallace as the next operational handoff to tighten",
  "Practical workflow cleanup before promising deeper system complexity",
  "A proof direction grounded in real office and billing bottlenecks instead of generic automation claims",
]

const whyThisMatters = [
  "billing can move faster when completed work does not need as much reconstruction",
  "the office spends less time chasing missing information",
  "handoffs become easier to explain in plain English",
  "the business gets a cleaner path from completed work to financial follow-through",
]

export default function StanleySystemsCaseStudyPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Stanley Systems case study</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Coastline Marine Service is the clearest proof direction Stanley Systems is building around right now.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
              The work is centered on practical workflow cleanup: cleaner handoffs from completed work into billing, tighter intake flow into the office, and less dependence on manual re-entry across disconnected steps.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Where the bottleneck showed up</p>
              <ul className="mt-6 space-y-4">
                {coastlineBefore.map((signal) => (
                  <li key={signal} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-400" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What Stanley Systems is focused on</p>
              <ul className="mt-6 space-y-4">
                {coastlineFocus.map((signal) => (
                  <li key={signal} className="flex gap-3 text-base leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What has already been clarified</p>
            <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
              <p>
                Coastline Marine Service is the clearest live example of how Stanley Systems works in practice. The point of this page is not to inflate it into a giant transformation story. The point is to show the kind of operational bottleneck Stanley actually steps into: billing handoffs, intake handoffs, and the office-side drag that starts after the work itself is already done.
              </p>
              <p>
                The real proof here is specific, not flashy. Wallace to QuickBooks was identified as the top priority. Intake into Wallace was identified as the next handoff to tighten. That is already more trustworthy than generic automation language because it shows where the drag actually lives.
              </p>
              <p>
                As stronger measured outcomes become available, they should be added. Until then, the strongest honest version of the case study is: here is the workflow problem, here is the priority order, and here is why fixing those handoffs matters to cash flow and office control.
              </p>
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Why this matters operationally</p>
            <ul className="mt-6 grid gap-4 lg:grid-cols-2">
              {whyThisMatters.map((signal) => (
                <li key={signal} className="flex gap-3 rounded-[1.35rem] border border-[#e8dfd0] bg-[#fbfaf7] px-5 py-4 text-base leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-slate-900 px-8 py-10 text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Next best step</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">If your business already has the tools but the billing handoff still feels messy, that is exactly the kind of problem Stanley Systems is built to look at.</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                  The first conversation is used to identify the real bottleneck, then decide whether there is a clean workflow fix worth building.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Book a meeting
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
