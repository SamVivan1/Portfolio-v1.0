export type NoteBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "code"; label?: string; text: string }
  | { type: "callout"; text: string };

export interface NoteLink {
  label: string;
  href: string;
}

export interface Note {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  blocks: NoteBlock[];
  links?: NoteLink[];
}

export const notes: Note[] = [
  {
    slug: "deploy-pipeline-that-can-undo-itself",
    title: "A deploy pipeline that can undo itself",
    summary:
      "The portfolio ships through a gate: verify the build, deploy the exact commit, check the real routes, and restore the previous image if anything fails.",
    date: "2026-11-09",
    readingMinutes: 4,
    tags: ["CI/CD", "Docker", "GitHub Actions", "Reliability"],
    blocks: [
      {
        type: "paragraph",
        text: "Most small portfolio deploys are a git pull and a restart. That works until the new container is running but the routes are broken, or the build passed with the wrong environment. The portfolio now treats a deploy as a small system with a gate, a verification step, and a way back.",
      },
      {
        type: "heading",
        text: "The gate runs before the server is touched",
      },
      {
        type: "paragraph",
        text: "The workflow starts with a verify job: install from the lockfile, run ESLint, type-check the whole project, and produce a production build with the canonical site URL. Only a successful verify job is allowed to start the deploy job. A broken build never reaches the homelab.",
      },
      {
        type: "code",
        label: "Pipeline shape",
        text: "verify   -> npm ci · lint · tsc · next build\ndeploy   -> exact SHA · health · smoke\nfailure  -> restore portfolio:previous",
      },
      {
        type: "heading",
        text: "Deploy the exact commit",
      },
      {
        type: "paragraph",
        text: "The server does not run git pull. It fetches main and resets to the SHA that triggered the workflow. Before building, the image that is currently live is tagged as portfolio:previous. That tag is the rollback target.",
      },
      {
        type: "heading",
        text: "Check the thing that actually matters",
      },
      {
        type: "paragraph",
        text: "A container can be running and still be useless. The deploy waits for the Docker health check, then runs a smoke script against localhost:3003. The script checks the main routes, the sitemap origin, the home canonical link, and all five audio layers. These are the surfaces a visitor actually touches.",
      },
      {
        type: "list",
        items: [
          "Routes: /, /homelab, /resume, /projects/lyra, /projects/portfolio",
          "SEO: sitemap URLs and the canonical origin",
          "Audio: a range request for the base and four textures",
          "Container: Docker health status must be healthy before the smoke test",
        ],
      },
      {
        type: "heading",
        text: "Rollback is part of the deploy",
      },
      {
        type: "paragraph",
        text: "If health or smoke fails, the workflow restores portfolio:previous, starts it without rebuilding, and runs the same checks again. A failed deploy should leave the previous version running, not a half-started container and a red log.",
      },
      {
        type: "callout",
        text: "While building this pipeline, a zsh read-only variable (status) stopped the script after the new container had started. The fix was one rename, but the lesson was better: the rollback path needs to be exercised, not just written. The repository now has a manual drill input that forces the smoke test to fail and proves the restore works.",
      },
      {
        type: "heading",
        text: "What comes next",
      },
      {
        type: "paragraph",
        text: "Level 1 builds on the server and keeps the previous local image. Level 2 is to build once in CI, push an immutable image to GHCR, and have the server pull that digest. Rollback then becomes a digest swap, and the production host stops being a build machine.",
      },
    ],
    links: [
      {
        label: "This portfolio case study",
        href: "/projects/portfolio",
      },
      {
        label: "Repository",
        href: "https://github.com/SamVivan1/Portfolio-v1.0",
      },
    ],
  },
  {
    slug: "backing-up-n8n-workflows-to-git",
    title: "Backing up n8n workflows to Git",
    summary:
      "n8n workflows are code. A scheduled workflow copies each active workflow to its own JSON file in GitHub, with a timestamped commit for history.",
    date: "2026-11-08",
    readingMinutes: 3,
    tags: ["n8n", "Automation", "Git", "Backup"],
    blocks: [
      {
        type: "paragraph",
        text: "n8n is good at running automations and bad at being a version control system. Workflows live inside the n8n database. A bad edit or a lost instance can take the automation with it, and there is no diff to explain what changed.",
      },
      {
        type: "paragraph",
        text: "The backup workflow keeps the shape small: retrieve the active workflows, compare them with the files already in GitHub, update the ones that exist, upload the new ones, and commit the result.",
      },
      {
        type: "heading",
        text: "The flow",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Run on a schedule and build a timestamp for the commit message.",
          "Retrieve every active workflow from the n8n API.",
          "List the JSON files already present in the target GitHub repository.",
          "Use an IF node to decide whether each workflow already exists.",
          "Update the existing file, or upload a new one.",
          "Commit with a readable timestamp.",
        ],
      },
      {
        type: "code",
        label: "Commit message",
        text: "backup-09-11-2026/14:30",
      },
      {
        type: "heading",
        text: "One file per workflow",
      },
      {
        type: "paragraph",
        text: "A single archive would be smaller, but it would be worse to review. One JSON file per workflow makes each commit readable, keeps a broken workflow isolated, and gives you a direct restore target. The repository becomes a history of the automation, not just a copy of it.",
      },
      {
        type: "heading",
        text: "What can go wrong",
      },
      {
        type: "list",
        items: [
          "The n8n API key can expire or lose access.",
          "The GitHub OAuth token needs the right repository scope.",
          "An empty response should not be treated as a reason to delete files.",
          "A large workflow list can turn a simple backup into a slow loop.",
        ],
      },
      {
        type: "paragraph",
        text: "The current workflow only updates or uploads. It does not reconcile deletions, and it does not run a restore test. Those are the next improvements: a deletion policy that is explicit, and a scheduled restore into a disposable n8n instance.",
      },
      {
        type: "heading",
        text: "Why Git",
      },
      {
        type: "paragraph",
        text: "Git gives the backup three things for free: a diff, a timestamped history, and a restore path that does not depend on the n8n UI. The workflow is small enough to keep in the homelab, and the result is useful even if n8n itself is unavailable.",
      },
    ],
    links: [
      {
        label: "n8n backup case study",
        href: "/projects/n8n-workflows-backup",
      },
      {
        label: "Repository",
        href: "https://github.com/SamVivan1/n8n-Workflows-Backup",
      },
    ],
  },
  {
    slug: "one-host-many-containers",
    title: "One host, many containers",
    summary:
      "The homelab is one allocated desktop PC running Ubuntu and Docker. The useful part is not the 66-container count; it is how the services are grouped and kept replaceable.",
    date: "2026-11-07",
    readingMinutes: 4,
    tags: ["Homelab", "Docker", "Ubuntu", "Operations"],
    blocks: [
      {
        type: "paragraph",
        text: "The homelab is one allocated desktop PC: a Ryzen 5 4600G, 14 GB of RAM, and about 3.7 TB of usable storage running Ubuntu 26.04 LTS. At the time of the snapshot, Docker reports 66 running containers. That number is a snapshot, not an uptime claim.",
      },
      {
        type: "heading",
        text: "The constraint is the design",
      },
      {
        type: "paragraph",
        text: "One host means one place to look, one kernel to patch, and one failure domain. It also means every new service competes for the same RAM. That constraint is useful: it forces a decision about whether a service belongs here, whether it needs its own volume, and whether it can be rebuilt from a compose file.",
      },
      {
        type: "heading",
        text: "Group before service",
      },
      {
        type: "paragraph",
        text: "The public homelab page groups the stack by what it does, not by which container happens to be running:",
      },
      {
        type: "list",
        items: [
          "Media: Jellyfin, the *arr tools, qBittorrent, Navidrome, Seerr",
          "Photos and files: Immich, Nextcloud",
          "Documents: Paperless-ngx",
          "Automation: n8n, Home Assistant, ESPHome, Mosquitto",
          "Network and security: Pi-hole, Samba, reverse proxy, remote access",
          "Ops: Portainer, Watchtower, Dashdot, monitoring",
        ],
      },
      {
        type: "paragraph",
        text: "Grouping makes the system legible. It also keeps the public page honest: a list of container names is not an architecture, and a count is not a reliability metric.",
      },
      {
        type: "heading",
        text: "Compose is the unit of rebuild",
      },
      {
        type: "paragraph",
        text: "Each service should be explainable as a compose file, an environment file, and the data it owns. That is the direction of the public homelab-composes repository, although it is still a scaffold rather than a complete library. The long-term value is not the YAML itself; it is being able to rebuild a service without remembering the original command.",
      },
      {
        type: "heading",
        text: "The tradeoffs",
      },
      {
        type: "list",
        items: [
          "One host is simple, but it is a single point of failure.",
          "RAM is the real limit, not the container count.",
          "Stateful services need explicit volumes and a restore plan.",
          "A container being up says nothing about the service being useful.",
        ],
      },
      {
        type: "heading",
        text: "What I want to improve",
      },
      {
        type: "paragraph",
        text: "The next version of this setup should have restore tests, not just backups; alerts that reach me before a service is missed; and a clear split between stateless containers and the data they depend on. A second node would make the setup more resilient, but it would also add a new distributed-systems problem. One host is the right constraint for now.",
      },
    ],
    links: [
      {
        label: "Homelab architecture",
        href: "/homelab",
      },
      {
        label: "homelab-composes",
        href: "https://github.com/SamVivan1/homelab-composes",
      },
    ],
  },
];

export const noteBySlug = new Map(notes.map((note) => [note.slug, note]));
