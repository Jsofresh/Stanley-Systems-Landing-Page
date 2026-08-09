import type { PricingCalculatorContext, WorkflowAuditOffer } from "@/lib/pricing/offers"
import { PlanCard } from "./PlanCard"

export function WorkflowAuditCard({ offer }: { offer: WorkflowAuditOffer; calculatorContext?: PricingCalculatorContext | null }) {
  return <PlanCard plan={offer} />
}
