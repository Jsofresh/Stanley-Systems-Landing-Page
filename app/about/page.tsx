import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { internalPageLinks } from "@/components/internal-page-data"

const workflowAuditHref = "/pricing#workflow-audit"
const phoneHref = "tel:+16179586372"
const phoneLabel = "Call +1 (617) 958-6372"

export const metadata: Metadata = {
  title: "About Stanley Systems | Finished Work Should Turn Into Cash Faster",
  description:
    "Stanley Systems helps service businesses find office gaps that delay invoices, stall estimates, miss follow-up, and keep owners chasing details by hand.",
  alternates: {
    canonical: "https://stanley-systems.com/about",
  },
  openGraph: {
    title: "About Stanley Systems | Finished Work Should Turn Into Cash Faster",
    description:
      "Stanley Systems helps service businesses find and fix the office gaps that slow cash, follow-up, and owner relief.",
    url: "https://stanley-systems.com/about",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const commonLeaks = [
  "Finished jobs waiting too long to become invoices",
  "Open estimates with no clear next step",
  "Invoices aging without the right follow-up",
  "Office teams retyping, checking, and chasing the same details",
]

const moneyLeaks = [
  {
    title: "Finished jobs wait too long",
    body: "The work is done, but the invoice still needs notes, prices, photos, or approval before cash can move.",
  },
  {
    title: "Good estimates sit with no next step",
    body: "Quoted work gets sent, then nobody owns the follow-up. That is revenue sitting in the open.",
  },
  {
    title: "The office loses hours chasing job details",
    body: "Your team has to hunt for notes, photos, prices, and approvals after the crew has moved on.",
  },
  {
    title: "The owner becomes the person everyone asks",
    body: "When job details are missing, the team goes to the owner. That steals time from sales, hiring, and running the business.",
  },
]

const jobToCashSteps = ["Finished Job", "Invoice Ready", "Follow-Up Owned", "Cash Collected"]
const leakPoints = ["Missing notes", "No invoice", "No follow-up", "Owner chasing details"]
const cleanPath = ["Clear action list", "Invoice sent today", "Follow-up owned", "Cash moving"]

const systems = [
  {
    title: "Cashflow Control System",
    promise: "Turn finished work into collected cash faster.",
    body: "Stanley Systems catches the gaps that delay invoices, slow payment, waste payroll hours, and keep completed work from turning into collected revenue.",
  },
  {
    title: "Repeat Revenue System",
    promise: "Get more money from the customers you already earned.",
    body: "Stanley Systems helps past customers come back, creates a steady review-request rhythm, and makes sure new calls get followed up before the work is lost.",
  },
]

const founderProofTiles = [
  {
    title: "Business judgment",
    body: "First-place winner in a competitive business school consulting competition.",
  },
  {
    title: "Hands-on coding",
    body: "Earned money for coding work through hackathons and technical builds.",
  },
  {
    title: "Technical training",
    body: "Continuing the coding side through Harvard computer science coursework.",
  },
]

export default function AboutPage() {
  return (
    <MarketingPageShell>
      <main className="bg-[#fbfaf7] px-4 pb-12 pt-24 sm:pt-28 lg:px-8 lg:pb-16 lg:pt-32">
        <div className="mx-auto max-w-6xl">
          <section className="grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <div className="rounded-[2rem] border border-[#dbe9d5] bg-[linear-gradient(135deg,#ffffff_0%,#f4fbf5_100%)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[4.25rem] lg:leading-[1.02]">
                Finished work should turn into cash faster.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
                Stanley Systems helps service businesses find the office gaps that delay invoices, stall estimates, and leave owners chasing details. We start with the leak that is costing the business cash first, inside the tools your team already uses.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={workflowAuditHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3.5 text-base font-semibold text-white shadow-[0_14px_34px_rgba(21,128,61,0.22)] transition hover:bg-[#166534] focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2"
                >
                  Start with the Workflow Audit
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={phoneHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-[#f4efe6] focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2"
                >
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  {phoneLabel}
                </a>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#dbe9d5] bg-white p-6 shadow-[0_18px_56px_rgba(15,23,42,0.06)] sm:p-7">
              <div className="flex h-full flex-col justify-between gap-7">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Common leaks Stanley Systems finds</h2>
                  <ul className="mt-5 space-y-4">
                    {commonLeaks.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[1.35rem] border border-[#cfe8d5] bg-[#f4fbf5] p-4">
                  <p className="text-lg font-semibold leading-7 text-slate-950">The work is getting done. The cash is getting stuck before billing, follow-up, or collection.</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">The Workflow Audit starts there before anything gets built.</p>
                </div>
              </div>
            </aside>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {moneyLeaks.map((leak, index) => (
              <article
                key={leak.title}
                className="rounded-[1.45rem] border border-[#e4eadf] bg-white p-5 shadow-[0_16px_42px_rgba(15,23,42,0.045)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#15803D] text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h2 className="mt-5 text-xl font-semibold leading-7 tracking-tight text-slate-950">{leak.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-700">{leak.body}</p>
              </article>
            ))}
          </section>

          <section className="mt-10 overflow-hidden rounded-[2rem] border border-[#dbe9d5] bg-white shadow-[0_20px_70px_rgba(15,23,42,0.07)]">
            <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="bg-[#f4fbf5] p-6 sm:p-8">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">The path from job to cash should be visible.</h2>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  Stanley Systems looks for the exact place where finished work stops moving toward payment.
                </p>
              </div>
              <div className="p-5 sm:p-8">
                <div className="grid gap-3 sm:grid-cols-4">
                  {jobToCashSteps.map((step, index) => (
                    <div key={step} className="relative rounded-[1.2rem] border border-[#dbe9d5] bg-[#fbfaf7] p-4 text-center">
                      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#15803D] shadow-sm">
                        {index + 1}
                      </div>
                      <div className="mt-3 text-sm font-semibold leading-5 text-slate-950">{step}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-2">
                  <div className="rounded-[1.2rem] border border-rose-100 bg-rose-50/55 p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-rose-700">Where money stalls</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {leakPoints.map((point) => (
                        <span key={point} className="rounded-full border border-rose-100 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.2rem] border border-[#cfe8d5] bg-[#f4fbf5] p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#15803D]">What gets cleaned up</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cleanPath.map((point) => (
                        <span key={point} className="rounded-full border border-[#cfe8d5] bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[2rem] border border-[#e8dfd0] bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.055)] sm:p-8">
            <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Fix the first leak worth fixing.</h2>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  The Workflow Audit shows what to fix first. Some shops need invoices and payments moving faster. Others need better customer follow-up. Some need both.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {systems.map((system) => (
                  <article key={system.title} className="rounded-[1.45rem] border border-[#dbe9d5] bg-[#fbfaf7] p-5">
                    <h3 className="text-xl font-semibold leading-7 text-slate-950">{system.title}</h3>
                    <p className="mt-3 text-base font-semibold leading-7 text-[#15803D]">{system.promise}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-700">{system.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[2rem] border border-[#cfe8d5] bg-[linear-gradient(135deg,#f4fbf5_0%,#ffffff_62%,#eef9f2_100%)] p-6 shadow-[0_18px_60px_rgba(21,128,61,0.09)] sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Find the first leak worth fixing.</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                  The Workflow Audit shows where cash, customers, and office hours are getting lost before you pay for the wrong fix. You leave knowing what is leaking, what it costs, and what to fix first.
                </p>
              </div>
              <Link
                href={workflowAuditHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3.5 text-base font-semibold text-white shadow-[0_14px_34px_rgba(21,128,61,0.22)] transition hover:bg-[#166534] focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2"
              >
                Start with the Workflow Audit
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section className="mt-10 rounded-[2rem] border border-[#dfe8d4] bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem] lg:leading-[1.06]">
                  Founder-led diagnosis. Hands-on build.
                </h2>
                <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                  <p>
                    I’m Jaden, founder of Stanley Systems. I built Stanley Systems because service businesses do not need another dashboard, software pitch, or bloated agency process. They need the money leak found, fixed, and kept from coming back.
                  </p>
                  <p>
                    That is the point of the Workflow Audit. Find where cash, follow-up, and office time are slipping. Then build the practical system that closes the gap.
                  </p>
                  <p>
                    Stanley Systems carries my middle name and my grandfather’s name, so the work has to be practical, useful, and built to last.
                  </p>
                  <p className="font-semibold text-slate-950">
                    You are not buying theory. You are getting a founder-led build tied to cash, follow-up, and office time.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {founderProofTiles.map((tile) => (
                  <article key={tile.title} className="rounded-[1.5rem] border border-[#e5eadf] bg-[#fbfaf6] p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)]">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">{tile.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{tile.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[1.75rem] border border-[#e8dfd0] bg-white/75 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">Read more about where cash gets stuck</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">If you want to find the first cash leak in your business, start with the Workflow Audit.</p>
              </div>
              <Link href={workflowAuditHref} className="inline-flex items-center text-sm font-semibold text-[#15803D] hover:text-[#166534]">
                Start with the Workflow Audit
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {internalPageLinks.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="rounded-[1.1rem] border border-[#e8dfd0] bg-[#fbfaf7] px-4 py-4 text-slate-900 transition hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold leading-5">{page.title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </MarketingPageShell>
  )
}
