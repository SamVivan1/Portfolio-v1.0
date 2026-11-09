import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageShell from "../../components/pixel/pages/PageShell";
import PixelChip from "../../components/pixel/ui/PixelChip";
import TrackView from "../../components/pixel/pages/TrackView";
import { CHAPTERS } from "../../data/portfolio";
import { notes } from "../../data/notes";

export const metadata: Metadata = {
  title: "Notes — systems, deploys, and the homelab",
  description:
    "Technical notes from Bintang's homelab: deploy pipelines, n8n backups, and the tradeoffs of running many services on one host.",
  alternates: { canonical: "/notes" },
  openGraph: {
    title: "Notes — systems, deploys, and the homelab",
    description:
      "Technical notes on deploy pipelines, n8n backups, and running a one-host homelab.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function NotesPage() {
  return (
    <PageShell
      posterWorldX={CHAPTERS[1].worldX}
      posterAlt="Pixel-art homelab with a desktop tower, a compact 12U rack, and a drive shelf."
    >
      <TrackView event="notes_view" />

      <header className="notes-index__header">
        <p className="notes-index__eyebrow">NOTES · FIELD LOG</p>
        <h1 className="page-title">Notes from the homelab.</h1>
        <p className="page-lede">
          Short write-ups about the systems behind the portfolio: how they
          ship, how they fail, and what I would change next.
        </p>
      </header>

      <div className="notes-index">
        {notes.map((note) => (
          <article key={note.slug} className="note-card">
            <div className="note-card__meta">
              <span>{formatDate(note.date)}</span>
              <span>{note.readingMinutes} min read</span>
            </div>
            <h2 className="note-card__title">
              <Link href={`/notes/${note.slug}`}>{note.title}</Link>
            </h2>
            <p className="note-card__summary">{note.summary}</p>
            <div className="chapter-chips">
              {note.tags.map((tag) => (
                <PixelChip key={tag} tone="muted">
                  {tag}
                </PixelChip>
              ))}
            </div>
            <Link href={`/notes/${note.slug}`} className="pixel-link">
              Read note
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
