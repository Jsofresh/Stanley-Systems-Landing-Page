import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { internalPageLinks } from "@/components/internal-page-data"

export const metadata: Metadata = {
  title: "Marine Service Automation | Stanley Systems",
  description:
    "Stanley Systems helps marine service businesses clean up invoicing, follow-up, and office handoffs without forcing the team into a whole new software stack.",
  alternates: {
    canonical: "https://stanley-systems.com/marine-service-automation",
  },
  openGraph: {
    title: "Marine Service Automation | Stanley Systems",
    description:
      "Practical automation for marine service businesses that need cleaner office workflows, faster invoicing, and fewer dropped details between the field and billing.",
    url: "https://stanley-systems.com/marine-service-automation",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const marinePainPoints = [
  "Completed work orders take too long to become invoice-ready.",
  "Job details, approvals, and service notes get split across the dock, the shop, and the office.",
  "Follow-up depends on whoever remembers to do it after a packed day.",
  "Administrative drag keeps cash flow slower than it should be.",
]

const marineFit = [
  "mobile crews and office staff working across different contexts",
  "high-value jobs where slow billing hurts more",
  "service notes and approvals that need to move cleanly into the next system",
  "owner-led operations where the founder still ends up catching the dropped balls",
]

export default function MarineServiceAutomationPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Industry page</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
                Marine service automation should make the office run cleaner, not add more software chaos.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                Stanley Systems helps marine service businesses tighten the handoff between work completed, office processing, and billing. The goal is practical automation that helps cash move faster and admin drag stay under control.
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
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Common marine-service pain points</p>
              <ul className="mt-5 space-y-4">
                {marinePainPoints.map((item) => (
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
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Where the drag usually starts</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">The handoff is fragmented</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Marine service businesses often have great technical execution and messy operational handoffs. Details live in texts, calls, paperwork, and memory. That turns simple office work into reconstruction work.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What matters operationally</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Faster billing and cleaner closeout</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The biggest win is rarely a flashy dashboard. It is getting completed work turned into clean next steps without office backtracking, owner intervention, or billing delay.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Why Stanley fits</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">The work stays grounded in real operations</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Stanley Systems focuses on practical workflow fixes inside the tools the business already uses, rather than pushing a whole new system just because it looks cleaner in a demo.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Why this page exists</p>
              <ul className="mt-6 space-y-4">
                {marineFit.map((item) => (
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
                  { title: "Coastline proof direction", href: "/stanley-systems-case-study" },
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
