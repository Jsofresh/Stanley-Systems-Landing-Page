import type * as React from 'react'

import { cn } from '../../lib/utils'

import { GreenUnderline } from './GreenUnderline'

type DisplayHeadlineElement = 'h1' | 'h2' | 'h3'

export type DisplayHeadlineAlign = 'left' | 'center'
export type DisplayHeadlineSize = 'section' | 'page'

export type DisplayHeadlineProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'> & {
  as?: DisplayHeadlineElement
  align?: DisplayHeadlineAlign
  size?: DisplayHeadlineSize
  before?: React.ReactNode
  highlight?: React.ReactNode
  after?: React.ReactNode
  children?: React.ReactNode
  underline?: boolean
  highlightClassName?: string
  underlineClassName?: string
}

const headlineSizeClassNames: Record<DisplayHeadlineSize, string> = {
  section: 'text-[clamp(3rem,13vw,4.5rem)] md:text-[clamp(4.5rem,7vw,6rem)]',
  page: 'text-[clamp(2.75rem,11vw,4rem)] md:text-[clamp(4rem,6vw,5.75rem)]',
}

const headlineAlignClassNames: Record<DisplayHeadlineAlign, string> = {
  left: 'text-left',
  center: 'mx-auto text-center',
}

function hasPiece(piece: React.ReactNode) {
  return piece !== undefined && piece !== null && piece !== false && piece !== ''
}

function isLeadingPunctuation(piece: React.ReactNode) {
  return typeof piece === 'string' && /^[.,!?;:]/.test(piece)
}

function needsLeadingSpace(piece: React.ReactNode) {
  return !isLeadingPunctuation(piece)
}

export function DisplayHeadline({
  as: Component = 'h2',
  align = 'center',
  size = 'section',
  before,
  highlight,
  after,
  children,
  underline = true,
  className,
  highlightClassName,
  underlineClassName,
  ...props
}: DisplayHeadlineProps) {
  const hasStructuredHeadline = hasPiece(before) || hasPiece(highlight) || hasPiece(after)

  const highlightedContent = hasPiece(highlight) ? (
    underline ? (
      <GreenUnderline className={highlightClassName} underlineClassName={underlineClassName}>
        {highlight}
      </GreenUnderline>
    ) : (
      <span className={cn('text-[#15803D]', highlightClassName)}>{highlight}</span>
    )
  ) : null

  const content = hasStructuredHeadline ? (
    <>
      {hasPiece(before) ? <>{before} </> : null}
      {highlightedContent && isLeadingPunctuation(after) ? (
        <span className="inline-block whitespace-nowrap">
          {highlightedContent}
          {after}
        </span>
      ) : (
        <>
          {highlightedContent}
          {hasPiece(after) ? <>{needsLeadingSpace(after) ? ' ' : ''}{after}</> : null}
        </>
      )}
    </>
  ) : (
    children
  )

  return (
    <Component
      className={cn(
        'text-balance font-semibold leading-[0.9] tracking-[-0.055em] text-[#071421]',
        headlineSizeClassNames[size],
        headlineAlignClassNames[align],
        className,
      )}
      {...props}
    >
      {content}
    </Component>
  )
}
