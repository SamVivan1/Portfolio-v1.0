"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  MessageCircle,
  Printer,
  Star,
} from "lucide-react";
import { business, profile } from "../../../data/portfolio";
import { usePortfolioData } from "../PortfolioData";
import PixelButton from "../ui/PixelButton";
import PixelChip from "../ui/PixelChip";
import Tabs from "../ui/Tabs";

interface WorkshopContentProps {
  idPrefix: string;
  compact?: boolean;
}

export default function WorkshopContent({
  idPrefix,
  compact = false,
}: WorkshopContentProps) {
  const { projects, stats, loading, error, live } = usePortfolioData();

  const codeTab = (
    <div className="workshop-code">
      <div className="live-row">
        <span
          className={live ? "live-dot" : "live-dot live-dot--amber"}
          aria-hidden="true"
        />
        <span>{live ? "Live from GitHub" : "Curated snapshot"}</span>
        {loading ? <span className="live-row__muted">syncing…</span> : null}
        <a
          className="pixel-link live-row__link"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          @SamVivan1
          <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>

      {error ? (
        <p className="data-note">
          GitHub did not answer, so the curated project list is shown. All
          links still go to the real repositories.
        </p>
      ) : null}

      <dl className="stat-row">
        <div>
          <dt>Public repos</dt>
          <dd>{stats.publicRepos}</dd>
        </div>
        <div>
          <dt>Followers</dt>
          <dd>{stats.followers}</dd>
        </div>
        <div>
          <dt>Stars</dt>
          <dd>{stats.stars}</dd>
        </div>
      </dl>

      <ul className="project-list" aria-label="Selected GitHub projects">
        {projects.map((project) => (
          <li key={project.name}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-row"
              aria-label={`Open ${project.name} on GitHub`}
            >
              <span className="project-row__main">
                <span className="project-row__top">
                  <span className="project-row__name">{project.name}</span>
                  {project.stars > 0 ? (
                    <span className="project-row__stars">
                      <Star size={11} aria-hidden="true" />
                      {project.stars}
                    </span>
                  ) : null}
                </span>
                <span className="project-row__desc">
                  {project.description}
                </span>
                <span className="project-row__meta">
                  <PixelChip tone="muted">{project.language}</PixelChip>
                  {project.topics.slice(0, 3).map((topic) => (
                    <span key={topic} className="project-topic">
                      #{topic}
                    </span>
                  ))}
                </span>
              </span>
              <ArrowUpRight
                className="project-row__arrow"
                size={16}
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="chapter-actions">
        <PixelButton
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          icon={<GitBranch size={15} aria-hidden="true" />}
        >
          All repositories
        </PixelButton>
      </div>
    </div>
  );

  const printsTab = (
    <div className="workshop-prints">
      <div className="prints-intro">
        <div className="prints-intro__head">
          <h3>ProtoPrime 3D</h3>
          <PixelChip tone="teal">Side business</PixelChip>
        </div>
        <p>
          A working FDM 3D printing service in Banda Aceh. Send an STL, choose a
          material, and get a real part back — from an IoT enclosure to a boat
          model.
        </p>
        <a
          className="pixel-link"
          href={business.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {business.url.replace("https://", "")}
          <ExternalLink size={12} aria-hidden="true" />
        </a>
      </div>

      <dl className="spec-grid">
        <div>
          <dt>Machine</dt>
          <dd>{business.machine}</dd>
        </div>
        <div>
          <dt>Build volume</dt>
          <dd>{business.buildVolume}</dd>
        </div>
        <div>
          <dt>Layer height</dt>
          <dd>{business.layerHeight}</dd>
        </div>
        <div>
          <dt>Materials</dt>
          <dd>{business.materials.join(" · ")}</dd>
        </div>
        <div>
          <dt>Lead time</dt>
          <dd>{business.leadTime}</dd>
        </div>
        <div>
          <dt>Pickup</dt>
          <dd>{business.location}</dd>
        </div>
      </dl>

      <div className="print-gallery">
        {business.parts.map((part) => (
          <figure key={part.name} className="print-card">
            <div className="pixel-photo-frame">
              <Image
                src={part.image}
                alt={`${part.name} printed in ${part.material} by ProtoPrime 3D`}
                width={600}
                height={400}
                sizes="(max-width: 767px) 40vw, 180px"
              />
            </div>
            <figcaption>
              <strong>{part.name}</strong>
              <span>
                {part.material} · {part.weight}
              </span>
            </figcaption>
          </figure>
        ))}
        <figure className="print-card">
          <div className="pixel-photo-frame">
            <Image
              src={business.render.image}
              alt="3DBenchy FDM benchmark render"
              width={600}
              height={400}
              sizes="(max-width: 767px) 40vw, 180px"
            />
          </div>
          <figcaption>
            <strong>{business.render.name}</strong>
            <span>{business.render.note}</span>
          </figcaption>
        </figure>
      </div>

      {!compact ? (
        <div className="process-block">
          <h4>How it works</h4>
          <ol className="process-list">
            {business.process.map((step, index) => (
              <li key={step}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="chapter-actions">
        <PixelButton
          href={business.url}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          icon={<Printer size={15} aria-hidden="true" />}
        >
          Visit ProtoPrime3D
        </PixelButton>
        <PixelButton
          href={business.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          icon={<MessageCircle size={15} aria-hidden="true" />}
        >
          WhatsApp
        </PixelButton>
      </div>
    </div>
  );

  return (
    <div className="chapter-content">
      <h2 className="chapter-title">Code that runs. Parts that exist.</h2>
      <p className="chapter-lede">
        Live repositories and a workshop where digital designs become physical
        objects.
      </p>

      <Tabs
        label="Workshop sections"
        idPrefix={idPrefix}
        tabs={[
          { id: "code", label: "Code", content: codeTab },
          { id: "prints", label: "Prints", content: printsTab },
        ]}
      />
    </div>
  );
}
