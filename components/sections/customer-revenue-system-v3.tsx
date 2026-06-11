import {
  BenefitCheckCompositeAsset,
  DormantCustomerListCompositeAsset,
  MessageBubbleDisplayAsset,
  MonthlyImpactCashCompositeAsset,
  PhoneMissedDisplayAsset,
  ReferralOpportunityCardCompositeAsset,
  ReviewBoosterCardCompositeAsset,
} from '@/components/visual-kit'

const flowCards = [
  {
    step: '01',
    title: 'Bring past customers back',
    line: 'Find customers who already trusted the shop and put the next job in front of them.',
    visual: <DormantCustomerListCompositeAsset width={88} priority />,
  },
  {
    step: '02',
    title: 'Send the next job prompt',
    line: 'Use a simple text to turn old work and seasonal needs into booked jobs.',
    visual: <MessageBubbleDisplayAsset size={66} priority />,
  },
  {
    step: '03',
    title: 'Collect fresh reviews',
    line: 'Ask while the finished job is still fresh and the customer is happy.',
    visual: <ReviewBoosterCardCompositeAsset width={88} priority />,
  },
  {
    step: '04',
    title: 'Create referral chances',
    line: 'Give happy customers an easy way to send the next good lead back.',
    visual: <ReferralOpportunityCardCompositeAsset width={60} priority />,
  },
  {
    step: '05',
    title: 'Recover missed calls',
    line: 'Catch missed calls before they turn into lost jobs or owner cleanup.',
    visual: <PhoneMissedDisplayAsset size={66} priority />,
  },
]

const benefits = [
  'More follow-up revenue',
  'More reviews and referrals',
  'More recovered calls',
  'Less owner rescue',
]

export function CustomerRevenueSystemV3() {
  return (
    <section
      data-stanley-section="customer-revenue-system-v3"
      className="customer-revenue-system-v3 bg-[#f7faf7] px-4 py-14 text-[#071f1a] sm:px-6 lg:py-20"
    >
      <style>{`.customer-revenue-system-v3, .customer-revenue-system-v3 * { box-sizing: border-box; }`}</style>
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[2rem] border border-[#dcebe1] bg-white p-5 shadow-[0_24px_75px_rgba(7,31,26,0.08)] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0caf58]">
                AI Office Ops
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-[#071f1a] sm:text-5xl lg:text-6xl">
                Get more money from the customers you already earned.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-650 sm:text-lg sm:leading-8">
                Stanley Systems brings old customers back, turns happy customers into reviews and referrals, and catches missed calls before they become lost jobs.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#bee8cd] bg-[#edf9ec] p-4 shadow-[0_16px_45px_rgba(12,175,88,0.10)] sm:p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#dcefe0] bg-white shadow-sm sm:h-24 sm:w-24">
                  <MonthlyImpactCashCompositeAsset width={84} priority />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#10713e]">
                    Example monthly impact
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-[#071f1a] sm:text-4xl">
                    +$8,400
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#10713e]">
                    in repeat and recovered revenue
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div id="customer-revenue-system-v3-flow" className="mt-8 grid gap-3 md:grid-cols-5">
            {flowCards.map((card) => (
              <article
                key={card.step}
                className="group grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] gap-4 rounded-[1.35rem] border border-slate-100 bg-white p-4 shadow-[0_16px_42px_rgba(15,23,42,0.065)] transition hover:-translate-y-0.5 hover:border-[#c9ebd5] hover:shadow-[0_20px_55px_rgba(15,23,42,0.09)] md:flex md:flex-col"
              >
                <div className="flex flex-col items-center gap-2 md:block">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0caf58] text-xs font-bold text-white">
                    {card.step}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm md:hidden">
                    {card.visual}
                  </span>
                </div>
                <div className="min-w-0 md:flex md:flex-1 md:flex-col">
                  <div className="mb-4 hidden h-20 items-center justify-center rounded-2xl bg-[#f8fbf8] p-2 md:flex">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
                      {card.visual}
                    </div>
                  </div>
                  <h2 className="text-base font-semibold tracking-[-0.02em] text-[#071f1a] md:text-lg">
                    {card.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {card.line}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-7 rounded-[1.5rem] border border-[#d8ebde] bg-[#f2fbf1] p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef9e9]">
                    <BenefitCheckCompositeAsset width={24} priority />
                  </span>
                  <span className="text-sm font-semibold text-[#071f1a]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              The system keeps the story simple: bring customers back, collect proof, create referrals, and recover calls before the owner has to chase them.
            </p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href="/pricing#workflow-audit"
                className="inline-flex items-center justify-center rounded-full bg-[#0caf58] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(12,175,88,0.24)] transition hover:bg-[#098f49]"
              >
                Book the AI Office Map
              </a>
              <a
                href="#customer-revenue-system-v3-flow"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#071f1a] transition hover:border-[#0caf58]"
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
