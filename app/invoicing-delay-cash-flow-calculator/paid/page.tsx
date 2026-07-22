import type { Metadata } from "next"
import { PaidInvoicingDelayCalculatorClient } from "../paid-calculator-client"

export const metadata: Metadata = {
  title: "Admin Drag Calculator Results | Stanley Systems",
  description:
    "Get a fast estimate of how admin drag may be slowing billing, follow-up, and job admin, then see why the $197 AI Profit Map is the next paid step.",
  alternates: {
    canonical: "https://stanley-systems.com/invoicing-delay-cash-flow-calculator/paid",
  },
}

export default function PaidInvoicingDelayCalculatorPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8f8f5_0%,#ffffff_100%)] px-4 pb-16 pt-16 sm:pt-20">
      <PaidInvoicingDelayCalculatorClient />
    </main>
  )
}
