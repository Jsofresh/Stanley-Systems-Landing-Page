import type { VisualPrimitiveProps } from '../shared'
import { getVisualPrimitiveA11y, getVisualPrimitiveStyle } from '../shared'

export function DollarCircle({
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
      <circle cx="32" cy="32" r="24.5" fill="var(--vk-pale-green)" />
      <circle cx="32" cy="32" r="24.5" stroke="currentColor" strokeWidth="5" />
      <path d="M32 17v30" stroke="currentColor" strokeWidth="5.2" strokeLinecap="round" />
      <path
        d="M42 23.5c-2.1-2.5-5.2-3.8-9.2-3.8-5.3 0-8.8 2.6-8.8 6.4 0 4.2 4.1 5.3 8.5 6.2 4.6.9 8.7 2.1 8.7 6.2 0 4-3.7 6.7-9.2 6.7-4.4 0-7.9-1.5-10.1-4.4"
        stroke="currentColor"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
