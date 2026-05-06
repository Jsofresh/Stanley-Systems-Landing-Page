import type { CSSProperties, HTMLAttributes } from 'react'

type CompositeAssetSize = number | 'sm' | 'md' | 'lg' | 'xl'

type CompositeAssetProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  className?: string
  imgClassName?: string
  width?: CompositeAssetSize
  size?: CompositeAssetSize
  alt?: string
  decorative?: boolean
  priority?: boolean
}

const widthMap: Record<Exclude<CompositeAssetSize, number>, number> = {
  sm: 160,
  md: 220,
  lg: 320,
  xl: 420,
}

function resolveWidth(width?: CompositeAssetSize, size?: CompositeAssetSize) {
  const candidate = width ?? size ?? 'lg'
  return typeof candidate === 'number' ? candidate : widthMap[candidate]
}

type StanleyCompositeAssetProps = CompositeAssetProps & {
  src: string
  defaultAlt: string
  intrinsicWidth: number
  intrinsicHeight: number
}

function StanleyCompositeAsset({
  src,
  defaultAlt,
  intrinsicWidth,
  intrinsicHeight,
  className,
  imgClassName,
  width,
  size,
  alt,
  decorative = true,
  priority = false,
  style,
  ...props
}: StanleyCompositeAssetProps) {
  const resolvedWidth = resolveWidth(width, size)
  const aspectRatio = intrinsicWidth / intrinsicHeight
  const resolvedHeight = resolvedWidth / aspectRatio
  const imageAlt = decorative ? '' : alt || defaultAlt
  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    width: resolvedWidth,
    height: resolvedHeight,
    maxWidth: '100%',
    lineHeight: 0,
    flexShrink: 0,
    ...style,
  }

  return (
    <span
      {...props}
      className={className}
      style={wrapperStyle}
      aria-hidden={decorative ? 'true' : undefined}
      data-stanley-composite-asset="true"
    >
      <img
        src={src}
        alt={imageAlt}
        width={intrinsicWidth}
        height={intrinsicHeight}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={imgClassName}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </span>
  )
}

export type { CompositeAssetProps, CompositeAssetSize }

export function BenefitCheckCompositeAsset(props: CompositeAssetProps) {
  return (
    <StanleyCompositeAsset
      {...props}
      src="/visual-kit/composite-assets/benefit-check-composite.png"
      defaultAlt="Benefit check composite asset"
      intrinsicWidth={1254}
      intrinsicHeight={1254}
    />
  )
}

export function DormantCustomerListCompositeAsset(props: CompositeAssetProps) {
  return (
    <StanleyCompositeAsset
      {...props}
      src="/visual-kit/composite-assets/dormant-customer-list-composite.png"
      defaultAlt="Dormant customer list composite asset"
      intrinsicWidth={1254}
      intrinsicHeight={1254}
    />
  )
}

export function FlowArrowCompositeAsset(props: CompositeAssetProps) {
  return (
    <StanleyCompositeAsset
      {...props}
      src="/visual-kit/composite-assets/flow-arrow-composite.png"
      defaultAlt="Flow arrow composite asset"
      intrinsicWidth={1254}
      intrinsicHeight={1254}
    />
  )
}

export function MissedCallRecoveredCardCompositeAsset(props: CompositeAssetProps) {
  return (
    <StanleyCompositeAsset
      {...props}
      src="/visual-kit/composite-assets/missed-call-recovered-card-composite.png"
      defaultAlt="Missed call recovered card composite asset"
      intrinsicWidth={1254}
      intrinsicHeight={1254}
    />
  )
}

export function MonthlyImpactCashCompositeAsset(props: CompositeAssetProps) {
  return (
    <StanleyCompositeAsset
      {...props}
      src="/visual-kit/composite-assets/monthly-impact-cash-composite.png"
      defaultAlt="Monthly impact cash composite asset"
      intrinsicWidth={1254}
      intrinsicHeight={1254}
    />
  )
}

export function ReferralOpportunityCardCompositeAsset(props: CompositeAssetProps) {
  return (
    <StanleyCompositeAsset
      {...props}
      src="/visual-kit/composite-assets/referral-opportunity-card-composite.png"
      defaultAlt="Referral opportunity card composite asset"
      intrinsicWidth={432}
      intrinsicHeight={579}
    />
  )
}

export function ReviewBoosterCardCompositeAsset(props: CompositeAssetProps) {
  return (
    <StanleyCompositeAsset
      {...props}
      src="/visual-kit/composite-assets/review-booster-card-composite.png"
      defaultAlt="Review booster card composite asset"
      intrinsicWidth={1254}
      intrinsicHeight={1254}
    />
  )
}

export function SmsReactivationPhoneCompositeAsset(props: CompositeAssetProps) {
  return (
    <StanleyCompositeAsset
      {...props}
      src="/visual-kit/composite-assets/sms-reactivation-phone-composite.png"
      defaultAlt="SMS reactivation phone composite asset"
      intrinsicWidth={1254}
      intrinsicHeight={1254}
    />
  )
}
