import type { Metadata } from "next"

import { Footer } from "@/components/footer"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"
import {
  AlertPanel,
  DiagramPanel,
  DisplayHeadline,
  FeatureTile,
  FlowSequence,
  IconMedallion,
  MetricStrip,
  StanleyButton,
  SupportTile,
  SystemCTA,
  SystemPageSection,
  type StanleyIconName,
} from "@/components/stanley-system"

const monthlyPlan = pricingPackageById.repeat_revenue_monthly
const yearlyPlan = pricingPackageById.repeat_revenue_yearly
const workflowAudit = pricingPackageById.workflow_audit

export const metadata: Metadata = {
  title: "Repeat Revenue System | Stanley Systems",
  description:
    "Repeat Revenue System helps service businesses bring past customers back, collect better feedback, create referral opportunities, and catch the extra calls created by stronger reputation.",
  alternates: {
    canonical: "https://stanley-systems.com/systems/repeat-revenue",
  },
  openGraph: {
    title: "Repeat Revenue System | Stanley Systems",
    description:
      "A native repeat revenue system for service businesses that need past customers, reviews, referrals, and missed calls to become a visible growth loop.",
    url: "https://stanley-systems.com/systems/repeat-revenue",
    siteName: "Stanley Systems",
    type: "website",
  },
}

const heroSteps = [
  {
    id: "past-customer",
    icon: "user" as const,
    label: "Past Customer",
    description: "The customer record is already earned. The system keeps the next step visible.",
    mobileDescription: false,
  },
  {
    id: "review-proof",
    icon: "message-bubble" as const,
    label: "Review Proof",
    description: "Useful feedback and strong public proof get routed while the work is fresh.",
    mobileDescription: false,
  },
  {
    id: "referral-offer",
    icon: "referral-gift" as const,
    label: "Referral Offer",
    description: "Happy customers get a clear reason to send the next good customer your way.",
    mobileDescription: false,
  },
  {
    id: "new-call",
    icon: "phone-missed" as const,
    label: "New Call",
    description: "Extra reputation-driven demand gets caught instead of slipping into voicemail.",
    mobileDescription: false,
  },
  {
    id: "booked-work",
    icon: "check-circle" as const,
    label: "Booked Work",
    description: "The loop ends in a next job, then feeds the proof cycle again.",
    mobileDescription: false,
    tone: "emphasis" as const,
  },
]

const referralSteps = [
  {
    id: "happy-customer",
    icon: "users" as const,
    label: "Happy Customer",
    description: "A good job creates a high-trust moment.",
    mobileDescription: false,
  },
  {
    id: "referral-offer",
    icon: "gift" as const,
    label: "Referral Offer",
    description: "The customer gets a simple, trackable offer.",
    mobileDescription: false,
  },
  {
    id: "track-it",
    icon: "trend-up" as const,
    label: "We Track It",
    description: "Referral activity stays visible to the office.",
    mobileDescription: false,
  },
  {
    id: "new-work-booked",
    icon: "file-estimate" as const,
    label: "New Work Booked",
    description: "The opportunity becomes real booked work.",
    mobileDescription: false,
    tone: "emphasis" as const,
  },
]

const callCatcherSteps = [
  {
    id: "missed-call",
    icon: "phone-missed" as const,
    label: "Missed Call Captured",
    description: "A missed call becomes a follow-up item, not a dead lead.",
    mobileDescription: false,
  },
  {
    id: "voicemail",
    icon: "message-bubble" as const,
    label: "Voicemail Transcribed",
    description: "The office sees what the caller needed.",
    mobileDescription: false,
  },
  {
    id: "office-alerted",
    icon: "message-bubble" as const,
    label: "Office Alerted",
    description: "The right person gets the next action quickly.",
    mobileDescription: false,
  },
  {
    id: "auto-reply",
    icon: "check-circle" as const,
    label: "Auto-Reply Sent",
    description: "The caller knows the business saw the inquiry.",
    mobileDescription: false,
    tone: "emphasis" as const,
  },
]

const reviewSteps = [
  {
    id: "job-complete",
    icon: "check-circle" as const,
    label: "Job Complete",
    description: "The review path starts when the work is still fresh.",
    mobileDescription: false,
  },
  {
    id: "feedback-request",
    icon: "message-bubble" as const,
    label: "Feedback Request Sent",
    description: "Customers get a clear, timely request.",
    mobileDescription: false,
  },
  {
    id: "customer-feedback",
    icon: "user" as const,
    label: "Customer Shares Feedback",
    description: "The response shows whether to amplify or recover.",
    mobileDescription: false,
  },
  {
    id: "review-published",
    icon: "shield-check" as const,
    label: "Review Published",
    description: "Strong public proof goes live.",
    mobileDescription: false,
    tone: "emphasis" as const,
  },
  {
    id: "recovery-when-needed",
    icon: "message-bubble" as const,
    label: "Recovery When Needed",
    description: "Low-score feedback routes to a manager before it turns into public damage.",
    mobileDescription: false,
    tone: "emphasis" as const,
  },
]

const reengagementSteps = [
  {
    id: "dormant-records",
    icon: "users" as const,
    label: "Dormant Customer Records",
    description: "Past customers and old estimates get surfaced from the existing list.",
    mobileDescription: false,
  },
  {
    id: "messages",
    icon: "message-bubble" as const,
    label: "Re-Engagement Messages",
    description: "The system sends timely, practical follow-up instead of random blasts.",
    mobileDescription: false,
  },
  {
    id: "booked-work",
    icon: "file-estimate" as const,
    label: "Re-Booked Work",
    description: "The business gets more value from customers it already earned.",
    mobileDescription: false,
    tone: "emphasis" as const,
  },
]

const supportTiles = [
  ["message-bubble", "Dedicated local-area-code text line", "A clean outbound path for Repeat Revenue."],
  ["phone-missed", "Main business number stays unchanged", "Follow-up gets stronger without changing your primary number."],
  ["shield-check", "A2P 10DLC setup", "Registration details handled in the support layer."],
  ["shield-check", "STOP and UNSUBSCRIBE handling", "Opt-outs stay managed without extra office work."],
  ["message-bubble", "Message throttling", "Outreach stays paced instead of blasting customers."],
  ["file-estimate", "Weekly activity digest", "Owners see the pattern without checking every thread."],
  ["dollar-circle", "Configurable referral amounts", "Referral offers match the economics of the business."],
  ["message-bubble", "Configurable timing and message copy", "Follow-up can fit how customers actually buy."],
  ["users", "Manager routing for low-score feedback", "Bad experiences route to the right person for recovery."],
  ["message-bubble", "Voicemail transcription", "Missed calls become readable follow-up context."],
  ["phone-missed", "Missed-call auto-reply", "Callers get a response while the office is busy."],
  ["message-bubble", "Office alerts", "The team sees the next action."],
] as const

const benefitTiles = [
  ["users", "Works from your existing records.", "The system starts with customers the business already earned."],
  ["message-bubble", "Timed follow-up brings old customers back.", "Useful outreach happens before competitors win the next job."],
  ["trend-up", "More value from customers you already earned.", "Repeat Revenue turns buried records into visible opportunity."],
  ["check-circle", "Booked work without starting from zero.", "The next job comes from a warmer path than cold lead buying."],
] as const

type RepeatRevenueStep = {
  id?: string
  icon: StanleyIconName
  label: string
  description?: string
  tone?: 'default' | 'emphasis' | 'quiet'
}

function MobileFlowRows({ steps, summary }: { steps: readonly RepeatRevenueStep[]; summary?: string }) {
  return (
    <div className="grid gap-2 md:hidden" data-repeat-revenue-mobile-flow="compact-readable-rows">
      {steps.map((step, index) => (
        <div
          key={step.id ?? `${index}-${step.label}`}
          className="flex min-w-0 items-center gap-3 rounded-2xl border border-[rgba(21,128,61,0.16)] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(7,20,34,0.06)]"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#eaf6e6] text-sm font-extrabold leading-none text-[#116832]">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[1.04rem] font-bold leading-[1.22] tracking-[-0.02em] text-[#071421]">{step.label}</p>
            {step.description ? <p className="sr-only">{step.description}</p> : null}
          </div>
        </div>
      ))}
      {summary ? (
        <p className="mt-2 rounded-2xl border border-[rgba(21,128,61,0.14)] bg-[#f4fbf5] px-4 py-3 text-[1.02rem] font-semibold leading-7 text-[#2f3f52]">
          {summary}
        </p>
      ) : null}
    </div>
  )
}

function RepeatRevenueFlow({
  steps,
  connectorLabel,
  summary,
  showStepNumbers,
}: {
  steps: readonly RepeatRevenueStep[]
  connectorLabel: string
  summary?: string
  showStepNumbers?: boolean
}) {
  return (
    <>
      <FlowSequence className="hidden md:block" steps={steps} connectorLabel={connectorLabel} showStepNumbers={showStepNumbers} />
      <MobileFlowRows steps={steps} summary={summary} />
    </>
  )
}

function HeroVisualPanel() {
  return (
    <DiagramPanel
      icon="users"
      title="Insights & automation keep the cycle going."
      subtitle="More happy customers. More proof. More referrals. More booked work."
      tone="mint"
      className="lg:min-h-[35rem]"
    >
      <RepeatRevenueFlow steps={heroSteps} connectorLabel="creates the next step" summary="A simple loop: past customers create proof, referrals, caught calls, and booked work." />
      <MetricStrip
        className="mt-7"
        columns={2}
        items={[
          {
            value: "+37%",
            label: "more booked work",
            description: "Proof target from the written reference, shown as a business outcome cue rather than a guarantee.",
            icon: "trend-up",
          },
          {
            value: "Stronger pipeline",
            label: "Stronger reputation",
            description: "Reviews, referrals, and caught calls feed the next booked job.",
            icon: "shield-check",
          },
        ]}
      />
    </DiagramPanel>
  )
}

export default function RepeatRevenuePage() {
  return (
    <>
      <GlassmorphismNav />
      <main className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#102033]">
        <section className="relative isolate overflow-hidden px-6 pb-18 pt-32 md:pb-24 lg:px-8 lg:pt-36">
          <span aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 -z-10 size-80 rounded-full bg-[rgba(21,128,61,0.08)] blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-14 -z-10 size-96 rounded-full bg-[rgba(21,128,61,0.06)] blur-3xl" />
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(500px,1.05fr)] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#cfe8d5] bg-white px-4 py-2 text-sm font-bold text-[#116832] shadow-[0_10px_24px_rgba(7,20,34,0.05)]">
                <IconMedallion icon="users" size="sm" />
                Repeat Revenue System
              </div>
              <DisplayHeadline
                as="h1"
                align="left"
                size="page"
                before="Make your best customers your best"
                highlight="lead generation."
                className="max-w-5xl"
              />
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#455467] sm:text-xl">
                Stanley Systems helps service businesses bring past customers back, collect more useful feedback, turn happy customers into stronger public proof, create referral opportunities, and catch the extra calls that come from a stronger reputation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <StanleyButton href={monthlyPlan.stripePaymentLink.url} size="xl" aria-label="Start Repeat Revenue System checkout">
                  Start Repeat Revenue
                </StanleyButton>
                <StanleyButton href={workflowAudit.stripePaymentLink.url} variant="secondary" size="xl" aria-label="Book a Workflow Audit for Repeat Revenue System">
                  Book a Workflow Audit
                </StanleyButton>
              </div>
              <div className="mt-5 max-w-xl rounded-2xl border border-[rgba(21,128,61,0.16)] bg-white px-4 py-3 shadow-[0_12px_28px_rgba(7,20,34,0.06)]">
                <p className="text-[1.05rem] font-bold leading-7 text-[#455467] md:text-base">
                  Repeat Revenue starts at <span className="text-[#102033]">{monthlyPlan.priceDisplay}</span>.
                </p>
                <p className="mt-1 text-[0.98rem] font-semibold leading-7 text-[#455467] md:text-sm md:leading-6">
                  Yearly option: {yearlyPlan.priceDisplay} with installation waived.
                </p>
              </div>
            </div>
            <HeroVisualPanel />
          </div>
        </section>

        <SystemPageSection
          id="how-repeat-revenue-works"
          tone="white"
          title="Five-star moments turn into"
          accent="referral opportunities."
          description="The page is not about abstract reputation management. It is about turning the work your team already did well into the next visible opportunity."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <DiagramPanel
              icon="referral-gift"
              title="Five-star moments turn into referral opportunities."
              subtitle="Happy customers should not disappear after the invoice. The system creates the referral path while trust is high."
              tone="mint"
            >
              <RepeatRevenueFlow steps={referralSteps} connectorLabel="opens" summary="The happy-customer moment becomes a tracked referral path." />
            </DiagramPanel>
            <DiagramPanel
              icon="phone-missed"
              title="More demand only matters if the phone gets caught."
              subtitle="A stronger reputation creates more inbound attention. Missed-call recovery keeps that attention from going cold."
            >
              <RepeatRevenueFlow steps={callCatcherSteps} connectorLabel="routes" summary="Missed calls become readable context and quick office follow-up." />
            </DiagramPanel>
          </div>
        </SystemPageSection>

        <SystemPageSection
          tone="white"
          title="More strong reviews. Faster recovery"
          accent="when something goes wrong."
          description="Repeat Revenue System routes public-proof moments and recovery moments inside the same feedback loop."
          className="py-14 md:py-24"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
            <DiagramPanel
              icon="shield-check"
              title="Review Booster & Recovery Loop"
              subtitle="Customer feedback branches into public proof or manager recovery before the moment goes cold."
              tone="mint"
              footer={
                <p className="text-base font-bold leading-7 text-[#116832]">
                  No reviews are hidden.
                </p>
              }
            >
              <RepeatRevenueFlow steps={reviewSteps} connectorLabel="routes" summary="Feedback becomes public proof or manager recovery before it goes cold." />
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <FeatureTile
                  icon="shield-check"
                  title="Public Reviews That Build Trust"
                  description="Strong experiences become public proof for the next customer."
                  density="compact"
                />
                <FeatureTile
                  icon="message-bubble"
                  title="Review and recovery cues stay visible"
                  description="The team can see whether feedback became public proof or a recovery task."
                  density="compact"
                />
              </div>
            </DiagramPanel>
            <div className="grid gap-4">
              <AlertPanel
                icon="message-bubble"
                title="Low-Score Feedback Alert"
                description="A poor experience routes to manager attention instead of disappearing."
                tone="attention"
              />
              <AlertPanel
                icon="shield-check"
                title="Recovery When Needed"
                description="The right person gets context to respond before a small issue becomes a reputation problem."
                tone="recovery"
              />
            </div>
          </div>
        </SystemPageSection>

        <SystemPageSection
          tone="white"
          title="Past customers get followed up with before"
          accent="competitors win them."
          description="Dormant customer value is not a cold outbound campaign. It is existing trust that needs a clean, timed next step."
          className="py-14 md:py-24"
        >
          <DiagramPanel
            icon="users"
            title="Past Customer Re-Engagement"
            subtitle="Records, messages, and booked work stay connected in one visible path."
            tone="mint"
          >
            <RepeatRevenueFlow steps={reengagementSteps} showStepNumbers={false} connectorLabel="becomes" summary="Old records become timely messages and re-booked work." />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefitTiles.map(([icon, title, description]) => (
                <FeatureTile
                  key={title}
                  icon={icon}
                  title={title}
                  description={description}
                  density="compact"
                  medallion={false}
                />
              ))}
            </div>
          </DiagramPanel>
        </SystemPageSection>

        <SystemPageSection
          tone="mint"
          title="The support layer"
          accent="is included."
          description="We handle the details that keep Repeat Revenue running without turning your office into a campaign desk."
          className="py-12 md:py-24"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {supportTiles.map(([icon, title, description]) => (
              <SupportTile
                key={title}
                icon={icon}
                title={title}
                description={description}
                descriptionClassName="hidden md:block"
                className="p-5 md:p-6"
              />
            ))}
          </div>

          <SystemCTA
            className="mt-10"
            icon="trend-up"
            title="Turn happy customers into a predictable source of repeat revenue."
            description="The next step is a Workflow Audit: map the customer records, review path, referral opportunities, missed-call handoff, and support layer before build scope starts."
            primaryAction={{ label: "Start Repeat Revenue", href: monthlyPlan.stripePaymentLink.url, ariaLabel: "Start Repeat Revenue System checkout" }}
            secondaryAction={{ label: "Book a Workflow Audit", href: workflowAudit.stripePaymentLink.url, ariaLabel: "Book a Workflow Audit checkout" }}
          >
            <div className="rounded-2xl border border-[rgba(21,128,61,0.16)] bg-white/80 px-4 py-3 shadow-[0_10px_24px_rgba(7,20,34,0.05)]">
              <p className="text-[1.05rem] font-bold leading-7 text-[#455467]">
                Package price: <span className="font-extrabold text-[#102033]">{monthlyPlan.priceDisplay}</span>.
              </p>
              <p className="mt-1 text-[0.98rem] font-semibold leading-7 text-[#455467]">
                Yearly option: {yearlyPlan.priceDisplay} with installation waived.
              </p>
            </div>
          </SystemCTA>
        </SystemPageSection>
      </main>
      <div className="[&_footer_h3]:text-sm [&_footer_h3]:leading-5 [&_footer_ul]:text-base [&_footer_ul]:leading-7">
        <Footer />
      </div>
    </>
  )
}
