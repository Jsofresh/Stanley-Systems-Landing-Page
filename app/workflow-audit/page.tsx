import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { FadedImage } from "@/components/faded-image"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"
import { MoneyLeakChecksForm } from "@/components/money-leak-checks-form"
import { pricingPackageById, type PricingPackage, type PricingPackageId } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const assessment = pricingPackageById.workflow_audit

export const metadata: Metadata = {
  title: "Cash Flow Assessment | Stanley Systems",
  description:
    "Start with the $97 Cash Flow Assessment from Stanley Systems to find where office work is costing money.",
  alternates: { canonical: "https://stanley-systems.com/workflow-audit" },
  openGraph: {
    title: "Cash Flow Assessment | Stanley Systems",
    description:
      "Find where office work is slowing down cash, reviews, referrals, and repeat jobs.",
    url: "https://stanley-systems.com/workflow-audit",
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
      analyticsSource="cash_flow_assessment_page"
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

function HeroVisual() {
  return (
    <FadedImage
      src="/images/uploaded/2026-05-13-jaden/plumbing-owner-office-time-delayed-invoices-leaking-cash-quiet-estimates-old-customers.jpg"
      alt="Service business owner reviewing delayed invoices, quiet estimates, and cash leaks in the office."
      width={1280}
      height={961}
      priority
      sizes="(min-width: 1024px) 48vw, 100vw"
      imageClassName="h-auto w-full object-contain [mask-image:radial-gradient(ellipse_at_center,#000_58%,rgba(0,0,0,0.94)_70%,rgba(0,0,0,0.62)_84%,transparent_100%)]"
      fadeColor="#FBFCF7"
      fadeSize="12%"
      outerFade
      outerFadeColor="rgba(251,252,247,0.98)"
      wrapperClassName="relative mx-auto w-full max-w-[760px] lg:max-w-[820px] drop-shadow-[0_24px_55px_rgba(7,29,58,0.12)]"
    />
  )
}

function Hero() {
  return (
    <section data-section="cash-flow-assessment-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-28 sm:pb-16 lg:pt-28">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${shell} relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
        <div className="text-center">
          <h1 className="mx-auto max-w-5xl text-[2.17rem] font-semibold leading-[0.95] tracking-[-0.04em] text-[#071D3A] sm:text-[3.4rem] lg:text-[4rem]">
            Find where your office is losing money.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#334B60]">
            The Cash Flow Assessment shows where office work is costing money, where reviews and referrals are being missed, and where past customers can be brought back.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CheckoutButton pkg={assessment} label="Start the Cash Flow Assessment" location="cash_flow_assessment_hero_primary" />
            <Link href="#assessment" className="inline-flex min-h-12 min-w-[13.5rem] items-center justify-center whitespace-nowrap rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_18px_36px_rgba(21,128,61,0.14)]">
              See what you get
            </Link>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-6 text-[#607080]">
            Your $97 assessment becomes a $194 credit toward the Systems Installation Sprint.
          </p>
          <div className="mx-auto mt-4 grid max-w-xl gap-2 rounded-[1.35rem] border border-[#DDEBE2] bg-white/80 p-4 text-sm font-bold leading-6 text-[#536173] shadow-[0_12px_30px_rgba(7,29,58,0.05)] sm:grid-cols-[1fr_auto] sm:items-center sm:text-left">
            <span>Not sure if this fits? Ask us a question and Stanley Systems will help you decide whether the assessment is the right first step.</span>
            <span className="flex flex-wrap justify-center gap-2 sm:justify-end">
              <a href="tel:+16179586372" className="rounded-full border border-[#CFE8D5] bg-white px-3 py-2 text-[#116832] transition hover:border-[#15803D] hover:bg-[#F4FBF5]">Call before buying</a>
              <Link href="/contact?path=pre-buy" className="rounded-full bg-[#102033] px-3 py-2 text-white transition hover:bg-[#071D3A]">Ask us a question</Link>
            </span>
          </div>
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
    ["Invoices and balances", "Finished work and billed money can sit when details, checks, or follow-up fall out of view."],
  ]

  return (
    <section id="checked" data-section="cash-flow-assessment-checked" className="bg-white py-9 sm:py-10 lg:py-10">
      <div className={`${shell} grid gap-8 lg:grid-cols-[1.16fr_0.84fr] lg:items-center`}>
        <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1 lg:grid-cols-6">
          {leaks.map(([title, body], index) => (
            <article key={title} className={`rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 text-center shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white hover:shadow-[0_18px_42px_rgba(21,128,61,0.1)] ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
              <h3 className="text-xl font-semibold leading-tight tracking-[-0.025em] text-[#102033]">{title}</h3>
              <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-6 text-[#536173]">{body}</p>
            </article>
          ))}
        </div>
        <div className="order-1 lg:order-2 lg:pl-4">
          <h2 className="max-w-3xl text-[2.25rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.25rem] lg:text-[3.4rem]">
            Office work can slow down cash, reviews, referrals, and repeat jobs.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            Calls, estimates, job handoffs, invoices, payment follow-up, reviews, referrals, and past customers can all get stuck when the next step is not owned.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            Stanley Systems checks those places and gives you the actual problems, the full fix list, and what should be built first.
          </p>
          <div className="mt-6">
            <CheckoutButton pkg={assessment} label="Start the Cash Flow Assessment" location="cash_flow_assessment_checked_primary" className="bg-[#15803D] px-8 py-4 text-base text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" />
          </div>
        </div>
      </div>
    </section>
  )
}

function AssessmentPricing() {
  const deliverables = [
    "A breakdown of where office work is slowing cash",
    "Where past customers can be brought back",
    "Where more clients, reviews, referrals, and leads are being missed",
    "The full fix list for every problem found",
  ]

  return (
    <section id="assessment" data-section="cash-flow-assessment-pricing" className="scroll-mt-[120px] bg-[#F4FBF5] py-14 sm:py-16">
      <div className={shell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Start here for $97.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            Start the Cash Flow Assessment. Stanley Systems shows where money is being missed, what it likely costs, the full fix list, and what should be built first.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <article className="group flex h-full flex-col items-center rounded-[1.8rem] border-2 border-[#15803D] bg-white p-6 text-center shadow-[0_24px_70px_rgba(21,128,61,0.13)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_86px_rgba(21,128,61,0.18)] hover:ring-2 hover:ring-[#B7E4C7]">
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#102033]">Cash Flow Assessment</h3>
            <p className="mt-4 text-center text-[4.4rem] font-semibold leading-none tracking-[-0.07em] text-[#071D3A]">$97</p>
            <p className="mt-2 text-center text-sm font-extrabold text-[#607080]">one time</p>
            <p className="mt-5 rounded-2xl bg-[#E7F7EB] px-5 py-4 text-base font-extrabold text-[#116832] transition duration-300 group-hover:bg-[#D9F4E0]">Cash Flow Assessment</p>

            <ul className="mt-6 grid gap-3 text-left text-sm font-semibold leading-6 text-[#334B60] sm:grid-cols-2">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803D]" />{item}</li>
              ))}
            </ul>

            <div className="mt-auto flex w-full justify-center pt-6">
              <CheckoutButton pkg={assessment} label="Start the Cash Flow Assessment" location="cash_flow_assessment_pricing_primary" className="bg-[#15803D] px-8 py-4 text-base text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" />
            </div>
          </article>

          <div className="grid gap-4">
            <article className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:shadow-[0_20px_48px_rgba(21,128,61,0.11)]">
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Your assessment fee comes back as package credit</h3>
              <p className="mt-3 text-sm leading-6 text-[#536173]">
                The $97 Cash Flow Assessment becomes a $194 credit toward the Systems Installation Sprint.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:shadow-[0_20px_48px_rgba(21,128,61,0.11)]">
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">What this gets you</h3>
              <p className="mt-3 text-sm leading-6 text-[#536173]">
                You get the actual problems, what they likely cost, the full fix list, and what should be built first.
              </p>
            </article>
            <Link href="#systems" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-7 py-4 text-xl font-extrabold text-[#116832] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#FBFCF7] hover:shadow-[0_18px_38px_rgba(21,128,61,0.13)]">
              See system options
            </Link>
            <article className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:shadow-[0_20px_48px_rgba(21,128,61,0.11)]">
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Want to talk before buying?</h3>
              <p className="mt-3 text-sm leading-6 text-[#536173]">Not sure if this fits? Ask us a question. Stanley Systems will help you decide whether the Cash Flow Assessment is the right next step.</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#607080]">You may first speak with our phone assistant so Stanley Systems can route the question quickly.</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a href="tel:+16179586372" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#15803D] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#116832]">Call before buying</a>
                <Link href="/contact?path=pre-buy" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-5 py-2.5 text-sm font-extrabold text-[#116832] transition hover:border-[#15803D] hover:bg-[#F4FBF5]">Ask us a question</Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    ["Walkthrough", "You show how work moves now, where details are checked, and where the office has to remember."],
    ["Record Review", "We review records that show stuck cash, past customer chances, more customer opportunities, Google review asks, referrals, and follow-up gaps."],
    ["Money Leak Map", "You get a plain map of the leaks, why they matter, and what should be fixed first."],
    ["Build Priority", "You know what should be built first and whether Cashflow Control, Repeat Revenue, both systems, or a specific fix is the right next step."],
  ]

  return (
    <section id="proof" data-section="cash-flow-assessment-how-it-works" className="bg-white py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center`}>
        <div>
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">A short walkthrough. A clear next step.</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {steps.map(([title, body]) => (
              <article key={title} className="rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white hover:shadow-[0_18px_42px_rgba(21,128,61,0.1)]">
                <h3 className="text-xl font-semibold leading-tight tracking-[-0.025em] text-[#102033]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#536173]">{body}</p>
              </article>
            ))}
          </div>
        </div>
        <FadedImage
          src="/images/uploaded/package-voice-notes/money-leak-summary.jpg"
          alt="Money Leak Summary showing the leak found, cost signal, and first fix."
          width={1280}
          height={960}
          sizes="(min-width: 1024px) 42vw, 100vw"
          fadeColor="#ffffff"
          wrapperClassName="rounded-[1.25rem] drop-shadow-[0_24px_70px_rgba(7,29,58,0.08)]"
        />
      </div>
    </section>
  )
}

function NextSteps() {
  const bothPath = {
    title: "Both Systems",
    credit: "$194 assessment credit toward the Systems Installation Sprint",
    body: "Use both when billing and customer follow-up are both leaving money on the table every month.",
    href: "/pricing",
    label: "See both systems",
  }

  const systemPaths = [
    {
      title: "Cashflow Control",
      credit: "$194 assessment credit toward the Systems Installation Sprint",
      body: "Late invoices, missing job details, payment follow-up, and open balances move faster.",
      href: "/systems/cashflow-control",
      label: "View Cashflow Control",
    },
    {
      title: "Repeat Revenue",
      credit: "$194 assessment credit toward the Systems Installation Sprint",
      body: "Past customers, reviews, referrals, missed calls, and follow-up start creating more booked work.",
      href: "/systems/repeat-revenue",
      label: "View Repeat Revenue",
    },
  ]

  const questions = [
    ["Does this replace my field or accounting software?", "No. Stanley Systems looks at the work around the tools you already use. The goal is to find where jobs, invoices, reviews, referrals, and follow-up are getting missed, then point you to the right fix."],
    ["What if I already know what I want?", "Start with the Cash Flow Assessment so Stanley Systems can confirm the full fix list and the right build path before the Systems Installation Sprint."],
    ["What if I am not sure the assessment is right for me?", "Ask us a question before buying. If Stanley Systems can answer it quickly, we will. If the answer requires checking your real records, the Cash Flow Assessment is the right next step."],
    ["Will I talk to a person?", "Yes. You may first speak with our phone assistant so Stanley Systems can route the conversation quickly, but the assessment is reviewed by Stanley Systems before a system recommendation is made."],
    ["What if I only want the weekly leak checks?", "Use the leak checks if you are not ready to buy. They help you spot billing, follow-up, review, referral, missed-call, and past-customer leaks before you commit to an assessment."],
    ["Do I need to share passwords?", "No. Start with screen share, exports, screenshots, or a temporary invited user if access is needed. Stanley Systems only asks for the access needed to understand how work moves now."],
    ["What happens after the call?", "You get the money leak map, the full fix list, and the build priority. The next step is clear: Cashflow Control, Repeat Revenue, both systems, or a specific fix if that is what the assessment finds."],
  ]

  const cardClass = "rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:shadow-[0_20px_48px_rgba(21,128,61,0.11)]"

  const SystemCard = ({ path }: { path: typeof bothPath }) => (
    <article className={cardClass}>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">{path.title}</h3>
          <p className="mt-2 text-base font-extrabold text-[#116832]">{path.credit}</p>
          <p className="mt-3 text-sm leading-6 text-[#536173]">{path.body}</p>
        </div>
        <Link href={path.href} className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#CFE8D5] bg-[#FBFCF7] px-6 py-3 text-base font-extrabold text-[#102033] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_16px_34px_rgba(21,128,61,0.12)]">
          {path.label}
        </Link>
      </div>
    </article>
  )

  return (
    <>
      <section id="systems" data-section="cash-flow-assessment-next-steps" className="scroll-mt-[120px] bg-[#FBFCF7] py-20 sm:py-24 lg:py-28">
        <div className={shell}>
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <h2 className="max-w-2xl text-[2.65rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.45rem]">Start with the fix list before you pay for a build.</h2>
              <div className="mt-8">
                <CheckoutButton pkg={assessment} label="Start the Cash Flow Assessment" location="cash_flow_assessment_next_steps_primary" className="bg-[#15803D] px-8 py-4 text-base text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" />
              </div>
              <div className="mt-7">
                <SystemCard path={bothPath} />
              </div>
            </div>

            <div className="grid gap-5">
              {systemPaths.map((path) => (
                <SystemCard key={path.title} path={path} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-section="cash-flow-assessment-faq" className="bg-white py-14 sm:py-16">
        <div className={shell}>
          <div className="max-w-3xl">
            <h2 className="text-[2.15rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-4xl">Assessment questions</h2>
            <p className="mt-3 text-base leading-7 text-[#536173]">Quick answers before you send the intake or start the assessment.</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {questions.map(([question, answer]) => (
              <article key={question} className="rounded-[1.35rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:shadow-[0_18px_42px_rgba(21,128,61,0.1)]">
                <h3 className="text-lg font-semibold tracking-[-0.025em] text-[#102033]">{question}</h3>
                <p className="mt-2 text-sm leading-6 text-[#536173]">{answer}</p>
              </article>
            ))}
          </div>
          <MoneyLeakChecksForm source="workflow-audit-money-leak-checks" pageSource="workflow_audit_money_leak_checks" className="mt-8" />
        </div>
      </section>
    </>
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
