import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Service Business Billing Process Fix | Stanley Systems",
  description:
    "Fix the service-business billing process that keeps completed work sitting before invoices go out and cash comes in.",
  alternates: {
    canonical: "https://stanley-systems.com/service-business-billing-process-fix",
  },
}

const billingBreaks = [
  "Completed work sits before anyone can send the invoice.",
  "Billing depends on missing notes, scattered details, or one more clarification.",
  "The office re-enters information that should have already been captured cleanly.",
  "Owners end up checking status manually because the process is not dependable yet.",
]

const billingGains = [
  "Invoices move out faster because the office gets cleaner information sooner.",
  "The team spends less time rebuilding the story of the job before billing.",
  "Cash starts moving faster because completed work does not sit as long.",
  "The owner spends less time rescuing the billing process by hand.",
]

export default function ServiceBusinessBillingProcessFixPage() {
  return (
    <MarketingPageShell>
      <section className="bg-[#F7F4EC] px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-[#071D3A] sm:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
                Clean up the billing process that slows cash after the work is already done.
              </h1>
              <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-[#42596C] sm:text-xl">
                Slow billing is usually not just an accounting problem. It starts earlier, when completed work is still missing what the office needs to move billing forward cleanly. Stanley Systems helps fix that path.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/workflow-audit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]">
                  Book the $197 AI Office Map
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/invoicing-delay-cash-flow-calculator" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:bg-[#f3fbf5]">
                  Calculate Your Admin Drag
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur">
              <ul className="mt-5 space-y-4">
                {billingBreaks.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-[#34495F]">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.75rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#071D3A]">Cash waits longer than it should</h2>
              <p className="mt-4 text-base leading-7 text-[#536173]">
                If work is complete but billing still takes days to catch up, the business is waiting on money it already earned. That slows collections and keeps the office under pressure.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#071D3A]">Too much billing cleanup happens after the fact</h2>
              <p className="mt-4 text-base leading-7 text-[#536173]">
                The office should not need to chase down job details, retype information, and ask one more round of questions before an invoice can go out.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#071D3A]">The path from completed work to clean billing</h2>
              <p className="mt-4 text-base leading-7 text-[#536173]">
                Stanley Systems helps make the billing process clearer, cleaner, and faster inside the tools the business already uses.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[2rem] border border-[#DDEBE2] bg-[#FBFCF7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
              <ul className="mt-6 space-y-4">
                {billingGains.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-[#34495F]">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#15803D]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-[#DDEBE2] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#071D3A]">If billing keeps lagging after jobs are done, measure what that delay is doing first.</h2>
              <p className="mt-4 text-base leading-7 text-[#536173]">
                Start with the cash-flow impact. Then decide whether the problem starts in job closeout, office handoff, or billing cleanup.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/invoicing-delay-cash-flow-calculator" className="inline-flex items-center justify-center rounded-full bg-[#15803D] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#166534]">
                  Use the invoicing delay calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/speed-up-invoicing-for-service-businesses" className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3.5 text-base font-semibold text-[#071D3A] transition hover:bg-[#f4efe6]">
                  Read about slow invoicing
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  )
}
