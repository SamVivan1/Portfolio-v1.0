"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Copy,
  Download,
  FileText,
  Monitor,
  Moon,
  Printer,
  Search,
  Server,
  Wrench,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { business, profile } from "../../data/portfolio";
import { routedCaseStudies } from "../../data/caseStudies";
import { noteLinks } from "../../data/noteLinks";
import { useModalDialog } from "../../hooks/useModalDialog";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onQuickView: () => void;
}

interface PaletteAction {
  id: string;
  label: string;
  hint: string;
  group: string;
  icon: React.ReactNode;
  run: () => void | Promise<void>;
  keywords?: string;
  /** The action shows its own feedback and closes the palette itself. */
  keepOpen?: boolean;
}

export default function CommandPalette({
  open,
  onClose,
  onNavigate,
  onQuickView,
}: CommandPaletteProps) {
  const dialog = useModalDialog(open, onClose);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const actions = useMemo<PaletteAction[]>(() => {
    const chapterActions: PaletteAction[] = [
      {
        id: "desk",
        label: "Go to The Desk",
        hint: "01",
        group: "Chapters",
        icon: <Monitor size={15} aria-hidden="true" />,
        run: () => onNavigate(0),
        keywords: "home hero spawn about",
      },
      {
        id: "rack",
        label: "Go to The Homelab",
        hint: "02",
        group: "Chapters",
        icon: <Server size={15} aria-hidden="true" />,
        run: () => onNavigate(1),
        keywords: "homelab server experience credentials containers ubuntu",
      },
      {
        id: "workshop",
        label: "Go to The Workshop",
        hint: "03",
        group: "Chapters",
        icon: <Wrench size={15} aria-hidden="true" />,
        run: () => onNavigate(2),
        keywords: "projects github prints protoprime 3d",
      },
      {
        id: "roof",
        label: "Go to The Roof",
        hint: "04",
        group: "Chapters",
        icon: <Moon size={15} aria-hidden="true" />,
        run: () => onNavigate(3),
        keywords: "contact email hire",
      },
    ];

    return [
      ...chapterActions,
      {
        id: "quick-view",
        label: "Open Quick view",
        hint: "resume",
        group: "Information",
        icon: <FileText size={15} aria-hidden="true" />,
        run: onQuickView,
        keywords: "cv resume experience education skills",
      },
      {
        id: "resume-page",
        label: "Open resume page",
        hint: "printable",
        group: "Pages",
        icon: <FileText size={15} aria-hidden="true" />,
        run: () => router.push("/resume"),
        keywords: "resume cv print pdf web version",
      },
      {
        id: "homelab-page",
        label: "Open homelab architecture",
        hint: "full page",
        group: "Pages",
        icon: <Server size={15} aria-hidden="true" />,
        run: () => router.push("/homelab"),
        keywords: "homelab architecture hardware diagram ubuntu docker",
      },
      {
        id: "notes-page",
        label: "Open technical notes",
        hint: "writing",
        group: "Pages",
        icon: <FileText size={15} aria-hidden="true" />,
        run: () => router.push("/notes"),
        keywords: "notes articles writing deploy n8n homelab",
      },
      ...noteLinks.map((note) => ({
        id: `note-${note.slug}`,
        label: `Read note: ${note.title}`,
        hint: "note",
        group: "Notes",
        icon: <FileText size={15} aria-hidden="true" />,
        run: () => router.push(`/notes/${note.slug}`),
        keywords: `notes ${note.title} deploy n8n homelab`,
      })),
      ...routedCaseStudies.map((study) => ({
        id: `case-study-${study.slug}`,
        label: `Case study: ${study.title}`,
        hint: "project",
        group: "Case studies",
        icon: <FileText size={15} aria-hidden="true" />,
        run: () => router.push(`/projects/${study.slug}`),
        keywords: `${study.repo} ${study.stack.join(" ")}`,
      })),
      {
        id: "cv",
        label: "Download CV",
        hint: "PDF",
        group: "Actions",
        icon: <Download size={15} aria-hidden="true" />,
        run: () => {
          const link = document.createElement("a");
          link.href = profile.cv;
          link.download = "";
          link.click();
        },
        keywords: "resume pdf download",
      },
      {
        id: "copy-email",
        label: copied ? "Email copied" : "Copy email address",
        hint: profile.email,
        group: "Actions",
        icon: <Copy size={15} aria-hidden="true" />,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            window.setTimeout(() => {
              onClose();
              setCopied(false);
            }, 900);
          } catch {
            onClose();
            window.location.href = `mailto:${profile.email}`;
          }
        },
        keywords: "mail contact copy",
        keepOpen: true,
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "@SamVivan1",
        group: "Links",
        icon: <FaGithub size={15} aria-hidden="true" />,
        run: () =>
          window.open(profile.github, "_blank", "noopener,noreferrer"),
        keywords: "code repositories",
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "profile",
        group: "Links",
        icon: <FaLinkedin size={15} aria-hidden="true" />,
        run: () =>
          window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
        keywords: "work hire",
      },
      {
        id: "protoprime",
        label: "Open ProtoPrime3D",
        hint: "3D printing",
        group: "Links",
        icon: <Printer size={15} aria-hidden="true" />,
        run: () =>
          window.open(business.url, "_blank", "noopener,noreferrer"),
        keywords: "print workshop business",
      },
    ];
  }, [copied, onClose, onNavigate, onQuickView, router]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return actions;
    return actions.filter((action) =>
      `${action.label} ${action.hint} ${action.group} ${action.keywords ?? ""}`
        .toLowerCase()
        .includes(term)
    );
  }, [actions, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`command-${filtered[active]?.id}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, active, filtered]);

  useEffect(() => {
    if (active > filtered.length - 1) setActive(0);
  }, [active, filtered.length]);

  const runAction = (action: PaletteAction) => {
    if (action.keepOpen) {
      void action.run();
      return;
    }
    onClose();
    window.setTimeout(() => void action.run(), 30);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) =>
        filtered.length === 0 ? 0 : (current + 1) % filtered.length
      );
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) =>
        filtered.length === 0
          ? 0
          : (current - 1 + filtered.length) % filtered.length
      );
    }
    if (event.key === "Enter" && filtered[active]) {
      event.preventDefault();
      runAction(filtered[active]);
    }
  };

  return (
    <dialog
      {...dialog}
      className="command-palette"
      aria-label="Command palette"
    >
      <div className="command-palette__shell">
        <div className="command-palette__bar">
          <span className="command-palette__prompt">bintang@homelab:~$</span>
          <span className="command-palette__title">jump</span>
          <button
            type="button"
            className="command-palette__esc"
            onClick={onClose}
            aria-label="Close command palette"
          >
            ESC
          </button>
        </div>

        <label className="command-palette__search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search commands</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Type a chapter, action, or link…"
            role="combobox"
            aria-expanded={filtered.length > 0}
            aria-autocomplete="list"
            aria-controls="command-list"
            aria-activedescendant={
              filtered[active] ? `command-${filtered[active].id}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />
        </label>

        <ul
          id="command-list"
          role="listbox"
          aria-label="Commands"
          className="command-palette__list"
        >
          {filtered.length === 0 ? (
            <li role="presentation" className="command-palette__empty">
              No command found. Try “projects”, “resume”, or “contact”.
            </li>
          ) : (
            filtered.map((action, index) => (
              <li
                key={action.id}
                id={`command-${action.id}`}
                role="option"
                aria-selected={index === active}
                className={
                  index === active ? "is-active" : undefined
                }
                onMouseEnter={() => setActive(index)}
                onClick={() => runAction(action)}
              >
                <span className="command-palette__icon">
                  {action.icon}
                </span>
                <span className="command-palette__label">
                  {action.label}
                </span>
                <span className="command-palette__group">
                  {action.group}
                </span>
                <span className="command-palette__hint">{action.hint}</span>
                <ArrowRight
                  className="command-palette__arrow"
                  size={13}
                  aria-hidden="true"
                />
              </li>
            ))
          )}
        </ul>

        <div className="command-palette__footer">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </dialog>
  );
}
