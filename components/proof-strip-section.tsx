import {
  BellRing,
  BriefcaseBusiness,
  Clock3,
  CreditCard,
  RotateCcw,
  Share2,
  Star,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { ConnectorArrow, FlowStep, SectionShell, VisualCard } from "@/components/visual-primitives"

type WorkflowStep = {
  label: string
  icon: LucideIcon
  active?: boolean
}

const cashflowSteps: WorkflowStep[] = [
  { label: "Completed job", icon: BriefcaseBusiness },
  { label: "Invoice delay", icon: Clock3 },
  { label: "Office alert", icon: BellRing, active: true },
]

const customerRevenueSteps: WorkflowStep[] = [
  { label: "Paid job", icon: CreditCard },
  { label: "Review request", icon: Star },
  { label: "Referral", icon: Share2 },
  { label: "Repeat customer", icon: RotateCcw, active: true },
]

function WorkflowPath({
  title,
  steps,
  outcome,
}: {
  title: string
  steps: WorkflowStep[]
  outcome: string
}) {
  return (
    <div className="flex h-full flex-col rounded-[1.5rem] border border-[#e5dccf] bg-[#fbfaf7] p-4 shadow-[0_14px_30px_rgba(16,32,51,0.05)] sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold leading-tight text-[#102033]">{title}</h3>
        <div className="h-px flex-1 bg-[#ded6c8]" aria-hidden="true" />
      </div>

      <div className="mt-5 grid gap-2">
        {steps.map((step, index) => (
          <div key={step.label} className="grid gap-2">
            <FlowStep
              icon={step.icon}
              label={step.label}
              active={step.active}
              className="min-h-[68px] border-[#e6ded1] px-3 py-3 shadow-none"
            />
            {index < steps.length - 1 && (
              <div className="flex justify-center" aria-hidden="true">
                <ConnectorArrow direction="down" className="h-5 w-12 text-[#15803D]" />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-5 rounded-2xl border border-[#d6eadc] bg-[#effaf2] p-4 text-sm font-semibold leading-6 text-[#116832]">
        {outcome}
      </p>
    </div>
  )
}

export function ProofStripSection() {
  return (
    <SectionShell
      id="proof"
      data-audit-page="/"
      data-audit-section="home.proof"
      data-audit-priority="3"
      data-audit-offer="Workflow Audit"
      data-audit-purpose="Provide compact proof that office-side leaks cost money and attention."
      eyebrow="Workflow proof"
      title="Built paths for cash, reviews, referrals, and repeat work."
      description="Stanley Systems tests the same paths the Workflow Audit checks: finished jobs, invoices, reviews, referrals, old customers, missed calls, and stuck follow-up."
      className="relative z-10 scroll-mt-28 bg-transparent px-4 pb-28 pt-8 sm:scroll-mt-32 sm:pb-28 sm:pt-10 md:py-10 lg:scroll-mt-36 lg:py-12"
      containerClassName="rounded-[2rem] border border-[#e9e2d7] bg-white/95 px-5 py-7 shadow-[0_16px_40px_rgba(15,23,42,0.05)] sm:px-8 sm:py-9 lg:px-10"
      headerClassName="mb-7 max-w-4xl md:mb-9"
    >
      <VisualCard className="overflow-hidden border-[#e5dccf] bg-[#fffdf9] p-4 shadow-[0_20px_55px_rgba(16,32,51,0.08)] sm:p-5 lg:p-7">
        <div className="grid gap-4 lg:grid-cols-2">
          <WorkflowPath
            title="Cashflow path"
            steps={cashflowSteps}
            outcome="Shows where finished work can stall before money is collected."
          />
          <WorkflowPath
            title="Customer revenue path"
            steps={customerRevenueSteps}
            outcome="Shows how customer moments feed reviews, referrals, and repeat work."
          />
        </div>

        <div className="mt-5 flex flex-col gap-4 border-t border-[#ece4d8] pt-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm leading-6 text-slate-600">Example only. Your audit uses your actual workflow.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTALink
              href="/contact"
              kind="book_meeting"
              location="proof_section_primary"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#15803D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#116832]"
            >
              Book the Workflow Audit
            </CTALink>
            <CTALink
              href="/stanley-systems-case-study"
              kind="case_study"
              location="proof_section"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-5 py-3 text-sm font-semibold text-[#102033] transition hover:bg-[#f4efe6]"
            >
              View the Proof Case
            </CTALink>
          </div>
        </div>
      </VisualCard>
    </SectionShell>
  )
}
