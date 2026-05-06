import Link from "next/link"

import { CalculatorHandoffPanel } from "./CalculatorHandoffPanel"
import { PlanCard } from "./PlanCard"
import { PricingCTA } from "./PricingCTA"
import { PricingFAQ } from "./PricingFAQ"
import { PricingHero } from "./PricingHero"
import { WorkflowAuditCard } from "./WorkflowAuditCard"
import {
  postAuditPlans,
  pricingFAQItems,
  workflowAuditOffer,
  type PricingCalculatorContext,
  type PricingPlan,
} from "@/lib/pricing/offers"

type PricingSearchParams = Record<string, string | string[] | undefined>

function firstParam(searchParams: PricingSearchParams, key: string) {
  const value = searchParams[key]
  return Array.isArray(value) ? value[0] : value
}

function cleanEstimate(value: string | undefined) {
  if (!value) return null
  const cleaned = value.replace(/[^a-zA-Z0-9$+., -]/g, "").slice(0, 40).trim()
  return cleaned || null
}

function parseCalculatorContext(searchParams: PricingSearchParams): PricingCalculatorContext | null {
  const source = firstParam(searchParams, "source") === "calculator" ? "calculator" : "unknown"
  if (source !== "calculator") return null

  const recommended = firstParam(searchParams, "recommended")
  const recommendedSystem: PricingCalculatorContext["recommendedSystem"] =
    recommended === "cash_collection" || recommended === "cash_collection_system"
      ? "cash_collection_system"
      : recommended === "follow_up" || recommended === "follow_up_system"
        ? "follow_up_system"
        : recommended === "both"
          ? "both"
          : recommended === "none"
            ? "none"
            : "unknown"

  const recommendedPlan: PricingCalculatorContext["recommendedPlan"] =
    recommendedSystem === "cash_collection_system"
      ? "cash_collection_path"
      : recommendedSystem === "follow_up_system"
        ? "follow_up_path"
        : recommendedSystem === "both"
          ? "both_paths"
          : "workflow_audit_only"

  return {
    source,
    recommendedSystem,
    recommendedPlan,
    calculatorKind: "customer_revenue",
    annualLeakEstimate: cleanEstimate(firstParam(searchParams, "annual_leak")),
    monthlyLeakEstimate: cleanEstimate(firstParam(searchParams, "monthly_leak")),
  }
}

function SectionHeader({ id, title, copy }: { id?: string; title: string; copy: string }) {
  return (
    <div id={id} className="mx-auto max-w-3xl text-center">
      <h2 className="text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#102033] sm:text-5xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-[#536173] sm:text-lg">{copy}</p>
    </div>
  )
}

function PlanGrid({ plans }: { plans: PricingPlan[] }) {
  return (
    <div className="mt-7 grid gap-5 lg:grid-cols-3">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} featured={plan.id === "both_systems_yearly"} />
      ))}
    </div>
  )
}

function CompareSystems() {
  const systems = [
    {
      title: "Cashflow Control System",
      href: "/systems/cashflow-control",
      bestWhen: "Best first when finished work is getting stuck before billing, follow-up, or collected cash.",
      cta: "View Cashflow Control",
    },
    {
      title: "Repeat Revenue System",
      href: "/systems/repeat-revenue",
      bestWhen: "Best first when past customers, review requests, referrals, missed calls, or repeat work are slipping.",
      cta: "View Repeat Revenue",
    },
    {
      title: "Both Systems",
      href: "/pricing#yearly-plans-heading",
      bestWhen: "Best when the office needs the billing path and the repeat-revenue path fixed in the same rollout.",
      cta: "Compare Both Systems",
      featured: true,
    },
  ]

  return (
    <section id="compare-systems" className="rounded-[2rem] border border-[#e4ded3] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
      <SectionHeader
        title="Which system should you buy first?"
        copy="Choose the system that matches the leak you can already name. If you are not sure, start with the Workflow Audit."
      />
      <div className="mt-7 grid gap-4 lg:grid-cols-3">
        {systems.map((system) => (
          <Link
            key={system.title}
            href={system.href}
            className={`rounded-2xl border p-5 transition hover:border-[#15803D] hover:bg-[#f4fbf5] ${
              system.featured ? "border-[#bfe4c8] bg-[#f4fbf5]" : "border-[#dfe7ee] bg-[#f8fbfc]"
            }`}
          >
            <h3 className="text-xl font-semibold text-[#102033]">{system.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#536173]">{system.bestWhen}</p>
            <span className="mt-4 inline-flex text-sm font-bold text-[#116832]">{system.cta}</span>
          </Link>
        ))}
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-sm font-semibold leading-6 text-[#5f6e7d]">
        Package checkout starts onboarding. Stanley Systems reviews fit, access, and scope before implementation begins.
      </p>
    </section>
  )
}

export function PricingPage({ searchParams }: { searchParams: PricingSearchParams }) {
  const calculatorContext = parseCalculatorContext(searchParams)
  const monthlyPlans = postAuditPlans.filter((plan) => plan.billingPeriod === "monthly")
  const yearlyPlans = postAuditPlans.filter((plan) => plan.billingPeriod === "yearly")

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#102033]">
      <PricingHero offer={workflowAuditOffer} calculatorContext={calculatorContext} />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        {calculatorContext ? <CalculatorHandoffPanel context={calculatorContext} /> : null}

        <section aria-label="Workflow Audit" className="mx-auto w-full max-w-4xl">
          <WorkflowAuditCard offer={workflowAuditOffer} calculatorContext={calculatorContext} />
        </section>

        <section aria-labelledby="monthly-plans-heading">
          <SectionHeader
            id="monthly-plans-heading"
            title="Monthly Plans"
            copy="Lower upfront commitment. Installation is charged at checkout, and audit buyers can use the monthly audit credit."
          />
          <PlanGrid plans={monthlyPlans} />
        </section>

        <section aria-labelledby="yearly-plans-heading">
          <SectionHeader
            id="yearly-plans-heading"
            title="Yearly Plans"
            copy="Best first-year pricing. Installation is waived, and audit buyers can use the yearly audit credit."
          />
          <PlanGrid plans={yearlyPlans} />
        </section>

        <CompareSystems />
        <PricingFAQ items={pricingFAQItems} />
        <PricingCTA primaryOffer={workflowAuditOffer} />
      </div>
    </main>
  )
}
