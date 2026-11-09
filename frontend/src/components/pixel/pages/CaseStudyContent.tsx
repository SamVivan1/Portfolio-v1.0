import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { CaseStudy, CaseStudyVisual } from "../../../data/caseStudies";
import CaseStudyStats from "./CaseStudyStats";
import PixelButton from "../ui/PixelButton";
import PixelChip from "../ui/PixelChip";

interface CaseStudyContentProps {
  study: CaseStudy;
  fullPage?: boolean;
}

function StudyVisual({
  visual,
  title,
}: {
  visual: CaseStudyVisual;
  title: string;
}) {
  const isDiagram = Boolean(visual.src?.endsWith(".svg"));

  return (
    <figure className="case-study__visual">
      {isDiagram ? (
        <p className="case-study__scroll-hint">
          Scroll horizontally to read the diagram →
        </p>
      ) : null}
      {visual.kind === "image" && visual.src ? (
        <div
          className={`case-study__image${
            isDiagram ? " case-study__image--diagram" : ""
          }`}
          tabIndex={isDiagram ? 0 : undefined}
          role={isDiagram ? "region" : undefined}
          aria-label={
            isDiagram
              ? `${title} architecture diagram. Scroll horizontally to read it.`
              : undefined
          }
        >
          <Image
            src={visual.src}
            alt={visual.alt}
            width={visual.width ?? 1600}
            height={visual.height ?? 900}
            sizes="(max-width: 900px) 100vw, 900px"
            className={`case-study__image-el${
              isDiagram ? " case-study__image-el--diagram" : ""
            }`}
          />
        </div>
      ) : (
        <div
          className="case-study__blueprint"
          role="img"
          aria-label={visual.alt}
        >
          <span className="case-study__blueprint-mark" aria-hidden="true">
            {title.slice(0, 2).toUpperCase()}
          </span>
          <span className="case-study__blueprint-lines" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
      )}
      {visual.caption ? <figcaption>{visual.caption}</figcaption> : null}
    </figure>
  );
}

export default function CaseStudyContent({
  study,
  fullPage = false,
}: CaseStudyContentProps) {
  return (
    <article className="case-study">
      <header className="case-study__header">
        <div className="chapter-chips">
          <PixelChip tone="teal">{study.status}</PixelChip>
          <PixelChip tone="muted">{study.repo}</PixelChip>
        </div>
        <h1 id="case-study-title" className="page-title">
          {study.title}
        </h1>
        <p className="page-lede">{study.tagline}</p>
      </header>

      <CaseStudyStats repo={study.repo} />

      {study.visual ? (
        <StudyVisual visual={study.visual} title={study.title} />
      ) : null}
      {study.extraVisuals?.map((visual) => (
        <StudyVisual
          key={visual.src ?? visual.caption ?? visual.alt}
          visual={visual}
          title={study.title}
        />
      ))}

      <div className="case-study__grid">
        <section>
          <h2>Problem</h2>
          <p>{study.problem}</p>
        </section>

        <section>
          <h2>Approach</h2>
          <ol className="case-study__list">
            {study.approach.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2>Result</h2>
          <ul className="case-study__list">
            {study.result.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Stack</h2>
          <div className="chapter-chips">
            {study.stack.map((item) => (
              <PixelChip key={item} tone="muted">
                {item}
              </PixelChip>
            ))}
          </div>
        </section>
      </div>

      <div className="case-study__footer">
        {study.links.map((link) => (
          <PixelButton
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            icon={<FaGithub size={15} aria-hidden="true" />}
          >
            {link.label}
          </PixelButton>
        ))}
        <Link href="/" className="pixel-link">
          <ArrowLeft size={13} aria-hidden="true" />
          Back to the world
        </Link>
        {!fullPage && study.route !== false ? (
          <Link href={`/projects/${study.slug}`} className="pixel-link">
            Full case study
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
