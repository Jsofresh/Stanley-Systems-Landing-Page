import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { workflowAudit } from "./tokens"

export function WorkflowAuditFallback() {
  return (
    <section id="audit" data-section="audit-fallback" className="scroll-mt-[120px] bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.35rem] border border-[#C8D8CE] bg-[#E8F6EC] p-6 shadow-[0_18px_46px_rgba(33,51,67,0.08)] lg:grid-cols-[1fr_0.82fr] lg:items-center lg:p-9">
        <div>
          <p className="text-sm font-bold text-[#15803D]">Safe first move</p>
          <h2 className="mt-4 max-w-3xl text-[2.35rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#102033] sm:text-5xl">
            Buy the audit first. Let the numbers choose the system.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#33475B]">
            The Workflow Audit checks follow-up, missed calls, customer records, invoices, estimates, and office handoffs so the first build fixes the leak that actually costs money.
          </p>
          <div className="mt-6 grid gap-3 rounded-2xl border border-[#B7D8C0] bg-white p-4 text-center text-sm font-extrabold text-[#102033] sm:grid-cols-4">
            <span>Pay $97</span>
            <span className="text-[#15803D]">→</span>
            <span>Find the leak</span>
            <span>Choose the system</span>
            <span className="hidden text-[#15803D] sm:block">→</span>
            <span className="sm:col-span-3">Get credit back</span>
          </div>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#33475B]">
            The audit keeps the first step from being wasted. You do not have to guess whether Repeat Revenue System, Cashflow Control System, or both should come first.
          </p>
          <p className="mt-5 max-w-2xl rounded-xl border border-[#B7D8C0] bg-white px-4 py-3 text-sm font-bold leading-6 text-[#124E25]">
            If Stanley Systems cannot find one clear money leak we can fix, you get your audit fee back and a free Repeat Revenue System.
          </p>
        </div>

        <div className="rounded-[1.2rem] border border-[#C8D8CE] bg-white p-6 text-[#102033] shadow-[0_18px_38px_rgba(33,51,67,0.10)]">
          <h3 className="text-3xl font-bold tracking-[-0.04em]">Your audit credit is visible before you buy.</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-2xl border border-[#D5DEE8] bg-[#F8FCF9] p-4">
              <p className="text-sm font-bold text-[#516F90]">Monthly package</p>
              <p className="mt-2 text-5xl font-extrabold tracking-[-0.06em] text-[#102033]">$97</p>
              <p className="mt-1 text-sm font-bold text-[#124E25]">credit</p>
            </div>
            <div className="relative rounded-2xl border border-[#B7D8C0] bg-[#E8F6EC] p-4">
              <span className="absolute right-3 top-3 rounded-full bg-[#15803D] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-white">Double credit</span>
              <p className="text-sm font-bold text-[#516F90]">Yearly package</p>
              <p className="mt-2 text-5xl font-extrabold tracking-[-0.06em] text-[#102033]">$194</p>
              <p className="mt-1 text-sm font-bold text-[#124E25]">credit</p>
            </div>
          </div>
          <CTALink
            href={workflowAudit.stripePaymentLink.url}
            kind="checkout"
            location="repeat_revenue_audit_section_green_funnel"
            analyticsEvent="audit_checkout_clicked"
            analyticsSource="repeat_revenue_page"
            packageId="workflow_audit"
            packageName="Workflow Audit"
            billingPeriod="one_time"
            ctaLabel="Buy the Workflow Audit"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#15803D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#17612E]"
          >
            Buy the Workflow Audit <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
          <a href="#scope" className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-md border-2 border-[#15803D] px-6 py-3 text-sm font-bold text-[#102033] transition hover:bg-[#E8F6EC]">
            Read what is included
          </a>
        </div>
      </div>
    </section>
  )
}
