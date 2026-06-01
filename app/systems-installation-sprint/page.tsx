import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"
import { PackageHero } from "@/components/package-hero"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"
const auditCheckoutHref = pricingPackageById.workflow_audit.stripePaymentLink.url

export const metadata: Metadata = {
  title: "Systems Installation Sprint | Stanley Systems",
  description: "Turn the Cash Flow Assessment into billing, follow-up, review, referral, and repeat-customer systems your team can use.",
  alternates: { canonical: "https://stanley-systems.com/systems-installation-sprint" },
}

const installedItems = [
  ["Cashflow Control", "Billing handoffs, invoice readiness, payment follow-up, and a clear way to see what is waiting installed around the tools your team already uses."],
  ["Repeat Revenue", "Past-customer follow-up, review asks, referral asks, private feedback routing, and missed-call recovery installed as a dependable workflow."],
  ["Scoped workflow pieces", "When your assessment points to a narrower gap, Stanley Systems can install the specific reminders, templates, handoffs, and tracking your business needs."],
]

const timeline = [
  ["Assessment completed", "The assessment shows which billing, follow-up, review, referral, or repeat-customer systems should be installed first."],
  ["Scope approved", "You approve what gets installed before the build starts."],
  ["Sprint installed and put live", "Stanley Systems builds, tests, and puts the approved workflow live inside your current tools so your team can use it."],
]

export default function SystemsInstallationSprintPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
        <PackageHero
          eyebrow="Systems Installation Sprint"
          title="Get Paid Faster. Follow Up Cleaner. Win More Repeat Work."
          subheading="Start with the Cash Flow Assessment to see where money and customers are slipping through the office. Then Stanley Systems installs the approved systems that help your team automate office work, follow up instantly, collect more 5 star reviews, and bring past customers back."
          contentAlign="left"
          imageSrc="/images/uploaded/package-heroes/stanley-systems-sprint-plan-office-team-van.jpg"
          imageAlt="Stanley Systems office team reviewing a sprint plan with a service van outside."
          imageWidth={1280}
          imageHeight={720}
          objectPosition="center center"
          mobileObjectPosition="58% center"
          imageClassName=""
          imageTransform="none"
          mobileImageTransform="none"
          primaryHref="/workflow-audit"
          primaryLabel="Start the Cash Flow Assessment"
          secondaryHref="/contact?path=pre-buy"
          secondaryLabel="Ask us a question"
          cards={[
            { label: "Leak mapped", detail: "The highest-cost office gap is clear." },
            { label: "Workflow installed", detail: "The system is built around your real process." },
            { label: "Staff can use it", detail: "Your team can see what to do next." },
            { label: "Workflow live", detail: "Reminders and handoffs are working." },
            { label: "Sprint complete", detail: "The approved systems are tested and running." },
          ]}
        />

        <section data-section="sprint-finished-output" className="bg-[#F4FBF5] py-12 sm:py-14">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">What Gets Installed for Your Business</h2>
              <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">Stanley Systems installs Cashflow Control, Repeat Revenue, both, or the specific pieces your business needs inside the tools your team already uses. The goal is simple: faster billing, cleaner follow-up, more reviews, more referrals, and more repeat-customer work.</p>
            </div>
            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              {installedItems.map(([title, body]) => <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_12px_30px_rgba(7,29,58,0.04)]"><h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#102033]">{title}</h3><p className="mt-4 text-sm font-semibold leading-6 text-[#536173]">{body}</p></article>)}
            </div>
          </div>
        </section>

        <section data-section="sprint-pricing" data-motion-exempt className="relative scroll-mt-32 overflow-hidden bg-[#FBFCF7] py-14 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(83,217,134,0.18),transparent_35%)]" />
          <div className={`${shell} relative`}>
            <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#DDEBE2] bg-white shadow-[0_30px_100px_rgba(7,29,58,0.12)] sm:rounded-[2.4rem]">
              <div className="relative overflow-hidden bg-[#071422] px-5 py-8 text-center text-white sm:px-8 sm:py-10">
                <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_8%_42%,rgba(83,217,134,0.24),transparent_18%),radial-gradient(circle_at_92%_40%,rgba(83,217,134,0.20),transparent_18%),linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.07)_50%,transparent_100%)]" />
                <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
                  <span className="rounded-full border border-white/70 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white">Standard installation</span>
                  <span className="text-sm font-black uppercase tracking-[0.12em] text-[#53D986] sm:text-base">Starting at $1,500</span>
                </div>
                <h2 className="relative mx-auto mt-4 max-w-5xl text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.025em] [word-spacing:0.04em] sm:text-6xl sm:leading-[0.94] sm:tracking-[-0.055em] sm:[word-spacing:normal] lg:text-7xl">Systems Installation Sprint</h2>
              </div>

              <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2 lg:gap-5 lg:p-7">
                <div className="rounded-[1.45rem] border border-[#9ED9B2] bg-[linear-gradient(135deg,#F4FBF5_0%,#ffffff_58%,#EAF8EE_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-8 lg:min-h-[218px]">
                  <p className="text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.025em] [word-spacing:0.03em] text-[#071D3A] sm:text-[3.05rem] sm:leading-[1.02] sm:tracking-[-0.055em] sm:[word-spacing:normal] lg:text-[3.45rem] xl:text-[3.6rem]">Get repeat customers and faster payments.</p>
                </div>
                <div className="rounded-[1.45rem] border border-[#A7D7EC] bg-[linear-gradient(135deg,#F7FBFF_0%,#ffffff_56%,#EAF6FF_100%)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-8 lg:min-h-[218px]">
                  <p className="text-[1.9rem] font-semibold leading-[1.08] tracking-[-0.025em] [word-spacing:0.03em] text-[#071D3A] sm:text-[3.05rem] sm:leading-[1.02] sm:tracking-[-0.055em] sm:[word-spacing:normal] lg:text-[3.45rem] xl:text-[3.6rem]">Built, tested, and live in your current workflow.</p>
                </div>
                <div className="rounded-[1.45rem] border border-[#E1E9DE] bg-white p-6 sm:p-8 lg:min-h-[178px]">
                  <p className="text-base font-medium leading-7 text-[#102033] sm:text-lg sm:leading-8">Turns the approved assessment plan into office systems that move billing, payment follow-up, reviews, referrals, and past customers inside the tools your team already uses.</p>
                </div>
                <div className="rounded-[1.45rem] border border-[#BFE4C8] bg-[#F4FBF5] p-6 sm:p-8 lg:min-h-[178px]">
                  <p className="text-base font-medium leading-7 text-[#102033] sm:text-lg sm:leading-8">The Sprint is complete when the approved systems are set up, tested, and running where your team already works. No new software or skills needed.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 px-4 pb-7 pt-1 sm:flex-row sm:justify-center sm:px-6 lg:px-7 lg:pb-8 lg:pt-0">
                <Link href="/workflow-audit" className={`${greenButton} sm:min-w-[360px]`}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
                <Link href="/contact?path=pre-buy" className={`${lightButton} sm:min-w-[280px]`}>Ask us a question</Link>
              </div>
            </div>
          </div>
        </section>

        <section data-section="sprint-timeline" className="bg-white py-12 sm:py-14">
          <div className={shell}>
            <div className="mx-auto max-w-4xl text-center"><h2 className="text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Timeline</h2><p className="mt-4 text-xl font-semibold leading-8 text-[#334B60]">Most Installation Sprints take 1–2 weeks after the Cash Flow Assessment.</p></div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">{timeline.map(([title, body], index) => <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-6 shadow-[0_12px_30px_rgba(7,29,58,0.04)]"><span className="inline-grid h-9 w-9 place-items-center rounded-full bg-[#15803D] text-sm font-black text-white">{index + 1}</span><h3 className="mt-4 text-xl font-semibold tracking-[-0.035em] text-[#102033]">{title}</h3><p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{body}</p></article>)}</div>
            <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#DDEBE2] bg-white p-4 text-center text-sm font-semibold leading-6 text-[#536173]">The timeline depends on scope, tools, and how fast access or examples are provided.</p>
          </div>
        </section>

        <section data-section="sprint-final-cta" className="bg-[#071422] py-14 text-white sm:py-16" data-nav-theme="dark"><div className={`${shell} text-center`}><h2 className="mx-auto max-w-4xl text-[2.2rem] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-5xl">Ready to see what should be installed first?</h2><p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-7 text-white/72 sm:text-lg">Start with the Cash Flow Assessment. If the Sprint is the right move, Stanley Systems can install the systems from that plan.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><CTALink href={auditCheckoutHref} kind="checkout" location="sprint_final_cta" analyticsEvent="audit_checkout_clicked" analyticsSource="systems_installation_sprint" packageId="workflow_audit" packageName="Cash Flow Assessment" billingPeriod="one_time" ctaLabel="Start the Cash Flow Assessment" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></CTALink><Link href="/contact?path=pre-buy" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/12">Ask us a question</Link></div></div></section>
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  )
}
