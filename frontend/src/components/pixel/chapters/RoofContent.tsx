"use client";

import {
  ArrowUp,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Printer,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { contactLinks, profile } from "../../../data/portfolio";
import { track } from "../../../lib/analytics";
import CopyEmailButton from "../pages/CopyEmailButton";
import PixelButton from "../ui/PixelButton";
import PixelChip from "../ui/PixelChip";

const icons = {
  mail: Mail,
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  printer: Printer,
};

interface RoofContentProps {
  onTop?: () => void;
}

export default function RoofContent({ onTop }: RoofContentProps) {
  return (
    <div className="chapter-content">
      <h2 className="chapter-title">Let&apos;s build something.</h2>
      <p className="chapter-lede">
        I&apos;m looking for an internship or entry-level role where I can keep
        systems running and ship interfaces that people actually use.
      </p>

      <div className="chapter-chips">
        <PixelChip tone="green">
          <span className="live-dot" /> {profile.availability}
        </PixelChip>
        <PixelChip tone="violet">Remote or on-site</PixelChip>
        <PixelChip tone="amber">UTC+7</PixelChip>
      </div>

      <ul className="contact-list">
        {contactLinks.map((link) => {
          const Icon = icons[link.icon];
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="contact-row"
              >
                <span className="contact-row__icon" aria-hidden="true">
                  <Icon size={17} />
                </span>
                <span className="contact-row__main">
                  <span className="contact-row__label">{link.label}</span>
                  <span className="contact-row__value">{link.value}</span>
                </span>
                <ExternalLink
                  className="contact-row__arrow"
                  size={14}
                  aria-hidden="true"
                />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="roof-note">
        <MapPin size={14} aria-hidden="true" />
        <span>{profile.location}</span>
      </div>

      <div className="chapter-actions">
        <PixelButton
          href={`mailto:${profile.email}`}
          variant="primary"
          icon={<Mail size={15} aria-hidden="true" />}
          onClick={() => track("email_click", { source: "roof" })}
        >
          Email me
        </PixelButton>
        <CopyEmailButton size="md" />
        <PixelButton
          href={profile.cv}
          download
          variant="quiet"
          icon={<Download size={15} aria-hidden="true" />}
          onClick={() => track("cv_download", { source: "roof" })}
        >
          CV
        </PixelButton>
      </div>

      {onTop ? (
        <button type="button" className="roof-top pixel-link" onClick={onTop}>
          <ArrowUp size={13} aria-hidden="true" />
          Back to the desk
        </button>
      ) : null}
    </div>
  );
}
