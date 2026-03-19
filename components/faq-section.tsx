"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"

const faqs = [
  {
    question: "What is included in the Starter plan?",
    answer:
      "Starter is for fixing one core bottleneck first. That usually includes one high-friction workflow, done-for-you setup, and the first layer of follow-up or admin automation so your team can stop patching it manually.",
  },
  {
    question: "Can we start small and expand later?",
    answer:
      "Yes. That is usually the smartest way to do it. We fix the biggest leak first, prove the workflow works, then expand into the next bottleneck if it makes sense.",
  },
  {
    question: "Do you replace the tools we already use?",
    answer:
      "Usually no. Stanley is designed to work inside your current stack whenever possible. The goal is to clean up the handoffs, not force a giant software migration unless there is a real reason to.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "It depends on the bottleneck, but most early wins come from tightening one operational flow quickly instead of trying to rebuild everything at once. We focus on speed to value, not long drawn-out setup.",
  },
  {
    question: "Will my team still control the workflow?",
    answer:
      "Yes. Your team stays in control, and you own what gets built. We are not trying to trap you in a black box or make the business depend on mystery systems.",
  },
  {
    question: "Do I need to stop operations while this gets set up?",
    answer:
      "No. The goal is to improve how the business runs without creating a long disruption. Stanley Systems works around the current operation, then rolls out improvements in a way the team can absorb.",
  },
  {
    question: "What kinds of problems do you usually fix first?",
    answer:
      "The usual first targets are slow lead follow-up, late invoices, manual double entry, and messy handoffs between intake, operations, and billing. In other words: the stuff that quietly bleeds time and cash every week.",
  },
  {
    question: "How do I know this will fit my business?",
    answer:
      "The starting point is never a generic automation package. Stanley Systems looks at how your office, field work, billing, and customer handoffs already operate, then builds around that reality. If a workflow will not fit the business, it should not be forced in.",
  },
]

const leftColumn = faqs.filter((_, index) => index % 2 === 0)
const rightColumn = faqs.filter((_, index) => index % 2 === 1)

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const toggleItem = (index: number) => {
    setOpenItems((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]))
  }

  const renderFaqItem = (faq: (typeof faqs)[number], index: number) => {
    const isOpen = openItems.includes(index)

    return (
      <button
        key={faq.question}
        type="button"
        onClick={() => toggleItem(index)}
        className="h-fit w-full self-start text-left rounded-[1.75rem] border border-[#ede6db] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,244,252,0.9)_100%)] px-6 py-6 sm:px-7 sm:py-7 shadow-[0_14px_34px_rgba(188,156,205,0.14)] transition-all duration-200 hover:shadow-[0_18px_40px_rgba(188,156,205,0.20)]"
      >
        <div className="flex items-start gap-4">
          <div className="flex-1 pr-2 text-lg sm:text-xl font-semibold leading-8 text-slate-900">{faq.question}</div>
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e8dff0] bg-white text-[#5b2bbf]">
            {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </div>
        </div>

        {isOpen && <div className="mt-5 pr-10 text-base leading-8 text-slate-700 sm:text-lg">{faq.answer}</div>}
      </button>
    )
  }

  return (
    <section id="before-you-book" className="relative z-10 px-4 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-slate-900">Before you book</h2>
          </div>

          <div className="lg:max-w-xl lg:pb-2">
            <p className="text-xl sm:text-2xl lg:text-[1.5rem] leading-8 lg:leading-10 text-slate-700">
              A few common questions, answered in plain English.
            </p>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2 lg:gap-7">
          <div className="flex flex-col gap-5 lg:gap-6">
            {leftColumn.map((faq) => {
              const originalIndex = faqs.findIndex((item) => item.question === faq.question)
              return renderFaqItem(faq, originalIndex)
            })}
          </div>

          <div className="flex flex-col gap-5 lg:gap-6">
            {rightColumn.map((faq) => {
              const originalIndex = faqs.findIndex((item) => item.question === faq.question)
              return renderFaqItem(faq, originalIndex)
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
