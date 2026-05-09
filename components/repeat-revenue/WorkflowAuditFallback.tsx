import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { workflowAudit } from "./tokens"

export function WorkflowAuditFallback() {
  return (
    <section data-section="audit-fallback" className="bg-[#213343] px-4 py-18 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#FFBCAC]">Not sure where to start?</p>
          <h2 className="mt-5 max-w-3xl font-serif text-[2.55rem] font-semibold leading-[1.03] tracking-[-0.04em] text-white sm:text-5xl">
            Buy the audit first. Let the numbers choose the system.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
            The Workflow Audit checks follow-up, missed calls, customer records, invoices, estimates, and office handoffs so the first build fixes the leak that actually costs money.
          </p>
        </div>

        <div className="rounded-[1.25rem] border border-white/16 bg-white p-7 text-[#213343] shadow-[0_30px_70px_rgba(0,0,0,0.22)]">
          <h3 className="text-3xl font-bold tracking-[-0.04em]">The audit credit keeps the first step from being wasted.</h3>
          <p className="mt-4 text-base leading-7 text-[#516F90]">
            If you buy a package after the audit, the audit credit applies to the package purchase: $97 for monthly or $194 for yearly.
          </p>
          <CTALink
            href={workflowAudit.stripePaymentLink.url}
            kind="checkout"
            location="repeat_revenue_audit_section_hubspot_v2"
            analyticsEvent="audit_checkout_clicked"
            analyticsSource="repeat_revenue_page"
            packageId="workflow_audit"
            packageName="Workflow Audit"
            billingPeriod="one_time"
            ctaLabel="Buy the Workflow Audit"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#FF5C35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E04826]"
          >
            Buy the Workflow Audit <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
          <a href="#scope" className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-md border-2 border-[#FF5C35] px-6 py-3 text-sm font-bold text-[#213343] transition hover:bg-[#FFF1EB]">
            Read what is included
          </a>
        </div>
      </div>
    </section>
  )
}
