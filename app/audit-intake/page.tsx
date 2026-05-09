import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { ContactSection } from "@/components/contact-section"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Workflow Audit Intake | Stanley Systems",
  description: "Send the workflow context Stanley Systems needs after buying the Workflow Audit.",
}

export default function AuditIntakePage() {
  return (
    <MarketingPageShell>
      <div className="px-4 pb-4 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Audit intake</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#071D3A] sm:text-6xl">Send the workflow context.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#536173]">Use this intake after buying the Workflow Audit. If you have not bought yet, start at <Link href="/audit-started" className="font-extrabold text-[#116832] underline underline-offset-4">audit started</Link>.</p>
          <div className="mx-auto mt-6 grid max-w-3xl gap-3 text-left sm:grid-cols-3">
            {["Where billing or follow-up gets stuck", "Which software holds jobs, invoices, payments, and customers", "What first fix would matter most to the owner"].map((item) => <div key={item} className="rounded-2xl border border-[#DDEBE2] bg-white p-4 text-sm font-semibold leading-6 text-[#536173]"><CheckCircle2 className="mb-2 h-5 w-5 text-[#15803D]" />{item}</div>)}
          </div>
        </div>
      </div>
      <ContactSection />
    </MarketingPageShell>
  )
}
