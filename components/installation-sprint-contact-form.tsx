"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessType: "",
  workflow: "",
  smsConsent: false,
}

export function InstallationSprintContactForm() {
  const [formData, setFormData] = useState(initialForm)
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  function updateField(field: keyof typeof initialForm, value: string | boolean) {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState("submitting")
    setSubmitMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          business: formData.company,
          businessType: formData.businessType,
          business_type: formData.businessType,
          problem: formData.workflow,
          main_issue: formData.workflow,
          message: formData.workflow,
          smsConsent: formData.smsConsent,
          telegram_alert_type: "installation_sprint_contact",
          form_type: "installation_sprint_contact",
          source: "installation-sprint-page-form",
          source_section: "installation_sprint_contact",
          page: "/systems-installation-sprint",
          submitted_at: new Date().toISOString(),
        }),
      })

      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || result?.message || "Something went wrong.")
      }

      setSubmitState("success")
      setSubmitMessage(result?.message || "Thanks. Stanley Systems received your installation note and will reply soon.")
      setFormData(initialForm)
    } catch (error) {
      setSubmitState("error")
      setSubmitMessage(error instanceof Error ? `${error.message} If needed, email jaden@stanley-systems.com directly.` : "Something went wrong. If needed, email jaden@stanley-systems.com directly.")
    }
  }

  return (
    <section id="installation-contact" className="bg-[#FBFCF7] px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_24px_70px_rgba(7,29,58,0.08)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#15803D]">Installation contact</p>
          <h2 className="mt-4 text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.7rem]">Tell us what you want installed.</h2>
          <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-[#536173]">
            This is intentionally short. Send the workflow you want fixed and Stanley Systems will reply with the clean next step.
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-[#CFE8D5] bg-[#F4FBF5] p-5 text-sm font-bold leading-6 text-[#116832]">
            Best fit: you already know the office workflow that needs to move faster — billing readiness, follow-up, records, handoffs, or job admin.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {submitState === "success" ? (
            <div className="flex items-center gap-3 rounded-2xl border border-[#cfe6d5] bg-[#eef9f1] px-4 py-3 text-sm font-semibold text-[#166534]">
              <CheckCircle2 className="h-5 w-5" />
              {submitMessage}
            </div>
          ) : null}
          {submitState === "error" ? (
            <div className="rounded-2xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-3 text-sm font-semibold text-[#991b1b]">{submitMessage}</div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { key: "name", label: "Name*", type: "text", placeholder: "Jane Smith" },
              { key: "company", label: "Business*", type: "text", placeholder: "Company name" },
              { key: "email", label: "Email*", type: "email", placeholder: "jane@company.com" },
              { key: "phone", label: "Phone", type: "tel", placeholder: "+1 (555) 123-4567" },
            ].map((field) => (
              <label key={field.key} className="block">
                <span className="mb-2 block text-sm font-bold text-[#334B60]">{field.label}</span>
                <input
                  type={field.type}
                  required={field.key !== "phone"}
                  value={formData[field.key as keyof typeof initialForm] as string}
                  onChange={(event) => updateField(field.key as keyof typeof initialForm, event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] px-4 py-3.5 text-[#071D3A] outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                />
              </label>
            ))}
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#334B60]">Business type*</span>
            <input
              type="text"
              required
              value={formData.businessType}
              onChange={(event) => updateField("businessType", event.target.value)}
              placeholder="HVAC, plumbing, marine, electrical, landscaping, etc."
              className="w-full rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] px-4 py-3.5 text-[#071D3A] outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#334B60]">What workflow do you want installed first?*</span>
            <textarea
              rows={4}
              required
              value={formData.workflow}
              onChange={(event) => updateField("workflow", event.target.value)}
              placeholder="Example: make finished jobs billing-ready faster, clean up estimate follow-up, summarize job notes, or route admin tasks to the right person."
              className="w-full rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] px-4 py-3.5 text-[#071D3A] outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
            />
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] px-4 py-3 text-sm leading-6 text-[#536173]">
            <input
              type="checkbox"
              checked={formData.smsConsent}
              onChange={(event) => updateField("smsConsent", event.target.checked)}
              className="mt-1 h-4 w-4 rounded border border-[#cbd5c0] text-[#15803D] focus:ring-2 focus:ring-[#15803D]/20"
            />
            <span>
              I agree to receive text messages from Stanley Systems about my inquiry. Consent is not a condition of purchase. See the{" "}
              <Link href="/privacy-policy" className="font-bold text-[#071D3A] underline underline-offset-4">Privacy Policy</Link>{" "}
              and{" "}
              <Link href="/terms-and-conditions" className="font-bold text-[#071D3A] underline underline-offset-4">Terms</Link>.
            </span>
          </label>

          <button type="submit" disabled={submitState === "submitting"} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#15803D] px-6 py-4 text-base font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832] disabled:cursor-not-allowed disabled:opacity-70">
            {submitState === "submitting" ? "Sending..." : "Send installation note"}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  )
}
