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
        
        <section className={`${shell} pt-28 pb-16 lg:pt-32`}>
          <h1 className="max-w-5xl text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4.4rem]">Ask about making the office faster before hiring another admin.</h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#42596C]">Tell us whether you need the Admin Drag Calculator, AI Office Map, Installation Sprint, AI Office Ops, or a general fit question answered.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {["Calculator / question", "Book the $197 AI Office Map", "Installation Sprint", "AI Office Ops", "General fit question"].map((item) => (
              <Link key={item} href={`mailto:hello@stanley-systems.com?subject=${encodeURIComponent(item)}`} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-6 text-xl font-semibold tracking-[-0.01em] shadow-[0_14px_38px_rgba(7,29,58,0.05)] transition hover:-translate-y-0.5 hover:border-[#15803D]">
                {item}<ArrowRight className="mt-4 h-5 w-5 text-[#15803D]" />
              </Link>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/invoicing-delay-cash-flow-calculator" className={primary}>Calculate Your Admin Drag</Link><Link href="/workflow-audit" className={secondary}>Book the $197 AI Office Map</Link></div>
        </section>

      </main>
      <Footer />
    </>
  )
}
