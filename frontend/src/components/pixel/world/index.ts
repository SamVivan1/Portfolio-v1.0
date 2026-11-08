import { FLOOR_Y, WORLD_HEIGHT, WORLD_WIDTH } from "../../../lib/chapters";
import { Ctx, drawAvatar, glow, rect } from "./helpers";
import { P } from "./palette";
import { drawWorldBase } from "./scenes";

let worldCanvas: HTMLCanvasElement | null = null;

export const getWorldCanvas = (): HTMLCanvasElement => {
  if (worldCanvas) return worldCanvas;
  const canvas = document.createElement("canvas");
  canvas.width = WORLD_WIDTH;
  canvas.height = WORLD_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create the pixel world canvas.");
  ctx.imageSmoothingEnabled = false;
  drawWorldBase(ctx);
  worldCanvas = canvas;
  return canvas;
};

interface DynamicOptions {
  cameraX: number;
  viewY: number;
  viewW: number;
  viewH: number;
  time: number;
  moving: boolean;
  avatarX: number;
  showAvatar: boolean;
  reduced: boolean;
}

const rainDrops = Array.from({ length: 34 }, (_, index) => ({
  x: (index * 43 + 11) % 210,
  y: (index * 67 + 29) % 280,
  speed: 26 + (index % 5) * 9,
  length: 2 + (index % 3),
}));

const rackRows = Array.from({ length: 24 }, (_, index) => index);

const starSeeds = Array.from({ length: 26 }, (_, index) => ({
  x: 3010 + ((index * 137 + 43) % 880),
  y: 24 + ((index * 79 + 17) % 330),
  phase: index * 0.73,
}));

const drawRain = (ctx: Ctx, time: number) => {
  ctx.save();
  ctx.beginPath();
  ctx.rect(60, 130, 220, 290);
  ctx.clip();
  rainDrops.forEach((drop) => {
    const y = 130 + ((drop.y + time * drop.speed) % 290);
    const x = 64 + drop.x;
    rect(ctx, x, y, 1, drop.length, "rgba(125,211,252,0.34)");
  });
  ctx.restore();
};

const drawRackLeds = (ctx: Ctx, time: number) => {
  const racks = [
    { x: 1040, phase: 0 },
    { x: 1280, phase: 1.7 },
  ];
  racks.forEach((rack) => {
    rackRows.forEach((row) => {
      const y = 250 + 20 + row * 14 + 6;
      if (y > 250 + 370 - 12) return;
      const pulse = Math.sin(time * 2.4 + row * 0.9 + rack.phase);
      const bright = pulse > 0.2;
      rect(ctx, rack.x + 6, y, 3, 2, bright ? P.teal : P.tealDark);
      rect(
        ctx,
        rack.x + 11,
        y,
        3,
        2,
        Math.sin(time * 1.7 + row * 1.3 + rack.phase) > 0.55 ? P.amber : P.amberDark
      );
      rect(
        ctx,
        rack.x + 16,
        y,
        3,
        2,
        Math.sin(time * 3.1 + row * 0.6 + rack.phase) > 0.7 ? P.pink : P.violetDark
      );
    });
  });
};

const drawMonitor = (ctx: Ctx, time: number) => {
  const cursorOn = Math.floor(time * 2) % 2 === 0;
  rect(ctx, 410, 408, 7, 3, cursorOn ? P.green : "#081826");
  const scanY = 318 + Math.floor((time * 22) % 108);
  rect(ctx, 404, scanY, 118, 1, "rgba(94,234,212,0.12)");
  if (Math.floor(time * 0.7) % 7 === 0) {
    rect(ctx, 408, 346, 34, 3, P.violetLight);
  }
};

const drawSteam = (ctx: Ctx, time: number) => {
  for (let index = 0; index < 3; index += 1) {
    const phase = (time * 0.35 + index * 0.33) % 1;
    const x = 596 + Math.sin((time + index) * 1.4) * 4;
    const y = 476 - phase * 34;
    const alpha = 0.32 * (1 - phase);
    rect(ctx, x, y, 2, 2, `rgba(244,230,200,${alpha.toFixed(3)})`);
  }
};

const drawFire = (ctx: Ctx, time: number) => {
  const flicker = Math.sin(time * 9) * 2;
  rect(ctx, 3184, 590, 7, 4, P.red);
  rect(ctx, 3193, 586, 6, 8, P.amberDark);
  rect(ctx, 3201, 582, 5, 12, P.amber);
  rect(ctx, 3207, 586, 4, 8, P.amberDark);
  rect(ctx, 3188, 584 + flicker, 4, 5, P.amberGlow);
  rect(ctx, 3197, 578 - flicker, 3, 7, P.amberGlow);
  for (let index = 0; index < 5; index += 1) {
    const phase = (time * 0.7 + index * 0.21) % 1;
    const x = 3188 + Math.sin((time + index) * 3.1) * 10;
    const y = 574 - phase * 62;
    rect(ctx, x, y, 1, 2, `rgba(255,180,94,${(0.7 * (1 - phase)).toFixed(3)})`);
  }
  glow(ctx, 3198, 588, 70 + Math.sin(time * 5) * 5, P.amber, 0.22);
};

const drawTwinkles = (ctx: Ctx, time: number) => {
  starSeeds.forEach((star) => {
    const alpha = 0.18 + 0.5 * Math.max(0, Math.sin(time * 1.3 + star.phase));
    rect(ctx, star.x, star.y, 1, 1, `rgba(244,230,200,${alpha.toFixed(3)})`);
  });
};

const drawStringBulbs = (ctx: Ctx, time: number) => {
  for (let x = 3250; x <= 3620; x += 52) {
    const t = (x - 3230) / 410;
    const y = 250 + Math.sin(t * Math.PI) * 44;
    const pulse = 0.5 + 0.5 * Math.sin(time * 1.2 + x * 0.07);
    glow(ctx, x + 1, y + 6, 12 + pulse * 4, P.amber, 0.1 + pulse * 0.08);
  }
};

export const drawDynamicFrame = (ctx: Ctx, options: DynamicOptions) => {
  const {
    cameraX,
    viewY,
    time,
    moving,
    avatarX,
    showAvatar,
    reduced,
  } = options;

  ctx.save();
  ctx.translate(-cameraX, -viewY);

  if (!reduced) {
    drawRain(ctx, time);
    drawRackLeds(ctx, time);
    drawMonitor(ctx, time);
    drawSteam(ctx, time);
    drawFire(ctx, time);
    drawTwinkles(ctx, time);
    drawStringBulbs(ctx, time);
  } else {
    drawRackLeds(ctx, 0);
    drawMonitor(ctx, 0);
    drawFire(ctx, 0);
  }

  ctx.restore();

  if (showAvatar) {
    const floorScreen = FLOOR_Y - viewY;
    const frame = moving && !reduced ? Math.floor(time * 8) % 4 : 0;
    drawAvatar(ctx, avatarX, floorScreen + 1, frame, false);
    if (!reduced && moving) {
      const dust = Math.floor(time * 10) % 3;
      rect(ctx, avatarX - 4 - dust * 2, floorScreen - 1, 2, 1, "rgba(244,230,200,0.18)");
    }
  }
};
