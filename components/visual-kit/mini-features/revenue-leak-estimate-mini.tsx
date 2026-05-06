import type { ComponentType } from 'react'
import {
  DollarCircleDisplayAsset,
  FileEstimateDisplayAsset,
  FileInvoiceDisplayAsset,
  MessageBubbleDisplayAsset,
  type DisplayAssetProps,
} from '@/components/visual-kit/display-assets'

type LeakRow = {
  label: string
  amount: string
  note: string
  Asset: ComponentType<DisplayAssetProps>
}

const leakRows: LeakRow[] = [
  {
    label: 'Missed follow-up',
    amount: '$4,800',
    note: 'Jobs quoted, then left waiting',
    Asset: MessageBubbleDisplayAsset,
  },
  {
    label: 'Open estimates',
    amount: '$7,200',
    note: 'Ready work without a next step',
    Asset: FileEstimateDisplayAsset,
  },
  {
    label: 'Delayed billing',
    amount: '$3,600',
    note: 'Finished work not invoiced fast enough',
    Asset: FileInvoiceDisplayAsset,
  },
]

export function RevenueLeakEstimateMini() {
  return (
    <article className="@container w-full overflow-hidden rounded-[1.5rem] border border-[#DED6C8] bg-[#FBF8F2] p-4 text-[#102033] shadow-[0_18px_55px_rgba(16,32,51,0.10)] @md:p-5">
      <div className="rounded-[1.25rem] border border-[#ECE4D8] bg-white p-4 shadow-[0_10px_30px_rgba(16,32,51,0.06)] @md:p-5">
        <div className="flex flex-col gap-4 @lg:flex-row @lg:items-start @lg:justify-between">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-bold uppercase leading-none tracking-[0.16em] text-[#15803D]">
              Estimated monthly leak
            </p>
            <p className="mt-3 text-[2.6rem] font-semibold leading-none tracking-tight text-[#071421] @lg:text-6xl">
              $15,600
            </p>
            <p className="mt-3 max-w-[28rem] text-sm leading-6 text-[#667085]">
              Money sitting in follow-up gaps, unfinished estimates, and slow invoice handoffs.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[#DDF7E8] bg-[#F4FBF6] p-3">
            <DollarCircleDisplayAsset size="md" />
            <div>
              <p className="text-xs font-bold uppercase leading-none tracking-[0.12em] text-[#15803D]">Leak check</p>
              <p className="mt-2 text-sm font-semibold text-[#102033]">3 office gaps found</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 @xl:grid-cols-3">
        {leakRows.map(({ label, amount, note, Asset }) => (
          <div key={label} className="flex min-w-0 items-center gap-3 rounded-[1.15rem] border border-[#ECE4D8] bg-white p-3">
            <Asset size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#102033]">{label}</p>
              <p className="mt-1 text-xl font-semibold leading-none tracking-tight text-[#071421]">{amount}</p>
              <p className="mt-1 text-xs leading-5 text-[#667085]">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
