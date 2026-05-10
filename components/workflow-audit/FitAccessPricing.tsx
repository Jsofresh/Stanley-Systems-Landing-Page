import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById, type PricingPackageId } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

const includes = ["30-minute workflow walkthrough", "Transaction Pattern Review", "Online Follow-Up Review", "Systems and Handoff Review", "Money Leak Summary", "Workflow Map", "Leak Priority Score", "First Fix Recommendation", "System Recommendation"]

const systemCards: Array<{
  title: string
  bestFor: string
  monthly: PricingPackageId
  yearly: PricingPackageId
}> = [
  {
    title: "Cashflow Control System",
    bestFor: "Slow invoices, billing handoffs, open balances, job completion gaps, and cash that should already be moving.",
    monthly: "cashflow_control_monthly",
    yearly: "cashflow_control_yearly",
  },
  {
    title: "Repeat Revenue System",
    bestFor: "Past customers, missed calls, review asks, referral follow-up, and repeat work that never gets owned.",
    monthly: "repeat_revenue_monthly",
    yearly: "repeat_revenue_yearly",
  },
  {
    title: "Both Systems",
    bestFor: "Businesses leaking cash after the job and missing customer value after the work is done.",
    monthly: "both_systems_monthly",
    yearly: "both_systems_yearly",
  },
]

function PriceOption({ packageId }: { packageId: PricingPackageId }) {
  const offer = pricingPackageById[packageId]
  const isYearly = offer.billingPeriod === "yearly"

  return (
    <div className="rounded-[1.15rem] border border-[#e1ebe4] bg-[#fffdf8] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#15803D]">{isYearly ? "Yearly" : "Monthly"}</p>
          <p className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">{offer.priceDisplay}</p>
        </div>
        {offer.savings ? <span className="rounded-full border border-[#cfe8d5] bg-[#f0fbf4] px-3 py-1 text-[11px] font-extrabold leading-4 text-[#116832]">{offer.savings.display}</span> : null}
      </div>
      <div className="mt-3 grid gap-2 text-xs font-bold leading-5 text-[#536173]">
        <div className="flex justify-between gap-3"><span>Audit credit</span><span className="text-[#15803D]">{offer.auditCreditDisplay}</span></div>
        {offer.waivedSetupDisplay ? <div className="flex justify-between gap-3"><span>Install discount</span><span className="text-[#15803D]">{offer.waivedSetupDisplay}</span></div> : <div className="flex justify-between gap-3"><span>Installation</span><span>{offer.setupFeeDisplay}</span></div>}
        <div className="flex justify-between gap-3 border-t border-[#e1ebe4] pt-2"><span>First year after audit</span><span className="text-[#071D3A]">{offer.firstYearCostAfterAuditCreditDisplay}</span></div>
      </div>
      <CTALink href={offer.stripePaymentLink.url} kind="checkout" location={`workflow_audit_package_${offer.id}`} analyticsEvent="package_checkout_clicked" analyticsSource="workflow_audit_page" packageId={offer.id} packageName={offer.publicName} billingPeriod={offer.billingPeriod} ctaLabel={offer.cta} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full border border-[#cfded3] bg-white px-4 py-2 text-xs font-extrabold text-[#071D3A] transition hover:bg-[#f3faf1]">
        {offer.cta} <ArrowRight className="ml-2 h-3.5 w-3.5" />
      </CTALink>
    </div>
  )
}

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

        <div className="mt-7 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className={`${page.panel} p-5`}>
            <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">How access works</h3>
            <p className={`${page.body} mt-3 text-base leading-7`}>Stanley Systems does not need your password. After checkout, you choose the safest way to share what is needed.</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-[#e1ebe4] bg-[#fbfcf7] p-4"><p className="font-extrabold text-[#071D3A]">Option 1: Walkthrough only</p><p className={page.body}>You share your screen during the audit call and Stanley Systems maps the workflow from what you show.</p></div>
              <div className="rounded-2xl border border-[#e1ebe4] bg-[#fbfcf7] p-4"><p className="font-extrabold text-[#071D3A]">Option 2: Exports or screenshots</p><p className={page.body}>You send reports, screenshots, or CSV exports from your accounting, field, CRM, review, or referral tools.</p></div>
              <div className="rounded-2xl border border-[#e1ebe4] bg-[#fbfcf7] p-4"><p className="font-extrabold text-[#071D3A]">Option 3: Temporary invited user</p><p className={page.body}>You invite Stanley Systems as a temporary user or manager with only the access needed for the audit.</p></div>
            </div>
            <p className="mt-4 rounded-2xl border border-[#cfe8d5] bg-[#f0fbf4] p-4 text-sm font-bold leading-6 text-[#116832]">After the audit, you can remove access, cancel pending invites, or change permissions. You stay in control.</p>
          </div>

          <aside className="rounded-[2rem] border border-[#cfe8d5] bg-[#071D3A] p-5 text-white shadow-[0_20px_70px_rgba(7,29,58,0.16)]">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#86efac]">Featured first step</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Workflow Audit</h3>
            <div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-0.04em]">$97</span><span className="pb-2 text-sm font-bold text-slate-200">paid diagnostic</span></div>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-100">Find where cash, follow-up, and customer value are getting stuck.</p>
            <ul className="mt-5 grid gap-2 text-sm font-semibold leading-5 text-slate-100 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {includes.map(item => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#86efac]" />{item}</li>)}
            </ul>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm font-bold leading-6 text-white"><span className="block text-xs uppercase tracking-[0.13em] text-[#86efac]">Monthly buyer</span>$97 audit credit toward a system.</div>
              <div className="rounded-2xl border border-[#86efac]/35 bg-[#15803D]/25 p-4 text-sm font-bold leading-6 text-white"><span className="block text-xs uppercase tracking-[0.13em] text-[#86efac]">Yearly buyer</span>$194 credit after the audit.</div>
            </div>
            <CTALink href={auditHref} kind="checkout" location="workflow_audit_pricing" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the $97 Workflow Audit" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#22a34a] focus:outline-none focus:ring-4 focus:ring-[#86efac]/40">Start the $97 Workflow Audit <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
          </aside>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#d9e5dc] bg-white p-5 shadow-[0_18px_60px_rgba(7,29,58,0.06)]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className={page.eyebrow}>System pricing after the audit</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">Pick the system after the leak is clear.</h3>
            </div>
            <p className="max-w-xl text-sm font-bold leading-6 text-[#536173]">Monthly packages get a $97 audit credit. Yearly packages get a $194 audit credit plus setup waived.</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {systemCards.map((card) => (
              <article key={card.title} className="rounded-[1.45rem] border border-[#dfe8e1] bg-[#fbfcf7] p-4">
                <h4 className="text-xl font-semibold tracking-[-0.025em] text-[#071D3A]">{card.title}</h4>
                <p className="mt-2 min-h-[72px] text-sm font-semibold leading-6 text-[#536173]">{card.bestFor}</p>
                <div className="mt-4 grid gap-3">
                  <PriceOption packageId={card.monthly} />
                  <PriceOption packageId={card.yearly} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-sm font-semibold leading-6 text-[#536173]">Prefer to buy a system directly? You can buy Cashflow Control System or Repeat Revenue System without the audit. The audit is for buyers who want the workflow reviewed first and want the audit fee credited toward the system.</p>
      </div>
    </section>
  )
}
