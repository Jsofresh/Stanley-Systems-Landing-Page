import type * as React from 'react'

import { cn } from '../../lib/utils'

import { FlowSequence, type FlowSequenceStep } from './FlowSequence'
import { IconMedallion } from './IconMedallion'
import { PremiumCard } from './PremiumCard'
import { StanleyButton } from './StanleyButton'
import { StanleyIcon, type StanleyIconName } from './StanleyIcon'

export type SystemPackageCardTone = 'cashflow' | 'repeat-revenue'

export type SystemPackageCardProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  title: string
  subtext: string
  href: string
  ctaLabel?: string
  mainIcon: StanleyIconName
  accentIcon?: StanleyIconName
  steps: readonly FlowSequenceStep[]
  tone?: SystemPackageCardTone
  ctaProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'>
}

export const cashflowControlPackageSteps = [
  {
    id: 'job-complete',
    icon: 'check-circle',
    label: 'Job Complete',
    iconTitle: 'Job Complete',
  },
  {
    id: 'billing-ready',
    icon: 'file-invoice',
    label: 'Billing Ready',
    iconTitle: 'Billing Ready',
  },
  {
    id: 'invoice-sent',
    icon: 'message-bubble',
    label: 'Invoice Sent',
    iconTitle: 'Invoice Sent',
  },
  {
    id: 'cash-collected',
    icon: 'dollar-circle',
    label: 'Cash Collected',
    iconTitle: 'Cash Collected',
  },
] satisfies readonly FlowSequenceStep[]

export const cashflowControlPackageCard = {
  title: 'Cashflow Control System',
  subtext: 'Turn finished work into collected cash faster.',
  href: '/systems/cashflow-control',
  ctaLabel: 'Learn more',
  mainIcon: 'shield-check',
  accentIcon: 'dollar-circle',
  steps: cashflowControlPackageSteps,
  tone: 'cashflow',
} satisfies SystemPackageCardProps



export const repeatRevenuePackageSteps = [
  {
    id: 'past-customer',
    icon: 'user',
    label: 'Past Customer',
    iconTitle: 'Past Customer',
  },
  {
    id: 'review-proof',
    icon: 'message-bubble',
    label: 'Review Proof',
    iconTitle: 'Review Proof',
  },
  {
    id: 'referral-offer',
    icon: 'referral-gift',
    label: 'Referral Offer',
    iconTitle: 'Referral Offer',
  },
  {
    id: 'booked-work',
    icon: 'check-circle',
    label: 'Booked Work',
    iconTitle: 'Booked Work',
  },
] satisfies readonly FlowSequenceStep[]

export const repeatRevenuePackageCard = {
  title: 'Repeat Revenue System',
  subtext: 'Make your best customers your best lead generation.',
  href: '/systems/repeat-revenue',
  ctaLabel: 'Learn more',
  mainIcon: 'users',
  accentIcon: 'trend-up',
  steps: repeatRevenuePackageSteps,
  tone: 'repeat-revenue',
} satisfies SystemPackageCardProps

export function SystemPackageCard({
  title,
  subtext,
  href,
  ctaLabel = 'Learn more',
  mainIcon,
  accentIcon = 'dollar-circle',
  steps,
  tone = 'cashflow',
  ctaProps,
  className,
  ...props
}: SystemPackageCardProps) {
  return (
    <PremiumCard
      as="article"
      variant="package"
      padding="xl"
      liftOnHover
      className={cn(
        'group flex h-full flex-col gap-8 rounded-[2rem] border-[rgba(21,128,61,0.20)]',
        'bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_54%,#f4fbf5_100%)]',
        'before:inset-x-10 before:bg-white',
        className,
      )}
      data-system-package-card={tone}
      {...props}
    >
      <div className="pointer-events-none absolute -right-16 -top-20 -z-10 size-56 rounded-full bg-[radial-gradient(circle,rgba(221,247,232,0.88)_0%,rgba(238,249,242,0.42)_48%,rgba(255,255,255,0)_72%)]" />
      <div className="pointer-events-none absolute -bottom-24 left-10 -z-10 size-44 rounded-full bg-[radial-gradient(circle,rgba(234,246,230,0.58)_0%,rgba(255,255,255,0)_70%)]" />

      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <IconMedallion
            icon={mainIcon}
            size="xl"
            iconTitle={`${title} medallion`}
            iconAriaLabel={`${title} package icon`}
            className="transition duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.02]"
          />
          {accentIcon ? (
            <span
              className="absolute -bottom-2 -right-2 grid size-12 place-items-center rounded-full border-[5px] border-white bg-[#eef9f2] text-[#15803D] shadow-[0_12px_26px_rgba(7,20,34,0.10)]"
              aria-hidden="true"
            >
              <StanleyIcon name={accentIcon} size={30} />
            </span>
          ) : null}
        </div>

        <div className="mx-auto max-w-[35rem] space-y-4">
          <h3 className="text-balance text-[clamp(2rem,3vw,2.85rem)] font-semibold leading-[0.95] tracking-[-0.052em] text-[#071421]">
            {title}
          </h3>
          <p className="mx-auto max-w-[30rem] text-pretty text-[clamp(1.05rem,1.35vw,1.22rem)] leading-[1.55] text-[#455467]">
            {subtext}
          </p>
        </div>
      </div>

      <div className="rounded-[1.75rem] border border-[#cfe8d5] bg-[#f4fbf5]/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] md:p-5">
        <FlowSequence steps={steps} showStepNumbers={false} connectorLabel={`${title} flow moves to`} />
      </div>

      <div className="mt-auto flex justify-center pt-1">
        <StanleyButton
          href={href}
          size="xl"
          variant="primary"
          arrowLabel={`${ctaLabel} about ${title}`}
          className="w-full max-w-[22rem]"
          {...ctaProps}
        >
          {ctaLabel}
        </StanleyButton>
      </div>
    </PremiumCard>
  )
}

export function CashflowControlSystemPackageCard(
  props: Omit<Partial<SystemPackageCardProps>, 'steps'> & {
    steps?: readonly FlowSequenceStep[]
  },
) {
  return <SystemPackageCard {...cashflowControlPackageCard} {...props} steps={props.steps ?? cashflowControlPackageSteps} />
}

export function RepeatRevenueSystemPackageCard(
  props: Omit<Partial<SystemPackageCardProps>, 'steps'> & {
    steps?: readonly FlowSequenceStep[]
  },
) {
  return <SystemPackageCard {...repeatRevenuePackageCard} {...props} steps={props.steps ?? repeatRevenuePackageSteps} />
}
