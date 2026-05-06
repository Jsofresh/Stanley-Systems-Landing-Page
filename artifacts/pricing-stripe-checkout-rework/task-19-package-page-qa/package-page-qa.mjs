import { chromium } from 'playwright';
import fs from 'node:fs';

const baseUrl = process.env.QA_BASE_URL || 'http://127.0.0.1:3149';
const routes = [
  '/pricing',
  '/systems/cashflow-control',
  '/systems/repeat-revenue',
  '/checkout/success',
  '/checkout/cancel',
  '/checkout/onboarding',
  '/terms-and-conditions',
  '/',
];

const requiredByRoute = {
  '/pricing': [
    'Workflow Audit',
    'Cashflow Control System',
    'Repeat Revenue System',
    'Both Systems',
    '$97',
    '$397/mo',
    '$697/mo',
    '$897/mo',
    '$3,810/yr',
    '$6,690/yr',
    '$8,610/yr',
    'Checkout is paused',
    'Buying starts onboarding',
    'Implementation proceeds after fit, access, and scope review',
  ],
  '/systems/cashflow-control': [
    'Cashflow Control System',
    'Turn finished work into collected cash faster.',
    'Finished-job trigger',
    'Billing-ready checklist',
    'Invoice handoff view',
    'Missing-info request',
    'Invoice-sent record',
    'Open-balance tracker',
    'Follow-up reminders',
    'Owner/office view',
    'Exception alerts',
    'Handoff notes',
    'does not guarantee collected revenue',
    'Buying this package starts onboarding',
    'Buy Cashflow Control',
    'Start with Workflow Audit',
  ],
  '/systems/repeat-revenue': [
    'Repeat Revenue System',
    'Get more money from the customers you already earned.',
    'Smart Re-Engagement',
    'Review Booster',
    'Referral Engine',
    'After-Hours Intake Assistant',
    'main number unchanged',
    'upgrades',
    'separately scoped',
    'does not guarantee new customers',
    'Buying this package starts onboarding',
    'Buy Repeat Revenue',
    'Start with Workflow Audit',
  ],
  '/checkout/success': [
    'Payment received. Next, complete onboarding.',
    'Complete onboarding',
    'Book Your Call',
    'fit, access, and scope',
    'refund before implementation begins',
  ],
  '/checkout/cancel': [
    'Payment was not completed.',
    'Return to Pricing',
    'Buy Workflow Audit',
  ],
  '/checkout/onboarding': [
    'Paid buyer onboarding',
    'What did you buy?',
    'Cashflow Control System — monthly',
    'Repeat Revenue System — monthly',
    'Both Systems — yearly',
    'Submit onboarding',
    'Terms and Conditions',
  ],
  '/terms-and-conditions': [
    'Direct package purchase and onboarding review',
    'Package scope and implementation limits',
    'Refunds, redirects, and paused starts after package purchase',
    'Cashflow Control System, Repeat Revenue System, and Both Systems',
    'do not create a guarantee of financial performance',
  ],
};

const forbiddenExact = [
  'Customer Revenue System',
  'Follow-Up System',
  'Cash Collection System',
  'Cash Flow Collection System',
  'AI receptionist',
  'Twilio',
  '5-star',
  'five-star',
  'guarantee more customers',
  'guaranteed new customers',
  'guaranteed rankings',
  'unlimited custom development is included',
];

const cashflowForbidden = [
  'loan underwriting',
  'investment advice',
  'tax advice',
  'collections agency',
  'debt collection agency',
  'payment processor replacement',
  'cash forecast',
  'financing product',
  'accounts receivable financing',
];

const expectedStripeLinks = {
  workflow_audit: 'https://buy.stripe.com/4gM7sKgYffmz7Qd8p4g7e02',
  cashflow_monthly: 'https://buy.stripe.com/28E7sKdM38Yb2vTaxcg7e03',
  repeat_monthly: 'https://buy.stripe.com/cNi7sK5fxgqD5I534Kg7e04',
  cashflow_yearly: 'https://buy.stripe.com/aFa3cu5fxa2f3zX7l0g7e07',
  repeat_yearly: 'https://buy.stripe.com/6oUaEW0Zh7U72vTcFkg7e06',
  both_yearly: 'https://buy.stripe.com/eVq3cu9vN5LZgmJfRwg7e08',
};
const pausedBothMonthlyLink = 'https://buy.stripe.com/28EbJ0bDV7U7eeBeNsg7e05';

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
const page = await context.newPage();
const results = [];
const failures = [];

for (const route of routes) {
  const response = await page.goto(baseUrl + route, { waitUntil: 'networkidle' });
  const status = response?.status() || 0;
  const text = await page.locator('body').innerText({ timeout: 5000 });
  const scroll = await page.evaluate(() => ({
    bodyScrollWidth: document.body.scrollWidth,
    docScrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  const anchors = await page.$$eval('a', els => els.map(a => ({ text: (a.innerText || '').trim(), href: a.href, target: a.target || '' })));
  const routeFailures = [];
  if (status !== 200) routeFailures.push(`HTTP ${status}`);
  if (Math.max(scroll.bodyScrollWidth, scroll.docScrollWidth) > scroll.clientWidth + 1) {
    routeFailures.push(`horizontal overflow ${Math.max(scroll.bodyScrollWidth, scroll.docScrollWidth)} > ${scroll.clientWidth}`);
  }
  for (const required of (requiredByRoute[route] || [])) {
    if (!text.includes(required)) routeFailures.push(`missing required text: ${required}`);
  }
  for (const forbidden of forbiddenExact) {
    if (text.includes(forbidden)) routeFailures.push(`forbidden visible text present: ${forbidden}`);
  }
  if (route === '/systems/cashflow-control') {
    for (const forbidden of cashflowForbidden) {
      if (text.toLowerCase().includes(forbidden)) routeFailures.push(`cashflow speculative finance feature present: ${forbidden}`);
    }
  }
  results.push({ route, status, textLength: text.length, anchors, scroll, failures: routeFailures });
  failures.push(...routeFailures.map(f => `${route}: ${f}`));
}

await page.goto(baseUrl + '/pricing', { waitUntil: 'networkidle' });
const pricingLinks = await page.$$eval('a', els => els.map(a => ({ text: (a.innerText || '').trim(), href: a.href })));
for (const [name, expected] of Object.entries(expectedStripeLinks)) {
  const found = pricingLinks.some(link => link.href === expected);
  if (!found) failures.push(`/pricing: missing expected active Stripe link for ${name}: ${expected}`);
}
if (pricingLinks.some(link => link.href === pausedBothMonthlyLink)) {
  failures.push('/pricing: paused Both Systems Monthly Stripe link is active, but should remain disabled until Stripe install mismatch is fixed');
}

const internalHrefs = [...new Set(results.flatMap(r => r.anchors.map(a => a.href)).filter(h => h.startsWith(baseUrl)))];
for (const href of internalHrefs) {
  const url = new URL(href);
  const path = url.pathname;
  if (url.hash) continue;
  if (path === '/' || routes.includes(path) || path === '/privacy-policy') {
    const res = await page.goto(href, { waitUntil: 'domcontentloaded' });
    if ((res?.status() || 0) !== 200) failures.push(`internal CTA/link ${href} returned ${res?.status() || 0}`);
  }
}

await browser.close();

const report = {
  baseUrl,
  checkedAt: new Date().toISOString(),
  status: failures.length ? 'fail' : 'pass',
  failures,
  routes: results,
};
fs.writeFileSync('artifacts/pricing-stripe-checkout-rework/task-19-package-page-qa/qa-raw-results.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ status: report.status, failureCount: failures.length, failures }, null, 2));
if (failures.length) process.exit(1);
