import { chromium } from 'playwright';
const base='http://127.0.0.1:3068';
const routes=[['home-desktop','/',1440,1600],['home-mobile','/',390,1200],['contact-mobile','/contact',390,1200],['who-helps-mobile','/who-stanley-systems-helps',390,1200]];
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
for (const [name,url,width,height] of routes){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 await page.goto(base+url,{waitUntil:'networkidle'}); await page.waitForTimeout(500);
 const out=await page.evaluate(()=>{
  const doc={scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,bodyScrollWidth:document.body.scrollWidth,bodyClientWidth:document.body.clientWidth,innerWidth:window.innerWidth};
  const offenders=[];
  for (const el of document.querySelectorAll('body *')){
   const r=el.getBoundingClientRect();
   if (r.right>document.documentElement.clientWidth+1 || r.left < -1){
    offenders.push({tag:el.tagName,text:(el.textContent||'').trim().replace(/\s+/g,' ').slice(0,100),left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width),className:String(el.className||'').slice(0,180)});
   }
  }
  return {doc,offenders:offenders.slice(0,30)};
 });
 console.log('\n'+name, JSON.stringify(out,null,2));
 await page.close();
}
await browser.close();
