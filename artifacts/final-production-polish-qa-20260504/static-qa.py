#!/usr/bin/env python3
from pathlib import Path
import re, json
root = Path.cwd()
artifact = root / 'artifacts/final-production-polish-qa-20260504'
public_dirs = ['app', 'components', 'lib']
exclude_parts = {'dev', 'api', 'sections', 'artifacts', 'docs', 'remotion', 'node_modules', '.next', '.git'}
include_ext = {'.tsx', '.ts', '.jsx', '.js', '.mdx'}
files = []
for top in public_dirs:
    base = root / top
    if not base.exists():
        continue
    for p in base.rglob('*'):
        if not p.is_file() or p.suffix not in include_ext:
            continue
        rel_parts = p.relative_to(root).parts
        if any(part in exclude_parts for part in rel_parts):
            continue
        files.append(p)

checks = [
    ('stripe_or_checkout', re.compile(r'\bStripe\b|stripe\.com|checkout\.stripe|stripe checkout|loadStripe|STRIPE_', re.I)),
    ('old_price_297', re.compile(r'\$\s*297\b')),
    ('old_price_147', re.compile(r'\$\s*147\b')),
    ('free_no_cost_system_guarantee', re.compile(r'\bfree\s+(Repeat Revenue System|system|implementation)|no[- ]cost\s+(Repeat Revenue System|system|implementation)', re.I)),
    ('old_cashflow_control_system', re.compile(r'Cash Flow Collection System', re.I)),
    ('old_customer_revenue_system', re.compile(r'Repeat Revenue System', re.I)),
    ('internal_agent_names', re.compile(r'\bHermes\b|\bCodex\b|OpenClaw|Stanley H|\bn8n\b|\bQBO\b|HCP API|QuickBooks API|Housecall Pro API', re.I)),
    ('secret_literal_patterns', re.compile(r'sk_live_[A-Za-z0-9]|sk_test_[A-Za-z0-9]|pk_live_[A-Za-z0-9]|xox[baprs]-|ghp_[A-Za-z0-9]|AIza[0-9A-Za-z_-]{20,}|client_secret\s*[:=]\s*["\'][^"\']+', re.I)),
]

hits = []
for p in files:
    text = p.read_text(errors='ignore')
    for label, rx in checks:
        for m in rx.finditer(text):
            line_no = text.count('\n', 0, m.start()) + 1
            line = text.splitlines()[line_no-1].strip()[:240]
            hits.append({'check': label, 'path': str(p.relative_to(root)), 'line': line_no, 'match': m.group(0), 'source_line': line})

# Visual-kit import/use evidence for homepage/pricing mounted sections.
visual_evidence = []
for p in files:
    rel = str(p.relative_to(root))
    text = p.read_text(errors='ignore')
    if 'visual-kit' in text or 'display-assets' in text or 'mini-features' in text:
        visual_evidence.append(rel)

# Public env files are not opened. Just verify no protected env files were changed in git status.
import subprocess
status = subprocess.run(['git', 'status', '--short'], cwd=root, text=True, capture_output=True, check=False).stdout.splitlines()
protected_status = [line for line in status if re.search(r'(^|/)(\.env|ecosystem\.config|pm2|nginx|caddy|secrets?)', line, re.I)]

result = {
    'files_scanned': len(files),
    'hits': hits,
    'visual_kit_source_evidence_files': sorted(set(visual_evidence)),
    'protected_status_matches': protected_status,
    'passed': not hits and not protected_status,
}
(artifact / 'static-qa-results.json').write_text(json.dumps(result, indent=2))
lines = [
    f"files_scanned={len(files)}",
    f"hits={len(hits)}",
    f"visual_kit_source_evidence_files={len(set(visual_evidence))}",
    f"protected_status_matches={len(protected_status)}",
    f"passed={result['passed']}",
]
for h in hits[:50]:
    lines.append(f"HIT {h['check']} {h['path']}:{h['line']} {h['match']} :: {h['source_line']}")
for h in protected_status:
    lines.append(f"PROTECTED_STATUS {h}")
(artifact / 'static-qa-summary.txt').write_text('\n'.join(lines) + '\n')
print('\n'.join(lines))
if not result['passed']:
    raise SystemExit(1)
