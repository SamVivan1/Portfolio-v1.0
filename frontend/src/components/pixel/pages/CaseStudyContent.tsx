import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { CaseStudy } from "../../../data/caseStudies";
import PixelButton from "../ui/PixelButton";
import PixelChip from "../ui/PixelChip";

interface CaseStudyContentProps {
  study: CaseStudy;
  fullPage?: boolean;
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

      {study.visual ? (
        <figure className="case-study__visual">
          {study.visual.kind === "image" && study.visual.src ? (
            <div className="case-study__image">
              <Image
                src={study.visual.src}
                alt={study.visual.alt}
                width={study.visual.width ?? 1600}
                height={study.visual.height ?? 900}
                sizes="(max-width: 900px) 100vw, 900px"
                className="case-study__image-el"
              />
            </div>
          ) : (
            <div
              className="case-study__blueprint"
              role="img"
              aria-label={study.visual.alt}
            >
              <span className="case-study__blueprint-mark" aria-hidden="true">
                {study.title.slice(0, 2).toUpperCase()}
              </span>
              <span className="case-study__blueprint-lines" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
          )}
          {study.visual.caption ? (
            <figcaption>{study.visual.caption}</figcaption>
          ) : null}
        </figure>
      ) : null}

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
