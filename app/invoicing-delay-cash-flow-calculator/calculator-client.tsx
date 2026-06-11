"use client"

import { type FormEvent, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import {
  CheckCircleDisplayAsset,
  DollarCircleDisplayAsset,
  FileInvoiceDisplayAsset,
  MessageBubbleDisplayAsset,
  UsersDisplayAsset,
} from "@/components/visual-kit/display-assets"

type StepKey =
  | "intro"
  | "softwareTransfer"
  | "invoice"
  | "jobs"
  | "delay"
  | "hours"
  | "missingDetails"
  | "unbilled"
  | "corrections"
  | "customerSource"
  | "customers"
  | "followup"
  | "reviews"
  | "missedCalls"
  | "calculating"
  | "claimReport"
  | "results"
  | "resultDiagnosis"
  | "resultMath";

const auditHref = "/workflow-audit"
const CALCULATOR_LOADING_DURATION_MS = 2000

const STEP_ORDER: StepKey[] = [
  "intro",
  "softwareTransfer",
  "invoice",
  "jobs",
  "delay",
  "hours",
  "missingDetails",
  "unbilled",
  "corrections",
  "customerSource",
  "customers",
  "followup",
  "reviews",
  "missedCalls",
  "claimReport",
  "results",
  "resultDiagnosis",
  "resultMath",
]

type CustomerListSource = "crm" | "quickbooks" | "spreadsheet" | "scattered"
type UncontactedCustomerRate = "none" | "most" | "half" | "small" | "unsure"
type SimpleSystem = "no" | "manual" | "yes" | "unsure"
type MissedCallRecovery = "nothing" | "voicemail" | "manual" | "automatic" | "unsure"
type SoftwareTransferFrequency = "none" | "light" | "moderate" | "heavy" | "unsure"
type MissingDetailsFrequency = "rare" | "weekly" | "daily" | "mostJobs" | "unsure"

const OFFICE_HOURLY_COST = 35

const customerSourceMessages: Record<CustomerListSource, { label: string; helper: string; firstFix: string }> = {
  crm: {
    label: "Job software or CRM",
    helper: "Housecall Pro, Jobber, ServiceTitan, or similar.",
    firstFix: "Your list is already close to usable. The admin drag point is follow-up.",
  },
  quickbooks: {
    label: "QuickBooks or accounting",
    helper: "Customer records exist, but the list needs cleanup before follow-up.",
    firstFix: "The records exist. The priority is cleaning them into a follow-up-ready list.",
  },
  spreadsheet: {
    label: "Spreadsheet or contact list",
    helper: "Usable, but likely needs cleanup before it becomes a repeat-work workflow.",
    firstFix: "The list exists. The priority is cleaning it into a follow-up-ready list.",
  },
  scattered: {
    label: "Scattered or not sure",
    helper: "That is a leak by itself. The priority is building a usable customer list.",
    firstFix: "The list is the leak. Stanley Systems would start by building one clean list from the records you already have.",
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

const softwareTransferSettings: Record<SoftwareTransferFrequency, { multiplier: number; label: string; helper: string }> = {
  none: { multiplier: 0, label: "Almost none", helper: "Most systems already stay updated without manual copying." },
  light: { multiplier: 0.75, label: "A little each week", helper: "Some copying between tools, but it does not dominate office time." },
  moderate: { multiplier: 1, label: "Several hours per week", helper: "The office regularly moves job, customer, billing, or payment info between systems." },
  heavy: { multiplier: 1.25, label: "Every day", helper: "Manual transfer between tools is part of normal office work." },
  unsure: { multiplier: 0.9, label: "Not sure", helper: "If nobody knows, count a conservative amount of transfer time." },
}

const missingDetailsSettings: Record<MissingDetailsFrequency, { rate: number; label: string; helper: string }> = {
  rare: { rate: 0.03, label: "Rarely", helper: "Most records are ready when the office needs them." },
  weekly: { rate: 0.08, label: "A few times a week", helper: "Enough to slow billing, updates, or follow-up." },
  daily: { rate: 0.14, label: "Daily", helper: "Missing details are a normal part of office cleanup." },
  mostJobs: { rate: 0.22, label: "Most jobs", helper: "The office often has to rebuild the job story before it can move." },
  unsure: { rate: 0.1, label: "Not sure", helper: "Use a conservative estimate until the records are checked." },
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
      "No. Stanley Systems works around the tools your team already uses whenever possible. The point is not to rip out QuickBooks, Jobber, Housecall Pro, ServiceTitan, or your current setup. The point is to fix the gaps where work, billing, follow-up, and customer records fall through.",
  },
  {
    question: "Who is this best for?",
    answer:
      "Service businesses with real job volume, repeat customers, invoices, estimates, calls, and at least one person dealing with office work. If your team already uses job software, accounting software, spreadsheets, or a CRM, Stanley Systems can find where money is getting stuck.",
  },
  {
    question: "What if we are not sure where the real problem is?",
    answer:
      "That is exactly what the AI Office Map is for. Stanley Systems checks the path from lead to job, job to invoice, invoice to payment, and customer to repeat work. You leave knowing which workflow matters first.",
  },
  {
    question: "I have been burned by consultants before. Why is this different?",
    answer:
      "Stanley Systems is not selling a giant strategy deck. The AI Office Map finds specific admin drag points, then the build focuses on practical fixes your team can actually use: cleaner handoffs, faster billing, better follow-up, and fewer missed customers.",
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
  softwareTransferCost: number
  officeProcessCost: number
  invoiceCleanupCost: number
  missingDetailsCost: number
  officeProcessCostTotal: number
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
      key: "software-transfer",
      label: "moving information between software",
      meaning: "Office time is being spent transferring job, customer, billing, or payment information between tools.",
      value: finiteMoney(result.softwareTransferCost),
      displayValue: formatMoney(result.softwareTransferCost),
    },
    {
      key: "office-process-time",
      label: "regular office process time",
      meaning: "Scheduling, updates, invoice prep, payment follow-up, and closeout tasks are consuming paid office time.",
      value: finiteMoney(result.officeProcessCost),
      displayValue: formatMoney(result.officeProcessCost),
    },
    {
      key: "office-cleanup",
      label: "invoice and job cleanup time",
      meaning: "Paid admin time is being spent fixing records instead of moving money.",
      value: finiteMoney(result.invoiceCleanupCost),
      displayValue: formatMoney(result.invoiceCleanupCost),
    },
    {
      key: "missing-details",
      label: "missing details and rework",
      meaning: "Missing job or customer details are slowing billing, updates, and follow-up.",
      value: finiteMoney(result.missingDetailsCost),
      displayValue: formatMoney(result.missingDetailsCost),
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
    ? `${formatMonthlyRangeDisplay(totalMonthlyLeakMin, totalMonthlyLeakMax)} = ${formatMonthlyDisplay(cashMonthlyLeak)} billing drag + ${formatMonthlyRangeDisplay(customerMonthlyLeakMin, customerMonthlyLeakMax)} follow-up drag.`
    : calculationRelationship === "rough"
      ? `${formatMonthlyRangeDisplay(totalMonthlyLeakMin, totalMonthlyLeakMax)} is built from about ${formatMonthlyDisplay(cashMonthlyLeak)} billing drag plus ${formatMonthlyRangeDisplay(customerMonthlyLeakMin, customerMonthlyLeakMax)} follow-up drag.`
      : `${formatMonthlyRangeDisplay(totalMonthlyLeakMin, totalMonthlyLeakMax)} is built from these leak areas.`

  const equationComponents = [
    { label: "Moving information between software", value: result.softwareTransferCost, displayValue: formatMonthlyDisplay(result.softwareTransferCost) },
    { label: "Regular office process time", value: result.officeProcessCost, displayValue: formatMonthlyDisplay(result.officeProcessCost) },
    { label: "Invoice and job cleanup time", value: result.invoiceCleanupCost, displayValue: formatMonthlyDisplay(result.invoiceCleanupCost) },
    { label: "Missing details and rework", value: result.missingDetailsCost, displayValue: formatMonthlyDisplay(result.missingDetailsCost) },
    { label: "Delayed billing and unbilled work", value: result.delayedCashDrag + result.stuckUnbilledValue, displayValue: formatMonthlyDisplay(result.delayedCashDrag + result.stuckUnbilledValue) },
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
    cashDrivers.some((driver) => ["software-transfer", "office-process-time", "office-cleanup", "missing-details", "correction-drag"].includes(driver.key)) ? "Which office process keeps causing the leak" : undefined,
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
    selectedOfficeProcessDriver: cashDrivers.find((driver) => ["software-transfer", "office-process-time", "office-cleanup", "missing-details"].includes(driver.key)),
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
    <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 pb-28 pt-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8" data-calculator-root="true" data-calculator-step={step}>
      <div className="pointer-events-none absolute inset-x-2 top-4 h-40 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_0%,rgba(21,128,61,0.13),rgba(255,255,255,0)_68%)] sm:inset-x-8 lg:top-8" aria-hidden="true" />
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1320px] items-center justify-center">
        <div className={`relative box-border w-full max-w-full overflow-visible rounded-[1.75rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(253,252,247,0.96)_100%)] shadow-[0_28px_90px_rgba(7,20,34,0.13),0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur sm:overflow-hidden sm:rounded-[2.35rem] lg:rounded-[2.75rem] ${compact ? "p-4 sm:p-6 lg:p-7" : "p-4 sm:p-8 lg:p-10"}`}>
          <div className="mb-6 rounded-full border border-[#ece4d5] bg-[#f7f3ea] p-1 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] sm:mb-8">
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#ebe3d5] sm:h-2.5">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,#15803D_0%,#53d986_100%)] shadow-[0_0_22px_rgba(21,128,61,0.22)] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mx-auto max-w-5xl space-y-3 text-center sm:space-y-4">
            <h1 className={`font-semibold leading-[1.02] tracking-[-0.045em] text-[#071422] lg:leading-[0.98] ${compact ? "text-[1.55rem] sm:text-[2.25rem] lg:text-[2.85rem]" : "text-[1.95rem] sm:text-[3rem] lg:text-[4.1rem]"}`}>{title}</h1>
            {body ? <p className={`mx-auto max-w-3xl text-[0.94rem] font-medium leading-6 text-[#506171] sm:leading-7 ${compact ? "sm:text-base lg:text-[1.02rem]" : "sm:text-lg lg:text-[1.08rem] lg:leading-8"}`}>{body}</p> : null}
          </div>

          {children}

          <div className="mx-auto mt-7 grid w-full max-w-md grid-cols-1 gap-3 sm:mt-9 sm:max-w-none sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)_auto] sm:items-center lg:mt-10">
            {step === "intro" ? (
              <div className="hidden sm:block" aria-hidden="true" />
            ) : (
              <button
                type="button"
                onClick={onBack}
                className="order-2 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#e0d8ca] bg-white/85 px-5 py-3 text-sm font-semibold text-[#405163] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition hover:bg-[#f4efe6] sm:order-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </button>
            )}
            <button
              type="button"
              data-calculator-next="true"
              onClick={onNext}
              disabled={!canContinue}
              className="order-1 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,#179447_0%,#116832_100%)] px-7 py-4 text-base font-semibold text-white shadow-[0_16px_34px_rgba(21,128,61,0.24),0_1px_0_rgba(255,255,255,0.26)_inset] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(21,128,61,0.28),0_1px_0_rgba(255,255,255,0.26)_inset] disabled:cursor-not-allowed disabled:opacity-50 sm:order-2"
            >
              {continueLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <Link
              href="/"
              className="order-3 inline-flex min-h-11 items-center justify-center px-3 py-2 text-sm font-semibold text-slate-400 underline underline-offset-4 transition hover:text-slate-700"
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
      className="mx-auto mt-8 box-border w-full max-w-3xl cursor-text rounded-[1.6rem] border border-[#ded5c4] bg-[linear-gradient(180deg,#fffefa_0%,#f8f4eb_100%)] p-2 shadow-[0_22px_55px_rgba(7,20,34,0.08),0_1px_0_rgba(255,255,255,0.95)_inset] transition focus-within:border-[#15803D] focus-within:shadow-[0_26px_62px_rgba(7,20,34,0.11),0_0_0_5px_rgba(21,128,61,0.09)] sm:mt-10 sm:rounded-[2.1rem] lg:max-w-4xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="relative flex min-h-[82px] min-w-0 items-center justify-center rounded-[1.25rem] bg-white px-3 text-5xl font-semibold text-[#071422] ring-1 ring-[#efe6d8] sm:min-h-[112px] sm:rounded-[1.65rem] sm:px-7 sm:text-7xl lg:min-h-[128px] lg:text-[5.4rem]">
        {prefix ? <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#9b8f7d] sm:left-8">{prefix}</span> : null}
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
          inputMode="decimal"
          enterKeyHint="next"
          className={`w-full min-w-0 bg-transparent text-center tracking-[-0.045em] outline-none ${prefix ? "px-16 sm:px-24" : "px-4"}`}
        />
        {suffix ? <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[#f3efe6] px-3 py-0.5 text-xs font-bold tracking-normal text-[#6f6557] sm:bottom-3 sm:text-sm lg:text-base">{suffix}</span> : null}
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
    <div className={`mx-auto grid w-full gap-3.5 sm:grid-cols-2 ${compact ? "mt-4 max-w-full" : "mt-8 max-w-5xl sm:mt-10"}`}>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`relative box-border w-full min-w-0 overflow-hidden rounded-[1.15rem] border px-4 text-left transition sm:rounded-[1.35rem] ${compact ? "py-3.5 sm:px-4 sm:py-4" : "py-4 sm:px-5 sm:py-5"} ${
              selected
                ? "border-[#15803D] bg-[linear-gradient(180deg,#f0fbf3_0%,#ffffff_100%)] shadow-[0_18px_38px_rgba(21,128,61,0.16),inset_4px_0_0_#15803D] ring-2 ring-[#15803D]/15"
                : "border-[#e7dfd1] bg-white/92 shadow-[0_10px_24px_rgba(7,20,34,0.035)] hover:border-[#b8dfc2] hover:bg-[#fbfaf7]"
            }`}
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] ${selected ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#d8d1c4] bg-white text-transparent"}`}>
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.94rem] font-semibold leading-5 text-[#071422] sm:text-base sm:leading-6">{option.label}</span>
                {option.detail ? <span className="mt-1.5 block text-xs font-medium leading-5 text-[#5f6f7e] sm:text-sm sm:leading-6">{option.detail}</span> : null}
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
    <div className="mx-auto mt-8 grid w-full max-w-5xl gap-3.5 sm:mt-10 sm:grid-cols-2">
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
            className={`relative box-border w-full min-w-0 overflow-hidden rounded-[1.15rem] border px-4 py-4 text-left transition sm:rounded-[1.35rem] sm:px-5 sm:py-5 ${
              selected
                ? "border-[#15803D] bg-[linear-gradient(180deg,#f0fbf3_0%,#ffffff_100%)] shadow-[0_18px_38px_rgba(21,128,61,0.16),inset_4px_0_0_#15803D] ring-2 ring-[#15803D]/15"
                : "border-[#e7dfd1] bg-white/92 shadow-[0_10px_24px_rgba(7,20,34,0.035)] hover:border-[#b8dfc2] hover:bg-[#fbfaf7]"
            }`}
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] ${selected ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#d8d1c4] bg-white text-transparent"}`}>
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.94rem] font-semibold leading-5 text-[#071422] sm:text-base sm:leading-6">{option.label}</span>
                {option.detail ? <span className="mt-1.5 block text-xs font-medium leading-5 text-[#5f6f7e] sm:text-sm sm:leading-6">{option.detail}</span> : null}
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
  const [softwareTransferFrequency, setSoftwareTransferFrequency] = useState<SoftwareTransferFrequency>("moderate")
  const [softwareTransferHoursPerWeek, setSoftwareTransferHoursPerWeek] = useState("5")
  const [officeProcessHoursPerWeek, setOfficeProcessHoursPerWeek] = useState("8")
  const [missingDetailsFrequency, setMissingDetailsFrequency] = useState<MissingDetailsFrequency>("weekly")
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
  const [leadName, setLeadName] = useState("")
  const [leadBusinessName, setLeadBusinessName] = useState("")
  const [leadEmail, setLeadEmail] = useState("")
  const [leadFormTouched, setLeadFormTouched] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const calculatingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startedNotificationSentRef = useRef(false)
  const completedNotificationSentRef = useRef(false)

  const stepIndex = STEP_ORDER.indexOf(step)
  const progress = step === "intro" ? 6 : Math.round((stepIndex / (STEP_ORDER.length - 1)) * 100)

  const result = useMemo(() => {
    const invoice = Number(invoiceValue) || 0
    const jobs = Number(jobsPerMonth) || 0
    const days = Number(delayDays) || 0
    const hours = Number(hoursLost) || 0
    const transferHoursWeekly = Math.max(Number(softwareTransferHoursPerWeek) || 0, 0)
    const officeProcessHoursWeekly = Math.max(Number(officeProcessHoursPerWeek) || 0, 0)
    const unbilled = Number(unbilledJobs) || 0
    const correction = (Number(correctionRate) || 0) / 100
    const savedRecords = Math.max(Number(totalSavedCustomerRecords) || 0, 0)
    const repeatValue = Number(repeatJobValue) || invoice
    const missedCalls = Math.max(Number(missedCallsPerMonth) || 0, 0)

    const monthlyBilledValue = invoice * jobs
    const delayedCashDrag = monthlyBilledValue * (days / 30)
    const transferSetting = softwareTransferSettings[softwareTransferFrequency]
    const missingSetting = missingDetailsSettings[missingDetailsFrequency]
    const softwareTransferMonthlyHours = transferHoursWeekly * 4.33 * transferSetting.multiplier
    const softwareTransferCost = softwareTransferMonthlyHours * OFFICE_HOURLY_COST
    const monthlyLaborHours = jobs * hours
    const invoiceCleanupCost = monthlyLaborHours * OFFICE_HOURLY_COST
    const officeProcessMonthlyHours = officeProcessHoursWeekly * 4.33
    const officeProcessCost = officeProcessMonthlyHours * OFFICE_HOURLY_COST * 0.65
    const missingDetailsCost = monthlyBilledValue * missingSetting.rate * 0.025
    const officeProcessCostTotal = softwareTransferCost + invoiceCleanupCost + officeProcessCost + missingDetailsCost
    const officeTimeCost = officeProcessCostTotal
    const stuckUnbilledValue = invoice * unbilled
    const correctionLoss = monthlyBilledValue * correction * 0.03
    const cashflowImpact = delayedCashDrag + officeProcessCostTotal + stuckUnbilledValue + correctionLoss

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

    let recommendedFirstMove = "Book the $197 AI Office Map to decide which AI workflow gets mapped first."
    if (!bothMeaningful && cashflowImpact > 0 && customerRevenueImpact === 0) recommendedFirstMove = "Map this in the AI Office Map, then install it in the Sprint."
    else if (!bothMeaningful && customerRevenueImpact > 0 && cashflowImpact === 0) recommendedFirstMove = "Map this in the AI Office Map, then install the follow-up workflow in the Sprint."
    else if (!bothMeaningful && cashflowShare >= 0.6) recommendedFirstMove = "Map this in the AI Office Map, then install it in the Sprint."
    else if (!bothMeaningful && customerRevenueShare >= 0.6) recommendedFirstMove = "Map this in the AI Office Map, then install the follow-up workflow in the Sprint."

    return {
      monthlyBilledValue,
      delayedCashDrag,
      monthlyLaborHours,
      softwareTransferMonthlyHours,
      softwareTransferCost,
      invoiceCleanupCost,
      officeProcessMonthlyHours,
      officeProcessCost,
      missingDetailsCost,
      officeProcessCostTotal,
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
  }, [invoiceValue, jobsPerMonth, delayDays, softwareTransferFrequency, softwareTransferHoursPerWeek, officeProcessHoursPerWeek, missingDetailsFrequency, hoursLost, unbilledJobs, correctionRate, totalSavedCustomerRecords, repeatJobValue, uncontactedCustomerRate, reviewFollowup, referralFollowup, missedCallsPerMonth, missedCallRecovery, customerListSources])

  const resultSummary = useMemo(() => createResultSummary(result), [result])

  useEffect(() => {
    if (step !== "results" || completedNotificationSentRef.current) return

    completedNotificationSentRef.current = true

    const urlParams = new URLSearchParams(window.location.search)
    const visitorIdKey = "stanley_calculator_visitor_id"
    const sessionId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`
    let visitorId = window.localStorage.getItem(visitorIdKey)
    if (!visitorId) {
      visitorId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`
      window.localStorage.setItem(visitorIdKey, visitorId)
    }

    const payload = {
      telegram_alert_type: "calculator_completed",
      form_type: "calculator_completed",
      completed_at: new Date().toISOString(),
      source_page: window.location.pathname,
      visitor_id: visitorId,
      session_id: sessionId,
      inputs: {
        average_invoice_value: Number(invoiceValue) || 0,
        jobs_per_month: Number(jobsPerMonth) || 0,
        invoice_delay_days: Number(delayDays) || 0,
        software_transfer_frequency: softwareTransferFrequency,
        software_transfer_hours_per_week: Number(softwareTransferHoursPerWeek) || 0,
        office_process_hours_per_week: Number(officeProcessHoursPerWeek) || 0,
        missing_details_frequency: missingDetailsFrequency,
        office_hours_lost_per_job: Number(hoursLost) || 0,
        unbilled_jobs: Number(unbilledJobs) || 0,
        correction_rate_percent: Number(correctionRate) || 0,
        customer_list_sources: customerListSources,
        saved_customer_records: Number(totalSavedCustomerRecords) || 0,
        average_repeat_job_value: Number(repeatJobValue) || 0,
        uncontacted_customer_rate: uncontactedCustomerRate,
        review_followup: reviewFollowup,
        referral_followup: referralFollowup,
        missed_call_recovery: missedCallRecovery,
        missed_calls_per_month: Number(missedCallsPerMonth) || 0,
      },
      results: {
        total_monthly_leak_min: resultSummary.totalMonthlyLeakMin,
        total_monthly_leak_max: resultSummary.totalMonthlyLeakMax,
        total_annual_leak_min: resultSummary.totalAnnualLeakMin,
        total_annual_leak_max: resultSummary.totalAnnualLeakMax,
        cash_monthly_leak: resultSummary.cashMonthlyLeak,
        software_transfer_monthly_cost: result.softwareTransferCost,
        office_process_monthly_cost: result.officeProcessCost,
        invoice_cleanup_monthly_cost: result.invoiceCleanupCost,
        missing_details_monthly_cost: result.missingDetailsCost,
        office_process_cost_total: result.officeProcessCostTotal,
        customer_monthly_leak_min: resultSummary.customerMonthlyLeakMin,
        customer_monthly_leak_max: resultSummary.customerMonthlyLeakMax,
        estimated_underworked_customers: resultSummary.estimatedUnderworkedCustomers,
        recommended_first_move: result.recommendedFirstMove,
        biggest_cash_driver: resultSummary.selectedCashDriver?.label ?? "",
        biggest_office_process_driver: resultSummary.selectedOfficeProcessDriver?.label ?? "",
        biggest_customer_driver: resultSummary.selectedCustomerDriver?.label ?? "",
        formatted_headline_range: resultSummary.formattedHeadlineRange,
        formatted_monthly_range: resultSummary.formattedMonthlyRange,
      },
      lead_contact: {
        name: leadName.trim(),
        business_name: leadBusinessName.trim(),
        work_email: leadEmail.trim(),
        report_delivery_requested: true,
      },
      attribution: {
        referrer: document.referrer,
        utm_source: urlParams.get("utm_source") ?? "",
        utm_medium: urlParams.get("utm_medium") ?? "",
        utm_campaign: urlParams.get("utm_campaign") ?? "",
        utm_content: urlParams.get("utm_content") ?? "",
        utm_term: urlParams.get("utm_term") ?? "",
      },
    }

    const body = JSON.stringify(payload)
    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon("/api/calculator-completed", new Blob([body], { type: "application/json" }))
      if (sent) return
    }

    fetch("/api/calculator-completed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {})
  }, [
    step,
    invoiceValue,
    jobsPerMonth,
    delayDays,
    softwareTransferFrequency,
    softwareTransferHoursPerWeek,
    officeProcessHoursPerWeek,
    missingDetailsFrequency,
    hoursLost,
    unbilledJobs,
    correctionRate,
    customerListSources,
    totalSavedCustomerRecords,
    repeatJobValue,
    uncontactedCustomerRate,
    reviewFollowup,
    referralFollowup,
    missedCallRecovery,
    missedCallsPerMonth,
    leadName,
    leadBusinessName,
    leadEmail,
    result,
    resultSummary,
  ])

  useEffect(() => {
    return () => {
      if (calculatingTimerRef.current) clearTimeout(calculatingTimerRef.current)
    }
  }, [])

  function notifyCalculatorStarted() {
    if (startedNotificationSentRef.current) return
    startedNotificationSentRef.current = true

    const urlParams = new URLSearchParams(window.location.search)
    const visitorIdKey = "stanley_calculator_visitor_id"
    const sessionId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`
    let visitorId = window.localStorage.getItem(visitorIdKey)
    if (!visitorId) {
      visitorId = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`
      window.localStorage.setItem(visitorIdKey, visitorId)
    }

    const payload = {
      telegram_alert_type: "calculator_started",
      form_type: "calculator_started",
      started_at: new Date().toISOString(),
      source_page: window.location.pathname,
      visitor_id: visitorId,
      session_id: sessionId,
      inputs: {
        average_invoice_value: Number(invoiceValue) || 0,
        jobs_per_month: Number(jobsPerMonth) || 0,
        invoice_delay_days: Number(delayDays) || 0,
        software_transfer_frequency: softwareTransferFrequency,
        software_transfer_hours_per_week: Number(softwareTransferHoursPerWeek) || 0,
        office_process_hours_per_week: Number(officeProcessHoursPerWeek) || 0,
        missing_details_frequency: missingDetailsFrequency,
        office_hours_lost_per_job: Number(hoursLost) || 0,
        unbilled_jobs: Number(unbilledJobs) || 0,
        correction_rate_percent: Number(correctionRate) || 0,
        saved_customer_records: Number(totalSavedCustomerRecords) || 0,
        average_repeat_job_value: Number(repeatJobValue) || 0,
        missed_calls_per_month: Number(missedCallsPerMonth) || 0,
      },
      attribution: {
        referrer: document.referrer,
        utm_source: urlParams.get("utm_source") ?? "",
        utm_medium: urlParams.get("utm_medium") ?? "",
        utm_campaign: urlParams.get("utm_campaign") ?? "",
        utm_content: urlParams.get("utm_content") ?? "",
        utm_term: urlParams.get("utm_term") ?? "",
      },
    }

    const body = JSON.stringify(payload)
    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon("/api/calculator-started", new Blob([body], { type: "application/json" }))
      if (sent) return
    }

    fetch("/api/calculator-started", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {})
  }

  function next(nextStep?: StepKey) {
    if (step === "intro") notifyCalculatorStarted()

    if (step === "corrections" && !nextStep) {
      const parsed = Number(correctionRate)
      setCorrectionRate(Number.isFinite(parsed) ? String(boundNumber(parsed, 0, 100)) : "0")
      setStep("customerSource")
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
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
        setStep("claimReport")
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


  const trimmedLeadName = leadName.trim()
  const trimmedLeadBusinessName = leadBusinessName.trim()
  const trimmedLeadEmail = leadEmail.trim()
  const leadEmailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedLeadEmail)
  const canShowResult = Boolean(trimmedLeadName && trimmedLeadBusinessName && leadEmailLooksValid)

  function submitLeadGate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLeadFormTouched(true)
    if (!canShowResult) return
    setStep("results")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const frameProps = { progress, step, onBack: back, onNext: () => next() }

  if (isCalculating || step === "calculating") {
    return (
      <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8" data-calculator-loading="true" data-calculator-root="true">
        <style>{`
          .calculator-load-bar { animation: calculatorLoad ${CALCULATOR_LOADING_DURATION_MS}ms cubic-bezier(.22,.74,.22,1) forwards; }
          @keyframes calculatorLoad { from { transform: translateX(-100%); } to { transform: translateX(0%); } }
          @media (prefers-reduced-motion: reduce) { .calculator-load-bar { animation-duration: ${CALCULATOR_LOADING_DURATION_MS}ms; } }
        `}</style>
        <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1180px] items-center justify-center">
          <div className="box-border w-full max-w-3xl overflow-hidden rounded-[1.9rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,246,239,0.96)_100%)] p-7 text-center text-[#071422] shadow-[0_34px_110px_rgba(7,20,34,0.18),0_1px_0_rgba(255,255,255,0.90)_inset] sm:rounded-[2.5rem] sm:p-11">
            <div className="mx-auto h-2 w-full max-w-xl overflow-hidden rounded-full bg-[#e8e0d2] ring-1 ring-[#d9d0bf]">
              <div className="calculator-load-bar h-full w-full origin-left rounded-full bg-[#53d986] shadow-[0_0_28px_rgba(83,217,134,0.42)]" />
            </div>
            <h1 className="mt-8 text-[2.4rem] font-semibold leading-none tracking-[-0.045em] sm:text-[4rem]">Calculating...</h1>
            <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-7 text-[#506171] sm:text-xl">Finding where office drag is slowing profit.</p>
          </div>
        </div>
      </section>
    )
  }

  const quizContent = (() => {
    if (step === "intro") {
      return (
        <StepFrame {...frameProps}
          title="Admin Drag Calculator"
          body="See what copying, chasing, retyping, reconciling, delayed billing, missed follow-up, and software handoffs may be costing your service business each month."
          continueLabel="Calculate Your Admin Drag"
        >
          <div className="mx-auto mt-4 box-border w-full max-w-3xl rounded-[1.45rem] border border-[#cfe8d5] bg-[linear-gradient(180deg,#effaf2_0%,#ffffff_100%)] p-6 text-center sm:mt-6 sm:rounded-[1.9rem] sm:p-8">
            <div className="text-sm font-bold leading-tight text-[#15803D]">Takes 2 minutes. Rough numbers only. No passwords or sensitive financials.</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">$3,000 to $25,000+</div>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-700">
              Stanley Systems installs an AI office layer on top of your existing software and office systems.
            </p>
          </div>
        </StepFrame>
      )
    }

    if (step === "softwareTransfer") {
      return (
        <StepFrame {...frameProps}
          title="How much time does your team spend moving information between software?"
          body="Think job software, QuickBooks, email, texts, spreadsheets, payment tools, and customer records. The cost is not the software. The cost is the manual transfer between them."
          compact
        >
          <ChoiceGrid<SoftwareTransferFrequency>
            value={softwareTransferFrequency}
            onChange={setSoftwareTransferFrequency}
            compact
            options={Object.entries(softwareTransferSettings).map(([value, setting]) => ({
              value: value as SoftwareTransferFrequency,
              label: setting.label,
              detail: setting.helper,
            }))}
          />
          <div className="mx-auto mt-7 box-border w-full max-w-xl rounded-[1.45rem] border border-[#e7dfd1] bg-[linear-gradient(180deg,#fffefa_0%,#f8f4eb_100%)] p-4 text-left shadow-[0_14px_34px_rgba(7,20,34,0.055)] sm:rounded-[1.7rem] sm:p-6">
            <label className="text-sm font-semibold leading-6 text-slate-700">Hours per week moving information between software</label>
            <input
              value={softwareTransferHoursPerWeek}
              onChange={(e) => setSoftwareTransferHoursPerWeek(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              className="mt-4 box-border w-full max-w-full rounded-2xl border border-[#d8d1c4] bg-white px-4 py-4 text-3xl font-semibold tracking-[-0.035em] text-[#071422] outline-none shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
            />
            <p className="mt-3 text-sm leading-6 text-slate-500">Use the normal weekly time spent copying, checking, updating, or reconciling information across tools.</p>
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
          body="Every extra day before the invoice goes out is another day your billing stays stalled instead of coming in."
        >
          <BigNumberInput value={delayDays} onChange={setDelayDays} suffix="days" />
        </StepFrame>
      )
    }

    if (step === "hours") {
      return (
        <StepFrame {...frameProps}
          title="How much regular office process time happens each week?"
          body="Scheduling updates, customer updates, invoice prep, estimate follow-up, payment follow-up, job closeout, and checking records all count here."
        >
          <BigNumberInput value={officeProcessHoursPerWeek} onChange={setOfficeProcessHoursPerWeek} suffix="hrs/wk" />
          <div className="mx-auto mt-7 box-border w-full max-w-xl rounded-[1.45rem] border border-[#e7dfd1] bg-white/80 p-4 text-left text-sm leading-6 text-slate-600 shadow-[0_10px_24px_rgba(7,20,34,0.035)]">
            This counts ordinary office process time. The next question separates out invoice-specific cleanup so the estimate stays grounded.
          </div>
        </StepFrame>
      )
    }

    if (step === "missingDetails") {
      return (
        <StepFrame {...frameProps}
          title="How often does office work wait on missing job or customer details?"
          body="Count missing photos, notes, approvals, job status, customer info, payment details, material notes, or anything the office has to track down before work can move."
        >
          <ChoiceGrid<MissingDetailsFrequency>
            value={missingDetailsFrequency}
            onChange={setMissingDetailsFrequency}
            options={Object.entries(missingDetailsSettings).map(([value, setting]) => ({
              value: value as MissingDetailsFrequency,
              label: setting.label,
              detail: setting.helper,
            }))}
          />
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
          <div className="mx-auto mt-8 grid w-full min-w-0 max-w-full gap-4 sm:mt-10 lg:max-w-5xl lg:grid-cols-2">
            <div className="box-border w-full min-w-0 max-w-full rounded-[1.45rem] border border-[#e7dfd1] bg-[linear-gradient(180deg,#fffefa_0%,#f8f4eb_100%)] p-4 text-left shadow-[0_14px_34px_rgba(7,20,34,0.055)] sm:rounded-[1.7rem] sm:p-6">
              <label className="block text-sm font-semibold leading-6 text-slate-700">
                Saved customer records
              </label>
              <input
                value={totalSavedCustomerRecords}
                onChange={(e) => setTotalSavedCustomerRecords(e.target.value.replace(/[^0-9.]/g, ""))}
                inputMode="decimal"
                className="mt-4 box-border w-full max-w-full rounded-2xl border border-[#d8d1c4] bg-white px-4 py-4 text-3xl font-semibold tracking-[-0.035em] text-[#071422] outline-none shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
              />
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Count unique customers saved in job software, CRM, QuickBooks, accounting, spreadsheets, contact lists, or old files.
              </p>
            </div>
            <div className="box-border w-full min-w-0 max-w-full rounded-[1.45rem] border border-[#e7dfd1] bg-[linear-gradient(180deg,#fffefa_0%,#f8f4eb_100%)] p-4 text-left shadow-[0_14px_34px_rgba(7,20,34,0.055)] sm:rounded-[1.7rem] sm:p-6">
              <label className="text-sm font-semibold leading-6 text-slate-700">What is a typical repeat job worth?</label>
              <div className="mt-4 flex min-w-0 items-center rounded-2xl border border-[#d8d1c4] bg-white px-4 py-4 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition focus-within:border-[#15803D] focus-within:ring-4 focus-within:ring-[#15803D]/10">
                <span className="shrink-0 text-3xl font-semibold text-slate-400">$</span>
                <input
                  value={repeatJobValue}
                  onChange={(e) => setRepeatJobValue(e.target.value.replace(/[^0-9.]/g, ""))}
                  inputMode="decimal"
                  className="min-w-0 flex-1 bg-transparent px-2 text-3xl font-semibold tracking-[-0.035em] text-[#071422] outline-none"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-500">Use your service call, maintenance visit, repair, seasonal service, or repeat job.</p>
            </div>
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
          <div className="mx-auto mt-6 grid w-full max-w-5xl gap-4 sm:mt-8 lg:grid-cols-2">
            <div className="box-border w-full rounded-[1.45rem] border border-[#e7dfd1] bg-[linear-gradient(180deg,#fffefa_0%,#f8f4eb_100%)] p-4 shadow-[0_14px_34px_rgba(7,20,34,0.055)] sm:p-5">
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
            <div className="box-border w-full rounded-[1.45rem] border border-[#e7dfd1] bg-[linear-gradient(180deg,#fffefa_0%,#f8f4eb_100%)] p-4 shadow-[0_14px_34px_rgba(7,20,34,0.055)] sm:p-5">
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
          body="Missed calls are counted inside the follow-up workflow opportunity with a conservative booked-job estimate."
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
          <div className="mx-auto mt-7 box-border w-full max-w-xl rounded-[1.45rem] border border-[#e7dfd1] bg-[linear-gradient(180deg,#fffefa_0%,#f8f4eb_100%)] p-4 text-left shadow-[0_14px_34px_rgba(7,20,34,0.055)] sm:rounded-[1.7rem] sm:p-6">
            <label className="text-sm font-semibold leading-6 text-slate-700">Missed calls per month</label>
            <input
              value={missedCallsPerMonth}
              onChange={(e) => setMissedCallsPerMonth(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              className="mt-4 box-border w-full max-w-full rounded-2xl border border-[#d8d1c4] bg-white px-4 py-4 text-3xl font-semibold tracking-[-0.035em] text-[#071422] outline-none shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
            />
            <p className="mt-3 text-sm leading-6 text-slate-500">Use the number of real calls the office misses or answers too late in a normal month.</p>
          </div>
        </StepFrame>
      )
    }


    if (step === "claimReport") {
      return (
        <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8" data-calculator-claim-report="true" data-calculator-root="true">
          <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1180px] items-center justify-center">
            <form onSubmit={submitLeadGate} className="box-border w-full max-w-3xl overflow-hidden rounded-[1.9rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,246,239,0.96)_100%)] p-5 text-center text-[#071422] shadow-[0_34px_110px_rgba(7,20,34,0.18),0_1px_0_rgba(255,255,255,0.90)_inset] sm:rounded-[2.5rem] sm:p-9">
              <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-[#e8e0d2] ring-1 ring-[#d9d0bf]">
                <div className="h-full w-full rounded-full bg-[#53d986] shadow-[0_0_28px_rgba(83,217,134,0.42)]" />
              </div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#15803D]">Estimate almost ready</p>
              <h1 className="mx-auto mt-4 max-w-2xl text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-[4rem]">Your office cost estimate is almost ready.</h1>
              <div className="mx-auto mt-5 flex max-w-2xl flex-col items-center gap-3 rounded-[1.35rem] border border-[#bfe5c7] bg-[linear-gradient(135deg,#eef9f2_0%,#ffffff_58%,#e9f7ed_100%)] px-4 py-4 text-center shadow-[0_18px_46px_rgba(21,128,61,0.12),0_1px_0_rgba(255,255,255,0.9)_inset] sm:flex-row sm:justify-center sm:px-5 sm:py-4 sm:text-left">
                <div className="flex shrink-0 items-center gap-2 rounded-full border border-[#bfe5c7] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(21,128,61,0.09)]">
                  <span className="text-sm font-extrabold tracking-[-0.02em] text-slate-400 line-through">$29</span>
                  <span className="rounded-full bg-[#15803D] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_8px_18px_rgba(21,128,61,0.22)]">Free</span>
                </div>
                <p className="text-sm font-semibold leading-6 text-[#264637] sm:text-base">
                  Usually a paid diagnostic. Free right now to see your office leak.
                </p>
              </div>
              <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-7 text-[#506171] sm:text-lg">
                Enter your info to see the result and get a copy sent to your inbox.
              </p>

              <div className="mx-auto mt-7 grid max-w-xl gap-3 text-left">
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">Your name</span>
                  <input
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    autoComplete="name"
                    className="mt-2 box-border w-full rounded-2xl border border-[#d8d1c4] bg-white px-4 py-3.5 text-base font-semibold text-[#071422] outline-none shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">Business name</span>
                  <input
                    value={leadBusinessName}
                    onChange={(e) => setLeadBusinessName(e.target.value)}
                    autoComplete="organization"
                    className="mt-2 box-border w-full rounded-2xl border border-[#d8d1c4] bg-white px-4 py-3.5 text-base font-semibold text-[#071422] outline-none shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">Work email</span>
                  <input
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    className="mt-2 box-border w-full rounded-2xl border border-[#d8d1c4] bg-white px-4 py-3.5 text-base font-semibold text-[#071422] outline-none shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                  />
                </label>
                {leadFormTouched && !canShowResult ? (
                  <p className="rounded-2xl border border-[#f3b7af] bg-[#fff1ef] px-4 py-3 text-sm font-semibold leading-6 text-[#b42318]">Add your name, business name, and a valid work email to show the result.</p>
                ) : null}
              </div>

              <button
                type="submit"
                className="mx-auto mt-6 inline-flex min-h-14 w-full max-w-xl items-center justify-center rounded-full bg-[linear-gradient(180deg,#179447_0%,#116832_100%)] px-7 py-4 text-base font-semibold text-white shadow-[0_16px_34px_rgba(21,128,61,0.24),0_1px_0_rgba(255,255,255,0.26)_inset] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(21,128,61,0.28),0_1px_0_rgba(255,255,255,0.26)_inset]"
              >
                Show My Result <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600">No spam. Just your result and helpful follow-up based on what the calculator finds.</p>
              <button type="button" onClick={back} className="mt-5 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">← Back to inputs</button>
            </form>
          </div>
        </section>
      )
    }

    if (step === "results") {
      const summary = resultSummary
      const ctaLabel = "Book the $197 AI Office Map"
      const monthlyRange = summary.formattedMonthlyRange

      return (
        <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8" data-calculator-result-page="yearly-leak" data-calculator-root="true" data-calculator-results="true">
          <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1180px] items-center justify-center">
            <div className="box-border w-full overflow-hidden rounded-[1.75rem] border border-white/80 bg-[linear-gradient(180deg,#fffefa_0%,#ffffff_50%,#fbf7ef_100%)] p-4 text-center shadow-[0_30px_95px_rgba(7,20,34,0.13),0_1px_0_rgba(255,255,255,0.9)_inset] sm:rounded-[2.35rem] sm:p-8 lg:rounded-[2.75rem] lg:p-10">
              <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[#efe9dc] sm:h-2">
                <div className="h-full rounded-full bg-[#15803D] transition-all duration-500" style={{ width: "33%" }} />
              </div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#15803D]">Money left on the table · 1 of 3</p>
              <h1 className="mx-auto mt-4 max-w-3xl text-[2.05rem] font-semibold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-[3.55rem] lg:text-[4.3rem]">Estimated money left on the table</h1>
              <div className="calculator-result-value mx-auto mt-5 max-w-5xl break-words rounded-[1.35rem] bg-[linear-gradient(180deg,#fff7f5_0%,#ffffff_100%)] px-3 py-4 text-[3.25rem] font-semibold leading-[0.92] tracking-[-0.055em] text-[#a82418] shadow-[inset_0_0_0_1px_rgba(244,183,175,0.72),0_18px_45px_rgba(180,35,24,0.08)] [font-variant-numeric:tabular-nums] sm:text-[5.7rem] lg:text-[6.8rem]">{summary.hasMeaningfulLeak ? `${summary.formattedHeadlineRange}/year` : "money left on the table"}</div>
              <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-700 sm:text-xl">{summary.hasMeaningfulLeak ? "That is the annual leak estimate from normal office processes, billing delays, missed calls, forgotten follow-up, and untouched customer records." : "The safest next step is checking the real records before making a bigger claim."}</p>
              <div className="mx-auto mt-7 max-w-3xl rounded-[1.4rem] border border-[#f3b7af] bg-[#fff1ef] p-4 text-center shadow-[0_16px_42px_rgba(180,35,24,0.08)] sm:p-5">
                {summary.hasMeaningfulLeak ? (
                  <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-slate-950">
                    <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#b42318]">Cost of waiting</span>
                    <span className="calculator-result-value text-2xl font-semibold leading-none tracking-[-0.035em] text-[#b42318] sm:text-3xl [font-variant-numeric:tabular-nums]">{monthlyRange}</span>
                    <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#b42318]">per month</span>
                  </div>
                ) : (
                  <p className="text-sm font-semibold leading-6 text-slate-700">Cost of waiting: the records need to be checked before the leak repeats.</p>
                )}
              </div>
              <div className="mx-auto mt-8 max-w-3xl rounded-[1.55rem] border border-[#bfe5c7] bg-[linear-gradient(135deg,#eef9f2_0%,#ffffff_58%,#e9f7ed_100%)] p-4 text-center shadow-[0_18px_44px_rgba(21,128,61,0.13)] sm:p-5">
                <CTALink href={auditHref} kind="internal_page" location="calculator_result_yearly" analyticsSource="calculator_result_yearly" ctaLabel={ctaLabel} data-calculator-assessment-cta="true" className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[linear-gradient(180deg,#179447_0%,#116832_100%)] px-7 py-4 text-base font-semibold text-white shadow-[0_16px_34px_rgba(21,128,61,0.24),0_1px_0_rgba(255,255,255,0.26)_inset] transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(21,128,61,0.28),0_1px_0_rgba(255,255,255,0.26)_inset]">Book the $197 AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">Replace this estimate with a real office workflow map.</p>
              </div>
              <div className="mx-auto mt-5 max-w-3xl">
                <button type="button" onClick={() => next("resultDiagnosis")} className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#d8d1c4] bg-white/85 px-6 py-3 text-base font-semibold text-[#405163] transition hover:bg-[#f4efe6]">See what is stuck <ArrowRight className="ml-2 h-4 w-4" /></button>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">View the detailed breakdown.</p>
              </div>
              <button type="button" onClick={back} className="mt-5 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">← Back to inputs</button>
            </div>
          </div>
        </section>
      )
    }

    if (step === "resultDiagnosis") {
      const summary = resultSummary
      const ctaLabel = "Book the $197 AI Office Map"
      return (
        <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8" data-calculator-result-page="diagnosis" data-calculator-root="true" data-calculator-results="true">
          <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1180px] items-center justify-center">
            <div className="box-border w-full overflow-hidden rounded-[1.65rem] border border-[#e8dfd0] bg-white p-4 shadow-[0_22px_80px_rgba(15,23,42,0.10)] sm:rounded-[2.25rem] sm:p-6 lg:rounded-[2.5rem] lg:p-7">
              <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-[#efe9dc] sm:h-2"><div className="h-full rounded-full bg-[#15803D] transition-all duration-500" style={{ width: "66%" }} /></div>
              <div className="text-center"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#15803D]">What is stuck · 2 of 3</p><h1 className="mx-auto mt-3 max-w-3xl text-[2rem] font-semibold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-[3rem] lg:text-[3.6rem]">Where the money is getting stuck</h1></div>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="box-border flex flex-col rounded-[1.25rem] border border-[#dcefe0] bg-[#fbfaf7] p-5 text-left shadow-[0_14px_38px_rgba(15,23,42,0.055)]"><div className="flex items-center gap-3"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#cfe8d5] bg-[#f4fbf5] [&_[data-stanley-display-asset=true]>img]:scale-[1.2] [&_[data-stanley-display-asset=true]>img]:mix-blend-multiply"><DollarCircleDisplayAsset size={27} decorative /></span><h2 className="min-w-0 text-2xl font-semibold leading-7 tracking-tight text-slate-950">Office process and billing drag</h2></div><div className="calculator-result-value mt-3 break-words text-[2.25rem] font-medium leading-[1.02] tracking-[-0.025em] text-slate-950 [font-variant-numeric:tabular-nums] sm:text-[2.85rem]">{summary.formattedCardValues.cashMonthly}/month</div><p className="mt-3 text-base font-semibold leading-7 text-slate-900">Normal office processes, billing, cleanup, and collection are still dragging.</p>{summary.selectedCashDriver ? <p className="mt-3 w-fit max-w-full rounded-full border border-[#dcefe0] bg-white px-3 py-1.5 text-sm font-semibold leading-5 text-slate-800">Biggest drag: {summary.selectedCashDriver.label}</p> : null}<p className="mt-auto pt-4 text-sm font-semibold leading-5 text-slate-500">Annualized office/cash check value: {summary.formattedCardValues.cashAnnual}</p></div>
                <div className="box-border flex flex-col rounded-[1.25rem] border border-[#dcefe0] bg-[#fbfaf7] p-5 text-left shadow-[0_14px_38px_rgba(15,23,42,0.055)]"><div className="flex items-center gap-3"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#cfe8d5] bg-[#f4fbf5] [&_[data-stanley-display-asset=true]>img]:scale-[1.2] [&_[data-stanley-display-asset=true]>img]:mix-blend-multiply"><UsersDisplayAsset size={27} decorative /></span><h2 className="min-w-0 text-2xl font-semibold leading-7 tracking-tight text-slate-950">Past customers, still untouched</h2></div><div className="calculator-result-value mt-3 break-words text-[2.25rem] font-medium leading-[1.02] tracking-[-0.025em] text-slate-950 [font-variant-numeric:tabular-nums] sm:text-[2.85rem]">{summary.formattedCardValues.customerMonthly}/month</div><p className="mt-3 text-base font-semibold leading-7 text-slate-900">Saved customers and missed calls are not turning into booked jobs.</p>{summary.selectedCustomerDriver ? <p className="mt-3 w-fit max-w-full rounded-full border border-[#dcefe0] bg-white px-3 py-1.5 text-sm font-semibold leading-5 text-slate-800">Biggest drag: {summary.selectedCustomerDriver.label}</p> : null}<p className="mt-auto pt-4 text-sm font-semibold leading-5 text-slate-500">Annualized customer check value: {summary.formattedCardValues.customerAnnual}</p></div>
              </div>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]"><div className="rounded-[1.15rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 text-left"><p className="text-sm leading-7 text-slate-700"><span className="font-semibold text-slate-950">Plain English:</span> You already paid for the crew, the customer, and the office time. The money still waits because the follow-up depends on someone remembering. <span className="font-semibold text-slate-950">More leads make this leak bigger.</span></p></div><div className="rounded-[1.15rem] border border-[#bfe5c7] bg-[#eef9f2] p-4 text-left"><div className="text-base font-semibold tracking-tight text-slate-950">Recommended first move: AI Office Map</div><p className="mt-1 text-base font-semibold leading-7 text-slate-800">Check the real records. Map where cash, follow-up, reviews, referrals, and repeat work are getting stuck. Leave with the exact fixes.</p></div></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center"><CTALink href={auditHref} kind="internal_page" location="calculator_result_diagnosis" analyticsSource="calculator_result_diagnosis" ctaLabel={ctaLabel} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#166534] sm:text-base">Book the $197 AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></CTALink><button type="button" onClick={() => next("resultMath")} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#f4efe6] sm:text-base">Continue to the math <ArrowRight className="ml-2 h-4 w-4" /></button><button type="button" onClick={() => next("resultMath")} className="inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-xs font-semibold text-slate-500 transition hover:text-slate-900">See the math</button></div>
              <button type="button" onClick={back} className="mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">← Back to leak summary</button>
            </div>
          </div>
        </section>
      )
    }

    if (step === "resultMath") {
      const summary = resultSummary
      const ctaLabel = "See how the AI Office Map works"

      function downloadResults() {
        window.print()
      }

      return (
        <section className="relative min-h-screen w-full max-w-full overflow-x-clip px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8 print:min-h-0 print:bg-white print:px-0 print:py-0" data-calculator-result-page="math" data-calculator-root="true" data-calculator-results="true">
          <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1180px] items-center justify-center print:block print:min-h-0 print:max-w-none">
            <div className="box-border w-full overflow-hidden rounded-[1.65rem] border border-[#e8dfd0] bg-white p-4 shadow-[0_22px_80px_rgba(15,23,42,0.10)] sm:rounded-[2.25rem] sm:p-6 lg:rounded-[2.5rem] lg:p-7 print:overflow-visible print:rounded-none print:border-0 print:p-0 print:shadow-none">
              <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-[#efe9dc] sm:h-2 print:hidden"><div className="h-full rounded-full bg-[#15803D] transition-all duration-500" style={{ width: "100%" }} /></div>
              <div className="text-center print:hidden"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#15803D]">Math · 3 of 3</p><h1 className="mx-auto mt-3 max-w-3xl text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.04em] text-slate-950 sm:text-[3rem] sm:leading-[1.06] lg:text-[3.5rem]">The math behind the estimate</h1><p className="mx-auto mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-700 sm:text-lg">These numbers are rounded. They are meant to show where the leak may be, not guarantee exact revenue.</p></div>
              <div className="mt-6 grid gap-4 lg:grid-cols-3 print:hidden"><div className="rounded-[1.15rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 text-left"><h2 className="text-lg font-semibold text-slate-950">Cash earned, still stuck</h2><p className="mt-3 text-sm leading-6 text-slate-700">Estimated monthly drag: <span className="font-semibold text-slate-950">{summary.formattedCardValues.cashMonthly}</span></p><p className="mt-1 text-base font-semibold leading-7 text-slate-800">Annualized value: <span className="font-semibold text-slate-950">{summary.formattedCardValues.cashAnnual}</span></p><p className="mt-3 text-sm leading-6 text-slate-600">Driven by moving information between software, regular office process time, missing details, billing delay, and manual office checks.</p></div><div className="rounded-[1.15rem] border border-[#e8dfd0] bg-[#fbfaf7] p-4 text-left"><h2 className="text-lg font-semibold text-slate-950">Past customers, still untouched</h2><p className="mt-3 text-sm leading-6 text-slate-700">Estimated monthly drag: <span className="font-semibold text-slate-950">{summary.formattedCardValues.customerMonthly}</span></p><p className="mt-1 text-base font-semibold leading-7 text-slate-800">Annualized value: <span className="font-semibold text-slate-950">{summary.formattedCardValues.customerAnnual}</span></p><p className="mt-3 text-sm leading-6 text-slate-600">Driven by saved customer records, missed calls, weak repeat follow-up, review gaps, and referral gaps.</p></div><div className="rounded-[1.15rem] border border-[#f3b7af] bg-[#fff1ef] p-4 text-left"><h2 className="text-lg font-semibold text-slate-950">Combined check</h2><p className="mt-3 text-sm leading-6 text-slate-700">Monthly leak: <span className="font-semibold text-[#b42318]">{summary.formattedMonthlyRange}</span></p><p className="mt-1 text-base font-semibold leading-7 text-slate-800">Yearly leak: <span className="font-semibold text-[#b42318]">{summary.formattedHeadlineRange}</span></p><p className="mt-3 text-sm font-semibold leading-6 text-[#b42318]">Cost of waiting: every month the system stays manual, the same leak can repeat.</p></div></div>
              <div className="mt-5 rounded-[1.15rem] border border-[#cfe8d5] bg-[#f4fbf5] p-4 text-left print:hidden"><div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#15803D]">Monthly leak estimate</div><p className="mt-2 text-sm font-semibold leading-6 text-slate-700 sm:text-base sm:leading-7">{summary.equationText}</p>{summary.equationComponents.length ? <div className="mt-3 grid gap-2 sm:grid-cols-2">{summary.equationComponents.map((component) => <span key={component.label} className="flex items-center justify-between gap-3 rounded-2xl border border-[#bfe5c7] bg-white px-3 py-2 text-xs font-semibold text-slate-700 sm:text-sm"><span>{component.label}</span><span className="shrink-0 font-extrabold text-slate-950">{component.displayValue}</span></span>)}</div> : null}</div>
              <div className="mt-5 grid gap-3 rounded-[1.15rem] border border-[#bfe5c7] bg-[linear-gradient(135deg,#eef9f2_0%,#ffffff_52%,#e9f7ed_100%)] p-4 text-left lg:grid-cols-[1fr_auto] lg:items-center print:hidden"><div><h2 className="text-xl font-semibold tracking-tight text-slate-950">Want the real records checked?</h2><p className="mt-1 text-base font-semibold leading-7 text-slate-800">The calculator estimates admin drag. The AI Office Map checks the records, maps the office flow, and shows what should be fixed first.</p></div><CTALink href="/how-the-assessment-works" kind="internal_page" location="calculator_result_math" analyticsSource="calculator_result_math" ctaLabel={ctaLabel} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#166534] sm:text-base">See how the AI Office Map works <ArrowRight className="ml-2 h-4 w-4" /></CTALink></div>
              <div className="mt-5 rounded-[1.15rem] border border-[#DDEBE2] bg-white p-4 text-left shadow-[0_10px_24px_rgba(7,29,58,0.035)] print:hidden"><div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center"><div><h2 className="text-xl font-semibold tracking-tight text-slate-950">Download your results</h2><p className="mt-1 text-base font-semibold leading-7 text-slate-800">Opens a clean Stanley Systems result sheet you can save as a PDF from the print dialog.</p></div><button type="button" onClick={downloadResults} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-[#F4FBF5] px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:bg-[#E7F7EB]">Download your results</button></div></div>
              <div className="hidden bg-white p-8 text-[#071D3A] print:block">
                <div className="border-b border-[#DDEBE2] pb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#15803D]">Stanley Systems</p>
                  <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-[-0.035em] text-[#071D3A]">Calculator result sheet</h1>
                  <p className="mt-2 max-w-[680px] text-sm font-medium leading-6 text-slate-600">This is a rough estimate from the calculator. The AI Office Map checks the real records and turns the estimate into a workflow map, fix list, and expected results.</p>
                </div>
                <div className="mt-6 rounded-2xl border border-[#f3b7af] bg-[#fff1ef] p-5">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#b42318]">Estimated money left on the table</div>
                  <div className="mt-2 text-5xl font-semibold leading-none tracking-[-0.04em] text-[#b42318]">{summary.formattedHeadlineRange}/year</div>
                  <p className="mt-3 text-base font-semibold text-slate-800">Cost of waiting: {summary.formattedMonthlyRange} per month.</p>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-[#DDEBE2] p-4"><h2 className="text-xl font-semibold tracking-[-0.02em] text-[#102033]">Cash earned, still stuck</h2><p className="mt-2 text-base font-semibold leading-6 text-slate-800">Monthly value: {summary.formattedCardValues.cashMonthly}</p><p className="mt-1 text-base font-semibold leading-6 text-slate-800">Annualized value: {summary.formattedCardValues.cashAnnual}</p></div>
                  <div className="rounded-2xl border border-[#DDEBE2] p-4"><h2 className="text-xl font-semibold tracking-[-0.02em] text-[#102033]">Past customers, still untouched</h2><p className="mt-2 text-base font-semibold leading-6 text-slate-800">Monthly value: {summary.formattedCardValues.customerMonthly}</p><p className="mt-1 text-base font-semibold leading-6 text-slate-800">Annualized value: {summary.formattedCardValues.customerAnnual}</p></div>
                </div>
                <div className="mt-5 rounded-2xl border border-[#DDEBE2] p-4"><h2 className="text-xl font-semibold tracking-[-0.02em] text-[#102033]">Math used</h2><p className="mt-2 text-base font-semibold leading-7 text-slate-800">{summary.equationText}</p>{summary.equationComponents.map((component) => <p key={component.label} className="mt-1 text-base font-semibold leading-6 text-slate-800">{component.label}: {component.displayValue}</p>)}</div>
                <div className="mt-5 rounded-2xl border border-[#BFE4C8] bg-[#F4FBF5] p-4"><h2 className="text-xl font-semibold tracking-[-0.02em] text-[#102033]">AI Office Map</h2><p className="mt-1 text-base font-semibold leading-7 text-slate-800">Replace this estimate with a real office workflow map, fix list, and expected results.</p></div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 print:hidden"><button type="button" onClick={back} className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">← Back to results</button><Link href="/" className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">Back to site</Link></div>
            </div>
          </div>
        </section>
      )
    }

    return null
  })()

  return quizContent
}
