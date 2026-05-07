import { HeroSection } from "@/components/hero-section"
import { PainAgitationCarousel } from "@/components/sections/pain-agitation-carousel"
import { StakesSection } from "@/components/sections/stakes-section"
import { RevenueLeakCalculatorPreview } from "@/components/home/revenue-leak-calculator-preview"
import { Phase3HomepageSections } from "@/components/phase3-homepage-sections"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { FounderSection } from "@/components/founder-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] overflow-hidden">
      <main className="min-h-screen bg-white">
        <HeroSection />
        <PainAgitationCarousel />
        <StakesSection />
        <RevenueLeakCalculatorPreview />
        <Phase3HomepageSections />
        <PricingSection />
        <FAQSection />
        <FounderSection />
        <FinalCTASection />
        <Footer />
      </main>
    </div>
  )
}
