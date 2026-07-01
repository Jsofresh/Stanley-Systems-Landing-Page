#!/usr/bin/env python3
"""Live acceptance/stress checks for Stanley website -> Hermes Company Brain bridge.

Runs against https://stanley-systems.com and uses non-production portal personas.
No provider writes are requested; tests check thin chat, Hermes continuity, session isolation,
and stale-proof contamination.
"""
import concurrent.futures
import json
import pathlib
import random
import subprocess
import sys
import tempfile
import time

BASE = "https://stanley-systems.com"
PASSWORD = "stanley-test"
USERS = [
    ("sarah.owner@bayview.test", "sarah"),
    ("mike.dispatch@bayview.test", "mike"),
    ("lisa.accounting@bayview.test", "lisa"),
]
LOG = pathlib.Path("/tmp/hermes_bridge_stress_log.jsonl")


def run(cmd, timeout=260):
    result = subprocess.run(cmd, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=timeout)
    if result.returncode:
        raise RuntimeError(result.stderr or result.stdout)
    return result.stdout


def login(email):
    jar = tempfile.NamedTemporaryFile(delete=False).name
    out = run([
        "curl", "-sS", "-c", jar, "-X", "POST", f"{BASE}/api/portal/login",
        "-H", "content-type: application/json",
        "--data", json.dumps({"email": email, "password": PASSWORD}),
    ], timeout=60)
    data = json.loads(out)
    if data.get("ok") is not True:
        raise AssertionError(data)
    return jar


def chat(jar, conversation_id, message):
    out = run([
        "curl", "-sS", "-b", jar, "-X", "POST", f"{BASE}/api/company-brain/brain/chat",
        "-H", "content-type: application/json",
        "--data", json.dumps({"conversation_id": conversation_id, "message": message}),
    ], timeout=260)
    return json.loads(out)


def one_case(round_index, email, label):
    jar = login(email)
    conv = f"swarm-{label}-{round_index}-{int(time.time() * 1000)}"
    token = f"TOK_{label}_{round_index}_{random.randint(10000, 99999)}"
    observed = []
    r1 = chat(jar, conv, f"  Remember this exact token: {token}. Reply only ACK_{round_index}.  ")
    observed.append(["ack", r1.get("answer", "")])
    r2 = chat(jar, conv, "What exact token did I just give you? Reply only token.")
    observed.append(["recall", r2.get("answer", "")])
    if token not in r2.get("answer", ""):
        return {"status": "FAIL", "case": "recall", "email": email, "conversation_id": conv, "expected": token, "observed": observed}
    r3 = chat(jar, conv, "proof")
    observed.append(["proof", r3.get("answer", "")])
    if any(x in r3.get("answer", "").lower() for x in ["casey delta", "swagstreet", "driftwood"]):
        return {"status": "FAIL", "case": "proof_contamination", "email": email, "conversation_id": conv, "observed": observed}
    r4 = chat(jar, conv, "Say exactly STILL_ON_HERMES")
    observed.append(["exact", r4.get("answer", "")])
    if "STILL_ON_HERMES" not in r4.get("answer", ""):
        return {"status": "FAIL", "case": "exact", "email": email, "conversation_id": conv, "observed": observed}
    return {"status": "PASS", "email": email, "conversation_id": conv, "observed": observed}


def run_rounds(rounds):
    failures = []
    results = []
    for round_index in range(rounds):
        with concurrent.futures.ThreadPoolExecutor(max_workers=len(USERS)) as pool:
            round_results = list(pool.map(lambda item: one_case(round_index, item[0], item[1]), USERS))
        for item in round_results:
            item["round"] = round_index
            item["ts"] = time.time()
            results.append(item)
            LOG.open("a", encoding="utf-8").write(json.dumps(item) + "\n")
            print(json.dumps(item))
            if item["status"] == "FAIL":
                failures.append(item)
        if failures:
            break
    return {"summary": "FAIL" if failures else "PASS", "rounds": rounds, "cases": len(results), "failures": failures, "log": str(LOG)}


if __name__ == "__main__":
    rounds = int(sys.argv[1]) if len(sys.argv) > 1 else 2
    summary = run_rounds(rounds)
    print(json.dumps(summary, indent=2))
    if summary["summary"] != "PASS":
        sys.exit(1)
