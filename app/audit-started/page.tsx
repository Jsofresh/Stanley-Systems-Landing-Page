import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, CheckCircle2, CalendarCheck } from "lucide-react"

import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Workflow Audit Started | Stanley Systems",
  description: "Book the walkthrough after paying for the Stanley Systems Workflow Audit.",
}

const steps = [
  "Payment received",
  "Book walkthrough",
  "Complete audit intake",
  "Share screen, exports, screenshots, or temporary user access if needed",
  "Receive Money Leak Map",
]

export default function AuditStartedPage() {
  return (
    <MarketingPageShell>
      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_20px_60px_rgba(7,29,58,0.08)] sm:p-10">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Workflow Audit</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#071D3A] sm:text-6xl">Your Workflow Audit is paid. Book the walkthrough next.</h1>
          <p className="mt-5 text-lg font-semibold leading-8 text-[#536173]">Choose a 30-minute time with Stanley Systems so we can walk through how your office handles jobs, invoices, estimates, follow-up, reviews, referrals, and handoffs today.</p>

          <div className="mt-8 rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFEFA] p-5">
            <h2 className="text-xl font-extrabold tracking-[-0.02em] text-[#071D3A]">Audit progress</h2>
            <ol className="mt-4 grid gap-3">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm font-semibold leading-6 text-[#536173]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EAF6E6] text-xs font-extrabold text-[#116832] ring-1 ring-[#CFE8D5]">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-[#CFE8D5] bg-[#F4FBF5] p-5 text-sm font-semibold leading-6 text-[#536173]">
            <p className="font-extrabold text-[#071D3A]">Scheduler note</p>
            <p className="mt-2">No verified scheduler URL is currently hardcoded here. Use the audit intake route now; the booking-link value can be wired from config when the scheduler destination is finalized.</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/audit-intake" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#116832]">Complete audit intake <ArrowRight className="ml-2 h-4 w-4" /></Link>
            <a href="mailto:hello@stanley-systems.com?subject=Workflow%20Audit%20booking%20link" className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] hover:bg-[#F4FBF5]"><CalendarCheck className="mr-2 h-4 w-4" />Send me the booking link by email</a>
          </div>
        </div>
      </main>
    </MarketingPageShell>
  )
}
