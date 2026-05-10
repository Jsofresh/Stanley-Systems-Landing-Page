import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { plans, sectionShell } from "./tokens"

export function CashflowControlHero() {
  return (
    <section data-section="cashflow-hero" className="relative overflow-hidden bg-[#FBFCF7] pb-12 pt-24 sm:pb-14 lg:pt-20">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.10),rgba(251,252,247,0)_68%)]" aria-hidden="true" />
      <div className={`${sectionShell} relative grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center`}>
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#15803D]">Cashflow Control System</p>
          <h1 className="mt-2 max-w-5xl text-[2.45rem] font-semibold leading-[0.98] tracking-[-0.052em] text-[#071D3A] sm:text-[3.35rem] lg:text-[3.85rem]">
            Automate the path from customer intake to final bill.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#334B60] sm:text-[1.05rem]">
            Stop letting finished work wait on re-entry, missing billing details, and office handoffs. Cashflow Control gives the path from request to paid bill one owner: the system.
          </p>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-[#536173]">
            Built around the tools service businesses already use for field work, accounting, invoices, payments, customer records, and scheduling.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <CTALink href={plans.cashflowMonthly.stripePaymentLink.url} kind="checkout" location="cashflow_hero_primary" analyticsEvent="package_checkout_clicked" analyticsSource="cashflow_control_page" packageId={plans.cashflowMonthly.analyticsPackageId} packageName="Cashflow Control System" billingPeriod="monthly" ctaLabel="Start Cashflow Control" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#15803D] px-7 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:bg-[#116832]">
              Start Cashflow Control <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </CTALink>
            <CTALink href={plans.workflowAudit.stripePaymentLink.url} kind="checkout" location="cashflow_hero_audit" analyticsEvent="audit_checkout_clicked" analyticsSource="cashflow_control_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start with the Workflow Audit" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-7 py-4 text-base font-extrabold text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] transition hover:border-[#15803D] hover:bg-[#F4FBF5]">
              Start with the Workflow Audit
            </CTALink>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[#607080]">
            Your audit fee credits toward Cashflow Control or Repeat Revenue. Yearly buyers get a $194 credit.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
          <div className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_20px_60px_rgba(7,29,58,0.07)] ring-1 ring-[#DDEBE2]">
            <Image
              src="/images/uploaded/cashflow-control/customer-intake-to-cash-collected-hero-crop.jpg"
              alt="Customer intake moving through finished job, billing ready, invoice sent, and cash collected."
              width={1254}
              height={520}
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="mt-3 text-center text-sm font-semibold text-[#607080]">
            Prefer to compare first? <Link href="#cashflow-pricing" className="font-extrabold text-[#116832] underline underline-offset-4">See all pricing</Link>.
          </div>
        </div>
      </div>
    </section>
  )
}
