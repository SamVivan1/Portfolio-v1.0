"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Download, X } from "lucide-react";
import { profile } from "../../data/portfolio";
import { usePortfolioData } from "./PortfolioData";
import { track } from "../../lib/analytics";
import CopyEmailButton from "./pages/CopyEmailButton";
import ResumeDocument from "./pages/ResumeDocument";

interface QuickViewProps {
  open: boolean;
  onClose: () => void;
}

export default function QuickView({ open, onClose }: QuickViewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { projects, stats } = usePortfolioData();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("dialog-open");
    }
    if (!open && dialog.open) {
      dialog.close();
      document.documentElement.classList.remove("dialog-open");
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onDialogClose = () => {
      document.documentElement.classList.remove("dialog-open");
      onClose();
    };
    dialog.addEventListener("close", onDialogClose);
    return () => dialog.removeEventListener("close", onDialogClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="quickview"
      aria-labelledby="quickview-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="quickview__shell">
        <div className="quickview__bar">
          <span className="pixel-panel__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="quickview__bar-title">RESUME.EXE — QUICK VIEW</span>
          <button
            type="button"
            className="quickview__close"
            onClick={onClose}
            aria-label="Close quick view"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="quickview__scroll">
          <ResumeDocument projects={projects} stats={stats} />
        </div>

        <footer className="quickview__footer">
          <span className="quickview__footer-note">
            All credentials link to their source.{" "}
            <Link href="/resume" className="pixel-link" onClick={onClose}>
              Open resume page
            </Link>
          </span>
          <div className="quickview__footer-actions">
            <CopyEmailButton />
            <a
              className="pixel-button pixel-button--primary pixel-button--sm"
              href={profile.cv}
              download
              onClick={() => track("cv_download", { source: "quickview" })}
            >
              <Download size={14} aria-hidden="true" />
              Download CV
            </a>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
