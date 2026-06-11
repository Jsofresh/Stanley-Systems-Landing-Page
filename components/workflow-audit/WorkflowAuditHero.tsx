import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

export function WorkflowAuditHero() {
  const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url

  return (
    <section data-section="workflow-audit-hero" data-nav-theme="light" className="px-4 pb-8 pt-[80px] sm:px-6 lg:px-8 lg:pb-9">
      <div className="mx-auto max-w-[1360px]">
        <div className="overflow-hidden rounded-[2.1rem] border border-[#d8e8de] bg-[#fffdf8] p-5 shadow-[0_24px_80px_rgba(7,29,58,0.08)] sm:p-6 lg:p-7 xl:p-8">
          <div className="grid items-center gap-6 lg:min-h-[610px] lg:grid-cols-[minmax(0,0.78fr)_minmax(470px,0.9fr)] lg:gap-7 xl:grid-cols-[minmax(0,0.76fr)_minmax(500px,0.92fr)] xl:gap-8">
            <div className="relative z-10 max-w-[680px]">
              <p className={page.eyebrow}>AI Office Map</p>
              <h1 className="mt-2 max-w-[560px] text-[clamp(1.9rem,2.72vw,2.95rem)] font-semibold leading-[1.04] tracking-[-0.034em] text-[#071D3A]">
                Start with the $197 AI Office Map.
              </h1>
              <p className="mt-7 max-w-[560px] text-base font-medium leading-7 text-[#42596C] sm:mt-8 sm:text-lg sm:leading-8 lg:mt-9 xl:mt-10">
                In one focused session, Stanley Systems maps how your office handles paperwork, billing, follow-up, handoffs, and job admin. You leave with a one-page map showing where work is getting stuck, what your current tools already handle, and which AI-guided workflow should be installed first.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <CTALink href={auditHref} kind="checkout" location="workflow_audit_hero" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="AI Office Map" billingPeriod="one_time" ctaLabel="Book the $197 AI Office Map" target="_blank" rel="noopener noreferrer" className={page.greenButton}>
                  Book the $197 AI Office Map
                </CTALink>
                <a href="#packages" className={page.quietButton}>
                  See Map details <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#cfe8d5] bg-white px-4 py-3 shadow-[0_10px_28px_rgba(21,128,61,0.08)]">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Sprint credit</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-[#071D3A]">$197 credited toward your AI Office Installation Sprint.</p>
                </div>
                <div className="rounded-2xl border border-[#cfe8d5] bg-[#f0fbf4] px-4 py-3 shadow-[0_10px_28px_rgba(21,128,61,0.08)]">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Human review</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-[#071D3A]">AI drafts, checks, and routes. Staff approves sensitive work.</p>
                </div>
              </div>
            </div>

            <aside aria-label="AI Office Map cash collection workflow preview" className="relative mx-auto flex min-h-[520px] w-full max-w-[690px] items-center justify-center lg:min-h-[600px] lg:max-w-none lg:justify-end">
              <Image
                src="/images/uploaded/money-leak-map/money-leak-map-job-finished-office-check-invoice-sent-cash-collected.jpg"
                alt="AI Office Map preview showing job finished, office check, invoice sent, and cash collected."
                width={1280}
                height={720}
                priority
                sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 48vw, 100vw"
                className="h-auto w-full max-w-[720px] object-contain lg:mr-[-28px] lg:w-[min(54vw,780px)] lg:max-w-none xl:mr-[-44px] xl:w-[min(54vw,780px)]"
              />
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
