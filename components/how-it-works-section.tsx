import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Share your current process",
    description: "Stanley Systems reviews where billing slows down, where follow-up gets missed, and where the team is doing the same work twice.",
  },
  {
    number: "02",
    title: "Stanley Systems identifies 2–3 high-impact automations",
    description: "The starting point is the bottlenecks costing the most time or money, so the first improvement is practical and noticeable.",
  },
  {
    number: "03",
    title: "Stanley Systems builds the automation in your systems",
    description: "The workflow is built inside the tools already in place, documented clearly, and handed off so the team can run it without depending on memory.",
  },
]

function StepConnector() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="h-[2px] w-8 bg-gradient-to-r from-[#93c5fd] to-[#3b82f6]" />
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#bfdbfe] bg-white text-[#2563eb] shadow-[0_12px_30px_rgba(59,130,246,0.18)]">
          <ArrowRight className="h-6 w-6" strokeWidth={2.4} />
        </span>
        <span className="h-[2px] w-8 bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]" />
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative z-10 px-4 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            How Stanley Systems works
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="contents">
              <div className="h-full">
                <div className="flex h-full flex-col rounded-[1rem] border border-[#e7e1d6] bg-white p-8 shadow-[0_18px_42px_rgba(15,23,42,0.07)] sm:p-9">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563eb]">Step {step.number}</div>
                  <h3 className="mt-5 text-2xl font-semibold leading-9 text-slate-900 sm:text-[1.85rem]">
                    {step.title}
                  </h3>
                  <p className="mt-5 flex-1 text-base leading-8 text-slate-700 sm:text-lg">
                    {step.description}
                  </p>
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
