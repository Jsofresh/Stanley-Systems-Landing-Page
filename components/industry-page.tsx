import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

export type IndustrySlug =
  | "hvac"
  | "electrical"
  | "landscaping"
  | "general-contractors"
  | "plumbing"
  | "marine"
  | "roofing"
  | "adjacent-service-businesses"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const assessment = pricingPackageById.workflow_audit

const industryCopy: Record<IndustrySlug, {
  label: string
  headline: string
  description: string
  leaks: string[]
  systems: string[]
}> = {
  hvac: {
    label: "HVAC",
    headline: "HVAC work gets done fast. The office still has to turn it into cash.",
    description: "Stanley Systems helps HVAC shops tighten the handoff between calls, dispatch, job notes, invoices, payment follow-up, reviews, and past-customer reactivation.",
    leaks: ["Completed service calls waiting on billing details.", "Maintenance customers who are not contacted again.", "Missed calls and busy-season follow-up that depends on memory."],
    systems: ["Cashflow Control for finished jobs and billing follow-up.", "Repeat Revenue for reviews, referrals, tune-up reminders, and missed-call recovery."],
  },
  electrical: {
    label: "Electrical",
    headline: "Electrical jobs lose momentum when details, estimates, and billing scatter.",
    description: "Stanley Systems helps electrical contractors keep requests, job details, estimate follow-up, invoices, and customer follow-up from living in separate places.",
    leaks: ["Job details split across calls, notes, texts, and software.", "Open estimates without a clear next step.", "Invoices and payment reminders that wait for office cleanup."],
    systems: ["Cashflow Control for job-to-invoice movement.", "Repeat Revenue for past customers, reviews, referrals, and missed calls."],
  },
  landscaping: {
    label: "Landscaping",
    headline: "Landscaping revenue leaks when recurring work and follow-up rely on memory.",
    description: "Stanley Systems helps landscaping teams keep estimates, seasonal follow-up, completed work, billing, reviews, and referrals moving without owner cleanup.",
    leaks: ["Seasonal customers who are not contacted before the next need.", "Completed work waiting on office billing steps.", "Quotes and add-ons that sit without follow-up."],
    systems: ["Repeat Revenue for seasonal reactivation and referral asks.", "Cashflow Control for billing and payment follow-up after the work."],
  },
  "general-contractors": {
    label: "General Contractors",
    headline: "General contractors lose money when the job story has to be rebuilt later.",
    description: "Stanley Systems helps contractors keep customer requests, job details, billing readiness, payment follow-up, and past-customer follow-up from becoming owner cleanup.",
    leaks: ["Missing approvals, notes, or photos before billing.", "Invoices that wait because the office has to reconstruct the job.", "Past customers and referrals with no repeatable follow-up path."],
    systems: ["Cashflow Control for billing-readiness and follow-up.", "Repeat Revenue for referrals, reviews, and past-customer touchpoints."],
  },
  plumbing: {
    label: "Plumbing",
    headline: "Plumbing calls turn into cash only when the office handoff stays clean.",
    description: "Stanley Systems helps plumbing shops connect urgent calls, job notes, invoices, payment follow-up, reviews, referrals, and past-customer reminders.",
    leaks: ["Fast jobs where billing details arrive late or incomplete.", "Missed calls that are not followed up quickly.", "Happy customers who never get review or referral asks."],
    systems: ["Cashflow Control for completed jobs and open balances.", "Repeat Revenue for reviews, referrals, missed calls, and past customers."],
  },
  marine: {
    label: "Marine",
    headline: "Marine service gets messy when custom work has no clean billing path.",
    description: "Stanley Systems helps marine service businesses keep customer requests, technician notes, parts, billing, payment follow-up, and repeat seasonal work moving.",
    leaks: ["Custom jobs where the office has to rebuild what happened.", "Open balances and invoice delays after service is done.", "Seasonal customers who are not contacted before they need service again."],
    systems: ["Cashflow Control for custom service-to-invoice paths.", "Repeat Revenue for seasonal return work, reviews, and referrals."],
  },
  roofing: {
    label: "Roofing",
    headline: "Roofing revenue leaks when estimates, job details, and follow-up go quiet.",
    description: "Stanley Systems helps roofing companies tighten estimate follow-up, job handoffs, billing steps, review asks, referrals, and missed-call recovery.",
    leaks: ["Storm or seasonal leads that are not followed up consistently.", "Estimate follow-up that depends on a person remembering.", "Finished jobs where billing or review asks happen late."],
    systems: ["Repeat Revenue for estimates, reviews, referrals, and missed calls.", "Cashflow Control for billing steps after completed work."],
  },
  "adjacent-service-businesses": {
    label: "Adjacent Service Businesses",
    headline: "If jobs, customers, invoices, and follow-up move through an office, money can leak there.",
    description: "Stanley Systems helps service businesses outside the core trades find the same handoff leaks: late billing, stale estimates, missed calls, weak review asks, and past customers nobody contacts.",
    leaks: ["Owner or office manager has become the backup system.", "Work is done but billing, payment, or follow-up still waits.", "Customers are earned once and then allowed to go cold."],
    systems: ["Cashflow Control when completed work is not turning into cash fast enough.", "Repeat Revenue when past customers, reviews, referrals, or missed calls are being wasted."],
  },
}

export function generateIndustryMetadata(slug: IndustrySlug, basePath = "") {
  const page = industryCopy[slug]
  const route = `${basePath}/${slug}`
  return {
    title: `${page.label} Automation | Stanley Systems`,
    description: page.description,
    alternates: { canonical: `https://stanley-systems.com${route}` },
    openGraph: {
      title: `${page.label} Automation | Stanley Systems`,
      description: page.description,
      url: `https://stanley-systems.com${route}`,
      siteName: "Stanley Systems",
      type: "website",
    },
  }
}

export function IndustryPage({ slug }: { slug: IndustrySlug }) {
  const page = industryCopy[slug]
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-white text-[#071D3A]">
        <section className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-32 sm:pt-36 lg:pb-24 lg:pt-36">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
          <div className={`${shell} relative grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
            <div>
              <h1 className="max-w-5xl text-[2.45rem] font-semibold leading-[0.96] tracking-[-0.055em] text-[#071D3A] sm:text-[3.65rem] lg:text-[4.25rem]">{page.headline}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#334B60]">{page.description}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CTALink href={assessment.stripePaymentLink.url} kind="checkout" location={`${slug}_industry_assessment`} analyticsEvent="audit_checkout_clicked" analyticsSource="industry_page" packageId="workflow_audit" packageName="Cash Flow Assessment" billingPeriod="one_time" ctaLabel="Start Cash Flow Assessment" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]">
                  Start Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </CTALink>
                <Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]">
                  See pricing
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_22px_60px_rgba(7,29,58,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#607080]">Image note</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">Industry-specific imagery is pending. This page intentionally uses neutral Stanley Systems layout and copy only.</p>
              <div className="mt-6 grid gap-3">
                {page.leaks.map((leak) => (
                  <div key={leak} className="rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] p-4 text-sm font-semibold leading-6 text-[#536173]"><CheckCircle2 className="mb-2 h-5 w-5 text-[#15803D]" />{leak}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-14 sm:py-16">
          <div className={`${shell} grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start`}>
            <div>
              <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-5xl">Which Stanley Systems package fits?</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Start with the leak you can already see. If you cannot name it yet, start with the Cash Flow Assessment.</p>
            </div>
            <div className="grid gap-4">
              {page.systems.map((system) => (
                <article key={system} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5 text-sm font-semibold leading-6 text-[#536173] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white hover:shadow-[0_18px_42px_rgba(21,128,61,0.1)]">{system}</article>
              ))}
              <div className="grid gap-3 sm:grid-cols-3">
                <Link href="/systems/cashflow-control" className="rounded-2xl border border-[#CFE8D5] bg-white p-4 text-sm font-extrabold text-[#116832] hover:bg-[#F4FBF5]">Cashflow Control</Link>
                <Link href="/systems/repeat-revenue" className="rounded-2xl border border-[#CFE8D5] bg-white p-4 text-sm font-extrabold text-[#116832] hover:bg-[#F4FBF5]">Repeat Revenue</Link>
                <Link href="/systems/both-systems" className="rounded-2xl border border-[#CFE8D5] bg-white p-4 text-sm font-extrabold text-[#116832] hover:bg-[#F4FBF5]">Both Systems</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
