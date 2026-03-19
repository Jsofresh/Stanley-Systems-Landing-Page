import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Walk through how work moves today",
    description: "Stanley Systems looks at how work actually moves through the business today, so the fix matches real day-to-day operations instead of sounding good on paper. That gives the owner a clear picture of what is costing time, money, and avoidable stress before anything gets built.",
    points: [
      "Review where billing slows down, where follow-up gets missed, and where the same details get entered twice",
      "Map the handoffs between the owner, office, and field so weak spots are obvious",
      "Keep the starting point practical for the way the business already runs",
    ],
  },
  {
    number: "02",
    title: "Stanley Systems identifies 2–3 high-impact automations",
    description: "The first recommendations are chosen based on what will make the biggest operational difference fastest, not what is most flashy. The business gets a short list of improvements with obvious value instead of a vague long-term tech plan.",
    points: [
      "Prioritize bottlenecks that affect cash flow, response speed, and admin time first",
      "Focus on changes the team can actually use without adding confusion",
      "Keep the rollout narrow enough to be noticed, measured, and trusted",
    ],
  },
  {
    number: "03",
    title: "Stanley Systems builds the automation in your systems",
    description: "The workflow is built inside the tools already in place, documented clearly, and handed off so the team can run it without depending on memory. The result is a system the business can keep using reliably, with less chasing, less double entry, and fewer missed steps.",
    points: [
      "Build inside the systems already being used whenever possible",
      "Test the handoff so the team knows what happens, when it happens, and what to do next",
      "Document the workflow clearly so it does not turn into another owner-only process",
    ],
  },
]

function StepConnector() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <span className="h-[2px] w-6 bg-gradient-to-r from-[#93c5fd] to-[#3b82f6]" />
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[#2563eb] shadow-[0_10px_24px_rgba(59,130,246,0.16)]">
          <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
        </span>
        <span className="h-[2px] w-6 bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]" />
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative z-10 px-4 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1480px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            How Stanley Systems works
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.22fr)_auto_minmax(0,1.22fr)_auto_minmax(0,1.22fr)] lg:items-stretch lg:gap-3">
          {steps.map((step, index) => (
            <div key={step.number} className="contents">
              <div className="h-full">
                <div className="flex h-full min-h-[29rem] flex-col rounded-[1rem] border border-[#e7e1d6] bg-white p-7 shadow-[0_18px_42px_rgba(15,23,42,0.07)] sm:min-h-[30rem] sm:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563eb]">Step {step.number}</div>
                  <h3 className="mt-5 text-2xl font-semibold leading-9 text-slate-900 sm:text-[1.95rem] sm:leading-[1.25]">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
                    {step.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {step.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[15px] leading-7 text-slate-700 sm:text-base">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2563eb]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center">
                  <StepConnector />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
