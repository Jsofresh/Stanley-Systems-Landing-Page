import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { MarineExampleSection } from "@/components/marine-example-section"
import { CalculatorPathSection } from "@/components/calculator-path-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { FounderSection } from "@/components/founder-section"
import { FinalCTASection } from "@/components/final-cta-section"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] overflow-hidden">
      <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#f8f8f5] via-white to-[#f4f4f1]">
        <div className="pointer-events-none fixed inset-0 h-full w-full opacity-25">
          <Aurora colorStops={["#f7f2ea", "#ddf7e8", "#fbf8f2"]} amplitude={0.55} blend={0.28} speed={0.35} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <MarineExampleSection />
          <CalculatorPathSection />
          <HowItWorksSection />
          <PricingSection />
          <FAQSection />
          <FounderSection />
          <FinalCTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
