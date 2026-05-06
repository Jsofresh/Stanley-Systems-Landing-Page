import type { ComponentType } from 'react'
import {
  CheckCircleDisplayAsset,
  ManualHandoffBadgeDisplayAsset,
  ShieldCheckDisplayAsset,
  TrendUpDisplayAsset,
  type DisplayAssetProps,
} from '@/components/visual-kit/display-assets'

type ProofStep = {
  eyebrow: string
  title: string
  detail: string
  Asset: ComponentType<DisplayAssetProps>
}

const proofSteps: ProofStep[] = [
  {
    eyebrow: 'Input',
    title: 'Office gap found',
    detail: 'Manual handoffs and stuck follow-up are captured.',
    Asset: ManualHandoffBadgeDisplayAsset,
  },
  {
    eyebrow: 'Stanley step',
    title: 'Audit layer confirms it',
    detail: 'The Workflow Audit turns the gap into a clean operating rule.',
    Asset: ShieldCheckDisplayAsset,
  },
  {
    eyebrow: 'Output',
    title: 'Resolved state',
    detail: 'The next owner, touch, and cash step are visible.',
    Asset: CheckCircleDisplayAsset,
  },
]

function VerticalConnector() {
  return <div className="ml-8 h-4 w-px bg-[#BFE8CC] @xl:hidden" aria-hidden="true" />
}

export function WorkflowProofMini() {
  return (
    <article className="@container w-full overflow-hidden rounded-[1.5rem] border border-[#DED6C8] bg-white p-4 text-[#102033] shadow-[0_18px_55px_rgba(16,32,51,0.09)] @md:p-5">
      <div className="flex flex-col gap-3 @xl:flex-row @xl:items-center @xl:justify-between">
        <div>
          <p className="text-[0.68rem] font-bold uppercase leading-none tracking-[0.16em] text-[#15803D]">Workflow proof</p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-[#071421]">From loose handoff to owned next step</h3>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#DDF7E8] px-3 py-2 text-xs font-bold text-[#116832]">
          <TrendUpDisplayAsset size={28} />
          Owner rescue reduced
        </div>
      </div>

      <div className="relative mt-5 grid gap-0 @xl:grid-cols-[1fr_auto_1fr_auto_1fr] @xl:items-stretch">
        {proofSteps.map(({ eyebrow, title, detail, Asset }, index) => (
          <div key={title} className="contents">
            <div className="min-w-0 rounded-[1.15rem] border border-[#ECE4D8] bg-[#FBF8F2] p-3">
              <div className="flex items-start gap-3">
                <Asset size="sm" />
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-bold uppercase leading-none tracking-[0.14em] text-[#15803D]">{eyebrow}</p>
                  <p className="mt-2 text-sm font-semibold text-[#102033]">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-[#667085]">{detail}</p>
                </div>
              </div>
            </div>
            {index < proofSteps.length - 1 ? (
              <>
                <div className="hidden items-center px-3 @xl:flex" aria-hidden="true">
                  <svg className="h-8 w-12 text-[#15803D]" viewBox="0 0 48 32" fill="none">
                    <path d="M4 16H42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M36 10L42 16L36 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <VerticalConnector />
              </>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  )
}
