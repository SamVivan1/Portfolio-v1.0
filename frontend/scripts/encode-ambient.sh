#!/usr/bin/env bash
# Encode the five ambient layers with per-layer loudness targets.
# Usage: bash scripts/encode-ambient.sh [stem-directory] [output-directory]

set -eu

SRC="${1:-/tmp/portfolio-stems}"
OUT="${2:-public/assets/audio}"
mkdir -p "$OUT"

encode() {
  src="$1"
  dst="$2"
  target="$3"
  bitrate="$4"
  title="$5"
  ffmpeg -y -v error -i "$SRC/$src" \
    -af "loudnorm=I=$target:TP=-2" \
    -ar 48000 -c:a libmp3lame -b:a "$bitrate" \
    -metadata title="$title" \
    -metadata artist="Bintang" \
    -metadata album="Pixel Homelab Portfolio" \
    "$OUT/$dst"
  echo "encoded $dst ($target LUFS, $bitrate)"
}

encode night-base.wav night-base.mp3 -20 160k "A Night in the Homelab — Base"
encode night-rain.wav night-rain.mp3 -30 128k "A Night in the Homelab — Rain"
encode night-hum.wav night-hum.mp3 -34 112k "A Night in the Homelab — Server hum"
encode night-workshop.wav night-workshop.mp3 -31 128k "A Night in the Homelab — Workshop"
encode night-roof.wav night-roof.mp3 -32 128k "A Night in the Homelab — Roof"
