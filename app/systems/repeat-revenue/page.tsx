import type { Metadata } from "next"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { DemoProofStrip } from "@/components/repeat-revenue/DemoProofStrip"
import { LeakSelector } from "@/components/repeat-revenue/LeakSelector"
import { MoneyMathSection } from "@/components/repeat-revenue/MoneyMathSection"
import { RepeatRevenueFAQ } from "@/components/repeat-revenue/RepeatRevenueFAQ"
import { RepeatRevenueHero } from "@/components/repeat-revenue/RepeatRevenueHero"
import { RepeatRevenuePricing } from "@/components/repeat-revenue/RepeatRevenuePricing"
import { RevenueFlywheel } from "@/components/repeat-revenue/RevenueFlywheel"
import { WorkflowAuditFallback } from "@/components/repeat-revenue/WorkflowAuditFallback"

export const metadata: Metadata = {
  title: "Repeat Revenue System | Stanley Systems",
  description:
    "Repeat Revenue System brings past customers back, asks happy customers for reviews and referrals, and catches missed calls before they turn into cold leads.",
  alternates: {
    canonical: "https://stanley-systems.com/systems/repeat-revenue",
  },
  openGraph: {
    title: "Repeat Revenue System | Stanley Systems",
    description:
      "Get more money from the customers you already earned with follow-up, reviews, referrals, and captured missed calls.",
    url: "https://stanley-systems.com/systems/repeat-revenue",
    siteName: "Stanley Systems",
    type: "website",
  },
}

export default function RepeatRevenuePage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#213343] [&_section[id]]:scroll-mt-[120px]">
        <RepeatRevenueHero />
        <LeakSelector />
        <MoneyMathSection />
        <RevenueFlywheel />
        <RepeatRevenuePricing />
        <WorkflowAuditFallback />
        <DemoProofStrip />
        <RepeatRevenueFAQ />
      </main>
      <Footer />
    </>
  )
}
