"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, CheckCircle2, ClipboardList, Mail, Phone, ShieldCheck, Wrench } from "lucide-react"
import { trackOnboardingFormStarted, trackOnboardingFormSubmitted } from "@/components/posthog-provider"

const contactCards = [
  {
    icon: Mail,
    title: "Email directly",
    description: "If you would rather send notes by email, Stanley Systems can review them there too.",
    value: "hello@stanley-systems.com",
    href: "mailto:hello@stanley-systems.com",
  },
  {
    icon: Phone,
    title: "Call directly",
    description: "If you want to talk it through first, call and explain where things keep getting stuck.",
    compact: true,
    value: "+1 (617) 958-6372",
    href: "tel:+16179586372",
  },
]

const fitPoints = [
  "Reviewed by a real person",
  "Paid Cash Flow Assessment first, not a generic sales call",
  "Built for service businesses with revenue leaks in the office workflow",
]

const workflowOptions = [
  "Following up with leads",
  "Scheduling and dispatch",
  "Job details getting lost between office and field",
  "Paperwork or admin backlog",
  "Invoicing",
  "Getting paid",
  "Something else",
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    businessType: "",
    bottleneck: "",
    invoiceDelay: "",
    currentProcess: "",
    problem: "",
    smsConsent: false,
  })
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")
  const [hasStarted, setHasStarted] = useState(false)

  function updateField(field: keyof typeof formData, value: string) {
    if (!hasStarted) {
      setHasStarted(true)
      trackOnboardingFormStarted({ event_source: "workflow_audit_contact_form" })
    }
    setFormData((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState("submitting")
    setSubmitMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "contact-page-form",
          page: "/contact",
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || result?.message || "Something went wrong.")
      }

      setSubmitState("success")
      trackOnboardingFormSubmitted({ event_source: "workflow_audit_contact_form" })
      setSubmitMessage(
        result?.message || "Thanks. Stanley Systems will take a look and reach out if there is a clear revenue problem to inspect.",
      )
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        businessType: "",
        bottleneck: "",
        invoiceDelay: "",
        currentProcess: "",
        problem: "",
        smsConsent: false,
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
    <section id="contact" className="relative z-10 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-[2rem] border border-[#ece4d6] bg-[linear-gradient(180deg,#f9f6ef_0%,#ffffff_100%)] p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8">

            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              A better first step than another generic contact form.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              This starts the paid Cash Flow Assessment path. If there is a real breakdown in your follow-up, calls, paperwork, or invoicing, Stanley Systems uses this to see where money may be leaking first.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => (
                <div
                  key={card.title}
                  className="flex rounded-[1.5rem] border border-[#e8dfd0] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] lg:min-h-[13.5rem]"
                >
                  <div className="flex w-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold leading-tight text-slate-900">{card.title}</h3>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4efe6] text-[#15803D]">
                        <card.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <p className={card.compact ? "mt-2 max-w-[15rem] text-sm leading-6 text-slate-600 sm:text-[15px]" : "mt-3 text-sm leading-6 text-slate-600 sm:text-[15px]"}>{card.description}</p>
                    <a
                      href={card.href}
                      className={card.compact ? "mt-3 block whitespace-nowrap text-center text-[13px] font-semibold text-slate-900 underline underline-offset-4 sm:text-[14px]" : "mt-4 block whitespace-nowrap text-center text-[13px] font-semibold text-slate-900 underline underline-offset-4 sm:text-[14px]"}
                    >
                      {card.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-[#dfe8d9] bg-[linear-gradient(180deg,#f5f9f1_0%,#ffffff_100%)] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">What we are looking for</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
                    The best fit is a service business where finished work, calls, job details, customer follow-up, or invoices still depend too much on memory, inbox digging, or the owner stepping in to keep everything moving.
                  </p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#15803D]">
                  <Wrench className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 space-y-2.5 text-[13px] leading-5 text-slate-600 sm:text-[14px]">
                {fitPoints.map((row) => (
                  <div key={row} className="rounded-xl border border-[#e4ecdd] bg-white px-4 py-2.5">
                    {row}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-[#e8dfd0] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">What happens next</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-[15px]">
                    Stanley Systems reviews what you send, looks for the revenue problem, and reaches out if there is a clear place to inspect through the Cash Flow Assessment.
                  </p>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4efe6] text-[#15803D]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e8dfd0] bg-[#f5f1e8] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
            {submitState === "success" ? (
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#cfe6d5] bg-[#eef9f1] px-4 py-3 text-sm font-medium text-[#166534]">
                <CheckCircle2 className="h-5 w-5" />
                {submitMessage}
              </div>
            ) : null}

            {submitState === "error" ? (
              <div className="mb-5 rounded-2xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-3 text-sm font-medium text-[#991b1b]">
                {submitMessage}
              </div>
            ) : null}

            <div className="mb-6">
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[2rem]">
                Apply for the Cash Flow Assessment
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                Answer a few quick questions so Stanley Systems can see whether there is a real revenue problem worth checking first.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { key: "name", label: "Full name*", placeholder: "Jane Smith" },
                  { key: "company", label: "Business name*", placeholder: "Your business name" },
                  { key: "email", label: "Email*", placeholder: "jane@company.com" },
                  { key: "phone", label: "Phone number", placeholder: "+1 (555) 123-4567" },
                ].map((field) => (
                  <label key={field.key} className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">{field.label}</span>
                    <input
                      type={field.key === "email" ? "email" : field.key === "phone" ? "tel" : "text"}
                      required={field.key === "name" || field.key === "email" || field.key === "company"}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(event) => updateField(field.key as keyof typeof formData, event.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-[#e2d8c7] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                    />
                  </label>
                ))}
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">What kind of service business do you run?*</span>
                <input
                  type="text"
                  required
                  value={formData.businessType}
                  onChange={(event) => updateField("businessType", event.target.value)}
                  placeholder="HVAC, plumbing, marine, electrical, landscaping, etc."
                  className="w-full rounded-2xl border border-[#e2d8c7] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Where do things usually get stuck?*</span>
                <select
                  required
                  value={formData.bottleneck}
                  onChange={(event) => updateField("bottleneck", event.target.value)}
                  className="w-full rounded-2xl border border-[#e2d8c7] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                >
                  <option value="">Select the biggest bottleneck</option>
                  {workflowOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">How long after a job is done does the invoice usually go out?</span>
                <input
                  type="text"
                  value={formData.invoiceDelay}
                  onChange={(event) => updateField("invoiceDelay", event.target.value)}
                  placeholder="Same day, 2 days later, weekly batch, when someone has time, etc."
                  className="w-full rounded-2xl border border-[#e2d8c7] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">What happens today when a new lead or job comes in?*</span>
                <textarea
                  rows={4}
                  required
                  value={formData.currentProcess}
                  onChange={(event) => updateField("currentProcess", event.target.value)}
                  placeholder="Walk through what happens now, from the first call or message to the next handoff."
                  className="w-full rounded-2xl border border-[#e2d8c7] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">What is the biggest headache you want fixed first?*</span>
                <textarea
                  rows={5}
                  required
                  value={formData.problem}
                  onChange={(event) => updateField("problem", event.target.value)}
                  placeholder="Describe where follow-up, billing, paperwork, or office work keeps getting slowed down."
                  className="w-full rounded-2xl border border-[#e2d8c7] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                />
              </label>

              <div className="rounded-[1.5rem] border border-[#dfe8d9] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.smsConsent}
                    onChange={(event) => {
                      if (!hasStarted) {
                        setHasStarted(true)
                        trackOnboardingFormStarted({ event_source: "workflow_audit_contact_form" })
                      }
                      setFormData((current) => ({ ...current, smsConsent: event.target.checked }))
                    }}
                    className="mt-1 h-4 w-4 rounded border border-[#cbd5c0] text-[#15803D] focus:ring-2 focus:ring-[#15803D]/20"
                  />
                  <span className="text-sm leading-6 text-slate-700">
                    I agree to receive text messages from Stanley Systems about my inquiry, appointments, service updates, billing, and account follow-up. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase. {" "}
                    <Link href="/privacy-policy" className="font-medium text-slate-900 underline underline-offset-4">
                      Privacy Policy
                    </Link>{" "}
                    and {" "}
                    <Link href="/terms-and-conditions" className="font-medium text-slate-900 underline underline-offset-4">
                      Terms and Conditions
                    </Link>
                    .
                  </span>
                </label>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  By submitting this form, you agree to our {" "}
                  <Link href="/privacy-policy" className="font-medium text-slate-900 underline underline-offset-4">
                    Privacy Policy
                  </Link>{" "}
                  and {" "}
                  <Link href="/terms-and-conditions" className="font-medium text-slate-900 underline underline-offset-4">
                    Terms and Conditions
                  </Link>
                  .
                </p>
              </div>

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#166534] px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#14532d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitState === "submitting" ? "Sending..." : "Apply for the Cash Flow Assessment"}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
