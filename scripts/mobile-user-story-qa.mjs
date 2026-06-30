import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const BASE_URL = process.env.QA_BASE_URL || 'https://stanley-systems.com';
const OUT_DIR = path.join(ROOT, 'qa');
const SHOT_DIR = path.join(OUT_DIR, 'browser-screenshots');
const CSV_PATH = path.join(OUT_DIR, 'mobile_feature_user_story_status.csv');
const MD_PATH = path.join(OUT_DIR, 'mobile_feature_user_story_status.md');
const REPORT_PATH = path.join(OUT_DIR, 'mobile_user_story_test_report.md');
const JSON_PATH = path.join(OUT_DIR, 'mobile_user_story_results.json');
const WIDTH = Number(process.env.QA_WIDTH || 393);
const HEIGHT = Number(process.env.QA_HEIGHT || 759);

fs.mkdirSync(SHOT_DIR, { recursive: true });

function read(p) {
  try { return fs.readFileSync(path.join(ROOT, p), 'utf8'); } catch { return ''; }
}

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function routeFromPage(file) {
  let rel = path.relative(path.join(ROOT, 'app'), file).replaceAll(path.sep, '/');
  if (!rel.endsWith('/page.tsx')) return null;
  rel = rel.slice(0, -'/page.tsx'.length);
  if (rel === '') return '/';
  if (rel.includes('[')) return null;
  return '/' + rel;
}

function sourceRoutes() {
  const pages = walk(path.join(ROOT, 'app')).filter((f) => f.endsWith('/page.tsx'));
  const routes = new Set();
  for (const file of pages) {
    const route = routeFromPage(file);
    if (!route) continue;
    if (route.startsWith('/dev/')) continue;
    if (route.startsWith('/remotion')) continue;
    routes.add(route);
  }
  const posts = read('app/blog/posts.ts');
  for (const m of posts.matchAll(/slug:\s*["']([^"']+)["']/g)) routes.add(`/blog/${m[1]}`);
  return [...routes];
}

function sitemapRoutes() {
  const text = read('app/sitemap.ts');
  const routes = [];
  for (const m of text.matchAll(/"(\/[^"\n]*)"/g)) {
    const r = m[1];
    if (r === '/llms.txt' || r.endsWith('.md') || r === '/llms-full.txt') routes.push(r);
    else if (!r.startsWith('/api') && !r.startsWith('/dev')) routes.push(r);
  }
  routes.push('/');
  return routes;
}

function allRoutes() {
  const priority = ['/', '/ai-office-blueprint', '/ai-office-map', '/pricing', '/systems-installation-sprint', '/contact', '/invoicing-delay-cash-flow-calculator', '/login', '/portal'];
  const set = new Set([...priority, ...sitemapRoutes(), ...sourceRoutes()]);
  const arr = [...set].filter(Boolean).sort((a, b) => {
    const ia = priority.indexOf(a), ib = priority.indexOf(b);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    return a.localeCompare(b);
  });
  return arr;
}

function csvEscape(v) {
  const s = String(v ?? '');
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function writeCsv(rows) {
  const cols = ['id','area','feature','user_story','expected_behavior','paths','test_method','status','last_result','issues','fixed_in','retest_status','screenshot','source_basis'];
  const lines = [cols.join(',')];
  for (const row of rows) lines.push(cols.map((c) => csvEscape(row[c])).join(','));
  fs.writeFileSync(CSV_PATH, lines.join('\n') + '\n');
}

function writeMd(rows, title = 'Stanley Systems Mobile Feature User Story Status') {
  const head = `# ${title}\n\nGenerated: ${new Date().toISOString()}\nBase URL: ${BASE_URL}\nViewport: ${WIDTH}x${HEIGHT}\n\n`;
  const summary = rows.reduce((acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, {});
  let md = head + `## Summary\n\n${Object.entries(summary).map(([k,v]) => `- ${k}: ${v}`).join('\n')}\n\n`;
  md += '| id | area | feature | status | retest | issue | screenshot |\n|---|---|---|---|---|---|---|\n';
  for (const r of rows) md += `| ${r.id} | ${r.area} | ${r.feature.replaceAll('|','/')} | ${r.status} | ${r.retest_status || ''} | ${(r.issues || '').replaceAll('\n',' ').replaceAll('|','/')} | ${r.screenshot || ''} |\n`;
  fs.writeFileSync(MD_PATH, md);
}

function mkRow({id, area, feature, user_story, expected_behavior, paths, test_method, status='not_run', last_result='', issues='', fixed_in='', retest_status='', screenshot='', source_basis=''}) {
  const finalRetestStatus = retest_status || (status === 'pass' ? 'pass' : '');
  return { id, area, feature, user_story, expected_behavior, paths, test_method, status, last_result, issues, fixed_in, retest_status: finalRetestStatus, screenshot, source_basis };
}

async function httpStatus(url) {
  try {
    const res = await fetch(url, { redirect: 'follow' });
    return `${res.status} ${res.url}`;
  } catch (e) {
    return `ERROR ${e.message}`;
  }
}

function classifyPath(route) {
  if (route === '/') return 'Homepage';
  if (route.includes('blueprint')) return 'Blueprint funnel';
  if (route.includes('office-map') || route.includes('workflow-audit')) return 'AI Office Map funnel';
  if (route.includes('calculator')) return 'Calculator';
  if (route.includes('systems-installation-sprint') || route.includes('/systems')) return 'Systems / Sprint';
  if (route.includes('/industries') || route.includes('automation')) return 'Industry pages';
  if (route.includes('/blog') || route.includes('problems') || route.includes('process') || route.includes('invoicing')) return 'Content / SEO pages';
  if (route.includes('login') || route.includes('portal')) return 'Portal';
  if (route.endsWith('.md') || route.endsWith('.txt')) return 'Machine-readable docs';
  return 'Site page';
}

function expectedStatusForRoute(route) {
  if (route === '/404') return [404];
  return [];
}

function isExpectedConsole(route, text) {
  if (route === '/portal' && /status of 401 \(Unauthorized\)/i.test(text)) return true;
  if (route === '/404' && /status of 404 \(Not Found\)/i.test(text)) return true;
  return false;
}

async function main() {
  const routes = allRoutes();
  const rows = [];
  const issues = [];
  let id = 1;
  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
  const context = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT }, isMobile: true, deviceScaleFactor: 3 });

  for (const route of routes) {
    const url = new URL(route, BASE_URL).toString();
    const area = classifyPath(route);
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (msg) => { if (['error'].includes(msg.type())) consoleErrors.push(msg.text()); });
    page.on('pageerror', (err) => pageErrors.push(err.message));
    const safeName = route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '__').replaceAll('.', '_');
    const screenshotPath = path.join(SHOT_DIR, `${String(id).padStart(3, '0')}-${safeName}.png`);
    let status = 'pass', last = '', issueText = '';
    try {
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(250);
      const metrics = await page.evaluate(() => {
        const body = document.body, html = document.documentElement;
        const text = (body?.innerText || '').trim();
        const h1 = document.querySelector('h1')?.innerText?.trim() || '';
        const buttons = [...document.querySelectorAll('a,button')].map((el) => {
          const r = el.getBoundingClientRect();
          const txt = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('href') || '').trim().replace(/\s+/g, ' ').slice(0, 90);
          return { text: txt, tag: el.tagName, href: el.getAttribute('href') || '', w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), left: Math.round(r.left), visible: r.width > 0 && r.height > 0 };
        });
        const forms = [...document.querySelectorAll('form')].map((form) => ({
          inputs: [...form.querySelectorAll('input,textarea,select')].map((i) => ({ name: i.getAttribute('name') || '', type: i.getAttribute('type') || i.tagName.toLowerCase(), required: i.required, placeholder: i.getAttribute('placeholder') || '' })),
          submits: [...form.querySelectorAll('button,[type=submit]')].map((b) => (b.innerText || b.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ')),
        }));
        const scrollW = Math.max(body.scrollWidth, html.scrollWidth);
        const clientW = html.clientWidth;
        const appError = /Application error|client-side exception|Internal Server Error/i.test(text);
        return { title: document.title, h1, textLen: text.length, buttons, forms, scrollW, clientW, overflowX: scrollW > clientW + 2, appError };
      });
      await page.screenshot({ path: screenshotPath, fullPage: false });
      const bad = [];
      const expectedStatuses = expectedStatusForRoute(route);
      if (!res || (res.status() >= 400 && !expectedStatuses.includes(res.status()))) bad.push(`HTTP ${res?.status()}`);
      if (metrics.textLen < 80 && !route.endsWith('.txt') && !route.endsWith('.md')) bad.push(`very little visible text (${metrics.textLen} chars)`);
      if (metrics.overflowX) bad.push(`horizontal overflow ${metrics.scrollW}px > ${metrics.clientW}px`);
      if (metrics.appError) bad.push('visible application error text');
      const actionableConsole = consoleErrors.filter((e) => !isExpectedConsole(route, e) && !/favicon|Failed to load resource: the server responded with a status of 404 \\(Not Found\\).*favicon/i.test(e));
      if (actionableConsole.length) bad.push(`console errors: ${actionableConsole.slice(0, 3).join(' | ')}`);
      if (pageErrors.length) bad.push(`page errors: ${pageErrors.slice(0, 3).join(' | ')}`);
      status = bad.length ? 'fail' : 'pass';
      issueText = bad.join('; ');
      last = `${res?.status()} title=${metrics.title || '(none)'} h1=${metrics.h1 || '(none)'}`;
      rows.push(mkRow({
        id: `MOB-${String(id++).padStart(3, '0')}`,
        area, feature: `Mobile page load: ${route}`,
        user_story: `As a mobile visitor, I can open ${route} and see usable content without broken rendering.`,
        expected_behavior: 'HTTP 2xx/3xx, no visible app error, no horizontal overflow, meaningful mobile content renders.',
        paths: route,
        test_method: 'Playwright mobile 393x759 route render, console/page-error capture, horizontal-overflow check, first-fold screenshot.',
        status, last_result: last, issues: issueText, screenshot: screenshotPath, source_basis: 'app/**/page.tsx + app/sitemap.ts + rendered DOM'
      }));
      if (bad.length) issues.push({ route, issue: issueText, screenshot: screenshotPath });

      const anchors = metrics.buttons.filter((b) => b.tag === 'A' && b.visible && b.href && !b.href.startsWith('#'));
      const uniqueAnchors = [];
      const seen = new Set();
      for (const a of anchors) {
        const key = `${a.text}|${a.href}`;
        if (!seen.has(key)) { seen.add(key); uniqueAnchors.push(a); }
      }
      for (const a of uniqueAnchors.slice(0, 8)) {
        let linkStatus = 'pass', linkIssue = '', result = '';
        const href = a.href;
        if (/^(tel:|mailto:|sms:)/.test(href)) {
          result = 'device handoff link present';
        } else if (/^https?:/.test(href) || href.startsWith('/')) {
          const absolute = href.startsWith('/') ? new URL(href, BASE_URL).toString() : href;
          result = await httpStatus(absolute);
          if (!/^(2|3)\d\d /.test(result)) { linkStatus = 'fail'; linkIssue = `linked target returned ${result}`; }
        } else {
          result = `non-http href ${href}`;
        }
        rows.push(mkRow({
          id: `MOB-${String(id++).padStart(3, '0')}`,
          area, feature: `CTA/link: ${a.text || a.href}`,
          user_story: `As a mobile visitor on ${route}, I can tap “${a.text || a.href}” and go to the intended destination.`,
          expected_behavior: 'Visible tap target has a valid destination; internal HTTP target resolves successfully; tel/mail links remain device handoffs.',
          paths: `${route} -> ${href}`,
          test_method: 'Rendered mobile DOM anchor discovery + safe HTTP target check; no production form submits.',
          status: linkStatus, last_result: result, issues: linkIssue, screenshot: screenshotPath, source_basis: 'Rendered mobile DOM anchors'
        }));
        if (linkIssue) issues.push({ route, issue: linkIssue, screenshot: screenshotPath });
      }

      if (metrics.forms.length || metrics.buttons.some((b) => /submit|send|login|start|calculate|continue|get.*blueprint/i.test(b.text))) {
        rows.push(mkRow({
          id: `MOB-${String(id++).padStart(3, '0')}`,
          area, feature: `Form/interactive flow: ${route}`,
          user_story: `As a mobile visitor, I can see and use the form or interactive flow on ${route} without layout blocking.`,
          expected_behavior: 'Fields/buttons are visible and large enough for mobile; validation should prevent incomplete submissions; production side-effect submissions require explicit approval before live POST testing.',
          paths: route,
          test_method: `Side-effect-safe render inspection. Found ${metrics.forms.length} form(s), ${metrics.buttons.length} interactive anchors/buttons. No live POST submission performed.`,
          status: status === 'fail' ? 'blocked' : 'pass',
          last_result: JSON.stringify({ forms: metrics.forms }).slice(0, 1000),
          issues: status === 'fail' ? 'Page-level mobile failure blocks full form confidence.' : '',
          screenshot: screenshotPath,
          source_basis: 'Rendered forms/buttons + source fetch calls searched separately'
        }));
      }
    } catch (e) {
      rows.push(mkRow({
        id: `MOB-${String(id++).padStart(3, '0')}`,
        area, feature: `Mobile page load: ${route}`,
        user_story: `As a mobile visitor, I can open ${route}.`,
        expected_behavior: 'Page loads without timeout or browser crash.',
        paths: route,
        test_method: 'Playwright mobile navigation',
        status: 'fail', last_result: 'navigation exception', issues: e.message, screenshot: '', source_basis: 'app/**/page.tsx + app/sitemap.ts'
      }));
      issues.push({ route, issue: e.message, screenshot: '' });
    } finally {
      await page.close().catch(() => {});
    }
  }
  await browser.close();
  writeCsv(rows);
  writeMd(rows);
  const report = `# Mobile user-story QA report\n\nGenerated: ${new Date().toISOString()}\nBase: ${BASE_URL}\nViewport: ${WIDTH}x${HEIGHT}\n\n## Scope\n\nPublic route inventory from \`app/**/page.tsx\`, \`app/sitemap.ts\`, and rendered mobile DOM. Production form submissions were not performed because they can trigger emails/webhooks/lead records; form render/validation surfaces were inventoried side-effect-safely.\n\n## Result summary\n\n- User-story rows: ${rows.length}\n- Failing/blocking rows: ${rows.filter(r => ['fail','blocked'].includes(r.status)).length}\n- Screenshots: ${SHOT_DIR}\n\n## Issues\n\n${issues.length ? issues.map((i, n) => `### ${n+1}. ${i.route}\n\n${i.issue}\n\n${i.screenshot ? `MEDIA:${i.screenshot}` : ''}`).join('\n\n') : 'No automated mobile route/link issues found.'}\n`;
  fs.writeFileSync(REPORT_PATH, report);
  fs.writeFileSync(JSON_PATH, JSON.stringify({ generated_at: new Date().toISOString(), base_url: BASE_URL, viewport: { WIDTH, HEIGHT }, routes, rows, issues }, null, 2));
  console.log(JSON.stringify({ routes: routes.length, rows: rows.length, failures: rows.filter(r => ['fail','blocked'].includes(r.status)).length, csv: CSV_PATH, report: REPORT_PATH, screenshots: SHOT_DIR }, null, 2));
}

main().catch((err) => { console.error(err); process.exit(1); });
