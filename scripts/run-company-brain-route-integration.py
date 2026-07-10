#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import secrets
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
from pathlib import Path


def read_dotenv_value(path: Path, key: str) -> str | None:
    if not path.exists():
        return None
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line or line.lstrip().startswith("#") or "=" not in line:
            continue
        name, value = line.split("=", 1)
        if name.strip() == key:
            return value.strip().strip('"').strip("'")
    return None


def wait_for_server(base_url: str, process: subprocess.Popen[str]) -> None:
    deadline = time.time() + 60
    last_error = "not_started"
    while time.time() < deadline:
        if process.poll() is not None:
            raise RuntimeError(f"candidate_server_exited:{process.returncode}")
        try:
            with urllib.request.urlopen(f"{base_url}/login", timeout=2) as response:
                if response.status == 200:
                    return
        except (urllib.error.URLError, TimeoutError) as exc:
            last_error = type(exc).__name__
        time.sleep(0.25)
    raise RuntimeError(f"candidate_server_unready:{last_error}")


def main() -> int:
    if len(sys.argv) != 2:
        raise SystemExit("usage: run-company-brain-route-integration.py <dist-dir>")

    root = Path(__file__).resolve().parents[1]
    private_path = Path(os.environ.get("PORTAL_ROUTE_TEST_PRIVATE_FILE") or "/tmp/stanley-route-test.private.json")
    private = json.loads(private_path.read_text(encoding="utf-8"))
    credential = str(private["credential"])
    email = str(private["email"])
    password = str(private["password"])

    temp_root = Path(tempfile.mkdtemp(prefix="stanley-portal-route-test-"))
    store_dir = temp_root / "sessions"
    store_dir.mkdir(mode=0o700)
    port = int(os.environ.get("PORTAL_ROUTE_TEST_PORT") or "4012")
    base_url = f"http://localhost:{port}"
    log_path = temp_root / "candidate.log"

    env = os.environ.copy()
    env.update(
        {
            "NODE_ENV": "production",
            "STANLEY_NEXT_DIST_DIR": sys.argv[1],
            "PORTAL_SESSION_SECRET": secrets.token_urlsafe(48),
            "PORTAL_SESSION_STORE_DIR": str(store_dir),
            "PORTAL_SESSION_DEPLOYMENT_MODE": "single-host-shared-filesystem",
            "PORTAL_AUTH_CREDENTIALS_JSON": json.dumps({email: credential}, separators=(",", ":")).replace("$", r"\$"),
            "COMPANY_BRAIN_UPSTREAM_URL": "https://brain-test.stanley-systems.com",
        }
    )
    proxy_key = read_dotenv_value(root / ".env.local", "COMPANY_BRAIN_PROXY_KEY")
    if proxy_key:
        env["COMPANY_BRAIN_PROXY_KEY"] = proxy_key

    with log_path.open("w", encoding="utf-8") as log_file:
        process = subprocess.Popen(
            [str(root / "node_modules/.bin/next"), "start", "-p", str(port), "-H", "127.0.0.1"],
            cwd=root,
            env=env,
            stdout=log_file,
            stderr=subprocess.STDOUT,
            text=True,
        )
        try:
            wait_for_server(base_url, process)
            test_env = env.copy()
            test_env.update(
                {
                    "TEST_BASE_URL": base_url,
                    "PORTAL_TEST_EMAIL": email,
                    "PORTAL_TEST_PASSWORD": password,
                    "PORTAL_SESSION_STORE_DIR": str(store_dir),
                }
            )
            completed = subprocess.run(
                ["node", "scripts/company-brain-route-integration-tests.mjs"],
                cwd=root,
                env=test_env,
                text=True,
                capture_output=True,
                timeout=120,
            )
            if completed.returncode != 0:
                print(completed.stdout[-4000:])
                print(completed.stderr[-4000:], file=sys.stderr)
                return completed.returncode
            print(completed.stdout.strip())
            return 0
        finally:
            process.terminate()
            try:
                process.wait(timeout=10)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait(timeout=5)
            shutil.rmtree(temp_root, ignore_errors=True)


if __name__ == "__main__":
    raise SystemExit(main())
