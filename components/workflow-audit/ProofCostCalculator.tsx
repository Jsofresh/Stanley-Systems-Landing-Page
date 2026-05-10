import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

export function ProofCostCalculator() {
  const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
  return (
    <section data-section="proof-cost-calculator" data-nav-theme="light" className="px-4 py-9 sm:px-6 lg:px-8 lg:py-10">
      <div className={page.wrap}>
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <h2 className={page.h2}>A few stuck jobs can cost more than the audit.</h2>
            <p className={`${page.lead} mt-4`}>The audit turns examples like delayed billing, quiet estimates, open balances, missed reviews, and payroll waste into a clear first-fix decision.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a href="/invoicing-delay-cash-flow-calculator" className={page.quietButton}>Use the Money Leak Calculator <ArrowRight className="ml-2 h-4 w-4" /></a>
              <CTALink href={auditHref} kind="checkout" location="workflow_audit_proof" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the Workflow Audit" target="_blank" rel="noopener noreferrer" className={page.greenButton}>Start the Workflow Audit</CTALink>
            </div>
          </div>
          <div className="mx-auto max-w-[650px] overflow-hidden rounded-[1.5rem] border border-[#d9e5dc] bg-white shadow-[0_16px_46px_rgba(7,29,58,0.06)]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-leak-examples-cta.jpg"
              alt="Examples of leaks the Workflow Audit can find and turn into a first fix recommendation."
              width={1280}
              height={720}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto max-h-[440px] w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
