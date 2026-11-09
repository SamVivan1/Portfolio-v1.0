# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers screening Muhammad Bintang Panji Kusuma for internship and entry-level roles. They need to verify skills, projects, credentials, and availability quickly, then decide whether to reach out.

Secondary: engineering peers and collaborators evaluating his homelab and open-source work; and prospective ProtoPrime3D customers who arrive through the workshop chapter. ProtoPrime3D has its own site and remains a secondary path.

## Product Purpose

A recruiter-first personal portfolio for Muhammad Bintang Panji Kusuma — a Computer Engineering student at Universitas Syiah Kuala (expected 2027) focused on DevOps, homelab systems, networking, and web development. Success means converting visits into internship/entry-level conversations and inbound collaboration by making capability verifiable rather than merely claimed.

## Positioning

A scroll-driven pixel-art homelab, not a template portfolio. The visitor walks through four rooms — desk, homelab, workshop, rooftop — while live GitHub data, verified credentials, a real 3D printing business, and a downloadable CV sit one layer below the surface. The memorable experience earns attention; the Quick view and reduced-motion document make the evidence scannable in under a minute.

## Operating Context

- Audience skims on desktop and mobile; the site is a PWA (installable, service worker registered) and ships Dockerized.
- Copy is in English. The owner's languages are Bahasa Indonesia (native), English (advanced), Japanese (beginner).
- The owner's professional context is homelab/DevOps and computer networking (BNSP-certified Junior Network Administrator), alongside coursework at Universitas Syiah Kuala in Banda Aceh, Indonesia.
- Heavy motion is part of the experience (scroll-driven camera, rain, LEDs, fire, avatar), so `prefers-reduced-motion` is a first-class path, not a fallback afterthought.
- The business ProtoPrime3D operates at protoprime3d.my.id; the portfolio links to it but does not replace it.

## Capabilities and Constraints

Capabilities:
- Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4.
- One continuous Canvas 2D pixel world (3900 × 800 logical pixels) behind four chapter panels.
- Scroll-driven camera with desktop and portrait keyframes; ambient rain, LEDs, monitor cursor, steam, fire, stars, string lights, and a walking avatar.
- Persistent HUD: wordmark, availability, local Banda Aceh time, chapter navigation, CV, Quick view, sound toggle, progress.
- Quick view dialog: a complete, conventional resume with summary, education, homelab, experience, skills, projects, certifications, languages, and ProtoPrime3D.
- `/resume`: the same resume as an indexable, printable page.
- Case studies: Lyra, OctoPad, n8n Workflows Backup, GNOME Desktop Widget, and this portfolio, each with problem, approach, result, stack, and repository link. Available as in-world overlays and shareable `/projects/[slug]` routes.
- `/homelab`: hardware, verification date, service groups, and a one-host Docker diagram.
- `/notes`: technical notes on the deploy rollback pipeline, n8n workflow backups, and the one-host homelab layout.
- Draggable mobile chapter sheets with collapsed, half, and full snap points.
- Chapter-aware ambient sound, default on for first-time visitors, started on the first user gesture, with a visible mute control and persistent preference. Rain, server hum, printer, and roof textures crossfade with the active chapter.
- Command palette (`Ctrl/Cmd + K`) for chapter jumps, links, CV, and copy-email.
- Live GitHub project data with a curated, truthful fallback based on real repositories.
- ProtoPrime3D workshop chapter with real part photos, machine specs, materials, lead time, and links.
- Reduced-motion document: the same content in a normal vertical page, with static scene posters.
- PWA manifest and service worker; Dockerized build.

Constraints:
- No testimonials, client logos, press mentions, or external case studies exist; do not fabricate them. The case studies in this portfolio are derived from the owner's own repository READMEs and verified facts.
- ProtoPrime3D facts must stay traceable to protoprime3d.my.id. The business is a side path, not the portfolio's main funnel. The homelab chapter reflects the live server: Ubuntu 26.04 LTS on an allocated desktop PC (Ryzen 5 4600G, 14 GB RAM, ~3.7 TB), 66 running containers, and the services listed in `data/portfolio.ts`.
- All credentials and project links must resolve to real sources.
- Core information must be reachable without animation, via Quick view, `/resume`, or the reduced-motion document.
- Baseline WCAG 2.2 AA. The canvas is decorative (`aria-hidden`); content lives in real DOM. Sound is never required to understand content.

## Brand Commitments

- Name: Muhammad Bintang Panji Kusuma (handle "SamVivan" / "SamVivan1").
- Location: Banda Aceh, Aceh, Indonesia.
- Education: Bachelor of Computer Engineering, Universitas Syiah Kuala (expected 2027); GPA 3.42/4.0.
- Availability: open for internship and entry-level opportunities.
- Contact: bintang10panji@gmail.com; GitHub SamVivan1; LinkedIn (muhammad-bintang-panji-kusuma); Instagram @bintang.panjii.
- Languages: Bahasa Indonesia (native), English (advanced), Japanese (beginner).
- Business: ProtoPrime 3D — FDM 3D printing in Banda Aceh; Bambu Lab A1 mini; PLA+/PETG/TPU; 180 × 180 × 180 mm; 0.1 mm layers; 2–5 working days.
- Assets preserved: profile portrait, CV PDF, certificate PDFs and verification links, ProtoPrime3D part photos and render, and the original SamVivan logo (`logo.svg`). The HUD and app icons use a 64 × 64 pixelated derivative of that logo.
- Voice: professional yet personable; engineering-credible; first-person.

## Evidence on Hand

Real, verifiable assets (paths relative to `frontend/public` unless noted):
- CV: `Sertifikat/Muhammad_Bintang_Panji_Kusuma_CV.pdf`
- Certificate: `Sertifikat/Sertifikat_MUHAMMAD BINTANG PANJI KUSUMA_Junior Network Administrator.pdf`
- SOI Asia credentials with verification URLs: Understanding the Internet, APIE Camp, Service Design, APIE Advanced Camp.
- Live GitHub repositories pulled from the GitHub API for `SamVivan1` through the server route `/api/github`, with a curated real fallback.
- Case-study source material: the owner's repository READMEs (`Lyra`, `octopad`, `n8n-Workflows-Backup`, `samvivan-gnome-widget`, `Portfolio-v1.0`, `homelab-composes`), linked from each study. Real screenshots are used where the repository provides them.
- Homelab evidence: Ubuntu 26.04 LTS on an allocated desktop PC (Ryzen 5 4600G, 14 GB RAM, ~3.7 TB), 66 running containers, and the service list in `data/portfolio.ts`.
- Profile portrait: `assets/profile.webp`.
- ProtoPrime3D part photos: `assets/protoprime/casing-iot.webp`, `assets/protoprime/kapal.webp`; render: `assets/protoprime/benchy.webp`.
- Business facts: `https://protoprime3d.my.id`.

Absences that future work must not fabricate: testimonials, case studies, client logos, press mentions, benchmarks, hardware specs, uptime numbers, or pricing not present on the business site.

## Product Principles

1. Show, don't tell: live repositories, certificate links, real part photos, and a downloadable CV over descriptive claims.
2. Optimize for the recruiter's scan: identity, availability, CV, and Quick view are reachable in the first viewport, without playing the site.
3. Preserve real credentials: never embellish experience, GPA, certifications, or business facts.
4. One world, one system: the cinematic journey and the document share the same content and visual language; the document is not a degraded afterthought.
5. Motion is enhancement, not a gate: core information remains reachable with reduced motion, keyboard, or no JavaScript.

## Accessibility & Inclusion

- WCAG 2.2 AA baseline.
- `prefers-reduced-motion` switches to a complete vertical document with static scene posters; no scroll-driven camera, parallax, rain, or blinking.
- The cinematic canvas is decorative and `aria-hidden`; chapters are real articles with headings and links.
- Quick view is a native `<dialog>` with focus containment and Escape to close.
- Command palette supports arrow keys, Enter, and Escape.
- Touch targets are at least 44px; mobile panels can be dragged between collapsed, half, and full heights, with a keyboard-accessible chevron fallback.
- The sound toggle exposes `aria-pressed`, is reachable on desktop and mobile, and the preference persists. Audio starts only after a user gesture and pauses when the tab is hidden.
- Focus rings use teal on the dark ground; body and link contrast are checked against the night palette.
