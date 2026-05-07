import type * as React from 'react'

import { cn } from '../../lib/utils'

import { stanleySystemShadows } from './tokens'
import { StanleyIcon, type StanleyIconName } from './StanleyIcon'

export type IconMedallionSize = 'sm' | 'md' | 'lg' | 'xl'

export type IconMedallionProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  icon: StanleyIconName
  size?: IconMedallionSize
  iconTitle?: string
  iconAriaLabel?: string
}

const medallionSizes = {
  sm: {
    shell: 'size-14 border-[6px]',
    icon: 34,
  },
  md: {
    shell: 'size-[4.5rem] border-[8px]',
    icon: 44,
  },
  lg: {
    shell: 'size-24 border-[10px]',
    icon: 58,
  },
  xl: {
    shell: 'size-32 border-[12px]',
    icon: 76,
  },
} as const

export function IconMedallion({
  icon,
  size = 'md',
  iconTitle,
  iconAriaLabel,
  className,
  style,
  ...props
}: IconMedallionProps) {
  const selectedSize = medallionSizes[size]

  return (
    <div
      className={cn(
        'relative isolate grid shrink-0 place-items-center overflow-hidden rounded-full border-white text-[#15803D]',
        'bg-[radial-gradient(circle_at_35%_24%,#ffffff_0%,#f4fbf5_26%,#eaf6e6_68%,#cfe8d5_100%)]',
        selectedSize.shell,
        className,
      )}
      style={{
        boxShadow: stanleySystemShadows.medallion,
        ...style,
      }}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10%] -z-10 rounded-full bg-[radial-gradient(circle_at_32%_18%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.28)_34%,rgba(255,255,255,0)_70%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-12px_28px_rgba(8,123,63,0.08)]"
      />
      <StanleyIcon
        name={icon}
        size={selectedSize.icon}
        title={iconTitle}
        ariaLabel={iconAriaLabel}
        className="relative z-10 block drop-shadow-[0_2px_0_rgba(255,255,255,0.72)]"
      />
    </div>
  )
}
