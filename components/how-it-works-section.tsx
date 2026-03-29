import SlideIn from "@/components/SlideIn"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "See where the work is getting stuck",
    description:
      "Stanley Systems looks at how jobs, billing, follow-up, and office handoffs actually move through the business now. That makes it easier to spot where time, cash, and attention are getting lost.",
    points: [
      "Review where billing slows down",
      "See where follow-up is being missed",
      "Find where the same information is getting entered twice",
    ],
  },
  {
    number: "02",
    title: "Stanley Systems shows you the first few fixes worth making",
    description:
      "The first fixes are picked based on what will make the clearest difference fastest. The goal is not to create a big project. The goal is to fix the first few leaks that are hurting the business most.",
    points: [
      "Start with cash flow, follow-up, and admin drag",
      "Keep the rollout narrow enough to be easy to trust",
      "Focus on fixes the team can actually use",
    ],
  },
  {
    number: "03",
    title: "Stanley Systems fixes the workflow inside the tools you already use",
    description:
      "Stanley Systems puts the fix into the tools your team already works in, tests the handoff, and documents it clearly so the business is not left depending on memory.",
    points: [
      "Use the systems already in place whenever possible",
      "Make the next step clear for the office and field",
      "Document what happens so the team can keep using it",
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
          <SlideIn direction="up">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              How Stanley Systems fixes the problem
            </h2>
          </SlideIn>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.22fr)_auto_minmax(0,1.22fr)_auto_minmax(0,1.22fr)] lg:items-stretch lg:gap-3">
          {steps.map((step, index) => (
            <div key={step.number} className="contents">
              <SlideIn direction="up" delay={index * 110} className="h-full">
                <div className="flex h-full min-h-[29rem] flex-col rounded-[1rem] border border-[#e7e1d6] bg-white p-7 shadow-[0_18px_42px_rgba(15,23,42,0.07)] sm:min-h-[30rem] sm:p-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2563eb]">Step {step.number}</div>
                  <h3 className="mt-5 text-2xl font-semibold leading-9 text-slate-900 sm:text-[1.85rem] sm:leading-[1.25]">
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
              </SlideIn>

              {index < steps.length - 1 && (
                <div className="hidden items-center justify-center lg:flex">
                  <StepConnector />
                </div>
              )}
            </div>
          ))}
        </div>

      <div className="mt-10 flex justify-center">
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-[#15803D] px-7 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)] transition-all duration-200 hover:bg-[#166534]"
        >
          See what's worth fixing first
        </a>
      </div>
      </div>
    </section>
  )
}
