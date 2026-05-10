import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

export function AuditChecks() {
  const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
  return (
    <section id="audit-checks" data-section="what-audit-checks" data-nav-theme="light" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-6">
      <div className={page.wrap}>
        <div className="grid gap-4 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className={page.eyebrow}>What gets checked</p>
            <h2 className="mt-2 max-w-2xl text-[2.05rem] font-semibold leading-[1.03] tracking-[-0.05em] text-[#071D3A] sm:text-[2.8rem] lg:text-[3.05rem]">What Stanley Systems checks during the audit</h2>
          </div>
          <p className="text-sm font-semibold leading-6 text-[#536173] lg:max-w-xl">
            The audit combines a workflow walkthrough with a data-backed review of where cash, customers, and office time are slipping. You get a clear map, not another generic checklist.
          </p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#d9e5dc] bg-white shadow-[0_18px_54px_rgba(7,29,58,0.06)]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-workflow-overview.jpg"
              alt="Workflow Audit overview showing how Stanley maps the workflow and identifies revenue leaks."
              width={1280}
              height={640}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-[#d9e5dc] bg-white shadow-[0_18px_54px_rgba(7,29,58,0.06)]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-deliverables-overview.jpg"
              alt="Workflow Audit deliverables overview with money leak summary, workflow map, priorities, and recommendation."
              width={1280}
              height={960}
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <CTALink href={auditHref} kind="checkout" location="workflow_audit_checks" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the $97 Workflow Audit" target="_blank" rel="noopener noreferrer" className={page.greenButton}>
            Start the $97 Workflow Audit <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </CTALink>
        </div>
      </div>
    </section>
  )
}
