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
