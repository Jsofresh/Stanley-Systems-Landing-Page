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
    "See what Stanley Systems checks in the $97 Cash Flow Assessment, what you receive, and how the assessment credit works if Stanley Systems builds the fix.",
  alternates: { canonical: "https://stanley-systems.com/how-the-assessment-works" },
}

function AssessmentCheckout({ location, className = greenButton, children = "Start the $97 Assessment" }: { location: string; className?: string; children?: ReactNode }) {
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
      ctaLabel={typeof children === "string" ? children : "Start the $97 Assessment"}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </CTALink>
  )
}

const whatWeCheck = [
  ["Calls and requests", "Are good leads getting written down, called back, booked, or forgotten?"],
  ["Estimates and open jobs", "Which estimates are sitting too long, and which jobs need a clear next step?"],
  ["Invoices and payment follow-up", "Where is finished work waiting on office work before cash gets collected?"],
  ["Reviews, referrals, and past customers", "Are happy customers being asked for more business, or disappearing after the first job?"],
  ["Office handoffs", "Where does work slow down because the next person does not have the right information?"],
]

const processSteps = [
  ["1", "You show how the office works now.", "We review calls, estimates, invoices, follow-up, reviews, referrals, and past-customer outreach. A walkthrough is enough to start. No passwords needed."],
  ["2", "Stanley Systems finds where money gets missed.", "The review looks for delays, forgotten follow-up, missing records, open estimates, late invoices, weak review asks, and past customers nobody contacts again."],
  ["3", "You get the fix list and the first fix recommendation.", "The assessment tells you what is broken, what it is likely costing, how each problem should be fixed, and which fix should happen first."],
]

const deliverables = [
  "Office-side leak map",
  "Fix list for every problem found",
  "Likely payoff of each fix",
  "First fix recommendation",
]

const faqs = [
  ["Is this just a sales call?", "No. The Cash Flow Assessment is the paid product. You are buying the leak map, fix list, expected results, and first fix recommendation."],
  ["Do I need to change software first?", "No. Stanley Systems starts by looking at the tools and records you already use. The assessment finds the office gaps around those tools."],
  ["Do I need to send passwords?", "No. No passwords needed. A walkthrough, screen share, export, screenshots, or a temporary invited user can be used if records are needed."],
  ["What happens if Stanley Systems builds the fix?", "If Stanley Systems builds the recommended fix, your $97 assessment fee turns into a $194 credit toward installation."],
]

export default function HowAssessmentWorksPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-[#FBFCF7] text-[#071D3A] [word-spacing:0.04em] sm:[word-spacing:normal]">
        <section data-section="assessment-how-hero" className="relative overflow-hidden pb-12 pt-32 sm:pb-16 lg:pt-36">
          <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_70%)]" aria-hidden="true" />
          <div className={`${shell} relative grid gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center`}>
            <div className="text-center lg:text-left">
              <h1 className="mx-auto max-w-5xl text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.01em] sm:text-[3.55rem] sm:tracking-[-0.04em] lg:mx-0 lg:text-[4.35rem]">
                Before you buy a system, find the office leaks costing you money.
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#334B60] sm:text-xl lg:mx-0">
                The $97 Cash Flow Assessment shows what is broken, what it is likely costing, how to fix each problem, and which fix should happen first.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <AssessmentCheckout location="how_assessment_hero_primary">
                  Start the $97 Assessment <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </AssessmentCheckout>
                <Link href="/invoicing-delay-cash-flow-calculator" className={lightButton}>Estimate leaks first</Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#BFE4C8] bg-white p-6 shadow-[0_24px_70px_rgba(21,128,61,0.12)] sm:p-8">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Included in the $97 assessment</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.01em] text-[#102033] sm:text-4xl sm:tracking-[-0.04em]">A clear breakdown of the money leaks in the office.</h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">
                Not a vague consultation. Not a software pitch. The assessment gives you the map of what is getting missed, delayed, or left untouched.
              </p>
              <ul className="mt-6 grid gap-3 text-sm font-bold leading-6 text-[#334B60] sm:grid-cols-2">
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803D]" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section data-section="assessment-how-checks" className="bg-white py-14 sm:py-16">
          <div className={shell}>
            <div className="grid gap-4 border-b border-[#DDEBE2] pb-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
              <h2 className="text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.01em] text-[#071D3A] sm:text-5xl sm:tracking-[-0.04em]">What Stanley Systems checks</h2>
              <p className="max-w-2xl text-base leading-7 text-[#536173] sm:text-lg lg:justify-self-end">
                The assessment follows the path money takes through a service business: from first call to paid invoice, review, referral, and repeat customer.
              </p>
            </div>
            <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-6">
              {whatWeCheck.map(([title, body], index) => (
                <article
                  key={title}
                  className={`rounded-[1.35rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_12px_30px_rgba(7,29,58,0.035)] ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E7F7EB] text-xs font-black text-[#116832]">{index + 1}</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.005em] text-[#102033] sm:tracking-[-0.03em]">{title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">{body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-section="assessment-how-process" className="bg-[#F4FBF5] py-14 sm:py-16">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.01em] text-[#071D3A] sm:text-5xl sm:tracking-[-0.04em]">How the assessment works</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
                You show how calls, estimates, invoices, and follow-up work today. Stanley Systems finds the leaks and tells you what to fix first.
              </p>
            </div>
            <ol className="mx-auto mt-8 grid max-w-6xl gap-4 lg:grid-cols-3">
              {processSteps.map(([number, title, body]) => (
                <li key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_14px_36px_rgba(7,29,58,0.045)]">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#E7F7EB] text-sm font-black text-[#116832]">{number}</span>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.005em] text-[#102033] sm:tracking-[-0.035em]">{title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section data-section="assessment-how-output" className="bg-white py-14 sm:py-16">
          <div className={`${shell} grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center`}>
            <div>
              <h2 className="text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.01em] text-[#071D3A] sm:text-5xl sm:tracking-[-0.04em]">You leave knowing what to fix first.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
                Most owners already feel something is leaking. The assessment turns that feeling into a practical fix list: what is broken, what it costs, what should change, and which fix should happen first.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <AssessmentCheckout location="how_assessment_output_primary" />
                <Link href="/workflow-audit#assessment" className={lightButton}>Review the $97 details</Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#BFE4C8] bg-[#F4FBF5] p-6 shadow-[0_20px_60px_rgba(7,29,58,0.06)] sm:p-7">
              <h3 className="text-2xl font-semibold tracking-[-0.005em] text-[#102033] sm:tracking-[-0.035em]">If Stanley Systems builds the recommended fix</h3>
              <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">
                Your $97 assessment fee turns into a $194 credit toward installation. The assessment shows which system improvement should come first instead of guessing or buying the wrong thing.
              </p>
            </div>
          </div>
        </section>

        <section data-section="assessment-how-faq" className="bg-[#FBFCF7] py-14 sm:py-16">
          <div className={`${shell} max-w-5xl`}>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
              <div>
                <h2 className="text-[2.05rem] font-semibold leading-[1.04] tracking-[-0.01em] text-[#071D3A] sm:text-4xl sm:tracking-[-0.04em]">Common questions before you start</h2>
                <p className="mt-4 text-base leading-7 text-[#536173]">If you already suspect missed follow-up, slow invoicing, or messy handoffs are costing money, the assessment gives you the fix list without another vague sales call.</p>
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
            <div className="mt-8 rounded-[1.6rem] border border-[#BFE4C8] bg-white p-6 text-center shadow-[0_18px_52px_rgba(7,29,58,0.055)]">
              <h2 className="text-3xl font-semibold tracking-[-0.01em] text-[#102033] sm:tracking-[-0.04em]">Start with the $97 assessment.</h2>
              <p className="mx-auto mt-3 max-w-2xl text-base font-semibold leading-7 text-[#536173]">Stanley Systems will find the office-side leaks, show the fix list, and tell you which fix should happen first.</p>
              <div className="mt-5 flex justify-center">
                <AssessmentCheckout location="how_assessment_final_primary">
                  Start the $97 Assessment <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
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
