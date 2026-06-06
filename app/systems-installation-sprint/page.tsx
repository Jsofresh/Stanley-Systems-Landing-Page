import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDown, ArrowRight, BarChart3, Check, ClipboardCheck, FileText, GitBranch, Rocket, ShieldCheck } from "lucide-react"

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

const timeline = [
  ["Assessment completed", "The assessment shows which billing, follow-up, review, referral, or repeat-customer systems should be installed first."],
  ["Scope approved", "You approve what gets installed before the build starts."],
  ["Sprint installed and put live", "Stanley Systems builds, tests, and puts the approved workflow live inside your current tools so your team can use it."],
]

const sprintProcessSteps = [
  { title: "Assessment", body: "We map your current processes and cash flow gaps.", Icon: FileText },
  { title: "Workflow Build", body: "We build the systems inside the tools your team already uses.", Icon: GitBranch },
  { title: "Testing", body: "We test everything end-to-end so it works exactly as it should.", Icon: ClipboardCheck },
  { title: "Live Workflow", body: "Your systems are live and running in your daily workflow.", Icon: Rocket },
]

const sprintOutcomes = [
  { title: "Get repeat customers and faster payments.", Icon: BarChart3 },
  { title: "Built, tested, and live in your current workflow.", Icon: ShieldCheck },
]

export default function SystemsInstallationSprintPage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="light" className="min-h-screen overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
        <PackageHero
          eyebrow="Systems Installation Sprint"
          title="Get Paid Faster. Follow Up Cleaner. Win More Repeat Work."
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
            </div>
            <div className="mx-auto mt-7 max-w-5xl overflow-hidden rounded-[1.6rem] border border-[#DDEBE2] bg-[#071422] shadow-[0_24px_70px_rgba(7,29,58,0.14)]">
              <video
                className="block aspect-video w-full bg-[#071422]"
                src="/videos/installation-sprint-professional-captions.mp4"
                title="What Gets Installed for Your Business"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </section>

        <section data-section="sprint-pricing" data-motion-exempt className="relative scroll-mt-32 overflow-hidden bg-white py-9 sm:py-11 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(83,217,134,0.07),transparent_36%)]" />
          <div className={`${shell} relative`}>
            <div className="mx-auto max-w-[78rem] text-center">
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
                <span className="hidden rounded-[0.72rem] border border-[#E2EADF] bg-white/82 px-5 py-2 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-[#15803D] shadow-[0_10px_24px_rgba(7,29,58,0.03)] sm:inline-flex">Standard installation</span>
                <span className="rounded-[0.72rem] border border-[#E2EADF] bg-white/82 px-5 py-2 text-[0.78rem] font-extrabold uppercase tracking-[0.16em] text-[#15803D] shadow-[0_10px_24px_rgba(7,29,58,0.03)]">Starting at $1,500</span>
              </div>

              <h2 className="mx-auto mt-4 max-w-6xl text-[2.85rem] font-semibold leading-[0.96] tracking-[-0.06em] text-[#071D3A] sm:text-[4.8rem] md:whitespace-nowrap lg:text-[5.75rem] xl:text-[6.2rem]">Systems Installation Sprint</h2>
              <div className="mx-auto mt-5 flex w-64 items-center justify-center gap-0">
                <span className="h-px flex-1 bg-[#DDEBE2]" />
                <span className="h-[3px] w-10 rounded-full bg-[#15803D]" />
                <span className="h-px flex-1 bg-[#DDEBE2]" />
              </div>
            </div>

            <div className="relative mt-8 grid gap-5 lg:grid-cols-4 lg:gap-8">
              {sprintProcessSteps.map(({ title, body, Icon }, index) => (
                <article key={title} className="relative rounded-[1.35rem] border border-[#DDEBE2] bg-white px-5 py-6 text-center shadow-[0_18px_44px_rgba(7,29,58,0.07)] sm:px-6 sm:py-7 lg:min-h-[270px]">
                  {index < sprintProcessSteps.length - 1 ? (
                    <div className="pointer-events-none absolute left-[calc(100%-0.35rem)] top-[5.6rem] z-10 hidden w-9 items-center lg:flex" aria-hidden="true">
                      <span className="h-px flex-1 bg-[#15803D]" />
                      <ArrowRight className="-ml-1 h-7 w-7 text-[#15803D]" strokeWidth={1.9} />
                    </div>
                  ) : null}
                  {index < sprintProcessSteps.length - 1 ? (
                    <div className="pointer-events-none absolute -bottom-5 left-1/2 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-[#BFE4C8] bg-white text-[#15803D] shadow-[0_10px_20px_rgba(21,128,61,0.10)] lg:hidden" aria-hidden="true">
                      <ArrowDown className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                  ) : null}
                  <div className="mx-auto grid h-[5.45rem] w-[5.45rem] place-items-center rounded-[1rem] border border-[#E2EEE2] bg-[linear-gradient(135deg,#F2FAF4_0%,#ffffff_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
                    <div className="relative">
                      <Icon className="h-11 w-11 text-[#126C38]" strokeWidth={1.85} />
                      <span className="absolute -bottom-2 -right-3 grid h-8 w-8 place-items-center rounded-full bg-[#15803D] text-white shadow-[0_8px_18px_rgba(21,128,61,0.28)]">
                        <Check className="h-5 w-5" strokeWidth={3} />
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-5 text-[1.65rem] font-semibold leading-[1.02] tracking-[-0.05em] text-[#071D3A] sm:text-[1.9rem] lg:text-[1.78rem] xl:text-[1.95rem]">{title}</h3>
                  <p className="mx-auto mt-3 max-w-[14rem] text-[0.98rem] font-medium leading-6 text-[#334B60]">{body}</p>
                </article>
              ))}
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {sprintOutcomes.map(({ title, Icon }) => (
                <article key={title} className="flex flex-col items-start gap-5 rounded-[1.35rem] border border-[#DDEBE2] bg-white px-6 py-6 text-left shadow-[0_16px_40px_rgba(7,29,58,0.05)] sm:flex-row sm:items-center sm:px-8 lg:min-h-[136px]">
                  <div className="grid h-[4.8rem] w-[4.8rem] shrink-0 place-items-center rounded-[0.95rem] border border-[#E2EEE2] bg-[linear-gradient(135deg,#F2FAF4_0%,#ffffff_100%)]">
                    <Icon className="h-10 w-10 text-[#15803D]" strokeWidth={1.85} />
                  </div>
                  <h3 className="max-w-[31rem] text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.05em] text-[#071D3A] sm:text-[2.2rem] lg:text-[2.2rem] xl:text-[2.3rem]">{title}</h3>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/workflow-audit" className={`${greenButton} w-full sm:w-auto sm:min-w-[360px]`}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/contact?path=pre-buy" className={`${lightButton} w-full sm:w-auto sm:min-w-[280px]`}>Ask us a question</Link>
            </div>
            <p className="mt-4 flex flex-col items-center justify-center gap-2 text-center text-sm font-medium leading-6 text-[#334B60] sm:flex-row">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-[#9ED9B2] text-[#15803D]"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
              <span>One clear process. No new software. Built around how your team already works.</span>
            </p>
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
