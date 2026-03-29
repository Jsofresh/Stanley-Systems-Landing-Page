import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { internalPageLinks } from "@/components/internal-page-data"

export const metadata: Metadata = {
  title: "About Stanley Systems | Workflow Automation That Makes Service Businesses More Money",
  description:
    "Learn how Stanley Systems helps service businesses make more money by fixing slow invoicing, missed follow-up, and office bottlenecks that quietly cost revenue every week.",
  alternates: {
    canonical: "https://stanley-systems.com/about",
  },
  openGraph: {
    title: "About Stanley Systems | Workflow Automation That Makes Service Businesses More Money",
    description:
      "Stanley Systems helps service businesses make more money by removing office bottlenecks, tightening handoffs, and fixing the admin drag that slows cash flow down.",
    url: "https://stanley-systems.com/about",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const beliefs = [
  "The bottleneck is usually in the handoff, not the person.",
  "If a workflow is costing the business money every week, fixing it should pay for itself.",
  "You should not have to replace your entire system to fix one broken part of it.",
  "The business should stay in control of what gets built.",
]

const focusAreas = [
  "Slow invoicing after work is already done",
  "Missed or inconsistent follow-up on estimates and leads",
  "Office handoffs that depend on memory, texts, and side conversations",
  "Manual re-entry between field, office, and billing tools",
]

const valueSignals = [
  "Faster invoicing means cash comes in faster.",
  "Better follow-up means fewer good jobs go cold.",
  "Cleaner handoffs mean less rework, less owner involvement, and fewer dropped details.",
  "If Stanley Systems is a fit, the goal is simple: fix what is costing the business money.",
]

export default function AboutPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">About Stanley Systems</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
                Stanley Systems helps service businesses fix the office bottlenecks that are quietly costing them money.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                Your team works hard in the field. The system behind the business should work just as hard to make sure the money comes through cleanly. Stanley Systems exists to fix the messy handoffs between the field, the office, and billing that slow cash flow down, let estimates go cold, and force owners to keep patching the workflow by hand. When those bottlenecks get cleaned up, the business moves faster and usually makes more money because less revenue leaks out through admin drag.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.15)] transition hover:bg-slate-800"
                >
                  Book a meeting
                </Link>
                <a
                  href="tel:+16179586372"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-[#f4efe6]"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call +1 (617) 958-6372
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What Stanley Systems usually fixes</p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The point is not to look more automated. The point is to build a backend system that respects how hard the team works and stops losing money to slow admin, missed follow-up, and broken office handoffs.
              </p>
              <ul className="mt-5 space-y-4">
                {focusAreas.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Who this is for</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Owner-led and manager-led service businesses</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Stanley Systems is built for businesses where work is getting done, but the office side is still too manual. That often includes plumbing, HVAC, marine service, electrical, landscaping, and similar field-service operations where fixing the workflow can directly improve revenue, speed up billing, and stop good jobs from slipping away.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What makes the approach different</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Fix the handoff before adding more noise</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The goal is to make the workflow easier to follow and more profitable to run. Instead of starting with a flashy tool stack, Stanley starts with the real bottleneck, tightens the process, and then automates the parts that should no longer depend on memory, rework, or owner babysitting.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What the business keeps</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Ownership, clarity, and upside</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                A business should not end up dependent on a mystery system. The workflow should make sense in plain English, the team should know what happens next, and the company should stay in control of what gets built while still seeing the financial upside from fixing what was slowing things down.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Why this makes the business more money</p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                The people doing the actual work are already putting the effort in. The office system should not be the part that drops the ball after the job is done. Stanley Systems is built around the idea that if the team works hard to earn the revenue, the backend should work hard to help the business collect it, protect it, and keep more of it.
              </p>
              <ul className="mt-6 space-y-4">
                {valueSignals.map((signal) => (
                  <li key={signal} className="flex gap-3 text-base leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What Stanley Systems believes</p>
              <ul className="mt-6 space-y-4">
                {beliefs.map((belief) => (
                  <li key={belief} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#15803D]" />
                    <span>{belief}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">About the founder</p>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              <p>
                I’m Jaden, founder of Stanley Systems. I have worked for and around trade businesses my whole life, and I have seen the same pattern over and over: the team does solid work, but money gets lost in the office through slow invoicing, missed follow-up, duplicate entry, and workflows that depend on memory.
              </p>
              <p>
                Stanley is my middle name, and it was my grandfather’s name too. He ran a successful retail business selling hardware, tools, and more, but he eventually got squeezed out when the business could not keep up with how technology was changing sales, bookkeeping, and the rest of the operation.
              </p>
              <p>
                That is a big part of why Stanley Systems exists. The goal is not to bolt on random tech. The goal is to help good service businesses keep more of the money they are already earning by fixing the bottlenecks that are quietly costing them time, cash flow, and good jobs.
              </p>
            </div>
          </section>

          <section className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Where to go next</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {internalPageLinks.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-[1.4rem] border border-[#e8dfd0] bg-[#fbfaf7] px-5 py-5 text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-semibold">{page.title}</span>
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </MarketingPageShell>
  )
}
