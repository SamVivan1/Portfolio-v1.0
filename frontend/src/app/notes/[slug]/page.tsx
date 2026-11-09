import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "../../../components/pixel/pages/PageShell";
import NoteContent from "../../../components/pixel/pages/NoteContent";
import TrackView from "../../../components/pixel/pages/TrackView";
import { noteBySlug, notes } from "../../../data/notes";
import { profile } from "../../../data/portfolio";

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = noteBySlug.get(slug);
  if (!note) return {};

  return {
    title: `${note.title} — Notes`,
    description: note.summary,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      title: `${note.title} — Notes`,
      description: note.summary,
      type: "article",
      publishedTime: note.date,
      tags: note.tags,
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.title} — Notes`,
      description: note.summary,
      images: ["/og.jpg"],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = noteBySlug.get(slug);
  if (!note) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: note.title,
    description: note.summary,
    datePublished: note.date,
    dateModified: note.date,
    author: {
      "@type": "Person",
      name: profile.name,
      url: "https://samvivan.my.id",
    },
    keywords: note.tags.join(", "),
    mainEntityOfPage: `https://samvivan.my.id/notes/${note.slug}`,
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackView event="note_view" slug={note.slug} />
      <NoteContent note={note} />
    </PageShell>
  );
}
