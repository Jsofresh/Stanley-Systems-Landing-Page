import {
  CheckCircleDisplayAsset,
  DollarCircleDisplayAsset,
} from '@/components/visual-kit/display-assets'
import { CustomerRevenueLoopMini } from '@/components/visual-kit/mini-features'

const benefits = [
  'More follow-up revenue',
  'More reviews and referrals',
  'More recovered calls',
  'Less owner rescue',
]

export function CustomerRevenueSystemV4() {
  return (
    <section
      data-stanley-section="customer-revenue-system-v4"
      className="customer-revenue-system-v4 bg-[#f7f2ea] px-4 py-12 text-[#102033] sm:px-6 lg:py-16"
    >
      <style>{`.customer-revenue-system-v4, .customer-revenue-system-v4 * { box-sizing: border-box; }`}</style>
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[2rem] border border-[#ded6c8] bg-[#fbf8f2] p-5 shadow-[0_24px_75px_rgba(16,32,51,0.08)] sm:p-7 lg:p-9">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(310px,0.38fr)] lg:items-end">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15803D]">
                AI OFFICE OPS
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-normal text-[#071421] sm:text-5xl lg:text-6xl">
                Get more money from the customers you already earned.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-[#667085] sm:text-lg sm:leading-8">
                Stanley Systems brings old customers back, turns happy customers into reviews and referrals, and catches missed calls before they become lost jobs.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#bfe3c9] bg-white p-4 shadow-[0_16px_40px_rgba(21,128,61,0.10)] sm:p-5">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#dce8dc] bg-[#f2fbf1] sm:h-20 sm:w-20">
                  <DollarCircleDisplayAsset size={58} priority />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#15803D]">
                    Example monthly impact
                  </p>
                  <p className="mt-1 text-3xl font-semibold leading-none tracking-normal text-[#071421] sm:text-4xl">
                    +$8,400
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-5 text-[#116832]">
                    in repeat and recovered revenue
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CustomerRevenueLoopMini className="mt-6" />

          <div className="mt-5 grid gap-3 rounded-[1.5rem] border border-[#ded6c8] bg-white p-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex min-w-0 items-center gap-3 rounded-[1rem] bg-[#fbf8f2] px-3 py-3">
                <CheckCircleDisplayAsset size={30} priority />
                <span className="text-sm font-semibold leading-5 text-[#102033]">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-[#ded6c8] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-[#667085]">
              The flow keeps revenue moving from customers the business already earned, then turns good work into proof, referrals, and recovered calls.
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href="/pricing#workflow-audit"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(21,128,61,0.22)] transition hover:bg-[#116832]"
              >
                Book the AI Office Map
              </a>
              <a
                href="#customer-revenue-system-v4-flow"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#ded6c8] bg-white px-6 py-3 text-sm font-semibold text-[#102033] transition hover:border-[#15803D]"
              >
                See how the system works
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
