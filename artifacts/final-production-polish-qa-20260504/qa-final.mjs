import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const base = 'http://127.0.0.1:3137';
const artifactDir = path.resolve('artifacts/final-production-polish-qa-20260504');
fs.mkdirSync(artifactDir, { recursive: true });

const routes = [
  { name: 'home', path: '/' },
  { name: 'pricing', path: '/pricing' },
  { name: 'pricing-calculator-handoff', path: '/pricing?source=calculator&recommended=both&annual_leak=120k-to-300k&monthly_leak=10k-to-25k' },
  { name: 'contact', path: '/contact' },
];

const forbiddenTextChecks = [
  { label: 'internal tool Hermes absent', re: /\bHermes\b/i },
  { label: 'internal tool Codex absent', re: /\bCodex\b/i },
  { label: 'internal tool OpenClaw absent', re: /OpenClaw/i },
  { label: 'internal agent Stanley H absent', re: /Stanley H/i },
  { label: 'n8n absent', re: /\bn8n\b/i },
  { label: 'QBO internals absent', re: /\bQBO\b|QuickBooks API|Intuit API/i },
  { label: 'HCP internals absent', re: /\bHCP\b|Housecall Pro API/i },
  { label: 'Stripe absent', re: /\bStripe\b|checkout\.stripe|stripe checkout/i },
  { label: 'old pricing test $297 absent', re: /\$\s*297\b/ },
  { label: 'old pricing fallback $147 absent', re: /\$\s*147\b/ },
  { label: 'free/no-cost system guarantee absent', re: /\bfree\s+(Repeat Revenue System|system|implementation)|no[- ]cost\s+(Repeat Revenue System|system|implementation)/i },
  { label: 'old Cash Flow Collection System name absent', re: /Cash Flow Collection System/i },
  { label: 'old Repeat Revenue System name absent', re: /Repeat Revenue System/i },
];

function normalizeSpaces(s) { return (s || '').replace(/\s+/g, ' ').trim(); }

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const results = { base, generatedAt: new Date().toISOString(), routes: [], uniqueVisualKitAssets: [], directAssetChecks: [], failures: [] };
const uniqueAssetUrls = new Set();

for (const route of routes) {
  for (const viewport of [
    { name: 'mobile', width: 390, height: 1200 },
    { name: 'desktop', width: 1440, height: 1200 },
  ]) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
    const consoleMessages = [];
    const pageErrors = [];
    page.on('console', msg => {
      if (['error', 'warning'].includes(msg.type())) consoleMessages.push({ type: msg.type(), text: msg.text().slice(0, 500) });
    });
    page.on('pageerror', err => pageErrors.push(String(err).slice(0, 500)));

    const response = await page.goto(base + route.path, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(1000);
    const status = response ? response.status() : 0;
    const bodyText = normalizeSpaces(await page.locator('body').innerText({ timeout: 10000 }).catch(() => ''));
    const title = await page.title().catch(() => '');
    const docMetrics = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      bodyClientWidth: document.body.clientWidth,
      overflowPx: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - document.documentElement.clientWidth,
    }));

    const links = await page.$$eval('a[href]', els => els.map(a => ({ text: (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120), href: a.getAttribute('href') || '' })));
    const unsafeLinks = links.filter(l => {
      const h = l.href.trim();
      if (!h) return true;
      if (h.startsWith('/')) return false;
      if (h.startsWith('#')) return false;
      if (/^(https?:|mailto:|tel:)/i.test(h)) return false;
      return true;
    });

    const forbiddenHits = forbiddenTextChecks.flatMap(check => {
      const m = bodyText.match(check.re);
      return m ? [{ label: check.label, match: m[0] }] : [];
    });

    const visualKitImages = await page.$$eval('img', imgs => imgs
      .filter(img => (img.currentSrc || img.getAttribute('src') || '').includes('/visual-kit/'))
      .map(img => ({
        src: img.currentSrc || img.getAttribute('src') || '',
        alt: img.getAttribute('alt') || '',
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        rect: (() => { const r = img.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })(),
      })));
    for (const img of visualKitImages) uniqueAssetUrls.add(new URL(img.src, base).toString());

    const screenshot = path.join(artifactDir, `${route.name}-${viewport.name}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });

    const routeResult = {
      route: route.path,
      routeName: route.name,
      viewport: viewport.name,
      status,
      title,
      bodySnippet: bodyText.slice(0, 500),
      forbiddenHits,
      unsafeLinks,
      linkCount: links.length,
      metrics: docMetrics,
      consoleMessages,
      pageErrors,
      visualKitImages,
      screenshot,
    };

    if (status !== 200) results.failures.push(`${route.name}/${viewport.name}: HTTP ${status}`);
    if (docMetrics.overflowPx > 1) results.failures.push(`${route.name}/${viewport.name}: horizontal overflow ${docMetrics.overflowPx}px`);
    if (forbiddenHits.length) results.failures.push(`${route.name}/${viewport.name}: forbidden text ${forbiddenHits.map(h => h.match).join(', ')}`);
    if (unsafeLinks.length) results.failures.push(`${route.name}/${viewport.name}: unsafe links ${unsafeLinks.map(l => l.href).join(', ')}`);
    const blockingConsole = consoleMessages.filter(m => !/Failed to load resource.*speed-insights|net::ERR_ABORTED|404|WebGL|GPU stall|GL Driver Message/i.test(m.text));
    if (blockingConsole.length) results.failures.push(`${route.name}/${viewport.name}: console warnings/errors ${blockingConsole.map(m => m.text).join(' | ')}`);
    if (pageErrors.length) results.failures.push(`${route.name}/${viewport.name}: page errors ${pageErrors.join(' | ')}`);

    results.routes.push(routeResult);
    await page.close();
  }
}

results.uniqueVisualKitAssets = [...uniqueAssetUrls].sort();
const ctx = await browser.newContext();
const req = ctx.request;
for (const url of results.uniqueVisualKitAssets) {
  const res = await req.get(url, { timeout: 15000 }).catch(err => ({ status: () => 0, error: String(err) }));
  const status = typeof res.status === 'function' ? res.status() : 0;
  results.directAssetChecks.push({ url, status });
  if (status !== 200) results.failures.push(`visual-kit direct asset failed ${status}: ${url}`);
}
await ctx.close();
await browser.close();

fs.writeFileSync(path.join(artifactDir, 'browser-qa-results.json'), JSON.stringify(results, null, 2));

const summary = [
  `base=${base}`,
  `routes_checked=${results.routes.length}`,
  `unique_visual_kit_assets=${results.uniqueVisualKitAssets.length}`,
  `direct_asset_checks=${results.directAssetChecks.length}`,
  `failures=${results.failures.length}`,
  ...results.failures.map(f => `FAIL ${f}`),
];
fs.writeFileSync(path.join(artifactDir, 'browser-qa-summary.txt'), summary.join('\n') + '\n');
console.log(summary.join('\n'));
if (results.failures.length) process.exit(1);
