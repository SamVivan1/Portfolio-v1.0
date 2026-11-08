# Bintang — Pixel Homelab Portfolio

A recruiter-first portfolio you walk through. Four pixel-art rooms, one continuous camera, live GitHub data, verified credentials, a downloadable CV, and a 3D printing workshop — all reachable in under a minute.

**Live concept:** _A Night in the Homelab._ You scroll; the camera walks from a rainy desk to a homelab, a workshop with a 3D printer, and a rooftop with a campfire.

## What's inside

- **A continuous pixel world** drawn on a single Canvas 2D surface. Four chapters: Desk, Homelab, Workshop, Roof.
- **A game-style HUD** with availability, Banda Aceh time, chapter navigation, CV, Quick view, and scroll progress.
- **A Quick view resume** (native `<dialog>`) with summary, education, homelab, experience, skills, projects, certifications, languages, and ProtoPrime3D.
- **A terminal command palette** (`Ctrl/Cmd + K`) for jumping chapters, opening the resume, downloading the CV, copying email, and opening links.
- **Live GitHub projects** with a curated, truthful fallback when the API is unavailable.
- **A Homelab chapter that reflects the real server**: Ubuntu 26.04 LTS on an allocated desktop PC (Ryzen 5 4600G, 14 GB RAM, ~3.7 TB), 66 containers, Jellyfin/*arr, Immich, Nextcloud, Paperless, Home Assistant, n8n, Pi-hole, and more.
- **A ProtoPrime3D workshop chapter** with real part photos, Bambu Lab A1 mini specs, materials, lead time, and links to `protoprime3d.my.id`.
- **A reduced-motion document** with the same content in a normal vertical page and static scene posters.
- **PWA + service worker** and a Dockerized build.

## Tech stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Canvas 2D for the pixel world (no WebGL, no 3D model viewer)
- `next/font` for Silkscreen, Geist, and Geist Mono
- `lucide-react` + `react-icons` for UI and brand icons
- Native `<dialog>` for the resume and command palette

## Quick start

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production:

```bash
npm run build
npm start
```

> The project uses `output: "standalone"` for Docker. `next start` works locally but prints a warning; for the standalone server use `node .next/standalone/server.js`.

## Environment variables

Both are optional.

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Server-side GitHub token for live project data (recommended). Public repos only. |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata/OG images in production. |

`NEXT_PUBLIC_GITHUB_TOKEN` is still read as a legacy fallback. Without a token, the GitHub API still works within the public rate limit; on failure the workshop shows a "Curated snapshot" note and the real repository links.

## Content and truth

All content lives in `frontend/src/data/portfolio.ts`:

- Profile, education, GPA, availability, languages, contact links.
- Chapter names, scroll ranges, and world positions.
- Experience and certificate links (SOI Asia, VSGA-DTS / BNSP).
- Homelab stack and skills.
- Curated project fallback (real repositories).
- ProtoPrime3D facts and images.

The portfolio does not invent testimonials, clients, hardware specs, uptime, benchmarks, or project results. Certificate links and the CV point to real files. ProtoPrime3D facts are taken from `protoprime3d.my.id`.

## Accessibility

- WCAG 2.2 AA baseline.
- `prefers-reduced-motion` switches to a complete vertical document with static scene posters; no scroll-driven camera, parallax, rain, or blinking.
- The canvas is decorative (`aria-hidden`); chapter content is real DOM.
- Quick view is a native dialog with focus containment and Escape to close.
- Command palette supports arrow keys, Enter, and Escape.
- Mobile panels can be collapsed to reveal the world; touch targets are at least 44px.
- Skip link opens the resume as the first focusable element.

## Project structure

```
frontend/src/
  app/
    page.tsx                  # cinematic shell + reduced-motion document
    layout.tsx                # fonts, metadata, JSON-LD, service worker
    globals.css               # tokens, HUD, panels, dialogs, responsive rules
  components/pixel/
    Portfolio.tsx             # scroll, chapters, deep links, keyboard
    PixelStage.tsx            # canvas sizing, camera, dynamic frame
    Hud.tsx                   # top bar, desktop nav, mobile nav
    QuickView.tsx             # resume dialog
    CommandPalette.tsx        # terminal jump menu
    ReducedMotionDocument.tsx # accessible document
    ScenePoster.tsx           # static scene slice
    chapters/                 # Desk, Homelab, Workshop, Roof content
    ui/                       # PixelButton, PixelChip, PixelPanel, Tabs
    world/                    # palette, props, scenes, dynamic frame
  data/portfolio.ts           # single source of truth (profile, homelab, services, projects)
  app/api/github/route.ts     # cached GitHub API + curated fallback
  hooks/useLiveProjects.ts    # client hook for /api/github
  hooks/useMotionPreference.ts
  lib/chapters.ts             # world/camera/scroll math
frontend/public/
  assets/                     # portrait, ProtoPrime3D photos, brand assets
  Sertifikat/                 # CV and certificate PDFs
  manifest.json
  sw.js
  og.jpg
```

## Docker

```bash
cd frontend
docker compose -f docker-compose.prod.yaml up --build -d
```

The production image uses the Next.js standalone output. The development compose file mounts the source for hot reload.

## Deployment notes

- Set `NEXT_PUBLIC_SITE_URL` to the production origin so Open Graph image URLs resolve absolutely.
- The service worker is registered only in production; in development it unregisters existing registrations to avoid stale caches.
- The GitHub API is called through the server route `/api/github`, cached for 10 minutes. Add `GITHUB_TOKEN` so deployments do not hit the anonymous rate limit.

## Asset provenance

- Portrait, CV, certificates, and ProtoPrime3D part photos are the owner's own assets.
- The HUD mark and app icons are the existing SamVivan logo from `public/assets/logo.svg`, rasterized to a 64 × 64 pixel grid (`logo-pixel.svg` / `logo-pixel-icon.svg`).
- The 3DBenchy image is a render from the ProtoPrime3D site and is labeled as a benchmark render.
- Fonts: Silkscreen, Geist, and Geist Mono via Google Fonts / `next/font`.
- Icons: Lucide and Simple Icons (via `react-icons`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check without emitting |

---

Built with Next.js, Canvas 2D, and a stubborn love for pixel art. All credentials link to their source.
