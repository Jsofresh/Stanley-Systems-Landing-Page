import { Mail, Phone, Clock, ArrowRight } from "lucide-react"

const contactCards = [
  {
    icon: Mail,
    title: "Reach out to us",
    description: "Send over what is slowing the business down, and we’ll tell you where we’d start.",
    value: "hello@stanley-systems.com",
    href: "mailto:hello@stanley-systems.com",
  },
  {
    icon: Phone,
    title: "Call us",
    description: "If you want to talk through the bottlenecks live, we can do that too.",
    value: "+1 (781) 913-7585",
    href: "tel:+17819137585",
  },
]

const faqsHours = [
  "Mon – Fri · 8:00am–5:00pm",
  "Sat · By appointment",
  "Sun · Closed",
]

export function ContactSection() {
  return (
    <section id="contact" className="relative px-4 py-12 sm:py-16 z-10">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="rounded-[2rem] border border-[#ece4d6] bg-[linear-gradient(180deg,#f9f6ef_0%,#ffffff_100%)] p-7 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            Get in touch with Stanley.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 max-w-xl">
            Whether you need clarity, a second set of eyes, or a workflow audit, we can help you figure out where the real operational drag is coming from.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {contactCards.map((card) => (
              <div key={card.title} className="rounded-[1.5rem] border border-[#e8dfd0] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4efe6] text-[#15803D]">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm sm:text-[15px] leading-6 text-slate-600">{card.description}</p>
                <a href={card.href} className="mt-4 inline-block text-sm sm:text-[15px] font-semibold text-slate-900 underline underline-offset-4">
                  {card.value}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[1.5rem] border border-[#e8dfd0] bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4efe6] text-[#15803D]">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">Business hours</h3>
              <div className="mt-4 space-y-3 text-sm sm:text-[15px] leading-6 text-slate-600">
                {faqsHours.map((row) => (
                  <div key={row} className="rounded-xl bg-[#f8f5ee] px-4 py-3">{row}</div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#e8dfd0] bg-[linear-gradient(180deg,#f5f9f1_0%,#ffffff_100%)] p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] flex flex-col justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.14em] text-[#15803D]">Best fit</div>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">You know something is leaking time or cash — you just want it fixed cleanly.</h3>
                <p className="mt-4 text-sm sm:text-[15px] leading-6 text-slate-600">
                  If your follow-up is slow, your billing lags, or your office keeps re-entering the same information, that is exactly the kind of workflow Stanley is built to clean up.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e8dfd0] bg-[#f5f1e8] p-6 sm:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div className="grid gap-5">
            {[
              { label: "Name*", placeholder: "Jane Smith" },
              { label: "Email*", placeholder: "jane@company.com" },
              { label: "Phone", placeholder: "+1 (555) 123-4567" },
              { label: "Company", placeholder: "Your business name" },
            ].map((field) => (
              <label key={field.label} className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">{field.label}</span>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full rounded-2xl border border-[#e2d8c7] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">What’s breaking down?*</span>
              <textarea
                rows={6}
                placeholder="Tell us where follow-up, billing, or admin is getting stuck."
                className="w-full rounded-2xl border border-[#e2d8c7] bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-[#15803D] focus:ring-4 focus:ring-[#15803D]/10"
              />
            </label>

            <button className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#166534] px-6 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#14532d]">
              Submit
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
