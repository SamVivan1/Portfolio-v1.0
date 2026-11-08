import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "../../../components/pixel/pages/PageShell";
import CaseStudyContent from "../../../components/pixel/pages/CaseStudyContent";
import TrackView from "../../../components/pixel/pages/TrackView";
import {
  caseStudyBySlug,
  routedCaseStudies,
} from "../../../data/caseStudies";
import { CHAPTERS, profile } from "../../../data/portfolio";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return routedCaseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyBySlug.get(slug);
  if (!study) return {};

  return {
    title: `${study.title} — Case Study`,
    description: study.tagline,
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.tagline,
      type: "article",
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — Case Study`,
      description: study.tagline,
      images: ["/og.jpg"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const study = caseStudyBySlug.get(slug);
  if (!study || study.route === false) notFound();

  const poster =
    study.slug === "portfolio" ? CHAPTERS[0] : CHAPTERS[2];
  const posterAlt =
    study.slug === "portfolio"
      ? "Pixel-art desk with a CRT monitor, rain, and a sleeping cat."
      : "Pixel-art workshop with a 3D printer, filament spools, and a pegboard.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.tagline,
    codeRepository: study.links[0]?.href,
    keywords: study.stack.join(", "),
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };

  return (
    <PageShell posterWorldX={poster.worldX} posterAlt={posterAlt}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackView event="case_study_view" slug={study.slug} />
      <CaseStudyContent study={study} fullPage />
    </PageShell>
  );
}
