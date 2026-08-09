import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('artifacts/direct-feedback-copy-layout-20260505/local');
await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 820 }, deviceScaleFactor: 1 });
await page.goto('http://127.0.0.1:3113/?verify=direct-feedback-copy-layout-local', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);

const bodyText = await page.locator('body').innerText();
const checks = {
  statusLoaded: bodyText.includes('Find the money already sitting inside your business.'),
  noCalculatorPill: !bodyText.includes('4 leak checks'),
  followUpPathCopy: bodyText.includes('5-star reviews') && bodyText.includes('captured calls') && bodyText.includes('booked calls'),
  cashBuildCopy: bodyText.includes('builds the billing checks and follow-up inside the tools your team already uses'),
  tailoredFollowUpCopy: bodyText.includes('tailored to the way your office books jobs') && bodyText.includes('builds the follow-up path around the way your business runs'),
  lessDefensiveNotFit: bodyText.includes('not ready to clean up the workflow that is costing money') && !bodyText.includes('magic tool'),
  founderNoPillCopyPresent: bodyText.includes('Stanley Systems carries my middle name and my grandfather'),
};

const calculatorCard = page.locator('text=This calculator checks where money is already sitting inside the business.').locator('xpath=ancestor::div[contains(@class,"rounded-[1.5rem]")][1]');
const calcBox = await calculatorCard.boundingBox();
const titleBox = await page.locator('text=This calculator checks where money is already sitting inside the business.').boundingBox();
const layout = {
  viewportWidth: await page.evaluate(() => document.documentElement.clientWidth),
  scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth),
  noHorizontalOverflow: await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth),
  calculatorTitleRightSlack: calcBox && titleBox ? Math.round(calcBox.x + calcBox.width - (titleBox.x + titleBox.width)) : null,
};

const sections = [
  ['calculator', '[data-audit-section="home.calculator-path"]'],
  ['workflow-proof', '[data-section="workflow-proof"]'],
  ['cash-collection', '[data-section="cash-collection-system"]'],
  ['follow-up-system', '[data-section="follow-up-system"]'],
  ['best-fit', '[data-audit-section="home.best-fit"]'],
];
for (const [name, selector] of sections) {
  const loc = page.locator(selector).first();
  if (await loc.count()) await loc.screenshot({ path: path.join(outDir, `${name}.png`) });
}
await page.locator('text=Founder-led diagnosis. Hands-on build.').locator('xpath=ancestor::section[1]').screenshot({ path: path.join(outDir, 'founder.png') });
await fs.writeFile(path.join(outDir, 'results.json'), JSON.stringify({ checks, layout }, null, 2));
await browser.close();
console.log(JSON.stringify({ checks, layout }, null, 2));
if (!Object.values(checks).every(Boolean) || !layout.noHorizontalOverflow) process.exit(1);
