import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { CalculatorPathSection } from "@/components/calculator-path-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ProofStripSection } from "@/components/proof-strip-section"
import { TrustOwnershipSection } from "@/components/trust-ownership-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { FounderSection } from "@/components/founder-section"
import { FinalCTASection } from "@/components/final-cta-section"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] overflow-hidden">
      <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#f8f8f5] via-white to-[#f4f4f1]">
        <div className="pointer-events-none fixed inset-0 h-full w-full opacity-35">
          <Aurora colorStops={["#e5e7eb", "#dbeafe", "#f1f5f9"]} amplitude={0.8} blend={0.35} speed={0.5} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <CalculatorPathSection />
          <HowItWorksSection />
          <PricingSection />
          <ProofStripSection />
          <TrustOwnershipSection />
          <FAQSection />
          <FounderSection />
          <FinalCTASection />
          <Footer />
          <MobileStickyCTA />
        </div>
      </main>
    </div>
  )
}
