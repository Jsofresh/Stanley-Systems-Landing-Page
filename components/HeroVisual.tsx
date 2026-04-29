"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Check, ArrowDown } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1]

const invoices = [
  {
    name: "Thompson, R.",
    address: "Marina service call · dock 4",
    amount: "$480",
    dot: "#D97706",
    status: "Sent",
    statusTone: "amber",
  },
  {
    name: "Nguyen, A.",
    address: "Spring tune-up · unit 12B",
    amount: "$1,240",
    dot: "#D97706",
    status: "Sent",
    statusTone: "amber",
  },
  {
    name: "Alvarez, M.",
    address: "Compressor repair · zone 2",
    amount: "$2,350",
    dot: "#0F7B3F",
    status: "Paid",
    statusTone: "green",
  },
  {
    name: "Parker, J.",
    address: "After-hours service · bay 7",
    amount: "$915",
    dot: "#0F7B3F",
    status: "Paid",
    statusTone: "green",
  },
]

function statusClasses(tone: "amber" | "green") {
  return tone === "green"
    ? "bg-[#0F7B3F]/10 text-[#0F7B3F]"
    : "bg-[#D97706]/12 text-[#D97706]"
}

export default function HeroVisual() {
  const reduceMotion = useReducedMotion()
  const [pulsePaid, setPulsePaid] = useState(false)

  useEffect(() => {
    if (reduceMotion) return

    const interval = window.setInterval(() => {
      setPulsePaid(true)
      window.setTimeout(() => setPulsePaid(false), 800)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [reduceMotion])

  const mainFloat = useMemo(
    () =>
      reduceMotion
        ? {}
        : {
            y: [0, -6, 0],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          },
    [reduceMotion],
  )

  const metricFloat = useMemo(
    () =>
      reduceMotion
        ? {}
        : {
            y: [0, -5, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          },
    [reduceMotion],
  )

  const notificationFloat = useMemo(
    () =>
      reduceMotion
        ? {}
        : {
            y: [0, -7, 0],
            transition: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            },
          },
    [reduceMotion],
  )

  return (
    <div className="relative mx-auto w-full max-w-[35rem] pb-6 pt-10 lg:max-w-none lg:pb-2 lg:pt-6">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: -10 }}
        animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: easeCurve }}
        className="absolute left-0 top-0 z-0 w-[44%] min-w-[12rem]"
        style={{ rotate: "-4deg" }}
      >
        <motion.div animate={metricFloat} className="rounded-[1.35rem] border border-[#ece7dc] bg-white p-5 shadow-[0_18px_45px_rgba(27,42,74,0.10)]">
          <div className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[#1B2A4A]/45">Avg. invoice time</div>
          <div className="mt-3 text-[2.2rem] font-semibold leading-none text-[#1B2A4A]">6 hrs</div>
          <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#0F7B3F]">
            <ArrowDown className="h-4 w-4" />
            down from 4 days
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeCurve }}
        className="relative z-10 ml-auto w-[88%]"
        style={{ rotate: "-2deg" }}
      >
        <motion.div animate={mainFloat} className="overflow-hidden rounded-[1.7rem] border border-[#ece7dc] bg-white shadow-[0_24px_70px_rgba(27,42,74,0.12)]">
          <div className="flex items-center justify-between border-b border-[#ece7dc] px-5 py-4 sm:px-6">
            <div className="text-sm font-semibold text-[#1B2A4A]">Invoices</div>
            <div className="rounded-full bg-[#1B2A4A]/6 px-3 py-1 text-xs font-medium text-[#1B2A4A]/65">This week</div>
          </div>

          <div className="divide-y divide-[#ece7dc]">
            {invoices.map((invoice, index) => {
              const animated = index === 0 && pulsePaid
              const tone = animated ? "green" : invoice.statusTone
              const dotColor = animated ? "#0F7B3F" : invoice.dot
              const label = animated ? "Paid" : invoice.status

              return (
                <div key={invoice.name} className="flex items-center gap-4 px-5 py-4 sm:px-6">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: dotColor }} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-[#1B2A4A] sm:text-[0.96rem]">{invoice.name}</div>
                    <div className="truncate text-xs text-[#1B2A4A]/45 sm:text-[0.82rem]">{invoice.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#1B2A4A] sm:text-[0.96rem]">{invoice.amount}</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${invoice.name}-${label}`}
                        initial={reduceMotion ? false : { opacity: 0, rotateX: -90, y: 4 }}
                        animate={reduceMotion ? undefined : { opacity: 1, rotateX: 0, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, rotateX: 90, y: -4 }}
                        transition={{ duration: 0.28, ease: easeCurve }}
                        className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${statusClasses(tone)}`}
                      >
                        {label}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.95 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        transition={
          reduceMotion
            ? undefined
            : {
                delay: 0.35,
                type: "spring",
                stiffness: 240,
                damping: 20,
              }
        }
        className="absolute bottom-0 right-0 z-20 w-[52%] min-w-[14rem]"
        style={{ rotate: "3deg" }}
      >
        <motion.div animate={notificationFloat} className="rounded-[1.25rem] border border-[#ece7dc] bg-white p-4 shadow-[0_24px_70px_rgba(27,42,74,0.16)] sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0F7B3F] text-white">
                <Check className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-[#1B2A4A] sm:text-[0.95rem]">Payment received</div>
                <div className="mt-1 text-xs text-[#1B2A4A]/48 sm:text-[0.8rem]">Invoice #2847 • $1,240</div>
              </div>
            </div>
            <div className="text-[0.68rem] font-medium uppercase tracking-[0.08em] text-[#1B2A4A]/35">just now</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
