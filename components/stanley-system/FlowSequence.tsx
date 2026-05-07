import { Fragment, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../lib/utils'

import { FlowNode, type FlowNodeProps } from './FlowNode'
import { stanleySystemFlow } from './tokens'

export type FlowSequenceStep = Pick<FlowNodeProps, 'icon' | 'label' | 'description' | 'tone' | 'iconTitle' | 'iconAriaLabel'> & {
  id?: string
  mobileDescription?: ReactNode | false
}

export type FlowSequenceProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  steps: readonly FlowSequenceStep[]
  showStepNumbers?: boolean
  connectorLabel?: string
}

const supportedFlowStepCounts = [4, 5, 6] as const
export type SupportedFlowStepCount = (typeof supportedFlowStepCounts)[number]

const desktopGridByStepCount: Record<SupportedFlowStepCount, string> = {
  4: 'minmax(0,1fr) 2.5rem minmax(0,1fr) 2.5rem minmax(0,1fr) 2.5rem minmax(0,1fr)',
  5: 'minmax(0,1fr) 2.25rem minmax(0,1fr) 2.25rem minmax(0,1fr) 2.25rem minmax(0,1fr) 2.25rem minmax(0,1fr)',
  6: 'minmax(0,1fr) 2rem minmax(0,1fr) 2rem minmax(0,1fr) 2rem minmax(0,1fr) 2rem minmax(0,1fr) 2rem minmax(0,1fr)',
}

function isSupportedFlowStepCount(count: number): count is SupportedFlowStepCount {
  return supportedFlowStepCounts.includes(count as SupportedFlowStepCount)
}

function getDesktopGridTemplateColumns(count: number) {
  if (isSupportedFlowStepCount(count)) {
    return desktopGridByStepCount[count]
  }

  return Array.from({ length: Math.max(count * 2 - 1, 1) }, (_, index) =>
    index % 2 === 0 ? 'minmax(0,1fr)' : '2.25rem',
  ).join(' ')
}

function DesktopConnector({ label }: { label?: string }) {
  return (
    <div className="flex min-w-0 items-center justify-center self-stretch" aria-hidden={label ? undefined : true}>
      <span
        className={cn(
          'flex h-full min-h-[9.25rem] w-full items-center justify-center',
          stanleySystemFlow.connectorClassName,
        )}
      >
        <span className="h-px min-w-0 flex-1 rounded-full bg-[linear-gradient(90deg,rgba(21,128,61,0)_0%,rgba(21,128,61,0.42)_48%,rgba(21,128,61,0)_100%)]" />
        <span className="mx-1 text-3xl font-semibold leading-none text-[#15803D] drop-shadow-[0_1px_0_rgba(255,255,255,0.9)]">
          {stanleySystemFlow.arrow}
        </span>
        <span className="h-px min-w-0 flex-1 rounded-full bg-[linear-gradient(90deg,rgba(21,128,61,0)_0%,rgba(21,128,61,0.42)_52%,rgba(21,128,61,0)_100%)]" />
        {label ? <span className="sr-only">{label}</span> : null}
      </span>
    </div>
  )
}

function MobileConnector({ label }: { label?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center py-1', stanleySystemFlow.connectorClassName)}
      aria-hidden={label ? undefined : true}
    >
      <span className="h-7 w-px rounded-full bg-[rgba(21,128,61,0.32)]" />
      <span className="px-3 text-2xl font-semibold leading-none text-[#15803D]">↓</span>
      <span className="h-7 w-px rounded-full bg-[rgba(21,128,61,0.32)]" />
      {label ? <span className="sr-only">{label}</span> : null}
    </div>
  )
}

export function FlowSequence({
  steps,
  showStepNumbers = true,
  connectorLabel = 'flows to',
  className,
  ...props
}: FlowSequenceProps) {
  const stepCount = steps.length
  const desktopGridTemplateColumns = getDesktopGridTemplateColumns(stepCount)

  return (
    <div className={cn('w-full', className)} {...props}>
      <div
        className="hidden items-stretch gap-0 md:grid"
        style={{ gridTemplateColumns: desktopGridTemplateColumns } as CSSProperties}
        data-flow-step-count={stepCount}
        data-supported-step-count={isSupportedFlowStepCount(stepCount) ? '4-5-6' : 'flexible'}
      >
        {steps.map((step, index) => (
          <Fragment key={step.id ?? `${index}-${String(step.label)}`}>
            <FlowNode
              icon={step.icon}
              label={step.label}
              description={step.description}
              tone={step.tone ?? (index === 0 ? 'emphasis' : 'default')}
              iconTitle={step.iconTitle}
              iconAriaLabel={step.iconAriaLabel}
              step={showStepNumbers ? index + 1 : undefined}
            />
            {index < steps.length - 1 ? <DesktopConnector label={connectorLabel} /> : null}
          </Fragment>
        ))}
      </div>

      <div className="grid gap-2 md:hidden" data-mobile-flow-layout="vertical-readable">
        {steps.map((step, index) => {
          const mobileDescription = step.mobileDescription === false ? undefined : step.mobileDescription ?? step.description

          return (
            <Fragment key={step.id ?? `mobile-${index}-${String(step.label)}`}>
              <FlowNode
                icon={step.icon}
                label={step.label}
                description={mobileDescription}
                tone={step.tone ?? (index === 0 ? 'emphasis' : 'default')}
                iconTitle={step.iconTitle}
                iconAriaLabel={step.iconAriaLabel}
                step={showStepNumbers ? index + 1 : undefined}
                className="min-h-0 p-4"
              />
              {index < steps.length - 1 ? <MobileConnector label={connectorLabel} /> : null}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
