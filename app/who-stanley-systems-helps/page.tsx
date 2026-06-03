import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Who Stanley Systems Helps | Service Business Workflows",
  description: "See which service businesses Stanley Systems helps most and when the Cash Flow Assessment is a good fit.",
}

const industries = [
  { name: "Marine service", href: "/industries/marine", leak: "Custom jobs, parts, notes, invoices, and seasonal follow-up can scatter fast." },
  { name: "Plumbing", href: "/industries/plumbing", leak: "Urgent calls and fast jobs need a clean path into billing, reviews, and referrals." },
  { name: "HVAC", href: "/industries/hvac", leak: "Service calls, tune-ups, invoices, and old customers need follow-up before the season moves on." },
  { name: "Electrical", href: "/industries/electrical", leak: "Requests, estimates, approvals, job notes, and invoices get expensive when they split across tools." },
  { name: "Roofing", href: "/industries/roofing", leak: "Leads, estimates, storm work, billing, review asks, and referrals need ownership." },
  { name: "Landscaping", href: "/industries/landscaping", leak: "Seasonal work, add-ons, quotes, billing, and reactivation cannot depend on memory." },
  { name: "General contractors", href: "/industries/general-contractors", leak: "Approvals, photos, details, billing readiness, and past-customer follow-up need one office path." },
  { name: "Adjacent service businesses", href: "/industries/adjacent-service-businesses", leak: "If jobs, customers, billing, and follow-up move through an office, money can leak there." },
]
const costs = ["Finished work waits before billing.", "Open estimates go cold.", "Reviews and referrals depend on memory.", "Past customers are not brought back."]

export default function WhoStanleySystemsHelpsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#F7F4EC] text-[#102033]">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#15803D]">Who Stanley Systems helps</p>
            <h1 className="mt-4 max-w-5xl text-[2.3rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.45rem] lg:text-[4.25rem]">Service businesses doing good work but losing money in the office.</h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#42596C]">Stanley Systems is a fit when calls, estimates, invoices, follow-up, reviews, referrals, or past customers are costing money because the office process is too manual, slow, or easy to miss.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/workflow-audit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:bg-[#116832]">Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/contact?path=pre-buy" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832]">Ask a question</Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-[#071D3A] p-6 text-white shadow-[0_24px_70px_rgba(7,29,58,0.14)] sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#84D99A]">What this can cost before anyone notices</p>
            <h2 className="mt-3 text-[2.25rem] font-semibold leading-none tracking-[-0.05em]">$5k–$25k/mo</h2>
            <p className="mt-3 text-base font-medium leading-7 text-[#DDEBE2]">Not as one dramatic mistake. As repeated office gaps that make earned revenue move too slowly or disappear quietly.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_54px_rgba(7,29,58,0.06)] sm:p-8 lg:grid-cols-2">
          <div>
            <h2 className="text-[2rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#071D3A] sm:text-[2.75rem]">Usually a fit when the office is the bottleneck.</h2>
            <ul className="mt-5 space-y-3">
              {costs.map((item) => <li key={item} className="border-b border-[#E5EEE7] pb-3 text-base font-semibold leading-7 text-[#34495F] last:border-b-0">{item}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">Industries Stanley Systems can help</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {industries.map((industry) => (
                <Link
                  key={industry.name}
                  href={industry.href}
                  className="group relative overflow-hidden rounded-[1.25rem] border border-[#DDEBE2] bg-[#FBFCF7] p-4 shadow-[0_10px_28px_rgba(7,29,58,0.045)] transition hover:-translate-y-0.5 hover:border-[#9ED9B2] hover:bg-white hover:shadow-[0_18px_44px_rgba(21,128,61,0.1)]"
                >
                  <span className="pointer-events-none absolute right-[-2.25rem] top-[-2.25rem] h-24 w-24 rounded-full bg-[#E4F6E9] transition group-hover:scale-125" aria-hidden="true" />
                  <span className="relative flex items-start justify-between gap-4">
                    <span>
                      <span className="block text-lg font-semibold leading-tight tracking-[-0.03em] text-[#071D3A]">{industry.name}</span>
                      <span className="mt-2 block text-sm font-semibold leading-6 text-[#536173]">{industry.leak}</span>
                    </span>
                    <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#15803D] ring-1 ring-[#CFE8D5] transition group-hover:bg-[#15803D] group-hover:text-white">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-[#F4FBF5] p-5 ring-1 ring-[#CFE8D5]">
              <p className="text-sm font-semibold leading-6 text-[#536173]">If the team does field work, office work, billing, estimates, and repeat customer follow-up, the Cash Flow Assessment can show which leak matters first.</p>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
