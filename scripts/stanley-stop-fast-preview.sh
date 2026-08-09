#!/usr/bin/env bash
set -euo pipefail
PORT="${STANLEY_FAST_PORT:-3233}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PIDFILE="$ROOT/.qa/fast-preview/next-dev-$PORT.pid"
PIDS=""
if [ -f "$PIDFILE" ]; then
  PIDS="$PIDS $(cat "$PIDFILE" 2>/dev/null || true)"
fi
# Include any local Next dev/next-server process bound to the fast preview port.
if command -v lsof >/dev/null 2>&1; then
  PIDS="$PIDS $(lsof -tiTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)"
else
  PIDS="$PIDS $(ss -ltnp 2>/dev/null | awk -v port=":$PORT" '$4 ~ port {gsub(/.*pid=/,"",$NF); gsub(/,.*/,"",$NF); print $NF}' || true)"
fi
# Include direct next dev command lines for this port.
PIDS="$PIDS $(pgrep -f "next dev .* -p $PORT|next dev .*--port $PORT" 2>/dev/null || true)"
PIDS="$(printf '%s\n' $PIDS | awk 'NF && !seen[$1]++')"
if [ -z "$PIDS" ]; then
  echo "no fast preview process found for port $PORT"
  rm -f "$PIDFILE"
  exit 0
fi
for PID in $PIDS; do
  if kill -0 "$PID" 2>/dev/null; then
    kill "$PID" 2>/dev/null || true
  fi
done
sleep 1
for PID in $PIDS; do
  if kill -0 "$PID" 2>/dev/null; then
    kill -9 "$PID" 2>/dev/null || true
  fi
done
rm -f "$PIDFILE"
echo "stopped fast preview port=$PORT pids=$(echo $PIDS | tr '\n' ' ')"
