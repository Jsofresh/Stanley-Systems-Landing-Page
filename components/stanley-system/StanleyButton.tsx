import type * as React from 'react'

import { cn } from '../../lib/utils'

export type StanleyButtonVariant = 'primary' | 'secondary' | 'quiet'
export type StanleyButtonSize = 'md' | 'lg' | 'xl'

type StanleyButtonBaseProps = {
  variant?: StanleyButtonVariant
  size?: StanleyButtonSize
  showArrow?: boolean
  arrowLabel?: string
  children: React.ReactNode
}

type StanleyButtonAsButtonProps = StanleyButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type StanleyButtonAsAnchorProps = StanleyButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

export type StanleyButtonProps = StanleyButtonAsButtonProps | StanleyButtonAsAnchorProps

const stanleyButtonVariantClassNames: Record<StanleyButtonVariant, string> = {
  primary:
    'bg-[#15803D] text-white shadow-[0_16px_34px_rgba(21,128,61,0.24),0_4px_10px_rgba(21,128,61,0.16)] hover:bg-[#116832] hover:shadow-[0_22px_44px_rgba(21,128,61,0.30),0_6px_14px_rgba(21,128,61,0.18)]',
  secondary:
    'border border-[rgba(8,123,63,0.42)] bg-white text-[#0f6b34] shadow-[0_12px_28px_rgba(7,20,34,0.08)] hover:bg-[#eef9f2] hover:text-[#0b5529] hover:shadow-[0_16px_34px_rgba(7,20,34,0.10)]',
  quiet: 'bg-[#eef9f2] text-[#116832] shadow-none hover:bg-[#DDF7E8]',
}

const stanleyButtonSizeClassNames: Record<StanleyButtonSize, string> = {
  md: 'min-h-14 gap-3 rounded-[0.85rem] px-6 py-4 text-[1.05rem]',
  lg: 'min-h-16 gap-3.5 rounded-[1rem] px-7 py-4 text-[1.08rem]',
  xl: 'min-h-16 gap-4 rounded-[1.1rem] px-8 py-5 text-[1.1rem] md:min-h-[4.5rem] md:px-9 md:text-[1.18rem]',
}

function StanleyButtonArrow({ size }: { size: StanleyButtonSize }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid shrink-0 place-items-center rounded-full bg-white/16 leading-none text-white transition duration-200 ease-out group-hover:translate-x-1',
        size === 'md' && 'size-7 text-[1.15rem]',
        size === 'lg' && 'size-8 text-[1.3rem]',
        size === 'xl' && 'size-9 text-[1.55rem]',
      )}
    >
      →
    </span>
  )
}

function StanleyButtonContent({
  children,
  showArrow,
  arrowLabel,
  size,
}: Required<Pick<StanleyButtonBaseProps, 'arrowLabel' | 'showArrow'>> &
  Pick<StanleyButtonBaseProps, 'children'> & {
    size: StanleyButtonSize
  }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow ? (
        <>
          <StanleyButtonArrow size={size} />
          <span className="sr-only">{arrowLabel}</span>
        </>
      ) : null}
    </>
  )
}

function getStanleyButtonClassName({
  variant,
  size,
  className,
}: {
  variant: StanleyButtonVariant
  size: StanleyButtonSize
  className?: string
}) {
  return cn(
    'group relative inline-flex items-center justify-center overflow-hidden font-bold tracking-[-0.02em]',
    'transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D]',
    'disabled:pointer-events-none disabled:opacity-55',
    'before:pointer-events-none before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-white/40',
    stanleyButtonVariantClassNames[variant],
    stanleyButtonSizeClassNames[size],
    className,
  )
}

export function StanleyButton(props: StanleyButtonProps) {
  if (typeof props.href === 'string') {
    const {
      variant = 'primary',
      size = 'lg',
      showArrow = true,
      arrowLabel = 'Go',
      className,
      children,
      ...anchorProps
    } = props as StanleyButtonAsAnchorProps

    return (
      <a className={getStanleyButtonClassName({ variant, size, className })} {...anchorProps}>
        <StanleyButtonContent showArrow={showArrow} arrowLabel={arrowLabel} size={size}>
          {children}
        </StanleyButtonContent>
      </a>
    )
  }

  const {
    variant = 'primary',
    size = 'lg',
    showArrow = true,
    arrowLabel = 'Go',
    className,
    children,
    type = 'button',
    ...buttonProps
  } = props as StanleyButtonAsButtonProps

  return (
    <button className={getStanleyButtonClassName({ variant, size, className })} type={type} {...buttonProps}>
      <StanleyButtonContent showArrow={showArrow} arrowLabel={arrowLabel} size={size}>
        {children}
      </StanleyButtonContent>
    </button>
  )
}
