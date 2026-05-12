import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { pricingPackageById, type PricingPackage, type PricingPackageId } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const repeatMonthly = pricingPackageById.repeat_revenue_monthly
const repeatYearly = pricingPackageById.repeat_revenue_yearly
const bothMonthly = pricingPackageById.both_systems_monthly
const bothYearly = pricingPackageById.both_systems_yearly
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
      analyticsSource="repeat_revenue_page"
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

function FollowUpLoopVisual() {
  const steps = ["Record found", "Right ask sent", "Reply reaches office", "Next step visible"]

  return (
    <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_24px_70px_rgba(7,29,58,0.08)]">
      <div className="relative overflow-hidden rounded-[1.5rem] bg-[#F4FBF5] p-4">
        <Image
          src="/images/repeat-revenue/repeat-revenue-loop.jpg"
          alt="Repeat Revenue loop connecting past customers, review asks, referrals, and missed calls to more follow-up opportunities."
          width={1280}
          height={960}
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
    <section id="hero" data-section="repeat-revenue-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-24 sm:pb-16 lg:pt-20">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${shell} relative grid gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center`}>
        <div>
          <h1 className="max-w-5xl text-[2.7rem] font-semibold leading-[0.94] tracking-[-0.058em] text-[#071D3A] sm:text-[4.3rem] lg:text-[5rem]">
            Get more work from customers you already earned.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60]">
            Repeat Revenue brings past customers back, asks happy customers for reviews and referrals, and catches missed calls before they go cold.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            Stanley Systems turns old records and finished jobs into the next clear ask.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CheckoutButton pkg={repeatMonthly} label="Buy Repeat Revenue" location="repeat_revenue_hero_primary" />
            <CheckoutButton
              pkg={assessment}
              label="Start with the Cash Flow Assessment"
              location="repeat_revenue_hero_assessment"
              className="border border-[#CFE8D5] bg-white text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] hover:border-[#15803D] hover:bg-[#F4FBF5]"
            />
          </div>
          <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-[#607080]">
            Assessment credit: $97 toward monthly, $194 toward yearly.
          </p>
        </div>
        <FollowUpLoopVisual />
      </div>
    </section>
  )
}

function LeakProof() {
  const leaks = [
    ["Past customers went quiet", "The work is already earned. The follow-up just is not owned."],
    ["Reviews never got asked for", "Good jobs finish without the next public proof."],
    ["Referrals depend on memory", "Happy customers can send work, but only if someone asks."],
    ["Missed calls went cold", "A call that should become a job can disappear by tomorrow."],
  ]

  return (
    <section id="leaks" data-section="repeat-revenue-leak-proof" className="bg-white py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center`}>
        <div>
          <h2 className="max-w-3xl text-[2.25rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.25rem]">
            Where is the next job slipping away?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
            Most service businesses already have the next job hiding in their records. The problem is nobody owns the follow-up.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#536173]">
            Stanley Systems builds the follow-up path for this leak first.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="#plans" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#102033] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#071D3A]">
              See Repeat Revenue pricing
            </Link>
            <CheckoutButton pkg={assessment} label="Start with the Cash Flow Assessment" location="repeat_revenue_leak_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:border-[#15803D] hover:bg-[#F4FBF5]" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {leaks.map(([title, body]) => (
            <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 shadow-[0_16px_40px_rgba(7,29,58,0.05)]">
              <CheckCircle2 className="h-6 w-6 text-[#15803D]" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.025em] text-[#102033]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#536173]">{body}</p>
            </article>
          ))}
          <div className="overflow-hidden rounded-[1.5rem] border border-[#DDEBE2] bg-white p-3 shadow-[0_18px_48px_rgba(7,29,58,0.06)] sm:col-span-2">
            <Image
              src="/images/repeat-revenue/result-past-customers.png"
              alt="Past customer records becoming booked jobs through a clear follow-up path."
              width={1536}
              height={1024}
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
        <CheckoutButton pkg={pkg} label={ctaLabel} location={`repeat_revenue_pricing_${pkg.id}`} className={recommended ? undefined : "bg-[#102033] text-white shadow-[0_14px_28px_rgba(16,32,51,0.16)] hover:bg-[#071D3A]"} />
      </div>
    </article>
  )
}

function Pricing() {
  return (
    <section id="plans" data-section="repeat-revenue-pricing" className="scroll-mt-[120px] bg-[#F4FBF5] py-14 sm:py-16">
      <div className={shell}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Buy the follow-up system.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            If customer follow-up is the leak, start here. Stanley Systems builds the path that turns old customers, good jobs, and missed calls into office action.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <PricingCard
            pkg={repeatMonthly}
            title="Repeat Revenue Monthly"
            description="Best if you know follow-up is the main leak and want monthly flexibility."
            ctaLabel="Buy monthly"
            bullets={["Past customer reactivation", "Review asks", "Referral asks", "Missed-call recovery path", "Office action when someone replies"]}
          />
          <PricingCard
            pkg={repeatYearly}
            title="Repeat Revenue Yearly"
            description="Best if repeat work and follow-up are worth fixing for the full year."
            ctaLabel="Buy yearly"
            recommended
            bullets={["Setup waived", "Everything in monthly", "Lower first-year cost", "Missed-call recovery path", "Office action when someone replies"]}
          />
        </div>

        <div className="mt-5 grid gap-4 rounded-[1.5rem] border border-[#CFE1D4] bg-white p-5 shadow-[0_16px_42px_rgba(7,29,58,0.05)] lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Need billing fixed too?</h3>
            <p className="mt-2 text-sm leading-6 text-[#536173]">Add one compact choice when delayed billing and customer follow-up both cost money.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CheckoutButton pkg={bothMonthly} label="Buy both monthly" location="repeat_revenue_pricing_both_monthly" className="bg-white text-[#102033] ring-1 ring-[#CFE1D4] hover:bg-[#F4FBF5]" />
            <CheckoutButton pkg={bothYearly} label="Buy both yearly" location="repeat_revenue_pricing_both_yearly" />
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-[#CFE1D4] bg-[#FBFCF7] p-5 text-center">
          <p className="text-sm font-semibold leading-6 text-[#536173]">
            Start with the $97 Cash Flow Assessment first. If you buy monthly, $97 credits back. If you buy yearly, $194 credits back.
          </p>
          <div className="mt-4">
            <CheckoutButton pkg={assessment} label="Start with the Cash Flow Assessment" location="repeat_revenue_pricing_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:border-[#15803D] hover:bg-[#F4FBF5]" />
          </div>
        </div>
      </div>
    </section>
  )
}

function MechanismProof() {
  const steps = [
    ["A job ends or a record gets found", "The system watches the moments your team usually has to remember."],
    ["The right ask goes out", "Past customer, review, referral, and missed-call paths can each get their own ask."],
    ["Replies reach the office", "The response does not sit with the wrong person or disappear in a thread."],
    ["The next step stays visible", "The owner can see which follow-up is waiting, answered, or ready for office action."],
  ]

  return (
    <section data-section="repeat-revenue-mechanism-proof" className="bg-white py-14 sm:py-16">
      <div className={shell}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Every good job should create the next ask.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#536173] sm:text-lg">
              Repeat Revenue watches for the moments your team usually misses.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CheckoutButton pkg={repeatMonthly} label="Buy Repeat Revenue" location="repeat_revenue_mechanism_primary" />
              <CheckoutButton pkg={assessment} label="Start with the Cash Flow Assessment" location="repeat_revenue_mechanism_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:border-[#15803D] hover:bg-[#F4FBF5]" />
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
    ["Will this change my main phone number?", "No. Stanley Systems builds around the way customers already reach you."],
    ["Does this guarantee reviews or new customers?", "No. It builds the follow-up path. Customers still choose what they do."],
    ["What if billing is the bigger leak?", "Start with the Cash Flow Assessment or buy both systems."],
    ["Who is this for?", "Service businesses with old customers, happy customers, missed calls, or referral chances that do not get worked every week."],
  ]

  return (
    <section id="scope" data-section="repeat-revenue-fit-objections" className="scroll-mt-[120px] bg-[#FBFCF7] py-14 sm:py-16">
      <div className={`${shell} grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start`}>
        <div>
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Is this the right first fix?</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            Repeat Revenue is for service businesses with old customers, happy customers, missed calls, or referral chances that do not get worked every week.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <CheckoutButton pkg={repeatMonthly} label="Buy Repeat Revenue" location="repeat_revenue_fit_primary" />
            <CheckoutButton pkg={assessment} label="Start with the Cash Flow Assessment" location="repeat_revenue_fit_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] hover:border-[#15803D] hover:bg-[#F4FBF5]" />
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
