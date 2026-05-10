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
    <section id="packages" data-section="fit-access-pricing" data-nav-theme="light" className={page.section}>
      <div className={page.wrap}>
        <div className="max-w-3xl">
          <p className={page.eyebrow}>Audit and packages</p>
          <h2 className={`${page.h2} mt-3`}>Start with the audit. Use the credit when you build.</h2>
          <p className={`${page.lead} mt-4 max-w-2xl`}>The Workflow Audit shows what is leaking first. If Stanley Systems builds the fix after the audit, your audit fee credits toward the system.</p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-[#d9e5dc] bg-white shadow-[0_18px_60px_rgba(7,29,58,0.06)]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-access-options-illustrated.jpg"
              alt="Workflow Audit access options showing screen share, exports and screenshots, or temporary invited user."
              width={960}
              height={1280}
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="h-auto w-full object-contain"
            />
          </div>

          <aside className="rounded-[2rem] border border-[#cfe8d5] bg-[#071D3A] p-5 text-white shadow-[0_20px_70px_rgba(7,29,58,0.16)]">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#86efac]">Featured first step</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Workflow Audit</h3>
            <div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-0.04em]">$97</span><span className="pb-2 text-sm font-bold text-slate-200">paid diagnostic</span></div>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-100">Find where cash, follow-up, and customer value are getting stuck.</p>
            <ul className="mt-5 grid gap-2 text-sm font-semibold leading-5 text-slate-100 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {includes.map(item => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#86efac]" />{item}</li>)}
            </ul>
            <div className="mt-5 rounded-2xl border border-[#efb7b0] bg-[#fff6f4] p-4 text-[#b91c1c]">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em]">Audit credit after Workflow Audit</p>
              <p className="mt-1 text-2xl font-black tracking-[-0.035em]">-$97 monthly / -$194 yearly</p>
            </div>
            <CTALink href={auditHref} kind="checkout" location="workflow_audit_pricing" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the $97 Workflow Audit" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#22a34a] focus:outline-none focus:ring-4 focus:ring-[#86efac]/40">Start the $97 Workflow Audit <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
          </aside>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#d9e5dc] bg-white p-5 shadow-[0_18px_60px_rgba(7,29,58,0.06)]">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className={page.eyebrow}>Where the audit can lead</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">Choose the cleanest next payment.</h3>
            </div>
            <div className="grid gap-2 text-xs font-extrabold leading-5 text-[#536173] sm:grid-cols-3 lg:max-w-2xl">
              <div className="rounded-2xl border border-[#e1ebe4] bg-[#fbfcf7] px-3 py-2">Monthly keeps it flexible.</div>
              <div className="rounded-2xl border border-[#efb7b0] bg-[#fff6f4] px-3 py-2 text-[#8f1d1d]">Yearly shows the rounded monthly price and yearly bill.</div>
              <div className="rounded-2xl border border-[#e1ebe4] bg-[#fbfcf7] px-3 py-2">Audit credit is shown early.</div>
            </div>
          </div>
          <PackagePricingGrid cards={packageCards} locationPrefix="workflow_audit_package_grid" analyticsSource="workflow_audit_page" gridClassName="md:grid-cols-2 xl:grid-cols-3" />
        </div>

        <p className="mt-5 text-center text-sm font-semibold leading-6 text-[#536173]">Prefer to buy a system directly? You can buy Cashflow Control System or Repeat Revenue System without the audit. The audit is for buyers who want the workflow reviewed first and want the audit fee credited toward the system.</p>
      </div>
    </section>
  )
}
