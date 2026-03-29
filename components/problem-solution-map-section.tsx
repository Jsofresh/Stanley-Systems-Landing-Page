"use client"

import SlideIn from "@/components/SlideIn"
import { AlertTriangle, ArrowLeftRight, Brain, FileText, MessagesSquare } from "lucide-react"
import { useMemo } from "react"

const pairs = [
  {
    painTitle: "Missed follow-up",
    painPoints: [
      "10–20% of good estimates can go cold when nobody follows up fast",
      "Quotes can sit for days without a clear next step",
      "Office staff lose hours each week chasing people back down",
    ],
    fixTitle: "Automated follow-up",
    returnPoints: [
      "Follow-up happens almost instantly instead of sitting in the queue",
      "Most estimate follow-up runs automatically and on time (typically ~80–95%)",
      "More good leads stay warm long enough to turn into booked work",
    ],
    icon: MessagesSquare,
  },
  {
    painTitle: "Slow invoicing",
    painPoints: [
      "Completed work can sit 3–7 extra days before billing gets it",
      "Cash can come in a week or more later than it should",
      "The office keeps losing time chasing missing job details",
    ],
    fixTitle: "Faster billing handoff",
    returnPoints: [
      "Job details move into billing almost instantly after the work is done",
      "The billing handoff runs automatically instead of by hand (typically ~80–95%)",
      "Invoices go out same day or next day instead of sitting in backlog",
    ],
    icon: FileText,
  },
  {
    painTitle: "Office overload",
    painPoints: [
      "Teams can lose 5–10+ hours a week retyping and checking",
      "The same customer details keep living in too many places",
      "Small mistakes keep turning into callbacks, fixes, and extra admin",
    ],
    fixTitle: "Cleaner office workflow",
    returnPoints: [
      "Repeat admin gets handled automatically instead of manually",
      "Customer details move through the workflow with ~80–95% less retyping",
      "The office gets cleaner handoffs and far fewer avoidable mistakes",
    ],
    icon: ArrowLeftRight,
  },
  {
    painTitle: "Owner bottleneck",
    painPoints: [
      "Important steps still depend too much on memory",
      "The owner keeps getting pulled back into routine questions",
      "The team cannot move certain work forward without checking first",
    ],
    fixTitle: "Less owner dependence",
    returnPoints: [
      "The team gets the next step instantly instead of waiting on the owner",
      "Most routine decisions move forward without needing another call or text",
      "The owner gets pulled back in far less often while the process keeps moving",
    ],
    icon: Brain,
  },
] as const

export function ProblemSolutionMapSection() {
  const visiblePairs = useMemo(() => pairs, [])

  return (
    <section className="relative z-10 px-4 py-10 sm:py-12 lg:py-12">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#ece7dc] bg-[#fbfaf7]/95 px-6 py-7 shadow-[0_22px_60px_rgba(15,23,42,0.06)] sm:px-8 sm:py-8 lg:px-10 lg:py-9">
        <div className="max-w-none text-center">
          <SlideIn direction="up">
            <h2 className="text-[2rem] font-semibold tracking-tight text-slate-900 sm:text-[2.4rem] lg:text-[2.9rem] lg:leading-[1.06]">
              What Stanley Systems fixes first
            </h2>
          </SlideIn>
          <SlideIn direction="up" delay={120}>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Stanley Systems starts with the bottlenecks that cost the most time, cash, and attention.
            </p>
          </SlideIn>
        </div>

        <div className="mt-6 grid gap-3 lg:gap-4">
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="flex items-center justify-center rounded-[1.25rem] border border-[#f1d4d8] bg-[linear-gradient(180deg,#fff8f8_0%,#fff2f3_100%)] px-5 py-3 text-center shadow-[0_14px_32px_rgba(127,29,29,0.05)]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#9f1239]">What is breaking down</div>
            </div>
            <div className="flex items-center justify-center rounded-[1.25rem] border border-[#d7e7d5] bg-[linear-gradient(180deg,#f9fcf7_0%,#eff7ea_100%)] px-5 py-3 text-center shadow-[0_14px_32px_rgba(21,128,61,0.05)]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#166534]">What Stanley fixes</div>
            </div>
          </div>

          {visiblePairs.map((pair, index) => {
            const Icon = pair.icon

            return (
              <div key={pair.painTitle} className="grid items-stretch gap-3 lg:grid-cols-2 lg:gap-4">
                <SlideIn direction="left" delay={index * 90} className="h-full">
                  <div className="flex h-full flex-col rounded-[1.35rem] border border-[#efd9dc] bg-[linear-gradient(180deg,#fffafa_0%,#fff4f5_100%)] p-4 shadow-sm sm:p-[1.05rem]">
                    <div className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9f1239] lg:hidden">What is breaking down</div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <span className="relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.8rem] border border-[#f2d7dc] bg-white text-[#9f1239] shadow-sm">
                          <Icon className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
                          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <span className="h-[1.5px] w-5 -rotate-12 rounded-full bg-[#dc2626]" />
                          </span>
                          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#fee2e2] text-[#dc2626] ring-2 ring-white">
                            <AlertTriangle className="h-2 w-2" strokeWidth={2.4} />
                          </span>
                        </span>
                        <h3 className="max-w-[14rem] text-[1.05rem] font-semibold leading-6 text-slate-900 sm:text-[1.12rem] sm:leading-7 lg:max-w-[15rem] lg:text-[1.18rem]">
                          {pair.painTitle}
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {pair.painPoints.map((point) => (
                          <li key={point} className="flex items-start gap-3 text-[15px] leading-7 text-slate-700 sm:text-[16px] sm:leading-7">
                            <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#be123c]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SlideIn>

                <SlideIn direction="right" delay={index * 90} className="h-full">
                  <div className="flex h-full flex-col rounded-[1.35rem] border border-[#dfead9] bg-[linear-gradient(180deg,#ffffff_0%,#f7fbf4_100%)] p-4 shadow-sm sm:p-[1.05rem]">
                    <div className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[#166534] lg:hidden">What Stanley fixes</div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.8rem] border border-[#d7e7d5] bg-white text-[#15803d] shadow-sm">
                          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                        <h3 className="max-w-[14rem] text-[1.05rem] font-semibold leading-6 text-slate-900 sm:text-[1.12rem] sm:leading-7 lg:max-w-[15rem] lg:text-[1.18rem]">
                          {pair.fixTitle}
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {pair.returnPoints.map((point) => (
                          <li key={point} className="flex items-start gap-3 text-[15px] leading-7 text-slate-700 sm:text-[16px] sm:leading-7">
                            <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#15803D]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SlideIn>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}
