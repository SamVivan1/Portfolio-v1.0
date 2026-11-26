"use client";

import { useEffect, useState } from "react";

// Keep in sync with the inline script in app/layout.tsx.
const VIEW_KEY = "bsp-view";
const VIEW_EVENT = "bsp-view";

function simpleViewChosen() {
  try {
    return window.localStorage.getItem(VIEW_KEY) === "simple";
  } catch {
    return false;
  }
}

/** Switch between the cinematic world and the simple document view. */
export function setSimpleView(simple: boolean) {
  try {
    if (simple) window.localStorage.setItem(VIEW_KEY, "simple");
    else window.localStorage.removeItem(VIEW_KEY);
  } catch {
    // Storage can be unavailable; the switch still applies to this visit.
  }
  window.scrollTo(0, 0);
  window.dispatchEvent(new CustomEvent(VIEW_EVENT, { detail: simple }));
}

/**
 * `reduced`: show the document view (OS setting or the visitor's choice).
 * `manual`: the visitor chose it; the OS does not ask for reduced motion.
 */
export function useViewMode() {
  const [mode, setMode] = useState({ reduced: false, manual: false });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event?: Event) => {
      const chosen =
        event instanceof CustomEvent
          ? Boolean(event.detail)
          : simpleViewChosen();
      const reduced = query.matches || chosen;
      setMode({ reduced, manual: chosen && !query.matches });
      document.documentElement.classList.toggle("reduced", reduced);
    };
    update();
    query.addEventListener("change", update);
    window.addEventListener(VIEW_EVENT, update);
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener(VIEW_EVENT, update);
    };
  }, []);

  return mode;
}
