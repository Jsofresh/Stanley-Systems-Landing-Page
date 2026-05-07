import { HeroSection, SiteHeader } from "@/components/hero-section"
import { PainAgitationCarousel } from "@/components/sections/pain-agitation-carousel"
import { StakesSection } from "@/components/sections/stakes-section"
import { RevenueLeakCalculatorPreview } from "@/components/home/revenue-leak-calculator-preview"
import { SystemsThatMakeMoneySection } from "@/components/home/SystemsThatMakeMoneySection"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] overflow-hidden">
      <SiteHeader />
      <main className="min-h-screen bg-white">
        <HeroSection />
        <PainAgitationCarousel />
        <StakesSection />
        <RevenueLeakCalculatorPreview />
        <SystemsThatMakeMoneySection />
        <FinalCTASection />
        <Footer />
      </main>
    </div>
  )
}
