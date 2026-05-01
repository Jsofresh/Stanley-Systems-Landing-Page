import * as React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type CTAGroupProps = React.ComponentProps<'div'> & {
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export function CTAGroup({ primary, secondary, className, ...props }: CTAGroupProps) {
  return (
    <div className={cn('flex flex-col gap-3 sm:flex-row sm:items-center', className)} {...props}>
      <Button asChild size="lg" className="bg-emerald-700 text-white hover:bg-emerald-800">
        <Link href={primary.href}>{primary.label}</Link>
      </Button>
      {secondary && (
        <Button asChild size="lg" variant="outline" className="border-slate-300 text-slate-900 hover:bg-slate-50">
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      )}
    </div>
  )
}
