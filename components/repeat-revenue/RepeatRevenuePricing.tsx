import { CTALink } from "@/components/cta-link"
import { packageCards, workflowAudit } from "./tokens"

function AuditLink({ label, location }: { label: string; location: string }) {
  return (
    <CTALink
      href={workflowAudit.stripePaymentLink.url}
      kind="checkout"
      location={location}
      analyticsEvent="audit_checkout_clicked"
      analyticsSource="repeat_revenue_page"
      packageId="workflow_audit"
      packageName="Workflow Audit"
      billingPeriod="one_time"
      ctaLabel="Start with the Workflow Audit"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md border-2 border-[#1F7A3A] px-4 py-3 text-sm font-bold text-[#213343] transition hover:bg-[#E8F6EC]"
    >
      {label}
    </CTALink>
  )
}

export function RepeatRevenuePricing() {
  return (
    <section id="plans" data-section="pricing" className="scroll-mt-[120px] bg-[#F8F4EA] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1F7A3A]">Packages</p>
          <h2 className="mt-4 font-serif text-[2.45rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#213343] sm:text-5xl">
            Choose the path that matches the leak.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#33475B]">
            Buy the package that matches the problem you already know, or start with the audit and let the numbers choose the first build.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {packageCards.map((card) => {
            const isYearly = card.tone === "yearly" || card.tone === "recommended"
            const isRecommended = card.tone === "recommended"
            return (
              <article
                key={card.name}
                className={`flex min-h-full flex-col rounded-[1.1rem] border p-5 shadow-[0_14px_34px_rgba(33,51,67,0.08)] ${
                  isRecommended
                    ? "border-[#1F7A3A] bg-[#DDF3E3] ring-2 ring-[#A7D8B4]"
                    : isYearly
                      ? "border-[#9FCFAD] bg-[#E8F6EC]"
                      : "border-[#D5DEE8] bg-white"
                }`}
              >
                <p className="mb-4 w-fit rounded-full bg-white px-3 py-1 text-xs font-bold text-[#124E25] ring-1 ring-[#C8D8CE]">{card.badge}</p>
                <h3 className="text-xl font-bold leading-tight tracking-[-0.025em] text-[#213343]">{card.name}</h3>
                <p className="mt-3 text-[2.55rem] font-bold leading-none tracking-[-0.055em] text-[#213343]">{card.package.priceDisplay}</p>
                <p className="mt-3 min-h-[66px] text-sm leading-6 text-[#33475B]">{card.description}</p>

                <div className="mt-4 space-y-2 border-y border-[#C8D8CE] py-3 text-sm font-semibold leading-5 text-[#33475B]">
                  <p>{card.install}</p>
                  <p>{card.credit}</p>
                </div>

                {card.callout ? <p className="mt-4 rounded-lg bg-white px-3 py-2 text-sm font-bold leading-5 text-[#124E25] ring-1 ring-[#C8D8CE]">{card.callout}</p> : null}

                <ul className="mt-4 grid gap-2 text-sm leading-5 text-[#33475B]">
                  {card.bullets.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1F7A3A]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5">
                  <CTALink
                    href={card.package.stripePaymentLink.url}
                    kind="checkout"
                    location={`repeat_revenue_pricing_green_funnel_${card.package.id}`}
                    analyticsEvent="package_checkout_clicked"
                    analyticsSource="repeat_revenue_page"
                    packageId={card.package.analyticsPackageId}
                    packageName={card.package.publicName}
                    billingPeriod={card.package.billingPeriod}
                    ctaLabel={card.cta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#1F7A3A] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#17612E]"
                  >
                    {card.cta}
                  </CTALink>
                  <AuditLink label={card.secondary} location={`repeat_revenue_pricing_audit_green_funnel_${card.package.id}`} />
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
