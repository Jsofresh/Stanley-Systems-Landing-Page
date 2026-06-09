# Calculator Office Process Cost Update Implementation Plan

> **For Hermes / Codex:** This is a build plan only. Do not deploy, restart PM2, edit n8n directly, touch secrets, or change protected systems unless Jaden explicitly authorizes implementation/deploy in the current session.

**Goal:** Keep the existing Revenue Leak Calculator structure, but add a stronger normal-office-process-cost layer with “moving information between software” moved to the front, while preserving current opportunity-cost math for past-customer follow-up, reactivation, missed calls, reviews, and referrals.

**Current target repo:** `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page`

**Primary files in scope:**
- `app/invoicing-delay-cash-flow-calculator/calculator-client.tsx`
- `app/invoicing-delay-cash-flow-calculator/page.tsx`
- `app/api/calculator-started/route.ts`
- `app/api/calculator-completed/route.ts`

**Optional copy touchpoints after calculator implementation passes:**
- `components/calculator-path-section.tsx`
- `components/best-fit-section.tsx`
- `components/industry-page.tsx`

**Protected/out-of-scope unless separately approved:**
- n8n workflow mutation
- `.env*`, webhook URLs, credentials, tokens, secrets
- PM2 restart / live deployment
- OpenClaw runtime files
- QBO, HCP, Gmail, Twilio, Telegram bot config

---

## Direction from Jaden

1. Keep the calculator similar to what exists now.
2. Add more questions about what normal office processes are costing the business.
3. Put **moving information between software** / manually transferring job/customer/payment info between systems near the front of the calculator.
4. Preserve the opportunity-cost side that already exists for:
   - past-customer follow-up
   - customer reactivation campaign estimated returns
   - reviews/referrals
   - missed calls
   - repeat revenue
5. Do **not** push the calculator into a totally new “hidden office-work burn” format.
6. Do **not** use “owner as backup system” language. It does not fit the target business well enough.
7. The wedge sentence belongs on the calculator front page.
8. The n8n / notification payload needs to receive the new relevant calculator fields so calculator-started/completed alerts contain useful information.

---

## Recommended wedge sentence

Use this on the calculator intro/front page:

> See what normal office processes are costing your business — moving information between software, chasing missing details, billing delays, and follow-up that never gets done.

Shorter alternate if the intro feels crowded:

> See what normal office processes are costing your business before the next job, invoice, or follow-up slips.

Do **not** use:
- “owner as backup system”
- “hidden office-work burn” as the primary public label
- “AI ROI calculator”
- “workflow optimization”
- “digital transformation”

---

## Proposed calculator flow

Current flow:

```text
intro
invoice
jobs
delay
hours
unbilled
corrections
customerSource
customers
followup
reviews
missedCalls
claimReport
results
resultDiagnosis
resultMath
```

New recommended flow:

```text
intro
softwareTransfer
invoice
jobs
delay
officeProcessTime
missingDetails
unbilled
corrections
customerSource
customers
followup
reviews
missedCalls
claimReport
results
resultDiagnosis
resultMath
```

Why this order:
- The wedge hits immediately after the intro: “how much time does moving information between software cost?”
- Then the existing cash-flow/invoicing math continues.
- Then the existing repeat revenue/customer reactivation math continues untouched.

---

## New / revised fields

Add these state fields in `calculator-client.tsx`:

```ts
type SoftwareTransferFrequency = "none" | "light" | "moderate" | "heavy" | "unsure"
type MissingDetailsFrequency = "rare" | "weekly" | "daily" | "mostJobs" | "unsure"

const [softwareTransferFrequency, setSoftwareTransferFrequency] = useState<SoftwareTransferFrequency>("moderate")
const [softwareTransferHoursPerWeek, setSoftwareTransferHoursPerWeek] = useState("5")
const [officeProcessHoursPerWeek, setOfficeProcessHoursPerWeek] = useState("8")
const [missingDetailsFrequency, setMissingDetailsFrequency] = useState<MissingDetailsFrequency>("weekly")
```

Keep `hoursLost` if it is still used for per-invoice cleanup, but relabel it so it does not carry the entire office-process wedge alone.

---

## New calculator questions/copy

### Intro update

Current intro title:

> Find the money left on the table in your business.

Keep similar, but add the wedge clearly:

**Title:**

> Find the money left on the table in your business.

**Wedge card text:**

> See what normal office processes are costing your business — moving information between software, chasing missing details, billing delays, and follow-up that never gets done.

Keep:

> Takes 2 minutes. Rough numbers only. No passwords or sensitive financials.

Potential CTA:

> Calculate my office money leak

or keep current:

> Calculate my revenue leak

Recommendation: keep `Calculate my revenue leak` if the current page already performs well; it is clearer than changing the whole calculator identity.

### New step: `softwareTransfer`

**Title:**

> How much time does your team spend moving information between software?

**Body:**

> Think job software, QuickBooks, email, texts, spreadsheets, payment tools, and customer records. The cost is not the software. The cost is the manual transfer between them.

**UI:** two-part step if possible:
- Choice grid for frequency/intensity
- Big number input for hours per week

**Options:**

```ts
const softwareTransferSettings = {
  none: {
    multiplier: 0,
    label: "Almost none",
    helper: "Most systems already stay updated without manual copying.",
  },
  light: {
    multiplier: 0.75,
    label: "A little each week",
    helper: "Some copying between tools, but it does not dominate office time.",
  },
  moderate: {
    multiplier: 1,
    label: "Several hours per week",
    helper: "The office regularly moves job, customer, billing, or payment info between systems.",
  },
  heavy: {
    multiplier: 1.25,
    label: "Every day",
    helper: "Manual transfer between tools is part of normal office work.",
  },
  unsure: {
    multiplier: 0.9,
    label: "Not sure",
    helper: "If nobody knows, count a conservative amount of transfer time.",
  },
} as const
```

**Number input label:**

> Hours per week moving information between software

Default: `5`

### Revised step: `hours` -> `officeProcessTime`

Replace the current one-invoice cleanup framing with a broader office process framing.

**Title:**

> How much time goes into regular office process work each week?

**Body:**

> Scheduling updates, customer updates, invoice prep, estimate follow-up, payment follow-up, job closeout, and checking records all count here.

**Number input:**

> Hours per week

Default: `8`

Implementation note: if using this new weekly field, do not also over-count it through `hoursLost * jobs`. Either:
- keep `hoursLost` as invoice-specific cleanup, or
- replace it with `officeProcessHoursPerWeek` for broader office process time.

Recommendation: keep both but make them clearly separate:
- `softwareTransferHoursPerWeek`: transfer between tools
- `hoursLost`: invoice/job cleanup per finished job
- `officeProcessHoursPerWeek`: general recurring office process time

Then apply conservative weights to avoid inflated results.

### New step: `missingDetails`

**Title:**

> How often does office work wait on missing job or customer details?

**Body:**

> Count missing photos, notes, approvals, job status, customer info, payment details, material notes, or anything the office has to track down before work can move.

**Options:**

```ts
const missingDetailsSettings = {
  rare: { rate: 0.03, label: "Rarely", helper: "Most records are ready when the office needs them." },
  weekly: { rate: 0.08, label: "A few times a week", helper: "Enough to slow billing, updates, or follow-up." },
  daily: { rate: 0.14, label: "Daily", helper: "Missing details are a normal part of office cleanup." },
  mostJobs: { rate: 0.22, label: "Most jobs", helper: "The office often has to rebuild the job story before it can move." },
  unsure: { rate: 0.1, label: "Not sure", helper: "Use a conservative estimate until the records are checked." },
} as const
```

---

## Calculation model changes

Current cash-flow calculation:

```ts
monthlyBilledValue = invoice * jobs
delayedCashDrag = monthlyBilledValue * (days / 30)
monthlyLaborHours = jobs * hours
officeTimeCost = monthlyLaborHours * 35
stuckUnbilledValue = invoice * unbilled
correctionLoss = monthlyBilledValue * correction * 0.03
cashflowImpact = delayedCashDrag + officeTimeCost + stuckUnbilledValue + correctionLoss
```

Recommended revised model:

```ts
const OFFICE_HOURLY_COST = 35
const transferSetting = softwareTransferSettings[softwareTransferFrequency]
const missingDetailsSetting = missingDetailsSettings[missingDetailsFrequency]

const monthlyBilledValue = invoice * jobs
const delayedCashDrag = monthlyBilledValue * (days / 30)

// New front-of-calculator wedge: information transfer between systems.
const softwareTransferMonthlyHours = Number(softwareTransferHoursPerWeek) * 4.33 * transferSetting.multiplier
const softwareTransferCost = softwareTransferMonthlyHours * OFFICE_HOURLY_COST

// Existing invoice/job cleanup cost, still useful.
const monthlyLaborHours = jobs * hours
const invoiceCleanupCost = monthlyLaborHours * OFFICE_HOURLY_COST

// New ordinary office-process time cost.
const officeProcessMonthlyHours = Number(officeProcessHoursPerWeek) * 4.33
const officeProcessCost = officeProcessMonthlyHours * OFFICE_HOURLY_COST * 0.65

// New missing details/rework cost, tied to revenue volume but conservative.
const missingDetailsCost = monthlyBilledValue * missingDetailsSetting.rate * 0.025

const stuckUnbilledValue = invoice * unbilled
const correctionLoss = monthlyBilledValue * correction * 0.03

const officeProcessCostTotal = softwareTransferCost + invoiceCleanupCost + officeProcessCost + missingDetailsCost + correctionLoss
const cashflowImpact = delayedCashDrag + officeProcessCostTotal + stuckUnbilledValue
```

Why the `0.65` factor on general office process time:
- Some office process time is necessary, not all waste.
- The calculator should estimate the cost exposure, not imply every office hour can disappear.
- Conservative math is more credible.

Preserve current customer opportunity/repeat revenue math:

```ts
estimatedUnderworkedCustomers
followupCases
conservativeFollowupOpportunity
estimatedFollowupOpportunity
boldFollowupOpportunity
missedCallLoss
customerRevenueImpact
customerRevenueLow
customerRevenueHigh
totalImpact
totalLow
totalHigh
```

Do not remove this. Jaden explicitly wants this opportunity-cost/re-activation estimate preserved.

---

## Result display updates

Keep the current 3-screen result sequence:

1. yearly leak summary
2. diagnosis
3. math

But update the category language.

### Current diagnosis cards

Current cards:
- Cash earned, still stuck
- Past customers, still untouched

Recommended cards:
- **Office process cost**
- **Past customers and follow-up opportunity**

Alternative if keeping cash-flow language:
- **Cash and office time, still stuck**
- **Past customers, still untouched**

Recommendation: use three drivers in the diagnosis if layout permits:

1. **Moving information between systems**
2. **Billing, cleanup, and missing details**
3. **Past customers and missed follow-up**

If avoiding layout expansion, use two cards:

1. **Office process and cash drag**
2. **Past customers and follow-up opportunity**

### Result breakdown labels

Add `softwareTransferCost` and `missingDetailsCost` to `ResultSummaryInput`, `ResultDriver[]`, `equationComponents`, and `results` payload.

Recommended equation component labels:
- Moving information between software
- Regular office process time
- Invoice/job cleanup time
- Missing details and rework
- Delayed billing drag
- Completed jobs still unbilled
- Past customer follow-up opportunity
- Missed call opportunity

---

## n8n / notification payload updates

Jaden said “make sure the NAN updates so the new relevant information gets sent out.” Treat this as n8n/notification payload scope first from the website API routes; do **not** mutate n8n workflow internals unless separately approved.

### Client payload additions

In both started and completed payloads, add these under `inputs`:

```ts
software_transfer_frequency: softwareTransferFrequency,
software_transfer_hours_per_week: Number(softwareTransferHoursPerWeek) || 0,
office_process_hours_per_week: Number(officeProcessHoursPerWeek) || 0,
missing_details_frequency: missingDetailsFrequency,
```

In completed payload `results`, add:

```ts
software_transfer_monthly_cost: result.softwareTransferCost,
office_process_monthly_cost: result.officeProcessCost,
invoice_cleanup_monthly_cost: result.invoiceCleanupCost,
missing_details_monthly_cost: result.missingDetailsCost,
office_process_cost_total: result.officeProcessCostTotal,
biggest_office_process_driver: resultSummary.selectedOfficeProcessDriver?.label ?? "",
```

### `/api/calculator-started/route.ts`

Sanitize and pass through:

```ts
software_transfer_frequency: cleanString(inputs.software_transfer_frequency),
software_transfer_hours_per_week: cleanNumber(inputs.software_transfer_hours_per_week),
office_process_hours_per_week: cleanNumber(inputs.office_process_hours_per_week),
missing_details_frequency: cleanString(inputs.missing_details_frequency),
```

Update `telegram_message` to include the new front-of-calculator signal:

```ts
`Software transfer: ${cleanString(inputs.software_transfer_frequency) || "Not captured"}`,
`Transfer hrs/wk: ${cleanNumber(inputs.software_transfer_hours_per_week).toLocaleString()}`,
`Office process hrs/wk: ${cleanNumber(inputs.office_process_hours_per_week).toLocaleString()}`,
```

### `/api/calculator-completed/route.ts`

Sanitize and pass through the same input fields plus the new result fields.

Update `telegram_message` to include:

```ts
`Office process cost: ${money(results.office_process_cost_total)}/mo`,
`Moving info between software: ${money(results.software_transfer_monthly_cost)}/mo`,
`Missing details/rework: ${money(results.missing_details_monthly_cost)}/mo`,
```

Keep the existing lines for:
- monthly leak
- annual leak
- cash drag
- customer drag
- saved customers
- missed calls
- first move

Do not print webhook URLs, chat IDs, tokens, or secrets.

### n8n workflow handling

After website API changes are built locally, verify by sending controlled non-PII synthetic POSTs to:

- `/api/calculator-started`
- `/api/calculator-completed`

If the website route returns `ok: true`, the website side is working.

If Telegram/n8n formatting does not show new fields, then n8n’s Telegram formatter may be ignoring `telegram_message` or has its own hardcoded template. At that point:

1. Inspect n8n read-only first.
2. Identify the workflow/node consuming calculator alerts.
3. Only mutate n8n after explicit Jaden approval.
4. If mutation is approved, back up the workflow and DB first per `n8n-workflow-debugging` skill.

---

## Implementation tasks

### Task 1: Clean-tree gate and source discovery

Run before editing:

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
git status --porcelain | head -50
```

If output is non-empty, stop and report the dirty files exactly per repo instructions.

Then inspect:

```bash
sed -n '1,220p' app/invoicing-delay-cash-flow-calculator/calculator-client.tsx
sed -n '600,1445p' app/invoicing-delay-cash-flow-calculator/calculator-client.tsx
sed -n '1,220p' app/api/calculator-started/route.ts
sed -n '1,260p' app/api/calculator-completed/route.ts
```

### Task 2: Add types/settings/state for office-process inputs

Modify `calculator-client.tsx`:

1. Add `softwareTransfer` and `missingDetails` to `StepKey`.
2. Insert `softwareTransfer` immediately after `intro` in `STEP_ORDER`.
3. Insert `missingDetails` after the revised office process step and before `unbilled` or `corrections`.
4. Add the new type aliases and settings maps near the existing settings maps.
5. Add the new `useState` fields near the existing calculator input states.

Verification:

```bash
npm run build
```

Expected: build fails only if implementation has type/syntax errors. Fix before continuing.

### Task 3: Update calculator intro and question screens

Modify `calculator-client.tsx`:

1. Keep the intro title close to current.
2. Add the wedge sentence in the front-page green card.
3. Add `softwareTransfer` UI screen immediately after intro.
4. Revise `hours` copy to ordinary office process language or introduce `officeProcessTime` if renaming the step.
5. Add `missingDetails` screen.
6. Preserve existing `customerSource`, `customers`, `followup`, `reviews`, and `missedCalls` screens.

Hard copy rules:
- No “owner as backup system.”
- No standalone “Stanley” for the company.
- Do not over-name the calculator as “hidden office-work burn.”
- Keep past-customer/reactivation opportunity copy.

Verification:

```bash
grep -RIn "owner.*backup\|backup system\|hidden office-work burn\|AI ROI" app/invoicing-delay-cash-flow-calculator components | head -50
```

Expected for calculator scope: no new calculator copy using these phrases.

### Task 4: Update calculation logic conservatively

Modify `result = useMemo(...)` in `calculator-client.tsx`:

1. Parse the new state fields.
2. Calculate:
   - `softwareTransferMonthlyHours`
   - `softwareTransferCost`
   - `invoiceCleanupCost`
   - `officeProcessCost`
   - `missingDetailsCost`
   - `officeProcessCostTotal`
3. Preserve existing billing delay, unbilled jobs, correction, customer follow-up, repeat revenue, and missed call calculations.
4. Return new result fields.
5. Update the dependency array.

Verification:

```bash
npm run build
```

Expected: pass.

### Task 5: Update result summary and math display

Modify `ResultSummaryInput` and `createResultSummary(...)`:

1. Include new office-process result fields.
2. Add a selected office-process driver or fold new drivers into current cash drivers.
3. Add equation components for:
   - moving information between software
   - regular office process time
   - invoice/job cleanup time
   - missing details and rework
4. Keep existing customer revenue drivers and follow-up scenarios.
5. Update result labels so the result screen clearly reflects both:
   - normal office process cost
   - customer/repeat revenue opportunity

Verification:

```bash
npm run build
```

Expected: pass.

### Task 6: Update website API payload contracts

Modify:
- `app/api/calculator-started/route.ts`
- `app/api/calculator-completed/route.ts`

Add sanitized input/result fields listed above.

Update the `telegram_message` strings so n8n/Telegram receives the new relevant calculator info even if the n8n workflow simply relays `telegram_message`.

Verification with local build/server:

```bash
npm run build
npm run start -- -p 3100
```

Then in another shell, POST synthetic non-PII payloads to local routes. Example started smoke:

```bash
curl -sS -X POST http://127.0.0.1:3100/api/calculator-started \
  -H 'Content-Type: application/json' \
  -d '{
    "inputs": {
      "average_invoice_value": 1200,
      "jobs_per_month": 25,
      "invoice_delay_days": 4,
      "software_transfer_frequency": "moderate",
      "software_transfer_hours_per_week": 5,
      "office_process_hours_per_week": 8,
      "missing_details_frequency": "weekly",
      "saved_customer_records": 400,
      "average_repeat_job_value": 850,
      "missed_calls_per_month": 12
    },
    "attribution": {},
    "source_page": "/invoicing-delay-cash-flow-calculator",
    "visitor_id": "TEST-visitor"
  }'
```

Expected: JSON response with `ok: true` or webhook delivery status. Do not print real webhook URLs.

### Task 7: Visual/local browser verification

Use a local server only. Do not restart PM2 or deploy unless Jaden authorizes.

Capture/verify individual states:

1. Intro front page with wedge sentence.
2. New `softwareTransfer` step.
3. Revised office process time step.
4. New missing details step.
5. Customer source step still appears.
6. Customer/reactivation opportunity steps still appear.
7. Claim report gate still works.
8. Result yearly page shows total leak.
9. Diagnosis page shows office-process and customer/repeat opportunity clearly.
10. Math page shows new office-process components and preserved customer opportunity math.

Check mobile and desktop if possible.

### Task 8: Static copy and payload contract checks

Run:

```bash
# No banned calculator copy
grep -RIn "owner.*backup\|backup system\|hidden office-work burn\|AI ROI" app/invoicing-delay-cash-flow-calculator app/api/calculator-* components/calculator-path-section.tsx components/best-fit-section.tsx components/industry-page.tsx | head -80

# Required new calculator terms exist
grep -RIn "moving information between software\|normal office processes\|software_transfer\|missing_details\|office_process" app/invoicing-delay-cash-flow-calculator app/api/calculator-* | head -120

# Preserve reactivation/customer opportunity language
grep -RIn "saved customer\|past customers\|follow-up\|reactivation\|missed calls\|Repeat Revenue" app/invoicing-delay-cash-flow-calculator | head -120
```

Expected:
- Required new terms found.
- Customer opportunity terms still found.
- No banned calculator copy.

### Task 9: Optional homepage/supporting copy pass

Only after calculator is working.

Touch optional files only if needed to align public copy:

- `components/calculator-path-section.tsx`
- `components/best-fit-section.tsx`
- `components/industry-page.tsx`

Recommended replacements:

Replace:

> The owner or office manager has become the backup system.

With:

> Job details live across calls, texts, notes, whiteboards, and software.

or:

> The team already has tools, but the workflow between those tools still breaks.

This aligns with Jaden’s correction without changing the whole site strategy.

Verification:

```bash
npm run build
```

---

## Acceptance criteria

The implementation is done when:

- Calculator intro includes the wedge sentence about normal office processes.
- The first substantive question after intro is about moving information between software / systems.
- Calculator includes added questions about ordinary office process time and missing details.
- Existing opportunity-cost math for saved customers, follow-up, reviews/referrals, missed calls, and reactivation remains intact.
- Result display shows both office process cost and customer/repeat revenue opportunity.
- `/api/calculator-started` forwards new office-process inputs.
- `/api/calculator-completed` forwards new office-process inputs and results.
- `telegram_message` includes the new relevant info for n8n/Telegram delivery.
- `npm run build` passes.
- Local route smoke tests return expected JSON without exposing secrets.
- No PM2 restart/live deploy happened unless Jaden separately approves it.

---

## Final report requirements after implementation

Report:

- Files changed
- Exact calculator questions added/reordered
- Exact result categories added/changed
- Whether customer reactivation/opportunity math was preserved
- Build result
- Local API smoke result for calculator-started/completed
- Whether n8n was only fed new payload fields or actually mutated
- Any remaining risk/blocker
- Deploy status: `not deployed` unless Jaden explicitly approved deployment
