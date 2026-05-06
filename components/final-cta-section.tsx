import { ArrowRight, Calculator } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
const calculatorHref = "/invoicing-delay-cash-flow-calculator"

export function FinalCTASection() {
  return (
    <section
      id="final-audit"
      data-audit-page="/"
      data-audit-section="home.final-cta"
      data-audit-priority="4"
      data-audit-offer="Workflow Audit"
      data-audit-purpose="Give qualified service businesses a clear final path to book the Workflow Audit."
      className="relative mb-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-5xl rounded-[2.25rem] border border-[#dbe7cf] bg-[linear-gradient(180deg,#f7fbf2_0%,#ffffff_100%)] p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.09)] sm:p-10 lg:p-14">
        <h3 className="text-balance text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Almost nothing to do. Costs everything to not do.
        </h3>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-700 sm:text-xl lg:text-[1.35rem] lg:leading-9">
          The jobs are finished. The estimates are open. The customers are already saved in your system. The money leak starts when nobody follows up, sends the invoice, catches the missed call, or moves the next step forward.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
          Stanley Systems starts with the Workflow Audit. We find the leak costing you first, then build the simplest system to keep money moving.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          If the leak is not real enough to fix, Stanley Systems will tell you before you buy a system.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row">
          <CTALink
            href={auditHref}
            kind="checkout"
            location="final_cta_primary"
            analyticsEvent="audit_checkout_clicked"
            analyticsSource="homepage_final_cta"
            packageId="workflow_audit"
            packageName="Workflow Audit"
            billingPeriod="one_time"
            ctaLabel="Buy the Workflow Audit"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-[#15803D] px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-[#166534] sm:text-xl lg:px-10 lg:py-5"
          >
            Buy the Workflow Audit
            <ArrowRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
          </CTALink>

          <CTALink
            href={calculatorHref}
            kind="calculator"
            location="final_cta_secondary"
            analyticsEvent="calculator_cta_clicked"
            analyticsSource="homepage_final_cta"
            ctaLabel="Calculate first"
            className="inline-flex items-center gap-3 rounded-full border border-[#d8d1c4] bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition-all duration-200 hover:bg-[#f3eee2] sm:text-xl lg:px-10 lg:py-5"
          >
            <Calculator className="h-5 w-5" />
            Calculate first
          </CTALink>
        </div>
      </div>
    </section>
  )
}
