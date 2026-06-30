"use client"

import { Minus, Plus } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "Who is Stanley Systems best for?",
    answer:
      "Trade contractors and field service shops where work is already coming in, but billing, handoffs, follow-up, missed calls, or customer follow-up still depend too much on memory, texts, spreadsheets, and owner cleanup.",
  },
  {
    question: "Do we need to switch software?",
    answer:
      "Usually no. Stanley Systems works inside the tools the team already uses whenever possible. The goal is to clean up the handoff, reduce duplicate entry, and make the workflow easier to trust before talking about bigger tool changes.",
  },
  {
    question: "What if we are not sure which leak matters most?",
    answer:
      "That is exactly why the calculator and AI Profit Map come first. The goal is to identify whether billing readiness, office handoffs, missed follow-up, or staff SOP support should be fixed before anything gets built.",
  },
  {
    question: "Is this going to turn into a big project?",
    answer:
      "No. The starting point is one focused money path. Stanley Systems starts narrow, proves the workflow works, and expands only when the next fix has a clear reason.",
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
    <div className="rounded-[1.2rem] border border-[#e5ded3] bg-white shadow-[0_12px_30px_rgba(16,32,51,0.045)] transition-all duration-200 hover:shadow-[0_16px_34px_rgba(16,32,51,0.07)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full touch-manipulation items-start gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
      >
        <div className="flex-1 pr-2 text-base font-bold leading-7 text-slate-900 sm:text-lg">{faq.question}</div>
        <div className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#cfe8d5] bg-[#f2fbf5] text-[#15803D]">
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
          maxHeight: isOpen ? "180px" : "0px",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 375ms ease",
        }}
      >
        <div className="px-5 pb-5 pr-14 text-sm leading-6 text-slate-700 sm:px-6 sm:pb-6 sm:text-base sm:leading-7">
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
    <section
      id="before-you-book"
      data-audit-page="/"
      data-audit-section="home.faq"
      data-audit-priority="2"
      data-audit-offer="AI Profit Map"
      data-audit-purpose="Answer buying objections before the visitor books the AI Profit Map."
      className="relative z-10 scroll-mt-28 px-4 py-10 sm:scroll-mt-32 sm:py-12 lg:scroll-mt-36 lg:py-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-[2.15rem] font-semibold leading-tight text-slate-900 sm:text-[2.7rem] lg:text-[3.1rem]">Before you buy anything</h2>
          </div>

          <div className="lg:max-w-xl lg:pb-2">
            <p className="text-base leading-7 text-slate-700 sm:text-lg">A few common objections, answered plainly.</p>
          </div>
        </div>

        <div className="mt-6 grid items-start gap-4 lg:grid-cols-2 lg:gap-5">
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
