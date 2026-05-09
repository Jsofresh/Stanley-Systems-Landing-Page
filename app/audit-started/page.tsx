import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { MarketingPageShell } from "@/components/marketing-page-shell"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

export const metadata: Metadata = {
  title: "Workflow Audit Started | Stanley Systems",
  description: "What happens after starting the Stanley Systems Workflow Audit.",
}

const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
const steps = [
  "Buy the $97 Workflow Audit through the existing checkout link.",
  "Use audit intake to send the business, software, and workflow context.",
  "Stanley Systems reviews fit, leak type, access constraints, and the first fix worth making.",
  "If you buy Cashflow Control or Repeat Revenue after the audit, the audit fee credits toward the system; yearly buyers get a $194 credit.",
]

export default function AuditStartedPage() {
  return (
    <MarketingPageShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_20px_60px_rgba(7,29,58,0.08)] sm:p-10">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Workflow Audit</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#071D3A] sm:text-6xl">Start here after checkout.</h1>
          <p className="mt-5 text-lg font-semibold leading-8 text-[#536173]">This page avoids inventing a scheduler. Checkout starts the paid audit path; intake captures the details Stanley Systems needs to inspect the workflow.</p>
          <ul className="mt-7 space-y-3">
            {steps.map((step) => <li key={step} className="flex gap-3 text-sm font-semibold leading-6 text-[#536173]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />{step}</li>)}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTALink href={auditHref} kind="checkout" location="audit_started_checkout" analyticsEvent="audit_checkout_clicked" analyticsSource="audit_started" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Buy the Workflow Audit" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#116832]">Buy the Workflow Audit <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
            <Link href="/audit-intake" className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] hover:bg-[#F4FBF5]">Go to audit intake</Link>
          </div>
        </div>
      </main>
    </MarketingPageShell>
  )
}
