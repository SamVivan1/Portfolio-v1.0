export interface CaseStudyVisual {
  kind: "image" | "blueprint";
  src?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface CaseStudy {
  slug: string;
  repo: string;
  title: string;
  tagline: string;
  status: string;
  problem: string;
  approach: string[];
  result: string[];
  stack: string[];
  links: { label: string; href: string }[];
  visual?: CaseStudyVisual;
  route?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "lyra",
    repo: "Lyra",
    title: "Lyra",
    tagline:
      "A self-hosted music automation service that falls back when Lidarr cannot find the track.",
    status: "Active · self-hosted",
    problem:
      "Lidarr is excellent at automated music acquisition, but it stops at hard-to-find releases. Filling those gaps by hand breaks the point of a homelab: the library should keep itself current.",
    approach: [
      "Pull personalized artist recommendations from ListenBrainz.",
      "Try Lidarr first for high-quality releases, with a configurable wait before fallback.",
      "Fall back to yt-dlp for the missing tracks, then enrich them with MusicBrainz metadata.",
      "Track artist additions and fallback state in SQLite so repeated runs do not duplicate work.",
      "Support separate Docker and host paths so Lidarr and Lyra can share one music library.",
    ],
    result: [
      "A modular Python service that runs on a schedule in Docker.",
      "A manual CLI downloader with search, tagging, and folder organization.",
      "A pipeline that ends in Navidrome or Jellyfin instead of a folder of loose downloads.",
    ],
    stack: [
      "Python",
      "Docker",
      "Lidarr",
      "ListenBrainz",
      "yt-dlp",
      "MusicBrainz",
      "SQLite",
      "Navidrome / Jellyfin",
    ],
    links: [
      { label: "Repository", href: "https://github.com/SamVivan1/Lyra" },
    ],
    visual: {
      kind: "blueprint",
      alt: "Blueprint-style card for Lyra, showing a ListenBrainz to Lidarr to yt-dlp pipeline.",
      caption: "ListenBrainz → Lidarr → yt-dlp → tagged library",
    },
  },
  {
    slug: "octopad",
    repo: "octopad",
    title: "OctoPad",
    tagline:
      "An 8-key ESP32 macropad with native Linux and Windows apps — no web server, no Docker.",
    status: "v2.7.0 · open source",
    problem:
      "Most macropads either lock you into a web configurator or require a background daemon. I wanted a small, wireless pad that could switch between desktop shortcuts and Home Assistant without extra infrastructure.",
    approach: [
      "Build around an ESP32-C3 SuperMini with BLE HID and USB Serial.",
      "Support single click, double click, and hold on eight mechanical keys, with LED feedback.",
      "Add a dual-layer switch: desktop productivity and Home Assistant mode.",
      "Ship native apps: GTK4 / Libadwaita on Linux and PySide6 / Qt6 on Windows.",
      "Expose a live hardware event monitor, serial console, JSON profiles, and Home Assistant REST calls.",
    ],
    result: [
      "A standalone BLE keyboard that keeps working after the config app closes.",
      "A native Linux app that looks and feels like a desktop tool, not a web page.",
      "A documented hardware pinout, timing engine, and default keymap.",
    ],
    stack: [
      "ESP32-C3",
      "BLE HID",
      "USB Serial",
      "Python",
      "GTK4 / Libadwaita",
      "PySide6 / Qt6",
      "Home Assistant",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/SamVivan1/octopad",
      },
    ],
    visual: {
      kind: "image",
      src: "/assets/case-studies/octopad.png",
      alt: "Screenshot of the OctoPad native Linux configuration app.",
      caption: "The native GTK4 / Libadwaita configuration app.",
      width: 512,
      height: 512,
    },
  },
  {
    slug: "n8n-workflows-backup",
    repo: "n8n-Workflows-Backup",
    title: "n8n Workflows Backup",
    tagline: "Scheduled n8n backups with version history in GitHub.",
    status: "Running in the homelab",
    problem:
      "n8n workflows are code, but they often live only inside the n8n database. A bad edit or a lost instance means losing automation work with no version history.",
    approach: [
      "Schedule an n8n workflow to retrieve every active workflow as JSON.",
      "List the existing files in the target GitHub repository.",
      "Use an IF node to decide between updating an existing file and uploading a new one.",
      "Commit each backup with a timestamp so the history is readable.",
    ],
    result: [
      "One JSON file per workflow, versioned by Git commits.",
      "A backup trail that can be audited or restored.",
      "No manual export step after the initial setup.",
    ],
    stack: ["n8n", "GitHub OAuth2", "GitHub API", "JSON", "Scheduling"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/SamVivan1/n8n-Workflows-Backup",
      },
    ],
    visual: {
      kind: "blueprint",
      alt: "Blueprint-style card for the n8n backup workflow, showing retrieve, compare, and commit steps.",
      caption: "Retrieve → compare → update or upload → commit",
    },
  },
  {
    slug: "gnome-widget",
    repo: "samvivan-gnome-widget",
    title: "GNOME Desktop Widget",
    tagline:
      "A lightweight GNOME Shell widget suite for the information you actually check.",
    status: "GNOME 48–51 · open source",
    problem:
      "Desktop information is scattered across apps and panels. I wanted a single, quiet layer for time, calendar, weather, photos, battery, music, and the 3D printer — without another Electron app.",
    approach: [
      "Build a GNOME Shell extension that lives on the desktop layer.",
      "Add clock, calendar, agenda, weather, photos, battery, Bambu Lab, and music widgets.",
      "Support drag, resize, snap-to-grid, multi-monitor placement, opacity, and edit mode.",
      "Use Immich for photos, a self-hosted Bambu bridge for printer telemetry, and MPRIS for music.",
      "Respect GNOME reduce-motion preferences and keep the settings panel native.",
    ],
    result: [
      "A native GNOME experience rather than a web wrapper.",
      "Per-widget settings and a top-panel menu for quick toggles.",
      "An open-source extension with releases and a documented setup.",
    ],
    stack: [
      "GJS / JavaScript",
      "GNOME Shell 48–51",
      "GTK",
      "Immich API",
      "MPRIS",
      "Bambu bridge",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/SamVivan1/samvivan-gnome-widget",
      },
    ],
    visual: {
      kind: "image",
      src: "/assets/case-studies/gnome-widget.png",
      alt: "Screenshot of the GNOME desktop widget suite.",
      caption: "Widgets on the GNOME desktop layer.",
      width: 1600,
      height: 900,
    },
  },
  {
    slug: "portfolio",
    repo: "Portfolio-v1.0",
    title: "This Portfolio",
    tagline:
      "A scroll-driven pixel homelab with a recruiter-first information layer underneath.",
    status: "Live · measured Nov 2026",
    problem:
      "A generic portfolio can list skills but cannot prove them. The site needed to be memorable enough to explore, while still letting a recruiter verify the CV, projects, and credentials in under a minute.",
    approach: [
      "Build one continuous Canvas 2D pixel world instead of a stack of template sections.",
      "Drive a horizontal camera from vertical scroll, with desktop and portrait keyframes.",
      "Keep the information layer real DOM: chapter panels, a resume dialog, and a reduced-motion document.",
      "Serve GitHub data through a cached server route with a curated fallback.",
      "Raise the type scale until no visible text renders below 12px.",
    ],
    result: [
      "Lighthouse 100/100/100 for Accessibility, Best Practices, and SEO.",
      "60fps idle and scroll on desktop and mobile emulation.",
      "0 visible text nodes below 12px in the Nov 2026 audit.",
      "A complete reduced-motion document and a keyboard-friendly Quick view.",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Canvas 2D",
      "Service worker",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/SamVivan1/Portfolio-v1.0",
      },
    ],
    visual: {
      kind: "image",
      src: "/og.jpg",
      alt: "Screenshot of the pixel-art homelab portfolio.",
      caption: "The desk chapter, with the HUD and recruiter-first panel.",
    },
  },
  {
    slug: "homelab-composes",
    repo: "homelab-composes",
    title: "Homelab Compose Library",
    tagline:
      "A small public library of Docker Compose patterns for self-hosted services.",
    status: "Ongoing · scaffold",
    problem:
      "Self-hosted services are easy to run once and hard to reproduce. A collection of compose patterns makes the next deployment less improvised.",
    approach: [
      "Keep each service configuration small and readable.",
      "Use environment files for secrets and host-specific paths.",
      "Document the setup steps beside the compose file.",
    ],
    result: [
      "A public starting point for repeatable self-hosted deployments.",
      "A README that is intentionally a scaffold; it grows as services are added.",
    ],
    stack: ["Docker", "Docker Compose", "YAML", "Linux"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/SamVivan1/homelab-composes",
      },
    ],
    route: false,
    visual: {
      kind: "blueprint",
      alt: "Blueprint-style card for the compose library.",
      caption: "One service, one compose file, one README",
    },
  },
];

export const caseStudyBySlug = new Map(
  caseStudies.map((caseStudy) => [caseStudy.slug, caseStudy])
);

export const caseStudyByRepo = new Map(
  caseStudies.map((caseStudy) => [caseStudy.repo, caseStudy])
);

export const routedCaseStudies = caseStudies.filter(
  (caseStudy) => caseStudy.route !== false
);
