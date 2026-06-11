import Link from "next/link"
import { SystemsThatMakeMoneySection } from "@/components/home/SystemsThatMakeMoneySection"
import {
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileText,
  HelpCircle,
  Layers3,
  PhoneCall,
  RefreshCcw,
  Repeat2,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react"
import {
  AuditOutputCard,
  CTAGroup,
  FlowStep,
  GuaranteeCard,
  MetricCallout,
  MobileVisualStack,
  ProofPath,
  RevenueLoop,
  SectionShell as PrimitiveSectionShell,
  StuckPointBadge,
  ToolFitLine,
  VisualCard,
} from "@/components/visual-primitives"

const calculatorHref = "/invoicing-delay-cash-flow-calculator"
const auditHref = "#audit"

const industries = ["HVAC", "Plumbing", "Electrical", "Marine", "Landscaping", "Roofing", "General contracting", "Adjacent service businesses"]

const featureRows = [
  {
    label: "Office software to accounting software",
    title: "Stop rebuilding the invoice story after the job is done.",
    copy: "Stanley Systems connects the job details, billing triggers, and accounting handoff so finished work moves toward collected cash faster.",
    metrics: ["Job done", "Invoice ready", "Owner visible"],
    visual: "office workflow" as const,
  },
  {
    label: "Quote status to follow-up",
    title: "Turn forgotten estimates into a follow-up path someone can see.",
    copy: "The system watches for stale estimates, missed callbacks, and open opportunities so the next touch does not depend on memory.",
    metrics: ["Quote sent", "No answer", "Next touch queued"],
    visual: "followup" as const,
  },
  {
    label: "Dormant customers to repeat bookings",
    title: "Make repeat work a workflow, not a lucky callback.",
    copy: "Customer lists, service history, and timing windows become scheduled actions that create another reason to buy from you again.",
    metrics: ["Past work", "Timing window", "Repeat job path"],
    visual: "repeat" as const,
  },
]

function SectionShell({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`px-5 py-16 md:px-8 lg:px-10 ${className}`}>{children}</section>
}

function SystemCardVisual({ variant }: { variant: "office workflow" | "repeat" }) {
  if (variant === "office workflow") {
    return (
      <PrimitiveSectionShell className="h-full border-[#DDE7E0] bg-[#F6FBF7] p-5 shadow-[0_22px_56px_rgba(16,32,51,0.08)]">
        <div className="space-y-4">
          <MetricCallout
            label="Owner view"
            value="Same-day billing path"
            helper="Finished jobs, invoice readiness, and follow-up all show up in one lane."
            className="border-[#D7E6DB] bg-white"
          />
          <ProofPath
            title="Office Workflow control path"
            outcome="The office sees the next step before cash stalls."
            steps={[
              { label: "Job complete", icon: ClipboardList },
              { label: "Invoice ready", icon: FileText },
              { label: "Payment follow-up", icon: CalendarClock },
            ]}
            className="border-[#D7E6DB]"
          />
          <GuaranteeCard title="What changes first" className="border-[#CFE6D6] bg-[#EAF7EE]">
            Stanley Systems removes the retyping, guessing, and owner rescue work between the job and the invoice.
          </GuaranteeCard>
        </div>
      </PrimitiveSectionShell>
    )
  }

  return (
    <PrimitiveSectionShell className="h-full border-[#DDE7E0] bg-[#F6FBF7] p-5 shadow-[0_22px_56px_rgba(16,32,51,0.08)]">
      <div className="space-y-4">
        <RevenueLoop
          centerLabel="AI Office Ops"
          items={[
            { label: "Dormant customer list", description: "Old customers with a real timing window.", icon: RefreshCcw },
            { label: "Missed call recovery", description: "Catch jobs that would have disappeared.", icon: PhoneCall },
            { label: "Review and referral asks", description: "Turn happy jobs into proof and new demand.", icon: Sparkles },
            { label: "Repeat work timing", description: "Queue the next reason to buy before they drift.", icon: CalendarClock },
          ]}
          className="border-[#D7E6DB] bg-white"
        />
        <ToolFitLine className="rounded-2xl border border-[#D7E6DB] bg-white px-4 py-3 text-sm font-semibold text-[#102033] shadow-sm">
          The point is not more reminders. It is a visible repeat-work loop your team can actually run.
        </ToolFitLine>
      </div>
    </PrimitiveSectionShell>
  )
}

function FeatureVisualPanel({ variant }: { variant: "office workflow" | "followup" | "repeat" }) {
  if (variant === "office workflow") {
    return (
      <PrimitiveSectionShell className="border-[#DDE7E0] bg-[#F6FBF7] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-6">
        <MobileVisualStack className="gap-4">
          <VisualCard className="border-[#D7E6DB] bg-white p-4">
            <FlowStep icon={ClipboardList} label="Job details captured cleanly" description="Notes, status, and billable work arrive in the same lane." active />
          </VisualCard>
          <VisualCard className="border-[#D7E6DB] bg-white p-4">
            <FlowStep icon={FileText} label="Invoice ready without rebuild" description="The office is not chasing scraps across texts, calls, and memory." />
          </VisualCard>
          <AuditOutputCard
            title="Visible outcome"
            finding="Finished work is ready for billing faster."
            revenueLeak="Delayed invoicing and handoff rework"
            drag="Owner checking and office cleanup"
            firstFix="Tie job completion to invoice-ready status"
            className="border-[#D7E6DB]"
          />
        </MobileVisualStack>
      </PrimitiveSectionShell>
    )
  }

  if (variant === "followup") {
    return (
      <PrimitiveSectionShell className="border-[#DDE7E0] bg-[#F6FBF7] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-6">
        <div className="space-y-4">
          <StuckPointBadge label="Quote went stale" className="w-fit border-[#F6D6AE] bg-[#FFF5E8] text-[#8A4B08]" />
          <VisualCard className="border-[#D7E6DB] bg-white p-4">
            <div className="grid gap-3">
              <FlowStep icon={FileText} label="Estimate sent" description="The opportunity exists, but nobody owns the next touch." />
              <FlowStep icon={Clock3} label="No reply window hit" description="Stanley flags the gap before it becomes a dead lead." active />
              <FlowStep icon={PhoneCall} label="Follow-up queued" description="The team gets a visible next step instead of relying on memory." />
            </div>
          </VisualCard>
          <MetricCallout label="What the owner sees" value="Next touch queued" helper="No more guessing which quotes are quietly dying." className="border-[#D7E6DB] bg-white" />
        </div>
      </PrimitiveSectionShell>
    )
  }

  return (
    <PrimitiveSectionShell className="border-[#DDE7E0] bg-[#F6FBF7] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] md:p-6">
      <div className="space-y-4">
        <RevenueLoop
          centerLabel="Repeat bookings"
          items={[
            { label: "Past job tagged", description: "The customer already trusts the company.", icon: CheckCircle2 },
            { label: "Timing window found", description: "Seasonal, maintenance, or lifecycle-based follow-up.", icon: CalendarClock },
            { label: "Outreach queued", description: "The next ask shows up before the customer forgets.", icon: Repeat2 },
            { label: "Referral trigger", description: "Good work becomes another path to revenue.", icon: TrendingUp },
          ]}
          className="border-[#D7E6DB] bg-white"
        />
        <GuaranteeCard title="Why this works" className="border-[#CFE6D6] bg-[#EAF7EE]">
          Repeat work grows when the timing and follow-up live in the workflow instead of someone’s memory.
        </GuaranteeCard>
      </div>
    </PrimitiveSectionShell>
  )
}

export function Phase3HomepageSections() {
  return (
    <>
      <SystemsThatMakeMoneySection />

      <SectionShell className="bg-[#f4f7f4]">
        <div className="mx-auto max-w-[90rem]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#15803D]">Who this fits</p>
              <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[0.96] tracking-[-0.06em] text-[#0B1F33] md:text-6xl">If jobs, invoices, calls, and follow-up cross hands, the leak can show up.</h2>
            </div>
            <p className="text-lg font-medium leading-8 text-slate-600">The trade is different. The office problem is usually familiar: too many handoffs, unclear next steps, and no clean owner view.</p>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <Link key={industry} href="/who-stanley-systems-helps" className="group rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#15803D]/40">
                <Wrench className="h-5 w-5 text-[#15803D]" />
                <p className="mt-5 text-xl font-extrabold tracking-[-0.04em] text-[#0B1F33]">{industry}</p>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">Workflow, cashflow, and repeat-work handoffs.</p>
              </Link>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell className="bg-white">
        <div className="mx-auto max-w-[90rem] space-y-10">
          {featureRows.map((row, index) => (
            <article key={row.title} className={`grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.06)] md:p-8 lg:grid-cols-2 lg:items-center ${index % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
              <div className="p-2 md:p-4">
                <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#15803D]">{row.label}</p>
                <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[0.98] tracking-[-0.058em] text-[#0B1F33] md:text-5xl">{row.title}</h2>
                <p className="mt-5 text-lg font-medium leading-8 text-slate-600">{row.copy}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {row.metrics.map((m) => <span key={m} className="rounded-full border border-slate-200 bg-[#f7faf7] px-3 py-2 text-sm font-extrabold text-[#172033]">{m}</span>)}
                </div>
              </div>
              <FeatureVisualPanel variant={row.visual} />
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="audit" className="bg-[#0B1F33] text-white">
        <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#86efac]">AI Office Map</p>
            <h2 className="mt-4 max-w-[54rem] text-balance text-4xl font-extrabold leading-[0.96] tracking-[-0.06em] md:text-6xl">Before you buy a system, find the workflow that is actually costing you.</h2>
            <p className="mt-5 max-w-[45rem] text-lg font-medium leading-8 text-white/72">The AI Office Map maps the current office path, identifies where work is stuck, and turns the fix into a build plan you can understand.</p>
            <div className="mt-8">
              <CTAGroup
                primary={{ href: auditHref, label: "Book the AI Office Map" }}
                secondary={{ href: calculatorHref, label: "Calculate Your Admin Drag" }}
                className="justify-start"
              />
            </div>
          </div>
          <div className="rounded-[1.8rem] border border-white/14 bg-white/[0.07] p-6">
            {[
              [Search, "Map the current handoff", "Calls, jobs, notes, invoices, software, and follow-up."],
              [Layers3, "Map costly office work", "Where work waits, gets retyped, or loses ownership."],
              [ShieldCheck, "Build the right system", "AI Office Installation Sprint, AI Office Ops, or a focused first workflow."],
            ].map(([Icon, title, copy]) => {
              const I = Icon as typeof Search
              return <div key={title as string} className="flex gap-4 border-b border-white/10 py-5 first:pt-0 last:border-b-0 last:pb-0"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-[#86efac]"><I className="h-5 w-5" /></div><div><p className="text-lg font-extrabold">{title as string}</p><p className="mt-1 text-sm font-medium leading-6 text-white/64">{copy as string}</p></div></div>
            })}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="faq" className="bg-white">
        <div className="mx-auto grid max-w-[90rem] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#15803D]">FAQ</p>
            <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[0.98] tracking-[-0.06em] text-[#0B1F33] md:text-5xl">Questions owners ask before they let Stanley Systems near the workflow.</h2>
          </div>
          <div className="space-y-3">
            {[
              ["Do we need to switch software?", "Usually no. The first move is to work around the tools your team already uses whenever possible."],
              ["What gets automated?", "The handoffs: status changes, invoice readiness, reminders, follow-up triggers, owner views, and exception paths."],
              ["Which system should we buy?", "Book the AI Office Map or calculator. The leak decides the first build."],
              ["Is this just for one trade?", "No. It fits trade-service businesses where jobs, office work, invoices, and follow-up cross hands."],
            ].map(([q, a]) => (
              <details key={q} className="group rounded-[1.1rem] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-extrabold tracking-[-0.03em] text-[#0B1F33]"><span>{q}</span><HelpCircle className="h-5 w-5 shrink-0 text-[#15803D]" /></summary>
                <p className="mt-3 text-[16px] font-medium leading-7 text-slate-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </SectionShell>
    </>
  )
}
