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
    <section id="hero" data-section="hero" className="relative scroll-mt-[120px] overflow-hidden bg-white px-4 pt-24 text-[#213343] sm:px-6 lg:px-8 lg:pt-28">
      <div className="absolute right-0 top-24 h-[520px] w-[48%] rounded-l-full bg-[radial-gradient(circle_at_center,rgba(21,128,61,0.14),rgba(255,255,255,0)_68%)] blur-2xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-9 pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pb-16">
        <div className="max-w-3xl">
          <nav className="text-sm font-semibold text-[#33475B]" aria-label="Breadcrumb">
            <a href="/systems" className="underline decoration-[#1F7A3A]/50 underline-offset-4 hover:text-[#1F7A3A]">Systems</a>
            <span className="mx-2 text-[#7C98B6]">/</span>
            <span>Repeat Revenue System</span>
          </nav>
          <h1 className="mt-6 max-w-4xl text-[2.45rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#102033] sm:text-[3.45rem] lg:text-[3.75rem]">
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
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#15803D] px-7 py-3 text-sm font-bold text-white shadow-[0_0_26px_rgba(21,128,61,0.25)] transition hover:bg-[#17612E]"
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
              className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#15803D] bg-white px-7 py-3 text-sm font-bold text-[#102033] transition hover:bg-[#F4FBF6]"
            >
              Start with the $97 Workflow Audit
            </CTALink>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#33475B]">
            Audit credit: $97 off monthly or $194 off yearly. Yearly saves 20% and waives installation.
          </p>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] border border-[#D6E8DC] bg-[#F8FBF9] shadow-[0_30px_80px_rgba(16,32,51,0.12),0_0_48px_rgba(21,128,61,0.16)] sm:min-h-[440px] lg:min-h-[500px]">
          <Image
            src="/images/repeat-revenue/repeat-revenue-loop.jpg"
            alt="Repeat Revenue loop visual showing past customers, five-star reviews, referrals, and captured calls feeding more repeat revenue."
            width={1280}
            height={960}
            priority
            className="absolute inset-0 h-full w-full object-contain object-center p-4 sm:p-6"
          />
        </div>
      </div>

      <div className="relative border-y border-[#D5DEE8] bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-[#D5DEE8] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {heroChips.map((label) => (
            <div key={label} className="flex items-center gap-3 px-5 py-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#15803D]" aria-hidden="true" />
              <p className="text-base font-bold text-[#102033]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
