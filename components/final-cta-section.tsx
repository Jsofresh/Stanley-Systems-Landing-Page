import { ArrowRight, Calculator } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
const calculatorHref = "/invoicing-delay-cash-flow-calculator"

const leaks = [
  ["Jobs finished", "Invoice still waiting"],
  ["Estimates open", "No next step"],
  ["Customers saved", "No follow-up"],
  ["Calls missed", "No recovery path"],
] as const

export function FinalCTASection() {
  return (
    <section
      id="final-audit"
      data-audit-page="/"
      data-audit-section="home.final-cta"
      data-nav-theme="light"
      data-audit-priority="4"
      data-audit-offer="Workflow Audit"
      data-audit-purpose="Give qualified service businesses a clear final path to book the Workflow Audit."
      className="relative mb-24 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border border-[#dbe7cf] bg-[linear-gradient(180deg,#f7fbf2_0%,#ffffff_100%)] shadow-[0_24px_70px_rgba(15,23,42,0.09)]">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-8 sm:p-10 lg:p-14">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">THE COST OF WAITING</p>
            <h3 className="mt-4 text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#102033] sm:text-5xl lg:text-[4.35rem]">
              The money leak is already happening.
            </h3>
            <div className="mt-6 space-y-2 text-lg font-semibold leading-8 text-[#334155] sm:text-xl">
              <p>The job is done, but the invoice waits.</p>
              <p>The estimate is sent, but nobody follows up.</p>
              <p>The customer is saved, but nobody brings them back.</p>
              <p>The call comes in, but nobody catches it.</p>
            </div>
            <p className="mt-6 max-w-2xl text-base font-bold leading-7 text-[#102033] sm:text-lg">
              That is how service businesses lose money without noticing it.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              The Workflow Audit finds the first leak, shows what it is costing, and gives you the first fix to make.
            </p>
          </div>

          <div className="border-t border-[#dbe7cf] bg-white/72 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="grid gap-3 sm:grid-cols-2">
              {leaks.map(([before, after]) => (
                <div key={before} className="rounded-2xl border border-[#dfe8da] bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                  <p className="text-sm font-bold text-[#475569]">{before}</p>
                  <p className="mt-2 text-xl font-extrabold tracking-[-0.035em] text-[#102033]">{after}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#b9dec3] bg-[#eaf7ee] p-5">
              <div className="flex items-center gap-3">
                <span className="h-1.5 flex-1 rounded-full bg-[#15803D]" aria-hidden="true" />
                <ArrowRight className="h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
              </div>
              <p className="mt-4 text-2xl font-extrabold leading-tight tracking-[-0.04em] text-[#102033]">
                The Workflow Audit finds which leak to fix first.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CTALink
                href={auditHref}
                kind="checkout"
                location="final_cta_primary"
                analyticsEvent="audit_checkout_clicked"
                analyticsSource="homepage_final_cta"
                packageId="workflow_audit"
                packageName="Workflow Audit"
                billingPeriod="one_time"
                ctaLabel="Book the Workflow Audit"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full bg-[#15803D] px-7 py-4 text-base font-extrabold text-white shadow-xl transition-all duration-300 hover:scale-[1.01] hover:bg-[#166534] sm:text-lg"
              >
                Book the Workflow Audit
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </CTALink>

              <CTALink
                href={calculatorHref}
                kind="calculator"
                location="final_cta_secondary"
                analyticsEvent="calculator_cta_clicked"
                analyticsSource="homepage_final_cta"
                ctaLabel="Run the Calculator First"
                className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full border border-[#cbd5c0] bg-white px-7 py-4 text-base font-extrabold text-[#102033] shadow-[0_10px_22px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-[#15803D] hover:bg-[#f3fbf5] sm:text-lg"
              >
                <Calculator className="h-5 w-5" />
                Run the Calculator First
              </CTALink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
