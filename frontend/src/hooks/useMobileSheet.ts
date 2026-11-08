"use client";

import { RefObject, useEffect, useRef, useState } from "react";

export type SheetState = "collapsed" | "half" | "full";

interface DragState {
  active: boolean;
  startY: number;
  startHeight: number;
  lastY: number;
  lastTime: number;
  velocity: number;
}

export function useMobileSheet(
  panelRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>
) {
  const [sheet, setSheet] = useState<SheetState>("half");
  const drag = useRef<DragState>({
    active: false,
    startY: 0,
    startHeight: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
  });

  useEffect(() => {
    const bar = barRef.current;
    const panel = panelRef.current;
    if (!bar || !panel) return;

    const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

    const onPointerDown = (event: PointerEvent) => {
      if (!isMobile()) return;
      if ((event.target as HTMLElement).closest("button")) return;
      const rect = panel.getBoundingClientRect();
      drag.current = {
        active: true,
        startY: event.clientY,
        startHeight: rect.height,
        lastY: event.clientY,
        lastTime: performance.now(),
        velocity: 0,
      };
      panel.classList.add("is-dragging");
      bar.setPointerCapture(event.pointerId);
      event.preventDefault();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!drag.current.active) return;
      const now = performance.now();
      const deltaTime = Math.max(1, now - drag.current.lastTime);
      drag.current.velocity =
        (drag.current.lastY - event.clientY) / deltaTime;
      drag.current.lastY = event.clientY;
      drag.current.lastTime = now;

      const barHeight = bar.getBoundingClientRect().height;
      const fullHeight = Math.max(
        barHeight,
        window.innerHeight - 164
      );
      const next = Math.min(
        fullHeight,
        Math.max(
          barHeight,
          drag.current.startHeight +
            (drag.current.startY - event.clientY)
        )
      );
      panel.style.height = `${next}px`;
    };

    const finish = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      panel.classList.remove("is-dragging");

      const height = panel.getBoundingClientRect().height;
      const barHeight = bar.getBoundingClientRect().height;
      const halfHeight = window.innerHeight * 0.56;
      const fullHeight = Math.max(
        barHeight,
        window.innerHeight - 164
      );

      let next: SheetState;
      if (drag.current.velocity > 0.45) {
        next = "full";
      } else if (drag.current.velocity < -0.45) {
        next = height < halfHeight - 40 ? "collapsed" : "half";
      } else {
        const distances = [
          { state: "collapsed" as const, distance: Math.abs(height - barHeight) },
          { state: "half" as const, distance: Math.abs(height - halfHeight) },
          { state: "full" as const, distance: Math.abs(height - fullHeight) },
        ].sort((a, b) => a.distance - b.distance);
        next = distances[0].state;
      }

      panel.style.height = "";
      setSheet(next);
    };

    bar.addEventListener("pointerdown", onPointerDown);
    bar.addEventListener("pointermove", onPointerMove);
    bar.addEventListener("pointerup", finish);
    bar.addEventListener("pointercancel", finish);

    return () => {
      bar.removeEventListener("pointerdown", onPointerDown);
      bar.removeEventListener("pointermove", onPointerMove);
      bar.removeEventListener("pointerup", finish);
      bar.removeEventListener("pointercancel", finish);
      panel.style.height = "";
      panel.classList.remove("is-dragging");
    };
  }, [barRef, panelRef]);

  return { sheet, setSheet };
}
