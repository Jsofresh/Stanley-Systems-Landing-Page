import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('artifacts/summary-card-icon-fix-20260505/local');
await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 820 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:3114/?verify=summary-card-icon-fix-local', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
const section = page.locator('[data-audit-section="home.calculator-path"]').first();
await section.screenshot({ path: path.join(outDir, 'calculator-section.png') });
const labels = ['system buckets', 'monthly range', 'first move'];
const cards = [];
for (const label of labels) {
  const card = page.locator(`text=${label}`).locator('xpath=ancestor::div[contains(@class,"rounded-2xl")][1]');
  const svgCount = await card.locator('svg').count();
  const imgCount = await card.locator('img').count();
  const box = await card.boundingBox();
  cards.push({ label, svgCount, imgCount, visible: !!box });
}
const checks = {
  noHorizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
  allCardsVisible: cards.every(c => c.visible),
  allCardsHaveSvgIcons: cards.every(c => c.svgCount >= 1),
  noBlankImageOnlyWells: cards.every(c => c.imgCount === 0),
};
await fs.writeFile(path.join(outDir, 'results.json'), JSON.stringify({ checks, cards }, null, 2));
await browser.close();
console.log(JSON.stringify({ checks, cards }, null, 2));
if (!Object.values(checks).every(Boolean)) process.exit(1);
