#!/usr/bin/env python3
"""Generate the ambient loop for "A Night in the Homelab".

The layers are synthesized from scratch so they can ship without a
third-party license. Each one is a 64-second circular buffer: every tonal
tail, delay, and reverb wraps to the start, so every loop is seamless. The
base carries the warm seventh chords and sparse music-box notes; the four
textures add rain, server hum, printer rhythm, and roof crickets/fire. The
four 16-second beds move from F major 7 to C major 7, G6, and A minor 9,
so the piece opens warm and ends reflective.

Run with numpy available:
    python3 scripts/generate-ambient.py /tmp/portfolio-stems
Then encode all five layers:
    bash scripts/encode-ambient.sh /tmp/portfolio-stems
"""

from __future__ import annotations

import sys
import wave
from pathlib import Path

import numpy as np

SR = 48_000
DURATION = 64.0
N = int(SR * DURATION)
RNG = np.random.default_rng(20261109)

# A minor 9 / F major 7 / C major 7 / G6. Each chord owns 16 seconds.
CHORDS = [
    [48, 52, 57, 60],      # F major 7: C3 E3 A3 C4
    [48, 55, 59, 64, 67],  # C major 7: C3 G3 B3 E4 G4
    [50, 54, 59, 64],      # G6: D3 F#3 B3 E4
    [52, 55, 59, 60],      # A minor 9: E3 G3 B3 C4
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
    for harmonic in range(1, 13):
        amp = 1.0 / (harmonic ** 1.38)
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
            add_wrap(bus, start, signal, gain=0.043, pan=float(np.clip(pan, -0.8, 0.8)))
            shimmer = pad_note(freq * 2.0, length, -0.001)
            shimmer *= envelope
            add_wrap(bus, start, shimmer, gain=0.013,
                     pan=float(np.clip(-pan * 0.7, -0.8, 0.8)))
            if note < 52:
                high_shimmer = pad_note(freq * 4.0, length, 0.001)
                high_shimmer *= envelope
                add_wrap(bus, start, high_shimmer, gain=0.004,
                         pan=float(np.clip(pan * 0.5, -0.8, 0.8)))
    return bus


def bass_bus() -> np.ndarray:
    bus = np.zeros((N, 2), dtype=np.float64)
    roots = [41, 48, 43, 45]
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
        attack = smoothstep(t / 0.008)
        signal = np.zeros_like(t)
        partials = (
            (1.00, 1.00, 1.70),
            (2.01, 0.52, 1.35),
            (3.02, 0.30, 1.05),
            (4.16, 0.17, 0.82),
            (5.43, 0.10, 0.62),
            (6.79, 0.06, 0.48),
            (8.21, 0.04, 0.36),
        )
        for ratio, amplitude, decay_time in partials:
            signal += amplitude * np.sin(
                2.0 * np.pi * freq * ratio * t
            ) * np.exp(-t / decay_time)
        signal *= attack / 1.9
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
        highpass = smoothstep((safe - 260.0) / 700.0)
        lowpass = 1.0 / (1.0 + (safe / 12000.0) ** 3.0)
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

    return rain * 0.115 + drops * 2.2


def air_bus() -> np.ndarray:
    def shape(freqs: np.ndarray) -> np.ndarray:
        safe = np.maximum(freqs, 1.0)
        low = smoothstep((safe - 2800.0) / 2400.0)
        high = 1.0 / (1.0 + (safe / 15000.0) ** 4.0)
        return low * high

    air = periodic_noise(shape)
    slow = 0.75 + 0.25 * np.sin(2.0 * np.pi * np.arange(N) / N * 3.0 + 1.1)
    return air * slow[:, None] * 0.012


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


def printer_bus() -> np.ndarray:
    bus = np.zeros((N, 2), dtype=np.float64)

    def fan_shape(freqs: np.ndarray) -> np.ndarray:
        safe = np.maximum(freqs, 1.0)
        low = smoothstep((safe - 50.0) / 120.0)
        high = 1.0 / (1.0 + (safe / 1600.0) ** 2.0)
        return low * high

    fan = periodic_noise(fan_shape)
    t = np.arange(N, dtype=np.float64) / SR
    fan *= (0.80 + 0.20 * np.sin(2.0 * np.pi * t / 16.0 + 0.7))[:, None]
    bus += fan * 0.012

    # Stepper ticks: short motor thumps with a little noise.
    when = 0.6
    while when < DURATION:
        length = RNG.uniform(0.035, 0.075)
        tt = np.arange(int(length * SR), dtype=np.float64) / SR
        envelope = smoothstep(tt / 0.004) * np.exp(-tt / (length * 0.3))
        tone = (
            0.7 * np.sin(2.0 * np.pi * RNG.uniform(180.0, 260.0) * tt)
            + 0.3 * RNG.normal(0.0, 1.0, len(tt))
        )
        add_wrap(
            bus,
            int(when * SR),
            tone * envelope,
            gain=RNG.uniform(0.006, 0.012),
            pan=RNG.uniform(-0.5, 0.5),
        )
        when += RNG.uniform(0.8, 1.8)

    # Occasional servo sweeps.
    for index in range(7):
        start = 2.4 + index * 9.2
        duration = 0.55
        tt = np.arange(int(duration * SR), dtype=np.float64) / SR
        f0 = RNG.uniform(520.0, 680.0)
        f1 = RNG.uniform(980.0, 1250.0)
        phase = 2.0 * np.pi * (f0 * tt + (f1 - f0) * tt * tt / (2.0 * duration))
        envelope = smoothstep(tt / 0.06) * smoothstep((duration - tt) / 0.16)
        add_wrap(
            bus,
            int(start * SR),
            np.sin(phase) * envelope,
            gain=0.006,
            pan=RNG.uniform(-0.4, 0.4),
        )

    return bus


def roof_bus() -> np.ndarray:
    bus = np.zeros((N, 2), dtype=np.float64)

    def night_shape(freqs: np.ndarray) -> np.ndarray:
        safe = np.maximum(freqs, 1.0)
        low = smoothstep((safe - 180.0) / 300.0)
        high = 1.0 / (1.0 + (safe / 5200.0) ** 2.0)
        return low * high / np.sqrt(safe / 1000.0)

    bus += periodic_noise(night_shape) * 0.006

    # Cricket chirps: small groups of high, dry pulses.
    for _ in range(14):
        when = RNG.uniform(0.0, DURATION)
        freq = RNG.uniform(3600.0, 4800.0)
        pan = RNG.uniform(-0.8, 0.8)
        for pulse in range(3):
            duration = 0.045
            tt = np.arange(int(duration * SR), dtype=np.float64) / SR
            envelope = smoothstep(tt / 0.004) * smoothstep((duration - tt) / 0.012)
            add_wrap(
                bus,
                int((when + pulse * 0.075) * SR),
                np.sin(2.0 * np.pi * freq * tt) * envelope,
                gain=RNG.uniform(0.003, 0.007),
                pan=pan,
            )

    # Fire crackle: short, dry pops over a low rumble.
    for _ in range(70):
        when = RNG.uniform(0.0, DURATION)
        duration = RNG.uniform(0.002, 0.012)
        tt = np.arange(max(2, int(duration * SR)), dtype=np.float64) / SR
        signal = RNG.normal(0.0, 1.0, len(tt)) * np.exp(-tt / (duration * 0.22))
        add_wrap(
            bus,
            int(when * SR),
            signal,
            gain=RNG.uniform(0.003, 0.008),
            pan=RNG.uniform(-0.7, 0.7),
        )

    def rumble_shape(freqs: np.ndarray) -> np.ndarray:
        safe = np.maximum(freqs, 1.0)
        return 1.0 / (1.0 + (safe / 220.0) ** 2.0) / np.sqrt(safe / 100.0)

    bus += periodic_noise(rumble_shape) * 0.004
    return bus


def reverb_impulse() -> np.ndarray:
    length = int(2.1 * SR)
    t = np.arange(length, dtype=np.float64) / SR
    decay = np.exp(-t / 0.55)
    out = np.zeros((length, 2), dtype=np.float64)
    freqs = np.fft.rfftfreq(length, 1.0 / SR)
    shape = 1.0 / (1.0 + (freqs / 7200.0) ** 2.0)
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


def highpass(data: np.ndarray, cutoff: float) -> np.ndarray:
    freqs = np.fft.rfftfreq(N, 1.0 / SR)
    eq = freqs ** 2 / (freqs ** 2 + cutoff ** 2)
    out = np.empty_like(data)
    for channel in range(2):
        out[:, channel] = np.fft.irfft(
            np.fft.rfft(data[:, channel]) * eq, N
        )
    return out


def write_wav(path: Path, data: np.ndarray, peak: float = 0.70) -> None:
    data = highpass(data, 30.0)
    scale = peak / max(np.max(np.abs(data)), 1e-9)
    pcm = np.clip(data * scale, -1.0, 1.0)
    pcm = (pcm * 32767.0).astype(np.int16)
    with wave.open(str(path), "wb") as handle:
        handle.setnchannels(2)
        handle.setsampwidth(2)
        handle.setframerate(SR)
        handle.writeframes(pcm.tobytes())
    print(f"wrote {path.name} ({DURATION:.0f}s, {SR} Hz stereo)")


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("usage: generate-ambient.py output-directory")
    outdir = Path(sys.argv[1])
    outdir.mkdir(parents=True, exist_ok=True)

    pad = pad_bus()
    bass = bass_bus()
    echoes = np.zeros((N, 2), dtype=np.float64)
    bells = bells_bus(echoes)
    dry = pad + bass + bells + echoes
    base = circular_reverb(dry, reverb_impulse(), wet=0.22)
    base += air_bus()
    base += crackle_bus() * 0.5

    # Master tilt for the harmonic bed.
    freqs = np.fft.rfftfreq(N, 1.0 / SR)
    low_shelf = 0.66 + 0.34 * smoothstep((freqs - 140.0) / 320.0)
    high_shelf = 1.0 + 1.55 * smoothstep((freqs - 1800.0) / 3200.0)
    hp = freqs ** 2 / (freqs ** 2 + 35.0 ** 2)
    eq = low_shelf * high_shelf * hp
    for channel in range(2):
        base[:, channel] = np.fft.irfft(
            np.fft.rfft(base[:, channel]) * eq, N
        )

    mid = base.mean(axis=1)
    side = (base[:, 0] - base[:, 1]) * 0.5 * 0.70
    base[:, 0] = mid + side
    base[:, 1] = mid - side
    base = np.tanh(base * 1.15) / 1.15

    write_wav(outdir / "night-base.wav", base, peak=0.72)
    write_wav(outdir / "night-rain.wav", highpass(rain_bus(), 110.0))
    write_wav(outdir / "night-hum.wav", highpass(hum_bus(), 20.0))
    write_wav(outdir / "night-workshop.wav", highpass(printer_bus(), 30.0))
    write_wav(outdir / "night-roof.wav", highpass(roof_bus(), 30.0))


if __name__ == "__main__":
    main()
