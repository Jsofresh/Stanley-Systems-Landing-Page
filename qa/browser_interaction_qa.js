const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const base = process.env.QA_BASE || 'https://stanley-systems.com';
const outDir = path.join(process.cwd(), 'qa', 'browser-screenshots');
fs.mkdirSync(outDir, { recursive: true });
const failures = [];
const events = [];

async function checkPage(page, url, name, expectedText = []) {
  const consoleErrors = [];
  const badResponses = [];
  page.on('console', msg => { if (['error'].includes(msg.type())) consoleErrors.push(msg.text()); });
  page.on('response', response => {
    const status = response.status();
    if (status >= 400 && status < 500) badResponses.push(`${status} ${response.url()}`);
  });
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(800);
  const status = res ? res.status() : 0;
  const title = await page.title();
  const text = await page.locator('body').innerText({ timeout: 10000 }).catch(() => '');
  const shot = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: shot, fullPage: false }).catch(() => {});
  const missing = expectedText.filter(t => !text.includes(t));
  const materialConsoleErrors = consoleErrors.filter((message) => !message.includes('Failed to load resource'));
  const materialBadResponses = badResponses.filter((entry) => !entry.includes('/_next/image') && !entry.includes('favicon'));
  if (status >= 400 || missing.length || materialConsoleErrors.length || materialBadResponses.length) {
    failures.push({ name, url, status, title, missing, consoleErrors: materialConsoleErrors.slice(0, 5), badResponses: materialBadResponses.slice(0, 8), screenshot: shot });
  }
  events.push({ name, url, status, title, screenshot: shot });
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium', args: ['--no-sandbox','--disable-gpu','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
  const desktop = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await checkPage(desktop, `${base}/`, 'desktop-home', ['Stanley Systems']);
  await checkPage(desktop, `${base}/ai-office-map`, 'desktop-ai-office-map', ['AI Office Map', '$197']);
  await checkPage(desktop, `${base}/pricing`, 'desktop-pricing', ['Pricing']);
  await checkPage(desktop, `${base}/contact`, 'desktop-contact', ['Contact']);

  // Click primary nav links from homepage.
  await desktop.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
  const navTargets = ['AI Office Map', 'Pricing', 'Contact'];
  for (const label of navTargets) {
    const link = desktop.getByRole('link', { name: new RegExp(label, 'i') }).first();
    if (await link.count()) {
      await link.click({ timeout: 8000 }).catch(e => failures.push({ name: `nav-${label}`, issue: e.message }));
      await desktop.waitForLoadState('domcontentloaded').catch(() => {});
      const body = await desktop.locator('body').innerText().catch(() => '');
      if (!body.match(/Stanley Systems|AI Office|Pricing|Contact/)) failures.push({ name: `nav-${label}`, issue: 'navigation produced unexpected page text', url: desktop.url() });
      await desktop.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
    } else failures.push({ name: `nav-${label}`, issue: 'link not found' });
  }

  // Forms: fill visible fields only; do not submit outbound forms.
  await desktop.goto(`${base}/ai-office-blueprint`, { waitUntil: 'domcontentloaded' });
  const inputs = await desktop.locator('input, textarea, select').count();
  if (inputs < 1) failures.push({ name: 'blueprint-form', issue: 'no inputs found' });
  for (let i = 0; i < Math.min(inputs, 5); i++) {
    const el = desktop.locator('input, textarea').nth(i);
    if (await el.count()) await el.fill(i === 2 ? 'test@example.com' : 'TEST QA').catch(() => {});
  }
  await desktop.screenshot({ path: path.join(outDir, 'blueprint-form-filled.png'), fullPage: false });

  await desktop.goto(`${base}/contact`, { waitUntil: 'domcontentloaded' });
  const contactInputs = await desktop.locator('input, textarea, select').count();
  if (contactInputs < 1) failures.push({ name: 'contact-form', issue: 'no inputs found' });
  await desktop.screenshot({ path: path.join(outDir, 'contact-form.png'), fullPage: false });

  await desktop.goto(`${base}/invoicing-delay-cash-flow-calculator`, { waitUntil: 'domcontentloaded' });
  await desktop.waitForTimeout(1000);
  const calcText = await desktop.locator('body').innerText().catch(() => '');
  if (!/calculator|Calculate|Start|invoice/i.test(calcText)) failures.push({ name: 'calculator-load', issue: 'calculator cue missing' });
  const calcButton = desktop.getByRole('button').first();
  if (await calcButton.count()) await calcButton.click().catch(() => {});
  await desktop.waitForTimeout(700);
  await desktop.screenshot({ path: path.join(outDir, 'calculator-after-first-click.png'), fullPage: false });

  // Mobile smoke.
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await checkPage(mobile, `${base}/`, 'mobile-home', ['Stanley Systems']);
  await checkPage(mobile, `${base}/ai-office-blueprint`, 'mobile-blueprint', ['Blueprint']);
  await checkPage(mobile, `${base}/pricing`, 'mobile-pricing', ['Pricing']);

  await browser.close();
  const result = { base, events, failures };
  fs.writeFileSync(path.join(process.cwd(), 'qa', 'stanley_site_browser_interaction_report.json'), JSON.stringify(result, null, 2));
  fs.writeFileSync(path.join(process.cwd(), 'qa', 'stanley_site_browser_interaction_report.md'), '# Browser interaction QA\n\n' + `Failures: ${failures.length}\n\n` + failures.map(f => `- **${f.name}** ${f.issue || ''} ${f.url || ''} ${f.missing ? 'missing='+f.missing.join(',') : ''}`).join('\n') + '\n');
  if (failures.length) {
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }
  console.log(JSON.stringify({ ok: true, events: events.length, screenshots: outDir }, null, 2));
})();
