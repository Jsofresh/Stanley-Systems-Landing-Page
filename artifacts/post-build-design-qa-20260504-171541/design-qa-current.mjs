import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = '/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/post-build-design-qa-20260504-172010';
mkdirSync(outDir, { recursive: true });
const base = 'http://127.0.0.1:3068';
const routes = [
  { name: 'home-desktop', url: '/', width: 1440, height: 1600 },
  { name: 'home-mobile', url: '/', width: 390, height: 1200 },
  { name: 'pricing-desktop', url: '/pricing?source=calculator&recommended=both&annual_leak=%24120K&monthly_leak=%2410K', width: 1440, height: 1600 },
  { name: 'pricing-mobile', url: '/pricing?source=calculator&recommended=both&annual_leak=%24120K&monthly_leak=%2410K', width: 390, height: 1200 },
  { name: 'contact-mobile', url: '/contact', width: 390, height: 1200 },
  { name: 'who-helps-mobile', url: '/who-stanley-systems-helps', width: 390, height: 1200 },
];

const forbiddenText = [
  /\borange\b/i,
  /\bamber\b/i,
  /\byellow\b/i,
  /\bgold\b/i,
  /\bsepia\b/i,
  /\bAI\b/,
  /AI-powered/i,
  /Stripe/i,
  /checkout/i,
  /\$147|\$297|\$497|\$997/,
  /Repeat Revenue System/i,
  /Cash Flow Collection System/i,
  /\bStanley\b(?!\s+Systems)/,
  /[—–]/,
];

function parseRgb(s) {
  const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3], a: m[4] == null ? 1 : +m[4] };
}

const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] });
const results = [];
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: route.width, height: route.height }, deviceScaleFactor: 1 });
  const response = await page.goto(`${base}${route.url}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(750);
  const bodyText = await page.locator('body').innerText({ timeout: 5000 });
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
    title: document.title,
  }));
  const domChecks = await page.evaluate(() => {
    const els = [...document.querySelectorAll('body *')];
    const largeDark = [];
    const orangeYellow = [];
    const possibleEyebrow = [];
    for (const el of els) {
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (rect.width < 24 || rect.height < 8) continue;
      const area = rect.width * rect.height;
      const bg = cs.backgroundColor;
      const color = cs.color;
      const border = cs.borderColor;
      const sample = `${bg} ${color} ${border}`;
      const rgbMatches = [...sample.matchAll(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g)];
      for (const match of rgbMatches) {
        const r = +match[1], g = +match[2], b = +match[3], a = match[4] == null ? 1 : +match[4];
        if (a < 0.35) continue;
        const isOrangeYellow = r > 150 && g > 80 && g < 230 && b < 110 && r > b * 1.4;
        if (isOrangeYellow) orangeYellow.push({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 80), rgb: match[0], area: Math.round(area) });
      }
      const bgMatch = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      if (bgMatch) {
        const r = +bgMatch[1], g = +bgMatch[2], b = +bgMatch[3], a = bgMatch[4] == null ? 1 : +bgMatch[4];
        if (a >= 0.75 && r < 35 && g < 45 && b < 65 && area > 12000) {
          largeDark.push({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 100), bg, area: Math.round(area), className: String(el.className || '').slice(0, 160) });
        }
      }
      const txt = (el.textContent || '').trim();
      const ownText = [...el.childNodes].filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent || '').join(' ').trim();
      if (ownText && ownText.length <= 35 && cs.textTransform === 'uppercase' && (parseFloat(cs.letterSpacing) > 1 || cs.fontWeight >= 600)) {
        possibleEyebrow.push({ tag: el.tagName, text: ownText, className: String(el.className || '').slice(0, 120) });
      }
    }
    return {
      largeDark: largeDark.slice(0, 20),
      orangeYellow: orangeYellow.slice(0, 20),
      possibleEyebrow: possibleEyebrow.slice(0, 30),
    };
  });
  const file = join(outDir, `${route.name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  results.push({
    name: route.name,
    file,
    url: route.url,
    status: response?.status(),
    viewport: `${route.width}x${route.height}`,
    title: metrics.title,
    noHorizontalOverflow: metrics.scrollWidth <= metrics.clientWidth && metrics.bodyScrollWidth <= metrics.bodyClientWidth,
    forbiddenTextHits: forbiddenText.map((rx) => rx.test(bodyText) ? rx.toString() : null).filter(Boolean),
    requiredCopy: {
      workflowAudit: bodyText.includes('Workflow Audit'),
      auditCredit: bodyText.includes('Workflow Audit price comes off the monthly plan') || bodyText.includes('double the Workflow Audit price comes off the yearly plan'),
      finalCta: bodyText.includes('Almost nothing to do. Costs everything to not do.'),
      founder: bodyText.includes('Founder-led diagnosis. Hands-on build.'),
      bestFit: bodyText.includes('For shops where the work gets done'),
      contactPath: bodyText.includes('/contact') || [...await page.locator('a[href="/contact"]').evaluateAll(a => a.map(x => x.textContent?.trim()).filter(Boolean))].length > 0,
    },
    domChecks,
  });
  await page.close();
}
await browser.close();
writeFileSync(join(outDir, 'design-qa-current.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
