import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const calculatorHref = "/invoicing-delay-cash-flow-calculator"
const cashflowHref = "/systems/cashflow-control"
const repeatRevenueHref = "/systems/repeat-revenue"

const systems = [
  {
    name: "Cashflow Control System",
    route: cashflowHref,
    label: "Late cash and growth money",
    promise: "Turn finished work into invoice-ready handoffs, final bill follow-up, and collected cash.",
    signs: ["Finished jobs wait before billing", "Open balances need follow-up", "The owner keeps checking if invoices moved"],
    cta: "View Cashflow Control",
    packageId: "cashflow_control_monthly",
    price: pricingPackageById.cashflow_control_monthly.priceDisplay,
    setup: pricingPackageById.cashflow_control_monthly.setupFeeDisplay,
  },
  {
    name: "Repeat Revenue System",
    route: repeatRevenueHref,
    label: "Competitors outpace when follow-up slips",
    promise: "Build the flywheel from ratings, reviews, referrals, Google visibility, missed calls, and past customers.",
    signs: ["Past customers are not getting checked", "Reviews and referrals happen randomly", "Missed calls and old estimates go cold"],
    cta: "View Repeat Revenue",
    packageId: "repeat_revenue_monthly",
    price: pricingPackageById.repeat_revenue_monthly.priceDisplay,
    setup: pricingPackageById.repeat_revenue_monthly.setupFeeDisplay,
  },
]

const pricingPreview = [
  {
    name: "Cash Flow Assessment",
    price: pricingPackageById.workflow_audit.priceDisplay,
    note: "Paid diagnostic before a build.",
    href: "#final-audit",
    cta: "See the assessment step",
  },
  {
    name: "Cashflow Control",
    price: pricingPackageById.cashflow_control_monthly.priceDisplay,
    note: `${pricingPackageById.cashflow_control_monthly.setupFeeDisplay}. Assessment credit can apply.`,
    href: cashflowHref,
    cta: "View system",
  },
  {
    name: "Repeat Revenue",
    price: pricingPackageById.repeat_revenue_monthly.priceDisplay,
    note: `${pricingPackageById.repeat_revenue_monthly.setupFeeDisplay}. Assessment credit can apply.`,
    href: repeatRevenueHref,
    cta: "View system",
  },
]

export function PricingSection() {
  return (
    <section
      id="pricing-preview"
      data-audit-page="/"
      data-audit-section="home.pricing-preview"
      data-audit-priority="5"
      data-audit-offer="Cashflow Control System, Repeat Revenue System"
      data-audit-purpose="Explain the two approved Stanley Systems implementation systems without inventing offers."
      className="relative z-10 scroll-mt-28 px-4 py-10 sm:scroll-mt-32 sm:px-6 sm:py-12 lg:scroll-mt-36 lg:px-8 lg:py-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#15803D]">Two money paths</p>
            <h2 className="mt-2 max-w-3xl text-[2.1rem] font-semibold leading-[1.03] text-[#071421] sm:text-[2.65rem] lg:text-[3.05rem]">
              Pick the system by where money gets stuck.
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-7 text-[#4d5a68] sm:text-lg">
            Stanley Systems does not start by selling a pile of tools. The diagnostic points to the first money path: collected cash from finished work, repeat revenue from customers already earned, or both.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {systems.map((system) => (
            <article key={system.name} className="flex h-full flex-col rounded-[1.35rem] border border-[#dce8d7] bg-white p-5 shadow-[0_18px_46px_rgba(16,32,51,0.06)] sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#15803D]">{system.label}</p>
                  <h3 className="mt-2 text-2xl font-bold leading-tight text-[#102033]">{system.name}</h3>
                </div>
                <div className="rounded-full border border-[#cfe8d5] bg-[#eef9f2] px-3 py-1.5 text-sm font-black text-[#116832]">
                  {system.price}
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#4d5a68] sm:text-base sm:leading-7">{system.promise}</p>
              <ul className="mt-4 grid gap-2.5">
                {system.signs.map((sign) => (
                  <li key={sign} className="flex gap-2.5 text-sm leading-6 text-[#102033]">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#15803D]" aria-hidden="true" />
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <CTALink
                  href={system.route}
                  kind="systems"
                  location={`${system.packageId}_homepage`}
                  analyticsEvent="package_learn_more_clicked"
                  analyticsSource="homepage_systems_section"
                  packageId={system.packageId}
                  packageName={system.name}
                  ctaLabel={system.cta}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_30px_rgba(21,128,61,0.2)] transition hover:bg-[#116832] sm:w-auto"
                >
                  {system.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </CTALink>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-[1.35rem] border border-[#e2dbcf] bg-[#fbfaf7] p-4 shadow-[0_18px_42px_rgba(16,32,51,0.05)] sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#15803D]">Compact pricing preview</p>
              <h3 className="mt-2 text-2xl font-bold leading-tight text-[#102033]">Start with the diagnostic, then buy the system that matches the leak.</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {pricingPreview.map((item) => (
                <div key={item.name} className="rounded-[1rem] border border-[#e5ded3] bg-white p-4">
                  <div className="text-sm font-black text-[#102033]">{item.name}</div>
                  <div className="mt-2 text-2xl font-black text-[#15803D]">{item.price}</div>
                  <p className="mt-1 min-h-[2.5rem] text-xs font-semibold leading-5 text-[#607080]">{item.note}</p>
                  <CTALink
                    href={item.href}
                    kind="systems"
                    location={`${item.name.toLowerCase().replaceAll(" ", "_")}_pricing_preview`}
                    analyticsEvent="package_compare_clicked"
                    analyticsSource="homepage_pricing_preview"
                    ctaLabel={item.cta}
                    className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-full border border-[#d6e5ca] bg-white px-4 py-2 text-xs font-bold text-[#102033] transition hover:border-[#15803D]/40 hover:bg-[#f2fbf5]"
                  >
                    {item.cta}
                  </CTALink>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <CTALink
              href={calculatorHref}
              kind="calculator"
              location="homepage_pricing_calculator"
              analyticsEvent="calculator_cta_clicked"
              analyticsSource="homepage_pricing_preview"
              ctaLabel="Calculate my revenue leak"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_30px_rgba(21,128,61,0.18)] transition hover:bg-[#116832]"
            >
              Calculate my revenue leak
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTALink>
            <CTALink
              href="#audit"
              kind="systems"
              location="homepage_pricing_audit"
              analyticsEvent="package_compare_clicked"
              analyticsSource="homepage_pricing_preview"
              ctaLabel="See how the assessment works"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d6e5ca] bg-white px-6 py-3 text-sm font-bold text-[#102033] transition hover:border-[#15803D]/40 hover:bg-[#f2fbf5]"
            >
              See how the assessment works
            </CTALink>
          </div>
        </div>
      </div>
    </section>
  )
}
