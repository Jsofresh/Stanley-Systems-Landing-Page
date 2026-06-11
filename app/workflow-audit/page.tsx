import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const primary = "inline-flex min-h-14 items-center justify-center rounded-full bg-[#15803D] px-8 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const secondary = "inline-flex min-h-14 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-8 py-4 text-base font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:bg-[#f3fbf5]"
const auditCheckoutHref = pricingPackageById.workflow_audit.stripePaymentLink.url

function Bullets({ items }: { items: string[] }) {
  return <ul className="mt-6 grid gap-4">{items.map((item) => <li key={item} className="flex gap-4 text-lg font-semibold leading-8 text-[#34495F]"><CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-[#15803D]" />{item}</li>)}</ul>
}

export default function PAGE() {
  const deliverables = [
    "45-60 minute owner or office-manager session.",
    "Current office workflow map.",
    "Existing software and handoff review.",
    "Top 3 workflow opportunities.",
    "Staff AI training and company playbook gaps.",
    "One-page AI Office Map.",
    "$197 credited toward your AI Office Installation Sprint.",
  ]

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBFCF7] text-[#071D3A]">
        <section id="assessment" className="relative isolate scroll-mt-[120px] overflow-hidden bg-[#071D3A] pt-32 pb-16 text-white lg:pt-40 lg:pb-24">
          <img src="/images/uploaded/ai-office/owner-reviewing-paperwork.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,29,58,0.98)_0%,rgba(7,29,58,0.9)_42%,rgba(7,29,58,0.58)_74%,rgba(7,29,58,0.42)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(83,217,134,0.18),transparent_34%),linear-gradient(180deg,rgba(7,29,58,0.18)_0%,rgba(7,29,58,0.82)_100%)]" />
          <div className={`${shell}`}>
            <div className="max-w-[80%]">
              <h1 className="text-balance text-[2.75rem] font-semibold leading-[0.96] tracking-[-0.055em] sm:text-[5.4rem]">Start with the AI Office Map.</h1>
              <p className="mt-6 max-w-[920px] text-xl font-semibold leading-9 text-white/84">In one focused session, Stanley Systems maps how your office handles paperwork, billing, follow-up, handoffs, and job admin. You leave with a one-page map showing where work is getting stuck, what your current tools already handle, and which AI-guided workflow should be installed first.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row"><a href={auditCheckoutHref} target="_blank" rel="noopener noreferrer" className={primary}>Book the AI Office Map <ArrowRight className="ml-2 h-5 w-5" /></a><Link href="/invoicing-delay-cash-flow-calculator" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/30 bg-white/12 px-8 py-4 text-base font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18">Calculate Your Admin Drag</Link></div>
              <p className="mt-5 text-base font-bold text-white/80">The AI Office Map is $197 and is credited toward your AI Office Installation Sprint.</p>
            </div>
          </div>
        </section>

        <section className={`${shell} py-14 lg:py-18`}>
          <div className="mb-7 max-w-4xl"><h2 className="text-[2.2rem] font-semibold leading-[1] tracking-[-0.04em] sm:text-[3.8rem]">What you get in the Map</h2><p className="mt-4 text-lg font-semibold leading-8 text-[#536173]">The Map is not another vague consultation. It is the paid diagnostic that decides what should be installed first.</p></div>
          <div className="grid gap-5 lg:grid-cols-3">
            {deliverables.map((item) => <article key={item} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-6 text-lg font-bold leading-8 text-[#34495F] shadow-[0_14px_38px_rgba(7,29,58,0.05)]">{item}</article>)}
          </div>
        </section>

        <section className={`${shell} pb-20 lg:pb-24`}>
          <div className="rounded-[2rem] bg-[#071D3A] p-6 text-white sm:p-8 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
            <div><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">This is not generic ChatGPT training.</h2></div>
            <Bullets items={["Stanley Systems reviews your real paperwork, billing, follow-up, handoffs, and job admin before recommending a workflow.", "The Map shows where your current tools already help and where staff still needs your company playbook, examples, templates, and escalation rules.", "Humans stay in review for sensitive work. The goal is cleaner drafts, checks, routing, and handoffs, not autonomous money movement or replacing staff."]} />
          </div>
        </section>

        <section className={`${shell} pb-20 lg:pb-24`}>
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-[1.6rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_14px_38px_rgba(7,29,58,0.05)]"><h2 className="text-2xl font-semibold tracking-[-0.04em]">What happens after you pay</h2><p className="mt-3 text-base font-semibold leading-7 text-[#536173]">You complete intake, choose a review method, and meet for a focused session. Stanley Systems then turns the findings into your one-page AI Office Map.</p></article>
            <article className="rounded-[1.6rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_14px_38px_rgba(7,29,58,0.05)]"><h2 className="text-2xl font-semibold tracking-[-0.04em]">What we need from you</h2><p className="mt-3 text-base font-semibold leading-7 text-[#536173]">An owner or office manager, a walkthrough of the current process, and the best available records by screen share, exports, screenshots, or temporary access. Do not send passwords.</p></article>
            <article className="rounded-[1.6rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_14px_38px_rgba(7,29,58,0.05)]"><h2 className="text-2xl font-semibold tracking-[-0.04em]">What you leave with</h2><p className="mt-3 text-base font-semibold leading-7 text-[#536173]">A clear map of what is stuck, what your tools already handle, what staff training or company playbook gaps exist, and which first workflow is worth installing.</p></article>
          </div>
        </section>

        <section className={`${shell} pb-20 lg:pb-24`}>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[1.8rem] border border-[#CFE8D5] bg-white p-6 shadow-[0_14px_38px_rgba(7,29,58,0.05)]"><h2 className="text-3xl font-semibold tracking-[-0.04em]">Good fit</h2><Bullets items={["Growing service or trade business with real office volume.", "Billing, follow-up, records, handoffs, or job admin depends on staff memory.", "Owner wants the current team to handle more work before another admin hire."]} /></article>
            <article className="rounded-[1.8rem] border border-[#E8D9CC] bg-white p-6 shadow-[0_14px_38px_rgba(7,29,58,0.05)]"><h2 className="text-3xl font-semibold tracking-[-0.04em]">Not a fit</h2><Bullets items={["Looking for generic ChatGPT lessons with no workflow review.", "Too little repeatable office process to map yet.", "Trying to remove human review from billing, account changes, or sensitive sends."]} /></article>
          </div>
        </section>

        <section className={`${shell} pb-20 lg:pb-24`}>
          <div className="rounded-[2rem] border border-[#CFE8D5] bg-[#F4FBF5] p-6 sm:p-8">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Why the Map comes before the Sprint</h2>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-[#536173]">The AI Office Installation Sprint should build the workflows worth installing, not whatever sounds interesting first. The Map gives Stanley Systems the process, software limits, staff training gaps, and company playbook context needed to install practical workflows around how your business actually runs.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row"><a href={auditCheckoutHref} target="_blank" rel="noopener noreferrer" className={primary}>Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></a><Link href="/systems-installation-sprint" className={secondary}>See the Sprint</Link></div>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
