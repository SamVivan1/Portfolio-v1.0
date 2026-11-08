import {
  FLOOR_Y,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "../../../lib/chapters";
import {
  Ctx,
  drawAvatar,
  drawCampfire,
  drawCat,
  drawCertFrame,
  drawChair,
  drawCity,
  drawMug,
  drawPixelText,
  drawPlant,
  drawPrinter,
  drawRack,
  drawRailing,
  drawSpool,
  drawStars,
  drawStool,
  drawToolboard,
  drawToolbox,
  drawWindow,
  glow,
  line,
  pixelCircle,
  pixelTextWidth,
  rect,
  dither,
} from "./helpers";
import { P } from "./palette";

const ROOMS = [
  { x: 0, w: 900 },
  { x: 1000, w: 900 },
  { x: 2000, w: 900 },
  { x: 3000, w: 900 },
];

const drawCeiling = (ctx: Ctx) => {
  rect(ctx, 0, 0, 3000, 64, P.wallDark);
  rect(ctx, 0, 64, 3000, 6, P.plum);
  for (let x = 0; x < 3000; x += 160) {
    rect(ctx, x, 0, 6, 70, P.plum);
    rect(ctx, x + 2, 0, 2, 70, P.line);
  }
  [180, 580, 1180, 1580, 2180, 2580].forEach((x) => {
    rect(ctx, x, 64, 2, 26, P.line);
    rect(ctx, x - 8, 88, 18, 5, P.wallLight);
    rect(ctx, x - 5, 93, 12, 3, P.amberGlow);
    glow(ctx, x + 1, 100, 54, P.amber, 0.12);
  });
};

const drawFloor = (ctx: Ctx) => {
  rect(ctx, 0, FLOOR_Y, WORLD_WIDTH, WORLD_HEIGHT - FLOOR_Y, P.floor);
  for (let y = FLOOR_Y + 8; y < WORLD_HEIGHT; y += 14) {
    rect(ctx, 0, y, 3000, 1, P.floorLight);
  }
  for (let x = 0; x < 3000; x += 120) {
    rect(ctx, x, FLOOR_Y + 4, 1, WORLD_HEIGHT - FLOOR_Y - 4, "rgba(74,53,99,0.28)");
  }
  rect(ctx, 0, FLOOR_Y - 8, 3000, 8, P.floorLight);
  rect(ctx, 0, FLOOR_Y - 10, 3000, 3, P.wallLight);
};

const drawWallTexture = (ctx: Ctx) => {
  rect(ctx, 0, 0, 3000, FLOOR_Y, P.wall);
  dither(ctx, 0, 0, 3000, FLOOR_Y, "rgba(58,40,83,0.4)", 8, 3);
  for (let x = 120; x < 3000; x += 160) {
    rect(ctx, x, 70, 2, FLOOR_Y - 80, "rgba(26,17,40,0.35)");
  }
  rect(ctx, 0, 300, 3000, 2, "rgba(26,17,40,0.25)");
};

const drawPoster = (
  ctx: Ctx,
  x: number,
  y: number,
  w: number,
  h: number,
  lines: string[]
) => {
  rect(ctx, x - 2, y - 2, w + 4, h + 4, P.line);
  rect(ctx, x, y, w, h, "#241a36");
  rect(ctx, x + 4, y + 4, w - 8, h - 8, "#1a1128");
  lines.forEach((text, index) => {
    drawPixelText(ctx, text, x + 8, y + 12 + index * 10, P.teal, 1);
  });
  rect(ctx, x + w - 18, y + h - 10, 5, 5, P.pink);
};

const drawShelf = (ctx: Ctx, x: number, y: number) => {
  rect(ctx, x, y + 94, 220, 6, P.wallLight);
  rect(ctx, x + 4, y + 100, 4, 22, P.line);
  rect(ctx, x + 212, y + 100, 4, 22, P.line);
  const books: Array<[number, number, string]> = [
    [x + 8, 42, P.violet],
    [x + 18, 54, P.teal],
    [x + 28, 36, P.amber],
    [x + 38, 62, P.pink],
    [x + 50, 48, P.blue],
    [x + 62, 56, P.green],
  ];
  books.forEach(([bx, bh, color]) => {
    rect(ctx, bx, y + 94 - bh, 8, bh, color);
    rect(ctx, bx + 2, y + 94 - bh + 4, 4, 1, "rgba(0,0,0,0.3)");
  });
  rect(ctx, x + 96, y + 66, 30, 28, P.plum);
  rect(ctx, x + 100, y + 70, 22, 20, P.wallDark);
  rect(ctx, x + 106, y + 76, 10, 10, P.teal);
  rect(ctx, x + 150, y + 58, 26, 36, P.amberDark);
  rect(ctx, x + 154, y + 62, 18, 8, P.amber);
  pixelCircle(ctx, x + 163, y + 78, 5, P.cream);
  rect(ctx, x + 158, y + 82, 10, 8, P.violet);
};

const drawDeskRoom = (ctx: Ctx) => {
  drawWindow(ctx, 60, 130, 220, 290, true);
  drawPoster(ctx, 320, 128, 94, 112, ["SUDO", "MAKE", "ME A", "SANDWICH"]);
  drawPoster(ctx, 436, 152, 66, 88, ["DOCKER", "COMPOSE", "UP -D"]);
  drawShelf(ctx, 600, 170);

  // desk
  rect(ctx, 312, 468, 420, 18, P.amberDark);
  rect(ctx, 312, 468, 420, 5, P.amber);
  rect(ctx, 306, 486, 432, 5, P.line);
  rect(ctx, 322, 491, 10, 129, P.line);
  rect(ctx, 712, 491, 10, 129, P.line);
  rect(ctx, 322, 580, 400, 6, P.wallLight);
  rect(ctx, 342, 510, 118, 58, P.plum);
  rect(ctx, 346, 514, 26, 6, P.line);
  rect(ctx, 376, 514, 26, 6, P.line);
  rect(ctx, 406, 514, 26, 6, P.line);

  // monitor
  rect(ctx, 386, 300, 154, 158, P.black);
  rect(ctx, 390, 304, 146, 146, P.wallDark);
  rect(ctx, 398, 312, 130, 120, "#07121f");
  rect(ctx, 404, 318, 118, 108, "#081826");
  for (let y = 320; y < 424; y += 4) {
    rect(ctx, 404, y, 118, 1, "rgba(94,234,212,0.05)");
  }
  drawPixelText(ctx, "DOCKER PS", 408, 324, P.teal, 1);
  const code = [
    [408, 338, 56, P.teal],
    [408, 346, 34, P.violetLight],
    [414, 354, 62, P.amber],
    [414, 362, 44, P.green],
    [408, 370, 72, P.blue],
    [414, 378, 30, P.pink],
    [408, 386, 54, P.teal],
    [414, 394, 40, P.cream],
  ] as const;
  code.forEach(([cx, cy, cw, color]) => {
    rect(ctx, cx, cy, cw, 3, color);
  });
  rect(ctx, 410, 408, 7, 3, P.green);
  glow(ctx, 463, 372, 92, P.teal, 0.12);
  rect(ctx, 456, 458, 14, 12, P.wallDark);
  rect(ctx, 442, 470, 42, 5, P.line);

  // keyboard + mouse
  rect(ctx, 398, 502, 132, 22, P.wallDark);
  rect(ctx, 401, 505, 126, 16, P.plum);
  for (let kx = 404; kx < 524; kx += 8) {
    rect(ctx, kx, 508, 5, 4, P.line);
    rect(ctx, kx, 515, 5, 3, P.line);
  }
  rect(ctx, 548, 510, 16, 11, P.wallDark);
  rect(ctx, 551, 512, 10, 4, P.line);

  drawMug(ctx, 592, 480);
  glow(ctx, 599, 486, 38, P.amber, 0.1);
  drawCat(ctx, 636, 474, true);
  drawChair(ctx, 262, 620);

  // lamp
  rect(ctx, 676, 456, 28, 8, P.line);
  rect(ctx, 688, 394, 4, 64, P.line);
  rect(ctx, 684, 386, 12, 10, P.amberDark);
  rect(ctx, 674, 366, 32, 20, P.amber);
  rect(ctx, 678, 370, 24, 6, P.amberGlow);
  glow(ctx, 690, 410, 96, P.amber, 0.2);

  drawPlant(ctx, 768, 620, 1.2);
  drawPlant(ctx, 848, 620, 0.8);

  // rug
  rect(ctx, 300, 622, 470, 36, P.violetDark);
  rect(ctx, 310, 628, 450, 24, P.plum);
  for (let x = 320; x < 750; x += 28) {
    rect(ctx, x, 634, 12, 2, P.violet);
  }

  // room sign
  rect(ctx, 812, 104, 74, 26, P.wallDark);
  rect(ctx, 814, 106, 70, 22, P.deep);
  drawPixelText(ctx, "RACK", 820, 113, P.teal, 1);
  drawPixelText(ctx, ">", 866, 113, P.amber, 1);

  // wall clock
  rect(ctx, 520, 96, 34, 34, P.line);
  rect(ctx, 524, 100, 26, 26, P.paper);
  rect(ctx, 536, 104, 2, 10, P.black);
  rect(ctx, 536, 113, 8, 2, P.black);
};

const drawRackRoom = (ctx: Ctx) => {
  rect(ctx, 1040, 124, 720, 4, P.line);
  line(ctx, 1040, 124, 1080, 180, P.red);
  line(ctx, 1120, 124, 1160, 200, P.teal);
  line(ctx, 1200, 124, 1240, 170, P.amber);
  line(ctx, 1360, 124, 1400, 190, P.pink);
  line(ctx, 1440, 124, 1480, 170, P.blue);
  line(ctx, 1600, 124, 1640, 190, P.teal);

  drawRack(ctx, 1040, 250, 190, 370, "DOCKER");
  drawRack(ctx, 1280, 250, 190, 370, "CASAOS");

  const frames = [
    [1510, 190, P.amber],
    [1570, 190, P.teal],
    [1630, 190, P.pink],
    [1690, 190, P.violetLight],
    [1750, 190, P.green],
  ] as const;
  frames.forEach(([x, y, color]) => {
    drawCertFrame(ctx, x, y, 46, 58, color);
  });
  drawPixelText(ctx, "VERIFIED", 1530, 256, P.amber, 1);

  // terminal desk
  rect(ctx, 1500, 466, 220, 16, P.amberDark);
  rect(ctx, 1500, 466, 220, 4, P.amber);
  rect(ctx, 1508, 482, 10, 138, P.line);
  rect(ctx, 1702, 482, 10, 138, P.line);
  rect(ctx, 1532, 348, 156, 118, P.black);
  rect(ctx, 1536, 352, 148, 108, P.wallDark);
  rect(ctx, 1544, 360, 132, 92, "#08121e");
  drawPixelText(ctx, "N8N", 1550, 368, P.teal, 1);
  const n8nCode: Array<[number, number, number, string]> = [
    [1550, 380, 54, P.teal],
    [1550, 388, 88, P.violetLight],
    [1556, 396, 62, P.amber],
    [1550, 404, 76, P.green],
    [1556, 412, 44, P.pink],
    [1550, 420, 68, P.blue],
    [1556, 428, 30, P.cream],
  ];
  n8nCode.forEach(([x, y, w, color]) => rect(ctx, x, y, w, 3, color));
  rect(ctx, 1544, 440, 6, 3, P.green);
  glow(ctx, 1610, 400, 86, P.teal, 0.13);
  rect(ctx, 1570, 454, 10, 12, P.wallDark);

  rect(ctx, 1538, 500, 132, 20, P.wallDark);
  rect(ctx, 1541, 503, 126, 14, P.plum);
  for (let kx = 1544; kx < 1664; kx += 8) {
    rect(ctx, kx, 506, 5, 4, P.line);
  }

  drawChair(ctx, 1432, 620);

  // ups + vent
  rect(ctx, 1730, 536, 34, 84, P.wallDark);
  rect(ctx, 1734, 540, 26, 10, P.deep);
  rect(ctx, 1736, 544, 22, 2, P.green);
  rect(ctx, 1734, 554, 26, 40, P.plum);
  for (let vy = 558; vy < 590; vy += 5) {
    rect(ctx, 1738, vy, 18, 2, P.deep);
  }
  rect(ctx, 1836, 250, 40, 56, P.wallDark);
  for (let vy = 256; vy < 300; vy += 6) {
    rect(ctx, 1842, vy, 28, 2, P.line);
  }

  drawPlant(ctx, 1810, 620, 1);
  drawPixelText(ctx, "WORKSHOP", 1788, 104, P.teal, 1);
  drawPixelText(ctx, ">", 1864, 104, P.amber, 1);

  // floor cable bundles
  line(ctx, 1200, 620, 1440, 650, P.red, 2);
  line(ctx, 1240, 620, 1480, 660, P.teal, 2);
  line(ctx, 1280, 620, 1520, 640, P.amber, 2);
};

const drawWorkshopRoom = (ctx: Ctx) => {
  drawToolboard(ctx, 2040, 190, 260, 220);

  // blueprints
  rect(ctx, 2324, 214, 48, 62, P.paper);
  rect(ctx, 2328, 218, 40, 54, "#e8d9ba");
  for (let gx = 2332; gx < 2364; gx += 8) {
    rect(ctx, gx, 222, 1, 46, "rgba(74,53,99,0.4)");
  }
  for (let gy = 226; gy < 268; gy += 8) {
    rect(ctx, 2332, gy, 32, 1, "rgba(74,53,99,0.4)");
  }
  rect(ctx, 2338, 234, 18, 14, "rgba(94,234,212,0.5)");
  rect(ctx, 2372, 228, 52, 48, P.paper);
  rect(ctx, 2376, 232, 44, 40, "#e8d9ba");
  drawPixelText(ctx, "PLA", 2380, 238, P.amberDark, 1);
  drawPixelText(ctx, "PETG", 2380, 248, P.tealDark, 1);

  // workbench
  rect(ctx, 2030, 466, 400, 18, P.amberDark);
  rect(ctx, 2030, 466, 400, 5, P.amber);
  rect(ctx, 2024, 484, 412, 5, P.line);
  rect(ctx, 2040, 489, 10, 131, P.line);
  rect(ctx, 2410, 489, 10, 131, P.line);
  rect(ctx, 2040, 560, 380, 6, P.wallLight);
  rect(ctx, 2060, 520, 96, 34, P.plum);
  rect(ctx, 2070, 526, 30, 4, P.line);
  rect(ctx, 2110, 526, 30, 4, P.line);
  rect(ctx, 2060, 570, 96, 50, P.wallDark);
  rect(ctx, 2070, 578, 30, 4, P.amberDark);
  rect(ctx, 2110, 578, 30, 4, P.amberDark);

  // bench tools
  drawToolbox(ctx, 2340, 596);
  rect(ctx, 2180, 442, 60, 24, P.wallDark);
  rect(ctx, 2184, 446, 52, 16, P.deep);
  drawPixelText(ctx, "CALIPER", 2188, 450, P.teal, 1);
  rect(ctx, 2080, 430, 40, 30, P.plum);
  rect(ctx, 2084, 434, 32, 22, P.paper);
  rect(ctx, 2090, 440, 20, 2, P.line);
  rect(ctx, 2090, 446, 14, 2, P.line);

  // printer on a table
  rect(ctx, 2458, 538, 250, 14, P.wallLight);
  rect(ctx, 2458, 538, 250, 4, P.amberDark);
  rect(ctx, 2468, 552, 10, 68, P.line);
  rect(ctx, 2688, 552, 10, 68, P.line);
  ctx.save();
  ctx.translate(2472, 418);
  ctx.scale(1.32, 1.32);
  drawPrinter(ctx, 0, 0);
  ctx.restore();

  drawPixelText(ctx, "PROTOPRIME 3D", 2490, 222, P.cream, 2);
  rect(ctx, 2486, 218, 148, 2, P.teal);
  rect(ctx, 2486, 242, 148, 2, P.teal);

  // filament shelf
  rect(ctx, 2750, 410, 140, 6, P.wallLight);
  rect(ctx, 2750, 500, 140, 6, P.wallLight);
  [2758, 2798, 2838].forEach((x, index) => {
    drawSpool(ctx, x, 390, [P.violet, P.teal, P.amber][index]);
  });
  [2758, 2798, 2838].forEach((x, index) => {
    drawSpool(ctx, x, 480, [P.pink, P.green, P.blue][index]);
  });

  // printed parts shelf
  rect(ctx, 2320, 396, 160, 6, P.wallLight);
  rect(ctx, 2330, 378, 28, 18, P.tealDark);
  rect(ctx, 2336, 382, 16, 10, P.teal);
  rect(ctx, 2370, 366, 38, 30, P.cream);
  rect(ctx, 2376, 372, 26, 8, P.amber);
  rect(ctx, 2390, 384, 8, 10, P.line);
  rect(ctx, 2420, 380, 40, 16, P.violet);
  rect(ctx, 2426, 384, 28, 8, P.violetLight);

  drawStool(ctx, 2440, 620);
  drawPlant(ctx, 2860, 620, 1);
  drawCat(ctx, 2020, 462, false);

  // hanging work lamp
  rect(ctx, 2570, 120, 2, 92, P.line);
  rect(ctx, 2552, 212, 38, 14, P.amberDark);
  rect(ctx, 2556, 216, 30, 6, P.amber);
  glow(ctx, 2571, 250, 140, P.amber, 0.16);

  drawPixelText(ctx, "ROOF", 2830, 104, P.teal, 1);
  drawPixelText(ctx, ">", 2866, 104, P.amber, 1);
};

const drawRooftop = (ctx: Ctx) => {
  const sky = ctx.createLinearGradient(0, 0, 0, FLOOR_Y);
  sky.addColorStop(0, "#090817");
  sky.addColorStop(0.55, "#14102a");
  sky.addColorStop(1, "#2a1d45");
  ctx.fillStyle = sky;
  ctx.fillRect(3000, 0, 900, FLOOR_Y);

  drawStars(ctx, 3000, 30, 900, 380, 96);
  pixelCircle(ctx, 3530, 230, 40, P.cream);
  pixelCircle(ctx, 3518, 218, 8, "#e4d3b0");
  pixelCircle(ctx, 3544, 244, 6, "#e4d3b0");
  pixelCircle(ctx, 3548, 212, 4, "#e4d3b0");
  glow(ctx, 3530, 230, 130, P.cream, 0.14);

  drawCity(ctx, 3000, 430, 900, 190);
  drawRailing(ctx, 3000, 468, 900, 152);

  rect(ctx, 3000, FLOOR_Y, 900, WORLD_HEIGHT - FLOOR_Y, P.floor);
  for (let y = FLOOR_Y + 10; y < WORLD_HEIGHT; y += 16) {
    rect(ctx, 3000, y, 900, 1, P.floorLight);
  }
  for (let x = 3000; x < 3900; x += 90) {
    rect(ctx, x, FLOOR_Y + 4, 1, WORLD_HEIGHT - FLOOR_Y - 4, "rgba(74,53,99,0.28)");
  }
  rect(ctx, 3000, FLOOR_Y - 6, 900, 6, P.wallLight);

  drawCampfire(ctx, 3170, 616);
  drawStool(ctx, 3080, 620);
  drawAvatar(ctx, 3270, 592, 0, true);
  drawCat(ctx, 3090, 616, true);

  // string lights
  for (let x = 3230; x <= 3640; x += 6) {
    const t = (x - 3230) / 410;
    const y = 250 + Math.sin(t * Math.PI) * 44;
    rect(ctx, x, y, 1, 1, P.line);
  }
  for (let x = 3250; x <= 3620; x += 52) {
    const t = (x - 3230) / 410;
    const y = 250 + Math.sin(t * Math.PI) * 44;
    rect(ctx, x, y + 4, 3, 5, P.amber);
    glow(ctx, x + 1, y + 6, 18, P.amber, 0.16);
  }

  drawPlant(ctx, 3320, 620, 1.2);
  drawPlant(ctx, 3720, 620, 0.9);
  drawStool(ctx, 3640, 620);

  // antenna
  rect(ctx, 3800, 300, 4, 320, P.line);
  rect(ctx, 3778, 330, 48, 3, P.line);
  rect(ctx, 3786, 360, 32, 3, P.line);
  rect(ctx, 3798, 292, 8, 8, P.red);
  glow(ctx, 3802, 296, 26, P.red, 0.2);

  drawPixelText(ctx, "OPEN", 3370, 330, "rgba(244,230,200,0.35)", 2);
  drawPixelText(ctx, "CHANNEL", 3350, 348, "rgba(244,230,200,0.22)", 2);
};

const drawCorridor = (ctx: Ctx, x: number, label: string) => {
  rect(ctx, x, 0, 100, FLOOR_Y, P.wallDark);
  rect(ctx, x, 0, 100, 64, P.night);
  rect(ctx, x, FLOOR_Y, 100, WORLD_HEIGHT - FLOOR_Y, P.floorDark);
  rect(ctx, x + 4, 64, 92, 4, P.plum);
  rect(ctx, x + 10, 220, 80, 2, P.line);
  rect(ctx, x + 10, 420, 80, 2, P.line);
  rect(ctx, x + 16, 140, 68, 18, P.deep);
  rect(ctx, x + 18, 142, 64, 14, P.wallDark);
  drawPixelText(ctx, label, x + 24, 147, P.teal, 1);
  glow(ctx, x + 50, 320, 70, P.amber, 0.1);
  rect(ctx, x, 68, 6, FLOOR_Y - 68, P.line);
  rect(ctx, x + 94, 68, 6, FLOOR_Y - 68, P.line);
  rect(ctx, x + 12, FLOOR_Y - 6, 76, 6, P.wallLight);
};

const drawDoorSign = (
  ctx: Ctx,
  x: number,
  y: number,
  label: string,
  color: string
) => {
  const width = pixelTextWidth(label, 1) + 14;
  rect(ctx, x, y, width, 20, P.wallDark);
  rect(ctx, x + 2, y + 2, width - 4, 16, P.deep);
  drawPixelText(ctx, label, x + 7, y + 7, color, 1);
};

export const drawWorldBase = (ctx: Ctx) => {
  rect(ctx, 0, 0, WORLD_WIDTH, WORLD_HEIGHT, P.void);
  drawWallTexture(ctx);
  drawCeiling(ctx);
  drawFloor(ctx);

  ROOMS.slice(0, 3).forEach((room) => {
    rect(ctx, room.x + room.w - 4, 70, 4, FLOOR_Y - 78, P.plum);
  });

  drawCorridor(ctx, 900, "RACK >");
  drawCorridor(ctx, 1900, "MAKE >");
  drawCorridor(ctx, 2900, "ROOF >");

  drawDeskRoom(ctx);
  drawRackRoom(ctx);
  drawWorkshopRoom(ctx);
  drawRooftop(ctx);

  drawDoorSign(ctx, 812, 104, "RACK >", P.teal);
  drawDoorSign(ctx, 1788, 104, "MAKE >", P.teal);
  drawDoorSign(ctx, 2830, 104, "ROOF >", P.teal);
};


