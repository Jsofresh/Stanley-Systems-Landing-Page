import type {
  CompanyBrainBlock,
  SendCompanyBrainMessageInput,
  SendCompanyBrainMessageResponse,
} from "@/lib/company-brain/types"

const johnsonSources = [
  {
    id: "jobber-johnson-4241",
    label: "Johnson job 4241",
    detail: "Completed yesterday. Labor and parts are marked done.",
    system: "Jobber" as const,
  },
  {
    id: "qbo-johnson-estimate",
    label: "Estimate 1189",
    detail: "Approved estimate matches the completed job total.",
    system: "QBO" as const,
  },
  {
    id: "files-johnson-photos",
    label: "Closeout photos",
    detail: "Three closeout photos attached to the job folder.",
    system: "Files" as const,
  },
]

const madCustomerSources = [
  {
    id: "email-carter-thread",
    label: "Carter email thread",
    detail: "Customer asked twice for an arrival update.",
    system: "Email" as const,
  },
  {
    id: "jobber-carter-visit",
    label: "Carter service visit",
    detail: "Technician notes show a parts delay and no closeout call.",
    system: "Jobber" as const,
  },
]

const closeoutSources = [
  {
    id: "jobber-open-closeouts",
    label: "Open completed jobs",
    detail: "Completed jobs from the last seven business days.",
    system: "Jobber" as const,
  },
  {
    id: "files-closeout-folder",
    label: "Closeout photo folders",
    detail: "Folders checked for required final photos.",
    system: "Files" as const,
  },
]

const closeoutColumns = ["Job", "Customer", "Completed", "Technician", "Next step"]
const closeoutRows = [
  { Job: "4188", Customer: "Bennett", Completed: "Jun 12", Technician: "Sam", "Next step": "Request final photos" },
  { Job: "4194", Customer: "Nolan", Completed: "Jun 12", Technician: "Avery", "Next step": "Check shared folder" },
  { Job: "4201", Customer: "Wells", Completed: "Jun 13", Technician: "Sam", "Next step": "Add equipment photo" },
  { Job: "4210", Customer: "Davis", Completed: "Jun 14", Technician: "Mia", "Next step": "Upload condenser photo" },
  { Job: "4217", Customer: "Grant", Completed: "Jun 14", Technician: "Avery", "Next step": "Confirm final cleanup photo" },
]

function text(id: string, value: string): CompanyBrainBlock {
  return { type: "text", id, text: value }
}

function lower(value: string) {
  return value.trim().toLowerCase()
}

function buildMockBlocks(message: string): CompanyBrainBlock[] {
  const prompt = lower(message)

  if (prompt.includes("can we bill johnson") || prompt.includes("bill johnson")) {
    return [
      text(
        "johnson-answer",
        "Yes. Johnson looks ready to bill. The job is marked complete, the approved estimate matches the work, and closeout photos are attached. I would have the office review the final parts line, then send the invoice today.",
      ),
      { type: "sources", id: "johnson-sources", title: "Checked records", sources: johnsonSources },
      {
        type: "action",
        id: "johnson-action",
        action: {
          id: "prepare-johnson-billing",
          title: "Prepared billing packet",
          description: "Invoice notes, customer summary, and follow-up email are staged for review.",
          status: "prepared_not_sent",
          ctaLabel: "Review packet",
          preview:
            "Johnson job 4241 is complete. Please review the final parts line, then approve invoice sending with attached closeout photos.",
        },
      },
      {
        type: "artifact",
        id: "johnson-artifact",
        artifact: {
          id: "johnson-pdf",
          title: "Johnson billing summary",
          kind: "pdf",
          status: "ready",
          description: "One-page billing support packet for owner or office review.",
          preview:
            "Ready to bill: approved estimate, completed work notes, attached closeout photos, and suggested customer follow-up.",
          file: {
            fileName: "johnson-billing-summary.pdf",
            extension: "pdf",
            mimeType: "application/pdf",
            title: "Johnson billing summary",
            plainText:
              "Ready to bill: approved estimate 1189 matches the completed job. Labor and parts are marked done. Three closeout photos are attached. Office should review the final parts line, then send the invoice today.",
          },
        },
      },
    ]
  }

  if (prompt.includes("customer is mad") || prompt.includes("customer's mad") || prompt.includes("angry customer")) {
    return [
      text(
        "mad-customer-answer",
        "Here is the likely issue: the customer had to ask for an update twice, the visit was delayed by parts, and nobody appears to have made a closeout call. I prepared a calm reply that owns the delay without overpromising.",
      ),
      { type: "sources", id: "mad-customer-sources", title: "Issue trail", sources: madCustomerSources },
      {
        type: "action",
        id: "mad-customer-action",
        action: {
          id: "draft-carter-reply",
          title: "Drafted customer response",
          description: "Prepared, not sent. The message acknowledges the missed update and gives the next step.",
          status: "prepared_not_sent",
          ctaLabel: "Review response",
          preview:
            "Hi Maria, you are right to expect a clearer update from us. The part delay should have been communicated sooner. I am checking the latest status now and will send a clear next step today.",
        },
      },
      {
        type: "artifact",
        id: "mad-customer-doc",
        artifact: {
          id: "carter-response-docx",
          title: "Carter follow-up draft",
          kind: "document",
          status: "ready",
          description: "Downloadable DOCX draft for review before sending.",
          preview:
            "Hi Maria, you are right to expect a clearer update from us. The part delay should have been communicated sooner. I am checking the latest status now and will send a clear next step today.",
          file: {
            fileName: "carter-follow-up-draft.docx",
            extension: "docx",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            title: "Carter follow-up draft",
            plainText:
              "Hi Maria,\n\nYou are right to expect a clearer update from us. The part delay should have been communicated sooner. I am checking the latest status now and will send a clear next step today.\n\nPrepared for review only — not sent.",
          },
        },
      },
    ]
  }

  if (prompt.includes("spreadsheet") || prompt.includes("closeout photo")) {
    return [
      text(
        "spreadsheet-answer",
        "I found five completed jobs that appear to be missing closeout photos. I made a table preview and prepared the spreadsheet for review.",
      ),
      {
        type: "table",
        id: "missing-closeout-table",
        table: {
          id: "closeout-photo-table",
          title: "Jobs missing closeout photos",
          columns: closeoutColumns,
          rowCount: closeoutRows.length,
          rows: closeoutRows.slice(0, 3),
        },
      },
      { type: "sources", id: "closeout-sources", title: "Compared records", sources: closeoutSources },
      {
        type: "artifact",
        id: "spreadsheet-artifact",
        artifact: {
          id: "closeout-spreadsheet",
          title: "Missing closeout photos",
          kind: "spreadsheet",
          status: "ready",
          description: "Spreadsheet with job number, customer, completion date, technician, and recommended next step.",
          preview: "5 rows prepared. 3 shown in the preview.",
          file: {
            fileName: "jobs-missing-closeout-photos.xlsx",
            extension: "xlsx",
            mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            title: "Jobs missing closeout photos",
            table: { columns: closeoutColumns, rows: closeoutRows },
          },
        },
      },
    ]
  }

  if (prompt.includes("pdf summary") || prompt.includes("pdf")) {
    return [
      text(
        "pdf-answer",
        "I prepared an owner summary as a PDF. It focuses on billing readiness, customer issues, and the office follow-ups that need attention before the day ends.",
      ),
      {
        type: "artifact",
        id: "owner-pdf-artifact",
        artifact: {
          id: "owner-summary-pdf",
          title: "Owner end-of-day summary",
          kind: "pdf",
          status: "ready",
          description: "A concise PDF for owner review.",
          preview:
            "Today: 7 jobs ready to bill, 2 customer issues need a reply, 5 jobs need closeout photos, and 3 follow-ups should go out before 4 PM.",
          file: {
            fileName: "owner-end-of-day-summary.pdf",
            extension: "pdf",
            mimeType: "application/pdf",
            title: "Owner end-of-day summary",
            plainText:
              "Today: 7 jobs ready to bill, 2 customer issues need a reply, 5 jobs need closeout photos, and 3 follow-ups should go out before 4 PM. Prepared for owner review only.",
          },
        },
      },
    ]
  }

  if (prompt.includes("html report") || prompt.includes("html")) {
    return [
      text(
        "html-answer",
        "I turned the notes into an HTML report preview. It is ready to review before anyone sends or publishes it.",
      ),
      {
        type: "artifact",
        id: "html-artifact",
        artifact: {
          id: "owner-html-report",
          title: "Service operations report",
          kind: "html",
          status: "ready",
          description: "Simple HTML report with job status, blockers, and prepared follow-ups.",
          preview:
            "<section><h1>Service operations report</h1><p>Billing, closeout photos, and customer follow-ups are grouped by next action.</p></section>",
          file: {
            fileName: "service-operations-report.html",
            extension: "html",
            mimeType: "text/html;charset=utf-8",
            title: "Service operations report",
            html:
              "<!doctype html><html><head><meta charset=\"utf-8\"><title>Service operations report</title><style>body{font-family:Arial,sans-serif;margin:40px;color:#102033}h1{color:#15803d}.card{border:1px solid #ddd;border-radius:12px;padding:16px;margin:12px 0}</style></head><body><h1>Service operations report</h1><div class=\"card\"><strong>Billing</strong><p>7 jobs ready to bill after final review.</p></div><div class=\"card\"><strong>Closeout photos</strong><p>5 jobs need missing photos attached.</p></div><div class=\"card\"><strong>Follow-ups</strong><p>3 customer follow-ups should go out before 4 PM.</p></div></body></html>",
          },
        },
      },
    ]
  }

  if (prompt.includes("docx") || prompt.includes("document") || prompt.includes("dox")) {
    return [
      text(
        "docx-answer",
        "I prepared a downloadable DOCX draft. It stays in the chat for review; nothing is sent or written back.",
      ),
      {
        type: "artifact",
        id: "document-artifact",
        artifact: {
          id: "prepared-office-draft-docx",
          title: "Prepared office draft",
          kind: "document",
          status: "ready",
          description: "DOCX draft generated from the mock company notes.",
          preview:
            "Prepared office draft: summarize the job history, confirm the next step, and keep the message ready for review before sending.",
          file: {
            fileName: "prepared-office-draft.docx",
            extension: "docx",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            title: "Prepared office draft",
            plainText:
              "Prepared office draft\n\nSummarize the job history. Confirm the next step. Keep this ready for review before sending.\n\nMock portal note: this file downloads locally; no real customer message is sent.",
          },
        },
      },
    ]
  }

  if (prompt.includes("error")) {
    return [
      {
        type: "error",
        id: "mock-error",
        title: "Mock response unavailable",
        message: "The local mock could not match that request. Try one of the service-business examples.",
      },
    ]
  }

  if (prompt.includes("clarify") || prompt.length < 8) {
    return [
      {
        type: "clarification",
        id: "mock-clarification",
        question: "Which company record should I use for this answer?",
        options: ["Recent completed jobs", "Open invoices", "Customer message history"],
      },
    ]
  }

  return [
    text(
      "default-answer",
      "Here is the short version: billing and customer follow-up are the two places I would check first. I can review whether a job is ready to bill, draft a customer follow-up, or prepare a PDF or spreadsheet from the job notes.",
    ),
    {
      type: "sources",
      id: "default-sources",
      title: "Example sources",
      sources: [
        {
          id: "notes-today",
          label: "Today notes",
          detail: "Mock company notes for the current day.",
          system: "Notes",
        },
        {
          id: "crm-open-items",
          label: "Open customer items",
          detail: "Mock customer records with unresolved follow-ups.",
          system: "CRM",
        },
      ],
    },
  ]
}

export async function sendCompanyBrainMessage(
  input: SendCompanyBrainMessageInput,
): Promise<SendCompanyBrainMessageResponse> {
  await new Promise((resolve) => setTimeout(resolve, 550))

  return {
    conversationId: input.conversationId,
    message: {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      createdAt: new Date().toISOString(),
      blocks: buildMockBlocks(input.message),
    },
  }
}
