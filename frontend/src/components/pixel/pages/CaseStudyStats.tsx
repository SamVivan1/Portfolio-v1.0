"use client";

import { ArrowUpRight } from "lucide-react";
import { useLiveProjects } from "../../../hooks/useLiveProjects";

interface CaseStudyStatsProps {
  repo: string;
}

export default function CaseStudyStats({ repo }: CaseStudyStatsProps) {
  const { projects, loading, live } = useLiveProjects();
  const project = projects.find((item) => item.name === repo);
  const updated = project?.updated ? new Date(project.updated) : null;
  const updatedLabel =
    updated && !Number.isNaN(updated.valueOf())
      ? new Intl.DateTimeFormat("en-GB", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(updated)
      : "—";
  const status = loading
    ? "Syncing GitHub…"
    : live
      ? "Live from GitHub"
      : "Curated snapshot";

  return (
    <section className="case-study__stats-wrap" aria-label="Repository facts">
      <dl className="case-study__stats">
        <div className="case-study__stat">
          <dt>Language</dt>
          <dd>{project?.language ?? "—"}</dd>
        </div>
        <div className="case-study__stat">
          <dt>Stars</dt>
          <dd>{project ? project.stars : "—"}</dd>
        </div>
        <div className="case-study__stat">
          <dt>Last update</dt>
          <dd>{updatedLabel}</dd>
        </div>
        <div className="case-study__stat">
          <dt>Repository</dt>
          <dd>
            <a
              className="case-study__stat-link"
              href={project?.url ?? `https://github.com/SamVivan1/${repo}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </dd>
        </div>
      </dl>
      <p className="case-study__stats-status">
        <span
          className={`live-dot${live ? "" : " live-dot--amber"}`}
          aria-hidden="true"
        />
        {status}
      </p>
    </section>
  );
}
