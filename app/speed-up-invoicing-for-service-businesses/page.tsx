import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Speed Up Invoicing for Service Businesses | Stanley Systems",
  description:
    "Most service businesses lose days on every invoice because the handoff from completed work to billing is still manual. Stanley Systems helps tighten that path so invoices move faster.",
  alternates: {
    canonical: "https://stanley-systems.com/speed-up-invoicing-for-service-businesses",
  },
}

const beforeBreakdown = [
  "Completed work sits in a field app, text thread, or paper note before someone in the office turns it into an invoice.",
  "The office retypes details that were already collected once, then waits on one more clarification before anything gets sent.",
  "A one-day delay quietly turns into three to seven days because the billing handoff lives in somebody's head or queue.",
]

const whatChanges = [
  "When the work is done, the billing handoff starts moving the same day instead of waiting for someone to remember.",
  "The office reviews cleaner information instead of reconstructing the job from scraps.",
  "Invoices go out faster, cash starts moving sooner, and the owner spends less time chasing what happened after the work was already done.",
]

const practicalFixes = [
  "job complete triggers invoice draft creation",
  "field notes, parts, and customer details move into one cleaner review step",
  "the office reviews once instead of rebuilding the whole invoice from scratch",
  "the customer gets billed the same day or on a rule your team actually trusts",
]

const roiExamples = [
  "If your average invoice is $1,200 and 25 jobs a month sit an extra 4 days before billing, that is $30,000 of work waiting longer than it should.",
  "If one office bottleneck delays 40 invoices a month, even a small speedup can tighten cash flow fast without adding headcount first.",
  "If your team is re-entering the same billing details over and over, you are paying for the delay in labor and in slower cash collection.",
]

const relatedPages = [
  {
    title: "Office handoff problems",
    description: "See where information gets stuck between the field and the office, then what Stanley does to tighten that path.",
    href: "/office-handoff-problems-in-field-service-businesses",
  },
  {
    title: "Missed estimate follow-up",
    description: "The same kind of handoff slippage that slows billing also shows up in estimate follow-up. See how that leak compounds.",
    href: "/missed-estimate-follow-up-for-service-businesses",
  },
  {
    title: "Coastline case study",
    description: "Read the clearest live operating example Stanley Systems can point to right now.",
    href: "/stanley-systems-case-study",
  },
]

export default function SpeedUpInvoicingPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Billing bottleneck</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
              Speed up invoicing by fixing the handoff after the work is already done.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
              Most service businesses do not have an invoicing problem because the team is lazy. They have one because the next step after the job gets done still depends on memory, re-entry, and somebody in the office piecing it together later.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Where invoicing starts dragging</p>
              <ul className="mt-6 space-y-4">
                {beforeBreakdown.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What Stanley Systems changes</p>
              <ul className="mt-6 space-y-4">
                {whatChanges.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What the practical fix usually looks like</p>
            <ul className="mt-6 grid gap-4 lg:grid-cols-2">
              {practicalFixes.map((item) => (
                <li key={item} className="flex gap-3 rounded-[1.35rem] border border-[#e8dfd0] bg-[#fbfaf7] px-5 py-4 text-base leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[#dfe8d9] bg-[linear-gradient(180deg,#f5f9f1_0%,#ffffff_100%)] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Why owners care</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Faster invoicing is not just nicer process. It is faster cash.</h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-700">
              <p>
                You do not need perfect sourced numbers to see the shape of the problem. If jobs are getting done and invoices are still sitting, the business is waiting on money it already earned.
              </p>
              <div className="grid gap-4 lg:grid-cols-3">
                {roiExamples.map((example) => (
                  <div key={example} className="rounded-[1.35rem] border border-[#dfe8d9] bg-white px-5 py-4 text-sm leading-7 text-slate-700 sm:text-[15px]">
                    {example}
                  </div>
                ))}
              </div>
              <p>
                The point is not to promise fantasy math. The point is to show how small handoff delays quietly slow cash movement across the whole month.
              </p>
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">A real operating reference</p>
            <p className="mt-5 text-base leading-7 text-slate-600">
              This is the same kind of billing-handoff problem Stanley Systems is working through with Coastline Marine Service: clean up what happens between the work getting done and the office getting what it needs to move billing forward.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/stanley-systems-case-study"
                className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-[#f8f6f1] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#efe9dc]"
              >
                Read the Coastline case study
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#15803D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#166534]"
              >
                Book a meeting
              </Link>
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-slate-900 px-8 py-10 text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-300">Next best step</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                  If invoicing keeps slipping a few days after the work is done, that is usually a handoff problem worth fixing.
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                  Stanley Systems can look at the actual path from completed job to invoice sent, then show where the drag is coming from and whether there is a clean fix worth building.
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
                  href="/office-handoff-problems-in-field-service-businesses"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
                >
                  Read about office handoff problems
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="grid gap-4 lg:grid-cols-3">
              {relatedPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-[1.6rem] border border-[#e8dfd0] bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[#d9d0bf]"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Keep reading</div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{page.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{page.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </MarketingPageShell>
  )
}
