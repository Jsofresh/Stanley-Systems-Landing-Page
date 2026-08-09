import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('artifacts/direct-fix-money-leak-followup-20260505/live');
fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 1400 }, deviceScaleFactor: 1 });
await page.goto('https://stanley-systems.com/?verify=money-leak-followup-fix-live', { waitUntil: 'networkidle' });
const results = await page.evaluate(() => {
  const html = document.documentElement;
  const bodyText = document.body.innerText;
  const value = Array.from(document.querySelectorAll('p')).find((el) => el.textContent?.trim() === '$50K-$300K');
  let card = value?.parentElement;
  while (card && !card.className?.toString().includes('rounded-2xl')) card = card.parentElement;
  const rect = value?.getBoundingClientRect();
  const cardRect = card?.getBoundingClientRect();
  return {
    viewportWidth: html.clientWidth,
    scrollWidth: Math.max(html.scrollWidth, document.body.scrollWidth),
    noHorizontalOverflow: Math.max(html.scrollWidth, document.body.scrollWidth) <= html.clientWidth,
    exampleReportAbsent: !bodyText.includes('Example report'),
    exampleCaptionAbsent: !bodyText.includes('Example report structure shown for illustration'),
    valueText: value?.textContent?.trim() ?? null,
    valueInsideCard: !!(rect && cardRect && rect.left >= cardRect.left && rect.right <= cardRect.right),
    valueRightPadding: rect && cardRect ? cardRect.right - rect.right : null,
  };
});
await page.locator('text=Money Leak Map').locator('xpath=ancestor::div[contains(@class,"rounded-")][1]').screenshot({ path: path.join(outDir, 'money-leak-map-mobile-live.png') });
await page.locator('[data-section="follow-up-system"]').screenshot({ path: path.join(outDir, 'follow-up-system-mobile-live.png') });
fs.writeFileSync(path.join(outDir, 'verify-live-mobile.json'), JSON.stringify(results, null, 2));
await browser.close();
console.log(JSON.stringify(results, null, 2));
