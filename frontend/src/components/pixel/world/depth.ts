import { Ctx, hexToRgba, pixelCircle, rect } from "./helpers";
import { P } from "./palette";

// Depth layers around the static world canvas:
// - a backdrop (sky, mountains, two city layers) seen through the bedroom
//   window and from the roof, each layer scrolling slower than the world;
// - a foreground of dark silhouettes scrolling faster than the world;
// - dust motes drifting in the lamp light.

/** Screen x of something at world x `baseX` on a layer with depth factor `f` (1 = the world plane). */
const parallaxX = (baseX: number, cameraX: number, anchor: number, f: number) =>
  baseX - cameraX + (cameraX - anchor) * (1 - f);

const random = (seed: number) => () => {
  // mulberry32: small deterministic PRNG so the skyline is the same every load
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** How much floor sits below FLOOR_Y in the view; more floor reads as more depth. */
export const VIEW_FLOOR_MARGIN = 56;

const STRIP_W = 1600;

interface Strip {
  canvas: HTMLCanvasElement;
  /** world-space x offsets (within the strip) of roofs that carry a red beacon */
  beacons: Array<[number, number]>;
}

const makeCanvas = (w: number, h: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create a backdrop layer.");
  ctx.imageSmoothingEnabled = false;
  return { canvas, ctx };
};

const buildMountains = (): Strip => {
  const h = 150;
  const { canvas, ctx } = makeCanvas(STRIP_W, h);
  // Seamless ridge: whole-number periods across the strip width.
  const ridge = (x: number) => {
    const t = (x / STRIP_W) * Math.PI * 2;
    return 70 + Math.sin(t * 2) * 26 + Math.sin(t * 5 + 1.3) * 14 + Math.sin(t * 11 + 0.4) * 6;
  };
  for (let x = 0; x < STRIP_W; x += 1) {
    const top = Math.round(h - ridge(x));
    rect(ctx, x, top, 1, h - top, "#211a3b");
    // moonlit rim on slopes that face the moon (right-facing)
    if (ridge(x + 1) < ridge(x)) rect(ctx, x, top, 1, 1, "#3d3166");
  }
  return { canvas, beacons: [] };
};

const buildCity = (
  seed: number,
  h: number,
  minH: number,
  maxH: number,
  body: readonly string[],
  windows: readonly string[],
  windowSize: number,
  rim: string
): Strip => {
  const rand = random(seed);
  const { canvas, ctx } = makeCanvas(STRIP_W, h);
  const beacons: Array<[number, number]> = [];
  let x = 0;
  while (x < STRIP_W) {
    const bw = Math.round(18 + rand() * (windowSize > 1 ? 44 : 26));
    const bh = Math.round(minH + rand() * (maxH - minH));
    // Keep the seam tileable: the last building stops at the strip edge.
    const w = Math.min(bw, STRIP_W - x);
    const top = h - bh;
    rect(ctx, x, top, w, bh, body[Math.floor(rand() * body.length)]);
    rect(ctx, x + w - 1, top, 1, bh, rim);
    rect(ctx, x, top, w, 1, rim);

    // roof furniture: water tank or antenna on some roofs
    const roll = rand();
    if (roll < 0.22 && w > 20) {
      rect(ctx, x + 4, top - 6, 8, 6, body[0]);
      rect(ctx, x + 5, top - 8, 6, 2, rim);
    } else if (roll < 0.42) {
      const ax = x + Math.round(w / 2);
      rect(ctx, ax, top - 14, 1, 14, rim);
      if (bh > maxH * 0.7) beacons.push([ax, top - 15]);
    }

    // lit windows, in floors, mostly dark
    const gap = windowSize + 3;
    for (let wy = top + 5; wy < h - 4; wy += gap + 1) {
      for (let wx = x + 3; wx < x + w - 3 - windowSize; wx += gap) {
        if (rand() < 0.24) {
          rect(
            ctx,
            wx,
            wy,
            windowSize,
            windowSize,
            windows[Math.floor(rand() * windows.length)]
          );
        }
      }
    }
    x += w + Math.round(rand() * 6);
  }
  return { canvas, beacons };
};

let strips: { mountains: Strip; far: Strip; near: Strip } | null = null;
let moonSprite: HTMLCanvasElement | null = null;

const getStrips = () => {
  strips ??= {
    mountains: buildMountains(),
    far: buildCity(
      7,
      140,
      30,
      110,
      ["#1b1631", "#1e1835"],
      ["rgba(255,180,94,0.45)", "rgba(196,181,253,0.35)"],
      1,
      "#2b2348"
    ),
    near: buildCity(
      23,
      220,
      60,
      200,
      ["#0e0b1c", "#110d21", "#0c0a18"],
      [P.amber, P.amberGlow, P.teal, "rgba(255,180,94,0.6)"],
      2,
      "#241d40"
    ),
  };
  return strips;
};

const getMoon = () => {
  if (moonSprite) return moonSprite;
  const { canvas, ctx } = makeCanvas(160, 160);
  const c = 80;
  ctx.globalCompositeOperation = "lighter";
  [62, 48, 36].forEach((r) => pixelCircle(ctx, c, c, r, "rgba(244,230,200,0.035)"));
  ctx.globalCompositeOperation = "source-over";
  pixelCircle(ctx, c, c, 22, P.cream);
  // terminator shading on the lower left, craters
  pixelCircle(ctx, c - 6, c + 6, 18, "#e6d4ad");
  pixelCircle(ctx, c - 2, c + 2, 19, P.cream);
  pixelCircle(ctx, c - 8, c - 6, 5, "#d9c49c");
  pixelCircle(ctx, c + 9, c + 7, 4, "#d9c49c");
  pixelCircle(ctx, c + 6, c - 10, 2, "#d9c49c");
  pixelCircle(ctx, c - 10, c + 11, 3, "#d9c49c");
  moonSprite = canvas;
  return canvas;
};

interface Region {
  /** the see-through hole in the world canvas */
  x: number;
  y: number;
  w: number;
  h: number;
  /** camera x where layers line up with the world */
  anchor: number;
  /** world y where buildings stand */
  horizon: number;
  moon: [number, number];
  /** horizontal shift so the two views show different parts of the city */
  shift: number;
  stars: Array<[number, number, number]>;
  sky?: HTMLCanvasElement;
}

const starsFor = (seed: number, count: number, w: number, h: number) => {
  const rand = random(seed);
  return Array.from({ length: count }, () => [
    Math.round(rand() * w),
    Math.round(rand() * h),
    rand() * Math.PI * 2,
  ]) as Array<[number, number, number]>;
};

export const WINDOW_HOLE = { x: 60, y: 130, w: 220, h: 290 };
export const ROOF_HOLE = { x: 3000, y: 0, w: 900, h: 620 };

const REGIONS: Region[] = [
  {
    ...WINDOW_HOLE,
    anchor: 60,
    horizon: 480,
    moon: [226, 296],
    shift: 340,
    stars: starsFor(3, 26, 420, 180),
  },
  {
    ...ROOF_HOLE,
    anchor: 3120,
    horizon: 640,
    moon: [3540, 300],
    shift: 0,
    stars: starsFor(11, 130, 1500, 420),
  },
];

const SKY = ["#08071a", "#0c0a20", "#110d27", "#17112f", "#1e1638", "#271c44", "#33234f"];

/** Banded sky with checker-dithered seams between bands, cached per region. */
const getSky = (region: Region) => {
  if (region.sky) return region.sky;
  const h = region.horizon - region.y;
  const { canvas, ctx } = makeCanvas(region.w, h);
  const bandH = Math.ceil(h / SKY.length);
  SKY.forEach((color, index) => rect(ctx, 0, index * bandH, region.w, bandH, color));
  for (let index = 1; index < SKY.length; index += 1) {
    const seam = index * bandH;
    // previous colour dithers down into the next band, next colour up into the previous
    for (let y = 0; y < 4; y += 1) {
      const density = y < 2 ? 2 : 4;
      ctx.fillStyle = SKY[index - 1];
      for (let x = (y % 2) * (density / 2); x < region.w; x += density) {
        ctx.fillRect(x, seam + y, 1, 1);
      }
      ctx.fillStyle = SKY[index];
      for (let x = (y % 2) * (density / 2); x < region.w; x += density) {
        ctx.fillRect(x, seam - 1 - y, 1, 1);
      }
    }
  }
  region.sky = canvas;
  return canvas;
};

const drawStrip = (
  ctx: Ctx,
  strip: Strip,
  x: number,
  bottom: number,
  left: number,
  right: number
) => {
  const start = left - ((((left - x) % STRIP_W) + STRIP_W) % STRIP_W);
  for (let sx = start; sx < right; sx += STRIP_W) {
    ctx.drawImage(strip.canvas, Math.round(sx), Math.round(bottom - strip.canvas.height));
  }
};

const haze = (ctx: Ctx, left: number, width: number, bottom: number, height: number, alpha: number) => {
  for (let band = 0; band < 4; band += 1) {
    const h = Math.round(height * (1 - band / 4));
    rect(ctx, left, bottom - h, width, h, hexToRgba("#3a2a5e", alpha / 4));
  }
};

/** Sky, moon and skyline behind the world canvas. Screen coordinates. */
export const drawBackdrop = (
  ctx: Ctx,
  cameraX: number,
  viewY: number,
  viewW: number,
  viewH: number,
  time: number
) => {
  const { mountains, far, near } = getStrips();
  REGIONS.forEach((region) => {
    const left = Math.max(0, region.x - cameraX);
    const right = Math.min(viewW, region.x + region.w - cameraX);
    const top = Math.max(0, region.y - viewY);
    const bottom = Math.min(viewH, region.y + region.h - viewY);
    if (right <= left || bottom <= top) return;

    ctx.save();
    ctx.beginPath();
    ctx.rect(left, top, right - left, bottom - top);
    ctx.clip();

    // banded sky, darkest at the zenith; it only varies vertically, so no parallax needed
    const skyTop = region.y - viewY;
    const horizon = region.horizon - viewY;
    ctx.drawImage(getSky(region), region.x - cameraX, skyTop);

    const layerX = (f: number) =>
      parallaxX(region.x - region.shift, cameraX, region.anchor, f);

    // stars barely move; they twinkle
    const starX = layerX(0.02);
    region.stars.forEach(([sx, sy, phase]) => {
      const a = 0.25 + 0.55 * Math.max(0, Math.sin(time * 1.3 + phase));
      rect(ctx, starX + sx, skyTop + sy, 1, 1, `rgba(244,230,200,${a.toFixed(2)})`);
    });

    const moon = getMoon();
    ctx.drawImage(
      moon,
      Math.round(parallaxX(region.moon[0], cameraX, region.anchor, 0.04) - 80),
      Math.round(region.moon[1] - viewY - 80)
    );

    drawStrip(ctx, mountains, layerX(0.12), horizon - 40, left, right);
    haze(ctx, left, right - left, horizon - 40, 70, 0.5);
    drawStrip(ctx, far, layerX(0.25), horizon - 10, left, right);
    haze(ctx, left, right - left, horizon - 10, 50, 0.45);
    const nearX = layerX(0.45);
    drawStrip(ctx, near, nearX, horizon, left, right);

    // aircraft beacons on the tallest roofs
    const blink = Math.sin(time * 2.2) > 0.4;
    if (blink) {
      near.beacons.forEach(([bx, by]) => {
        const sx = left - ((((left - nearX) % STRIP_W) + STRIP_W) % STRIP_W) + bx;
        for (let x = sx; x < right; x += STRIP_W) {
          rect(ctx, x, horizon - near.canvas.height + by, 2, 2, P.red);
        }
      });
    }
    ctx.restore();
  });
};

// ---------------------------------------------------------------- foreground

const SILHOUETTE = "#07050d";

/** One tapered leaf from (x, y) along `angle` (radians, 0 = up). */
const leaf = (
  ctx: Ctx,
  x: number,
  y: number,
  length: number,
  width: number,
  angle: number,
  color: string
) => {
  ctx.fillStyle = color;
  const dx = Math.sin(angle);
  const dy = -Math.cos(angle);
  for (let step = 0; step <= length; step += 1) {
    const t = step / length;
    // widest a third of the way up, pointed tip
    const half = Math.round(width * Math.sin(Math.PI * Math.pow(t, 0.7)));
    const cx = x + dx * step;
    const cy = y + dy * step;
    ctx.fillRect(Math.round(cx - half * -dy), Math.round(cy - half * dx), 2, 2);
    for (let k = -half; k <= half; k += 1) {
      ctx.fillRect(Math.round(cx + k * -dy), Math.round(cy + k * dx), 2, 2);
    }
  }
};

const LEAVES: Array<[number, number, number]> = [
  // [angle, length, width]
  [-0.95, 92, 10],
  [-0.45, 124, 11],
  [0.05, 140, 10],
  [0.5, 116, 11],
  [0.95, 88, 9],
  [-0.2, 78, 8],
];

/** Out-of-focus potted plant in front of the scene, rim-lit by the room. */
const leaves = (ctx: Ctx, x: number, bottom: number, rim: string, flip = false) => {
  const s = flip ? -1 : 1;
  const baseY = bottom - 30;
  LEAVES.forEach(([angle, length, width]) =>
    leaf(ctx, x - s, baseY - 1, length, width, angle * s, rim)
  );
  LEAVES.forEach(([angle, length, width]) =>
    leaf(ctx, x, baseY, length, width, angle * s, SILHOUETTE)
  );
  rect(ctx, x - 30, bottom - 34, 60, 34, SILHOUETTE);
  rect(ctx, x - 34, bottom - 38, 68, 6, SILHOUETTE);
  rect(ctx, x - 34, bottom - 39, 68, 1, rim);
};

const hangingCables = (ctx: Ctx, x: number, rim: string) => {
  [
    [0, 70, 2],
    [10, 96, 3],
    [24, 58, 2],
  ].forEach(([dx, len, w]) => {
    rect(ctx, x + dx, 0, w, len, SILHOUETTE);
    rect(ctx, x + dx - 1, 0, 1, len, rim);
    rect(ctx, x + dx - 2, len, w + 4, 6, SILHOUETTE);
  });
};

const benchCorner = (ctx: Ctx, x: number, bottom: number, rim: string) => {
  rect(ctx, x, bottom - 46, 150, 12, SILHOUETTE);
  rect(ctx, x, bottom - 47, 150, 1, rim);
  rect(ctx, x + 12, bottom - 34, 10, 34, SILHOUETTE);
  // a vise on the bench
  rect(ctx, x + 60, bottom - 74, 34, 28, SILHOUETTE);
  rect(ctx, x + 60, bottom - 75, 34, 1, rim);
  rect(ctx, x + 94, bottom - 64, 26, 6, SILHOUETTE);
};

interface ForegroundItem {
  x: number;
  anchor: number;
  /** cables hang from the top of the view; everything else stands on the bottom */
  top?: boolean;
  draw: (ctx: Ctx, x: number, bottom: number) => void;
  sprite?: HTMLCanvasElement;
}

const FG_F = 1.4;
const FG_SIZE = 320;
const FOREGROUND: ForegroundItem[] = [
  { x: -10, anchor: 20, draw: (c, x, b) => leaves(c, x, b + 24, "rgba(158,201,255,0.35)") },
  { x: 900, anchor: 60, draw: (c, x, b) => leaves(c, x, b + 30, "rgba(255,180,94,0.4)", true) },
  { x: 1040, anchor: 1040, top: true, draw: (c, x) => hangingCables(c, x, "rgba(94,234,212,0.4)") },
  { x: 1890, anchor: 1100, draw: (c, x, b) => leaves(c, x, b + 34, "rgba(94,234,212,0.35)", true) },
  { x: 2040, anchor: 2080, draw: (c, x, b) => benchCorner(c, x, b + 12, "rgba(255,180,94,0.45)") },
  { x: 3010, anchor: 3080, draw: (c, x, b) => leaves(c, x, b + 30, "rgba(255,180,94,0.4)") },
  { x: 3880, anchor: 3120, draw: (c, x, b) => leaves(c, x, b + 26, "rgba(244,230,200,0.3)", true) },
];

// Each item is thousands of 1px fills, so draw it once into a sprite.
const spriteFor = (item: ForegroundItem) => {
  if (item.sprite) return item.sprite;
  const { canvas, ctx } = makeCanvas(FG_SIZE, FG_SIZE);
  item.draw(ctx, FG_SIZE / 2, FG_SIZE);
  item.sprite = canvas;
  return canvas;
};

/** Dark shapes between the camera and the scene; they slide past faster. */
export const drawForeground = (ctx: Ctx, cameraX: number, viewW: number, viewH: number) => {
  FOREGROUND.forEach((item) => {
    const x = Math.round(parallaxX(item.x, cameraX, item.anchor, FG_F));
    if (x < -FG_SIZE || x > viewW + FG_SIZE) return;
    ctx.drawImage(spriteFor(item), x - FG_SIZE / 2, item.top ? 0 : viewH - FG_SIZE);
  });
};

// --------------------------------------------------------------- dust motes

const DUST_ZONES = [
  { x: 640, y: 388, w: 100, h: 80 },
  { x: 70, y: 430, w: 200, h: 180 },
  { x: 2440, y: 240, w: 260, h: 370 },
  { x: 1120, y: 110, w: 120, h: 480 },
  { x: 2120, y: 110, w: 120, h: 480 },
];

const MOTES = DUST_ZONES.flatMap((zone, zi) => {
  const rand = random(100 + zi);
  return Array.from({ length: Math.round((zone.w * zone.h) / 1400) }, () => ({
    zone,
    x: rand() * zone.w,
    y: rand() * zone.h,
    speed: 3 + rand() * 6,
    phase: rand() * Math.PI * 2,
  }));
});

/** Dust drifting in the light. World coordinates (call inside the camera transform). */
export const drawDust = (ctx: Ctx, time: number) => {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  MOTES.forEach((mote) => {
    const { zone } = mote;
    const y = zone.y + ((mote.y + time * mote.speed) % zone.h);
    const x = zone.x + mote.x + Math.sin(time * 0.6 + mote.phase) * 5;
    const a = 0.12 + 0.18 * Math.max(0, Math.sin(time * 1.1 + mote.phase));
    rect(ctx, x, y, 1, 1, `rgba(255,217,160,${a.toFixed(2)})`);
  });
  ctx.restore();
};
