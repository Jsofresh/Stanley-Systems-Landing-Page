import type * as React from 'react'

export type VisualPrimitiveProps = Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height' | 'role' | 'aria-label' | 'aria-hidden'
> & {
  className?: string
  size?: number | string
  title?: string
  ariaLabel?: string
}

export function getVisualPrimitiveA11y(title?: string, ariaLabel?: string) {
  const label = ariaLabel ?? title

  if (label) {
    return {
      role: 'img',
      'aria-label': label,
    } as const
  }

  return {
    'aria-hidden': true,
  } as const
}

export function getVisualPrimitiveStyle(style?: React.CSSProperties) {
  return {
    '--vk-green': '#08a64b',
    '--vk-green-deep': '#087b3f',
    '--vk-navy': '#05244d',
    '--vk-pale-green': '#eaf6e6',
    '--vk-soft-green': '#cdebc0',
    ...style,
  } as React.CSSProperties
}
