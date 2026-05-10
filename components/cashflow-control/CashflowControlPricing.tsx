import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import type { PricingPackage } from "@/lib/pricing/source-of-truth"
import { plans, sectionShell } from "./tokens"

type PlanCard = {
  badge: string
  tone: "standard" | "yearly" | "complete" | "recommended"
  plan: string
  package: PricingPackage
  bestFor: string
  includes: string[]
  cta: string
  featured?: boolean
}

const cards: PlanCard[] = [
  {
    badge: "Monthly",
    tone: "standard",
    plan: "Cashflow Control Monthly",
    package: plans.cashflowMonthly,
    bestFor: "Shops that need customer intake, billing, final bill, and follow-up to stop depending on manual re-entry.",
    includes: ["Customer intake to billing workflow", "Webhook, form, or job-system handoffs", "Billing-ready checks", "Missing billing detail routing", "Invoice and final-bill path", "Open-balance visibility", "Office and owner notifications"],
    cta: "Start Cashflow Control Monthly",
  },
  {
    badge: "-$1,250",
    tone: "yearly",
    plan: "Cashflow Control Yearly",
    package: plans.cashflowYearly,
    bestFor: "Shops ready to automate the intake-to-final-bill path for the year and lower the first-year cost.",
    includes: ["Everything in Cashflow Control Monthly", "Installation waived", "Double audit credit", "Lower first-year net cost", "Annual commitment discount"],
    cta: "Start Cashflow Control Yearly",
  },
  {
    badge: "Complete monthly",
    tone: "complete",
    plan: "Repeat Revenue + Cashflow Control Monthly",
    package: plans.completeMonthly,
    bestFor: "Shops that want the billing workflow automated and more revenue from existing customers.",
    includes: ["Cashflow Control System", "Repeat Revenue System", "Customer intake to final bill automation", "Open-balance visibility", "Re-engagement", "Reviews", "Referrals", "Missed-call capture", "Office notifications and digest"],
    cta: "Buy Complete Monthly",
    featured: true,
  },
  {
    badge: "-$2,700 · Best value",
    tone: "recommended",
    plan: "Repeat Revenue + Cashflow Control Yearly",
    package: plans.completeYearly,
    bestFor: "Shops that know the office path and customer follow-up both need fixing.",
    includes: ["Everything in the complete monthly bundle", "Installation waived", "Double audit credit", "Lowest first-year bundle cost", "Best full-system economics", "Cashflow Control System", "Repeat Revenue System"],
    cta: "Buy Complete Yearly",
    featured: true,
  },
]

function badgeClass(tone: PlanCard["tone"]) {
  if (tone === "recommended") return "bg-[#E11D48] text-white shadow-[0_12px_24px_rgba(225,29,72,0.18)]"
  if (tone === "yearly") return "bg-[#E11D48] text-white shadow-[0_12px_24px_rgba(225,29,72,0.18)]"
  if (tone === "complete") return "bg-[#102A43] text-white shadow-[0_12px_24px_rgba(16,42,67,0.16)]"
  return "bg-white text-[#102033] ring-1 ring-[#D5DEE8]"
}

export function CashflowControlPricing() {
  return (
    <section id="cashflow-pricing" className="bg-white py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.4rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Pick your cashflow fix.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Buy Cashflow Control now, or start with the $97 Workflow Audit and credit it toward a system. Yearly buyers get a $194 audit credit.</p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {cards.map((card) => <PricingCard key={card.plan} card={card} />)}
        </div>

        <p className="mt-5 rounded-[1.25rem] border border-[#BFE4C8] bg-[#F4FBF5] p-4 text-sm font-semibold leading-6 text-[#536173]">
          The Workflow Audit is optional. You can buy Cashflow Control directly. The audit is for buyers who want Stanley Systems to inspect the workflow first and credit the audit fee toward a system.
        </p>
      </div>
    </section>
  )
}

function PricingCard({ card }: { card: PlanCard }) {
  const pricingPackage = card.package
  const installDisplay = pricingPackage.waivedSetupDisplay ?? pricingPackage.setupFeeDisplay
  const isYearly = pricingPackage.billingPeriod === "yearly"
  const monthlyDisplay = pricingPackage.id === "cashflow_control_yearly" ? "$318/mo" : pricingPackage.id === "both_systems_yearly" ? "$718/mo" : pricingPackage.priceDisplay
  const billedDisplay = isYearly ? `billed yearly at ${pricingPackage.priceDisplay}` : "monthly billing"

  return (
    <article
      className={`relative flex min-h-full flex-col rounded-[1.1rem] border p-4 shadow-[0_14px_34px_rgba(33,51,67,0.08)] ${
        card.featured
          ? "border-[#15803D] bg-white ring-2 ring-[#A7D8B4]"
          : card.tone === "yearly"
            ? "border-[#9FCFAD] bg-white"
            : "border-[#D5DEE8] bg-white"
      }`}
    >
      <p className={`mb-4 inline-flex min-h-10 w-fit items-center justify-center rounded-full px-4 py-2 text-center text-sm font-extrabold uppercase tracking-[0.08em] ${badgeClass(card.tone)}`}>{card.badge}</p>
      <h3 className="text-lg font-bold leading-tight tracking-[-0.025em] text-[#102033]">{card.plan}</h3>
      <p className="mt-2 text-[2.25rem] font-bold leading-none tracking-[-0.055em] text-[#102033]">{monthlyDisplay}</p>
      <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[#607080]">{billedDisplay}</p>
      <p className="mt-2 min-h-[56px] text-sm leading-5 text-[#33475B]">Best for: {card.bestFor}</p>

      <div className="mt-3 grid gap-2 border-y border-[#C8D8CE] py-2 text-xs font-semibold leading-5 text-[#33475B]">
        <div className={`rounded-xl px-3 py-3 text-center font-extrabold ring-1 ${pricingPackage.waivedSetup ? "bg-[#E8F6EC] text-base text-[#124E25] ring-[#9BCDA8] shadow-[0_8px_18px_rgba(21,128,61,0.10)]" : "bg-[#F8FCF9] text-[#33475B] ring-[#E0E9E3]"}`}>{installDisplay}</div>
        <div className={`rounded-xl bg-[#E8F6EC] px-3 py-3 text-center font-extrabold text-[#124E25] ring-1 ring-[#B7D8C0] ${pricingPackage.auditCredit === 194 ? "text-base shadow-[0_8px_18px_rgba(21,128,61,0.10)]" : "text-xs"}`}>Audit credit: {pricingPackage.auditCreditDisplay}</div>
        <div className="rounded-xl bg-white px-3 py-2 text-center font-extrabold text-[#102033] ring-1 ring-[#E0E9E3]">First year after credit: {pricingPackage.firstYearCostAfterAuditCreditDisplay}</div>
      </div>

      {pricingPackage.savings && !isYearly ? (
        <p className="mt-3 rounded-2xl border border-[#B7D8C0] bg-[#F2FBF4] px-3 py-2 text-center text-xs font-extrabold leading-5 text-[#124E25] shadow-[0_10px_22px_rgba(31,122,58,0.08)]">
          -${pricingPackage.savings.amount.toLocaleString()}
        </p>
      ) : null}

      <ul className="mt-3 grid gap-1.5 text-xs leading-5 text-[#33475B]">
        {card.includes.map((item) => (
          <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-[#15803D]" /><span>{item}</span></li>
        ))}
      </ul>

      <CTALink href={pricingPackage.stripePaymentLink.url} kind="checkout" location={`cashflow_pricing_${pricingPackage.id}`} analyticsEvent="package_checkout_clicked" analyticsSource="cashflow_control_page" packageId={pricingPackage.analyticsPackageId} packageName={pricingPackage.publicName} billingPeriod={pricingPackage.billingPeriod === "one_time" ? "monthly" : pricingPackage.billingPeriod} ctaLabel={card.cta} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-10 w-full items-center justify-center rounded-md bg-[#15803D] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#17612E]">
        {card.cta} <ArrowRight className="ml-2 h-4 w-4" />
      </CTALink>
    </article>
  )
}
