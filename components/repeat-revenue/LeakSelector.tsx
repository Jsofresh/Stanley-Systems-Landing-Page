"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { leakCards } from "./tokens"

export function LeakSelector() {
  const [active, setActive] = useState(0)
  const selected = leakCards[active]

  return (
    <section data-section="diagnostic" className="bg-white px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mx-auto max-w-4xl font-serif text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[#213343] sm:text-5xl">
          Which revenue leak should Stanley Systems fix first?
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#33475B]">
          Pick the problem that sounds most expensive. The path below shows what gets built first.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3">
        {leakCards.map((card, index) => {
          const isActive = index === active
          return (
            <button
              key={card.title}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(index)}
              className={`rounded-2xl border p-6 text-left transition ${
                isActive
                  ? "border-[#FF5C35] bg-[#FFF4EE] shadow-[0_18px_40px_rgba(33,51,67,0.10)]"
                  : "border-[#D5DEE8] bg-white hover:border-[#FF5C35]/60"
              }`}
            >
              <span className="text-sm font-bold text-[#FF5C35]">0{index + 1}</span>
              <h3 className="mt-5 text-2xl font-bold tracking-[-0.025em] text-[#213343]">{card.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#516F90]">{card.text}</p>
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-8 max-w-6xl rounded-2xl bg-[#213343] p-7 text-white shadow-[0_24px_60px_rgba(33,51,67,0.18)] md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#FFBCAC]">What we fix first</p>
          <h3 className="mt-2 text-3xl font-bold tracking-[-0.035em]">{selected.outcome}</h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/78">
            Stanley Systems sets up who gets contacted, when they get contacted, and what your office should do when someone replies.
          </p>
        </div>
        <a href="#plans" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#FF5C35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E04826] md:mt-0">
          See packages <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
