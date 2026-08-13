import type { Metadata } from "next"

import { CapacityCalculator } from "@/components/ai-office-capacity-calculator/capacity-calculator"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"

export const metadata: Metadata = {
  title: "AI Office Capacity Calculator | Stanley Systems",
  description: "Estimate the annual office hours and salary capacity tied up in repeat administrative work.",
  alternates: { canonical: "/ai-office-capacity-calculator" },
}

export default function CapacityCalculatorPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#F5F9F2] px-5 pb-20 pt-32 text-[#071D3A] md:px-8 lg:px-10 lg:pt-36">
        <section className="mx-auto max-w-[88rem]">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-balance text-[clamp(2.8rem,6.5vw,6rem)] font-black leading-[0.9] tracking-[-0.05em]">
              See how much office capacity <span className="text-[#15803D]">repeat work</span> is consuming.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-bold leading-7 text-[#536173] sm:text-xl">
              Move four sliders. Answer three quick questions. Get your annual estimate.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-[82rem] sm:mt-12">
            <CapacityCalculator />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
