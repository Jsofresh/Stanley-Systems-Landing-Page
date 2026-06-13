import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { PackagePricingGrid, type PackagePricingCard } from "@/components/package-pricing-cards"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

const includes = [
  "45-60 minute owner or office-manager session",
  "Fix list, prompts, and staff AI plays",
  "Tool and workflow recommendations",
  "Top 3 workflow opportunities",
  "Staff AI training and company playbook gaps",
  "One-page AI Office Map",
  "$197 credited toward your AI Office Installation Sprint",
  "First workflow worth installing",
]

const cashflowDemo = {
  bestFor: "Jobs are getting done before the office gets the bill out.",
  leak: "Finished work sitting unpaid, late invoices, missing job details, and payment follow-up that depends on memory.",
  before: ["Customer calls", "Estimate is late", "Invoice is late", "Owner finds out late"],
  after: ["Customer is recorded", "Job moves forward", "Invoice goes out", "Payment gets followed up with"],
}

const repeatDemo = {
  bestFor: "Past customers are not being contacted again.",
  leak: "One-time customers, quiet follow-up, missed review asks, and repeat work going to someone else.",
  before: ["Customer buys once", "No reminder goes out", "No follow-up happens", "Competitor gets the next job"],
  after: ["Customer is recorded", "Follow-up is triggered", "Text or email goes out", "Repeat work gets booked"],
}

const bothDemo = {
  bestFor: "Money is leaking before and after the job.",
  leak: "Missed calls, delayed jobs, late invoices, and past customers nobody contacts again.",
  before: ["Calls get missed", "Jobs get delayed", "Invoices go out late", "Past customers disappear"],
  after: ["Customers are recorded", "Jobs move", "Billing happens faster", "Past customers get contacted again"],
}

const packageCards: PackagePricingCard[] = [
  {
    badge: "Monthly",
    name: "AI Office Installation Sprint",
    package: pricingPackageById.cashflow_control_monthly,
    description: "Turn the Map into practical billing readiness and job admin workflows.",
    ...cashflowDemo,
    install: "$199 installation",
    credit: "$197 Map credit",
    callout: null,
    cta: "Install billing readiness workflows",
    secondary: "Book the AI Office Map",
    tone: "monthly",
    bullets: ["Customer intake to billing path", "Billing-ready checks", "Missing detail routing", "Payment follow-up"],
  },
  {
    badge: "-$1,250",
    name: "AI Office Installation Sprint Yearly",
    package: pricingPackageById.cashflow_control_yearly,
    description: "Same billing-leak fix, lower first-year cost, and installation waived.",
    ...cashflowDemo,
    install: "Installation waived",
    credit: "$197 Map credit",
    callout: "-$1,250 first-year package savings",
    cta: "Install billing readiness workflows",
    secondary: "Book the AI Office Map",
    tone: "yearly",
    bullets: ["Everything in monthly", "Lower first-year cost", "Yearly billing", "Cash collection workflow"],
  },
  {
    badge: "Monthly",
    name: "AI Office Ops",
    package: pricingPackageById.repeat_revenue_monthly,
    description: "Bring past customers back without relying on memory or a spare afternoon.",
    ...repeatDemo,
    install: "$349 installation",
    credit: "$197 Map credit",
    callout: null,
    cta: "Bring past customers back",
    secondary: "Book the AI Office Map",
    tone: "monthly",
    bullets: ["Past customer reactivation", "Review and referral asks", "Missed-call recovery", "Main number stays unchanged"],
  },
  {
    badge: "-$2,120",
    name: "AI Office Ops Yearly",
    package: pricingPackageById.repeat_revenue_yearly,
    description: "Same past-customer follow-up system, lower first-year cost, and installation waived.",
    ...repeatDemo,
    install: "Installation waived",
    credit: "$197 Map credit",
    callout: "-$2,120 first-year package savings",
    cta: "Bring past customers back",
    secondary: "Book the AI Office Map",
    tone: "yearly",
    bullets: ["Everything in monthly", "Lower first-year cost", "Reviews and referrals", "Customer reactivation"],
  },
  {
    badge: "Most complete monthly",
    name: "AI Office Installation Sprint + Ops",
    package: pricingPackageById.both_systems_monthly,
    description: "Install billing readiness workflows and keep follow-up improving in one rollout.",
    ...bothDemo,
    install: "$449 installation",
    credit: "$197 Map credit",
    callout: "-$197/mo bundle savings",
    cta: "Install and improve workflows",
    secondary: "Book the AI Office Map",
    tone: "complete",
    bullets: ["AI Office Installation Sprint", "AI Office Ops", "Billing workflow", "Customer follow-up"],
  },
  {
    badge: "-$2,700 · Best value",
    name: "AI Office Installation Sprint + Ops Yearly",
    package: pricingPackageById.both_systems_yearly,
    description: "The full before-and-after-job fix with the best first-year price.",
    ...bothDemo,
    install: "Installation waived",
    credit: "$197 Map credit",
    callout: "-$2,700 first-year package savings",
    cta: "Install and improve workflows",
    secondary: "Book the AI Office Map",
    tone: "recommended",
    bullets: ["AI Office Installation Sprint", "AI Office Ops", "Lowest first-year bundle cost", "Best first-year price for both"],
  },
]

export function FitAccessPricing() {
  const assessment = pricingPackageById.workflow_audit
  const assessmentHref = assessment.stripePaymentLink.url

  return (
    <section id="packages" data-section="fit-access-pricing" data-nav-theme="light" className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className={page.wrap}>
        <div className="max-w-4xl">
          <h2 className={`${page.h2} mt-3`}>Book the AI Office Map. See what your team should install first.</h2>
          <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-[#536173]">Stanley Systems maps paperwork, billing, follow-up, handoffs, and job admin so the first workflow is tied to how your office actually works.</p>
        </div>

        <div data-section="cash-flow-assessment-access-offer" className="mt-5 grid gap-5 lg:grid-cols-[0.66fr_1.2fr] lg:items-center">
          <div className="mx-auto hidden w-full max-w-[360px] sm:block lg:max-w-[390px]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-how-access-works.jpg"
              alt="How access works for the AI Office Map: walkthrough, exports or screenshots, or a temporary invited user."
              width={957}
              height={1280}
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="h-auto max-h-[480px] w-full object-contain"
            />
          </div>

          <aside className="rounded-[1.75rem] border border-[#cfe8d5] bg-white p-5 text-[#071D3A] shadow-[0_16px_46px_rgba(7,29,58,0.08)]">
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">AI Office Map</h3>
            <div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-0.04em] text-[#071D3A]">$197</span><span className="pb-2 text-sm font-bold text-[#536173]">paid first step</span></div>
            <p className="mt-3 text-base font-semibold leading-7 text-[#334B60]">You leave with concrete fixes, staff AI prompts, workflow tips, tool guidance, quick wins, and the first AI-guided workflow worth installing.</p>
            <ul className="mt-5 grid gap-2 text-sm font-semibold leading-5 text-[#334B60] sm:grid-cols-2">
              {includes.map((item, index) => <li key={item} className={`flex gap-2 ${index > 3 ? "hidden sm:flex" : ""}`}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" />{item}</li>)}
            </ul>
            <div className="mt-5 rounded-2xl border border-[#efb7b0] bg-[#fff6f4] p-4 text-[#b91c1c]">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em]">Sprint credit</p>
              <p className="mt-1 text-2xl font-black tracking-[-0.035em]">$197 credited toward your AI Office Installation Sprint</p>
            </div>
            <CTALink href={assessmentHref} kind="checkout" location="workflow_audit_pricing" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="AI Office Map" billingPeriod="one_time" ctaLabel="Book the AI Office Map" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#116832] focus:outline-none focus:ring-4 focus:ring-[#bbf7d0]">Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
          </aside>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#d9e5dc] bg-white p-5 shadow-[0_18px_60px_rgba(7,29,58,0.06)]">
          <div className="text-center">
            <h3 className="text-3xl font-semibold tracking-[-0.045em] text-[#071D3A] sm:text-4xl">The Sprint comes after the Map.</h3>
            <p className="mx-auto mt-3 max-w-3xl text-base font-semibold leading-7 text-[#536173]">The Map is the default paid first step. It shows what is worth installing before the Sprint begins.</p>
          </div>
          <details className="mt-5 rounded-[1.4rem] border border-[#cfe8d5] bg-[#f8fcf9] md:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-left font-extrabold text-[#071D3A] [&::-webkit-details-marker]:hidden">
              Direct system options
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e7f6eb] text-xl text-[#116832]">+</span>
            </summary>
            <div className="border-t border-[#d9e5dc] px-3 pb-4">
              <PackagePricingGrid cards={packageCards} locationPrefix="workflow_audit_package_grid" analyticsSource="workflow_audit_page" showAuditSecondary auditHref={assessmentHref} gridClassName="md:grid-cols-2 xl:grid-cols-3" />
            </div>
          </details>
          <div className="hidden md:block">
            <PackagePricingGrid cards={packageCards} locationPrefix="workflow_audit_package_grid" analyticsSource="workflow_audit_page" showAuditSecondary auditHref={assessmentHref} gridClassName="md:grid-cols-2 xl:grid-cols-3" />
          </div>
        </div>

        <p className="mt-5 text-center text-sm font-semibold leading-6 text-[#536173]">If you have not bought the Map yet, start there. The Sprint uses the Map to choose the workflows worth installing.</p>
      </div>
    </section>
  )
}
