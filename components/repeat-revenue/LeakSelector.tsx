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
        <h2 className="mx-auto max-w-4xl text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.045em] text-[#213343] sm:text-5xl">
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
                  ? "border-[#1F7A3A] bg-[#E8F6EC] shadow-[0_16px_34px_rgba(33,51,67,0.08)]"
                  : "border-[#D5DEE8] bg-white hover:border-[#1F7A3A]/60 hover:bg-[#F7FBF8]"
              }`}
            >
              <div className="flex items-center justify-end">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${isActive ? "border-[#1F7A3A] bg-[#1F7A3A] text-white" : "border-[#C8D8CE] bg-white text-transparent"}`}>
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-[-0.025em] text-[#213343]">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#516F90]">{card.text}</p>
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-7 rounded-[1.35rem] border border-[#C8D8CE] bg-[#F8FCF9] p-4 shadow-[0_16px_40px_rgba(33,51,67,0.08)] sm:p-6 lg:grid-cols-[1.04fr_0.96fr] lg:p-7">
        <div className="rounded-[1rem] border border-[#D5DEE8] bg-white p-3 shadow-[0_10px_26px_rgba(33,51,67,0.06)]">
          <Image
            src={panel.image}
            alt={panel.title}
            width={1536}
            height={1024}
            className="aspect-video w-full rounded-xl object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold text-[#1F7A3A]">What Stanley Systems fixes first</p>
          <h3 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#213343]">{activePanel.title}</h3>
          <p className="mt-4 text-base leading-7 text-[#33475B]">{activePanel.body}</p>

          <div className="mt-5 rounded-2xl border border-[#D5DEE8] bg-white p-4">
            <p className="text-sm font-bold text-[#213343]">How it fixes the leak</p>
            <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-[#33475B]">
              {activePanel.fixes.map((fix) => (
                <li key={fix} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#1F7A3A]" aria-hidden="true" />
                  <span>{fix}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <p className="text-sm font-bold text-[#213343]">Also losing money after the job is done?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cashflowUpsellChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setCashflow(true)}
                  className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${
                    cashflow ? "border-[#1F7A3A] bg-[#DDF3E3] text-[#124E25]" : "border-[#C8D8CE] bg-white text-[#33475B] hover:border-[#1F7A3A]"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <a href="#plans" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#1F7A3A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#17612E]">
            {activePanel.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
