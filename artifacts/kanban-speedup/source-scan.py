from pathlib import Path
import re, json
root=Path('.').resolve()
include_roots=[root/'app', root/'components', root/'lib'/'pricing']
exclude_parts={'.next','node_modules','artifacts','app/dev','app/api','app/remotion','remotion'}
files=[]
for base in include_roots:
    if not base.exists(): continue
    for p in base.rglob('*'):
        if p.suffix not in {'.tsx','.ts','.mdx'}: continue
        rel=str(p.relative_to(root))
        if rel.startswith('app/dev/') or rel.startswith('app/api/') or rel.startswith('app/remotion/') or rel.startswith('remotion/'):
            continue
        files.append(p)
terms=['Cash Flow Collection System','Repeat Revenue System','Repeat Revenue System','Cash Flow Collection System','Stanley Systems']
forbidden={
 'Hermes':re.compile(r'\bHermes\b',re.I),
 'Codex':re.compile(r'\bCodex\b',re.I),
 'Stanley H':re.compile(r'\bStanley H\b'),
 'OpenClaw':re.compile(r'\bOpenClaw\b',re.I),
 'n8n':re.compile(r'\bn8n\b',re.I),
 'QBO':re.compile(r'\bQBO\b'),
 'HCP':re.compile(r'\bHCP\b'),
 'Twilio':re.compile(r'\bTwilio\b',re.I),
 'free/no-cost Follow-Up guarantee':re.compile(r'(?:free|no[- ]cost)[^\n.]{0,120}Follow-Up|Follow-Up[^\n.]{0,120}(?:free|no[- ]cost)',re.I),
 'Stanley alone':re.compile(r'\bStanley\b(?! Systems|-systems)')
}
dollar_re=re.compile(r'\$\s?\d[\d,.]*(?:\s?[Kk])?(?:\s?[-–—]\s?\$?\s?\d[\d,.]*(?:\s?[Kk])?)?')
res={'files_scanned':len(files),'terms':{t:[] for t in terms},'forbidden':{k:[] for k in forbidden},'dollars':[]}
for p in files:
    rel=str(p.relative_to(root))
    try: lines=p.read_text(errors='ignore').splitlines()
    except Exception: continue
    for i,line in enumerate(lines,1):
        for t in terms:
            if t in line:
                res['terms'][t].append({'path':rel,'line':i,'text':line.strip()})
        for name,rx in forbidden.items():
            if rx.search(line):
                res['forbidden'][name].append({'path':rel,'line':i,'text':line.strip()})
        if dollar_re.search(line):
            res['dollars'].append({'path':rel,'line':i,'text':line.strip(),'matches':dollar_re.findall(line)})
Path('artifacts/kanban-speedup/source-scan.json').write_text(json.dumps(res,indent=2))
print(json.dumps({
 'files_scanned':res['files_scanned'],
 'terms_counts':{k:len(v) for k,v in res['terms'].items()},
 'forbidden_counts':{k:len(v) for k,v in res['forbidden'].items() if v},
 'dollar_count':len(res['dollars'])
},indent=2))
