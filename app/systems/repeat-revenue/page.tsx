import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const monthlyPlan = pricingPackageById.repeat_revenue_monthly
const yearlyPlan = pricingPackageById.repeat_revenue_yearly
const workflowAudit = pricingPackageById.workflow_audit

const packageScopeNote =
  "Buying this package starts onboarding and implementation intake. Stanley Systems confirms fit, access, tool constraints, data quality, and first implementation scope before work proceeds. If the selected package is not the right fit, Stanley Systems may redirect, pause until required access is available, propose custom scope, or refund before implementation begins."

const repeatScopeLine =
  "Repeat Revenue System helps past customers, reviews, referrals, and missed calls stay visible so the next step is easier to follow. It does not guarantee new customers, review volume, review ratings, search rankings, platform approvals, or unlimited custom outreach work."

export const metadata: Metadata = {
  title: "Repeat Revenue System | Stanley Systems",
  description:
    "Repeat Revenue System helps service businesses bring past customers, review requests, referrals, and missed calls back into a practical office follow-up path.",
  alternates: {
    canonical: "https://stanley-systems.com/systems/repeat-revenue",
  },
  openGraph: {
    title: "Repeat Revenue System | Stanley Systems",
    description:
      "A practical repeat revenue system for service businesses that need past customers, referrals, reviews, and missed calls to stay visible.",
    url: "https://stanley-systems.com/systems/repeat-revenue",
    siteName: "Stanley Systems",
    type: "website",
  },
}

const fixes = [
  "Every good job should create the next one.",
  "1-3 star private ratings need manager follow-up before they become public problems.",
  "4-5 star customers should be routed toward Google reviews and referral asks.",
  "Past customers, old estimates, seasonal buyers, and dormant customers should be reactivated.",
  "Past customers nobody has reached back out to after the first job.",
  "Happy customers who are never asked for a review while the work is still fresh.",
  "Referral opportunities that depend on the owner remembering to ask.",
  "Missed or after-hours inquiries that turn into forgotten callbacks and cold leads.",
]

const beforeAfter = [
  ["Before", "Good jobs end quietly. Ratings, reviews, referrals, old estimates, seasonal buyers, and missed calls all depend on memory.", "#B42318", "#fff5f5", "#edd6d8"],
  ["After", "Completed jobs feed a repeat revenue cycle: private rating, review routing, referral asks, reactivation, and missed-call recovery.", "#116832", "#eef9f2", "#bfe4c8"],
]

const flywheelSteps = [
  "Job complete",
  "Private 1-5 rating",
  "1-3 stars to managers",
  "4-5 stars to Google review path",
  "Best customers get referral asks",
  "Past buyers and missed calls reactivated",
]

function RepeatRevenueMechanismVisual() {
  return (
    <section className="rounded-[2rem] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
      <SectionHeader
        title="Every good job should create the next one."
        copy="Repeat Revenue System turns completed jobs, happy customers, referrals, reviews, missed calls, and past buyers into a cycle."
      />
      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        {beforeAfter.map(([label, copy, color, bg, border]) => (
          <article key={label} className="rounded-[1.35rem] border p-5" style={{ borderColor: border, backgroundColor: bg }}>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em]" style={{ color }}>{label}</p>
            <p className="mt-3 text-lg font-semibold leading-7 text-[#102033]">{copy}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 rounded-[1.35rem] border border-[#cfe8d5] bg-[#f4fbf5] p-4">
        <p className="text-sm font-bold text-[#116832]">Mechanism</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {flywheelSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-[#dfe7ee] bg-white p-4 shadow-[0_10px_24px_rgba(16,32,51,0.04)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#15803D] text-xs font-black text-white">{index + 1}</span>
              <p className="mt-3 text-sm font-extrabold leading-5 text-[#102033]">{step}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-2xl border border-[#bfe4c8] bg-white p-4 text-sm font-semibold leading-6 text-[#102033]">
          Reviews and referrals improve trust and Google visibility. More visibility creates more inbound volume. Missed-call recovery turns that volume back into follow-up and booked work, then the cycle repeats.
        </p>
      </div>
      <p className="mt-5 rounded-2xl border border-[#e4ded3] bg-[#fbfaf7] p-4 text-sm font-semibold leading-6 text-[#536173]">
        Scenario math, not a guarantee: if 500 past customers include 25 ready buyers at a $1,200 average job, that is a $30,000 opportunity worth checking before buying more cold leads.
      </p>
    </section>
  )
}

const baseAutomations = [
  ["A", "Private 1-5 Rating", "A private post-job rating routes 1-3 stars to managers and 4-5 stars toward review and referral paths."],
  ["B", "Review Booster", "A steady Google review-request step after good work is complete, without promising review volume or ratings."],
  ["C", "Referral Engine", "A simple referral ask for the best customers while the job is still fresh."],
  ["D", "Reactivation and Missed-Call Recovery", "Past customers, old estimates, seasonal buyers, dormant records, and missed inquiries get brought back into follow-up."],
]

const setupItems = [
  "Map how past customers, reviews, referrals, and missed inquiries currently move through the office.",
  "Confirm the customer records, booking tools, review links, contact methods, and handoff rules Stanley Systems can safely build around.",
  "Keep the business main number unchanged while adding the after-hours intake path around the existing customer contact flow.",
  "Separate base implementation from upgrades such as extra campaigns, deeper data cleanup, custom segmentation, advanced reporting, or extra locations.",
  "Review fit, access, and scope before implementation begins after checkout.",
]

const bestFit = [
  "Service businesses with an existing customer list worth checking before buying more cold leads.",
  "Teams that finish good work but do not consistently ask for reviews, referrals, or repeat bookings.",
  "Owners who miss calls or after-hours inquiries and need a cleaner office follow-up path.",
  "Businesses that want practical follow-up infrastructure without changing their main number or replacing their whole software stack first.",
]

const excludedItems = [
  "No promised new customers, review volume, review ratings, search rankings, platform approvals, or ad performance.",
  "No call center, sales team replacement, reputation-management agency, or unlimited custom outreach work.",
  "No public backend/tool promises, no custom phone-provider claims, and no requirement to change the business main number.",
  "No upgrades are included unless they are separately scoped in writing before implementation proceeds.",
]

const faqs = [
  {
    question: "Will Repeat Revenue System promise more customers or reviews?",
    answer:
      "No. It helps past customers, review requests, referrals, and missed calls stay visible so the next step is easier to follow. It does not promise new customers, review volume, review ratings, search rankings, platform approvals, or customer behavior.",
  },
  {
    question: "Will this change my main business number?",
    answer:
      "No. The base setup keeps the main number unchanged and adds the After-Hours Intake Assistant around the existing customer contact flow. Any deeper phone-system change would need separate written scope.",
  },
  {
    question: "What is included in the base system?",
    answer:
      "The base system includes four practical automations: Smart Re-Engagement, Review Booster, Referral Engine, and After-Hours Intake Assistant. Extra campaigns, complex list cleanup, advanced reporting, multi-location logic, or unusual integrations are upgrades that must be scoped separately.",
  },
  {
    question: "Do I need the Workflow Audit first?",
    answer:
      "No. You can buy Repeat Revenue directly. The Workflow Audit is the safer first step if you are not sure whether the bigger leak is billing, repeat revenue, both, or neither.",
  },
  {
    question: "What happens after I buy?",
    answer:
      "Checkout starts onboarding and implementation intake. Stanley Systems reviews fit, access, tools, data quality, and scope before implementation proceeds, then may refund, redirect, pause, or propose custom scope before work begins if the fit is not right.",
  },
  {
    question: "Will this replace my booking, CRM, or review platform?",
    answer:
      "No. The goal is to build a cleaner follow-up path around the tools your business already uses, not force a full software migration.",
  },
]

function SectionHeader({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#102033] sm:text-5xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-[#536173] sm:text-lg">{copy}</p>
    </div>
  )
}

function PrimaryCTACluster({ location }: { location: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <CTALink
        href={monthlyPlan.stripePaymentLink.url}
        kind="checkout"
        location={`${location}_repeat_revenue_monthly`}
        analyticsEvent="package_checkout_clicked"
        analyticsSource="repeat_revenue_page"
        packageId={monthlyPlan.analyticsPackageId}
        packageName={monthlyPlan.publicName}
        billingPeriod={monthlyPlan.billingPeriod}
        ctaLabel="Buy Repeat Revenue"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:bg-[#116832]"
      >
        Buy Repeat Revenue
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </CTALink>
      <CTALink
        href={workflowAudit.stripePaymentLink.url}
        kind="checkout"
        location={`${location}_workflow_audit`}
        analyticsEvent="audit_checkout_clicked"
        analyticsSource="repeat_revenue_page"
        packageId="workflow_audit"
        packageName="Workflow Audit"
        billingPeriod="one_time"
        ctaLabel="Start with Workflow Audit"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbd8c7] bg-white px-6 py-3 text-sm font-bold text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] transition hover:border-[#15803D] hover:bg-[#f7fcf7]"
      >
        Start with Workflow Audit
      </CTALink>
    </div>
  )
}

export default function RepeatRevenuePage() {
  return (
    <>
      <GlassmorphismNav />
      <main className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#102033]">
        <section className="relative px-4 pb-12 pt-32 sm:px-6 sm:pb-16 lg:px-8 lg:pt-36">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.72fr)] lg:items-center">
            <div>
              <h1 className="max-w-4xl text-[3rem] font-semibold leading-[0.96] tracking-[-0.055em] text-[#071421] sm:text-[4.5rem] lg:text-[5.25rem]">
                Get more money from the customers you already earned.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#455467] sm:text-xl">
                Repeat Revenue System builds the follow-up path that brings past customers, review requests, referrals, and missed calls back into view inside the tools your team already uses.
              </p>
              <div className="mt-7">
                <PrimaryCTACluster location="repeat_revenue_hero" />
              </div>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#607080]">
                {packageScopeNote}
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#d8e5dd] bg-white p-5 shadow-[0_24px_70px_rgba(16,32,51,0.1)] sm:p-6">
              <div className="rounded-[1.5rem] border border-[#bfe4c8] bg-[#eef9f2] p-4">
                <p className="text-sm font-bold text-[#116832]">Repeat Revenue Monthly</p>
                <p className="mt-2 text-[2.5rem] font-semibold tracking-[-0.05em] text-[#102033]">{monthlyPlan.priceDisplay}</p>
                <p className="text-sm font-semibold leading-6 text-[#536173]">{monthlyPlan.setupFeeDisplay} at checkout. Audit buyers can use the monthly audit credit.</p>
              </div>
              <div className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-[#26374b]">
                <div className="flex items-start gap-2 rounded-2xl border border-[#e0e8ef] bg-[#f8fbfc] p-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" />
                  Past customer, review, referral, and missed-inquiry follow-up.
                </div>
                <div className="flex items-start gap-2 rounded-2xl border border-[#e0e8ef] bg-[#f8fbfc] p-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" />
                  After-Hours Intake Assistant with the main number unchanged.
                </div>
                <div className="flex items-start gap-2 rounded-2xl border border-[#e0e8ef] bg-[#f8fbfc] p-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" />
                  Yearly option: {yearlyPlan.priceDisplay} with installation waived.
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 sm:px-6 lg:px-8">
          <RepeatRevenueMechanismVisual />

          <section className="rounded-[2rem] border border-[#e4ded3] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
            <SectionHeader title="The repeat revenue leaks it is built to fix." copy="Repeat Revenue System is for follow-up opportunities after the business has already earned attention, trust, or a customer record." />
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {fixes.map((fix) => (
                <div key={fix} className="flex gap-3 rounded-2xl border border-[#dfe7ee] bg-[#f8fbfc] p-4 text-sm font-semibold leading-6 text-[#26374b]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                  <span>{fix}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
            <SectionHeader title="Included base automations A-D." copy="The build is practical office follow-up infrastructure, not a promise of customers, reviews, rankings, or unlimited custom outreach." />
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {baseAutomations.map(([letter, title, body]) => (
                <article key={letter} className="rounded-2xl border border-[#e2e8ef] bg-[#fbfcfd] p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-sm font-black text-white">{letter}</span>
                    <div>
                      <h3 className="text-base font-bold text-[#102033]">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#536173]">{body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="rounded-[2rem] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#102033] sm:text-4xl">Setup and infrastructure.</h2>
              <ul className="mt-5 space-y-3">
                {setupItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#26374b]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#102033] sm:text-4xl">Best fit.</h2>
              <ul className="mt-5 space-y-3">
                {bestFit.map((item) => (
                  <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#26374b]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#ead8c5] bg-[#fffaf3] p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
            <SectionHeader title="What is not included by default." copy="These limits keep the base package honest and make upgrades explicit before implementation begins." />
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {excludedItems.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-[#ead8c5] bg-white p-4 text-sm font-semibold leading-6 text-[#26374b]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#bfe4c8] bg-[#eef9f2] p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#102033] sm:text-4xl">Ready to build the repeat revenue path?</h2>
                <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#536173]">
                  {repeatScopeLine}
                </p>
                <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-[#536173]">
                  {packageScopeNote}
                </p>
              </div>
              <PrimaryCTACluster location="repeat_revenue_midpage" />
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#e4ded3] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-7">
            <SectionHeader title="Practical FAQ." copy="Plain answers before you buy Repeat Revenue System." />
            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-[#dfe7ee] bg-[#f8fbfc] p-5">
                  <h3 className="text-lg font-bold text-[#102033]">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#536173]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="text-center text-sm font-semibold text-[#607080]">
            Need to compare both systems first? <Link href="/pricing#compare-systems" className="font-bold text-[#116832] underline underline-offset-4">Compare systems on pricing</Link>.
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
