import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { pricingPackageById, type PricingPackage, type PricingPackageId } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const cashflowMonthly = pricingPackageById.cashflow_control_monthly
const cashflowYearly = pricingPackageById.cashflow_control_yearly
const bothMonthly = pricingPackageById.both_systems_monthly
const bothYearly = pricingPackageById.both_systems_yearly
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
      analyticsSource="cashflow_control_page"
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

function LeakPathVisual() {
  const steps = ["Job done", "Details checked", "Invoice sent", "Balance chased"]
  return (
    <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_24px_70px_rgba(7,29,58,0.08)]">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#F4FBF5] p-4">
        <Image
          src="/images/uploaded/money-leak-map/money-leak-map-delayed-billing-office-time-quiet-estimates-missed-reviews.jpg"
          alt="Four common money leaks: delayed billing, office time, quiet estimates, and missed review and referral flow."
          width={960}
          height={1280}
          priority
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="max-h-[430px] w-full rounded-[1.1rem] object-contain"
        />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step} className="rounded-2xl border border-[#CFE1D4] bg-[#FBFCF7] p-3 text-center">
            <p className="text-xl font-black text-[#15803D]">{index + 1}</p>
            <p className="mt-1 text-sm font-extrabold leading-tight text-[#102033]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section data-section="cashflow-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-24 sm:pb-16 lg:pt-20">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${shell} relative grid gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center`}>
        <div>
          <h1 className="max-w-5xl text-[2.7rem] font-semibold leading-[0.94] tracking-[-0.058em] text-[#071D3A] sm:text-[4.3rem] lg:text-[5rem]">
            Stop finished work from waiting on the office.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60]">
            Cashflow Control keeps jobs moving from customer request to paid bill.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            Stanley Systems connects the handoffs your team still has to carry: intake, job notes, office checks, invoices, payment follow-up, and owner visibility.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CheckoutButton pkg={cashflowMonthly} label="Buy Cashflow Control" location="cashflow_hero_primary" />
            <CheckoutButton
              pkg={assessment}
              label="Start with the Cash Flow Assessment"
              location="cashflow_hero_assessment"
              className="border border-[#CFE8D5] bg-white text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] hover:border-[#15803D] hover:bg-[#F4FBF5]"
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
  const leaks = [
    "Missing billing details get flagged.",
    "Office follow-up gets routed.",
    "Invoices move sooner.",
    "Open balances stay visible.",
  ]

  return (
    <section data-section="cashflow-leak-proof" className="bg-white py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
        <div>
          <h2 className="max-w-3xl text-[2.25rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.25rem]">
            The job is done. The cash is not.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            Money gets stuck when details are missing, invoices wait, or someone has to check the same job twice.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            Cashflow Control gives the next step an owner so the work does not sit in a list, inbox, or spreadsheet.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/invoicing-delay-cash-flow-calculator" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE1D4] bg-[#F4FBF5] px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:border-[#15803D] hover:bg-white">
              Use the Money Leak Calculator
            </Link>
            <Link href="#cashflow-pricing" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#102033] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#071D3A]">
              See pricing options
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {leaks.map((leak) => (
            <article key={leak} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_16px_40px_rgba(7,29,58,0.05)]">
              <CheckCircle2 className="h-6 w-6 text-[#15803D]" aria-hidden="true" />
              <p className="mt-5 text-xl font-semibold leading-tight tracking-[-0.025em] text-[#102033]">{leak}</p>
            </article>
          ))}
          <div className="sm:col-span-2 overflow-hidden rounded-[1.5rem] border border-[#DDEBE2] bg-white p-3 shadow-[0_18px_48px_rgba(7,29,58,0.06)]">
            <Image
              src="/images/uploaded/cashflow-control/delayed-billing-office-time-open-balances.jpg"
              alt="Delayed billing, office time, and open balances create repeated cleanup work."
              width={1280}
              height={720}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="h-auto w-full rounded-[1.1rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function PricingCard({ pkg, title, description, bullets, ctaLabel, recommended = false }: {
  pkg: PricingPackage
  title: string
  description: string
  bullets: string[]
  ctaLabel: string
  recommended?: boolean
}) {
  return (
    <article className={`flex h-full flex-col rounded-[1.7rem] border bg-white p-5 shadow-[0_18px_48px_rgba(7,29,58,0.07)] ${recommended ? "border-[#15803D] ring-2 ring-[#B7E4C7]" : "border-[#DDEBE2]"}`}>
      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">{title}</h3>
      <p className="mt-4 text-[2.75rem] font-semibold leading-none tracking-[-0.06em] text-[#071D3A]">{pkg.priceDisplay}</p>
      <p className="mt-2 text-sm font-extrabold text-[#607080]">{pkg.waivedSetup ? pkg.waivedSetupDisplay : pkg.setupFeeDisplay}</p>
      {pkg.savings ? <p className="mt-3 rounded-2xl bg-[#F4FBF5] px-4 py-3 text-sm font-extrabold text-[#116832]">{pkg.savings.display}</p> : null}
      <p className="mt-4 text-sm leading-6 text-[#536173]">{description}</p>
      <ul className="mt-5 grid gap-2 text-sm font-semibold leading-6 text-[#334B60]">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803D]" />{bullet}</li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <CheckoutButton pkg={pkg} label={ctaLabel} location={`cashflow_pricing_${pkg.id}`} className={recommended ? undefined : "bg-[#102033] text-white shadow-[0_14px_28px_rgba(16,32,51,0.16)] hover:bg-[#071D3A]"} />
      </div>
    </article>
  )
}

function Pricing() {
  return (
    <section id="cashflow-pricing" data-section="cashflow-pricing" className="scroll-mt-[120px] bg-[#F4FBF5] py-14 sm:py-16">
      <div className={shell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Buy the billing fix.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            If delayed billing is the leak, start here. Stanley Systems sets up the workflow that moves jobs toward collected cash.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <PricingCard
            pkg={cashflowMonthly}
            title="Cashflow Control Monthly"
            description="Best if you want the billing path fixed now and want monthly flexibility."
            ctaLabel="Buy monthly"
            bullets={["Intake-to-billing workflow", "Missing-detail checks", "Office alerts", "Invoice and payment follow-up path", "Owner visibility"]}
          />
          <PricingCard
            pkg={cashflowYearly}
            title="Cashflow Control Yearly"
            description="Best if the billing leak is costing you every month and you want the lower first-year cost."
            ctaLabel="Buy yearly"
            recommended
            bullets={["Setup waived", "Everything in monthly", "Lower first-year cost", "Invoice and payment follow-up path", "Owner visibility"]}
          />
        </div>

        <div className="mt-5 grid gap-4 rounded-[1.5rem] border border-[#CFE1D4] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Need billing and repeat revenue fixed together?</h3>
            <p className="mt-2 text-sm leading-6 text-[#536173]">Both Systems keeps the billing path and customer follow-up path moving from the same buying decision.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CheckoutButton pkg={bothMonthly} label="Buy both monthly" location="cashflow_pricing_both_monthly" className="bg-white text-[#102033] ring-1 ring-[#CFE1D4] hover:bg-[#F4FBF5]" />
            <CheckoutButton pkg={bothYearly} label="Buy both yearly" location="cashflow_pricing_both_yearly" />
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-[#CFE1D4] bg-[#FBFCF7] p-5 text-center">
          <p className="text-sm font-semibold leading-6 text-[#536173]">
            Start with the $97 Cash Flow Assessment first. If you buy a monthly system, $97 credits back. If you buy yearly, $194 credits back.
          </p>
          <div className="mt-4">
            <CheckoutButton pkg={assessment} label="Start with the Cash Flow Assessment" location="cashflow_pricing_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:border-[#15803D] hover:bg-[#F4FBF5]" />
          </div>
        </div>
      </div>
    </section>
  )
}

function MechanismProof() {
  const steps = [
    ["Customer request comes in", "The job starts with the real request, not a mystery note."],
    ["Job details get checked", "Billing blockers show up before they become invoice delays."],
    ["Missing items get routed", "The right person gets the missing detail instead of another office chase."],
    ["Invoice and payment follow-up move", "The owner can see what is waiting, sent, and still open."],
  ]

  return (
    <section data-section="cashflow-mechanism-proof" className="bg-white py-14 sm:py-16">
      <div className={shell}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">One path from request to paid bill.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
              Stanley Systems maps the way work moves now, then builds the safest path around the tools you already use.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CheckoutButton pkg={cashflowMonthly} label="Buy Cashflow Control" location="cashflow_mechanism_primary" />
              <CheckoutButton pkg={assessment} label="Start with the Cash Flow Assessment" location="cashflow_mechanism_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:border-[#15803D] hover:bg-[#F4FBF5]" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(([title, body], index) => (
              <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5">
                <p className="text-3xl font-black tracking-[-0.05em] text-[#15803D]">0{index + 1}</p>
                <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.025em] text-[#102033]">{title}</h3>
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
    ["Does this replace my field or accounting software?", "No. Stanley Systems builds around the tools you already use."],
    ["What if we are not sure billing is the biggest leak?", "Start with the Cash Flow Assessment. It shows which leak should be fixed first."],
    ["How soon do we know what gets built?", "The assessment maps the leak first. Direct system buyers start with setup mapping."],
    ["Who is this for?", "Service businesses where completed work still depends on manual office follow-up before cash comes in."],
  ]

  return (
    <section id="scope" data-section="cashflow-fit-objections" className="scroll-mt-[120px] bg-[#FBFCF7] py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start`}>
        <div>
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Is this the right first fix?</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            Cashflow Control is for service businesses where completed work still depends on manual office follow-up before cash comes in.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <CheckoutButton pkg={cashflowMonthly} label="Buy Cashflow Control" location="cashflow_fit_primary" />
            <CheckoutButton pkg={assessment} label="Start with the Cash Flow Assessment" location="cashflow_fit_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:border-[#15803D] hover:bg-[#F4FBF5]" />
          </div>
        </div>
        <div className="grid gap-4">
          {questions.map(([question, answer]) => (
            <article key={question} className="rounded-[1.35rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
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
