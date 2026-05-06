import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import type { PricingPlan } from "@/lib/pricing/offers"

export function PlanCard({ plan, featured = false }: { plan: PricingPlan; featured?: boolean }) {
  const isAudit = plan.kind === "front_door_audit"
  return (
    <article
      id={plan.id === "workflow_audit" ? "workflow-audit" : plan.id.replaceAll("_", "-")}
      className={`flex h-full flex-col rounded-[1.35rem] border bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)] sm:p-5 ${
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
          {plan.shortTitle && plan.shortTitle !== plan.title ? (
            <p className="mt-1 text-sm font-bold text-[#15803D]">{plan.shortTitle}</p>
          ) : null}
        </div>
        {featured ? (
          <span className="rounded-full bg-[#e7f6eb] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#116832]">
            Best value
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-base font-extrabold leading-6 text-[#102033]">{plan.promise}</p>
      <p className="mt-1.5 text-sm leading-5 text-[#536173]">{plan.description}</p>

      <div className="mt-4 rounded-2xl border border-[#e0e8ef] bg-[#f8fbfc] p-3">
        <p className="text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-[#102033]">{plan.priceDisplay}</p>
        <div className="mt-3 grid gap-1.5">
          {plan.priceRows.map((row) => (
            <div key={`${row.label}-${row.value}`} className="flex items-start justify-between gap-3 border-t border-[#e3e9ef] pt-1.5 text-xs leading-5 sm:text-sm">
              <span className="font-semibold text-[#5f6e7d]">{row.label}</span>
              <span className="max-w-[12rem] text-right font-bold text-[#102033]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {plan.checklist.slice(0, 3).map((item) => (
          <li key={item} className="flex gap-2 text-sm font-semibold leading-5 text-[#26374b]">
            <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#15803D]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {isAudit && plan.scopeNote ? (
        <p className="mt-auto pt-4 text-xs font-semibold leading-5 text-[#5f6e7d] sm:text-sm">{plan.scopeNote}</p>
      ) : null}

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
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
              plan.secondaryCta ? "" : "sm:col-span-2"
            } ${
              isAudit
                ? "bg-[#15803D] text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:bg-[#116832]"
                : "border border-[#b7d7bf] bg-white text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] hover:border-[#15803D] hover:bg-[#f7fcf7]"
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

        {plan.secondaryCta ? (
          <CTALink
            href={plan.secondaryCta.href}
            kind={plan.secondaryCta.action === "systems" ? "systems" : "internal_page"}
            location={`pricing_${plan.id}_secondary`}
            analyticsEvent={plan.secondaryCta.label === "Compare Both Systems" ? "package_compare_clicked" : "package_learn_more_clicked"}
            analyticsSource="pricing_page"
            packageId={plan.analyticsPackageId}
            packageName={plan.packageName}
            billingPeriod={plan.billingPeriod}
            ctaLabel={plan.secondaryCta.label}
            className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d3dee8] bg-[#f8fbfc] px-4 py-3 text-sm font-bold text-[#26374b] transition hover:border-[#aebdca] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] ${
              plan.cta.href ? "" : "sm:col-span-2"
            }`}
          >
            <span className="whitespace-nowrap">{plan.secondaryCta.label}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
        ) : null}
      </div>
    </article>
  )
}
