import Image from "next/image"
import { ArrowRight, Calculator } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { plans, sectionShell } from "./tokens"

export function ProofCost() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <h2 className="text-[2.45rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Manual handoffs turn completed work into delayed cash.</h2>
          </div>
          <Image
            src="/images/uploaded/office workflow-control/delayed-billing-office-time-open-balances.jpg"
            alt="Delayed billing, office time, open balances, and repeated cleanup office workflow costs."
            width={1280}
            height={720}
            className="h-auto w-full rounded-[2rem] shadow-[0_18px_48px_rgba(7,29,58,0.08)]"
          />
        </div>
        <div className="mt-8 rounded-[2rem] border border-[#BFE4C8] bg-[#F4FBF5] p-5 shadow-[0_18px_48px_rgba(7,29,58,0.06)] sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-2xl font-extrabold tracking-[-0.03em] text-[#071D3A]">Use the Admin Drag Calculator, then automate the path causing the delay.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CTALink href="/invoicing-delay-cash-flow-calculator" kind="calculator" location="office workflow_proof_calculator" analyticsEvent="calculator_cta_clicked" analyticsSource="cashflow_control_page" ctaLabel="Use the Admin Drag Calculator" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#15803D] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:bg-white/80">
                <Calculator className="mr-2 h-4 w-4" /> Use the Admin Drag Calculator
              </CTALink>
              <CTALink href={plans.cashflowMonthly.stripePaymentLink.url} kind="checkout" location="office workflow_proof_primary" analyticsEvent="package_checkout_clicked" analyticsSource="cashflow_control_page" packageId={plans.cashflowMonthly.analyticsPackageId} packageName="AI Office Installation Sprint" billingPeriod="monthly" ctaLabel="Start Office Workflow Control" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#116832]">
                Start Office Workflow Control <ArrowRight className="ml-2 h-4 w-4" />
              </CTALink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
