"use client"

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react"

type CTAPhoneLinkProps = {
  href: string
  location: string
  children: ReactNode
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children" | "onClick">

function trackPhoneCTA(location: string, href: string) {
  if (typeof window === "undefined") return

  const payload = {
    kind: "call_front_desk",
    location,
    href,
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

export function CTAPhoneLink({ href, location, children, className, ...rest }: CTAPhoneLinkProps) {
  function handleClick(_event: MouseEvent<HTMLAnchorElement>) {
    trackPhoneCTA(location, href)
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
