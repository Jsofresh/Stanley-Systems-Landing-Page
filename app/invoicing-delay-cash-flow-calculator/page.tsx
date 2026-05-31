import type { Metadata } from "next"
import dynamic from "next/dynamic"

const Aurora = dynamic(() => import("@/components/Aurora"), {
  ssr: false,
  loading: () => null,
})

import { InvoicingDelayCalculatorClient } from "./calculator-client"

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do we need to switch software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Stanley Systems works around the tools your team already uses whenever possible. The point is not to rip out QuickBooks, Jobber, Housecall Pro, ServiceTitan, or your current setup. The point is to fix the gaps where work, billing, follow-up, and customer records fall through.",
      },
    },
    {
      "@type": "Question",
      name: "Who is this best for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Service businesses with real job volume, repeat customers, invoices, estimates, calls, and at least one person dealing with office work. If your team already uses job software, accounting software, spreadsheets, or a CRM, Stanley Systems can find where money is getting stuck.",
      },
    },
    {
      "@type": "Question",
      name: "What if we are not sure where the real problem is?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "That is exactly what the Cash Flow Assessment is for. Stanley Systems checks the path from lead to job, job to invoice, invoice to payment, and customer to repeat revenue. You leave knowing which leak matters first.",
      },
    },
    {
      "@type": "Question",
      name: "I have been burned by consultants before. Why is this different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Stanley Systems is not selling a giant strategy deck. The assessment finds specific money leaks, then the build focuses on practical fixes your team can actually use: cleaner handoffs, faster billing, better follow-up, and fewer missed customer opportunities.",
      },
    },
  ],
}

export const metadata: Metadata = {
  title: "Revenue Leak Calculator | Stanley Systems",
  description:
    "Estimate money sitting inside slow invoices, open estimates, missed calls, and saved customer records nobody is following up with.",
  openGraph: {
    title: "Revenue Leak Calculator | Stanley Systems",
    description:
      "Find cashflow and customer revenue leaks already sitting inside your service business.",
    url: "https://stanley-systems.com/invoicing-delay-cash-flow-calculator",
    siteName: "Stanley Systems",
    type: "website",
  },
  alternates: {
    canonical: "https://stanley-systems.com/invoicing-delay-cash-flow-calculator",
  },
}

export default function InvoicingDelayCashFlowCalculatorPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f5f2ea]">
      <main className="relative min-h-screen overflow-x-clip bg-[radial-gradient(circle_at_50%_-10%,rgba(21,128,61,0.12),rgba(255,255,255,0)_36%),linear-gradient(180deg,#faf8f1_0%,#ffffff_45%,#f3efe5_100%)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="fixed inset-0 h-full w-full opacity-35">
          <Aurora colorStops={["#e5e7eb", "#dbeafe", "#f1f5f9"]} amplitude={0.8} blend={0.35} speed={0.5} />
        </div>
        <div className="relative z-10 w-full max-w-full overflow-x-clip">
          <InvoicingDelayCalculatorClient />
        </div>
      </main>
    </div>
  )
}
