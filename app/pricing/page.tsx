import type { Metadata } from "next"

import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"
import { PricingPage } from "@/components/pricing"

export const metadata: Metadata = {
  title: "AI Office Pricing | Stanley Systems",
  description:
    "See the $197 AI Office Command Map and the two-company Founding Partner installation at $3,500 setup and $500 per month.",
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
