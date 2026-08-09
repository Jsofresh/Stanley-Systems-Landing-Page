import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const base = 'http://127.0.0.1:3227';
const outDir = path.resolve('.qa/t12-screenshots');
await fs.mkdir(outDir, { recursive: true });

const routes = [
  { name: 'home', path: '/' },
  { name: 'calculator', path: '/invoicing-delay-cash-flow-calculator' },
  { name: 'pricing', path: '/pricing' },
  { name: 'assessment', path: '/workflow-audit' },
  { name: 'how-it-works', path: '/how-stanley-systems-works' },
  { name: 'cashflow-control', path: '/systems/cashflow-control' },
  { name: 'repeat-revenue', path: '/systems/repeat-revenue' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 950, isMobile: false },
  { name: 'laptop', width: 1280, height: 720, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium' });
const results = [];

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, deviceScaleFactor: vp.isMobile ? 2 : 1 });
  for (const route of routes) {
    const page = await context.newPage();
    const consoleMessages = [];
    const badResponses = [];
    const pageErrors = [];
    page.on('console', msg => {
      if (['error', 'warning'].includes(msg.type())) consoleMessages.push(`${msg.type()}: ${msg.text()}`);
    });
    page.on('pageerror', err => pageErrors.push(err.message));
    page.on('response', response => {
      const status = response.status();
      const url = response.url();
      if (status >= 400 && !url.includes('favicon')) badResponses.push({ status, url });
    });
    const url = base + route.path;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(500);

    // Calculator result state: fill visible numeric controls if possible and submit/calculate.
    if (route.name === 'calculator') {
      const inputs = await page.locator('input').all();
      const values = ['120', '1800', '7', '21', '6', '4', '12'];
      for (let i = 0; i < inputs.length && i < values.length; i++) {
        try {
          const type = await inputs[i].getAttribute('type');
          if (type === 'text' || type === 'number' || type === null) await inputs[i].fill(values[i]);
        } catch {}
      }
      for (const label of ['Calculate', 'Show me', 'See result', 'Get my number']) {
        const btn = page.getByRole('button', { name: new RegExp(label, 'i') }).first();
        if (await btn.count()) { try { await btn.click({ timeout: 1000 }); await page.waitForTimeout(800); break; } catch {} }
      }
    }

    const metrics = await page.evaluate(() => {
      const text = document.body.innerText || '';
      const links = [...document.querySelectorAll('a,button')].map(el => {
        const r = el.getBoundingClientRect();
        return { text: (el.innerText || el.getAttribute('aria-label') || '').trim(), top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), visible: r.width > 0 && r.height > 0 && r.bottom >= 0 && r.top <= window.innerHeight };
      }).filter(x => x.text);
      const ctas = links.filter(x => /assessment|calculator|calculate|package|call|buy|start/i.test(x.text));
      const headings = [...document.querySelectorAll('h1,h2,h3')].map(h => ({ tag: h.tagName, text: h.innerText.trim(), top: Math.round(h.getBoundingClientRect().top) })).slice(0, 20);
      const bodyWidth = document.body.scrollWidth;
      const viewportWidth = window.innerWidth;
      const overflowing = [...document.querySelectorAll('body *')].filter(el => el.scrollWidth > el.clientWidth + 8 && getComputedStyle(el).overflowX !== 'hidden').slice(0, 10).map(el => ({ tag: el.tagName, text: (el.innerText || '').trim().slice(0,80), scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
      const imgs = [...document.images].map(img => ({ alt: img.alt || '', w: img.naturalWidth, h: img.naturalHeight, top: Math.round(img.getBoundingClientRect().top), visible: img.getBoundingClientRect().top < window.innerHeight && img.getBoundingClientRect().bottom > 0 })).filter(x => x.visible || x.top < 1600).slice(0,20);
      return { title: document.title, scrollHeight: document.documentElement.scrollHeight, viewportHeight: window.innerHeight, bodyWidth, viewportWidth, hasHorizontalOverflow: bodyWidth > viewportWidth + 2, overflowing, firstViewportCtas: ctas.filter(x => x.visible), allCtas: ctas.slice(0, 30), headings, imgs, textSample: text.slice(0, 500) };
    });

    const fullPath = path.join(outDir, `${vp.name}-${route.name}-full.png`);
    const foldPath = path.join(outDir, `${vp.name}-${route.name}-fold.png`);
    await page.screenshot({ path: foldPath, fullPage: false });
    await page.screenshot({ path: fullPath, fullPage: true });
    results.push({ viewport: vp, route, url, fullPath, foldPath, consoleMessages, badResponses, pageErrors, metrics });
    await page.close();
  }
  await context.close();
}

await browser.close();
const reportPath = path.resolve('.qa/t12-visual-qa-report.json');
await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
console.log(JSON.stringify({ reportPath, outDir, count: results.length, screenshots: results.flatMap(r => [r.foldPath, r.fullPath]) }, null, 2));
