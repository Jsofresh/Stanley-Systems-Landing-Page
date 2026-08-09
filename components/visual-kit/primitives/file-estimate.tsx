import type { VisualPrimitiveProps } from '../shared'
import { getVisualPrimitiveA11y, getVisualPrimitiveStyle } from '../shared'

export function FileEstimate({
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
        d="M21 12h21l8 8v31c0 2.5-2 4.5-4.5 4.5h-24c-2.5 0-4.5-2-4.5-4.5V16.5c0-2.5 2-4.5 4.5-4.5Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="4.8"
        strokeLinejoin="round"
      />
      <path d="M42 12v8h8" stroke="currentColor" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 29h18M25 37h18M25 45h12" stroke="currentColor" strokeWidth="4.8" strokeLinecap="round" />
      <circle cx="45" cy="45" r="8" fill="var(--vk-pale-green)" stroke="currentColor" strokeWidth="4.8" />
      <path d="M41.5 45.3 44.2 48 49 42.7" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
