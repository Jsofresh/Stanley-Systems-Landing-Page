import { Minus, Plus } from "lucide-react"

const faqs = [
  {
    question: "Do we need to switch software?",
    answer:
      "No, they do not need to switch software. Stanley Systems works inside the tools the team already uses whenever possible.",
  },
  {
    question: "Is this going to turn into a big project?",
    answer:
      "No. The starting point is usually one or two fixes that make the clearest difference first.",
  },
  {
    question: "Who is this best for?",
    answer:
      "Owner-led service businesses where billing, follow-up, office handoffs, or repeat admin are slowing things down.",
  },
  {
    question: "What if we are not sure where the real problem is?",
    answer:
      "That is fine. The first call is used to figure out where the bottleneck actually is.",
  },
  {
    question: "Will my team still control the workflow?",
    answer:
      "Yes. Your team stays in control, and you own what gets built.",
  },
  {
    question: "What if it is not a fit?",
    answer:
      "Stanley Systems will say that upfront.",
  },
  {
    question: "How long does setup usually take?",
    answer:
      "It depends on the bottleneck, but the goal is to get the first useful fix in place quickly instead of dragging things out.",
  },
  {
    question: "Do I need to stop operations while this gets set up?",
    answer:
      "No. The goal is to improve how the business runs without disrupting the team.",
  },
]

const leftColumn = faqs.filter((_, index) => index % 2 === 0)
const rightColumn = faqs.filter((_, index) => index % 2 === 1)

function FAQItem({ faq, index, defaultOpen = false }: { faq: (typeof faqs)[number]; index: number; defaultOpen?: boolean }) {
  const inputId = `faq-toggle-${index}`

  return (
    <div className="rounded-[1.75rem] border border-[#ede6db] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,244,252,0.9)_100%)] shadow-[0_14px_34px_rgba(188,156,205,0.14)] transition-all duration-200 hover:shadow-[0_18px_40px_rgba(188,156,205,0.20)]">
      <input id={inputId} type="checkbox" defaultChecked={defaultOpen} className="peer sr-only" />

      <label htmlFor={inputId} className="flex w-full cursor-pointer items-start gap-4 px-6 py-6 text-left sm:px-7 sm:py-7">
        <div className="flex-1 pr-2 text-lg font-semibold leading-8 text-slate-900 sm:text-xl">{faq.question}</div>
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e8dff0] bg-white text-[#5b2bbf]">
          <Plus className="h-5 w-5 shrink-0 peer-checked:hidden" />
          <Minus className="hidden h-5 w-5 shrink-0 peer-checked:block" />
        </div>
      </label>

      <div className="hidden px-6 pb-6 pr-16 text-base leading-8 text-slate-700 peer-checked:block sm:px-7 sm:pb-7 sm:text-lg">
        {faq.answer}
      </div>
    </div>
  )
}

export function FAQSection() {
  return (
    <section id="before-you-book" className="relative z-10 px-4 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">Before you book</h2>
          </div>

          <div className="lg:max-w-xl lg:pb-2">
            <p className="text-xl leading-8 text-slate-700 sm:text-2xl lg:text-[1.5rem] lg:leading-10">A few common questions, answered plainly.</p>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2 lg:gap-7">
          <div className="flex flex-col gap-5 lg:gap-6">
            {leftColumn.map((faq) => {
              const originalIndex = faqs.findIndex((item) => item.question === faq.question)
              return <FAQItem key={faq.question} faq={faq} index={originalIndex} defaultOpen={originalIndex === 0} />
            })}
          </div>

          <div className="flex flex-col gap-5 lg:gap-6">
            {rightColumn.map((faq) => {
              const originalIndex = faqs.findIndex((item) => item.question === faq.question)
              return <FAQItem key={faq.question} faq={faq} index={originalIndex} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
