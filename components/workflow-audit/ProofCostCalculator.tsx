import { ArrowRight } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

const proof = [
  ["Delayed billing", "5 completed jobs × $650 average job = $3,250 sitting in the office path."],
  ["Office time", "8 hours a week chasing billing details = more than 30 hours a month spent on preventable follow-up."],
  ["Quiet estimates", "3 estimates worth $2,500 each = $7,500 in quoted work waiting for a real next step."],
  ["Missed review and referral flow", "Happy customers are easiest to ask right after good work. If nobody owns the ask, the opportunity disappears."],
]

export function ProofCostCalculator() {
  const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
  return (
    <section data-section="proof-cost-calculator" data-nav-theme="light" className={page.sectionTight}>
      <div className={page.wrap}>
        <div className="max-w-3xl">
          <p className={page.eyebrow}>Cost of waiting</p>
          <h2 className={`${page.h2} mt-3`}>A few stuck jobs can cost more than the audit.</h2>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-4">
          {proof.map(([title, copy]) => (
            <article key={title} className={`${page.card} p-5`}>
              <h3 className="text-xl font-semibold tracking-[-0.035em] text-[#071D3A]">{title}</h3>
              <p className="mt-3 text-sm font-bold leading-6 text-[#42596C]">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-[1.8rem] border border-[#d9e5dc] bg-white p-5 shadow-[0_16px_45px_rgba(7,29,58,0.06)] sm:flex-row sm:items-center">
          <p className="max-w-xl text-lg font-semibold leading-7 tracking-[-0.02em] text-[#071D3A]">Want to estimate your own leak before buying the audit?</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/invoicing-delay-cash-flow-calculator" className={page.quietButton}>Use the Money Leak Calculator <ArrowRight className="ml-2 h-4 w-4" /></a>
            <CTALink href={auditHref} kind="checkout" location="workflow_audit_proof" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the $97 Workflow Audit" target="_blank" rel="noopener noreferrer" className={page.greenButton}>Start the $97 Workflow Audit</CTALink>
          </div>
        </div>
      </div>
    </section>
  )
}
