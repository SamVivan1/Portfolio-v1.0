"use client";

import { useEffect, useState } from "react";
import {
  Project,
  fallbackProjects,
  stats as fallbackStats,
} from "../data/portfolio";

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

interface GitHubPayload {
  ok: boolean;
  projects: Project[];
  stats: LiveGitHubData["stats"];
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
        const response = await fetch("/api/github", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`GitHub route responded ${response.status}`);
        }

        const payload = (await response.json()) as GitHubPayload;
        setProjects(
          payload.projects && payload.projects.length > 0
            ? payload.projects
            : fallbackProjects
        );
        setStats(payload.stats ?? curatedStats);
        setLive(Boolean(payload.live));
        setError(
          payload.ok
            ? null
            : "GitHub is unavailable. Showing curated projects."
        );
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
