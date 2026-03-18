"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

const plans = [
  {
    name: "Starter",
    monthlyPrice: 497,
    description: "For businesses that need one high-friction workflow cleaned up first.",
    points: [
      "One core bottleneck addressed",
      "Done-for-you setup",
      "Basic follow-up / admin automation",
      "Monthly review",
    ],
    missingOut: [
      "Multi-step handoffs between multiple tools",
      "Deeper reporting and review",
      "Priority support",
      "Broader process cleanup across the business",
    ],
    cta: "Book a Call",
  },
  {
    name: "Professional",
    monthlyPrice: 997,
    description: "For businesses that need multiple workflow handoffs fixed across ops and follow-up.",
    points: [
      "Multiple workflow bottlenecks addressed",
      "Cross-tool automation",
      "Stronger reporting and review",
      "Priority support",
    ],
    missingOut: [
      "Full workflow coverage across the business",
      "Deeper implementation support",
      "Operational advisory",
      "Custom integration planning",
    ],
    cta: "Book a Call",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    monthlyPrice: 1997,
    description: "For teams that need broader process cleanup, implementation depth, and more ownership support.",
    points: [
      "Full workflow coverage",
      "Deeper implementation support",
      "Operational advisory",
      "Custom integration planning",
    ],
    highlights: [
      "Best fit when admin drag is showing up in multiple places at once",
      "Built for owners who want cleaner handoffs, faster invoicing, and less dependence on memory",
      "Ideal when the cheaper plans would leave too many bottlenecks untouched",
    ],
    cta: "Book a Call",
  },
] as const

function formatPrice(price: number) {
  return `$${price.toLocaleString()}/mo`
}

function getDisplayPrice(monthlyPrice: number, yearly: boolean) {
  if (!yearly) return monthlyPrice

  if (monthlyPrice === 497) return 397
  if (monthlyPrice === 997) return 797
  if (monthlyPrice === 1997) return 1597

  return Math.round(monthlyPrice * 0.8)
}

function CheckBullet() {
  return <span className="mt-3 h-2.5 w-2.5 rounded-full bg-[#16a34a] flex-shrink-0" />
}

function XBullet() {
  return (
    <span className="mt-1.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#fff1f2] text-[#dc2626] text-lg font-semibold leading-none">
      ×
    </span>
  )
}

export function PricingSection() {
  const [yearly, setYearly] = useState(false)

  const pricedPlans = useMemo(
    () =>
      plans.map((plan) => ({
        ...plan,
        displayPrice: getDisplayPrice(plan.monthlyPrice, yearly),
      })),
    [yearly],
  )

  return (
    <section id="pricing" className="px-4 py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-[4rem] lg:leading-[1.02] font-semibold tracking-tight text-slate-900">
            Workflow automation that fits your budget
          </h2>
          <p className="mt-6 max-w-4xl mx-auto text-xl leading-9 text-slate-700 sm:text-[1.45rem] lg:text-[1.55rem] lg:leading-10">
            Start with the workflow costing you the most. Every plan includes setup, onboarding, and a 30-day money-back guarantee.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-[#e8e1d3] bg-white px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
              <span className={`text-sm sm:text-base font-semibold transition-colors ${!yearly ? "text-slate-900" : "text-slate-500"}`}>
                Monthly
              </span>
              <button
                type="button"
                aria-pressed={yearly}
                onClick={() => setYearly((value) => !value)}
                className={`relative flex h-8 w-16 items-center rounded-full transition-colors duration-200 ${
                  yearly ? "bg-[#15803D]" : "bg-[#d9ddcf]"
                }`}
              >
                <span
                  className={`absolute h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-200 ${
                    yearly ? "translate-x-9" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm sm:text-base font-semibold transition-colors ${yearly ? "text-slate-900" : "text-slate-500"}`}>
                Yearly
              </span>
              <span className="rounded-full bg-[#eef6e8] px-3 py-1 text-sm font-semibold text-[#15803D]">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 xl:grid-cols-3 xl:gap-6 items-stretch">
          {pricedPlans.map((plan) => (
            <div
              key={plan.name}
              className={`flex h-full flex-col rounded-[1.75rem] border p-6 sm:p-7 shadow-[0_18px_40px_rgba(15,23,42,0.07)] ${
                plan.featured ? "border-[#cfe0c5] bg-[#f5f9f1]" : "border-[#e8e1d3] bg-white"
              }`}
            >
              <div className="min-h-[130px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm sm:text-base font-semibold uppercase tracking-[0.14em] text-slate-500">{plan.name}</div>
                  {plan.badge && (
                    <span className="rounded-full bg-[#15803D] px-3 py-1 text-xs sm:text-sm font-semibold text-white">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl xl:text-[3.2rem] leading-none">
                  {formatPrice(plan.displayPrice)}
                </div>
                <p className="mt-4 text-[15px] leading-7 text-slate-700 sm:text-base xl:text-lg xl:leading-8">{plan.description}</p>
              </div>

              <ul className="mt-6 space-y-3.5">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-3.5 text-[15px] leading-7 text-slate-700 sm:text-base xl:text-lg xl:leading-8">
                    <CheckBullet />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {plan.missingOut && plan.missingOut.length > 0 && (
                <div className="mt-7 border-t border-[#ebe5d9] pt-5">
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#dc2626]">
                    What you’re missing out on
                  </div>
                  <ul className="mt-4 space-y-3.5">
                    {plan.missingOut.map((point) => (
                      <li key={point} className="flex items-start gap-3.5 text-[15px] leading-7 text-slate-600 sm:text-base xl:text-lg xl:leading-8">
                        <XBullet />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {plan.highlights && (
                <div className="mt-7 rounded-[1.25rem] border border-[#e8e1d3] bg-[#f8f6f1] p-5">
                  <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Why teams choose this
                  </div>
                  <ul className="mt-4 space-y-3">
                    {plan.highlights.map((point) => (
                      <li key={point} className="text-[15px] leading-7 text-slate-700 sm:text-base xl:text-lg xl:leading-8">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-7 pt-1">
                <Link
                  href="https://calendly.com/jadenodorczuk24/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-base font-semibold transition-all duration-200 sm:text-lg ${
                    plan.featured
                      ? "bg-[#15803D] text-white hover:bg-[#166534]"
                      : "border border-[#d8d1c4] bg-[#f8f6f1] text-slate-900 hover:bg-[#efe9dc]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-[2rem] border border-[#e8e1d3] bg-[#f8f6f1] px-5 py-5 text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.07)] sm:px-7 sm:py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#d9e7d1] bg-[linear-gradient(180deg,#f8fbf4_0%,#edf6e7_100%)] shadow-[0_8px_18px_rgba(21,128,61,0.08)]">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#15803D]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4.5a7.5 7.5 0 1 1 0 15a7.5 7.5 0 0 1 0-15Z" />
                    <path d="M9.25 12h3.1c1.5 0 2.4-.8 2.4-2.1c0-1.45-1.02-2.4-2.6-2.4c-1.42 0-2.44.7-2.86 1.93" />
                    <path d="M12 12v4" />
                    <path d="M10.2 14.2L12 16l1.8-1.8" />
                  </svg>
                </div>
                <div>
                  <div className="inline-flex rounded-full bg-[#eef6e8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#15803D] ring-1 ring-inset ring-[#cfe0c5]">
                    Add-on
                  </div>
                  <h3 className="mt-3 whitespace-nowrap text-[1.55rem] font-semibold leading-tight text-slate-900 sm:text-[1.85rem] lg:text-[1.95rem]">
                    Stop Losing Customers to Competitors Who Show Up First
                  </h3>
                  <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-700 sm:text-base sm:leading-7">
                    If local buyers can’t find your business first, they usually call the company they see first. This add-on helps Stanley Systems improve visibility across search, maps, and AI-driven discovery so more ready-to-buy customers find you before they find a competitor.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-2.5 text-sm text-slate-700 sm:grid-cols-2 sm:text-[15px]">
                {[
                  "Schema markup for local / FAQ / service pages",
                  "AI search-targeted content updates",
                  "Google Business Profile optimization",
                  "Monthly visibility + ranking report",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1.1rem] border border-[#e3dccf] bg-white px-3.5 py-3">
                    <span className="mt-0.5 flex h-5.5 w-5.5 flex-shrink-0 items-center justify-center rounded-full bg-[#eef6e8] text-[12px] font-semibold text-[#15803D]">
                      ✓
                    </span>
                    <span className="leading-6">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex min-w-[240px] flex-col items-center justify-center gap-3 text-center lg:pl-6">
              <div>
                <div className="text-4xl font-semibold leading-none text-slate-900 sm:text-[3.1rem]">$397<span className="ml-1 text-lg font-medium text-slate-500">/mo</span></div>
                <div className="mt-2 text-sm font-medium text-slate-600 sm:text-base">Included in Enterprise</div>
              </div>
              <Link
                href="https://calendly.com/jadenodorczuk24/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#15803D] px-7 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-[#166534] sm:text-lg"
              >
                Add to my plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
