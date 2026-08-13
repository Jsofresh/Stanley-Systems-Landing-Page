"use client"

import { type FormEvent, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, RotateCcw } from "lucide-react"

import { trackStanleyEvent } from "@/lib/posthog-attribution"

type WorkArea = "billing" | "followup" | "records" | "handoffs"
type MissingDetails = "rare" | "weekly" | "daily" | "constant"
type FollowupReliability = "systemized" | "manual" | "memory"

type SliderInputProps = {
  label: string
  value: number
  displayValue: string
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}

const workAreas: Array<{ value: WorkArea; label: string; result: string }> = [
  { value: "billing", label: "Billing & closeouts", result: "billing and job closeouts" },
  { value: "followup", label: "Estimate follow-up", result: "estimate and customer follow-up" },
  { value: "records", label: "Records & paperwork", result: "record cleanup and paperwork" },
  { value: "handoffs", label: "Software handoffs", result: "software handoffs and retyping" },
]

const missingDetailsOptions: Array<{ value: MissingDetails; label: string; weight: number; result: string }> = [
  { value: "rare", label: "Rarely", weight: 0, result: "Missing details are occasional." },
  { value: "weekly", label: "Some weeks", weight: 0.02, result: "Missing details create weekly cleanup." },
  { value: "daily", label: "Most days", weight: 0.05, result: "Missing details slow work most days." },
  { value: "constant", label: "Almost every job", weight: 0.08, result: "Missing details are built into the current process." },
]

const followupOptions: Array<{ value: FollowupReliability; label: string; weight: number; result: string }> = [
  { value: "systemized", label: "A system catches it", weight: 0, result: "Follow-up has a dependable next step." },
  { value: "manual", label: "Someone checks manually", weight: 0.025, result: "Follow-up still depends on a manual check." },
  { value: "memory", label: "It depends on memory", weight: 0.055, result: "Follow-up can disappear when the office gets busy." },
]

function SliderInput({ label, value, displayValue, min, max, step, onChange }: SliderInputProps) {
  const fill = ((value - min) / (max - min)) * 100

  return (
    <label className="block border-b border-[#DCE7DF] py-5 first:pt-0 last:border-b-0 last:pb-0 sm:py-6">
      <span className="flex items-end justify-between gap-4">
        <span className="max-w-[22rem] text-base font-extrabold leading-6 text-[#071D3A] sm:text-lg">{label}</span>
        <span className="shrink-0 text-right text-2xl font-black tracking-[-0.04em] text-[#15803D] sm:text-3xl">{displayValue}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        aria-valuetext={displayValue}
        onChange={(event) => onChange(Number(event.target.value))}
        className="capacity-range mt-5 block w-full cursor-pointer"
        style={{ background: `linear-gradient(90deg, #15803D 0%, #15803D ${fill}%, #DCE7DF ${fill}%, #DCE7DF 100%)` }}
      />
    </label>
  )
}

function ChoiceGroup<T extends string>({ legend, value, options, onChange }: { legend: string; value: T; options: Array<{ value: T; label: string }>; onChange: (value: T) => void }) {
  return (
    <fieldset className="border-b border-[#DCE7DF] py-5 first:pt-0 last:border-b-0 last:pb-0 sm:py-6">
      <legend className="text-base font-extrabold leading-6 text-[#071D3A] sm:text-lg">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((option) => {
          const selected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2.5 text-left text-sm font-extrabold leading-5 transition focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2 ${selected ? "border-[#15803D] bg-[#15803D] text-white shadow-[0_10px_24px_rgba(21,128,61,.18)]" : "border-[#C9D8CD] bg-white text-[#36536C] hover:border-[#15803D]/55 hover:text-[#116832]"}`}
            >
              {selected ? <Check className="mr-1.5 h-4 w-4 shrink-0" aria-hidden="true" /> : null}
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

export function CapacityCalculator() {
  const [employees, setEmployees] = useState(3)
  const [annualCost, setAnnualCost] = useState(60000)
  const [hoursPerPerson, setHoursPerPerson] = useState(8)
  const [processes, setProcesses] = useState(5)
  const [workArea, setWorkArea] = useState<WorkArea>("billing")
  const [missingDetails, setMissingDetails] = useState<MissingDetails>("weekly")
  const [followupReliability, setFollowupReliability] = useState<FollowupReliability>("manual")
  const [showResult, setShowResult] = useState(false)
  const [started, setStarted] = useState(false)

  function begin() {
    if (started) return
    setStarted(true)
    trackStanleyEvent("capacity_calculator_started", { calculator_kind: "office_capacity" })
  }

  const result = useMemo(() => {
    const weeklyHours = employees * hoursPerPerson
    const yearlyHours = weeklyHours * 52
    const hourlyCost = annualCost / 2080
    const yearlyCost = yearlyHours * hourlyCost
    const missingWeight = missingDetailsOptions.find((option) => option.value === missingDetails)?.weight ?? 0
    const followupWeight = followupOptions.find((option) => option.value === followupReliability)?.weight ?? 0
    const eligibleLow = Math.min(0.12 + processes * 0.008 + missingWeight + followupWeight, 0.36)
    const eligibleHigh = Math.min(0.25 + processes * 0.015 + missingWeight + followupWeight, 0.58)

    return {
      weeklyHours,
      yearlyHours,
      yearlyCost,
      lowHours: yearlyHours * eligibleLow,
      highHours: yearlyHours * eligibleHigh,
      lowCost: yearlyCost * eligibleLow,
      highCost: yearlyCost * eligibleHigh,
    }
  }, [employees, annualCost, hoursPerPerson, processes, missingDetails, followupReliability])

  const money = (value: number) => `$${Math.round(value).toLocaleString()}`
  const number = (value: number) => Math.round(value).toLocaleString()
  const compactMoney = (value: number) => {
    if (value >= 1_000_000) {
      const millions = value / 1_000_000
      const digits = millions >= 10 ? 1 : 2
      return `$${millions.toFixed(digits).replace(/\.0+$|(?<=\.[0-9])0$/, "")}M`
    }
    if (value >= 10_000) return `$${Math.round(value / 1_000).toLocaleString()}K`
    return money(value)
  }
  const equivalentRoles = result.yearlyHours / 2080
  const equivalentRolesLabel = (Math.round(equivalentRoles * 10) / 10).toLocaleString(undefined, { maximumFractionDigits: 1 })
  const selectedWorkArea = workAreas.find((option) => option.value === workArea) ?? workAreas[0]
  const selectedMissingDetails = missingDetailsOptions.find((option) => option.value === missingDetails) ?? missingDetailsOptions[0]
  const selectedFollowup = followupOptions.find((option) => option.value === followupReliability) ?? followupOptions[0]

  function scrollToStage(id: string) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
      })
    })
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    begin()
    setShowResult(true)
    trackStanleyEvent("capacity_calculator_completed", {
      calculator_kind: "office_capacity",
      annual_leak_estimate: money(result.yearlyCost),
      event_source: "capacity_calculator_submit",
    })
    scrollToStage("capacity-calculator-result")
  }

  function reset() {
    setShowResult(false)
    scrollToStage("capacity-calculator-inputs")
  }

  function trackCta(location: string) {
    trackStanleyEvent("capacity_calculator_cta_clicked", {
      calculator_kind: "office_capacity",
      annual_leak_estimate: money(result.yearlyCost),
      cta_location: location,
    })
  }

  if (showResult) {
    return (
      <section id="capacity-calculator-result" aria-live="polite" data-capacity-result="true" className="capacity-result-reveal relative scroll-mt-28 overflow-hidden rounded-[2rem] bg-[#061A2B] px-5 py-8 text-white shadow-[0_38px_120px_rgba(4,18,31,.34)] sm:scroll-mt-32 sm:rounded-[2.75rem] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:38px_38px] opacity-45" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-44 h-[38rem] w-[38rem] rounded-full bg-[#15803D]/30 blur-[115px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-52 -left-24 h-[30rem] w-[30rem] rounded-full bg-[#53D986]/12 blur-[115px]" />

        <div className="relative">
          <div className="mx-auto h-1.5 w-24 rounded-full bg-[#53D986] shadow-[0_0_30px_rgba(83,217,134,.55)]" aria-hidden="true" />

          <div className="mt-8 grid gap-9 lg:grid-cols-[1.18fr_.82fr] lg:items-end lg:gap-12">
            <div className="text-center lg:text-left">
              <h2
                data-result-yearly-cost="true"
                aria-label={`${money(result.yearlyCost)} per year of salary capacity tied to repeat office work`}
                className="whitespace-nowrap text-[clamp(4.7rem,12vw,10.5rem)] font-black tabular-nums leading-[0.76] tracking-[-0.085em] text-[#FF5A5F]"
              >
                {compactMoney(result.yearlyCost)}
              </h2>
              <p className="mt-7 max-w-3xl text-balance text-2xl font-black leading-[1.03] tracking-[-0.035em] text-white sm:text-4xl lg:text-[3.2rem]">
                in annual salary capacity tied to repeat office work.
              </p>
            </div>

            <div className="border-t border-white/16 pt-7 text-center lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 lg:text-left">
              <div data-result-yearly-hours="true" className="whitespace-nowrap text-[clamp(4.2rem,9vw,7.4rem)] font-black tabular-nums leading-[0.8] tracking-[-0.075em] text-[#8DF3A4]">{number(result.yearlyHours)}</div>
              <p className="mt-5 text-2xl font-black leading-7 tracking-[-0.025em] text-white sm:text-3xl">hours of repeat admin every year</p>
              <p className="mt-5 border-t border-white/12 pt-5 text-lg font-extrabold leading-7 text-white/66">
                That is <span data-result-equivalent-roles="true" className="text-white">{equivalentRolesLabel} full-time office {equivalentRoles === 1 ? "role" : "roles"}</span> worth of annual capacity.
              </p>
            </div>
          </div>

          <details className="group mx-auto mt-10 max-w-4xl border-y border-white/12 py-4 text-left">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-black text-white/72 marker:hidden sm:text-base">
              <span>See the modeled reduction range</span>
              <span className="text-xl text-[#8DF3A4] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <div className="mt-4 grid gap-4 text-sm font-bold leading-6 text-white/58 sm:grid-cols-2 sm:text-base">
              <p><span className="block text-2xl font-black text-white">{number(result.lowHours)}–{number(result.highHours)} hours/year</span>Illustrative portion that may be eligible to reduce.</p>
              <p><span className="block text-2xl font-black text-white">{money(result.lowCost)}–{money(result.highCost)}</span>Modeled annual salary-capacity range.</p>
              <p data-result-yearly-cost-full="true" className="sm:col-span-2">Full entered-work calculation: {money(result.yearlyCost)}/year across {number(result.yearlyHours)} hours.</p>
            </div>
          </details>

          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/systems-installation-sprint" onClick={() => trackCta("capacity_result_installation")} className="inline-flex min-h-16 w-full items-center justify-center rounded-full bg-[#15803D] px-8 text-center text-lg font-black text-white shadow-[0_20px_50px_rgba(21,128,61,.34)] transition hover:-translate-y-0.5 hover:bg-[#116832] focus:outline-none focus:ring-2 focus:ring-[#8DF3A4] focus:ring-offset-2 focus:ring-offset-[#061A2B] sm:w-auto">See the Installation Sprint <ArrowRight className="ml-2 h-5 w-5" /></Link>
            <Link href="/ai-office-command-map" onClick={() => trackCta("capacity_result_office_map")} className="inline-flex min-h-12 items-center justify-center px-4 text-center text-base font-black text-white/72 underline decoration-white/28 underline-offset-8 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white">Map My Workflow for $197 <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>

          <button type="button" onClick={reset} className="mx-auto mt-4 flex min-h-11 items-center justify-center px-4 text-sm font-extrabold text-white/48 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70">
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" /> Edit my answers
          </button>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs font-semibold leading-5 text-white/36">Modeled estimate only—not guaranteed savings, recovered capacity, or ROI. Exact eligibility depends on your systems, source quality, permissions, approvals, and accepted workflow.</p>
        </div>
      </section>
    )
  }

  return (
    <form id="capacity-calculator-inputs" onSubmit={submit} onChange={begin} data-capacity-inputs="true" className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-[#D5E5DA] bg-white shadow-[0_28px_90px_rgba(7,29,58,.1)] sm:scroll-mt-32 sm:rounded-[2.75rem]">
      <style>{`
        .capacity-range { height: 10px; appearance: none; border-radius: 999px; outline: none; }
        .capacity-range::-webkit-slider-thumb { appearance: none; width: 28px; height: 28px; border-radius: 999px; border: 4px solid white; background: #15803D; box-shadow: 0 5px 18px rgba(7,29,58,.24); }
        .capacity-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 999px; border: 4px solid white; background: #15803D; box-shadow: 0 5px 18px rgba(7,29,58,.24); }
        .capacity-range:focus-visible { box-shadow: 0 0 0 4px rgba(21,128,61,.18); }
        @keyframes capacityResultReveal { from { opacity: 0; transform: translateY(18px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .capacity-result-reveal { animation: capacityResultReveal .55s cubic-bezier(.22,.75,.25,1) both; }
        @media (prefers-reduced-motion: reduce) { .capacity-result-reveal { animation: none; } }
      `}</style>

      <div className="grid lg:grid-cols-[1.05fr_.95fr]">
        <div className="border-b border-[#DCE7DF] p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="flex items-center justify-between gap-5">
            <h2 className="text-2xl font-black tracking-[-0.035em] text-[#071D3A] sm:text-3xl">Move the sliders.</h2>
            <span className="shrink-0 rounded-full bg-[#E8F5EB] px-3 py-1.5 text-xs font-black text-[#15803D]">4 inputs</span>
          </div>
          <div className="mt-7">
            <SliderInput label="Office team size" value={employees} displayValue={`${employees} ${employees === 1 ? "person" : "people"}`} min={1} max={30} step={1} onChange={setEmployees} />
            <SliderInput label="Loaded annual cost per person" value={annualCost} displayValue={money(annualCost)} min={30000} max={140000} step={5000} onChange={setAnnualCost} />
            <SliderInput label="Repeat admin hours per person each week" value={hoursPerPerson} displayValue={`${hoursPerPerson} hours`} min={1} max={30} step={1} onChange={setHoursPerPerson} />
            <SliderInput label="Repeated office processes each week" value={processes} displayValue={`${processes} processes`} min={1} max={20} step={1} onChange={setProcesses} />
          </div>
        </div>

        <div className="p-5 sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-5">
            <h2 className="text-2xl font-black tracking-[-0.035em] text-[#071D3A] sm:text-3xl">Add three details.</h2>
            <span className="shrink-0 rounded-full bg-[#F2EEE5] px-3 py-1.5 text-xs font-black text-[#6B6357]">3 questions</span>
          </div>
          <div className="mt-7">
            <ChoiceGroup legend="Where does repeat work hurt most?" value={workArea} options={workAreas} onChange={setWorkArea} />
            <ChoiceGroup legend="How often does work wait on missing details?" value={missingDetails} options={missingDetailsOptions} onChange={setMissingDetails} />
            <ChoiceGroup legend="What happens when follow-up gets busy?" value={followupReliability} options={followupOptions} onChange={setFollowupReliability} />
          </div>
        </div>
      </div>

      <div className="border-t border-[#DCE7DF] bg-[#F4F8F2] px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
        <button type="submit" className="mx-auto flex min-h-16 w-full max-w-2xl items-center justify-center rounded-full bg-[#15803D] px-7 text-center text-lg font-black text-white shadow-[0_18px_44px_rgba(21,128,61,.26)] transition hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_24px_52px_rgba(21,128,61,.32)] focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2">
          Show My Annual Office Drag <ArrowRight className="ml-2 h-5 w-5" />
        </button>
        <p className="mt-3 text-center text-xs font-bold leading-5 text-[#6B7782]">No email required. Your result appears instantly.</p>
      </div>
    </form>
  )
}
