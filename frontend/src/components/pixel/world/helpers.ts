import { P } from "./palette";

export type Ctx = CanvasRenderingContext2D;

export const rect = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
};

export const px = (ctx: Ctx, x: number, y: number, color: string) =>
  rect(ctx, x, y, 1, 1, color);

export const line = (
  ctx: Ctx,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  color: string,
  thickness = 1
) => {
  let x = Math.round(x0);
  let y = Math.round(y0);
  const targetX = Math.round(x1);
  const targetY = Math.round(y1);
  const dx = Math.abs(targetX - x);
  const sx = x < targetX ? 1 : -1;
  const dy = -Math.abs(targetY - y);
  const sy = y < targetY ? 1 : -1;
  let error = dx + dy;

  while (true) {
    rect(ctx, x, y, thickness, thickness, color);
    if (x === targetX && y === targetY) break;
    const e2 = 2 * error;
    if (e2 >= dy) {
      error += dy;
      x += sx;
    }
    if (e2 <= dx) {
      error += dx;
      y += sy;
    }
  }
};

export const dither = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  step = 4,
  offset = 0
) => {
  ctx.fillStyle = color;
  for (let yy = y; yy < y + h; yy += step) {
    for (let xx = x + ((yy / step) % 2 === 0 ? offset : 0); xx < x + w; xx += step) {
      ctx.fillRect(Math.round(xx), Math.round(yy), 1, 1);
    }
  }
};

const hexToRgba = (hex: string, alpha: number) => {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const glow = (
  ctx: Ctx,
  cx: number,
  cy: number,
  radius: number,
  color: string,
  alpha = 0.25
) => {
  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  gradient.addColorStop(0, hexToRgba(color, alpha));
  gradient.addColorStop(0.45, hexToRgba(color, alpha * 0.45));
  gradient.addColorStop(1, hexToRgba(color, 0));
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
  ctx.restore();
};

export const pixelCircle = (
  ctx: Ctx,
  cx: number,
  cy: number,
  radius: number,
  color: string
) => {
  ctx.fillStyle = color;
  for (let y = -radius; y <= radius; y += 1) {
    const span = Math.floor(Math.sqrt(radius * radius - y * y));
    ctx.fillRect(Math.round(cx - span), Math.round(cy + y), span * 2 + 1, 1);
  }
};

const GLYPHS: Record<string, string[]> = {
  A: ["010", "101", "111", "101", "101"],
  B: ["110", "101", "110", "101", "110"],
  C: ["011", "100", "100", "100", "011"],
  D: ["110", "101", "101", "101", "110"],
  E: ["111", "100", "110", "100", "111"],
  F: ["111", "100", "110", "100", "100"],
  G: ["011", "100", "101", "101", "011"],
  H: ["101", "101", "111", "101", "101"],
  I: ["111", "010", "010", "010", "111"],
  J: ["001", "001", "001", "101", "010"],
  K: ["101", "101", "110", "101", "101"],
  L: ["100", "100", "100", "100", "111"],
  M: ["101", "111", "111", "101", "101"],
  N: ["101", "111", "111", "111", "101"],
  O: ["010", "101", "101", "101", "010"],
  P: ["110", "101", "110", "100", "100"],
  Q: ["010", "101", "101", "111", "011"],
  R: ["110", "101", "110", "101", "101"],
  S: ["011", "100", "010", "001", "110"],
  T: ["111", "010", "010", "010", "010"],
  U: ["101", "101", "101", "101", "111"],
  V: ["101", "101", "101", "101", "010"],
  W: ["101", "101", "111", "111", "101"],
  X: ["101", "101", "010", "101", "101"],
  Y: ["101", "101", "010", "010", "010"],
  Z: ["111", "001", "010", "100", "111"],
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["110", "001", "010", "100", "111"],
  "3": ["110", "001", "010", "001", "110"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "110", "001", "110"],
  "6": ["011", "100", "111", "101", "111"],
  "7": ["111", "001", "010", "010", "010"],
  "8": ["111", "101", "111", "101", "111"],
  "9": ["111", "101", "111", "001", "110"],
  " ": ["000", "000", "000", "000", "000"],
  "-": ["000", "000", "111", "000", "000"],
  ".": ["000", "000", "000", "000", "010"],
  ":": ["000", "010", "000", "010", "000"],
  "/": ["001", "001", "010", "100", "100"],
  ">": ["100", "010", "001", "010", "100"],
  "*": ["101", "010", "111", "010", "101"],
};

export const pixelTextWidth = (text: string, scale = 1, gap = 1) =>
  text.length * (3 + gap) * scale - gap * scale;

export const drawPixelText = (
  ctx: Ctx,
  text: string,
  x: number,
  y: number,
  color: string,
  scale = 1,
  gap = 1
) => {
  let cursor = x;
  for (const character of text.toUpperCase()) {
    const glyph = GLYPHS[character] ?? GLYPHS[" "];
    for (let row = 0; row < 5; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        if (glyph[row][col] === "1") {
          rect(ctx, cursor + col * scale, y + row * scale, scale, scale, color);
        }
      }
    }
    cursor += (3 + gap) * scale;
  }
  return cursor - x;
};

export const drawWindow = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  moon = true
) => {
  rect(ctx, x - 6, y - 6, w + 12, h + 12, P.line);
  rect(ctx, x - 3, y - 3, w + 6, h + 6, P.wallDark);
  rect(ctx, x, y, w, h, "#0b1830");
  dither(ctx, x, y, w, h, "rgba(125, 211, 252, 0.08)", 6, 2);

  if (moon) {
    pixelCircle(ctx, x + w - 52, y + 100, 14, P.cream);
    rect(ctx, x + w - 58, y + 94, 5, 5, "#d9c7a3");
    rect(ctx, x + w - 46, y + 106, 4, 4, "#d9c7a3");
    glow(ctx, x + w - 52, y + 100, 46, P.amberGlow, 0.18);
  }

  const skyline = [
    [0.02, 0.42],
    [0.12, 0.62],
    [0.22, 0.5],
    [0.34, 0.7],
    [0.44, 0.36],
    [0.56, 0.58],
    [0.68, 0.46],
    [0.8, 0.66],
    [0.92, 0.52],
  ];
  skyline.forEach(([tx, th], index) => {
    const buildingW = 14 + (index % 3) * 8;
    const buildingH = Math.round(h * th);
    const bx = x + Math.round(w * tx);
    const by = y + h - buildingH;
    rect(ctx, bx, by, buildingW, buildingH, "#0f1728");
    for (let wy = by + 5; wy < y + h - 4; wy += 8) {
      for (let wx = bx + 3; wx < bx + buildingW - 3; wx += 7) {
        if ((wx + wy) % 11 < 5) {
          rect(ctx, wx, wy, 2, 2, index % 2 === 0 ? P.amber : P.teal);
        }
      }
    }
  });

  for (let i = 0; i < 14; i += 1) {
    const rx = x + 8 + ((i * 37) % Math.max(10, w - 16));
    const ry = y + 12 + ((i * 53) % Math.max(10, h - 24));
    rect(ctx, rx, ry, 1, 4, "rgba(125, 211, 252, 0.25)");
  }

  rect(ctx, x + Math.floor(w / 2) - 1, y, 2, h, P.line);
  rect(ctx, x, y + Math.floor(h / 2) - 1, w, 2, P.line);
  rect(ctx, x - 10, y + h + 3, w + 20, 7, P.line);
  rect(ctx, x - 7, y + h + 3, w + 14, 3, P.wallLight);

  rect(ctx, x - 24, y - 6, 16, h + 22, P.plum);
  rect(ctx, x - 20, y, 8, h + 10, P.violetDark);
  rect(ctx, x + w + 8, y - 6, 16, h + 22, P.plum);
  rect(ctx, x + w + 12, y, 8, h + 10, P.violetDark);
};

export const drawPlant = (ctx: Ctx, x: number, y: number, scale = 1) => {
  const s = scale;
  rect(ctx, x + 5 * s, y - 2 * s, 14 * s, 3 * s, P.amberDark);
  rect(ctx, x + 4 * s, y - 14 * s, 16 * s, 13 * s, P.amberDark);
  rect(ctx, x + 5 * s, y - 15 * s, 14 * s, 3 * s, P.line);
  rect(ctx, x + 7 * s, y - 20 * s, 10 * s, 7 * s, P.tealDark);
  rect(ctx, x + 3 * s, y - 28 * s, 7 * s, 12 * s, P.teal);
  rect(ctx, x + 14 * s, y - 32 * s, 7 * s, 16 * s, P.green);
  rect(ctx, x + 9 * s, y - 38 * s, 6 * s, 14 * s, P.teal);
  rect(ctx, x + 2 * s, y - 24 * s, 5 * s, 7 * s, P.tealDark);
  rect(ctx, x + 17 * s, y - 25 * s, 5 * s, 8 * s, P.tealDark);
};

export const drawMug = (ctx: Ctx, x: number, y: number) => {
  rect(ctx, x, y, 14, 13, P.cream);
  rect(ctx, x + 2, y + 2, 10, 9, "#2b1d3f");
  rect(ctx, x + 3, y + 3, 8, 2, P.amber);
  rect(ctx, x + 14, y + 3, 4, 2, P.cream);
  rect(ctx, x + 16, y + 5, 2, 5, P.cream);
  rect(ctx, x + 14, y + 9, 4, 2, P.cream);
};

export const drawCat = (
  ctx: Ctx,
  x: number,
  y: number,
  sleeping = true
) => {
  rect(ctx, x + 2, y - 8, 20, 8, P.wallDark);
  rect(ctx, x + 4, y - 10, 16, 3, P.wallDark);
  rect(ctx, x + 16, y - 14, 9, 8, P.wallDark);
  rect(ctx, x + 16, y - 17, 3, 4, P.wallDark);
  rect(ctx, x + 22, y - 17, 3, 4, P.wallDark);
  rect(ctx, x + 18, y - 12, 2, 1, sleeping ? P.wallDark : P.teal);
  rect(ctx, x + 23, y - 12, 2, 1, sleeping ? P.wallDark : P.teal);
  rect(ctx, x + 20, y - 9, 2, 1, P.pink);
  rect(ctx, x + 0, y - 6, 5, 2, P.wallDark);
  rect(ctx, x - 2, y - 9, 3, 3, P.wallDark);
  if (sleeping) {
    drawPixelText(ctx, "Z", x + 26, y - 22, P.violetLight, 1);
    drawPixelText(ctx, "Z", x + 31, y - 29, P.violetLight, 1);
  }
};

export const drawChair = (ctx: Ctx, x: number, y: number) => {
  rect(ctx, x + 4, y - 54, 28, 34, P.violetDark);
  rect(ctx, x + 7, y - 51, 22, 28, P.violet);
  rect(ctx, x + 10, y - 47, 16, 2, P.violetLight);
  rect(ctx, x + 2, y - 22, 32, 8, P.plum);
  rect(ctx, x + 4, y - 20, 28, 4, P.violetDark);
  rect(ctx, x + 16, y - 14, 4, 10, P.line);
  rect(ctx, x + 6, y - 4, 24, 4, P.wallLight);
  rect(ctx, x + 8, y, 5, 3, P.black);
  rect(ctx, x + 23, y, 5, 3, P.black);
};

export const drawRack = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  units = 12
) => {
  rect(ctx, x - 3, y - 3, w + 6, h + 6, P.line);
  rect(ctx, x, y, w, h, P.black);
  rect(ctx, x + 2, y + 2, w - 4, h - 4, P.deep);
  rect(ctx, x + 2, y + 2, w - 4, 15, P.wallDark);
  drawPixelText(ctx, label, x + 6, y + 5, P.teal, 1);
  drawPixelText(ctx, "12U", x + w - 24, y + 5, P.amber, 1);

  const top = 21;
  const bottom = 12;
  const unitHeight = Math.floor((h - top - bottom) / units);

  for (let row = 0; row < units; row += 1) {
    const ry = y + top + row * unitHeight;
    const uh = unitHeight - 3;
    rect(ctx, x + 4, ry, w - 8, uh, P.plum);
    rect(ctx, x + 6, ry + 2, w - 12, 2, P.wallLight);

    if (row === 0) {
      for (let port = 0; port < 8; port += 1) {
        rect(ctx, x + 9 + port * 9, ry + 9, 5, 5, P.black);
        rect(
          ctx,
          x + 10 + port * 9,
          ry + 10,
          3,
          3,
          port % 3 === 0 ? P.tealDark : P.wallLight
        );
      }
      rect(ctx, x + w - 22, ry + 8, 3, 3, P.green);
      rect(ctx, x + w - 15, ry + 8, 3, 3, P.teal);
      drawPixelText(ctx, "SW", x + w - 32, ry + 5, P.teal, 1);
    } else if (row === units - 1) {
      rect(ctx, x + 8, ry + 6, 30, uh - 10, P.wallDark);
      rect(ctx, x + 10, ry + 8, 26, 10, P.deep);
      drawPixelText(ctx, "UPS", x + 12, ry + 11, P.green, 1);
      rect(ctx, x + w - 20, ry + 8, 4, 4, P.green);
      rect(ctx, x + w - 12, ry + 8, 4, 4, P.amber);
    } else {
      rect(ctx, x + 6, ry + 6, 3, 3, row % 3 === 0 ? P.teal : P.green);
      rect(ctx, x + 11, ry + 6, 3, 3, row % 4 === 0 ? P.amber : P.tealDark);
      rect(ctx, x + 16, ry + 6, 3, 3, row % 5 === 0 ? P.pink : P.wallLight);
      for (let bay = 0; bay < 3; bay += 1) {
        rect(ctx, x + 24 + bay * 7, ry + 5, 5, uh - 10, P.wallDark);
        rect(ctx, x + 25 + bay * 7, ry + 7, 3, uh - 14, P.deep);
      }
      for (let vent = 0; vent < 5; vent += 1) {
        rect(ctx, x + w - 30 + vent * 4, ry + 5, 2, uh - 10, P.black);
      }
    }
  }

  rect(ctx, x + w - 3, y + 10, 1, h - 20, "rgba(255,255,255,0.06)");
  rect(ctx, x + 4, y + h - 10, w - 8, 8, P.wallDark);
  line(ctx, x + 8, y + h - 8, x + 18, y + h + 4, P.red);
  line(ctx, x + 14, y + h - 8, x + 24, y + h + 4, P.teal);
  line(ctx, x + 20, y + h - 8, x + 30, y + h + 4, P.amber);
};

export const drawDesktopTower = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  rect(ctx, x - 2, y + h - 2, w + 4, 4, "rgba(0,0,0,0.35)");
  rect(ctx, x, y, w, h, P.black);
  rect(ctx, x + 2, y + 2, w - 4, h - 4, P.wallDark);

  // front panel
  rect(ctx, x + 2, y + 2, 16, h - 4, P.plum);
  rect(ctx, x + 4, y + 6, 12, 8, P.deep);
  rect(ctx, x + 7, y + 9, 6, 3, P.green);
  rect(ctx, x + 4, y + 20, 12, 2, P.line);
  rect(ctx, x + 4, y + 26, 12, 2, P.line);
  for (let vy = y + 40; vy < y + h - 30; vy += 6) {
    rect(ctx, x + 4, vy, 12, 2, P.wallDark);
  }

  // glass side panel
  rect(ctx, x + 20, y + 4, w - 24, h - 8, "#120d1d");
  rect(ctx, x + 22, y + 6, w - 28, h - 12, "#1a1330");

  // motherboard + CPU + RAM
  rect(ctx, x + 26, y + 60, w - 34, 170, P.deep);
  rect(ctx, x + 36, y + 90, 38, 38, P.wallDark);
  rect(ctx, x + 38, y + 92, 34, 34, P.line);
  pixelCircle(ctx, x + 55, y + 109, 14, P.tealDark);
  pixelCircle(ctx, x + 55, y + 109, 10, P.teal);
  pixelCircle(ctx, x + 55, y + 109, 4, P.deep);
  rect(ctx, x + 80, y + 86, 5, 50, P.violet);
  rect(ctx, x + 88, y + 86, 5, 50, P.violetDark);

  // PCIe card + PSU shroud + drive bays
  rect(ctx, x + 30, y + 190, w - 40, 12, P.plum);
  rect(ctx, x + 34, y + 194, w - 48, 4, P.line);
  rect(ctx, x + 22, y + h - 64, w - 24, 44, P.wallDark);
  rect(ctx, x + 26, y + h - 56, w - 32, 10, P.black);
  rect(ctx, x + 26, y + h - 42, w - 32, 10, P.black);
  rect(ctx, x + 30, y + h - 54, w - 40, 2, P.tealDark);

  // labels on the glass
  drawPixelText(ctx, "UBUNTU", x + 24, y + 14, P.cream, 1);
  drawPixelText(ctx, "26.04 LTS", x + 24, y + 22, P.teal, 1);
  drawPixelText(ctx, "RYZEN 5", x + 64, y + 22, P.amber, 1);
  drawPixelText(ctx, "66 CT", x + 24, y + 34, P.teal, 1);

  glow(ctx, x + 55, y + 109, 56, P.teal, 0.12);
};

export const drawDriveShelf = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  rect(ctx, x - 2, y + h - 2, w + 4, 3, "rgba(0,0,0,0.35)");
  rect(ctx, x, y, w, h, P.wallDark);
  rect(ctx, x + 2, y + 2, w - 4, h - 4, P.deep);

  for (let drive = 0; drive < 3; drive += 1) {
    const dy = y + 7 + drive * 22;
    rect(ctx, x + 4, dy, w - 8, 18, P.plum);
    rect(ctx, x + 6, dy + 2, w - 12, 14, P.wallDark);
    rect(ctx, x + 8, dy + 6, w - 20, 2, P.line);
    rect(ctx, x + 8, dy + 11, 4, 2, P.teal);
    rect(ctx, x + w - 12, dy + 3, 3, 3, P.green);
  }

  pixelCircle(ctx, x + w / 2, y + 88, 8, P.wallDark);
  pixelCircle(ctx, x + w / 2, y + 88, 4, P.line);
  drawPixelText(ctx, "3.7 TB", x + 8, y + h - 14, P.amber, 1);
  rect(ctx, x + w - 10, y + 4, 3, 3, P.teal);
};

export const drawCertFrame = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string = P.amber
) => {
  rect(ctx, x - 2, y - 2, w + 4, h + 4, P.amberDark);
  rect(ctx, x, y, w, h, P.paper);
  rect(ctx, x + 3, y + 3, w - 6, h - 6, "#e8d9ba");
  rect(ctx, x + 6, y + 7, w - 12, 2, P.line);
  rect(ctx, x + 6, y + 12, Math.max(6, w - 24), 1, P.line);
  rect(ctx, x + 6, y + 16, Math.max(6, w - 30), 1, P.line);
  rect(ctx, x + 6, y + 20, Math.max(6, w - 18), 1, P.line);
  pixelCircle(ctx, x + w - 14, y + h - 12, 5, color);
  rect(ctx, x + w - 16, y + h - 8, 4, 7, P.amberDark);
};

export const drawToolboard = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  rect(ctx, x, y, w, h, P.wallDark);
  rect(ctx, x + 2, y + 2, w - 4, h - 4, "#1f1830");
  for (let gx = x + 8; gx < x + w - 8; gx += 16) {
    for (let gy = y + 8; gy < y + h - 8; gy += 16) {
      rect(ctx, gx, gy, 1, 1, P.line);
    }
  }
  rect(ctx, x + 18, y + 18, 3, 34, P.cream);
  rect(ctx, x + 15, y + 14, 9, 7, P.line);
  rect(ctx, x + 40, y + 20, 3, 30, P.teal);
  rect(ctx, x + 36, y + 16, 11, 5, P.wallLight);
  rect(ctx, x + 64, y + 16, 22, 4, P.amber);
  rect(ctx, x + 60, y + 20, 5, 14, P.amberDark);
  rect(ctx, x + 86, y + 18, 4, 28, P.blue);
  rect(ctx, x + 82, y + 14, 12, 6, P.wallLight);
  rect(ctx, x + 112, y + 20, 18, 18, P.line);
  rect(ctx, x + 116, y + 24, 10, 10, P.deep);
  line(ctx, x + 20, y + 66, x + 50, y + 66, P.wallLight);
  line(ctx, x + 70, y + 62, x + 96, y + 62, P.wallLight);
  line(ctx, x + 112, y + 66, x + 140, y + 66, P.wallLight);
};

export const drawPrinter = (ctx: Ctx, x: number, y: number) => {
  rect(ctx, x - 4, y + 78, 132, 10, P.black);
  rect(ctx, x, y + 66, 124, 12, P.wallDark);
  rect(ctx, x + 6, y + 30, 112, 38, P.deep);
  rect(ctx, x + 10, y + 34, 104, 30, "#0c0a16");
  rect(ctx, x + 20, y + 40, 4, 64, P.line);
  rect(ctx, x + 98, y + 40, 4, 64, P.line);
  rect(ctx, x + 20, y + 38, 82, 4, P.line);
  rect(ctx, x + 24, y + 44, 74, 3, P.wallLight);
  rect(ctx, x + 52, y + 46, 18, 12, P.violetDark);
  rect(ctx, x + 55, y + 49, 12, 6, P.violet);
  rect(ctx, x + 58, y + 52, 3, 2, P.teal);
  rect(ctx, x + 50, y + 58, 22, 3, P.wallLight);
  rect(ctx, x + 30, y + 68, 60, 4, P.wallLight);
  rect(ctx, x + 36, y + 72, 48, 3, P.plum);
  rect(ctx, x + 44, y + 64, 10, 5, P.violet);
  rect(ctx, x + 60, y + 62, 12, 7, P.tealDark);
  rect(ctx, x + 64, y + 58, 5, 5, P.teal);
  rect(ctx, x + 70, y + 56, 2, 8, P.cream);
  rect(ctx, x + 76, y + 60, 5, 3, P.amber);
  rect(ctx, x + 108, y + 24, 6, 6, P.green);
  rect(ctx, x + 8, y + 40, 6, 4, P.teal);
  pixelCircle(ctx, x + 114, y + 20, 14, P.amberDark);
  pixelCircle(ctx, x + 114, y + 20, 9, P.amber);
  pixelCircle(ctx, x + 114, y + 20, 4, P.deep);
  rect(ctx, x + 110, y + 34, 8, 4, P.line);
  rect(ctx, x + 20, y + 78, 8, 4, P.black);
  rect(ctx, x + 96, y + 78, 8, 4, P.black);
  glow(ctx, x + 62, y + 50, 48, P.violet, 0.16);
};

export const drawSpool = (
  ctx: Ctx,
  x: number,
  y: number,
  color: string
) => {
  pixelCircle(ctx, x, y, 12, P.wallDark);
  pixelCircle(ctx, x, y, 9, color);
  pixelCircle(ctx, x, y, 3, P.wallDark);
  rect(ctx, x - 2, y + 12, 4, 5, P.line);
};

export const drawToolbox = (ctx: Ctx, x: number, y: number) => {
  rect(ctx, x, y, 46, 26, P.red);
  rect(ctx, x + 2, y + 2, 42, 8, "#d94d63");
  rect(ctx, x + 18, y - 4, 10, 4, P.line);
  rect(ctx, x + 22, y - 8, 2, 4, P.wallLight);
  rect(ctx, x + 6, y + 12, 34, 2, "#d94d63");
  rect(ctx, x + 8, y + 16, 30, 6, P.black);
};

export const drawStool = (ctx: Ctx, x: number, y: number) => {
  rect(ctx, x + 2, y - 30, 28, 6, P.amberDark);
  rect(ctx, x + 5, y - 34, 22, 4, P.amber);
  rect(ctx, x + 8, y - 24, 3, 24, P.line);
  rect(ctx, x + 21, y - 24, 3, 24, P.line);
  rect(ctx, x + 11, y - 12, 12, 2, P.line);
  rect(ctx, x + 6, y, 6, 3, P.black);
  rect(ctx, x + 20, y, 6, 3, P.black);
};

export const drawCampfire = (ctx: Ctx, x: number, y: number) => {
  rect(ctx, x - 2, y - 6, 44, 6, P.wallDark);
  rect(ctx, x + 2, y - 10, 34, 4, P.amberDark);
  line(ctx, x + 6, y - 4, x + 36, y - 16, P.amberDark, 3);
  line(ctx, x + 36, y - 4, x + 6, y - 16, P.amberDark, 3);
  rect(ctx, x + 10, y - 20, 20, 14, P.amberDark);
  rect(ctx, x + 14, y - 30, 12, 14, P.amber);
  rect(ctx, x + 17, y - 38, 6, 14, P.amberGlow);
  rect(ctx, x + 15, y - 24, 4, 5, P.red);
  rect(ctx, x + 26, y - 22, 3, 5, P.red);
  glow(ctx, x + 20, y - 20, 90, P.amber, 0.28);
};

export const drawCity = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  const buildings = [
    [0, 0.55],
    [0.06, 0.4],
    [0.12, 0.66],
    [0.2, 0.5],
    [0.27, 0.72],
    [0.35, 0.44],
    [0.42, 0.6],
    [0.5, 0.34],
    [0.58, 0.58],
    [0.65, 0.48],
    [0.72, 0.7],
    [0.8, 0.42],
    [0.87, 0.62],
    [0.94, 0.5],
  ];
  buildings.forEach(([tx, th], index) => {
    const bw = 34 + (index % 3) * 14;
    const bh = Math.round(h * th);
    const bx = x + Math.round(w * tx);
    const by = y + h - bh;
    rect(ctx, bx, by, bw, bh, index % 2 === 0 ? "#0c1424" : "#101a2c");
    for (let wy = by + 8; wy < y + h - 6; wy += 12) {
      for (let wx = bx + 5; wx < bx + bw - 5; wx += 10) {
        if ((wx * 3 + wy * 5 + index) % 13 < 7) {
          rect(ctx, wx, wy, 2, 2, index % 3 === 0 ? P.teal : P.amber);
        }
      }
    }
  });
};

export const drawRailing = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  rect(ctx, x, y + h - 4, w, 4, P.line);
  rect(ctx, x, y + 8, w, 3, P.wallLight);
  for (let px = x; px <= x + w; px += 70) {
    rect(ctx, px, y, 4, h, P.wallLight);
    rect(ctx, px + 1, y + 4, 2, h - 8, P.line);
  }
};

export const drawStars = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  count: number
) => {
  for (let i = 0; i < count; i += 1) {
    const sx = x + ((i * 173 + 37) % Math.max(1, Math.round(w)));
    const sy = y + ((i * 97 + 23) % Math.max(1, Math.round(h)));
    const size = i % 9 === 0 ? 2 : 1;
    rect(ctx, sx, sy, size, size, i % 5 === 0 ? P.cream : "rgba(244,230,200,0.55)");
  }
};

export const drawAvatar = (
  ctx: Ctx,
  x: number,
  y: number,
  frame: number,
  sitting = false
) => {
  const walk = frame % 4;
  const bob = walk === 1 || walk === 3 ? -1 : 0;
  const legOffset = walk === 1 ? 2 : walk === 3 ? -2 : 0;

  rect(ctx, x - 1, y - 1, 18, 3, "rgba(0,0,0,0.35)");

  if (sitting) {
    rect(ctx, x + 2, y - 14, 12, 8, P.violet);
    rect(ctx, x + 4, y - 6, 5, 4, P.wallLight);
    rect(ctx, x + 11, y - 6, 5, 4, P.wallLight);
    rect(ctx, x + 3, y - 22, 10, 8, "#e8b88a");
    rect(ctx, x + 2, y - 24, 12, 4, P.wallDark);
    rect(ctx, x + 4, y - 20, 2, 1, P.teal);
    rect(ctx, x + 10, y - 20, 2, 1, P.teal);
    rect(ctx, x + 15, y - 18, 4, 9, P.tealDark);
    return;
  }

  rect(ctx, x + 3, y - 10 + bob, 3, 9 + legOffset, P.wallDark);
  rect(ctx, x + 10, y - 10 + bob, 3, 9 - legOffset, P.wallDark);
  rect(ctx, x + 2, y - 2, 5, 2, P.black);
  rect(ctx, x + 9, y - 2, 5, 2, P.black);
  rect(ctx, x + 2, y - 22 + bob, 12, 12, P.violet);
  rect(ctx, x + 3, y - 21 + bob, 10, 4, P.violetLight);
  rect(ctx, x + 13, y - 20 + bob, 4, 9, P.tealDark);
  rect(ctx, x + 15, y - 17 + bob, 1, 4, P.teal);
  rect(ctx, x + 4, y - 31 + bob, 9, 9, "#e8b88a");
  rect(ctx, x + 3, y - 33 + bob, 11, 4, P.wallDark);
  rect(ctx, x + 2, y - 30 + bob, 2, 4, P.wallDark);
  rect(ctx, x + 5, y - 28 + bob, 2, 1, P.teal);
  rect(ctx, x + 10, y - 28 + bob, 2, 1, P.teal);
  rect(ctx, x + 7, y - 25 + bob, 3, 1, P.amberDark);
  rect(ctx, x + 1, y - 20 + bob, 2, 7, P.violet);
  rect(ctx, x + 14, y - 20 + bob, 2, 7, P.violet);
  rect(ctx, x + 3, y - 36 + bob, 11, 3, P.violetDark);
  rect(ctx, x + 2, y - 34 + bob, 13, 2, P.violetDark);
};
