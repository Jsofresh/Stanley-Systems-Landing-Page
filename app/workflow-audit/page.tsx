import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"
import { pricingPackageById, type PricingPackage, type PricingPackageId } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const assessment = pricingPackageById.workflow_audit
const cashflowMonthly = pricingPackageById.cashflow_control_monthly
const repeatMonthly = pricingPackageById.repeat_revenue_monthly
const bothMonthly = pricingPackageById.both_systems_monthly

export const metadata: Metadata = {
  title: "Cash Flow Assessment | Stanley Systems",
  description:
    "Start with the $97 Cash Flow Assessment from Stanley Systems before buying the wrong system first.",
  alternates: { canonical: "https://stanley-systems.com/workflow-audit" },
  openGraph: {
    title: "Cash Flow Assessment | Stanley Systems",
    description:
      "Find the money leak in your office handoffs, records, invoices, and follow-up before buying the wrong system first.",
    url: "https://stanley-systems.com/workflow-audit",
    siteName: "Stanley Systems",
    type: "website",
  },
}

function CheckoutButton({
  pkg,
  label,
  location,
  className = "bg-[#15803D] text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:bg-[#116832]",
}: {
  pkg: PricingPackage
  label: string
  location: string
  className?: string
}) {
  const billingPeriod = pkg.billingPeriod === "one_time" ? "one_time" : pkg.billingPeriod

  return (
    <CTALink
      href={pkg.stripePaymentLink.url}
      kind="checkout"
      location={location}
      analyticsEvent={pkg.id === "workflow_audit" ? "audit_checkout_clicked" : "package_checkout_clicked"}
      analyticsSource="cash_flow_assessment_page"
      packageId={pkg.analyticsPackageId as PricingPackageId}
      packageName={pkg.publicName}
      billingPeriod={billingPeriod}
      ctaLabel={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-extrabold transition ${className}`}
    >
      {label} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
    </CTALink>
  )
}

function HeroVisual() {
  const points = ["Finished job", "Office check", "Invoice sent", "Cash collected"]

  return (
    <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_24px_70px_rgba(7,29,58,0.08)]">
      <div className="overflow-hidden rounded-[1.5rem] bg-[#F4FBF5] p-3">
        <Image
          src="/images/uploaded/money-leak-map/money-leak-map-job-finished-office-check-invoice-sent-cash-collected.jpg"
          alt="Money leak map preview from finished job to office check, invoice sent, and cash collected."
          width={1280}
          height={720}
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="w-full rounded-[1.15rem] object-cover"
        />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {points.map((point, index) => (
          <div key={point} className="rounded-2xl border border-[#CFE1D4] bg-[#FBFCF7] p-3 text-center">
            <p className="text-xl font-black text-[#15803D]">{index + 1}</p>
            <p className="mt-1 text-sm font-extrabold leading-tight text-[#102033]">{point}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section data-section="cash-flow-assessment-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-24 sm:pb-16 lg:pt-20">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${shell} relative grid gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
        <div>
          <h1 className="max-w-5xl text-[2.7rem] font-semibold leading-[0.94] tracking-[-0.058em] text-[#071D3A] sm:text-[4.3rem] lg:text-[5rem]">
            Find the money leak before you buy the system.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60]">
            The Cash Flow Assessment is a $97 paid first step from Stanley Systems.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            We look at where cash, customers, and office time are slipping so you do not buy the wrong fix first.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CheckoutButton pkg={assessment} label="Start the Cash Flow Assessment" location="cash_flow_assessment_hero_primary" />
            <Link href="#assessment" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] transition hover:border-[#15803D] hover:bg-[#F4FBF5]">
              See what you get
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-[#607080]">
            Your assessment fee credits toward Cashflow Control or Repeat Revenue. Yearly buyers get a $194 credit.
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}

function CheckedLeaks() {
  const leaks = [
    ["Missed calls", "Work that should become a job can go cold before anyone owns the next step."],
    ["Old customers", "Past work can hide the easiest next sale when records are not worked."],
    ["Reviews and referrals", "Happy customers often finish the job without the right ask."],
    ["Estimates", "Open estimates can sit with no clear follow-up path."],
    ["Invoices", "Finished work can wait for details, office checks, or approval."],
    ["Open balances", "Money already billed can fall out of view."],
    ["Office handoffs", "Your software may be fine. The leak is often between people and tools."],
  ]

  return (
    <section id="checked" data-section="cash-flow-assessment-checked" className="bg-white py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start`}>
        <div>
          <h2 className="max-w-3xl text-[2.25rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.25rem]">
            The leak is usually in the handoff.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            Your software may be fine. The problem is often what happens between tools, people, and next steps.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            Stanley Systems checks the places money usually slips before you commit to a build.
          </p>
          <div className="mt-6">
            <CheckoutButton pkg={assessment} label="Start the Cash Flow Assessment" location="cash_flow_assessment_checked_primary" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {leaks.map(([title, body]) => (
            <article key={title} className="rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
              <CheckCircle2 className="h-6 w-6 text-[#15803D]" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.025em] text-[#102033]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#536173]">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AssessmentPricing() {
  const deliverables = [
    "30-minute cash-flow walkthrough",
    "Review of the records that show the leak",
    "Money Leak Summary",
    "First fix recommendation",
    "System recommendation if a build makes sense",
  ]

  return (
    <section id="assessment" data-section="cash-flow-assessment-pricing" className="scroll-mt-[120px] bg-[#F4FBF5] py-14 sm:py-16">
      <div className={shell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Start here for $97.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            Buy the Cash Flow Assessment. Stanley Systems maps the first leak, what it costs, and which system should be built first.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <article className="flex h-full flex-col rounded-[1.8rem] border-2 border-[#15803D] bg-white p-6 shadow-[0_24px_70px_rgba(21,128,61,0.13)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#102033]">Cash Flow Assessment</h3>
                <p className="mt-4 text-[4rem] font-semibold leading-none tracking-[-0.07em] text-[#071D3A]">$97</p>
                <p className="mt-2 text-sm font-extrabold text-[#607080]">one time</p>
              </div>
              <p className="rounded-2xl bg-[#E7F7EB] px-4 py-3 text-sm font-extrabold text-[#116832]">Paid first step</p>
            </div>

            <ul className="mt-6 grid gap-3 text-sm font-semibold leading-6 text-[#334B60] sm:grid-cols-2">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803D]" />{item}</li>
              ))}
            </ul>

            <div className="mt-6 rounded-[1.35rem] border border-[#CFE1D4] bg-[#FBFCF7] p-4">
              <p className="text-sm font-semibold leading-6 text-[#536173]">$97 credit toward monthly system setup. $194 credit toward yearly system purchase.</p>
            </div>

            <div className="mt-auto pt-6">
              <CheckoutButton pkg={assessment} label="Start the Cash Flow Assessment" location="cash_flow_assessment_pricing_primary" />
            </div>
          </article>

          <div className="grid gap-4">
            <article className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)]">
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">What this prevents</h3>
              <p className="mt-3 text-sm leading-6 text-[#536173]">
                Buying a billing system when the bigger leak is old customers. Buying follow-up when cash is stuck after the job is done. Waiting another month with the same office drag.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)]">
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">What you can send</h3>
              <p className="mt-3 text-sm leading-6 text-[#536173]">
                Screen share, exports, screenshots, or a temporary invited user. Do not send passwords.
              </p>
            </article>
            <Link href="#systems" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:border-[#15803D] hover:bg-[#FBFCF7]">
              See system options
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    ["Walkthrough", "You show how work moves now, where details are checked, and where the office has to remember."],
    ["Record review", "We look at the records that show stuck cash, missed follow-up, open estimates, or old customers."],
    ["Money leak map", "You get a plain map of the first leak, why it matters, and what should happen next."],
    ["First-fix decision", "You know whether to build Cashflow Control, Repeat Revenue, both, or nothing yet."],
  ]

  return (
    <section id="proof" data-section="cash-flow-assessment-how-it-works" className="bg-white py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center`}>
        <div>
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">A short walkthrough. A clear next step.</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            The assessment is built to be quick and practical. No password handoff. No bloated discovery process. Just the records that reveal where money is stuck.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {steps.map(([title, body], index) => (
              <article key={title} className="rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5">
                <p className="text-3xl font-black tracking-[-0.05em] text-[#15803D]">0{index + 1}</p>
                <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.025em] text-[#102033]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#536173]">{body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_24px_70px_rgba(7,29,58,0.08)]">
          <div className="rounded-[1.5rem] bg-white p-5">
            <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Money Leak Summary</h3>
            <div className="mt-5 grid gap-3">
              {[
                ["Leak found", "Invoices wait for missing job details."],
                ["Cost signal", "Open balances stay visible after work is done."],
                ["First fix", "Build the billing path before adding follow-up."],
              ].map(([label, detail]) => (
                <div key={label} className="grid gap-3 rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] p-4 sm:grid-cols-[8rem_1fr] sm:items-center">
                  <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-[#15803D]">{label}</p>
                  <p className="text-sm font-semibold leading-6 text-[#334B60]">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-[#E7F7EB] p-4 text-sm font-semibold leading-6 text-[#116832]">
              You leave with the next paid move, not a long discovery deck.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NextSteps() {
  const paths = [
    {
      title: "Cashflow Control",
      price: `${cashflowMonthly.priceDisplay} + ${cashflowMonthly.setupFeeDisplay}`,
      body: "Build this when delayed billing, missing job details, invoices, or open balances are the first leak.",
      href: "/systems/cashflow-control",
      label: "View Cashflow Control",
    },
    {
      title: "Repeat Revenue",
      price: `${repeatMonthly.priceDisplay} + ${repeatMonthly.setupFeeDisplay}`,
      body: "Build this when old customers, reviews, referrals, or missed calls are the first leak.",
      href: "/systems/repeat-revenue",
      label: "View Repeat Revenue",
    },
    {
      title: "Both Systems",
      price: `${bothMonthly.priceDisplay} + ${bothMonthly.setupFeeDisplay}`,
      body: "Build both when billing and customer follow-up are both costing money every month.",
      href: "/pricing",
      label: "See pricing",
    },
  ]

  const questions = [
    ["Does this replace my field or accounting software?", "No. Stanley Systems looks at the workflow around the tools you already use."],
    ["What if I already know what I want?", "You can still buy a system directly. The assessment is for owners who want the first fix chosen from the leak."],
    ["Do I need to share passwords?", "No. Use screen share, exports, screenshots, or a temporary invited user."],
    ["What happens after the call?", "You get the money leak map and the first-fix recommendation so the next click is obvious."],
  ]

  return (
    <section id="systems" data-section="cash-flow-assessment-next-steps" className="scroll-mt-[120px] bg-[#FBFCF7] py-14 sm:py-16">
      <div className={shell}>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Then build the first fix.</h2>
            <div className="mt-4 space-y-3 text-base leading-7 text-[#536173] sm:text-lg">
              <p>If the leak is delayed billing, build Cashflow Control.</p>
              <p>If the leak is past customers, reviews, referrals, or missed calls, build Repeat Revenue.</p>
              <p>If both leaks are costing money, build both.</p>
            </div>
            <div className="mt-6">
              <CheckoutButton pkg={assessment} label="Start the Cash Flow Assessment" location="cash_flow_assessment_next_steps_primary" />
            </div>
          </div>

          <div className="grid gap-4">
            {paths.map((path) => (
              <article key={path.title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)]">
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">{path.title}</h3>
                    <p className="mt-1 text-sm font-extrabold text-[#116832]">Starts at {path.price}</p>
                    <p className="mt-3 text-sm leading-6 text-[#536173]">{path.body}</p>
                  </div>
                  <Link href={path.href} className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#CFE8D5] bg-[#FBFCF7] px-5 py-3 text-sm font-extrabold text-[#102033] transition hover:border-[#15803D] hover:bg-[#F4FBF5]">
                    {path.label}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {questions.map(([question, answer]) => (
            <article key={question} className="rounded-[1.35rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
              <h3 className="text-lg font-semibold tracking-[-0.025em] text-[#102033]">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-[#536173]">{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function WorkflowAuditPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
      <SiteHeader />
      <main data-nav-theme="light" className="relative bg-[#FBFCF7] [&_section[id]]:scroll-mt-[120px]">
        <Hero />
        <CheckedLeaks />
        <AssessmentPricing />
        <HowItWorks />
        <NextSteps />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  )
}
