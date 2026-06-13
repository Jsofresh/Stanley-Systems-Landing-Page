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
  title: "How the AI Office Map Works | Stanley Systems",
  description:
    "See where office work is slowing down cash, customers, and follow-up before fixing the wrong thing.",
  alternates: { canonical: "https://stanley-systems.com/how-the-assessment-works" },
}

function AssessmentCheckout({ location, className = greenButton, children = "Book the AI Office Map" }: { location: string; className?: string; children?: ReactNode }) {
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
      ctaLabel={typeof children === "string" ? children : "Book the AI Office Map"}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </CTALink>
  )
}

const trustBullets = [
  "No passwords needed",
  "Screen share can work",
  "Exports or screenshots can help",
  "Best available records are enough",
  "Your current tools stay in place",
  "We look at the handoffs around your tools",
]

const timeline = [
  {
    title: "Start the AI Office Map",
    body: "You start the paid AI Office Map. This is a real review of your office workflow, not a generic sales call.",
  },
  {
    title: "Show how the office works now",
    body: "Stanley Systems reviews how calls, estimates, invoices, customer records, payment follow-up, reviews, referrals, and past customers are handled today.",
    note: "You stay in control: any access needed for the AI Office Map is temporary, used only for the review, and removable by you at any time.",
  },
  {
    title: "Stanley Systems finds where money is getting stuck",
    body: "We look for the office handoffs that cause missed follow-up, slow billing, lost repeat work, unpaid invoices, weak reviews, and jobs that need too much manual chasing.",
  },
  {
    title: "You receive the map",
    body: "You get a clear map of where money is getting stuck, what each problem is costing, what should be fixed, and what each fix is expected to improve.",
  },
]

const deliverables = [
  ["Fix list and AI plays", "Concrete prompts, workflow changes, tool guidance, and quick wins your team can use after the Map."],
  ["Problem list", "The places where money, time, customers, or follow-up are slipping through the cracks."],
  ["Cost of each issue", "A plain-English look at what each problem may be costing your business."],
  ["Fix priority", "What should be fixed first, what can wait, and what is not worth overbuilding."],
  ["Build plan if you want help", "If you do not want to build it yourself, Stanley Systems can use the AI Office Map to scope the Installation Sprint."],
]

const faqs = [
  ["Do I need to know the exact problem first?", "No. You only need to show how your office handles calls, estimates, invoices, follow-up, customer records, reviews, and past customers today. Stanley Systems looks for the problems from there."],
  ["Do I need perfect reports or clean data?", "No. Best available records are enough. Screen shares, screenshots, exports, or walkthroughs can all help."],
  ["Do I need to share passwords?", "No. Do not send passwords. A temporary invited user is usually the fastest way for Stanley Systems to review accurate records, but you can start with a screen share, exports, or screenshots. You control what is shared and can remove access at any time."],
  ["Is this a software replacement?", "No. Stanley Systems looks at the handoffs around the tools you already use. The goal is to find where money, customers, and follow-up are getting stuck."],
  ["What if I want Stanley Systems to build the fixes?", "$197 is credited toward your AI Office Installation Sprint when you move forward."],
]

function SprintBridge() {
  return (
    <section data-section="assessment-how-sprint-bridge" className="bg-[#F4FBF5] py-12 sm:py-14">
      <div className={`${shell} grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
        <div>
          <h2 className="text-[2.05rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Want Stanley Systems to build it for you?</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            The AI Office Map turns office drag into fixes, prompts, tool guidance, and an install priority. The Sprint builds the best opportunity: faster billing readiness, cleaner follow-up, practical workflows, staff training, and your company playbook.
          </p>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#536173] sm:text-base">
            Use the AI Office Map to fix the problems yourself, or use it as the build plan for the Sprint.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/systems-installation-sprint" className={greenButton}>See how the Sprint works <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        </div>
        <div className="rounded-[1.6rem] border border-[#BFE4C8] bg-white p-6 shadow-[0_14px_36px_rgba(7,29,58,0.045)]">
          <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">After the AI Office Map, you have two clean paths</h3>
          <ul className="mt-4 grid gap-3 text-sm font-bold leading-6 text-[#334B60]">
            <li>Use the map to fix the problems yourself.</li>
            <li>Use the map as the build plan for Stanley Systems to install the systems.</li>
          </ul>
          <p className="mt-5 rounded-2xl border border-[#CFE8D5] bg-[#F4FBF5] p-4 text-sm font-extrabold leading-6 text-[#116832]">
            $197 credited toward your AI Office Installation Sprint when you move forward.
          </p>
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
                How the AI Office Map Works
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#334B60] sm:text-xl lg:mx-0">
                See where your office work is slowing down cash, customers, and follow-up before you spend money fixing the wrong thing.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#536173] sm:text-lg lg:mx-0">
                Stanley Systems reviews the office work behind your jobs — calls, customer reactivation, follow-up, estimates, invoices, billing, payment reminders, and Google reviews. You get a clear map of where money is getting stuck, what it is costing your business, and what to fix first.
              </p>
              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <AssessmentCheckout location="how_assessment_hero_primary">
                  Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </AssessmentCheckout>
                <a href="#assessment-output" className={lightButton}>See what you get</a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#BFE4C8] bg-white p-6 shadow-[0_24px_70px_rgba(21,128,61,0.12)] sm:p-8">
              <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#102033]">You do not need perfect data</h2>
              <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">
                You do not need clean reports, perfect records, or a finished process before starting. Stanley Systems can work from the best information you have.
              </p>
              <ul className="mt-6 grid gap-3 text-sm font-bold leading-6 text-[#334B60] sm:grid-cols-2">
                {trustBullets.map((item) => <li key={item} className="rounded-xl bg-[#F4FBF5] p-3">{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section data-section="assessment-how-process" className="bg-white py-12 sm:py-14">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">What happens after you start</h2>
            </div>
            <ol className="mx-auto mt-8 grid max-w-6xl gap-4 lg:grid-cols-4">
              {timeline.map((step, index) => (
                <li key={step.title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 shadow-[0_14px_36px_rgba(7,29,58,0.045)]">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#E7F7EB] text-sm font-black text-[#116832]">{index + 1}</span>
                  <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.035em] text-[#102033]">{step.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{step.body}</p>
                  {step.note ? <p className="mt-3 rounded-xl bg-white p-3 text-xs font-bold leading-5 text-[#536173] ring-1 ring-[#DDEBE2]">{step.note}</p> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="assessment-output" data-section="assessment-how-output" className="bg-[#FBFCF7] py-12 sm:py-14">
          <div className={`${shell} grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start`}>
            <div>
              <h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">What you get from the AI Office Map</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
                The AI Office Map gives you a clear Stanley Systems fix plan: staff AI prompts, workflow changes, tool guidance, quick wins, company playbook gaps, and the first workflow worth installing.
              </p>
              <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.14em] text-[#15803D]">You receive:</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {deliverables.map(([title, body]) => <div key={title} className="rounded-[1.2rem] border border-[#DDEBE2] bg-white p-4 shadow-[0_10px_24px_rgba(7,29,58,0.035)]"><h3 className="text-base font-extrabold leading-6 text-[#102033]">{title}</h3><p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">{body}</p></div>)}
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
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#102033]">Ready to find where the office work is costing you money?</h2>
              <div className="mt-5 flex justify-center">
                <AssessmentCheckout location="how_assessment_final_primary">
                  Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
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
