"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { trackStanleyEvent } from "@/lib/posthog-attribution"

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessType: "",
  workflow: "",
  companySize: "",
  officeTeamSize: "",
  softwareStack: "",
  consideringHire: "",
  decisionMakerRole: "",
  readinessTimeline: "",
  preferredTime: "",
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
          phone: formData.phone,
          business_type: formData.businessType,
          businessType: formData.businessType,
          workflow_to_install_first: formData.workflow,
          company_size: formData.companySize,
          office_team_size: formData.officeTeamSize,
          software_stack: formData.softwareStack,
          considering_admin_hire: formData.consideringHire,
          decision_maker_role: formData.decisionMakerRole,
          readiness_timeline: formData.readinessTimeline,
          preferred_demo_time: formData.preferredTime,
          problem: formData.workflow,
          main_issue: formData.workflow,
          message: formData.workflow,
          sms_consent: formData.smsConsent,
          smsConsent: formData.smsConsent,
          utm: typeof window !== "undefined" ? Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].map((key) => [key.replace("utm_", ""), new URLSearchParams(window.location.search).get(key) || ""])) : {},
          context: {
            section: "founding_partner_application",
            cta_text: "Apply for a Founding Partner Installation",
          },
          telegram_alert_type: "founding_partner_installation",
          form_type: "founding_partner_installation",
          source_section: "founding_partner_application",
          page: "/systems-installation-sprint",
        }),
      })

      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || result?.message || "Something went wrong.")
      }

      setSubmitState("success")
      trackStanleyEvent("founding_application_submitted", { form_id: "founding_partner_installation", form_location: "installation_page" })
      setSubmitMessage(result?.message || "Got it. Stanley Systems will review this and reply with the next step for starting the Sprint.")
      setFormData(initialForm)
    } catch (error) {
      setSubmitState("error")
      setSubmitMessage(error instanceof Error ? `${error.message} Please try again or email Stanley Systems directly.` : "Something went wrong. Please try again or email Stanley Systems directly.")
    }
  }

  return (
    <section id="installation-contact" className="scroll-mt-[120px] bg-[#FBFCF7] px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-28">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_24px_70px_rgba(7,29,58,0.08)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
        <div>
          <h2 className="text-[2.35rem] font-semibold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[3.7rem]">Apply for one of two installations.</h2>
          <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-[#536173]">
            Share the office drag, team, and software context. Stanley Systems will review fit and supported scope before discussing an installation.
          </p>
          <div className="mt-6 rounded-[1.5rem] border border-[#CFE8D5] bg-[#F4FBF5] p-5 text-sm font-bold leading-6 text-[#116832]">
            Do not include passwords, access tokens, API keys, private customer information, or uploaded records here.
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

          <div className="grid gap-4 sm:grid-cols-2">
            {[{ key: "companySize", label: "Company size*", placeholder: "Example: 18 employees" }, { key: "officeTeamSize", label: "Office team size*", placeholder: "Example: 3 people" }, { key: "decisionMakerRole", label: "Decision-maker role*", placeholder: "Owner, GM, operations lead" }, { key: "readinessTimeline", label: "Access readiness timeline*", placeholder: "Ready now, 30 days, later" }, { key: "preferredTime", label: "Preferred fit-call time*", placeholder: "Weekday mornings ET" }].map((field) => <label key={field.key} className="block"><span className="mb-2 block text-sm font-bold text-[#334B60]">{field.label}</span><input required value={formData[field.key as keyof typeof initialForm] as string} onChange={(event) => updateField(field.key as keyof typeof initialForm, event.target.value)} placeholder={field.placeholder} className="w-full rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] px-4 py-3.5 text-[#071D3A] outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" /></label>)}
            <label className="block"><span className="mb-2 block text-sm font-bold text-[#334B60]">Considering another admin hire?*</span><select required value={formData.consideringHire} onChange={(event) => updateField("consideringHire", event.target.value)} className="w-full rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] px-4 py-3.5"><option value="">Select one</option><option>Yes</option><option>No</option><option>Not sure</option></select></label>
          </div>

          <label className="block"><span className="mb-2 block text-sm font-bold text-[#334B60]">Current CRM, accounting, and document stack*</span><textarea rows={3} required value={formData.softwareStack} onChange={(event) => updateField("softwareStack", event.target.value)} placeholder="Names only. Do not include credentials or private records." className="w-full rounded-2xl border border-[#DDEBE2] bg-[#FBFCF7] px-4 py-3.5 text-[#071D3A] outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" /></label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[#334B60]">Workflow to install first*</span>
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
              required
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
            {submitState === "submitting" ? "Sending..." : "Apply for a Founding Partner Installation"}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  )
}
