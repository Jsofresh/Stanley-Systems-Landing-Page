import type { Metadata } from "next"

import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"
import { PricingPage } from "@/components/pricing"

export const metadata: Metadata = {
  title: "Pricing | AI Profit Map | Stanley Systems",
  description:
    "Start with the paid AI Profit Map from Stanley Systems. Find where calls, invoices, follow-ups, and past customers are leaking before choosing a build path.",
}

type PricingRouteProps = {
  searchParams?: Record<string, string | string[] | undefined>
}

export default function PricingRoute({ searchParams = {} }: PricingRouteProps) {
  return (
    <>
      <SiteHeader />
      <PricingPage searchParams={searchParams} />
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
