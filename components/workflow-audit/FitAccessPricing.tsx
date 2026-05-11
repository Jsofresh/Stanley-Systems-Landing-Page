import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { PackagePricingGrid, type PackagePricingCard } from "@/components/package-pricing-cards"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import { page } from "./tokens"

const includes = [
  "30-minute cash-flow walkthrough",
  "Missed call and follow-up review",
  "Invoice and payment handoff review",
  "Past customer follow-up review",
  "Money Leak Summary",
  "Leak Priority Score",
  "First Fix Recommendation",
  "System Recommendation",
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
    name: "Cashflow Control System",
    package: pricingPackageById.cashflow_control_monthly,
    description: "Fix the intake-to-payment leak without paying for the year upfront.",
    ...cashflowDemo,
    install: "$199 installation",
    credit: "Assessment credit: -$97",
    callout: null,
    cta: "Fix the billing leak",
    secondary: "Start with the assessment",
    tone: "monthly",
    bullets: ["Customer intake to billing workflow", "Billing-ready checks", "Missing detail routing", "Payment follow-up"],
  },
  {
    badge: "-$1,250",
    name: "Cashflow Control System Yearly",
    package: pricingPackageById.cashflow_control_yearly,
    description: "Same billing-leak fix, lower first-year cost, and installation waived.",
    ...cashflowDemo,
    install: "Installation waived",
    credit: "Assessment credit: -$194",
    callout: "-$1,250 first-year package savings",
    cta: "Fix the billing leak",
    secondary: "Start with the assessment",
    tone: "yearly",
    bullets: ["Everything in monthly", "Lower first-year cost", "Yearly billing", "Cash collection workflow"],
  },
  {
    badge: "Monthly",
    name: "Repeat Revenue System",
    package: pricingPackageById.repeat_revenue_monthly,
    description: "Bring past customers back without relying on memory or a spare afternoon.",
    ...repeatDemo,
    install: "$349 installation",
    credit: "Assessment credit: -$97",
    callout: null,
    cta: "Bring past customers back",
    secondary: "Start with the assessment",
    tone: "monthly",
    bullets: ["Past customer reactivation", "Review and referral asks", "Missed-call recovery", "Main number stays unchanged"],
  },
  {
    badge: "-$2,120",
    name: "Repeat Revenue System Yearly",
    package: pricingPackageById.repeat_revenue_yearly,
    description: "Same past-customer follow-up system, lower first-year cost, and installation waived.",
    ...repeatDemo,
    install: "Installation waived",
    credit: "Assessment credit: -$194",
    callout: "-$2,120 first-year package savings",
    cta: "Bring past customers back",
    secondary: "Start with the assessment",
    tone: "yearly",
    bullets: ["Everything in monthly", "Lower first-year cost", "Reviews and referrals", "Customer reactivation"],
  },
  {
    badge: "Most complete monthly",
    name: "Both Systems",
    package: pricingPackageById.both_systems_monthly,
    description: "Fix the billing leak and the repeat-customer leak in one rollout.",
    ...bothDemo,
    install: "$449 installation",
    credit: "Assessment credit: -$97",
    callout: "-$197/mo bundle savings",
    cta: "Fix both leaks",
    secondary: "Start with the assessment",
    tone: "complete",
    bullets: ["Cashflow Control System", "Repeat Revenue System", "Billing workflow", "Customer follow-up"],
  },
  {
    badge: "-$2,700 · Best value",
    name: "Both Systems Yearly",
    package: pricingPackageById.both_systems_yearly,
    description: "The full before-and-after-job fix with the best first-year price.",
    ...bothDemo,
    install: "Installation waived",
    credit: "Assessment credit: -$194",
    callout: "-$2,700 first-year package savings",
    cta: "Fix both leaks",
    secondary: "Start with the assessment",
    tone: "recommended",
    bullets: ["Cashflow Control System", "Repeat Revenue System", "Lowest first-year bundle cost", "Best full-system economics"],
  },
]

export function FitAccessPricing() {
  const assessment = pricingPackageById.workflow_audit
  const assessmentHref = assessment.stripePaymentLink.url

  return (
    <section id="packages" data-section="fit-access-pricing" data-nav-theme="light" className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className={page.wrap}>
        <div className="max-w-4xl">
          <h2 className={`${page.h2} mt-3`}>Start with the Cash Flow Assessment. Build the system that stops the leak.</h2>
          <p className="mt-3 max-w-3xl text-base font-semibold leading-7 text-[#536173]">If you already know the leak, buy the system directly. If you are not sure, the assessment finds where money is being dropped and points to the first build.</p>
        </div>

        <div data-section="cash-flow-assessment-access-offer" className="mt-5 grid gap-5 lg:grid-cols-[0.66fr_1.2fr] lg:items-center">
          <div className="mx-auto w-full max-w-[360px] lg:max-w-[390px]">
            <Image
              src="/images/uploaded/money-leak-map/money-leak-map-how-access-works.jpg"
              alt="How access works for the Cash Flow Assessment: walkthrough, exports or screenshots, or a temporary invited user."
              width={957}
              height={1280}
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="h-auto max-h-[480px] w-full object-contain"
            />
          </div>

          <aside className="rounded-[1.75rem] border border-[#cfe8d5] bg-white p-5 text-[#071D3A] shadow-[0_16px_46px_rgba(7,29,58,0.08)]">
            <h3 className="text-3xl font-semibold tracking-[-0.04em] text-[#071D3A]">Cash Flow Assessment</h3>
            <div className="mt-3 flex items-end gap-2"><span className="text-5xl font-semibold tracking-[-0.04em] text-[#071D3A]">$97</span><span className="pb-2 text-sm font-bold text-[#536173]">paid first step</span></div>
            <p className="mt-3 text-base font-semibold leading-7 text-[#334B60]">Stanley Systems finds where money is being dropped, what it likely costs, and which system should be built first.</p>
            <ul className="mt-5 grid gap-2 text-sm font-semibold leading-5 text-[#334B60] sm:grid-cols-2">
              {includes.map(item => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" />{item}</li>)}
            </ul>
            <div className="mt-5 rounded-2xl border border-[#efb7b0] bg-[#fff6f4] p-4 text-[#b91c1c]">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em]">Assessment credit after purchase</p>
              <p className="mt-1 text-2xl font-black tracking-[-0.035em]">-$97 monthly / -$194 yearly</p>
            </div>
            <CTALink href={assessmentHref} kind="checkout" location="workflow_audit_pricing" analyticsEvent="audit_checkout_clicked" analyticsSource="workflow_audit_page" packageId="workflow_audit" packageName="Cash Flow Assessment" billingPeriod="one_time" ctaLabel="Start the Cash Flow Assessment" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#116832] focus:outline-none focus:ring-4 focus:ring-[#bbf7d0]">Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
          </aside>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#d9e5dc] bg-white p-5 shadow-[0_18px_60px_rgba(7,29,58,0.06)]">
          <div className="text-center">
            <h3 className="text-3xl font-semibold tracking-[-0.045em] text-[#071D3A] sm:text-4xl">Pick the system that stops the leak.</h3>
            <p className="mx-auto mt-3 max-w-3xl text-base font-semibold leading-7 text-[#536173]">Each package shows the dropped handoff before Stanley and the working handoff after Stanley. Prices and checkout links come from the current source of truth.</p>
          </div>
          <PackagePricingGrid cards={packageCards} locationPrefix="workflow_audit_package_grid" analyticsSource="workflow_audit_page" showAuditSecondary auditHref={assessmentHref} gridClassName="md:grid-cols-2 xl:grid-cols-3" />
        </div>

        <p className="mt-5 text-center text-sm font-semibold leading-6 text-[#536173]">Prefer to buy a system directly? You can buy Cashflow Control System, Repeat Revenue System, or Both Systems when the leak is already clear. Start with the Cash Flow Assessment if you are not sure which system should go first.</p>
      </div>
    </section>
  )
}
