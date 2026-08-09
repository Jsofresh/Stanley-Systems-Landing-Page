import { pricingPackageById } from "@/lib/pricing/source-of-truth"

export const cashflowTokens = {
  ink: "#071D3A",
  navy: "#102033",
  body: "#536173",
  green: "#15803D",
  greenDark: "#116832",
  pale: "#F4FBF5",
  cream: "#FBFCF7",
  border: "#DDEBE2",
  red: "#B42318",
}

export const plans = {
  cashflowMonthly: pricingPackageById.cashflow_control_monthly,
  cashflowYearly: pricingPackageById.cashflow_control_yearly,
  completeMonthly: pricingPackageById.both_systems_monthly,
  completeYearly: pricingPackageById.both_systems_yearly,
  workflowAudit: pricingPackageById.workflow_audit,
}

export const sectionShell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
export const cardShell = "rounded-[1.75rem] border border-[#DDEBE2] bg-white shadow-[0_18px_48px_rgba(7,29,58,0.06)]"
