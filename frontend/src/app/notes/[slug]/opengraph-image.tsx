import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { noteBySlug, notes } from "../../../data/notes";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "SamVivan field note: systems, deploys, and the homelab.";

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

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = noteBySlug.get(slug);
  const title = note?.title ?? "Field note";
  const summary =
    note?.summary ??
    "Notes on systems, deploys, and running a homelab.";
  const date = note
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(note.date))
    : "Nov 2026";
  const tags = note?.tags.slice(0, 4) ?? ["Systems"];
  const reading = note ? `${note.readingMinutes} min read` : "Notes";
  const titleSize = title.length > 44 ? 42 : title.length > 28 ? 50 : 58;
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
            background: "#fbbf24",
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
            FIELD NOTE
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingLeft: 8,
            maxWidth: 1010,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
              fontSize: 16,
              letterSpacing: 2,
              color: "#fbbf24",
            }}
          >
            <span>{date.toUpperCase()}</span>
            <span>·</span>
            <span>{reading.toUpperCase()}</span>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Silkscreen",
              fontSize: titleSize,
              lineHeight: 1.06,
              letterSpacing: -1,
              color: "#f5efe0",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1.35,
              color: "#c9bedb",
              maxWidth: 920,
            }}
          >
            {summary}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 14px",
                  border: "1px solid #3a284f",
                  background: "#171126",
                  color: "#9b8fb3",
                  fontSize: 18,
                }}
              >
                {tag}
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
            <span>/notes/{slug}</span>
          </div>
          <div style={{ display: "flex", color: "#fbbf24" }}>
            FIELD LOG · 2026
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
