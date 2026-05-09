import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { workflowAudit } from "./tokens"

export function WorkflowAuditFallback() {
  return (
    <section id="audit" data-section="audit-fallback" className="scroll-mt-[120px] bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.35rem] border border-[#C8D8CE] bg-[#E8F6EC] p-6 shadow-[0_18px_46px_rgba(33,51,67,0.08)] lg:grid-cols-[1fr_0.78fr] lg:items-center lg:p-9">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1F7A3A]">Not sure where to start?</p>
          <h2 className="mt-4 max-w-3xl font-serif text-[2.45rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#213343] sm:text-5xl">
            Buy the audit first. Let the numbers choose the system.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#33475B]">
            The Workflow Audit checks follow-up, missed calls, customer records, invoices, estimates, and office handoffs so the first build fixes the leak that actually costs money.
          </p>
          <p className="mt-5 max-w-2xl rounded-xl border border-[#B7D8C0] bg-white px-4 py-3 text-sm font-bold leading-6 text-[#124E25]">
            If Stanley Systems cannot find one clear money leak we can fix, you get your audit fee back and a free Repeat Revenue System.
          </p>
        </div>

        <div className="rounded-[1.2rem] border border-[#C8D8CE] bg-white p-6 text-[#213343] shadow-[0_18px_38px_rgba(33,51,67,0.10)]">
          <h3 className="text-3xl font-bold tracking-[-0.04em]">The audit credit keeps the first step from being wasted.</h3>
          <p className="mt-4 text-base leading-7 text-[#516F90]">
            If you buy a package after the audit, the audit credit applies to the package purchase.
          </p>
          <ul className="mt-4 grid gap-2 text-base font-bold text-[#124E25]">
            <li>$97 off monthly</li>
            <li>$194 off yearly</li>
          </ul>
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
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1F7A3A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#17612E]"
          >
            Buy the Workflow Audit <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
          <a href="#scope" className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-md border-2 border-[#1F7A3A] px-6 py-3 text-sm font-bold text-[#213343] transition hover:bg-[#E8F6EC]">
            Read what is included
          </a>
        </div>
      </div>
    </section>
  )
}
