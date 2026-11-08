"use client";

type EventData = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Privacy-friendly analytics facade. Events are no-ops unless an
 * Umami-compatible script is configured through NEXT_PUBLIC_UMAMI_*.
 */
export function track(event: string, data?: EventData) {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(event, data);
  } catch {
    // Analytics must never interrupt the experience.
  }
}
