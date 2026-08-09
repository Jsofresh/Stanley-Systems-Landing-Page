"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type Direction = "up" | "down" | "left" | "right"

interface DirectionalRevealProps {
  children: ReactNode
  direction?: Direction
  distance?: number
  duration?: number
  delay?: number
  className?: string
}

const getOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "down":
      return { y: -distance }
    case "left":
      return { x: distance }
    case "right":
      return { x: -distance }
    case "up":
    default:
      return { y: distance }
  }
}

export default function DirectionalReveal({
  children,
  direction = "up",
  distance = 50,
  duration = 0.6,
  delay = 0,
  className,
}: DirectionalRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...getOffset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
