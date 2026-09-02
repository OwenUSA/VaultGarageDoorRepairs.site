#!/usr/bin/env bash
# Sequential few-shot chain: one Claude Code session, resumed per prompt.
# Each prompt fully finishes before the next begins.

set -u

ROOT="/c/Users/santi/OneDrive/Documents/web projects/owen/garage-websites/vaultgaragedoorrepairs.site"
cd "$ROOT" || exit 1

P="$ROOT/.run/prompts"
L="$ROOT/.run/logs"
mkdir -p "$L"
SIDFILE="$ROOT/.run/session-id"

# ---- single-instance lock -------------------------------------------------
# A killed wrapper can leave its child chain alive. Without this, relaunching
# races two runners resuming the SAME session id against the same repo.
LOCK="$ROOT/.run/chain.lock"
if ! mkdir "$LOCK" 2>/dev/null; then
  echo "[ABORT] another chain runner holds $LOCK — refusing to start a second."
  echo "        If no runner is alive, remove that directory and retry."
  exit 99
fi
echo "$$" > "$LOCK/pid"
cleanup() { rm -rf "$LOCK"; }
trap cleanup EXIT INT TERM
# ---------------------------------------------------------------------------

if [ ! -f "$SIDFILE" ]; then
  python -c "import uuid;print(uuid.uuid4())" > "$SIDFILE" 2>/dev/null \
    || powershell -NoProfile -Command "[guid]::NewGuid().ToString()" | tr -d '\r' > "$SIDFILE"
fi
SID="$(tr -d '\r\n' < "$SIDFILE")"

STEPS="p1 p2 p_gate p3 p4 p5 p6 p7 p8"

for s in $STEPS; do
  if [ -f "$L/$s.done" ]; then
    echo "[skip] $s already complete"
    continue
  fi

  echo "=============================================================="
  echo "[start] $s   $(date '+%Y-%m-%d %H:%M:%S')"
  echo "=============================================================="

  # FRESH SESSION PER PHASE.
  # Resuming one session re-sent the whole accumulated transcript as input on
  # every step — by p4 that meant re-paying for p1's crawl output every time,
  # and the gaps between steps outlived the prompt cache. Each phase now
  # bootstraps from docs/00-BRIEF.md and the artifacts on disk instead, which
  # is a few KB rather than a few hundred.
  claude --dangerously-skip-permissions --model opus \
    -p "$(cat "$P/$s.txt")" > "$L/$s.log" 2>&1
  rc=$?

  echo "[end] $s rc=$rc   $(date '+%Y-%m-%d %H:%M:%S')"
  tail -n 40 "$L/$s.log"

  if grep -qi "session limit\|usage limit\|rate limit" "$L/$s.log" 2>/dev/null; then
    echo "[PAUSED] $s stopped on a usage limit — not a failure."
    echo "         Re-run 'bash .run/run.sh' after the reset; it resumes here."
    exit 2
  fi

  if [ "$rc" -ne 0 ]; then
    echo "[ABORT] $s exited $rc — chain stopped. Full log: $L/$s.log"
    exit "$rc"
  fi

  touch "$L/$s.done"
done

echo "=============================================================="
echo "[chain complete] all 9 steps finished $(date '+%Y-%m-%d %H:%M:%S')"
