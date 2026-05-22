import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

type PricingSearchParams = Record<string, string | string[] | undefined>

const card = "rounded-[1.75rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_48px_rgba(7,29,58,0.06)]"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

const comparison = [
  { title: "Cashflow Control", href: "/systems/cashflow-control", body: "For customer intake, office handoffs, invoicing, payment follow-up, and collected cash." },
  { title: "Repeat Revenue", href: "/systems/repeat-revenue", body: "For past customers, missed calls, reviews, referrals, and follow-up that should turn good work into more booked jobs." },
  { title: "Both Systems", href: "/systems/both-systems", body: "For businesses where work needs to keep moving before the invoice is paid and after the customer is happy." },
]

const assessmentIncludes = [
  "Where money is being missed and what it likely costs",
  "The actual problems slowing down cash, reviews, referrals, and repeat work",
  "The full fix list",
  "What should be built first",
]

export function PricingPage({ searchParams: _searchParams }: { searchParams: PricingSearchParams }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#102033]">
      <section className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-[7.5rem]">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#e7e1d6] bg-white px-5 py-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.075)] sm:rounded-[2.5rem] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <h1 className="mx-auto max-w-5xl text-balance text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#102033] sm:text-5xl lg:text-[4.25rem]">Start with the assessment. Build during the sprint. Keep the system working after it is live.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-7 text-[#536173]">Stanley Systems uses one clear ladder: a paid diagnostic first, a focused build second, and optional Monthly Control only after the systems are installed.</p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
            <Link href="/contact?path=pre-buy" className={lightButton}>Ask us a question</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-10">
        <section aria-label="Offer ladder" className="grid gap-5 lg:grid-cols-3">
          <article className={`${card} border-2 border-[#15803D]`}>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Paid diagnostic</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">Cash Flow Assessment</h2>
            <p className="mt-4 text-[4rem] font-semibold leading-none tracking-[-0.07em] text-[#071D3A]">$97</p>
            <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">Find what is slowing the business down before you pay for a build.</p>
            <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-[#334B60]">
              {assessmentIncludes.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />{item}</li>)}
            </ul>
            <Link href="/workflow-audit" className={`mt-6 w-full ${greenButton}`}>Start the Cash Flow Assessment</Link>
          </article>

          <article className={card}>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Build sprint</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">Systems Installation Sprint</h2>
            <p className="mt-4 text-[4rem] font-semibold leading-none tracking-[-0.07em] text-[#071D3A]">$1,500</p>
            <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">A focused installation period where Stanley Systems builds the first full version of the systems your business chooses to put in place.</p>
            <Link href="/how-the-assessment-works" className={`mt-6 w-full ${greenButton}`}>See how it works</Link>
          </article>

          <article className={card}>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#15803D]">After the Sprint</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">Monthly Control</h2>
            <p className="mt-4 text-[3.25rem] font-semibold leading-none tracking-[-0.07em] text-[#071D3A]">$147–$347/month</p>
            <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">After the Systems Installation Sprint, Stanley Systems keeps the systems checked, adjusted, and working as the business keeps moving.</p>
            <p className="mt-4 rounded-2xl bg-[#F4FBF5] p-4 text-sm font-extrabold leading-6 text-[#116832]">Monthly Control is optional after the Systems Installation Sprint. It is not sold by itself. Pricing depends on the amount and complexity of the automations installed. If you do not continue, Stanley Systems hands over control of what was built and your team owns upkeep and updates.</p>
            <Link href="/contact?path=pre-buy" className={`mt-6 w-full ${lightButton}`}>Ask us a question</Link>
          </article>
        </section>

        <section className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_48px_rgba(7,29,58,0.06)] sm:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-[#102033] sm:text-5xl">The assessment decides what gets built first.</h2>
            <p className="mt-3 text-base leading-7 text-[#536173] sm:text-lg">You can choose individual automations from Cashflow Control or Repeat Revenue. The systems work best together, especially Repeat Revenue, but the Sprint is shaped around the real bottleneck, not a preset package.</p>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {comparison.map((system) => (
              <Link key={system.title} href={system.href} className="rounded-2xl border border-[#dfe7ee] bg-[#f8fbfc] p-5 transition hover:border-[#15803D] hover:bg-[#f4fbf5]">
                <h3 className="text-xl font-semibold text-[#102033]">{system.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#536173]">{system.body}</p>
                <span className="mt-4 inline-flex text-sm font-bold text-[#116832]">View page →</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
