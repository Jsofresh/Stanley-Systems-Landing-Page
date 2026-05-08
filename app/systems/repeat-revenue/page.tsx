import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, CircleDollarSign, PhoneCall, Star, UsersRound } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { Footer } from "@/components/footer"
import { SiteHeader } from "@/components/hero-section"
import { pricingPackageById, type PricingPackage } from "@/lib/pricing/source-of-truth"

const workflowAudit = pricingPackageById.workflow_audit
const repeatMonthly = pricingPackageById.repeat_revenue_monthly
const repeatYearly = pricingPackageById.repeat_revenue_yearly
const bothMonthly = pricingPackageById.both_systems_monthly
const bothYearly = pricingPackageById.both_systems_yearly

export const metadata: Metadata = {
  title: "Repeat Revenue System | Stanley Systems",
  description:
    "Repeat Revenue System turns old customer records, missed calls, happy customers, and completed jobs into the next revenue path.",
  alternates: {
    canonical: "https://stanley-systems.com/systems/repeat-revenue",
  },
  openGraph: {
    title: "Repeat Revenue System | Stanley Systems",
    description:
      "Get more money from the customers you already earned with a practical repeat revenue system for service businesses.",
    url: "https://stanley-systems.com/systems/repeat-revenue",
    siteName: "Stanley Systems",
    type: "website",
  },
}

type CheckoutLinkProps = {
  pricingPackage: PricingPackage
  label: string
  location: string
  className?: string
  children?: React.ReactNode
}

const proofChips = [
  "Past customers reactivated",
  "Reviews and referrals asked while the job is fresh",
  "Missed calls captured before they go cold",
]

const leakCards = [
  {
    title: "Past customers go quiet",
    body: "Old customers, seasonal buyers, and dormant records are not getting a real reason to come back.",
    selected: true,
  },
  {
    title: "Happy customers are not asked",
    body: "Good jobs end without a private rating, Google review ask, or referral path.",
    selected: true,
  },
  {
    title: "Referrals depend on memory",
    body: "Your best customers would refer people, but nobody asks while the job is still fresh.",
    selected: false,
  },
  {
    title: "Missed calls turn cold",
    body: "After-hours calls, no-answer calls, and voicemails do not get a clean next step.",
    selected: true,
  },
]

const flywheelSteps = [
  "Job complete",
  "Private 1 to 5 rating",
  "Happy customers get review path",
  "Best customers get referral ask",
  "Past customers get reactivated",
  "Missed calls get captured",
]

const faqItems = [
  {
    question: "Will this change my main business number?",
    answer:
      "No. Your main business number stays unchanged. Stanley Systems adds the follow-up path around your existing setup.",
  },
  {
    question: "Does this guarantee more customers, reviews, or rankings?",
    answer:
      "No. Repeat Revenue System creates the follow-up path. It does not promise customer behavior, review volume, search rankings, platform approvals, or guaranteed new customers.",
  },
  {
    question: "Do I need the Workflow Audit first?",
    answer:
      "No. You can buy a system directly. The audit is the safer first step if you are not sure whether Repeat Revenue, Cashflow Control, or both should come first.",
  },
  {
    question: "How does the audit credit work?",
    answer:
      "The Workflow Audit costs $97. Buy a monthly package and get $97 off. Buy a yearly package and get $194 off.",
  },
  {
    question: "Why buy yearly?",
    answer: "Yearly saves 20%, waives installation, and doubles the audit credit to $194.",
  },
  {
    question: "When should I buy both systems?",
    answer:
      "Buy both when your shop has follow-up leaks and cashflow leaks. That means old customers, reviews, referrals, missed calls, slow invoices, open balances, or office chasing.",
  },
]

const scopeItems = [
  "No promised new customers, review volume, search rankings, or platform approvals.",
  "No replacement of your booking, CRM, accounting, or review platform.",
  "No call center or sales team replacement.",
  "No public phone-provider or backend tool promises.",
  "Custom campaigns, unusual integrations, extra locations, or deep data cleanup are scoped separately.",
]

const packageCards = [
  {
    badge: "Best first buy",
    title: "Repeat Revenue Monthly",
    pricingPackage: repeatMonthly,
    install: "$349 installation",
    audit: "Workflow Audit buyers get $97 off",
    bestFor: "Shops where the main leak is past customers, reviews, referrals, and missed calls.",
    bullets: [
      "Smart Re-Engagement",
      "Review Booster",
      "Referral Engine",
      "Missed-call recovery",
      "Main business number stays unchanged",
    ],
    cta: "Buy Repeat Revenue Monthly",
    secondary: "Use audit credit first",
    accent: "standard",
  },
  {
    badge: "Most popular",
    title: "Repeat Revenue Yearly",
    pricingPackage: repeatYearly,
    install: "Installation waived",
    audit: "Workflow Audit buyers get $194 off",
    savings: "Save $2,120 first year versus monthly after audit credit",
    bestFor: "Shops that already know repeat revenue is the leak and want the lowest first-year cost.",
    bullets: ["Everything in Repeat Revenue Monthly", "20% yearly savings", "Installation removed", "Double audit credit"],
    cta: "Buy Repeat Revenue Yearly",
    secondary: "Start with audit first",
    accent: "popular",
  },
  {
    badge: "Most complete monthly",
    title: "Repeat Revenue + Cashflow Control Monthly",
    pricingPackage: bothMonthly,
    install: "$449 installation",
    audit: "Workflow Audit buyers get $97 off",
    bestFor: "Shops losing money before the next job and after the finished job.",
    mainCopy:
      "Repeat Revenue brings customers back. Cashflow Control helps finished work turn into collected cash faster.",
    bullets: [
      "Everything in Repeat Revenue",
      "Adds Cashflow Control for invoice, payment, and office money leaks",
      "Completed job intake watch",
      "A/R follow-up and escalation",
      "Weekly money leak digest",
    ],
    cta: "Buy Both Systems Monthly",
    secondary: "Use audit credit first",
    accent: "standard",
  },
  {
    badge: "Best value",
    title: "Repeat Revenue + Cashflow Control Yearly",
    pricingPackage: bothYearly,
    install: "Installation waived",
    audit: "Workflow Audit buyers get $194 off",
    savings: "Save $2,700 first year versus monthly after audit credit",
    bestFor: "Shops that want repeat revenue and faster cash movement handled together.",
    bullets: [
      "Everything in Repeat Revenue",
      "Everything in Cashflow Control",
      "20% yearly savings",
      "Installation removed",
      "Double audit credit",
    ],
    cta: "Buy Both Systems Yearly",
    secondary: "Start with Workflow Audit",
    accent: "best",
  },
]

function CheckoutLink({ pricingPackage, label, location, className, children }: CheckoutLinkProps) {
  return (
    <CTALink
      href={pricingPackage.stripePaymentLink.url}
      kind="checkout"
      location={location}
      analyticsEvent="package_checkout_clicked"
      analyticsSource="repeat_revenue_page"
      packageId={pricingPackage.analyticsPackageId}
      packageName={pricingPackage.publicName}
      billingPeriod={pricingPackage.billingPeriod}
      ctaLabel={label}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children ?? label}
    </CTALink>
  )
}

function AuditLink({ label, location, className }: { label: string; location: string; className?: string }) {
  return (
    <CTALink
      href={workflowAudit.stripePaymentLink.url}
      kind="checkout"
      location={location}
      analyticsEvent="audit_checkout_clicked"
      analyticsSource="repeat_revenue_page"
      packageId="workflow_audit"
      packageName="Workflow Audit"
      billingPeriod="one_time"
      ctaLabel={label}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </CTALink>
  )
}

function SectionShell({
  id,
  children,
  className = "",
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} data-section={id} className={`px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

function RevenuePathPreview() {
  const nodes = [
    ["Old customer records", "Dormant buyers"],
    ["Missed calls", "After-hours inquiries"],
    ["Happy customers", "Review + referral path"],
    ["Completed jobs", "Fresh trust"],
  ]

  return (
    <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-[0_34px_90px_rgba(0,0,0,0.3)] backdrop-blur sm:p-5">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#39B66A]/20 blur-3xl" />
      <div className="rounded-[1.5rem] border border-white/12 bg-[#0C1C2C] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9FE0B2]">Revenue path preview</p>
            <p className="mt-1 text-lg font-semibold text-white">Customer list wake-up</p>
          </div>
          <div className="rounded-full bg-[#DDF9E5] px-3 py-1 text-xs font-black text-[#116832]">Live paths</div>
        </div>

        <div className="mt-5 grid gap-3">
          {nodes.map(([title, body], index) => (
            <div key={title} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-[#071421]">{index + 1}</span>
              <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-xs font-semibold text-white/58">{body}</p>
              </div>
              <div className="h-2 w-14 rounded-full bg-[#39B66A] shadow-[0_0_22px_rgba(57,182,106,0.75)]" />
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 rounded-[1.35rem] border border-[#39B66A]/35 bg-[#39B66A]/10 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9FE0B2]">Next revenue path</p>
            <p className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white">Completed job → trust → review → referral → next job</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-right">
            <p className="text-xs font-bold text-[#536173]">Opportunity worth waking up</p>
            <p className="text-2xl font-semibold tracking-[-0.05em] text-[#116832]">Repeat work</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#071421] px-4 pb-18 pt-32 text-white sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(57,182,106,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.86fr)] lg:items-center">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm font-bold text-[#DDF9E5]">
            <span className="h-2 w-2 rounded-full bg-[#39B66A]" />
            Stanley Systems · Repeat Revenue System
          </div>
          <h1 className="max-w-5xl text-[3.2rem] font-semibold leading-[0.92] tracking-[-0.065em] sm:text-[5rem] lg:text-[6rem]">
            Get more money from the customers you already earned.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
            Repeat Revenue System turns old customer records, missed calls, happy customers, and completed jobs into the next revenue path.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {proofChips.map((chip) => (
              <div key={chip} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2 text-sm font-bold text-white/82">
                <CheckCircle2 className="h-4 w-4 text-[#72D98F]" aria-hidden="true" />
                {chip}
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CheckoutLink
              pricingPackage={repeatMonthly}
              label="Buy Repeat Revenue"
              location="repeat_revenue_hero_buy"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#39B66A] px-7 py-3 text-sm font-black text-[#06120B] shadow-[0_18px_40px_rgba(57,182,106,0.24)] transition hover:bg-[#72D98F]"
            >
              Buy Repeat Revenue <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CheckoutLink>
            <AuditLink
              label="Start with $97 Workflow Audit"
              location="repeat_revenue_hero_audit"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white px-7 py-3 text-sm font-black text-[#071421] transition hover:bg-[#DDF9E5]"
            />
          </div>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/58">
            Your audit acts like a deposit: $97 off monthly or $194 off yearly. Yearly saves 20% and waives installation.
          </p>
        </div>

        <RevenuePathPreview />
      </div>
    </section>
  )
}

function SelfSelectionSection() {
  return (
    <SectionShell id="leak-selector" className="bg-[#F4F6EF]">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#116832]">Interactive diagnosis</p>
          <h2 className="mt-4 text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.055em] text-[#071421] sm:text-6xl">
            Which leak sounds most like your shop?
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#536173]">
            Pick the ones that happen now. Stanley Systems will show the right path below.
          </p>
          <div className="mt-7 rounded-[1.5rem] border border-[#BFE4C8] bg-[#EAF8EF] p-5">
            <p className="text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#071421]">
              Old customers. Missed calls. Unasked reviews.
              <br />
              <span className="text-[#116832]">That is repeat revenue sitting still.</span>
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#DCE8D9] bg-white p-4 shadow-[0_24px_70px_rgba(16,32,51,0.08)] sm:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            {leakCards.map((card, index) => (
              <article
                key={card.title}
                className={`rounded-[1.35rem] border p-4 transition ${
                  card.selected ? "border-[#39B66A] bg-[#EAF8EF] shadow-[0_14px_34px_rgba(57,182,106,0.13)]" : "border-[#E3E9EA] bg-[#FAFBF8]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071421] text-xs font-black text-white">{index + 1}</span>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full ${card.selected ? "bg-[#15803D] text-white" : "bg-[#EEF2ED] text-[#738072]"}`}>
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.025em] text-[#071421]">{card.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">{card.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 rounded-[1.5rem] border border-[#102033] bg-[#071421] p-5 text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9FE0B2]">Recommended path: Repeat Revenue System</p>
            <p className="mt-3 text-base font-semibold leading-7 text-white/82">
              This is the right first system when the main leak is old customers, reviews, referrals, and missed inquiries.
            </p>
            <Link href="#plans" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#39B66A] px-5 py-3 text-sm font-black text-[#06120B]">
              See Repeat Revenue plans <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-4 rounded-[1.35rem] border border-[#DCE8D9] bg-[#FAFBF8] p-4">
            <p className="text-sm font-black text-[#071421]">Also losing money after jobs are done?</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {['Invoices go out late', 'Open balances need chasing'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-[#BFE4C8] bg-[#EAF8EF] p-3 text-sm font-bold text-[#102033]">
                  <CheckCircle2 className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">
              Selecting either can recommend <span className="font-black text-[#116832]">Repeat Revenue + Cashflow Control</span>. Repeat Revenue brings customers back. Cashflow Control helps finished work turn into collected cash faster.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function MoneyMathSection() {
  return (
    <SectionShell id="money-math" className="bg-[#071421] text-white">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#9FE0B2]">Example scenario</p>
          <h2 className="mt-4 text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.055em] sm:text-5xl">
            The leak is not theoretical. It is sitting in normal office work.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "500 past customers",
              "5% ready to book again",
              "$1,200 average job",
              "4 missed or after-hours inquiries a week",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-base font-bold text-white/86">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#39B66A]/35 bg-[#EAF8EF] p-6 text-[#071421] shadow-[0_34px_90px_rgba(0,0,0,0.24)] sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#116832]">Opportunity worth checking</p>
          <p className="mt-6 text-[4.5rem] font-semibold leading-[0.86] tracking-[-0.08em] sm:text-[6.5rem]">
            $30,000
          </p>
          <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[#116832]">from past customers alone</p>
          <p className="mt-5 rounded-[1.25rem] border border-[#BFE4C8] bg-white p-4 text-lg font-semibold leading-7 text-[#102033]">
            Plus whatever is hiding in missed calls, reviews, and referrals.
          </p>
          <p className="mt-5 text-sm font-semibold leading-6 text-[#536173]">
            The Workflow Audit replaces example math with your real customer, call, review, and follow-up data.
          </p>
          <AuditLink
            label="Start with $97 Workflow Audit"
            location="repeat_revenue_math_audit"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#071421] px-6 py-3 text-sm font-black text-white transition hover:bg-[#102033]"
          />
        </div>
      </div>
    </SectionShell>
  )
}

function FlywheelSection() {
  return (
    <SectionShell id="flywheel" className="bg-[#F7F7F4]">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.055em] text-[#071421] sm:text-6xl">Every good job should feed the next one.</h2>
        <p className="mt-5 text-lg leading-8 text-[#536173]">
          Repeat Revenue System turns one customer moment into the next revenue opportunity.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-center">
        <div className="relative rounded-[2.25rem] border border-[#DCE8D9] bg-[#071421] p-5 text-white shadow-[0_30px_90px_rgba(16,32,51,0.16)] sm:p-8">
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <div className="relative mx-auto grid aspect-square max-w-[620px] place-items-center rounded-full border border-white/10 bg-white/[0.04]">
            <div className="grid h-[34%] w-[34%] place-items-center rounded-full border border-[#39B66A]/60 bg-[#DDF9E5] text-center text-2xl font-semibold tracking-[-0.05em] text-[#071421] shadow-[0_0_55px_rgba(57,182,106,0.28)]">
              Next<br />job
            </div>
            {flywheelSteps.map((step, index) => {
              const positions = [
                "left-1/2 top-2 -translate-x-1/2",
                "right-3 top-[24%]",
                "right-6 bottom-[24%]",
                "left-1/2 bottom-2 -translate-x-1/2",
                "left-4 bottom-[24%]",
                "left-3 top-[24%]",
              ]
              const active = step === "Past customers get reactivated"
              return (
                <div
                  key={step}
                  className={`absolute ${positions[index]} w-[34%] rounded-2xl border p-3 text-center text-xs font-black leading-4 shadow-[0_14px_34px_rgba(0,0,0,0.16)] sm:text-sm ${
                    active ? "border-[#39B66A] bg-[#DDF9E5] text-[#071421]" : "border-white/10 bg-white/[0.08] text-white/78"
                  }`}
                >
                  {step}
                </div>
              )
            })}
          </div>
          <p className="relative mt-6 text-center text-sm font-semibold leading-6 text-white/70">
            One job creates trust. Trust creates reviews. Reviews create referrals. Referrals and repeat customers create the next job.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[#BFE4C8] bg-white p-6 shadow-[0_24px_70px_rgba(16,32,51,0.1)] sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#116832]">Selected step</p>
          <h3 className="mt-4 text-4xl font-semibold leading-none tracking-[-0.055em] text-[#071421]">Past customers get reactivated</h3>
          <p className="mt-5 text-lg font-semibold leading-8 text-[#536173]">
            Old customers, seasonal buyers, and dormant records get a real follow-up path instead of sitting untouched.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {['Smart Re-Engagement', 'Review Booster', 'Referral Engine', 'Call Catcher'].map((module) => (
              <div key={module} className="rounded-2xl border border-[#DCE8D9] bg-[#F7F9F5] p-4 text-sm font-black text-[#102033]">
                {module}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function PricingCard({ card, index }: { card: (typeof packageCards)[number]; index: number }) {
  const isBest = card.accent === "best"
  const isPopular = card.accent === "popular"
  return (
    <article
      className={`relative flex min-h-full flex-col rounded-[1.75rem] border p-5 shadow-[0_24px_70px_rgba(16,32,51,0.08)] ${
        isBest
          ? "border-[#39B66A] bg-[#EAF8EF] ring-2 ring-[#39B66A]/20"
          : isPopular
            ? "border-[#BFE4C8] bg-white"
            : "border-[#DCE8D9] bg-white"
      }`}
    >
      {isBest ? (
        <div className="absolute -top-4 left-6 rounded-full bg-[#071421] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#9FE0B2]">
          20% off + installation waived
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.12em] ${isBest || isPopular ? "bg-[#15803D] text-white" : "bg-[#EDF2EA] text-[#116832]"}`}>{card.badge}</span>
        <span className="text-sm font-black text-[#A0AAA0]">0{index + 1}</span>
      </div>
      <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.045em] text-[#071421]">{card.title}</h3>
      <p className="mt-4 text-[3rem] font-semibold leading-none tracking-[-0.07em] text-[#071421]">{card.pricingPackage.priceDisplay}</p>
      <div className="mt-5 grid gap-2 text-sm font-bold leading-5 text-[#536173]">
        <p>{card.install}</p>
        <p>{card.audit}</p>
        {card.savings ? <p className="rounded-2xl bg-[#071421] px-3 py-2 text-white">{card.savings}</p> : null}
      </div>
      <p className="mt-5 text-sm font-semibold leading-6 text-[#536173]">{card.bestFor}</p>
      {card.mainCopy ? <p className="mt-3 rounded-2xl border border-[#BFE4C8] bg-white/70 p-3 text-sm font-bold leading-6 text-[#102033]">{card.mainCopy}</p> : null}
      <ul className="mt-5 grid gap-2">
        {card.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm font-semibold leading-5 text-[#26374B]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <CheckoutLink
          pricingPackage={card.pricingPackage}
          label={card.cta}
          location={`repeat_revenue_pricing_${card.pricingPackage.id}`}
          className={`inline-flex min-h-12 w-full items-center justify-center rounded-full px-4 py-3 text-sm font-black transition ${
            isBest ? "bg-[#071421] text-white hover:bg-[#102033]" : "bg-[#15803D] text-white hover:bg-[#116832]"
          }`}
        />
        <AuditLink
          label={card.secondary}
          location={`repeat_revenue_pricing_audit_${card.pricingPackage.id}`}
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-[#DCE8D9] bg-white px-4 py-3 text-sm font-black text-[#116832] transition hover:border-[#15803D]"
        />
      </div>
    </article>
  )
}

function PricingSection() {
  return (
    <SectionShell id="plans" className="bg-[#F4F6EF]">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#116832]">Plans</p>
          <h2 className="mt-4 text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.055em] text-[#071421] sm:text-6xl">Choose the repeat revenue path.</h2>
        </div>
        <p className="text-lg font-semibold leading-8 text-[#536173]">
          Start monthly, save yearly, or add Cashflow Control when the shop is leaking money after the job too.
        </p>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-4">
        {packageCards.map((card, index) => (
          <PricingCard key={card.title} card={card} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}

function WorkflowAuditSection() {
  return (
    <SectionShell id="workflow-audit" className="bg-[#071421] text-white">
      <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.06] p-5 shadow-[0_34px_90px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#9FE0B2]">Safety path</p>
            <h2 className="mt-4 text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl">Not sure which system should come first?</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">
              Start with the $97 Workflow Audit. Stanley Systems checks where money is slipping through your follow-up, calls, invoices, estimates, customer records, and office handoffs.
            </p>
            <p className="mt-5 max-w-3xl rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4 text-base font-semibold leading-7 text-white/82">
              Buy monthly after the audit and get $97 off. Buy yearly and get $194 off.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <AuditLink
                label="Buy the Workflow Audit"
                location="repeat_revenue_audit_section_buy"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#39B66A] px-6 py-3 text-sm font-black text-[#06120B] transition hover:bg-[#72D98F]"
              />
              <Link href="#faq" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white px-6 py-3 text-sm font-black text-[#071421] transition hover:bg-[#DDF9E5]">
                See what the audit checks
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-[#39B66A]/45 bg-[#DDF9E5] p-6 text-[#071421]">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#116832]">Deposit framing</p>
              <p className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.05em]">Your audit acts like a deposit toward the system you choose.</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/12 bg-white p-6 text-[#071421]">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#116832]">Guarantee</p>
              <p className="mt-3 text-lg font-semibold leading-7">
                If Stanley Systems cannot find one clear money leak we can fix, you get your audit fee back and a free Repeat Revenue System.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function DemoProofSection() {
  return (
    <SectionShell id="demo-proof" className="bg-[#F7F7F4]">
      <div className="grid gap-8 rounded-[2rem] border border-[#DCE8D9] bg-white p-5 shadow-[0_24px_70px_rgba(16,32,51,0.08)] sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#116832]">Demo proof</p>
          <h2 className="mt-4 text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.055em] text-[#071421] sm:text-5xl">See the system before you buy.</h2>
          <p className="mt-5 text-lg leading-8 text-[#536173]">
            Watch a working Stanley Systems demo showing how completed jobs, customer follow-up, reviews, and office money leaks can be surfaced inside the tools a shop already uses.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {['Housecall Pro demo environment', 'QuickBooks Online workflow proof', 'Review and re-engagement path'].map((chip) => (
              <span key={chip} className="rounded-full border border-[#BFE4C8] bg-[#EAF8EF] px-4 py-2 text-sm font-black text-[#116832]">{chip}</span>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#071421] px-6 py-3 text-sm font-black text-white transition hover:bg-[#102033]">
              Watch demo proof
            </Link>
            <Link href="/workflow-audit" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#DCE8D9] bg-white px-6 py-3 text-sm font-black text-[#116832] transition hover:border-[#15803D]">
              See how Stanley Systems works with your tools
            </Link>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#DCE8D9] bg-[#071421] p-4 text-white shadow-[0_24px_70px_rgba(16,32,51,0.16)]">
          <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9FE0B2]">Working demo proof</p>
                <p className="mt-1 text-lg font-semibold">Completed job follow-up view</p>
              </div>
              <div className="rounded-full bg-[#39B66A] px-3 py-1 text-xs font-black text-[#06120B]">Demo</div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                [UsersRound, "Completed jobs", "24 waiting"],
                [Star, "Review path", "16 ready"],
                [PhoneCall, "Missed calls", "7 captured"],
              ].map(([Icon, label, value]) => {
                const DisplayIcon = Icon as typeof UsersRound
                return (
                  <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                    <DisplayIcon className="h-5 w-5 text-[#9FE0B2]" aria-hidden="true" />
                    <p className="mt-3 text-xs font-bold text-white/55">{label as string}</p>
                    <p className="mt-1 text-xl font-semibold tracking-[-0.04em]">{value as string}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-3 rounded-2xl border border-[#39B66A]/30 bg-[#39B66A]/10 p-4">
              <p className="text-sm font-semibold text-white/82">Office money leak surfaced: old customer follow-up, review ask, and A/R handoff need one owner this week.</p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

function FAQSection() {
  return (
    <SectionShell id="faq" className="bg-[#071421] text-white">
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#9FE0B2]">FAQ</p>
          <h2 className="mt-4 text-[2.5rem] font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl">Plain answers before you buy.</h2>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <AuditLink
              label="Start with the Workflow Audit"
              location="repeat_revenue_faq_audit"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#39B66A] px-6 py-3 text-sm font-black text-[#06120B] transition hover:bg-[#72D98F]"
            />
            <CheckoutLink
              pricingPackage={repeatMonthly}
              label="Buy Repeat Revenue"
              location="repeat_revenue_faq_buy"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white px-6 py-3 text-sm font-black text-[#071421] transition hover:bg-[#DDF9E5]"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((faq) => (
              <article key={faq.question} className="rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-5">
                <h3 className="text-lg font-semibold leading-6 tracking-[-0.025em] text-white">{faq.question}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/66">{faq.answer}</p>
              </article>
            ))}
          </div>
          <div className="rounded-[1.75rem] border border-[#39B66A]/35 bg-[#DDF9E5] p-6 text-[#071421]">
            <h3 className="text-3xl font-semibold tracking-[-0.05em]">Plain scope</h3>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {scopeItems.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-bold leading-6 text-[#26374B]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

export default function RepeatRevenuePage() {
  return (
    <>
      <SiteHeader />
      <main data-nav-theme="dark" className="min-h-screen overflow-hidden bg-[#F7F7F4] text-[#071421]">
        <HeroSection />
        <SelfSelectionSection />
        <MoneyMathSection />
        <FlywheelSection />
        <PricingSection />
        <WorkflowAuditSection />
        <DemoProofSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
