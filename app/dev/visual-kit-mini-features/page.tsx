import type { ReactNode } from 'react'
import {
  CashflowPathMini,
  RevenueLeakCategoryGridMini,
  RevenueLeakEstimateMini,
  WorkflowProofMini,
} from '@/components/visual-kit/mini-features'

const previews = [
  {
    id: 'RevenueLeakEstimateMini',
    label: 'Revenue leak estimate',
    primitives: 'DollarCircleDisplayAsset, MessageBubbleDisplayAsset, FileEstimateDisplayAsset, FileInvoiceDisplayAsset',
    Component: RevenueLeakEstimateMini,
  },
  {
    id: 'RevenueLeakCategoryGridMini',
    label: 'Revenue leak category grid',
    primitives:
      'InvoiceDelayClockDisplayAsset, EstimateNextStepBadgeDisplayAsset, BrokenHandoffBadgeDisplayAsset, OpenBalanceFollowUpBadgeDisplayAsset',
    Component: RevenueLeakCategoryGridMini,
  },
  {
    id: 'CashflowPathMini',
    label: 'Cashflow path',
    primitives:
      'CompletedJobBadgeDisplayAsset, FileInvoiceDisplayAsset, OpenBalanceFollowUpBadgeDisplayAsset, PaymentReceivedBadgeDisplayAsset, CashCollectedBadgeDisplayAsset',
    Component: CashflowPathMini,
  },
  {
    id: 'WorkflowProofMini',
    label: 'Workflow proof',
    primitives: 'ManualHandoffBadgeDisplayAsset, ShieldCheckDisplayAsset, CheckCircleDisplayAsset, TrendUpDisplayAsset',
    Component: WorkflowProofMini,
  },
]

function PreviewFrame({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.5rem] border border-[#DED6C8] bg-white p-3 shadow-sm ${className}`}>
      <p className="mb-3 text-xs font-bold uppercase leading-none tracking-[0.16em] text-[#667085]">{label}</p>
      {children}
    </div>
  )
}

export default function VisualKitMiniFeaturesPreview() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EA] px-4 py-10 text-[#102033] sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[1.75rem] border border-[#DED6C8] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-bold uppercase leading-none tracking-[0.2em] text-[#15803D]">
            Internal preview / non-production
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#071421] sm:text-4xl">
            Stanley visual-kit mini feature components
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#667085]">
            Coded React and Tailwind mini features assembled from approved display primitives, real HTML text, CSS cards, and SVG connectors.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="rounded-full bg-[#DDF7E8] px-4 py-2 text-[#116832]">No blueprint image imports</span>
            <span className="rounded-full bg-[#FBF8F2] px-4 py-2 text-[#102033]">Desktop and narrow previews</span>
          </div>
        </header>

        {previews.map(({ id, label, primitives, Component }) => (
          <section key={id} className="rounded-[1.75rem] border border-[#DED6C8] bg-[#FBF8F2] p-4 shadow-sm sm:p-5">
            <div className="mb-5 flex flex-col gap-2 border-b border-[#ECE4D8] pb-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase leading-none tracking-[0.16em] text-[#15803D]">Mini feature</p>
                <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-[#071421]">
                  {label}
                </h2>
                <p className="mt-1 break-words font-mono text-xs leading-5 text-[#667085] [overflow-wrap:anywhere]">{id}</p>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-[#667085]">
                Approved primitives used: <span className="font-semibold text-[#102033]">{primitives}</span>
              </p>
            </div>

            <div className="grid items-start gap-5">
              <PreviewFrame label="Desktop width">
                <Component />
              </PreviewFrame>

              <PreviewFrame label="Narrow mobile frame" className="mx-auto w-full max-w-[390px]">
                <Component />
              </PreviewFrame>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
