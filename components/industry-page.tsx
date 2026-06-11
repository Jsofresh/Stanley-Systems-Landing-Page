import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"

export type IndustrySlug =
  | "hvac"
  | "electrical"
  | "landscaping"
  | "general-contractors"
  | "plumbing"
  | "marine"
  | "roofing"
  | "adjacent-service-businesses"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"

const industryCopy: Record<IndustrySlug, { label: string; image: { src: string; alt: string; position?: string }; workflows: string[] }> = {
  hvac: { label: "HVAC", image: { src: "/images/uploaded/industries/2026-05-13-jaden/north-peak-hvac-tech-by-unit-and-van.jpg", alt: "HVAC technician working beside an outdoor unit and service van.", position: "center" }, workflows: ["Tune-up and service agreement follow-up.", "Completed-job billing readiness.", "Seasonal estimates and customer updates."] },
  electrical: { label: "Electrical", image: { src: "/images/uploaded/industries/2026-05-13-jaden/riverline-electric-electrician-by-panel.jpg", alt: "Electrician working beside an electrical panel.", position: "center" }, workflows: ["Estimate approvals and next steps.", "Permit, document, and job-detail handoffs.", "Billing readiness after finished work."] },
  landscaping: { label: "Landscaping", image: { src: "/images/uploaded/industries/2026-05-13-jaden/greencrest-landscaping-worker-planting-shrubs.jpg", alt: "Landscaping worker planting shrubs at a customer property.", position: "center" }, workflows: ["Seasonal renewal and add-on follow-up.", "Recurring work updates.", "Crew notes to billing readiness."] },
  "general-contractors": { label: "General Contractors", image: { src: "/images/uploaded/industries/2026-05-13-jaden/summit-build-co-contractor-with-clipboard.jpg", alt: "General contractor holding a clipboard at a job site.", position: "center" }, workflows: ["Approval, document, and photo handoffs.", "Job-costing and billing readiness.", "Customer update routing."] },
  plumbing: { label: "Plumbing", image: { src: "/images/uploaded/industries/2026-05-13-jaden/harbor-pipe-and-drain-plumber-under-sink.jpg", alt: "Plumber repairing pipe and drain work under a sink.", position: "center" }, workflows: ["Urgent call summaries into job context.", "Job notes to billing readiness.", "Service recovery, reviews, and customer follow-up."] },
  marine: { label: "Marine Service", image: { src: "/images/uploaded/industries/2026-05-13-jaden/dockside-marine-service-tech-by-boat.jpg", alt: "Marine service technician working near a boat at the dock.", position: "center" }, workflows: ["Parts and vendor ETA updates.", "Seasonal service follow-up.", "Custom job notes to cleaner billing." ] },
  roofing: { label: "Roofing", image: { src: "/images/uploaded/industries/2026-05-13-jaden/iron-ridge-roofing-contractor-on-roof.jpg", alt: "Roofing contractor working on a roof.", position: "center" }, workflows: ["Estimate follow-up.", "Insurance and storm paperwork support.", "Production and customer update routing." ] },
  "adjacent-service-businesses": { label: "Service Businesses", image: { src: "/images/uploaded/industries/2026-05-13-jaden/clearflow-exterior-cleaning-pressure-washer-truck.jpg", alt: "Field service technician with a tablet by a service van.", position: "center" }, workflows: ["Lead intake and missed-call recovery.", "Job details to billing readiness.", "Customer follow-up and staff SOP support." ] },
}

const primaryButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const secondaryButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:bg-[#f3fbf5]"

export function generateIndustryMetadata(slug: IndustrySlug, basePath = "/industries") {
  const industry = industryCopy[slug]
  const path = `${basePath}/${slug}`.replace("/industries/adjacent-service-businesses", "/industries/adjacent-service-businesses")
  return {
    title: `${industry.label} AI Office Workflows | Stanley Systems`,
    description: `AI office workflows for ${industry.label.toLowerCase()} companies: more jobs processed, cleaner records, faster follow-up, same office team.`,
    alternates: { canonical: `https://stanley-systems.com${path}` },
  }
}

export function IndustryPage({ slug }: { slug: IndustrySlug }) {
  const industry = industryCopy[slug]
  return (
    <>
      <SiteHeader />
      <main className="bg-[#F7F4EC] text-[#102033]">
        <section className={`${shell} pt-28 pb-12 lg:pt-32 lg:pb-16`}>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h1 className="mt-4 max-w-5xl text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.4rem] lg:text-[4.15rem]">More jobs processed. Cleaner records. Faster follow-up. Same office team.</h1>
              <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#42596C]">Stanley Systems installs AI office workflows around your existing service software, accounting software, phones, inbox, texts, and staff workflows so the office can run cleaner before another admin hire.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/invoicing-delay-cash-flow-calculator" className={primaryButton}>Calculate Your Admin Drag <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/workflow-audit" className={secondaryButton}>Book the $197 AI Office Map</Link></div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-[#DDEBE2] bg-white shadow-[0_24px_70px_rgba(7,29,58,0.08)]">
              <Image src={industry.image.src} alt={industry.image.alt} width={1280} height={853} className="h-full min-h-[320px] w-full object-cover" style={{ objectPosition: industry.image.position ?? "center" }} priority />
            </div>
          </div>
        </section>
        <section className={`${shell} py-10`}>
          <div className="grid gap-5 lg:grid-cols-3">
            {industry.workflows.map((workflow) => <article key={workflow} className="rounded-[1.6rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_48px_rgba(7,29,58,0.06)]"><h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#071D3A]">{workflow}</h2><p className="mt-3 text-base font-semibold leading-7 text-[#536173]">AI removes repetitive copying and chasing so staff handles exceptions, keeps better records, and moves revenue work faster.</p></article>)}
          </div>
        </section>
        <section className={`${shell} pb-16`}>
          <div className="rounded-[2rem] bg-[#071D3A] p-6 text-white shadow-[0_24px_70px_rgba(7,29,58,0.16)] sm:p-8 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <div><h2 className="text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[3rem]">When office work is the bottleneck, AI should remove drag — not dump more work on staff.</h2></div>
            <ul className="mt-6 grid gap-3 lg:mt-0">{["Enough job volume that office drag is expensive.", "Staff still copies, chases, checks, or reconciles information between tools.", "Owner wants more office capacity before adding payroll.", "The company already uses software but still has manual handoffs."].map((item) => <li key={item} className="flex gap-3 text-base font-semibold leading-7 text-[#DDEBE2]"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#84D99A]" />{item}</li>)}</ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
