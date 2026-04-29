"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import {
  captureAttributionFromUrl,
  getAttributionProperties,
  initializePostHog,
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
  }, [pathname, searchParams])

  useEffect(() => {
    function handleStanleyCTA(event: Event) {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail || {}
      trackStanleyEvent("cta_clicked", {
        cta_label: typeof detail.kind === "string" ? detail.kind : undefined,
        cta_location: typeof detail.location === "string" ? detail.location : undefined,
      })
    }

    function handleDocumentClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return

      const anchor = event.target.closest("a")
      const href = hrefFromClickTarget(event.target)
      if (!href) return
      if (anchor?.getAttribute("data-stanley-cta-tracked") === "true") return

      const properties: AttributionProperties = {
        cta_label: labelFromElement(anchor),
        cta_location: anchor?.getAttribute("data-cta-location") || undefined,
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
  trackStanleyEvent("contact_form_started")
}

export function trackContactFormSubmitted() {
  trackStanleyEvent("contact_form_submitted")
}
