"use client"

export type AttributionProperties = {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  referrer?: string
  landing_page?: string
  current_path?: string
  content_asset?: string
  cta_label?: string
  cta_location?: string
  cta_href?: string
  event_source?: string
  package_id?: string
  package_name?: string
  billing_period?: string
  recommended_system?: string
  recommended_plan?: string
  calculator_kind?: string
  annual_leak_estimate?: string
  monthly_leak_estimate?: string
  form_id?: string
  form_location?: string
}

type PostHogClient = unknown[] & {
  init?: (key: string, options?: Record<string, unknown>) => void
  capture?: (eventName: string, properties?: Record<string, unknown>) => void
  __loaded?: boolean
  __stanleyInitialized?: boolean
  __SV?: number
  _i?: unknown[]
}

declare global {
  interface Window {
    posthog?: PostHogClient & Record<string, unknown>
  }
}

const ATTRIBUTION_STORAGE_KEY = "stanley_attribution_v1"
const POSTHOG_SCRIPT_ID = "posthog-browser-script"

function getWindowPath() {
  return `${window.location.pathname}${window.location.search}`
}

function clean(value: string | null) {
  return value?.trim() || undefined
}

export function cleanAnalyticsValue(value: string | null | undefined, maxLength = 80) {
  const cleaned = value?.replace(/[^a-zA-Z0-9_$+.,:/#?&= -]/g, "").replace(/\s+/g, " ").trim()
  return cleaned ? cleaned.slice(0, maxLength) : undefined
}

export function safeSearchParam(key: string, maxLength = 80) {
  if (typeof window === "undefined") return undefined
  return cleanAnalyticsValue(new URLSearchParams(window.location.search).get(key), maxLength)
}

export function readStoredAttribution(): AttributionProperties {
  if (typeof window === "undefined") return {}

  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as AttributionProperties) : {}
  } catch {
    return {}
  }
}

export function captureAttributionFromUrl(): AttributionProperties {
  if (typeof window === "undefined") return {}

  const params = new URLSearchParams(window.location.search)
  const stored = readStoredAttribution()
  const next: AttributionProperties = {
    ...stored,
    utm_source: clean(params.get("utm_source")) || stored.utm_source,
    utm_medium: clean(params.get("utm_medium")) || stored.utm_medium,
    utm_campaign: clean(params.get("utm_campaign")) || stored.utm_campaign,
    utm_content: clean(params.get("utm_content")) || stored.utm_content,
    utm_term: clean(params.get("utm_term")) || stored.utm_term,
    content_asset: clean(params.get("utm_content")) || stored.content_asset,
    referrer: stored.referrer || clean(document.referrer),
    landing_page: stored.landing_page || getWindowPath(),
  }

  try {
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Attribution is helpful but should never block site behavior.
  }

  return next
}

export function getAttributionProperties(extra: AttributionProperties = {}): AttributionProperties {
  if (typeof window === "undefined") return extra

  return {
    ...readStoredAttribution(),
    current_path: getWindowPath(),
    ...extra,
  }
}

export function trackStanleyEvent(eventName: string, properties: AttributionProperties = {}) {
  if (typeof window === "undefined") return

  const payload = getAttributionProperties(properties)
  window.posthog?.capture?.(eventName, payload)
}

export function trackPricingViewed() {
  trackStanleyEvent("pricing_viewed", {
    event_source: safeSearchParam("source") || "direct",
    recommended_system: safeSearchParam("recommended"),
    recommended_plan: safeSearchParam("recommended_plan"),
    calculator_kind: safeSearchParam("calculator_kind") || (safeSearchParam("source") === "calculator" ? "customer_revenue" : undefined),
    annual_leak_estimate: safeSearchParam("annual_leak", 40),
    monthly_leak_estimate: safeSearchParam("monthly_leak", 40),
  })
}

export function trackCheckoutOutcomeViewed(eventName: "checkout_success_viewed" | "checkout_cancel_viewed") {
  trackStanleyEvent(eventName, {
    event_source: safeSearchParam("source") || "stripe_redirect",
    package_id: safeSearchParam("package") || safeSearchParam("package_id") || "workflow_audit",
    package_name: safeSearchParam("package_name") || "AI Office Map",
  })
}

export function trackCalculatorIntroViewed(source = "homepage_calculator_section") {
  trackStanleyEvent("calculator_intro_viewed", { event_source: source })
}

export function trackCalculatorCtaClicked(properties: AttributionProperties = {}) {
  trackStanleyEvent("calculator_cta_clicked", properties)
}

export function trackAuditCheckoutClicked(properties: AttributionProperties = {}) {
  trackStanleyEvent("audit_checkout_clicked", {
    package_id: "workflow_audit",
    package_name: "AI Office Map",
    ...properties,
  })
}

export function trackPackageCheckoutClicked(properties: AttributionProperties = {}) {
  trackStanleyEvent("package_checkout_clicked", properties)
}

export function trackPackageLearnMoreClicked(properties: AttributionProperties = {}) {
  trackStanleyEvent("package_learn_more_clicked", properties)
}

export function trackPackageCompareClicked(properties: AttributionProperties = {}) {
  trackStanleyEvent("package_compare_clicked", properties)
}

export function trackOnboardingFormStarted(properties: AttributionProperties = {}) {
  trackStanleyEvent("onboarding_form_started", {
    form_id: "workflow_audit_application",
    form_location: "contact_page",
    ...properties,
  })
}

export function trackOnboardingFormSubmitted(properties: AttributionProperties = {}) {
  trackStanleyEvent("onboarding_form_submitted", {
    form_id: "workflow_audit_application",
    form_location: "contact_page",
    ...properties,
  })
}

export function initializePostHog() {
  if (typeof window === "undefined") return false

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return false

  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"
  const existing = window.posthog
  const posthog = Array.isArray(existing) ? existing : ([] as PostHogClient & Record<string, unknown>)
  window.posthog = posthog

  if (!posthog.__SV) {
    const stub = (method: string) => {
      posthog[method] = (...args: unknown[]) => {
        posthog.push([method, ...args])
      }
    }
    for (const method of ["capture", "identify", "reset", "register", "unregister"]) {
      stub(method)
    }
    posthog.init = (projectApiKey: string, options?: Record<string, unknown>, name?: string) => {
      ;(posthog._i ||= []).push([projectApiKey, options || {}, name || "posthog"])
    }
    posthog.__SV = 1
  }

  if (!posthog.__stanleyInitialized && !document.getElementById(POSTHOG_SCRIPT_ID)) {
    const script = document.createElement("script")
    script.id = POSTHOG_SCRIPT_ID
    script.async = true
    script.src = `${host.replace(/\/$/, "")}/static/array.js`
    document.head.appendChild(script)
  }

  if (!posthog.__stanleyInitialized) {
    posthog.init?.(key, {
      api_host: host,
      capture_pageview: false,
      loaded: (posthog: PostHogClient) => {
        posthog.__loaded = true
      },
    })
    posthog.__stanleyInitialized = true
  }

  return true
}
