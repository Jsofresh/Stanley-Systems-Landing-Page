import type { VisualPrimitiveProps } from '../shared'
import { getVisualPrimitiveA11y, getVisualPrimitiveStyle } from '../shared'

export function Users({
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
      <g opacity="0.88">
        <circle cx="17.5" cy="24" r="6.5" fill="var(--vk-pale-green)" stroke="currentColor" strokeWidth="4.8" />
        <path
          d="M7 46c.7-7.8 4.7-11.6 10.5-11.6S27.3 38.2 28 46"
          fill="var(--vk-pale-green)"
          stroke="currentColor"
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="46.5" cy="24" r="6.5" fill="var(--vk-pale-green)" stroke="currentColor" strokeWidth="4.8" />
        <path
          d="M36 46c.7-7.8 4.7-11.6 10.5-11.6S56.3 38.2 57 46"
          fill="var(--vk-pale-green)"
          stroke="currentColor"
          strokeWidth="4.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle cx="32" cy="20" r="8" fill="var(--vk-pale-green)" stroke="currentColor" strokeWidth="5" />
      <path
        d="M18.5 52c.9-10 6.1-14.8 13.5-14.8S44.6 42 45.5 52"
        fill="var(--vk-pale-green)"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
