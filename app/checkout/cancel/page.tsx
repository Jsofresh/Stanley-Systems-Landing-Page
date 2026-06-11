import type { Metadata } from "next"
import Link from "next/link"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { workflowAuditPricingPackage } from "@/lib/pricing/source-of-truth"

export const metadata: Metadata = {
  title: "Payment was not completed | Stanley Systems",
  description: "Your checkout was canceled or not completed. Return to pricing or buy the AI Office Map when you are ready.",
  alternates: {
    canonical: "/checkout/cancel",
  },
}

export default function CheckoutCancelPage() {
  return (
    <MarketingPageShell>
      <main className="px-4 pb-20 pt-28 text-[#102033] sm:pt-32 lg:pt-36">
        <section className="mx-auto max-w-4xl rounded-[2rem] border border-[#dfe7ee] bg-white/92 p-6 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#102033] sm:text-5xl lg:text-6xl">
            Payment was not completed.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#536173] sm:text-xl">
            No Stanley Systems payment was completed from this checkout. You can return to pricing, or buy the AI Office Map if you want the paid diagnostic first.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c9d6df] bg-white px-6 py-3 text-sm font-semibold text-[#102033] transition hover:border-[#9fb7c8] hover:bg-[#f8fbfc] focus:outline-none focus:ring-2 focus:ring-[#102033] focus:ring-offset-2"
              data-cta-label="Return to Pricing"
              data-cta-location="checkout_cancel_primary"
            >
              Return to Pricing
            </Link>
            <a
              href={workflowAuditPricingPackage.stripePaymentLink.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#102033] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1b344f] focus:outline-none focus:ring-2 focus:ring-[#102033] focus:ring-offset-2"
              data-analytics-event="audit_checkout_clicked"
              data-analytics-source="checkout_cancel"
              data-package-id={workflowAuditPricingPackage.analyticsPackageId}
              data-package-name={workflowAuditPricingPackage.publicName}
              data-billing-period={workflowAuditPricingPackage.billingPeriod}
              data-cta-label="Buy AI Office Map"
              data-cta-location="checkout_cancel_secondary"
            >
              Buy AI Office Map
            </a>
          </div>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[#bfe4c8] bg-[#f4fbf5] p-5 text-left text-sm leading-7 text-[#335244]">
            If you meant to buy a package but need a different path, return to pricing and choose the system that fits the leak you can name. If you are not sure yet, the AI Office Map is the safest first step.
          </div>
        </section>
      </main>
    </MarketingPageShell>
  )
}
