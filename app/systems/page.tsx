import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

export const metadata: Metadata = {
  title: "Systems Stanley Systems Can Build | Stanley Systems",
  description: "Cash, follow-up, and office handoff systems Stanley Systems can install after the Cash Flow Assessment.",
  alternates: { canonical: "https://stanley-systems.com/systems" },
}

const systems = [
  { title: "Cashflow Control", body: "Move customer requests, job details, billing, invoice movement, payment follow-up, and cash visibility faster.", href: "/systems/cashflow-control", cta: "See Cashflow Control" },
  { title: "Repeat Revenue", body: "Work missed calls, past customers, review asks, referral asks, private feedback, and repeat-work reminders.", href: "/systems/repeat-revenue", cta: "See Repeat Revenue" },
  { title: "Systems Installation Sprint", body: "Turn the Cash Flow Assessment plan into working systems for cash, follow-up, repeat work, and office handoffs.", href: "/systems-installation-sprint", cta: "See how the Sprint works" },
]

export default function SystemsIndexPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
        <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 lg:pt-36">
          <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.12),rgba(251,252,247,0)_70%)]" aria-hidden="true" />
          <div className={`${shell} relative text-center`}>
            <h1 className="mx-auto max-w-5xl text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.4rem] lg:text-[4.35rem]">Systems Stanley Systems can build</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#334B60] sm:text-xl">Stanley Systems installs the cash, follow-up, and office handoff systems the assessment shows your business needs.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/systems-installation-sprint" className={lightButton}>See how the Sprint works</Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16">
          <div className={`${shell} grid gap-4 lg:grid-cols-3`}>
            {systems.map((system) => (
              <Link key={system.title} href={system.href} className="group rounded-[1.6rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 shadow-[0_14px_36px_rgba(7,29,58,0.045)] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-white">
                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#102033]">{system.title}</h2>
                <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">{system.body}</p>
                <span className="mt-5 inline-flex items-center text-sm font-extrabold text-[#116832]">{system.cta}<ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
