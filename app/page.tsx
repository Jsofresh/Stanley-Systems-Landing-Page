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
import { FounderSection } from "@/components/founder-section"
import { FinalCTASection } from "@/components/final-cta-section"
import Aurora from "@/components/Aurora"
import { Footer } from "@/components/footer"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"
import Link from "next/link"
import { internalPageLinks } from "@/components/internal-page-data"

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
          <PainPointsSection />
          <ProblemSolutionMapSection />
          <HowItWorksSection />
          <ProofStripSection />
          <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#e8dfd0] bg-white/88 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">More about Stanley Systems</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    Stronger brand pages for buyers, search, and AI discovery.
                  </h2>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    If someone wants to understand who Stanley Systems helps, how the work works, or what kind of proof is being built, these pages give them a cleaner path.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[560px]">
                  {internalPageLinks.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="rounded-[1.2rem] border border-[#e8dfd0] bg-[#fbfaf7] px-4 py-3.5 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
                    >
                      {page.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <MarineExampleSection />
          <TrustOwnershipSection />
          <ReachOutSection />
          <PricingSection />
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
