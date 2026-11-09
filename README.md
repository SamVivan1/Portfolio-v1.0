# Bintang — Pixel Homelab Portfolio

A recruiter-first portfolio you walk through. Four pixel-art rooms, one continuous camera, live GitHub data, verified credentials, a downloadable CV, and a 3D printing workshop — all reachable in under a minute.

**Live concept:** _A Night in the Homelab._ You scroll; the camera walks from a rainy desk to a homelab, a workshop with a 3D printer, and a rooftop with a campfire.

## What's inside

- **A continuous pixel world** drawn on a single Canvas 2D surface. Four chapters: Desk, Homelab, Workshop, Roof.
- **A game-style HUD** with availability, Banda Aceh time, chapter navigation, CV, Quick view, and scroll progress.
- **A Quick view resume** (native `<dialog>`) with summary, education, homelab, experience, skills, projects, certifications, languages, and ProtoPrime3D.
- **Case studies** for Lyra, OctoPad, the n8n backup workflow, the GNOME widget suite, and this portfolio, available as in-world overlays and as shareable routes (`/projects/[slug]`) built from the real READMEs.
- **A terminal command palette** (`Ctrl/Cmd + K`) for jumping chapters, opening the resume, downloading the CV, copying email, and opening links.
- **Live GitHub projects** with a curated, truthful fallback when the API is unavailable.
- **A Homelab chapter that reflects the real server**: Ubuntu 26.04 LTS on an allocated desktop PC (Ryzen 5 4600G, 14 GB RAM, ~3.7 TB), 66 containers, Jellyfin/*arr, Immich, Nextcloud, Paperless, Home Assistant, n8n, Pi-hole, and more. The `/homelab` page adds a hardware block, a service-group diagram, and a verification date.
- **A web resume** at `/resume` with print styles for a clean light PDF, sharing the same document as Quick view.
- **A ProtoPrime3D workshop chapter** with real part photos, Bambu Lab A1 mini specs, materials, lead time, and links to `protoprime3d.my.id`.
- **A draggable mobile sheet** with collapsed, half, and full snap points, plus a keyboard-accessible chevron.
- **Ambient sound** that defaults on for first-time visitors, starts on the first user gesture (browser autoplay policy), pauses when the tab is hidden, and can be muted from the HUD or mobile menu. The preference persists. The loop is an original 64-second piece built for the site: four 16-second chord beds (one per chapter) moving from F major 7 to C major 7, G6, and A minor 9; warm pads, soft rain, a distant server hum, sparse music-box notes, and tape crackle. It is 48 kHz / 256 kbps and starts loading only after the first gesture.
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

All are optional.

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Server-side GitHub token for live project data (recommended). Public repos only. |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata/OG images in production. Set it at build time for Docker. |
| `NEXT_PUBLIC_UMAMI_SRC` | Umami-compatible analytics script URL. No script loads when empty. |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Analytics website ID paired with the script URL. |

`NEXT_PUBLIC_GITHUB_TOKEN` is still read as a legacy fallback. Without a token, the GitHub API still works within the public rate limit; on failure the workshop shows a "Curated snapshot" note and the real repository links.

Analytics is a no-op unless both Umami variables are set. Events cover CV downloads, email copies and clicks, Quick view, the command palette, case-study and homelab views, ProtoPrime3D clicks, and sound toggles. No PII, cookies, or custom identifiers are sent.

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
- Mobile panels can be dragged between collapsed, half, and full heights from the title bar; the chevron provides the same states for keyboard and assistive technology.
- The ambient-sound toggle is a visible HUD control (and a labeled mobile-menu item) with `aria-pressed` and a persistent opt-out. Audio only starts after a user gesture and pauses when the tab is hidden.
- Touch targets are at least 44px.
- Skip link opens the resume as the first focusable element.

## Project structure

```
frontend/src/
  app/
    page.tsx                  # cinematic shell + reduced-motion document
    homelab/page.tsx          # public homelab architecture
    resume/page.tsx           # indexable, printable web resume
    projects/[slug]/page.tsx  # case studies
    sitemap.ts / robots.ts    # SEO
    layout.tsx                # fonts, metadata, JSON-LD, analytics script, service worker
    globals.css               # tokens, HUD, panels, sheets, dialogs, print CSS
  components/pixel/
    Portfolio.tsx             # scroll, chapters, deep links, keyboard
    PixelStage.tsx            # canvas sizing, camera, dynamic frame
    Hud.tsx                   # top bar, desktop nav, mobile nav
    QuickView.tsx             # resume dialog (shared ResumeDocument)
    CommandPalette.tsx        # terminal jump menu
    pages/                    # PageShell, case studies, homelab, resume, dialogs
    ReducedMotionDocument.tsx # accessible document
    ScenePoster.tsx           # static scene slice
    chapters/                 # Desk, Homelab, Workshop, Roof content
    ui/                       # PixelButton, PixelChip, PixelPanel, Tabs
    world/                    # palette, props, scenes, dynamic frame
  data/portfolio.ts           # single source of truth (profile, homelab, services, projects)
  app/api/github/route.ts     # cached GitHub API + curated fallback
  hooks/useLiveProjects.ts    # client hook for /api/github
  hooks/useMotionPreference.ts
  hooks/useMobileSheet.ts     # drag/snap mobile panel
  hooks/useAmbientSound.ts    # looping audio + persistent mute
  lib/chapters.ts             # world/camera/scroll math
  lib/analytics.ts            # provider-agnostic event facade (Umami-compatible)
  data/caseStudies.ts         # case-study content from real READMEs
frontend/scripts/
  generate-ambient.py         # numpy generator for the original 64s ambient loop
frontend/public/
  assets/                     # portrait, ProtoPrime3D photos, brand assets, ambient loop
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

- The production origin is `https://samvivan.my.id`. The deploy workflow passes it as `NEXT_PUBLIC_SITE_URL` to the Docker build, because metadata, OG URLs, and the sitemap are generated at build time. For a different host, override that variable in the compose command.
- The service worker is registered only in production; in development it unregisters existing registrations to avoid stale caches.
- The GitHub API is called through the server route `/api/github`, cached for 10 minutes. Add `GITHUB_TOKEN` so deployments do not hit the anonymous rate limit.
- The deploy workflow uses `docker compose -f docker-compose.prod.yaml`; the container is named `portfolio-prod` and listens on port 3003 on the host.
- Every deploy is gated: lint, type-check, and build must pass before the server is touched. The server resets to the deployed commit, tags the current image as `portfolio:previous`, waits for the container health check, then runs `frontend/scripts/smoke-deploy.sh`. If health or smoke fails, it restores the previous image automatically.
- Smoke checks can be run locally with `bash frontend/scripts/smoke-deploy.sh http://localhost:3003 https://samvivan.my.id`.
- To exercise the rollback path deliberately, run `gh workflow run "CI/CD Pipeline - Frontend" -f drill=true`. The smoke test is forced to fail after health passes, the previous image is restored, and the run ends red by design. Run it again without `-f drill` to finish green.
- Security headers (`nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, COOP, HSTS) are set in `next.config.ts`. A stricter CSP is deferred until asset/nonce auditing is done.

## Asset provenance

- Portrait, CV, certificates, ProtoPrime3D part photos, and the ambient loop are the owner's own assets. The loop is synthesized by `frontend/scripts/generate-ambient.py` (numpy) and intentionally has no third-party sample or license.
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
| `bash scripts/smoke-deploy.sh [url] [origin]` | Check routes, sitemap, canonical, and audio after a deploy |

---

Built with Next.js, Canvas 2D, and a stubborn love for pixel art. All credentials link to their source.
