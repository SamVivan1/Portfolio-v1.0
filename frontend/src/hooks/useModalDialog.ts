"use client";

import { useEffect, useRef } from "react";

// Lock page scroll while any modal is open, so closing a stacked dialog keeps the lock.
const syncScrollLock = () =>
  document.documentElement.classList.toggle(
    "dialog-open",
    Boolean(document.querySelector("dialog[open]"))
  );

/** Drives a native <dialog> from React state; spread the result onto the element. */
export function useModalDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    syncScrollLock();
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      syncScrollLock();
      onClose();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return {
    ref,
    onCancel: (event: React.SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      onClose();
    },
    onClick: (event: React.MouseEvent<HTMLDialogElement>) => {
      if (event.target === event.currentTarget) onClose();
    },
  };
}
