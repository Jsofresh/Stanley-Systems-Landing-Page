"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { ArrowRight, CalendarDays, CheckCircle2, ClipboardCheck, Mail, ShieldCheck } from "lucide-react"
import { trackOnboardingFormStarted, trackOnboardingFormSubmitted } from "@/components/posthog-provider"

const whatBoughtOptions = [
  "Office Process Assessment",
  "Cashflow Control System — monthly",
  "Cashflow Control System — yearly",
  "Repeat Revenue System — monthly",
  "Repeat Revenue System — yearly",
  "Both Systems — yearly",
  "Both Systems",
  "Not sure / Stripe receipt says something else",
]

const accessReadinessOptions = [
  "Ready now — I can provide access before the call",
  "Mostly ready — I need to confirm one or two logins",
  "Not ready yet — tell me exactly what to prepare",
  "Someone else on my team controls access",
]

const boughtPrefillMap: Record<string, string> = {
  workflow_audit: "Office Process Assessment",
  audit: "Office Process Assessment",
  cashflow_control_monthly: "Cashflow Control System — monthly",
  cashflow_control_yearly: "Cashflow Control System — yearly",
  repeat_revenue_monthly: "Repeat Revenue System — monthly",
  repeat_revenue_yearly: "Repeat Revenue System — yearly",
  both_systems_yearly: "Both Systems — yearly",
  both_systems: "Both Systems",
}

type FormData = {
  name: string
  business: string
  email: string
  phone: string
  whatBought: string
  fieldJobDispatchSystem: string
  accountingBillingSystem: string
  biggestLeak: string
  accessReadiness: string
  preferredCallTime: string
  notes: string
  smsConsent: boolean
}

function cleanPrefill(value: string | null) {
  return value?.trim().slice(0, 120) || ""
}

function InputField({
  label,
  name,
  type = "text",
  value,
  required = true,
  placeholder,
  helper,
  onChange,
}: {
  label: string
  name: keyof FormData
  type?: string
  value: string
  required?: boolean
  placeholder: string
  helper?: string
  onChange: (field: keyof FormData, value: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#334155]">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#d8e2ea] bg-white px-4 py-3.5 text-[#102033] outline-none transition placeholder:text-[#8b98a8] focus:border-[#1d6b37] focus:ring-4 focus:ring-[#1d6b37]/10"
      />
      {helper ? <span className="mt-2 block text-xs leading-5 text-[#6a7888]">{helper}</span> : null}
    </label>
  )
}

function SelectField({
  label,
  name,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string
  name: keyof FormData
  value: string
  placeholder: string
  options: string[]
  onChange: (field: keyof FormData, value: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#334155]">{label}</span>
      <select
        name={name}
        required
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        className="w-full rounded-2xl border border-[#d8e2ea] bg-white px-4 py-3.5 text-[#102033] outline-none transition focus:border-[#1d6b37] focus:ring-4 focus:ring-[#1d6b37]/10"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export function BuyerOnboardingForm() {
  const searchParams = useSearchParams()
  const initialFormData = useMemo<FormData>(() => {
    const boughtQuery = cleanPrefill(searchParams.get("bought") || searchParams.get("package") || searchParams.get("plan"))
    return {
      name: cleanPrefill(searchParams.get("name")),
      business: cleanPrefill(searchParams.get("business") || searchParams.get("company")),
      email: cleanPrefill(searchParams.get("email")),
      phone: cleanPrefill(searchParams.get("phone")),
      whatBought: boughtPrefillMap[boughtQuery] || (whatBoughtOptions.includes(boughtQuery) ? boughtQuery : ""),
      fieldJobDispatchSystem: "",
      accountingBillingSystem: "",
      biggestLeak: cleanPrefill(searchParams.get("leak")),
      accessReadiness: "",
      preferredCallTime: cleanPrefill(searchParams.get("call_time")),
      notes: "",
      smsConsent: false,
    }
  }, [searchParams])

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [deliveryState, setDeliveryState] = useState<"unknown" | "webhook" | "not-configured">("unknown")
  const [hasStarted, setHasStarted] = useState(false)

  function updateField(field: keyof FormData, value: string) {
    if (!hasStarted) {
      setHasStarted(true)
      trackOnboardingFormStarted({ event_source: "paid_buyer_onboarding_form" })
    }
    setFormData((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState("submitting")
    setSubmitMessage("")
    setDeliveryState("unknown")

    try {
      const response = await fetch("/api/checkout/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          telegram_alert_type: "paid_buyer_onboarding",
          form_type: "paid_buyer_onboarding",
          source: "paid-buyer-onboarding-form",
          page: "/checkout/onboarding",
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || result?.message || "Something went wrong.")
      }

      setSubmitState("success")
      setSubmitMessage(result?.message || "Thanks. Stanley Systems received your onboarding details.")
      setDeliveryState(result?.delivery === "webhook" ? "webhook" : "not-configured")
      trackOnboardingFormSubmitted({
        event_source: "paid_buyer_onboarding_form",
        package_name: formData.whatBought,
      })
    } catch (error) {
      setSubmitState("error")
      setSubmitMessage(
        error instanceof Error
          ? `${error.message} If needed, email hello@stanley-systems.com directly.`
          : "Something went wrong. If needed, email hello@stanley-systems.com directly.",
      )
    }
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
      <div className="rounded-[2rem] border border-[#dfe7ee] bg-white/92 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e6f4ea] text-[#1d6b37]">
          <ClipboardCheck className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-[#102033] sm:text-5xl">
          Paid buyer onboarding
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#536173]">
          Use this after checkout so Stanley Systems can confirm what you bought, which tools you use, what access is ready, and where the first leak needs review.
        </p>

        <div className="mt-8 space-y-3 text-sm leading-6 text-[#536173]">
          {[
            { icon: ShieldCheck, title: "Fit, access, and scope review", copy: "Implementation starts after Stanley Systems checks the package fit and required access." },
            { icon: CalendarDays, title: "Call timing", copy: "Add your preferred call window here, then book a time from the success page if you have not already." },
            { icon: Mail, title: "Notification fallback", copy: "If notification delivery is not configured, the form confirms that directly and gives the fallback email." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#dfe7ee] bg-[#f8fbfc] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#1d6b37]">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-[#102033]">{item.title}</h2>
                  <p className="mt-1">{item.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#dfe7ee] bg-[#f5f8fa] p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
        {submitState === "success" ? (
          <div className="mb-5 rounded-2xl border border-[#bfe4c8] bg-[#f4fbf5] p-4 text-sm font-medium leading-6 text-[#1d5f34]">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p>{submitMessage}</p>
                {deliveryState === "not-configured" ? (
                  <p className="mt-2 text-[#6b4b16]">
                    Notification blocker flagged: STANLEY_CONTACT_WEBHOOK_URL is not configured for this form path yet.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        {submitState === "error" ? (
          <div className="mb-5 rounded-2xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-3 text-sm font-medium text-[#991b1b]">
            {submitMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField label="Name*" name="name" value={formData.name} placeholder="Jane Smith" onChange={updateField} />
            <InputField label="Business*" name="business" value={formData.business} placeholder="Your business name" onChange={updateField} />
            <InputField label="Email*" name="email" type="email" value={formData.email} placeholder="jane@company.com" onChange={updateField} />
            <InputField label="Phone*" name="phone" type="tel" value={formData.phone} placeholder="+1 (555) 123-4567" onChange={updateField} />
          </div>

          <SelectField label="What did you buy?*" name="whatBought" value={formData.whatBought} placeholder="Select the checkout item" options={whatBoughtOptions} onChange={updateField} />

          <div className="grid gap-5 sm:grid-cols-2">
            <InputField label="Field, job, or dispatch system*" name="fieldJobDispatchSystem" value={formData.fieldJobDispatchSystem} placeholder="Current job system" helper="Examples: Housecall Pro, ServiceTitan, Jobber, spreadsheet." onChange={updateField} />
            <InputField label="Accounting or billing system*" name="accountingBillingSystem" value={formData.accountingBillingSystem} placeholder="Current billing system" helper="Examples: QuickBooks, Xero, Stripe, invoices by hand." onChange={updateField} />
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#334155]">Biggest leak you want fixed first*</span>
            <textarea
              name="biggestLeak"
              rows={4}
              required
              value={formData.biggestLeak}
              onChange={(event) => updateField("biggestLeak", event.target.value)}
              placeholder="What should we fix first?"
              className="w-full rounded-2xl border border-[#d8e2ea] bg-white px-4 py-3.5 text-[#102033] outline-none transition placeholder:text-[#8b98a8] focus:border-[#1d6b37] focus:ring-4 focus:ring-[#1d6b37]/10"
            />
            <span className="mt-2 block text-xs leading-5 text-[#6a7888]">
              Examples: unpaid finished jobs, missed calls, no follow-up, old customers not being contacted, or job details lost before billing.
            </span>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField label="Access readiness*" name="accessReadiness" value={formData.accessReadiness} placeholder="Select access status" options={accessReadinessOptions} onChange={updateField} />
            <InputField label="Preferred call time*" name="preferredCallTime" value={formData.preferredCallTime} placeholder="Weekday mornings" helper="Example: Tue after 2pm ET." onChange={updateField} />
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#334155]">Notes</span>
            <textarea
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="Optional notes"
              className="w-full rounded-2xl border border-[#d8e2ea] bg-white px-4 py-3.5 text-[#102033] outline-none transition placeholder:text-[#8b98a8] focus:border-[#1d6b37] focus:ring-4 focus:ring-[#1d6b37]/10"
            />
            <span className="mt-2 block text-xs leading-5 text-[#6a7888]">Anything else Stanley Systems should know before the first review.</span>
          </label>

          <div className="rounded-[1.5rem] border border-[#dfe7ee] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.smsConsent}
                onChange={(event) => {
                  if (!hasStarted) {
                    setHasStarted(true)
                    trackOnboardingFormStarted({ event_source: "paid_buyer_onboarding_form" })
                  }
                  setFormData((current) => ({ ...current, smsConsent: event.target.checked }))
                }}
                className="mt-0.5 h-5 w-5 shrink-0 rounded border border-[#cbd5c0] text-[#1d6b37] focus:ring-2 focus:ring-[#1d6b37]/20"
              />
              <span className="text-sm leading-6 text-[#536173]">
                I agree to receive text messages from Stanley Systems about onboarding, appointments, service updates, billing, and account follow-up. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase. {" "}
                <Link href="/privacy-policy" className="inline-flex min-h-7 items-center font-medium text-[#102033] underline underline-offset-4">
                  Privacy Policy
                </Link>{" "}
                and {" "}
                <Link href="/terms-and-conditions" className="inline-flex min-h-7 items-center font-medium text-[#102033] underline underline-offset-4">
                  Terms and Conditions
                </Link>
                .
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#102033] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1b344f] focus:outline-none focus:ring-2 focus:ring-[#102033] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitState === "submitting" ? "Sending onboarding..." : "Submit onboarding"}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  )
}
