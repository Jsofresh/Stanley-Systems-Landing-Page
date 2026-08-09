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
          <h1 className="max-w-5xl text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[4.4rem]">Best for service companies where office bottlenecks are starting to cap growth.</h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#42596C]">If the owner is considering another admin hire, or the office team is stuck copying, chasing, reconciling, and cleaning up between tools, Stanley Systems can usually find profitable AI office workflows to install first.</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[1.8rem] border border-[#CFE8D5] bg-white p-6 shadow-[0_14px_38px_rgba(7,29,58,0.05)]"><h2 className="text-3xl font-semibold tracking-[-0.04em]">Best fit</h2><Bullets items={["Home-service company with an office/admin person or owner doing office cleanup.", "Enough job volume that admin drag is expensive.", "Already uses field-service, CRM, and/or accounting software.", "Staff still copies, chases, checks, or reconciles information.", "Owner wants more capacity before adding admin payroll."]} /></article>
            <article className="rounded-[1.8rem] border border-[#E8D9CC] bg-white p-6 shadow-[0_14px_38px_rgba(7,29,58,0.05)]"><h2 className="text-3xl font-semibold tracking-[-0.04em]">Not a fit</h2><Bullets items={["No repeatable office process yet.", "Too little job volume for admin drag to matter.", "Looking for a generic chatbot instead of workflow installation.", "Trying to replace staff overnight instead of making the team sharper."]} /></article>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
