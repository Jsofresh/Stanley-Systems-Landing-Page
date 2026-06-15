import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export default function LegacyWorkflowPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBFCF7] px-4 pt-28 pb-16 text-[#071D3A] sm:px-6 lg:px-8 lg:pt-32">
        <section className="mx-auto max-w-5xl rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_24px_70px_rgba(7,29,58,0.08)] sm:p-10">
          <h1 className="text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4rem]">Follow-up + repeat work workflow</h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#42596C]">Estimates, service recovery, reviews, referrals, and repeat-work opportunities get routed before they go cold.</p>
          <ul className="mt-8 grid gap-3"><li className="flex gap-3 text-base font-semibold leading-7 text-[#34495F]"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#15803D]" />Estimate follow-up stops relying on memory.</li><li className="flex gap-3 text-base font-semibold leading-7 text-[#34495F]"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#15803D]" />Customer issues and service recovery get surfaced.</li><li className="flex gap-3 text-base font-semibold leading-7 text-[#34495F]"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#15803D]" />Review/referral asks get handled without staff guessing.</li><li className="flex gap-3 text-base font-semibold leading-7 text-[#34495F]"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#15803D]" />Past-customer opportunities are routed into the office workflow.</li></ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/ai-office-map" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)]">Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/invoicing-delay-cash-flow-calculator" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832]">Calculate Your Admin Drag</Link></div>
        </section>
      </main>
      <Footer />
    </>
  )
}
