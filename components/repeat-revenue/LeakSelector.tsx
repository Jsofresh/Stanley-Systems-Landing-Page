"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { cashflowUpsellChips, leakCards } from "./tokens"

export function LeakSelector() {
  const [active, setActive] = useState(0)
  const [cashflow, setCashflow] = useState(false)

  return (
    <section id="leaks" data-section="diagnostic" className="scroll-mt-[120px] bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mx-auto max-w-4xl font-serif text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[#213343] sm:text-5xl">
          Which revenue leak should Stanley Systems fix first?
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-[#33475B]">
          Pick the problem that sounds most expensive. The path below shows what gets built first.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
        {leakCards.map((card, index) => {
          const isActive = index === active
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
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-[#1F7A3A]">0{index + 1}</span>
                {isActive ? <CheckCircle2 className="h-5 w-5 text-[#1F7A3A]" aria-hidden="true" /> : null}
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-[-0.025em] text-[#213343]">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#516F90]">{card.text}</p>
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-7 max-w-6xl rounded-2xl border border-[#C8D8CE] border-l-4 border-l-[#1F7A3A] bg-[#F8FCF9] p-6 shadow-[0_16px_40px_rgba(33,51,67,0.08)] md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#1F7A3A]">What Stanley Systems fixes first</p>
          <h3 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-[#213343]">
            {cashflow ? "Repeat Revenue + Cashflow Control" : "Repeat Revenue path"}
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#33475B]">
            {cashflow
              ? "Repeat Revenue brings customers back. Cashflow Control helps finished work turn into collected cash faster."
              : "Stanley Systems sets up who gets contacted, when they get contacted, and what your office does when someone replies."}
          </p>
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
        </div>
        <a href="#plans" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#1F7A3A] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#17612E] md:mt-0">
          {cashflow ? "See both-system packages" : "See packages"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
