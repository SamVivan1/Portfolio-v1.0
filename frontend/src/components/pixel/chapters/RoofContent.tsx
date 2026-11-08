"use client";

import { useState } from "react";
import {
  ArrowUp,
  Check,
  Copy,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Printer,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { contactLinks, profile } from "../../../data/portfolio";
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
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

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
        <span className="roof-note__sep" aria-hidden="true">
          /
        </span>
        <span>Banda Aceh is UTC+7.</span>
      </div>

      <div className="chapter-actions">
        <PixelButton
          href={`mailto:${profile.email}`}
          variant="primary"
          icon={<Mail size={15} aria-hidden="true" />}
        >
          Email me
        </PixelButton>
        <PixelButton
          onClick={copyEmail}
          variant="ghost"
          icon={
            copied ? (
              <Check size={15} aria-hidden="true" />
            ) : (
              <Copy size={15} aria-hidden="true" />
            )
          }
          aria-label={copied ? "Email copied" : "Copy email address"}
        >
          {copied ? "Copied" : "Copy email"}
        </PixelButton>
        <PixelButton
          href={profile.cv}
          download
          variant="quiet"
          icon={<Download size={15} aria-hidden="true" />}
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
