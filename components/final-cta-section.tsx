import Image from "next/image"
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
      data-section="cost-of-waiting"
      data-nav-theme="light"
      data-audit-priority="4"
      data-audit-offer="Workflow Audit"
      data-audit-purpose="Give qualified service businesses a clear final path to book the Workflow Audit."
      className="relative mb-16 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#dbe7cf] bg-[linear-gradient(180deg,#f7fbf2_0%,#ffffff_100%)] shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
          <div className="p-7 sm:p-9 lg:p-11">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#15803D]">The Cost of Waiting</p>
            <h3 className="mt-3 text-balance text-[38px] font-semibold leading-[0.98] tracking-[-0.045em] text-[#102033] sm:text-[52px] lg:text-[62px]">
              The money leak is already happening.
            </h3>
            <div className="mt-5 space-y-1.5 text-[17px] font-semibold leading-7 text-[#334155] sm:text-[19px]">
              <p>The job is done, but the invoice waits.</p>
              <p>The estimate is sent, but nobody follows up.</p>
              <p>The customer is saved, but nobody brings them back.</p>
              <p>The call comes in, but nobody catches it.</p>
            </div>
            <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-[#102033] sm:text-lg">
              That is how service businesses lose money without noticing it.
            </p>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              The Workflow Audit finds the first leak, shows what it is costing, and gives you the first fix to make.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
                className="group inline-flex h-[48px] min-w-[238px] items-center justify-center gap-2 rounded-full bg-[#15803D] px-5 py-0 text-[14px] font-extrabold leading-none text-white shadow-xl transition-all duration-300 hover:scale-[1.01] hover:bg-[#166534] sm:whitespace-nowrap"
              >
                Book the Workflow Audit
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </CTALink>

              <CTALink
                href={calculatorHref}
                kind="calculator"
                location="final_cta_secondary"
                analyticsEvent="calculator_cta_clicked"
                analyticsSource="homepage_final_cta"
                ctaLabel="Run the Calculator First"
                className="inline-flex h-[48px] min-w-[238px] items-center justify-center gap-2 rounded-full border border-[#cbd5c0] bg-white px-5 py-0 text-[14px] font-extrabold leading-none text-[#102033] shadow-[0_10px_22px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-[#15803D] hover:bg-[#f3fbf5] sm:whitespace-nowrap"
              >
                <Calculator className="h-4 w-4" />
                Run the Calculator First
              </CTALink>
            </div>
          </div>

          <div className="border-t border-[#dbe7cf] bg-white/72 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
            <div className="overflow-hidden rounded-[24px] border border-[#dfe8da] bg-white shadow-[0_14px_32px_rgba(15,23,42,0.06)]">
              <Image
                src="/images/generated/homepage/cost-of-waiting-wide.webp"
                alt="Cost of waiting illustration showing delayed invoices, open estimates, quiet past customers, and missed calls draining revenue until an audit identifies the leak."
                width={1536}
                height={1024}
                className="h-auto w-full object-contain"
                loading="eager"
              />
            </div>

            <div className="mt-4 rounded-[22px] border border-[#b9dec3] bg-[#eaf7ee] p-5">
              <p className="text-[23px] font-extrabold leading-tight tracking-[-0.04em] text-[#102033]">
                Workflow Audit finds the first leak to fix.
              </p>
              <p className="mt-2 text-[14px] font-semibold leading-6 text-[#365044]">
                Delayed invoices. Open estimates. Old customers. Missed calls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
