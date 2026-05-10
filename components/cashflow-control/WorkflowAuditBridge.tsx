import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { plans, sectionShell } from "./tokens"

const steps = [
  ["1", "Pay $97", "Start with the audit."],
  ["2", "Find the leak", "Use the numbers, not a guess."],
  ["3", "Choose the system", "Buy the first fix with confidence."],
  ["4", "Credit applied", "Get $97 monthly or $194 yearly back."],
]

export function WorkflowAuditBridge() {
  return (
    <section data-section="cashflow-workflow-audit-bridge" className="bg-[#F8FBF9] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className={`${sectionShell} grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
        <div>
          <h2 className="text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#071D3A] sm:text-[2.85rem]">
            Buy the audit first. Let the numbers choose the system.
          </h2>
          <p className="mt-4 text-base font-medium leading-7 text-[#536173] sm:text-lg">
            The Workflow Audit checks follow-up, missed calls, customer records, invoices, estimates, and office handoffs so the first build fixes the leak that actually costs money.
          </p>
          <p className="mt-4 text-base font-semibold leading-7 text-[#334B60]">
            You do not have to guess whether Repeat Revenue System, Cashflow Control System, or both should come first.
          </p>
          <p className="mt-3 rounded-2xl border border-[#CFE8D5] bg-white px-4 py-3 text-sm font-bold leading-6 text-[#116832]">
            If Stanley Systems cannot find one clear money leak we can fix, you get your audit fee back and a free Repeat Revenue System.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-[#D5DEE8] bg-white p-5 shadow-[0_18px_54px_rgba(16,32,51,0.08)]">
          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map(([number, title, copy]) => (
              <article key={title} className="rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#15803D] text-sm font-extrabold text-white">{number}</div>
                <h3 className="mt-3 text-lg font-extrabold tracking-[-0.03em] text-[#071D3A]">{title}</h3>
                <p className="mt-1 text-sm font-semibold leading-5 text-[#536173]">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-[#F0C8C1] bg-[#FFF6F4] p-4">
            <p className="text-sm font-extrabold text-[#071D3A]">Your audit credit is visible before you buy.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-3 ring-1 ring-[#F0C8C1]">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#8F1D1D]">Monthly package</p>
                <p className="mt-1 text-3xl font-black tracking-[-0.04em] text-[#B91C1C]">$97</p>
                <p className="text-sm font-bold text-[#8F1D1D]">credit</p>
              </div>
              <div className="rounded-xl bg-white p-3 ring-1 ring-[#F0C8C1]">
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#8F1D1D]">Yearly package</p>
                <p className="mt-1 text-3xl font-black tracking-[-0.04em] text-[#B91C1C]">$194</p>
                <p className="text-sm font-bold text-[#8F1D1D]">Double credit</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <CTALink href={plans.workflowAudit.stripePaymentLink.url} kind="checkout" location="cashflow_audit_bridge" analyticsEvent="audit_checkout_clicked" analyticsSource="cashflow_control_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Buy the Workflow Audit" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#116832]">
              Buy the Workflow Audit <ArrowRight className="ml-2 h-4 w-4" />
            </CTALink>
            <a href="/workflow-audit#packages" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#071D3A] transition hover:bg-[#F4FBF5]">
              Read what is included
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
