import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight, CheckCircle2, FileCheck2, MessageSquareText, ShieldCheck } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { OneMessageDemoSection } from "@/components/home/one-message-demo-section"
import { InstallationSprintContactForm } from "@/components/installation-sprint-contact-form"
import { FOUNDING_PARTNER_OFFER, FOUNDING_VALUE_ITEMS } from "@/lib/offers/founding-partner"

export const metadata: Metadata = { title: "Founding Partner AI Office Installation | Stanley Systems", description: "Apply for one of two Stanley Systems AI Office installations at the founding price: $3,500 setup and $500/month.", alternates: { canonical: "/systems-installation-sprint" } }

const process = [
  ["Map and connect", "Confirm the repeated work, approved sources, user roles, permissions, and first accepted workflow."],
  ["Train and test", "Practice the real staff requests, approvals, exception paths, and proof receipts before launch."],
  ["Prove and improve", "Run the accepted scope in real office work, then tune it through 30 included days of AI Office Ops."],
]

const guaranteeStack = [
  {
    title: "30-Day Prove-It Guarantee",
    copy: "Use the installed AI Office in real office work. If the agreed workflows are not meaningfully faster or better, cancel in writing during the first 30 days for a full Installation Sprint refund. No ROI report required.",
  },
  {
    title: "Staff-Ready Guarantee",
    copy: "If participating staff cannot confidently run the launch capabilities after training, we keep training and tuning at no charge during the first 30 days.",
  },
  {
    title: "Nothing Important Changes Without Approval",
    copy: "Consequential actions stay read-only, prepare-only, or approval-required. New permissions and write paths require written approval.",
  },
]

const controlledFlow: Array<[LucideIcon, string, string]> = [
  [MessageSquareText, "Staff request", "The team asks for the work in one interface and Stanley requests missing details."],
  [FileCheck2, "Source check", "Approved records, company rules, and required fields are checked before an output is prepared."],
  [ShieldCheck, "Staff approval", "Consequential actions pause for a preview and the right person approves the next step."],
  [CheckCircle2, "Completion receipt", "Readback shows what succeeded, what failed, and what still needs attention."],
]

const pricingHighlights = [
  "Private company AI Office",
  "Approved software and document connections",
  "Company-specific workflows, playbooks, and permissions",
  "Staff training with real office work",
  "Live acceptance testing",
  "30 days of optimization and AI Office Ops included",
]

export default function InstallationPage() {
  return <><SiteHeader /><main className="overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
    <section data-nav-theme="dark" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#071422] px-5 pb-20 pt-36 text-white md:px-8 lg:px-10"><Image src="/images/uploaded/package-heroes/stanley-systems-sprint-plan-office-team-van.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[20%_center]" /><div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,.93)_35%,rgba(7,20,34,.3)_100%),linear-gradient(0deg,#071422_0%,transparent_45%)]" /><div className="mx-auto w-full max-w-[88rem]"><div className="max-w-[850px]"><h1 className="text-balance text-[clamp(3.3rem,8vw,7rem)] font-extrabold leading-[.88] tracking-[-.045em]">Turn hours of office work into a single message.</h1><p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-white/78">Stanley Systems installs one connected AI office around supported systems, trains the staff, and includes 30 days of live optimization and AI Office Ops.</p><Link href="#installation-contact" data-analytics-event="founding_application_started" className="mt-8 inline-flex min-h-14 items-center rounded-full bg-[#15803D] px-7 font-extrabold text-white">Apply for a Founding Partner Installation</Link></div></div></section>
    <OneMessageDemoSection compact />
    <section data-nav-theme="light" className="px-5 py-20 md:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto grid max-w-[92rem] items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div>
          <h2 className="text-balance text-[clamp(3rem,6vw,5.7rem)] font-extrabold leading-[.91] tracking-[-.04em]">Five reclaimed hours a week gives the office <span className="text-[#15803D]">260 hours a year back.</span></h2>
          <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 text-[#536173]">That is 32.5 eight-hour workdays the existing team can redirect toward invoice release, open-estimate follow-up, exception handling, and customer work.</p>
          <div className="mt-8 border-y border-[#D5E5DA] py-5">
            <p className="text-sm font-extrabold uppercase tracking-[.12em] text-[#15803D]">Example office math</p>
            <p className="mt-2 font-bold leading-7 text-[#334B60]">5 hours × 52 weeks = 260 hours. Your Command Map measures the real number before Stanley Systems scopes the installation.</p>
          </div>
        </div>
        <div className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] shadow-[0_34px_90px_rgba(7,29,58,.18)]">
          <Image src="/images/uploaded/homepage/ai-office/office-desk-invoice-checklist-highvis.jpg" alt="Service office desk with invoice checklist, job documents, and high-visibility workwear" fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071422]/82 via-[#071422]/5 to-transparent" />
          <div className="absolute inset-x-6 bottom-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/18 bg-[#071422]/88 text-white backdrop-blur-xl sm:inset-x-8 sm:bottom-8">
            <div className="border-r border-white/14 p-5 sm:p-6"><p className="text-4xl font-black text-[#8DF3A4] sm:text-5xl">260</p><p className="mt-2 font-extrabold text-white/70">hours returned yearly</p></div>
            <div className="p-5 sm:p-6"><p className="text-4xl font-black text-[#8DF3A4] sm:text-5xl">32.5</p><p className="mt-2 font-extrabold text-white/70">eight-hour workdays</p></div>
          </div>
        </div>
      </div>
    </section>
    <section data-nav-theme="dark" className="bg-[#071422] px-5 py-20 text-white md:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[92rem]">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <h2 className="max-w-5xl text-balance text-[clamp(3rem,6vw,5.7rem)] font-extrabold leading-[.91] tracking-[-.04em]">One request moves through <span className="text-[#8DF3A4]">four controlled stages.</span></h2>
          <p className="text-xl font-semibold leading-8 text-white/66">The team gets the speed of one interface without giving up source checks, staff approval, or a clear record of what happened.</p>
        </div>
        <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-white/14 bg-white/[.055] lg:grid-cols-4">
          {controlledFlow.map(([Icon, title, copy], index) => {
            const StageIcon = Icon
            return (
              <article key={String(title)} className="relative border-b border-white/12 p-6 last:border-b-0 sm:p-8 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#15803D] text-white"><StageIcon className="h-6 w-6" aria-hidden="true" /></div>
                <h3 className="mt-6 text-2xl font-extrabold">{String(title)}</h3>
                <p className="mt-3 font-semibold leading-7 text-white/62">{String(copy)}</p>
                {index < controlledFlow.length - 1 ? <ArrowRight className="absolute -right-3 top-10 z-10 hidden h-6 w-6 rounded-full bg-[#8DF3A4] p-1 text-[#071422] lg:block" aria-hidden="true" /> : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
    <section data-nav-theme="light" className="bg-[#E9F8ED] px-5 py-20 md:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[92rem]">
        <h2 className="mx-auto max-w-5xl text-center text-[clamp(3rem,6vw,5.4rem)] font-extrabold leading-[.93] tracking-[-.04em]">From scope to 30 days of real use.</h2>
        <div className="mt-12 divide-y divide-[#0B3B60]/16 border-y border-[#0B3B60]/16">
          {process.map(([title, copy], index) => (
            <article key={title} className="grid gap-5 py-8 sm:grid-cols-[7rem_1fr] sm:items-start lg:grid-cols-[8rem_.72fr_1.28fr] lg:items-center lg:gap-10 lg:py-10">
              <p className="text-6xl font-black leading-none tracking-[-.07em] text-[#15803D] sm:text-7xl">0{index + 1}</p>
              <h3 className="text-3xl font-extrabold tracking-[-.035em] sm:text-4xl">{title}</h3>
              <p className="text-lg font-semibold leading-8 text-[#536173] sm:col-start-2 lg:col-start-auto">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section id="sprint-includes" data-nav-theme="light" className="px-5 py-20 md:px-8 lg:px-10 lg:py-28"><div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-[.7fr_1.3fr]"><h2 className="text-balance text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-[.91] tracking-[-.04em]">Everything in the founding installation.</h2><ul className="grid gap-x-7 sm:grid-cols-2">{FOUNDING_VALUE_ITEMS.map(item => <li key={item} className="flex gap-3 border-b border-[#D5E5DA] py-4 font-bold leading-6"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#15803D]" />{item}</li>)}</ul></div></section>
    <section id="founding-price" data-nav-theme="dark" data-analytics-view="founding_offer_viewed" className="scroll-mt-28 bg-[#071422] px-5 py-20 text-white md:scroll-mt-32 md:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
        <div>
          <h2 className="max-w-4xl text-balance text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-[.9] tracking-[-.04em]">Use it for 30 days. Keep it only if it earns its place in your office.</h2>
          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-white/70">A company-specific installation built around your current tools, trained with your staff, and proven in real office work.</p>
          <div className="mt-10 divide-y divide-white/[0.14] border-y border-white/[0.14]">
            {guaranteeStack.map((guarantee) => (
              <article key={guarantee.title} className="grid gap-3 py-6 md:grid-cols-[.72fr_1.28fr] md:gap-8">
                <h3 className="text-2xl font-extrabold leading-tight text-[#8DF3A4]">{guarantee.title}</h3>
                <p className="font-semibold leading-7 text-white/68">{guarantee.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] bg-white p-7 text-[#071D3A] shadow-[0_28px_90px_rgba(0,0,0,.24)] sm:p-9 lg:sticky lg:top-32">
          <h3 className="text-3xl font-extrabold tracking-[-.035em]">AI Office Installation Sprint</h3>
          <p className="mt-5 text-[clamp(3.5rem,6vw,5.4rem)] font-extrabold leading-none tracking-[-.05em]">$3,500</p>
          <p className="mt-2 text-lg font-bold text-[#536173]">starting installation</p>
          <ul className="mt-7 divide-y divide-[#D5E5DA] border-y border-[#D5E5DA]">
            {pricingHighlights.map((item) => (
              <li key={item} className="flex gap-3 py-3.5 font-bold leading-6">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 rounded-[1.35rem] bg-[#E9F8ED] p-5">
            <p className="text-xl font-extrabold leading-tight text-[#116832]">30 days to prove it belongs in your office.</p>
            <p className="mt-2 font-semibold leading-7 text-[#334B60]">If it does not make the agreed work meaningfully faster or better, cancel during the first 30 days for a full Sprint refund.</p>
          </div>
          <p className="mt-5 font-extrabold text-[#071D3A]">AI Office Ops starts at $500/month after the included 30 days.</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#607080]">Third-party subscriptions and usage are excluded from the refund.</p>
          <Link href="#installation-contact" data-analytics-event="founding_application_started" className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#15803D] px-6 text-center font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#116832]">Apply for a Founding Partner Installation</Link>
        </aside>
      </div>
    </section>
    <section data-nav-theme="light" className="bg-[#FBFCF7] px-5 py-14 text-center md:px-8"><p className="mx-auto max-w-5xl text-balance text-3xl font-extrabold leading-tight sm:text-5xl">{FOUNDING_PARTNER_OFFER.scarcityCopy}</p></section>
    <InstallationSprintContactForm />
  </main><Footer /></>
}
