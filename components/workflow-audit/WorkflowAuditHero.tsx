import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

export function WorkflowAuditHero() {
  const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url

  return (
    <section data-section="workflow-audit-hero" data-nav-theme="light" className="px-4 pb-12 pt-[116px] sm:px-6 lg:px-8 lg:pb-14">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid items-center gap-8 rounded-[2.4rem] border border-[#d8e8de] bg-[#fffdf8] p-5 shadow-[0_24px_80px_rgba(7,29,58,0.08)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10 xl:p-12">
          <div>
            <p className={page.eyebrow}>Workflow Audit</p>
            <h1 className={`${page.h1} mt-4 max-w-3xl`}>Find the money leaks hiding inside your office workflow.</h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-[#42596C] sm:text-lg sm:leading-8">
              A $97 paid diagnostic that shows where cash, customers, and office time are slipping before you buy the wrong system.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CTALink href={auditHref} kind="checkout" location="workflow_audit_hero" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the $97 Workflow Audit" target="_blank" rel="noopener noreferrer" className={page.greenButton}>
                Start the $97 Workflow Audit
              </CTALink>
              <a href="#audit-checks" className={page.quietButton}>
                See what gets checked <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#cfe8d5] bg-white px-4 py-3 shadow-[0_10px_28px_rgba(21,128,61,0.08)]">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Audit credit</p>
                <p className="mt-1 text-sm font-bold leading-6 text-[#071D3A]">The $97 audit credits toward Cashflow Control System or Repeat Revenue System.</p>
              </div>
              <div className="rounded-2xl border border-[#cfe8d5] bg-[#f0fbf4] px-4 py-3 shadow-[0_10px_28px_rgba(21,128,61,0.08)]">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Yearly bonus</p>
                <p className="mt-1 text-sm font-bold leading-6 text-[#071D3A]">Buy yearly after the audit and the credit doubles to <span className="text-[#15803D]">$194</span>.</p>
              </div>
            </div>
          </div>

          <aside aria-label="Money Leak Map Preview" className="relative overflow-hidden rounded-[1.85rem] border border-[#d7e5dc] bg-white shadow-[0_16px_50px_rgba(7,29,58,0.08)]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-preview-card.jpg"
              alt="Money Leak Map preview card showing audit summary, score, and recommended first fix."
              width={1024}
              height={1280}
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="h-auto w-full object-contain"
            />
          </aside>
        </div>
      </div>
    </section>
  )
}
