import {
  ApprovedHandoffDisplayAsset,
  BillingCheckDisplayAsset,
  BillingScheduleDisplayAsset,
  CashApprovedDisplayAsset,
  CashStackDisplayAsset,
  CompletedJobDisplayAsset,
  FirstFixWrenchDisplayAsset,
  InactiveCustomersDisplayAsset,
  InvoiceApprovedDisplayAsset,
  InvoiceSentDisplayAsset,
  MoneyLeakMapDisplayAsset,
  MonthlyImpactTrendDisplayAsset,
  OfficeAlertDisplayAsset,
  OfficeReworkDisplayAsset,
  PaymentApprovedDisplayAsset,
  ReferralNetworkDisplayAsset,
  ResultCheckDisplayAsset,
  ReviewGrowthDisplayAsset,
  type DisplayAssetProps,
} from '@/components/visual-kit/display-assets'

const newest18: Array<{
  file: string
  component: string
  source: string
  role: string
  Component: (props: DisplayAssetProps) => JSX.Element
}> = [
  {
    file: 'cash-stack-display.png',
    component: 'CashStackDisplayAsset',
    source: 'file_555---d03e9d94-9a25-4d17-bb00-01bd2c370e1e.jpg',
    role: 'Cash / money bills',
    Component: CashStackDisplayAsset,
  },
  {
    file: 'approved-handoff-display.png',
    component: 'ApprovedHandoffDisplayAsset',
    source: 'file_556---2e56c810-fa38-4f78-82f0-623ba2e58e02.jpg',
    role: 'Approved handoff / verified exchange',
    Component: ApprovedHandoffDisplayAsset,
  },
  {
    file: 'first-fix-wrench-display.png',
    component: 'FirstFixWrenchDisplayAsset',
    source: 'file_557---305a758c-13db-4b61-99a1-ca1eafd4f0b5.jpg',
    role: 'First fix / wrench check',
    Component: FirstFixWrenchDisplayAsset,
  },
  {
    file: 'inactive-customers-display.png',
    component: 'InactiveCustomersDisplayAsset',
    source: 'file_558---9b314ca8-1963-4878-b841-09fb97e72133.jpg',
    role: 'Inactive customers / customer split',
    Component: InactiveCustomersDisplayAsset,
  },
  {
    file: 'office-rework-display.png',
    component: 'OfficeReworkDisplayAsset',
    source: 'file_559---932bf258-7d85-40fa-803b-8d399ca28ace.jpg',
    role: 'Office rework / time-money cost',
    Component: OfficeReworkDisplayAsset,
  },
  {
    file: 'money-leak-map-display.png',
    component: 'MoneyLeakMapDisplayAsset',
    source: 'file_560---f04206ee-8b46-4a57-876e-a0fd6994b013.jpg',
    role: 'Money Leak Map / report',
    Component: MoneyLeakMapDisplayAsset,
  },
  {
    file: 'billing-schedule-display.png',
    component: 'BillingScheduleDisplayAsset',
    source: 'file_561---c0d5f2e8-20f5-4c16-b125-2296be89c81f.jpg',
    role: 'Billing schedule / timed payment row',
    Component: BillingScheduleDisplayAsset,
  },
  {
    file: 'result-check-display.png',
    component: 'ResultCheckDisplayAsset',
    source: 'file_562---ceccc2b9-c419-45ec-a31e-e4de798c5f6f.jpg',
    role: 'Result check / approved outcome',
    Component: ResultCheckDisplayAsset,
  },
  {
    file: 'monthly-impact-trend-display.png',
    component: 'MonthlyImpactTrendDisplayAsset',
    source: 'file_563---b2f45e37-99a5-4c4a-82cb-4c9936791fe1.jpg',
    role: 'Monthly impact / growth trend',
    Component: MonthlyImpactTrendDisplayAsset,
  },
  {
    file: 'cash-approved-display.png',
    component: 'CashApprovedDisplayAsset',
    source: 'file_564---b2f5843b-c3a8-4e3d-a34d-879e9edaa221.jpg',
    role: 'Cash approved / payment verified',
    Component: CashApprovedDisplayAsset,
  },
  {
    file: 'invoice-sent-display.png',
    component: 'InvoiceSentDisplayAsset',
    source: 'file_565---d66929fb-e19c-4028-ae54-7612edf1cacd.jpg',
    role: 'Invoice sent / document forwarded',
    Component: InvoiceSentDisplayAsset,
  },
  {
    file: 'invoice-approved-display.png',
    component: 'InvoiceApprovedDisplayAsset',
    source: 'file_566---22778827-b116-4f99-965f-21180dd7e682.jpg',
    role: 'Invoice approved / financial document check',
    Component: InvoiceApprovedDisplayAsset,
  },
  {
    file: 'billing-check-display.png',
    component: 'BillingCheckDisplayAsset',
    source: 'file_567---49e747e7-cb53-47b9-9dc3-a0b24ecfd809.jpg',
    role: 'Billing check / payment checklist',
    Component: BillingCheckDisplayAsset,
  },
  {
    file: 'review-growth-display.png',
    component: 'ReviewGrowthDisplayAsset',
    source: 'file_568---a57fe323-4063-4b71-aea9-8c843dbeac5c.jpg',
    role: 'Review growth / review booster',
    Component: ReviewGrowthDisplayAsset,
  },
  {
    file: 'referral-network-display.png',
    component: 'ReferralNetworkDisplayAsset',
    source: 'file_569---64bb9ac4-6998-4528-a85f-d5a81dfaa2a3.jpg',
    role: 'Referral network / referral engine',
    Component: ReferralNetworkDisplayAsset,
  },
  {
    file: 'office-alert-display.png',
    component: 'OfficeAlertDisplayAsset',
    source: 'file_570---2ec6784f-5557-463c-a634-3aa9f06e052b.jpg',
    role: 'Office alert / notification bell',
    Component: OfficeAlertDisplayAsset,
  },
  {
    file: 'payment-approved-display.png',
    component: 'PaymentApprovedDisplayAsset',
    source: 'file_571---9126d489-c51a-4e5a-979c-11f3a3c04c0b.jpg',
    role: 'Payment approved / card cash check',
    Component: PaymentApprovedDisplayAsset,
  },
  {
    file: 'completed-job-display.png',
    component: 'CompletedJobDisplayAsset',
    source: 'file_572---dfd9d4c1-8258-47ee-81d1-b94929b9e24b.jpg',
    role: 'Completed job / briefcase check',
    Component: CompletedJobDisplayAsset,
  },
]

export default function Newest18VisualKitPreviewPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7faf7] px-4 py-10 text-[#102033] sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[2rem] border border-[#dce8dc] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#15803D]">Internal preview / non-production</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Newest 18 Stanley display primitives</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            These are transparent, cropped PNG display assets processed from Jaden’s 18 JPG source files. Labels and UI copy remain DOM text; these are only visual primitives.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newest18.map(({ file, component, source, role, Component }) => (
            <article key={file} className="rounded-[1.5rem] border border-[#dce8dc] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex min-h-36 items-center justify-center rounded-2xl bg-white ring-1 ring-[#e5eadf]">
                  <Component size={120} decorative priority />
                </div>
                <div className="flex min-h-36 items-center justify-center rounded-2xl bg-[#eef9f2] ring-1 ring-[#cfe8d5]">
                  <Component size={120} decorative priority />
                </div>
              </div>
              <h2 className="mt-4 break-words text-lg font-bold leading-tight [overflow-wrap:anywhere]">{component}</h2>
              <p className="mt-1 text-sm font-semibold text-[#15803D]">{role}</p>
              <p className="mt-3 break-words rounded-xl bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500 [overflow-wrap:anywhere]">
                File: {file}<br />Source: {source}
              </p>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}
