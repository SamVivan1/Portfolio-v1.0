"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Command,
  Download,
  FileText,
  Menu,
  Monitor,
  Moon,
  Server,
  Wrench,
  X,
} from "lucide-react";
import { CHAPTERS, profile } from "../../data/portfolio";
import PixelButton from "./ui/PixelButton";

interface HudProps {
  activeChapter: number;
  onNavigate: (index: number) => void;
  onQuickView: () => void;
  onCommand: () => void;
}

const chapterIcons = [Monitor, Server, Wrench, Moon];

export default function Hud({
  activeChapter,
  onNavigate,
  onQuickView,
  onCommand,
}: HudProps) {
  const [clock, setClock] = useState("--:--");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      try {
        setClock(
          new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date())
        );
      } catch {
        setClock("—");
      }
    };
    update();
    const interval = window.setInterval(update, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const navigate = (index: number) => {
    onNavigate(index);
    setMenuOpen(false);
  };

  return (
    <header className="hud">
      <div className="hud__bar">
        <div className="hud__brand">
          <button
            type="button"
            className="hud__logo"
            onClick={() => navigate(0)}
          >
            <span className="hud__logo-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="hud__wordmark">
              BSP<span className="hud__wordmark-dim">://</span>HOMELAB
            </span>
            <span className="sr-only">— go to the desk</span>
          </button>
          <div className="hud__status">
            <span className="live-dot" aria-hidden="true" />
            <span>OPEN TO INTERNSHIP</span>
            <span className="hud__clock">{clock} WIB</span>
          </div>
        </div>

        <nav className="hud__nav" aria-label="Chapters">
          {CHAPTERS.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              className={clsx(
                "hud__nav-item",
                activeChapter === index && "is-active"
              )}
              aria-current={activeChapter === index ? "step" : undefined}
              onClick={() => navigate(index)}
            >
              <span className="hud__nav-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {chapter.shortLabel}
            </button>
          ))}
        </nav>

        <div className="hud__actions">
          <button
            type="button"
            className="hud__key"
            onClick={onCommand}
            aria-label="Open command palette"
            title="Command palette (Ctrl/Cmd + K)"
          >
            <Command size={13} aria-hidden="true" />
            <span>K</span>
          </button>
          <a
            className="hud__key hud__key--icon"
            href={profile.cv}
            download
            aria-label="Download CV"
            title="Download CV"
          >
            <Download size={14} aria-hidden="true" />
          </a>
          <PixelButton
            onClick={onQuickView}
            variant="primary"
            size="sm"
            className="hud__quick"
            icon={<FileText size={13} aria-hidden="true" />}
          >
            Quick view
          </PixelButton>
          <button
            type="button"
            className="hud__menu"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="hud-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X size={19} aria-hidden="true" />
            ) : (
              <Menu size={19} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="hud__mobile-menu" id="hud-mobile-menu">
          <nav aria-label="Chapters">
            {CHAPTERS.map((chapter, index) => (
              <button
                key={chapter.id}
                type="button"
                className={clsx(
                  "hud__mobile-item",
                  activeChapter === index && "is-active"
                )}
                aria-current={activeChapter === index ? "step" : undefined}
                onClick={() => navigate(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {chapter.label}
              </button>
            ))}
          </nav>
          <div className="hud__mobile-actions">
            <PixelButton
              onClick={() => {
                setMenuOpen(false);
                onQuickView();
              }}
              variant="primary"
              size="sm"
              icon={<FileText size={13} aria-hidden="true" />}
            >
              Quick view
            </PixelButton>
            <PixelButton
              href={profile.cv}
              download
              variant="ghost"
              size="sm"
              icon={<Download size={13} aria-hidden="true" />}
            >
              CV
            </PixelButton>
            <PixelButton
              onClick={() => {
                setMenuOpen(false);
                onCommand();
              }}
              variant="ghost"
              size="sm"
              icon={<Command size={13} aria-hidden="true" />}
            >
              Jump
            </PixelButton>
          </div>
        </div>
      ) : null}

      <div className="hud__progress" aria-hidden="true">
        <span className="hud__progress-label">
          {String(activeChapter + 1).padStart(2, "0")} /{" "}
          {String(CHAPTERS.length).padStart(2, "0")}
        </span>
        <span className="hud__progress-track">
          <span className="hud__progress-fill" />
        </span>
      </div>

      <div className="hud__bottom" role="navigation" aria-label="Chapters">
        <span className="hud__bottom-fill" aria-hidden="true" />
        {CHAPTERS.map((chapter, index) => {
          const Icon = chapterIcons[index];
          return (
            <button
              key={chapter.id}
              type="button"
              className={clsx(
                "hud__bottom-item",
                activeChapter === index && "is-active"
              )}
              aria-current={activeChapter === index ? "step" : undefined}
              onClick={() => navigate(index)}
            >
              <Icon size={17} aria-hidden="true" />
              <span>{chapter.shortLabel}</span>
            </button>
          );
        })}
        <button
          type="button"
          className="hud__bottom-item"
          onClick={onQuickView}
        >
          <FileText size={17} aria-hidden="true" />
          <span>Resume</span>
        </button>
      </div>
    </header>
  );
}
