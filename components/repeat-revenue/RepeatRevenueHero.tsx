import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { repeatMonthly, repeatRevenueAssets, workflowAudit } from "./tokens"

export function RepeatRevenueHero() {
  return (
    <section data-section="hero" className="relative overflow-hidden bg-[#F8F4EA] px-4 pt-28 text-[#213343] sm:px-6 lg:px-8 lg:pt-32">
      <div className="absolute right-0 top-0 hidden h-full w-[44%] skew-x-[-10deg] bg-[#D8E9D6] lg:block" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:pb-24">
        <div className="max-w-3xl">
          <nav className="text-sm font-semibold text-[#33475B]" aria-label="Breadcrumb">
            <a href="/systems" className="underline decoration-[#FF5C35]/50 underline-offset-4 hover:text-[#FF5C35]">Systems</a>
            <span className="mx-2 text-[#7C98B6]">/</span>
            <span>Repeat Revenue System</span>
          </nav>
          <h1 className="mt-7 max-w-4xl font-serif text-[3.45rem] font-semibold leading-[0.96] tracking-[-0.045em] text-[#213343] sm:text-[5.1rem] lg:text-[6rem]">
            Turn finished jobs into booked repeat revenue.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#33475B] sm:text-xl">
            Build the follow-up path that brings past customers back, asks happy customers at the right moment, and catches demand before it goes cold.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTALink
              href={repeatMonthly.stripePaymentLink.url}
              kind="checkout"
              location="repeat_revenue_hero_buy_hubspot_v2"
              analyticsEvent="package_checkout_clicked"
              analyticsSource="repeat_revenue_page"
              packageId={repeatMonthly.analyticsPackageId}
              packageName={repeatMonthly.publicName}
              billingPeriod={repeatMonthly.billingPeriod}
              ctaLabel="Buy Repeat Revenue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#FF5C35] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(255,92,53,0.22)] transition hover:bg-[#E04826]"
            >
              Buy Repeat Revenue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTALink>
            <CTALink
              href={workflowAudit.stripePaymentLink.url}
              kind="checkout"
              location="repeat_revenue_hero_audit_hubspot_v2"
              analyticsEvent="audit_checkout_clicked"
              analyticsSource="repeat_revenue_page"
              packageId="workflow_audit"
              packageName="Workflow Audit"
              billingPeriod="one_time"
              ctaLabel="Start with the Workflow Audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#FF5C35] px-7 py-3 text-sm font-bold text-[#213343] transition hover:bg-[#FFF1EB]"
            >
              Start with the $97 Workflow Audit
            </CTALink>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[1.35rem] border border-[#CBD6E2] bg-white p-3 shadow-[0_26px_70px_rgba(33,51,67,0.16)]">
            <Image
              src={repeatRevenueAssets.hero}
              alt="Service-business follow-up system illustration showing calls, completed work, customer records, and repeat booking paths."
              width={1536}
              height={1024}
              priority
              className="h-auto w-full rounded-[0.95rem]"
            />
          </div>
        </div>
      </div>

      <div className="relative border-y border-[#D5DEE8] bg-white/70">
        <div className="mx-auto grid max-w-7xl divide-y divide-[#D5DEE8] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["Past customers", "get a reason to book again"],
            ["Happy customers", "get asked while trust is fresh"],
            ["Missed demand", "gets followed before it dies"],
          ].map(([label, detail]) => (
            <div key={label} className="px-6 py-5">
              <p className="text-base font-bold text-[#213343]">{label}</p>
              <p className="mt-1 text-sm leading-5 text-[#516F90]">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
