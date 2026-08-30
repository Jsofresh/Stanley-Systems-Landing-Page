"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { trackStanleyEvent } from "@/lib/posthog-attribution"

const initialForm = { name: "", email: "", company: "", businessType: "", companySize: "", workflow: "" }

export function InstallationSprintContactForm() {
  const [formData, setFormData] = useState(initialForm)
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  function updateField(field: keyof typeof initialForm, value: string) {
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
          source: "stanley_systems_website",
          form_name: "founding_partner_installation",
          offer: "founding_ai_office_installation",
          intent: "founding_partner_fit_review",
          page_url: typeof window !== "undefined" ? window.location.href : "/systems-installation-sprint",
          submitted_at: new Date().toISOString(),
          name: formData.name,
          business: formData.company,
          company: formData.company,
          email: formData.email,
          business_type: formData.businessType,
          businessType: formData.businessType,
          workflow_to_install_first: formData.workflow,
          company_size: formData.companySize,
          problem: formData.workflow,
          main_issue: formData.workflow,
          message: formData.workflow,
          utm: typeof window !== "undefined" ? Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].map((key) => [key.replace("utm_", ""), new URLSearchParams(window.location.search).get(key) || ""])) : {},
          context: { section: "founding_partner_application", cta_text: "Apply for Installation" },
          telegram_alert_type: "founding_partner_installation",
          form_type: "founding_partner_installation",
          source_section: "founding_partner_application",
          page: "/systems-installation-sprint",
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) throw new Error(result?.error || result?.message || "Something went wrong.")
      setSubmitState("success")
      trackStanleyEvent("founding_application_submitted", { form_id: "founding_partner_installation", form_location: "installation_page" })
      setSubmitMessage(result?.message || "Got it. Stanley Systems will review your fit and reply with the next step.")
      setFormData(initialForm)
    } catch (error) {
      setSubmitState("error")
      setSubmitMessage(error instanceof Error ? `${error.message} Please try again or email Stanley Systems directly.` : "Something went wrong. Please try again.")
    }
  }

  const fields = [
    { key: "name", label: "Name", type: "text", placeholder: "Jane Smith", autoComplete: "name" },
    { key: "company", label: "Company", type: "text", placeholder: "Company name", autoComplete: "organization" },
    { key: "email", label: "Work email", type: "email", placeholder: "jane@company.com", autoComplete: "email" },
    { key: "businessType", label: "Industry", type: "text", placeholder: "HVAC, plumbing, electrical…", autoComplete: "organization-title" },
    { key: "companySize", label: "Team size", type: "text", placeholder: "Example: 18 people", autoComplete: "off" },
  ] as const

  return <section id="installation-contact" className="scroll-mt-[120px] bg-[#FBFCF7] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
    <div className="mx-auto grid max-w-6xl items-start gap-10 rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_24px_70px_rgba(7,29,58,0.08)] sm:p-8 lg:grid-cols-[.82fr_1.18fr] lg:p-10">
      <div><h2 className="text-[clamp(2.6rem,5vw,4.3rem)] font-extrabold leading-[.95] tracking-[-.045em] text-[#071D3A]">Tell us where office work gets stuck.</h2><p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-[#536173]">A short first step. We will gather software and scheduling details only after confirming the fit.</p><div className="mt-6 rounded-[1.5rem] border border-[#CFE8D5] bg-[#F4FBF5] p-5 text-sm font-bold leading-6 text-[#116832]">Do not include passwords, access tokens, private customer information, or records.</div></div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {submitState === "success" ? <div role="status" aria-live="polite" className="flex items-center gap-3 rounded-2xl border border-[#cfe6d5] bg-[#eef9f1] px-4 py-3 text-sm font-semibold text-[#166534]"><CheckCircle2 className="h-5 w-5" />{submitMessage}</div> : null}
        {submitState === "error" ? <div role="alert" aria-live="assertive" className="rounded-2xl border border-[#f1c7c7] bg-[#fff4f4] px-4 py-3 text-sm font-semibold text-[#991b1b]">{submitMessage}</div> : null}
        <div className="grid gap-4 sm:grid-cols-2">{fields.map(field => <label key={field.key} htmlFor={`install-${field.key}`} className="block"><span className="mb-2 block text-sm font-bold text-[#334B60]">{field.label}*</span><input id={`install-${field.key}`} name={field.key} type={field.type} required autoComplete={field.autoComplete} value={formData[field.key]} onChange={event => updateField(field.key, event.target.value)} placeholder={field.placeholder} className="w-full rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] px-4 py-3.5 text-[#071D3A] outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" /></label>)}</div>
        <label htmlFor="install-workflow" className="block"><span className="mb-2 block text-sm font-bold text-[#334B60]">First workflow to improve*</span><textarea id="install-workflow" name="workflow" rows={3} required value={formData.workflow} onChange={event => updateField("workflow", event.target.value)} placeholder="Example: make finished jobs billing-ready faster." className="w-full rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] px-4 py-3.5 text-[#071D3A] outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" /></label>
        <button type="submit" disabled={submitState === "submitting"} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#15803D] px-6 py-4 font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,.22)] transition hover:-translate-y-0.5 hover:bg-[#116832] disabled:cursor-not-allowed disabled:opacity-70">{submitState === "submitting" ? "Sending…" : "Apply for Installation"}<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></button>
      </form>
    </div>
  </section>
}
