import type { PricingCalculatorContext } from "@/lib/pricing/offers"

const systemLabels: Record<PricingCalculatorContext["recommendedSystem"], string> = {
  cash_collection_system: "Cashflow Control System",
  follow_up_system: "Repeat Revenue System",
  both: "Both Systems",
  none: "the audit-only path",
  unknown: "the Cash Flow Assessment",
}

export function CalculatorHandoffPanel({ context }: { context: PricingCalculatorContext }) {
  if (context.source !== "calculator") return null

  const label = systemLabels[context.recommendedSystem]
  const estimates = [context.annualLeakEstimate ? `${context.annualLeakEstimate} annual` : null, context.monthlyLeakEstimate ? `${context.monthlyLeakEstimate} monthly` : null].filter(Boolean)

  return (
    <section className="rounded-[2rem] border border-[#bfe4c8] bg-[#f4fbf5] p-5 shadow-[0_18px_46px_rgba(15,23,42,0.06)] sm:p-6">
      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#102033]">Your calculator result points to {label}.</h2>
      <p className="mt-3 text-base leading-7 text-[#536173]">
        The Cash Flow Assessment checks which leak is worth fixing first. This handoff uses rounded public estimates only, not raw calculator inputs.
      </p>
      {estimates.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {estimates.map((estimate) => (
            <span key={estimate} className="rounded-full border border-[#cfe8d5] bg-white px-3 py-1.5 text-sm font-bold text-[#116832]">
              {estimate}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  )
}
