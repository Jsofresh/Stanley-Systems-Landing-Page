import type { Metadata } from "next"

import { Footer } from "@/components/footer"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import {
  AlertPanel,
  DiagramPanel,
  DisplayHeadline,
  FeatureTile,
  FlowSequence,
  IconMedallion,
  MetricStrip,
  StanleyButton,
  SupportTile,
  SystemCTA,
  SystemPageSection,
} from "@/components/stanley-system"

const monthlyPlan = pricingPackageById.cashflow_control_monthly
const yearlyPlan = pricingPackageById.cashflow_control_yearly
const workflowAudit = pricingPackageById.workflow_audit

export const metadata: Metadata = {
  title: "Cashflow Control System | Stanley Systems",
  description:
    "Cashflow Control System helps service businesses move finished work through intake, billing handoff, invoice follow-up, exception review, and owner-visible money leak reporting.",
  alternates: {
    canonical: "https://stanley-systems.com/systems/cashflow-control",
  },
  openGraph: {
    title: "Cashflow Control System | Stanley Systems",
    description:
      "A native cashflow control system for service businesses that need finished jobs, billing details, invoices, balances, and exceptions to stay visible until money is collected.",
    url: "https://stanley-systems.com/systems/cashflow-control",
    siteName: "Stanley Systems",
    type: "website",
  },
}

const heroSteps = [
  {
    id: "customer-intake",
    icon: "message-bubble" as const,
    label: "Customer Intake",
    description: "Customer and job details enter one visible path.",
  },
  {
    id: "job-complete",
    icon: "check-circle" as const,
    label: "Job Complete",
    description: "Finished work is flagged before it disappears.",
  },
  {
    id: "billing-ready",
    icon: "file-estimate" as const,
    label: "Billing Ready",
    description: "Billing sees the detail needed to invoice cleanly.",
  },
  {
    id: "invoice-sent",
    icon: "file-invoice" as const,
    label: "Invoice Sent",
    description: "Invoices and open balances stay visible.",
  },
  {
    id: "followed-up",
    icon: "message-bubble" as const,
    label: "Followed Up",
    description: "Open balances get the next action before they stall.",
  },
  {
    id: "cash-collected",
    icon: "dollar-circle" as const,
    label: "Cash Collected",
    description: "The owner sees earned work become collected cash.",
    tone: "emphasis" as const,
  },
]

const intakeBillingSteps = [
  {
    id: "where-intake-happens",
    icon: "message-bubble" as const,
    label: "Where customer intake happens",
    description: "Customer, job, and billing details enter the path early.",
  },
  {
    id: "required-fields-validation",
    icon: "file-estimate" as const,
    label: "Required Fields Validation",
    description: "Missing billing fields are caught before invoice time.",
    mobileDescription: false,
  },
  {
    id: "customer-intake-captured",
    icon: "check-circle" as const,
    label: "Customer Intake Captured",
    description: "The record carries the context billing needs.",
    mobileDescription: false,
  },
  {
    id: "job-complete-trigger",
    icon: "file-invoice" as const,
    label: "Job complete triggers the billing path",
    description: "Finished work starts a same-day billing queue.",
    mobileDescription: false,
    tone: "emphasis" as const,
  },
]

const exceptionSteps = [
  {
    id: "field-job-software",
    icon: "message-bubble" as const,
    label: "Field / Job Software",
    description: "Completed job context starts where the team already works.",
    mobileDescription: false,
  },
  {
    id: "clean-handoff",
    icon: "shield-check" as const,
    label: "Clean Handoff Automated",
    description: "Clean records move without owner chasing.",
    mobileDescription: false,
  },
  {
    id: "accounting-software",
    icon: "file-invoice" as const,
    label: "Accounting Software",
    description: "Billing gets invoice-ready context.",
    mobileDescription: false,
  },
  {
    id: "action-needed",
    icon: "check-circle" as const,
    label: "Action Needed",
    description: "Exceptions route with owner-visible next steps.",
    mobileDescription: false,
    tone: "emphasis" as const,
  },
]

const digestItems = [
  {
    value: "40%+",
    label: "Faster time to invoice",
    description: "Finished work gets to billing faster.",
    icon: "file-invoice" as const,
  },
  {
    value: "25–35%",
    label: "Improvement in cash velocity",
    description: "Open money keeps moving toward collection.",
    icon: "trend-up" as const,
  },
  {
    value: "2–5 hrs/week",
    label: "Less office drag",
    description: "Fewer manual checks between job complete and invoice sent.",
    icon: "shield-check" as const,
  },
  {
    value: "100%",
    label: "Visibility across the flow",
    description: "Owners see the path from intake through cash collected.",
    icon: "dollar-circle" as const,
  },
]

const sourceScanTiles = [
  ["check-circle", "Invoice-Ready Checklist", "The invoice moves when the details are there."],
  ["message-bubble", "Technician Notes", "Job notes are checked before billing gets stuck."],
  ["file-estimate", "Billing Source Scan", "Stanley Systems watches where bills actually get created."],
  ["shield-check", "Blocker Detected", "Missing details, approvals, or prices get surfaced."],
  ["message-bubble", "Routed to the right person", "The blocker moves to whoever can clear it."],
  ["dollar-circle", "Collected-cash confirmation", "The system follows the path until money is collected."],
] as const

function HeroDashboardPanel() {
  return (
    <DiagramPanel
      icon="shield-check"
      title="A control board for money your business already earned."
      subtitle="The system watches the path from finished job to billed, followed up, and collected cash."
      tone="mint"
      className="lg:min-h-[35rem]"
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Customer Intake to Cash Collected workflow">
        {heroSteps.map((step, index) => (
          <div
            key={step.id}
            className="rounded-[1.1rem] border border-[#cfe8d5] bg-white p-4 shadow-[0_8px_18px_rgba(7,20,34,0.045)]"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[rgba(21,128,61,0.18)] bg-[#f4fbf5] text-sm font-extrabold text-[#15803D]">
                {index + 1}
              </span>
              <p className="text-pretty text-[1.02rem] font-extrabold leading-[1.12] tracking-[-0.025em] text-[#102033]">
                {step.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {["Workflow Status", "Invoice Performance", "Next Up"].map((label) => (
          <div key={label} className="rounded-[1rem] border border-[#cfe8d5] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(7,20,34,0.045)]">
            <p className="text-base font-extrabold tracking-[-0.02em] text-[#102033] md:text-sm">{label}</p>
          </div>
        ))}
      </div>
      <MetricStrip className="mt-5" columns={2} items={digestItems} />
    </DiagramPanel>
  )
}

export default function CashflowControlPage() {
  return (
    <>
      <GlassmorphismNav />
      <main className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#102033]">
        <section className="relative isolate overflow-hidden px-6 pb-18 pt-32 md:pb-24 lg:px-8 lg:pt-36">
          <span aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 -z-10 size-80 rounded-full bg-[rgba(21,128,61,0.08)] blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-14 -z-10 size-96 rounded-full bg-[rgba(21,128,61,0.06)] blur-3xl" />
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(500px,1.05fr)] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#cfe8d5] bg-white px-4 py-2 text-sm font-bold text-[#116832] shadow-[0_10px_24px_rgba(7,20,34,0.05)]">
                <IconMedallion icon="shield-check" size="sm" />
                Cashflow Control System
              </div>
              <DisplayHeadline
                as="h1"
                align="left"
                size="page"
                before="Turn finished work into"
                highlight="collected cash faster."
                className="max-w-5xl"
              />
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#455467] sm:text-xl">
                Turn finished work into collected cash faster. Stanley Systems helps service businesses tighten the path from customer intake to billing handoff, invoice follow-up, human exceptions, and owner-visible money leak reporting.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <StanleyButton href={monthlyPlan.stripePaymentLink.url} size="xl" aria-label="Start Cashflow Control System checkout">
                  Start Cashflow Control
                </StanleyButton>
                <StanleyButton href={workflowAudit.stripePaymentLink.url} variant="secondary" size="xl" aria-label="Book a Workflow Audit for Cashflow Control System">
                  Book a Workflow Audit
                </StanleyButton>
              </div>
              <p className="mt-4 text-base font-semibold leading-7 text-[#455467] md:text-sm md:leading-6">
                Cashflow Control starts at <span className="text-[#102033]">{monthlyPlan.priceDisplay}</span>. Yearly option: {yearlyPlan.priceDisplay} with installation waived.
              </p>
            </div>
            <HeroDashboardPanel />
          </div>
        </section>

        <SystemPageSection
          id="how-cashflow-control-works"
          tone="white"
          title="Customer intake becomes a"
          accent="billing-ready path."
          description="Clean customer intake keeps billing from breaking later. It gives the office a cleaner handoff from the first customer request to the moment finished work is ready to bill."
          className="py-14 md:py-24"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
            <DiagramPanel
              icon="file-estimate"
              title="Intake and billing stay connected."
              subtitle="When a job is marked complete, the billing path starts automatically."
              tone="mint"
            >
              <FlowSequence steps={intakeBillingSteps} connectorLabel="keeps context for" />
            </DiagramPanel>
            <div className="grid gap-4">
              <FeatureTile
                icon="message-bubble"
                title="Missing details routed before invoice"
                description="Incomplete jobs move to the right person before billing waits."
              />
              <FeatureTile
                icon="file-invoice"
                title="On track for same-day billing"
                description="Clean completions go straight into a billing-ready queue."
              />
            </div>
          </div>
        </SystemPageSection>

        <SystemPageSection
          tone="white"
          title="The system handles clean paths and"
          accent="human exceptions."
          description="Cashflow Control flags the exception, routes the context, and brings the record back into the path once a person decides."
          className="py-14 md:py-24"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(360px,0.72fr)_minmax(0,1.28fr)]">
            <div className="grid gap-4">
              <AlertPanel
                icon="message-bubble"
                title="Completed job missing details"
                description="A note, approval, price, or customer answer is missing."
                tone="attention"
              >
                <div className="grid gap-2 text-sm font-semibold text-[#102033]">
                  <span>Assigned to: Office manager</span>
                  <span>Next steps: clear the detail, then resume billing.</span>
                </div>
              </AlertPanel>
              <AlertPanel
                icon="shield-check"
                title="Clean Handoff Automated"
                description="Clean records move from Field / Job Software into Accounting Software."
                tone="recovery"
              />
            </div>
            <DiagramPanel
              icon="shield-check"
              title="Exception handoff path"
              subtitle="Blocked cash gets routed with enough context to make a decision and keep moving."
              tone="mint"
            >
              <FlowSequence steps={exceptionSteps} connectorLabel="routes to" />
            </DiagramPanel>
          </div>
        </SystemPageSection>

        <SystemPageSection
          tone="white"
          title="Weekly Money Leak Digest shows billing gaps before they"
          accent="create collection delays."
          description="The office fixes today’s issues. Leadership sees the pattern before delays compound."
          className="py-14 md:py-24"
        >
          <DiagramPanel
            icon="dollar-circle"
            title="Weekly Money Leak Digest"
            subtitle="The report separates real cash blockers from general office noise. Quoted work gets a next step before it goes cold."
            tone="mint"
            footer={
              <p className="text-base font-bold leading-7 text-[#116832]">
                Cash is the goal. Systems are how you get there.
              </p>
            }
          >
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureTile
                icon="file-invoice"
                title="A/R Follow-Up Automation"
                description="Open invoices get a next action before they age into owner stress."
                density="compact"
                medallion={false}
              />
              <FeatureTile
                icon="file-invoice"
                title="Aging Buckets"
                description="Sent invoices that need follow-up before collection gets stale."
                density="compact"
                medallion={false}
              />
              <FeatureTile
                icon="shield-check"
                title="Escalation Logic"
                description="Human exceptions that need owner, manager, or office review."
                density="compact"
                medallion={false}
              />
              <FeatureTile
                icon="file-estimate"
                title="Open Estimate Recovery"
                description="Quoted work gets a next step before it goes cold."
                density="compact"
                medallion={false}
              />
              <FeatureTile
                icon="message-bubble"
                title="Office Exception Inbox"
                description="Missing details and billing blockers land in one visible queue."
                density="compact"
                medallion={false}
              />
              <FeatureTile
                icon="dollar-circle"
                title="Weekly Money Leak Digest"
                description="Owners see earned money that has not become collected cash yet."
                density="compact"
                medallion={false}
              />
            </div>
          </DiagramPanel>
        </SystemPageSection>

        <SystemPageSection
          tone="mint"
          title="The invoice moves when the details are there."
          accent="Stanley Systems watches where bills actually get created."
          description="Cashflow Control works by finding the handoff points already inside the business, then turning those points into a tighter path with owner visibility."
          className="py-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sourceScanTiles.map(([icon, title, description]) => (
              <SupportTile
                key={title}
                icon={icon}
                title={title}
                description={description}
                descriptionClassName="hidden md:block"
                className="p-4 md:p-6"
              />
            ))}
          </div>

          <SystemCTA
            className="mt-10"
            icon="dollar-circle"
            title="Stop letting finished work sit between the job and the bank."
            description="The next step is a Workflow Audit: map the intake path, billing source records, invoice follow-up, exception handoffs, and weekly owner digest before build scope starts."
            primaryAction={{ label: "Start Cashflow Control", href: monthlyPlan.stripePaymentLink.url, ariaLabel: "Start Cashflow Control System checkout" }}
            secondaryAction={{ label: "Book a Workflow Audit", href: workflowAudit.stripePaymentLink.url, ariaLabel: "Book a Workflow Audit checkout" }}
          >
            <p className="text-base font-semibold leading-7 text-[#455467]">
              Package price: <span className="font-extrabold text-[#102033]">{monthlyPlan.priceDisplay}</span>. Yearly option: {yearlyPlan.priceDisplay} with installation waived.
            </p>
          </SystemCTA>
        </SystemPageSection>
      </main>
      <Footer />
    </>
  )
}
