import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { PackagePricingGrid, type PackagePricingCard } from "@/components/package-pricing-cards"
import { pricingPackageById, type PricingPackage, type PricingPackageId } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const cashflowMonthly = pricingPackageById.cashflow_control_monthly
const cashflowYearly = pricingPackageById.cashflow_control_yearly
const assessment = pricingPackageById.workflow_audit

export const metadata: Metadata = {
  title: "Cashflow Control | Stanley Systems",
  description:
    "Cashflow Control helps service businesses move finished work from job details to invoice and payment follow-up without letting cash wait on the office.",
  alternates: {
    canonical: "https://stanley-systems.com/systems/cashflow-control",
  },
  openGraph: {
    title: "Cashflow Control | Stanley Systems",
    description:
      "Stop finished work from waiting on missing billing details, invoice delays, and open-balance follow-up.",
    url: "https://stanley-systems.com/systems/cashflow-control",
    siteName: "Stanley Systems",
    type: "website",
  },
}

function CheckoutButton({
  pkg,
  label,
  location,
  className = "bg-[#15803D] text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]",
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
      analyticsSource="cashflow_control_page"
      packageId={pkg.analyticsPackageId as PricingPackageId}
      packageName={pkg.publicName}
      billingPeriod={billingPeriod}
      ctaLabel={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 min-w-[13.5rem] items-center justify-center whitespace-nowrap rounded-full px-6 py-3 text-sm font-extrabold transition duration-300 ${className}`}
    >
      {label} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
    </CTALink>
  )
}

function monthlyEquivalent(pkg: PricingPackage) {
  return Math.round(pkg.price / 12)
}

const cashflowPricingCards: PackagePricingCard[] = [
  {
    badge: "Monthly",
    name: "Cashflow Control Monthly",
    package: cashflowMonthly,
    description: "Buy this when finished jobs are waiting on office work, invoice checks, or payment follow-up.",
    install: cashflowMonthly.setupFeeDisplay,
    credit: "Cash Flow Assessment credit: -$97",
    cta: cashflowMonthly.cta,
    tone: "monthly",
    bullets: ["Customer request to final bill path", "Missing details routed to the right person", "Invoices and payment follow-up move sooner"],
  },
  {
    badge: cashflowYearly.savings ? `-${cashflowYearly.savings.amount.toLocaleString()} first year` : "Yearly",
    name: "Cashflow Control Yearly",
    package: cashflowYearly,
    description: `Shows as $${monthlyEquivalent(cashflowYearly)}/mo, billed yearly. Best when the billing leak is costing you every month.`,
    install: cashflowYearly.waivedSetupDisplay ?? cashflowYearly.setupFeeDisplay,
    credit: "Cash Flow Assessment credit: -$194",
    cta: cashflowYearly.cta,
    tone: "recommended",
    bullets: ["Everything in monthly", "Yearly billing lowers the first-year cost", "Installation removed on yearly"],
  },
]

function LeakPathVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[720px] lg:max-w-[780px]">
      <Image
        src="/images/uploaded/money-leak-map/money-leak-map-delayed-billing-office-time-quiet-estimates-missed-reviews.jpg"
        alt="Four common money leaks: delayed billing, office time, quiet estimates, and missed review and referral flow."
        width={960}
        height={1280}
        priority
        sizes="(min-width: 1024px) 48vw, 100vw"
        className="h-auto w-full object-contain drop-shadow-[0_24px_55px_rgba(7,29,58,0.12)]"
      />
    </div>
  )
}

function Hero() {
  return (
    <section data-section="cashflow-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-28 sm:pb-16 lg:pt-28">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${shell} relative grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center`}>
        <div>
          <h1 className="max-w-5xl text-[2.25rem] font-semibold leading-[0.96] tracking-[-0.052em] text-[#071D3A] sm:text-[3.45rem] lg:text-[4rem]">
            Stop finished work from waiting on the office.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60]">
            Cashflow Control keeps jobs moving from customer request to paid bill.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            Stanley Systems connects intake, job notes, office checks, invoices, payment follow-up, and owner view so the next billing step does not sit still.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CheckoutButton pkg={cashflowMonthly} label="Buy Cashflow Control" location="cashflow_hero_primary" />
            <CheckoutButton
              pkg={assessment}
              label="Start Cash Flow Assessment"
              location="cashflow_hero_assessment"
              className="border border-[#CFE8D5] bg-white text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_18px_36px_rgba(21,128,61,0.14)]"
            />
          </div>
          <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-[#607080]">
            Not sure this is the first fix? Buy the $97 Cash Flow Assessment and credit it toward the system.
          </p>
        </div>
        <LeakPathVisual />
      </div>
    </section>
  )
}

function LeakProof() {
  return (
    <section data-section="cashflow-leak-proof" className="bg-white py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
        <div>
          <h2 className="max-w-3xl text-[2.25rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.25rem]">
            The job is done. The cash is not.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            Money gets stuck when job details are missing, invoices wait, or payment follow-up falls back on memory.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            Cashflow Control gives each billing step a clear next move so finished work turns into sent invoices and collected cash sooner.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/invoicing-delay-cash-flow-calculator" className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#CFE1D4] bg-[#F4FBF5] px-6 py-3 text-sm font-extrabold text-[#116832] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white hover:shadow-[0_16px_34px_rgba(21,128,61,0.12)]">
              Use the Money Leak Calculator
            </Link>
            <Link href="#cashflow-pricing" className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#102033] px-6 py-3 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#071D3A] hover:shadow-[0_18px_38px_rgba(16,32,51,0.2)]">
              See pricing options
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-2xl">
          <Image
            src="/images/uploaded/cashflow-control/delayed-billing-office-time-open-balances.jpg"
            alt="Delayed billing, office time, and open balances create repeated cleanup work."
            width={1280}
            height={720}
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="h-auto w-full object-contain drop-shadow-[0_22px_50px_rgba(7,29,58,0.12)]"
          />
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="cashflow-pricing" data-section="cashflow-pricing" className="scroll-mt-[120px] bg-[#F4FBF5] py-14 sm:py-16">
      <div className={shell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Buy the billing fix.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            If delayed billing is the leak, buy the system that moves finished work toward invoice and payment faster.
          </p>
        </div>

        <PackagePricingGrid
          cards={cashflowPricingCards}
          locationPrefix="cashflow_pricing"
          analyticsSource="cashflow_control_page"
          gridClassName="md:grid-cols-2"
        />

        <div className="mt-8 grid gap-5 rounded-[2rem] border-2 border-[#15803D] bg-white p-6 text-center shadow-[0_24px_70px_rgba(21,128,61,0.13)] lg:grid-cols-[1fr_auto] lg:items-center lg:text-left">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-[#B91C1C]">Assessment first</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[#102033] sm:text-4xl">Start with the $97 Cash Flow Assessment.</h3>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#334B60]">
              Buy monthly after the assessment and get $97 back. Buy yearly and get $194 back.
            </p>
          </div>
          <CheckoutButton
            pkg={assessment}
            label="Start Cash Flow Assessment"
            location="cashflow_pricing_assessment"
            className="border border-[#CFE8D5] bg-[#15803D] text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]"
          />
        </div>
      </div>
    </section>
  )
}

function MechanismProof() {
  const steps = [
    ["Requests get recorded", "The work starts with the real customer request, not a mystery note."],
    ["Job details get checked", "Billing blockers show up before they turn into invoice delays."],
    ["Missing items get routed", "The right person gets the missing detail instead of another office chase."],
    ["Bills move faster", "Invoices and payment follow-up keep moving after the job is done."],
  ]

  return (
    <section data-section="cashflow-mechanism-proof" className="bg-white py-14 sm:py-16">
      <div className={shell}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Get bills out faster after jobs are done.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
              Cashflow Control connects the office steps between customer request, completed work, invoice, payment follow-up, and cash collected.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
              When something is missing, the right person gets the next step. When the details are ready, billing keeps moving.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CheckoutButton pkg={cashflowMonthly} label="Buy Cashflow Control" location="cashflow_mechanism_primary" />
              <CheckoutButton pkg={assessment} label="Cash Flow Assessment" location="cashflow_mechanism_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_18px_36px_rgba(21,128,61,0.14)]" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(([title, body]) => (
              <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white hover:shadow-[0_18px_40px_rgba(21,128,61,0.12)]">
                <h3 className="text-xl font-semibold leading-tight tracking-[-0.025em] text-[#102033]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#536173]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FitObjections() {
  const questions = [
    ["Does this replace my field or accounting software?", "No. Stanley Systems sets it up around the tools you already use."],
    ["What if we are not sure billing is the biggest leak?", "Start with the Cash Flow Assessment. It shows which leak should be fixed first."],
    ["How soon do we know what gets installed?", "The assessment maps the leak first. Direct system buyers start with setup mapping."],
    ["Who is this for?", "Service businesses where completed work still depends on office follow-up before cash comes in."],
  ]

  return (
    <section id="scope" data-section="cashflow-fit-objections" className="scroll-mt-[120px] bg-[#FBFCF7] py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start`}>
        <div>
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Is this the right first fix?</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            Cashflow Control is for service businesses where completed work still depends on office follow-up before cash comes in.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
            <CheckoutButton pkg={cashflowMonthly} label="Buy Cashflow Control" location="cashflow_fit_primary" />
            <CheckoutButton pkg={assessment} label="Cash Flow Assessment" location="cashflow_fit_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_18px_36px_rgba(21,128,61,0.14)]" />
          </div>
        </div>
        <div className="grid gap-4">
          {questions.map(([question, answer]) => (
            <article key={question} className="rounded-[1.35rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:shadow-[0_18px_42px_rgba(21,128,61,0.1)]">
              <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#102033]">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-[#536173]">{answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function CashflowControlPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A]">
        <Hero />
        <LeakProof />
        <Pricing />
        <MechanismProof />
        <FitObjections />
      </main>
      <Footer />
    </>
  )
}
