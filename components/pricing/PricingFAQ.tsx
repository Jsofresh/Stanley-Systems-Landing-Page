import type { PricingFAQItem } from "@/lib/pricing/offers"

export function PricingFAQ({ items }: { items: PricingFAQItem[] }) {
  return (
    <section className="mx-auto max-w-5xl">
      <h2 className="text-center text-[2.2rem] font-semibold leading-tight tracking-[-0.03em] text-[#102033] sm:text-5xl">
        Pricing questions, answered before checkout.
      </h2>
      <div className="mt-8 grid gap-3">
        {items.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-[#e4ded3] bg-white px-5 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.045)] open:border-[#bfe4c8] open:bg-[#f9fdf9] sm:px-6">
            <summary className="cursor-pointer list-none text-base font-bold leading-6 text-[#102033] marker:hidden sm:text-lg">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#cfe8d5] bg-[#f4fbf5] text-[#15803D] transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#536173] sm:text-base">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
