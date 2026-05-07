import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Workflow Audit | Stanley Systems",
  description: "Find the first revenue leak before buying a system.",
  alternates: {
    canonical: "https://stanley-systems.com/workflow-audit",
  },
  openGraph: {
    title: "Workflow Audit | Stanley Systems",
    description: "Find the first revenue leak before buying a system.",
    url: "https://stanley-systems.com/workflow-audit",
    siteName: "Stanley Systems",
    type: "website",
  },
}

const auditChecks = [
  "Where finished jobs slow down before invoicing",
  "Which estimates are open without follow-up",
  "Where missed calls and inquiries lose booked work",
  "Which past customers can be reactivated first",
]

export default function WorkflowAuditPage() {
  return (
    <MarketingPageShell>
      <section data-nav-theme="light" className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 rounded-[2.25rem] border border-[#d8e8de] bg-[#fffdf8] p-5 shadow-[0_24px_80px_rgba(7,29,58,0.08)] sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#15803D]">Workflow Audit</p>
              <h1 className="mt-4 max-w-4xl text-[3rem] font-semibold leading-[0.98] tracking-[-0.055em] text-[#071D3A] sm:text-[4.5rem] lg:text-[5.1rem]">
                Find the first revenue leak before buying a system.
              </h1>
              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#42596C] sm:text-xl">
                Stanley Systems checks the actual handoff from lead to job, job to invoice, invoice to payment, and customer to repeat revenue so the first fix is obvious.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+16179586372"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-base font-bold text-white shadow-[0_18px_42px_rgba(21,128,61,0.22)] transition hover:bg-[#116832]"
                >
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  Call Stanley Systems
                </a>
                <Link
                  href="/invoicing-delay-cash-flow-calculator"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#c8d8cd] bg-white px-6 py-3 text-base font-bold text-[#071D3A] transition hover:bg-[#f3faf1]"
                >
                  Run the calculator
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-[#d8e8de] bg-white p-5 shadow-[0_18px_50px_rgba(7,29,58,0.06)] sm:p-6">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#071D3A]">What gets checked first</h2>
              <div className="mt-5 grid gap-3">
                {auditChecks.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#e2ece5] bg-[#fbfcf7] p-4 text-sm font-semibold leading-6 text-[#334B60]">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-2xl border border-[#cfe8d5] bg-[#f0fbf4] p-4 text-sm font-semibold leading-6 text-[#116832]">
                The audit is the starting point when the leak is unclear, the current tools are messy, or the owner wants the first fix before buying a full system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  )
}
