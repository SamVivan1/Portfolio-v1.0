"use client";

import Link from "next/link";
import { useModalDialog } from "../../../hooks/useModalDialog";
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
  const dialog = useModalDialog(Boolean(study), onClose);

  return (
    <dialog
      {...dialog}
      className="page-dialog"
      aria-labelledby="case-study-title"
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
