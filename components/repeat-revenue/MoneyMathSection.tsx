import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { multiplierStack, workflowAudit } from "./tokens"

export function MoneyMathSection() {
  return (
    <section id="math" data-section="money-math" className="scroll-mt-[120px] bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.75rem] border border-[#D5E9DC] bg-[#F8FBF9] shadow-[0_24px_70px_rgba(16,32,51,0.08),0_0_46px_rgba(21,128,61,0.10)] lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
        <div className="flex flex-col justify-center bg-white p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-bold text-[#15803D]">Revenue math preview</p>
          <h2 className="mt-3 max-w-2xl text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#102033] sm:text-5xl">
            A quiet customer list can hide a month of work.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#33475B] sm:text-lg">
            Past customers, reviews, referrals, and missed calls all point back to the same problem: money is already in the records, but the next ask is not owned.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-[0.76fr_1fr] sm:items-stretch">
            <div className="rounded-2xl border border-[#F7B4C2] bg-white p-4 shadow-[0_14px_34px_rgba(225,29,72,0.08)]">
              <p className="text-sm font-bold text-[#E11D48]">Example opportunity</p>
              <p className="mt-2 text-4xl font-extrabold tracking-[-0.06em] text-[#102033]">$30,000</p>
              <p className="mt-1 text-sm font-bold text-[#33475B]">worth checking before the leak compounds</p>
            </div>
            <div className="rounded-2xl border border-[#D5DEE8] bg-white p-4 shadow-[0_10px_26px_rgba(33,51,67,0.05)]">
              <p className="text-sm font-bold text-[#102033]">Multiplier stack</p>
              <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-[#33475B]">
                {multiplierStack.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#15803D]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <CTALink
            href={workflowAudit.stripePaymentLink.url}
            kind="checkout"
            location="repeat_revenue_math_audit_green_funnel"
            analyticsEvent="audit_checkout_clicked"
            analyticsSource="repeat_revenue_page"
            packageId="workflow_audit"
            packageName="Workflow Audit"
            billingPeriod="one_time"
            ctaLabel="Run the $97 Workflow Audit"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-md bg-[#15803D] px-7 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(21,128,61,0.20)] transition hover:bg-[#17612E]"
          >
            Run the $97 Workflow Audit <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
        </div>

        <div className="relative min-h-[320px] bg-[#F8FBF9] sm:min-h-[390px] lg:min-h-[460px]">
          <Image
            src="/images/repeat-revenue/revenue-math-opportunity-report.png"
            alt="3D opportunity visual showing old customers, missed calls, review asks, and referral asks feeding into a revenue opportunity."
            width={1536}
            height={1024}
            className="absolute inset-0 h-full w-full object-contain object-center p-3 sm:p-4"
          />
          <p className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 px-4 py-3 text-sm font-bold leading-6 text-[#124E25] shadow-[0_10px_28px_rgba(16,32,51,0.12)] ring-1 ring-[#C8D8CE] backdrop-blur">
            Example only. The audit uses your real records.
          </p>
        </div>
      </div>
    </section>
  )
}
