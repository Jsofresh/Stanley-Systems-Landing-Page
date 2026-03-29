"use client"

import Link from "next/link"
import type { ComponentProps, MouseEvent, ReactNode } from "react"

type CTAKind = "book_meeting" | "call_front_desk" | "case_study" | "internal_page"

type CTALinkProps = {
  href: string
  kind: CTAKind
  location: string
  children: ReactNode
  className?: string
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children" | "onClick">

function trackCTA(kind: CTAKind, location: string, href: string) {
  if (typeof window === "undefined") return

  const payload = {
    kind,
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

export function CTALink({ href, kind, location, children, className, ...rest }: CTALinkProps) {
  function handleClick(_event: MouseEvent<HTMLAnchorElement>) {
    trackCTA(kind, location, href)
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
