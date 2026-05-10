import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

const goodFit = ["Service business with repeatable jobs, invoices, estimates, calls, customers, or follow-up", "Uses accounting software plus a field, job, dispatch, CRM, or shop system", "Has an office manager, admin, bookkeeper, or owner handling office follow-up", "Has enough volume for delayed billing or missed follow-up to matter", "Wants fewer manual checks without replacing the whole software stack"]
const notFit = ["No real software system", "No meaningful invoice, estimate, call, customer, or review volume", "No repeatable office workflow", "Tiny owner-operator who treats admin time as free", "Business will not provide enough visibility to inspect the workflow"]
const includes = ["30-minute workflow walkthrough", "Transaction Pattern Review", "Online Follow-Up Review", "Systems and Handoff Review", "Money Leak Summary", "Workflow Map", "Leak Priority Score", "First Fix Recommendation", "System Recommendation", "Audit credit toward Cashflow Control System or Repeat Revenue System"]

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return <div className={`${page.card} p-5`}><h3 className={page.h3}>{title}</h3><ul className="mt-4 grid gap-2.5 text-sm font-semibold leading-6 text-[#536173]">{items.map(item => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" />{item}</li>)}</ul></div>
}

export function FitAccessPricing() {
  const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
  return (
    <section data-section="fit-access-pricing" data-nav-theme="light" className={page.section}>
      <div className={page.wrap}>
        <div className="max-w-3xl">
          <p className={page.eyebrow}>Fit and access</p>
          <h2 className={`${page.h2} mt-3`}>Start with the audit. Stay in control of your access.</h2>
        </div>
        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          <ListBlock title="Good fit" items={goodFit} />
          <ListBlock title="Not a fit" items={notFit} />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`${page.panel} p-5`}>
            <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">How access works</h3>
            <p className={`${page.body} mt-3 text-base leading-7`}>Stanley Systems does not need your password. After checkout, you choose the safest way to share what is needed.</p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-[#e1ebe4] bg-[#fbfcf7] p-4"><p className="font-extrabold text-[#071D3A]">Option 1: Walkthrough only</p><p className={page.body}>You share your screen during the audit call and Stanley Systems maps the workflow from what you show.</p></div>
              <div className="rounded-2xl border border-[#e1ebe4] bg-[#fbfcf7] p-4"><p className="font-extrabold text-[#071D3A]">Option 2: Exports or screenshots</p><p className={page.body}>You send reports, screenshots, or CSV exports from your accounting, field, CRM, review, or referral tools.</p></div>
              <div className="rounded-2xl border border-[#e1ebe4] bg-[#fbfcf7] p-4"><p className="font-extrabold text-[#071D3A]">Option 3: Temporary invited user</p><p className={page.body}>You invite Stanley Systems as a temporary user or manager with only the access needed for the audit.</p></div>
            </div>
            <p className="mt-4 rounded-2xl border border-[#cfe8d5] bg-[#f0fbf4] p-4 text-sm font-bold leading-6 text-[#116832]">After the audit, you can remove access, cancel pending invites, or change permissions. You stay in control. Stanley Systems only asks for the access needed to find the leak and explain the fix.</p>
          </div>
          <aside className="rounded-[2rem] border border-[#cfe8d5] bg-[#071D3A] p-5 text-white shadow-[0_20px_70px_rgba(7,29,58,0.16)]">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#86efac]">Workflow Audit</p>
            <div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-0.06em]">$97</span><span className="pb-2 text-sm font-bold text-slate-200">paid diagnostic</span></div>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-100">Find the money leaks hiding inside your office workflow.</p>
            <ul className="mt-5 grid gap-2 text-sm font-semibold leading-5 text-slate-100">
              {includes.map(item => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#86efac]" />{item}</li>)}
            </ul>
            <p className="mt-5 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm font-bold leading-6 text-white">Buy Cashflow Control System or Repeat Revenue System after the audit and your $97 audit fee credits toward the system. Buy yearly and get a $194 credit.</p>
            <CTALink href={auditHref} kind="checkout" location="workflow_audit_pricing" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the $97 Workflow Audit" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#22a34a] focus:outline-none focus:ring-4 focus:ring-[#86efac]/40">Start the $97 Workflow Audit <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
          </aside>
        </div>
        <p className="mt-5 text-center text-sm font-semibold leading-6 text-[#536173]">Prefer to buy a system directly? You can buy Cashflow Control System or Repeat Revenue System without the audit. The audit is for buyers who want the workflow reviewed first and want the audit fee credited toward the system.</p>
      </div>
    </section>
  )
}
