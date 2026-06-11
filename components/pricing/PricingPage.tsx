import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

type PricingSearchParams = Record<string, string | string[] | undefined>

const card = "rounded-[1.75rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_48px_rgba(7,29,58,0.06)]"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

const offers = [
  {
    step: "Free",
    id: "admin-drag-calculator",
    title: "Admin Drag Calculator",
    price: "Free",
    body: "Estimate what copying, chasing, retyping, reconciling, delayed billing, and missed follow-up cost each month.",
    bullets: ["Rough numbers only", "Monthly admin drag cost", "Hours lost/month", "First workflows worth mapping"],
    href: "/invoicing-delay-cash-flow-calculator",
    cta: "Calculate Your Admin Drag",
  },
  {
    step: "Diagnostic",
    id: "ai-office-map",
    title: "AI Office Map",
    price: "$197",
    body: "A focused session that shows where the office is falling behind, what your software already handles, and what AI should fix first.",
    bullets: ["45–60 minute owner/office-manager call", "Software redundancy check", "Top 3 AI workflow opportunities", "$197 credited toward the Sprint"],
    href: "/workflow-audit",
    cta: "Book the AI Office Map",
    featured: true,
  },
  {
    step: "Install",
    id: "installation-sprint",
    title: "AI Office Installation Sprint",
    price: "$3,500 starting",
    body: "Install 1–3 money-moving office workflows around the tools your staff already uses.",
    bullets: ["Office workflow map", "Office playbook v1", "Staff AI training session", "Proof report + 30 days light support"],
    href: "/systems-installation-sprint",
    cta: "See the Installation Sprint",
  },
  {
    step: "Operate",
    id: "ai-office-ops",
    title: "AI Office Ops",
    price: "$500/mo starting",
    body: "Keep installed workflows working, improve prompts and SOPs, support staff, and add small improvements over time.",
    bullets: ["Workflow monitoring", "Broken automation fixes", "Staff support", "Monthly proof report"],
    href: "/contact?path=ai-office-ops",
    cta: "Ask about AI Office Ops",
  },
]

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-[#334B60]">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function PricingPage({ searchParams: _searchParams }: { searchParams: PricingSearchParams }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#102033]">
      <section className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-[7.25rem]">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#e7e1d6] bg-white px-5 py-7 text-center shadow-[0_24px_70px_rgba(15,23,42,0.075)] sm:rounded-[2.5rem] sm:px-8 lg:px-12">
          <h1 className="mx-auto max-w-4xl text-balance text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#102033] sm:text-5xl lg:text-[3.65rem]">Make your current office team faster, sharper, and more profitable before you hire another admin.</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-7 text-[#536173]">Stanley Systems installs AI where office work actually happens: field-service software, accounting software, phones, inbox, texts, and staff workflows.</p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"><Link href="/invoicing-delay-cash-flow-calculator" className={greenButton}>Calculate Your Admin Drag <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/workflow-audit" className={lightButton}>Book the AI Office Map</Link></div>
        </div>
      </section>
      <section aria-label="Offer ladder" className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-4 lg:px-8">
        {offers.map((offer) => (
          <article id={offer.id} key={offer.title} className={`${card} ${offer.featured ? "border-2 border-[#15803D] bg-[linear-gradient(180deg,#ffffff_0%,#F4FBF5_100%)] shadow-[0_26px_80px_rgba(21,128,61,0.14)]" : ""}`}>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">{offer.title}</h2>
            <p className="mt-3 text-[2rem] font-extrabold tracking-[-0.04em] text-[#071D3A]">{offer.price}</p>
            <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">{offer.body}</p>
            <BulletList items={offer.bullets} />
            <Link href={offer.href} className={`mt-6 w-full ${offer.featured ? greenButton : lightButton}`}>{offer.cta}</Link>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-14 text-center sm:px-6 lg:px-8">
        <div className="rounded-[1.4rem] border border-[#DDEBE2] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
          <p className="text-base font-bold text-[#334B60]">Payment links are intentionally left wired to the existing Stripe Payment Links for now. Public pricing reflects the new AI Office offer ladder.</p>
        </div>
      </section>
    </main>
  )
}
