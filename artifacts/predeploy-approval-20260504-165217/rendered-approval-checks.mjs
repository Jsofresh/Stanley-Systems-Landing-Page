import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';
const base = 'http://127.0.0.1:3066';
const routes = [
  ['home', '/'],
  ['pricing', '/pricing?source=calculator&recommended=both&annual_leak=%24120K&monthly_leak=%2410K'],
  ['contact', '/contact'],
];
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const results = {};
for (const [name, route] of routes) {
  const page = await browser.newPage({ viewport: { width: 390, height: 1200 } });
  const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(800);
  const text = await page.locator('body').innerText({ timeout: 5000 });
  const hrefs = await page.$$eval('a', els => els.map(a => a.getAttribute('href')).filter(Boolean));
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
  }));
  results[name] = {
    route,
    status: response?.status(),
    noHorizontalOverflow: metrics.scrollWidth <= metrics.clientWidth && metrics.bodyScrollWidth <= metrics.bodyClientWidth,
    checks: {
      applicationErrorAbsent: !/Application error/i.test(text),
      noCashflowControlSystem: !text.includes('Cash Flow Collection System'),
      noCustomerRevenueSystem: !text.includes('Repeat Revenue System'),
      noNoCostOrFreeSystemGuarantee: !/no-cost|free Repeat Revenue System|free Repeat Revenue System|free system/i.test(text),
      noStripeOrCheckoutLanguage: !/Stripe|checkout/i.test(text),
      noOldTestPrices: !/\$(147|297|497|997)\b/.test(text),
      noEmOrEnDash: !/[—–]/.test(text),
      noStandaloneStanley: !/(^|[^A-Za-z])Stanley([^A-Za-z]|$)/.test(text.replace(/Stanley Systems/g, '')),
      contactPathAvailable: hrefs.includes('/contact'),
      pricingAuditCreditWording: name !== 'pricing' || (text.includes('Workflow Audit price comes off the monthly plan') && text.includes('double the Workflow Audit price comes off the yearly plan')),
      pricingNoPublicPackagePrices: name !== 'pricing' || !/(\$147|\$297|\$497|\$997|monthly plan is \$|yearly plan is \$|price: \$)/i.test(text),
      pricingSafeCTAs: name !== 'pricing' || hrefs.includes('/contact'),
      homeBestFit: name !== 'home' || text.includes('For shops where the work gets done'),
      homeFinalCTA: name !== 'home' || text.includes('Almost nothing to do. Costs everything to not do.'),
      homeFounder: name !== 'home' || text.includes('Founder-led diagnosis. Hands-on build.'),
    }
  };
  await page.close();
}
await browser.close();
writeFileSync('/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/predeploy-approval-20260504-165217/rendered-approval-checks.json', JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
