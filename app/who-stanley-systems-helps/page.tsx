import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"

export const metadata: Metadata = {
  title: "Who Stanley Systems Helps | Service Business AI Office",
  description: "Stanley Systems helps HVAC, plumbing, electrical, construction, roofing, landscaping, and marine service teams reclaim office capacity.",
  alternates: { canonical: "/who-stanley-systems-helps" },
  openGraph: { title: "Who Stanley Systems Helps | Service Business AI Office", description: "Built for service businesses where office paperwork delays cash.", url: "https://stanley-systems.com/who-stanley-systems-helps", siteName: "Stanley Systems", images: [{ url: "https://stanley-systems.com/stanley-systems-logo-reference.jpg", width: 1024, height: 1024, alt: "Stanley Systems logo" }], type: "website" },
  twitter: { card: "summary_large_image", title: "Who Stanley Systems Helps", description: "Built for service businesses where office paperwork delays cash.", images: ["https://stanley-systems.com/stanley-systems-logo-reference.jpg"] },
}

const trades = [
  ["HVAC", "/industries/hvac"],
  ["Plumbing", "/industries/plumbing"],
  ["Electrical", "/industries/electrical"],
  ["General contractors", "/industries/general-contractors"],
  ["Subcontractors", "/industries/adjacent-service-businesses"],
  ["Roofing", "/industries/roofing"],
  ["Landscaping", "/industries/landscaping"],
  ["Marine service", "/industries/marine"],
]

const fitSignals = [
  "Office staff rebuild information between systems.",
  "Completed work waits for notes, photos, approvals, or billing details.",
  "Open estimates and current customers miss consistent follow-up.",
]

export default function WhoStanleySystemsHelpsPage() {
  return <><SiteHeader /><main className="overflow-hidden bg-[#F7F4ED] text-[#071D3A]">
    <section data-nav-theme="dark" className="flex min-h-[100svh] items-center bg-[#071422] px-5 pb-10 pt-28 text-white md:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[92rem] items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
        <div><h1 className="text-balance text-[clamp(3.2rem,6vw,5.8rem)] font-extrabold leading-[.89] tracking-[-.05em]">Built for service offices where <span className="text-[#53D986]">paperwork delays cash.</span></h1><p className="mt-6 max-w-[700px] text-xl font-semibold leading-8 text-white/72">For companies with real crews and a current office team spending too much time copying, chasing, checking, and cleaning up between tools.</p><Link href="/systems-installation-sprint" className="mt-8 inline-flex min-h-14 items-center rounded-full bg-[#15803D] px-7 font-extrabold text-white">View the Installation <ArrowRight className="ml-2 h-5 w-5" /></Link></div>
        <div className="relative min-h-[410px] overflow-hidden rounded-[2.5rem] border border-white/12 shadow-[0_40px_100px_rgba(0,0,0,.42)]"><Image src="/images/uploaded/homepage/ai-office/service-owner-office-admin-shot.jpg" alt="Service business owner and office staff reviewing company records" fill priority sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#071422]/88 via-transparent to-transparent" /><div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/16 bg-[#071422]/88 p-5 backdrop-blur-xl"><p className="text-2xl font-extrabold">Same office team. More work processed.</p></div></div>
      </div>
    </section>

    <section data-nav-theme="light" className="px-5 py-14 md:px-8 lg:px-12 lg:py-16"><div className="mx-auto grid max-w-[92rem] items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16"><div><h2 className="text-balance text-[clamp(2.7rem,4.7vw,4.4rem)] font-extrabold leading-[.93] tracking-[-.045em]">The trades change. The office bottlenecks look familiar.</h2><p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-[#536173]">If work moves from a customer request to the field, office records, billing, follow-up, and cash, Stanley Systems can map the drag.</p><div className="relative mt-7 min-h-[250px] overflow-hidden rounded-[2rem]"><Image src="/images/uploaded/industries/2026-05-13-jaden/north-peak-hvac-tech-by-unit-and-van.jpg" alt="Service team working beside a company vehicle" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" /></div></div><div className="border-y border-[#D5E5DA]">{trades.map(([title, href]) => <Link key={title} href={href} className="group flex items-center justify-between border-b border-[#D5E5DA] py-3.5 text-xl font-extrabold last:border-b-0 hover:text-[#15803D]"><span>{title}</span><ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></Link>)}</div></div></section>

    <section data-nav-theme="dark" className="bg-[#0B3B60] px-5 py-16 text-white md:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-[92rem] items-center gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20"><div><p className="text-lg font-black uppercase tracking-[.1em] text-white/58">Up to</p><p className="text-[clamp(4.8rem,11vw,8.5rem)] font-black leading-none tracking-[-.07em] text-[#8DF3A4]">520</p><h2 className="mt-2 text-balance text-[clamp(2.7rem,4.8vw,4.7rem)] font-extrabold leading-[.94] tracking-[-.045em]">hours a year, at ten reclaimed hours a week.</h2><p className="mt-5 text-lg font-semibold leading-8 text-white/66">Best for teams with repeated office work and enough job volume for recovered capacity to matter.</p></div><div><div className="divide-y divide-white/14 border-y border-white/14">{fitSignals.map(signal => <p key={signal} className="py-5 text-xl font-extrabold leading-7">{signal}</p>)}</div><div className="mt-7 flex flex-wrap items-center gap-5"><Link href="/systems-installation-sprint" className="inline-flex min-h-14 items-center rounded-full bg-[#15803D] px-7 font-extrabold text-white">View the Installation <ArrowRight className="ml-2 h-5 w-5" /></Link><p className="max-w-md font-semibold text-white/60">Not a fit for replacing staff or running important actions without human approval.</p></div></div></div></section>
  </main><Footer /></>
}
