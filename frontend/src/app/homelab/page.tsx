import type { Metadata } from "next";
import PageShell from "../../components/pixel/pages/PageShell";
import HomelabArchitecture from "../../components/pixel/pages/HomelabArchitecture";
import TrackView from "../../components/pixel/pages/TrackView";
import { CHAPTERS } from "../../data/portfolio";

export const metadata: Metadata = {
  title: "The Homelab — Architecture & Hardware",
  description:
    "The homelab behind the portfolio: one allocated desktop PC, Ubuntu 26.04 LTS, a 66-container Docker stack, media, photos, files, documents, automation, and network services.",
  alternates: { canonical: "/homelab" },
  openGraph: {
    title: "The Homelab — Architecture & Hardware",
    description:
      "One allocated desktop PC, Ubuntu 26.04 LTS, 66 containers, and six service groups.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

export default function HomelabPage() {
  return (
    <PageShell
      posterWorldX={CHAPTERS[1].worldX}
      posterAlt="Pixel-art homelab with a desktop tower, a compact 12U rack, and a drive shelf."
    >
      <TrackView event="homelab_view" />
      <HomelabArchitecture fullPage />
    </PageShell>
  );
}
