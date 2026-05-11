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

function CheckoutScopeNote({ copy }: { copy?: string }) {
  return (
    <p className="mx-auto mt-5 max-w-3xl rounded-2xl border border-[#dbe7dd] bg-[#f6fbf7] px-4 py-3 text-center text-sm font-semibold leading-6 text-[#4d5f55]">
      {copy ||
        "Not sure which leak matters most? Start with the Cash Flow Assessment before buying the wrong system first. If it is not the right fit, Stanley Systems may refund, redirect, or pause before work begins."}
    </p>
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
      href: "/pricing#yearly-plans-heading",
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
      <p className="mx-auto mt-5 max-w-3xl text-center text-sm font-semibold leading-6 text-[#5f6e7d]">
        Not sure which leak matters most? Start with the Cash Flow Assessment before buying the wrong system first.
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

        <section aria-label="Cash Flow Assessment" className="mx-auto w-full max-w-4xl">
          <WorkflowAuditCard offer={workflowAuditOffer} calculatorContext={calculatorContext} />
        </section>

        <section aria-labelledby="monthly-plans-heading">
          <SectionHeader
            id="monthly-plans-heading"
            title="Monthly systems"
            copy="Build the system, keep it running, and stop the leak from coming back. Installation is charged at checkout, and assessment buyers can use the monthly assessment credit."
          />
          <PlanGrid plans={monthlyPlans} />
          <CheckoutScopeNote />
        </section>

        <section aria-labelledby="yearly-plans-heading">
          <SectionHeader
            id="yearly-plans-heading"
            title="Yearly systems"
            copy="Pay once for the year, waive installation, and keep the office handoff tight. Assessment buyers can use the yearly assessment credit."
          />
          <PlanGrid plans={yearlyPlans} />
          <CheckoutScopeNote copy="Yearly checkout starts onboarding and fit, access, and scope review before the build begins. The Cash Flow Assessment credit only applies under the stated assessment-credit terms." />
        </section>

        <CompareSystems />
        <PricingFAQ items={pricingFAQItems} />
        <PricingCTA primaryOffer={workflowAuditOffer} />
      </div>
    </main>
  )
}
