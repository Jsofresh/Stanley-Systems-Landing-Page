import Link from "next/link"
import { FOUNDING_PARTNER_OFFER } from "@/lib/offers/founding-partner"
import { commandMapPricingPackage } from "@/lib/pricing/source-of-truth"

type PricingSearchParams = Record<string, string | string[] | undefined>

const included = [
  ["Connect", "Supported office systems, documents, roles, and permissions."],
  ["Operate", "Company-specific workflows and reusable team playbooks."],
  ["Control", "Source checks, approval steps, and completion receipts."],
  ["Train", "Staff training plus 30 days of live optimization and AI Office Ops."],
]

const faqs = [
  ["Is the Founding Partner price fixed?", "$3,500 is the fixed one-time installation fee and $500 is the monthly founding-plan base rate after the included first 30 days."],
  ["What is locked for life?", "The $500 monthly base rate for the included founding plan stays locked for the life of that founding customer. Separately scoped add-ons are not part of the rate lock."],
  ["How does the 30-day guarantee work?", "The 30 days begin when Stanley AI Office launches for staff use. If it does not make the agreed work meaningfully faster or better, cancel during that period for a full Installation Sprint refund."],
  ["Can Stanley change important records without approval?", "No new consequential write path or expanded permission is activated without written approval. Each accepted capability is read-only, prepare-only, or approval-required before launch."],
  ["Are third-party costs included?", "No. External software subscriptions and usage charges are separate from Stanley Systems fees."],
]

export function PricingPage({ searchParams: _searchParams }: { searchParams: PricingSearchParams }) {
  return <main className="overflow-hidden bg-[#FBFCF7] text-[#071D3A]">
    <section data-nav-theme="light" className="flex min-h-[100svh] items-center px-5 pb-16 pt-32 md:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-[88rem] items-center gap-10 lg:grid-cols-[1.04fr_.96fr] lg:gap-16">
        <div><h1 className="text-balance text-[clamp(3.4rem,7vw,6.5rem)] font-extrabold leading-[.89] tracking-[-.045em]">Multiply the office team you already have.</h1><p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-[#536173]">A company-specific Stanley AI Office, installed around current tools and proven with current staff.</p><Link href="/systems-installation-sprint#installation-contact" className="mt-8 inline-flex min-h-14 items-center rounded-full bg-[#15803D] px-7 font-extrabold text-white">Apply for Installation</Link></div>
        <aside className="rounded-[2.25rem] bg-[#071422] p-7 text-white shadow-[0_32px_90px_rgba(7,29,58,.22)] sm:p-10"><p className="text-lg font-extrabold text-[#8DF3A4]">Founding Partner pricing</p><p className="mt-5 text-[clamp(4rem,8vw,6.4rem)] font-black leading-none tracking-[-.06em]">$3,500</p><p className="mt-2 text-xl font-bold text-white/66">one-time Installation Sprint</p><p className="mt-8 text-3xl font-extrabold">$500/month</p><p className="mt-2 font-semibold leading-7 text-white/62">after 30 included days—for monitoring, fixes, staff training, and improvements to the installed scope</p><p className="mt-6 border-t border-white/14 pt-6 font-bold text-white/75">{FOUNDING_PARTNER_OFFER.monthlyRateLock}</p></aside>
      </div>
    </section>

    <section id="included" data-nav-theme="dark" className="scroll-mt-24 bg-[#071422] px-5 py-16 text-white md:px-8 lg:px-10 lg:py-20"><div className="mx-auto max-w-[88rem]"><div className="grid items-end gap-8 lg:grid-cols-[.9fr_1.1fr]"><h2 className="text-balance text-[clamp(2.8rem,5.3vw,5rem)] font-extrabold leading-[.92] tracking-[-.04em]">A working office system. Installed with your team.</h2><p className="text-xl font-semibold leading-8 text-white/66">Not a software license or template handoff. Stanley Systems configures, trains, tests, and stays through real use.</p></div><div className="mt-10 grid border-y border-white/14 sm:grid-cols-2 lg:grid-cols-4">{included.map(([title, copy]) => <article key={title} className="border-b border-white/14 py-6 sm:p-6 lg:border-b-0 lg:border-r lg:last:border-r-0"><h3 className="text-3xl font-extrabold text-[#8DF3A4]">{title}</h3><p className="mt-3 font-semibold leading-7 text-white/64">{copy}</p></article>)}</div></div></section>

    <section data-nav-theme="light" className="px-5 py-16 md:px-8 lg:px-10 lg:py-20"><div className="mx-auto grid max-w-[88rem] items-center gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-lg font-black uppercase tracking-[.1em] text-[#536173]">Up to</p><p className="text-[clamp(4.8rem,12vw,9rem)] font-black leading-none tracking-[-.07em] text-[#15803D]">520</p><p className="mt-2 text-2xl font-extrabold">hours per year at ten reclaimed hours a week.</p></div><div><h2 className="text-balance text-[clamp(2.7rem,5vw,4.8rem)] font-extrabold leading-[.94] tracking-[-.04em]">Before adding another roughly $60,000 admin role, multiply the team you already trust.</h2><p className="mt-5 text-xl font-semibold leading-8 text-[#536173]">No one is replaced. Repetitive office work is reduced so current staff can move more work forward.</p></div></div></section>

    <section data-nav-theme="dark" className="bg-[#0B3B60] px-5 py-16 text-white md:px-8 lg:px-10 lg:py-20"><div className="mx-auto max-w-[88rem]"><h2 className="text-center text-[clamp(2.8rem,5vw,4.8rem)] font-extrabold tracking-[-.04em]">Choose the right first step.</h2><div className="mt-10 grid overflow-hidden rounded-[2rem] border border-white/16 bg-white/[.04] lg:grid-cols-2"><article className="p-7 sm:p-9 lg:border-r lg:border-white/16"><p className="text-5xl font-black">$197</p><h3 className="mt-4 text-3xl font-extrabold text-[#8DF3A4]">AI Office Command Map</h3><p className="mt-3 max-w-xl font-semibold leading-7 text-white/66">One installed starter, two reusable kits, and a practical map of the next three office workflows.</p><a href={commandMapPricingPackage.stripePaymentLink.url} target="_blank" rel="noopener noreferrer" data-analytics-event="command_map_checkout_clicked" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-[#15803D] px-6 font-extrabold text-white">Get the Command Map</a></article><article className="border-t border-white/16 p-7 sm:p-9 lg:border-t-0"><p className="text-5xl font-black">$3,500</p><h3 className="mt-4 text-3xl font-extrabold text-[#8DF3A4]">Installation Sprint</h3><p className="mt-3 max-w-xl font-semibold leading-7 text-white/66">A complete Stanley AI Office installation with staff training and 30 days of live optimization included.</p><Link href="/systems-installation-sprint" className="mt-6 inline-flex min-h-12 items-center rounded-full border border-white/28 px-6 font-extrabold text-white">View the Installation</Link></article></div><p className="mt-6 text-center"><Link href="/ai-office-capacity-calculator" className="font-extrabold text-[#8DF3A4] underline underline-offset-4">Start with the free capacity calculator</Link></p></div></section>

    <section data-nav-theme="light" className="bg-[#F5F9F2] px-5 py-16 md:px-8"><div className="mx-auto max-w-4xl"><h2 className="text-center text-5xl font-extrabold tracking-[-.04em]">Pricing questions.</h2><div className="mt-8 divide-y divide-[#D5E5DA] border-y border-[#D5E5DA]">{faqs.map(([q,a]) => <details key={q} className="py-5"><summary className="cursor-pointer text-xl font-extrabold">{q}</summary><p className="mt-3 font-semibold leading-7 text-[#536173]">{a}</p></details>)}</div></div></section>
  </main>
}
