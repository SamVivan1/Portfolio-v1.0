"use client";

import { useEffect, useRef } from "react";
import {
  FLOOR_Y,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  cameraForProgress,
  clamp,
} from "../../lib/chapters";
import { drawDynamicFrame, getWorldCanvas } from "./world";

interface PixelStageProps {
  progressRef: React.MutableRefObject<number>;
  activeChapter: number;
  reduced?: boolean;
}

const AVATAR_POSITIONS = [0.76, 0.24, 0.76, 0.24];

export default function PixelStage({
  progressRef,
  activeChapter,
  reduced = false,
}: PixelStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterRef = useRef(activeChapter);

  useEffect(() => {
    chapterRef.current = activeChapter;
  }, [activeChapter]);

  useEffect(() => {
    const display = canvasRef.current;
    if (!display) return;
    const dctx = display.getContext("2d");
    if (!dctx) return;

    const world = getWorldCanvas();
    const frame = document.createElement("canvas");
    const fctx = frame.getContext("2d");
    if (!fctx) return;

    let raf = 0;
    let last = performance.now();
    let camera = 0;
    let initialized = false;

    const metrics = {
      viewW: 853,
      viewH: 480,
      viewY: 180,
      cameraMax: WORLD_WIDTH - 853,
    };

    const resize = () => {
      const vw = Math.max(320, window.innerWidth);
      const vh = Math.max(320, window.innerHeight);
      const aspect = vw / vh;
      let viewW: number;
      let viewH: number;

      if (aspect >= 1) {
        viewH = 480;
        viewW = clamp(Math.round(viewH * aspect), 720, 1120);
      } else {
        viewW = 360;
        viewH = clamp(Math.round(viewW / aspect), 560, 880);
      }

      const viewY = clamp(
        FLOOR_Y + 40 - viewH,
        0,
        Math.max(0, WORLD_HEIGHT - viewH)
      );

      metrics.viewW = viewW;
      metrics.viewH = viewH;
      metrics.viewY = viewY;
      metrics.cameraMax = Math.max(0, WORLD_WIDTH - viewW);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      display.width = Math.round(vw * dpr);
      display.height = Math.round(vh * dpr);
      display.style.width = `${vw}px`;
      display.style.height = `${vh}px`;

      frame.width = viewW;
      frame.height = viewH;
      fctx.imageSmoothingEnabled = false;
      dctx.imageSmoothingEnabled = false;

      const target = cameraForProgress(
        progressRef.current,
        metrics.cameraMax,
        metrics.viewW < 520
      );
      if (!initialized) {
        camera = target;
        initialized = true;
      }
    };

    const render = (now: number) => {
      const delta = Math.min(64, now - last);
      last = now;

      const target = cameraForProgress(
        progressRef.current,
        metrics.cameraMax,
        metrics.viewW < 520
      );
      if (reduced) {
        camera = target;
      } else {
        const factor = 1 - Math.pow(0.001, delta / 1000);
        camera += (target - camera) * factor;
      }

      const moving = Math.abs(target - camera) > 0.35;
      const chapter = chapterRef.current;
      const showAvatar =
        !reduced && metrics.viewW >= 520 && chapter !== 3;
      const avatarX =
        metrics.viewW * (AVATAR_POSITIONS[chapter] ?? 0.24);

      fctx.imageSmoothingEnabled = false;
      const sourceX = clamp(camera, 0, Math.max(0, world.width - metrics.viewW));
      fctx.drawImage(
        world,
        sourceX,
        metrics.viewY,
        metrics.viewW,
        metrics.viewH,
        0,
        0,
        metrics.viewW,
        metrics.viewH
      );

      drawDynamicFrame(fctx, {
        cameraX: sourceX,
        viewY: metrics.viewY,
        viewW: metrics.viewW,
        viewH: metrics.viewH,
        time: now / 1000,
        moving,
        avatarX,
        showAvatar,
        reduced,
      });

      const scale = Math.max(
        display.width / metrics.viewW,
        display.height / metrics.viewH
      );
      const drawW = metrics.viewW * scale;
      const drawH = metrics.viewH * scale;
      const offsetX = (display.width - drawW) / 2;
      const offsetY = (display.height - drawH) / 2;

      dctx.imageSmoothingEnabled = false;
      dctx.clearRect(0, 0, display.width, display.height);
      dctx.drawImage(frame, offsetX, offsetY, drawW, drawH);

      raf = requestAnimationFrame(render);
    };

    resize();
    raf = requestAnimationFrame(render);

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [progressRef, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      className="pixel-stage-canvas"
    />
  );
}
