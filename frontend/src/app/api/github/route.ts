import { NextResponse } from "next/server";
import {
  Project,
  fallbackProjects,
  stats as fallbackStats,
} from "../../../data/portfolio";

export const dynamic = "force-dynamic";

interface GitHubRepo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  updated_at: string;
  topics: string[] | null;
  fork: boolean;
  archived: boolean;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface GitHubPayload {
  ok: boolean;
  projects: Project[];
  stats: {
    publicRepos: number;
    followers: number;
    stars: number;
  };
  live: boolean;
}

const CURATED_ORDER = [
  "Lyra",
  "octopad",
  "homelab-composes",
  "n8n-Workflows-Backup",
  "samvivan-gnome-widget",
  "Portfolio-v1.0",
];

const FALLBACK_TOPICS: Record<string, string[]> = {
  Lyra: ["automation", "homelab", "music"],
  octopad: ["esp32", "home-assistant", "linux"],
  "homelab-composes": ["docker", "homelab", "self-hosted"],
  "n8n-Workflows-Backup": ["n8n", "automation", "backup"],
  "samvivan-gnome-widget": ["gnome", "linux", "widgets"],
  "Portfolio-v1.0": ["nextjs", "portfolio", "pixel-art"],
};

const FALLBACK_LANGUAGES: Record<string, string> = {
  "homelab-composes": "Docker",
  "n8n-Workflows-Backup": "Automation",
};

const curatedStats: GitHubPayload["stats"] = {
  publicRepos: fallbackStats.publicRepos,
  followers: fallbackStats.followers,
  stars: fallbackStats.stars,
};

const mapRepo = (repo: GitHubRepo): Project => ({
  name: repo.name,
  description:
    repo.description ||
    fallbackProjects.find((project) => project.name === repo.name)
      ?.description ||
    "Public repository on GitHub.",
  language: repo.language || FALLBACK_LANGUAGES[repo.name] || "Code",
  topics: (repo.topics && repo.topics.length > 0
    ? repo.topics
    : FALLBACK_TOPICS[repo.name] || []
  ).slice(0, 4),
  stars: repo.stargazers_count,
  url: repo.html_url,
  updated: repo.updated_at,
  source: "live",
});

const TTL = 10 * 60 * 1000;
let cache: { at: number; payload: GitHubPayload } | null = null;

const responseFor = (payload: GitHubPayload) =>
  NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60",
    },
  });

export async function GET() {
  if (cache && Date.now() - cache.at < TTL) {
    return responseFor(cache.payload);
  }

  try {
    const token =
      process.env.GITHUB_TOKEN ?? process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const signal = AbortSignal.timeout(8000);
    const [reposResponse, userResponse] = await Promise.all([
      fetch(
        "https://api.github.com/users/SamVivan1/repos?sort=updated&per_page=100",
        { headers, signal, cache: "no-store" }
      ),
      fetch("https://api.github.com/users/SamVivan1", {
        headers,
        signal,
        cache: "no-store",
      }),
    ]);

    if (!reposResponse.ok || !userResponse.ok) {
      throw new Error(`GitHub responded ${reposResponse.status}`);
    }

    const repos = (await reposResponse.json()) as GitHubRepo[];
    const user = (await userResponse.json()) as GitHubUser;
    const clean = repos.filter((repo) => !repo.fork && !repo.archived);
    const curated = CURATED_ORDER.map((name) =>
      clean.find((repo) => repo.name === name)
    ).filter((repo): repo is GitHubRepo => Boolean(repo));
    const rest = clean.filter((repo) => !CURATED_ORDER.includes(repo.name));
    const projects = [...curated, ...rest].slice(0, 6).map(mapRepo);

    const payload: GitHubPayload = {
      ok: true,
      projects,
      stats: {
        publicRepos: user.public_repos,
        followers: user.followers,
        stars: clean.reduce(
          (total, repo) => total + repo.stargazers_count,
          0
        ),
      },
      live: true,
    };
    cache = { at: Date.now(), payload };
    return responseFor(payload);
  } catch {
    const payload: GitHubPayload = {
      ok: false,
      projects: fallbackProjects,
      stats: curatedStats,
      live: false,
    };
    cache = { at: Date.now(), payload };
    return responseFor(payload);
  }
}
