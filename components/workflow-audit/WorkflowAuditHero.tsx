import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

const checks = [
  "Finished jobs waiting on billing",
  "Open invoices needing follow-up",
  "Estimates with no next step",
  "Manual office checks repeated every week",
  "Review and referral follow-up gaps",
  "Customer data nobody is using",
  "Software handoffs creating rework",
]

export function WorkflowAuditHero() {
  const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url

  return (
    <section data-section="workflow-audit-hero" data-nav-theme="light" className="px-4 pb-12 pt-[116px] sm:px-6 lg:px-8 lg:pb-14">
      <div className={page.wrap}>
        <div className="grid items-center gap-8 rounded-[2.4rem] border border-[#d8e8de] bg-[#fffdf8] p-5 shadow-[0_24px_80px_rgba(7,29,58,0.08)] sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div>
            <p className={page.eyebrow}>Workflow Audit</p>
            <h1 className={`${page.h1} mt-4 max-w-4xl`}>Find the money leaks hiding inside your office workflow.</h1>
            <p className={`${page.lead} mt-5 max-w-2xl`}>
              Stanley Systems reviews your office process, job data, invoices, estimates, customer follow-up, reviews, and referral path to show where cash and time are getting stuck.
            </p>
            <p className="mt-4 max-w-xl text-sm font-bold leading-6 text-[#334B60]">
              Built for service businesses using accounting software plus a field, job, dispatch, CRM, or shop system.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <CTALink href={auditHref} kind="checkout" location="workflow_audit_hero" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the $97 Workflow Audit" target="_blank" rel="noopener noreferrer" className={page.greenButton}>
                Start the $97 Workflow Audit
              </CTALink>
              <a href="#audit-checks" className={page.quietButton}>
                See what gets checked <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-4 text-sm font-semibold leading-6 text-[#536173]">
              Your $97 audit fee credits toward Cashflow Control System or Repeat Revenue System. Yearly buyers get a $194 credit.
            </p>
          </div>

          <aside aria-label="Money Leak Map Preview" className="rounded-[1.85rem] border border-[#d7e5dc] bg-white p-4 shadow-[0_16px_50px_rgba(7,29,58,0.06)] sm:p-5">
            <div className="flex items-start justify-between gap-4 border-b border-[#e5eee7] pb-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Preview</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">Money Leak Map Preview</h2>
              </div>
              <div className="rounded-full border border-[#cfe8d5] bg-[#f0fbf4] px-3 py-1 text-xs font-extrabold text-[#116832]">$97</div>
            </div>
            <div className="mt-4 grid gap-2.5">
              {checks.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#e4ece6] bg-[#fbfcf7] px-3.5 py-3 text-sm font-bold text-[#334B60]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-2xl bg-[#071D3A] px-4 py-3 text-sm font-bold leading-6 text-white">
              You leave knowing what is leaking, what it is costing, and what to fix first.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
