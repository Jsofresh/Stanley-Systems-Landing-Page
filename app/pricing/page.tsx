import type { Metadata } from "next"

import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"
import { PricingPage } from "@/components/pricing"

export const metadata: Metadata = {
  title: "AI Office Pricing | Stanley Systems",
  description:
    "See the $197 AI Office Command Map and the Founding Partner Installation Sprint at $3,500 and $500 per month.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "AI Office Pricing | Stanley Systems", description: "Compare the $197 Command Map with the $3,500 Installation Sprint and $500/month AI Office Ops.", url: "https://stanley-systems.com/pricing", siteName: "Stanley Systems", images: [{ url: "https://stanley-systems.com/stanley-systems-logo-reference.jpg", width: 1024, height: 1024, alt: "Stanley Systems logo" }], type: "website" },
  twitter: { card: "summary_large_image", title: "AI Office Pricing | Stanley Systems", description: "Compare the Command Map and complete Stanley AI Office installation.", images: ["https://stanley-systems.com/stanley-systems-logo-reference.jpg"] },
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
