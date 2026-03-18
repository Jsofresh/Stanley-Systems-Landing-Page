const steps = [
  {
    number: "01",
    title: "Walk me through your current process",
    description: "Show me where billing slows down, where follow-up gets missed, and where your team is doing the same work twice.",
  },
  {
    number: "02",
    title: "I’ll recommend 2–3 high-impact automations",
    description: "We start with the bottlenecks costing you the most time or money, so the first improvement is practical and noticeable.",
  },
  {
    number: "03",
    title: "I build the automation in your systems",
    description: "The workflow gets built inside the tools you already use, documented clearly, and handed off so your team can run it without depending on memory.",
  },
]

const arrowColor = "#3b82f6"

function StepArrow() {
  return (
    <svg viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-24">
      <path
        d="M6 24H96"
        stroke={arrowColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M78 8L112 24L78 40"
        stroke={arrowColor}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            How it works
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="rounded-[1.9rem] border border-[#e8e1d3] bg-white p-8 sm:p-9 lg:min-h-[320px] shadow-[0_16px_38px_rgba(15,23,42,0.06)]">
                <div className="text-base font-semibold uppercase tracking-[0.18em] text-[#3b82f6]">Step {step.number}</div>
                <h3 className="mt-5 text-2xl font-semibold leading-9 text-slate-900 sm:text-[1.85rem]">
                  {step.title}
                </h3>
                <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-16 -translate-y-1/2 items-center justify-center pointer-events-none z-10">
                  <StepArrow />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
