import {
  CustomerReactivationCheckDisplayAsset,
  MessageBubbleDisplayAsset,
  PhoneMissedDisplayAsset,
  RepeatCustomerLoopDisplayAsset,
  TrendUpDisplayAsset,
  UsersDisplayAsset,
} from '@/components/visual-kit/display-assets'

import { CustomerRevenueStepCard } from './customer-revenue-step-card'

const customerRevenueSteps = [
  {
    step: '01',
    title: 'Bring past customers back',
    line: 'Find old customers and give them a reason to book again.',
    label: 'Old customers',
    visual: <CustomerReactivationCheckDisplayAsset size={44} priority />,
  },
  {
    step: '02',
    title: 'Send the next job prompt',
    line: 'Turn seasonal needs into booked work.',
    label: 'Text prompt',
    visual: <MessageBubbleDisplayAsset size={44} priority />,
  },
  {
    step: '03',
    title: 'Collect fresh reviews',
    line: 'Ask while the job is still fresh.',
    label: 'Fresh reviews',
    visual: <TrendUpDisplayAsset size={44} priority />,
  },
  {
    step: '04',
    title: 'Create referral chances',
    line: 'Give happy customers an easy way to send the next lead.',
    label: 'Referral chances',
    visual: <UsersDisplayAsset size={44} priority />,
  },
  {
    step: '05',
    title: 'Recover missed calls',
    line: 'Catch calls before they become lost jobs.',
    label: 'Recovered calls',
    visual: <PhoneMissedDisplayAsset size={44} priority />,
  },
]

type CustomerRevenueLoopMiniProps = {
  className?: string
}

export function CustomerRevenueLoopMini({ className = '' }: CustomerRevenueLoopMiniProps) {
  return (
    <div id="customer-revenue-system-v4-flow" className={['relative min-w-0', className].join(' ')}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 right-8 top-1/2 z-0 hidden h-px -translate-y-1/2 bg-[#b7dcc1] lg:block"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-8 right-8 top-1/2 z-0 hidden h-8 -translate-y-1/2 overflow-visible lg:block"
        viewBox="0 0 1000 32"
        preserveAspectRatio="none"
      >
        <path
          d="M8 16 C 116 2, 184 30, 292 16 S 472 2, 580 16 S 760 30, 868 16 S 948 8, 992 16"
          fill="none"
          stroke="#15803D"
          strokeDasharray="8 10"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>

      <div className="grid gap-3 lg:grid-cols-5 lg:gap-3">
        {customerRevenueSteps.map((item) => (
          <CustomerRevenueStepCard
            key={item.step}
            step={item.step}
            title={item.title}
            line={item.line}
            visual={item.visual}
            compact
            className="lg:block lg:p-4"
          />
        ))}
      </div>

      <div className="mt-3 hidden grid-cols-5 gap-3 text-center text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#15803D] lg:grid">
        {customerRevenueSteps.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 rounded-[1.25rem] border border-[#d8eadc] bg-[#f2fbf1] px-4 py-3 text-sm font-semibold text-[#102033]">
        <RepeatCustomerLoopDisplayAsset size={38} priority />
        <span>One loop that turns past work into the next booked job.</span>
      </div>
    </div>
  )
}
