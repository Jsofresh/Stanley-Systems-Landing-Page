import type { VisualPrimitiveProps } from '../shared'
import { getVisualPrimitiveA11y, getVisualPrimitiveStyle } from '../shared'

export function TrendUp({
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
      <path d="M9 54h46" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M14 54V42c0-2.2 1.8-4 4-4h5c2.2 0 4 1.8 4 4v12M29 54V33c0-2.2 1.8-4 4-4h5c2.2 0 4 1.8 4 4v21M44 54V22c0-2.2 1.8-4 4-4h5c2.2 0 4 1.8 4 4v32"
        fill="var(--vk-pale-green)"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 34.5 23 23l9.2 8.5L51 12.5"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M39 12.5h12v12" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
