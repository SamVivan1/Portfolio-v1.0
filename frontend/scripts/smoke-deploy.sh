#!/usr/bin/env bash
# Post-deploy smoke checks for the portfolio container.
# Usage: bash scripts/smoke-deploy.sh [base-url] [canonical-origin]

set -eu

BASE_URL="${1:-http://localhost:3003}"
EXPECTED_ORIGIN="${2:-https://samvivan.my.id}"

fail() {
  echo "SMOKE FAIL: $*" >&2
  exit 1
}

if [ "${SMOKE_FORCE_FAIL:-0}" = "1" ]; then
  fail "forced failure for the rollback drill"
fi

check_200() {
  local path="$1"
  local code
  code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 15 "$BASE_URL$path") \
    || fail "request failed for $path"
  [ "$code" = "200" ] || fail "$path returned $code"
  echo "ok $path"
}

for path in / /homelab /resume /projects/lyra /projects/portfolio /robots.txt /sitemap.xml; do
  check_200 "$path"
done

curl -fsS --max-time 15 "$BASE_URL/sitemap.xml" \
  | grep -Fq "<loc>$EXPECTED_ORIGIN</loc>" \
  || fail "sitemap does not contain $EXPECTED_ORIGIN"
echo "ok sitemap origin"

curl -fsS --max-time 15 "$BASE_URL/" \
  | grep -Fq "rel=\"canonical\" href=\"$EXPECTED_ORIGIN\"" \
  || fail "home canonical does not contain $EXPECTED_ORIGIN"
echo "ok canonical origin"

for audio in night-base night-rain night-hum night-workshop night-roof; do
  audio_code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 20 \
    -r 0-1023 "$BASE_URL/assets/audio/$audio.mp3") \
    || fail "audio request failed for $audio"
  case "$audio_code" in
    200|206) echo "ok audio $audio" ;;
    *) fail "audio $audio returned $audio_code" ;;
  esac
done

echo "All smoke checks passed for $BASE_URL"
