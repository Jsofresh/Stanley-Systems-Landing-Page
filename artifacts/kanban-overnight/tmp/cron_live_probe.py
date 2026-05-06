import subprocess, pathlib, re, time
routes = [
  'https://stanley-systems.com/',
  'https://stanley-systems.com/pricing',
  'https://stanley-systems.com/contact',
  'https://stanley-systems.com/invoicing-delay-cash-flow-calculator',
  'https://www.stanley-systems.com/',
  'https://www.stanley-systems.com/pricing',
]
ts = time.strftime('%Y%m%dT%H%M%SZ', time.gmtime())
outdir = pathlib.Path('artifacts/kanban-overnight/tmp')
outdir.mkdir(parents=True, exist_ok=True)
for i, url in enumerate(routes, 1):
    dest = outdir / f'cron_{ts}_route_{i}.html'
    p = subprocess.run(['curl','-L','--max-time','20','-sS','-o',str(dest),'-w','%{http_code}',url], text=True, capture_output=True)
    code = (p.stdout or '').strip() or '000'
    text = dest.read_text(errors='ignore') if dest.exists() else ''
    title = re.search(r'<title[^>]*>(.*?)</title>', text, re.I|re.S)
    title_s = re.sub(r'\s+', ' ', title.group(1)).strip()[:120] if title else ''
    app_err = bool(re.search(r'Application error|Internal Server Error|This page could not be found', text, re.I))
    err = (p.stderr or '').strip().replace('\n', ' ')[:160]
    print(f'{url} status={code} title={title_s!r} app_error={app_err} bytes={len(text)} curl_rc={p.returncode} err={err!r}')
