# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers screening Muhammad Bintang Panji Kusuma for internship and entry-level roles. They need to quickly verify skills, projects, credentials, and availability, and decide whether to reach out. Secondary audiences (engineering managers, peers, collaborators) are possible but not confirmed.

## Product Purpose

A personal portfolio that presents Muhammad Bintang Panji Kusuma — a Computer Engineering student at Universitas Syiah Kuala (expected graduation 2027) with interests in DevOps, homelab systems, and web development — to prospective employers and collaborators. Success means converting visits into internship/entry-level opportunities and inbound collaboration by making capability verifiable rather than merely claimed.

## Positioning

Live proof of skills: the portfolio demonstrates capability through interactive and verifiable artifacts (a 3D model viewer, live GitHub repository data, verifiable certificates with links, a downloadable CV) instead of static self-description. A generic resume or GitHub profile cannot show this combination of craft, systems experience, and verified credentials in one place.

## Operating Context

- Audience skims on both desktop and mobile; the site is a PWA (installable, service worker registered) and ships Dockerized (Dockerfiles/compose present) in addition to standard Next.js hosting.
- Content is bilingual-ish in practice: Bahasa Indonesia (native), English (advanced), Japanese (beginner); site copy is in English.
- The owner's professional context is homelab/DevOps and computer networking (BNSP-certified Junior Network Administrator), alongside coursework at Universitas Syiah Kuala in Banda Aceh, Indonesia.
- Heavy motion is part of the experience (GSAP ScrollSmoother on desktop, WebGL light pillar, animated text, 3D model), so reduced-motion considerations are material even though no specific requirement is confirmed.

## Capabilities and Constraints

Capabilities:
- Next.js 15 (App Router) + React 19 + TypeScript portfolio with Tailwind CSS 4.
- Animated hero with a 3D Linux mascot (model-viewer, cursor-driven camera parallax) and WebGL light-pillar background (desktop).
- About section with contact info, availability, education, experience, languages, and an interactive bento grid.
- Projects section pulling live repositories from the GitHub API, with fallback sample data.
- Experience timeline of SOI Asia / VSGA-DTS programs with verifiable certificate links.
- Tech stack display, footer with social links, navbar with glass surface.
- PWA manifest and service worker; Dockerized build.

Constraints / undecided:
- Viewport locks scaling (`userScalable: false`, max scale 1).
- Dark theme baseline (#050505 background); visual identity is not yet captured in DESIGN.md.
- No testimonials, case studies, or press exist; must not be fabricated.
- Platform confirmed as web; native wrapper/mobile-app framing does not apply.

## Brand Commitments

- Name: Muhammad Bintang Panji Kusuma (handle "SamVivan" / "SamVivan1").
- Location: Banda Aceh, Aceh, Indonesia.
- Education: Bachelor of Computer Engineering, Universitas Syiah Kuala (expected 2027); GPA 3.42/4.0.
- Availability: open for internship and entry-level opportunities.
- Contact: bintang10panji@gmail.com; GitHub SamVivan1; LinkedIn (muhammad-bintang-panji-kusuma); Instagram @bintang.panjii.
- Languages: Bahasa Indonesia (native), English (advanced), Japanese (beginner).
- Assets that must be preserved: logo.svg, profile.png, profilecard.png, linux.glb, CV PDF, certificate PDFs, SOI Asia/VSGA credential links.
- Voice: professional yet personable; engineering-credible; first-person ("I'm ...").

## Evidence on Hand

Real, verifiable assets (paths relative to `frontend/public` unless noted):
- CV: `Sertifikat/Muhammad_Bintang_Panji_Kusuma_CV.pdf`
- Certificates: `Sertifikat/Sertifikat_MUHAMMAD BINTANG PANJI KUSUMA_Junior Network Administrator.pdf`; SOI Asia credentials with verification URLs (Understanding the Internet, APIE Camp, Service Design, APIE Advanced Camp).
- Live GitHub repositories pulled via the GitHub API (with fallback sample data on failure).
- 3D model: `assets/linux.glb` (Linux mascot).
- Profile images: `assets/profile.png`, `assets/profilecard.png`.
- Logo: `assets/logo.svg`, `assets/logo-bg.svg`.

Absences that future work must not fabricate: no testimonials, case studies, client logos, press mentions, or benchmarks exist.

## Product Principles

1. Show, don't tell: prefer live/verifiable proof (repos, certs, 3D, CV) over descriptive claims.
2. Optimize for the recruiter's scan: lead with identity, availability, and evidence within the first viewport.
3. Preserve real credentials: never fabricate or embellish experience, GPA, or certifications.
4. Keep the portfolio honest about its own scope: it is a personal showcase, not a product or service.
5. Treat motion as enhancement, not gate: core information must be reachable without relying on animation.

## Accessibility & Inclusion

- Baseline WCAG 2.2 AA (confirmed). No further product-specific requirement established.
- Open decision: whether to formally support `prefers-reduced-motion` given the heavy motion; not yet decided.
EOF
echo "written"