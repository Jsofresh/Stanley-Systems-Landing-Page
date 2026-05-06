import { readFileSync } from 'node:fs'
import type { ReactNode } from 'react'
import { CheckCircleDisplayAsset, DollarCircleDisplayAsset, FileEstimateDisplayAsset, FileInvoiceDisplayAsset, MessageBubbleDisplayAsset, PhoneMissedDisplayAsset, ShieldCheckDisplayAsset, TrendUpDisplayAsset, UserDisplayAsset, UsersDisplayAsset, CompletedJobBadgeDisplayAsset, PaidJobBadgeDisplayAsset, OfficeAlertBadgeDisplayAsset, CustomerReactivationCheckDisplayAsset, RepeatCustomerLoopDisplayAsset, InvoiceDelayClockDisplayAsset, BrokenHandoffBadgeDisplayAsset, ManualHandoffBadgeDisplayAsset, OpenBalanceFollowUpBadgeDisplayAsset, EstimateNextStepBadgeDisplayAsset, PaymentReceivedBadgeDisplayAsset, CashCollectedBadgeDisplayAsset, CalendarCashflowTrendDisplayAsset, RepeatCustomerCycleDisplayAsset, MoneyLeakRoutingDisplayAsset, InvoiceEditDisplayAsset, TargetClickDisplayAsset, PaymentHoldDisplayAsset, DelayedInvoiceDisplayAsset } from '@/components/visual-kit'

const references = {
  'check-circle': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/check-circle.png',
  ).toString('base64'),
  'dollar-circle': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/dollar-circle.png',
  ).toString('base64'),
  'file-estimate': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/file-estimate.png',
  ).toString('base64'),
  'file-invoice': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/file-invoice.png',
  ).toString('base64'),
  'message-bubble': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/message-bubble.png',
  ).toString('base64'),
  'phone-missed': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/phone-missed.png',
  ).toString('base64'),
  'shield-check': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/shield-check.png',
  ).toString('base64'),
  'trend-up': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/trend-up.png',
  ).toString('base64'),
  'user': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/user.png',
  ).toString('base64'),
  'users': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/users.png',
  ).toString('base64'),
  'completed-job-badge': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/completed-job-badge.png',
  ).toString('base64'),
  'paid-job-badge': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/paid-job-badge.png',
  ).toString('base64'),
  'office-alert-badge': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/office-alert-badge.png',
  ).toString('base64'),
  'customer-reactivation-check': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/customer-reactivation-check.png',
  ).toString('base64'),
  'repeat-customer-loop': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/repeat-customer-loop.png',
  ).toString('base64'),
  'invoice-delay-clock': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/invoice-delay-clock.png',
  ).toString('base64'),
  'broken-handoff-badge': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/broken-handoff-badge.png',
  ).toString('base64'),
  'manual-handoff-badge': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/manual-handoff-badge.png',
  ).toString('base64'),
  'open-balance-follow-up-badge': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/open-balance-follow-up-badge.png',
  ).toString('base64'),
  'estimate-next-step-badge': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/estimate-next-step-badge.png',
  ).toString('base64'),
  'payment-received-badge': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/payment-received-badge.png',
  ).toString('base64'),
  'cash-collected-badge': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/primitives/cash-collected-badge.png',
  ).toString('base64'),

  'calendar-cashflow-trend': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/supplemental/icon-candidates/calendar-cashflow-trend-icon.png',
  ).toString('base64'),
  'repeat-customer-cycle': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/supplemental/icon-candidates/repeat-customer-cycle-icon.png',
  ).toString('base64'),
  'money-leak-routing': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/supplemental/icon-candidates/money-leak-routing-icon.png',
  ).toString('base64'),
  'invoice-edit': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/supplemental/icon-candidates/invoice-edit-icon.png',
  ).toString('base64'),
  'target-click': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/supplemental/icon-candidates/target-click-icon.png',
  ).toString('base64'),
  'payment-hold': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/supplemental/icon-candidates/payment-hold-icon.png',
  ).toString('base64'),
  'delayed-invoice': readFileSync(
    '/home/jaden/.openclaw/workspace/project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/supplemental/icon-candidates/delayed-invoice-icon.png',
  ).toString('base64'),
}

const assets = [

  {
    name: 'CalendarCashflowTrendDisplayAsset',
    sourceLabel: 'calendar-cashflow-trend-icon.png',
    sourceData: `data:image/png;base64,${references['calendar-cashflow-trend']}`,
    publicAsset: '/visual-kit/display-assets/calendar-cashflow-trend-display.png',
    transparency: 'transparent background, tightly cropped',
    batch: 'Transparent icon candidates / Saver 7',
    Component: CalendarCashflowTrendDisplayAsset,
  },
  {
    name: 'RepeatCustomerCycleDisplayAsset',
    sourceLabel: 'repeat-customer-cycle-icon.png',
    sourceData: `data:image/png;base64,${references['repeat-customer-cycle']}`,
    publicAsset: '/visual-kit/display-assets/repeat-customer-cycle-display.png',
    transparency: 'transparent background, tightly cropped',
    batch: 'Transparent icon candidates / Saver 7',
    Component: RepeatCustomerCycleDisplayAsset,
  },
  {
    name: 'MoneyLeakRoutingDisplayAsset',
    sourceLabel: 'money-leak-routing-icon.png',
    sourceData: `data:image/png;base64,${references['money-leak-routing']}`,
    publicAsset: '/visual-kit/display-assets/money-leak-routing-display.png',
    transparency: 'transparent background, tightly cropped',
    batch: 'Transparent icon candidates / Saver 7',
    Component: MoneyLeakRoutingDisplayAsset,
  },
  {
    name: 'InvoiceEditDisplayAsset',
    sourceLabel: 'invoice-edit-icon.png',
    sourceData: `data:image/png;base64,${references['invoice-edit']}`,
    publicAsset: '/visual-kit/display-assets/invoice-edit-display.png',
    transparency: 'transparent background, tightly cropped',
    batch: 'Transparent icon candidates / Saver 7',
    Component: InvoiceEditDisplayAsset,
  },
  {
    name: 'TargetClickDisplayAsset',
    sourceLabel: 'target-click-icon.png',
    sourceData: `data:image/png;base64,${references['target-click']}`,
    publicAsset: '/visual-kit/display-assets/target-click-display.png',
    transparency: 'transparent background, tightly cropped',
    batch: 'Transparent icon candidates / Saver 7 — only target primitive kept',
    Component: TargetClickDisplayAsset,
  },
  {
    name: 'PaymentHoldDisplayAsset',
    sourceLabel: 'payment-hold-icon.png',
    sourceData: `data:image/png;base64,${references['payment-hold']}`,
    publicAsset: '/visual-kit/display-assets/payment-hold-display.png',
    transparency: 'transparent background, tightly cropped',
    batch: 'Transparent icon candidates / Saver 7',
    Component: PaymentHoldDisplayAsset,
  },
  {
    name: 'DelayedInvoiceDisplayAsset',
    sourceLabel: 'delayed-invoice-icon.png',
    sourceData: `data:image/png;base64,${references['delayed-invoice']}`,
    publicAsset: '/visual-kit/display-assets/delayed-invoice-display.png',
    transparency: 'transparent background, tightly cropped',
    batch: 'Transparent icon candidates / Saver 7',
    Component: DelayedInvoiceDisplayAsset,
  },
  {
    name: 'CheckCircleDisplayAsset',
    sourceLabel: 'check-circle.png',
    sourceData: `data:image/png;base64,${references['check-circle']}`,
    publicAsset: '/visual-kit/display-assets/check-circle-display.png',
    transparency: 'opaque white background',
    batch: 'Original approved primitive',
    Component: CheckCircleDisplayAsset,
  },
  {
    name: 'DollarCircleDisplayAsset',
    sourceLabel: 'dollar-circle.png',
    sourceData: `data:image/png;base64,${references['dollar-circle']}`,
    publicAsset: '/visual-kit/display-assets/dollar-circle-display.png',
    transparency: 'opaque white background',
    batch: 'Original approved primitive',
    Component: DollarCircleDisplayAsset,
  },
  {
    name: 'FileEstimateDisplayAsset',
    sourceLabel: 'file-estimate.png',
    sourceData: `data:image/png;base64,${references['file-estimate']}`,
    publicAsset: '/visual-kit/display-assets/file-estimate-display.png',
    transparency: 'opaque white background',
    batch: 'Original approved primitive',
    Component: FileEstimateDisplayAsset,
  },
  {
    name: 'FileInvoiceDisplayAsset',
    sourceLabel: 'file-invoice.png',
    sourceData: `data:image/png;base64,${references['file-invoice']}`,
    publicAsset: '/visual-kit/display-assets/file-invoice-display.png',
    transparency: 'opaque white background',
    batch: 'Original approved primitive',
    Component: FileInvoiceDisplayAsset,
  },
  {
    name: 'MessageBubbleDisplayAsset',
    sourceLabel: 'message-bubble.png',
    sourceData: `data:image/png;base64,${references['message-bubble']}`,
    publicAsset: '/visual-kit/display-assets/message-bubble-display.png',
    transparency: 'opaque white background',
    batch: 'Original approved primitive',
    Component: MessageBubbleDisplayAsset,
  },
  {
    name: 'PhoneMissedDisplayAsset',
    sourceLabel: 'phone-missed.png',
    sourceData: `data:image/png;base64,${references['phone-missed']}`,
    publicAsset: '/visual-kit/display-assets/phone-missed-display.png',
    transparency: 'opaque white background',
    batch: 'Original approved primitive',
    Component: PhoneMissedDisplayAsset,
  },
  {
    name: 'ShieldCheckDisplayAsset',
    sourceLabel: 'shield-check.png',
    sourceData: `data:image/png;base64,${references['shield-check']}`,
    publicAsset: '/visual-kit/display-assets/shield-check-display.png',
    transparency: 'opaque white background',
    batch: 'Original approved primitive',
    Component: ShieldCheckDisplayAsset,
  },
  {
    name: 'TrendUpDisplayAsset',
    sourceLabel: 'trend-up.png',
    sourceData: `data:image/png;base64,${references['trend-up']}`,
    publicAsset: '/visual-kit/display-assets/trend-up-display.png',
    transparency: 'opaque white background',
    batch: 'Original approved primitive',
    Component: TrendUpDisplayAsset,
  },
  {
    name: 'UserDisplayAsset',
    sourceLabel: 'user.png',
    sourceData: `data:image/png;base64,${references['user']}`,
    publicAsset: '/visual-kit/display-assets/user-display.png',
    transparency: 'opaque white background',
    batch: 'Original approved primitive',
    Component: UserDisplayAsset,
  },
  {
    name: 'UsersDisplayAsset',
    sourceLabel: 'users.png',
    sourceData: `data:image/png;base64,${references['users']}`,
    publicAsset: '/visual-kit/display-assets/users-display.png',
    transparency: 'opaque white background',
    batch: 'Original approved primitive',
    Component: UsersDisplayAsset,
  },
  {
    name: 'CompletedJobBadgeDisplayAsset',
    sourceLabel: 'completed-job-badge.png',
    sourceData: `data:image/png;base64,${references['completed-job-badge']}`,
    publicAsset: '/visual-kit/display-assets/completed-job-badge-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: CompletedJobBadgeDisplayAsset,
  },
  {
    name: 'PaidJobBadgeDisplayAsset',
    sourceLabel: 'paid-job-badge.png',
    sourceData: `data:image/png;base64,${references['paid-job-badge']}`,
    publicAsset: '/visual-kit/display-assets/paid-job-badge-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: PaidJobBadgeDisplayAsset,
  },
  {
    name: 'OfficeAlertBadgeDisplayAsset',
    sourceLabel: 'office-alert-badge.png',
    sourceData: `data:image/png;base64,${references['office-alert-badge']}`,
    publicAsset: '/visual-kit/display-assets/office-alert-badge-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: OfficeAlertBadgeDisplayAsset,
  },
  {
    name: 'CustomerReactivationCheckDisplayAsset',
    sourceLabel: 'customer-reactivation-check.png',
    sourceData: `data:image/png;base64,${references['customer-reactivation-check']}`,
    publicAsset: '/visual-kit/display-assets/customer-reactivation-check-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: CustomerReactivationCheckDisplayAsset,
  },
  {
    name: 'RepeatCustomerLoopDisplayAsset',
    sourceLabel: 'repeat-customer-loop.png',
    sourceData: `data:image/png;base64,${references['repeat-customer-loop']}`,
    publicAsset: '/visual-kit/display-assets/repeat-customer-loop-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: RepeatCustomerLoopDisplayAsset,
  },
  {
    name: 'InvoiceDelayClockDisplayAsset',
    sourceLabel: 'invoice-delay-clock.png',
    sourceData: `data:image/png;base64,${references['invoice-delay-clock']}`,
    publicAsset: '/visual-kit/display-assets/invoice-delay-clock-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: InvoiceDelayClockDisplayAsset,
  },
  {
    name: 'BrokenHandoffBadgeDisplayAsset',
    sourceLabel: 'broken-handoff-badge.png',
    sourceData: `data:image/png;base64,${references['broken-handoff-badge']}`,
    publicAsset: '/visual-kit/display-assets/broken-handoff-badge-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: BrokenHandoffBadgeDisplayAsset,
  },
  {
    name: 'ManualHandoffBadgeDisplayAsset',
    sourceLabel: 'manual-handoff-badge.png',
    sourceData: `data:image/png;base64,${references['manual-handoff-badge']}`,
    publicAsset: '/visual-kit/display-assets/manual-handoff-badge-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: ManualHandoffBadgeDisplayAsset,
  },
  {
    name: 'OpenBalanceFollowUpBadgeDisplayAsset',
    sourceLabel: 'open-balance-follow-up-badge.png',
    sourceData: `data:image/png;base64,${references['open-balance-follow-up-badge']}`,
    publicAsset: '/visual-kit/display-assets/open-balance-follow-up-badge-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: OpenBalanceFollowUpBadgeDisplayAsset,
  },
  {
    name: 'EstimateNextStepBadgeDisplayAsset',
    sourceLabel: 'estimate-next-step-badge.png',
    sourceData: `data:image/png;base64,${references['estimate-next-step-badge']}`,
    publicAsset: '/visual-kit/display-assets/estimate-next-step-badge-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: EstimateNextStepBadgeDisplayAsset,
  },
  {
    name: 'PaymentReceivedBadgeDisplayAsset',
    sourceLabel: 'payment-received-badge.png',
    sourceData: `data:image/png;base64,${references['payment-received-badge']}`,
    publicAsset: '/visual-kit/display-assets/payment-received-badge-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: PaymentReceivedBadgeDisplayAsset,
  },
  {
    name: 'CashCollectedBadgeDisplayAsset',
    sourceLabel: 'cash-collected-badge.png',
    sourceData: `data:image/png;base64,${references['cash-collected-badge']}`,
    publicAsset: '/visual-kit/display-assets/cash-collected-badge-display.png',
    transparency: 'opaque white background',
    batch: 'Batch 2 / newest approved primitive',
    Component: CashCollectedBadgeDisplayAsset,
  },
]

function SamplePanel({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-slate-200 p-5 ${className}`}>
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="flex min-h-[132px] items-center justify-center">{children}</div>
    </div>
  )
}

export default function VisualKitDisplayAssetsPreview() {
  const totalAssets = assets.length
  const newAssets = assets.filter((asset) => asset.batch.startsWith('Batch 2') || asset.batch.startsWith('Transparent icon candidates')).length

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7faf7] px-4 py-10 text-slate-950 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0caf58]">Internal preview / non-production</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Stanley visual-kit display assets</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            All {totalAssets} canonical primitive display assets are shown here: the original 10, Batch 2, and the Saver 7 transparent icon candidates. These are raster production display assets wrapped in reusable React components, not hand-coded SVG recreations.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
            <span className="rounded-full bg-[#eef9e9] px-4 py-2">Total canonical primitive display assets: {totalAssets}</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">Batch 2 + transparent icon expansion: {newAssets}</span>
          </div>
        </header>

        {assets.map(({ name, sourceLabel, sourceData, publicAsset, transparency, batch, Component }) => (
          <section key={name} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0caf58]">{batch}</p>
                <h2 className="mt-2 break-words text-2xl font-semibold tracking-tight [overflow-wrap:anywhere] sm:text-3xl">{name}</h2>
              </div>
              <div className="space-y-1 text-sm text-slate-500 md:text-right">
                <p>Source: {sourceLabel}</p>
                <p>Transparency: <span className="font-semibold text-slate-700">{transparency}</span></p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-4">
              <SamplePanel label="1. Source reference">
                <img src={sourceData} alt={`${name} source reference`} style={{ width: 96, height: 96, objectFit: 'contain' }} />
              </SamplePanel>

              <SamplePanel label="2. Public copied production asset">
                <img src={publicAsset} alt={`${name} copied public asset`} style={{ width: 96, height: 96, objectFit: 'contain' }} />
              </SamplePanel>

              <SamplePanel label="3. Rendered component, 64px">
                <Component decorative={false} alt={`${name} component at 64 pixels`} size={64} />
              </SamplePanel>

              <SamplePanel label="4. Rendered component, 96px">
                <Component decorative={false} alt={`${name} component at 96 pixels`} size={96} priority />
              </SamplePanel>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <SamplePanel label="5. Component on white" className="bg-white">
                <Component size={96} />
              </SamplePanel>

              <SamplePanel label="6. Component on pale green" className="bg-[#eef9e9]">
                <Component size={96} />
              </SamplePanel>

              <SamplePanel label="7. Component on very light gray" className="bg-[#f1f5f9]">
                <Component size={96} />
              </SamplePanel>
            </div>

            <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              8. Transparency status: <span className="font-semibold text-slate-800">{transparency}</span>. If opaque, use on white surfaces now; transparent regeneration is recommended before colored-section integration.
            </p>
          </section>
        ))}
      </div>
    </main>
  )
}
