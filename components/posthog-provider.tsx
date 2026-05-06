"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import {
  captureAttributionFromUrl,
  getAttributionProperties,
  initializePostHog,
  trackAuditCheckoutClicked,
  trackCalculatorCtaClicked,
  trackCalculatorIntroViewed,
  trackCheckoutOutcomeViewed,
  trackOnboardingFormStarted,
  trackOnboardingFormSubmitted,
  trackPackageCheckoutClicked,
  trackPackageCompareClicked,
  trackPackageLearnMoreClicked,
  trackPricingViewed,
  trackStanleyEvent,
  type AttributionProperties,
} from "@/lib/posthog-attribution"

function labelFromElement(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, " ").trim().slice(0, 120) || undefined
}

function hrefFromClickTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return null
  return target.closest("a")?.getAttribute("href") || null
}

function isContactHref(href: string) {
  return href === "/contact" || href.endsWith("/contact") || href.includes("/contact?")
}

function dataPropertiesFromElement(element: Element | null): AttributionProperties {
  if (!(element instanceof HTMLElement)) return {}

  return {
    cta_label: element.dataset.ctaLabel || labelFromElement(element),
    cta_location: element.dataset.ctaLocation,
    cta_href: element.getAttribute("href") || undefined,
    event_source: element.dataset.analyticsSource,
    package_id: element.dataset.packageId,
    package_name: element.dataset.packageName,
    billing_period: element.dataset.billingPeriod,
  }
}

function trackNamedAnalyticsEvent(eventName: string, properties: AttributionProperties) {
  switch (eventName) {
    case "calculator_cta_clicked":
      trackCalculatorCtaClicked(properties)
      return
    case "audit_checkout_clicked":
      trackAuditCheckoutClicked(properties)
      return
    case "package_checkout_clicked":
      trackPackageCheckoutClicked(properties)
      return
    case "package_learn_more_clicked":
      trackPackageLearnMoreClicked(properties)
      return
    case "package_compare_clicked":
      trackPackageCompareClicked(properties)
      return
    default:
      trackStanleyEvent(eventName, properties)
  }
}

function classifiedEventFromCTA(kind: unknown, href: unknown, packageId?: string) {
  if (typeof href === "string" && href.includes("buy.stripe.com")) {
    return packageId === "workflow_audit" || !packageId ? "audit_checkout_clicked" : "package_checkout_clicked"
  }

  if (kind === "calculator") return "calculator_cta_clicked"

  return null
}

export function PostHogProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPageView = useRef("")

  useEffect(() => {
    initializePostHog()
  }, [])

  useEffect(() => {
    captureAttributionFromUrl()
    const current = `${pathname}?${searchParams.toString()}`
    if (lastPageView.current === current) return
    lastPageView.current = current
    trackStanleyEvent("page_viewed")
    if (pathname === "/pricing") {
      trackPricingViewed()
    }
    if (pathname === "/checkout/success") {
      trackCheckoutOutcomeViewed("checkout_success_viewed")
    }
    if (pathname === "/checkout/cancel") {
      trackCheckoutOutcomeViewed("checkout_cancel_viewed")
    }
  }, [pathname, searchParams])

  useEffect(() => {
    const observed = new WeakSet<Element>()
    const trackedKeys = new Set<string>()

    function trackVisibleElement(element: Element) {
      if (trackedKeys.has((element as HTMLElement).dataset.analyticsView || "")) return
      const viewEvent = (element as HTMLElement).dataset.analyticsView
      if (!viewEvent) return

      trackedKeys.add(viewEvent)
      if (viewEvent === "calculator_intro_viewed") {
        trackCalculatorIntroViewed((element as HTMLElement).dataset.analyticsSource || "homepage_calculator_section")
        return
      }
      trackStanleyEvent(viewEvent, dataPropertiesFromElement(element))
    }

    const elements = Array.from(document.querySelectorAll("[data-analytics-view]"))
    if (!("IntersectionObserver" in window)) {
      elements.forEach(trackVisibleElement)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          trackVisibleElement(entry.target)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.35 },
    )

    elements.forEach((element) => {
      if (observed.has(element)) return
      observed.add(element)
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    function handleStanleyCTA(event: Event) {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {}
      const properties: AttributionProperties = {
        cta_label: typeof detail.ctaLabel === "string" ? detail.ctaLabel : typeof detail.kind === "string" ? detail.kind : undefined,
        cta_location: typeof detail.location === "string" ? detail.location : undefined,
        cta_href: typeof detail.href === "string" ? detail.href : undefined,
        event_source: typeof detail.source === "string" ? detail.source : undefined,
        package_id: typeof detail.packageId === "string" ? detail.packageId : undefined,
        package_name: typeof detail.packageName === "string" ? detail.packageName : undefined,
        billing_period: typeof detail.billingPeriod === "string" ? detail.billingPeriod : undefined,
      }
      const explicitEvent = typeof detail.analyticsEvent === "string" ? detail.analyticsEvent : null
      const classifiedEvent = classifiedEventFromCTA(detail.kind, detail.href, properties.package_id)

      trackStanleyEvent("cta_clicked", properties)
      if (explicitEvent || classifiedEvent) {
        trackNamedAnalyticsEvent(explicitEvent || classifiedEvent || "cta_clicked", properties)
      }
    }

    function handleDocumentClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return

      const anchor = event.target.closest("a")
      const href = hrefFromClickTarget(event.target)
      if (!href) return
      if (anchor?.getAttribute("data-stanley-cta-tracked") === "true") return

      const properties = dataPropertiesFromElement(anchor)
      const analyticsEvent = anchor?.getAttribute("data-analytics-event")
      if (analyticsEvent) {
        trackNamedAnalyticsEvent(analyticsEvent, properties)
      }

      if (href.includes("calendly.com")) {
        trackStanleyEvent("calendly_clicked", properties)
        trackStanleyEvent("cta_clicked", { ...properties, cta_location: properties.cta_location || "calendly_link" })
        return
      }

      if (href.startsWith("tel:") || isContactHref(href)) {
        trackStanleyEvent("cta_clicked", {
          ...properties,
          cta_location: properties.cta_location || (href.startsWith("tel:") ? "phone_link" : "contact_link"),
        })
      }
    }

    window.addEventListener("stanley:cta-click", handleStanleyCTA)
    document.addEventListener("click", handleDocumentClick)

    return () => {
      window.removeEventListener("stanley:cta-click", handleStanleyCTA)
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [])

  return null
}

export function trackContactFormStarted() {
  trackOnboardingFormStarted()
}

export function trackContactFormSubmitted() {
  trackOnboardingFormSubmitted()
}

export { trackOnboardingFormStarted, trackOnboardingFormSubmitted }
