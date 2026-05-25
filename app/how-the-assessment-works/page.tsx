import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { ReactNode } from "react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const assessment = pricingPackageById.workflow_audit
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

export const metadata: Metadata = {
  title: "How the Cash Flow Assessment Works | Stanley Systems",
  description:
    "See what happens after you buy the $97 Cash Flow Assessment, what information is needed, and what you receive.",
  alternates: { canonical: "https://stanley-systems.com/how-the-assessment-works" },
}

function AssessmentCheckout({ location, className = greenButton, children = "Start the Cash Flow Assessment" }: { location: string; className?: string; children?: ReactNode }) {
  return (
    <CTALink
      href={assessment.stripePaymentLink.url}
      kind="checkout"
      location={location}
      analyticsEvent="audit_checkout_clicked"
      analyticsSource="how_the_assessment_works_page"
      packageId={assessment.analyticsPackageId}
      packageName={assessment.publicName}
      billingPeriod="one_time"
      ctaLabel={typeof children === "string" ? children : "Start the Cash Flow Assessment"}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </CTALink>
  )
}

const timeline = [
  ["1", "Buy the assessment", "You start the paid Cash Flow Assessment. It is the product, not a pretext for a sales call."],
  ["2", "Share how the office works", "A walkthrough, screen share, exports, screenshots, or temporary invited access can be used. Do not send passwords."],
  ["3", "Stanley Systems reviews the money path", "Calls, estimates, jobs, invoices, payment follow-up, reviews, referrals, past customers, and office handoffs get checked."],
  ["4", "Receive the map", "You get what is broken, what it likely costs, how to fix it, and what should be worked on first."],
]
const prep = ["No passwords needed", "Best available records are enough", "Screen share can work", "Exports or screenshots can help", "Your current tools stay in place"]
const deliverables = ["Office-side leak map", "Fix list for every problem found", "Likely payoff of each fix", "Build priorities", "Sprint bridge if you want Stanley Systems to build"]
const faqs = [
  ["Do I need to know the exact problem first?", "No. You only need to show how calls, estimates, invoices, follow-up, and customer records work today."],
  ["Do I need to share passwords?", "No. Do not send passwords. Use screen share, exports, screenshots, or temporary invited access if records are needed."],
  ["Is this a software replacement?", "No. Stanley Systems looks at the handoffs around the tools you already use."],
  ["What if I want Stanley Systems to build it?", "If you move forward with the Sprint, your $97 assessment counts as a $194 credit."],
]

function SprintBridge() {
  return (
    <section data-section="assessment-how-sprint-bridge" className="bg-[#F4FBF5] py-12 sm:py-14">
      <div className={`${shell} grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
        <div>
          <h2 className="text-[2.05rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Want Stanley Systems to build it for you?</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">The Cash Flow Assessment gives the map: what is broken, what it likely costs, how to fix it, and what should be worked on first. If you want Stanley Systems to install the systems instead of doing it yourself, the Systems Installation Sprint is the next step.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/systems-installation-sprint" className={greenButton}>See how the Sprint works <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        </div>
        <div className="rounded-[1.6rem] border border-[#BFE4C8] bg-white p-6 shadow-[0_14px_36px_rgba(7,29,58,0.045)]">
          <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Two clean paths after the assessment</h3>
          <ul className="mt-4 grid gap-3 text-sm font-bold leading-6 text-[#334B60]">
            <li>Use the assessment to fix the problems yourself.</li>
            <li>Use it as the build plan for the Sprint.</li>
            <li>The Sprint can include Cashflow Control, Repeat Revenue, both, or a scoped mix.</li>
            <li>Your assessment can count as a $194 credit toward the Sprint.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function HowAssessmentWorksPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
        <section data-section="assessment-how-hero" className="relative overflow-hidden pb-12 pt-32 sm:pb-14 lg:pt-36">
          <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_70%)]" aria-hidden="true" />
          <div className={`${shell} relative grid gap-8 lg:grid-cols-[0.98fr_1.02fr] lg:items-center`}>
            <div className="text-center lg:text-left">
              <h1 className="mx-auto max-w-5xl text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-[3.55rem] lg:mx-0 lg:text-[4.2rem]">
                What happens after you start the Cash Flow Assessment.
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#334B60] sm:text-xl lg:mx-0">
                This page is for reducing friction before you buy: what Stanley Systems needs, what happens next, and what you receive.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <AssessmentCheckout location="how_assessment_hero_primary">
                  Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </AssessmentCheckout>
                <Link href="/workflow-audit" className={lightButton}>See assessment details</Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#BFE4C8] bg-white p-6 shadow-[0_24px_70px_rgba(21,128,61,0.12)] sm:p-8">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#102033]">You do not need perfect data.</h2>
              <ul className="mt-6 grid gap-3 text-sm font-bold leading-6 text-[#334B60] sm:grid-cols-2">
                {prep.map((item) => <li key={item} className="rounded-xl bg-[#F4FBF5] p-3">{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section data-section="assessment-how-process" className="bg-white py-12 sm:py-14">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">The assessment timeline</h2>
            </div>
            <ol className="mx-auto mt-8 grid max-w-6xl gap-4 lg:grid-cols-4">
              {timeline.map(([number, title, body]) => (
                <li key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 shadow-[0_14px_36px_rgba(7,29,58,0.045)]">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#E7F7EB] text-sm font-black text-[#116832]">{number}</span>
                  <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.035em] text-[#102033]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section data-section="assessment-how-output" className="bg-[#FBFCF7] py-12 sm:py-14">
          <div className={`${shell} grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center`}>
            <div>
              <h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">What you receive</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
                The assessment gives you a practical map your business can use whether you fix the problems yourself or ask Stanley Systems to build from the plan.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {deliverables.map((item) => <div key={item} className="rounded-[1.2rem] border border-[#DDEBE2] bg-white p-4 text-sm font-bold leading-6 text-[#334B60] shadow-[0_10px_24px_rgba(7,29,58,0.035)]">{item}</div>)}
            </div>
          </div>
        </section>

        <SprintBridge />

        <section data-section="assessment-how-faq" className="bg-white py-12 sm:py-14">
          <div className={`${shell} max-w-5xl`}>
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div>
                <h2 className="text-[2.05rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-4xl">Common questions before you start</h2>
              </div>
              <div className="grid gap-3">
                {faqs.map(([question, answer]) => (
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
            <div className="mt-8 rounded-[1.6rem] border border-[#BFE4C8] bg-[#F4FBF5] p-6 text-center shadow-[0_18px_52px_rgba(7,29,58,0.055)]">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#102033]">Ready to start?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-base font-semibold leading-7 text-[#536173]">Stanley Systems will find the office-side leaks, show the fix list, and tell you what should be worked on first.</p>
              <div className="mt-5 flex justify-center">
                <AssessmentCheckout location="how_assessment_final_primary">
                  Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </AssessmentCheckout>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
