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
          <h1 className="max-w-5xl text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4.4rem]">Home-service companies do good field work. Profit gets slowed down in office drag.</h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#42596C]">Stanley Systems exists to make the current office team faster, sharper, and more profitable before the owner hires another admin. We install AI into the real handoffs between field-service software, accounting, inbox, phones, texts, and staff workflows.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">{["More jobs processed without dumping more manual work on staff.", "Cleaner records because repetitive copying and checking gets handled earlier.", "Faster follow-up because estimates, issues, and billing readiness stop depending on memory."].map((item) => <article key={item} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-6 text-lg font-bold leading-8 text-[#34495F] shadow-[0_14px_38px_rgba(7,29,58,0.05)]">{item}</article>)}</div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="/ai-profit-map" className={primary}>Buy the AI Profit Map</Link><Link href="/invoicing-delay-cash-flow-calculator" className={secondary}>Calculate Your Admin Drag</Link></div>
        </section>

      </main>
      <Footer />
    </>
  )
}
