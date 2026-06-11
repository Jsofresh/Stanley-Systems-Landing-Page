import type { ComponentType } from "react"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { SectionShell } from "@/components/visual-primitives"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import {
  CashApprovedDisplayAsset,
  CompletedJobDisplayAsset,
  InactiveCustomersDisplayAsset,
  ReferralNetworkDisplayAsset,
  type DisplayAssetProps,
} from "@/components/visual-kit/display-assets"

type DisplayPrimitive = ComponentType<DisplayAssetProps>

const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url

type AuditPathCard = {
  title: string
  items: string
  result: string
  Icon: DisplayPrimitive
  AccentIcon: DisplayPrimitive
}

const auditPaths: AuditPathCard[] = [
  {
    title: "AI Office Installation Sprint",
    items: "Finished jobs, invoices, open balances, handoffs.",
    result: "Earned money moves toward collected cash faster.",
    Icon: CompletedJobDisplayAsset,
    AccentIcon: CashApprovedDisplayAsset,
  },
  {
    title: "AI Office Ops",
    items: "Saved customers, review requests, referrals, captured calls.",
    result: "Past customers turn into repeat jobs, referral opportunities, review requests, and booked calls before more money goes to cold leads.",
    Icon: InactiveCustomersDisplayAsset,
    AccentIcon: ReferralNetworkDisplayAsset,
  },
]

function AuditPathCard({ path, index }: { path: AuditPathCard; index: number }) {
  return (
    <article className="relative overflow-hidden rounded-[1.15rem] border border-[#dfe8d9] bg-[linear-gradient(180deg,#ffffff_0%,#fbfdf8_100%)] p-3.5 shadow-[0_14px_30px_rgba(16,32,51,0.055)] sm:p-5">
      <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-[#DDF7E8]/45" aria-hidden="true" />
      <div className="relative flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-sm font-black text-white shadow-[0_10px_22px_rgba(21,128,61,0.18)]">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-extrabold leading-tight text-[#102033]">{path.title}</h3>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2f8f0] ring-1 ring-[#d9eedf]">
              <path.Icon size={38} decorative />
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold leading-5 text-[#526273]">{path.items}</p>
          <p className="mt-2 flex items-start gap-2 text-sm font-extrabold leading-5 text-[#102033]">
            <path.AccentIcon size={28} decorative />
            <span>Result: {path.result}</span>
          </p>
        </div>
      </div>
    </article>
  )
}

export function ProofStripSection() {
  return (
    <SectionShell
      id="workflow-audit-paths"
      data-section="workflow-proof"
      data-audit-page="/"
      data-audit-section="home.workflow-audit-paths"
      data-audit-priority="3"
      data-audit-offer="AI Office Map"
      data-audit-purpose="Explain the two money paths checked by the AI Office Map before the two systems are introduced."
      title="The AI Office Map checks two money paths."
      description="One path finds cash stuck after the work is done. The other checks the customer list your business already owns before more money gets spent chasing new leads."
      className="relative z-10 scroll-mt-28 bg-transparent px-4 pb-8 pt-4 sm:scroll-mt-32 sm:pb-10 sm:pt-5 lg:scroll-mt-36 lg:py-10"
      containerClassName="rounded-[1.35rem] border border-[#e4eadf] bg-white/95 px-4 py-5 shadow-[0_18px_44px_rgba(15,23,42,0.055)] sm:rounded-[1.75rem] sm:px-6 sm:py-6 lg:px-7 lg:py-7"
      headerClassName="mb-4 max-w-4xl md:mb-5"
    >
      <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
        {auditPaths.map((path, index) => (
          <AuditPathCard key={path.title} path={path} index={index} />
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
        <CTALink
          href={auditHref}
          kind="checkout"
          location="workflow_audit_paths_primary"
          analyticsEvent="audit_checkout_clicked"
          analyticsSource="homepage_workflow_audit_paths"
          packageId="workflow_audit"
          packageName="AI Office Map"
          billingPeriod="one_time"
          ctaLabel="Book the $197 AI Office Map"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(21,128,61,0.2)] transition hover:bg-[#116832] sm:px-8"
        >
          Book the $197 AI Office Map
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </CTALink>
        <CTALink
          href="/pricing#compare-systems"
          kind="systems"
          location="workflow_audit_paths_secondary"
          analyticsEvent="package_compare_clicked"
          analyticsSource="homepage_workflow_audit_paths"
          ctaLabel="Compare systems"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbd8c7] bg-white px-6 py-3 text-sm font-bold text-[#116832] shadow-[0_10px_24px_rgba(16,32,51,0.05)] transition hover:border-[#15803D] hover:bg-[#f7fcf7] sm:px-8"
        >
          Compare systems
        </CTALink>
      </div>
    </SectionShell>
  )
}
