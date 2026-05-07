import type * as React from 'react'

import { cn } from '../../lib/utils'

import { PremiumCard } from './PremiumCard'
import { StanleyIcon, type StanleyIconName } from './StanleyIcon'

export type SupportTileProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'article' | 'div' | 'li'
  icon: StanleyIconName
  title: React.ReactNode
  description?: React.ReactNode
  descriptionClassName?: string
  detail?: React.ReactNode
}

export function SupportTile({
  as = 'article',
  icon,
  title,
  description,
  descriptionClassName,
  detail,
  className,
  ...props
}: SupportTileProps) {
  return (
    <PremiumCard
      as={as}
      variant="support"
      padding="md"
      className={cn('h-full rounded-[1.35rem] border-[rgba(21,128,61,0.16)]', className)}
      {...props}
    >
      <div className="flex h-full items-start gap-3.5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full border-[5px] border-white bg-[#eaf6e6] text-[#15803D] shadow-[0_10px_22px_rgba(21,128,61,0.13),inset_0_1px_0_rgba(255,255,255,0.9)]">
          <StanleyIcon name={icon} size={26} />
        </span>
        <div className="min-w-0">
          <h3 className="text-pretty text-base font-semibold leading-[1.14] tracking-[-0.02em] text-[#071421] md:text-[0.98rem]">{title}</h3>
          {description ? (
            <p className={cn('mt-1.5 text-[0.94rem] leading-[1.55] text-[#455467] md:text-sm', descriptionClassName)}>
              {description}
            </p>
          ) : null}
          {detail ? <div className="mt-3 text-sm font-semibold uppercase tracking-[0.1em] text-[#15803D] md:text-xs">{detail}</div> : null}
        </div>
      </div>
    </PremiumCard>
  )
}
