"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, CheckCircle2, HelpCircle, MailQuestion, ReceiptText } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
const routes = [
  { id: "audit", title: "Start the Workflow Audit", body: "Best if cash, follow-up, invoices, estimates, reviews, referrals, or office handoffs are getting stuck.", cta: "Start the Workflow Audit", icon: ReceiptText },
  { id: "question", title: "Ask before buying", body: "Not sure whether the audit fits your business? Send a short note first.", cta: "Ask a quick question", icon: MailQuestion },
  { id: "bought", title: "Already bought?", body: "Book your walkthrough or finish your audit intake.", cta: "Continue audit setup", icon: CheckCircle2 },
] as const

type RouteId = (typeof routes)[number]["id"]

export function ContactRouter() {
  const [selected, setSelected] = useState<RouteId>("audit")
  return (
    <section className="px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Contact Stanley Systems</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#071D3A] sm:text-6xl">Get the right next step.</h1>
          <p className="mt-5 text-lg leading-8 text-[#536173]">Choose whether you are ready to start the paid Workflow Audit, need one answer before buying, or already bought and need intake.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="grid gap-4">
            {routes.map((route) => (
              <button key={route.id} type="button" onClick={() => setSelected(route.id)} className={`rounded-[1.5rem] border p-5 text-left shadow-[0_14px_34px_rgba(7,29,58,0.05)] transition ${selected === route.id ? "border-[#BFE4C8] bg-[#F4FBF5]" : "border-[#DDEBE2] bg-white hover:border-[#CFE8D5]"}`}>
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[#15803D] ring-1 ring-[#CFE8D5]"><route.icon className="h-5 w-5" /></span>
                  <div>
                    <h2 className="text-xl font-extrabold tracking-[-0.02em] text-[#071D3A]">{route.title}</h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#536173]">{route.body}</p>
                    <p className="mt-3 text-sm font-extrabold text-[#116832]">{route.cta} →</p>
                  </div>
                </div>
              </button>
            ))}
            <div className="rounded-[1.5rem] border border-[#DDEBE2] bg-white p-5 text-sm font-semibold leading-6 text-[#536173]">
              Direct email is still available: <a href="mailto:hello@stanley-systems.com" className="font-extrabold text-[#116832] underline underline-offset-4">hello@stanley-systems.com</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_20px_60px_rgba(7,29,58,0.08)] sm:p-8">
            {selected === "audit" ? <AuditPanel /> : null}
            {selected === "question" ? <PreBuyQuestionForm /> : null}
            {selected === "bought" ? <BoughtPanel /> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function AuditPanel() {
  return (
    <div>
      
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#071D3A] sm:text-4xl">Find the first revenue leak before buying a system.</h2>
      <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">The Workflow Audit is the paid diagnostic first step. Stanley Systems reviews your workflow, looks for the first meaningful leak, and credits the fee toward Cashflow Control or Repeat Revenue if you buy a system after the audit.</p>
      <ul className="mt-5 space-y-3 text-sm font-semibold leading-6 text-[#536173]">
        {[
          "For service businesses with real job, billing, customer, call, estimate, or follow-up activity.",
          "Audit fee credits toward Cashflow Control or Repeat Revenue; yearly buyers get a $194 credit.",
          "No fake scheduler link: checkout starts the audit path, then intake gathers workflow context.",
        ].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />{item}</li>)}
      </ul>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <CTALink href={auditHref} kind="checkout" location="contact_audit_panel" analyticsEvent="audit_checkout_clicked" analyticsSource="contact_router" packageId="workflow_audit" packageName="Workflow Audit" billingPeriod="one_time" ctaLabel="Start the Workflow Audit" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#116832]">
          Start the Workflow Audit <ArrowRight className="ml-2 h-4 w-4" />
        </CTALink>
        <Link href="/audit-started" className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] hover:bg-[#F4FBF5]">What happens after buying</Link>
      </div>
    </div>
  )
}

function BoughtPanel() {
  return (
    <div>
      <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Already bought?</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#071D3A] sm:text-4xl">Start your audit intake.</h2>
      <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">If you already bought the Workflow Audit, use the intake route to send the workflow context Stanley Systems needs before reviewing the revenue path.</p>
      <Link href="/audit-intake" className="mt-7 inline-flex min-h-13 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#116832]">Go to audit intake <ArrowRight className="ml-2 h-4 w-4" /></Link>
    </div>
  )
}

function PreBuyQuestionForm() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    business_type: "",
    main_issue: "",
    message: "",
  })
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState("submitting")
    setMessage("")
    try {
      const params = new URLSearchParams(window.location.search)
      const payload = {
        ...form,
        company: form.business,
        problem: form.message,
        businessType: form.business_type,
        bottleneck: form.main_issue,
        currentProcess: form.message,
        status: "pre_buy_question",
        form_type: "pre_buy_question",
        page_source: "contact_pre_buy_question",
        source: "contact-pre-buy-question",
        current_path: window.location.pathname,
        page: window.location.pathname,
        referrer: document.referrer || "",
        submitted_at: new Date().toISOString(),
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_content: params.get("utm_content") || "",
        utm_term: params.get("utm_term") || "",
      }
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) throw new Error(result?.error || "Could not send question.")
      setState("success")
      setMessage(result?.message || "Thanks. Stanley Systems received your question.")
      setForm({ name: "", business: "", email: "", phone: "", business_type: "", main_issue: "", message: "" })
    } catch (error) {
      setState("error")
      setMessage(error instanceof Error ? error.message : "Could not send question. Email hello@stanley-systems.com directly.")
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#15803D]">Ask before buying</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#071D3A] sm:text-4xl">Ask before buying the audit.</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">Short questions only. If you need workflow diagnosis, start the Workflow Audit.</p>
      </div>
      {state === "success" ? <p className="rounded-2xl border border-[#CFE8D5] bg-[#F4FBF5] p-3 text-sm font-bold text-[#116832]">{message}</p> : null}
      {state === "error" ? <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-800">{message}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name*" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
        <Input label="Business name*" value={form.business} onChange={(value) => setForm({ ...form, business: value })} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Email*" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
        <Input label="Phone" type="tel" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
      </div>
      <Input label="What kind of service business is this?" value={form.business_type} onChange={(value) => setForm({ ...form, business_type: value })} />
      <label className="block"><span className="mb-2 block text-sm font-bold text-[#102033]">What is getting stuck?*</span><select required value={form.main_issue} onChange={(event) => setForm({ ...form, main_issue: event.target.value })} className="w-full rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-[#071D3A] outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"><option value="">Choose one</option><option>Invoices going out late</option><option>Getting paid</option><option>Estimate follow-up</option><option>Missed calls</option><option>Review/referral follow-up</option><option>Office handoffs</option><option>Not sure yet</option></select></label>
      <label className="block"><span className="mb-2 block text-sm font-bold text-[#102033]">Short message*</span><textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="w-full rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-[#071D3A] outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" placeholder="Ask the one thing you need answered before buying." /></label>
      <button disabled={state === "submitting"} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#116832] disabled:opacity-70" type="submit">{state === "submitting" ? "Sending..." : "Ask Stanley Systems"} <HelpCircle className="ml-2 h-4 w-4" /></button>
    </form>
  )
}

function Input({ label, value, onChange, required, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-[#102033]">{label}</span><input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-[#071D3A] outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" /></label>
}
