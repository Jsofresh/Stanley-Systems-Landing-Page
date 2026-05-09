"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { cashflowResultPanel, cashflowUpsellChips, leakCards, leakResultPanels } from "./tokens"

export function LeakSelector() {
  const [active, setActive] = useState(0)
  const [cashflow, setCashflow] = useState(false)
  const panel = leakResultPanels[active]
  const activePanel = cashflow ? cashflowResultPanel : panel

  return (
    <section id="leaks" data-section="diagnostic" className="scroll-mt-[120px] bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mx-auto max-w-4xl text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.045em] text-[#102033] sm:text-5xl">
          Which revenue leak should Stanley Systems fix first?
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#33475B]">
          Pick the problem that sounds most expensive. The path below shows what gets built first.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
        {leakCards.map((card, index) => {
          const isActive = index === active && !cashflow
          return (
            <button
              key={card.title}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setActive(index)
                setCashflow(false)
              }}
              className={`min-h-full rounded-2xl border p-5 text-left transition ${
                isActive
                  ? "border-[#15803D] bg-[#F4FBF6] shadow-[0_16px_34px_rgba(21,128,61,0.10)]"
                  : "border-[#D5DEE8] bg-white hover:border-[#15803D]/60 hover:bg-[#F8FBF9]"
              }`}
            >
              <div className="flex items-center justify-end">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${isActive ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#C8D8CE] bg-white text-transparent"}`}>
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-[-0.025em] text-[#102033]">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#516F90]">{card.text}</p>
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-9 max-w-7xl overflow-hidden rounded-[2rem] border border-[#CFE5D6] bg-white shadow-[0_28px_90px_rgba(16,32,51,0.10),0_0_54px_rgba(21,128,61,0.11)]">
        <div className="grid lg:grid-cols-[1.24fr_0.86fr]">
          <div className="relative min-h-[340px] bg-[#F8FBF9] sm:min-h-[430px] lg:min-h-[510px]">
            <Image
              src={panel.image}
              alt={panel.title}
              width={1536}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover object-center"
              priority={active === 0}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-white to-white/0 lg:block" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/72 to-white/0 lg:hidden" aria-hidden="true" />
          </div>

          <div className="relative z-10 flex flex-col justify-center bg-white p-6 sm:p-8 lg:-ml-10 lg:my-10 lg:rounded-l-[1.5rem] lg:border lg:border-[#D7E9DD] lg:p-9 lg:shadow-[0_20px_54px_rgba(16,32,51,0.10)]">
            <p className="text-sm font-bold text-[#15803D]">What Stanley Systems fixes first</p>
            <h3 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#102033]">{activePanel.title}</h3>
            <p className="mt-4 text-base leading-7 text-[#33475B]">{activePanel.body}</p>

            <div className="mt-5 rounded-2xl border border-[#D5DEE8] bg-[#F8FBF9] p-4">
              <p className="text-sm font-bold text-[#102033]">How it fixes the leak</p>
              <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-[#33475B]">
                {activePanel.fixes.map((fix) => (
                  <li key={fix} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#15803D]" aria-hidden="true" />
                    <span>{fix}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-sm font-bold text-[#102033]">Also losing money after the job is done?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {cashflowUpsellChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setCashflow(true)}
                    className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                      cashflow ? "border-[#15803D] bg-[#E8F6EC] text-[#124E25]" : "border-[#C8D8CE] bg-white text-[#33475B] hover:border-[#15803D]"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <a href="#plans" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(21,128,61,0.20)] transition hover:bg-[#17612E]">
              {activePanel.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
