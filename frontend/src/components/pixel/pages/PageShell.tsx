import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { profile } from "../../../data/portfolio";
import ScenePoster from "../ScenePoster";

interface PageShellProps {
  children: React.ReactNode;
  posterWorldX?: number;
  posterAlt?: string;
}

export default function PageShell({
  children,
  posterWorldX,
  posterAlt,
}: PageShellProps) {
  return (
    <div className="page-shell">
      <header className="page-shell__bar">
        <Link href="/" className="page-shell__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-pixel.svg"
            alt=""
            width={32}
            height={32}
            className="page-shell__logo"
          />
          <span className="page-shell__wordmark">
            BSP<span className="page-shell__wordmark-dim">://</span>HOMELAB
          </span>
        </Link>
        <nav className="page-shell__nav" aria-label="Site">
          <Link href="/" className="page-shell__link">
            <ArrowLeft size={14} aria-hidden="true" />
            World
          </Link>
          <Link href="/homelab" className="page-shell__link">
            Homelab
          </Link>
          <Link href="/resume" className="page-shell__link">
            Resume
          </Link>
          <a
            href={profile.cv}
            download
            className="page-shell__link"
            aria-label="Download CV"
          >
            <Download size={14} aria-hidden="true" />
            CV
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="page-shell__link"
          >
            <FaGithub size={14} aria-hidden="true" />
            GitHub
          </a>
        </nav>
      </header>

      {posterWorldX !== undefined ? (
        <div className="page-shell__poster">
          <ScenePoster
            worldX={posterWorldX}
            alt={posterAlt ?? "Pixel-art scene from the portfolio world."}
            className="page-poster"
          />
        </div>
      ) : null}

      <main className="page-shell__main">{children}</main>

      <footer className="page-shell__footer">
        <span>
          {profile.name} · {profile.location}
        </span>
        <a href={`mailto:${profile.email}`} className="pixel-link">
          {profile.email}
        </a>
      </footer>
    </div>
  );
}
