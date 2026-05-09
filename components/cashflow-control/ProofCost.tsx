import { ArrowRight, Calculator } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { plans, sectionShell } from "./tokens"

const proof = [
  ["Delayed billing", "5 completed jobs × $650 average job = $3,250 sitting in the office path."],
  ["Office time", "8 hours a week chasing billing details = more than 30 hours a month spent on preventable follow-up."],
  ["Open balances", "A/R follow-up that depends on memory turns collected cash into “we'll check later.”"],
  ["Repeated cleanup", "The same missing notes, customer records, and invoice questions keep stealing office time every week."],
] as const

export function ProofCost() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Proof and cost</p>
            <h2 className="mt-3 text-[2.45rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">A few stuck jobs can tie up thousands.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {proof.map(([title, body]) => (
              <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_12px_30px_rgba(7,29,58,0.05)]">
                <h3 className="text-lg font-extrabold text-[#071D3A]">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">{body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-8 rounded-[2rem] border border-[#BFE4C8] bg-[#F4FBF5] p-5 shadow-[0_18px_48px_rgba(7,29,58,0.06)] sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Want to estimate your own leak first?</p>
              <p className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-[#071D3A]">Use the Money Leak Calculator, then start the fix when the math is clear.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CTALink href="/invoicing-delay-cash-flow-calculator" kind="calculator" location="cashflow_proof_calculator" analyticsEvent="calculator_cta_clicked" analyticsSource="cashflow_control_page" ctaLabel="Use the Money Leak Calculator" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#15803D] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:bg-white/80">
                <Calculator className="mr-2 h-4 w-4" /> Use the Money Leak Calculator
              </CTALink>
              <CTALink href={plans.cashflowMonthly.stripePaymentLink.url} kind="checkout" location="cashflow_proof_primary" analyticsEvent="package_checkout_clicked" analyticsSource="cashflow_control_page" packageId={plans.cashflowMonthly.analyticsPackageId} packageName="Cashflow Control System" billingPeriod="monthly" ctaLabel="Start Cashflow Control" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#116832]">
                Start Cashflow Control <ArrowRight className="ml-2 h-4 w-4" />
              </CTALink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
