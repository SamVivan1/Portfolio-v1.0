import { useState, useEffect } from "react";
import {
  fetchGitHubRepositories,
  fetchGitHubUser,
} from "../services/githubService";

interface Repository {
  title: string;
  type: string;
  description: string;
  stack: string[];
  demo: string;
  code: string;
  stars: number;
  forks: number;
  updated: string;
  language: string;
}

interface GitHubUser {
  name: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  publicRepos: number;
  profileUrl: string;
}

interface GitHubData {
  repositories: Repository[];
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
}

export const useGitHub = (): GitHubData => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load repositories and user data in parallel
        const [reposData, userData] = await Promise.all([
          fetchGitHubRepositories(),
          fetchGitHubUser(),
        ]);

        setRepositories(reposData);
        setUser(userData);
      } catch (err) {
        console.error("Error loading GitHub data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");

        // Fallback data jika GitHub API gagal
        setRepositories([
          {
            title: "Portfolio Website",
            type: "Frontend",
            description:
              "Personal portfolio website built with React and Tailwind CSS featuring modern UI/UX design",
            stack: ["React", "Tailwind CSS", "Vite", "JavaScript"],
            demo: "#",
            code: "https://github.com/SamVivan1",
            stars: 0,
            forks: 0,
            updated: new Date().toISOString(),
            language: "JavaScript",
          },
          {
            title: "Homelab Control Panel",
            type: "Full Stack",
            description:
              "Web-based control panel for managing homelab infrastructure and services",
            stack: ["Python", "Flask", "Docker", "Linux"],
            demo: "#",
            code: "https://github.com/SamVivan1",
            stars: 0,
            forks: 0,
            updated: new Date().toISOString(),
            language: "Python",
          },
          {
            title: "Media Library Manager",
            type: "Backend",
            description:
              "RESTful API for managing personal media library with metadata extraction",
            stack: ["Node.js", "Express", "MongoDB", "Docker"],
            demo: "#",
            code: "https://github.com/SamVivan1",
            stars: 0,
            forks: 0,
            updated: new Date().toISOString(),
            language: "JavaScript",
          },
          {
            title: "Monitoring API",
            type: "Backend",
            description:
              "System monitoring API with real-time metrics and alerting capabilities",
            stack: ["Go", "PostgreSQL", "Redis", "Docker"],
            demo: "#",
            code: "https://github.com/SamVivan1",
            stars: 0,
            forks: 0,
            updated: new Date().toISOString(),
            language: "Go",
          },
          {
            title: "Linux Automation Scripts",
            type: "System",
            description:
              "Collection of bash and Python scripts for Linux system automation",
            stack: ["Bash", "Python", "Linux", "Docker"],
            demo: "#",
            code: "https://github.com/SamVivan1",
            stars: 0,
            forks: 0,
            updated: new Date().toISOString(),
            language: "Shell",
          },
        ]);

        // Set fallback user data
        setUser({
          name: "Sam Vivan",
          bio: "Computer Engineering Student | Linux Enthusiast | Homelab Tinkerer",
          avatar: "https://avatars.githubusercontent.com/u/your-id",
          followers: 0,
          following: 0,
          publicRepos: 0,
          profileUrl: "https://github.com/SamVivan1",
        });
      } finally {
        setLoading(false);
      }
    };

    loadGitHubData();
  }, []);

  return {
    repositories,
    user,
    loading,
    error: error ? true : false,
  };
};
