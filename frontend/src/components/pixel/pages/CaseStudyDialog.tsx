"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { CaseStudy } from "../../../data/caseStudies";
import CaseStudyContent from "./CaseStudyContent";

interface CaseStudyDialogProps {
  study: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyDialog({
  study,
  onClose,
}: CaseStudyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (study && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("dialog-open");
    }
    if (!study && dialog.open) {
      dialog.close();
      document.documentElement.classList.remove("dialog-open");
    }
  }, [study]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      document.documentElement.classList.remove("dialog-open");
      onClose();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="page-dialog"
      aria-label={study?.title ?? "Case study"}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="page-dialog__shell">
        <div className="page-dialog__bar">
          <span className="pixel-panel__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="page-dialog__title">CASE STUDY</span>
          <button
            type="button"
            className="page-dialog__close"
            onClick={onClose}
            aria-label="Close case study"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="page-dialog__body">
          {study ? <CaseStudyContent study={study} fullPage /> : null}
        </div>
        {study && study.route !== false ? (
          <div className="page-dialog__footer">
            <Link
              href={`/projects/${study.slug}`}
              className="pixel-button pixel-button--primary"
              onClick={onClose}
            >
              Open full page
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
