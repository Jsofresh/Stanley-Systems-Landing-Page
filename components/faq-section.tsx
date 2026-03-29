"use client"

import SlideIn from "@/components/SlideIn"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "Do we need to switch software?",
    answer:
      "No, they do not need to switch software. Stanley Systems works inside the tools the team already uses whenever possible. The goal is usually to clean up the handoff between the systems you already have, reduce duplicate entry, and make the workflow easier to trust before talking about any bigger tool changes.",
  },
  {
    question: "Is this going to turn into a big project?",
    answer:
      "No. The starting point is usually one or two fixes that make the clearest difference first. Stanley Systems is built to start narrow, prove the workflow works, and then expand only if there is a good reason to. That keeps the rollout easier on the owner and team.",
  },
  {
    question: "Who is this best for?",
    answer:
      "Owner-led service businesses where billing, follow-up, office handoffs, or repeat admin are slowing things down. It is usually the best fit when the business is already getting real work in the door, but the office side is still running too much on texts, memory, spreadsheets, and people chasing each other down.",
  },
  {
    question: "What if we are not sure where the real problem is?",
    answer:
      "That is fine. The first call is used to figure out where the bottleneck actually is. Sometimes the thing that looks like a software problem is really a handoff problem, a follow-up problem, or a visibility problem. The goal is to identify what is actually slowing cash, jobs, or communication down before anything gets built.",
  },
  {
    question: "Will my team still control the workflow?",
    answer:
      "Yes. Your team stays in control, and you own what gets built. Stanley Systems is there to remove drag and make the next step clearer, not to lock your team into a black box. The process should be easier for your office and field staff to follow, not harder.",
  },
  {
    question: "Which plan do most clients start with?",
    answer:
      "Most start with Growth because it covers billing and follow-up together, which are usually the two biggest cash flow leaks. It is often the right middle ground for businesses that already know more than one part of the office workflow is breaking, but do not need a giant cleanup all at once.",
  },
  {
    question: "What if it is not a fit?",
    answer:
      "Stanley Systems will say that upfront. If the workflow is not the real problem, if the business is too early, or if there is not a clear place to create lift, that will be said directly. The point is to give a clear answer, not force a project where one does not belong.",
  },
  {
    question: "How long does setup usually take?",
    answer:
      "It depends on the bottleneck, but the goal is to get the first useful fix in place quickly instead of dragging things out. Most of the time, the first step is not a giant rebuild. It is a focused fix that gets one part of the workflow moving better, then builds from there if needed.",
  },
  {
    question: "Do I need to stop operations while this gets set up?",
    answer:
      "No. The goal is to improve how the business runs without disrupting the team. Stanley Systems is meant to work around the real pace of the business, so the office and field can keep moving while the first fixes are put in place and tested.",
  },
  {
    question: "Will this work if our office is still pretty manual?",
    answer:
      "Yes. Most clients do not start with perfect systems. The work is usually to clean up the handoffs, repeat tasks, and follow-up that are still being done manually. In a lot of cases, that is exactly why Stanley Systems helps in the first place. The goal is to reduce the office drag without forcing the team into a completely different way of operating overnight.",
  },
]

const leftColumn = faqs.filter((_, index) => index % 2 === 0)
const rightColumn = faqs.filter((_, index) => index % 2 === 1)

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-[1.75rem] border border-[#ede6db] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,244,252,0.9)_100%)] shadow-[0_14px_34px_rgba(188,156,205,0.14)] transition-all duration-200 hover:shadow-[0_18px_40px_rgba(188,156,205,0.20)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full touch-manipulation items-start gap-4 px-6 py-6 text-left sm:px-7 sm:py-7"
      >
        <div className="flex-1 pr-2 text-lg font-semibold leading-8 text-slate-900 sm:text-xl">{faq.question}</div>
        <div className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e8dff0] bg-white text-[#5b2bbf] overflow-hidden">
          <Plus
            className="absolute h-5 w-5 shrink-0"
            style={{
              transform: isOpen ? "rotate(540deg) scale(0.7)" : "rotate(0deg) scale(1)",
              opacity: isOpen ? 0 : 1,
              transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease",
            }}
          />
          <Minus
            className="absolute h-5 w-5 shrink-0"
            style={{
              transform: isOpen ? "rotate(0deg) scale(1)" : "rotate(-540deg) scale(0.7)",
              opacity: isOpen ? 1 : 0,
              transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease",
            }}
          />
        </div>
      </button>

      <div
        style={{
          maxHeight: isOpen ? "220px" : "0px",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 375ms ease",
        }}
      >
        <div className="px-6 pb-6 pr-16 text-base leading-8 text-slate-700 sm:px-7 sm:pb-7 sm:text-lg">
          {faq.answer}
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openQuestions, setOpenQuestions] = useState<string[]>([faqs[0].question])

  const toggleQuestion = (question: string) => {
    setOpenQuestions((current) =>
      current.includes(question) ? current.filter((item) => item !== question) : [...current, question],
    )
  }

  return (
    <section id="before-you-book" className="relative z-10 scroll-mt-28 px-4 py-12 sm:scroll-mt-32 sm:py-16 lg:scroll-mt-36 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <SlideIn direction="up">
              <h2 className="text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">Before you book</h2>
            </SlideIn>
          </div>

          <div className="lg:max-w-xl lg:pb-2">
            <SlideIn direction="up" delay={120}>
              <p className="text-xl leading-8 text-slate-700 sm:text-2xl lg:text-[1.5rem] lg:leading-10">A few common questions, answered plainly.</p>
            </SlideIn>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2 lg:gap-7">
          <div className="flex flex-col gap-5 lg:gap-6">
            {leftColumn.map((faq) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openQuestions.includes(faq.question)}
                onToggle={() => toggleQuestion(faq.question)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-5 lg:gap-6">
            {rightColumn.map((faq) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openQuestions.includes(faq.question)}
                onToggle={() => toggleQuestion(faq.question)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
