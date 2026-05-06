import { chromium } from 'playwright';
import fs from 'node:fs';
const baseUrl = process.env.QA_BASE_URL || 'http://127.0.0.1:3150';
const outDir = 'artifacts/pricing-stripe-checkout-rework/task-19-package-page-qa/screenshots';
fs.mkdirSync(outDir, { recursive: true });
const routes = [
  ['pricing', '/pricing'],
  ['cashflow', '/systems/cashflow-control'],
  ['repeat-revenue', '/systems/repeat-revenue'],
  ['success', '/checkout/success'],
  ['cancel', '/checkout/cancel'],
  ['onboarding', '/checkout/onboarding'],
  ['terms', '/terms-and-conditions'],
];
const viewports = [
  ['desktop', { width: 1440, height: 1100 }],
  ['mobile', { width: 390, height: 900 }],
];
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium' });
const manifest = [];
for (const [vpName, viewport] of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  for (const [name, route] of routes) {
    const response = await page.goto(baseUrl + route, { waitUntil: 'networkidle' });
    const screenshot = `${outDir}/${name}-${vpName}.png`;
    await page.screenshot({ path: screenshot, fullPage: true });
    const metrics = await page.evaluate(() => ({
      bodyScrollWidth: document.body.scrollWidth,
      docScrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyTextLength: document.body.innerText.length,
    }));
    manifest.push({ route, viewport: vpName, status: response?.status() || 0, screenshot, metrics });
  }
  await context.close();
}
await browser.close();
fs.writeFileSync('artifacts/pricing-stripe-checkout-rework/task-19-package-page-qa/screenshot-manifest.json', JSON.stringify(manifest, null, 2));
console.log(JSON.stringify({ screenshots: manifest.length, outDir }, null, 2));
