import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const primary = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const secondary = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:bg-[#f3fbf5]"

function Bullets({ items }: { items: string[] }) {
  return <ul className="mt-6 grid gap-3">{items.map((item) => <li key={item} className="flex gap-3 text-base font-semibold leading-7 text-[#34495F]"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />{item}</li>)}</ul>
}

export default function PAGE() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBFCF7] text-[#071D3A]">
        
        <section className={`${shell} pt-28 pb-12 lg:pt-32 lg:pb-16`}>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h1 className="text-[2.55rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4.25rem]">Find where your office is falling behind — before you hire another admin.</h1>
              <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-[#42596C]">In one focused session, Stanley Systems maps the admin drag slowing down your office, shows what your software already handles, and identifies the AI workflows that can make your current team faster, cleaner, and more profitable.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/pricing#ai-office-map" className={primary}>Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/invoicing-delay-cash-flow-calculator" className={secondary}>Calculate admin drag first</Link></div>
              <p className="mt-4 text-sm font-bold text-[#607588]">The $197 applies toward your AI Office Installation Sprint.</p>
            </div>
            <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_24px_70px_rgba(7,29,58,0.08)]"><img src="/images/placeholders/ai-office/ai-office-map-placeholder.svg" alt="AI Office Map placeholder" className="h-auto w-full rounded-[1.5rem]" /></div>
          </div>
        </section>
        <section className={`${shell} py-14 lg:py-16`}>
          <div className="grid gap-5 lg:grid-cols-3">
            {["Where admin drag is costing time, money, follow-up, and quality.", "What your current field-service and accounting tools already handle.", "What your staff is still forced to chase, copy, check, or reconcile.", "Your top 3 AI workflow opportunities.", "Your one-page AI Office Map.", "$197 Sprint credit when you move forward."].map((item) => <article key={item} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 text-base font-bold leading-7 text-[#34495F] shadow-[0_14px_38px_rgba(7,29,58,0.05)]">{item}</article>)}
          </div>
        </section>
        <section className={`${shell} pb-20 lg:pb-24`}>
          <div className="rounded-[2rem] bg-[#071D3A] p-6 text-white sm:p-8 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <div><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">We check what your tools already do before recommending anything.</h2></div>
            <Bullets items={["Your current field-service software, CRM, accounting software, inbox, phone, and text flow get reviewed first.", "Stanley Systems only recommends workflows that improve the office around those tools.", "The result is not another screen for staff to babysit. It is a practical map for cleaner records, faster follow-up, and more work processed by the same team."]} />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
