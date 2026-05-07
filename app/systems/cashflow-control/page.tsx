import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const monthlyPlan = pricingPackageById.cashflow_control_monthly
const yearlyPlan = pricingPackageById.cashflow_control_yearly
const workflowAudit = pricingPackageById.workflow_audit

const packageScopeNote =
  "Buying this package starts onboarding and implementation intake. Stanley Systems confirms fit, access, tool constraints, data quality, and first implementation scope before work proceeds. If the selected package is not the right fit, Stanley Systems may redirect, pause until required access is available, propose custom scope, or refund before implementation begins."

const cashflowScopeLine =
  "Cashflow Control System helps finished work move toward billing, follow-up, and collected cash with fewer manual checks. It does not guarantee collected revenue, profit, customer payment behavior, third-party processor behavior, or unlimited custom billing work."

export const metadata: Metadata = {
  title: "Cashflow Control System | Stanley Systems",
  description:
    "Cashflow Control System helps service businesses move finished work toward billing, invoice follow-up, and collected cash with fewer manual office checks.",
  alternates: {
    canonical: "https://stanley-systems.com/systems/cashflow-control",
  },
  openGraph: {
    title: "Cashflow Control System | Stanley Systems",
    description:
      "A practical billing and invoice follow-up system for service businesses that need finished work to move toward collected cash faster.",
    url: "https://stanley-systems.com/systems/cashflow-control",
    siteName: "Stanley Systems",
    type: "website",
  },
}

const fixes = [
  "Late cash is growth money the owner cannot use.",
  "Best competitors collect faster, reinvest faster, and outpace slow operators.",
  "Staff chasing billing, status, and follow-up burns payroll and steals output from the business.",
  "Finished jobs that wait days before billing sees them.",
  "Invoices that cannot go out because job details are missing.",
  "Invoice-to-final-bill follow-up that depends on manual reminders.",
  "Open balances that depend on somebody remembering to follow up.",
  "Office handoffs that live in texts, notes, and memory instead of one visible path.",
]

const beforeAfter = [
  ["Before", "Job is done, but billing waits on memory, messages, missing notes, and somebody checking open balances.", "#B42318", "#fff5f5", "#edd6d8"],
  ["After", "Job complete moves to billing-ready, invoice or follow-up, open balance visibility, and collected cash.", "#116832", "#eef9f2", "#bfe4c8"],
]

const mechanismSteps = [
  "Job complete",
  "Billing-ready",
  "Invoice/follow-up",
  "Open balance visibility",
  "Collected cash",
]

function CashflowMechanismVisual() {
  return (
    <section className="rounded-[2rem] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
      <SectionHeader
        title="Late cash is growth money you cannot use."
        copy="Cashflow Control System moves repeat admin work out of memory and into a visible path from finished work to collected cash."
      />
      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        {beforeAfter.map(([label, copy, color, bg, border]) => (
          <article key={label} className="rounded-[1.35rem] border p-5" style={{ borderColor: border, backgroundColor: bg }}>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em]" style={{ color }}>{label}</p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#102033]">{copy}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-[1.35rem] border border-[#cfe8d5] bg-[#f4fbf5] p-4">
        <p className="text-sm font-bold text-[#116832]">Mechanism</p>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {mechanismSteps.map((step, index) => (
            <div key={step} className="relative rounded-2xl border border-[#dfe7ee] bg-white p-4 shadow-[0_10px_24px_rgba(16,32,51,0.04)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#15803D] text-xs font-black text-white">{index + 1}</span>
              <p className="mt-3 text-sm font-extrabold leading-5 text-[#102033]">{step}</p>
              {index < mechanismSteps.length - 1 ? (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full border border-[#cfe8d5] bg-white p-1 text-[#15803D] md:block" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-5 rounded-2xl border border-[#e4ded3] bg-[#fbfaf7] p-4 text-sm font-semibold leading-6 text-[#536173]">
        Scenario math, not a guarantee: if $40,000 of finished work sits 30 days longer than it should, that is $40,000 the owner cannot use for payroll, materials, ads, or growth during that month.
      </p>
    </section>
  )
}

const baseComponents = [
  ["A", "Finished-job trigger", "A clear signal when work is complete and ready for billing review."],
  ["B", "Billing-ready checklist", "The office can see missing job details before an invoice stalls."],
  ["C", "Invoice handoff view", "Jobs that can be invoiced are separated from jobs that need cleanup."],
  ["D", "Missing-info request", "The next person gets a plain request for what billing needs."],
  ["E", "Invoice-to-final-bill automation", "Stanley Systems can automate the owner-approved path from invoice-ready handoff through final bill follow-up."],
  ["F", "Invoice-sent record", "Sent invoices stay tied to the job path instead of disappearing into email."],
  ["G", "Open-balance tracker", "Unpaid invoices stay visible until the next follow-up happens."],
  ["H", "Owner/office view", "The business can see which jobs are waiting, ready, sent, or unpaid."],
  ["I", "Exception alerts", "Problem jobs get surfaced without promising automatic collection."],
  ["J", "Handoff notes", "The system preserves what happened so the next person is not starting cold."],
]

const setupItems = [
  "Map the current job-complete, invoice, and payment-follow-up path.",
  "Confirm which tools hold jobs, invoices, customer records, and payment status.",
  "Build the handoff checks, reminders, invoice-to-final-bill automation, and visibility layer around the existing office workflow.",
  "Review fit, access, and scope before implementation begins after checkout.",
]

const bestFit = [
  "Service businesses where completed work often waits before invoicing.",
  "Teams with office handoffs between field staff, admin, owner, or bookkeeper.",
  "Companies that already have enough invoice volume for delayed billing to matter.",
  "Owners who want fewer manual checks without changing their whole software stack first.",
]

const faqs = [
  {
    question: "Does Cashflow Control System collect money automatically?",
    answer:
      "No. It helps finished work move toward billing, follow-up, and visibility. It does not guarantee customer payment behavior or replace your payment processor, accountant, or collections policy.",
  },
  {
    question: "Do I need the Workflow Audit first?",
    answer:
      "No. You can buy Cashflow Control directly. The Workflow Audit is the safer first step if you are not sure whether the bigger leak is billing, repeat revenue, both, or neither.",
  },
  {
    question: "What happens after I buy?",
    answer:
      "Checkout starts onboarding and implementation intake. Stanley Systems reviews fit, access, and scope before implementation proceeds, then may refund, redirect, pause, or propose custom scope before work begins if the fit is not right.",
  },
  {
    question: "Will this replace my accounting software?",
    answer:
      "No. The goal is to improve the handoff around the tools your business already uses, not force a full software migration.",
  },
]

function SectionHeader({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#102033] sm:text-5xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-[#536173] sm:text-lg">{copy}</p>
    </div>
  )
}

function PrimaryCTACluster({ location }: { location: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <CTALink
        href={monthlyPlan.stripePaymentLink.url}
        kind="checkout"
        location={`${location}_cashflow_control_monthly`}
        analyticsEvent="package_checkout_clicked"
        analyticsSource="cashflow_control_page"
        packageId={monthlyPlan.analyticsPackageId}
        packageName={monthlyPlan.publicName}
        billingPeriod={monthlyPlan.billingPeriod}
        ctaLabel="Buy Cashflow Control"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:bg-[#116832]"
      >
        Buy Cashflow Control
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </CTALink>
      <CTALink
        href={workflowAudit.stripePaymentLink.url}
        kind="checkout"
        location={`${location}_workflow_audit`}
        analyticsEvent="audit_checkout_clicked"
        analyticsSource="cashflow_control_page"
        packageId="workflow_audit"
        packageName="Workflow Audit"
        billingPeriod="one_time"
        ctaLabel="Start with Workflow Audit"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbd8c7] bg-white px-6 py-3 text-sm font-bold text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] transition hover:border-[#15803D] hover:bg-[#f7fcf7]"
      >
        Start with Workflow Audit
      </CTALink>
    </div>
  )
}

export default function CashflowControlPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#102033]">
        <section className="relative px-4 pb-12 pt-32 sm:px-6 sm:pb-16 lg:px-8 lg:pt-36">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.72fr)] lg:items-center">
            <div>
              <h1 className="max-w-5xl text-[3rem] font-semibold leading-[0.96] tracking-[-0.055em] text-[#071421] sm:text-[4.35rem] lg:text-[4.8rem] xl:text-[5.25rem]">
                Turn finished work into collected cash <span className="inline-block text-[1.12em] italic tracking-[-0.06em]">faster.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#455467] sm:text-xl">
                Cashflow Control System builds the office path that moves completed jobs from invoice-ready handoff through final bill follow-up and visible open balances inside the tools your team already uses.
              </p>
              <div className="mt-7">
                <PrimaryCTACluster location="cashflow_control_hero" />
              </div>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#607080]">
                {packageScopeNote}
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#d8e5dd] bg-white p-5 shadow-[0_24px_70px_rgba(16,32,51,0.1)] sm:p-6">
              <div className="rounded-[1.5rem] border border-[#bfe4c8] bg-[#eef9f2] p-4">
                <p className="text-sm font-bold text-[#116832]">Cashflow Control Monthly</p>
                <p className="mt-2 text-[2.5rem] font-semibold tracking-[-0.05em] text-[#102033]">{monthlyPlan.priceDisplay}</p>
                <p className="text-sm font-semibold leading-6 text-[#536173]">{monthlyPlan.setupFeeDisplay} at checkout. Audit buyers can use the monthly audit credit.</p>
              </div>
              <div className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-[#26374b]">
                <div className="flex items-start gap-2 rounded-2xl border border-[#e0e8ef] bg-[#f8fbfc] p-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" />
                  Finished-job to billing-ready handoff.
                </div>
                <div className="flex items-start gap-2 rounded-2xl border border-[#e0e8ef] bg-[#f8fbfc] p-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" />
                  Invoice-to-final-bill automation and open-balance visibility.
                </div>
                <div className="flex items-start gap-2 rounded-2xl border border-[#e0e8ef] bg-[#f8fbfc] p-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" />
                  Yearly option: {yearlyPlan.priceDisplay} with installation waived.
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 sm:px-6 lg:px-8">
          <CashflowMechanismVisual />

          <section className="rounded-[2rem] border border-[#e4ded3] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
            <SectionHeader title="The billing leaks it is built to fix." copy="Cashflow Control System is for office-side bottlenecks after the work is already earned." />
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {fixes.map((fix) => (
                <div key={fix} className="flex gap-3 rounded-2xl border border-[#dfe7ee] bg-[#f8fbfc] p-4 text-sm font-semibold leading-6 text-[#26374b]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                  <span>{fix}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
            <SectionHeader title="Included base components A-J." copy="The build is practical office infrastructure, not speculative finance software." />
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {baseComponents.map(([letter, title, body]) => (
                <article key={letter} className="rounded-2xl border border-[#e2e8ef] bg-[#fbfcfd] p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-sm font-black text-white">{letter}</span>
                    <div>
                      <h3 className="text-base font-bold text-[#102033]">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#536173]">{body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="rounded-[2rem] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#102033] sm:text-4xl">Setup and infrastructure.</h2>
              <ul className="mt-5 space-y-3">
                {setupItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#26374b]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#102033] sm:text-4xl">Best fit.</h2>
              <ul className="mt-5 space-y-3">
                {bestFit.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#26374b]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#bfe4c8] bg-[#eef9f2] p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#102033] sm:text-4xl">Ready to tighten the billing path?</h2>
                <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#536173]">
                  {cashflowScopeLine}
                </p>
                <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#536173]">
                  {packageScopeNote}
                </p>
              </div>
              <PrimaryCTACluster location="cashflow_control_midpage" />
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#e4ded3] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
            <SectionHeader title="Practical FAQ." copy="Plain answers before you buy Cashflow Control System." />
            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-[#dfe7ee] bg-[#f8fbfc] p-5">
                  <h3 className="text-lg font-bold text-[#102033]">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#536173]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="text-center text-sm font-semibold text-[#607080]">
            Need to compare both systems first? <Link href="/pricing#compare-systems" className="font-bold text-[#116832] underline underline-offset-4">Compare systems on pricing</Link>.
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
