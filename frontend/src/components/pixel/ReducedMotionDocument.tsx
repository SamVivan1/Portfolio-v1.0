"use client";

import { Download, ExternalLink, FileText } from "lucide-react";
import { CHAPTERS, profile } from "../../data/portfolio";
import DeskContent from "./chapters/DeskContent";
import RackContent from "./chapters/RackContent";
import RoofContent from "./chapters/RoofContent";
import WorkshopContent from "./chapters/WorkshopContent";
import ScenePoster from "./ScenePoster";
import PixelChip from "./ui/PixelChip";

function StaticChapter({
  id,
  title,
  meta,
  children,
}: {
  id: string;
  title: string;
  meta: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="doc-chapter">
      <div className="doc-chapter__bar">
        <span>{title}</span>
        <span>{meta}</span>
      </div>
      <div className="doc-chapter__body">{children}</div>
    </section>
  );
}

const sceneAlts = [
  "Pixel art of a cozy bedroom desk at night, with a CRT monitor, rain outside, a sleeping cat, and a warm lamp.",
  "Pixel art of a homelab server room with two glowing racks, a terminal desk, and a wall of framed certificates.",
  "Pixel art of a workshop with a pegboard, a 3D printer, filament spools, and printed parts on a shelf.",
  "Pixel art of a rooftop at night with a campfire, string lights, a city skyline, and a full moon.",
];

export default function ReducedMotionDocument() {
  return (
    <div className="reduced-document">
      <header className="doc-hero">
        <div className="doc-hero__top">
          <p className="doc-hero__eyebrow">MUHAMMAD BINTANG PANJI KUSUMA</p>
          <h1>
            I build <span className="text-teal">homelabs</span>, automate the
            boring parts, and ship interfaces that feel alive.
          </h1>
          <p className="doc-hero__lede">
            Computer Engineering student at Universitas Syiah Kuala. DevOps,
            homelab infrastructure, and web development. Based in Banda Aceh,
            Indonesia.
          </p>
          <div className="chapter-chips">
            <PixelChip tone="green">
              <span className="live-dot" /> {profile.availability}
            </PixelChip>
            <PixelChip tone="violet">UTC+7</PixelChip>
            <PixelChip tone="amber">Reduced motion view</PixelChip>
          </div>
          <div className="doc-hero__actions">
            <a
              className="pixel-button pixel-button--primary"
              href={profile.cv}
              download
            >
              <Download size={15} aria-hidden="true" />
              Download CV
            </a>
            <a
              className="pixel-button pixel-button--ghost"
              href={`mailto:${profile.email}`}
            >
              <FileText size={15} aria-hidden="true" />
              Email me
            </a>
            <a
              className="pixel-button pixel-button--quiet"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
        <nav className="doc-nav" aria-label="Chapters">
          {CHAPTERS.map((chapter) => (
            <a key={chapter.id} href={`#${chapter.id}`}>
              {chapter.shortLabel}
            </a>
          ))}
        </nav>
      </header>

      <div className="doc-scene">
        <ScenePoster worldX={CHAPTERS[0].worldX} alt={sceneAlts[0]} />
      </div>
      <StaticChapter id="desk" title="SPAWN POINT" meta="01 / 04">
        <DeskContent compact />
      </StaticChapter>

      <div className="doc-scene">
        <ScenePoster worldX={CHAPTERS[1].worldX} alt={sceneAlts[1]} />
      </div>
      <StaticChapter id="rack" title="THE RACK" meta="02 / 04">
        <RackContent />
      </StaticChapter>

      <div className="doc-scene">
        <ScenePoster worldX={CHAPTERS[2].worldX} alt={sceneAlts[2]} />
      </div>
      <StaticChapter id="workshop" title="THE WORKSHOP" meta="03 / 04">
        <WorkshopContent idPrefix="static" />
      </StaticChapter>

      <div className="doc-scene">
        <ScenePoster worldX={CHAPTERS[3].worldX} alt={sceneAlts[3]} />
      </div>
      <StaticChapter id="roof" title="THE ROOF" meta="04 / 04">
        <RoofContent />
      </StaticChapter>

      <footer className="doc-footer">
        <p>
          {profile.name} · {profile.location} ·{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <p>
          Built with Next.js, Canvas 2D, and a stubborn love for pixel art. All
          credentials link to their source.
        </p>
      </footer>
    </div>
  );
}
