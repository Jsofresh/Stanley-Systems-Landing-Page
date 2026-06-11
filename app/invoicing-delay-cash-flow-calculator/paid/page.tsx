import type { Metadata } from "next"
import { PaidInvoicingDelayCalculatorClient } from "../paid-calculator-client"

export const metadata: Metadata = {
  title: "What Are Invoicing Delays Costing Your Shop? | Stanley Systems",
  description:
    "Get a fast estimate of how invoicing delays may be slowing office workflow in your service business, then get the full breakdown and next-step checklist.",
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
