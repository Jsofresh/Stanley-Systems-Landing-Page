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
  route: string
}> = [
  {
    title: "Cashflow Control System",
    bestFor: "Slow invoices, billing handoffs, open balances, job completion gaps, and cash that should already be moving.",
    monthly: "cashflow_control_monthly",
    yearly: "cashflow_control_yearly",
    route: "/systems/cashflow-control",
  },
  {
    title: "Repeat Revenue System",
    bestFor: "Past customers, missed calls, review asks, referral follow-up, and repeat work that never gets owned.",
    monthly: "repeat_revenue_monthly",
    yearly: "repeat_revenue_yearly",
    route: "/systems/repeat-revenue",
  },
  {
    title: "Both Systems",
    bestFor: "For businesses leaking cash after the job and missing customer value after the work is done.",
    monthly: "both_systems_monthly",
    yearly: "both_systems_yearly",
    route: "/pricing#both-systems",
  },
]

function monthlyEquivalent(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price / 12)
}

function dollars(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value)
}

function PricingRow({ label, value, quiet = false, accent = false }: { label: string; value: string; quiet?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-[#e8eee9] py-2.5 first:border-t-0 first:pt-0 last:pb-0">
      <span className={`text-sm ${quiet ? "font-semibold text-[#6b7788]" : "font-bold text-[#536173]"}`}>{label}</span>
      <span className={`text-right text-sm ${accent ? "font-black text-[#b91c1c]" : "font-bold text-[#071D3A]"}`}>{value}</span>
    </div>
  )
}

function SystemPathCard({ card }: { card: (typeof systemCards)[number] }) {
  const monthly = pricingPackageById[card.monthly]
  const yearly = pricingPackageById[card.yearly]
  const yearlyMonthly = monthlyEquivalent(yearly.price)
  const setupDiscount = dollars(yearly.setupFee)
  const yearlySavings = yearly.savings ? dollars(yearly.savings.amount) : null

  return (
    <article className="flex h-full flex-col rounded-[1.45rem] border border-[#dfe8e1] bg-[#fbfcf7] p-5 shadow-[0_14px_38px_rgba(7,29,58,0.04)]">
      <div>
        <h4 className="text-xl font-semibold tracking-[-0.025em] text-[#071D3A]">{card.title}</h4>
        <div className="mt-4 rounded-[1.2rem] border border-[#efb7b0] bg-[#fff6f4] px-4 py-3">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#8f1d1d]">Audit credit after Workflow Audit</p>
          <p className="mt-1 text-xl font-black leading-6 tracking-[-0.035em] text-[#b91c1c]">{monthly.auditCreditDisplay} monthly / {yearly.auditCreditDisplay} yearly</p>
        </div>
        <p className="mt-4 text-sm font-semibold leading-6 text-[#536173]">{card.bestFor}</p>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-[1.1rem] border border-[#e1ebe4] bg-white p-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#536173]">Monthly</p>
          <div className="mt-1 flex flex-wrap items-end gap-x-2 gap-y-1">
            <span className="text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">{monthly.priceDisplay}</span>
            <span className="pb-1 text-xs font-bold text-[#64748b]">month-to-month</span>
          </div>
          <div className="mt-4">
            <PricingRow label="Installation fee" value={monthly.setupFeeDisplay} quiet />
          </div>
        </div>

        <div className="rounded-[1.1rem] border border-[#dfe8e1] bg-[#fcfdf9] p-4">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#536173]">Yearly</p>
          <div className="mt-1 flex flex-wrap items-end gap-x-2 gap-y-1">
            <span className="text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">{yearlyMonthly}/mo</span>
            <span className="pb-1 text-xs font-bold text-[#64748b]">paid yearly</span>
          </div>
          <p className="mt-1 text-xs font-bold leading-5 text-[#64748b]">Billed as {yearly.priceDisplay}. Monthly equivalent shown for easier comparison.</p>
          <div className="mt-4 rounded-2xl border border-[#efb7b0] bg-[#fff8f6] p-3">
            <PricingRow label="Installation discount" value={setupDiscount} accent />
            {yearlySavings ? <PricingRow label="Yearly discount" value={yearlySavings} accent /> : null}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <a href={card.route} className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#cfded3] bg-white px-4 py-2 text-sm font-extrabold text-[#071D3A] transition hover:bg-[#f7faf6]">
          See {card.title} <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </a>
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
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">Pick the system after the leak is clear.</h3>
            </div>
            <p className="max-w-xl text-sm font-bold leading-6 text-[#536173]">The audit helps decide which path is worth building first. Credits appear first; package discounts stay visible without turning the section into a coupon board.</p>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {systemCards.map((card) => <SystemPathCard key={card.title} card={card} />)}
          </div>
        </div>

        <p className="mt-5 text-center text-sm font-semibold leading-6 text-[#536173]">Prefer to buy a system directly? You can buy Cashflow Control System or Repeat Revenue System without the audit. The audit is for buyers who want the workflow reviewed first and want the audit fee credited toward the system.</p>
      </div>
    </section>
  )
}
