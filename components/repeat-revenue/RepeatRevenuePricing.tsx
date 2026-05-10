import { PackagePricingGrid } from "@/components/package-pricing-cards"
import { packageCards, workflowAudit } from "./tokens"

export function RepeatRevenuePricing() {
  return (
    <section id="plans" data-section="pricing" className="scroll-mt-[120px] bg-[#F8FBF9] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold text-[#15803D]">Packages</p>
          <h2 className="mt-3 text-[2.2rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#102033] sm:text-5xl lg:text-[2.9rem]">
            Choose the path that matches the leak.
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-[#33475B] sm:text-lg">
            Buy the package that matches the problem you already know, or start with the audit and let the numbers choose the first build.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-[#B7D8C0] bg-white px-5 py-3 text-center text-sm font-extrabold text-[#124E25] shadow-[0_12px_30px_rgba(33,51,67,0.06)]">
          Yearly plans show the rounded monthly price first, bill yearly, remove the installation fee, and double the audit credit to $194.
        </div>

        <PackagePricingGrid
          cards={packageCards}
          locationPrefix="repeat_revenue_pricing_green_funnel"
          analyticsSource="repeat_revenue_page"
          showAuditSecondary
          auditHref={workflowAudit.stripePaymentLink.url}
        />
      </div>
    </section>
  )
}
