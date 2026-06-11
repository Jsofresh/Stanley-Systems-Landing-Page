import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { plans } from "./tokens"

const auditSteps = [
  ["1", "Pay $197", "Get the AI Office Map."],
  ["2", "Map office work", "Use the numbers, not a guess."],
  ["3", "Choose the build", "Choose the build priority with confidence."],
  ["4", "Credit applied", "Get $197 monthly or $194 yearly back."],
] as const

export function WorkflowAuditBridge() {
  return (
    <section id="audit" data-section="audit-fallback" className="scroll-mt-[120px] bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-7xl gap-7 rounded-[1.35rem] border border-[#C8D8CE] bg-[#F8FBF9] p-6 shadow-[0_18px_46px_rgba(33,51,67,0.08)] lg:grid-cols-[1fr_0.82fr] lg:items-center lg:p-8">
        <div>
          <h2 className="max-w-3xl text-[2.25rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#102033] sm:text-5xl">
            Buy the assessment first. Let the numbers choose the system.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#33475B] sm:text-lg">
            The AI Office Map checks follow-up, missed calls, customer records, invoices, estimates, and office handoffs so the build priority matches the costly office work that should be removed first.
          </p>
          <div className="mt-5 grid gap-3 rounded-2xl border border-[#B7D8C0] bg-white p-3 sm:grid-cols-4">
            {auditSteps.map(([step, title, text]) => (
              <div key={title} className="relative rounded-xl border border-[#D5E9DC] bg-[#F8FCF9] p-3 text-left shadow-[0_8px_20px_rgba(33,51,67,0.05)]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#15803D] text-xs font-extrabold text-white">{step}</span>
                <p className="mt-3 text-sm font-extrabold text-[#102033]">{title}</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-[#516F90]">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#33475B]">
            You do not have to guess whether AI Office Ops, AI Office Installation Sprint, or both should come first.
          </p>
          <p className="mt-4 max-w-2xl rounded-xl border border-[#B7D8C0] bg-white px-4 py-3 text-sm font-bold leading-6 text-[#124E25]">
            If Stanley Systems cannot find a clear admin drag we can fix, you get your assessment fee back and a free AI Office Ops.
          </p>
        </div>

        <div className="rounded-[1.2rem] border border-[#C8D8CE] bg-white p-5 text-[#102033] shadow-[0_18px_38px_rgba(33,51,67,0.10)] lg:p-6">
          <h3 className="text-3xl font-bold tracking-[-0.04em]">Your assessment credit is visible before you buy.</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-2xl border border-[#D5DEE8] bg-[#F8FCF9] p-4">
              <p className="text-sm font-bold text-[#516F90]">Monthly package</p>
              <p className="mt-2 text-5xl font-extrabold tracking-[-0.06em] text-[#102033]">$197</p>
              <p className="mt-1 text-sm font-bold text-[#124E25]">credit</p>
            </div>
            <div className="rounded-2xl border border-[#B7D8C0] bg-[#E8F6EC] p-4">
              <span className="inline-flex rounded-full bg-[#E11D48] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_10px_22px_rgba(225,29,72,0.18)]">Double credit</span>
              <p className="mt-3 text-sm font-bold text-[#516F90]">Yearly package</p>
              <p className="mt-2 text-5xl font-extrabold tracking-[-0.06em] text-[#102033]">$194</p>
              <p className="mt-1 text-sm font-bold text-[#124E25]">credit</p>
            </div>
          </div>
          <CTALink
            href={plans.workflowAudit.stripePaymentLink.url}
            kind="checkout"
            location="repeat_revenue_audit_section_green_funnel"
            analyticsEvent="audit_checkout_clicked"
            analyticsSource="repeat_revenue_page"
            packageId="workflow_audit"
            packageName="AI Office Map"
            billingPeriod="one_time"
            ctaLabel="Get the AI Office Map"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#15803D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#17612E]"
          >
            Get the AI Office Map <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
          <a href="#scope" className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-md border-2 border-[#15803D] px-6 py-3 text-sm font-bold text-[#102033] transition hover:bg-[#E8F6EC]">
            Read what is included
          </a>
        </div>
      </div>
    </section>
  )
}
