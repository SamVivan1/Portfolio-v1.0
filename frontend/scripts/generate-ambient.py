#!/usr/bin/env python3
"""Generate the ambient loop for "A Night in the Homelab".

The track is synthesized from scratch so it can be shipped without a
third-party license. It is built on a 64-second circular buffer: every
tonal tail, delay, and reverb wraps to the start, which makes the loop
seamless. The palette is intentionally quiet: warm minor-ninth pads,
soft rain, a distant server hum, sparse music-box notes, and a little
tape crackle.

Run with numpy available:
    python3 scripts/generate-ambient.py /tmp/homelab-night.wav
Then encode:
    ffmpeg -i /tmp/homelab-night.wav -af loudnorm=I=-21:TP=-3 \
      -c:a libmp3lame -b:a 160k homelab-night.mp3
"""

from __future__ import annotations

import sys
import wave
from pathlib import Path

import numpy as np

SR = 44_100
DURATION = 64.0
N = int(SR * DURATION)
RNG = np.random.default_rng(20261109)

# A minor 9 / F major 7 / C major 7 / G6. Each chord owns 16 seconds.
CHORDS = [
    [45, 52, 55, 59, 60],  # A2 E3 G3 B3 C4
    [41, 48, 52, 57, 60],  # F2 C3 E3 A3 C4
    [48, 55, 59, 64, 67],  # C3 G3 B3 E4 G4
    [43, 50, 54, 59, 64],  # G2 D3 F#3 B3 E4
]


def midi_to_hz(note: float) -> float:
    return 440.0 * 2.0 ** ((note - 69.0) / 12.0)


def add_wrap(buf: np.ndarray, start: int, signal: np.ndarray, gain: float = 1.0,
             pan: float = 0.0) -> None:
    """Add a mono signal into a stereo circular buffer, wrapping the tail."""
    start %= N
    length = len(signal)
    # Equal-power pan, -1 = left, +1 = right.
    angle = (pan + 1.0) * np.pi / 4.0
    left = np.cos(angle) * gain
    right = np.sin(angle) * gain

    first = min(length, N - start)
    buf[start:start + first, 0] += signal[:first] * left
    buf[start:start + first, 1] += signal[:first] * right
    remainder = length - first
    if remainder > 0:
        buf[:remainder, 0] += signal[first:] * left
        buf[:remainder, 1] += signal[first:] * right


def periodic_noise(shape_fn) -> np.ndarray:
    """Stereo noise built in the frequency domain, so it loops perfectly."""
    freqs = np.fft.rfftfreq(N, 1.0 / SR)
    out = np.empty((N, 2), dtype=np.float64)
    for channel in range(2):
        phase = RNG.uniform(0.0, 2.0 * np.pi, len(freqs))
        spectrum = np.exp(1j * phase) * shape_fn(freqs)
        spectrum[0] = 0.0
        out[:, channel] = np.fft.irfft(spectrum, N)
    peak = np.max(np.abs(out))
    return out / max(peak, 1e-9)


def smoothstep(x: np.ndarray) -> np.ndarray:
    x = np.clip(x, 0.0, 1.0)
    return x * x * (3.0 - 2.0 * x)


def pad_note(freq: float, length: float, detune: float) -> np.ndarray:
    t = np.arange(int(length * SR), dtype=np.float64) / SR
    # Warm additive voice: fundamental plus a few rolled-off harmonics.
    voice = np.zeros_like(t)
    for harmonic in range(1, 7):
        amp = 1.0 / (harmonic ** 1.65)
        voice += amp * np.sin(
            2.0 * np.pi * freq * harmonic * (1.0 + detune) * t
            + harmonic * 0.7
        )
    # Very slow vibrato keeps it from sounding like a static organ.
    voice *= 1.0 + 0.05 * np.sin(2.0 * np.pi * 0.07 * t + freq)
    return voice


def pad_bus() -> np.ndarray:
    bus = np.zeros((N, 2), dtype=np.float64)
    for index, chord in enumerate(CHORDS):
        start = int(index * 16.0 * SR)
        sustain = 15.0
        release = 5.0
        length = sustain + release
        t = np.arange(int(length * SR), dtype=np.float64) / SR
        attack = smoothstep(t / 3.8)
        tail = np.clip((length - t) / release, 0.0, 1.0)
        envelope = attack * smoothstep(tail)
        for voice_index, note in enumerate(chord):
            freq = midi_to_hz(note)
            signal = pad_note(freq, length, 0.0015 if voice_index % 2 == 0 else -0.0015)
            signal *= envelope
            pan = (-0.55 + 0.28 * voice_index) * (1.0 if voice_index % 2 == 0 else -1.0)
            add_wrap(bus, start, signal, gain=0.048, pan=float(np.clip(pan, -0.8, 0.8)))
            if note < 52:
                shimmer = pad_note(freq * 2.0, length, -0.001)
                shimmer *= envelope
                add_wrap(bus, start, shimmer, gain=0.016,
                         pan=float(np.clip(-pan * 0.7, -0.8, 0.8)))
    return bus


def bass_bus() -> np.ndarray:
    bus = np.zeros((N, 2), dtype=np.float64)
    roots = [45, 41, 48, 43]
    for index, note in enumerate(roots):
        start = int(index * 16.0 * SR)
        length = 18.0
        t = np.arange(int(length * SR), dtype=np.float64) / SR
        freq = midi_to_hz(note)
        envelope = smoothstep(t / 3.0) * smoothstep((length - t) / 4.0)
        signal = (
            np.sin(2.0 * np.pi * freq * t)
            + 0.18 * np.sin(2.0 * np.pi * freq * 2.0 * t)
            + 0.06 * np.sin(2.0 * np.pi * freq * 3.0 * t)
        )
        signal *= envelope * (1.0 + 0.04 * np.sin(2.0 * np.pi * t / 16.0))
        add_wrap(bus, start, signal, gain=0.038, pan=0.0)
    return bus


def bells_bus(delay_bus: np.ndarray) -> np.ndarray:
    bus = np.zeros((N, 2), dtype=np.float64)
    melody = [
        (3.8, 76, 0.136, -0.35),
        (9.5, 79, 0.112, 0.30),
        (14.2, 74, 0.099, 0.55),
        (21.0, 81, 0.128, -0.25),
        (27.5, 79, 0.093, 0.40),
        (33.0, 76, 0.090, -0.50),
        (39.4, 84, 0.106, 0.20),
        (45.0, 81, 0.115, 0.45),
        (50.7, 79, 0.090, -0.35),
        (57.0, 76, 0.106, 0.10),
    ]
    for when, note, gain, pan in melody:
        freq = midi_to_hz(note)
        length = 7.0
        t = np.arange(int(length * SR), dtype=np.float64) / SR
        attack = smoothstep(t / 0.012)
        decay = np.exp(-t / 1.55)
        signal = (
            np.sin(2.0 * np.pi * freq * t)
            + 0.42 * np.sin(2.0 * np.pi * freq * 2.01 * t)
            + 0.18 * np.sin(2.0 * np.pi * freq * 3.02 * t)
        ) * attack * decay
        add_wrap(bus, int(when * SR), signal, gain=gain, pan=pan)
        # Three soft echoes, falling away, wrapped into the loop.
        for echo in range(1, 4):
            tap = signal * (0.32 ** echo)
            offset = int((when + 0.75 * echo) * SR)
            add_wrap(delay_bus, offset, tap, gain=gain * 0.55,
                     pan=-pan * (0.6 + 0.2 * echo))
    return bus


def rain_bus() -> np.ndarray:
    def shape(freqs: np.ndarray) -> np.ndarray:
        safe = np.maximum(freqs, 1.0)
        highpass = smoothstep((safe - 180.0) / 500.0)
        lowpass = 1.0 / (1.0 + (safe / 7800.0) ** 3.2)
        pink = 1.0 / np.sqrt(safe / 1000.0)
        return highpass * lowpass * pink

    noise = periodic_noise(shape)
    slow = 0.82 + 0.18 * np.sin(2.0 * np.pi * np.arange(N) / N * 2.0 + 0.4)
    rain = noise * slow[:, None]

    # Individual drops make it read as rain rather than radio static.
    drops = np.zeros((N, 2), dtype=np.float64)
    for _ in range(70):
        when = RNG.uniform(0.0, DURATION)
        freq = RNG.uniform(900.0, 3200.0)
        length = RNG.uniform(0.035, 0.11)
        t = np.arange(int(length * SR), dtype=np.float64) / SR
        signal = np.sin(2.0 * np.pi * freq * t) * np.exp(-t / (length * 0.28))
        signal *= smoothstep(t / 0.003)
        add_wrap(drops, int(when * SR), signal,
                 gain=RNG.uniform(0.0015, 0.0045), pan=RNG.uniform(-0.8, 0.8))

    return rain * 0.128 + drops * 2.2


def hum_bus() -> np.ndarray:
    t = np.arange(N, dtype=np.float64) / SR
    hum = np.zeros(N, dtype=np.float64)
    for freq, gain in ((55.0, 1.0), (110.0, 0.45), (165.0, 0.22), (220.0, 0.10)):
        hum += gain * np.sin(2.0 * np.pi * freq * t + freq * 0.01)
    hum *= 0.85 + 0.15 * np.sin(2.0 * np.pi * t / 16.0)
    stereo = np.stack([hum, hum * 0.96], axis=1)
    return stereo * 0.011


def crackle_bus() -> np.ndarray:
    bus = np.zeros((N, 2), dtype=np.float64)
    for _ in range(46):
        when = RNG.uniform(0.0, DURATION)
        length = RNG.uniform(0.002, 0.009)
        t = np.arange(max(2, int(length * SR)), dtype=np.float64) / SR
        signal = RNG.normal(0.0, 1.0, len(t)) * np.exp(-t / (length * 0.25))
        add_wrap(bus, int(when * SR), signal,
                 gain=RNG.uniform(0.004, 0.010), pan=RNG.uniform(-0.9, 0.9))
    return bus


def reverb_impulse() -> np.ndarray:
    length = int(2.6 * SR)
    t = np.arange(length, dtype=np.float64) / SR
    decay = np.exp(-t / 0.72)
    out = np.zeros((length, 2), dtype=np.float64)
    freqs = np.fft.rfftfreq(length, 1.0 / SR)
    shape = 1.0 / (1.0 + (freqs / 5200.0) ** 2.0)
    for channel in range(2):
        phase = RNG.uniform(0.0, 2.0 * np.pi, len(freqs))
        spectrum = np.exp(1j * phase) * shape
        spectrum[0] = 0.0
        noise = np.fft.irfft(spectrum, length)
        noise /= np.max(np.abs(noise))
        out[:, channel] = noise * decay
    out[: int(0.02 * SR)] *= smoothstep(np.arange(int(0.02 * SR)) / (0.02 * SR))[:, None]
    return out


def circular_reverb(dry: np.ndarray, impulse: np.ndarray, wet: float) -> np.ndarray:
    """Convolve on a circle so the reverb tail wraps into the loop start."""
    out = np.zeros_like(dry)
    for channel in range(2):
        dry_f = np.fft.rfft(dry[:, channel], N)
        ir_f = np.fft.rfft(impulse[:, channel], N)
        convolved = np.fft.irfft(dry_f * ir_f, N)
        out[:, channel] = dry[:, channel] + wet * convolved
    return out


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("usage: generate-ambient.py output.wav")
    destination = Path(sys.argv[1])

    pad = pad_bus()
    bass = bass_bus()
    echoes = np.zeros((N, 2), dtype=np.float64)
    bells = bells_bus(echoes)
    dry = pad + bass + bells + echoes
    mixed = circular_reverb(dry, reverb_impulse(), wet=0.30)
    mixed += rain_bus()
    mixed += hum_bus()
    mixed += crackle_bus()

    # Master tilt: clear the sub, tame the low-mid, lift the air.
    freqs = np.fft.rfftfreq(N, 1.0 / SR)
    low_shelf = 0.70 + 0.30 * smoothstep((freqs - 180.0) / 360.0)
    high_shelf = 1.0 + 0.62 * smoothstep((freqs - 1200.0) / 2800.0)
    highpass = freqs ** 2 / (freqs ** 2 + 42.0 ** 2)
    eq = low_shelf * high_shelf * highpass
    for channel in range(2):
        spectrum = np.fft.rfft(mixed[:, channel])
        mixed[:, channel] = np.fft.irfft(spectrum * eq, N)

    # Keep the image wide but rooted: too much side energy sounds phasey.
    mid = mixed.mean(axis=1)
    side = (mixed[:, 0] - mixed[:, 1]) * 0.5 * 0.65
    mixed[:, 0] = mid + side
    mixed[:, 1] = mid - side

    # Gentle bus glue, then normalize with headroom.
    mixed = np.tanh(mixed * 1.15) / 1.15
    peak = np.max(np.abs(mixed))
    mixed = mixed / max(peak, 1e-9) * 0.72

    pcm = np.clip(mixed, -1.0, 1.0)
    pcm = (pcm * 32767.0).astype(np.int16)
    with wave.open(str(destination), "wb") as handle:
        handle.setnchannels(2)
        handle.setsampwidth(2)
        handle.setframerate(SR)
        handle.writeframes(pcm.tobytes())

    print(f"wrote {destination} ({DURATION:.0f}s, {SR} Hz stereo)")


if __name__ == "__main__":
    main()
