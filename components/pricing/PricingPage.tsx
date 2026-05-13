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

function SectionHeader({ id, title, copy }: { id?: string; title: string; copy?: string }) {
  return (
    <div id={id} className="mx-auto max-w-3xl text-center">
      <h2 className="text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#102033] sm:text-5xl">{title}</h2>
      {copy ? <p className="mt-3 text-base leading-7 text-[#536173] sm:text-lg">{copy}</p> : null}
    </div>
  )
}

function GroupedPlanGrid({ monthlyPlans, yearlyPlans }: { monthlyPlans: PricingPlan[]; yearlyPlans: PricingPlan[] }) {
  const groups = monthlyPlans.map((monthlyPlan) => {
    const prefix = monthlyPlan.id.replace("_monthly", "")
    return {
      key: prefix,
      monthlyPlan,
      yearlyPlan: yearlyPlans.find((plan) => plan.id === `${prefix}_yearly`),
    }
  })

  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-3">
      {groups.map(({ key, monthlyPlan, yearlyPlan }) => (
        <div key={key} className="grid gap-3">
          <PlanCard plan={monthlyPlan} />
          {yearlyPlan ? <PlanCard plan={yearlyPlan} featured={yearlyPlan.id === "both_systems_yearly"} /> : null}
        </div>
      ))}
    </div>
  )
}

function CompareSystems() {
  const systems = [
    {
      title: "Cashflow Control System",
      href: "/systems/cashflow-control",
      bestWhen: "Calls and billing leak: customer recorded, job moves, invoice and payment follow-up happen.",
      cta: "View Cashflow Control",
    },
    {
      title: "Repeat Revenue System",
      href: "/systems/repeat-revenue",
      bestWhen: "Past customer leak: follow-up triggers and repeat work gets booked.",
      cta: "View Repeat Revenue",
    },
    {
      title: "Both Systems",
      href: "/systems/both-systems",
      bestWhen: "Both leaks: money is getting dropped before and after the job.",
      cta: "Compare Both Systems",
      featured: true,
    },
  ]

  return (
    <section id="compare-systems" className="rounded-[2rem] border border-[#e4ded3] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
      <SectionHeader
        title="Which leak are you trying to stop?"
        copy="Choose the system that matches the leak you can already name. If you are not sure, start with the Cash Flow Assessment."
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
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-10">
        {calculatorContext ? <CalculatorHandoffPanel context={calculatorContext} /> : null}

        <section aria-label="Cash Flow Assessment" className="mx-auto w-full max-w-4xl">
          <WorkflowAuditCard offer={workflowAuditOffer} calculatorContext={calculatorContext} />
        </section>

        <section aria-label="System pricing after assessment" className="md:hidden">
          <details className="group rounded-[1.6rem] border border-[#d9e5dc] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block text-2xl font-semibold tracking-[-0.04em] text-[#102033]">System pricing after the assessment</span>
                <span className="mt-2 block text-sm font-semibold leading-6 text-[#536173]">Collapsed on mobile so the $97 Cash Flow Assessment stays the first move. Open this only if you already know the system you need.</span>
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e7f6eb] text-xl font-black text-[#116832] group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-[#e4ece6] px-4 pb-5">
              <SectionHeader
                id="mobile-plans-heading"
                title="System packages"
              />
              <GroupedPlanGrid monthlyPlans={monthlyPlans} yearlyPlans={yearlyPlans} />
            </div>
          </details>
        </section>

        <section aria-labelledby="monthly-plans-heading" className="hidden md:block">
          <SectionHeader
            id="monthly-plans-heading"
            title="System packages"
          />
          <GroupedPlanGrid monthlyPlans={monthlyPlans} yearlyPlans={yearlyPlans} />
        </section>

        <CompareSystems />
        <PricingFAQ items={pricingFAQItems} />
        <PricingCTA primaryOffer={workflowAuditOffer} />
      </div>
    </main>
  )
}
