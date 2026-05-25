import type { CSSProperties, HTMLAttributes } from 'react'

type DisplayAssetSize = number | 'sm' | 'md' | 'lg' | 'xl'

type DisplayAssetProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  className?: string
  imgClassName?: string
  size?: DisplayAssetSize
  alt?: string
  decorative?: boolean
  priority?: boolean
}

const sizeMap: Record<Exclude<DisplayAssetSize, number>, number> = {
  sm: 48,
  md: 64,
  lg: 96,
  xl: 128,
}

function resolveSize(size: DisplayAssetSize = 'lg') {
  return typeof size === 'number' ? size : sizeMap[size]
}

type StanleyDisplayAssetProps = DisplayAssetProps & {
  src: string
  defaultAlt: string
}

function StanleyDisplayAsset({
  src,
  defaultAlt,
  className,
  imgClassName,
  size = 'lg',
  alt,
  decorative = true,
  priority = false,
  style,
  ...props
}: StanleyDisplayAssetProps) {
  const resolvedSize = resolveSize(size)
  const imageAlt = decorative ? '' : alt || defaultAlt
  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    width: resolvedSize,
    height: resolvedSize,
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
      data-stanley-display-asset="true"
    >
      <img
        src={src}
        alt={imageAlt}
        width={resolvedSize}
        height={resolvedSize}
        loading="eager"
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

export type { DisplayAssetProps, DisplayAssetSize }

export function CheckCircleDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/check-circle-display.png"
      defaultAlt="Check circle display icon"
    />
  )
}

export function DollarCircleDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/dollar-circle-display.png"
      defaultAlt="Dollar circle display icon"
    />
  )
}

export function FileEstimateDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/file-estimate-display.png"
      defaultAlt="File estimate display icon"
    />
  )
}

export function FileInvoiceDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/file-invoice-display.png"
      defaultAlt="File invoice display icon"
    />
  )
}

export function MessageBubbleDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/message-bubble-display.png"
      defaultAlt="Message bubble display icon"
    />
  )
}

export function PhoneMissedDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/phone-missed-display.png"
      defaultAlt="Missed phone call display icon"
    />
  )
}

export function PhoneMissedTransparentDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/phone-missed-transparent-display.png"
      defaultAlt="Missed phone call transparent display asset"
    />
  )
}

export function ShieldCheckDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/shield-check-display.png"
      defaultAlt="Shield check display icon"
    />
  )
}

export function TrendUpDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/trend-up-display.png"
      defaultAlt="Trend up display icon"
    />
  )
}

export function UserDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/user-display.png"
      defaultAlt="User display icon"
    />
  )
}

export function UsersDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/users-display.png"
      defaultAlt="Users display icon"
    />
  )
}

export function CompletedJobBadgeDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/completed-job-badge-display.png"
      defaultAlt="Completed job badge display asset"
    />
  )
}

export function PaidJobBadgeDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/paid-job-badge-display.png"
      defaultAlt="Paid job badge display asset"
    />
  )
}

export function OfficeAlertBadgeDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/office-alert-badge-display.png"
      defaultAlt="Office alert badge display asset"
    />
  )
}

export function CustomerReactivationCheckDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/customer-reactivation-check-display.png"
      defaultAlt="Customer reactivation check display asset"
    />
  )
}

export function RepeatCustomerLoopDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/repeat-customer-loop-display.png"
      defaultAlt="Repeat customer loop display asset"
    />
  )
}

export function InvoiceDelayClockDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/invoice-delay-clock-display.png"
      defaultAlt="Invoice delay clock display asset"
    />
  )
}

export function BrokenHandoffBadgeDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/broken-handoff-badge-display.png"
      defaultAlt="Broken handoff badge display asset"
    />
  )
}

export function ManualHandoffBadgeDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/manual-handoff-badge-display.png"
      defaultAlt="Manual handoff badge display asset"
    />
  )
}

export function OpenBalanceFollowUpBadgeDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/open-balance-follow-up-badge-display.png"
      defaultAlt="Open balance follow up badge display asset"
    />
  )
}

export function EstimateNextStepBadgeDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/estimate-next-step-badge-display.png"
      defaultAlt="Estimate next step badge display asset"
    />
  )
}

export function PaymentReceivedBadgeDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/payment-received-badge-display.png"
      defaultAlt="Payment received badge display asset"
    />
  )
}

export function CashCollectedBadgeDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/cash-collected-badge-display.png"
      defaultAlt="Cash collected badge display asset"
    />
  )
}
export function CalendarCashflowTrendDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/calendar-cashflow-trend-display.png"
      defaultAlt="Calendar cashflow trend display asset"
    />
  )
}

export function RepeatCustomerCycleDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/repeat-customer-cycle-display.png"
      defaultAlt="Repeat customer cycle display asset"
    />
  )
}

export function MoneyLeakRoutingDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/money-leak-routing-display.png"
      defaultAlt="Money leak routing display asset"
    />
  )
}

export function InvoiceEditDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/invoice-edit-display.png"
      defaultAlt="Invoice edit display asset"
    />
  )
}

export function TargetClickDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/target-click-display.png"
      defaultAlt="Target click display asset"
    />
  )
}

export function PaymentHoldDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/payment-hold-display.png"
      defaultAlt="Payment hold display asset"
    />
  )
}

export function DelayedInvoiceDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/delayed-invoice-display.png"
      defaultAlt="Delayed invoice display asset"
    />
  )
}

// Newest 18 display primitives

export function CashStackDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/cash-stack-display.png"
      defaultAlt="Cash stack display asset"
    />
  )
}


export function ApprovedHandoffDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/approved-handoff-display.png"
      defaultAlt="Approved handoff display asset"
    />
  )
}


export function FirstFixWrenchDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/first-fix-wrench-display.png"
      defaultAlt="Build priority wrench display asset"
    />
  )
}


export function InactiveCustomersDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/inactive-customers-display.png"
      defaultAlt="Inactive customers display asset"
    />
  )
}


export function OfficeReworkDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/office-rework-display.png"
      defaultAlt="Office rework display asset"
    />
  )
}


export function MoneyLeakMapDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/money-leak-map-display.png"
      defaultAlt="Money leak map display asset"
    />
  )
}


export function BillingScheduleDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/billing-schedule-display.png"
      defaultAlt="Billing schedule display asset"
    />
  )
}


export function ResultCheckDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/result-check-display.png"
      defaultAlt="Result check display asset"
    />
  )
}


export function MonthlyImpactTrendDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/monthly-impact-trend-display.png"
      defaultAlt="Monthly impact trend display asset"
    />
  )
}


export function CashApprovedDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/cash-approved-display.png"
      defaultAlt="Cash approved display asset"
    />
  )
}


export function InvoiceSentDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/invoice-sent-display.png"
      defaultAlt="Invoice sent display asset"
    />
  )
}


export function InvoiceApprovedDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/invoice-approved-display.png"
      defaultAlt="Invoice approved display asset"
    />
  )
}


export function BillingCheckDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/billing-check-display.png"
      defaultAlt="Billing check display asset"
    />
  )
}


export function ReviewGrowthDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/review-growth-display.png"
      defaultAlt="Review growth display asset"
    />
  )
}


export function ReferralNetworkDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/referral-network-display.png"
      defaultAlt="Referral network display asset"
    />
  )
}


export function OfficeAlertDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/office-alert-display.png"
      defaultAlt="Office alert display asset"
    />
  )
}


export function PaymentApprovedDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/payment-approved-display.png"
      defaultAlt="Payment approved display asset"
    />
  )
}


export function CompletedJobDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/completed-job-display.png"
      defaultAlt="Completed job display asset"
    />
  )
}

export function UploadedRevenueDropWarningDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/uploaded-revenue-drop-warning-display.png"
      defaultAlt="Revenue drop warning display asset"
    />
  )
}

export function UploadedPhoneCallGrowthDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/uploaded-phone-call-growth-display.png"
      defaultAlt="Phone call growth display asset"
    />
  )
}

export function UploadedEstimateCalculatorDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/uploaded-estimate-calculator-display.png"
      defaultAlt="Estimate calculator display asset"
    />
  )
}

export function UploadedShieldCheckDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/uploaded-shield-check-display.png"
      defaultAlt="Shield check display asset"
    />
  )
}

export function UploadedInvoiceClockWarningDisplayAsset(props: DisplayAssetProps) {
  return (
    <StanleyDisplayAsset
      {...props}
      src="/visual-kit/display-assets/uploaded-invoice-clock-warning-display.png"
      defaultAlt="Invoice clock warning display asset"
    />
  )
}

