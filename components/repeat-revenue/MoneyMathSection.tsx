import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { moneyRows, workflowAudit } from "./tokens"

export function MoneyMathSection() {
  return (
    <section id="math" data-section="money-math" className="scroll-mt-[120px] bg-[#F8F4EA] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1F7A3A]">Revenue math preview</p>
          <h2 className="mt-4 max-w-2xl font-serif text-[2.45rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#213343] sm:text-5xl">
            A quiet customer list can hide a month of work.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#33475B]">
            Example: 500 past customers, 5% ready to book again, $1,200 average job. That is $30,000 worth checking before reviews, referrals, or missed calls are counted.
          </p>
          <CTALink
            href={workflowAudit.stripePaymentLink.url}
            kind="checkout"
            location="repeat_revenue_math_audit_green_funnel"
            analyticsEvent="audit_checkout_clicked"
            analyticsSource="repeat_revenue_page"
            packageId="workflow_audit"
            packageName="Workflow Audit"
            billingPeriod="one_time"
            ctaLabel="Run the $97 Workflow Audit"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#1F7A3A] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#17612E]"
          >
            Run the $97 Workflow Audit <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
        </div>

        <div className="rounded-[1.25rem] border border-[#D5DEE8] bg-white p-6 shadow-[0_18px_46px_rgba(33,51,67,0.09)] sm:p-7">
          <div className="border-b border-[#D5DEE8] pb-5">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#516F90]">Example opportunity</p>
            <p className="mt-3 text-[4.25rem] font-bold leading-none tracking-[-0.06em] text-[#213343] sm:text-[5.5rem]">$30,000</p>
            <p className="mt-3 text-lg leading-8 text-[#33475B]">from past customers before missed calls, reviews, or referrals are counted.</p>
          </div>
          <div className="mt-1 divide-y divide-[#D5DEE8]">
            {moneyRows.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-5 py-4">
                <span className="text-base font-semibold text-[#33475B]">{label}</span>
                <span className="text-2xl font-bold tracking-[-0.035em] text-[#213343]">{value}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-lg bg-[#E8F6EC] px-4 py-3 text-sm font-semibold leading-6 text-[#124E25]">Example only. The audit uses your real records.</p>
        </div>
      </div>
    </section>
  )
}
