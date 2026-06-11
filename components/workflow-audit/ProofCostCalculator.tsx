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
            <h2 className={page.h2}>A few stuck jobs can cost more than the assessment.</h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <a href="/invoicing-delay-cash-flow-calculator" className={page.quietButton}>Use the Money Leak Calculator <ArrowRight className="ml-2 h-4 w-4" /></a>
              <CTALink href={auditHref} kind="checkout" location="workflow_audit_proof" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="AI Office Map" billingPeriod="one_time" ctaLabel="Get the AI Office Map" target="_blank" rel="noopener noreferrer" className={page.greenButton}>Get the AI Office Map</CTALink>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[690px]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-delayed-billing-quiet-estimates-review-flow.jpg"
              alt="Money Leak Map showing delayed billing, quiet estimates, and review flow leaks that can cost more than the assessment."
              width={1280}
              height={703}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
