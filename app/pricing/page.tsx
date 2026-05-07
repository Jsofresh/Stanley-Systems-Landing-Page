import type { Metadata } from "next"

import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { PricingPage } from "@/components/pricing"

export const metadata: Metadata = {
  title: "Pricing | Workflow Audit | Stanley Systems",
  description:
    "Start with the paid Workflow Audit from Stanley Systems. Find where cash, customers, and office time are leaking before choosing a build path.",
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
    </>
  )
}
