import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import type { PricingBillingPeriod, PricingPackage, PricingPackageId } from "@/lib/pricing/source-of-truth"

export type PackagePricingCard = {
  badge: string
  name: string
  package: PricingPackage
  description: string
  install: string
  credit: string
  callout?: string | null
  cta: string
  secondary?: string
  tone: "monthly" | "yearly" | "complete" | "recommended"
  bullets: string[]
}

function badgeClass(tone: PackagePricingCard["tone"]) {
  if (tone === "recommended") return "text-[#15803D]"
  if (tone === "yearly") return "text-[#B91C1C]"
  if (tone === "complete") return "text-[#102A43]"
  return "text-[#66758A]"
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function priceDisplay(pkg: PricingPackage) {
  if (pkg.billingPeriod !== "yearly") return { price: pkg.priceDisplay, note: "Monthly billing." }
  return {
    price: `${money(Math.round(pkg.price / 12))}/mo`,
    note: `Billed yearly at ${pkg.priceDisplay}.`,
  }
}

function normalizedBillingPeriod(pkg: PricingPackage): PricingBillingPeriod {
  if (pkg.billingPeriod === "one_time") return "monthly"
  return pkg.billingPeriod
}

export function PackagePricingGrid({
  cards,
  locationPrefix,
  analyticsSource,
  showAuditSecondary = false,
  auditHref,
  gridClassName = "lg:grid-cols-4",
}: {
  cards: PackagePricingCard[]
  locationPrefix: string
  analyticsSource: string
  showAuditSecondary?: boolean
  auditHref?: string
  gridClassName?: string
}) {
  return (
    <div className={`mt-7 grid gap-5 ${gridClassName}`}>
      {cards.map((card) => (
        <PackagePricingCardView
          key={card.name}
          card={card}
          locationPrefix={locationPrefix}
          analyticsSource={analyticsSource}
          showAuditSecondary={showAuditSecondary}
          auditHref={auditHref}
        />
      ))}
    </div>
  )
}

function PackagePricingCardView({
  card,
  locationPrefix,
  analyticsSource,
  showAuditSecondary,
  auditHref,
}: {
  card: PackagePricingCard
  locationPrefix: string
  analyticsSource: string
  showAuditSecondary: boolean
  auditHref?: string
}) {
  const pkg = card.package
  const isYearly = pkg.billingPeriod === "yearly"
  const isRecommended = card.tone === "recommended"
  const display = priceDisplay(pkg)
  const discountCallout = card.callout ?? (isYearly && pkg.savings ? `-${money(pkg.savings.amount)} first-year package savings` : null)

  return (
    <article
      className={`group relative flex min-h-full flex-col overflow-hidden rounded-[1.45rem] border bg-white p-5 shadow-[0_14px_34px_rgba(33,51,67,0.07)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#15803D] hover:shadow-[0_24px_70px_rgba(21,128,61,0.16)] hover:ring-2 hover:ring-[#B7E4C7] ${
        isRecommended
          ? "border-[#15803D] ring-2 ring-[#A7D8B4]"
          : isYearly
            ? "border-[#CFE1D4]"
            : "border-[#D8E0EA]"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#E4EBE6] transition duration-300 group-hover:bg-[#15803D]" />
      <div className="flex items-start justify-between gap-3">
        <div className="w-full">
          <p className={`${card.badge.startsWith("-") ? "text-center text-lg font-black leading-none tracking-[-0.035em]" : "text-xs font-extrabold uppercase tracking-[0.12em]"} ${badgeClass(card.tone)}`}>
            {card.badge}
          </p>
          <h3 className="mt-4 text-xl font-bold leading-tight tracking-[-0.035em] text-[#102033]">{card.name}</h3>
        </div>
      </div>
      <p className="mt-3 text-[2.55rem] font-bold leading-none tracking-[-0.06em] text-[#102033]">{display.price}</p>
      <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.08em] text-[#607080]">{display.note}</p>

      <CTALink
        href={pkg.stripePaymentLink.url}
        kind="checkout"
        location={`${locationPrefix}_${pkg.id}`}
        analyticsEvent="package_checkout_clicked"
        analyticsSource={analyticsSource}
        packageId={pkg.analyticsPackageId as PricingPackageId}
        packageName={pkg.publicName}
        billingPeriod={normalizedBillingPeriod(pkg)}
        ctaLabel={card.cta}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#15803D] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(21,128,61,0.18)] transition duration-300 hover:bg-[#116832] group-hover:shadow-[0_16px_34px_rgba(21,128,61,0.28)]"
      >
        {card.cta} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </CTALink>

      <p className="mt-4 min-h-[56px] text-sm leading-5 text-[#33475B]">{card.description}</p>

      <div className="mt-3 grid gap-2 border-y border-[#C8D8CE] py-2 text-xs font-semibold leading-5 text-[#33475B]">
        <div className="rounded-xl bg-[#F8FCF9] px-3 py-2 ring-1 ring-[#E0E9E3]">{card.install}</div>
        <div className="rounded-xl bg-[#FFF6F4] px-3 py-2 font-extrabold text-[#B91C1C] ring-1 ring-[#F0C8C1]">{card.credit}</div>
      </div>

      {discountCallout ? (
        <p className="mt-3 rounded-2xl border border-[#F0C8C1] bg-[#FFF6F4] px-3 py-3 text-center text-sm font-black leading-5 tracking-[-0.02em] text-[#B91C1C] shadow-[0_10px_22px_rgba(185,28,28,0.08)]">
          {discountCallout}
        </p>
      ) : null}

      <ul className="mt-3 grid gap-1.5 text-xs leading-5 text-[#33475B]">
        {card.bullets.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803D]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {showAuditSecondary && auditHref && card.secondary ? (
        <CTALink
          href={auditHref}
          kind="checkout"
          location={`${locationPrefix}_audit_${pkg.id}`}
          analyticsEvent="audit_checkout_clicked"
          analyticsSource={analyticsSource}
          packageId="workflow_audit"
          packageName="Workflow Audit"
          billingPeriod="one_time"
          ctaLabel={card.secondary}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex min-h-10 w-full items-center justify-center rounded-full border-2 border-[#15803D] px-4 py-2.5 text-sm font-bold text-[#102033] transition hover:bg-[#E8F6EC]"
        >
          {card.secondary}
        </CTALink>
      ) : null}
    </article>
  )
}
