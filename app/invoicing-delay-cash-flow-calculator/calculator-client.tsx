"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { MoneyLeakChecksForm } from "@/components/money-leak-checks-form"
import {
  CheckCircleDisplayAsset,
  DollarCircleDisplayAsset,
  FileInvoiceDisplayAsset,
  MessageBubbleDisplayAsset,
  UsersDisplayAsset,
} from "@/components/visual-kit/display-assets"

type StepKey =
  | "intro"
  | "invoice"
  | "jobs"
  | "delay"
  | "hours"
  | "unbilled"
  | "corrections"
  | "customerSource"
  | "customers"
  | "followup"
  | "reviews"
  | "missedCalls"
  | "calculating"
  | "results"
  | "resultDiagnosis"
  | "resultMath";

const auditHref = "/workflow-audit"
const CALCULATOR_LOADING_DURATION_MS = 3400

const STEP_ORDER: StepKey[] = [
  "intro",
  "invoice",
  "jobs",
  "delay",
  "hours",
  "unbilled",
  "corrections",
  "customerSource",
  "customers",
  "followup",
  "reviews",
  "missedCalls",
  "results",
  "resultDiagnosis",
  "resultMath",
]

type CustomerListSource = "crm" | "quickbooks" | "spreadsheet" | "scattered"
type UncontactedCustomerRate = "none" | "most" | "half" | "small" | "unsure"
type SimpleSystem = "no" | "manual" | "yes" | "unsure"
type MissedCallRecovery = "nothing" | "voicemail" | "manual" | "automatic" | "unsure"

const customerSourceMessages: Record<CustomerListSource, { label: string; helper: string; firstFix: string }> = {
  crm: {
    label: "Job software or CRM",
    helper: "Housecall Pro, Jobber, ServiceTitan, Wallace, or similar.",
    firstFix: "Your list is already close to usable. The money leak is follow-up.",
  },
  quickbooks: {
    label: "QuickBooks or accounting",
    helper: "Customer records exist, but the list needs cleanup before follow-up.",
    firstFix: "The records exist. The first fix is cleaning them into a follow-up-ready list.",
  },
  spreadsheet: {
    label: "Spreadsheet or contact list",
    helper: "Usable, but likely needs cleanup before it becomes a repeat revenue system.",
    firstFix: "The list exists. The first fix is cleaning it into a follow-up-ready list.",
  },
  scattered: {
    label: "Scattered or not sure",
    helper: "That is a leak by itself. The first fix is building one usable customer list.",
    firstFix: "The first leak is the list. Stanley Systems would first build one clean list from the records you already have.",
  },
}

const uncontactedCustomerSettings: Record<UncontactedCustomerRate, { rate: number; label: string; helper: string }> = {
  none: { rate: 1, label: "None or almost none", helper: "Count 100% as worth checking." },
  most: { rate: 0.85, label: "Most have not been followed up with recently", helper: "Count 85% as worth checking." },
  half: { rate: 0.5, label: "About half have not been followed up with recently", helper: "Count 50% as worth checking." },
  small: { rate: 0.2, label: "Only a small portion has not been followed up with recently", helper: "Count 20% as worth checking." },
  unsure: { rate: 0.75, label: "Not sure", helper: "Count 75%. If nobody knows, treat the list as underworked." },
}

const missedCallSettings: Record<MissedCallRecovery, { multiplier: number; label: string; helper: string }> = {
  nothing: { multiplier: 1, label: "Nothing", helper: "No text back, no office alert, no saved next step." },
  voicemail: { multiplier: 0.7, label: "Voicemail only", helper: "Some people leave a message. Some call the next company." },
  manual: { multiplier: 0.4, label: "Someone calls back manually", helper: "Better than nothing, but it depends on memory and timing." },
  automatic: { multiplier: 0.15, label: "Automatic text reply and office alert", helper: "A fast reply catches more of the work before it disappears." },
  unsure: { multiplier: 0.6, label: "Not sure", helper: "If nobody knows, use a conservative missed-call gap." },
}


const CUSTOMER_BOOKING_WINDOW_MONTHS = 3
const CUSTOMER_BOOKING_WINDOW_LABEL = "90 days"

const repeatJobCases = [
  { key: "conservative", label: "Conservative case", rate: 0.02, helper: "2% book again" },
  { key: "middle", label: "Middle case", rate: 0.04, helper: "4% book again" },
  { key: "bold", label: "Bold case", rate: 0.07, helper: "7% book again" },
] as const

function getFirstFix(sources: CustomerListSource[]) {
  if (sources.includes("scattered")) return customerSourceMessages.scattered.firstFix
  if (sources.includes("quickbooks")) return customerSourceMessages.quickbooks.firstFix
  if (sources.includes("spreadsheet")) return customerSourceMessages.spreadsheet.firstFix
  return customerSourceMessages.crm.firstFix
}

function formatPercent(rate: number) {
  return `${Math.round(rate * 100)}%`
}

const faqItems = [
  {
    question: "Do we need to switch software?",
    answer:
      "No. Stanley Systems works around the tools your team already uses whenever possible. The point is not to rip out QuickBooks, Jobber, Housecall Pro, ServiceTitan, Wallace, or your current setup. The point is to fix the gaps where work, billing, follow-up, and customer records fall through.",
  },
  {
    question: "Who is this best for?",
    answer:
      "Service businesses with real job volume, repeat customers, invoices, estimates, calls, and at least one person dealing with office work. If your team already uses job software, accounting software, spreadsheets, or a CRM, Stanley Systems can find where money is getting stuck.",
  },
  {
    question: "What if we are not sure where the real problem is?",
    answer:
      "That is exactly what the Cash Flow Assessment is for. Stanley Systems checks the path from lead to job, job to invoice, invoice to payment, and customer to repeat revenue. You leave knowing which leak matters first.",
  },
  {
    question: "I have been burned by consultants before. Why is this different?",
    answer:
      "Stanley Systems is not selling a giant strategy deck. The assessment finds specific money leaks, then the build focuses on practical fixes your team can actually use: cleaner handoffs, faster billing, better follow-up, and fewer missed customers.",
  },
]

function boundNumber(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function formatMoney(value: number) {
  return `$${Math.round(value).toLocaleString()}`
}

function roundToNearest(value: number, nearest: number) {
  if (!Number.isFinite(value) || value <= 0) return 0
  return Math.round(value / nearest) * nearest
}

function formatRoundedCompact(value: number, kind: "monthly" | "annual" = "monthly") {
  const rounded = kind === "annual"
    ? roundToNearest(value, 10000)
    : roundToNearest(value, value < 15000 ? 500 : value < 100000 ? 1000 : 5000)

  if (rounded >= 1000) {
    const thousands = rounded / 1000
    const label = Number.isInteger(thousands) ? thousands.toLocaleString() : thousands.toFixed(1)
    return `$${label}K`
  }

  return `$${rounded.toLocaleString()}`
}

function formatRoundedRange(low: number, high: number, kind: "monthly" | "annual" = "monthly") {
  const lowLabel = formatRoundedCompact(low, kind)
  const highLabel = formatRoundedCompact(high, kind)
  return lowLabel === highLabel ? lowLabel : `${lowLabel} to ${highLabel}`
}

type ResultSummaryInput = {
  delayedCashDrag: number
  officeTimeCost: number
  stuckUnbilledValue: number
  correctionLoss: number
  cashflowImpact: number
  totalSavedCustomerRecords: number
  estimatedUnderworkedCustomers: number
  repeatValue: number
  conservativeFollowupOpportunity: number
  estimatedFollowupOpportunity: number
  boldFollowupOpportunity: number
  missedCallLoss: number
  customerRevenueLow: number
  customerRevenueHigh: number
  totalLow: number
  totalHigh: number
}

type ResultDriver = {
  key: string
  label: string
  meaning: string
  value?: number
  displayValue?: string
}

type CustomerScenarioDetail = {
  key: string
  label: string
  assumption: string
  meaning: string
  monthlyValue: number
  displayValue: string
}

type CalculationRelationship = "direct" | "rough" | "built-from"

function finiteMoney(value: number) {
  return Number.isFinite(value) && value > 0 ? value : 0
}

function hasMeaningfulValue(value: number) {
  return Number.isFinite(value) && value > 0
}

function formatResultRange(min: number, max: number, kind: "monthly" | "annual" = "monthly") {
  return formatRoundedRange(finiteMoney(min), finiteMoney(max), kind)
}

function formatNumberLabel(value: number) {
  return Number.isFinite(value) && value > 0 ? Math.round(value).toLocaleString() : "0"
}

function pickLargestDollarDriver(drivers: ResultDriver[]) {
  return drivers
    .filter((driver) => hasMeaningfulValue(driver.value ?? 0))
    .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))[0]
}

function formatMonthlyDisplay(value: number) {
  return `${formatRoundedCompact(finiteMoney(value), "monthly")}/month`
}

function formatMonthlyRangeDisplay(min: number, max: number) {
  return `${formatResultRange(min, max, "monthly")}/month`
}

function createResultSummary(result: ResultSummaryInput & {
  customerRevenueImpact?: number
  followupCases?: Array<{ key: string; label: string; rate: number; helper: string; bookings: number; monthlyValue: number }>
  missedCallLabel?: string
}) {
  const totalMonthlyLeakMin = finiteMoney(result.totalLow)
  const totalMonthlyLeakMax = finiteMoney(result.totalHigh)
  const totalAnnualLeakMin = totalMonthlyLeakMin * 12
  const totalAnnualLeakMax = totalMonthlyLeakMax * 12
  const cashMonthlyLeak = finiteMoney(result.cashflowImpact)
  const customerMonthlyLeakMin = finiteMoney(result.customerRevenueLow)
  const customerMonthlyLeakMax = finiteMoney(result.customerRevenueHigh)
  const customerMonthlyMiddle = finiteMoney(result.customerRevenueImpact ?? result.estimatedFollowupOpportunity + result.missedCallLoss)
  const costOfWaiting30DayRange = { min: totalMonthlyLeakMin, max: totalMonthlyLeakMax }
  const costOfWaiting90DayRange = { min: totalMonthlyLeakMin * 3, max: totalMonthlyLeakMax * 3 }
  const costOfWaiting12MonthRange = { min: totalAnnualLeakMin, max: totalAnnualLeakMax }

  const formattedHeadlineRange = formatResultRange(totalAnnualLeakMin, totalAnnualLeakMax, "annual")
  const formattedMonthlyRange = formatResultRange(totalMonthlyLeakMin, totalMonthlyLeakMax, "monthly")
  const formattedCashMonthly = formatRoundedCompact(cashMonthlyLeak, "monthly")
  const formattedCashAnnual = formatRoundedCompact(cashMonthlyLeak * 12, "annual")
  const formattedCustomerMonthly = formatResultRange(customerMonthlyLeakMin, customerMonthlyLeakMax, "monthly")
  const formattedCustomerAnnual = formatResultRange(customerMonthlyLeakMin * 12, customerMonthlyLeakMax * 12, "annual")
  const formattedCTAValue = totalMonthlyLeakMin === totalMonthlyLeakMax
    ? formatRoundedCompact(totalMonthlyLeakMin, "monthly")
    : formattedMonthlyRange

  const cashDrivers: ResultDriver[] = [
    {
      key: "slow-invoice-drag",
      label: "slow invoice drag",
      meaning: "Completed work is waiting too long before cash starts moving.",
      value: finiteMoney(result.delayedCashDrag),
      displayValue: formatMoney(result.delayedCashDrag),
    },
    {
      key: "unbilled-work",
      label: "completed jobs sitting unbilled",
      meaning: "Finished jobs have not turned into invoices yet.",
      value: finiteMoney(result.stuckUnbilledValue),
      displayValue: formatMoney(result.stuckUnbilledValue),
    },
    {
      key: "office-cleanup",
      label: "office cleanup time",
      meaning: "Paid admin time is being spent fixing records instead of moving money.",
      value: finiteMoney(result.officeTimeCost),
      displayValue: formatMoney(result.officeTimeCost),
    },
    {
      key: "correction-drag",
      label: "invoice correction drag",
      meaning: "Billing mistakes and rework are adding delay.",
      value: finiteMoney(result.correctionLoss),
      displayValue: formatMoney(result.correctionLoss),
    },
  ].filter((driver) => hasMeaningfulValue(driver.value ?? 0)).sort((a, b) => (b.value ?? 0) - (a.value ?? 0))

  const customerDollarDrivers: ResultDriver[] = [
    {
      key: "repeat-job-opportunity",
      label: "repeat-job money",
      meaning: "Past customers can turn into booked jobs when the list gets worked.",
      value: finiteMoney(result.estimatedFollowupOpportunity),
      displayValue: formatMoney(result.estimatedFollowupOpportunity),
    },
    {
      key: "missed-call-gap",
      label: "missed-call gap",
      meaning: "Missed or late calls can become lost booked work.",
      value: finiteMoney(result.missedCallLoss),
      displayValue: formatMoney(result.missedCallLoss),
    },
    {
      key: "conservative-saved-customer-opportunity",
      label: "small saved-customer check",
      meaning: "A smaller response from the saved customer list still creates money worth checking.",
      value: finiteMoney(result.conservativeFollowupOpportunity),
      displayValue: formatMoney(result.conservativeFollowupOpportunity),
    },
    {
      key: "bold-saved-customer-opportunity",
      label: "larger saved-customer check",
      meaning: "A stronger response from the saved customer list makes the leak larger.",
      value: finiteMoney(result.boldFollowupOpportunity),
      displayValue: formatMoney(result.boldFollowupOpportunity),
    },
  ].filter((driver) => hasMeaningfulValue(driver.value ?? 0))

  const selectedCashDriver = pickLargestDollarDriver(cashDrivers)
  let selectedCustomerDriver: ResultDriver | undefined
  if (result.estimatedUnderworkedCustomers > 0) {
    selectedCustomerDriver = {
      key: "saved-customer-records",
      label: `${result.estimatedUnderworkedCustomers.toLocaleString()} saved customer records checked`,
      meaning: "The calculator counts customer records that are worth checking for follow-up.",
      value: undefined,
    }
  } else if (result.estimatedFollowupOpportunity > 0) {
    selectedCustomerDriver = customerDollarDrivers.find((driver) => driver.key === "repeat-job-opportunity")
  } else if (result.missedCallLoss > 0) {
    selectedCustomerDriver = customerDollarDrivers.find((driver) => driver.key === "missed-call-gap")
  } else {
    selectedCustomerDriver = pickLargestDollarDriver(customerDollarDrivers)
  }

  const hasMeaningfulLeak =
    Number.isFinite(totalMonthlyLeakMin) &&
    Number.isFinite(totalMonthlyLeakMax) &&
    totalMonthlyLeakMax > 0

  const cashPlusCustomerMin = cashMonthlyLeak + customerMonthlyLeakMin
  const cashPlusCustomerMax = cashMonthlyLeak + customerMonthlyLeakMax
  const roundingTolerance = 2
  const exactMatches = Math.abs(totalMonthlyLeakMin - cashPlusCustomerMin) <= roundingTolerance && Math.abs(totalMonthlyLeakMax - cashPlusCustomerMax) <= roundingTolerance
  const roundedMatches =
    formatRoundedRange(totalMonthlyLeakMin, totalMonthlyLeakMax, "monthly") ===
    formatRoundedRange(cashPlusCustomerMin, cashPlusCustomerMax, "monthly")
  const calculationRelationship: CalculationRelationship = exactMatches ? "direct" : roundedMatches ? "rough" : "built-from"
  const equationText = calculationRelationship === "direct"
    ? `${formatMonthlyRangeDisplay(totalMonthlyLeakMin, totalMonthlyLeakMax)} = ${formatMonthlyDisplay(cashMonthlyLeak)} cash drag + ${formatMonthlyRangeDisplay(customerMonthlyLeakMin, customerMonthlyLeakMax)} customer revenue drag.`
    : calculationRelationship === "rough"
      ? `${formatMonthlyRangeDisplay(totalMonthlyLeakMin, totalMonthlyLeakMax)} is built from about ${formatMonthlyDisplay(cashMonthlyLeak)} cash drag plus ${formatMonthlyRangeDisplay(customerMonthlyLeakMin, customerMonthlyLeakMax)} customer revenue drag.`
      : `${formatMonthlyRangeDisplay(totalMonthlyLeakMin, totalMonthlyLeakMax)} is built from these leak areas.`

  const equationComponents = [
    { label: "Cash drag", value: cashMonthlyLeak, displayValue: formatMonthlyDisplay(cashMonthlyLeak) },
    { label: "Customer money drag", value: customerMonthlyMiddle || customerMonthlyLeakMax, displayValue: formatMonthlyRangeDisplay(customerMonthlyLeakMin, customerMonthlyLeakMax) },
  ].filter((component) => hasMeaningfulValue(component.value))

  const scenarioMeanings: Record<string, string> = {
    conservative: "A small number of past customers book again.",
    middle: "More saved customers respond to follow-up.",
    bold: "Stronger response from the customer list.",
  }

  const scenarioSource = result.followupCases?.length ? result.followupCases : repeatJobCases.map((scenario) => ({
    ...scenario,
    bookings: Math.round(result.estimatedUnderworkedCustomers * scenario.rate),
    monthlyValue: scenario.key === "conservative"
      ? result.conservativeFollowupOpportunity
      : scenario.key === "middle"
        ? result.estimatedFollowupOpportunity
        : result.boldFollowupOpportunity,
  }))

  const customerScenarios: CustomerScenarioDetail[] = scenarioSource
    .filter((scenario) => hasMeaningfulValue(scenario.monthlyValue) || scenario.bookings > 0)
    .map((scenario) => ({
      key: scenario.key,
      label: scenario.label.replace(" case", ""),
      assumption: `${formatPercent(scenario.rate)} book again`,
      meaning: scenarioMeanings[scenario.key] ?? "This is one booking scenario used by the calculator.",
      monthlyValue: finiteMoney(scenario.monthlyValue),
      displayValue: formatMoney(scenario.monthlyValue),
    }))

  const missedCallImpact = finiteMoney(result.missedCallLoss) > 0 ? {
    label: "missed-call gap",
    meaning: `Missed-call gap is added separately using ${result.missedCallLabel?.toLowerCase() ?? "the selected call setting"}.`,
    value: finiteMoney(result.missedCallLoss),
    displayValue: formatMoney(result.missedCallLoss),
  } : undefined

  const workflowAuditChecks = [
    cashDrivers.some((driver) => ["unbilled-work", "slow-invoice-drag"].includes(driver.key)) ? "Which finished jobs are stuck before invoicing" : undefined,
    cashDrivers.some((driver) => driver.key === "slow-invoice-drag") ? "Which invoices are aging without the right follow-up" : undefined,
    result.estimatedUnderworkedCustomers > 0 ? "Which customer records are worth reactivating first" : undefined,
    missedCallImpact ? "Which missed calls are becoming lost work" : undefined,
    cashDrivers.some((driver) => ["office-cleanup", "correction-drag"].includes(driver.key)) ? "Which office handoff keeps causing the leak" : undefined,
  ].filter(Boolean) as string[]

  return {
    totalMonthlyLeakMin,
    totalMonthlyLeakMax,
    totalAnnualLeakMin,
    totalAnnualLeakMax,
    cashMonthlyLeak,
    customerMonthlyLeakMin,
    customerMonthlyLeakMax,
    costOfWaiting30DayRange,
    costOfWaiting90DayRange,
    costOfWaiting12MonthRange,
    formattedHeadlineRange,
    formattedMonthlyRange,
    formattedCardValues: {
      cashMonthly: formattedCashMonthly,
      cashAnnual: formattedCashAnnual,
      customerMonthly: formattedCustomerMonthly,
      customerAnnual: formattedCustomerAnnual,
      wait30Days: formatResultRange(costOfWaiting30DayRange.min, costOfWaiting30DayRange.max, "monthly"),
      wait90Days: formatResultRange(costOfWaiting90DayRange.min, costOfWaiting90DayRange.max, "monthly"),
      wait12Months: formatResultRange(costOfWaiting12MonthRange.min, costOfWaiting12MonthRange.max, "annual"),
    },
    formattedCTAValue,
    selectedCashDriver,
    selectedCustomerDriver,
    cashDrivers,
    customerDollarDrivers,
    customerScenarios,
    missedCallImpact,
    equationText,
    equationComponents,
    calculationRelationship,
    savedCustomerRecordCount: Math.max(result.totalSavedCustomerRecords, 0),
    estimatedUnderworkedCustomers: Math.max(result.estimatedUnderworkedCustomers, 0),
    averageRepeatJobValue: finiteMoney(result.repeatValue),
    formattedAverageRepeatJobValue: formatMoney(result.repeatValue),
    bookingScenarioWindow: CUSTOMER_BOOKING_WINDOW_LABEL,
    customerRangeExplanation: customerScenarios.length > 0
      ? `Built from ${formatNumberLabel(result.estimatedUnderworkedCustomers)} saved customer records × ${formatMoney(result.repeatValue)} average repeat job value × booking scenarios over ${CUSTOMER_BOOKING_WINDOW_LABEL}.`
      : "The range comes from conservative, middle, and stronger booking scenarios already used by the calculator.",
    workflowAuditChecks,
    hasMeaningfulLeak,
  }
}

function StepFrame({
  title,
  body,
  children,
  canContinue = true,
  continueLabel = "Next",
  progress,
  step,
  onBack,
  onNext,
  compact = false,
}: {
  title: string
  body?: string
  children?: React.ReactNode
  canContinue?: boolean
  continueLabel?: string
  progress: number
  step: StepKey
  onBack: () => void
  onNext: () => void
  compact?: boolean
}) {
  return (
    <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1240px] items-center justify-center">
        <div className={`box-border w-full max-w-full overflow-hidden rounded-[1.65rem] border border-[#e8dfd0] bg-white/96 shadow-[0_22px_80px_rgba(15,23,42,0.10)] backdrop-blur sm:rounded-[2.25rem] lg:rounded-[2.5rem] ${compact ? "p-4 sm:p-5 lg:p-4" : "p-4 sm:p-7 lg:p-9"}`}>
          <div className="mb-5 sm:mb-6">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#efe9dc] sm:h-2">
              <div className="h-full rounded-full bg-[#15803D] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mx-auto max-w-4xl space-y-3 text-center sm:space-y-4">
            <h1 className={`font-semibold leading-[1.04] tracking-tight text-slate-900 lg:leading-[1.01] ${compact ? "text-[1.45rem] sm:text-[2rem] lg:text-[2.35rem]" : "text-[1.7rem] sm:text-[2.7rem] lg:text-[3.45rem]"}`}>{title}</h1>
            {body ? <p className={`mx-auto max-w-3xl text-sm leading-6 text-slate-600 sm:leading-7 ${compact ? "sm:text-base lg:text-[0.98rem]" : "sm:text-lg lg:text-[1.05rem] lg:leading-8"}`}>{body}</p> : null}
          </div>

          {children}

          <div className="mt-6 grid w-full max-w-full grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-[1fr_1fr_auto] sm:items-center lg:mt-8">
            <button
              type="button"
              onClick={onBack}
              className={`inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#f4efe6] ${step === "intro" ? "invisible" : ""}`}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              data-calculator-next="true"
              onClick={onNext}
              disabled={!canContinue}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#116832] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {continueLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <Link
              href="/"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#d8d1c4] bg-white/70 px-4 py-2 text-sm font-semibold text-slate-500 transition hover:border-[#bfc8bd] hover:bg-[#fbfaf7] hover:text-slate-800 sm:min-h-11"
            >
              Back to site
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function BigNumberInput({ value, onChange, prefix, suffix }: { value: string; onChange: (value: string) => void; prefix?: string; suffix?: string }) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    const raf = requestAnimationFrame(() => {
      el.focus()
      const end = el.value.length
      el.setSelectionRange(end, end)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className="mx-auto mt-7 box-border w-full max-w-3xl rounded-[1.45rem] border border-[#e8dfd0] bg-[#fbfaf7] px-4 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:mt-8 sm:rounded-[1.9rem] sm:px-8 sm:py-8 lg:max-w-4xl lg:px-10 lg:py-10"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex min-h-[68px] min-w-0 items-center justify-center gap-1 text-4xl font-semibold text-slate-900 sm:min-h-[86px] sm:gap-3 sm:text-6xl lg:min-h-[96px] lg:text-[4.6rem]">
        {prefix ? <span className="shrink-0 text-slate-400">{prefix}</span> : null}
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
          inputMode="decimal"
          enterKeyHint="next"
          className="min-w-0 flex-1 bg-transparent px-1 text-center outline-none"
        />
        {suffix ? <span className="shrink-0 text-lg text-slate-400 sm:text-3xl lg:text-4xl">{suffix}</span> : null}
      </div>
    </div>
  )
}

function ChoiceGrid<T extends string>({
  value,
  onChange,
  options,
  compact = false,
}: {
  value: T
  onChange: (value: T) => void
  options: Array<{ value: T; label: string; detail?: string }>
  compact?: boolean
}) {
  return (
    <div className={`mx-auto grid w-full gap-3 sm:grid-cols-2 ${compact ? "mt-3 max-w-full" : "mt-7 max-w-5xl sm:mt-8"}`}>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`box-border w-full min-w-0 rounded-[1.05rem] border px-4 text-left transition sm:rounded-[1.25rem] ${compact ? "py-3 sm:px-4 sm:py-3" : "py-3.5 sm:px-5 sm:py-4"} ${
              selected
                ? "border-[#15803D]/40 bg-[#eef9f2] shadow-[0_14px_35px_rgba(21,128,61,0.12)]"
                : "border-[#e8dfd0] bg-white hover:border-[#cfe8d5] hover:bg-[#fbfaf7]"
            }`}
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#d8d1c4] bg-white text-transparent"}`}>
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-5 text-slate-900 sm:text-base sm:leading-6">{option.label}</span>
                {option.detail ? <span className="mt-1 block text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{option.detail}</span> : null}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function MultiChoiceGrid<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T[]
  onChange: (value: T[]) => void
  options: Array<{ value: T; label: string; detail?: string }>
}) {
  return (
    <div className="mx-auto mt-7 grid w-full max-w-5xl gap-3 sm:mt-8 sm:grid-cols-2">
      {options.map((option) => {
        const selected = value.includes(option.value)
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => {
              const next = selected ? value.filter((item) => item !== option.value) : [...value, option.value]
              onChange(next.length ? next : [option.value])
            }}
            className={`box-border w-full min-w-0 rounded-[1.05rem] border px-4 py-3.5 text-left transition sm:rounded-[1.25rem] sm:px-5 sm:py-4 ${
              selected
                ? "border-[#15803D]/40 bg-[#eef9f2] shadow-[0_14px_35px_rgba(21,128,61,0.12)]"
                : "border-[#e8dfd0] bg-white hover:border-[#cfe8d5] hover:bg-[#fbfaf7]"
            }`}
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#d8d1c4] bg-white text-transparent"}`}>
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-5 text-slate-900 sm:text-base sm:leading-6">{option.label}</span>
                {option.detail ? <span className="mt-1 block text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{option.detail}</span> : null}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export function InvoicingDelayCalculatorClient() {
  const [step, setStep] = useState<StepKey>("intro")
  const [invoiceValue, setInvoiceValue] = useState("1200")
  const [jobsPerMonth, setJobsPerMonth] = useState("25")
  const [delayDays, setDelayDays] = useState("4")
  const [hoursLost, setHoursLost] = useState("0.5")
  const [unbilledJobs, setUnbilledJobs] = useState("3")
  const [correctionRate, setCorrectionRate] = useState("20")
  const [customerListSources, setCustomerListSources] = useState<CustomerListSource[]>(["crm"])
  const [totalSavedCustomerRecords, setTotalSavedCustomerRecords] = useState("400")
  const [repeatJobValue, setRepeatJobValue] = useState("850")
  const [uncontactedCustomerRate, setUncontactedCustomerRate] = useState<UncontactedCustomerRate>("none")
  const [reviewFollowup, setReviewFollowup] = useState<SimpleSystem>("manual")
  const [referralFollowup, setReferralFollowup] = useState<SimpleSystem>("no")
  const [missedCallRecovery, setMissedCallRecovery] = useState<MissedCallRecovery>("voicemail")
  const [missedCallsPerMonth, setMissedCallsPerMonth] = useState("12")
  const [isCalculating, setIsCalculating] = useState(false)
  const calculatingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stepIndex = STEP_ORDER.indexOf(step)
  const progress = step === "intro" ? 6 : Math.round((stepIndex / (STEP_ORDER.length - 1)) * 100)

  const result = useMemo(() => {
    const invoice = Number(invoiceValue) || 0
    const jobs = Number(jobsPerMonth) || 0
    const days = Number(delayDays) || 0
    const hours = Number(hoursLost) || 0
    const unbilled = Number(unbilledJobs) || 0
    const correction = (Number(correctionRate) || 0) / 100
    const savedRecords = Math.max(Number(totalSavedCustomerRecords) || 0, 0)
    const repeatValue = Number(repeatJobValue) || invoice
    const missedCalls = Math.max(Number(missedCallsPerMonth) || 0, 0)

    const monthlyBilledValue = invoice * jobs
    const delayedCashDrag = monthlyBilledValue * (days / 30)
    const monthlyLaborHours = jobs * hours
    const officeTimeCost = monthlyLaborHours * 35
    const stuckUnbilledValue = invoice * unbilled
    const correctionLoss = monthlyBilledValue * correction * 0.03
    const cashflowImpact = delayedCashDrag + officeTimeCost + stuckUnbilledValue + correctionLoss

    const rate = uncontactedCustomerSettings[uncontactedCustomerRate]
    const estimatedUnderworkedCustomers = Math.round(savedRecords * rate.rate)
    const followupCases = repeatJobCases.map((scenario) => ({
      ...scenario,
      bookings: Math.round(estimatedUnderworkedCustomers * scenario.rate),
      monthlyValue: (estimatedUnderworkedCustomers * scenario.rate * repeatValue) / CUSTOMER_BOOKING_WINDOW_MONTHS,
    }))
    const conservativeFollowupOpportunity = followupCases[0].monthlyValue
    const estimatedFollowupOpportunity = followupCases[1].monthlyValue
    const boldFollowupOpportunity = followupCases[2].monthlyValue

    const missedCall = missedCallSettings[missedCallRecovery]
    const missedCallLoss = missedCalls * repeatValue * 0.2 * missedCall.multiplier
    const customerRevenueImpact = estimatedFollowupOpportunity + missedCallLoss
    const customerRevenueLow = conservativeFollowupOpportunity + missedCallLoss
    const customerRevenueHigh = boldFollowupOpportunity + missedCallLoss
    const totalImpact = cashflowImpact + customerRevenueImpact
    const totalLow = cashflowImpact + customerRevenueLow
    const totalHigh = cashflowImpact + customerRevenueHigh
    const cashflowShare = totalImpact > 0 ? cashflowImpact / totalImpact : 0
    const customerRevenueShare = totalImpact > 0 ? customerRevenueImpact / totalImpact : 0
    const bothMeaningful = cashflowShare >= 0.35 && customerRevenueShare >= 0.35

    let recommendedFirstMove = "Use the Cash Flow Assessment to decide which leak gets fixed first."
    if (!bothMeaningful && cashflowImpact > 0 && customerRevenueImpact === 0) recommendedFirstMove = "Start with the Cashflow Control System."
    else if (!bothMeaningful && customerRevenueImpact > 0 && cashflowImpact === 0) recommendedFirstMove = "Start with the Repeat Revenue System."
    else if (!bothMeaningful && cashflowShare >= 0.6) recommendedFirstMove = "Start with the Cashflow Control System."
    else if (!bothMeaningful && customerRevenueShare >= 0.6) recommendedFirstMove = "Start with the Repeat Revenue System."

    return {
      monthlyBilledValue,
      delayedCashDrag,
      monthlyLaborHours,
      officeTimeCost,
      stuckUnbilledValue,
      correctionLoss,
      cashflowImpact,
      totalSavedCustomerRecords: savedRecords,
      estimatedUnderworkedCustomers,
      repeatValue,
      followupCases,
      conservativeFollowupOpportunity,
      estimatedFollowupOpportunity,
      boldFollowupOpportunity,
      missedCallLoss,
      customerRevenueImpact,
      customerRevenueLow,
      customerRevenueHigh,
      cashflowShare,
      customerRevenueShare,
      bothMeaningful,
      recommendedFirstMove,
      missedCallLabel: missedCall.label,
      reviewNeedsWork: reviewFollowup !== "yes",
      referralNeedsWork: referralFollowup !== "yes",
      totalImpact,
      totalLow,
      totalHigh,
      firstFix: getFirstFix(customerListSources),
      customerSourceLabel: customerListSources.map((source) => customerSourceMessages[source].label).join(", "),
      uncontactedLabel: rate.label,
    }
  }, [invoiceValue, jobsPerMonth, delayDays, hoursLost, unbilledJobs, correctionRate, totalSavedCustomerRecords, repeatJobValue, uncontactedCustomerRate, reviewFollowup, referralFollowup, missedCallsPerMonth, missedCallRecovery, customerListSources])

  const resultSummary = useMemo(() => createResultSummary(result), [result])

  useEffect(() => {
    return () => {
      if (calculatingTimerRef.current) clearTimeout(calculatingTimerRef.current)
    }
  }, [])

  function next(nextStep?: StepKey) {
    if (nextStep) {
      setStep(nextStep)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    if (step === "missedCalls") {
      setIsCalculating(true)
      setStep("calculating")
      window.scrollTo({ top: 0, behavior: "smooth" })
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
      const duration = reduceMotion ? 900 : CALCULATOR_LOADING_DURATION_MS
      calculatingTimerRef.current = setTimeout(() => {
        setIsCalculating(false)
        setStep("results")
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, duration)
      return
    }
    const idx = STEP_ORDER.indexOf(step)
    if (idx < STEP_ORDER.length - 1) {
      setStep(STEP_ORDER[idx + 1])
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  function back() {
    if (calculatingTimerRef.current) {
      clearTimeout(calculatingTimerRef.current)
      calculatingTimerRef.current = null
    }
    setIsCalculating(false)
    const idx = STEP_ORDER.indexOf(step)
    if (idx > 0) {
      setStep(STEP_ORDER[idx - 1])
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const frameProps = { progress, step, onBack: back, onNext: () => next() }

  if (isCalculating || step === "calculating") {
    return (
      <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6" data-calculator-loading="true">
        <style>{`
          .calculator-load-bar { animation: calculatorLoad ${CALCULATOR_LOADING_DURATION_MS}ms cubic-bezier(.22,.74,.22,1) forwards; }
          @keyframes calculatorLoad { from { transform: translateX(-100%); } to { transform: translateX(0%); } }
          @media (prefers-reduced-motion: reduce) { .calculator-load-bar { animation-duration: 900ms; } }
        `}</style>
        <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1180px] items-center justify-center">
          <div className="box-border w-full max-w-3xl overflow-hidden rounded-[1.8rem] border border-[#d9efe2] bg-[#071422] p-6 text-center text-white shadow-[0_30px_100px_rgba(7,20,34,0.24)] sm:rounded-[2.4rem] sm:p-10">
            <div className="mx-auto h-2 w-full max-w-xl overflow-hidden rounded-full bg-white/12 ring-1 ring-white/10">
              <div className="calculator-load-bar h-full w-full origin-left rounded-full bg-[#53d986] shadow-[0_0_28px_rgba(83,217,134,0.42)]" />
            </div>
            <h1 className="mt-8 text-[2.4rem] font-semibold leading-none tracking-[-0.045em] sm:text-[4rem]">Calculating...</h1>
            <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-7 text-[#d7e5dc] sm:text-xl">Finding where revenue is still stuck.</p>
          </div>
        </div>
      </section>
    )
  }

  const quizContent = (() => {
    if (step === "intro") {
      return (
        <StepFrame {...frameProps}
          title="Find the money left on the table in your business."
          continueLabel="Start the calculator"
        >
          <div className="mx-auto mt-4 box-border w-full max-w-5xl rounded-[1.45rem] border border-[#cfe8d5] bg-[linear-gradient(180deg,#effaf2_0%,#ffffff_100%)] p-5 text-left sm:mt-6 sm:rounded-[1.9rem] sm:p-6">
            <div className="text-sm font-bold leading-tight text-[#15803D]">Estimated monthly money worth checking</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">$3,000 to $25,000+</div>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              The calculator shows which leak is costing the business first: collected cash, follow-up, or both.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#d8ecd9] bg-white p-4 text-sm leading-6 text-slate-700">
                <span className="font-semibold text-slate-950">Cashflow Control System:</span> turn finished work into collected cash faster.
              </div>
              <div className="rounded-2xl border border-[#d8ecd9] bg-white p-4 text-sm leading-6 text-slate-700">
                <span className="font-semibold text-slate-950">Repeat Revenue System:</span> get more money from customers already earned.
              </div>
            </div>
          </div>
        </StepFrame>
      )
    }

    if (step === "invoice") {
      return (
        <StepFrame {...frameProps}
          title="How much money is tied to each invoice?"
          body="The bigger each invoice is, the more money gets trapped every time billing slips."
        >
          <BigNumberInput value={invoiceValue} onChange={setInvoiceValue} prefix="$" />
        </StepFrame>
      )
    }

    if (step === "jobs") {
      return (
        <StepFrame {...frameProps}
          title="How many finished jobs are waiting to turn into cash each month?"
          body="Even small invoicing delays get expensive when completed work keeps stacking up week after week."
        >
          <BigNumberInput value={jobsPerMonth} onChange={setJobsPerMonth} suffix="jobs" />
        </StepFrame>
      )
    }

    if (step === "delay") {
      return (
        <StepFrame {...frameProps}
          title="How many days does your money sit before you bill it?"
          body="Every extra day before the invoice goes out is another day your cash stays stuck instead of coming in."
        >
          <BigNumberInput value={delayDays} onChange={setDelayDays} suffix="days" />
        </StepFrame>
      )
    }

    if (step === "hours") {
      return (
        <StepFrame {...frameProps}
          title="How much office time gets burned just to send one invoice?"
          body="Think re-entry, missing details, cleanup, and chasing field info that should have been ready the first time."
        >
          <BigNumberInput value={hoursLost} onChange={setHoursLost} suffix="hrs" />
        </StepFrame>
      )
    }

    if (step === "unbilled") {
      return (
        <StepFrame {...frameProps}
          title="How many completed jobs are usually sitting unbilled right now?"
          body="If work is done but the invoice is still not out, that is money already earned and still stuck."
        >
          <BigNumberInput value={unbilledJobs} onChange={setUnbilledJobs} suffix="jobs" />
        </StepFrame>
      )
    }

    if (step === "corrections") {
      return (
        <StepFrame {...frameProps}
          title="What percent of invoices need corrections before they can go out?"
          body="Missing details and cleanup slow cash down and waste payroll time on work that should already be finished."
          continueLabel="Next: customer revenue"
        >
          <BigNumberInput value={correctionRate} onChange={setCorrectionRate} suffix="%" />
          <div className="mx-auto mt-8 box-border w-full max-w-4xl rounded-[1.5rem] border border-[#cfe8d5] bg-[#f4fbf5] p-5 text-left">
            <p className="text-base font-semibold leading-7 text-slate-900">Cash stuck in billing is one leak. Old customers sitting untouched is another.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Now let’s check the money inside the customer list your business already owns.</p>
          </div>
        </StepFrame>
      )
    }

    if (step === "customerSource") {
      return (
        <StepFrame {...frameProps}
          title="Where is your customer list saved?"
          body="A messy list does not erase the money. It shows where Stanley Systems starts: getting the list clean enough to use."
        >
          <MultiChoiceGrid<CustomerListSource>
            value={customerListSources}
            onChange={setCustomerListSources}
            options={Object.entries(customerSourceMessages).map(([value, source]) => ({
              value: value as CustomerListSource,
              label: source.label,
              detail: source.helper,
            }))}
          />
        </StepFrame>
      )
    }

    if (step === "customers") {
      return (
        <StepFrame {...frameProps}
          title="How much money is sitting in your saved customer list?"
          body="Old customers are not cold leads. A repeat customer costs about 1/5 what a new customer costs to win. If nobody is following up with the list your business already owns, money is sitting idle."
        >
          <div className="mx-auto mt-8 grid w-full min-w-0 max-w-full gap-4 lg:max-w-5xl lg:grid-cols-2">
            <div className="box-border w-full min-w-0 max-w-full rounded-[1.45rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 text-left sm:rounded-[1.6rem] sm:p-5">
              <label className="block text-sm font-semibold leading-6 text-slate-700">
                Saved customer records
              </label>
              <input
                value={totalSavedCustomerRecords}
                onChange={(e) => setTotalSavedCustomerRecords(e.target.value.replace(/[^0-9.]/g, ""))}
                inputMode="decimal"
                className="mt-4 box-border w-full max-w-full rounded-2xl border border-[#d8d1c4] bg-white px-4 py-4 text-3xl font-semibold text-slate-900 outline-none focus:border-[#15803D]"
              />
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Count unique customers saved in job software, CRM, QuickBooks, accounting, spreadsheets, contact lists, or old files.
              </p>
            </div>
            <div className="box-border w-full min-w-0 max-w-full rounded-[1.45rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 text-left sm:rounded-[1.6rem] sm:p-5">
              <label className="text-sm font-semibold leading-6 text-slate-700">What is a typical repeat job worth?</label>
              <div className="mt-4 flex min-w-0 items-center rounded-2xl border border-[#d8d1c4] bg-white px-4 py-4 focus-within:border-[#15803D]">
                <span className="shrink-0 text-3xl font-semibold text-slate-400">$</span>
                <input
                  value={repeatJobValue}
                  onChange={(e) => setRepeatJobValue(e.target.value.replace(/[^0-9.]/g, ""))}
                  inputMode="decimal"
                  className="min-w-0 flex-1 bg-transparent px-2 text-3xl font-semibold text-slate-900 outline-none"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">Use your service call, maintenance visit, repair, seasonal service, or repeat job.</p>
            </div>
          </div>
          <div className="mx-auto mt-5 grid box-border w-full min-w-0 max-w-full gap-3 rounded-[1.45rem] border border-[#cfe8d5] bg-[#f4fbf5] p-5 text-left sm:grid-cols-[0.85fr_1.15fr] sm:items-center lg:max-w-5xl">
            <p className="text-2xl font-semibold leading-tight text-[#15803D] sm:text-3xl">500 to 3,000 saved records can hide serious repeat work.</p>
            <p className="text-sm leading-6 text-slate-700">
              We count each saved customer once so the estimate does not double-count the same record. The first fix is getting the list clean enough to use.
            </p>
          </div>
        </StepFrame>
      )
    }

    if (step === "followup") {
      return (
        <StepFrame {...frameProps}
          title="How much of this saved customer list has been followed up with recently?"
          body="Use the closest answer. If nobody knows, Stanley Systems treats the list as underworked until the records prove otherwise."
        >
          <ChoiceGrid<UncontactedCustomerRate>
            value={uncontactedCustomerRate}
            onChange={setUncontactedCustomerRate}
            options={Object.entries(uncontactedCustomerSettings).map(([value, setting]) => ({
              value: value as UncontactedCustomerRate,
              label: setting.label,
              detail: setting.helper,
            }))}
          />
        </StepFrame>
      )
    }

    if (step === "reviews") {
      return (
        <StepFrame {...frameProps}
          title="Do reviews and referrals get a real next step?"
          body="This does not add a guaranteed dollar claim. It tells Stanley Systems whether happy customers are turning into proof, referrals, and booked work."
          compact
        >
          <div className="mx-auto mt-6 grid w-full max-w-5xl gap-4 lg:grid-cols-2">
            <div className="box-border w-full rounded-[1.35rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 sm:p-5">
              <div className="text-sm font-semibold text-slate-700">Do happy customers get asked for a Google review?</div>
              <ChoiceGrid<SimpleSystem>
                value={reviewFollowup}
                onChange={setReviewFollowup}
                compact
                options={[
                  { value: "no", label: "No" },
                  { value: "manual", label: "Sometimes manually" },
                  { value: "yes", label: "Yes" },
                  { value: "unsure", label: "Not sure" },
                ]}
              />
            </div>
            <div className="box-border w-full rounded-[1.35rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 sm:p-5">
              <div className="text-sm font-semibold text-slate-700">Do good reviews turn into referral asks?</div>
              <ChoiceGrid<SimpleSystem>
                value={referralFollowup}
                onChange={setReferralFollowup}
                compact
                options={[
                  { value: "no", label: "No" },
                  { value: "manual", label: "Sometimes manually" },
                  { value: "yes", label: "Yes" },
                  { value: "unsure", label: "Not sure" },
                ]}
              />
            </div>
          </div>
        </StepFrame>
      )
    }

    if (step === "missedCalls") {
      return (
        <StepFrame {...frameProps}
          title="What happens when a new customer call is missed?"
          body="Missed calls are counted inside Repeat Revenue with a conservative booked-job estimate."
          continueLabel="See the result"
        >
          <ChoiceGrid<MissedCallRecovery>
            value={missedCallRecovery}
            onChange={setMissedCallRecovery}
            options={Object.entries(missedCallSettings).map(([value, setting]) => ({
              value: value as MissedCallRecovery,
              label: setting.label,
              detail: setting.helper,
            }))}
          />
          <div className="mx-auto mt-7 box-border w-full max-w-xl rounded-[1.45rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 text-left sm:rounded-[1.6rem] sm:p-5">
            <label className="text-sm font-semibold leading-6 text-slate-700">Missed calls per month</label>
            <input
              value={missedCallsPerMonth}
              onChange={(e) => setMissedCallsPerMonth(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              className="mt-4 box-border w-full max-w-full rounded-2xl border border-[#d8d1c4] bg-white px-4 py-4 text-3xl font-semibold text-slate-900 outline-none focus:border-[#15803D]"
            />
            <p className="mt-3 text-sm leading-6 text-slate-500">Use the number of real calls the office misses or answers too late in a normal month.</p>
          </div>
        </StepFrame>
      )
    }

    if (step === "results") {
      const summary = resultSummary
      const ctaLabel = "Start the Cash Flow Assessment"
      const monthlyRange = summary.formattedMonthlyRange

      return (
        <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6" data-calculator-result-page="yearly-leak">
          <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1120px] items-center justify-center">
            <div className="box-border w-full overflow-hidden rounded-[1.65rem] border border-[#e8dfd0] bg-white p-4 text-center shadow-[0_22px_80px_rgba(15,23,42,0.10)] sm:rounded-[2.25rem] sm:p-7 lg:rounded-[2.5rem] lg:p-9">
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[#efe9dc] sm:h-2">
                <div className="h-full rounded-full bg-[#15803D] transition-all duration-500" style={{ width: "33%" }} />
              </div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#15803D]">Money left on the table · 1 of 3</p>
              <h1 className="mx-auto mt-4 max-w-3xl text-[2.2rem] font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-[3.8rem] lg:text-[4.6rem]">Estimated money left on the table</h1>
              <div className="calculator-result-value mx-auto mt-4 max-w-5xl break-words text-[3.1rem] font-semibold leading-[0.92] tracking-[-0.04em] text-[#b42318] [font-variant-numeric:tabular-nums] sm:text-[5.4rem] lg:text-[6.4rem]">{summary.hasMeaningfulLeak ? `${summary.formattedHeadlineRange}/year` : "money left on the table"}</div>
              <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-700 sm:text-xl">{summary.hasMeaningfulLeak ? "That is the annual leak estimate from slow invoices, missed calls, forgotten follow-up, and untouched customer records." : "The safest next step is checking the real records before making a bigger claim."}</p>
              <div className="mx-auto mt-7 max-w-3xl rounded-[1.4rem] border border-[#f3b7af] bg-[#fff1ef] p-5 text-left shadow-[0_16px_42px_rgba(180,35,24,0.08)]">
                <div className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#b42318]">Cost of waiting</div>
                <p className="mt-2 text-lg font-semibold leading-8 text-slate-950">
                  {summary.hasMeaningfulLeak ? (
                    <>Every month this stays manual, another <span className="text-[#b42318]">{monthlyRange}</span> can stay stuck in slow invoices, open estimates, missed calls, and untouched customer records.</>
                  ) : (
                    <>The calculator did not find a large public estimate from these answers, but the cost of waiting is still the risk: the records need to be checked before the leak repeats.</>
                  )}
                </p>
              </div>
              <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
                <CTALink href={auditHref} kind="internal_page" location="calculator_result_yearly" analyticsSource="calculator_result_yearly" ctaLabel={ctaLabel} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#166534]">Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
                <button type="button" onClick={() => next("resultDiagnosis")} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-[#f4efe6]">See what is stuck <ArrowRight className="ml-2 h-4 w-4" /></button>
              </div>
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">Want one answer before buying? <Link href="/contact?path=pre-buy" className="font-bold text-[#116832] underline underline-offset-4">Ask before buying.</Link></p>
              <button type="button" onClick={back} className="mt-5 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">← Back to inputs</button>
            </div>
          </div>
        </section>
      )
    }

    if (step === "resultDiagnosis") {
      const summary = resultSummary
      const ctaLabel = "Start the Cash Flow Assessment"
      return (
        <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6" data-calculator-result-page="diagnosis">
          <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1180px] items-center justify-center">
            <div className="box-border w-full overflow-hidden rounded-[1.65rem] border border-[#e8dfd0] bg-white p-4 shadow-[0_22px_80px_rgba(15,23,42,0.10)] sm:rounded-[2.25rem] sm:p-6 lg:rounded-[2.5rem] lg:p-7">
              <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-[#efe9dc] sm:h-2"><div className="h-full rounded-full bg-[#15803D] transition-all duration-500" style={{ width: "66%" }} /></div>
              <div className="text-center"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#15803D]">What is stuck · 2 of 3</p><h1 className="mx-auto mt-3 max-w-3xl text-[2rem] font-semibold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-[3rem] lg:text-[3.6rem]">Where the money is getting stuck</h1></div>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="box-border flex flex-col rounded-[1.25rem] border border-[#dcefe0] bg-[#fbfaf7] p-5 text-left shadow-[0_14px_38px_rgba(15,23,42,0.055)]"><div className="flex items-center gap-3"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#cfe8d5] bg-[#f4fbf5] [&_[data-stanley-display-asset=true]>img]:scale-[1.2] [&_[data-stanley-display-asset=true]>img]:mix-blend-multiply"><DollarCircleDisplayAsset size={27} decorative /></span><h2 className="min-w-0 text-2xl font-semibold leading-7 tracking-tight text-slate-950">Cash earned, still stuck</h2></div><div className="calculator-result-value mt-3 break-words text-[2.25rem] font-medium leading-[1.02] tracking-[-0.025em] text-slate-950 [font-variant-numeric:tabular-nums] sm:text-[2.85rem]">{summary.formattedCardValues.cashMonthly}/month</div><p className="mt-3 text-base font-semibold leading-7 text-slate-900">Finished jobs are done. Billing and collection are still dragging.</p>{summary.selectedCashDriver ? <p className="mt-3 w-fit max-w-full rounded-full border border-[#dcefe0] bg-white px-3 py-1.5 text-sm font-semibold leading-5 text-slate-800">Biggest drag: {summary.selectedCashDriver.label}</p> : null}<p className="mt-auto pt-4 text-sm font-semibold leading-5 text-slate-500">Annualized cash check value: {summary.formattedCardValues.cashAnnual}</p></div>
                <div className="box-border flex flex-col rounded-[1.25rem] border border-[#dcefe0] bg-[#fbfaf7] p-5 text-left shadow-[0_14px_38px_rgba(15,23,42,0.055)]"><div className="flex items-center gap-3"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#cfe8d5] bg-[#f4fbf5] [&_[data-stanley-display-asset=true]>img]:scale-[1.2] [&_[data-stanley-display-asset=true]>img]:mix-blend-multiply"><UsersDisplayAsset size={27} decorative /></span><h2 className="min-w-0 text-2xl font-semibold leading-7 tracking-tight text-slate-950">Past customers, still untouched</h2></div><div className="calculator-result-value mt-3 break-words text-[2.25rem] font-medium leading-[1.02] tracking-[-0.025em] text-slate-950 [font-variant-numeric:tabular-nums] sm:text-[2.85rem]">{summary.formattedCardValues.customerMonthly}/month</div><p className="mt-3 text-base font-semibold leading-7 text-slate-900">Saved customers and missed calls are not turning into booked jobs.</p>{summary.selectedCustomerDriver ? <p className="mt-3 w-fit max-w-full rounded-full border border-[#dcefe0] bg-white px-3 py-1.5 text-sm font-semibold leading-5 text-slate-800">Biggest drag: {summary.selectedCustomerDriver.label}</p> : null}<p className="mt-auto pt-4 text-sm font-semibold leading-5 text-slate-500">Annualized customer check value: {summary.formattedCardValues.customerAnnual}</p></div>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]"><div className="rounded-[1.15rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 text-left"><p className="text-sm leading-7 text-slate-700"><span className="font-semibold text-slate-950">Plain English:</span> You already paid for the crew, the customer, and the office time. The money still waits because the follow-up depends on someone remembering. <span className="font-semibold text-slate-950">More leads make this leak bigger.</span></p></div><div className="rounded-[1.15rem] border border-[#bfe5c7] bg-[#eef9f2] p-4 text-left"><div className="text-base font-semibold tracking-tight text-slate-950">Recommended first move: Cash Flow Assessment</div><p className="mt-1 text-sm leading-6 text-slate-700">Check the real records. Find the first leak. Stop the repeat.</p></div></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center"><CTALink href={auditHref} kind="internal_page" location="calculator_result_diagnosis" analyticsSource="calculator_result_diagnosis" ctaLabel={ctaLabel} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#166534] sm:text-base">Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></CTALink><button type="button" onClick={() => next("resultMath")} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#f4efe6] sm:text-base">Continue to the math <ArrowRight className="ml-2 h-4 w-4" /></button><button type="button" onClick={() => next("resultMath")} className="inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-xs font-semibold text-slate-500 transition hover:text-slate-900">See the math</button></div>
              <button type="button" onClick={back} className="mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">← Back to leak summary</button>
            </div>
          </div>
        </section>
      )
    }

    if (step === "resultMath") {
      const summary = resultSummary
      const ctaLabel = "Start the Cash Flow Assessment"
      return (
        <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6" data-calculator-result-page="math">
          <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1180px] items-center justify-center">
            <div className="box-border w-full overflow-hidden rounded-[1.65rem] border border-[#e8dfd0] bg-white p-4 shadow-[0_22px_80px_rgba(15,23,42,0.10)] sm:rounded-[2.25rem] sm:p-6 lg:rounded-[2.5rem] lg:p-7">
              <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-[#efe9dc] sm:h-2"><div className="h-full rounded-full bg-[#15803D] transition-all duration-500" style={{ width: "100%" }} /></div>
              <div className="text-center"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#15803D]">Math · 3 of 3</p><h1 className="mx-auto mt-3 max-w-3xl text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.04em] text-slate-950 sm:text-[3rem] sm:leading-[1.06] lg:text-[3.5rem]">The math behind the estimate</h1><p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-700 sm:text-lg">These numbers are rounded. They are meant to show where the leak may be, not guarantee exact revenue.</p></div>
              <div className="mt-6 grid gap-4 lg:grid-cols-3"><div className="rounded-[1.15rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 text-left"><h2 className="text-lg font-semibold text-slate-950">Cash earned, still stuck</h2><p className="mt-3 text-sm leading-6 text-slate-700">Estimated monthly drag: <span className="font-semibold text-slate-950">{summary.formattedCardValues.cashMonthly}</span></p><p className="mt-1 text-sm leading-6 text-slate-700">Annualized value: <span className="font-semibold text-slate-950">{summary.formattedCardValues.cashAnnual}</span></p><p className="mt-3 text-sm leading-6 text-slate-600">Driven by slow invoice drag, open balances, billing delay, and manual office checks.</p></div><div className="rounded-[1.15rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 text-left"><h2 className="text-lg font-semibold text-slate-950">Past customers, still untouched</h2><p className="mt-3 text-sm leading-6 text-slate-700">Estimated monthly drag: <span className="font-semibold text-slate-950">{summary.formattedCardValues.customerMonthly}</span></p><p className="mt-1 text-sm leading-6 text-slate-700">Annualized value: <span className="font-semibold text-slate-950">{summary.formattedCardValues.customerAnnual}</span></p><p className="mt-3 text-sm leading-6 text-slate-600">Driven by saved customer records, missed calls, weak repeat follow-up, review gaps, and referral gaps.</p></div><div className="rounded-[1.15rem] border border-[#f3b7af] bg-[#fff1ef] p-4 text-left"><h2 className="text-lg font-semibold text-slate-950">Combined check</h2><p className="mt-3 text-sm leading-6 text-slate-700">Monthly leak: <span className="font-semibold text-[#b42318]">{summary.formattedMonthlyRange}</span></p><p className="mt-1 text-sm leading-6 text-slate-700">Yearly leak: <span className="font-semibold text-[#b42318]">{summary.formattedHeadlineRange}</span></p><p className="mt-3 text-sm font-semibold leading-6 text-[#b42318]">Cost of waiting: every month the system stays manual, the same leak can repeat.</p></div></div>
              <div className="mt-5 rounded-[1.15rem] border border-[#cfe8d5] bg-[#f4fbf5] p-4 text-left"><div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#15803D]">Monthly leak estimate</div><p className="mt-2 text-sm font-semibold leading-6 text-slate-700 sm:text-base sm:leading-7">{summary.equationText}</p>{summary.equationComponents.length ? <div className="mt-3 grid gap-2 sm:grid-cols-2">{summary.equationComponents.map((component) => <span key={component.label} className="flex items-center justify-between gap-3 rounded-2xl border border-[#bfe5c7] bg-white px-3 py-2 text-xs font-semibold text-slate-700 sm:text-sm"><span>{component.label}</span><span className="shrink-0 font-extrabold text-slate-950">{component.displayValue}</span></span>)}</div> : null}</div>
              <div className="mt-5 grid gap-3 rounded-[1.15rem] border border-[#bfe5c7] bg-[linear-gradient(135deg,#eef9f2_0%,#ffffff_52%,#e9f7ed_100%)] p-4 text-left lg:grid-cols-[1fr_auto] lg:items-center"><div><h2 className="text-xl font-semibold tracking-tight text-slate-950">Want the real records checked?</h2><p className="mt-1 text-sm leading-6 text-slate-700">The calculator estimates the leak. The Cash Flow Assessment checks the actual records and shows what should be fixed first.</p></div><CTALink href={auditHref} kind="internal_page" location="calculator_result_math" analyticsSource="calculator_result_math" ctaLabel={ctaLabel} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#166534] sm:text-base">Start the Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" /></CTALink></div>
              <MoneyLeakChecksForm source="calculator-result-money-leak-checks" pageSource="calculator_result_money_leak_checks" headline="Get a practical leak check to try this week" body="One immediate check you can use before deciding whether to buy the Cash Flow Assessment." helper="Not ready for the Cash Flow Assessment yet? Start with one leak check. If it shows money stuck, come back and buy the assessment." className="mt-5" />
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2"><button type="button" onClick={back} className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">← Back to results</button><Link href={auditHref} className="inline-flex items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#f4efe6]">See all packages</Link><Link href="/" className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">Back to site</Link></div>
            </div>
          </div>
        </section>
      )
    }

    return null
  })()

  return quizContent
}
