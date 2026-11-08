"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import HomelabArchitecture from "./HomelabArchitecture";

interface HomelabDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function HomelabDialog({ open, onClose }: HomelabDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
      aria-label="Homelab architecture"
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
