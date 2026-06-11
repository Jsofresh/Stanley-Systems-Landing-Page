import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import type { PricingPlan } from "@/lib/pricing/offers"

function monthlyPriceDisplay(plan: PricingPlan) {
  if (plan.billingPeriod !== "yearly" || !plan.priceDisplay) {
    return { price: plan.priceDisplay, note: plan.billingPeriod === "monthly" ? "Monthly plan" : null }
  }

  const yearlyAmount = Number(plan.priceDisplay.replace(/[^0-9.]/g, ""))
  if (!Number.isFinite(yearlyAmount) || yearlyAmount <= 0) {
    return { price: plan.priceDisplay, note: "Billed yearly" }
  }

  return {
    price: `$${Math.round(yearlyAmount / 12).toLocaleString("en-US")}/mo`,
    note: `Billed yearly at ${plan.priceDisplay}`,
  }
}

function compactRows(plan: PricingPlan) {
  return plan.priceRows.filter((row) => {
    const label = row.label.toLowerCase()
    return !label.includes("first year") && (label.includes("installation") || label.includes("setup") || label.includes("assessment") || label.includes("savings"))
  }).map((row) => {
    const label = row.label.toLowerCase()
    if (label.includes("assessment")) return { ...row, label: "AI Office Map credit" }
    return row
  })
}

export function PlanCard({ plan, featured = false }: { plan: PricingPlan; featured?: boolean }) {
  const isAudit = plan.kind === "front_door_audit"
  const display = monthlyPriceDisplay(plan)
  const rows = compactRows(plan)
  return (
    <article
      id={plan.id === "workflow_audit" ? "workflow-audit" : plan.id.replaceAll("_", "-")}
      className={`group flex h-full flex-col rounded-[1.25rem] border bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.055)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#15803D] hover:shadow-[0_24px_60px_rgba(21,128,61,0.14)] hover:ring-2 hover:ring-[#b7e4c7] ${
        featured || isAudit ? "border-[#b8e2c4] ring-1 ring-[#d7f1de]" : "border-[#dfe7ee]"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {isAudit ? (
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#102033]">{plan.title}</h2>
          ) : (
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#102033]">{plan.title}</h3>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-[#e0e8ef] bg-[#f8fbfc] p-3">
        <p className="text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-[#102033]">{display.price}</p>
        {display.note ? <p className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[#5f6e7d]">{display.note}</p> : null}
      </div>

      <div className="mt-3 grid gap-2">
        {plan.cta.href ? (
          <CTALink
            href={plan.cta.href}
            kind="checkout"
            location={`pricing_${plan.id}`}
            analyticsEvent={isAudit ? "audit_checkout_clicked" : "package_checkout_clicked"}
            analyticsSource="pricing_page"
            packageId={plan.analyticsPackageId}
            packageName={plan.packageName}
            billingPeriod={plan.billingPeriod}
            ctaLabel={plan.cta.label}
            className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] ${
              isAudit
                ? "bg-[#15803D] text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:bg-[#116832]"
                : "bg-[#15803D] text-white shadow-[0_14px_28px_rgba(21,128,61,0.20)] hover:bg-[#116832] group-hover:shadow-[0_18px_36px_rgba(21,128,61,0.30)]"
            }`}
          >
            {plan.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
        ) : (
          <div className="rounded-2xl border border-[#dfe7ee] bg-[#f8fbfc] px-4 py-3 text-sm font-semibold leading-6 text-[#536173] sm:col-span-2">
            <span className="block font-bold text-[#26374b]">Monthly checkout unavailable</span>
            {plan.cta.disabledReason ? <span className="mt-1 block">{plan.cta.disabledReason}</span> : null}
          </div>
        )}
      </div>

      <div className="mt-3 grid gap-1.5 rounded-2xl border border-[#e0e8ef] bg-[#f8fbfc] p-3">
        {rows.map((row) => (
          <div key={`${row.label}-${row.value}`} className="flex items-start justify-between gap-3 border-t first:border-t-0 border-[#e3e9ef] pt-1.5 first:pt-0 text-xs leading-5 sm:text-sm">
            <span className="font-semibold text-[#5f6e7d]">{row.label}</span>
            <span className="max-w-[12rem] text-right font-bold text-[#102033]">{row.value}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-base font-extrabold leading-6 text-[#102033]">{plan.promise}</p>
      <p className="mt-1.5 text-sm leading-5 text-[#536173]">{plan.description}</p>

      {isAudit && plan.scopeNote ? (
        <p className="mt-auto pt-4 text-xs font-semibold leading-5 text-[#5f6e7d] sm:text-sm">{plan.scopeNote}</p>
      ) : null}
    </article>
  )
}
