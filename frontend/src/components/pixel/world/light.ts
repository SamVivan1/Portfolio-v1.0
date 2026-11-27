import { FLOOR_Y, WORLD_HEIGHT } from "../../../lib/chapters";
import { Ctx, hexToRgba } from "./helpers";

// Pixel-art lighting: hard-edged bands instead of smooth gradients, light is
// added ("lighter"), shade is multiplied with a cool violet so shadows hue-shift
// instead of going grey.
const SHADE = "#3b2c63";
const BANDS = 4;

const fillEllipse = (
  ctx: Ctx,
  cx: number,
  cy: number,
  rx: number,
  ry: number
) => {
  for (let y = -ry; y <= ry; y += 1) {
    const span = Math.floor(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry))));
    ctx.fillRect(Math.round(cx - span), Math.round(cy + y), span * 2 + 1, 1);
  }
};

/** Stacked ellipses: each band adds a step, so the centre is brightest. */
export const bandedEllipse = (
  ctx: Ctx,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  color: string,
  alpha: number,
  mode: GlobalCompositeOperation = "lighter"
) => {
  ctx.save();
  ctx.globalCompositeOperation = mode;
  ctx.fillStyle = hexToRgba(color, alpha / BANDS);
  for (let band = 0; band < BANDS; band += 1) {
    const k = 1 - band / BANDS;
    if (rx * k < 1 || ry * k < 1) break;
    fillEllipse(ctx, cx, cy, Math.round(rx * k), Math.round(ry * k));
  }
  ctx.restore();
};

/** A light cone from a lamp down to `bottom`, banded across and along its length. */
export const lightCone = (
  ctx: Ctx,
  cx: number,
  top: number,
  bottom: number,
  topWidth: number,
  bottomWidth: number,
  color: string,
  alpha: number
) => {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  const height = bottom - top;
  for (let y = top; y < bottom; y += 1) {
    const t = (y - top) / height;
    // Fade along the cone in hard steps.
    const fade = 1 - Math.floor(t * BANDS) / BANDS;
    const width = topWidth + (bottomWidth - topWidth) * t;
    ctx.fillStyle = hexToRgba(color, (alpha * fade) / 3);
    for (let band = 0; band < 3; band += 1) {
      const w = Math.round(width * (1 - band * 0.3));
      ctx.fillRect(Math.round(cx - w / 2), y, w, 1);
    }
  }
  ctx.restore();
};

/** Darken a rectangle in hard vertical steps; `fromTop` puts the darkest band at the top. */
export const shadeBands = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  strength: number,
  fromTop = true
) => {
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  for (let band = 0; band < BANDS; band += 1) {
    const level = fromTop ? BANDS - band : band + 1;
    // integer band edges, so no row is multiplied twice
    const y0 = Math.round(y + (h * band) / BANDS);
    const y1 = Math.round(y + (h * (band + 1)) / BANDS);
    ctx.fillStyle = hexToRgba(SHADE, (strength * level) / BANDS);
    ctx.fillRect(Math.round(x), y0, Math.round(w), y1 - y0);
  }
  ctx.restore();
};

/** Same, but darkest at the left (`fromLeft`) or right edge. */
export const shadeColumns = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  strength: number,
  fromLeft = true
) => {
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  for (let band = 0; band < BANDS; band += 1) {
    const level = fromLeft ? BANDS - band : band + 1;
    const x0 = Math.round(x + (w * band) / BANDS);
    const x1 = Math.round(x + (w * (band + 1)) / BANDS);
    ctx.fillStyle = hexToRgba(SHADE, (strength * level) / BANDS);
    ctx.fillRect(x0, Math.round(y), x1 - x0, Math.round(h));
  }
  ctx.restore();
};

/** Contact shadow where an object meets the floor. */
export const contactShadow = (ctx: Ctx, x: number, w: number, y = FLOOR_Y) =>
  bandedEllipse(ctx, x + w / 2, y + 1, w / 2 + 8, 6, SHADE, 0.9, "multiply");

interface RoomLight {
  /** ceiling lamps: x positions of a bulb at y 96 */
  ceiling: number[];
  /** objects standing on the floor: [x, width] */
  grounded: Array<[number, number]>;
  /** desk-like surfaces whose underside is in shadow: [x, top, width] */
  undersides: Array<[number, number, number]>;
}

const ROOM_LIGHTS: Array<{ x: number; w: number } & RoomLight> = [
  {
    x: 0,
    w: 900,
    ceiling: [180, 580],
    grounded: [
      [312, 420],
      [262, 36],
      [764, 32],
      [846, 22],
    ],
    undersides: [[322, 491, 400]],
  },
  {
    x: 1000,
    w: 900,
    ceiling: [1180, 1580],
    grounded: [
      [1088, 114],
      [1227, 206],
      [1448, 74],
      [1540, 220],
      [1772, 34],
      [1808, 26],
    ],
    undersides: [[1558, 482, 184]],
  },
  {
    x: 2000,
    w: 900,
    ceiling: [2180],
    grounded: [
      [2030, 400],
      [2440, 32],
      [2458, 250],
      [2858, 26],
    ],
    undersides: [
      [2050, 489, 360],
      [2478, 552, 210],
    ],
  },
];

/** Static lighting for the three indoor rooms. Draw after the furniture. */
export const lightRooms = (ctx: Ctx) => {
  ROOM_LIGHTS.forEach((room) => {
    // Ambient occlusion: under the ceiling, into the corners, along the floor line.
    shadeBands(ctx, room.x, 70, room.w, 90, 0.5, true);
    shadeColumns(ctx, room.x, 70, 70, FLOOR_Y - 70, 0.45, true);
    shadeColumns(ctx, room.x + room.w - 70, 70, 70, FLOOR_Y - 70, 0.45, false);
    shadeBands(ctx, room.x, FLOOR_Y - 34, room.w, 24, 0.35, false);

    room.undersides.forEach(([x, top, w]) =>
      shadeBands(ctx, x, top, w, FLOOR_Y - top, 0.55, true)
    );
    room.grounded.forEach(([x, w]) => contactShadow(ctx, x, w));

    room.ceiling.forEach((x) => {
      lightCone(ctx, x + 1, 97, FLOOR_Y, 14, 230, "#ffb45e", 0.07);
      bandedEllipse(ctx, x + 1, FLOOR_Y + 8, 120, 9, "#ffb45e", 0.12);
    });
  });

  // Front of the floor falls off into darkness, which reads as depth.
  shadeBands(ctx, 0, FLOOR_Y + 24, 3000, WORLD_HEIGHT - FLOOR_Y - 24, 0.75, false);
};
