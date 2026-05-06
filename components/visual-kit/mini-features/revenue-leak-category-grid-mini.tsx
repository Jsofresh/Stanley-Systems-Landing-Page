import type { ComponentType } from 'react'
import {
  BrokenHandoffBadgeDisplayAsset,
  EstimateNextStepBadgeDisplayAsset,
  InvoiceDelayClockDisplayAsset,
  OpenBalanceFollowUpBadgeDisplayAsset,
  type DisplayAssetProps,
} from '@/components/visual-kit/display-assets'

type LeakCategory = {
  title: string
  description: string
  amount: string
  Asset: ComponentType<DisplayAssetProps>
}

const categories: LeakCategory[] = [
  {
    title: 'Delayed invoice',
    description: 'Completed work waits before a bill goes out.',
    amount: '$3.6k',
    Asset: InvoiceDelayClockDisplayAsset,
  },
  {
    title: 'Open estimate',
    description: 'Quoted jobs go quiet without a clear next step.',
    amount: '$7.2k',
    Asset: EstimateNextStepBadgeDisplayAsset,
  },
  {
    title: 'Manual handoff',
    description: 'Office notes move by memory instead of a system.',
    amount: '$2.1k',
    Asset: BrokenHandoffBadgeDisplayAsset,
  },
  {
    title: 'Missed follow-up',
    description: 'Good customers are not contacted while intent is fresh.',
    amount: '$4.8k',
    Asset: OpenBalanceFollowUpBadgeDisplayAsset,
  },
]

export function RevenueLeakCategoryGridMini() {
  return (
    <article className="@container w-full overflow-hidden rounded-[1.5rem] border border-[#DED6C8] bg-white p-4 text-[#102033] shadow-[0_18px_55px_rgba(16,32,51,0.09)] @md:p-5">
      <div className="flex flex-col gap-2 @lg:flex-row @lg:items-end @lg:justify-between">
        <div>
          <p className="text-[0.68rem] font-bold uppercase leading-none tracking-[0.16em] text-[#15803D]">
            Leak source map
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-[#071421]">Where revenue slows down</h3>
        </div>
        <p className="text-sm font-semibold text-[#15803D]">$17.7k exposed</p>
      </div>

      <div className="mt-4 grid gap-3 @lg:grid-cols-2">
        {categories.map(({ title, description, amount, Asset }) => (
          <div
            key={title}
            className="group min-w-0 rounded-[1.15rem] border border-[#ECE4D8] bg-[#FBF8F2] p-3 transition-colors hover:border-[#C9EED4] hover:bg-[#F6FCF8]"
          >
            <div className="flex items-start gap-3">
              <Asset size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-[#102033]">{title}</p>
                  <p className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-[#15803D] shadow-sm">
                    {amount}
                  </p>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#667085]">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
