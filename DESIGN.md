---
name: Bintang — Pixel Homelab Portfolio
description: A recruiter-first, scroll-driven pixel-art homelab portfolio for Muhammad Bintang Panji Kusuma.
colors:
  void: "#08070f"
  night: "#0f0c1b"
  deep: "#171226"
  plum: "#211631"
  wall: "#2b1d3f"
  line: "#4a3563"
  cream: "#f4e6c8"
  paper: "#d9c7a3"
  muted: "#b6a8c8"
  violet: "#8b5cf6"
  violet-soft: "#c4b5fd"
  violet-dark: "#5b21b6"
  teal: "#5eead4"
  amber: "#ffb45e"
  amber-dark: "#c97a35"
  pink: "#f472b6"
  green: "#86efac"
  red: "#fb7185"
typography:
  display:
    fontFamily: "Silkscreen, monospace"
    fontSize: "2.2rem"
    fontWeight: 400
    lineHeight: 1.08
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  sharp: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "64px"
components:
  pixel-button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.void}"
    rounded: "{rounded.sharp}"
    padding: "0 15px"
  pixel-button-ghost:
    backgroundColor: "rgba(23, 18, 38, 0.82)"
    textColor: "{colors.cream}"
    rounded: "{rounded.sharp}"
    padding: "0 15px"
  pixel-panel:
    backgroundColor: "rgba(13, 10, 24, 0.94)"
    textColor: "{colors.cream}"
    rounded: "{rounded.sharp}"
    padding: "20px 22px"
  hud-bar:
    backgroundColor: "rgba(8, 7, 15, 0.76)"
    textColor: "{colors.cream}"
    rounded: "{rounded.sharp}"
    padding: "14px 18px"
  badge:
    backgroundColor: "rgba(94, 234, 212, 0.07)"
    textColor: "{colors.teal}"
    rounded: "{rounded.sharp}"
    padding: "2px 6px"
---

# Design System: Bintang — Pixel Homelab Portfolio

## Overview

**Creative North Star: "A Night in the Homelab."**

A continuous 16-bit pixel world: a desk under rain, a humming homelab, a workshop where a 3D printer is mid-job, and a rooftop with a campfire. The visitor scrolls; the camera walks. The interface is the game chrome around that world — a compact HUD, chapter panels that feel like in-world terminals, and a resume that opens like a menu.

The old glassmorphic world is the anti-reference. This system has no blurred glass cards, no pill buttons, no neon-violet gradient text. It is built from sharp pixel edges, a warm/cool night palette, and two type voices: a pixel display face for headings and HUD labels, and a readable sans for the content recruiters actually need to scan.

**Key Characteristics:**
- One continuous Canvas 2D world (3900 × 800 logical pixels) behind four chapter panels.
- Four rooms: Desk, Homelab, Workshop, Roof. The camera moves horizontally as the page scrolls vertically.
- HUD as game chrome: wordmark, availability, Banda Aceh time, chapter nav, CV, Quick view, progress.
- Palette: deep night ground, warm amber lamps, teal signal, violet atmosphere, pink accents.
- Sharp corners (0px), 2px borders, hard offset shadows, inset scroll fades. No glass, no pills.
- Silkscreen for display and HUD; Geist for body; Geist Mono for labels and metadata.
- Motion is one authored system: camera pan plus ambient rain, LEDs, steam, fire, stars, and a walking avatar.
- Reduced motion becomes a complete vertical document with static scene posters, not a degraded page.

## Colors

The palette is a night interior: near-black violet walls, warm practical lights, and a small set of signal colors. Teal is the primary action and "online" signal; amber is the human warmth; violet is the atmosphere; pink is a rare accent.

### Primary
- **Teal** (#5eead4): primary buttons, active chapter, live status, links, key data. The signal color.
- **Amber** (#ffb45e): lamps, fire, dates, tab accents, the workshop. Warmth and human presence.
- **Violet** (#8b5cf6): atmospheric light, rack glow, avatar hoodie, secondary emphasis.
- **Violet Soft** (#c4b5fd): links, tags, focus-adjacent text, muted emphasis.

### Neutrals
- **Void** (#08070f): page ground and canvas base.
- **Night** (#0f0c1b): panel ground, cards, dialogs.
- **Deep** (#171226): raised surfaces, footer, HUD fills.
- **Plum** (#211631): panels, drawers, raised blocks.
- **Wall** (#2b1d3f): room walls.
- **Line** (#4a3563): borders, dividers, scrollbars.
- **Cream** (#f4e6c8): primary text on dark grounds.
- **Muted** (#b6a8c8): secondary text, labels, metadata.
- **Paper** (#d9c7a3): certificates, blueprints, in-world paper.

### Signals
- **Green** (#86efac): availability, live GitHub indicator, terminal success.
- **Pink** (#f472b6): rare accent in the world and tags; never the main action.
- **Red** (#fb7185): warnings, errors, fire embers.

### Named Rules
**The Night Ground Rule.** Every surface starts from Void or Night. There is no light theme.

**The One Signal Rule.** Teal is the action and "online" color. If everything is teal, nothing is. Amber and violet carry atmosphere, not actions.

**The No Glass Rule.** The old glassmorphism is gone. Panels are opaque enough to read (0.94 alpha) with a 2px line border and a hard offset shadow. Blur is reserved for the dialog backdrop only.

## Typography

**Display / HUD:** Silkscreen (Google Fonts), 400/700, monospace fallback.
**Body:** Geist, system-ui, sans-serif.
**Labels / metadata:** Geist Mono, ui-monospace, monospace.

**Character:** Silkscreen gives the portfolio its 16-bit voice without turning every paragraph into a readability problem. Geist keeps the resume, chapter copy, and contact details professional. Geist Mono carries the terminal labels, dates, file paths, and small metadata.

### Hierarchy
- **Display** (Silkscreen 400, clamp 1.45–2rem, 1.08): chapter titles, Quick view name, document hero.
- **Body** (Geist 400, 1rem/1.65): chapter copy. Max 64ch; never below 16px.
- **Lede** (Geist 400, 1.0625rem/1.5): opening sentence under a chapter title. Max 44ch.
- **Label** (Geist Mono 400, 0.75rem, 0.08em tracking, uppercase): HUD status, panel meta, dates, tags.
- **Pixel label** (Silkscreen 400, 0.75–0.8rem): buttons, nav, chips, panel titles.

### Named Rules
**The Readable Scale Rule.** No visible text under 12px. Body copy is 16px minimum; Quick view reading text is 13–15px; metadata is 12px. Pixel fonts are allowed for labels, never for paragraphs.

**The Display-Only Pixel Rule.** Silkscreen is for headings, HUD, buttons, and short labels. Body paragraphs stay in Geist. A pixel font in a paragraph is a failure, not a style.

**The Two-Voice Rule.** Pixel voice = identity and chrome. Sans voice = information. Do not blur them.

**The 65ch Rule.** Body copy never exceeds 65–75 characters per line, including inside panels.

## Layout

The site is a fixed stage plus a tall scroll track. The canvas and HUD are `position: fixed`; the document height comes from `.scroll-track` (540svh desktop, 480svh at ≤900px). The camera reads scroll progress and pans horizontally.

- **Stage:** full viewport, fixed, z-index 0. Canvas fills it; vignette and scanlines sit above the canvas at low opacity.
- **HUD:** fixed, full viewport, pointer-events none; only controls receive pointer events. Top bar + bottom progress on desktop; top bar + bottom chapter nav on mobile. Wordmark 13px desktop / 12px mobile; status 12px; nav 12px.
- **Chapter panels:** fixed, vertically centered on desktop; left/right of the stage depending on the room. Width `min(520px, 40vw)`; wide workshop panel `min(680px, 46vw)`. At ≤1100px, width narrows to 46vw / 52vw. At ≤900px, panels become draggable bottom sheets above the mobile nav: collapsed (title bar), half (56svh), and full (`calc(100svh - 164px)`, kept clear of the HUD). Chapter 2 is **The Homelab** (`#homelab`).
- **Panel body:** max-height 70vh desktop; flex-filled and scrollable on mobile; internal scroll with an inset bottom shadow. The mobile title bar is the drag handle (`touch-action: none`, pointer capture), and a chevron provides collapsed/half states for keyboard and assistive technology.
- **Quick view:** native dialog, max-width 1160px, max-height 92dvh; full-screen on mobile.
- **Command palette:** native dialog, max-width 640px, centered.
- **Reduced-motion document:** max-width 1200px, normal vertical flow, scene poster above each chapter.
- **Breakpoints:** 1100px (panel narrowing; HUD actions compact to sound + Quick view), 900px (mobile shell: bottom sheet, bottom nav, full-screen dialogs), 480px (single-column facts/specs, full-width actions), 389px (drop the HUD wordmark and status so the logo, sound, and menu fit at 320px).
- **Density:** generous around the world, tight inside panels. Panels are scanners, not posters.
- **Alignment:** panels align to a 4vw inset on desktop; content uses a consistent 22px inner padding. Mobile sheets inset 10px.

## Elevation & Depth

Depth is pixel-native: hard offset shadows, 2px borders, and inset scroll shadows. Blur is not a surface treatment.

### Shadow Vocabulary
- **Panel lift** (`8px 8px 0 rgba(0,0,0,0.45)`): chapter panels, quick view, command palette.
- **Button lift** (`3px 3px 0 rgba(0,0,0,0.42)`): pixel buttons at rest; hover moves to 4px, active to 1px.
- **Photo frame** (`3px 3px 0 rgba(0,0,0,0.4)`): ProtoPrime3D part photos and portrait.
- **Inset scroll fade** (`inset 0 -18px 16px -16px rgba(0,0,0,0.7)`): panel body bottom, signaling more content.
- **Vignette** (radial gradient to rgba(5,4,9,0.7)): stage edges only.
- **Glow:** the canvas draws soft radial glows for lamps, monitor, fire, moon, and LEDs. CSS never adds a colored halo to a card.

### Named Rules
**The Hard-Shadow Rule.** Interactive surfaces use a zero-blur offset shadow, because the world is pixel art. This is earned by the world, not a default for other projects.

**The Flat-At-Rest Rule.** No ambient card glow. Light belongs to the canvas and to state changes.

## Shapes

Everything is axis-aligned and sharp. The world is made of rectangles; the UI follows.

- **Radius:** 0px everywhere. No pill buttons, no rounded cards, no 24px nav surface.
- **Borders:** 1px for tags/dividers, 2px for panels, buttons, dialogs, and the HUD nav.
- **Pixel corners:** the HUD mark is the existing SamVivan logo, rasterized to a 64 × 64 pixel grid; the panel dots are 6px squares.
- **Photo frames:** 2px line border, 3px dark inset, square corners.
- **No clip-path masks, no glass shapes, no blob geometry.**

## Components

### HUD
- Fixed top bar with the SamVivan mark (pixelated from `assets/logo.svg` to a 64 × 64 grid) and `BSP://HOMELAB` wordmark in Silkscreen.
- Status line: green live dot + `OPEN TO INTERNSHIP` + Banda Aceh time in amber. Time is real (`Asia/Jakarta`).
- Desktop nav: four chapter buttons with two-digit indices; active state is teal fill with void text.
- Actions: command palette key, ambient-sound pill (`Sound on` / `Muted`, speaker icon, `aria-pressed`), CV download, Quick view primary button. At 901–1100px the command key, CV key, and sound label collapse so the nav still fits.
- Mobile: wordmark + status + sound icon + menu button; bottom nav with four chapter icons and Resume. The mobile menu has a labeled `Sound: on/off` action.
- At ≤389px the wordmark and status hide; the logo, sound, and menu remain.
- Progress: bottom-left segment bar on desktop, thin top line on the mobile bottom nav.

### Ambient Sound
- Original 64-second loop, synthesized by `scripts/generate-ambient.py`: four 16-second chord beds (one per chapter), warm minor-ninth pads, soft rain, a distant server hum, sparse music-box notes, and tape crackle.
- Mastered to about -21 LUFS; the audio element runs at 0.28 volume, so it sits under conversation.
- Default on for first visits, starts only on a user gesture, loops sample-aligned, pauses when the tab is hidden, and persists an explicit mute.

### Buttons
- **Primary:** teal fill, void text, 2px teal border, 3px hard shadow. Hover to cream fill; active presses in.
- **Ghost:** night fill, line border, cream text.
- **Quiet:** transparent, no shadow, muted text; used for "The Lab" / "Back to the desk".
- **Sizes:** 44px minimum height; 36px for compact HUD actions.
- **Focus:** 2px teal outline, 3px offset, visible on both dark and teal surfaces.

### Chips
- 1px border, 3px × 8px padding, Geist Mono 12px, sentence case in the DOM but visually small caps via content.
- Tones: violet (default), teal, amber, green, pink, muted.
- Used for availability, focus areas, languages, materials, counts.

### Chapter Panel
- 2px line border, night ground 0.94 alpha, 8px hard shadow.
- Title bar: three 6px colored dots, Silkscreen title, mono meta, mobile collapse chevron.
- Body: 22px padding, max 70vh, inset bottom shadow, thin scrollbar.
- Footer: 1px top border, mono 12px, one line of context.
- Active state: opacity 1, visible, translateY(-50%) scale(1). Inactive: opacity 0, hidden, translateY(-46%) scale(0.985). 260–320ms.
- Mobile: bottom sheet above the nav with collapsed / half / full snap points; drag the title bar or use the chevron. Snap transitions are disabled while dragging; reduced motion makes them instant.

### Tabs
- Underlined row, Silkscreen 12px. Active tab is amber fill with void text. Inactive is muted with a line-border hover.
- ARIA tablist/tab/tabpanel; arrow keys, Home, End. No timed tabs.

### Quick View
- Native `<dialog>` with `showModal()`; Escape and backdrop click close.
- Title bar `RESUME.EXE — QUICK VIEW` with three dots and a 40px close button.
- Hero: 150px portrait in a pixel frame, name in Silkscreen, role, availability chips, contact links.
- Two-column body: 320px sidebar (education, contact, homelab, skills, languages, workshop) and main (profile, experience, projects, certifications, what I'm looking for).
- Footer: source note + Copy email + Download CV.
- Mobile: full-screen, single column, footer actions in a 2-column grid.

### Pages (Case Study, Homelab, Resume)
- `PageShell`: sticky 2px-line header with the pixel logo, wordmark, `World`, `Homelab`, `Resume`, `CV`, and `GitHub`; a static `ScenePoster`; a 1000px content column; and a quiet footer.
- Case studies use a 2-column Problem/Approach/Result/Stack grid, a real image or blueprint card, and repository links. Body 16px, measure ≤75ch.
- Homelab uses a 3-column fact grid, a vertical host → Docker → service-group diagram, and a service list. Dates are labeled `Verified Nov 2026`; the container count is described as a snapshot.
- Resume shares `ResumeDocument` with Quick view. Print CSS hides the shell and buttons, switches to white/black, and avoids breaking experience, project, and certification rows.
- Dialogs reuse the same content components at full width on mobile.

### Command Palette
- Native `<dialog>`, terminal chrome: `bintang@homelab:~$ jump`, search field, listbox of chapters/actions/links, keyboard footer.
- `Ctrl/Cmd + K` toggles. Arrow keys move; Enter runs; Escape closes.
- Active option: teal border and translucent teal fill.
- Actions: chapters, Quick view, CV, copy email, GitHub, LinkedIn, ProtoPrime3D.

### Scene Poster
- Static canvas slice (853 × 480) of the world at a chapter stop.
- 2px line border, 6px hard shadow, `image-rendering: pixelated`.
- Used in the reduced-motion document and as a stable visual anchor. Role `img` with a descriptive label.

## Signature Component — Pixel World

A single prerendered Canvas 2D world, 3900 × 800 logical pixels, floor at y=620, four 900px rooms separated by 100px corridors. The camera shows a 480px-tall slice; landscape view width follows the aspect ratio (720–1120px), portrait view is 360px wide with a 560–880px height. The world is drawn with a limited palette and a 3×5 pixel font for signs.

- **Rooms:** Desk (window, CRT, shelf, cat, lamp), Homelab (desktop tower, compact 12U rack, drive shelf, N8N terminal, certificate wall), Workshop (pegboard, blueprints, 3D printer, filament spools, printed parts), Roof (sky, moon, city, railing, campfire, string lights, antenna).
- **Dynamic layer:** rain in the desk window, rack LEDs, monitor cursor and scanline, mug steam, fire flicker and embers, star twinkle, string-light pulse, and the avatar's walk cycle.
- **Avatar:** 14 × 24 pixel character with a violet hoodie, teal backpack, and two-frame walk. Rendered at 2× on desktop and 1.5× on mobile; on mobile it sits behind the bottom sheet and is revealed when the panel is collapsed.
- **Camera:** piecewise mapping from scroll progress to world x. Each chapter has a hold range and a fast transition corridor. Desktop and portrait use different keyframe stops so the focal object stays centered on narrow screens.
- **Rendering:** one offscreen world canvas, one viewport frame canvas, nearest-neighbour upscale to the display canvas. `image-rendering: pixelated`; no smoothing. Pause drawing when the document is hidden.
- **Accessibility:** the canvas is `aria-hidden` and decorative. All content is real DOM; the Quick view and reduced-motion document are the accessible complete documents.

## Motion

**The Camera Is the Page.** Scroll does not trigger a hundred reveals; it moves one camera through one world. Chapter panels fade and lift at the hold points; transitions are quiet so the world can be seen.

- **Camera smoothing:** exponential approach (`1 - 0.001^(dt/1000)`) so the camera follows the scroll with a cinematic lag. Reduced motion snaps.
- **Panel enter/exit:** 260–320ms, opacity + translateY + scale. No bounce.
- **Ambient loops:** rain, LEDs, cursor, steam, fire, stars, string lights. They are part of the world, not decorative UI.
- **Hover:** buttons move 1px and lift their shadow; active presses 2px. Links change color and border. No tilt.
- **Reduced motion:** camera snaps, rain/LED/steam/fire/stars are frozen or removed, panels don't translate, the main experience becomes the vertical document. `<0.01ms` CSS backstop for any remaining transition.
- **Performance:** no layout-animating properties; canvas is low-res; dynamic layer is hand-drawn; images use next/image; GitHub requests time out at 9s and fall back to curated data.

## Content

- **Recruiter first.** The desk panel leads with name, role, availability, education, GPA, and CV. Quick view is always one click away. The HUD status is permanent.
- **ProtoPrime3D is a side path.** It appears as the Workshop / Prints tab with real part photos, machine specs, materials, lead time, and a link out. It never replaces the CV or the recruiter funnel.
- **No fabrication.** Every claim maps to `data/portfolio.ts`, the GitHub API, a certificate URL, the CV PDF, or protoprime3d.my.id.
- **Honest fallbacks.** If GitHub is unavailable, the workshop says "Curated snapshot" and still links to real repositories. It never invents projects.
- **One wording per fact.** Dates, GPA, degree, availability, and business specs appear once in the data and are reused.

## Accessibility & Inclusion

- WCAG 2.2 AA baseline.
- Body text uses cream or muted on night; labels use muted; teal is reserved for links/actions with sufficient contrast.
- Every control has a visible focus ring; the skip link is the first focusable element and opens Quick view.
- The chapter panels are articles with `inert` and `aria-hidden` when inactive; the active panel is a real reading surface.
- The Quick view is a native dialog; focus is contained, Escape closes, and the close button is 40px.
- The command palette is a dialog with a labelled input, listbox options, arrow-key navigation, and Enter/Escape.
- The mobile panel chevron has `aria-expanded` and a 36px target; the title bar is a pointer drag handle. All nav and action targets are ≥44px except compact HUD keys (36px, with 44px spacing).
- The sound toggle is a labeled button on desktop, an icon button plus labeled menu item on mobile, and exposes `aria-pressed`. It starts muted only after an explicit opt-out; first visits default on but playback waits for a user gesture.
- `prefers-reduced-motion` delivers the full document with static posters; no camera, no rain, no blinking.
- No horizontal scroll at 320px; panels and dialogs are width-constrained; body copy wraps.

## Do's and Don'ts

### Do
- **Do** keep the world as one continuous place; rooms connect through corridors.
- **Do** use sharp 0px corners, 2px borders, and hard offset shadows.
- **Do** use Silkscreen for headings/HUD and Geist for body.
- **Do** keep teal for actions and "online" signals; let amber and violet carry atmosphere.
- **Do** make the recruiter path obvious: status, CV, Quick view, contact.
- **Do** keep the reduced-motion document complete and visually intentional.
- **Do** label fallback data honestly.
- **Do** use real photos for real parts and real credentials.

### Don't
- **Don't** reintroduce glassmorphism, blur cards, pill buttons, or gradient text.
- **Don't** set paragraphs in Silkscreen.
- **Don't** add a second accent system or a light theme.
- **Don't** fabricate testimonials, clients, hardware, uptime, pricing, or project results.
- **Don't** make ProtoPrime3D the primary funnel; it has its own site.
- **Don't** let the canvas carry information that isn't also in the DOM.
- **Don't** pin more than the one camera scene; no nested scroll-jacking.
- **Don't** animate layout properties or add random blinking.

## Technical Notes

- **Content:** `frontend/src/data/portfolio.ts` is the single source of truth for profile, chapters, experience, certifications, homelab, skills, projects, business, and contact links. `data/caseStudies.ts` holds project narratives derived from the owner's READMEs.
- **World:** `frontend/src/components/pixel/world/` (`palette.ts`, `helpers.ts`, `scenes.ts`, `index.ts`) draws the prerendered world and the dynamic frame.
- **Stage:** `PixelStage.tsx` owns the canvas, viewport metrics, camera smoothing, and dynamic frame composition.
- **Shell:** `Portfolio.tsx` owns scroll progress, chapter state, deep links, keyboard shortcuts, the dialogs, and the ambient audio element; `useAmbientSound.ts` handles gesture start, visibility pause, persistence, and `aria-pressed` state.
- **Sheets:** `useMobileSheet.ts` handles pointer capture, velocity, clamping, and collapsed/half/full snapping; `PixelPanel.tsx` owns the `data-sheet` state and chevron.
- **Analytics:** `lib/analytics.ts` is a no-op unless `NEXT_PUBLIC_UMAMI_SRC` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` are set. `TrackView` fires page-level events from server-rendered routes.
- **Layout mapping:** `lib/chapters.ts` owns the world dimensions, chapter scroll ranges, camera keyframes (desktop + portrait), and scroll helpers.
- **Live data:** `app/api/github/route.ts` fetches and caches GitHub repositories and user stats server-side (10-minute TTL), returning a curated real fallback on failure. `hooks/useLiveProjects.ts` is the client hook that calls it.
- **Reduced motion:** `ReducedMotionDocument.tsx` + `ScenePoster.tsx`; the cinematic shell returns `null` when reduced motion is active.
- **Progressive enhancement:** an inline script adds `.js` to `<html>` and `.reduced` when the media query matches. Without JS, the reduced-motion document is the page; with JS + no reduced motion, the cinematic shell is the page.
- **PWA:** `public/manifest.json`, `public/sw.js`, `ServiceWorkerRegister.tsx` (production only; unregisters in dev).
- **Logo:** `public/assets/logo.svg` is preserved as the source; `logo-pixel.svg` is the 64 × 64 pixel derivative used in the HUD, and `logo-pixel-icon.svg` is the dark-background version used for the favicon and PWA icons.
- **Metadata:** title, description, Open Graph/Twitter (`/og.jpg`), Person JSON-LD, theme color `#08070f`.
