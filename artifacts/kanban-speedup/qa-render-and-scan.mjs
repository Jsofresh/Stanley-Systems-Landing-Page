import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('artifacts/kanban-speedup');
fs.mkdirSync(outDir, { recursive: true });
const localBase = 'http://127.0.0.1:3107';
const liveBase = 'https://stanley-systems.com';
const routes = ['/', '/pricing'];
const requiredTerms = ['Cash Flow Collection System', 'Repeat Revenue System', 'Repeat Revenue System', 'Cash Flow Collection System', 'Stanley Systems'];
const forbiddenPatterns = [
  {name:'free/no-cost Follow-Up guarantee', re: /(?:free|no[- ]cost)[^\n.]{0,100}Follow-Up|Follow-Up[^\n.]{0,100}(?:free|no[- ]cost)/i},
  {name:'Hermes', re: /\bHermes\b/i},
  {name:'Codex', re: /\bCodex\b/i},
  {name:'Stanley H', re: /\bStanley H\b/i},
  {name:'OpenClaw', re: /\bOpenClaw\b/i},
  {name:'n8n', re: /\bn8n\b/i},
  {name:'QBO', re: /\bQBO\b/},
  {name:'HCP', re: /\bHCP\b/},
  {name:'Twilio', re: /\bTwilio\b/i},
];
const dollarRe = /\$\s?\d[\d,.]*(?:\s?[Kk])?(?:\s?[-–—]\s?\$?\s?\d[\d,.]*(?:\s?[Kk])?)?/g;

async function checkPage(page, base, route, label) {
  const url = `${base}${route}${route.includes('?') ? '&' : '?'}qa=t_e2a0a760`;
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(e => ({ status: () => 0, error: String(e) }));
  const status = response?.status?.() ?? 0;
  await page.waitForTimeout(500).catch(()=>{});
  const text = await page.locator('body').innerText({timeout: 10000}).catch(e => `[[INNER_TEXT_ERROR ${e}]]`);
  const html = await page.content().catch(e => `[[HTML_ERROR ${e}]]`);
  const slug = `${label}${route === '/' ? '_home' : route.replace(/\W+/g,'_')}`;
  fs.writeFileSync(path.join(outDir, `${slug}.txt`), text);
  fs.writeFileSync(path.join(outDir, `${slug}.html`), html);
  const present = Object.fromEntries(requiredTerms.map(t => [t, text.includes(t) || html.includes(t)]));
  const forbidden = [];
  for (const p of forbiddenPatterns) {
    const m = text.match(p.re) || html.match(p.re);
    if (m) forbidden.push({name:p.name, sample:m[0].slice(0,160)});
  }
  const dollars = Array.from(new Set(text.match(dollarRe) || []));
  return { label, route, url, status, textLength: text.length, htmlLength: html.length, present, forbidden, dollars };
}

const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
const results = [];
for (const route of routes) results.push(await checkPage(page, localBase, route, 'local'));
for (const route of routes) results.push(await checkPage(page, liveBase, route, 'live'));
await browser.close();
fs.writeFileSync(path.join(outDir, 'render-results.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
