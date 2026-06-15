import type { ReactNode } from 'react'

import {
  BenefitCheckCompositeAsset,
  DormantCustomerListCompositeAsset,
  FlowArrowCompositeAsset,
  MissedCallRecoveredCardCompositeAsset,
  MonthlyImpactCashCompositeAsset,
  ReferralOpportunityCardCompositeAsset,
  ReviewBoosterCardCompositeAsset,
  SmsReactivationPhoneCompositeAsset,
} from '@/components/visual-kit'

const packageSteps = [
  {
    eyebrow: '01',
    title: 'Bring past customers back',
    copy: 'Find dormant customers who already trusted the shop and give them a clear reason to book again.',
    Component: DormantCustomerListCompositeAsset,
    assetWidth: 230,
  },
  {
    eyebrow: '02',
    title: 'Send the next job prompt',
    copy: 'Use simple follow-up texts to turn old work, seasonal needs, and open opportunities into new jobs.',
    Component: SmsReactivationPhoneCompositeAsset,
    assetWidth: 230,
  },
  {
    eyebrow: '03',
    title: 'Collect more fresh reviews',
    copy: 'Ask at the right time, while the customer still remembers the finished job.',
    Component: ReviewBoosterCardCompositeAsset,
    assetWidth: 230,
  },
  {
    eyebrow: '04',
    title: 'Create more referral chances',
    copy: 'Give happy customers a simple path to send the next good lead back to the business.',
    Component: ReferralOpportunityCardCompositeAsset,
    assetWidth: 112,
  },
  {
    eyebrow: '05',
    title: 'Recover missed calls',
    copy: 'Catch the calls that would otherwise become lost jobs, slow replies, or owner cleanup work.',
    Component: MissedCallRecoveredCardCompositeAsset,
    assetWidth: 230,
  },
]

const outcomes = [
  'More repeat jobs from customers already earned',
  'More reviews while the job is still fresh',
  'More referrals from happy customers',
  'More recovered calls before leads go cold',
]

function AssetCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`max-w-full rounded-[1.75rem] border border-slate-100 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${className}`}
      style={{ boxSizing: 'border-box' }}
    >
      {children}
    </div>
  )
}

export function CustomerRevenueSystemV2() {
  return (
    <section
      data-stanley-section="customer-revenue-system-v2"
      className="customer-revenue-system-v2 bg-[#f7faf7] px-4 py-16 text-[#071f1a] sm:px-6 lg:py-24"
    >
      <style>{`.customer-revenue-system-v2, .customer-revenue-system-v2 * { box-sizing: border-box; }`}</style>
      <div className="mx-auto box-border w-full max-w-7xl">
        <div
          className="w-full max-w-full rounded-[2.5rem] border border-[#dbe9df] bg-white/82 p-5 shadow-[0_24px_80px_rgba(7,31,26,0.08)] sm:p-8 lg:p-10"
          style={{ boxSizing: 'border-box' }}
        >
          <div className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
            <div className="w-full min-w-0 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0caf58]">
                AI Office Ops
              </p>
              <h1 className="mt-4 max-w-full break-words text-4xl font-semibold tracking-[-0.04em] text-[#071f1a] sm:text-5xl lg:text-6xl">
                Get more money from the customers you already earned.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-650">
                Stanley Systems turns past customers, happy customers, missed calls, reviews, and referrals into a cleaner revenue loop.
              </p>

              <div className="mt-7 grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#cfe8d8] bg-[#eef9e9] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10713e]">Result first</p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#071f1a]">More follow-up revenue</p>
                  <p className="mt-2 text-sm leading-6 text-slate-650">
                    The system starts with customers the business already paid to earn.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Fast read</p>
                  <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#071f1a]">5 linked moves</p>
                  <p className="mt-2 text-sm leading-6 text-slate-650">
                    Re-engage, review, refer, recover calls, and book the next job.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex w-full min-w-0 flex-col gap-3 sm:flex-row">
                <a
                  href="/pricing#ai-office-map"
                  className="inline-flex items-center justify-center rounded-full bg-[#0caf58] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(12,175,88,0.24)] transition hover:bg-[#098f49]"
                >
                  Book the AI Office Map
                </a>
                <a
                  href="/invoicing-delay-cash-flow-calculator"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-[#071f1a] transition hover:border-[#0caf58]"
                >
                  Try the calculator first
                </a>
              </div>
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <AssetCard className="flex min-h-[210px] items-center justify-center sm:min-h-[260px]">
                <MonthlyImpactCashCompositeAsset width={340} priority />
              </AssetCard>
              <div className="rounded-[1.75rem] border border-[#cfe8d8] bg-[#eef9e9] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#10713e]">One revenue loop</p>
                <div className="mt-5 space-y-3">
                  {outcomes.map((outcome) => (
                    <div key={outcome} className="flex gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#071f1a] shadow-sm">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0caf58]" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[2rem] border border-[#cfe8d8] bg-[#eef9e9] p-4 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <AssetCard className="flex min-h-[150px] items-center justify-center sm:min-h-[180px]">
                <DormantCustomerListCompositeAsset width={280} priority />
              </AssetCard>
              <AssetCard className="mx-auto flex h-24 w-24 items-center justify-center rounded-full p-3 lg:h-28 lg:w-28">
                <FlowArrowCompositeAsset width={82} priority />
              </AssetCard>
              <AssetCard className="flex min-h-[150px] items-center justify-center sm:min-h-[180px]">
                <BenefitCheckCompositeAsset width={280} priority />
              </AssetCard>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {packageSteps.map(({ eyebrow, title, copy, Component, assetWidth }) => (
              <article key={title} className="min-w-0 rounded-[1.75rem] border border-slate-100 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
                <div className="flex min-h-[112px] min-w-0 items-center justify-center overflow-hidden rounded-[1.35rem] bg-white sm:min-h-[150px]">
                  <Component width={assetWidth} priority />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0caf58]">{eyebrow}</p>
                  <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[#071f1a]">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div className="max-w-full rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0caf58]">What the owner sees</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#071f1a] sm:text-3xl">
                Old customers feed the next job instead of sitting in the database.
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-650">
                The owner sees the next job path clearly: past customers get reactivated, happy customers leave proof, referrals get easier, and missed calls get followed up before they become lost work.
              </p>
            </div>
            <AssetCard className="flex min-h-[190px] items-center justify-center sm:min-h-[240px]">
              <MissedCallRecoveredCardCompositeAsset width={340} priority />
            </AssetCard>
          </div>
        </div>
      </div>
    </section>
  )
}
