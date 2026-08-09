import { SiteHeader } from "@/components/hero-section"
import { CashFlowHomepage } from "@/components/home/cash-flow-homepage"
import { Footer } from "@/components/footer"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#071422]">
      <SiteHeader />
      <main className="min-h-screen bg-white">
        <CashFlowHomepage />
        <Footer />
        <MobileStickyCTA />
      </main>
    </div>
  )
}
