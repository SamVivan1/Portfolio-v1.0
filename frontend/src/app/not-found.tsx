import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Signal lost",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="error-page">
      <section className="error-page__panel" aria-labelledby="not-found-title">
        <div className="error-page__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-pixel.svg"
            alt=""
            width={32}
            height={32}
            className="error-page__logo"
            aria-hidden="true"
          />
          <span>BSP://HOMELAB</span>
        </div>

        <p className="error-page__eyebrow">SIGNAL LOST · 404</p>
        <h1 id="not-found-title" className="error-page__title">
          This room is not on the map.
        </h1>
        <p className="error-page__copy">
          The camera walked past a door that does not exist. The desk, the
          homelab, and the resume are all still where you left them.
        </p>

        <div className="error-page__actions">
          <Link href="/" className="pixel-button pixel-button--primary">
            <ArrowLeft size={15} aria-hidden="true" />
            Back to the desk
          </Link>
          <Link href="/resume" className="pixel-button pixel-button--ghost">
            <FileText size={15} aria-hidden="true" />
            Open resume
          </Link>
        </div>

        <p className="error-page__meta">
          Try /homelab, /resume, or /projects/lyra.
        </p>
      </section>
    </main>
  );
}
