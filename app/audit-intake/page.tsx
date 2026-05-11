import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Cash Flow Assessment Intake | Stanley Systems",
  description: "Send the workflow context Stanley Systems needs after buying the Cash Flow Assessment.",
}

const intakeFields = [
  "Business type",
  "Field, job, CRM, dispatch, or shop system used",
  "Accounting, billing, invoice, or payment system used",
  "Who handles billing or follow-up?",
  "Where does money usually get stuck?",
  "How long after a job is complete does the invoice usually go out?",
  "Do estimates ever sit without a next step?",
  "Do you ask for Google reviews now?",
  "Do you track referrals now?",
  "Rough monthly volume: jobs, invoices, estimates, and calls",
  "Preferred way to review data: screen share, exports/screenshots, or temporary invited user",
  "Anything else Stanley Systems should know?",
]

export default function AuditIntakePage() {
  return (
    <MarketingPageShell>
      <main className="px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Assessment intake</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#071D3A] sm:text-6xl">Tell Stanley Systems what to review before the assessment.</h1>
            <p className="mt-5 text-lg leading-8 text-[#536173]">Use this after buying the Cash Flow Assessment. The intake gives Stanley Systems enough context to review cash, follow-up, software handoffs, and the first leak worth fixing.</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_48px_rgba(7,29,58,0.06)]">
              <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-[#071D3A]">Safe access copy</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-[#536173]">Stanley Systems does not ask for your password. For the assessment, you can share what is needed through screen share, exports, screenshots, or a temporary invited user. Access is limited to what is needed to find the leak and explain the fix.</p>
              <Link href="/audit-started" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-[#F4FBF5] px-5 py-3 text-sm font-extrabold text-[#116832] hover:bg-white">Back to assessment start</Link>
            </div>

            <div className="rounded-[2rem] border border-[#DDEBE2] bg-[#FBFEFA] p-6 shadow-[0_18px_48px_rgba(7,29,58,0.06)]">
              <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-[#071D3A]">Intake information to send</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">The full notification-backed intake form still needs final webhook staging. This page makes the post-purchase intake path clear without inventing a fake scheduler or unsafe access process.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {intakeFields.map((item) => (
                  <div key={item} className="rounded-2xl border border-[#DDEBE2] bg-white p-4 text-sm font-semibold leading-6 text-[#536173]"><CheckCircle2 className="mb-2 h-5 w-5 text-[#15803D]" />{item}</div>
                ))}
              </div>
              <a href="mailto:hello@stanley-systems.com?subject=Cash%20Flow%20Assessment%20intake" className="mt-6 inline-flex min-h-13 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#116832]">Send assessment intake</a>
            </div>
          </div>
        </div>
      </main>
    </MarketingPageShell>
  )
}
