import type * as React from 'react'

import { cn } from '../../lib/utils'

import { IconMedallion } from './IconMedallion'
import { PremiumCard } from './PremiumCard'
import { StanleyIcon, type StanleyIconName } from './StanleyIcon'

export type FeatureTileDensity = 'standard' | 'compact'

export type FeatureTileProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'article' | 'div' | 'li'
  icon: StanleyIconName
  title: React.ReactNode
  description?: React.ReactNode
  density?: FeatureTileDensity
  medallion?: boolean
}

export function FeatureTile({
  as = 'article',
  icon,
  title,
  description,
  density = 'standard',
  medallion = true,
  className,
  ...props
}: FeatureTileProps) {
  return (
    <PremiumCard
      as={as}
      variant="feature"
      padding={density === 'compact' ? 'md' : 'lg'}
      className={cn('h-full rounded-[1.45rem] border-[#cfe8d5]', className)}
      {...props}
    >
      <div className={cn('flex h-full min-w-0 gap-4', density === 'compact' ? 'items-start' : 'flex-col')}>
        {medallion ? (
          <IconMedallion icon={icon} size={density === 'compact' ? 'sm' : 'md'} />
        ) : (
          <span className="grid size-11 shrink-0 place-items-center rounded-[0.9rem] border border-[#cfe8d5] bg-white text-[#15803D] shadow-[0_8px_18px_rgba(7,20,34,0.06)]">
            <StanleyIcon name={icon} size={28} />
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-balance text-[1.08rem] font-semibold leading-[1.1] tracking-[-0.025em] text-[#071421] md:text-[1.05rem]">{title}</h3>
          {description ? <p className="mt-2 text-pretty text-[0.95rem] leading-[1.6] text-[#455467] md:text-sm">{description}</p> : null}
        </div>
      </div>
    </PremiumCard>
  )
}
