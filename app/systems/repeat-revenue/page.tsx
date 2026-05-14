import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { FadedImage } from "@/components/faded-image"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { PackagePricingGrid, type PackagePricingCard } from "@/components/package-pricing-cards"
import { MoneyLeakChecksForm } from "@/components/money-leak-checks-form"
import { pricingPackageById, type PricingPackage, type PricingPackageId } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const repeatMonthly = pricingPackageById.repeat_revenue_monthly
const repeatYearly = pricingPackageById.repeat_revenue_yearly
const assessment = pricingPackageById.workflow_audit

export const metadata: Metadata = {
  title: "Repeat Revenue | Stanley Systems",
  description:
    "Repeat Revenue helps service businesses bring past customers back, ask for reviews and referrals, and catch missed calls before they go cold.",
  alternates: {
    canonical: "https://stanley-systems.com/systems/repeat-revenue",
  },
  openGraph: {
    title: "Repeat Revenue | Stanley Systems",
    description:
      "Get more work from customers you already earned with follow-up, review asks, referral asks, and missed-call recovery.",
    url: "https://stanley-systems.com/systems/repeat-revenue",
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
      analyticsSource="repeat_revenue_page"
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

const repeatPricingCards: PackagePricingCard[] = [
  {
    badge: "Monthly",
    name: "Repeat Revenue Monthly",
    package: repeatMonthly,
    description: "Buy this when past customers, reviews, referrals, and missed calls need a clear follow-up path now.",
    install: repeatMonthly.setupFeeDisplay,
    credit: "Cash Flow Assessment credit: -$97",
    cta: repeatMonthly.cta,
    tone: "monthly",
    bullets: ["Past customer reactivation", "Google review and referral asks", "Missed-call recovery path"],
  },
  {
    badge: repeatYearly.savings ? `-${repeatYearly.savings.amount.toLocaleString()} first year` : "Yearly",
    name: "Repeat Revenue Yearly",
    package: repeatYearly,
    description: `Shows as $${monthlyEquivalent(repeatYearly)}/mo, billed yearly. Best when follow-up should run all year.` ,
    install: repeatYearly.waivedSetupDisplay ?? repeatYearly.setupFeeDisplay,
    credit: "Cash Flow Assessment credit: -$194",
    cta: repeatYearly.cta,
    tone: "recommended",
    bullets: ["Everything in monthly", "Yearly billing lowers the first-year cost", "Installation removed on yearly"],
  },
]

function FollowUpLoopVisual() {
  return (
    <FadedImage
        src="/images/repeat-revenue/repeat-revenue-loop.jpg"
        alt="Repeat Revenue loop connecting past customers, review asks, referrals, and missed calls to more follow-up opportunities."
        width={1280}
        height={960}
        priority
        sizes="(min-width: 1024px) 48vw, 100vw"
        fadeColor="#FBFCF7"
        wrapperClassName="relative mx-auto w-full max-w-[760px] lg:max-w-[820px] drop-shadow-[0_24px_55px_rgba(7,29,58,0.12)]"
      />
  )
}

function Hero() {
  return (
    <section id="hero" data-section="repeat-revenue-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-[7.9rem] sm:pb-16 lg:pt-[8rem]">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${shell} relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
        <div>
          <h1 className="max-w-4xl text-[1.72rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[2.73rem] lg:text-[3.15rem]">
            Repeat Revenue turns happy customers into more jobs.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60] sm:text-xl">
            Stanley Systems helps good jobs create the next review, referral, follow-up, returned customer, and booked job.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CheckoutButton pkg={repeatMonthly} label="Buy Repeat Revenue" location="repeat_revenue_hero_primary" />
            <CheckoutButton
              pkg={assessment}
              label="Start Cash Flow Assessment"
              location="repeat_revenue_hero_assessment"
              className="border border-[#CFE8D5] bg-white text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_18px_36px_rgba(21,128,61,0.14)]"
            />
          </div>
          <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-[#607080]">
            Assessment credit: $97 toward monthly, $194 toward yearly.
          </p>
          <p className="mt-3 max-w-xl text-sm font-bold leading-6 text-[#607080]">Want one answer before buying the system? <Link href="/contact?path=pre-buy" className="text-[#116832] underline underline-offset-4">Ask before buying</Link> and Stanley Systems will point you to the assessment if follow-up is not the first leak.</p>
        </div>
        <FollowUpLoopVisual />
      </div>
    </section>
  )
}

function LeakProof() {
  return (
    <section id="leaks" data-section="repeat-revenue-leak-proof" className="bg-white py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
        <div>
          <h2 className="max-w-3xl text-[2.25rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.25rem]">
            Stop losing jobs you already earned.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            Past customers go quiet. Reviews do not get asked for. Referrals depend on memory. Missed calls and follow-up fall through when the office gets busy. Repeat Revenue fixes the cycle so good work creates more reviews, more referrals, more returned customers, and more booked jobs.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="#plans" className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#102033] px-6 py-3 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#071D3A] hover:shadow-[0_18px_38px_rgba(16,32,51,0.2)]">
              See Repeat Revenue pricing
            </Link>
            <CheckoutButton pkg={assessment} label="Start Cash Flow Assessment" location="repeat_revenue_leak_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_18px_36px_rgba(21,128,61,0.14)]" />
          </div>
        </div>
        <div className="mx-auto w-full max-w-2xl">
          <FadedImage
            src="/images/uploaded/package-voice-notes/past-customers-reviews-referrals-follow-up-booked-again.jpg"
            alt="Past customer records becoming booked jobs through a clear follow-up path."
            width={1280}
            height={960}
            sizes="(min-width: 1024px) 48vw, 100vw"
            fadeColor="#ffffff"
            wrapperClassName="drop-shadow-[0_22px_50px_rgba(7,29,58,0.12)]"
          />
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="plans" data-section="repeat-revenue-pricing" className="scroll-mt-[120px] bg-[#F4FBF5] py-14 sm:py-16">
      <div className={shell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Buy Repeat Revenue.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            If follow-up is the leak, buy the system that brings customers back and turns good work into reviews, referrals, calls, and booked jobs.
          </p>
        </div>

        <PackagePricingGrid
          cards={repeatPricingCards}
          locationPrefix="repeat_revenue_pricing"
          analyticsSource="repeat_revenue_page"
          gridClassName="md:grid-cols-2"
        />
      </div>
    </section>
  )
}

function MechanismProof() {
  const steps = [
    ["More 5-star Google reviews", "Happy customers get asked while the good job is still fresh."],
    ["Bad feedback reaches a manager first", "Unhappy feedback can be routed inside before it becomes public."],
    ["Best customers send leads", "The customers who already trust you get a simple referral ask."],
    ["Missed calls stay in the loop", "New volume does not disappear just because the office is busy."],
  ]

  return (
    <section data-section="repeat-revenue-mechanism-proof" className="bg-white py-14 sm:py-16">
      <div className={shell}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Turn good jobs into the next lead.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
              Repeat Revenue connects reviews, private feedback, referrals, past-customer follow-up, and missed-call recovery into one cycle.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
              Good work creates reviews. Happy customers create referrals. Past customers come back. New calls stay on track.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CheckoutButton pkg={repeatMonthly} label="Buy Repeat Revenue" location="repeat_revenue_mechanism_primary" />
              <CheckoutButton pkg={assessment} label="Cash Flow Assessment" location="repeat_revenue_mechanism_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_18px_36px_rgba(21,128,61,0.14)]" />
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
    ["Will this change my main phone number?", "No. Stanley Systems works around the phone path customers already use. If call tracking, missed-call routing, or a separate intake number is useful, that gets reviewed before anything changes. The goal is to keep real customer demand visible without breaking the way people already reach you."],
    ["Does this guarantee reviews or new customers?", "No. Stanley Systems cannot make customers leave reviews, send referrals, or book again. Repeat Revenue creates the follow-up path so happy customers get asked, missed calls get noticed, and past customers are contacted at the right time. Customers still choose what they do."],
    ["What if billing is the bigger leak?", "Then Repeat Revenue may not be the first system to buy. Start with the Cash Flow Assessment if you are not sure, or choose Cashflow Control when finished work, invoices, and payment follow-up are clearly the bigger problem. Stanley Systems should fix the leak that costs you first."],
    ["Who is this for?", "Repeat Revenue is for service businesses with old customers, happy customers, missed calls, referrals, or review opportunities that do not get worked every week. It fits best when the business already does good work but follow-up depends on memory. If there is not enough customer volume, Stanley Systems may point you somewhere else."],
  ]

  return (
    <section id="scope" data-section="repeat-revenue-fit-objections" className="scroll-mt-[120px] bg-[#FBFCF7] py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start`}>
        <div>
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Is this the right first fix?</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            Repeat Revenue is for service businesses with old customers, happy customers, missed calls, or referral chances that do not get worked every week.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row">
            <CheckoutButton pkg={repeatMonthly} label="Buy Repeat Revenue" location="repeat_revenue_fit_primary" />
            <CheckoutButton pkg={assessment} label="Cash Flow Assessment" location="repeat_revenue_fit_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_18px_36px_rgba(21,128,61,0.14)]" />
          </div>
        </div>
        <div className="grid gap-4">
          <article className="rounded-[1.35rem] border border-[#BFE4C8] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
            <h3 className="text-xl font-semibold tracking-[-0.025em] text-[#102033]">Ask before buying Repeat Revenue</h3>
            <p className="mt-3 text-sm leading-6 text-[#536173]">If past customers and missed follow-up are clearly the leak, buy the system. If billing might be the bigger problem, ask one question or start the Cash Flow Assessment first.</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link href="/contact?path=pre-buy" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-5 py-2.5 text-sm font-extrabold text-[#116832] transition hover:border-[#15803D] hover:bg-[#F4FBF5]">Ask one question</Link>
              <CheckoutButton pkg={assessment} label="Start Cash Flow Assessment" location="repeat_revenue_money_leak_checks_fit_assessment_support" className="border border-[#CFE8D5] bg-[#15803D] text-white hover:-translate-y-0.5 hover:bg-[#116832]" />
            </div>
          </article>
          {questions.map(([question, answer], index) => (
            <details key={question} open={index === 0} className="group rounded-[1.35rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#15803D] hover:shadow-[0_18px_42px_rgba(21,128,61,0.1)] open:border-[#BFE4C8] open:bg-[#F4FBF5]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-semibold tracking-[-0.025em] text-[#102033] marker:hidden [&::-webkit-details-marker]:hidden">
                {question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-lg font-black text-[#15803D] ring-1 ring-[#CFE8D5] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-[#536173]">{answer}</p>
            </details>
          ))}
        </div>
        <div className="lg:col-span-2">
          <MoneyLeakChecksForm source="repeat-revenue-money-leak-checks" pageSource="repeat_revenue_money_leak_checks" headline="Get one follow-up leak to check each week" body="Past customers, reviews, referrals, missed calls, and quiet follow-up — simple checks you can use before you buy Repeat Revenue." className="mt-2" />
        </div>
      </div>
    </section>
  )
}

export default function RepeatRevenuePage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A] [&_section[id]]:scroll-mt-[120px]">
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
