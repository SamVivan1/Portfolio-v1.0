import type { MetadataRoute } from "next";
import { routedCaseStudies } from "../data/caseStudies";
import { notes } from "../data/notes";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/homelab`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...routedCaseStudies.map((study) => ({
      url: `${baseUrl}/projects/${study.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...notes.map((note) => ({
      url: `${baseUrl}/notes/${note.slug}`,
      lastModified: new Date(note.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
