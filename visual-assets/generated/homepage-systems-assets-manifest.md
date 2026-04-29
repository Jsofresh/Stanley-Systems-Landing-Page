# Homepage Systems Assets Manifest

Status: no generated assets approved for implementation in this first Codex pass.

Decision: Codex should build the Cashflow Control System and Customer Revenue System visuals directly with React, Tailwind, and SVG. This avoids waiting on generated assets that came back as RGB/checkerboard backgrounds or had visual artifacts.

## Approved assets

None for this pass.

## Rejected candidates

Candidate folder:

`/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/visual-assets/generated/homepage-systems-candidates/`

- `cashflow-green-cash-arrow-1.png`: rejected. Good concept, but small artifact/fake-text-like mark and not true alpha transparency.
- `cashflow-leak-puddle-1.png`: rejected. Visible square/background panel, not a clean website layer.
- `cashflow-leak-puddle-2.png`: rejected. Pipe hardware and blood-like/icon-like red liquid treatment.
- `customer-revenue-green-arrow-1.png`: directionally acceptable, but not approved for implementation because file exported RGB with checkerboard-style background rather than true alpha transparency.
- `customer-revenue-green-arrow-2.png`: rejected. Weaker than variant 1 and transparency/background concern.
- `customer-revenue-flywheel-glow-1.png`: rejected. Artifacts, too bright/high contrast, and background concern.
- `customer-revenue-flywheel-glow-2.png`: directionally acceptable, but not approved for implementation because file exported RGB with checkerboard-style background rather than true alpha transparency.

## Asset limitations

The usable candidates need transparency cleanup or regeneration before production use. Do not consume these candidate files in the website.

## Mobile usage

No generated assets are required on mobile. Codex should simplify diagrams with DOM/SVG responsive layouts.

## Codex instruction

Use no generated image assets for the first implementation pass. Build visual richness with Tailwind, SVG gradients, soft glows, icon wells, and DOM/SVG decorative shapes. Keep every important label and number as DOM text.
