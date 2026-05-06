import type { ComponentType } from 'react'
import {
  CashCollectedBadgeDisplayAsset,
  CompletedJobBadgeDisplayAsset,
  FileInvoiceDisplayAsset,
  OpenBalanceFollowUpBadgeDisplayAsset,
  PaymentReceivedBadgeDisplayAsset,
  type DisplayAssetProps,
} from '@/components/visual-kit/display-assets'

type CashflowStep = {
  title: string
  detail: string
  Asset: ComponentType<DisplayAssetProps>
}

const steps: CashflowStep[] = [
  {
    title: 'Job complete',
    detail: 'Field work is marked finished.',
    Asset: CompletedJobBadgeDisplayAsset,
  },
  {
    title: 'Invoice sent',
    detail: 'Billing moves before the day slips.',
    Asset: FileInvoiceDisplayAsset,
  },
  {
    title: 'Follow-up',
    detail: 'Open balance gets a clear next touch.',
    Asset: OpenBalanceFollowUpBadgeDisplayAsset,
  },
  {
    title: 'Payment received',
    detail: 'Cash lands and the job closes cleanly.',
    Asset: PaymentReceivedBadgeDisplayAsset,
  },
]

function Connector({ className = '' }: { className?: string }) {
  return (
    <svg className={`hidden h-8 w-14 shrink-0 text-[#15803D] @xl:block ${className}`} viewBox="0 0 56 32" fill="none" aria-hidden="true">
      <path
        d="M4 16C16 16 17 7 28 7C39 7 40 16 52 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M47 10L53 16L47 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CashflowPathMini() {
  return (
    <article className="@container w-full overflow-hidden rounded-[1.5rem] border border-[#DED6C8] bg-[#FBF8F2] p-4 text-[#102033] shadow-[0_18px_55px_rgba(16,32,51,0.10)] @md:p-5">
      <div className="flex flex-col gap-3 @xl:flex-row @xl:items-center @xl:justify-between">
        <div>
          <p className="text-[0.68rem] font-bold uppercase leading-none tracking-[0.16em] text-[#15803D]">Cashflow path</p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-[#071421]">Finished work to collected cash</h3>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DDF7E8] bg-white px-3 py-2 text-xs font-bold text-[#15803D] shadow-sm">
          <CashCollectedBadgeDisplayAsset size={28} />
          Cash collected
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 @xl:flex-row @xl:items-stretch">
        {steps.map(({ title, detail, Asset }, index) => (
          <div key={title} className="flex min-w-0 flex-1 flex-col @xl:flex-row @xl:items-center">
            <div className="relative flex min-w-0 flex-1 items-center gap-3 rounded-[1.15rem] border border-[#ECE4D8] bg-white p-3 shadow-[0_10px_25px_rgba(16,32,51,0.05)]">
              <span className="absolute -left-1.5 top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#15803D] @xl:block" aria-hidden="true" />
              <Asset size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#102033]">{title}</p>
                <p className="mt-1 text-xs leading-5 text-[#667085]">{detail}</p>
              </div>
            </div>
            {index < steps.length - 1 ? (
              <>
                <Connector />
                <div className="ml-6 h-5 w-px bg-[#BFE8CC] @xl:hidden" aria-hidden="true" />
              </>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  )
}
