import Link from "next/link"
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, Sparkles } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const primary = "inline-flex min-h-14 items-center justify-center rounded-full bg-[#15803D] px-8 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const secondary = "inline-flex min-h-14 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-8 py-4 text-base font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:bg-[#f3fbf5]"
const auditCheckoutHref = pricingPackageById.workflow_audit.stripePaymentLink.url

const deliverables = [
  ["Fix List, Not a Recap", "The specific office work to clean up, stop repeating, automate, or hand to AI first."],
  ["Staff AI Plays", "Copy/paste prompts and use cases your office team can test on real job notes, emails, follow-up, and billing prep."],
  ["Tool + Workflow Recommendations", "Which current tools to use better, which simple add-ons are worth considering, and which random automations to avoid."],
  ["AI Priority Matrix", "The improvements ranked by speed, effort, business value, staff impact, and install readiness."],
  ["First Workflow to Install", "The highest-leverage workflow Stanley Systems should build first if you move into the Sprint."],
  ["Quick Capacity Wins", "Practical changes your team can use before a full installation: handoff rules, templates, checks, and AI shortcuts."],
  ["30-Day Office Improvement Plan", "A short action plan for what to fix now, what to train, and what belongs in the Installation Sprint."],
]

const sampleOutputs = [
  {
    title: "Messy Info → Clean Office Work",
    drag: "Office work starts from scattered texts, emails, notes, photos, calls, and field updates.",
    lift: "Turn raw inputs into clean office notes, missing-info checks, customer-safe updates, and next actions.",
    impact: "Less retyping. Cleaner records. Faster handoffs.",
  },
  {
    title: "Billing-Ready Handoffs",
    drag: "Completed work still needs manual cleanup before invoices, payment applications, or billing notes can move.",
    lift: "Package job details into billing-ready summaries with labor, materials, approvals, and gaps clearly flagged.",
    impact: "Faster billing prep. Fewer back-and-forth questions.",
  },
  {
    title: "Follow-Up Control",
    drag: "Estimates, unpaid invoices, callbacks, and customer updates disappear into lists, inboxes, or memory.",
    lift: "Surface what needs attention, draft the next message, and assign the next office action.",
    impact: "More recovered work. Fewer dropped balls.",
  },
  {
    title: "Staff Decision Support",
    drag: "Staff keep stopping to ask what to do next, what matters, or what needs owner/manager approval.",
    lift: "Turn messy context into short decision briefs with options, risks, next steps, and approval flags.",
    impact: "Fewer owner interruptions. Faster decisions. More confident staff.",
  },
]

const steps = [
  ["Book the Map", "Pick a time and point Stanley Systems at the office work that keeps stealing time."],
  ["Trace the Drag", "We follow the workflow only far enough to find the repeated work, decision points, and AI opportunities worth fixing."],
  ["Get the Fix Plan", "You receive prompts, staff plays, workflow changes, tool recommendations, quick wins, and the first install priority."],
]

function SectionHeader({ eyebrow, title, body, dark = false }: { eyebrow: string; title: string; body?: string; dark?: boolean }) {
  return (
    <div className="max-w-4xl">
      <p className={`text-xs font-black uppercase tracking-[0.16em] ${dark ? "text-[#9BE7AE]" : "text-[#15803D]"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-[2.25rem] font-semibold leading-[1] tracking-[-0.035em] sm:text-[4rem] ${dark ? "text-white" : "text-[#071D3A]"}`}>{title}</h2>
      {body ? <p className={`mt-4 text-lg font-semibold leading-8 ${dark ? "text-white/72" : "text-[#536173]"}`}>{body}</p> : null}
    </div>
  )
}

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBF8F2] text-[#071D3A]">
        <section id="assessment" className="relative isolate scroll-mt-[120px] overflow-hidden bg-[#071D3A] pt-32 pb-16 text-white lg:pt-40 lg:pb-24">
          <img src="/images/uploaded/ai-office/owner-reviewing-paperwork.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,29,58,0.98)_0%,rgba(7,29,58,0.91)_46%,rgba(7,29,58,0.62)_78%,rgba(7,29,58,0.5)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(83,217,134,0.2),transparent_34%),linear-gradient(180deg,rgba(7,29,58,0.08)_0%,rgba(7,29,58,0.88)_100%)]" />
          <div className={shell}>
            <div className="max-w-[980px]">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#9BE7AE]">AI Office Map</p>
              <h1 className="mt-4 text-balance text-[3rem] font-semibold leading-[0.96] tracking-[-0.025em] sm:text-[5.6rem] sm:tracking-[-0.045em]">Find the Office Work AI Should Remove First.</h1>
              <p className="mt-6 max-w-[860px] text-xl font-semibold leading-9 text-white/84">Get concrete fixes, staff AI prompts, workflow tips, tool recommendations, and the first install priority — not a recap of how your office already works.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href={auditCheckoutHref} target="_blank" rel="noopener noreferrer" className={primary}>Book the AI Office Map <ArrowRight className="ml-2 h-5 w-5" /></a>
                <Link href="/ai-office-blueprint" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/30 bg-white/12 px-8 py-4 text-base font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18">Get the Free Blueprint</Link>
              </div>
              <p className="mt-5 text-base font-bold text-white/80">The AI Office Map is $197 and is credited toward your AI Office Installation Sprint.</p>
            </div>
          </div>
        </section>

        <section data-motion-exempt className={`${shell} py-16 lg:py-24`}>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#15803D]">Demo Preview</p>
            <h2 className="mt-3 text-[2.25rem] font-semibold leading-[1] tracking-[-0.035em] text-[#071D3A] sm:text-[4rem]">See What the Map Gives You</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-[#536173]">Watch the demo preview to see how the AI Office Map turns office drag into usable fixes, prompts, tools, and install priorities.</p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] border border-[#CFE8D5] bg-[#071D3A] p-2 shadow-[0_24px_70px_rgba(7,29,58,0.18)] sm:p-3">
            <video
              className="aspect-video w-full rounded-[1.5rem] bg-[#071D3A] object-cover"
              src="/videos/ai-office-map-demo-preview.mp4"
              poster="/images/uploaded/ai-office/ai-office-map-demo-preview-poster.jpg"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </section>

        <section data-motion-exempt className={`${shell} pb-16 lg:pb-24`}>
          <SectionHeader eyebrow="Deliverables" title="What You Actually Get in the AI Office Map" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map(([title, body], index) => (
              <article key={title} className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_14px_38px_rgba(7,29,58,0.05)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDF7E8] text-[#116832]"><ClipboardCheck className="h-6 w-6" /></div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#15803D]">0{index + 1}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#071D3A]">{title}</h3>
                <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section data-motion-exempt className="bg-[#EEF8EE] py-16 lg:py-24">
          <div className={shell}>
            <SectionHeader eyebrow="Sample Output" title="A Real Fix Plan, Not a Call Summary" body="The Map turns office drag into practical plays your team can use and Stanley Systems can install." />
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {sampleOutputs.map((card) => (
                <article key={card.title} className="rounded-[1.5rem] border border-[#CFE8D5] bg-white p-6 shadow-[0_14px_38px_rgba(7,29,58,0.05)]">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#071D3A]">{card.title}</h3>
                  <div className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-[#536173]">
                    <p><span className="font-black text-[#071D3A]">Drag:</span> {card.drag}</p>
                    <p><span className="font-black text-[#071D3A]">AI lift:</span> {card.lift}</p>
                    <p className="rounded-2xl bg-[#DDF7E8] p-4 font-extrabold text-[#116832]">Impact: {card.impact}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-motion-exempt className={`${shell} py-16 lg:py-24`}>
          <SectionHeader eyebrow="Process" title="How It Works" />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {steps.map(([title, body], index) => (
              <article key={title} className="rounded-[1.6rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_14px_38px_rgba(7,29,58,0.05)]">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#071D3A] text-lg font-black text-white">{index + 1}</div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section data-motion-exempt className="bg-[#071D3A] py-16 text-white lg:py-24">
          <div className={`${shell} grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center`}>
            <SectionHeader dark eyebrow="Booking" title="Book the AI Office Map" body="Use the Map to get the fixes, prompts, tool guidance, and install priority before your team spends time or money on the wrong workflow." />
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="grid gap-4">
                {[["Session", "45 to 60 minutes"], ["Output", "Fixes, prompts, tool guidance, quick wins, install priority"], ["Credit", "$197 credited toward installation"]].map(([label, value]) => (
                  <div key={label} className="flex items-start gap-4 rounded-2xl bg-white/8 p-4">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#9BE7AE]" />
                    <div><p className="text-xs font-black uppercase tracking-[0.14em] text-white/46">{label}</p><p className="mt-1 font-extrabold text-white">{value}</p></div>
                  </div>
                ))}
              </div>
              <a href={auditCheckoutHref} target="_blank" rel="noopener noreferrer" className={`${primary} mt-6 w-full`}>Book the AI Office Map <ArrowRight className="ml-2 h-5 w-5" /></a>
            </div>
          </div>
        </section>

        <section data-motion-exempt className={`${shell} py-16 lg:py-24`}>
          <div className="grid gap-8 rounded-[2rem] border border-[#CFE8D5] bg-white p-6 shadow-[0_18px_54px_rgba(7,29,58,0.06)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="flex gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DDF7E8] text-[#116832]"><FileText className="h-7 w-7" /></div>
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">Not Ready for the Full Map Yet?</h2>
                <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">Get the free AI Office Blueprint. Fill out a short office workflow form and we’ll send back a custom PDF showing where AI could help your team move faster, clean up work, and reduce admin drag.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["2 to 3 AI staff plays", "Copy and paste prompts", "One quick capacity win", "Best next workflow"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#F7F2EA] p-4 text-sm font-extrabold text-[#071D3A]"><Sparkles className="h-4 w-4 text-[#15803D]" />{item}</div>
              ))}
              <Link href="/ai-office-blueprint" className={`${secondary} sm:col-span-2`}>Get My Free Blueprint <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
