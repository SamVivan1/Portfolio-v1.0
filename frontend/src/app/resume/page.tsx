import type { Metadata } from "next";
import Link from "next/link";
import { preload } from "react-dom";
import { Download, FileText } from "lucide-react";
import PageShell from "../../components/pixel/pages/PageShell";
import ResumeDocument from "../../components/pixel/pages/ResumeDocument";
import CopyEmailButton from "../../components/pixel/pages/CopyEmailButton";
import PrintButton from "../../components/pixel/pages/PrintButton";
import TrackView from "../../components/pixel/pages/TrackView";
import {
  fallbackProjects,
  profile,
  stats,
} from "../../data/portfolio";

export const metadata: Metadata = {
  title: "Resume — Muhammad Bintang Panji Kusuma",
  description:
    "Web resume for Muhammad Bintang Panji Kusuma: computer engineering student, DevOps and homelab builder, ProtoPrime3D workshop operator.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume — Muhammad Bintang Panji Kusuma",
    description:
      "Computer Engineering student, DevOps and homelab builder, ProtoPrime3D workshop operator.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

export default function ResumePage() {
  preload("/assets/profile.webp", {
    as: "image",
    fetchPriority: "high",
  });

  return (
    <PageShell>
      <TrackView event="resume_view" />
      <h1 className="sr-only">Resume — {profile.name}</h1>

      <div className="resume-toolbar">
        <span className="resume-toolbar__label">
          <FileText size={14} aria-hidden="true" />
          RESUME · WEB VERSION
        </span>
        <div className="resume-toolbar__actions">
          <CopyEmailButton />
          <PrintButton />
          <a
            className="pixel-button pixel-button--ghost pixel-button--sm"
            href={profile.cv}
            download
          >
            <Download size={14} aria-hidden="true" />
            Download CV
          </a>
          <Link href="/homelab" className="pixel-link">
            Homelab architecture
          </Link>
        </div>
      </div>

      <ResumeDocument
        projects={fallbackProjects}
        stats={stats}
        priorityPortrait
      />
    </PageShell>
  );
}
