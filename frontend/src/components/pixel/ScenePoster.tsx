"use client";

import { useEffect, useRef } from "react";
import { clamp, FLOOR_Y, WORLD_WIDTH } from "../../lib/chapters";
import { useReducedMotion } from "../../hooks/useMotionPreference";
import { getWorldCanvas } from "./world";

interface ScenePosterProps {
  worldX: number;
  alt: string;
  className?: string;
}

const VIEW_W = 853;
const VIEW_H = 480;

export default function ScenePoster({
  worldX,
  alt,
  className,
}: ScenePosterProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.closest(".reduced-document");
    if (parent && getComputedStyle(parent).display === "none") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const world = getWorldCanvas();
    const viewY = clamp(FLOOR_Y + 40 - VIEW_H, 0, Math.max(0, world.height - VIEW_H));
    const sourceX = clamp(worldX, 0, Math.max(0, WORLD_WIDTH - VIEW_W));

    canvas.width = VIEW_W;
    canvas.height = VIEW_H;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      world,
      sourceX,
      viewY,
      VIEW_W,
      VIEW_H,
      0,
      0,
      VIEW_W,
      VIEW_H
    );
  }, [reduced, worldX]);

  return (
    <canvas
      ref={ref}
      className={className ? `scene-poster ${className}` : "scene-poster"}
      role="img"
      aria-label={alt}
    />
  );
}
