import { ArrowRight, FileText } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { MoneyLeakChecksForm } from "@/components/money-leak-checks-form"
import type { WorkflowAuditOffer } from "@/lib/pricing/offers"

export function PricingCTA({ primaryOffer }: { primaryOffer: WorkflowAuditOffer }) {
  return (
    <section className="mx-auto max-w-5xl rounded-[2.25rem] border border-[#d7ecd9] bg-[linear-gradient(180deg,#f3fbf5_0%,#ffffff_100%)] p-7 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">
      <h2 className="text-balance text-[2.15rem] font-semibold leading-tight tracking-[-0.03em] text-[#102033] sm:text-5xl">
        Find the office work your current team should fix first.
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#536173] sm:text-lg">
        Book the AI Office Map. Stanley Systems will show where work is getting stuck, what your current tools already handle, and which AI-guided workflow should be installed first.
      </p>
      <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <CTALink
          href={primaryOffer.cta.href}
          kind="book_meeting"
          location="pricing_final_primary"
          analyticsEvent="audit_checkout_clicked"
          analyticsSource="pricing_page"
          packageId={primaryOffer.analyticsPackageId}
          packageName={primaryOffer.packageName}
          billingPeriod={primaryOffer.billingPeriod}
          ctaLabel="Book the AI Office Map"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-base font-bold text-white shadow-[0_18px_38px_rgba(21,128,61,0.24)] transition hover:bg-[#116832] sm:px-8"
        >
          Book the AI Office Map
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </CTALink>
        <CTALink
          href="/ai-office-blueprint"
          kind="systems"
          location="pricing_final_secondary"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d8d1c4] bg-white px-6 py-3 text-base font-bold text-[#102033] shadow-[0_10px_24px_rgba(16,32,51,0.06)] transition hover:bg-[#fbfaf7] sm:px-8"
        >
          <FileText className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
          Get the Free Blueprint
        </CTALink>
      </div>
      <p className="mx-auto mt-5 max-w-2xl text-sm font-bold leading-6 text-[#607080]">Still hesitating? <a href="/contact?path=pre-buy" className="text-[#116832] underline underline-offset-4">Ask us a question before buying.</a></p>
      <MoneyLeakChecksForm source="pricing-money-leak-checks" pageSource="pricing_money_leak_checks" className="mt-8 text-left" />
    </section>
  )
}
