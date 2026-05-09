import { CTALink } from "@/components/cta-link"
import { faqItems, repeatMonthly, scopeItems, workflowAudit } from "./tokens"

export function RepeatRevenueFAQ() {
  return (
    <section id="scope" data-section="faq-scope" className="scroll-mt-[120px] bg-white px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="text-sm font-bold text-[#15803D]">Questions and scope</p>
          <h2 className="mt-4 text-[2.35rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#102033] sm:text-5xl">
            Clear answers before you buy.
          </h2>
          <div className="mt-7 flex flex-col gap-3">
            <CTALink
              href={workflowAudit.stripePaymentLink.url}
              kind="checkout"
              location="repeat_revenue_faq_audit_green_funnel"
              analyticsEvent="audit_checkout_clicked"
              analyticsSource="repeat_revenue_page"
              packageId="workflow_audit"
              packageName="Workflow Audit"
              billingPeriod="one_time"
              ctaLabel="Start with the Workflow Audit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#15803D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#17612E]"
            >
              Start with the Workflow Audit
            </CTALink>
            <CTALink
              href={repeatMonthly.stripePaymentLink.url}
              kind="checkout"
              location="repeat_revenue_faq_buy_green_funnel"
              analyticsEvent="package_checkout_clicked"
              analyticsSource="repeat_revenue_page"
              packageId={repeatMonthly.analyticsPackageId}
              packageName={repeatMonthly.publicName}
              billingPeriod={repeatMonthly.billingPeriod}
              ctaLabel="Buy Repeat Revenue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#15803D] px-6 py-3 text-sm font-bold text-[#102033] transition hover:bg-[#E8F6EC]"
            >
              Buy Repeat Revenue
            </CTALink>
          </div>
        </div>

        <div>
          <div className="divide-y divide-[#D5DEE8] border-y border-[#D5DEE8]">
            {faqItems.map(([question, answer]) => (
              <details key={question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-xl font-bold tracking-[-0.025em] text-[#102033]">
                  {question}
                  <span className="text-2xl text-[#15803D] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-3xl text-base leading-7 text-[#516F90]">{answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-7 rounded-[1.2rem] border border-[#D5DEE8] bg-[#F8FBF9] p-6">
            <h3 className="text-2xl font-bold tracking-[-0.035em] text-[#102033]">Plain scope</h3>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#33475B]">
              {scopeItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803D]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
