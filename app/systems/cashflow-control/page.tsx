import type { Metadata } from "next"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { CashflowControlFAQ } from "@/components/cashflow-control/CashflowControlFAQ"
import { CashflowControlHero } from "@/components/cashflow-control/CashflowControlHero"
import { CashflowControlPricing } from "@/components/cashflow-control/CashflowControlPricing"
import { FitSetup } from "@/components/cashflow-control/FitSetup"
import { ObjectionGap } from "@/components/cashflow-control/ObjectionGap"
import { ProofCost } from "@/components/cashflow-control/ProofCost"
import { WhatGetsAutomated } from "@/components/cashflow-control/WhatGetsAutomated"

export const metadata: Metadata = {
  title: "Cashflow Control System | Stanley Systems",
  description:
    "Cashflow Control System helps service businesses move finished jobs toward billing, invoice follow-up, and collected cash with fewer manual office checks.",
  alternates: {
    canonical: "https://stanley-systems.com/systems/cashflow-control",
  },
  openGraph: {
    title: "Cashflow Control System | Stanley Systems",
    description:
      "A practical billing and invoice follow-up system for service businesses that need finished work to move toward collected cash faster.",
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
        <CashflowControlFAQ />
      </main>
      <Footer />
    </>
  )
}
