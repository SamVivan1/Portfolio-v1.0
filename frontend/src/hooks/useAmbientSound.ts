"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "../lib/analytics";

const STORAGE_KEY = "bsp-sound";
const DEFAULT_VOLUME = 0.28;

export function useAmbientSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [started, setStarted] = useState(false);
  const [blocked, setBlocked] = useState(false);

  // Respect an explicit opt-out from an earlier visit; first visits default on.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === "off") {
        setEnabled(false);
      }
    } catch {
      // Storage can be unavailable in private modes; keep the default.
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = DEFAULT_VOLUME;
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      await audio.play();
      setStarted(true);
      setBlocked(false);
      return true;
    } catch {
      setBlocked(true);
      return false;
    }
  }, []);

  // Browsers require a user gesture before audible playback. Start on the
  // first interaction anywhere, then stop listening.
  useEffect(() => {
    if (!enabled || started) return;
    const onGesture = () => {
      void play();
    };
    window.addEventListener("pointerdown", onGesture, {
      capture: true,
      once: true,
    });
    window.addEventListener("keydown", onGesture, {
      capture: true,
      once: true,
    });
    window.addEventListener("touchstart", onGesture, {
      capture: true,
      once: true,
      passive: true,
    });
    // Desktop visitors often only scroll. Wheel is not always treated as
    // activation, but trying costs nothing; a later click still starts it.
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
  }, [enabled, started, play]);

  // Pause when the tab is hidden and resume only if sound is still enabled.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
      } else if (enabled && started) {
        void play();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () =>
      document.removeEventListener("visibilitychange", onVisibility);
  }, [enabled, started, play]);

  const toggle = useCallback(() => {
    // Before the first successful playback, the button starts the sound
    // instead of muting a track the visitor has not heard yet.
    if (!enabled) {
      setEnabled(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, "on");
      } catch {
        // Ignore storage failures.
      }
      void play();
      track("sound_on");
      return;
    }

    if (!started) {
      void play();
      track("sound_start");
      return;
    }

    setEnabled(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "off");
    } catch {
      // Ignore storage failures.
    }
    audioRef.current?.pause();
    setStarted(false);
    track("sound_off");
  }, [enabled, started, play]);

  return { audioRef, enabled, started, blocked, toggle };
}
