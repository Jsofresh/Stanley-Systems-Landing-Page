import { ArrowRight, Calculator } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import type { PricingCalculatorContext, WorkflowAuditOffer } from "@/lib/pricing/offers"

export function PricingHero({ offer, calculatorContext }: { offer: WorkflowAuditOffer; calculatorContext?: PricingCalculatorContext | null }) {
  return (
    <section className="px-4 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-34">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#e7e1d6] bg-white px-5 py-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.075)] sm:rounded-[2.5rem] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <h1 className="mx-auto max-w-5xl text-balance text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#102033] sm:text-5xl lg:text-[4.25rem]">
          Choose the system that stops the money leak.
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#536173] sm:text-lg sm:leading-8">
          Start with the Cash Flow Assessment if you are not sure where money is being dropped. If the leak is already clear, pick the system that fixes it.
        </p>
        <p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#102033] sm:text-base">
          Late invoices. Missed calls. Forgotten follow-ups. Past customers nobody contacts again. Or all of it at once.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <CTALink
            href={offer.cta.href}
            kind="book_meeting"
            location="pricing_hero_primary"
            analyticsEvent="audit_checkout_clicked"
            analyticsSource="pricing_page"
            packageId={offer.analyticsPackageId}
            packageName={offer.packageName}
            billingPeriod={offer.billingPeriod}
            ctaLabel={offer.cta.label}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-base font-bold text-white shadow-[0_18px_38px_rgba(21,128,61,0.24)] transition hover:bg-[#116832] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:px-8"
          >
            {offer.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
          <CTALink
            href="/invoicing-delay-cash-flow-calculator"
            kind="calculator"
            location="pricing_hero_secondary"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d8d1c4] bg-white px-6 py-3 text-base font-bold text-[#102033] shadow-[0_10px_24px_rgba(16,32,51,0.06)] transition hover:bg-[#fbfaf7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:px-8"
          >
            <Calculator className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
            Calculate the leak
          </CTALink>
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-sm font-semibold leading-6 text-[#5f6e7d]">
          The assessment comes first when the leak is not clear. Build work follows the leak Stanley Systems can actually fix.
        </p>
        {calculatorContext?.source === "calculator" ? (
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#15803D]">
            Your calculator result is loaded below with rounded estimates only.
          </p>
        ) : null}
      </div>
    </section>
  )
}
