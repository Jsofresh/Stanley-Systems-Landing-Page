import type { Metadata } from "next"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { CashflowDemoProofStrip } from "@/components/cashflow-control/CashflowDemoProofStrip"
import { CashflowControlFAQ } from "@/components/cashflow-control/CashflowControlFAQ"
import { CashflowControlHero } from "@/components/cashflow-control/CashflowControlHero"
import { CashflowControlPricing } from "@/components/cashflow-control/CashflowControlPricing"
import { FitSetup } from "@/components/cashflow-control/FitSetup"
import { ObjectionGap } from "@/components/cashflow-control/ObjectionGap"
import { ProofCost } from "@/components/cashflow-control/ProofCost"
import { WhatGetsAutomated } from "@/components/cashflow-control/WhatGetsAutomated"
import { WorkflowAuditBridge } from "@/components/cashflow-control/WorkflowAuditBridge"

export const metadata: Metadata = {
  title: "Cashflow Control System | Stanley Systems",
  description:
    "Cashflow Control System automates the workflow from customer intake, webhook, or invoice request through billing, final bill, follow-up, and collected cash.",
  alternates: {
    canonical: "https://stanley-systems.com/systems/cashflow-control",
  },
  openGraph: {
    title: "Cashflow Control System | Stanley Systems",
    description:
      "Automate the customer intake to final bill workflow, route missing information to the right person, and collect cash with less office drag.",
    url: "https://stanley-systems.com/systems/cashflow-control",
    siteName: "Stanley Systems",
    type: "website",
  },
}

export default function CashflowControlPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A]">
        <CashflowControlHero />
        <ObjectionGap />
        <WhatGetsAutomated />
        <ProofCost />
        <FitSetup />
        <CashflowControlPricing />
        <WorkflowAuditBridge />
        <CashflowDemoProofStrip />
        <CashflowControlFAQ />
      </main>
      <Footer />
    </>
  )
}
