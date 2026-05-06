import type { VisualPrimitiveProps } from '../shared'
import { getVisualPrimitiveA11y, getVisualPrimitiveStyle } from '../shared'

export function PhoneMissed({
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
        d="M18.5 9.5 25 17c1.3 1.5 1.1 3.7-.4 5l-3.5 3c3.4 6.9 8.9 12.4 15.8 15.8l3-3.5c1.3-1.5 3.5-1.7 5-.4l7.6 6.5c1.6 1.4 1.8 3.8.4 5.4l-4.5 5.1c-1.2 1.4-3 2-4.8 1.5C25.9 50.7 13.3 38.1 8.6 20.4c-.5-1.8.1-3.6 1.5-4.8l5.1-4.5c1.6-1.4 4-1.2 5.3.4Z"
        fill="var(--vk-pale-green)"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M38 13h14v14" stroke="currentColor" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M37.5 27.5 52 13" stroke="currentColor" strokeWidth="5.4" strokeLinecap="round" />
    </svg>
  )
}
