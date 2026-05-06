import * as React from 'react'

type DollarCircleDisplayProps = Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height' | 'role' | 'aria-label' | 'aria-hidden'
> & {
  className?: string
  size?: number | string
  variant?: 'default' | 'navy'
  title?: string
  ariaLabel?: string
}

function getA11y(title?: string, ariaLabel?: string) {
  const label = ariaLabel ?? title

  if (label) {
    return {
      role: 'img',
      'aria-label': label,
    } as const
  }

  return {
    'aria-hidden': true,
  } as const
}

export function DollarCircleDisplay({
  className,
  size = 96,
  variant = 'default',
  title,
  ariaLabel,
  ...props
}: DollarCircleDisplayProps) {
  const id = React.useId()
  const ringId = `${id}-dollar-ring`
  const faceId = `${id}-dollar-face`
  const symbolId = `${id}-dollar-symbol`
  const shadowId = `${id}-dollar-shadow`
  const liftId = `${id}-dollar-lift`
  const ringStart = variant === 'navy' ? '#13345A' : '#10B85F'
  const ringEnd = variant === 'navy' ? '#061D34' : '#087B3F'
  const symbolStart = variant === 'navy' ? '#12375E' : '#14B866'
  const symbolEnd = variant === 'navy' ? '#061D34' : '#087B3F'

  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      fill="none"
      {...getA11y(title, ariaLabel)}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={ringId} x1="32" x2="104" y1="15" y2="111" gradientUnits="userSpaceOnUse">
          <stop stopColor={ringStart} />
          <stop offset="1" stopColor={ringEnd} />
        </linearGradient>
        <radialGradient id={faceId} cx="0" cy="0" r="1" gradientTransform="matrix(0 55 -55 0 49 34)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCFFF8" />
          <stop offset=".62" stopColor="#ECF8E8" />
          <stop offset="1" stopColor="#DCEFD8" />
        </radialGradient>
        <linearGradient id={symbolId} x1="47" x2="82" y1="27" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor={symbolStart} />
          <stop offset="1" stopColor={symbolEnd} />
        </linearGradient>
        <filter id={shadowId} x="12" y="13" width="104" height="108" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#07301F" floodOpacity=".18" />
        </filter>
        <filter id={liftId} x="28" y="20" width="72" height="92" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="3" stdDeviation="2.6" floodColor="#06542D" floodOpacity=".28" />
          <feDropShadow dx="0" dy="-1" stdDeviation=".8" floodColor="#FFFFFF" floodOpacity=".9" />
        </filter>
      </defs>

      <g filter={`url(#${shadowId})`}>
        <circle cx="64" cy="62" r="54" fill={`url(#${ringId})`} />
        <circle cx="64" cy="62" r="44.5" fill={`url(#${faceId})`} />
        <circle cx="64" cy="62" r="44.5" stroke="#FFFFFF" strokeOpacity=".92" strokeWidth="2.5" />
        <circle cx="64" cy="62" r="49.5" stroke="#078242" strokeOpacity=".2" strokeWidth="2" />
      </g>

      <path
        d="M49.5 37.5C38.3 46.4 32.8 56.9 33 69.3c.2 9.4 4.1 17.9 11.7 25.1"
        stroke={`url(#${symbolId})`}
        strokeLinecap="round"
        strokeWidth="7.5"
        filter={`url(#${liftId})`}
      />
      <path
        d="M78.5 37.5c11.2 8.9 16.7 19.4 16.5 31.8-.2 9.4-4.1 17.9-11.7 25.1"
        stroke={`url(#${symbolId})`}
        strokeLinecap="round"
        strokeWidth="7.5"
        filter={`url(#${liftId})`}
      />
      <text
        x="64"
        y="84"
        fill={`url(#${symbolId})`}
        filter={`url(#${liftId})`}
        fontFamily="Geist, Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="68"
        fontWeight="800"
        letterSpacing="0"
        paintOrder="stroke fill"
        stroke="#F8FFF5"
        strokeLinejoin="round"
        strokeWidth="3"
        textAnchor="middle"
      >
        $
      </text>
      <path d="M30 31c9.2-9.8 21.2-15 35.4-15" stroke="#FFFFFF" strokeLinecap="round" strokeOpacity=".45" strokeWidth="3" />
    </svg>
  )
}
