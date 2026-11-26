"use client";

import Link from "next/link";
import { useModalDialog } from "../../../hooks/useModalDialog";
import { ArrowUpRight, X } from "lucide-react";
import HomelabArchitecture from "./HomelabArchitecture";

interface HomelabDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function HomelabDialog({ open, onClose }: HomelabDialogProps) {
  const dialog = useModalDialog(open, onClose);

  return (
    <dialog
      {...dialog}
      className="page-dialog"
      aria-label="Homelab architecture"
    >
      <div className="page-dialog__shell">
        <div className="page-dialog__bar">
          <span className="pixel-panel__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="page-dialog__title">HOMELAB ARCHITECTURE</span>
          <button
            type="button"
            className="page-dialog__close"
            onClick={onClose}
            aria-label="Close homelab architecture"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="page-dialog__body">
          <HomelabArchitecture fullPage />
        </div>
        <div className="page-dialog__footer">
          <Link
            href="/homelab"
            className="pixel-button pixel-button--primary"
            onClick={onClose}
          >
            Open full page
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </dialog>
  );
}
