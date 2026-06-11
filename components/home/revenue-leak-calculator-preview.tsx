import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"

const calculatorHref = "/invoicing-delay-cash-flow-calculator"

const leakCategories = ["Delayed invoices", "Dormant customers", "Open estimates", "Missed calls"] as const

export function RevenueLeakCalculatorPreview() {
  return (
    <section
      data-section="revenue-leak-calculator-preview"
      data-nav-theme="light"
      aria-labelledby="revenue-leak-calculator-preview-heading"
      className="relative isolate overflow-hidden bg-[#FBFCF7] px-5 py-8 text-[#071D3A] md:px-8 lg:px-10 lg:py-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[radial-gradient(circle_at_50%_0%,rgba(8,166,75,0.1),rgba(251,252,247,0)_66%)]" />

      <div className="mx-auto grid max-w-[78rem] gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="max-w-[650px]">
          <h2
            id="revenue-leak-calculator-preview-heading"
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-balance text-[34px] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#071D3A] sm:text-[44px] lg:text-[54px] [font-family:var(--font-heading)]"
          >
            Run the numbers. See where money is getting stuck.
          </h2>
          <p className="mt-4 max-w-[610px] text-pretty text-[16px] font-medium leading-7 text-[#334B60]">
            Delayed cash, missed follow-up, old customers, and missed calls do not look expensive until the numbers sit in one place.
          </p>

          <div className="mt-5 rounded-[22px] border border-[#D7E7DC] bg-white p-4 shadow-[0_14px_34px_rgba(7,29,58,0.055)] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#087B3F]">Sample monthly revenue held back</p>
                <p
                  style={{ fontFamily: "var(--font-heading)" }}
                  className="mt-1 text-[50px] font-extrabold leading-none tracking-[-0.06em] text-[#071D3A] sm:text-[60px] [font-family:var(--font-heading)]"
                >
                  $23,450
                </p>
              </div>
              <CTALink
                href={calculatorHref}
                kind="calculator"
                location="home_revenue_leak_preview"
                analyticsEvent="calculator_cta_clicked"
                ctaLabel="Calculate Your Admin Drag"
                className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-full bg-[#08A64B] px-5 py-2.5 text-[14px] font-extrabold text-white shadow-[0_12px_24px_rgba(8,166,75,0.18)] transition hover:-translate-y-0.5 hover:bg-[#087B3F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08A64B]"
              >
                Calculate Your Admin Drag
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </CTALink>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-4">
              {leakCategories.map((category) => (
                <div key={category} className="rounded-[14px] border border-[#E0ECE4] bg-[#FBFEFA] px-3 py-2.5">
                  <p className="text-[13px] font-extrabold leading-tight text-[#071D3A]">{category}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] font-semibold leading-5 text-[#607588]">
              No homepage inputs. This preview sends you to the full calculator.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-[#D7E7DC] bg-white shadow-[0_22px_56px_rgba(7,29,58,0.09)]">
          <Image
            src="/images/uploaded/homepage/held-back-revenue-audit.jpg"
            alt="Held-back revenue assessment visual showing where money is getting stuck before the AI Office Map finds the leak."
            width={1280}
            height={960}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </div>
    </section>
  )
}
