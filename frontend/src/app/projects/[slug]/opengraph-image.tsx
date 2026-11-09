import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  caseStudyBySlug,
  routedCaseStudies,
} from "../../../data/caseStudies";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "SamVivan case study: project architecture, stack, and repository.";

export function generateStaticParams() {
  return routedCaseStudies.map((study) => ({ slug: study.slug }));
}

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

let fontsPromise: Promise<OgFont[]> | null = null;

function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      readFile(join(process.cwd(), "public/fonts/Silkscreen-Regular.ttf")),
      readFile(join(process.cwd(), "public/fonts/Silkscreen-Bold.ttf")),
    ]).then(([regular, bold]) => [
      {
        name: "Silkscreen",
        data: regular.buffer.slice(
          regular.byteOffset,
          regular.byteOffset + regular.byteLength
        ) as ArrayBuffer,
        weight: 400,
        style: "normal",
      },
      {
        name: "Silkscreen",
        data: bold.buffer.slice(
          bold.byteOffset,
          bold.byteOffset + bold.byteLength
        ) as ArrayBuffer,
        weight: 700,
        style: "normal",
      },
    ]);
  }
  return fontsPromise;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudyBySlug.get(slug);
  const title = study?.title ?? "Case study";
  const tagline =
    study?.tagline ??
    "A project from the SamVivan homelab: problem, approach, result, and code.";
  const status = study?.status ?? "Open source";
  const repo = study?.repo ?? "SamVivan1";
  const stack = study?.stack.slice(0, 4) ?? ["Next.js", "TypeScript"];
  const titleSize = title.length > 18 ? 48 : title.length > 12 ? 56 : 68;
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background: "#100b1c",
          color: "#f5efe0",
          position: "relative",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(rgba(196,181,253,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(196,181,253,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            bottom: 24,
            left: 24,
            border: "2px solid #3a284f",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 12,
            height: "100%",
            background: "#5eead4",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "Silkscreen",
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            <span style={{ color: "#5eead4" }}>BSP</span>
            <span style={{ color: "#c4b5fd" }}>://</span>
            <span>HOMELAB</span>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Silkscreen",
              fontSize: 16,
              letterSpacing: 2,
              color: "#fbbf24",
            }}
          >
            CASE STUDY
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingLeft: 8,
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 16,
              letterSpacing: 2,
              color: "#fbbf24",
              textTransform: "uppercase",
            }}
          >
            {status} · {repo}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Silkscreen",
              fontSize: titleSize,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: "#f5efe0",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              color: "#c9bedb",
              maxWidth: 900,
            }}
          >
            {tagline}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {stack.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  padding: "8px 14px",
                  border: "1px solid #3a284f",
                  background: "#171126",
                  color: "#9b8fb3",
                  fontSize: 18,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingLeft: 8,
            color: "#9b8fb3",
            fontSize: 18,
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ color: "#5eead4" }}>samvivan.my.id</span>
            <span>/projects/{slug}</span>
          </div>
          <div style={{ display: "flex", color: "#fbbf24" }}>
            BUILD · TEST · SHIP
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
