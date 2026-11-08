export type ChapterId = "desk" | "homelab" | "workshop" | "roof";

export interface Chapter {
  id: ChapterId;
  index: number;
  label: string;
  shortLabel: string;
  title: string;
  worldX: number;
  scroll: [number, number];
  panelSide: "left" | "right" | "center";
}

export const CHAPTERS: Chapter[] = [
  {
    id: "desk",
    index: 0,
    label: "The Desk",
    shortLabel: "Desk",
    title: "Spawn point",
    worldX: 60,
    scroll: [0, 0.24],
    panelSide: "left",
  },
  {
    id: "homelab",
    index: 1,
    label: "The Homelab",
    shortLabel: "Lab",
    title: "Infrastructure",
    worldX: 1080,
    scroll: [0.3, 0.54],
    panelSide: "right",
  },
  {
    id: "workshop",
    index: 2,
    label: "The Workshop",
    shortLabel: "Workshop",
    title: "Projects & prints",
    worldX: 2120,
    scroll: [0.6, 0.84],
    panelSide: "left",
  },
  {
    id: "roof",
    index: 3,
    label: "The Roof",
    shortLabel: "Roof",
    title: "Open channel",
    worldX: 3120,
    scroll: [0.9, 1],
    panelSide: "right",
  },
];

export const profile = {
  name: "Muhammad Bintang Panji Kusuma",
  firstName: "Bintang",
  handle: "SamVivan1",
  role: "Computer Engineering student",
  focus: "DevOps · Homelab · Web",
  tagline:
    "I build homelabs, automate the boring parts, and ship interfaces that feel alive.",
  location: "Banda Aceh, Aceh, Indonesia",
  availability: "Open to internship & entry-level roles",
  email: "bintang10panji@gmail.com",
  cv: "/Sertifikat/Muhammad_Bintang_Panji_Kusuma_CV.pdf",
  avatar: "/assets/profile.png",
  github: "https://github.com/SamVivan1",
  linkedin:
    "https://www.linkedin.com/in/muhammad-bintang-panji-kusuma-a558b821b/",
  instagram: "https://instagram.com/bintang.panjii",
  university: "Universitas Syiah Kuala",
  universityUrl: "https://usk.ac.id",
  degree: "Bachelor of Computer Engineering",
  graduation: "Expected 2027",
  gpa: "3.42 / 4.00",
  summary:
    "I'm a Computer Engineering student at Universitas Syiah Kuala focused on DevOps, homelab infrastructure, and web development. I like systems that keep running after the demo: Docker stacks, self-hosted services, network configs, and interfaces with a bit of character. I also run ProtoPrime3D, a small 3D printing service in Banda Aceh, where digital designs become physical parts.",
};

export const languages = [
  { name: "Bahasa Indonesia", level: "Native" },
  { name: "English", level: "Advanced" },
  { name: "Japanese", level: "Beginner" },
];

export interface ExperienceItem {
  date: string;
  title: string;
  org: string;
  description: string;
  credential?: string;
  credentialLabel?: string;
}

export const experience: ExperienceItem[] = [
  {
    date: "Aug 2025",
    title: "Junior Network Administrator",
    org: "VSGA - DTS",
    description:
      "BNSP-certified program based on SKKNI standards for configuring and managing computer networks.",
    credential:
      "/Sertifikat/Sertifikat_MUHAMMAD BINTANG PANJI KUSUMA_Junior Network Administrator.pdf",
    credentialLabel: "Certificate PDF",
  },
  {
    date: "Jul 2025",
    title: "APIE Advanced Camp",
    org: "SOI Asia",
    description:
      "International collaboration to design, deploy, and operate prototype web services for scalability and security.",
    credential:
      "https://inxignia.soi.asia/public/assertions/9lk3kQQJSQmIch1IPTnhGw",
    credentialLabel: "Verify credential",
  },
  {
    date: "Jun 2025",
    title: "Service Design",
    org: "SOI Asia",
    description:
      "Exploration of service design methodologies to support business domains and entrepreneurial challenges.",
    credential:
      "https://inxignia.soi.asia/public/assertions/7x3K4JAIQNCbidRPAmdhnw",
    credentialLabel: "Verify credential",
  },
  {
    date: "Dec 2024",
    title: "APIE Camp",
    org: "SOI Asia",
    description:
      "Five-day intensive program focused on network design, deployment, and hands-on hardware configuration.",
    credential:
      "https://inxignia.soi.asia/public/assertions/LvCIwk06SAaa8MwvHB1TdA",
    credentialLabel: "Verify credential",
  },
  {
    date: "May 2024",
    title: "Understanding the Internet",
    org: "SOI Asia",
    description:
      "Comprehensive introduction to the Internet, covering its evolution, technical foundations, and global coordination.",
    credential:
      "https://inxignia.soi.asia/public/assertions/m26AYBDLRQetb77bI3XDtw",
    credentialLabel: "Verify credential",
  },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  href: string;
}

export const certifications: Certification[] = experience
  .filter((item) => item.credential)
  .map((item) => ({
    name: item.title,
    issuer: item.org,
    date: item.date,
    href: item.credential as string,
  }));

export const homelab = {
  summary:
    "One allocated desktop PC runs Ubuntu 26.04 LTS and a 66-container Docker stack. Media, photos, files, documents, home automation, and network services all live here — it is where I test ideas before they touch anything production-shaped.",
  services: [
    {
      name: "Ubuntu 26.04 LTS",
      detail: "Ryzen 5 4600G · 14 GB RAM · ~3.7 TB storage",
    },
    { name: "Docker", detail: "66 running containers" },
    {
      name: "Media",
      detail: "Jellyfin · *arr · qBittorrent · Navidrome · Seerr",
    },
    { name: "Photos & files", detail: "Immich · Nextcloud" },
    { name: "Documents", detail: "Paperless-ngx" },
    {
      name: "Automation",
      detail: "n8n · Home Assistant · ESPHome · Mosquitto",
    },
    {
      name: "Network & security",
      detail: "Pi-hole · Samba · Cloudflared · Tailscale · Vaultwarden",
    },
    {
      name: "Ops",
      detail: "Portainer · Watchtower · Dashdot · Cowrie honeypot",
    },
  ],
  notes: [
    "Lyra: a modular music acquisition service that runs in the homelab.",
    "homelab-composes: a public collection of Docker Compose configurations.",
    "n8n-Workflows-Backup: automated backups of n8n workflows to GitHub.",
  ],
};

export const skillGroups = [
  {
    label: "Systems & DevOps",
    items: [
      "Ubuntu 26.10 / 26.04 LTS",
      "Docker (66 containers)",
      "Self-hosting",
      "Jellyfin / *arr",
      "Immich / Nextcloud",
      "Home Assistant / n8n",
    ],
  },
  {
    label: "Networking",
    items: [
      "Network configuration",
      "BNSP Junior Network Administrator",
      "SOI Asia APIE Camp",
      "Pi-hole / Samba",
    ],
  },
  {
    label: "Web",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Python",
    ],
  },
  {
    label: "Hardware & Making",
    items: [
      "ESP32 / Arduino",
      "FDM 3D printing",
      "Bambu Lab A1 mini",
      "GTK4 / Libadwaita",
    ],
  },
];

export interface Project {
  name: string;
  description: string;
  language: string;
  topics: string[];
  stars: number;
  url: string;
  updated: string;
  source?: "live" | "curated";
}

export const fallbackProjects: Project[] = [
  {
    name: "Lyra",
    description:
      "A modular Python service for automating music acquisition in a homelab, using Lidarr, ListenBrainz, and yt-dlp.",
    language: "Python",
    topics: ["automation", "homelab", "music"],
    stars: 0,
    url: "https://github.com/SamVivan1/Lyra",
    updated: "2026-11-05",
    source: "curated",
  },
  {
    name: "octopad",
    description:
      "An open-source 8-key DIY macropad: ESP32-C3 firmware + native GTK4/Libadwaita Linux app, with Home Assistant integration.",
    language: "Python",
    topics: ["esp32", "home-assistant", "linux"],
    stars: 0,
    url: "https://github.com/SamVivan1/octopad",
    updated: "2026-11-02",
    source: "curated",
  },
  {
    name: "homelab-composes",
    description:
      "A collection of Docker Compose configurations for self-hosted services and development environments.",
    language: "Docker",
    topics: ["docker", "homelab", "self-hosted"],
    stars: 0,
    url: "https://github.com/SamVivan1/homelab-composes",
    updated: "2026-04-02",
    source: "curated",
  },
  {
    name: "n8n-Workflows-Backup",
    description: "Automated backup of n8n workflows to GitHub.",
    language: "Automation",
    topics: ["n8n", "automation", "backup"],
    stars: 2,
    url: "https://github.com/SamVivan1/n8n-Workflows-Backup",
    updated: "2026-11-07",
    source: "curated",
  },
  {
    name: "samvivan-gnome-widget",
    description:
      "Lightweight GNOME Shell desktop widgets with a glassmorphism design and per-widget settings.",
    language: "JavaScript",
    topics: ["gnome", "linux", "widgets"],
    stars: 0,
    url: "https://github.com/SamVivan1/samvivan-gnome-widget",
    updated: "2026-11-06",
    source: "curated",
  },
  {
    name: "Portfolio-v1.0",
    description:
      "This portfolio: Next.js, TypeScript, GSAP, and a pixel-art homelab you can scroll through.",
    language: "TypeScript",
    topics: ["nextjs", "portfolio", "pixel-art"],
    stars: 0,
    url: "https://github.com/SamVivan1/Portfolio-v1.0",
    updated: "2026-11-06",
    source: "curated",
  },
];

export const business = {
  name: "ProtoPrime 3D",
  shortName: "ProtoPrime3D",
  url: "https://protoprime3d.my.id",
  location: "Gla Deyah, Krueng Barona Jaya, Aceh Besar",
  service: "FDM 3D printing in Banda Aceh",
  machine: "Bambu Lab A1 mini",
  buildVolume: "180 × 180 × 180 mm",
  layerHeight: "0.1 mm",
  materials: ["PLA+", "PETG", "TPU"],
  leadTime: "2–5 working days",
  process: [
    "Send STL + choose material",
    "Admin verifies the file",
    "Print, QC, and hand over",
  ],
  parts: [
    {
      name: "IoT enclosure",
      material: "PETG Matte",
      weight: "62 g",
      image: "/assets/protoprime/casing-iot.webp",
    },
    {
      name: "Boat model",
      material: "PETG",
      weight: "40 g",
      image: "/assets/protoprime/kapal.webp",
    },
  ],
  render: {
    name: "3DBenchy",
    material: "PLA+",
    image: "/assets/protoprime/benchy.webp",
    note: "FDM benchmark render",
  },
  whatsapp: "https://wa.me/6282131377001",
};

export const contactLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: "mail" as const,
  },
  {
    label: "GitHub",
    value: "github.com/SamVivan1",
    href: profile.github,
    icon: "github" as const,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/muhammad-bintang-panji-kusuma",
    href: profile.linkedin,
    icon: "linkedin" as const,
  },
  {
    label: "Instagram",
    value: "@bintang.panjii",
    href: profile.instagram,
    icon: "instagram" as const,
  },
  {
    label: "ProtoPrime3D",
    value: "protoprime3d.my.id",
    href: business.url,
    icon: "printer" as const,
  },
];

export const stats = {
  publicRepos: 34,
  followers: 16,
  stars: 9,
  verifiedCredentials: certifications.length,
  chapters: CHAPTERS.length,
};
