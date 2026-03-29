import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "How Stanley Systems Works | Practical Workflow Automation",
  description:
    "See how Stanley Systems approaches workflow cleanup, bottleneck diagnosis, and practical automation for service businesses without overcomplicating the operation.",
  alternates: {
    canonical: "https://stanley-systems.com/how-stanley-systems-works",
  },
  openGraph: {
    title: "How Stanley Systems Works | Practical Workflow Automation",
    description:
      "Stanley Systems starts with the real bottleneck, tightens the workflow, and automates only the steps that should stop depending on memory or manual re-entry.",
    url: "https://stanley-systems.com/how-stanley-systems-works",
    siteName: "Stanley Systems",
    type: "article",
  },
}

const steps = [
  {
    title: "Find the real bottleneck",
    body:
      "The first step is figuring out where work actually gets stuck. That might be invoicing, estimate follow-up, office handoff, or another repeat problem that keeps creating drag.",
  },
  {
    title: "Map the workflow in plain English",
    body:
      "Before anything gets automated, the process should make sense from start to finish. If the workflow cannot be explained simply, the system is probably still too fragile.",
  },
  {
    title: "Tighten the handoff",
    body:
      "The goal is to reduce missing information, duplicate entry, and side-channel confusion. This is where most of the real gains come from.",
  },
  {
    title: "Automate the clean version",
    body:
      "Once the process is clear, the repeat parts can move automatically. That might be a billing handoff, estimate follow-up sequence, scheduling step, or customer update flow.",
  },
]

const principles = [
  "Use the tools the business already has whenever possible.",
  "Keep people in control of the exceptions.",
  "Avoid automating a messy process just because a tool can do it.",
  "Make the workflow understandable to the owner and team.",
  "Document the important moving parts so the business is not stuck with a black box.",
]

export default function HowStanleySystemsWorksPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">How Stanley Systems works</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              Clean up the workflow first. Then automate the parts that should stop depending on memory.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
              The point is not to impress the team with complexity. The point is to make work move more cleanly through the business, with fewer dropped details and fewer owner rescue missions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {steps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-[1.85rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Step {String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">{step.title}</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Core principles</p>
              <ul className="mt-6 space-y-4">
                {principles.map((principle) => (
                  <li key={principle} className="flex gap-3 text-base leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">What that usually means in practice</p>
              <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
                <p>
                  A technician finishes a job and the office gets what it needs without chasing notes. A quote goes out and follow-up happens on time. A manager can see what is waiting, what is complete, and what needs attention without rebuilding the story from scratch.
                </p>
                <p>
                  That is what practical workflow automation is supposed to feel like. Less confusion. Faster handoff. Better visibility. More trust in the process.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/stanley-systems-case-study"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-slate-800"
                >
                  See proof and case-study direction
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-[#f4efe6]"
                >
                  Book a meeting
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  )
}
