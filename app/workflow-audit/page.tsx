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
      alt="Service business owner reviewing office paperwork, estimates, invoices, and customer follow-up."
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
    <section data-section="cash-flow-assessment-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-10 pt-24 sm:pb-14 lg:pt-28">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${shell} relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
        <div className="text-center lg:text-left">
          <h1 className="mx-auto max-w-5xl text-[2.17rem] font-semibold leading-[0.96] tracking-[-0.04em] text-[#071D3A] sm:text-[3.25rem] lg:mx-0 lg:text-[3.85rem]">
            Find the office leaks costing you cash, reviews, and repeat jobs.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#334B60] lg:mx-0">
            For $97, Stanley Systems reviews your calls, estimates, invoices, follow-up, reviews, referrals, and past customers — then shows what to fix first.
          </p>
          <div className="mt-7 flex justify-center lg:justify-start">
            <CheckoutButton pkg={assessment} label="Start the $97 Assessment" location="cash_flow_assessment_hero_primary" />
          </div>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-6 text-[#607080] lg:mx-0">
            No software switch. No passwords needed to start. Your assessment can be credited toward the build.
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}

function CheckedLeaks() {
  const leaks = [
    "Missed calls that never became jobs",
    "Open estimates with no follow-up",
    "Invoices sent late or not chased",
    "Customers never asked for reviews or referrals",
    "Past customers nobody has contacted in months",
  ]

  return (
    <section id="checked" data-section="cash-flow-assessment-checked" className="bg-white py-10 sm:py-12">
      <div className={`${shell} grid gap-7 lg:grid-cols-[0.88fr_1.12fr] lg:items-center`}>
        <div>
          <h2 className="max-w-3xl text-[2.2rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3rem]">
            Where the assessment looks
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            The point is not to admire the mess. It is to find the places where normal office handoffs are quietly costing the owner money.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {leaks.map((item) => (
            <li key={item} className="flex gap-3 rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] px-4 py-3 text-base font-bold leading-6 text-[#102033]">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#15803D]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function SampleOutput() {
  const output = [
    "Map of each office-side leak found",
    "Fix list for every problem identified",
    "Expected result of each fix",
    "First build priority",
  ]

  return (
    <section data-section="cash-flow-assessment-sample-output" className="bg-[#FBFCF7] py-12 sm:py-14">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
        <div>
          <h2 className="max-w-3xl text-[2.3rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.2rem]">
            You leave with a clear first fix, not another vague consultation.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            The Cash Flow Assessment gives you a full map of the office-side leaks and process problems Stanley Systems finds, how to fix each one, and what those fixes are expected to change.
          </p>
          <ul className="mt-5 grid gap-2 text-base font-bold leading-6 text-[#102033] sm:grid-cols-2">
            {output.map((item) => (
              <li key={item} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803D]" />{item}</li>
            ))}
          </ul>
        </div>
        <FadedImage
          src="/images/uploaded/package-voice-notes/money-leak-summary.jpg"
          alt="Sample Money Leak Summary showing the leak found, cost signal, first fix, and next move."
          width={1280}
          height={960}
          sizes="(min-width: 1024px) 46vw, 100vw"
          fadeColor="#FBFCF7"
          wrapperClassName="rounded-[1.25rem] drop-shadow-[0_24px_70px_rgba(7,29,58,0.08)]"
        />
      </div>
    </section>
  )
}

function AssessmentPricing() {
  const deliverables = [
    "A short walkthrough of your office process",
    "A review of invoices, estimates, follow-up, reviews, referrals, and past customers",
    "A map of each office-side leak and process problem found",
    "How to fix every problem Stanley Systems identifies",
    "Expected results from the fixes",
    "The first build recommendation",
  ]

  const facts = [
    ["What happens after you start", "Stanley Systems uses the intake, walkthrough, and records to build a full office-side breakdown of what is getting missed, delayed, or repeated."],
    ["What you need to provide", "Start with the walkthrough. If records are needed, use screen share, exports, screenshots, or a temporary invited user. Do not send passwords."],
    ["What you get even before a build", "You get the leak map, the problems identified, how each one should be fixed, the expected result, and the first build recommendation."],
    ["If you hire Stanley Systems to build", "Your $97 assessment fee becomes a $194 credit toward installation."],
  ]

  return (
    <section id="assessment" data-section="cash-flow-assessment-pricing" className="scroll-mt-[120px] bg-[#F4FBF5] py-14 sm:py-16">
      <div className={shell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Start here: $97 Cash Flow Assessment</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            Buy the assessment when you want Stanley Systems to map what is broken on the office side, show how each problem should be fixed, and make the first build decision obvious.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <article className="flex h-full flex-col rounded-[1.8rem] border-2 border-[#15803D] bg-white p-6 shadow-[0_24px_70px_rgba(21,128,61,0.13)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#102033]">Cash Flow Assessment</h3>
                <p className="mt-2 text-sm font-extrabold text-[#607080]">paid first step</p>
              </div>
              <p className="text-[4.2rem] font-semibold leading-none tracking-[-0.07em] text-[#071D3A]">$97</p>
            </div>
            <p className="mt-5 rounded-2xl bg-[#E7F7EB] px-5 py-4 text-base font-extrabold leading-6 text-[#116832]">
              The assessment fee is credited back at double value toward installation if Stanley Systems builds the fix.
            </p>
            <ul className="mt-6 grid gap-3 text-left text-sm font-semibold leading-6 text-[#334B60] sm:grid-cols-2">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803D]" />{item}</li>
              ))}
            </ul>
            <div className="mt-auto flex w-full justify-center pt-6">
              <CheckoutButton pkg={assessment} label="Start the $97 Assessment" location="cash_flow_assessment_pricing_primary" className="bg-[#15803D] px-8 py-4 text-base text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" />
            </div>
          </article>

          <div className="grid gap-3">
            {facts.map(([title, body]) => (
              <article key={title} className="rounded-[1.35rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#102033]">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    "You show us how calls, estimates, invoices, and follow-up work now.",
    "We review the records and find where money gets stuck.",
    "You get a map of the leaks, fixes, and expected results.",
    "You decide what Stanley Systems should build first.",
  ]

  return (
    <section id="proof" data-section="cash-flow-assessment-how-it-works" className="bg-white py-12 sm:py-14">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center`}>
        <div>
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">What happens after you start</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#536173] sm:text-lg">
            This is the paid product that shows what Stanley Systems found, how each issue should be fixed, and what should happen first.
          </p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {steps.map((body, index) => (
            <li key={body} className="flex gap-4 rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 text-base font-bold leading-7 text-[#102033]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E7F7EB] text-sm font-black text-[#116832]">{index + 1}</span>
              {body}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function NextSteps() {
  const buckets = [
    { title: "Billing and payment follow-up", body: "Invoices, balances, job details, and cash collection need to move faster." },
    { title: "Repeat work, reviews, and referrals", body: "Past customers and happy customers need a real follow-up path." },
    { title: "Cash and customer follow-up", body: "The business is leaking before payment and after the first job." },
  ]

  const questions = [
    ["What happens after I buy?", "You start the assessment intake, then Stanley Systems uses the walkthrough and records to find the money leaks and the first build priority."],
    ["Do I need to share passwords?", "No. Do not send passwords. You can start with screen share, exports, screenshots, or a temporary invited user if access is needed."],
    ["Does this replace my current software?", "No. Stanley Systems looks at the handoffs around the tools you already use."],
    ["Will I talk to a real person?", "Yes. The assessment is reviewed by Stanley Systems before a recommendation is made."],
    ["What happens after the assessment?", "You get the leak map, the problems Stanley Systems identified, how each one should be fixed, the expected results, and the first build recommendation. If Stanley Systems builds the fix, the $97 assessment becomes a $194 installation credit."],
    ["What if I already know what I want?", "You can still start with the assessment to confirm the full fix list before installation, or talk before buying if you need a quick route check."],
  ]

  return (
    <>
      <section id="systems" data-section="cash-flow-assessment-next-steps" className="scroll-mt-[120px] bg-[#FBFCF7] py-14 sm:py-16">
        <div className={shell}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">After the assessment, the fix usually falls into one of three buckets</h2>
            <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
              You do not need to compare systems before buying the assessment. The assessment tells you which bucket should go first.
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {buckets.map((bucket) => (
              <article key={bucket.title} className="rounded-[1.35rem] border border-[#DDEBE2] bg-white p-5 text-left shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#102033]">{bucket.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{bucket.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <CheckoutButton pkg={assessment} label="Start the $97 Assessment" location="cash_flow_assessment_next_steps_primary" className="bg-[#15803D] px-8 py-4 text-base text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" />
          </div>
        </div>
      </section>

      <section data-section="cash-flow-assessment-faq" className="bg-white py-12 sm:py-14">
        <div className={`${shell} max-w-5xl`}>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <h2 className="text-[2.15rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-4xl">Assessment questions</h2>
              <div className="mt-5 rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#102033]">Talk before buying</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">If you need a quick route check before paying, call or ask a question. Keep the diagnosis inside the assessment.</p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col">
                  <a href="tel:+16179586372" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#15803D] px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#116832]">Talk before buying</a>
                  <Link href="/contact?path=pre-buy" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-5 py-2.5 text-sm font-extrabold text-[#116832] transition hover:border-[#15803D] hover:bg-[#F4FBF5]">Ask a question</Link>
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              {questions.map(([question, answer]) => (
                <details key={question} className="group rounded-[1.15rem] border border-[#DDEBE2] bg-white p-4 shadow-[0_10px_24px_rgba(7,29,58,0.035)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-extrabold text-[#071D3A] [&::-webkit-details-marker]:hidden">
                    {question}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E7F7EB] text-[#116832] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
          <MoneyLeakChecksForm
            source="workflow-audit-money-leak-checks"
            pageSource="workflow_audit_money_leak_checks"
            headline="Not ready for the $97 assessment yet? Get one free money leak check first."
            body="Use this only if you are not ready to start the paid assessment. Stanley Systems will send one practical leak to check before you buy."
            helper="No filler. One leak to check, one way to spot it, and one next move."
            className="mt-8 bg-[#FBFCF7] shadow-[0_12px_30px_rgba(7,29,58,0.04)]"
          />
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
        <SampleOutput />
        <AssessmentPricing />
        <HowItWorks />
        <NextSteps />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  )
}
