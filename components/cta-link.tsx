"use client"

import Link from "next/link"
import type { ComponentProps, MouseEvent, ReactNode } from "react"

type CTAKind = "book_meeting" | "call_front_desk" | "case_study" | "internal_page" | "calculator" | "systems" | "checkout"
type AnalyticsEvent =
  | "calculator_cta_clicked"
  | "audit_checkout_clicked"
  | "package_checkout_clicked"
  | "package_learn_more_clicked"
  | "package_compare_clicked"
  | "hero_primary_cta_clicked"

type CTALinkProps = {
  href: string
  kind: CTAKind
  location: string
  children: ReactNode
  className?: string
  analyticsEvent?: AnalyticsEvent
  analyticsSource?: string
  packageId?: string
  packageName?: string
  billingPeriod?: string
  ctaLabel?: string
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children" | "onClick">

function trackCTA({
  analyticsEvent,
  analyticsSource,
  billingPeriod,
  ctaLabel,
  href,
  kind,
  location,
  packageId,
  packageName,
}: {
  analyticsEvent?: AnalyticsEvent
  analyticsSource?: string
  billingPeriod?: string
  ctaLabel?: string
  href: string
  kind: CTAKind
  location: string
  packageId?: string
  packageName?: string
}) {
  if (typeof window === "undefined") return

  const payload = {
    analyticsEvent,
    billingPeriod,
    ctaLabel,
    kind,
    location,
    href,
    packageId,
    packageName,
    source: analyticsSource,
    timestamp: Date.now(),
  }

  window.dispatchEvent(new CustomEvent("stanley:cta-click", { detail: payload }))

  if (typeof window.gtag === "function") {
    window.gtag("event", "cta_click", payload)
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function CTALink({
  href,
  kind,
  location,
  children,
  className,
  analyticsEvent,
  analyticsSource,
  billingPeriod,
  ctaLabel,
  packageId,
  packageName,
  ...rest
}: CTALinkProps) {
  function handleClick(_event: MouseEvent<HTMLAnchorElement>) {
    trackCTA({
      analyticsEvent,
      analyticsSource,
      billingPeriod,
      ctaLabel,
      href,
      kind,
      location,
      packageId,
      packageName,
    })
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      data-stanley-cta-tracked="true"
      data-analytics-event={analyticsEvent}
      data-analytics-source={analyticsSource}
      data-billing-period={billingPeriod}
      data-cta-label={ctaLabel}
      data-cta-location={location}
      data-package-id={packageId}
      data-package-name={packageName}
      {...rest}
    >
      {children}
    </Link>
  )
}
