import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "How Stanley Systems Works | Cash Flow Assessment First",
  description:
    "See how Stanley Systems starts with the Cash Flow Assessment, finds the first money leak, then builds the right cash-flow system for a service business.",
  alternates: {
    canonical: "https://stanley-systems.com/how-stanley-systems-works",
  },
  openGraph: {
    title: "How Stanley Systems Works | Cash Flow Assessment First",
    description:
      "Start with the Cash Flow Assessment, identify the leak that costs money, then build the system that stops it.",
    url: "https://stanley-systems.com/how-stanley-systems-works",
    siteName: "Stanley Systems",
    type: "website",
  },
}

const steps = [
  {
    title: "Start with the paid assessment",
    body: "The Cash Flow Assessment reviews the way calls, estimates, invoices, follow-up, and past customers move through the business before anybody buys the wrong system.",
  },
  {
    title: "Name the leak that costs money",
    body: "Stanley Systems looks for the first revenue leak worth fixing: missed calls, late invoices, forgotten follow-ups, loose office handoffs, or dormant customers that should be hearing from you again.",
  },
  {
    title: "Build the system that stops it",
    body: "When the leak is clear, the next step is a focused build: Cashflow Control for cash and office handoffs, Repeat Revenue for customer follow-up, or both when the business needs both paths fixed.",
  },
]

const paths = [
  "Cashflow Control helps work turn into invoice-ready revenue with fewer owner bottlenecks.",
  "Repeat Revenue helps past customers, open estimates, and follow-up opportunities stop disappearing.",
  "The Cash Flow Assessment can credit toward a system when Stanley Systems confirms the right build path.",
]

export default function HowStanleySystemsWorksPage() {
  return (
    <MarketingPageShell>
      <section className="px-4 pb-16 pt-28 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.65rem] lg:leading-[1.06]">
                Stanley Systems starts with the money leak, not a pile of software.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                Service businesses usually do not need another disconnected tool. They need to know where revenue is slipping, which workflow is causing it, and what system should get built first.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/workflow-audit"
                  className="inline-flex items-center justify-center rounded-full bg-[#15803D] px-6 py-3.5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(21,128,61,0.18)] transition hover:bg-[#116832]"
                >
                  Start the Cash Flow Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3.5 text-base font-semibold text-slate-900 transition hover:bg-[#f4efe6]"
                >
                  See systems and pricing
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#e8dfd0] bg-white/90 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">The sequence</h2>
              <ol className="mt-6 space-y-5">
                {steps.map((step, index) => (
                  <li key={step.title} className="grid gap-3 sm:grid-cols-[2.5rem_1fr]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F6EA] text-sm font-extrabold text-[#15803D]">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-base leading-7 text-slate-600">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>

          <div className="mt-12 rounded-[2rem] border border-[#e8dfd0] bg-[#fbfaf7] p-8 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  The assessment decides the first build path.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  The point is not to make the business look complicated. The point is to find the plain operational leak that keeps costing money and put one dependable system around it.
                </p>
              </div>
              <ul className="space-y-4">
                {paths.map((path) => (
                  <li key={path} className="flex gap-3 rounded-[1.35rem] border border-[#e8dfd0] bg-white px-5 py-4 text-base leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />
                    <span>{path}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  )
}
