import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { sectionShell } from "./tokens"

const workflowSteps = [
  "Capture the customer request from the form, webhook, phone intake, CRM, or field system.",
  "Create or update the job record so technician notes, materials, photos, pricing, and approvals land where billing needs them.",
  "Check the job against your billing rules before the invoice or final bill goes out.",
  "Route missing information to the technician, office staff, manager, or customer contact who can actually fix it.",
  "Push the invoice, final bill, payment follow-up, and owner visibility forward without another manual handoff spreadsheet.",
]

const automationInputs = [
  "Customer intake forms and website leads",
  "Webhook events from scheduling or field tools",
  "Accounting, invoice, payment, or billing software",
  "CRM, dispatch, job, technician, or shop systems",
  "Office approval rules, exception paths, and billing deadlines",
]

const flags = [
  "Missing job notes, photos, line items, receipts, or approvals",
  "Pricing, scope, customer, or payment information that does not match the billing rule",
  "Invoices or final bills that should have moved but are still waiting on a person",
  "Open balances that need the right follow-up before they become owner cleanup work",
]

export function FitSetup() {
  return (
    <section className="bg-[#FBFCF7] py-14 sm:py-16">
      <div className={sectionShell}>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Automation layer</p>
          <h2 className="mt-3 text-[2.4rem] font-semibold leading-[1] tracking-[-0.04em] text-[#071D3A] sm:text-5xl">Stanley Systems adds the workflow your software still makes people carry.</h2>
          <p className="mt-4 text-base leading-7 text-[#536173] sm:text-lg">
            Cashflow Control plugs into the way your shop already moves work: customer to technician, technician to office, office to accounting, accounting to customer, and customer to final payment. The point is not another dashboard. The point is fewer manual handoffs between the systems you already use.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-[#BFE4C8] bg-white p-5 shadow-[0_18px_48px_rgba(7,29,58,0.06)] sm:p-7">
            <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-[#071D3A]">The workflow Stanley automates</h3>
            <ol className="mt-5 space-y-4">
              {workflowSteps.map((item, index) => (
                <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 text-sm font-semibold leading-6 text-[#536173]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#15803D] text-xs font-extrabold text-white">{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </article>

          <div className="grid gap-5">
            <ListCard title="Inputs it can connect" items={automationInputs} />
            <ListCard title="What gets flagged to people" items={flags} />
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_12px_30px_rgba(7,29,58,0.04)] sm:flex sm:items-center sm:justify-between sm:gap-5">
          <p className="text-sm font-semibold leading-6 text-[#536173]"><strong className="text-[#071D3A]">Setup note:</strong> Stanley Systems maps the current intake-to-final-bill path first, then builds the safest automation around your existing tools, permissions, and exception rules.</p>
          <Link href="#cashflow-pricing" className="mt-4 inline-flex min-h-11 shrink-0 items-center rounded-full bg-[#15803D] px-5 py-2.5 text-sm font-extrabold text-white hover:bg-[#116832] sm:mt-0">See pricing options <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  )
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-[1.75rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_18px_48px_rgba(7,29,58,0.06)]">
      <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-[#071D3A]">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#536173]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" /> <span>{item}</span></li>
        ))}
      </ul>
    </article>
  )
}
