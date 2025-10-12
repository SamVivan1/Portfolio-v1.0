// GitHub API service untuk mengambil data repository
import { GITHUB_CONFIG } from "../config/github";

const GITHUB_API_URL = "https://api.github.com";

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

// Headers untuk authenticated requests
const getAuthHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Portfolio-App",
  };

  if (GITHUB_CONFIG.TOKEN) {
    headers["Authorization"] = `token ${GITHUB_CONFIG.TOKEN}`;
  }

  return headers;
};

// Fungsi untuk mengambil repositories dari GitHub
export const fetchGitHubRepositories = async (): Promise<Repository[]> => {
  try {
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(
      `${GITHUB_API_URL}/users/${GITHUB_CONFIG.USERNAME}/repos?sort=updated&per_page=${GITHUB_CONFIG.REPOS_PER_PAGE}`,
      {
        signal: controller.signal,
        headers: getAuthHeaders(),
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "GitHub API rate limit exceeded. Please try again later."
        );
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    // Filter dan format data repository
    const formattedRepos = repos
      .filter(
        (repo: any) =>
          !repo.fork &&
          !repo.archived &&
          !GITHUB_CONFIG.EXCLUDE_REPOS.includes(repo.name.toLowerCase())
      ) // Hanya repository asli yang tidak di-archive dan tidak di-exclude
      .sort((a: any, b: any) => {
        // Prioritaskan repository yang ada di PRIORITY_REPOS
        const aPriority = GITHUB_CONFIG.PRIORITY_REPOS.includes(
          a.name.toLowerCase()
        );
        const bPriority = GITHUB_CONFIG.PRIORITY_REPOS.includes(
          b.name.toLowerCase()
        );
        if (aPriority && !bPriority) return -1;
        if (!aPriority && bPriority) return 1;
        return 0;
      })
      .map(
        (repo: any): Repository => ({
          title: repo.name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          type: getProjectType(repo.language, repo.topics),
          description: repo.description || "No description available",
          stack: getTechStack(repo.language, repo.topics),
          demo: repo.homepage || "#",
          code: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updated: repo.updated_at,
          language: repo.language,
        })
      )
      .slice(0, GITHUB_CONFIG.REPOS_PER_PAGE); // Maksimal sesuai konfigurasi

    return formattedRepos;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    throw error;
  }
};

// Fungsi untuk menentukan tipe project berdasarkan bahasa dan topics
const getProjectType = (
  language: string | null,
  topics: string[] | null
): string => {
  if (!language) return "Project";

  const frontendLanguages = [
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Vue",
    "React",
  ];
  const backendLanguages = [
    "Python",
    "Java",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
  ];
  const mobileLanguages = ["Swift", "Kotlin", "Dart"];

  if (frontendLanguages.includes(language)) return "Frontend";
  if (backendLanguages.includes(language)) return "Backend";
  if (mobileLanguages.includes(language)) return "Mobile";
  if (language === "C++" || language === "C") return "System";

  return "Full Stack";
};

// Fungsi untuk menentukan tech stack berdasarkan bahasa dan topics
const getTechStack = (
  language: string | null,
  topics: string[] | null
): string[] => {
  const stack: string[] = [];

  if (language) {
    stack.push(language);
  }

  // Mapping topics ke tech stack yang lebih familiar
  if (topics) {
    topics.forEach((topic) => {
      const techMapping: { [key: string]: string } = {
        react: "React",
        vue: "Vue.js",
        angular: "Angular",
        nodejs: "Node.js",
        express: "Express.js",
        nextjs: "Next.js",
        nuxtjs: "Nuxt.js",
        tailwindcss: "Tailwind CSS",
        bootstrap: "Bootstrap",
        mongodb: "MongoDB",
        postgresql: "PostgreSQL",
        mysql: "MySQL",
        redis: "Redis",
        docker: "Docker",
        kubernetes: "Kubernetes",
        aws: "AWS",
        azure: "Azure",
        firebase: "Firebase",
        typescript: "TypeScript",
        javascript: "JavaScript",
        python: "Python",
        java: "Java",
        spring: "Spring Boot",
        django: "Django",
        flask: "Flask",
        fastapi: "FastAPI",
        graphql: "GraphQL",
        "rest-api": "REST API",
        websocket: "WebSocket",
        jwt: "JWT",
        oauth: "OAuth",
        jest: "Jest",
        cypress: "Cypress",
        webpack: "Webpack",
        vite: "Vite",
        eslint: "ESLint",
        prettier: "Prettier",
      };

      const mappedTech = techMapping[topic.toLowerCase()];
      if (mappedTech && !stack.includes(mappedTech)) {
        stack.push(mappedTech);
      }
    });
  }

  // Batasi maksimal 4 tech stack
  return stack.slice(0, 4);
};

// Fungsi untuk mengambil informasi user GitHub
export const fetchGitHubUser = async (): Promise<GitHubUser> => {
  try {
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(
      `${GITHUB_API_URL}/users/${GITHUB_CONFIG.USERNAME}`,
      {
        signal: controller.signal,
        headers: getAuthHeaders(),
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "GitHub API rate limit exceeded. Please try again later."
        );
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const user = await response.json();

    return {
      name: user.name,
      bio: user.bio,
      avatar: user.avatar_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      profileUrl: user.html_url,
    };
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    throw error;
  }
};
