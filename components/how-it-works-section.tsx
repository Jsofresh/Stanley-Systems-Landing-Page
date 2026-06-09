import type { ComponentType } from "react"
import { CTALink } from "@/components/cta-link"
import { IconArrowRight, IconShieldCheck } from "@tabler/icons-react"
import {
  DelayedInvoiceDisplayAsset,
  FirstFixWrenchDisplayAsset,
  InactiveCustomersDisplayAsset,
  InvoiceApprovedDisplayAsset,
  OfficeReworkDisplayAsset,
  type DisplayAssetProps,
} from "@/components/visual-kit/display-assets"

type DisplayPrimitive = ComponentType<DisplayAssetProps>

const calculatorHref = "/invoicing-delay-cash-flow-calculator"

const auditSteps: Array<{
  number: string
  title: string
  body: string
}> = [
  {
    number: "1",
    title: "Confirm the leak",
    body: "Find where cash, calls, and office time get stuck.",
  },
  {
    number: "2",
    title: "Show what it costs",
    body: "Put delayed cash and payroll hours in plain numbers.",
  },
  {
    number: "3",
    title: "Start with the leak that pays back fastest",
    body: "Leave with the first workflow gap Stanley Systems should fix.",
  },
]

const leakMetrics: Array<{
  label: string
  value: string
  suffix: string
  Icon: DisplayPrimitive
}> = [
  { label: "Delayed invoices", value: "Ready", suffix: "to bill", Icon: DelayedInvoiceDisplayAsset },
  { label: "Open estimates", value: "Open", suffix: "next step", Icon: InvoiceApprovedDisplayAsset },
  { label: "Office rework", value: "30+", suffix: "hrs/mo", Icon: OfficeReworkDisplayAsset },
  { label: "Inactive customers", value: "12+", suffix: "months", Icon: InactiveCustomersDisplayAsset },
]

export function HowItWorksSection() {
  return (
    <section
      id="audit"
      data-section="audit-output-preview"
      data-audit-page="/"
      data-audit-section="home.workflow-audit"
      data-audit-priority="5"
      data-audit-offer="Office Process Assessment"
      data-audit-purpose="Show that the Office Process Assessment finds money leaks hiding inside the office workflow."
      className="relative z-10 scroll-mt-28 px-4 py-8 sm:scroll-mt-32 sm:py-10 lg:scroll-mt-36 lg:py-8"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-[#d9e4d0] bg-[linear-gradient(180deg,#f4faef_0%,#fbfaf4_68%,#fffefa_100%)] p-4 shadow-[0_20px_58px_rgba(16,32,51,0.08)] sm:rounded-[2rem] sm:p-5 lg:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] lg:items-center lg:gap-6">
          <div className="min-w-0">
            <h2 className="max-w-[35rem] text-[1.95rem] font-semibold leading-[1.03] text-[#102033] sm:text-[2.65rem] lg:text-[2.8rem]">
              The calculator shows the leak. The Office Process Assessment finds the source.
            </h2>

            <p className="mt-3 max-w-[35rem] text-base leading-7 text-[#48576C] sm:text-[1.05rem] sm:leading-7">
              The Office Process Assessment turns the calculator range into a clear action report: which invoices, estimates, calls, and follow-ups are holding money back, and what to fix first.
            </p>

            <div className="mt-4 grid gap-2.5">
              {auditSteps.map(({ number, title, body }) => (
                <article key={title} className="flex gap-3 rounded-[1rem] border border-[#e1dacd] bg-white/95 p-3 shadow-[0_9px_20px_rgba(16,32,51,0.04)]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-xs font-bold leading-none text-white">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-[0.95rem] font-bold leading-tight text-[#102033]">{title}</h3>
                    <p className="mt-0.5 text-sm leading-5 text-[#536174]">{body}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5">
              <div className="flex flex-col gap-3 sm:flex-row">
              <CTALink
                href={calculatorHref}
                kind="calculator"
                location="workflow_audit_section"
                analyticsEvent="calculator_cta_clicked"
                analyticsSource="homepage_workflow_audit_section"
                ctaLabel="Calculate my office work cost"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(21,128,61,0.24)] ring-1 ring-[#15803D]/15 transition hover:bg-[#116832] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:w-auto"
              >
                Calculate my office work cost
                <IconArrowRight className="h-4 w-4" stroke={2} aria-hidden />
              </CTALink>
              <CTALink
                href="#systems"
                kind="systems"
                location="workflow_audit_section_secondary"
                analyticsEvent="package_compare_clicked"
                analyticsSource="homepage_workflow_audit_section"
                ctaLabel="See the two systems"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#CFE0C5] bg-white px-6 py-3 text-sm font-semibold text-[#102033] shadow-[0_10px_22px_rgba(16,32,51,0.05)] transition hover:border-[#15803D]/40 hover:bg-[#F2FBF5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] sm:w-auto"
              >
                See the two systems
              </CTALink>
              </div>

              <p className="mt-3 flex max-w-[34rem] items-start gap-2.5 rounded-[1rem] border border-[#cfe8d5] bg-[#edf9f1] px-3.5 py-2.5 text-sm leading-6 text-[#34465B] shadow-[0_10px_24px_rgba(21,128,61,0.07)]">
                <IconShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#15803D]" stroke={2} aria-hidden />
                <span>
                  If Stanley Systems cannot find one clear money leak we can fix, qualified businesses get the assessment fee back.{" "}
                  <a href="/terms-and-conditions#audit-guarantee-terms" className="font-semibold text-[#102033] underline decoration-[#15803D]/35 underline-offset-4 transition hover:text-[#15803D]">
                    See guarantee terms.
                  </a>
                </span>
              </p>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-[1.25rem] border border-[#e1dacd] bg-white p-3.5 shadow-[0_20px_54px_rgba(16,32,51,0.095)] sm:p-4 lg:p-5">
            <div className="border-b border-[#ece4d8] pb-3 text-center">
              <div className="mx-auto max-w-[34rem]">
                <h3 className="mt-1.5 text-2xl font-semibold leading-tight text-[#102033] sm:text-[1.85rem]">
                  Money Leak Map
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#667085]">
                  Example assessment snapshot: where money is stuck and which fix should move first.
                </p>
              </div>
            </div>

            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {leakMetrics.map(({ label, value, suffix, Icon }) => (
                <article key={label} className="rounded-[1rem] border border-[#dce9d8] bg-[#fbfefa] p-3 shadow-[0_10px_22px_rgba(16,32,51,0.045)]">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.8rem] bg-[#E7F8ED] shadow-[0_7px_16px_rgba(21,128,61,0.08)] ring-1 ring-[#cfe8d5]">
                      <Icon size={46} decorative />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold leading-tight text-[#102033]">{label}</div>
                      <div className="mt-0.5 text-[1.55rem] font-extrabold leading-none text-[#15803D]">{value}</div>
                      <div className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#3F4E62]">{suffix}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-3 rounded-[1rem] border border-[#cfe8d5] bg-[#effaf2] p-3">
              <div className="flex items-start gap-2.5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.8rem] bg-white ring-1 ring-[#cfe8d5]">
                  <FirstFixWrenchDisplayAsset size={46} decorative />
                </span>
                <div>
                  <p className="mt-1 text-base font-bold leading-tight text-[#102033]">Invoice-ready check</p>
                  <p className="mt-1 text-sm leading-5 text-[#4d5a68]">
                    Confirm job details before billing so finished work can move to invoice without office cleanup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
