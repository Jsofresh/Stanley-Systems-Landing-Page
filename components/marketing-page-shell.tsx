import type { ReactNode } from "react"
import Aurora from "@/components/Aurora"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"

export function MarketingPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f7f4]">
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f8f8f5] via-white to-[#f4f4f1]">
        <div className="fixed inset-0 h-full w-full opacity-35">
          <Aurora colorStops={["#e5e7eb", "#dbeafe", "#f1f5f9"]} amplitude={0.8} blend={0.35} speed={0.5} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          {children}
          <Footer />
        </div>
      </main>
    </div>
  )
}
