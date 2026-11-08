"use client";

import {
  ArrowRight,
  ExternalLink,
  FileText,
  ShieldCheck,
} from "lucide-react";
import {
  certifications,
  experience,
  homelab,
  profile,
} from "../../../data/portfolio";
import PixelButton from "../ui/PixelButton";
import PixelChip from "../ui/PixelChip";

interface HomelabContentProps {
  onQuickView?: () => void;
  onNext?: () => void;
  compact?: boolean;
}

export default function HomelabContent({
  onQuickView,
  onNext,
  compact = false,
}: HomelabContentProps) {
  return (
    <div className="chapter-content">
      <h2 className="chapter-title">I run my own infrastructure.</h2>
      <p className="chapter-lede">
        A homelab is the cheapest place to learn what production feels like.
      </p>
      <p className="chapter-copy">{homelab.summary}</p>

      <div className="chapter-chips">
        <PixelChip tone="teal">
          <ShieldCheck size={13} aria-hidden="true" /> BNSP-certified
        </PixelChip>
        <PixelChip tone="amber">
          {certifications.length} verified credentials
        </PixelChip>
        <PixelChip tone="violet">66 containers</PixelChip>
      </div>

      <ul className="service-grid" aria-label="Homelab stack">
        {homelab.services.map((service) => (
          <li key={service.name}>
            <span>{service.name}</span>
            <small>{service.detail}</small>
          </li>
        ))}
      </ul>

      <div className="chapter-subhead">
        <h3>Professional journey</h3>
        <span className="chapter-subhead__count">{experience.length} programs</span>
      </div>

      <ol className="timeline">
        {experience.map((item) => (
          <li key={`${item.date}-${item.title}`}>
            <span className="timeline__dot" aria-hidden="true" />
            <div className="timeline__body">
              <div className="timeline__top">
                <h4>{item.title}</h4>
                <span className="timeline__date">{item.date}</span>
              </div>
              <p className="timeline__org">{item.org}</p>
              {!compact ? (
                <p className="timeline__desc">{item.description}</p>
              ) : null}
              {item.credential ? (
                <a
                  className="pixel-link timeline__link"
                  href={item.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.credentialLabel ?? "View credential"}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="chapter-actions">
        {onQuickView ? (
          <PixelButton
            onClick={onQuickView}
            variant="primary"
            icon={<FileText size={15} aria-hidden="true" />}
          >
            Full journey
          </PixelButton>
        ) : null}
        <PixelButton
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          icon={<ExternalLink size={15} aria-hidden="true" />}
        >
          GitHub
        </PixelButton>
        {onNext ? (
          <PixelButton
            onClick={onNext}
            variant="quiet"
            icon={<ArrowRight size={15} aria-hidden="true" />}
          >
            The workshop
          </PixelButton>
        ) : null}
      </div>
    </div>
  );
}
