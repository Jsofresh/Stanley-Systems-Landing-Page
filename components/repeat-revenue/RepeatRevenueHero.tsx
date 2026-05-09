import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { repeatMonthly, workflowAudit } from "./tokens"

const heroChips = [
  "Past customers return",
  "Reviews get asked for",
  "Referrals get asked for",
  "Missed calls get caught",
]

export function RepeatRevenueHero() {
  return (
    <section id="hero" data-section="hero" className="relative scroll-mt-[120px] overflow-hidden bg-[#F8F4EA] px-4 pt-24 text-[#213343] sm:px-6 lg:px-8 lg:pt-28">
      <div className="absolute right-0 top-0 hidden h-full w-[38%] skew-x-[-10deg] bg-[#DDEFE3] lg:block" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-9 pb-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-16">
        <div className="max-w-3xl">
          <nav className="text-sm font-semibold text-[#33475B]" aria-label="Breadcrumb">
            <a href="/systems" className="underline decoration-[#1F7A3A]/50 underline-offset-4 hover:text-[#1F7A3A]">Systems</a>
            <span className="mx-2 text-[#7C98B6]">/</span>
            <span>Repeat Revenue System</span>
          </nav>
          <h1 className="mt-6 max-w-4xl text-[2.45rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#213343] sm:text-[3.45rem] lg:text-[3.75rem]">
            Get more money from the customers you already earned.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#33475B] sm:text-xl">
            Repeat Revenue System brings past customers back, asks happy customers for reviews and referrals, and catches missed calls before they turn into cold leads.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTALink
              href={repeatMonthly.stripePaymentLink.url}
              kind="checkout"
              location="repeat_revenue_hero_buy_green_funnel"
              analyticsEvent="package_checkout_clicked"
              analyticsSource="repeat_revenue_page"
              packageId={repeatMonthly.analyticsPackageId}
              packageName={repeatMonthly.publicName}
              billingPeriod={repeatMonthly.billingPeriod}
              ctaLabel="Buy Repeat Revenue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#1F7A3A] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(31,122,58,0.18)] transition hover:bg-[#17612E]"
            >
              Buy Repeat Revenue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTALink>
            <CTALink
              href={workflowAudit.stripePaymentLink.url}
              kind="checkout"
              location="repeat_revenue_hero_audit_green_funnel"
              analyticsEvent="audit_checkout_clicked"
              analyticsSource="repeat_revenue_page"
              packageId="workflow_audit"
              packageName="Workflow Audit"
              billingPeriod="one_time"
              ctaLabel="Start with the $97 Workflow Audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#1F7A3A] bg-white/70 px-7 py-3 text-sm font-bold text-[#213343] transition hover:bg-[#E8F6EC]"
            >
              Start with the $97 Workflow Audit
            </CTALink>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#33475B]">
            Audit credit: $97 off monthly or $194 off yearly. Yearly saves 20% and waives installation.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-[1.35rem] border border-[#C8D8CE] bg-white p-3 shadow-[0_22px_56px_rgba(33,51,67,0.12)] sm:p-4">
            <Image
              src="/images/repeat-revenue/repeat-revenue-hero-loop.png"
              alt="Repeat Revenue System loop showing past customers, review ask, referral ask, missed call captured, and next job booked."
              width={1536}
              height={1024}
              priority
              className="aspect-[16/10] w-full rounded-[1rem] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative border-y border-[#D5DEE8] bg-white/85">
        <div className="mx-auto grid max-w-7xl divide-y divide-[#D5DEE8] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {heroChips.map((label) => (
            <div key={label} className="flex items-center gap-3 px-5 py-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#1F7A3A]" aria-hidden="true" />
              <p className="text-base font-bold text-[#213343]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
