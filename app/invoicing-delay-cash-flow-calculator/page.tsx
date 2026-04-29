import type { Metadata } from "next"
import dynamic from "next/dynamic"

const Aurora = dynamic(() => import("@/components/Aurora"), {
  ssr: false,
  loading: () => null,
})

import { InvoicingDelayCalculatorClient } from "./calculator-client"

export const metadata: Metadata = {
  title: "InvoiceHelpNow Calculator | Stanley Systems",
  description:
    "Use this interactive invoicing delay calculator to estimate how much money slow invoicing may be costing a service business every month.",
  alternates: {
    canonical: "https://stanley-systems.com/invoicing-delay-cash-flow-calculator",
  },
}

export default function InvoicingDelayCashFlowCalculatorPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f7f4]">
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f8f8f5] via-white to-[#f4f4f1]">
        <div className="fixed inset-0 h-full w-full opacity-35">
          <Aurora colorStops={["#e5e7eb", "#dbeafe", "#f1f5f9"]} amplitude={0.8} blend={0.35} speed={0.5} />
        </div>
        <div className="relative z-10">
          <InvoicingDelayCalculatorClient />
        </div>
      </main>
    </div>
  )
}
