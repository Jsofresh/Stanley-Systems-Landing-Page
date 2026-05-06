import type { VisualPrimitiveProps } from '../shared'
import { getVisualPrimitiveA11y, getVisualPrimitiveStyle } from '../shared'

export function User({
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
      <circle cx="32" cy="32" r="25" fill="var(--vk-pale-green)" stroke="currentColor" strokeWidth="4.7" />
      <circle cx="32" cy="24.5" r="8" fill="var(--vk-pale-green)" stroke="currentColor" strokeWidth="5" />
      <path
        d="M19 49c1-9.4 6-14 13-14s12 4.6 13 14"
        fill="var(--vk-pale-green)"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
