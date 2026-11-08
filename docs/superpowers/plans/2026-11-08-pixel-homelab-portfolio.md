# Pixel Homelab Portfolio — Implementation Plan

> **For the builder:** The direction was pinned in conversation. Build it, verify in the browser, then update DESIGN.md from the shipped result.

**Goal:** Replace the current glassmorphic portfolio with a scroll-driven pixel-art side-scroll journey through a cozy homelab, with a recruiter-first information layer and a ProtoPrime3D workshop chapter.

**Architecture:** One fixed pixel-art canvas behind four chapter panels. Vertical scroll maps to a horizontal camera pan through a continuous 2D world. A persistent HUD provides chapter navigation, CV, Quick view, and a terminal command palette. A reduced-motion document renders the same content as a normal vertical page.

**Tech stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4, GSAP ScrollTrigger (only where it earns its place), Canvas 2D, next/font (Silkscreen + Geist + Geist Mono).

**Spec:** This plan + PRODUCT.md + the approved conversation.

## Global Constraints

- Recruiter first. ProtoPrime3D is a workshop chapter with a link out, not the main funnel.
- Never fabricate credentials, projects, testimonials, hardware, or metrics.
- Real content only: GitHub API live data with a curated real fallback; SOI Asia/VSGA links; CV PDF; ProtoPrime3D facts from protoprime3d.my.id.
- Core information must be reachable without animation: Quick view + reduced-motion document.
- `prefers-reduced-motion` is tiered: no scroll-jacking, no parallax, no rain, no blinking.
- Mobile: same journey, bottom-sheet panels, 44px targets, no horizontal overflow.
- No violet-only palette: warm amber, teal, violet, pink over a deep night ground.
- Pixel fonts for display/HUD only; body copy stays in a readable sans.

## Tasks

### Task 1 — Foundation
- Create content data (`src/data/portfolio.ts`), chapter geometry (`src/lib/chapters.ts`), reduced-motion hook.
- Update fonts and metadata in `layout.tsx`; add tokens, pixel utilities, and focus/selection styles to `globals.css`.
- Add a real service worker and update the manifest.

### Task 2 — Pixel world
- Build the palette and drawing helpers.
- Draw four zones (desk, server room, workshop, rooftop) plus corridors into one 3900×800 world canvas.
- Add dynamic layers: rain, LEDs, monitor cursor, steam, fire, stars, avatar walk cycle.
- Render with a viewport frame canvas and integer-nearest-neighbour scaling.

### Task 3 — Cinematic shell
- `Portfolio.tsx`: 540vh scroll stage, rAF progress, camera mapping, chapter state, hash deep links.
- `Hud.tsx`: wordmark, status, chapter nav, CV, Quick view, command palette hint, progress.
- `ChapterPanel.tsx` + four chapter panels with real content.
- Accessible buttons, focus rings, skip link.

### Task 4 — Information layer
- `QuickView.tsx`: native dialog resume with summary, education, experience, skills, projects, certifications, languages, ProtoPrime3D, contact.
- `CommandPalette.tsx`: Cmd/Ctrl+K, filter, arrow keys, Enter, chapter + link actions.
- Copy email feedback.

### Task 5 — Workshop chapter
- Live GitHub projects hook with curated fallback based on real repos.
- Code/Prints tabs.
- ProtoPrime3D print bay with real photos, Bambu Lab A1 mini specs, materials, lead time, link.

### Task 6 — Reduced motion + mobile
- Reduced-motion document with static scene posters and all content in normal flow.
- Mobile bottom sheet, compact HUD, touch targets, safe areas.
- Canvas resolution and particle budget reduced on mobile.

### Task 7 — Polish and verify
- `npm run lint`, `npm run build`.
- Browser screenshots at 1440×900, 1024×768, 390×844; check console, scroll, nav, Quick view, palette, reduced motion.
- Fix overflow, contrast, focus, and performance issues.
- Update DESIGN.md, PRODUCT.md, README, manifest.

## Review Focus

- Does a recruiter understand who Bintang is, what he can do, and how to contact him within 20 seconds?
- Does the pixel world read as a place, not a skin over a template?
- Does every scroll position keep text readable and controls reachable?
- Does reduced motion still deliver the complete portfolio?
- Are all facts traceable to the repo, GitHub, certificates, or ProtoPrime3D?
