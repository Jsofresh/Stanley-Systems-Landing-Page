"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

interface CountUpProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  formatter?: (n: number) => string
  className?: string
  startImmediately?: boolean
}

const defaultFormatter = new Intl.NumberFormat("en-US")

export default function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1.4,
  formatter = (n: number) => defaultFormatter.format(n),
  className,
  startImmediately = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || startImmediately) {
      setValue(target)
      return
    }

    if (!isInView) return

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: setValue,
    })

    return () => controls.stop()
  }, [duration, isInView, shouldReduceMotion, startImmediately, target])

  return (
    <span ref={ref} className={["tabular-nums", className].filter(Boolean).join(" ")}>
      {prefix}
      {formatter(value)}
      {suffix}
    </span>
  )
}
