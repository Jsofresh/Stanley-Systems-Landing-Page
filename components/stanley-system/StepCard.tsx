import type * as React from 'react'

import { cn } from '../../lib/utils'

import { IconMedallion } from './IconMedallion'
import { PremiumCard } from './PremiumCard'
import { type StanleyIconName } from './StanleyIcon'

export type StepCardTone = 'default' | 'emphasis' | 'quiet' | 'success'

export type StepCardProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'article' | 'div' | 'li'
  icon: StanleyIconName
  title: React.ReactNode
  description?: React.ReactNode
  step?: number | string
  meta?: React.ReactNode
  tone?: StepCardTone
  children?: React.ReactNode
}

const stepCardToneClassNames: Record<StepCardTone, string> = {
  default: 'bg-white',
  emphasis: 'border-[rgba(21,128,61,0.28)] bg-[linear-gradient(180deg,#ffffff_0%,#f4fbf5_100%)]',
  quiet: 'border-[#cfe8d5] bg-[#f4fbf5]',
  success: 'border-[rgba(21,128,61,0.30)] bg-[#eef9f2]',
}

export function StepCard({
  as = 'article',
  icon,
  title,
  description,
  step,
  meta,
  tone = 'default',
  className,
  children,
  ...props
}: StepCardProps) {
  return (
    <PremiumCard
      as={as}
      variant="support"
      padding="md"
      className={cn('h-full rounded-[1.5rem] border-[#cfe8d5]', stepCardToneClassNames[tone], className)}
      {...props}
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="relative">
            {step !== undefined ? (
              <span className="absolute -right-2 -top-2 z-10 grid size-7 place-items-center rounded-full border border-[rgba(21,128,61,0.18)] bg-white text-xs font-bold text-[#15803D] shadow-[0_8px_18px_rgba(7,20,34,0.08)]">
                {step}
              </span>
            ) : null}
            <IconMedallion icon={icon} size="sm" />
          </div>
          {meta ? <div className="rounded-full border border-[rgba(21,128,61,0.16)] bg-white px-3 py-1 text-xs font-semibold text-[#15803D]">{meta}</div> : null}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-balance text-[1.18rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#071421]">{title}</h3>
          {description ? <p className="mt-2 text-pretty text-sm leading-[1.6] text-[#455467]">{description}</p> : null}
          {children ? <div className="mt-4 text-sm leading-[1.6] text-[#455467]">{children}</div> : null}
        </div>
      </div>
    </PremiumCard>
  )
}
