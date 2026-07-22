import { ArrowRight, FileText } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import type { PricingCalculatorContext, WorkflowAuditOffer } from "@/lib/pricing/offers"

export function PricingHero({ offer, calculatorContext }: { offer: WorkflowAuditOffer; calculatorContext?: PricingCalculatorContext | null }) {
  return (
    <section className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-[7.5rem]">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#e7e1d6] bg-white px-5 py-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.075)] sm:rounded-[2.5rem] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <h1 className="mx-auto max-w-5xl text-balance text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#102033] sm:text-5xl lg:text-[4.25rem]">
          Start with the $197 AI Profit Map. Then install only the workflows worth building.
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-7 text-[#536173]">Stanley Systems first maps where office work is slowing down billing, follow-up, records, and job admin. If there is a clear fit, the AI Office Installation Sprint turns that map into staff training, a company playbook, and practical installed office workflows.</p>
        <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
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
            href="/ai-office-blueprint"
            kind="systems"
            location="pricing_hero_secondary"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d8d1c4] bg-white px-6 py-3 text-base font-bold text-[#102033] shadow-[0_10px_24px_rgba(16,32,51,0.06)] transition hover:bg-[#fbfaf7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:px-8"
          >
            <FileText className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
            Get the Free Blueprint
          </CTALink>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-6 text-[#607080]">Need one answer before you pay? <a href="/contact?path=pre-buy" className="text-[#116832] underline underline-offset-4">Ask before buying</a> and we will tell you whether the AI Profit Map is the right next step.</p>
        {calculatorContext?.source === "calculator" ? (
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#15803D]">
            Your calculator result is loaded below with rounded estimates only.
          </p>
        ) : null}
      </div>
    </section>
  )
}
