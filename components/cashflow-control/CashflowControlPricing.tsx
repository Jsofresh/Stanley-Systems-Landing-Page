import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { plans, sectionShell } from "./tokens"

type PlanCard = {
  badge: string
  plan: string
  price: string
  install: string
  auditCredit: string
  firstYearNet: string
  bestFor: string
  includes: string[]
  cta: string
  href: string
  packageId: string
  billingPeriod: "monthly" | "yearly"
  featured?: boolean
}

const cards: PlanCard[] = [
  {
    badge: "Best first billing fix",
    plan: "Cashflow Control Monthly",
    price: "$397/mo",
    install: "$199",
    auditCredit: "$97",
    firstYearNet: "$4,866",
    bestFor: "Shops that mainly need finished jobs, invoices, and open balances to stop getting stuck.",
    includes: ["Finished-job to billing-ready handoff", "Billing-ready checks", "Missing billing detail alerts", "Invoice cutoff nudges", "Open-balance visibility", "Weekly or monthly money-leak digest", "Office and owner notifications"],
    cta: "Start Cashflow Control Monthly",
    href: plans.cashflowMonthly.stripePaymentLink.url,
    packageId: plans.cashflowMonthly.analyticsPackageId,
    billingPeriod: "monthly",
  },
  {
    badge: "Save $1,250 first year",
    plan: "Cashflow Control Yearly",
    price: "$3,810/yr",
    install: "Waived",
    auditCredit: "$194",
    firstYearNet: "$3,616",
    bestFor: "Shops ready to clean up the job-to-cash path for the year and get the lowest Cashflow Control first-year cost.",
    includes: ["Everything in Cashflow Control Monthly", "Installation waived", "Double audit credit", "Lower first-year net cost", "Annual commitment discount"],
    cta: "Start Cashflow Control Yearly",
    href: plans.cashflowYearly.stripePaymentLink.url,
    packageId: plans.cashflowYearly.analyticsPackageId,
    billingPeriod: "yearly",
  },
  {
    badge: "Most complete monthly",
    plan: "Repeat Revenue + Cashflow Control Monthly",
    price: "$897/mo",
    install: "$449",
    auditCredit: "$97",
    firstYearNet: "$11,116",
    bestFor: "Shops that want both sides handled: collected cash from finished work and more revenue from existing customers.",
    includes: ["Cashflow Control System", "Repeat Revenue System", "Billing-readiness checks", "Open-balance visibility", "Re-engagement", "Reviews", "Referrals", "Missed-call capture", "Office notifications and digest", "One monthly package for the two revenue paths: job-to-cash and customer-to-repeat-work", "Useful when the office is losing cash in billing and future work is leaking from past customers"],
    cta: "Buy Complete Monthly",
    href: plans.completeMonthly.stripePaymentLink.url,
    packageId: plans.completeMonthly.analyticsPackageId,
    billingPeriod: "monthly",
    featured: true,
  },
  {
    badge: "Best value",
    plan: "Repeat Revenue + Cashflow Control Yearly",
    price: "$8,610/yr",
    install: "Waived",
    auditCredit: "$194",
    firstYearNet: "$8,416",
    bestFor: "Shops that know the office path and customer follow-up both need fixing.",
    includes: ["Everything in the complete monthly bundle", "Installation waived", "Double audit credit", "Lowest first-year bundle cost", "Best full-system economics", "Cashflow Control System for billing-readiness, invoice nudges, open-balance visibility, and digest reporting", "Repeat Revenue System for re-engagement, reviews, referrals, and missed-call capture", "The strongest option when the business wants one committed year to tighten both revenue loops"],
    cta: "Buy Complete Yearly",
    href: plans.completeYearly.stripePaymentLink.url,
    packageId: plans.completeYearly.analyticsPackageId,
    billingPeriod: "yearly",
    featured: true,
  },
]

const rows = [
  ["Cashflow Control Monthly", "$397/mo", "$199", "$97", "$4,866", "Best first billing fix"],
  ["Cashflow Control Yearly", "$3,810/yr", "Waived", "$194", "$3,616", "Save $1,250 first year"],
  ["Complete Monthly", "$897/mo", "$449", "$97", "$11,116", "Most complete monthly"],
  ["Complete Yearly", "$8,610/yr", "Waived", "$194", "$8,416", "Best value"],
] as const

export function CashflowControlPricing() {
  return (
    <section id="cashflow-pricing" className="bg-white py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Pricing and CTA</p>
          <h2 className="mt-3 text-[2.4rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Start Cashflow Control directly, or use the Workflow Audit as a credited first step.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Buy Cashflow Control now, or start with the $97 Workflow Audit and credit it toward a system. Yearly buyers get a $194 audit credit.</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => <PricingCard key={card.plan} card={card} />)}
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-[#DDEBE2] bg-[#FBFCF7] shadow-[0_14px_34px_rgba(7,29,58,0.05)]">
          <div className="grid grid-cols-2 gap-px bg-[#DDEBE2] text-sm font-bold text-[#071D3A] lg:grid-cols-6">
            {rows.map(([plan, price, install, audit, net, badge]) => (
              <div key={plan} className="contents">
                <Cell label="Plan" value={plan} strong />
                <Cell label="Price" value={price} />
                <Cell label="Install" value={install} />
                <Cell label="Audit credit" value={audit} />
                <Cell label="First-year net" value={net} />
                <Cell label="Badge" value={badge} />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 rounded-[1.25rem] border border-[#BFE4C8] bg-[#F4FBF5] p-4 text-sm font-semibold leading-6 text-[#536173]">
          The Workflow Audit is optional. You can buy Cashflow Control directly. The audit is for buyers who want Stanley Systems to inspect the workflow first and credit the audit fee toward a system.
        </p>
      </div>
    </section>
  )
}

function PricingCard({ card }: { card: PlanCard }) {
  return (
    <article className={`flex h-full flex-col rounded-[1.75rem] border p-5 shadow-[0_18px_48px_rgba(7,29,58,0.06)] ${card.featured ? "border-[#BFE4C8] bg-[#F4FBF5]" : "border-[#DDEBE2] bg-white"}`}>
      <p className="w-fit rounded-full border border-[#CFE8D5] bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#116832]">{card.badge}</p>
      <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.03em] text-[#071D3A]">{card.plan}</h3>
      <p className="mt-2 text-[2.6rem] font-semibold leading-none tracking-[-0.05em] text-[#071D3A]">{card.price}</p>
      <dl className="mt-4 grid gap-2 text-sm font-semibold text-[#536173]">
        <div className="flex justify-between gap-3"><dt>Install</dt><dd className="font-extrabold text-[#102033]">{card.install}</dd></div>
        <div className="flex justify-between gap-3"><dt>Audit credit</dt><dd className="font-extrabold text-[#102033]">{card.auditCredit}</dd></div>
        <div className="flex justify-between gap-3"><dt>First-year net after audit credit</dt><dd className="font-extrabold text-[#102033]">{card.firstYearNet}</dd></div>
      </dl>
      <p className="mt-4 text-sm font-bold leading-6 text-[#102033]">Best for: {card.bestFor}</p>
      <ul className="mt-4 flex-1 space-y-2.5">
        {card.includes.map((item) => (
          <li key={item} className="flex gap-2 text-sm font-semibold leading-5 text-[#536173]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" />{item}</li>
        ))}
      </ul>
      <CTALink href={card.href} kind="checkout" location={`cashflow_pricing_${card.packageId}`} analyticsEvent="package_checkout_clicked" analyticsSource="cashflow_control_page" packageId={card.packageId} packageName={card.plan} billingPeriod={card.billingPeriod} ctaLabel={card.cta} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#116832]">
        {card.cta} <ArrowRight className="ml-2 h-4 w-4" />
      </CTALink>
    </article>
  )
}

function Cell({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className="bg-white p-3"><span className="block text-[10px] uppercase tracking-[0.12em] text-[#607080] lg:hidden">{label}</span><span className={strong ? "font-extrabold" : ""}>{value}</span></div>
}
