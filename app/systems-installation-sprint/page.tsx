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
        
        <section className="relative isolate flex min-h-[680px] overflow-hidden bg-[#071D3A] px-4 pb-20 pt-32 text-white sm:px-6 lg:min-h-[100svh] lg:px-8 lg:pb-28 lg:pt-36">
          <img src="/images/uploaded/package-heroes/stanley-systems-sprint-plan-office-team-van.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071D3A_0%,rgba(7,29,58,0.96)_20%,rgba(7,29,58,0.74)_48%,rgba(7,29,58,0.28)_72%,rgba(7,29,58,0.52)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,29,58,0.74)_0%,rgba(7,29,58,0.18)_42%,#071D3A_100%)]" />
          <div className={`${shell} flex min-h-[520px] w-full items-center lg:min-h-0`}>
            <div className="max-w-[780px]">
              <h1 className="text-balance text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-[4.45rem]">Install AI workflows that make your office faster and more profitable.</h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">Stanley Systems installs 1–3 AI office workflows around your existing software so your staff can process more jobs, keep cleaner records, and follow up faster without adding another admin seat.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/workflow-audit" className={primary}>Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/pricing" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 bg-white/12 px-6 py-3 text-sm font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18">See the offer ladder</Link></div>
            </div>
          </div>
        </section>
        <section className={`${shell} py-16 lg:py-20`}><div className="grid gap-5 lg:grid-cols-3">{["AI Office Map complete and workflows selected.", "Office playbook v1 built from real staff workflow and owner-approved rules.", "Staff AI training session so the team knows what stays human-reviewed.", "1–3 workflows installed, tested, and connected around existing tools.", "Proof report delivered so the owner sees what changed.", "30 days light support after launch."].map((item) => <article key={item} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 text-base font-bold leading-7 text-[#34495F] shadow-[0_14px_38px_rgba(7,29,58,0.05)]">{item}</article>)}</div></section>
        <section className={`${shell} pb-20 lg:pb-24`}><div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_54px_rgba(7,29,58,0.06)]"><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Sprint outcomes</h2><Bullets items={["More work processed by the same office team.", "Cleaner records and fewer missed handoffs.", "Faster billing readiness and estimate follow-up.", "Staff uses AI inside actual office work instead of adding another screen."]} /></div></section>

      </main>
      <Footer />
    </>
  )
}
