import { MarketingPageShell } from "@/components/marketing-page-shell"

const sections = [
  {
    title: "Reliable automations (not AI demos)",
    body:
      "Stanley Systems is built around reliable workflows, not buzzwords or certifications. The goal is simple: the process works on a busy Tuesday, not just in a demo.",
  },
  {
    title: "Guardrails for billing, scheduling, and follow-up",
    body:
      "When a workflow touches scheduling, invoicing, payments, or customer communication, Stanley Systems builds guardrails into the process. That means validations, required fields, status gates, and clear handoffs — not hoping a prompt behaves perfectly.",
  },
  {
    title: "No lost details between field → office → billing",
    body:
      "Operational failures usually come from missing context: a detail that never makes it from intake → job → billing → follow-up. Stanley Systems designs workflows so the right details are captured once and passed forward consistently, instead of relying on memory, texts, or retyping.",
  },
  {
    title: "Exceptions go to a human (no silent guesses)",
    body:
      "If something is ambiguous, risky, or customer-sensitive, the workflow escalates to a human. The system routes exceptions for review instead of quietly guessing.",
  },
  {
    title: "Clear logs + documentation",
    body:
      "Stanley Systems prefers systems that can be inspected: clear documentation, event history, and traceable steps. When something changes, it is visible — so the team is never stuck wondering what happened.",
  },
  {
    title: "Minimal access + controlled data flow",
    body:
      "Only the minimum information needed to run the workflow is collected and moved between tools. Access is limited to what is required to operate the system, and sensitive steps are structured so they do not depend on free-form AI behavior.",
  },
] as const

export default function SafetyPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-20 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur sm:p-12">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Stanley Systems safety</h1>
            <p className="mt-6 text-xl leading-9 text-slate-600 sm:text-[1.28rem]">
              This page explains how Stanley Systems builds reliable workflows with guardrails — especially when money, customers, and operations are on the line.
            </p>

            <div className="mt-10 space-y-8">
              {sections.map((section) => (
                <div key={section.title} className="border-t border-[#efe7db] pt-8 first:border-t-0 first:pt-0">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{section.title}</h2>
                  <p className="mt-3 text-base leading-8 text-slate-600">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  )
}
