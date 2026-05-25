import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

type PricingSearchParams = Record<string, string | string[] | undefined>

const card = "rounded-[1.75rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_48px_rgba(7,29,58,0.06)]"
const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_22px_48px_rgba(21,128,61,0.28)]"
const lightButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]"

const assessmentIncludes = [
  "Where money is being missed and what it likely costs",
  "The actual problems slowing down cash, reviews, referrals, and repeat work",
  "The full fix list",
  "What should be worked on first",
  "$194 credit toward the Sprint if Stanley Systems builds it",
]

const sprintIncludes = [
  "Build Cashflow Control, Repeat Revenue, both, or a scoped mix",
  "Install the workflows agreed from the assessment",
  "Connect tools, records, reminders, and handoffs",
  "Test before launch",
  "Document what was built",
  "Prepare Monthly Control if ongoing support is needed",
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
      <section className="px-4 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-[7.5rem]">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#e7e1d6] bg-white px-5 py-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.075)] sm:rounded-[2.5rem] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
          <h1 className="mx-auto max-w-5xl text-balance text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#102033] sm:text-5xl lg:text-[4.25rem]">
            Start with the assessment. Build the systems during the Sprint. Keep them working after launch.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-7 text-[#536173]">
            Stanley Systems uses one clear ladder: a paid diagnostic, a focused implementation Sprint, and optional Monthly Control after the systems are installed.
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/workflow-audit" className={greenButton}>Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></Link>
            <Link href="/systems-installation-sprint" className={lightButton}>See how the Sprint works</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-10">
        <section aria-label="Offer ladder" className="grid gap-5 lg:grid-cols-[0.95fr_1.1fr_0.95fr]">
          <article className={card}>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">Cash Flow Assessment — $97</h2>
            <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">Find what is slowing the business down before you pay for a build.</p>
            <BulletList items={assessmentIncludes} />
            <Link href="/workflow-audit" className={`mt-6 w-full ${greenButton}`}>Start the Cash Flow Assessment</Link>
          </article>

          <article className={`${card} relative border-2 border-[#15803D] bg-[linear-gradient(180deg,#ffffff_0%,#F4FBF5_100%)] shadow-[0_26px_80px_rgba(21,128,61,0.14)]`}>
            <div className="absolute right-5 top-5 rounded-full bg-[#E7F7EB] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.1em] text-[#116832]">Build step</div>
            <h2 className="max-w-[28rem] text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">Systems Installation Sprint — starts at $1,500</h2>
            <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">
              A focused build period where Stanley Systems turns the assessment plan into working systems for cash, follow-up, reviews, referrals, repeat work, and office handoffs.
            </p>
            <BulletList items={sprintIncludes} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Link href="/systems-installation-sprint" className={`w-full ${greenButton}`}>See how the Sprint works</Link>
              <Link href="/contact?path=pre-buy" className={`w-full ${lightButton}`}>Ask us a question</Link>
            </div>
          </article>

          <article className={card}>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">Monthly Control</h2>
            <p className="mt-4 text-[2.9rem] font-semibold leading-none tracking-[-0.07em] text-[#071D3A]">Optional</p>
            <p className="mt-3 text-base font-semibold leading-7 text-[#536173]">After the Systems Installation Sprint, Stanley Systems keeps the systems checked, adjusted, and working as the business keeps moving.</p>
            <p className="mt-4 rounded-2xl bg-[#F4FBF5] p-4 text-sm font-extrabold leading-6 text-[#116832]">Monthly Control is optional after the Sprint. It is not sold by itself.</p>
            <Link href="/contact?path=pre-buy" className={`mt-6 w-full ${lightButton}`}>Ask us a question</Link>
          </article>
        </section>
      </div>
    </main>
  )
}
