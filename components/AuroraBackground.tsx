"use client"

import Aurora from "@/components/Aurora"

type AuroraBackgroundProps = {
  colorStops?: string[]
  amplitude?: number
  blend?: number
  speed?: number
}

export function AuroraBackground(props: AuroraBackgroundProps) {
  return <Aurora {...props} />
}
