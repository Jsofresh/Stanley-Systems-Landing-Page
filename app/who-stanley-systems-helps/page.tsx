import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"

const trades = [
  {
    title: "HVAC",
    copy: "Closeout notes, maintenance follow-up, estimates, invoices, and season-driven office load.",
    href: "/industries/hvac",
    image: "/images/uploaded/industries/2026-05-13-jaden/north-peak-hvac-tech-by-unit-and-van.jpg",
  },
  {
    title: "Plumbing",
    copy: "Emergency calls, job notes, approvals, invoice details, and customer updates moving at once.",
    href: "/industries/plumbing",
    image: "/images/uploaded/industries/2026-05-13-jaden/harbor-pipe-and-drain-plumber-under-sink.jpg",
  },
  {
    title: "Electrical",
    copy: "Project details, service work, inspection records, quotes, and billing handoffs that need clean data.",
    href: "/industries/electrical",
    image: "/images/uploaded/industries/2026-05-13-jaden/riverline-electric-electrician-by-panel.jpg",
  },
  {
    title: "General contractors",
    copy: "Submittals, change details, job documents, approvals, and office handoffs spread across people and tools.",
    href: "/industries/general-contractors",
    image: "/images/uploaded/industries/2026-05-13-jaden/summit-build-co-contractor-with-clipboard.jpg",
  },
  {
    title: "Subcontractors",
    copy: "Specialty crews that need field details turned into clean office records, billing, and follow-up.",
    href: "/industries/adjacent-service-businesses",
    image: "/images/uploaded/industries/2026-05-13-jaden/clearflow-exterior-cleaning-pressure-washer-truck.jpg",
  },
  {
    title: "Roofing",
    copy: "Inspection notes, photos, supplements, estimates, production updates, and final billing packages.",
    href: "/industries/roofing",
    image: "/images/uploaded/industries/2026-05-13-jaden/iron-ridge-roofing-contractor-on-roof.jpg",
  },
  {
    title: "Landscaping",
    copy: "Recurring work, crew updates, property notes, seasonal proposals, renewals, and customer follow-up.",
    href: "/industries/landscaping",
    image: "/images/uploaded/industries/2026-05-13-jaden/greencrest-landscaping-worker-planting-shrubs.jpg",
  },
  {
    title: "Marine service",
    copy: "Vessel details, parts, technician notes, estimates, approvals, and customer updates across long jobs.",
    href: "/industries/marine",
    image: "/images/uploaded/industries/2026-05-13-jaden/dockside-marine-service-tech-by-boat.jpg",
  },
]

const fitSignals = [
  "An owner, office manager, CSR, dispatcher, or bookkeeper is rebuilding information between systems.",
  "Completed work waits for notes, photos, approvals, or clean billing details.",
  "Open estimates and existing customers do not receive consistent follow-up.",
  "The business has enough volume that five to ten admin hours a week now means 260–520 hours a year.",
]

export default function WhoStanleySystemsHelpsPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-[#F7F4ED] text-[#071D3A]">
        <section data-nav-theme="dark" className="relative bg-[#071422] px-5 pb-20 pt-36 text-white md:px-8 lg:px-12 lg:pb-24">
          <div className="mx-auto grid max-w-[92rem] items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
            <div>
              <h1 className="text-balance text-[clamp(3.5rem,7vw,6.8rem)] font-extrabold leading-[.89] tracking-[-.05em]">
                Built for service businesses where <span className="text-[#53D986]">office drag delays cash.</span>
              </h1>
              <p className="mt-7 max-w-[720px] text-xl font-semibold leading-8 text-white/72 sm:text-2xl">
                Stanley Systems fits companies with real crews, real paperwork, and a current office team spending too much time copying, chasing, checking, and cleaning up between tools.
              </p>
              <Link href="/systems-installation-sprint" className="mt-9 inline-flex min-h-16 items-center rounded-full bg-[#15803D] px-8 text-lg font-extrabold text-white shadow-[0_22px_54px_rgba(10,85,38,.4)] transition hover:-translate-y-1 hover:bg-[#116832]">
                View the Installation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative min-h-[540px] overflow-hidden rounded-[2.5rem] border border-white/12 shadow-[0_40px_100px_rgba(0,0,0,.42)]">
              <Image src="/images/uploaded/homepage/ai-office/service-owner-office-admin-shot.jpg" alt="Service business owner reviewing office records at a laptop" fill priority sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071422]/88 via-transparent to-transparent" />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/16 bg-[#071422]/88 p-5 backdrop-blur-xl sm:inset-x-8 sm:bottom-8 sm:p-6">
                <p className="text-2xl font-extrabold sm:text-3xl">Same office team. More work processed.</p>
                <p className="mt-2 font-semibold leading-7 text-white/64">Keep the field software, accounting system, inbox, documents, and people already running the company.</p>
              </div>
            </div>
          </div>
        </section>

        <section data-nav-theme="light" className="px-5 py-20 md:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[92rem]">
            <div className="grid items-end gap-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
              <h2 className="text-balance text-[clamp(3.1rem,6vw,5.5rem)] font-extrabold leading-[.93] tracking-[-.045em]">The trades change. The office bottlenecks look <span className="text-[#15803D]">surprisingly familiar.</span></h2>
              <p className="text-xl font-semibold leading-8 text-[#536173]">If jobs move from a customer request to field work, office records, billing, follow-up, and collected cash, Stanley Systems can map where the drag lives.</p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trades.map((trade) => (
                <Link key={trade.title} href={trade.href} className="group relative min-h-[390px] overflow-hidden rounded-[2rem] bg-[#071422] text-white shadow-[0_22px_58px_rgba(7,29,58,.14)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_34px_75px_rgba(7,29,58,.24)]">
                  <Image src={trade.image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071422] via-[#071422]/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-3xl font-extrabold tracking-[-.035em]">{trade.title}</h3>
                    <p className="mt-3 font-semibold leading-6 text-white/70">{trade.copy}</p>
                    <span className="mt-5 inline-flex items-center font-extrabold text-[#8DF3A4]">See the workflow <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section data-nav-theme="dark" className="bg-[#0B3B60] px-5 py-20 text-white md:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="text-balance text-[clamp(3rem,5.6vw,5.2rem)] font-extrabold leading-[.93] tracking-[-.045em]">You are likely a fit when office work is starting to cap growth.</h2>
              <p className="mt-7 text-xl font-semibold leading-8 text-white/66">The installation is built for companies with repeated office work and enough job volume for the recovered capacity to matter.</p>
            </div>
            <div className="divide-y divide-white/14 border-y border-white/14">
              {fitSignals.map((signal) => (
                <div key={signal} className="flex gap-4 py-5 text-lg font-bold leading-7 sm:text-xl">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#8DF3A4]" />
                  {signal}
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-14 flex max-w-[92rem] flex-col items-start justify-between gap-6 border-t border-white/14 pt-9 lg:flex-row lg:items-center">
            <p className="max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl">See what Stanley Systems would install around your current office.</p>
            <Link href="/systems-installation-sprint" className="inline-flex min-h-16 shrink-0 items-center rounded-full bg-[#15803D] px-8 text-lg font-extrabold text-white transition hover:-translate-y-1 hover:bg-[#116832]">View the Installation <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
