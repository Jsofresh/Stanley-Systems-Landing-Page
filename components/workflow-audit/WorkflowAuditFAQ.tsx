import { page } from "./tokens"

const faqs = [
  ["Is this a sales call?", "No. Stanley Systems reviews how work moves now, then gives you a clear map of where paperwork, billing, follow-up, handoffs, or job admin are getting stuck."],
  ["Do I have to give Stanley Systems my password?", "No. Do not send passwords. You can use screen share, exports, screenshots, or a temporary invited user."],
  ["What systems might Stanley Systems review?", "Accounting software, field software, CRM, dispatch system, shop system, invoice/payment tools, Google reviews, referral tracking, spreadsheets, and inboxes where follow-up happens."],
  ["What if I already have reminders turned on?", "That is fine. The AI Profit Map checks whether those reminders cover the full handoff from job completion to billing readiness, invoice follow-up, review requests, referrals, and what the owner needs to see."],
  ["What is the software and handoff review?", "Stanley Systems reviews available job, invoice, estimate, customer, call, follow-up, and handoff records, then summarizes the patterns that point to delayed billing, missed follow-up, repeated office work, or company playbook gaps."],
  ["Should I buy the AI Office Installation Sprint before the Map?", "If you have not bought the Map yet, start there. The Sprint should install workflows from your AI Profit Map, not a generic package."],
  ["How does the AI Profit Map credit work?", "$194 is credited toward your AI Office Installation Sprint when you move forward."],
  ["What happens if my business is not a fit?", "Stanley Systems will tell you. If there is not enough volume, software setup, or office handoff for a workflow to make sense, the AI Profit Map should not push you into one."],
  ["Does Stanley Systems guarantee more revenue?", "No. The AI Profit Map identifies stuck workflows and practical fixes. It does not guarantee customer payment, customer behavior, revenue, profit, or future sales."],
]

export function WorkflowAuditFAQ() {
  return (
    <section data-section="faq" data-nav-theme="light" className={page.sectionTight}>
      <div className={`${page.wrap} max-w-[980px]`}>
        <div className="text-center">
          <h2 className={`${page.h2} mt-3`}>Questions owners ask before buying the AI Profit Map</h2>
        </div>
        <div className="mt-7 grid gap-3">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group rounded-[1.2rem] border border-[#dfe8e1] bg-white p-5 shadow-[0_12px_34px_rgba(7,29,58,0.04)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-extrabold text-[#071D3A]">
                {question}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e8f6ec] text-[#116832] transition group-open:rotate-45">+</span>
              </summary>
              <p className={`${page.body} mt-3 text-base leading-7`}>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
