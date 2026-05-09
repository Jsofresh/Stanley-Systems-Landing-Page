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
      className="mt-2 inline-flex min-h-10 w-full items-center justify-center rounded-md border-2 border-[#15803D] px-4 py-2.5 text-sm font-bold text-[#102033] transition hover:bg-[#E8F6EC]"
    >
      {label}
    </CTALink>
  )
}

function badgeClass(tone: string) {
  if (tone === "recommended") return "bg-[#E11D48] text-white shadow-[0_12px_24px_rgba(225,29,72,0.18)]"
  if (tone === "yearly") return "bg-[#E11D48] text-white shadow-[0_12px_24px_rgba(225,29,72,0.18)]"
  if (tone === "complete") return "bg-[#102A43] text-white shadow-[0_12px_24px_rgba(16,42,67,0.16)]"
  return "bg-white text-[#102033] ring-1 ring-[#D5DEE8]"
}

export function RepeatRevenuePricing() {
  return (
    <section id="plans" data-section="pricing" className="scroll-mt-[120px] bg-[#F8FBF9] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold text-[#15803D]">Packages</p>
          <h2 className="mt-3 text-[2.2rem] font-semibold leading-[1.03] tracking-[-0.045em] text-[#102033] sm:text-5xl lg:text-[2.9rem]">
            Choose the path that matches the leak.
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-[#33475B] sm:text-lg">
            Buy the package that matches the problem you already know, or start with the audit and let the numbers choose the first build.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-[#B7D8C0] bg-white px-5 py-3 text-center text-sm font-extrabold text-[#124E25] shadow-[0_12px_30px_rgba(33,51,67,0.06)]">
          Yearly plans save 20%, waive installation, and double the audit credit to $194.
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {packageCards.map((card) => {
            const isRecommended = card.tone === "recommended"
            const isYearly = card.tone === "yearly" || card.tone === "recommended"
            return (
              <article
                key={card.name}
                className={`flex min-h-full flex-col rounded-[1.1rem] border p-4 shadow-[0_14px_34px_rgba(33,51,67,0.08)] ${
                  isRecommended
                    ? "border-[#15803D] bg-white ring-2 ring-[#A7D8B4]"
                    : isYearly
                      ? "border-[#9FCFAD] bg-white"
                      : "border-[#D5DEE8] bg-white"
                }`}
              >
                <p className={`mb-4 inline-flex w-fit rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] ${badgeClass(card.tone)}`}>{card.badge}</p>
                <h3 className="text-lg font-bold leading-tight tracking-[-0.025em] text-[#102033]">{card.name}</h3>
                <p className="mt-2 text-[2.25rem] font-bold leading-none tracking-[-0.055em] text-[#102033]">{card.package.priceDisplay}</p>
                <p className="mt-2 min-h-[56px] text-sm leading-5 text-[#33475B]">{card.description}</p>

                <div className="mt-3 grid gap-2 border-y border-[#C8D8CE] py-2 text-xs font-semibold leading-5 text-[#33475B]">
                  <div className="rounded-xl bg-[#F8FCF9] px-3 py-2 ring-1 ring-[#E0E9E3]">{card.install}</div>
                  <div className="rounded-xl bg-[#E8F6EC] px-3 py-2 font-extrabold text-[#124E25] ring-1 ring-[#B7D8C0]">{card.credit}</div>
                </div>

                {card.callout ? (
                  <p className="mt-3 rounded-2xl border border-[#B7D8C0] bg-[#F2FBF4] px-3 py-2 text-xs font-extrabold leading-5 text-[#124E25] shadow-[0_10px_22px_rgba(31,122,58,0.08)]">
                    {card.callout}
                  </p>
                ) : null}

                <ul className="mt-3 grid gap-1.5 text-xs leading-5 text-[#33475B]">
                  {card.bullets.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803D]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
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
                    className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-[#15803D] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#17612E]"
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
