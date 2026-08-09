import type { VisualPrimitiveProps } from '../shared'
import { getVisualPrimitiveA11y, getVisualPrimitiveStyle } from '../shared'

export function MessageBubble({
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
      <path
        d="M11 17.5c0-4.1 3.4-7.5 7.5-7.5h27c4.1 0 7.5 3.4 7.5 7.5v19c0 4.1-3.4 7.5-7.5 7.5H25L12 53V39.5c-.7-1.1-1-2.4-1-3.9V17.5Z"
        fill="var(--vk-pale-green)"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M23 23h20M23 32h20M23 41h12" stroke="currentColor" strokeWidth="4.4" strokeLinecap="round" />
    </svg>
  )
}
