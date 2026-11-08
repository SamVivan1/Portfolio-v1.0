"use client";

import {
  ArrowRight,
  Download,
  FileText,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { profile } from "../../../data/portfolio";
import PixelButton from "../ui/PixelButton";
import PixelChip from "../ui/PixelChip";

interface DeskContentProps {
  onQuickView?: () => void;
  onNext?: () => void;
  compact?: boolean;
}

export default function DeskContent({
  onQuickView,
  onNext,
  compact = false,
}: DeskContentProps) {
  return (
    <div className="chapter-content">
      <h2 className="chapter-title">
        Hi, I&apos;m <span className="text-teal">Bintang</span>.
      </h2>
      <p className="chapter-lede">{profile.tagline}</p>
      <p className="chapter-copy">
        {compact
          ? "Computer Engineering student at Universitas Syiah Kuala, focused on DevOps, homelab infrastructure, and web development."
          : profile.summary}
      </p>

      <div className="chapter-chips">
        <PixelChip tone="green">
          <span className="live-dot" /> Open to internships
        </PixelChip>
        <PixelChip tone="violet">DevOps</PixelChip>
        <PixelChip tone="teal">Homelab</PixelChip>
        <PixelChip tone="amber">Web</PixelChip>
      </div>

      <dl className="fact-grid">
        <div>
          <dt>
            <GraduationCap size={14} aria-hidden="true" /> Education
          </dt>
          <dd>Computer Engineering</dd>
        </div>
        <div>
          <dt>GPA</dt>
          <dd>3.42 / 4.00</dd>
        </div>
        <div>
          <dt>Graduation</dt>
          <dd>Expected 2027</dd>
        </div>
        <div>
          <dt>
            <MapPin size={14} aria-hidden="true" /> Base
          </dt>
          <dd>Banda Aceh, ID</dd>
        </div>
      </dl>

      <div className="terminal-line">
        <span className="terminal-prompt">$</span> whoami
        <span className="terminal-out">→ devops / homelab / web</span>
        <span className="terminal-cursor" aria-hidden="true" />
      </div>

      <div className="chapter-actions">
        <PixelButton
          href={profile.cv}
          download
          variant="primary"
          icon={<Download size={15} aria-hidden="true" />}
        >
          Download CV
        </PixelButton>
        {onQuickView ? (
          <PixelButton
            onClick={onQuickView}
            variant="ghost"
            icon={<FileText size={15} aria-hidden="true" />}
          >
            Quick view
          </PixelButton>
        ) : null}
        {onNext ? (
          <PixelButton
            onClick={onNext}
            variant="quiet"
            icon={<ArrowRight size={15} aria-hidden="true" />}
          >
            The rack
          </PixelButton>
        ) : null}
      </div>
    </div>
  );
}
