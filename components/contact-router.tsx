"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, CheckCircle2, HelpCircle, MailQuestion, ReceiptText } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url
const routes = [
  { id: "audit", title: "Get the AI Office Map", body: "Best if invoices, estimates, missed calls, reviews, referrals, past customers, or cash are getting stuck in the office.", cta: "Get the AI Office Map", icon: ReceiptText },
  { id: "question", title: "Want to talk before buying?", body: "Not sure if this fits? Ask us a question before you start.", cta: "Ask us a question", icon: MailQuestion },
  { id: "bought", title: "Already bought?", body: "Send the intake details Stanley Systems needs before reviewing the admin drag.", cta: "Continue assessment setup", icon: CheckCircle2 },
] as const

type RouteId = (typeof routes)[number]["id"]

export function ContactRouter() {
  const [selected, setSelected] = useState<RouteId>("audit")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const path = params.get("path") || params.get("route")
    if (path === "pre-buy" || path === "question") setSelected("question")
    if (path === "bought" || path === "intake") setSelected("bought")
    if (path === "audit" || path === "assessment") setSelected("audit")
  }, [])

  return (
    <section className="px-4 pb-16 pt-24 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#071D3A] sm:text-6xl">Find the right path to stop the office leaks.</h1>
          <p className="mt-5 text-lg leading-8 text-[#536173]">Get the AI Office Map, see how it works, ask us a question, or continue assessment setup.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="grid gap-4">
            {routes.map((route) => (
              <button key={route.id} type="button" onClick={() => setSelected(route.id)} className={`rounded-[1.5rem] border p-5 text-left shadow-[0_14px_34px_rgba(7,29,58,0.05)] transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15803D] ${selected === route.id ? "border-[#15803D] bg-[#F4FBF5] ring-2 ring-[#CFE8D5]" : "border-[#DDEBE2] bg-white hover:border-[#15803D] hover:bg-[#FBFEFA] hover:shadow-[0_20px_46px_rgba(21,128,61,0.10)]"}`}>
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
              Prefer email? Send your question to <a href="mailto:hello@stanley-systems.com" className="font-extrabold text-[#116832] underline underline-offset-4">hello@stanley-systems.com</a>. Calls may be answered by our assistant so we can route your question quickly.
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
      
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#071D3A] sm:text-4xl">Get the AI Office Map.</h2>
      <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">Stanley Systems finds what is slowing down cash, follow-up, reviews, referrals, and repeat work. The AI Office Map shows what should be fixed first. If the Sprint is the right next step, Stanley Systems builds the first full version of the system. Monthly Control is available after the build if you want Stanley Systems to keep it checked and adjusted.</p>
      <ul className="mt-5 space-y-3 text-sm font-semibold leading-6 text-[#536173]">
        {[
          "For service businesses with real job, billing, customer, call, estimate, review, referral, or follow-up activity.",
          "Your assessment fee becomes a $194 credit toward the Systems Installation Sprint.",
          "Checkout starts the assessment path. Intake gathers the work details before the review.",
        ].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />{item}</li>)}
      </ul>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <CTALink href={auditHref} kind="checkout" location="contact_audit_panel" analyticsEvent="audit_checkout_clicked" analyticsSource="contact_router" packageId="workflow_audit" packageName="AI Office Map" billingPeriod="one_time" ctaLabel="Get the AI Office Map" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_18px_36px_rgba(21,128,61,0.22)]">
          Get the AI Office Map <ArrowRight className="ml-2 h-4 w-4" />
        </CTALink>
        <Link href="/audit-started" className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]">What happens after buying</Link>
      </div>
      <p className="mt-4 text-sm font-bold leading-6 text-[#607080]">Need help deciding? Use “Want to talk before buying?” and ask us a question.</p>
    </div>
  )
}

function BoughtPanel() {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#071D3A] sm:text-4xl">Start your assessment intake.</h2>
      <p className="mt-4 text-base font-semibold leading-7 text-[#536173]">If you already bought the AI Office Map, use the intake route to send the work details Stanley Systems needs before reviewing how money and follow-up move now.</p>
      <Link href="/audit-intake" className="mt-7 inline-flex min-h-13 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_18px_36px_rgba(21,128,61,0.22)]">Go to assessment intake <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
        telegram_alert_type: "pre_buy_question",
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
      setMessage(result?.message || "Thanks. Stanley Systems received your question. If it belongs in the AI Office Map, we’ll point you there instead of guessing.")
      setForm({ name: "", business: "", email: "", phone: "", business_type: "", main_issue: "", message: "" })
    } catch (error) {
      setState("error")
      setMessage(error instanceof Error ? error.message : "Could not send question. Email hello@stanley-systems.com directly.")
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div>
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#071D3A] sm:text-4xl">Want to talk before buying?</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">Not sure if this fits? Ask us a question before you start. We’ll help you decide whether the AI Office Map is the right next step.</p><p className="mt-2 text-sm font-semibold leading-6 text-[#607080]">You may first speak with our phone assistant so Stanley Systems can route the question quickly.</p><p className="mt-2 text-sm font-semibold leading-6 text-[#607080]">Short questions are fine. If you need diagnosis, start the AI Office Map so Stanley Systems can check the real business process.</p>
      </div>
      {state === "success" ? <p className="rounded-2xl border border-[#CFE8D5] bg-[#F4FBF5] p-3 text-sm font-bold text-[#116832]">{message}</p> : null}
      {state === "error" ? <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-bold text-red-800">{message}</p> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name*" value={form.name} onChange={(value) => setForm({ ...form, name: value })} required />
        <Input label="Business name*" value={form.business} onChange={(value) => setForm({ ...form, business: value })} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Email*" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
        <Input label="Phone*" type="tel" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} required />
      </div>
      <Input label="What kind of service business is this?" value={form.business_type} onChange={(value) => setForm({ ...form, business_type: value })} />
      <label className="block"><span className="mb-2 block text-sm font-bold text-[#102033]">What is getting stuck?*</span><select required value={form.main_issue} onChange={(event) => setForm({ ...form, main_issue: event.target.value })} className="w-full rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-[#071D3A] outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"><option value="">Choose one</option><option>Invoices going out late</option><option>Getting paid</option><option>Estimate follow-up</option><option>Missed calls</option><option>Review/referral follow-up</option><option>Office handoffs</option><option>Not sure yet</option></select></label>
      <label className="block"><span className="mb-2 block text-sm font-bold text-[#102033]">Short message*</span><textarea required rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="w-full rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-[#071D3A] outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" placeholder="Ask what you need answered before starting." /></label>
      <button disabled={state === "submitting"} className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#116832] hover:shadow-[0_18px_36px_rgba(21,128,61,0.22)] disabled:opacity-70" type="submit">{state === "submitting" ? "Sending..." : "Ask us a question"} <HelpCircle className="ml-2 h-4 w-4" /></button>
      <a href="tel:+16179586372" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:border-[#15803D] hover:bg-[#F4FBF5]">Call before buying</a>
    </form>
  )
}

function Input({ label, value, onChange, required, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-[#102033]">{label}</span><input type={type} required={required} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl border border-[#DDEBE2] bg-white px-4 py-3 text-[#071D3A] outline-none focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10" /></label>
}
