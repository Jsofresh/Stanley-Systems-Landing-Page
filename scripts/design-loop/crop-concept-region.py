#!/usr/bin/env python3
"""Crop a selected GPT Image section-concept region when Pillow is already available.

This helper is intentionally lightweight:
- no sudo
- no system packages
- no dependency installation
- exits with a clear blocker if Pillow is unavailable

Usage:
  python3 scripts/design-loop/crop-concept-region.py \
    --input concept-board.png \
    --output concept-02-selected-region.png \
    --box 120,80,880,940

Box format is left,top,right,bottom in source-image pixels.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


def parse_box(raw: str) -> tuple[int, int, int, int]:
    parts = [part.strip() for part in raw.split(",")]
    if len(parts) != 4:
        raise argparse.ArgumentTypeError("--box must be left,top,right,bottom")
    try:
        left, top, right, bottom = [int(part) for part in parts]
    except ValueError as exc:
        raise argparse.ArgumentTypeError("--box values must be integers") from exc
    if right <= left or bottom <= top:
        raise argparse.ArgumentTypeError("--box must have right > left and bottom > top")
    return left, top, right, bottom


def main() -> int:
    parser = argparse.ArgumentParser(description="Crop a selected region from a GPT Image concept board if Pillow is available.")
    parser.add_argument("--input", required=True, help="Input PNG/JPG path")
    parser.add_argument("--output", required=True, help="Output image path")
    parser.add_argument("--box", required=True, type=parse_box, help="Crop box: left,top,right,bottom")
    args = parser.parse_args()

    try:
        from PIL import Image  # type: ignore
    except ModuleNotFoundError:
        sys.stderr.write(
            "Pillow is not installed. Composite concept boards must fail concept review and be regenerated, "
            "unless a standalone crop is created by an already-available local tool.\n"
        )
        return 2

    input_path = Path(args.input).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()
    if not input_path.exists():
        sys.stderr.write(f"Input image not found: {input_path}\n")
        return 1

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(input_path) as image:
        width, height = image.size
        left, top, right, bottom = args.box
        if left < 0 or top < 0 or right > width or bottom > height:
            sys.stderr.write(f"Crop box {args.box} is outside image bounds {width}x{height}.\n")
            return 1
        cropped = image.crop((left, top, right, bottom))
        cropped.save(output_path)
        manifest = {
            "input": str(input_path),
            "output": str(output_path),
            "source_size": {"width": width, "height": height},
            "box": {"left": left, "top": top, "right": right, "bottom": bottom},
            "output_size": {"width": right - left, "height": bottom - top},
            "tool": "Pillow",
        }
        manifest_path = output_path.with_suffix(output_path.suffix + ".crop-manifest.json")
        manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
        print(json.dumps(manifest, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
