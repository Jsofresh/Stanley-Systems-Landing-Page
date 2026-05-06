import type { VisualPrimitiveProps } from '../shared'
import { getVisualPrimitiveA11y, getVisualPrimitiveStyle } from '../shared'

export function CheckCircle({
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
      <circle cx="32" cy="32" r="25" stroke="currentColor" strokeWidth="5" />
      <path
        d="M20 32.5 28.4 41 45 23.5"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
