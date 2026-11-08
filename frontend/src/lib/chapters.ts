import { CHAPTERS } from "../data/portfolio";

export const WORLD_WIDTH = 3900;
export const WORLD_HEIGHT = 800;
export const FLOOR_Y = 620;
export const BASE_VIEW_WIDTH = 640;
export const BASE_VIEW_HEIGHT = 360;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const smoothstep = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

interface CameraKeyframe {
  progress: number;
  x: number;
}

const buildCameraKeyframes = (stops: number[]): CameraKeyframe[] =>
  CHAPTERS.flatMap((chapter, index) => {
    const [start, end] = chapter.scroll;
    const isLast = index === CHAPTERS.length - 1;
    return [
      { progress: start, x: stops[index] - 40 },
      { progress: end, x: stops[index] + (isLast ? 80 : 40) },
    ];
  });

const desktopCameraKeyframes = buildCameraKeyframes(
  CHAPTERS.map((chapter) => chapter.worldX)
);

// A portrait viewport is narrower; keep the same focal points centered.
const mobileCameraKeyframes = buildCameraKeyframes([340, 1340, 2340, 3020]);

export function cameraForProgress(
  progress: number,
  maxCamera: number,
  portrait = false
): number {
  const keyframes = portrait ? mobileCameraKeyframes : desktopCameraKeyframes;
  const p = clamp(progress, 0, 1);
  let x = keyframes[0].x;

  for (let i = 0; i < keyframes.length - 1; i += 1) {
    const current = keyframes[i];
    const next = keyframes[i + 1];
    if (p >= current.progress && p <= next.progress) {
      const span = Math.max(0.0001, next.progress - current.progress);
      const t = smoothstep((p - current.progress) / span);
      x = lerp(current.x, next.x, t);
      break;
    }
  }

  if (p >= keyframes[keyframes.length - 1].progress) {
    x = keyframes[keyframes.length - 1].x;
  }

  return clamp(x, 0, Math.max(0, maxCamera));
}

export function chapterForProgress(progress: number): number {
  const p = clamp(progress, 0, 1);
  for (let i = CHAPTERS.length - 1; i >= 0; i -= 1) {
    if (p >= CHAPTERS[i].scroll[0]) return i;
  }
  return 0;
}

export function progressForChapter(index: number): number {
  const chapter = CHAPTERS[clamp(index, 0, CHAPTERS.length - 1)];
  const [start, end] = chapter.scroll;
  return clamp(start + (end - start) * 0.5, 0, 1);
}

export function chapterOpacity(progress: number, index: number): number {
  const chapter = CHAPTERS[index];
  if (!chapter) return 0;
  const [start, end] = chapter.scroll;
  const p = clamp(progress, 0, 1);
  if (p < start || p > end) return 0;
  const fade = Math.min(0.035, (end - start) * 0.2);
  const inOpacity = smoothstep((p - start) / fade);
  const outOpacity = 1 - smoothstep((p - (end - fade)) / fade);
  return Math.min(inOpacity, outOpacity);
}

export function progressFromScroll(): number {
  if (typeof window === "undefined") return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return clamp(window.scrollY / max, 0, 1);
}

export function scrollToProgress(progress: number, reduced = false) {
  if (typeof window === "undefined") return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  window.scrollTo({
    top: clamp(progress, 0, 1) * max,
    behavior: reduced ? "auto" : "smooth",
  });
}

export function scrollToChapter(index: number, reduced = false) {
  scrollToProgress(progressForChapter(index), reduced);
}
