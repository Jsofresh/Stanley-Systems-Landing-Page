import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { PackagePricingGrid, type PackagePricingCard } from "@/components/package-pricing-cards"
import { pricingPackageById, type PricingPackage, type PricingPackageId } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const bothMonthly = pricingPackageById.both_systems_monthly
const bothYearly = pricingPackageById.both_systems_yearly
const assessment = pricingPackageById.workflow_audit

const bothDemo = {
  bestFor: "Money is leaking before and after the job.",
  leak: "Missed calls, delayed jobs, late invoices, and past customers nobody contacts again.",
  before: ["Calls get missed", "Jobs get delayed", "Invoices go out late", "Past customers disappear"],
  after: ["Customers are recorded", "Jobs move", "Billing happens faster", "Past customers get contacted again"],
}

const bothSystemCards: PackagePricingCard[] = [
  {
    badge: "Most complete monthly",
    name: "Both Systems",
    package: bothMonthly,
    description: "Fix the billing leak and the repeat-customer leak in one rollout.",
    ...bothDemo,
    install: "$449 installation",
    credit: "Assessment credit: -$97",
    callout: "-$197/mo bundle savings",
    cta: "Fix both leaks",
    secondary: "Start with the assessment",
    tone: "complete",
    bullets: ["Cashflow Control System", "Repeat Revenue System", "Billing workflow", "Customer follow-up"],
  },
  {
    badge: "-$2,700 · Best value",
    name: "Both Systems Yearly",
    package: bothYearly,
    description: "The full before-and-after-job fix with the best first-year price.",
    ...bothDemo,
    install: "Installation waived",
    credit: "Assessment credit: -$194",
    callout: "-$2,700 first-year package savings",
    cta: "Fix both leaks",
    secondary: "Start with the assessment",
    tone: "recommended",
    bullets: ["Cashflow Control System", "Repeat Revenue System", "Lowest first-year bundle cost", "Best first-year price for both"],
  },
]

export const metadata: Metadata = {
  title: "Both Systems | Stanley Systems",
  description: "Buy Cashflow Control and Repeat Revenue together when money is leaking before and after the job.",
  alternates: { canonical: "https://stanley-systems.com/systems/both-systems" },
  openGraph: {
    title: "Both Systems | Stanley Systems",
    description: "Cashflow Control plus Repeat Revenue for service businesses leaking money before and after the job.",
    url: "https://stanley-systems.com/systems/both-systems",
    siteName: "Stanley Systems",
    type: "website",
  },
}

function CheckoutButton({ pkg, label, location, className = "bg-[#15803D] text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]" }: { pkg: PricingPackage; label: string; location: string; className?: string }) {
  const billingPeriod = pkg.billingPeriod === "one_time" ? "one_time" : pkg.billingPeriod
  return (
    <CTALink
      href={pkg.stripePaymentLink.url}
      kind="checkout"
      location={location}
      analyticsEvent={pkg.id === "workflow_audit" ? "audit_checkout_clicked" : "package_checkout_clicked"}
      analyticsSource="both_systems_page"
      packageId={pkg.analyticsPackageId as PricingPackageId}
      packageName={pkg.publicName}
      billingPeriod={billingPeriod}
      ctaLabel={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[3.3rem] min-w-[14.85rem] items-center justify-center whitespace-nowrap rounded-full px-[1.65rem] py-[0.825rem] text-[0.96rem] font-extrabold transition duration-300 ${className}`}
    >
      {label} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
    </CTALink>
  )
}

export default function BothSystemsPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A]">
        <section className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-32 sm:pt-36 lg:pb-28 lg:pt-32">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
          <div className={`${shell} relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center`}>
            <div>
              <h1 className="max-w-5xl text-[2.08rem] font-semibold leading-[0.96] tracking-[-0.035em] text-[#071D3A] sm:text-[3.23rem] lg:text-[3.78rem]">Fix the billing leak and the follow-up leak together.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60]">Both Systems combines Cashflow Control and Repeat Revenue for service businesses losing money before and after the job.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CheckoutButton pkg={bothMonthly} label="Buy Both Monthly" location="both_systems_hero_monthly" />
                <CheckoutButton pkg={assessment} label="Start Cash Flow Assessment" location="both_systems_hero_assessment" className="border border-[#CFE8D5] bg-white text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5] hover:shadow-[0_18px_36px_rgba(21,128,61,0.14)]" />
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_22px_60px_rgba(7,29,58,0.08)] lg:mt-3">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">Use Both Systems when:</h2>
              <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-[#536173]">
                {["Finished jobs wait on missing billing details, invoices, or payment follow-up.", "Past customers, reviews, referrals, or missed calls are not worked consistently.", "The same owner or office manager keeps becoming the backup system.", "You want one onboarding path for both leaks instead of two separate projects."].map((item) => (
                  <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="plans" className="bg-[#F4FBF5] py-14 sm:py-16">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[2.55rem]">Buy Both Systems.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Pricing and checkout links come directly from the Stanley Systems pricing source of truth.</p>
            </div>
            <PackagePricingGrid cards={bothSystemCards} locationPrefix="both_systems_pricing" analyticsSource="both_systems_page" showAuditSecondary auditHref={assessment.stripePaymentLink.url} gridClassName="lg:grid-cols-2 [&_article]:text-center [&_li]:justify-center [&_li]:text-center [&_summary]:text-center" />
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm font-semibold leading-6 text-[#536173]">Not sure both leaks should be fixed first? Start with the Cash Flow Assessment before buying the wrong system.</p>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className={`${shell} grid gap-5 md:grid-cols-3`}>
            <Link href="/systems/cashflow-control" className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white">View Cashflow Control</Link>
            <Link href="/systems/repeat-revenue" className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white">View Repeat Revenue</Link>
            <Link href="/pricing" className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white">Compare all pricing</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
