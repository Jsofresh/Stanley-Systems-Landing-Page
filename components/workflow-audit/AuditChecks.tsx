import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

const workflow = [
  ["Intake captured", "Request lands in one path"],
  ["Job record updated", "Details get cleaned up"],
  ["Billing rules checked", "Prices and scope line up"],
  ["Missing info routed", "The right person gets it"],
  ["Cash path moves forward", "Invoice and follow-up continue"],
]

const inputs = ["Forms and website leads", "Field or scheduling tools", "Accounting and payment systems", "CRM, dispatch, and job software", "Office rules and deadlines"]
const flagged = ["Missing notes or photos", "Pricing or scope mismatches", "Invoices waiting on a person", "Open balances needing follow-up"]

const lenses = [
  ["Workflow Walkthrough", "Call → estimate → job → invoice → payment → follow-up → review → referral.", "Finds memory steps, repeated checks, and owner backup work."],
  ["Transaction Pattern Review", "Jobs, invoices, estimates, payments, customers, balances, aging, and repeated records.", "Finds delayed billing, stale estimates, open balances, duplicate records, and cleanup work."],
  ["Online Follow-Up Review", "Google reviews, request process, referral tracking, source tracking, and missed follow-up.", "Finds where happy customers are not turning into reviews, referrals, repeat work, or stronger local trust."],
  ["Systems and Handoff Review", "Field, accounting, CRM, dispatch, shop, spreadsheets, inboxes, reminders, and notifications.", "Finds manual checking, retyping, missed tasks, and unclear ownership."],
]

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1rem] border border-[#e1ebe4] bg-[#fbfcf7] p-3.5">
      <h3 className="text-sm font-extrabold text-[#071D3A]">{title}</h3>
      <ul className="mt-2 grid gap-1.5 text-[13px] font-semibold leading-5 text-[#536173]">
        {items.map((item) => (
          <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#15803D]" aria-hidden="true" />{item}</li>
        ))}
      </ul>
    </div>
  )
}

export function AuditChecks() {
  const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
  return (
    <section id="audit-checks" data-section="what-audit-checks" data-nav-theme="light" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-6">
      <div className={page.wrap}>
        <div className="grid gap-4 lg:grid-cols-[0.72fr_1fr] lg:items-end">
          <div>
            <p className={page.eyebrow}>What gets checked</p>
            <h2 className="mt-2 max-w-2xl text-[2.05rem] font-semibold leading-[1.03] tracking-[-0.05em] text-[#071D3A] sm:text-[2.8rem] lg:text-[3.05rem]">What Stanley Systems checks during the audit</h2>
          </div>
          <p className="text-sm font-semibold leading-6 text-[#536173] lg:max-w-xl">
            The audit combines a workflow walkthrough with a data-backed review of where cash, customers, and office time are slipping. Stanley Systems can turn hundreds or thousands of rows of business data into a plain-English money leak map.
          </p>
        </div>

        <div className="mt-5 grid gap-4 rounded-[1.75rem] border border-[#d9e5dc] bg-white p-4 shadow-[0_18px_54px_rgba(7,29,58,0.06)] lg:grid-cols-[1.45fr_0.9fr] lg:p-5">
          <div>
            <h3 className="text-base font-semibold tracking-[-0.03em] text-[#071D3A]">Clean office workflow map</h3>
            <div className="mt-3 grid gap-2 lg:grid-cols-5 lg:gap-0">
              {workflow.map(([label, detail], index) => (
                <div key={label} className="relative rounded-[1rem] border border-[#dfe8e1] bg-[#fffdf8] p-3 lg:min-h-[124px] lg:rounded-none lg:border-l-0 lg:first:rounded-l-[1rem] lg:first:border-l lg:last:rounded-r-[1rem]">
                  {index < workflow.length - 1 && <div className="absolute right-[-10px] top-1/2 z-10 hidden h-px w-5 bg-[#8ac79b] lg:block" />}
                  <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#15803D] text-[11px] font-extrabold text-white">{index + 1}</div>
                  <p className="text-[13px] font-extrabold leading-5 text-[#071D3A]">{label}</p>
                  <p className="mt-1 text-[12px] font-semibold leading-4 text-[#536173]">{detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:content-start">
            <MiniList title="Inputs" items={inputs} />
            <MiniList title="Flagged" items={flagged} />
          </div>
        </div>

        <div className="mt-3 grid gap-2.5 lg:grid-cols-4">
          {lenses.map(([title, review, finds]) => (
            <article key={title} className="rounded-[1rem] border border-[#dfe8e1] bg-[#fffdf8] p-3.5">
              <h3 className="text-[15px] font-semibold tracking-[-0.03em] text-[#071D3A]">{title}</h3>
              <p className="mt-1.5 text-[12px] font-semibold leading-[1.35] text-[#536173]">{review}</p>
              <p className="mt-1.5 text-[12px] font-extrabold leading-[1.35] text-[#116832]">{finds}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <CTALink href={auditHref} kind="checkout" location="workflow_audit_checks" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the $97 Workflow Audit" target="_blank" rel="noopener noreferrer" className={page.greenButton}>
            Start the $97 Workflow Audit <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </CTALink>
        </div>
      </div>
    </section>
  )
}
