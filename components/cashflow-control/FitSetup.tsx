import Link from "next/link"
import { CheckCircle2, XCircle } from "lucide-react"
import { sectionShell } from "./tokens"

const goodFit = [
  "Service businesses with completed work waiting on billing",
  "Teams using accounting software plus a field, job, dispatch, CRM, or shop system",
  "Businesses with an office manager, admin, bookkeeper, or owner handling billing",
  "Shops where delayed invoices, open balances, or missing job details happen more than once",
  "Owners who want fewer manual checks without replacing their whole software stack",
]
const notFit = ["No real software system", "No meaningful invoice volume", "No office or admin workflow", "Tiny owner-operators who treat admin time as free", "Businesses that will not provide enough access or visibility to confirm fit"]
const setup = ["Access to the field, job, dispatch, CRM, or shop system", "Access to the accounting, billing, invoice, or payment system", "One office contact who understands the billing path", "Current rules for invoice timing, follow-up, and exceptions", "A test run before anything customer-facing goes live"]

export function FitSetup() {
  return (
    <section className="bg-[#FBFCF7] py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Fit and setup</p>
          <h2 className="mt-3 text-[2.4rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Best for shops with real job volume and real office handoffs.</h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <ListCard title="Good fit" items={goodFit} icon="check" />
          <ListCard title="Not a fit" items={notFit} icon="x" />
          <ListCard title="Setup requirements" items={setup} icon="check" />
        </div>
        <div className="mt-6 rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)]">
          <p className="text-sm font-semibold leading-6 text-[#536173]"><strong className="text-[#071D3A]">Security/access note:</strong> Stanley Systems does not need your password. Access can be handled through screen share, exports, screenshots, or a temporary invited user when deeper review is needed.</p>
          <Link href="#cashflow-pricing" className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[#15803D] px-5 py-2.5 text-sm font-extrabold text-white hover:bg-[#116832]">See pricing options</Link>
        </div>
      </div>
    </section>
  )
}

function ListCard({ title, items, icon }: { title: string; items: string[]; icon: "check" | "x" }) {
  const Icon = icon === "check" ? CheckCircle2 : XCircle
  return (
    <article className="rounded-[1.75rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_18px_48px_rgba(7,29,58,0.06)]">
      <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-[#071D3A]">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#536173]"><Icon className={`mt-0.5 h-5 w-5 shrink-0 ${icon === "check" ? "text-[#15803D]" : "text-[#B42318]"}`} /> <span>{item}</span></li>
        ))}
      </ul>
    </article>
  )
}
