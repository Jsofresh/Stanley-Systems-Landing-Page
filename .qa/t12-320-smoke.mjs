import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
const outDir=path.resolve('.qa/t12-screenshots');
await fs.mkdir(outDir,{recursive:true});
const routes=['/','/pricing','/workflow-audit','/invoicing-delay-cash-flow-calculator'];
const browser=await chromium.launch({headless:true, executablePath:'/usr/bin/chromium'});
const ctx=await browser.newContext({viewport:{width:320,height:700}, isMobile:true, deviceScaleFactor:2});
const rows=[];
for (const route of routes){
  const page=await ctx.newPage();
  const consoleMessages=[]; const badResponses=[]; const pageErrors=[];
  page.on('console', m=>{ if(['error','warning'].includes(m.type())) consoleMessages.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', e=>pageErrors.push(e.message));
  page.on('response', r=>{ if(r.status()>=400 && !r.url().includes('favicon')) badResponses.push({status:r.status(),url:r.url()}); });
  await page.goto('http://127.0.0.1:3227'+route,{waitUntil:'networkidle',timeout:45000});
  await page.waitForTimeout(500);
  const name=route==='/'?'home':route.split('/').filter(Boolean).pop();
  const fold=path.join(outDir,`mobile320-${name}-fold.png`);
  const full=path.join(outDir,`mobile320-${name}-full.png`);
  await page.screenshot({path:fold, fullPage:false});
  await page.screenshot({path:full, fullPage:true});
  const metrics=await page.evaluate(()=>{
    const els=[...document.querySelectorAll('body *')];
    const overflow=els.filter(el=>el.scrollWidth>el.clientWidth+4 && getComputedStyle(el).overflowX!=='hidden').slice(0,20).map(el=>({tag:el.tagName, cls:el.className?.toString().slice(0,60), text:(el.innerText||'').trim().slice(0,100), sw:el.scrollWidth,cw:el.clientWidth}));
    const tapSmall=[...document.querySelectorAll('a,button')].map(el=>{const r=el.getBoundingClientRect(); return {text:(el.innerText||el.ariaLabel||'').trim(),w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top),visible:r.width>0&&r.height>0&&r.bottom>=0&&r.top<=innerHeight}}).filter(x=>x.visible && (x.w<44||x.h<44));
    return {scrollHeight:document.documentElement.scrollHeight, bodyWidth:document.body.scrollWidth, innerWidth, hasHorizontalOverflow:document.body.scrollWidth>innerWidth+2, overflow, tapSmall};
  });
  rows.push({route,fold,full,metrics,consoleMessages,badResponses,pageErrors});
  await page.close();
}
await browser.close();
await fs.writeFile('.qa/t12-320-smoke.json',JSON.stringify(rows,null,2));
console.log(JSON.stringify(rows.map(r=>({route:r.route,scrollHeight:r.metrics.scrollHeight,bodyWidth:r.metrics.bodyWidth,innerWidth:r.metrics.innerWidth,hOverflow:r.metrics.hasHorizontalOverflow,overflow:r.metrics.overflow.slice(0,3),smallTap:r.metrics.tapSmall.slice(0,5),console:r.consoleMessages.length,bad:r.badResponses.length,errors:r.pageErrors.length,fold:r.fold,full:r.full})),null,2));
