import { PackagePricingGrid, type PackagePricingCard } from "@/components/package-pricing-cards"
import { plans, sectionShell } from "./tokens"

const cards: PackagePricingCard[] = [
  {
    badge: "Monthly flexibility",
    tone: "monthly",
    name: "Office Workflow Control Monthly",
    package: plans.cashflowMonthly,
    description: "Best for shops that need customer intake, billing, final bill, and follow-up to stop depending on manual re-entry.",
    install: "$199 installation",
    credit: "Assessment credit: -$197 if you start there first",
    callout: null,
    cta: "Buy monthly",
    secondary: "Get the AI Office Map",
    bullets: ["Customer intake to billing workflow", "Webhook, form, or job-system handoffs", "Billing-ready checks", "Missing billing detail routing"],
  },
  {
    badge: "-$1,250",
    tone: "yearly",
    name: "Office Workflow Control Yearly",
    package: plans.cashflowYearly,
    description: "Best first-year value for automating the intake-to-final-bill path for the year.",
    install: "Install discount: -$199",
    credit: "Assessment credit: -$194 if you start there first",
    callout: "-$1,250 first-year package savings",
    cta: "Buy yearly",
    secondary: "Get the AI Office Map",
    bullets: ["Everything in monthly", "Customer intake to cash collection", "Invoice and final-bill path", "Lower first-year cost"],
  },
  {
    badge: "Most complete monthly",
    tone: "complete",
    name: "AI Office Ops Monthly",
    package: plans.completeMonthly,
    description: "For shops leaking money before the job is booked, while it is billed, and after the customer leaves.",
    install: "$449 installation",
    credit: "Assessment credit: -$197 if you start there first",
    callout: null,
    cta: "Buy both monthly",
    secondary: "Get the AI Office Map",
    bullets: ["AI Office Installation Sprint", "AI Office Ops", "Open-balance visibility", "Reviews, referrals, and reactivation"],
  },
  {
    badge: "-$2,700 · Best value",
    tone: "recommended",
    name: "AI Office Ops Yearly",
    package: plans.completeYearly,
    description: "The full revenue-control path with yearly savings and an installation discount.",
    install: "Install discount: -$449",
    credit: "Assessment credit: -$194 if you start there first",
    callout: "-$2,700 first-year package savings",
    cta: "Buy both yearly",
    secondary: "Get the AI Office Map",
    bullets: ["AI Office Installation Sprint", "AI Office Ops", "Lowest first-year bundle cost", "Best full-system economics"],
  },
]

export function AIOfficeWorkflowPricing() {
  return (
    <section id="office workflow-pricing" className="scroll-mt-[120px] bg-white py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.4rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Pick your office workflow fix.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            Buy Office Workflow Control now, or start with the AI Office Map and credit it toward a system. Yearly options show the rounded monthly price first and bill yearly.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-[#B7D8C0] bg-white px-5 py-3 text-center text-sm font-extrabold text-[#124E25] shadow-[0_12px_30px_rgba(33,51,67,0.06)]">
          Monthly keeps it flexible. Yearly lowers the first-year cost, applies a larger assessment credit, and shows the yearly bill clearly inside the card.
        </div>

        <PackagePricingGrid
          cards={cards}
          locationPrefix="office workflow_pricing"
          analyticsSource="cashflow_control_page"
          showAuditSecondary
          auditHref={plans.workflowAudit.stripePaymentLink.url}
        />

        <p className="mt-5 rounded-[1.25rem] border border-[#BFE4C8] bg-[#F4FBF5] p-4 text-sm font-semibold leading-6 text-[#536173]">
          The AI Office Map is optional. You can buy Office Workflow Control directly. The assessment is for buyers who want Stanley Systems to inspect the workflow first and credit the assessment fee toward a system.
        </p>
      </div>
    </section>
  )
}
