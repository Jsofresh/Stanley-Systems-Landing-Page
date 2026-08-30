import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { VideoDemoPlaceholder } from "@/components/video-demo-placeholder"
import { InstallationSprintContactForm } from "@/components/installation-sprint-contact-form"
import { FOUNDING_PARTNER_OFFER } from "@/lib/offers/founding-partner"

export const metadata: Metadata = {
  title: "AI Office Installation Sprint | Stanley Systems",
  description: "Install Stanley AI Office around your current team and tools for $3,500, with 30 days of optimization included and AI Office Ops at $500/month after that.",
  alternates: { canonical: "/systems-installation-sprint" },
  openGraph: { title: "AI Office Installation Sprint | Stanley Systems", description: "Install Stanley AI Office around current tools and staff, with 30 days of real-use optimization.", url: "https://stanley-systems.com/systems-installation-sprint", siteName: "Stanley Systems", images: [{ url: "https://stanley-systems.com/stanley-systems-logo-reference.jpg", width: 1024, height: 1024, alt: "Stanley Systems logo" }], type: "website" },
  twitter: { card: "summary_large_image", title: "AI Office Installation Sprint | Stanley Systems", description: "A complete Stanley AI Office installation, proven with your current team.", images: ["https://stanley-systems.com/stanley-systems-logo-reference.jpg"] },
}

const stages = [
  ["Request", "Staff asks for the work in one place."],
  ["Check", "Approved records and required details are verified."],
  ["Approve", "Important actions pause for the right person."],
  ["Complete", "A clear receipt shows what happened next."],
]

const installation = [
  ["Connect", "Supported systems, documents, roles, and permissions."],
  ["Operate", "Company-specific workflows and reusable playbooks."],
  ["Control", "Source checks, approval steps, and completion receipts."],
  ["Train", "Real-work staff training plus 30 days of tuning."],
]

const guarantees = [
  ["30-Day Prove-It", "If the agreed work is not meaningfully faster or better, cancel in the first 30 days for a full Sprint refund."],
  ["Staff-Ready", "If participating staff are not confident at launch, training and tuning continue at no charge during the first 30 days."],
  ["Approval Stays Human", "Consequential actions remain read-only, prepare-only, or approval-required unless you approve a change."],
]

export default function InstallationPage() {
  return <><SiteHeader /><main className="overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
    <section data-nav-theme="dark" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#071422] px-5 pb-16 pt-32 text-white md:px-8 lg:px-10">
      <Image src="/images/uploaded/package-heroes/stanley-systems-sprint-plan-office-team-van.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[20%_center]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,.94)_38%,rgba(7,20,34,.25)_100%),linear-gradient(0deg,#071422_0%,transparent_45%)]" />
      <div className="mx-auto w-full max-w-[88rem]"><div className="max-w-[850px]">
        <h1 className="text-balance text-[clamp(3.3rem,8vw,7rem)] font-extrabold leading-[.88] tracking-[-.045em]">Turn hours of office work into a single message.</h1>
        <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-white/78">Stanley Systems installs Stanley AI Office around your current tools, trains your staff, and tunes it through 30 days of real office use.</p>
        <div className="mt-8 flex flex-wrap gap-4"><Link href="#installation-contact" data-analytics-event="founding_application_started" className="inline-flex min-h-14 items-center rounded-full bg-[#15803D] px-7 font-extrabold text-white">Apply for Installation</Link><Link href="#how-it-works" className="inline-flex min-h-14 items-center rounded-full border border-white/25 px-7 font-extrabold text-white">See how it works <ArrowRight className="ml-2 h-5 w-5" /></Link></div>
      </div></div>
    </section>

    <section id="how-it-works" data-nav-theme="light" className="scroll-mt-24 px-5 py-16 md:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[88rem] items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
        <div><h2 className="text-balance text-[clamp(2.8rem,5.3vw,5rem)] font-extrabold leading-[.92] tracking-[-.04em]">One message. Real office work.</h2><p className="mt-5 max-w-xl text-xl font-semibold leading-8 text-[#536173]">Watch one request move through your approved information, staff control, and a documented result.</p></div>
        <VideoDemoPlaceholder title="See a request become completed office work." posterSrc="/images/uploaded/homepage/ai-office/installation-sprint-before-after-workflow.jpg" alt="Stanley AI Office workflow demonstration placeholder" />
      </div>
      <div className="mx-auto mt-10 grid max-w-[88rem] border-y border-[#D5E5DA] sm:grid-cols-2 lg:grid-cols-4">{stages.map(([title, copy], index) => <article key={title} className="border-b border-[#D5E5DA] py-5 sm:p-5 lg:border-b-0 lg:border-r lg:last:border-r-0"><p className="text-sm font-black text-[#15803D]">0{index + 1}</p><h3 className="mt-2 text-2xl font-extrabold">{title}</h3><p className="mt-2 font-semibold leading-6 text-[#536173]">{copy}</p></article>)}</div>
    </section>

    <section data-nav-theme="dark" className="bg-[#071422] px-5 py-16 text-white md:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[88rem] items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div><p className="text-lg font-black uppercase tracking-[.1em] text-white/58">Up to</p><p className="text-[clamp(4.8rem,11vw,9rem)] font-black leading-none tracking-[-.07em] text-[#8DF3A4]">520</p><h2 className="mt-3 max-w-xl text-balance text-[clamp(2.6rem,4.8vw,4.7rem)] font-extrabold leading-[.95] tracking-[-.04em]">hours a year, at ten reclaimed hours a week.</h2><p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/68">Before adding another roughly $60,000 admin role, multiply the team you already trust.</p></div>
        <div className="relative min-h-[430px] overflow-hidden rounded-[2.25rem]"><Image src="/images/uploaded/homepage/ai-office/office-desk-invoice-checklist-highvis.jpg" alt="Service office desk with invoice checklist and job documents" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#071422]/80 via-transparent to-transparent" /><p className="absolute inset-x-7 bottom-7 text-2xl font-extrabold">More capacity for current staff. No one is replaced.</p></div>
      </div>
    </section>

    <section id="sprint-includes" data-nav-theme="light" className="px-5 py-16 md:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[88rem]"><div className="grid items-end gap-8 lg:grid-cols-[.95fr_1.05fr]"><h2 className="text-balance text-[clamp(2.8rem,5.2vw,5rem)] font-extrabold leading-[.92] tracking-[-.04em]">A working office system, not a software handoff.</h2><p className="text-xl font-semibold leading-8 text-[#536173]">We map the work, configure the controls, train the team, and stay through the first month of real use.</p></div>
      <div className="mt-10 grid border-y border-[#D5E5DA] sm:grid-cols-2 lg:grid-cols-4">{installation.map(([title, copy]) => <article key={title} className="border-b border-[#D5E5DA] py-6 sm:p-6 lg:border-b-0 lg:border-r lg:last:border-r-0"><h3 className="text-3xl font-extrabold text-[#15803D]">{title}</h3><p className="mt-3 font-semibold leading-7 text-[#536173]">{copy}</p></article>)}</div></div>
    </section>

    <section id="founding-price" data-nav-theme="dark" data-analytics-view="founding_offer_viewed" className="scroll-mt-24 bg-[#0B3B60] px-5 py-16 text-white md:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div><h2 className="text-balance text-[clamp(2.8rem,5vw,4.9rem)] font-extrabold leading-[.92] tracking-[-.04em]">Prove it in your office for 30 days.</h2><div className="mt-7 divide-y divide-white/14 border-y border-white/14">{guarantees.map(([title, copy]) => <article key={title} className="grid gap-2 py-4 sm:grid-cols-[.62fr_1.38fr] sm:gap-6"><h3 className="text-xl font-extrabold text-[#8DF3A4]">{title}</h3><p className="font-semibold leading-6 text-white/68">{copy}</p></article>)}</div></div>
        <aside className="rounded-[2rem] bg-white p-7 text-[#071D3A] shadow-[0_28px_90px_rgba(0,0,0,.22)] sm:p-9"><h3 className="text-2xl font-extrabold">Installation Sprint</h3><p className="mt-4 text-[clamp(3.8rem,7vw,5.6rem)] font-black leading-none tracking-[-.055em]">$3,500</p><p className="mt-2 text-lg font-bold text-[#536173]">one-time founding installation</p><p className="mt-6 text-2xl font-extrabold text-[#15803D]">$500/month after 30 included days</p><p className="mt-3 font-semibold leading-7 text-[#536173]">Founding-plan base rate locked for life. Third-party subscriptions and usage are separate.</p><p className="mt-5 border-t border-[#D5E5DA] pt-5 font-extrabold">{FOUNDING_PARTNER_OFFER.scarcityCopy}</p><Link href="#installation-contact" data-analytics-event="founding_application_started" className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#15803D] px-6 text-center font-extrabold text-white">Apply for Installation</Link></aside>
      </div>
    </section>
    <InstallationSprintContactForm />
  </main><Footer /></>
}
