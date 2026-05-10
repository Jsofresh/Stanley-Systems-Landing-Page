import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById, type PricingPackageId } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

const includes = ["30-minute workflow walkthrough", "Transaction Pattern Review", "Online Follow-Up Review", "Systems and Handoff Review", "Money Leak Summary", "Workflow Map", "Leak Priority Score", "First Fix Recommendation", "System Recommendation"]

const planCards: Array<{
  id: PricingPackageId
  name: string
  cadence: "Monthly" | "Yearly"
  kind: "monthly" | "yearly"
}> = [
  { id: "cashflow_control_monthly", name: "Cashflow Control", cadence: "Monthly", kind: "monthly" },
  { id: "cashflow_control_yearly", name: "Cashflow Control", cadence: "Yearly", kind: "yearly" },
  { id: "repeat_revenue_monthly", name: "Repeat Revenue", cadence: "Monthly", kind: "monthly" },
  { id: "repeat_revenue_yearly", name: "Repeat Revenue", cadence: "Yearly", kind: "yearly" },
  { id: "both_systems_monthly", name: "Both Systems", cadence: "Monthly", kind: "monthly" },
  { id: "both_systems_yearly", name: "Both Systems", cadence: "Yearly", kind: "yearly" },
]

function money(value: number, cents = false) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(value)
}

function monthlyEquivalent(price: number) {
  return money(price / 12, true)
}

function shortInstallAmount(display: string) {
  return display.split(" ")[0]
}

function checkoutMeta(id: PricingPackageId) {
  if (id.includes("cashflow_control")) return { packageName: "Cashflow Control System", route: "/systems/cashflow-control" }
  if (id.includes("repeat_revenue")) return { packageName: "Repeat Revenue System", route: "/systems/repeat-revenue" }
  return { packageName: "Both Systems", route: "/pricing#both-systems" }
}

function PlanCard({ id, name, cadence, kind }: { id: PricingPackageId; name: string; cadence: "Monthly" | "Yearly"; kind: "monthly" | "yearly" }) {
  const pkg = pricingPackageById[id]
  const isYearly = kind === "yearly"
  const price = isYearly ? `${monthlyEquivalent(pkg.price)}/mo` : pkg.priceDisplay
  const auditCredit = pkg.auditCreditDisplay
  const installAmount = shortInstallAmount(pkg.setupFeeDisplay)
  const yearlyPackageSavings = pkg.savings?.amount ?? 0
  const firstYearSavings = isYearly ? pkg.auditCredit + pkg.setupFee + yearlyPackageSavings : pkg.auditCredit + yearlyPackageSavings
  const meta = checkoutMeta(id)
  const billingPeriod = pkg.billingPeriod

  return (
    <article className={`flex h-full min-h-[21rem] flex-col rounded-[1.35rem] border bg-white p-5 shadow-[0_12px_34px_rgba(7,29,58,0.045)] ${isYearly ? "border-[#efb7b0]" : "border-[#dfe8e1]"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#15803D]">{name}</p>
          <h4 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#071D3A]">{cadence}</h4>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-semibold tracking-[-0.045em] text-[#071D3A]">{price}</span>
          <span className="pb-1.5 text-xs font-bold text-[#64748b]">{isYearly ? "paid yearly" : "month-to-month"}</span>
        </div>
        {isYearly ? <p className="mt-1 text-xs font-bold leading-5 text-[#64748b]">Billed as {pkg.priceDisplay}. Monthly equivalent shown.</p> : null}
      </div>

      <div className="mt-5 rounded-2xl border border-[#efb7b0] bg-[#fff6f4] p-4">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8f1d1d]">{isYearly ? "First-year savings" : "Savings after audit"}</p>
        <p className="mt-1 text-3xl font-black tracking-[-0.04em] text-[#b91c1c]">{money(firstYearSavings)}</p>
      </div>

      <div className="mt-5 divide-y divide-[#e8eee9] rounded-2xl border border-[#e1ebe4] bg-[#fbfcf7] px-4 py-2">
        <div className="flex items-center justify-between gap-4 py-2.5">
          <span className="text-sm font-bold text-[#536173]">Audit credit</span>
          <span className="text-sm font-black text-[#b91c1c]">{auditCredit}</span>
        </div>
        <div className="flex items-center justify-between gap-4 py-2.5">
          <span className="text-sm font-semibold text-[#6b7788]">Installation fee</span>
          <span className="text-sm font-semibold text-[#536173]">{installAmount}</span>
        </div>
        {isYearly ? (
          <div className="flex items-center justify-between gap-4 py-2.5">
            <span className="text-sm font-bold text-[#536173]">Install discount</span>
            <span className="text-sm font-black text-[#b91c1c]">{money(pkg.setupFee)}</span>
          </div>
        ) : null}
        {pkg.savings ? (
          <div className="flex items-center justify-between gap-4 py-2.5">
            <span className="text-sm font-bold text-[#536173]">Package discount</span>
            <span className="text-sm font-black text-[#b91c1c]">{isYearly ? money(pkg.savings.amount) : `${money(pkg.savings.amount)}/mo`}</span>
          </div>
        ) : null}
      </div>

      <div className="mt-auto pt-5">
        <CTALink href={pkg.stripePaymentLink.url} kind="checkout" location="workflow_audit_package_grid" analyticsEvent="package_checkout_clicked" analyticsSource="workflow_audit_page" packageId={id} packageName={meta.packageName} billingPeriod={billingPeriod} ctaLabel={pkg.cta} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#071D3A] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#0e315f] focus:outline-none focus:ring-4 focus:ring-[#071D3A]/20">
          {pkg.cta} <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </CTALink>
      </div>
    </article>
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
            <div className="mt-5 rounded-2xl border border-[#efb7b0] bg-[#fff6f4] p-4 text-[#b91c1c]">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em]">Audit credit after Workflow Audit</p>
              <p className="mt-1 text-2xl font-black tracking-[-0.035em]">-$97 monthly / -$194 yearly</p>
            </div>
            <CTALink href={auditHref} kind="checkout" location="workflow_audit_pricing" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the $97 Workflow Audit" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#22a34a] focus:outline-none focus:ring-4 focus:ring-[#86efac]/40">Start the $97 Workflow Audit <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
          </aside>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#d9e5dc] bg-white p-5 shadow-[0_18px_60px_rgba(7,29,58,0.06)]">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className={page.eyebrow}>Where the audit can lead</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">Compare the next move after the audit.</h3>
            </div>
            <p className="max-w-xl text-sm font-bold leading-6 text-[#536173]">Six clean payment cards. The red number shows how much money stays in your pocket after the audit or yearly choice.</p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {planCards.map((card) => <PlanCard key={card.id} {...card} />)}
          </div>
        </div>

        <p className="mt-5 text-center text-sm font-semibold leading-6 text-[#536173]">Prefer to buy a system directly? You can buy Cashflow Control System or Repeat Revenue System without the audit. The audit is for buyers who want the workflow reviewed first and want the audit fee credited toward the system.</p>
      </div>
    </section>
  )
}
