import { ArrowLeftRight, Brain, FileText, MessagesSquare } from "lucide-react"

const pairs = [
  {
    painTitle: "Slow follow-up lets good leads cool off",
    painPoints: [
      "1–3 missed quotes each month",
      "Good leads go with the first company that replies",
      "Office time gets pulled into constant follow-up",
    ],
    fixTitle: "Lead follow-up automation",
    returnPoints: [
      "More jobs quoted before the lead goes cold",
      "Revenue that stops slipping to faster competitors",
      "A steadier flow of booked work each month",
    ],
    icon: MessagesSquare,
  },
  {
    painTitle: "Late billing slows money back into the business",
    painPoints: [
      "Invoices go out days later than they should",
      "Cash sits longer before it comes back in",
      "Billing has to chase missing job details",
    ],
    fixTitle: "Invoice workflow automation",
    returnPoints: [
      "Money comes back into the business faster",
      "Less cash stuck in unfinished admin",
      "A smoother billing cycle without constant chasing",
    ],
    icon: FileText,
  },
  {
    painTitle: "Double entry eats the day",
    painPoints: [
      "5–10+ admin hours lost every week",
      "The same details get copied between tools",
      "Manual re-entry creates avoidable mistakes",
    ],
    fixTitle: "Connected admin systems",
    returnPoints: [
      "Thousands saved in payroll over the course of a year",
      "Less office time burned on repeat admin work",
      "Cleaner handoffs with fewer avoidable mistakes",
    ],
    icon: ArrowLeftRight,
  },
  {
    painTitle: "The business keeps coming back to you",
    painPoints: [
      "The owner becomes the bottleneck every week",
      "Important handoffs depend on memory",
      "Small misses keep stacking up across the team",
    ],
    fixTitle: "Repeatable workflow systems",
    returnPoints: [
      "Fewer day-to-day interruptions landing on the owner",
      "A team that can run the process more consistently",
      "Less confusion, less chasing, and fewer dropped details",
    ],
    icon: Brain,
  },
] as const

export function ProblemSolutionMapSection() {
  return (
    <section className="relative z-10 px-4 py-10 sm:py-12 lg:py-12">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#ece7dc] bg-[#fbfaf7]/95 px-6 py-7 shadow-[0_22px_60px_rgba(15,23,42,0.06)] sm:px-8 sm:py-8 lg:px-10 lg:py-9">
        <div className="max-w-none text-center">
          <h2 className="whitespace-nowrap text-[2.05rem] font-semibold tracking-tight text-slate-900 sm:text-[2.45rem] lg:text-[2.95rem] lg:leading-[1.06]">
            What this is costing you — and what Stanley Systems fixes
          </h2>
        </div>

        <div className="mt-6 grid gap-3 lg:gap-4">
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="flex items-center justify-center rounded-[1.25rem] border border-[#f1d4d8] bg-[linear-gradient(180deg,#fff8f8_0%,#fff2f3_100%)] px-5 py-3 text-center shadow-[0_14px_32px_rgba(127,29,29,0.05)]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9f1239]">Where your business is leaking time and money</div>
            </div>
            <div className="flex items-center justify-center rounded-[1.25rem] border border-[#d7e7d5] bg-[linear-gradient(180deg,#f9fcf7_0%,#eff7ea_100%)] px-5 py-3 text-center shadow-[0_14px_32px_rgba(21,128,61,0.05)]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#166534]">Stanley Systems fix + return</div>
            </div>
          </div>

          {pairs.map((pair) => {
            const Icon = pair.icon
            return (
              <div key={pair.painTitle} className="grid gap-3 lg:grid-cols-2 lg:gap-4">
                <div className="rounded-[1.35rem] border border-[#efd9dc] bg-[linear-gradient(180deg,#fffafa_0%,#fff4f5_100%)] p-5 shadow-sm">
                  <div className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9f1239] lg:hidden">
                    Where your business is leaking time and money
                  </div>
                  <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
                    <div>
                      <span className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] border border-[#f2d7dc] bg-white text-[#9f1239] shadow-sm">
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <h3 className="mt-4 text-[1.08rem] font-semibold leading-6 text-slate-900 sm:text-[1.16rem] sm:leading-7 lg:text-[1.22rem]">
                        {pair.painTitle}
                      </h3>
                    </div>
                    <ul className="space-y-2 lg:pt-1">
                      {pair.painPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-[14px] leading-6 text-slate-700 sm:text-[15px]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#be123c]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-[1.35rem] border border-[#dfead9] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf4_100%)] p-5 shadow-sm">
                  <div className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#166534] lg:hidden">
                    Stanley Systems fix + return
                  </div>
                  <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
                    <div>
                      <h3 className="text-[1.08rem] font-semibold leading-6 text-slate-900 sm:text-[1.16rem] sm:leading-7 lg:text-[1.22rem]">
                        {pair.fixTitle}
                      </h3>
                    </div>
                    <ul className="space-y-2 lg:pt-1">
                      {pair.returnPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-[14px] leading-6 text-slate-700 sm:text-[15px]">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803D]" />
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
