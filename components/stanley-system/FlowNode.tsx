import type * as React from 'react'

import { cn } from '../../lib/utils'

import { IconMedallion } from './IconMedallion'
import { PremiumCard } from './PremiumCard'
import { type StanleyIconName } from './StanleyIcon'

export type FlowNodeTone = 'default' | 'emphasis' | 'quiet'

export type FlowNodeProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  icon: StanleyIconName
  label: React.ReactNode
  description?: React.ReactNode
  step?: number | string
  tone?: FlowNodeTone
  iconTitle?: string
  iconAriaLabel?: string
}

const flowNodeToneClassNames: Record<FlowNodeTone, string> = {
  default: 'bg-white',
  emphasis: 'border-[rgba(21,128,61,0.28)] bg-[linear-gradient(180deg,#ffffff_0%,#f4fbf5_100%)]',
  quiet: 'bg-[#f4fbf5]',
}

export function FlowNode({
  icon,
  label,
  description,
  step,
  tone = 'default',
  iconTitle,
  iconAriaLabel,
  className,
  children,
  ...props
}: FlowNodeProps) {
  return (
    <PremiumCard
      as="article"
      variant="support"
      padding="md"
      className={cn(
        'flex h-full min-h-0 flex-col items-center justify-start gap-3 text-center md:min-h-[13.5rem] md:gap-4',
        'rounded-[1.5rem] border-[#cfe8d5] shadow-[0_14px_38px_rgba(7,20,34,0.07),0_2px_8px_rgba(7,20,34,0.04)]',
        flowNodeToneClassNames[tone],
        className,
      )}
      {...props}
    >
      <div className="relative flex justify-center">
        {step !== undefined ? (
          <span className="absolute -right-2 -top-2 z-10 grid size-8 place-items-center rounded-full border border-[rgba(21,128,61,0.18)] bg-white text-sm font-bold leading-none text-[#15803D] shadow-[0_8px_18px_rgba(7,20,34,0.08)] md:size-7 md:text-xs">
            {step}
          </span>
        ) : null}
        <IconMedallion icon={icon} size="md" iconTitle={iconTitle} iconAriaLabel={iconAriaLabel} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-center justify-start gap-2">
        <h3 className="max-w-[13rem] text-balance text-[1.08rem] font-semibold leading-[1.08] tracking-[-0.025em] text-[#071421] md:text-[1.05rem]">
          {label}
        </h3>
        {description ? (
          <p className="max-w-[15rem] text-pretty text-[0.95rem] leading-[1.55] text-[#455467] md:text-sm">
            {description}
          </p>
        ) : null}
        {children ? <div className="text-sm leading-[1.55] text-[#455467]">{children}</div> : null}
      </div>
    </PremiumCard>
  )
}
