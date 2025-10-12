"use client";

import React, { useEffect, useRef } from "react";

const CursorSplash: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const posRef = useRef({ x: -1000, y: -1000 });
  const hoverInteractiveRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;

    const setSize = (lowRes = false) => {
      // allow lower resolution on mobile to improve perf
      const preferDpr = lowRes
        ? Math.min(window.devicePixelRatio || 1, 1.5)
        : Math.max(1, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * preferDpr);
      canvas.height = Math.round(h * preferDpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(preferDpr, 0, 0, preferDpr, 0, 0);
    };

    let pulse = 0;
    let disabled = false;
    const isSmallScreen = window.innerWidth <= 600;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // disable on small touch devices by default
    if (isTouch && isSmallScreen) disabled = true;

    const targetFps = isSmallScreen ? 30 : 60;
    const frameInterval = 1000 / targetFps;
    let lastFrameTime = 0;

    const draw = (time?: number) => {
      if (disabled) {
        // keep a lightweight loop to detect changes (e.g., resize that may re-enable)
        rafId = requestAnimationFrame(draw);
        return;
      }
      const now = time || performance.now();
      if (now - lastFrameTime < frameInterval) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = now;
      const { x, y } = posRef.current;

      // clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background aura parameters
      const baseRadius = hoverInteractiveRef.current ? 34 : 24;
      const pulseSpeed = hoverInteractiveRef.current ? 0.012 : 0.008;
      pulse = (pulse + pulseSpeed) % 1;
      const r =
        baseRadius +
        Math.sin(pulse * Math.PI * 2) * (hoverInteractiveRef.current ? 6 : 3);

      if (x > -999) {
        // soft radial gradient (aura)
        const grad = ctx.createRadialGradient(
          x,
          y,
          Math.max(1, r * 0.1),
          x,
          y,
          r
        );
        // color tuned to site: cool bluish purple
        const colorCenter = hoverInteractiveRef.current
          ? "hsla(280,80%,70%,0.8)"
          : "hsla(250,80%,65%,0.65)";
        const colorEdge = "hsla(250,80%,25%,0)";

        grad.addColorStop(0, colorCenter);
        grad.addColorStop(0.6, "hsla(250,80%,55%,0.18)");
        grad.addColorStop(1, colorEdge);

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // subtle outer ring when interactive
        if (hoverInteractiveRef.current) {
          ctx.beginPath();
          ctx.strokeStyle = "hsla(280,90%,70%,0.35)";
          ctx.lineWidth = 2;
          ctx.globalCompositeOperation = "lighter";
          ctx.arc(x, y, r + 6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalCompositeOperation = "source-over";
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    const updatePos = (clientX: number, clientY: number) => {
      posRef.current.x = clientX;
      posRef.current.y = clientY;
    };

    // throttle pointer moves to reduce work on mobile
    let lastPointer = 0;
    const pointerThrottle = isSmallScreen ? 80 : 16; // ms

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastPointer < pointerThrottle) return;
      lastPointer = now;
      updatePos(e.clientX, e.clientY);

      // hit test for interactive elements
      // prefer elements with role=button, a, button tag, or tabindex >= 0
      const el = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement | null;
      if (el) {
        const tag = (el.tagName || "").toLowerCase();
        const isInteractive =
          tag === "a" ||
          tag === "button" ||
          el.getAttribute("role") === "button" ||
          el.closest("[role=button]") !== null ||
          el.closest("a") !== null ||
          el.getAttribute("tabindex") !== null;

        hoverInteractiveRef.current = !!isInteractive;
      } else {
        hoverInteractiveRef.current = false;
      }
    };

    const handlePointerLeave = () => {
      posRef.current.x = -10000;
      posRef.current.y = -10000;
      hoverInteractiveRef.current = false;
    };

    setSize(isSmallScreen || isTouch);
    const handleResize = () => setSize(isSmallScreen || isTouch);
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerLeave);
    window.addEventListener("pointercancel", handlePointerLeave);

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerLeave);
      window.removeEventListener("pointercancel", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
};

export default CursorSplash;
