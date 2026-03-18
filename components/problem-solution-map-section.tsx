import { ArrowLeftRight, Brain, FileText, MessagesSquare } from "lucide-react"

const pairs = [
  {
    lossLabel: "Lost jobs",
    lossEstimate: "1–3 missed quotes / month",
    costTitle: "Slow follow-up lets good leads cool off",
    costDescription: "When replies lag, the first company to answer usually gets the job.",
    solutionTitle: "Lead follow-up automation",
    gainEstimate: "More quotes reached in time",
    solutionPoints: [
      "Reply faster across web forms, text, and inbox",
      "Keep serious inquiries from going cold",
      "Free up your team to stay focused on the work",
    ],
    icon: MessagesSquare,
  },
  {
    lossLabel: "Cash flow drag",
    lossEstimate: "Days of delayed cash collection",
    costTitle: "Late billing slows money back into the business",
    costDescription: "Completed work sits too long before billing gets what it needs.",
    solutionTitle: "Invoice workflow automation",
    gainEstimate: "Faster invoicing and cleaner cash flow",
    solutionPoints: [
      "Move completed work into billing faster",
      "Reduce missing details before invoices go out",
      "Shorten the gap between work done and payment",
    ],
    icon: FileText,
  },
  {
    lossLabel: "Wasted admin time",
    lossEstimate: "5–10+ hrs / week",
    costTitle: "Double entry eats the day",
    costDescription: "The same customer and job details get copied between tools again and again.",
    solutionTitle: "Connected admin systems",
    gainEstimate: "Hours back every single week",
    solutionPoints: [
      "Reduce copy-paste work across tools",
      "Lower avoidable admin mistakes",
      "Make handoffs run the same way every time",
    ],
    icon: ArrowLeftRight,
  },
  {
    lossLabel: "Owner dependence",
    lossEstimate: "Bottlenecks every week",
    costTitle: "The business keeps coming back to you",
    costDescription: "If the workflow only works when one person remembers everything, small misses pile up fast.",
    solutionTitle: "Repeatable workflow systems",
    gainEstimate: "A team process that runs without chasing you",
    solutionPoints: [
      "Create cleaner intake-to-ops handoffs",
      "Cut back on missed notes and status confusion",
      "Make the workflow less dependent on one person",
    ],
    icon: Brain,
  },
] as const

export function ProblemSolutionMapSection() {
  return (
    <section className="relative z-10 px-4 py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#ece7dc] bg-[#fbfaf7]/95 px-6 py-8 shadow-[0_22px_60px_rgba(15,23,42,0.06)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.04]">
            What this is costing you — and what we fix
          </h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700 sm:text-[1.15rem] sm:leading-8 lg:text-[1.25rem] lg:leading-9">
            These bottlenecks cost real jobs, real cash flow, and real time. The fix is a cleaner system with a more dependable handoff.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:gap-5">
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-5">
            <div className="rounded-[1.4rem] border border-[#f1d4d8] bg-[linear-gradient(180deg,#fff8f8_0%,#fff2f3_100%)] px-5 py-4 shadow-[0_14px_32px_rgba(127,29,29,0.06)]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#b91c1c]">What this is costing you</div>
            </div>
            <div className="rounded-[1.4rem] border border-[#d7e7d5] bg-[linear-gradient(180deg,#f9fcf7_0%,#eff7ea_100%)] px-5 py-4 shadow-[0_14px_32px_rgba(21,128,61,0.06)]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#15803D]">What we fix</div>
            </div>
          </div>

          {pairs.map((pair) => {
            const Icon = pair.icon
            return (
              <div key={pair.costTitle} className="grid gap-3 lg:grid-cols-2 lg:gap-5">
                <div className="rounded-[1.35rem] border border-[#efd9dc] bg-[linear-gradient(180deg,#fff9f9_0%,#fff4f5_100%)] p-4 shadow-sm sm:p-4.5 lg:min-h-[168px]">
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b91c1c] lg:hidden">What this is costing you</div>
                  <div className="flex h-full items-start gap-3.5">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-[#f2d7dc] bg-white/80 text-[#b91c1c] shadow-sm">
                      <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1.22rem] font-semibold leading-7 text-slate-900 sm:text-[1.34rem] sm:leading-8">
                        {pair.costTitle}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b91c1c]">{pair.lossLabel}</span>
                        <span className="rounded-full bg-[#fee2e2] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#991b1b]">
                          {pair.lossEstimate}
                        </span>
                      </div>
                      <p className="mt-2.5 text-[15px] leading-6 text-slate-700 sm:text-[15px] sm:leading-7">
                        {pair.costDescription}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.35rem] border border-[#dfead9] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf4_100%)] p-4 shadow-sm sm:p-4.5 lg:min-h-[168px]">
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#15803D] lg:hidden">What we fix</div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[1.22rem] font-semibold leading-7 text-slate-900 sm:text-[1.34rem] sm:leading-8">
                        {pair.solutionTitle}
                      </h3>
                      <span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#166534]">
                        {pair.gainEstimate}
                      </span>
                    </div>
                    <ul className="mt-2.5 space-y-1.5">
                      {pair.solutionPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[14px] leading-6 text-slate-700 sm:text-[15px] sm:leading-6">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#15803D]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
