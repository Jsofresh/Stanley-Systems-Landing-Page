import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { internalPageLinks } from "@/components/internal-page-data"

export const metadata: Metadata = {
  title: "Office Handoff Problems in Field Service Businesses | Stanley Systems",
  description:
    "Stanley Systems helps field-service businesses clean up office handoff problems so job details, approvals, and billing-ready information stop getting lost between the field and the office.",
  alternates: {
    canonical: "https://stanley-systems.com/office-handoff-problems-in-field-service-businesses",
  },
  openGraph: {
    title: "Office Handoff Problems in Field Service Businesses | Stanley Systems",
    description:
      "A practical breakdown of where office handoff problems start in field-service businesses and how Stanley Systems helps tighten the workflow.",
    url: "https://stanley-systems.com/office-handoff-problems-in-field-service-businesses",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const failurePoints = [
  "Job notes, photos, approvals, and change details live in different places.",
  "The office has to reconstruct what happened after the work is already done.",
  "Billing waits because nobody has the full story in one place.",
  "Owners become the backup system for clarification and status checks.",
]

const outcomes = [
  "The team knows what counts as complete before a job gets handed off.",
  "Billing-ready details are captured once instead of rebuilt later.",
  "Exceptions show up early instead of surfacing days later.",
  "The office sees what is ready, what is missing, and what needs attention.",
]

export default function OfficeHandoffProblemsPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Problem page</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
                Office handoff problems slow field-service businesses down long after the job is done.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                Stanley Systems helps field-service businesses clean up the handoff between the field, the office, and billing. When that handoff is messy, the business keeps paying for the job long after the crew has moved on.
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
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Common failure points</p>
              <ul className="mt-5 space-y-4">
                {failurePoints.map((item) => (
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
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Why it drags</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">The office is forced to do detective work</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                When notes are incomplete or scattered, the office is no longer processing clean work. It is rebuilding the story of the job after the fact. That delays invoicing, creates mistakes, and burns time on follow-up questions that should not exist.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What owners feel</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Everything comes back to the owner for answers</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Once the workflow stops being trustworthy, owners start acting like the backup system. They answer clarification calls, check job status manually, and fill in missing context because the handoff never became dependable.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What Stanley fixes</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">The workflow between done in the field and ready in the office</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Stanley Systems helps make the handoff clear enough that the next step can happen without guesswork. That usually means defining what must be captured, what triggers the next step, and what should get flagged early.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What a cleaner handoff creates</p>
              <ul className="mt-6 space-y-4">
                {outcomes.map((item) => (
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
                  { title: "How Stanley works", href: "/how-stanley-systems-works" },
                  { title: "Read the slow invoicing article", href: "/blog/real-cost-of-slow-invoicing-service-business" },
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
