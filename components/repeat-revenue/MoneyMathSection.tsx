import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { multiplierStack, workflowAudit } from "./tokens"

export function MoneyMathSection() {
  return (
    <section id="math" data-section="money-math" className="scroll-mt-[120px] bg-[#F8F4EA] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <p className="text-sm font-bold text-[#1F7A3A]">Revenue math preview</p>
          <h2 className="mt-4 max-w-2xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.045em] text-[#213343] sm:text-5xl">
            A quiet customer list can hide a month of work.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#33475B]">
            Past customers are only the first layer. A quiet list can hide repeat jobs. Happy customers can hide reviews. Good reviews can create more trust. Trust can create referrals. More visibility can create more calls. If those calls are missed, the revenue leaks again.
          </p>
          <div className="mt-6 rounded-2xl border border-[#D5DEE8] bg-white p-4 shadow-[0_10px_26px_rgba(33,51,67,0.05)]">
            <p className="text-sm font-bold text-[#213343]">Multiplier stack</p>
            <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-[#33475B]">
              {multiplierStack.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#1F7A3A]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#1F7A3A] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#17612E]"
          >
            Run the $97 Workflow Audit <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
        </div>

        <div>
          <div className="rounded-[1.25rem] border border-[#D5DEE8] bg-white p-3 shadow-[0_18px_46px_rgba(33,51,67,0.09)] sm:p-4">
            <Image
              src="/images/repeat-revenue/revenue-math-opportunity-report.png"
              alt="Repeat Revenue Opportunity report showing past customers, reviews, referrals, missed calls, and $30,000 worth checking."
              width={1536}
              height={1024}
              className="aspect-video w-full rounded-[1rem] object-cover"
            />
          </div>
          <p className="mt-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold leading-6 text-[#124E25] ring-1 ring-[#C8D8CE]">Example only. The audit uses your real records.</p>
        </div>
      </div>
    </section>
  )
}
