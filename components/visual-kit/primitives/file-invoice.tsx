import type { VisualPrimitiveProps } from '../shared'
import { getVisualPrimitiveA11y, getVisualPrimitiveStyle } from '../shared'

export function FileInvoice({
  className,
  size = 64,
  title,
  ariaLabel,
  style,
  ...props
}: VisualPrimitiveProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={getVisualPrimitiveStyle(style)}
      fill="none"
      {...getVisualPrimitiveA11y(title, ariaLabel)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <circle cx="32" cy="32" r="25" fill="var(--vk-pale-green)" />
      <path
        d="M21 10h23l8 8v33.5c0 2.5-2 4.5-4.5 4.5h-26c-2.5 0-4.5-2-4.5-4.5v-37c0-2.5 2-4.5 4.5-4.5Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="4.8"
        strokeLinejoin="round"
      />
      <path d="M44 10v8h8" stroke="currentColor" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 28h16M25 36h16M25 44h10" stroke="currentColor" strokeWidth="4.8" strokeLinecap="round" />
      <circle cx="44" cy="43" r="9" fill="var(--vk-pale-green)" stroke="currentColor" strokeWidth="4.8" />
      <path d="M44 36.5v13M40.5 40c.8-1 2.1-1.5 3.5-1.5 2 0 3.7 1 3.7 2.5 0 1.7-1.7 2.3-3.7 2.8-1.9.4-3.4 1-3.4 2.6 0 1.6 1.6 2.7 3.8 2.7 1.5 0 2.8-.5 3.7-1.4" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  )
}
