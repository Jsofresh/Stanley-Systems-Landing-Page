import { page } from "./tokens"

const faqs = [
  ["Is this a sales call?", "No. The Cash Flow Assessment is a paid diagnostic. Stanley Systems reviews your current process and data, then gives you a clear map of where money, time, or follow-up is leaking."],
  ["Do I have to give Stanley Systems my password?", "No. Do not send passwords. You can use screen share, exports, screenshots, or a temporary invited user."],
  ["What systems might Stanley Systems review?", "Accounting software, field software, CRM, dispatch system, shop system, invoice/payment tools, Google reviews, referral tracking, spreadsheets, and inboxes where follow-up happens."],
  ["What if I already have reminders turned on?", "That is fine. The assessment checks whether those reminders cover the full handoff from job completion to billing readiness, invoice follow-up, review requests, referrals, and owner visibility."],
  ["What is the Transaction Pattern Review?", "Stanley Systems reviews available job, invoice, estimate, payment, customer, review, and referral data, then summarizes the patterns that point to delayed cash, missed follow-up, repeated office work, or unused customer value."],
  ["Can I buy Cashflow Control System or Repeat Revenue System without the assessment?", "Yes. The assessment is optional. It is a credited first step for buyers who want the workflow inspected before building."],
  ["How does the assessment credit work?", "If you buy Cashflow Control System or Repeat Revenue System after the assessment, your $97 assessment fee credits toward the system. If you buy yearly, you get a $194 credit."],
  ["What happens if my business is not a fit?", "Stanley Systems will tell you. If there is not enough volume, software structure, or office workflow for a system to make sense, the assessment should not push you into one."],
  ["Does Stanley Systems guarantee more revenue?", "No. The assessment identifies leaks and practical fixes. It does not guarantee customer payment, customer behavior, revenue, profit, or future sales."],
]

export function WorkflowAuditFAQ() {
  return (
    <section data-section="faq" data-nav-theme="light" className={page.sectionTight}>
      <div className={`${page.wrap} max-w-[980px]`}>
        <div className="text-center">
          <h2 className={`${page.h2} mt-3`}>Questions owners ask before buying the assessment</h2>
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
