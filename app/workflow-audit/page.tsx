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
  title: "Office Process Assessment | Stanley Systems",
  description:
    "Start with the $97 Office Process Assessment from Stanley Systems to find where office work is costing money.",
  alternates: { canonical: "https://stanley-systems.com/workflow-audit" },
  openGraph: {
    title: "Office Process Assessment | Stanley Systems",
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
    <section data-section="cash-flow-assessment-hero" className="relative flex overflow-hidden bg-[#FBFCF7] pb-8 pt-32 sm:pb-10 sm:pt-36 lg:pt-40">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${shell} relative grid flex-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
        <div className="text-center lg:text-left">
          <h1 className="mx-auto max-w-5xl text-[2.17rem] font-semibold leading-[0.96] tracking-[-0.04em] text-[#071D3A] sm:text-[3.25rem] lg:mx-0 lg:text-[4.15rem]">
            Find the office leaks costing you cash, reviews, and repeat jobs.
          </h1>
          <div className="mt-7 flex justify-center lg:justify-start">
            <CheckoutButton pkg={assessment} label="Get the Office Process Assessment" location="cash_flow_assessment_hero_primary" />
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}

function AssessmentDemoVideo() {
  return (
    <section id="demo" data-section="cash-flow-assessment-demo-video" className="bg-white py-10 sm:py-12 lg:py-14">
      <div className={shell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Watch the Office Process Assessment in action.</h2>
        </div>
        <div className="mx-auto mt-7 w-full max-w-7xl overflow-hidden rounded-[1.9rem] border border-[#DDEBE2] bg-[#071D3A] shadow-[0_30px_86px_rgba(7,29,58,0.18)]">
          <video
            className="block aspect-video w-full bg-[#071D3A] object-cover"
            src="/cashflow-assessment-demo.mp4"
            controls
            playsInline
            preload="metadata"
          />
        </div>
        <div className="mt-7 flex justify-center">
          <CheckoutButton pkg={assessment} label="Get the Office Process Assessment" location="cash_flow_assessment_demo_video_primary" />
        </div>
      </div>
    </section>
  )
}

function AssessmentPricing() {
  const deliverables = [
    ["Money-leak report", "The problems found, what they cost, and what should change."],
    ["Workflow maps", "How work moves now, plus the cleaner path it should follow."],
    ["Office fix list", "Every broken step, handoff, reminder, and follow-up worth fixing."],
    ["Expected ROI", "What each fix should improve before you spend on the build."],
  ]

  return (
    <section id="assessment" data-section="cash-flow-assessment-pricing" className="scroll-mt-[120px] bg-[#F4FBF5] py-10 sm:py-12">
      <div className={shell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.035em] text-[#071D3A] sm:text-5xl">Start here: $97 Office Process Assessment</h2>
        </div>

        <div className="mx-auto mt-8 max-w-3xl">
          <article className="relative overflow-hidden rounded-[2rem] border border-[#BFE4C8] bg-white shadow-[0_26px_80px_rgba(21,128,61,0.14)]">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-[#15803D]" aria-hidden="true" />
            <div className="grid gap-3 p-4 sm:gap-6 sm:p-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div className="rounded-[1.35rem] bg-[#F4FBF5] p-4 ring-1 ring-[#CFE8D5] sm:rounded-[1.45rem] sm:p-5">
                <h3 className="text-2xl font-semibold leading-none tracking-[-0.04em] text-[#102033] sm:text-3xl">Office Process Assessment</h3>
                <div className="mt-3 flex items-end gap-2 sm:mt-5 sm:block">
                  <p className="text-[3.25rem] font-semibold leading-none tracking-[-0.07em] text-[#071D3A] sm:text-[4.6rem]">$97</p>
                  <p className="mb-1 flex-1 whitespace-nowrap rounded-full bg-[#E7F7EB] px-2 py-1.5 text-center text-[0.7rem] font-extrabold leading-4 text-[#116832] sm:hidden">
                    $194 credit toward your Sprint
                  </p>
                </div>
                <div className="mt-3 sm:hidden">
                  <CheckoutButton pkg={assessment} label="Get the Office Process Assessment" location="cash_flow_assessment_pricing_mobile_top" className="w-full min-w-0 bg-[#15803D] px-5 py-3 text-sm text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" />
                </div>
                <p className="mt-3 text-sm font-bold leading-6 text-[#334B60] sm:mt-4 sm:text-base sm:leading-7">
                  You get the leak, the cost, the fix list, and the first move to make.
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {deliverables.map(([title, body], index) => (
                    <div key={title} className="rounded-[1rem] border border-[#DDEBE2] bg-[#FBFCF7] p-3 sm:rounded-[1.15rem] sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#E7F7EB] text-[0.68rem] font-black text-[#116832] sm:h-8 sm:w-8 sm:text-xs">{index + 1}</span>
                        <div>
                          <h4 className="text-[0.82rem] font-extrabold leading-4 tracking-[-0.015em] text-[#102033] sm:text-base sm:leading-6 sm:tracking-normal">{title}</h4>
                          <p className="mt-1 hidden text-sm font-semibold leading-6 text-[#536173] sm:block">{body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden border-t border-[#DDEBE2] bg-[#FBFCF7] px-6 py-5 sm:block sm:px-7">
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <p className="rounded-full bg-[#E7F7EB] px-4 py-2 text-center text-sm font-extrabold text-[#116832]">
                  $194 assessment credit counts toward your Sprint.
                </p>
                <CheckoutButton pkg={assessment} label="Get the Office Process Assessment" location="cash_flow_assessment_pricing_primary" className="bg-[#15803D] px-8 py-4 text-base text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function SprintBridge() {
  return (
    <section data-section="cash-flow-assessment-sprint-bridge" className="bg-white py-12 sm:py-14">
      <div className={`${shell} text-center`}>
        <h2 className="mx-auto max-w-4xl text-[2.25rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Want Stanley Systems to build the plan for you?</h2>
        <div className="mt-7 flex justify-center">
          <Link href="/systems-installation-sprint" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]">See how the Sprint works <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    ["Schedule", "We email and call you to schedule the assessment."],
    ["Share your office flow", "We review your calls, estimates, invoices, follow-up, reviews, referrals, and repeat work."],
    ["Find the stuck money", "The report shows what is costing money and which fix comes first."],
    ["Choose the path", "Fix it yourself, or use the report as the plan for your Installation Sprint."],
  ]

  return (
    <section id="proof" data-section="cash-flow-assessment-how-it-works" className="bg-white py-12 sm:py-14">
      <div className={shell}>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="rounded-[1.8rem] bg-[#071D3A] p-6 text-white shadow-[0_26px_70px_rgba(7,29,58,0.18)] sm:p-7">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#8EE6A3]">After checkout</p>
            <h2 className="mt-3 text-[2.2rem] font-semibold leading-[1] tracking-[-0.045em] sm:text-5xl">What happens after you start</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-[#D8E5DC]">
              Stanley Systems turns your current office flow into a clear money-leak report and first-fix plan.
            </p>
            <div className="mt-6 rounded-2xl border border-white/15 bg-white/8 p-4 text-sm font-bold leading-6 text-[#ECF7EF]">
              No passwords. Temporary access only if needed. You can remove access any time.
            </div>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2">
            {steps.map(([title, body], index) => (
              <li key={title} className="rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_12px_28px_rgba(7,29,58,0.04)]">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E7F7EB] text-sm font-black text-[#116832]">{index + 1}</span>
                  <h3 className="text-xl font-semibold tracking-[-0.015em] text-[#102033]">{title}</h3>
                </div>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#536173]">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function NextSteps() {
  const questions = [
    ["What happens after I buy?", "After checkout, Stanley Systems will email and call you to schedule the assessment intake. You’ll walk through how calls, estimates, invoices, payments, follow-up, reviews, referrals, and repeat work move through your office. Then Stanley Systems reviews the records and sends your money-leak report, workflow map, fix list, and build priorities."],
    ["Do I need to share passwords?", "No. Do not send passwords. A temporary invited user is usually the fastest way for Stanley Systems to review accurate records, but you can start with a screen share, exports, or screenshots. You control what is shared and can remove access at any time."],
    ["Does this replace my current software?", "No. Stanley Systems looks at the handoffs around the tools you already use."],
    ["Will I talk to a real person?", "Yes. The assessment is reviewed by Stanley Systems before a recommendation is made."],
    ["What happens after the assessment?", "You get the map, the problems Stanley Systems identified, how each one should be fixed, the expected results, and what should be fixed first. If you buy the Sprint, your $194 assessment credit comes off the build price."],
    ["What if I already know what I want?", "You can still get the Office Process Assessment to confirm the full fix list before installation, or talk before buying if you need a quick route check."],
  ]

  return (
    <>
      <section data-section="cash-flow-assessment-faq" className="bg-white py-12 sm:py-14">
        <div className={`${shell} max-w-5xl`}>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <h2 className="text-[2.15rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-4xl">Assessment questions</h2>
              <div className="mt-5 rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#102033]">Talk before buying</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">If you need a quick route check before paying, call or ask a question. Keep the diagnosis inside the assessment.</p>
                <div className="mt-4 flex flex-col gap-2 text-sm font-extrabold sm:flex-row lg:flex-col">
                  <a href="tel:+16179586372" className="text-[#116832] underline underline-offset-4">Talk before buying</a>
                  <Link href="/contact?path=pre-buy" className="text-[#116832] underline underline-offset-4">Ask a question</Link>
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
        <AssessmentDemoVideo />
        <AssessmentPricing />
        <HowItWorks />
        <NextSteps />
        <SprintBridge />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  )
}
