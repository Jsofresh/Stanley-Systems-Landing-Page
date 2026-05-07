import type * as React from 'react'

import { cn } from '../../lib/utils'

import { PremiumCard } from './PremiumCard'
import { StanleyIcon, type StanleyIconName } from './StanleyIcon'

export type AlertPanelTone = 'attention' | 'recovery' | 'notice'

export type AlertPanelProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'aside' | 'article' | 'div'
  icon?: StanleyIconName
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  tone?: AlertPanelTone
  children?: React.ReactNode
}

const alertToneClassNames: Record<AlertPanelTone, string> = {
  attention: 'border-[rgba(180,35,24,0.20)] bg-white',
  recovery: 'border-[rgba(21,128,61,0.24)] bg-[#f4fbf5]',
  notice: 'border-[rgba(21,128,61,0.18)] bg-white',
}

const alertIconClassNames: Record<AlertPanelTone, string> = {
  attention: 'bg-white text-[#B42318] border-[rgba(180,35,24,0.16)]',
  recovery: 'bg-[#eaf6e6] text-[#15803D] border-[#cfe8d5]',
  notice: 'bg-[#eef9f2] text-[#15803D] border-[#cfe8d5]',
}

export function AlertPanel({
  as = 'aside',
  icon = 'message-bubble',
  title,
  description,
  action,
  tone = 'attention',
  className,
  children,
  ...props
}: AlertPanelProps) {
  return (
    <PremiumCard
      as={as}
      variant={tone === 'attention' ? 'alert' : 'support'}
      padding="md"
      className={cn('rounded-[1.4rem]', alertToneClassNames[tone], className)}
      {...props}
    >
      <div className="flex items-start gap-4">
        <span className={cn('grid size-12 shrink-0 place-items-center rounded-full border-[5px] border-white shadow-[0_10px_24px_rgba(7,20,34,0.08)]', alertIconClassNames[tone])}>
          <StanleyIcon name={icon} size={28} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-balance text-[1.1rem] font-semibold leading-[1.08] tracking-[-0.025em] text-[#071421]">{title}</h3>
          {description ? <p className="mt-2 text-pretty text-sm leading-[1.55] text-[#455467]">{description}</p> : null}
          {children ? <div className="mt-4 text-sm leading-[1.55] text-[#455467]">{children}</div> : null}
          {action ? <div className="mt-4">{action}</div> : null}
        </div>
      </div>
    </PremiumCard>
  )
}
