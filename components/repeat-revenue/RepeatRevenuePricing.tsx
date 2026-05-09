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
      ctaLabel={label}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md border-2 border-[#FF5C35] px-4 py-3 text-sm font-bold text-[#213343] transition hover:bg-[#FFF1EB]"
    >
      {label}
    </CTALink>
  )
}

export function RepeatRevenuePricing() {
  return (
    <section id="plans" data-section="pricing" className="bg-[#F8F4EA] px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#FF5C35]">Packages</p>
          <h2 className="mt-5 font-serif text-[2.55rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#213343] sm:text-5xl">
            Choose the path that matches the leak.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#33475B]">
            Buy the package that matches the problem you already know, or start with the audit and let the numbers choose the first build.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {packageCards.map((card) => (
            <article
              key={card.name}
              className={`flex min-h-full flex-col rounded-[1.15rem] border bg-white p-6 shadow-[0_18px_42px_rgba(33,51,67,0.08)] ${
                card.highlight ? "border-[#FF5C35] ring-4 ring-[#FFE0D4]" : "border-[#D5DEE8]"
              }`}
            >
              {card.highlight ? <p className="mb-4 w-fit rounded-full bg-[#FFF1EB] px-3 py-1 text-xs font-bold text-[#C13B1B]">Yearly value</p> : null}
              <h3 className="text-xl font-bold leading-tight tracking-[-0.025em] text-[#213343]">{card.name}</h3>
              <p className="mt-4 text-[2.75rem] font-bold leading-none tracking-[-0.055em] text-[#213343]">{card.package.priceDisplay}</p>
              <p className="mt-4 min-h-[72px] text-sm leading-6 text-[#516F90]">{card.description}</p>

              <div className="mt-5 space-y-2 border-y border-[#D5DEE8] py-4 text-sm font-semibold leading-5 text-[#33475B]">
                <p>{card.install}</p>
                <p>{card.credit}</p>
              </div>

              <ul className="mt-5 grid gap-2 text-sm leading-5 text-[#33475B]">
                {card.bullets.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF5C35]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <CTALink
                  href={card.package.stripePaymentLink.url}
                  kind="checkout"
                  location={`repeat_revenue_pricing_hubspot_v2_${card.package.id}`}
                  analyticsEvent="package_checkout_clicked"
                  analyticsSource="repeat_revenue_page"
                  packageId={card.package.analyticsPackageId}
                  packageName={card.package.publicName}
                  billingPeriod={card.package.billingPeriod}
                  ctaLabel={card.cta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#FF5C35] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#E04826]"
                >
                  {card.cta}
                </CTALink>
                <AuditLink label={card.secondary} location={`repeat_revenue_pricing_audit_hubspot_v2_${card.package.id}`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
