import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { moneyRows, workflowAudit } from "./tokens"

export function MoneyMathSection() {
  return (
    <section data-section="money-math" className="bg-[#F8F4EA] px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#FF5C35]">Revenue leak preview</p>
          <h2 className="mt-5 max-w-2xl font-serif text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#213343] sm:text-5xl">
            A quiet customer list can hide a month of work.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#33475B]">
            This is not a promise. It is the kind of simple check the Workflow Audit runs against your real records before a system is built.
          </p>
          <CTALink
            href={workflowAudit.stripePaymentLink.url}
            kind="checkout"
            location="repeat_revenue_math_audit_hubspot_v2"
            analyticsEvent="audit_checkout_clicked"
            analyticsSource="repeat_revenue_page"
            packageId="workflow_audit"
            packageName="Workflow Audit"
            billingPeriod="one_time"
            ctaLabel="Run the $97 Workflow Audit"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#FF5C35] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#E04826]"
          >
            Run the $97 Workflow Audit <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
        </div>

        <div className="rounded-[1.35rem] border border-[#D5DEE8] bg-white p-6 shadow-[0_20px_54px_rgba(33,51,67,0.10)] sm:p-8">
          <div className="border-b border-[#D5DEE8] pb-6">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#516F90]">Example opportunity</p>
            <p className="mt-3 text-[4.5rem] font-bold leading-none tracking-[-0.065em] text-[#213343] sm:text-[6rem]">$30,000</p>
            <p className="mt-3 text-lg leading-8 text-[#33475B]">from past customers before missed calls, reviews, or referrals are counted.</p>
          </div>
          <div className="mt-2 divide-y divide-[#D5DEE8]">
            {moneyRows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-5 py-5">
                <span className="text-base font-semibold text-[#33475B]">{label}</span>
                <span className="text-2xl font-bold tracking-[-0.035em] text-[#213343]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
