import * as React from 'react'

type FileInvoiceDisplayProps = Omit<
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

export function FileInvoiceDisplay({
  className,
  size = 96,
  variant = 'default',
  title,
  ariaLabel,
  ...props
}: FileInvoiceDisplayProps) {
  const id = React.useId()
  const ringId = `${id}-invoice-ring`
  const faceId = `${id}-invoice-face`
  const paperId = `${id}-invoice-paper`
  const shadowId = `${id}-invoice-shadow`
  const paperShadowId = `${id}-invoice-paper-shadow`
  const badgeShadowId = `${id}-invoice-badge-shadow`
  const ringStart = variant === 'navy' ? '#14385F' : '#12BC64'
  const ringEnd = variant === 'navy' ? '#061D34' : '#087B3F'
  const navy = '#06254A'
  const green = '#0CAF58'
  const paleGreen = '#D8F0CF'

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
        <linearGradient id={ringId} x1="31" x2="101" y1="10" y2="116" gradientUnits="userSpaceOnUse">
          <stop stopColor={ringStart} />
          <stop offset="1" stopColor={ringEnd} />
        </linearGradient>
        <radialGradient id={faceId} cx="0" cy="0" r="1" gradientTransform="matrix(0 55 -55 0 48 30)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCFFF8" />
          <stop offset=".64" stopColor="#EEF8EA" />
          <stop offset="1" stopColor="#DCEFD8" />
        </radialGradient>
        <linearGradient id={paperId} x1="47" x2="84" y1="28" y2="94" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F7FBF5" />
        </linearGradient>
        <filter id={shadowId} x="9" y="8" width="110" height="114" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#07301F" floodOpacity=".17" />
        </filter>
        <filter id={paperShadowId} x="34" y="23" width="66" height="78" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#06254A" floodOpacity=".14" />
        </filter>
        <filter id={badgeShadowId} x="24" y="66" width="44" height="44" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#07301F" floodOpacity=".19" />
        </filter>
      </defs>

      <g filter={`url(#${shadowId})`}>
        <circle cx="64" cy="62" r="55" fill={`url(#${ringId})`} />
        <circle cx="64" cy="62" r="45" fill={`url(#${faceId})`} />
        <circle cx="64" cy="62" r="45" stroke="#FFFFFF" strokeOpacity=".92" strokeWidth="2.5" />
        <circle cx="64" cy="62" r="50" stroke="#FFFFFF" strokeOpacity=".14" strokeWidth="3" />
      </g>

      <g stroke={green} strokeLinecap="round" strokeWidth="5.2">
        <path d="M24 55h7" />
        <path d="M24 68h9" />
        <path d="M26 80h6" />
        <path d="M97 55h7" />
        <path d="M95 68h9" />
        <path d="M96 80h6" />
      </g>

      <g filter={`url(#${paperShadowId})`}>
        <path
          d="M46 29h31.5L92 43.5v44A7.5 7.5 0 0 1 84.5 95h-37A7.5 7.5 0 0 1 40 87.5v-51A7.5 7.5 0 0 1 47.5 29H46Z"
          fill={`url(#${paperId})`}
          stroke={navy}
          strokeLinejoin="round"
          strokeWidth="5.6"
        />
        <path d="M78 31v12.5a6 6 0 0 0 6 6h7.5" fill="#EAF6E6" stroke={navy} strokeLinejoin="round" strokeWidth="5.6" />
      </g>

      <circle cx="51" cy="48" r="6.4" fill={paleGreen} />
      <path d="M62 48h16" stroke={paleGreen} strokeLinecap="round" strokeWidth="5" />
      <path d="M51 60h19" stroke={paleGreen} strokeLinecap="round" strokeWidth="4.8" />
      <path d="M51 70h16" stroke={paleGreen} strokeLinecap="round" strokeWidth="4.8" />
      <path d="M69 84h17" stroke={paleGreen} strokeLinecap="round" strokeWidth="4.8" />

      <circle cx="76" cy="67" r="13" fill="#F2FAEE" stroke={navy} strokeWidth="5" />
      <text
        x="76"
        y="75"
        fill={green}
        fontFamily="Geist, Inter, ui-sans-serif, system-ui, sans-serif"
        fontSize="26"
        fontWeight="800"
        letterSpacing="0"
        textAnchor="middle"
      >
        $
      </text>

      <g filter={`url(#${badgeShadowId})`}>
        <circle cx="46" cy="87" r="18.5" fill="#FFFFFF" />
        <circle cx="46" cy="87" r="16" stroke={green} strokeWidth="5.5" />
        <path d="M52.5 78.5a11.5 11.5 0 1 0 4 13.5" stroke={navy} strokeLinecap="round" strokeWidth="4.5" />
        <path d="M57 88.5l5.5-1.5 1.2 5.4" stroke={green} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5" />
        <path d="M41 88h.1M46.5 88h.1M52 88h.1" stroke={green} strokeLinecap="round" strokeWidth="4.8" />
      </g>

      <path d="M31 30c8.5-8.4 19.4-12.8 31.5-13" stroke="#FFFFFF" strokeLinecap="round" strokeOpacity=".42" strokeWidth="3" />
    </svg>
  )
}
