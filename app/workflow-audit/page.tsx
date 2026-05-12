import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { FadedImage } from "@/components/faded-image"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"
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
      "Find the money leak in your office work, records, invoices, reviews, referrals, and follow-up.",
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
      src="/images/uploaded/money-leak-map/money-leak-map-job-finished-office-check-invoice-sent-cash-collected.jpg"
      alt="Money leak map preview from finished job to office check, invoice sent, and cash collected."
      width={1280}
      height={720}
      priority
      sizes="(min-width: 1024px) 48vw, 100vw"
      fadeColor="#FBFCF7"
      wrapperClassName="relative mx-auto w-full max-w-[760px] lg:max-w-[820px] drop-shadow-[0_24px_55px_rgba(7,29,58,0.12)]"
    />
  )
}

function Hero() {
  return (
    <section data-section="cash-flow-assessment-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-28 sm:pb-16 lg:pt-28">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${shell} relative grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
        <div>
          <h1 className="max-w-5xl text-[2.55rem] font-semibold leading-[0.95] tracking-[-0.056em] text-[#071D3A] sm:text-[4rem] lg:text-[4.7rem]">
            Find where your office is losing money.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60]">
            The Cash Flow Assessment shows where office work is costing money, where reviews and referrals are being missed, and where past customers can be brought back.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            You leave with a clear first-fix direction instead of guessing which system should come first.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CheckoutButton pkg={assessment} label="Start Cash Flow Assessment" location="cash_flow_assessment_hero_primary" />
            <Link href="#assessment" className="inline-flex min-h-12 min-w-[13.5rem] items-center justify-center whitespace-nowrap rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_18px_36px_rgba(21,128,61,0.14)]">
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
    ["Office steps", "Money often gets lost between the completed job, office work, invoice, follow-up, reviews, and referrals."],
  ]

  return (
    <section id="checked" data-section="cash-flow-assessment-checked" className="bg-white py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start`}>
        <div>
          <h2 className="max-w-3xl text-[2.25rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.25rem]">
            Most businesses lose money after the job is done.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            A job gets done. Then the office has to check details, send the invoice, follow up, ask for the review, ask for the referral, and bring the customer back.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            Stanley Systems checks those places and shows which one is costing you first.
          </p>
          <div className="mt-6">
            <CheckoutButton pkg={assessment} label="Start Cash Flow Assessment" location="cash_flow_assessment_checked_primary" className="bg-[#15803D] px-8 py-4 text-base text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {leaks.map(([title, body]) => (
            <article key={title} className="rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white hover:shadow-[0_18px_42px_rgba(21,128,61,0.1)]">
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
    "A breakdown of where office work is leaking money",
    "Where past customers can be brought back",
    "Where more clients, reviews, referrals, and leads are being missed",
    "A short list of what to fix first",
  ]

  return (
    <section id="assessment" data-section="cash-flow-assessment-pricing" className="scroll-mt-[120px] bg-[#F4FBF5] py-14 sm:py-16">
      <div className={shell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Start here for $97.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            Buy the Cash Flow Assessment. Stanley Systems shows where money is being lost and which paid fix should come first.
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
              <CheckoutButton pkg={assessment} label="Start Cash Flow Assessment" location="cash_flow_assessment_pricing_primary" className="bg-[#15803D] px-8 py-4 text-base text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" />
            </div>
          </article>

          <div className="grid gap-4">
            <article className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:shadow-[0_20px_48px_rgba(21,128,61,0.11)]">
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Your assessment fee comes back as package credit</h3>
              <p className="mt-3 text-sm leading-6 text-[#536173]">
                Buy a monthly system after the assessment and get the $97 assessment price credited back. Buy a yearly system and get $194 credited back, so the first step works like a stronger down payment.
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:shadow-[0_20px_48px_rgba(21,128,61,0.11)]">
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">What this gets you</h3>
              <p className="mt-3 text-sm leading-6 text-[#536173]">
                You get where office work is losing money, where past customers can be brought back, where more jobs can come from, where Google reviews are being missed, where referrals and leads are being missed, and which fix should come first.
              </p>
            </article>
            <Link href="#systems" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-7 py-4 text-xl font-extrabold text-[#116832] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#FBFCF7] hover:shadow-[0_18px_38px_rgba(21,128,61,0.13)]">
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
    ["Record Review", "We review records that show stuck cash, past customer chances, more customer opportunities, Google review asks, referrals, and follow-up gaps."],
    ["Money Leak Map", "You get a plain map of the first leak, why it matters, and what should happen next."],
    ["First Fix Decision", "You know what change to make first and whether Cashflow Control, Repeat Revenue, or both systems is the right next step."],
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
    credit: "Assessment credit: -$97 monthly / -$194 yearly",
    body: "Use both when billing and customer follow-up are both leaving money on the table every month.",
    href: "/pricing",
    label: "See both systems",
  }

  const systemPaths = [
    {
      title: "Cashflow Control",
      credit: "Assessment credit: -$97 monthly / -$194 yearly",
      body: "Late invoices, missing job details, payment follow-up, and open balances move faster.",
      href: "/systems/cashflow-control",
      label: "View Cashflow Control",
    },
    {
      title: "Repeat Revenue",
      credit: "Assessment credit: -$97 monthly / -$194 yearly",
      body: "Past customers, reviews, referrals, missed calls, and follow-up start creating more booked work.",
      href: "/systems/repeat-revenue",
      label: "View Repeat Revenue",
    },
  ]

  const questions = [
    ["Does this replace my field or accounting software?", "No. Stanley Systems looks at the work around the tools you already use. The goal is to find where jobs, invoices, reviews, referrals, and follow-up are getting missed, then point you to the right fix."],
    ["What if I already know what I want?", "You can buy Cashflow Control or Repeat Revenue directly. The assessment is for owners who want the numbers to confirm which leak should be fixed first and how the assessment credit should be used."],
    ["Do I need to share passwords?", "No. Start with screen share, exports, screenshots, or a temporary invited user if access is needed. Stanley Systems only asks for the access needed to understand the workflow and avoids unnecessary sensitive access."],
    ["What happens after the call?", "You get the money leak map and the first-fix recommendation. The next step is clear: Cashflow Control, Repeat Revenue, or both systems if both leaks are costing you money."],
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
    <section id="systems" data-section="cash-flow-assessment-next-steps" className="scroll-mt-[120px] bg-[#FBFCF7] py-14 sm:py-16">
      <div className={shell}>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Start where the money comes back fastest.</h2>
            <div className="mt-6">
              <CheckoutButton pkg={assessment} label="Start Cash Flow Assessment" location="cash_flow_assessment_next_steps_primary" className="bg-[#15803D] px-8 py-4 text-base text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" />
            </div>
            <div className="mt-5">
              <SystemCard path={bothPath} />
            </div>
          </div>

          <div className="grid gap-4">
            {systemPaths.map((path) => (
              <SystemCard key={path.title} path={path} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {questions.map(([question, answer]) => (
            <article key={question} className="rounded-[1.35rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:shadow-[0_18px_42px_rgba(21,128,61,0.1)]">
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
