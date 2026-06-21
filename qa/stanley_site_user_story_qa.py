#!/usr/bin/env python3
from __future__ import annotations
import csv, json, re, subprocess, sys, time, urllib.error, urllib.parse, urllib.request
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
QA = ROOT / 'qa'
CSV_PATH = QA / 'stanley_site_feature_user_story_status.csv'
MD_PATH = QA / 'stanley_site_feature_user_story_status.md'
REPORT_PATH = QA / 'stanley_site_user_story_test_report.md'
BASE = 'https://stanley-systems.com'
LOCAL = 'http://127.0.0.1:3012'

class TextParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text=[]; self.links=[]; self.inputs=[]; self.buttons=[]; self.forms=[]; self.meta=[]; self.title=''
        self._title=False
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        if tag=='a' and d.get('href'): self.links.append(d.get('href'))
        if tag in ('input','textarea','select'):
            self.inputs.append((tag,d.get('name') or d.get('id') or d.get('placeholder') or d.get('type') or ''))
        if tag=='button': self.buttons.append(d.get('type') or 'button')
        if tag=='form': self.forms.append(d)
        if tag=='meta': self.meta.append(d)
        if tag=='title': self._title=True
    def handle_endtag(self, tag):
        if tag=='title': self._title=False
    def handle_data(self, data):
        s=' '.join(data.split())
        if s:
            self.text.append(s)
            if self._title: self.title += s
    @property
    def body_text(self): return ' '.join(self.text)

def fetch(url, method='GET', timeout=18):
    req=urllib.request.Request(url, method=method, headers={'User-Agent':'StanleySystemsQA/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            body=r.read(500000).decode('utf-8','ignore') if method!='HEAD' else ''
            return {'code': r.status, 'url': r.geturl(), 'body': body, 'headers': dict(r.headers)}
    except urllib.error.HTTPError as e:
        body=e.read(200000).decode('utf-8','ignore') if method!='HEAD' else ''
        return {'code': e.code, 'url': e.geturl(), 'body': body, 'headers': dict(e.headers)}
    except Exception as e:
        return {'code': 0, 'url': url, 'body': '', 'headers': {}, 'error': str(e)}

def parse(html):
    p=TextParser(); p.feed(html or ''); return p

def internal_url(href, base=BASE):
    if not href or href.startswith(('mailto:','tel:','#','javascript:')): return None
    u=urllib.parse.urljoin(base+'/', href)
    parsed=urllib.parse.urlparse(u)
    if parsed.netloc not in ('stanley-systems.com','www.stanley-systems.com'): return None
    return urllib.parse.urlunparse((parsed.scheme, parsed.netloc, parsed.path, '', parsed.query, ''))

def route_story(id, area, feature, path, expected_text=(), expected_code=200):
    return dict(id=id, area=area, feature=feature,
        user_story=f'As a visitor, I want the {feature} page/feature to load and explain the next useful Stanley Systems step.',
        expected_behavior=f'{path} returns {expected_code}; page has Stanley Systems branding, no broken primary content, and expected cues: '+', '.join(expected_text),
        paths=path, test_method='HTTP/DOM/link smoke', status='Not tested', last_result='', issues='', fixed_in='', retest_status='')

def build_stories():
    rows=[]
    add=rows.append
    add(route_story('GLOBAL-HOME','Global navigation','homepage','/', ['Stanley Systems','AI Office','Blueprint']))
    add(route_story('GLOBAL-HEADER','Global navigation','header nav','/', ['AI Office Map','Pricing','Contact']))
    add(route_story('GLOBAL-FOOTER','Global navigation','footer links','/', ['Privacy','Terms']))
    add(route_story('GLOBAL-MOBILE','Responsive UX','mobile header/menu','/', ['Stanley Systems']))
    add(route_story('SEO-SITEMAP','SEO/crawlers','sitemap.xml','/sitemap.xml', ['stanley-systems.com']))
    add(route_story('SEO-ROBOTS','SEO/crawlers','robots.txt','/robots.txt', ['Sitemap']))
    add(route_story('SEO-LLMS','AI crawler guidance','llms.txt','/llms.txt', ['Stanley Systems is not Standley Systems','AI Office Map']))
    add(route_story('SEO-LLMS-FULL','AI crawler guidance','llms-full.txt','/llms-full.txt', ['Stanley Systems is not Standley Systems','AI Office Map']))
    add(route_story('REDIRECT-ASSESSMENT','Redirects','old assessment route redirect','/how-the-assessment-works', [''], 308))
    add(route_story('REDIRECT-WORKFLOW-AUDIT','Redirects','old workflow audit route redirect','/workflow-audit', [''], 308))

    public_pages=[
        ('PAGE-ABOUT','Public page','About','/about',['Stanley Systems']),
        ('PAGE-BLUEPRINT','Lead magnet','AI Office Blueprint','/ai-office-blueprint',['Blueprint','office']),
        ('PAGE-MAP','Paid offer','AI Office Map','/ai-office-map',['AI Office Map','$197']),
        ('PAGE-PRICING','Pricing','pricing page','/pricing',['Pricing','AI Office']),
        ('PAGE-SPRINT','Paid offer','systems installation sprint','/systems-installation-sprint',['Installation Sprint','workflow']),
        ('PAGE-HELP','Audience','who Stanley Systems helps','/who-stanley-systems-helps',['service','business']),
        ('PAGE-CONTACT','Contact','contact page','/contact',['Contact','Stanley Systems']),
        ('PAGE-SAFETY','Trust/legal','safety page','/safety',['Safety']),
        ('PAGE-PRIVACY','Trust/legal','privacy policy','/privacy-policy',['Privacy']),
        ('PAGE-TERMS','Trust/legal','terms page','/terms',['Terms']),
        ('PAGE-TERMS-CONDITIONS','Trust/legal','terms and conditions page','/terms-and-conditions',['Terms']),
        ('PAGE-CASE-STUDY','Proof','case study page','/stanley-systems-case-study',['Stanley Systems']),
        ('PAGE-BLOG','Content','blog index','/blog',['Blog']),
    ]
    for args in public_pages: add(route_story(*args))
    for slug in ['why-the-plumber-waits-3-weeks-to-get-paid','the-estimate-that-went-cold-and-the-4000-job','real-cost-of-slow-invoicing-service-business','why-most-automation-projects-fail-before-helping-team','what-trustworthy-automation-partner-should-deliver']:
        add(route_story('BLOG-'+slug[:32], 'Content', f'blog post {slug}', f'/blog/{slug}', ['Stanley Systems']))
    for slug,name in [('field-service-automation','field service automation'),('marine-service-automation','marine service automation'),('service-business-billing-process-fix','billing process fix'),('speed-up-invoicing-for-service-businesses','speed up invoicing'),('work-order-to-invoice-process-for-service-businesses','work order to invoice'),('missed-estimate-follow-up-for-service-businesses','missed estimate follow-up'),('office-handoff-problems-in-field-service-businesses','office handoff problems')]:
        add(route_story('PROBLEM-'+slug[:28], 'Problem/industry SEO', name, '/'+slug, ['Stanley Systems']))
    for slug in ['plumbing','roofing','landscaping','hvac','marine','electrical','general-contractors','adjacent-service-businesses']:
        add(route_story('IND-'+slug, 'Industry pages', slug, '/industries/'+slug, ['Stanley Systems']))
    for slug in ['ai-office-blueprint.md','ai-office-map.md','pricing.md','systems-installation-sprint.md','contact.md','about.md','who-stanley-systems-helps.md']:
        add(route_story('DOC-'+slug.replace('.','-'), 'Machine-readable docs', slug, '/'+slug, ['Stanley Systems']))

    # interactive/functional flows
    interactions=[
        ('FORM-BLUEPRINT','Forms','Blueprint intake form','/ai-office-blueprint','Visitor can fill the Blueprint intake fields; client validation/progress states are available without broken rendering.'),
        ('FORM-CONTACT','Forms','Contact router/form','/contact','Visitor can choose contact path and see fields/CTA for contacting Stanley Systems.'),
        ('FORM-AUDIT-INTAKE','Forms','Audit intake form','/audit-intake','Visitor sees assessment intake fields and submit control.'),
        ('CALC-FLOW','Calculator','free invoicing delay calculator','/invoicing-delay-cash-flow-calculator','Visitor can start the calculator, answer questions, reach lead gate/result UI, and see AI Office Map CTA.'),
        ('CALC-PAID','Calculator','paid calculator route','/invoicing-delay-cash-flow-calculator/paid','Paid calculator route loads its interactive calculator UI.'),
        ('CHECKOUT-SUCCESS','Checkout states','checkout success page','/checkout/success','Buyer returning from checkout sees success/next-step messaging.'),
        ('CHECKOUT-CANCEL','Checkout states','checkout cancel page','/checkout/cancel','Buyer returning from cancelled checkout sees recovery/return CTA.'),
        ('CHECKOUT-ONBOARDING','Checkout states','buyer onboarding form','/checkout/onboarding','Buyer onboarding form renders expected business/contact fields.'),
        ('LOGIN-PORTAL','Protected app','portal login','/login','User sees portal login without exposing private data.'),
        ('PORTAL','Protected app','portal app gate','/portal','Unauthenticated portal route does not expose private data and prompts login/session handling.'),
    ]
    for id,area,feature,path,exp in interactions:
        add(dict(id=id, area=area, feature=feature, user_story=f'As a visitor/user, I want {feature} to work as designed.', expected_behavior=exp, paths=path, test_method='Rendered DOM/browser smoke; no outbound submission unless separately approved', status='Not tested', last_result='', issues='', fixed_in='', retest_status=''))

    # public dev hygiene
    for slug in ['dev/bayview-intake','dev/bayview-ops-layer','dev/customer-revenue-system-v2','dev/customer-revenue-system-v3','dev/customer-revenue-system-v4','dev/motion-smoke','dev/visual-kit-primitives','remotion','remotion/login']:
        add(dict(id='HYGIENE-'+slug.replace('/','-'), area='Public hygiene', feature=f'non-public route /{slug}', user_story='As a public visitor, I should not accidentally land on internal/dev tooling from the marketing website.', expected_behavior=f'/{slug} should be unavailable, redirected, or clearly protected from normal public website UX.', paths='/'+slug, test_method='HTTP status/content smoke', status='Not tested', last_result='', issues='', fixed_in='', retest_status=''))
    return rows

def write_csv(rows):
    QA.mkdir(exist_ok=True)
    fields=['id','area','feature','user_story','expected_behavior','paths','test_method','status','last_result','issues','fixed_in','retest_status']
    with CSV_PATH.open('w', newline='') as f:
        w=csv.DictWriter(f, fieldnames=fields); w.writeheader(); w.writerows(rows)
    write_md(rows)

def write_md(rows):
    MD_PATH.write_text('| ID | Area | Feature | Status | Retest | Issues |\n|---|---|---|---|---|---|\n'+'\n'.join(f"| {r['id']} | {r['area']} | {r['feature']} | {r['status']} | {r['retest_status']} | {str(r['issues']).replace('|','/')} |" for r in rows)+'\n')

def load_rows():
    if not CSV_PATH.exists():
        rows=build_stories(); write_csv(rows); return rows
    return list(csv.DictReader(CSV_PATH.open()))

def test_route(row):
    path=row['paths'].split()[0]
    url=BASE+path if path.startswith('/') else path
    r=fetch(url)
    p=parse(r['body'])
    issues=[]
    exp=row['expected_behavior']
    if row['id'].startswith('REDIRECT'):
        if r['code'] not in (301,302,307,308) and '/ai-office-map' not in r['url']:
            issues.append(f'expected redirect to /ai-office-map, got {r["code"]} {r["url"]}')
        if '/ai-office-map' not in r['url'] and r['headers'].get('Location') != '/ai-office-map':
            issues.append(f'redirect target missing /ai-office-map: {r["url"]} {r["headers"].get("Location")}')
    elif row['area']=='Public hygiene':
        # dev/internal pages should not look like open public marketing pages.
        if r['code']==200 and not any(t in p.body_text.lower() for t in ['login','not found','404','unauthorized','forbidden']):
            issues.append('internal/dev-looking route is publicly accessible with 200 content')
    else:
        if r['code'] != 200: issues.append(f'expected 200 got {r["code"]}')
        if path.endswith(('.txt','.md','.xml')):
            if 'Stanley Systems' not in r['body'] and path not in ['/robots.txt','/sitemap.xml']:
                issues.append('machine-readable doc missing Stanley Systems')
        else:
            if 'Stanley Systems' not in p.body_text and path not in ['/checkout/cancel','/checkout/success']:
                issues.append('page text missing Stanley Systems branding')
            if not p.title and '<title' not in r['body'].lower():
                issues.append('missing HTML title')
        # expected cues
        cues=re.findall(r'cues: (.*)$', row['expected_behavior'])
        if cues:
            for cue in [c.strip() for c in cues[0].split(',') if c.strip()]:
                if cue and cue not in r['body'] and cue not in p.body_text:
                    issues.append(f'missing expected cue: {cue}')
    # stale URL/brand checks
    body_low=r['body'].lower()
    if 'https://stanley-systems.com/workflow-audit' in body_low:
        issues.append('contains stale absolute workflow-audit URL')
    if '/how-the-assessment-works' in body_low and row['id'] not in ('REDIRECT-ASSESSMENT',):
        issues.append('contains stale how-the-assessment-works path')
    # Head links quick smoke for main public HTML pages only
    broken=[]
    if r['code']==200 and not path.endswith(('.txt','.md','.xml')) and row['area'] not in ('Public hygiene','Protected app'):
        for href in p.links[:80]:
            u=internal_url(href)
            if not u: continue
            # skip anchors query-heavy special APIs
            h=fetch(u, method='HEAD')
            if h['code'] in (0,404,500,502,503): broken.append(f'{h["code"]} {u}')
            if len(broken)>=5: break
    if broken: issues.append('broken internal links: '+ '; '.join(broken))
    return issues, f'code={r["code"]} final={r["url"]} title={p.title[:80]} links={len(p.links)} inputs={len(p.inputs)}'

def run_tests():
    rows=load_rows(); issue_rows=[]
    for r in rows:
        issues, result = test_route(r)
        r['last_result']=result
        if issues:
            r['status']='Fail'; r['issues']=' | '.join(issues); r['retest_status']=''
            issue_rows.append(r)
        else:
            r['status']='Pass'; r['issues']=''; r['retest_status']='Pass'
    write_csv(rows)
    counts={}
    for r in rows: counts[r['status']]=counts.get(r['status'],0)+1
    REPORT_PATH.write_text('# Stanley Systems Website User Story QA Report\n\n'+f'Total stories: {len(rows)}\n\nStatus counts: {counts}\n\n## Failures\n\n'+'\n'.join(f"- **{r['id']}** {r['feature']}: {r['issues']}" for r in issue_rows)+'\n')
    print(json.dumps({'total':len(rows),'counts':counts,'failures':[{k:r[k] for k in ['id','feature','paths','issues']} for r in issue_rows[:60]]}, indent=2))
    return 1 if issue_rows else 0

if __name__=='__main__':
    if len(sys.argv)>1 and sys.argv[1]=='init':
        rows=build_stories(); write_csv(rows); print(f'wrote {len(rows)} stories to {CSV_PATH}')
    else:
        sys.exit(run_tests())
