import type * as React from 'react'

import { cn } from '../../lib/utils'

import { PremiumCard } from './PremiumCard'
import { StanleyIcon, type StanleyIconName } from './StanleyIcon'

export type MetricStripItem = {
  value: React.ReactNode
  label: React.ReactNode
  description?: React.ReactNode
  icon?: StanleyIconName
}

export type MetricStripProps = Omit<React.HTMLAttributes<HTMLElement>, 'children'> & {
  as?: 'aside' | 'div' | 'section'
  items: readonly MetricStripItem[]
  columns?: 2 | 3 | 4
}

const metricGridClassNames: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function MetricStrip({ as = 'aside', items, columns = 4, className, ...props }: MetricStripProps) {
  const Component = as

  return (
    <Component
      className={cn(
        'rounded-[1.5rem] border border-[#cfe8d5] bg-[#f4fbf5] p-4 shadow-[0_12px_32px_rgba(7,20,34,0.06)] md:p-5',
        className,
      )}
      {...props}
    >
      <div className={cn('grid gap-3', metricGridClassNames[columns])}>
        {items.map((item, index) => (
          <PremiumCard
            as="div"
            variant="metric"
            padding="md"
            key={index}
            className="rounded-[1.15rem] border-[#dbeee0] bg-white p-3 shadow-[0_8px_22px_rgba(7,20,34,0.05)] md:p-4"
          >
            <div className="flex items-start gap-3">
              {item.icon ? (
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eaf6e6] text-[#15803D] md:size-10">
                  <StanleyIcon name={item.icon} size={25} />
                </span>
              ) : null}
              <div className="min-w-0">
                <p className="text-balance text-[1.22rem] font-semibold leading-none tracking-[-0.04em] text-[#071421] md:text-[1.35rem]">{item.value}</p>
                <p className="mt-1 text-[0.9rem] font-semibold leading-[1.25] text-[#15803D] md:text-sm">{item.label}</p>
                {item.description ? <p className="mt-2 hidden text-sm leading-[1.5] text-[#455467] md:block">{item.description}</p> : null}
              </div>
            </div>
          </PremiumCard>
        ))}
      </div>
    </Component>
  )
}
