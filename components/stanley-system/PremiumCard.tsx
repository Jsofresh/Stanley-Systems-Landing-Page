import type * as React from 'react'

import { cn } from '../../lib/utils'

import { stanleySystemShadows } from './tokens'

export type PremiumCardVariant = 'package' | 'diagram' | 'feature' | 'support' | 'alert' | 'metric'
export type PremiumCardPadding = 'md' | 'lg' | 'xl'
export type PremiumCardElement = 'article' | 'aside' | 'div' | 'li' | 'section'

export type PremiumCardProps = React.HTMLAttributes<HTMLElement> & {
  as?: PremiumCardElement
  variant?: PremiumCardVariant
  padding?: PremiumCardPadding
  liftOnHover?: boolean
}

const premiumCardVariantClassNames: Record<PremiumCardVariant, string> = {
  package: 'border-[rgba(21,128,61,0.18)] bg-white',
  diagram: 'border-[rgba(16,32,51,0.10)] bg-white',
  feature: 'border-[#cfe8d5] bg-[#f4fbf5]',
  support: 'border-[rgba(21,128,61,0.16)] bg-[linear-gradient(180deg,#ffffff_0%,#f4fbf5_100%)]',
  alert: 'border-[rgba(180,35,24,0.22)] bg-[#fff5f3]',
  metric: 'border-[#cfe8d5] bg-white',
}

const premiumCardPaddingClassNames: Record<PremiumCardPadding, string> = {
  md: 'p-5 md:p-6',
  lg: 'p-6 md:p-8',
  xl: 'p-7 md:p-10',
}

const premiumCardShadowByVariant: Record<PremiumCardVariant, string> = {
  package: stanleySystemShadows.card,
  diagram: stanleySystemShadows.panel,
  feature: '0 14px 38px rgba(7, 20, 34, 0.07), 0 2px 8px rgba(7, 20, 34, 0.04)',
  support: '0 16px 44px rgba(7, 20, 34, 0.08), 0 2px 8px rgba(7, 20, 34, 0.04)',
  alert: '0 14px 36px rgba(7, 20, 34, 0.07), 0 2px 8px rgba(180, 35, 24, 0.06)',
  metric: '0 12px 32px rgba(7, 20, 34, 0.06), 0 2px 8px rgba(7, 20, 34, 0.04)',
}

export function PremiumCard({
  as: Component = 'article',
  variant = 'package',
  padding = 'lg',
  liftOnHover = false,
  className,
  style,
  children,
  ...props
}: PremiumCardProps) {
  return (
    <Component
      className={cn(
        'relative isolate overflow-hidden rounded-[1.75rem] border text-[#102033]',
        'shadow-[var(--premium-card-shadow)] [--premium-card-shadow:0_18px_55px_rgba(7,20,34,0.10),0_2px_10px_rgba(7,20,34,0.05)]',
        'before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-white/80',
        premiumCardVariantClassNames[variant],
        premiumCardPaddingClassNames[padding],
        liftOnHover &&
          'transition duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_28px_75px_rgba(7,20,34,0.13),0_6px_18px_rgba(7,20,34,0.06)]',
        className,
      )}
      style={{
        '--premium-card-shadow': premiumCardShadowByVariant[variant],
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </Component>
  )
}
