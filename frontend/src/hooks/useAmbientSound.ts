"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "../lib/analytics";

const STORAGE_KEY = "bsp-sound";
const MASTER_VOLUME = 0.28;
const TEXTURE_VOLUME = 0.26;
const FADE_MS = 900;

type Texture = "rain" | "hum" | "workshop" | "roof";

const BASE_SRC = "/assets/audio/night-base.mp3";
const TEXTURE_SRC: Record<Texture, string> = {
  rain: "/assets/audio/night-rain.mp3",
  hum: "/assets/audio/night-hum.mp3",
  workshop: "/assets/audio/night-workshop.mp3",
  roof: "/assets/audio/night-roof.mp3",
};

const CHAPTER_TEXTURE: Texture[] = ["rain", "hum", "workshop", "roof"];

type LayerName = "base" | Texture;

export function useAmbientSound(activeChapter: number) {
  const layers = useRef<Partial<Record<LayerName, HTMLAudioElement>>>({});
  const fades = useRef(new Map<HTMLAudioElement, number>());
  const currentTexture = useRef<Texture | null>(null);
  const chapterRef = useRef(activeChapter);
  const enabledRef = useRef(true);
  const startedRef = useRef(false);
  const muteToken = useRef(0);
  const textureToken = useRef(0);
  const muteTimer = useRef<number | null>(null);

  const [enabled, setEnabled] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const createLayer = (src: string) => {
      const audio = new Audio();
      audio.preload = "none";
      audio.loop = true;
      audio.volume = 0;
      audio.src = src;
      return audio;
    };

    const layerMap: Partial<Record<LayerName, HTMLAudioElement>> = {
      base: createLayer(BASE_SRC),
      rain: createLayer(TEXTURE_SRC.rain),
      hum: createLayer(TEXTURE_SRC.hum),
      workshop: createLayer(TEXTURE_SRC.workshop),
      roof: createLayer(TEXTURE_SRC.roof),
    };
    layers.current = layerMap;
    const fadeMap = fades.current;

    return () => {
      for (const audio of Object.values(layerMap)) {
        if (!audio) continue;
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
      layers.current = {};
      for (const frame of fadeMap.values()) {
        window.cancelAnimationFrame(frame);
      }
      fadeMap.clear();
      if (muteTimer.current !== null) {
        window.clearTimeout(muteTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "off") {
        enabledRef.current = false;
        setEnabled(false);
      }
    } catch {
      // Storage can be unavailable in private modes.
    }
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  useEffect(() => {
    startedRef.current = started;
  }, [started]);

  const fadeTo = useCallback(
    (audio: HTMLAudioElement, target: number, duration = FADE_MS) => {
      const existing = fades.current.get(audio);
      if (existing !== undefined) window.cancelAnimationFrame(existing);
      const startVolume = audio.volume;
      const startAt = performance.now();

      const step = (now: number) => {
        const progress = Math.min(1, (now - startAt) / duration);
        const eased = progress * progress * (3 - 2 * progress);
        audio.volume = Math.min(
          1,
          Math.max(0, startVolume + (target - startVolume) * eased)
        );
        if (progress < 1) {
          fades.current.set(audio, window.requestAnimationFrame(step));
        } else {
          fades.current.delete(audio);
        }
      };

      fades.current.set(audio, window.requestAnimationFrame(step));
    },
    []
  );

  const startLayer = useCallback(
    async (audio: HTMLAudioElement, volume: number) => {
      audio.volume = 0;
      try {
        await audio.play();
      } catch {
        return false;
      }
      if (!enabledRef.current) {
        audio.pause();
        return false;
      }
      fadeTo(audio, volume);
      return true;
    },
    [fadeTo]
  );

  const start = useCallback(async () => {
    if (!enabledRef.current || startedRef.current) return;
    const base = layers.current.base;
    if (!base) return;

    if (muteTimer.current !== null) {
      window.clearTimeout(muteTimer.current);
      muteTimer.current = null;
    }
    muteToken.current += 1;

    const texture =
      currentTexture.current ??
      CHAPTER_TEXTURE[chapterRef.current] ??
      "rain";
    currentTexture.current = texture;

    const baseOk = await startLayer(base, MASTER_VOLUME);
    if (!baseOk) return;

    const textureAudio = layers.current[texture];
    if (textureAudio) {
      void startLayer(textureAudio, TEXTURE_VOLUME);
    }

    startedRef.current = true;
    setStarted(true);
  }, [startLayer]);

  const switchTexture = useCallback(
    (next: Texture) => {
      const previous = currentTexture.current;
      if (previous === next) return;
      currentTexture.current = next;
      if (!startedRef.current || !enabledRef.current) return;

      const token = ++textureToken.current;
      const nextAudio = layers.current[next];
      const previousAudio = previous ? layers.current[previous] : undefined;

      if (nextAudio) {
        nextAudio.volume = 0;
        void nextAudio
          .play()
          .then(() => {
            if (
              token !== textureToken.current ||
              !enabledRef.current ||
              !startedRef.current
            ) {
              nextAudio.pause();
              return;
            }
            fadeTo(nextAudio, TEXTURE_VOLUME);
          })
          .catch(() => {
            // The base keeps playing if a texture cannot start.
          });
      }

      if (previousAudio) {
        fadeTo(previousAudio, 0);
        window.setTimeout(() => {
          if (currentTexture.current !== previous) {
            previousAudio.pause();
          }
        }, FADE_MS + 60);
      }
    },
    [fadeTo]
  );

  useEffect(() => {
    chapterRef.current = activeChapter;
    const next = CHAPTER_TEXTURE[activeChapter] ?? "rain";
    if (currentTexture.current === null) {
      currentTexture.current = next;
      return;
    }
    if (next === currentTexture.current) return;
    if (!startedRef.current) {
      currentTexture.current = next;
      return;
    }
    switchTexture(next);
  }, [activeChapter, switchTexture]);

  useEffect(() => {
    if (!enabled || started) return;

    const onGesture = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest(".hud__sound, .hud__mobile-actions")
      ) {
        return;
      }
      void start();
    };

    window.addEventListener("pointerdown", onGesture, { capture: true });
    window.addEventListener("keydown", onGesture, { capture: true });
    window.addEventListener("touchstart", onGesture, {
      capture: true,
      passive: true,
    });
    window.addEventListener("wheel", onGesture, {
      capture: true,
      passive: true,
    });

    return () => {
      window.removeEventListener("pointerdown", onGesture, { capture: true });
      window.removeEventListener("keydown", onGesture, { capture: true });
      window.removeEventListener("touchstart", onGesture, { capture: true });
      window.removeEventListener("wheel", onGesture, { capture: true });
    };
  }, [enabled, started, start]);

  useEffect(() => {
    const onVisibility = () => {
      if (!startedRef.current) return;
      const base = layers.current.base;
      const texture = currentTexture.current
        ? layers.current[currentTexture.current]
        : undefined;

      if (document.hidden) {
        base?.pause();
        texture?.pause();
      } else if (enabledRef.current) {
        void base?.play().catch(() => undefined);
        void texture?.play().catch(() => undefined);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const toggle = useCallback(() => {
    if (!enabled) {
      enabledRef.current = true;
      setEnabled(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, "on");
      } catch {
        // Ignore storage failures.
      }
      void start();
      track("sound_on");
      return;
    }

    if (!startedRef.current) {
      void start();
      track("sound_start");
      return;
    }

    enabledRef.current = false;
    setEnabled(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "off");
    } catch {
      // Ignore storage failures.
    }

    muteToken.current += 1;
    const token = muteToken.current;
    const all = Object.values(layers.current).filter(
      (audio): audio is HTMLAudioElement => Boolean(audio)
    );
    all.forEach((audio) => fadeTo(audio, 0, 350));

    if (muteTimer.current !== null) {
      window.clearTimeout(muteTimer.current);
    }
    muteTimer.current = window.setTimeout(() => {
      if (token === muteToken.current) {
        all.forEach((audio) => audio.pause());
      }
      muteTimer.current = null;
    }, 420);

    startedRef.current = false;
    setStarted(false);
    track("sound_off");
  }, [enabled, fadeTo, start]);

  return { enabled, started, toggle };
}
