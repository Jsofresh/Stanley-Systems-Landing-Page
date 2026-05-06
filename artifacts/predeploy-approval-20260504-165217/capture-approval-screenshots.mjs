import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = '/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/predeploy-approval-20260504-165217';
mkdirSync(outDir, { recursive: true });
const base = 'http://127.0.0.1:3066';
const routes = [
  { name: 'home-desktop-full', url: '/', width: 1440, height: 1600, fullPage: true },
  { name: 'home-mobile-full', url: '/', width: 390, height: 1200, fullPage: true },
  { name: 'pricing-desktop-full', url: '/pricing?source=calculator&recommended=both&annual_leak=%24120K&monthly_leak=%2410K', width: 1440, height: 1600, fullPage: true },
  { name: 'pricing-mobile-full', url: '/pricing?source=calculator&recommended=both&annual_leak=%24120K&monthly_leak=%2410K', width: 390, height: 1200, fullPage: true },
  { name: 'who-helps-mobile-full', url: '/who-stanley-systems-helps', width: 390, height: 1200, fullPage: true },
];

const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const results = [];
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: route.width, height: route.height }, deviceScaleFactor: 1 });
  const response = await page.goto(`${base}${route.url}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1200);
  const bodyText = await page.locator('body').innerText({ timeout: 5000 });
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
    title: document.title,
  }));
  const path = join(outDir, `${route.name}.png`);
  await page.screenshot({ path, fullPage: route.fullPage });
  results.push({
    file: path,
    url: route.url,
    status: response?.status(),
    viewport: `${route.width}x${route.height}`,
    noHorizontalOverflow: metrics.scrollWidth <= metrics.clientWidth && metrics.bodyScrollWidth <= metrics.bodyClientWidth,
    title: metrics.title,
    checks: {
      applicationErrorAbsent: !/Application error/i.test(bodyText),
      workflowAuditPresent: bodyText.includes('Workflow Audit'),
      pricingCreditPresent: bodyText.includes('Workflow Audit price comes off the monthly plan') || bodyText.includes('double the Workflow Audit price comes off the yearly plan'),
      bestFitPresent: bodyText.includes('For shops where the work gets done'),
      finalCtaPresent: bodyText.includes('Almost nothing to do. Costs everything to not do.'),
      founderPresent: bodyText.includes('Founder-led diagnosis. Hands-on build.'),
    }
  });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
