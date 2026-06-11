import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const primary = "inline-flex min-h-14 items-center justify-center rounded-full bg-[#15803D] px-8 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const secondary = "inline-flex min-h-14 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-8 py-4 text-base font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:bg-[#f3fbf5]"

function Bullets({ items }: { items: string[] }) {
  return <ul className="mt-6 grid gap-3">{items.map((item) => <li key={item} className="flex gap-3 text-base font-semibold leading-7 text-[#34495F]"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#15803D]" />{item}</li>)}</ul>
}

const installSteps = [
  { title: "Map locked", copy: "AI Office Map complete and workflows selected." },
  { title: "Playbook built", copy: "Your company playbook built from real staff workflow and owner-approved rules." },
  { title: "Staff trained", copy: "Staff AI training so the team knows what stays human-reviewed." },
  { title: "Workflows installed", copy: "Priority workflows installed, tested, and connected around existing tools." },
  { title: "Proof delivered", copy: "Proof report delivered so the owner sees what changed." },
  { title: "Launch support", copy: "30 days light support after launch." },
]

export default function PAGE() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBFCF7] text-[#071D3A]">
        <section className="relative isolate flex min-h-[680px] overflow-hidden bg-[#071D3A] px-4 pb-20 pt-32 text-white sm:px-6 lg:min-h-[100svh] lg:px-8 lg:pb-28 lg:pt-36">
          <img src="/images/uploaded/package-heroes/stanley-systems-sprint-plan-office-team-van.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071D3A_0%,rgba(7,29,58,0.96)_20%,rgba(7,29,58,0.74)_48%,rgba(7,29,58,0.28)_72%,rgba(7,29,58,0.52)_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,29,58,0.74)_0%,rgba(7,29,58,0.18)_42%,#071D3A_100%)]" />
          <div className={`${shell} flex min-h-[520px] w-full items-center lg:min-h-0`}>
            <div className="max-w-[820px]">
              <h1 className="text-balance text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.035em] text-white sm:text-[4.45rem]">Turn your AI Office Map into staff training, a company playbook, and practical office workflows.</h1>
              <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">Stanley Systems installs practical AI-guided workflows around your existing software so your current office team can handle more billing, follow-up, handoffs, and job admin without another admin hire.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/workflow-audit" className={primary}>Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/pricing" className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/35 bg-white/12 px-8 py-4 text-base font-extrabold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18">Compare Map, Sprint, and Ops</Link></div>
            </div>
          </div>
        </section>

        <section className={`${shell} py-16 lg:py-20`}>
          <div className="mb-8 max-w-4xl">
            <h2 className="text-[2.25rem] font-semibold leading-[1] tracking-[-0.04em] sm:text-[4rem]">What the Installation Sprint delivers</h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-[#536173]">The Sprint turns the Map into working office habits, approved rules, staff training, and installed workflows the team can actually use.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {installSteps.map((item) => <article key={item.title} className="rounded-[1.65rem] border border-[#DDEBE2] bg-white p-7 shadow-[0_14px_38px_rgba(7,29,58,0.05)]"><h3 className="text-2xl font-extrabold tracking-[-0.035em] text-[#071D3A]">{item.title}</h3><p className="mt-4 text-xl font-bold leading-8 text-[#34495F]">{item.copy}</p></article>)}
          </div>
        </section>

        <section className={`${shell} pb-20 lg:pb-24`}><div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_54px_rgba(7,29,58,0.06)]"><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Why the Map comes first</h2><Bullets items={["The Map shows which workflows are worth installing before implementation starts.", "Stanley Systems uses your software limits, staff roles, and company playbook gaps to scope the Sprint.", "If the Map shows no clear fit, you avoid buying an implementation that should not be built."]} /></div></section>
        <section className={`${shell} pb-20 lg:pb-24`}><div className="grid gap-6 lg:grid-cols-3"><article className="rounded-[2rem] bg-white p-6 shadow-[0_18px_54px_rgba(7,29,58,0.06)]"><h2 className="text-3xl font-semibold tracking-[-0.04em]">What gets installed</h2><Bullets items={["Practical workflows for billing readiness, follow-up, handoffs, records, or job admin.", "AI-guided drafts, checks, summaries, and routing around your existing tools.", "Owner-approved rules, examples, templates, and escalation points."]} /></article><article className="rounded-[2rem] bg-white p-6 shadow-[0_18px_54px_rgba(7,29,58,0.06)]"><h2 className="text-3xl font-semibold tracking-[-0.04em]">What your staff learns</h2><Bullets items={["How to use AI in the real office workflow.", "When to approve, edit, escalate, or stop a workflow.", "How to use your company playbook instead of generic prompts."]} /></article><article className="rounded-[2rem] bg-white p-6 shadow-[0_18px_54px_rgba(7,29,58,0.06)]"><h2 className="text-3xl font-semibold tracking-[-0.04em]">What we do not do</h2><Bullets items={["No fully autonomous billing, payments, or account changes.", "No replacing your staff or bypassing human review for sensitive work.", "No software rip-and-replace unless a separate scope says so."]} /></article></div></section>
        <section className={`${shell} pb-20 lg:pb-24`}><div className="rounded-[2rem] border border-[#CFE8D5] bg-[#F4FBF5] p-6 text-center shadow-[0_18px_54px_rgba(7,29,58,0.06)]"><h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Start with the Map if you have not bought it yet.</h2><p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-7 text-[#536173]">$197 credited toward your AI Office Installation Sprint when you move forward.</p><div className="mt-7 flex justify-center"><Link href="/workflow-audit" className={primary}>Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></Link></div></div></section>
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
