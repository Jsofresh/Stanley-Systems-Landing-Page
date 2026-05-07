import type * as React from 'react'

import { cn } from '../../lib/utils'

import { IconMedallion } from './IconMedallion'
import { StanleyButton } from './StanleyButton'
import { type StanleyIconName } from './StanleyIcon'

export type SystemCTAAction = {
  label: React.ReactNode
  href: string
  ariaLabel?: string
}

export type SystemCTAProps = Omit<React.HTMLAttributes<HTMLElement>, 'title'> & {
  as?: 'aside' | 'section' | 'div'
  icon?: StanleyIconName
  title: React.ReactNode
  description?: React.ReactNode
  primaryAction?: SystemCTAAction
  secondaryAction?: SystemCTAAction
  children?: React.ReactNode
}

export function SystemCTA({
  as = 'aside',
  icon = 'dollar-circle',
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  children,
  ...props
}: SystemCTAProps) {
  const Component = as

  return (
    <Component
      className={cn(
        'relative isolate overflow-hidden rounded-[2rem] border border-[rgba(21,128,61,0.18)] bg-[linear-gradient(135deg,#ffffff_0%,#f4fbf5_58%,#eef9f2_100%)] p-7 shadow-[0_18px_55px_rgba(7,20,34,0.10),0_2px_10px_rgba(7,20,34,0.05)] md:p-9',
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 -z-10 size-56 rounded-full bg-[rgba(21,128,61,0.08)] blur-2xl" />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
          <IconMedallion icon={icon} size="lg" />
          <div className="min-w-0">
            <h2 className="text-balance text-[clamp(1.85rem,3vw,3rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[#071421]">{title}</h2>
            {description ? <p className="mt-3 max-w-3xl text-pretty text-base leading-[1.65] text-[#455467]">{description}</p> : null}
            {children ? <div className="mt-4 text-base leading-[1.65] text-[#455467]">{children}</div> : null}
          </div>
        </div>
        {(primaryAction || secondaryAction) ? (
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            {primaryAction ? (
              <StanleyButton href={primaryAction.href} size="lg" aria-label={primaryAction.ariaLabel}>
                {primaryAction.label}
              </StanleyButton>
            ) : null}
            {secondaryAction ? (
              <StanleyButton href={secondaryAction.href} variant="secondary" size="lg" aria-label={secondaryAction.ariaLabel}>
                {secondaryAction.label}
              </StanleyButton>
            ) : null}
          </div>
        ) : null}
      </div>
    </Component>
  )
}
