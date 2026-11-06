---
name: Muhammad Bintang Panji Kusuma — Portfolio
description: Dark glassmorphic portfolio of a Computer Engineering student, Linux enthusiast, and homelab tinkerer.
colors:
  void: "#050505"
  deep-plum: "#120F17"
  electric-violet: "#a855f7"
  violet-bright: "#c084fc"
  violet-soft: "#d8b4fe"
  violet-deep: "#9333ea"
  soft-pink: "#f472b6"
  sky-cyan: "#38bdf8"
  neon-pink: "#FF9FFC"
  deep-indigo: "#5227FF"
  star-yellow: "#facc15"
  neutral-white: "#ffffff"
  neutral-gray: "#9ca3af"
  neutral-border: "rgba(255, 255, 255, 0.1)"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.2
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 1.1
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.neutral-white}"
    textColor: "{colors.void}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-gradient:
    backgroundColor: "{colors.electric-violet}"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  card-glass:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.neutral-white}"
    rounded: "{rounded.lg}"
    padding: "24px"
  navbar-glass:
    backgroundColor: "rgba(255, 255, 255, 0.1)"
    textColor: "{colors.neutral-white}"
    rounded: "24px"
    padding: "8px 16px"
  badge:
    backgroundColor: "rgba(168, 85, 247, 0.2)"
    textColor: "{colors.violet-bright}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
---

# Design System: Muhammad Bintang Panji Kusuma — Portfolio

## Overview

**Creative North Star: "The Homelab Atrium"**

A dark, immersive viewing chamber where glowing glass panels float over a plasma field, and the work itself is the exhibit. The portfolio reads like a living control room for a homelab enthusiast: deep void background, translucent glass surfaces, and a single electric-violet accent that carries identity, emphasis, and glow. Motion is purposeful and atmospheric (scroll smoothing, animated text, a 3D Linux mascot that tracks the cursor), never decorative filler. Brand lives in the precise details — the purple glow, the glass blur, the rounded-full CTAs — not in loud chrome.

**Key Characteristics:**
- Dark void canvas (`#050505`) with a fixed, animated LightPillar shader behind all content.
- Glassmorphism as the primary surface language: `backdrop-blur`, semi-transparent white layers, thin white borders.
- Single accent — Electric Violet (`#a855f7` / `#c084fc`) — used for headings, links, glows, borders, and emphasis.
- Rounded-full pill CTAs and rounded-2xl glass cards; no sharp corners anywhere.
- Geist Sans for all UI/body; Geist Mono only for labels and metadata.
- Depth via glow and translucency, not hard drop shadows.

## Colors

The palette is a dark void plus one saturated accent, supported by a small set of gradient partners (pink, cyan, indigo) used only in hero text and decorative glows.

### Primary
- **Electric Violet** (#a855f7): Buttons, glows, borders, badges, emphasis. The one voice of the brand; its rarity is the point.
- **Violet Bright** (#c084fc): Headings, icons, link text, active nav states. The lighter reading of the accent.

### Secondary
- **Soft Pink** (#f472b6): Gradient partner in hero display text and decorative glows.
- **Sky Cyan** (#38bdf8): Gradient partner in hero display text and the LightPillar lower color.

### Tertiary
- **Deep Indigo** (#5227FF): LightPillar upper color; used only in the background shader.
- **Neon Pink** (#FF9FFC): LightPillar lower color; used only in the background shader.
- **Star Yellow** (#facc15): GitHub star counts and warning/error emphasis.

### Neutral
- **Void Black** (#050505): Page background fallback and canvas base.
- **Deep Plum** (#120F17): Card base tint (BorderGlow background) and tooltip surfaces.
- **Pure White** (#ffffff): Primary body text, CTA labels, navbar wordmark.
- **Muted Gray** (#9ca3af): Secondary/supporting text (descriptions, metadata).
- **Glass White** (rgba(255, 255, 255, 0.05–0.2)): Surface fills and borders over the void.
- **Violet Deep** (#9333ea): Darker accent for gradient button endpoints and hover emphasis.

### Named Rules
**The One Voice Rule.** The electric-violet accent appears on ≤10% of any given screen. Its rarity is the point; everything else is white, gray, or glass.

**The No-Hard-Shadow Rule.** Surfaces never cast opaque drop shadows. Depth is conveyed by translucency, blur, and purple glow only.

## Typography

**Display Font:** Geist (with system-ui, sans-serif fallback)
**Body Font:** Geist (with system-ui, sans-serif fallback)
**Label/Mono Font:** Geist Mono (with ui-monospace, monospace fallback)

**Character:** A modern, neutral grotesque that stays out of the way of the content and the effects. Geist's clean geometry pairs with the glass/violet world without competing; Geist Mono adds a technical, terminal-adjacent note for labels and metadata, nodding to the homelab identity.

### Hierarchy
- **Display** (800, 3rem/48px, 1.2): Hero name. Left-aligned, animated via Shuffle scramble.
- **Headline** (900, 2.25rem/36px, 1.1): Section titles ("About Me", "Professional Journey", "Github Projects"). Purple glow drop-shadow.
- **Title** (600, 1.25rem/20px, 1.3): Card titles, sub-section headings.
- **Body** (400, 1.125rem/18px, 1.625): Paragraphs; max line length ~75ch. Gray-300 on dark void.
- **Label** (500, 0.75rem/12px, 0.1em letter-spacing, uppercase): Tags, badges, section eyebrow text.

### Named Rules
**The Glow-Headline Rule.** Section headlines always carry a purple text-shadow glow (`drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]`). Body text never does.

## Layout

The layout is a single scrolling column inside a GSAP ScrollSmoother wrapper (desktop only; native scroll on mobile). Sections are full-width with centered max-width containers.

- **Container:** `max-w-7xl` (1280px) centered, with `px-4` to `px-16` horizontal padding.
- **Section rhythm:** `py-20` (80px) vertical padding between sections; hero is `min-h-screen`.
- **Grid:** 1 column on mobile, 2 columns (`md:grid-cols-2`) for projects, 2-column masonry-style timeline on `lg`.
- **Breakpoints:** Tailwind defaults — `sm` 640px, `md` 768px, `lg` 1024px. Mobile-first; effects (LightPillar, ScrollSmoother) are disabled below `md`.
- **Density:** Generous. Large hero, ample vertical breathing room; cards are not packed.
- **Alignment:** Hero splits 50/50 (model right, bio left) on desktop; stacks on mobile.

## Elevation & Depth

Depth is conveyed by translucency and glow, not by shadows. The fixed LightPillar shader sits at `z-0` behind a `z-10` content layer; glass panels float over it with `backdrop-blur` and semi-transparent white fills. Shadows appear only as a state response (hover glow on cards/buttons) or as the purple text-glow on headlines.

### Shadow Vocabulary (if applicable)
- **Purple Glow Small** (`shadow-[0_0_10px_rgba(168,85,247,0.5)]`): Timeline dots and small interactive accents.
- **Purple Glow Medium** (`shadow-[0_0_20px_rgba(168,85,247,0.4)]`): Card hover states and button hover.
- **Purple Glow Large** (`shadow-[0_0_30px_rgba(168,85,247,0.15)]`): Expanded card hover.
- **White Glass Glow** (`shadow-[0_0_50px_rgba(255,255,255,0.05)]`): Footer card ambient glow.
- **Contact Button Glow** (`shadow-[0_0_20px_rgba(255,255,255,0.3)]`): White CTA hover.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows and glows appear only as a response to state (hover, focus, active) or as the ambient headline glow.

## Shapes

The form language is soft and continuous: everything is rounded, nothing is sharp. Radii scale from 8px (small chips/badges) to full pills for CTAs. Glass panels use a 24px radius. Borders are thin (1px) and semi-transparent white. No clipping, no hard edges, no square corners on interactive elements.

- **Small radius (8px):** Badges, chips, small tags.
- **Medium radius (12px):** Inputs, dropdowns.
- **Large radius (16px):** Cards, containers, glass panels (card-glass).
- **Extra-large radius (24px):** Navbar glass surface, modal-like panels.
- **Pill (9999px):** All buttons and CTAs.

## Components

### Buttons
- **Shape:** Pill (9999px), generous horizontal padding.
- **Primary (white CTA):** White fill, black text, `px-6 py-2.5`, hover glow `shadow-[0_0_20px_rgba(255,255,255,0.3)]`.
- **Gradient (Download CV):** Electric-violet → indigo gradient fill, white text, rounded-20, hover lift.
- **Ghost/secondary:** Transparent fill, white/10 border, hover `bg-white/10`.
- **Mobile contact:** Solid purple-600 fill, white text, rounded-xl, shadow `shadow-[0_10px_20px_rgba(147,51,234,0.3)]`.

### Chips / Tags
- **Style:** `bg-purple-500/20` fill, `text-purple-300`, `border border-purple-500/30`, rounded-lg, `text-[10px]` uppercase tracked.
- **State:** Static; hover brightens border to `purple-500/50`.

### Cards / Containers
- **Corner Style:** 16px (rounded-2xl).
- **Background:** `bg-white/10` or `bg-white/[0.03]` over the void; `backdrop-blur-md`.
- **Shadow Strategy:** None at rest; purple glow on hover (`shadow-[0_0_20px_rgba(168,85,247,0.4)]`).
- **Border:** `border border-white/10`, hover `border-purple-500/40`.
- **Internal Padding:** 24px (`p-6`).

### Inputs / Fields
- Not used in this portfolio; forms are absent. If added, follow card-glass styling (glass fill, white/10 border, 12px radius, purple focus glow).

### Navigation
- **Style:** Fixed glass bar, 24px radius, `backdrop-blur` (11px), `bg-white/10` fill, `border border-white/10`, `min-h-[50-60px]`.
- **Typography:** `text-sm font-bold tracking-wide`, inactive `text-white/50`, active/hover `text-white`.
- **Active state:** Animated glass pill (`bg-white/10 backdrop-blur-2xl border border-white/20`) slides between items via Framer Motion `layoutId`.
- **Mobile:** Hamburger toggle; dropdown glass panel with nav items and a solid purple contact button.

### Signature Component — LightPillar Background
A fixed WebGL shader (top `#5227FF`, bottom `#FF9FFC`) rendered at `z-0` behind all content, visible only on desktop. It is the atmospheric identity of the site; content must remain `bg-transparent` to let it show.

## Do's and Don'ts

### Do:
- **Do** keep the background transparent (`bg-transparent`) on content layers so the LightPillar shows through.
- **Do** use Electric Violet (`#a855f7`) as the single accent; keep it to ≤10% of any screen.
- **Do** use glass surfaces (`backdrop-blur` + semi-transparent white fill + thin white border) for cards, nav, and modals.
- **Do** apply the purple headline glow to section titles only.
- **Do** disable heavy effects (LightPillar, ScrollSmoother) below the `md` breakpoint.
- **Do** use rounded-full for all CTAs and rounded-2xl for cards/panels.
- **Do** keep body text in Muted Gray (`#9ca3af`) / white over the void for readability.

### Don't:
- **Don't** introduce a second accent color or a light theme; the system is dark-only.
- **Don't** use opaque drop shadows or hard edges on interactive elements.
- **Don't** apply glassmorphism to body text or dense content; reserve it for surfaces.
- **Don't** add new fonts; Geist + Geist Mono only.
- **Don't** let the LightPillar or animations block interaction (`pointer-events-none` on the background layer).
- **Don't** mix in generic Bootstrap/template layouts or cookie-cutter hero patterns.
