import type { ReactNode } from "react"
import { ArrowRight, CheckCircle2, ClipboardList, Clock3, FileText, PhoneCall, Repeat2, Search, ShieldCheck, WalletCards } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { pricingPackages } from "@/lib/pricing/source-of-truth"

const calculatorHref = "/invoicing-delay-cash-flow-calculator"
const assessmentHref = "/workflow-audit"

const buttonBase = "inline-flex min-h-[52px] items-center justify-center rounded-full px-6 text-base font-extrabold transition focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2"
const greenButton = `${buttonBase} bg-[#15803D] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_42px_rgba(10,85,38,0.24)] hover:-translate-y-0.5 hover:bg-[#116f35] focus:ring-offset-[#071422]`
const lightButton = `${buttonBase} border border-[#d5e5da] bg-white text-[#071D3A] shadow-[0_14px_34px_rgba(7,29,58,0.08)] hover:-translate-y-0.5 hover:border-[#9ed9b2] hover:bg-[#f4fbf6] focus:ring-offset-white`
const darkGhostButton = `${buttonBase} border border-white/18 bg-white/8 text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-white/12 focus:ring-offset-[#071422]`

const leakCards = [
  {
    title: "Missed calls",
    copy: "Good customers call while the team is busy. Nobody calls back fast enough. The job goes somewhere else.",
    icon: PhoneCall,
  },
  {
    title: "Late invoices",
    copy: "The work is done, but the bill waits on notes, photos, parts, or office time. Cash sits still.",
    icon: FileText,
  },
  {
    title: "Forgotten follow-ups",
    copy: "Estimates go quiet. Reviews do not get asked for. Referrals never get chased.",
    icon: Clock3,
  },
  {
    title: "Past customers nobody contacts again",
    copy: "A customer buys once, then disappears from the office list. The next job goes to whoever follows up first.",
    icon: Repeat2,
  },
]

const packageDemos = [
  {
    name: "Cashflow Control System",
    priceId: "cashflow_control_monthly",
    leak: "Customer intake, job movement, billing delay, and payment follow-up.",
    before: ["Customer calls", "Staff writes it down somewhere", "Estimate is late", "Invoice is late", "Owner finds out after money was missed"],
    after: ["Customer is recorded", "Job moves forward", "Staff gets notified", "Invoice goes out", "Payment gets followed up with"],
    route: "/systems/cashflow-control",
  },
  {
    name: "Repeat Revenue System",
    priceId: "repeat_revenue_monthly",
    leak: "Past customers are not contacted again.",
    before: ["Customer buys once", "No reminder goes out", "No follow-up happens", "Competitor gets the next job"],
    after: ["Customer is recorded", "Follow-up is triggered", "Text or email goes out", "Repeat work gets booked"],
    route: "/systems/repeat-revenue",
  },
  {
    name: "Both Systems",
    priceId: "both_systems_monthly",
    leak: "Money is getting dropped before and after the job.",
    before: ["Calls get missed", "Jobs get delayed", "Invoices go out late", "Past customers disappear"],
    after: ["Customers are recorded", "Jobs move", "Billing happens faster", "Past customers get contacted again"],
    route: assessmentHref,
  },
]

function getPrice(id: string) {
  return pricingPackages.find((item) => item.id === id)
}

function PageSection({ id, children, className = "", navTheme = "light" }: { id?: string; children: ReactNode; className?: string; navTheme?: "light" | "dark" }) {
  return (
    <section id={id} data-nav-theme={navTheme} className={`px-5 py-11 md:px-8 md:py-16 lg:px-10 ${className}`}>
      {children}
    </section>
  )
}

function HeroLeakVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.07] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.24)] backdrop-blur md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(83,217,134,0.2),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]" />
      <div className="relative space-y-4">
        <div className="rounded-[1.3rem] border border-white/14 bg-[#071422]/76 p-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-extrabold text-white/72">Example money left on the table</p>
            <span className="rounded-full bg-[#ef4444]/18 px-3 py-1 text-xs font-extrabold text-[#fecaca]">leak estimate</span>
          </div>
          <p className="mt-3 text-[3.2rem] font-extrabold leading-none tracking-[-0.025em] text-white md:text-[4.4rem]">$180K</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Missed call", "Late invoice", "Old customer"].map((label) => (
            <div key={label} className="rounded-2xl border border-white/12 bg-white/[0.06] p-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444] shadow-[0_0_16px_rgba(239,68,68,0.5)]" />
                <p className="text-sm font-extrabold text-white">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CalculatorSpine() {
  return (
    <PageSection id="calculator" className="relative isolate overflow-hidden bg-[#FBFCF7] text-[#071D3A] lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(8,166,75,0.14),rgba(251,252,247,0)_65%)]" />
      <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <h2 className="max-w-[680px] text-balance text-[clamp(2.4rem,5vw,5.4rem)] font-extrabold leading-[0.93] tracking-[-0.025em] text-[#071D3A]">
            See how much money is being left on the table.
          </h2>
          <p className="mt-5 max-w-[610px] text-lg font-semibold leading-8 text-[#334B60]">
            Answer a few plain questions about jobs, invoices, follow-up, and missed calls. The calculator gives you a number Stanley can use to decide what to fix first.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CTALink href={calculatorHref} kind="calculator" location="home_calculator_spine_primary" analyticsEvent="calculator_cta_clicked" ctaLabel="Start the calculator" className={greenButton}>
              Start the calculator <ArrowRight className="ml-2 h-4 w-4" />
            </CTALink>
            <CTALink href={assessmentHref} kind="systems" location="home_calculator_spine_secondary" ctaLabel="Start the Cash Flow Assessment" className={lightButton}>
              Start the Cash Flow Assessment
            </CTALink>
          </div>
          <p className="mt-4 text-sm font-semibold text-[#607588]">No perfect numbers needed. Use your best guess.</p>
        </div>
        <div className="rounded-[2.2rem] border border-[#d7e7dc] bg-white p-4 shadow-[0_28px_80px_rgba(7,29,58,0.1)] md:p-6">
          <div className="rounded-[1.6rem] bg-[#071422] p-5 text-white md:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-extrabold text-[#b9f7cf]">Annual money left on the table</p>
                <p className="mt-2 text-[clamp(3.2rem,8vw,7rem)] font-extrabold leading-none tracking-[-0.025em]">$60K to $300K</p>
                <p className="mt-3 text-base font-semibold text-white/66">Monthly range, exact math, and leak category stay secondary.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {["Late invoices", "Unbilled jobs", "Missed calls", "Past customers"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-sm font-extrabold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {["Use real job volume", "Round annual leak first", "Move to assessment next"].map((item) => (
              <div key={item} className="rounded-2xl border border-[#e0ece4] bg-[#fbfefa] p-4 text-sm font-extrabold text-[#071D3A]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  )
}

function LeakTypesSection() {
  return (
    <PageSection className="bg-white text-[#071D3A]">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <h2 className="max-w-[760px] text-balance text-[clamp(2.1rem,4.7vw,4.9rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">
            The leaks are usually boring. That is why they get missed.
          </h2>
          <p className="max-w-[620px] text-lg font-semibold leading-8 text-[#536173]">
            Most service businesses do not lose money in one dramatic way. They lose it in small handoffs that break every week.
          </p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {leakCards.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.title} className="rounded-[1.5rem] border border-[#dce8df] bg-[#fbfefa] p-5 shadow-[0_18px_46px_rgba(7,29,58,0.055)]">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf7ee] text-[#15803D]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.02em] text-[#071D3A]">{card.title}</h3>
                <p className="mt-3 text-[15px] font-semibold leading-7 text-[#536173]">{card.copy}</p>
              </article>
            )
          })}
        </div>
      </div>
    </PageSection>
  )
}

function AssessmentSection() {
  const assessment = getPrice("workflow_audit")
  return (
    <PageSection id="assessment" className="bg-[#071422] text-white" navTheme="dark">
      <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div>
          <h2 className="max-w-[760px] text-balance text-[clamp(2.2rem,5vw,5.4rem)] font-extrabold leading-[0.94] tracking-[-0.025em]">
            Start with the Cash Flow Assessment.
          </h2>
          <p className="mt-5 max-w-[650px] text-lg font-semibold leading-8 text-white/72">
            The Cash Flow Assessment is the paid first step. Stanley looks at where money is being dropped, what it likely costs, and which system should be built first.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTALink href={assessmentHref} kind="checkout" location="home_assessment_primary" analyticsEvent="audit_checkout_clicked" analyticsSource="homepage" packageId="workflow_audit" packageName="Cash Flow Assessment" billingPeriod="one_time" ctaLabel="Start the Cash Flow Assessment" className={greenButton}>
              Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" />
            </CTALink>
            <CTALink href={calculatorHref} kind="calculator" location="home_assessment_secondary" analyticsEvent="calculator_cta_clicked" ctaLabel="Calculate the leak" className={darkGhostButton}>
              Calculate the leak
            </CTALink>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/14 bg-white/[0.07] p-6 shadow-[0_24px_74px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-lg font-extrabold">Paid first step</p>
              <p className="mt-1 text-sm font-semibold text-white/58">{assessment?.priceDisplay ?? "$97"} one time</p>
            </div>
            <WalletCards className="h-8 w-8 text-[#86efac]" />
          </div>
          <div className="mt-5 space-y-4">
            {[
              [Search, "Find where money is being dropped"],
              [ClipboardList, "Show what it likely costs"],
              [ShieldCheck, "Decide what system should stop it first"],
            ].map(([Icon, label]) => {
              const I = Icon as typeof Search
              return (
                <div key={label as string} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#53d986]/12 text-[#86efac]"><I className="h-5 w-5" /></div>
                  <p className="text-base font-extrabold text-white">{label as string}</p>
                </div>
              )
            })}
          </div>
          <p className="mt-5 rounded-2xl border border-[#53d986]/20 bg-[#53d986]/10 p-4 text-sm font-bold leading-6 text-[#d8ffe5]">
            If there is no clear fix, do not build the wrong thing.
          </p>
        </div>
      </div>
    </PageSection>
  )
}

function PackageDemosSection() {
  return (
    <PageSection id="systems" className="bg-[#f4f7f4] text-[#071D3A]">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <h2 className="max-w-[760px] text-balance text-[clamp(2.1rem,4.8vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">
            Pick the system that stops the leak.
          </h2>
          <p className="max-w-[650px] text-lg font-semibold leading-8 text-[#536173]">
            Each system fixes a different place money gets dropped. Start with the assessment if you are not sure which one matters most.
          </p>
        </div>
        <div className="mt-9 grid gap-5 xl:grid-cols-3">
          {packageDemos.map((demo) => {
            const price = getPrice(demo.priceId)
            return (
              <article key={demo.name} className="flex h-full flex-col rounded-[1.8rem] border border-[#d9e7df] bg-white p-5 shadow-[0_20px_60px_rgba(7,29,58,0.07)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{demo.name}</h3>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#536173]">{demo.leak}</p>
                  </div>
                  <p className="shrink-0 rounded-full bg-[#eaf7ee] px-3 py-1 text-sm font-extrabold text-[#15803D]">{price?.priceDisplay}</p>
                </div>
                <p className="mt-4 rounded-2xl border border-[#d9e7df] bg-[#f8fcf9] p-3 text-sm font-extrabold leading-6 text-[#244938] md:hidden">
                  {demo.after[0]} → {demo.after[demo.after.length - 1]}
                </p>
                <div className="mt-5 hidden flex-1 gap-4 md:grid md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  <div className="rounded-2xl border border-[#f2d4d4] bg-[#fff7f7] p-4">
                    <p className="text-sm font-extrabold text-[#991b1b]">Before</p>
                    <ul className="mt-3 space-y-2">
                      {demo.before.map((item) => <li key={item} className="text-sm font-semibold leading-6 text-[#5f3740]">{item}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#cae8d2] bg-[#f3fbf5] p-4">
                    <p className="text-sm font-extrabold text-[#15803D]">After</p>
                    <ul className="mt-3 space-y-2">
                      {demo.after.map((item) => <li key={item} className="flex gap-2 text-sm font-semibold leading-6 text-[#244938]"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" />{item}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row xl:flex-col 2xl:flex-row">
                  <CTALink href={assessmentHref} kind="systems" location={`home_package_${demo.priceId}_assessment`} ctaLabel="Start the Cash Flow Assessment" className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#15803D] px-4 text-sm font-extrabold text-white transition hover:bg-[#116f35]">
                    Start with assessment
                  </CTALink>
                  <CTALink href={demo.route} kind="systems" location={`home_package_${demo.priceId}_learn`} analyticsEvent="package_learn_more_clicked" ctaLabel={`See ${demo.name}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-[#d5e5da] bg-white px-4 text-sm font-extrabold text-[#071D3A] transition hover:bg-[#f4fbf6]">
                    See the system
                  </CTALink>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </PageSection>
  )
}

function BeforeAfterProofSection() {
  return (
    <PageSection className="bg-white text-[#071D3A]">
      <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <h2 className="text-balance text-[clamp(2.1rem,4.8vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">
            What changes after the leak is fixed.
          </h2>
          <p className="mt-5 max-w-[620px] text-lg font-semibold leading-8 text-[#536173]">
            Stanley does not add another idea for the owner to remember. It builds the steps that keep customers, jobs, bills, and follow-ups from getting dropped.
          </p>
        </div>
        <p className="rounded-[1.4rem] border border-[#cae8d2] bg-[#f3fbf5] p-4 text-base font-extrabold leading-6 text-[#244938] md:hidden">
          Customer recorded → invoice sent → payment followed up → customer brought back.
        </p>
        <div className="hidden gap-4 md:grid md:grid-cols-2">
          <div className="rounded-[1.7rem] border border-[#f2d4d4] bg-[#fff7f7] p-5">
            <p className="text-lg font-extrabold text-[#991b1b]">Before</p>
            <div className="mt-4 space-y-3">
              {["Missed call", "Late estimate", "Job sits unbilled", "Past customer forgotten"].map((item) => <div key={item} className="rounded-2xl bg-white px-4 py-3 text-base font-extrabold text-[#5f3740] shadow-sm">{item}</div>)}
            </div>
          </div>
          <div className="rounded-[1.7rem] border border-[#cae8d2] bg-[#f3fbf5] p-5">
            <p className="text-lg font-extrabold text-[#15803D]">After</p>
            <div className="mt-4 space-y-3">
              {["Customer recorded", "Staff notified", "Invoice sent", "Payment followed up with", "Customer brought back"].map((item) => <div key={item} className="rounded-2xl bg-white px-4 py-3 text-base font-extrabold text-[#244938] shadow-sm">{item}</div>)}
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  )
}

function TrustSection() {
  return (
    <PageSection className="bg-[#fbfcf7] text-[#071D3A]">
      <div className="mx-auto max-w-[72rem] rounded-[2rem] border border-[#d9e7df] bg-white p-6 shadow-[0_22px_70px_rgba(7,29,58,0.07)] md:p-9">
        <h2 className="text-balance text-[clamp(2rem,4vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.025em]">Built for service businesses with real office drag.</h2>
        <p className="mt-5 text-lg font-semibold leading-8 text-[#536173]">
          Stanley Systems is for shops where the work is real, the office is busy, and the owner keeps becoming the backup system. The goal is simple: catch the dropped work, get bills out faster, and bring more customers back.
        </p>
      </div>
    </PageSection>
  )
}

function FinalCashFlowCTA() {
  return (
    <PageSection className="bg-[#071422] text-white" navTheme="dark">
      <div className="mx-auto max-w-[82rem] text-center">
        <h2 className="mx-auto max-w-[900px] text-balance text-[clamp(2.4rem,6vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.025em]">
          Stop letting finished work and good customers slip away.
        </h2>
        <p className="mx-auto mt-6 max-w-[720px] text-lg font-semibold leading-8 text-white/70">
          Use the calculator, see the money left on the table, then start the Cash Flow Assessment. Stanley will find the leak and show what should be fixed first.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <CTALink href={assessmentHref} kind="systems" location="home_final_primary" ctaLabel="Start the Cash Flow Assessment" className={greenButton}>
            Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </CTALink>
          <CTALink href={calculatorHref} kind="calculator" location="home_final_secondary" analyticsEvent="calculator_cta_clicked" ctaLabel="Calculate the leak" className={darkGhostButton}>
            Calculate the leak
          </CTALink>
        </div>
      </div>
    </PageSection>
  )
}

export function CashFlowHomepage() {
  return (
    <>
      <section data-audit-page="/" data-audit-section="home.hero" data-nav-theme="dark" className="relative isolate overflow-hidden bg-[#071422] px-5 pb-16 pt-[132px] text-white md:px-8 lg:px-10 lg:pb-20 lg:pt-[150px]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_28%,rgba(83,217,134,0.16),transparent_30%),radial-gradient(circle_at_8%_12%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#071422_0%,#05101c_100%)]" />
        <div className="mx-auto grid max-w-[92rem] gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div>
            <h1 className="max-w-[850px] text-balance text-[clamp(3.05rem,7.4vw,7.7rem)] font-extrabold leading-[0.88] tracking-[-0.025em] text-white">
              Your service business is dropping money in places nobody checks.
            </h1>
            <p className="mt-7 max-w-[690px] text-pretty text-lg font-semibold leading-8 text-[#d3dce7] sm:text-xl">
              Missed calls. Late invoices. Forgotten follow-ups. Past customers nobody contacts again. Stanley Systems finds the leak and builds the system that stops it.
            </p>
            <p className="mt-5 max-w-[620px] text-base font-semibold leading-7 text-white/58">
              If the work is getting done but the cash is not moving fast enough, the leak is probably in the office handoff.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTALink href="#calculator" kind="calculator" location="home_hero_primary" analyticsEvent="calculator_cta_clicked" ctaLabel="Calculate the money left on the table" className={greenButton}>
                Calculate the money left on the table <ArrowRight className="ml-2 h-4 w-4" />
              </CTALink>
              <CTALink href={assessmentHref} kind="systems" location="home_hero_secondary" ctaLabel="Start the Cash Flow Assessment" className={darkGhostButton}>
                Start the Cash Flow Assessment
              </CTALink>
            </div>
          </div>
          <HeroLeakVisual />
        </div>
      </section>
      <CalculatorSpine />
      <LeakTypesSection />
      <AssessmentSection />
      <PackageDemosSection />
      <BeforeAfterProofSection />
      <TrustSection />
      <FinalCashFlowCTA />
    </>
  )
}
