"use client"

import { useState } from "react"
import { Mail, Phone, Clock, ArrowRight, CheckCircle2, CalendarCheck } from "lucide-react"

const contactCards = [
  {
    icon: Mail,
    title: "Email us",
    description: "Send over what is slowing the business down, and Stanley Systems will tell you where to start.",
    value: "hello@stanley-systems.com",
    href: "mailto:hello@stanley-systems.com",
  },
  {
    icon: Phone,
    title: "Talk to the front desk",
    description: "Call the front desk line to talk through what is slowing the business down and get pointed in the right direction.",
    compact: true,
    value: "+1 (617) 958-6372",
    href: "tel:+16179586372",
  },
]

const faqsHours = ["Calls can be scheduled 24/7", "Meetings available around your workday", "Phone or Zoom, whichever is easier"]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    problem: "",
  })
  const [showSubmitted, setShowSubmitted] = useState(false)

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const subject = `New Stanley Systems inquiry from ${formData.name || "Website visitor"}`
    const body = [
      `Name: ${formData.name || "Not provided"}`,
      `Email: ${formData.email || "Not provided"}`,
      `Phone: ${formData.phone || "Not provided"}`,
      `Company: ${formData.company || "Not provided"}`,
      `Location: ${formData.location || "Not provided"}`,
      "",
      "What's breaking down?",
      formData.problem || "Not provided",
    ].join("\n")

    window.location.href = `mailto:hello@stanley-systems.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setShowSubmitted(true)
    window.setTimeout(() => setShowSubmitted(false), 2600)
  }

  return (
    <section id="contact" className="relative z-10 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="rounded-[2rem] border border-[#ece4d6] bg-[linear-gradient(180deg,#f9f6ef_0%,#ffffff_100%)] p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Get in touch with Stanley Systems.
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Whether you need clarity, a second set of eyes, or a workflow audit, Stanley Systems can help figure out where the real operational drag is coming from.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contactCards.map((card) => (
              <div
                key={card.title}
                className="flex rounded-[1.5rem] border border-[#e8dfd0] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] lg:min-h-[15.5rem]"
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

          <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:items-stretch">
            <div className="rounded-[1.5rem] border border-[#e8dfd0] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] lg:min-h-[15.5rem]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-slate-900">Scheduling</h3>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4efe6] text-[#15803D]">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 space-y-2.5 text-[13px] leading-5 text-slate-600 sm:text-[14px]">
                {faqsHours.map((row) => (
                  <div key={row} className="rounded-xl bg-[#f8f5ee] px-4 py-2.5">
                    {row}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#e8dfd0] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] lg:min-h-[15.5rem]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-slate-900">What happens next</h3>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4efe6] text-[#15803D]">
                  <CalendarCheck className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-5 text-slate-600 sm:text-[14px]">
                Stanley Systems reviews the issue, spots the bottlenecks, and replies with the clearest next step.
              </p>
              <div className="mt-4 space-y-2.5 text-[13px] leading-5 text-slate-600 sm:text-[14px]">
                <div className="rounded-xl bg-[#f8f5ee] px-4 py-2.5">Fast first reply with real direction</div>
                <div className="rounded-xl bg-[#f8f5ee] px-4 py-2.5">Clear answer on next steps</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e8dfd0] bg-[#f5f1e8] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
          {showSubmitted ? (
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#cfe6d5] bg-[#eef9f1] px-4 py-3 text-sm font-medium text-[#166534]">
              <CheckCircle2 className="h-5 w-5" />
              Submitted
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="grid gap-5">
            {[
              { key: "name", label: "Name*", placeholder: "Jane Smith" },
              { key: "email", label: "Email*", placeholder: "jane@company.com" },
              { key: "phone", label: "Phone", placeholder: "+1 (555) 123-4567" },
              { key: "company", label: "Company", placeholder: "Your business name" },
              { key: "location", label: "Location", placeholder: "City, State" },
            ].map((field) => (
              <label key={field.key} className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">{field.label}</span>
                <input
                  type="text"
                  required={field.key === "name" || field.key === "email"}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(event) => updateField(field.key as keyof typeof formData, event.target.value)}
                  placeholder={field.placeholder}
                  className="w-full rounded-2xl border border-[#e2d8c7] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">What’s breaking down?*</span>
              <textarea
                rows={6}
                required
                value={formData.problem}
                onChange={(event) => updateField("problem", event.target.value)}
                placeholder="Tell Stanley Systems where follow-up, billing, or admin is getting stuck."
                className="w-full rounded-2xl border border-[#e2d8c7] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
              />
            </label>

            <button className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#166534] px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#14532d]">
              Submit
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-[#dfe8d9] bg-[linear-gradient(180deg,#f5f9f1_0%,#ffffff_100%)] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:p-7">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Best fit</div>
            <h3 className="mt-4 text-[1.8rem] font-semibold leading-[1.18] text-slate-900 lg:text-[1.72rem]">
              You know something is leaking time or cash — you just want it fixed cleanly.
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
              If follow-up is slow, billing lags, or the office keeps re-entering the same information, Stanley Systems is built for exactly that kind of operational cleanup. The goal is not to force new complexity into the business. The goal is to remove drag, tighten the handoff, and make the workflow easier for the owner and team to trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
