import type * as React from 'react'

import { cn } from '../../lib/utils'

import { FlowSequence, type FlowSequenceStep } from './FlowSequence'
import { IconMedallion } from './IconMedallion'
import { PremiumCard } from './PremiumCard'
import { StanleyIcon } from './StanleyIcon'

export const repeatRevenueFlowSliceSteps = [
  {
    id: 'past-customer',
    icon: 'user',
    label: 'Past Customer',
    description: 'A finished job becomes a future relationship instead of a dead record.',
    iconTitle: 'Past Customer',
  },
  {
    id: 'review-proof',
    icon: 'message-bubble',
    label: 'Review Proof',
    description: 'Useful feedback turns into stronger public trust and clearer next steps.',
    iconTitle: 'Review Proof',
  },
  {
    id: 'referral-offer',
    icon: 'referral-gift',
    label: 'Referral Offer',
    description: 'Happy customers get an easy reason to send the next good lead.',
    iconTitle: 'Referral Offer',
  },
  {
    id: 'new-call',
    icon: 'phone-missed',
    label: 'New Call',
    description: 'Reputation creates demand, and the system keeps the call from slipping away.',
    iconTitle: 'New Call',
  },
  {
    id: 'booked-work',
    icon: 'check-circle',
    label: 'Booked Work',
    description: 'The loop closes as repeat demand becomes scheduled revenue.',
    iconTitle: 'Booked Work',
  },
] satisfies readonly FlowSequenceStep[]

export type RepeatRevenueFlowSliceProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  title?: string
  subtext?: string
  metric?: string
  metricDetail?: string
}

export function RepeatRevenueFlowSlice({
  title = 'Repeat revenue should move in a loop, not sit in a list.',
  subtext = 'Past customers, proof, referrals, calls, and booked work stay connected in one visible system.',
  metric = '+37% more booked work',
  metricDetail = 'Stronger reputation. Stronger pipeline.',
  className,
  ...props
}: RepeatRevenueFlowSliceProps) {
  return (
    <PremiumCard
      as="section"
      variant="diagram"
      padding="xl"
      className={cn(
        'overflow-hidden rounded-[2rem] border-[rgba(21,128,61,0.18)]',
        'bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_48%,#f4fbf5_100%)]',
        className,
      )}
      data-stanley-repeat-revenue-flow-slice="Past Customer → Review Proof → Referral Offer → New Call → Booked Work"
      {...props}
    >
      <div className="pointer-events-none absolute -right-20 -top-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgba(221,247,232,0.88)_0%,rgba(238,249,242,0.48)_45%,rgba(255,255,255,0)_72%)]" />
      <div className="pointer-events-none absolute -bottom-28 left-8 -z-10 size-64 rounded-full bg-[radial-gradient(circle,rgba(234,246,230,0.68)_0%,rgba(255,255,255,0)_70%)]" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:items-center">
        <div className="flex flex-col items-start gap-6">
          <div className="relative">
            <IconMedallion
              icon="users"
              size="xl"
              iconTitle="Repeat Revenue System medallion"
              iconAriaLabel="Repeat Revenue System customers icon"
            />
            <span
              className="absolute -bottom-2 -right-2 grid size-12 place-items-center rounded-full border-[5px] border-white bg-[#eef9f2] text-[#15803D] shadow-[0_12px_26px_rgba(7,20,34,0.10)]"
              aria-hidden="true"
            >
              <StanleyIcon name="trend-up" size={30} />
            </span>
          </div>

          <div className="max-w-[34rem] space-y-4">
            <h3 className="text-balance text-[clamp(2rem,3.2vw,3.35rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-[#071421]">
              {title}
            </h3>
            <p className="text-pretty text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.6] text-[#455467]">
              {subtext}
            </p>
          </div>

          <div className="grid w-full max-w-[34rem] gap-3 rounded-[1.5rem] border border-[#cfe8d5] bg-white/82 p-4 shadow-[0_12px_32px_rgba(7,20,34,0.06)] sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef9f2] px-4 py-2 text-base font-bold leading-none text-[#15803D]">
              <StanleyIcon name="trend-up" size={24} ariaLabel="Booked work growth" />
              <span>{metric}</span>
            </div>
            <p className="text-sm font-medium leading-[1.45] text-[#455467]">{metricDetail}</p>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[#cfe8d5] bg-[#f4fbf5]/74 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] md:p-5">
          <FlowSequence
            steps={repeatRevenueFlowSliceSteps}
            showStepNumbers={false}
            connectorLabel="repeat revenue flow moves to"
          />
        </div>
      </div>
    </PremiumCard>
  )
}
