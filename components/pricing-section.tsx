"use client"

import SlideIn from "@/components/SlideIn"
import Link from "next/link"
import { Search } from "lucide-react"
import { useMemo, useState } from "react"

const plans = [
  {
    name: "Starter",
    monthlyPrice: 337,
    description: "Best fit when one major office or billing problem needs to be fixed first.",
    points: [
      "Fix one major office or billing problem first",
      "Stanley Systems handles setup for you",
      "Basic estimate follow-up and admin cleanup",
      "Simple monthly review",
    ],
    missedUpside: [
      "A complete billing + follow-up + office handoff fix that removes multiple bottlenecks at once",
      "Clean data handoffs between your tools so the team stops retyping the same details",
      "Clear visibility into what is done, what is stuck, and what needs attention (so nothing silently slips)",
    ],
    cta: "Book a meeting",
  },
  {
    name: "Growth",
    monthlyPrice: 667,
    description: "Best fit when billing, follow-up, and office handoffs are all creating drag.",
    points: [
      "Fix multiple breakdowns across billing, follow-up, and office handoffs",
      "Make your tools pass information cleanly without retyping",
      "Clearer visibility into what is getting done and what is still stuck",
      "Faster help when something needs attention",
    ],
    missedUpside: [
      "Broader cleanup across the business (not just the first few bottlenecks)",
      "More hands-on support getting fixes implemented and adopted by the team",
      "Planning and build-out for tougher tool handoffs that need custom work",
    ],
    cta: "Book a meeting",
    featured: true,
    badge: "Best place to start",
  },
  {
    name: "Broader cleanup",
    monthlyPrice: 1337,
    description: "Best fit when the business has multiple bottlenecks and needs more hands-on support.",
    points: [
      "Broader cleanup across the business",
      "More hands-on help getting the fixes in place",
      "Ongoing help deciding what to fix next",
      "Planning for tool handoffs that need custom work",
    ],
    highlights: [
      "Best fit when admin drag is showing up in multiple places at once",
      "Built for owners who want cleaner handoffs, faster invoicing, and less dependence on memory",
      "Ideal when the cheaper plans would leave too many bottlenecks untouched",
    ],
    prevention: [
      "Multiple admin leaks continuing across the business",
      "Too much falling back onto the owner",
      "Cheaper fixes solving one issue while bigger bottlenecks remain",
    ],
    cta: "Book a meeting",
  },
] as const

function formatPrice(price: number) {
  return `$${price.toLocaleString()}/mo`
}

function getDisplayPrice(monthlyPrice: number, yearly: boolean) {
  if (!yearly) return monthlyPrice

  if (monthlyPrice === 337) return 269
  if (monthlyPrice === 667) return 529
  if (monthlyPrice === 1337) return 1059

  return Math.round(monthlyPrice * 0.8)
}

function CheckBullet() {
  return <span className="mt-3 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#16a34a]" />
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
    <section id="pricing" className="relative z-10 scroll-mt-28 px-4 py-12 sm:scroll-mt-32 sm:py-16 lg:scroll-mt-36 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <SlideIn direction="up">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.7rem] lg:leading-[1.02]">
              Simple pricing based on how much needs to be fixed
            </h2>
          </SlideIn>
          <SlideIn direction="up" delay={120}>
            <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-slate-700 sm:text-[1.3rem] lg:text-[1.4rem] lg:leading-10">
              Most businesses start with one major bottleneck: invoicing, follow-up, or office handoffs. Stanley Systems can start narrow or go broader depending on how much is breaking at once. If this helps you save or win just one decent job, it can easily pay for itself.
            </p>
          </SlideIn>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[#e8e1d3] bg-white px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
              <button
                type="button"
                onClick={() => setYearly(false)}
                className={`text-sm font-semibold transition-colors sm:text-base ${!yearly ? "text-slate-900" : "text-slate-500"}`}
              >
                Monthly
              </button>

              <button
                type="button"
                role="switch"
                aria-checked={yearly}
                aria-label="Toggle yearly pricing"
                onClick={() => setYearly((value) => !value)}
                className={`relative inline-flex h-9 w-[4.25rem] touch-manipulation items-center rounded-full transition-colors duration-200 ${yearly ? "bg-[#15803D]" : "bg-[#d9ddcf]"}`}
              >
                <span
                  className={`absolute left-1 h-7 w-7 rounded-full bg-white shadow-md transition-transform duration-200 ${yearly ? "translate-x-[2rem]" : "translate-x-0"}`}
                />
              </button>

              <button
                type="button"
                onClick={() => setYearly(true)}
                className={`text-sm font-semibold transition-colors sm:text-base ${yearly ? "text-slate-900" : "text-slate-500"}`}
              >
                Yearly
              </button>

            </div>
          </div>
        </div>

        <div className="mt-12 grid items-stretch gap-5 xl:grid-cols-3 xl:gap-6">
          {pricedPlans.map((plan, index) => (
            <SlideIn key={plan.name} direction="up" delay={index * 110}>
              <div
                className={`flex h-full flex-col rounded-[1.75rem] border p-6 shadow-[0_18px_40px_rgba(15,23,42,0.07)] sm:p-7 ${
                  plan.featured ? "border-[#cfe0c5] bg-[#f5f9f1]" : "border-[#e8e1d3] bg-white"
                }`}
              >
                <div className="min-h-[130px]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-base">{plan.name}</div>
                    {plan.badge && <span className="rounded-full bg-[#15803D] px-3 py-1 text-xs font-semibold text-white sm:text-sm">{plan.badge}</span>}
                  </div>
                  <div className="mt-4 text-4xl font-semibold leading-none text-slate-900 sm:text-5xl xl:text-[3.2rem]">{formatPrice(plan.displayPrice)}</div>
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

                {plan.highlights && (
                  <div className="mt-7 rounded-[1.25rem] border border-[#e8e1d3] bg-[#f8f6f1] p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-sm">Best fit when...</div>
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
                    href="/contact"
                    className={`inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-base font-semibold transition-all duration-200 sm:text-lg ${
                      plan.featured ? "bg-[#15803D] text-white hover:bg-[#166534]" : "border border-[#d8d1c4] bg-[#f8f6f1] text-slate-900 hover:bg-[#efe9dc]"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  {plan.missedUpside && (
                    <div className="mt-4 rounded-[1.25rem] border border-[#e8e1d3] bg-[#fbfaf7] p-5">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-sm">What you're missing out on</div>
                      <ul className="mt-4 space-y-3">
                        {plan.missedUpside.map((point) => (
                          <li key={point} className="flex items-start gap-3 text-[15px] leading-7 text-slate-700 sm:text-base xl:text-lg xl:leading-8">
                            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fee2e2] text-[#dc2626] text-[13px] font-semibold leading-none">
                              ×
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </SlideIn>
          ))}
        </div>

        <div className="mt-7 rounded-[2rem] border border-[#dfe8d9] bg-[linear-gradient(180deg,#f5f9f1_0%,#ffffff_100%)] px-5 py-6 text-slate-900 shadow-[0_10px_26px_rgba(15,23,42,0.05)] sm:px-7 sm:py-7 lg:opacity-90">
          <div className="rounded-[1.5rem] border border-[#dfe8d9] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:px-6">
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Quick ROI reality check</div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.95rem]">
              This usually makes financial sense long before it feels like a big project.
            </h3>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {[
                "If one missed follow-up costs a decent job, a cleanup that prevents that can pay for itself quickly.",
                "If billing moves a few days faster across the month, the cash-flow improvement can matter more than the fee.",
                "If this replaces part of the owner rescue work or delays the need for another admin hire, the math gets easier fast.",
              ].map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-[#e8dfd0] bg-[#fbfaf7] px-4 py-4 text-sm leading-7 text-slate-700 sm:text-[15px]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-5 lg:mt-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-[#d9e7d1] bg-[linear-gradient(180deg,#f8fbf4_0%,#edf6e7_100%)] shadow-[0_8px_18px_rgba(21,128,61,0.08)]">
                  <Search className="h-6 w-6 text-[#15803D]" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="inline-flex rounded-full bg-[#eef6e8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#15803D] ring-1 ring-inset ring-[#cfe0c5]">
                    Optional visibility add-on
                  </div>
                  <h3 className="mt-3 text-[1.45rem] font-semibold leading-tight text-slate-900 sm:text-[1.7rem] lg:text-[1.8rem]">
                    Show up better in Google, maps, and AI search
                  </h3>
                  <p className="mt-3 max-w-3xl text-[15px] leading-7 text-slate-700 sm:text-base sm:leading-7">
                    If you already want Stanley Systems handling backend workflow fixes, this optional add-on helps your business show up better in Google, maps, and AI search. If it brings in one solid job you would not have gotten otherwise, it can pay for itself.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-2.5 text-sm text-slate-700 sm:grid-cols-2 sm:text-[15px]">
                {[
                  "Content updates to help your business show up in Google and AI search",
                  "Google Business Profile optimization",
                  "Local page and FAQ markup cleanup",
                  "Simple monthly report showing where you are showing up and where you are not",
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
                <div className="mt-2 text-sm font-medium text-slate-600 sm:text-base">Included in Broader cleanup</div>
              </div>
              <Link
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition-all duration-200 hover:bg-[#efe9dc] sm:text-lg"
              >
                Ask about the add-on
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
