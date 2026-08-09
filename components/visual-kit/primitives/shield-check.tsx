import type { VisualPrimitiveProps } from '../shared'
import { getVisualPrimitiveA11y, getVisualPrimitiveStyle } from '../shared'

export function ShieldCheck({
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
        d="M32 6.5c7 5.2 13.7 7.2 21 7.8V30c0 13-8.8 22.2-21 27.5C19.8 52.2 11 43 11 30V14.3c7.3-.6 14-2.6 21-7.8Z"
        fill="var(--vk-pale-green)"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M22.3 31.2 29 38l13.2-14.2"
        stroke="currentColor"
        strokeWidth="6.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M32 12v39" stroke="var(--vk-soft-green)" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}
