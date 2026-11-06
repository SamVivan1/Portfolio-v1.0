"use client";

import {
  FaExternalLinkAlt,
  FaStar,
  FaCodeBranch,
  FaSpinner,
  FaGithub,
} from "react-icons/fa";
import { useGitHub } from "../hooks/useGitHub";
import AnimatedContent from "./reactbits/AnimatedContent";

interface Repository {
  title: string;
  type: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  stack: string[];
  demo: string;
  code: string;
}

interface GitHubUser {
  profileUrl: string;
}

interface GitHubData {
  repositories: Repository[];
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
}

export default function Skills() {
  const { repositories, user, loading, error }: GitHubData = useGitHub();

  if (loading) {
    return (
      <section
        id="projects"
        className="min-h-screen py-20 px-6 md:px-16 text-center text-white relative z-10"
      >
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-accent">Skills</span> and Projects
        </h2>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Loading projects from GitHub...
        </p>

        <div className="flex justify-center items-center py-20">
          <FaSpinner className="animate-spin text-4xl text-accent" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="min-h-screen py-20 px-6 md:px-16 text-center text-white relative z-10"
    >
      <h2 className="text-4xl font-bold mb-4">
        <span className="text-accent">Github</span> Projects
      </h2>
      <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
        {error ? (
          <span className="text-yellow-400">
            ⚠️ GitHub API temporarily unavailable. Showing sample projects
            below.
          </span>
        ) : (
          "My latest projects from GitHub."
        )}
      </p>

      {/* Grid Container */}
      <AnimatedContent
        distance={100}
        direction="vertical"
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0.2}
        animateOpacity={true}
        scale={1}
        threshold={0.3}
        delay={0}
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center ">
          {repositories.map((project, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md backdrop-filter rounded-2xl border border-white/20 p-6 flex flex-col justify-between shadow-lg hover:shadow-accent-deep/20  transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(168,85,247,0.2)]"
            >
              <div>
                <h3 className="text-xl font-semibold text-accent-soft">
                  {project.title}
                </h3>
                <span className="inline-block bg-accent-deep/40 text-sm px-3 py-1 rounded-full mt-2 mb-4">
                  {project.type}
                </span>
                <p className="text-gray-300 text-sm mb-4">
                  {project.description}
                </p>

                {/* GitHub Stats */}
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                  {project.stars > 0 && (
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span>{project.stars}</span>
                    </div>
                  )}
                  {project.forks > 0 && (
                    <div className="flex items-center gap-1">
                      <FaCodeBranch />
                      <span>{project.forks}</span>
                    </div>
                  )}
                  {project.language && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-accent-soft rounded-full"></div>
                      <span>{project.language}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  {project.stack.map((tech, t) => (
                    <span
                      key={t}
                      className="text-xs bg-white/10 border border-white/10 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-3 mt-4">
                <a
                  href={project.demo !== "#" ? project.demo : "#"}
                  target={project.demo !== "#" ? "_blank" : "_self"}
                  rel="noreferrer"
                  className={`flex items-center gap-2 justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    project.demo !== "#"
                      ? "bg-gradient-to-r from-accent to-indigo-500 hover:scale-105 cursor-pointer min-h-[44px]"
                      : "bg-gray-600/50 text-gray-400 cursor-not-allowed opacity-50 min-h-[44px]"
                  }`}
                  onClick={
                    project.demo === "#" ? (e) => e.preventDefault() : undefined
                  }
                  title={
                    project.demo === "#" ? "Demo not available" : "View Demo"
                  }
                >
                  <FaExternalLinkAlt /> Demo
                </a>
                <a
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 justify-center border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-all min-h-[44px]"
                >
                  <FaGithub /> Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </AnimatedContent>

      <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href={user?.profileUrl || "https://github.com/samvivan"}
          target="_blank"
          rel="noreferrer"
          className="bg-gradient-to-r from-accent-deep to-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
        >
          Explore All Repositories ⚡
        </a>
        {error && (
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all"
          >
            Retry GitHub API 🔄
          </button>
        )}
      </div>
    </section>
  );
}
