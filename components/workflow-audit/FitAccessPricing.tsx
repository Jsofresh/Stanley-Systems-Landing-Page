import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { PackagePricingGrid, type PackagePricingCard } from "@/components/package-pricing-cards"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

const includes = ["30-minute workflow walkthrough", "Transaction Pattern Review", "Online Follow-Up Review", "Systems and Handoff Review", "Money Leak Summary", "Workflow Map", "Leak Priority Score", "First Fix Recommendation", "System Recommendation"]

const packageCards: PackagePricingCard[] = [
  {
    badge: "Monthly flexibility",
    name: "Cashflow Control Monthly",
    package: pricingPackageById.cashflow_control_monthly,
    description: "For shops where customer intake, billing, final bill, and follow-up still depend on manual handoffs.",
    install: "$199 installation",
    credit: "Audit credit: -$97",
    callout: null,
    cta: "Buy Cashflow Monthly",
    tone: "monthly",
    bullets: ["Customer intake to billing workflow", "Billing-ready checks", "Missing detail routing", "Open-balance visibility"],
  },
  {
    badge: "-$1,250",
    name: "Cashflow Control Yearly",
    package: pricingPackageById.cashflow_control_yearly,
    description: "Best first-year value for automating the intake-to-final-bill path for the year.",
    install: "Install discount: -$199",
    credit: "Audit credit: -$194",
    callout: "-$1,250 first-year package savings",
    cta: "Buy Cashflow Yearly",
    tone: "yearly",
    bullets: ["Everything in monthly", "Lower first-year cost", "Yearly billing shown clearly", "Cash collection workflow"],
  },
  {
    badge: "Monthly flexibility",
    name: "Repeat Revenue Monthly",
    package: pricingPackageById.repeat_revenue_monthly,
    description: "For shops where past customers, reviews, referrals, and missed calls are the clearest leak.",
    install: "$349 installation",
    credit: "Audit credit: -$97",
    callout: null,
    cta: "Buy Repeat Revenue Monthly",
    tone: "monthly",
    bullets: ["Past customer reactivation", "Review and referral asks", "Missed-call recovery", "Main number stays unchanged"],
  },
  {
    badge: "-$2,120",
    name: "Repeat Revenue Yearly",
    package: pricingPackageById.repeat_revenue_yearly,
    description: "Best first-year value for turning existing customers and missed demand into follow-up paths.",
    install: "Install discount: -$349",
    credit: "Audit credit: -$194",
    callout: "-$2,120 first-year package savings",
    cta: "Buy Repeat Revenue Yearly",
    tone: "yearly",
    bullets: ["Everything in monthly", "Lower first-year cost", "Reviews and referrals", "Customer reactivation"],
  },
  {
    badge: "Most complete monthly",
    name: "Both Systems Monthly",
    package: pricingPackageById.both_systems_monthly,
    description: "For shops leaking money before the job is booked, while it is billed, and after the customer leaves.",
    install: "$449 installation",
    credit: "Audit credit: -$97",
    callout: "-$197/mo bundle savings",
    cta: "Buy Both Monthly",
    tone: "complete",
    bullets: ["Cashflow Control System", "Repeat Revenue System", "Billing workflow", "Customer follow-up"],
  },
  {
    badge: "-$2,700 · Best value",
    name: "Both Systems Yearly",
    package: pricingPackageById.both_systems_yearly,
    description: "The full revenue-control path with yearly savings and an installation discount.",
    install: "Install discount: -$449",
    credit: "Audit credit: -$194",
    callout: "-$2,700 first-year package savings",
    cta: "Buy Both Yearly",
    tone: "recommended",
    bullets: ["Cashflow Control System", "Repeat Revenue System", "Lowest first-year bundle cost", "Best full-system economics"],
  },
]

export function FitAccessPricing() {
  const audit = pricingPackageById.workflow_audit
  const auditHref = audit.stripePaymentLink.url

  return (
    <section id="packages" data-section="fit-access-pricing" data-nav-theme="light" className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className={page.wrap}>
        <div className="max-w-4xl">
          <h2 className={`${page.h2} mt-3`}>Start with the audit. Use the credit when you build.</h2>
        </div>

        <div data-section="workflow-audit-access-offer" className="mt-5 grid gap-5 lg:grid-cols-[0.66fr_1.2fr] lg:items-center">
          <div className="mx-auto w-full max-w-[360px] lg:max-w-[390px]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-how-access-works.jpg"
              alt="How access works for the Workflow Audit: walkthrough, exports or screenshots, or a temporary invited user."
              width={957}
              height={1280}
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="h-auto max-h-[480px] w-full object-contain"
            />
          </div>

          <aside className="rounded-[1.75rem] border border-[#cfe8d5] bg-white p-5 text-[#071D3A] shadow-[0_16px_46px_rgba(7,29,58,0.08)]">
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">Workflow Audit</h3>
            <div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-0.04em] text-[#071D3A]">$97</span><span className="pb-2 text-sm font-bold text-[#536173]">paid diagnostic</span></div>
            <p className="mt-3 text-base font-semibold leading-7 text-[#334B60]">Find where cash, follow-up, and customer value are getting stuck before you buy the system.</p>
            <ul className="mt-5 grid gap-2 text-sm font-semibold leading-5 text-[#334B60] sm:grid-cols-2">
              {includes.map(item => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" />{item}</li>)}
            </ul>
            <div className="mt-5 rounded-2xl border border-[#efb7b0] bg-[#fff6f4] p-4 text-[#b91c1c]">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em]">Audit credit after Workflow Audit</p>
              <p className="mt-1 text-2xl font-black tracking-[-0.035em]">-$97 monthly / -$194 yearly</p>
            </div>
            <CTALink href={auditHref} kind="checkout" location="workflow_audit_pricing" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the Workflow Audit" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#116832] focus:outline-none focus:ring-4 focus:ring-[#bbf7d0]">Start the Workflow Audit <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
          </aside>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#d9e5dc] bg-white p-5 shadow-[0_18px_60px_rgba(7,29,58,0.06)]">
          <div className="text-center">
            <h3 className="text-3xl font-semibold tracking-[-0.045em] text-[#071D3A] sm:text-4xl">Choose the cleanest next payment.</h3>
          </div>
          <PackagePricingGrid cards={packageCards} locationPrefix="workflow_audit_package_grid" analyticsSource="workflow_audit_page" gridClassName="md:grid-cols-2 xl:grid-cols-3" />
        </div>

        <p className="mt-5 text-center text-sm font-semibold leading-6 text-[#536173]">Prefer to buy a system directly? You can buy Cashflow Control System or Repeat Revenue System without the audit. The audit is for buyers who want the workflow reviewed first and want the audit fee credited toward the system.</p>
      </div>
    </section>
  )
}
