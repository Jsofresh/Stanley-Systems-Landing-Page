import type * as React from 'react'
import type { VisualPrimitiveProps } from '../visual-kit/shared'
import {
  CheckCircle,
  DollarCircle,
  FileEstimate,
  FileInvoice,
  MessageBubble,
  PhoneMissed,
  ShieldCheck,
  TrendUp,
  User,
  Users,
} from '../visual-kit/primitives'

export const stanleyIconNames = [
  'check-circle',
  'dollar-circle',
  'file-estimate',
  'file-invoice',
  'message-bubble',
  'phone-missed',
  'shield-check',
  'trend-up',
  'users',
  'user',
  'gift',
  'referral-gift',
] as const

export type StanleyIconName = (typeof stanleyIconNames)[number]

export type StanleyIconProps = Omit<VisualPrimitiveProps, 'children'> & {
  name: StanleyIconName
}

const primitiveIcons = {
  'check-circle': CheckCircle,
  'dollar-circle': DollarCircle,
  'file-estimate': FileEstimate,
  'file-invoice': FileInvoice,
  'message-bubble': MessageBubble,
  'phone-missed': PhoneMissed,
  'shield-check': ShieldCheck,
  'trend-up': TrendUp,
  users: Users,
  user: User,
} satisfies Partial<Record<StanleyIconName, (props: VisualPrimitiveProps) => JSX.Element>>

function GiftIcon({
  className,
  size = 64,
  title,
  ariaLabel,
  style,
  ...props
}: VisualPrimitiveProps) {
  const label = ariaLabel ?? title

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={style}
      fill="none"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M13 29h38v21.5c0 2.5-2 4.5-4.5 4.5h-29c-2.5 0-4.5-2-4.5-4.5V29Z"
        fill="var(--stanley-icon-fill)"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M10 20.5c0-2.5 2-4.5 4.5-4.5h35c2.5 0 4.5 2 4.5 4.5V29H10v-8.5Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M32 16v39" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M12 29h40" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M32 16c-3-6.2-8.4-8.1-12-5.2-3 2.5-2.1 8.2 4 9.2 3.7.6 6.1-.9 8-4ZM32 16c3-6.2 8.4-8.1 12-5.2 3 2.5 2.1 8.2-4 9.2-3.7.6-6.1-.9-8-4Z"
        fill="var(--stanley-icon-fill)"
        stroke="currentColor"
        strokeWidth="4.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function StanleyIcon({ name, style, ...props }: StanleyIconProps) {
  const Icon = name === 'gift' || name === 'referral-gift' ? GiftIcon : primitiveIcons[name]

  return (
    <Icon
      style={{
        '--vk-green': '#08a64b',
        '--vk-green-deep': '#087b3f',
        '--vk-navy': '#05244d',
        '--vk-pale-green': '#eaf6e6',
        '--vk-soft-green': '#cdebc0',
        '--stanley-icon-fill': '#eaf6e6',
        ...style,
      } as React.CSSProperties}
      {...props}
    />
  )
}
