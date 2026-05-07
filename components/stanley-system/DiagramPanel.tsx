import type * as React from 'react'

import { cn } from '../../lib/utils'

import { IconMedallion } from './IconMedallion'
import { PremiumCard } from './PremiumCard'
import { type StanleyIconName } from './StanleyIcon'

export type DiagramPanelTone = 'default' | 'mint' | 'plain'

export type DiagramPanelProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'article' | 'aside' | 'div' | 'section'
  icon?: StanleyIconName
  title?: React.ReactNode
  subtitle?: React.ReactNode
  eyebrow?: React.ReactNode
  action?: React.ReactNode
  footer?: React.ReactNode
  tone?: DiagramPanelTone
  children: React.ReactNode
}

const diagramPanelToneClassNames: Record<DiagramPanelTone, string> = {
  default: 'bg-white',
  mint: 'border-[#cfe8d5] bg-[linear-gradient(180deg,#ffffff_0%,#f4fbf5_100%)]',
  plain: 'bg-white shadow-[0_12px_32px_rgba(7,20,34,0.06)]',
}

export function DiagramPanel({
  as = 'article',
  icon,
  title,
  subtitle,
  eyebrow,
  action,
  footer,
  tone = 'default',
  className,
  children,
  ...props
}: DiagramPanelProps) {
  const hasHeader = Boolean(icon || title || subtitle || eyebrow || action)

  return (
    <PremiumCard
      as={as}
      variant="diagram"
      padding="lg"
      className={cn('rounded-[2rem] border-[rgba(16,32,51,0.10)]', diagramPanelToneClassNames[tone], className)}
      {...props}
    >
      {hasHeader ? (
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 gap-4">
            {icon ? <IconMedallion icon={icon} size="md" className="mt-0.5" /> : null}
            <div className="min-w-0">
              {eyebrow ? (
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">{eyebrow}</p>
              ) : null}
              {title ? (
                <h2 className="text-balance text-[clamp(1.55rem,2.2vw,2.2rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-[#071421]">
                  {title}
                </h2>
              ) : null}
              {subtitle ? <p className="mt-3 max-w-3xl text-pretty text-base leading-[1.65] text-[#455467]">{subtitle}</p> : null}
            </div>
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}

      <div className="relative z-10">{children}</div>

      {footer ? <div className="mt-7 border-t border-[rgba(16,32,51,0.08)] pt-5">{footer}</div> : null}
    </PremiumCard>
  )
}
