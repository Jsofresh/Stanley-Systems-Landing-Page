import { readFileSync } from 'node:fs'
import type { ReactNode } from 'react'
import { BenefitCheckCompositeAsset, DormantCustomerListCompositeAsset, FlowArrowCompositeAsset, MissedCallRecoveredCardCompositeAsset, MonthlyImpactCashCompositeAsset, ReferralOpportunityCardCompositeAsset, ReviewBoosterCardCompositeAsset, SmsReactivationPhoneCompositeAsset } from '@/components/visual-kit'

const FALLBACK_REFERENCE_PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII='

function readReference(path: string) {
  try {
    return readFileSync(path).toString('base64')
  } catch {
    return FALLBACK_REFERENCE_PNG
  }
}

const references = {
  'benefit-check': readReference(
    '/home/jaden/stanley-assets/openclaw-project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/composites/benefit-check.png',
  ).toString('base64'),
  'dormant-customer-list': readReference(
    '/home/jaden/stanley-assets/openclaw-project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/composites/dormant-customer-list.png',
  ).toString('base64'),
  'flow-arrow': readReference(
    '/home/jaden/stanley-assets/openclaw-project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/composites/flow-arrow.png',
  ).toString('base64'),
  'missed-call-recovered-card': readReference(
    '/home/jaden/stanley-assets/openclaw-project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/composites/missed-call-recovered-card.png',
  ).toString('base64'),
  'monthly-impact-cash': readReference(
    '/home/jaden/stanley-assets/openclaw-project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/composites/monthly-impact-cash.png',
  ).toString('base64'),
  'referral-opportunity-card': readReference(
    '/home/jaden/stanley-assets/openclaw-project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/composites/referral-opportunity-card.png',
  ).toString('base64'),
  'review-booster-card': readReference(
    '/home/jaden/stanley-assets/openclaw-project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/composites/review-booster-card.png',
  ).toString('base64'),
  'sms-reactivation-phone': readReference(
    '/home/jaden/stanley-assets/openclaw-project/design-taste-library/references/stanley-visual-kit/2026-05-02-visual-kit-references/composites/sms-reactivation-phone.png',
  ).toString('base64'),
}

const assets = [
  {
    name: 'BenefitCheckCompositeAsset',
    sourceLabel: 'benefit-check.png',
    sourceData: `data:image/png;base64,${references['benefit-check']}`,
    publicAsset: '/visual-kit/composite-assets/benefit-check-composite.png',
    transparency: 'opaque white background',
    intrinsic: '1254 × 1254',
    normalWidth: 420,
    smallWidth: 260,
    Component: BenefitCheckCompositeAsset,
  },
  {
    name: 'DormantCustomerListCompositeAsset',
    sourceLabel: 'dormant-customer-list.png',
    sourceData: `data:image/png;base64,${references['dormant-customer-list']}`,
    publicAsset: '/visual-kit/composite-assets/dormant-customer-list-composite.png',
    transparency: 'opaque white background',
    intrinsic: '1254 × 1254',
    normalWidth: 420,
    smallWidth: 260,
    Component: DormantCustomerListCompositeAsset,
  },
  {
    name: 'FlowArrowCompositeAsset',
    sourceLabel: 'flow-arrow.png',
    sourceData: `data:image/png;base64,${references['flow-arrow']}`,
    publicAsset: '/visual-kit/composite-assets/flow-arrow-composite.png',
    transparency: 'opaque white background',
    intrinsic: '1254 × 1254',
    normalWidth: 420,
    smallWidth: 260,
    Component: FlowArrowCompositeAsset,
  },
  {
    name: 'MissedCallRecoveredCardCompositeAsset',
    sourceLabel: 'missed-call-recovered-card.png',
    sourceData: `data:image/png;base64,${references['missed-call-recovered-card']}`,
    publicAsset: '/visual-kit/composite-assets/missed-call-recovered-card-composite.png',
    transparency: 'opaque white background',
    intrinsic: '1254 × 1254',
    normalWidth: 420,
    smallWidth: 260,
    Component: MissedCallRecoveredCardCompositeAsset,
  },
  {
    name: 'MonthlyImpactCashCompositeAsset',
    sourceLabel: 'monthly-impact-cash.png',
    sourceData: `data:image/png;base64,${references['monthly-impact-cash']}`,
    publicAsset: '/visual-kit/composite-assets/monthly-impact-cash-composite.png',
    transparency: 'opaque white background',
    intrinsic: '1254 × 1254',
    normalWidth: 420,
    smallWidth: 260,
    Component: MonthlyImpactCashCompositeAsset,
  },
  {
    name: 'ReferralOpportunityCardCompositeAsset',
    sourceLabel: 'referral-opportunity-card.png',
    sourceData: `data:image/png;base64,${references['referral-opportunity-card']}`,
    publicAsset: '/visual-kit/composite-assets/referral-opportunity-card-composite.png',
    transparency: 'opaque white background',
    intrinsic: '432 × 579',
    normalWidth: 280,
    smallWidth: 190,
    Component: ReferralOpportunityCardCompositeAsset,
  },
  {
    name: 'ReviewBoosterCardCompositeAsset',
    sourceLabel: 'review-booster-card.png',
    sourceData: `data:image/png;base64,${references['review-booster-card']}`,
    publicAsset: '/visual-kit/composite-assets/review-booster-card-composite.png',
    transparency: 'opaque white background',
    intrinsic: '1254 × 1254',
    normalWidth: 420,
    smallWidth: 260,
    Component: ReviewBoosterCardCompositeAsset,
  },
  {
    name: 'SmsReactivationPhoneCompositeAsset',
    sourceLabel: 'sms-reactivation-phone.png',
    sourceData: `data:image/png;base64,${references['sms-reactivation-phone']}`,
    publicAsset: '/visual-kit/composite-assets/sms-reactivation-phone-composite.png',
    transparency: 'opaque white background',
    intrinsic: '1254 × 1254',
    normalWidth: 420,
    smallWidth: 260,
    Component: SmsReactivationPhoneCompositeAsset,
  }
]

function SamplePanel({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-slate-200 p-5 ${className}`}>
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</div>
      <div className="flex min-h-[220px] items-center justify-center overflow-hidden">{children}</div>
    </div>
  )
}

export default function VisualKitCompositeAssetsPreview() {
  const totalAssets = assets.length

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7faf7] px-4 py-10 text-slate-950 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0caf58]">Internal preview / non-production</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Stanley visual-kit composite assets</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            All {totalAssets} canonical composite references are shown here as image-backed production assets wrapped in reusable React components. These are not hand-coded SVG recreations and are not integrated into live website sections.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
            <span className="rounded-full bg-[#eef9e9] px-4 py-2">Canonical composite display assets: {totalAssets}</span>
            <span className="rounded-full bg-slate-100 px-4 py-2">PNG source preserved + WebP copies created</span>
          </div>
        </header>

        {assets.map(({ name, sourceLabel, sourceData, publicAsset, transparency, intrinsic, normalWidth, smallWidth, Component }) => (
          <section key={name} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0caf58]">Canonical composite reference</p>
                <h2 className="mt-2 break-words text-2xl font-semibold tracking-tight [overflow-wrap:anywhere] sm:text-3xl">{name}</h2>
              </div>
              <div className="space-y-1 text-sm text-slate-500 md:text-right">
                <p>Source: {sourceLabel}</p>
                <p>Intrinsic: {intrinsic}</p>
                <p>Transparency: <span className="font-semibold text-slate-700">{transparency}</span></p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <SamplePanel label="1. Source reference">
                <img src={sourceData} alt={`${name} source reference`} style={{ width: normalWidth, maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
              </SamplePanel>

              <SamplePanel label="2. Public copied production asset">
                <img src={publicAsset} alt={`${name} copied public asset`} style={{ width: normalWidth, maxWidth: '100%', height: 'auto', objectFit: 'contain' }} />
              </SamplePanel>

              <SamplePanel label="3. Rendered component, normal section/card size">
                <Component decorative={false} alt={`${name} component normal size`} width={normalWidth} priority />
              </SamplePanel>

              <SamplePanel label="4. Rendered component, smaller card size">
                <Component decorative={false} alt={`${name} component smaller size`} width={smallWidth} />
              </SamplePanel>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <SamplePanel label="5. Component on white" className="bg-white">
                <Component width={smallWidth} />
              </SamplePanel>

              <SamplePanel label="6. Component on pale green" className="bg-[#eef9e9]">
                <Component width={smallWidth} />
              </SamplePanel>

              <SamplePanel label="7. Component on very light gray" className="bg-[#f1f5f9]">
                <Component width={smallWidth} />
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
