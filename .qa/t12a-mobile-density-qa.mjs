import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const base = process.env.BASE_URL || 'http://127.0.0.1:3228';
const outDir = path.resolve('.qa/t12a-screenshots');
await fs.mkdir(outDir, { recursive: true });

const routes = [
  { name: 'home', path: '/' },
  { name: 'pricing', path: '/pricing' },
  { name: 'assessment', path: '/workflow-audit' },
];
const viewports = [
  { name: 'mobile390', width: 390, height: 844 },
  { name: 'mobile320', width: 320, height: 720 },
];

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium' });
const results = [];

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: true, deviceScaleFactor: 2 });
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

    await page.goto(base + route.path, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(800);
    const foldPath = path.join(outDir, `${vp.name}-${route.name}-fold.png`);
    const fullPath = path.join(outDir, `${vp.name}-${route.name}-full.png`);
    await page.screenshot({ path: foldPath, fullPage: false });
    await page.screenshot({ path: fullPath, fullPage: true });

    const metrics = await page.evaluate(() => {
      const bodyWidth = document.body.scrollWidth;
      const viewportWidth = window.innerWidth;
      const sticky = [...document.querySelectorAll('a')]
        .map(el => ({ text: (el.textContent || '').trim(), rect: el.getBoundingClientRect() }))
        .filter(x => /Start \$97 Assessment|Start the Cash Flow Assessment/i.test(x.text))
        .map(x => ({ text: x.text, top: Math.round(x.rect.top), bottom: Math.round(x.rect.bottom), visible: x.rect.width > 0 && x.rect.height > 0 && x.rect.bottom > 0 && x.rect.top < window.innerHeight }));
      const details = [...document.querySelectorAll('details')].map(d => ({ summary: (d.querySelector('summary')?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120), open: d.open, top: Math.round(d.getBoundingClientRect().top) }));
      return {
        title: document.title,
        scrollHeight: document.documentElement.scrollHeight,
        bodyWidth,
        viewportWidth,
        hasHorizontalOverflow: bodyWidth > viewportWidth + 2,
        stickyOrPrimaryCtas: sticky.slice(0, 10),
        collapsedDetails: details.slice(0, 20),
      };
    });

    // Scroll past the hero to confirm the mobile sticky CTA becomes reachable.
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.35));
    await page.waitForTimeout(500);
    const afterScrollSticky = await page.evaluate(() => [...document.querySelectorAll('a')]
      .map(el => ({ text: (el.textContent || '').trim(), rect: el.getBoundingClientRect() }))
      .filter(x => /Start \$97 Assessment/i.test(x.text))
      .map(x => ({ text: x.text, top: Math.round(x.rect.top), bottom: Math.round(x.rect.bottom), visible: x.rect.width > 0 && x.rect.height > 0 && x.rect.bottom > 0 && x.rect.top < window.innerHeight }))
    );

    results.push({ viewport: vp, route, metrics, afterScrollSticky, foldPath, fullPath, consoleMessages, badResponses, pageErrors });
    await page.close();
  }
  await context.close();
}

await browser.close();
const reportPath = path.resolve('.qa/t12a-mobile-density-report.json');
await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
console.log(JSON.stringify({ reportPath, outDir, results: results.map(r => ({ viewport: r.viewport.name, route: r.route.name, scrollHeight: r.metrics.scrollHeight, overflow: r.metrics.hasHorizontalOverflow, badResponses: r.badResponses.length, pageErrors: r.pageErrors.length, stickyVisibleAfterScroll: r.afterScrollSticky.some(x => x.visible), fullPath: r.fullPath, foldPath: r.foldPath, collapsedDetails: r.metrics.collapsedDetails.length })) }, null, 2));
