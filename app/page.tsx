import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { PainPointsSection } from "@/components/pain-points-section"
import { ProblemSolutionMapSection } from "@/components/problem-solution-map-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { MarineExampleSection } from "@/components/marine-example-section"
import { ProofStripSection } from "@/components/proof-strip-section"
import { TrustOwnershipSection } from "@/components/trust-ownership-section"
import { ReachOutSection } from "@/components/reach-out-section"
import { PricingSection } from "@/components/pricing-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTASection } from "@/components/final-cta-section"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f4] overflow-hidden">
      <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#f8f8f5] via-white to-[#f4f4f1]">
        <div className="fixed inset-0 w-full h-full opacity-35">
          <Aurora colorStops={["#e5e7eb", "#dbeafe", "#f1f5f9"]} amplitude={0.8} blend={0.35} speed={0.5} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <PainPointsSection />
          <ProblemSolutionMapSection />
          <HowItWorksSection />
          <ProofStripSection />
          <MarineExampleSection />
          <TrustOwnershipSection />
          <ReachOutSection />
          <PricingSection />
          <FAQSection />
          <FinalCTASection />
          <Footer />
          <MobileStickyCTA />
        </div>
      </main>
    </div>
  )
}
