"use client";

import { useEffect, useState } from "react";
import {
  Project,
  fallbackProjects,
  stats as fallbackStats,
} from "../data/portfolio";

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

const mapRepo = (repo: GitHubRepo): Project => ({
  name: repo.name,
  description:
    repo.description ||
    fallbackProjects.find((project) => project.name === repo.name)
      ?.description ||
    "Public repository on GitHub.",
  language:
    repo.language || FALLBACK_LANGUAGES[repo.name] || "Code",
  topics: (repo.topics && repo.topics.length > 0
    ? repo.topics
    : FALLBACK_TOPICS[repo.name] || []
  ).slice(0, 4),
  stars: repo.stargazers_count,
  url: repo.html_url,
  updated: repo.updated_at,
  source: "live",
});

export interface LiveGitHubData {
  projects: Project[];
  stats: {
    publicRepos: number;
    followers: number;
    stars: number;
  };
  loading: boolean;
  error: string | null;
  live: boolean;
}

const curatedStats: LiveGitHubData["stats"] = {
  publicRepos: fallbackStats.publicRepos,
  followers: fallbackStats.followers,
  stars: fallbackStats.stars,
};

export function useLiveProjects(): LiveGitHubData {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [stats, setStats] =
    useState<LiveGitHubData["stats"]>(curatedStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 9000);

    const load = async () => {
      try {
        const headers: HeadersInit = {
          Accept: "application/vnd.github+json",
        };
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        if (token) headers.Authorization = `Bearer ${token}`;

        const [reposResponse, userResponse] = await Promise.all([
          fetch(
            "https://api.github.com/users/SamVivan1/repos?sort=updated&per_page=100",
            { signal: controller.signal, headers }
          ),
          fetch("https://api.github.com/users/SamVivan1", {
            signal: controller.signal,
            headers,
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
        const selected = [...curated, ...rest]
          .slice(0, 6)
          .map(mapRepo);

        setProjects(selected);
        setStats({
          publicRepos: user.public_repos,
          followers: user.followers,
          stars: clean.reduce(
            (total, repo) => total + repo.stargazers_count,
            0
          ),
        });
        setLive(true);
        setError(null);
      } catch (caught) {
        if (controller.signal.aborted) {
          setError("GitHub took too long to respond. Showing curated projects.");
        } else {
          setError(
            caught instanceof Error
              ? caught.message
              : "GitHub is unavailable. Showing curated projects."
          );
        }
        setProjects(fallbackProjects);
        setStats(curatedStats);
        setLive(false);
      } finally {
        window.clearTimeout(timeout);
        setLoading(false);
      }
    };

    load();

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  return { projects, stats, loading, error, live };
}
