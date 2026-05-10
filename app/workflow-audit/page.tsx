import type { Metadata } from "next"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { WorkflowAuditHero } from "@/components/workflow-audit/WorkflowAuditHero"
import { ProblemObjection } from "@/components/workflow-audit/ProblemObjection"
import { AuditChecks } from "@/components/workflow-audit/AuditChecks"
import { HowAuditWorks } from "@/components/workflow-audit/HowAuditWorks"
import { ProofCostCalculator } from "@/components/workflow-audit/ProofCostCalculator"
import { FitAccessPricing } from "@/components/workflow-audit/FitAccessPricing"
import { WorkflowAuditFAQ } from "@/components/workflow-audit/WorkflowAuditFAQ"

export const metadata: Metadata = {
  title: "Workflow Audit | Stanley Systems",
  description: "Find the money leaks hiding inside your office workflow before buying a system.",
  alternates: { canonical: "https://stanley-systems.com/workflow-audit" },
  openGraph: {
    title: "Workflow Audit | Stanley Systems",
    description: "Find the money leaks hiding inside your office workflow before buying a system.",
    url: "https://stanley-systems.com/workflow-audit",
    siteName: "Stanley Systems",
    type: "website",
  },
}

export default function WorkflowAuditPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#071D3A]">
      <SiteHeader />
      <main data-nav-theme="light" className="relative bg-[#f7f7f4]">
        <WorkflowAuditHero />
        <ProblemObjection />
        <AuditChecks />
        <HowAuditWorks />
        <ProofCostCalculator />
        <FitAccessPricing />
        <WorkflowAuditFAQ />
        <Footer />
      </main>
    </div>
  )
}
