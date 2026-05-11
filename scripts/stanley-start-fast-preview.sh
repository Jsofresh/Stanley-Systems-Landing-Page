#!/usr/bin/env bash
set -euo pipefail

PORT="${STANLEY_FAST_PORT:-3233}"
HOST="${STANLEY_FAST_HOST:-127.0.0.1}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUNDIR="$ROOT/.qa/fast-preview"
PIDFILE="$RUNDIR/next-dev-$PORT.pid"
LOGFILE="$RUNDIR/next-dev-$PORT.log"
URL="http://$HOST:$PORT/"
mkdir -p "$RUNDIR"

is_alive() {
  local pid="${1:-}"
  [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null
}

if [ -f "$PIDFILE" ] && is_alive "$(cat "$PIDFILE" 2>/dev/null)"; then
  echo "fast preview already running: $URL pid=$(cat "$PIDFILE") log=$LOGFILE"
else
  # Clean stale pidfile if needed.
  rm -f "$PIDFILE"
  cd "$ROOT"
  : > "$LOGFILE"
  if [ "${STANLEY_FAST_TURBO:-1}" = "1" ]; then
    nohup npm run dev -- --turbo -H "$HOST" -p "$PORT" >"$LOGFILE" 2>&1 &
  else
    nohup npm run dev -- -H "$HOST" -p "$PORT" >"$LOGFILE" 2>&1 &
  fi
  echo $! > "$PIDFILE"
  echo "started fast preview: $URL pid=$(cat "$PIDFILE") log=$LOGFILE"
fi

# Wait until HTTP responds. First compile can happen on first request.
for i in $(seq 1 80); do
  code="$(curl -L -s -o /tmp/stanley-fast-preview-$PORT.html -w '%{http_code}' "$URL" || true)"
  if [ "$code" = "200" ]; then
    echo "ready: $URL"
    exit 0
  fi
  if [ -f "$LOGFILE" ] && grep -qE 'EADDRINUSE|Error:' "$LOGFILE"; then
    echo "fast preview failed; tailing log:" >&2
    tail -80 "$LOGFILE" >&2
    exit 1
  fi
  sleep 1
done

echo "fast preview did not become ready; tailing log:" >&2
tail -120 "$LOGFILE" >&2
exit 1
