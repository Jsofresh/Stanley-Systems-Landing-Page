import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { internalPageLinks } from "@/components/internal-page-data"

export const metadata: Metadata = {
  title: "Field Service Automation | Stanley Systems",
  description:
    "Stanley Systems helps field-service businesses remove backend bottlenecks around invoicing, follow-up, and office handoffs without forcing a full software switch.",
  alternates: {
    canonical: "https://stanley-systems.com/field-service-automation",
  },
  openGraph: {
    title: "Field Service Automation | Stanley Systems",
    description:
      "Practical workflow automation for field-service businesses that need cleaner handoffs, better follow-up, and faster billing without extra operational noise.",
    url: "https://stanley-systems.com/field-service-automation",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const fieldServiceProblems = [
  "Work gets completed, but the office still has to chase details.",
  "Follow-up falls through when the day gets busy.",
  "Billing depends on scattered notes instead of one clean handoff.",
  "Owners end up manually checking status because the workflow is not dependable.",
]

const fieldServiceOutcomes = [
  "clearer handoffs between the field, office, and billing",
  "faster movement from completed work to invoice-ready work",
  "follow-up systems that happen on time and still feel human",
  "less manual chasing and less owner dependency",
]

export default function FieldServiceAutomationPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Industry page</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
                Field service automation should reduce dropped balls, not create more moving parts.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                Stanley Systems helps field-service businesses remove backend bottlenecks around invoicing, follow-up, and office handoffs. The goal is cleaner operations that the team can actually follow under real working conditions.
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
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Common field-service problems</p>
              <ul className="mt-5 space-y-4">
                {fieldServiceProblems.map((item) => (
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
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What usually breaks</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">The process depends on memory</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                When the workflow depends on people remembering the next step, the business gets fragile. Busy days erase good intentions. Admin work gets pushed late. Follow-up becomes inconsistent. Billing slows down.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What the team needs</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">A workflow that still works on a messy day</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Good field-service automation is not about adding more layers. It is about making the next step clearer and more reliable even when the schedule changes, the phone rings, and the office is juggling multiple jobs at once.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What Stanley does</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Fix the bottleneck before automating it harder</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Stanley Systems starts with the real handoff problem, tightens the workflow in plain English, and then automates the version the team can actually use without creating more confusion.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What better field-service automation creates</p>
              <ul className="mt-6 space-y-4">
                {fieldServiceOutcomes.map((item) => (
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
                  { title: "Missed estimate follow-up", href: "/missed-estimate-follow-up-for-service-businesses" },
                  { title: "Office handoff problems", href: "/office-handoff-problems-in-field-service-businesses" },
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
