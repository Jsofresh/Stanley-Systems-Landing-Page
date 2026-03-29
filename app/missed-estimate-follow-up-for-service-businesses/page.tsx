import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { internalPageLinks } from "@/components/internal-page-data"

export const metadata: Metadata = {
  title: "Missed Estimate Follow-Up for Service Businesses | Stanley Systems",
  description:
    "Stanley Systems helps service businesses fix missed estimate follow-up so good jobs do not go cold while the team gets pulled into the next urgent thing.",
  alternates: {
    canonical: "https://stanley-systems.com/missed-estimate-follow-up-for-service-businesses",
  },
  openGraph: {
    title: "Missed Estimate Follow-Up for Service Businesses | Stanley Systems",
    description:
      "A practical breakdown of why estimates go cold in service businesses and how Stanley Systems helps build follow-up workflows that still feel human.",
    url: "https://stanley-systems.com/missed-estimate-follow-up-for-service-businesses",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const symptoms = [
  "Quotes go out, but nobody owns the next step clearly.",
  "Follow-up depends on memory, good intentions, and a rare quiet moment.",
  "Replies land across calls, texts, and inboxes, then get missed.",
  "The owner finds out a good job was lost after the lead already went cold.",
]

const workflowShifts = [
  "Define what happens immediately after an estimate is sent.",
  "Set a default follow-up sequence that stops when the customer replies.",
  "Make replies visible in one place instead of scattering them across channels.",
  "Route real exceptions to a human quickly instead of relying on manual checking.",
]

export default function MissedEstimateFollowUpPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Problem page</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
                Missed estimate follow-up is usually not a sales problem. It is a workflow problem.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                Stanley Systems helps service businesses fix the gap between sending the quote and following up on time. When that step depends on memory, the next busy day wins. Good jobs go cold quietly.
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
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What this usually looks like</p>
              <ul className="mt-5 space-y-4">
                {symptoms.map((item) => (
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
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Why it happens</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Urgent work always crowds out invisible follow-up</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                A lead can be a perfect fit, but if the next step is not triggered clearly, the team gets pulled into live jobs, supplier issues, scheduling changes, and customer calls. The quote does not lose because the team does not care. It loses because nothing in the workflow protects the follow-up step.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What gets lost</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Revenue disappears without showing up as an expense</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                One missed estimate follow-up can mean a few thousand dollars gone. Most owners feel that loss, but it rarely shows up in a way the system tracks clearly. It just looks like work that never came back.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What Stanley fixes</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">The gap between sent quote and real next action</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Stanley Systems focuses on the handoff itself. The goal is a simple follow-up workflow that still sounds like the business, still routes real replies to a human, and does not depend on somebody remembering tomorrow.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">A cleaner follow-up workflow</p>
              <ul className="mt-6 space-y-4">
                {workflowShifts.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#15803D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Related Stanley pages</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ...internalPageLinks,
                  { title: "How Stanley helps service businesses", href: "/who-stanley-systems-helps" },
                  { title: "Read the estimate follow-up article", href: "/blog/the-estimate-that-went-cold-and-the-4000-job" },
                ].map((page) => (
                  <Link
                    key={`${page.href}-${page.title}`}
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
        </div>
      </section>
    </MarketingPageShell>
  )
}
