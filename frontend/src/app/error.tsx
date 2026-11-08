"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-void px-6 text-center text-cream">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
        SYSTEM FAULT
      </p>
      <h1 className="font-pixel text-2xl leading-tight text-cream">
        Something went wrong.
      </h1>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        The homelab hit an unexpected state. Try again, or walk back to the
        desk.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="pixel-button pixel-button--primary"
        >
          Try again
        </button>
        <Link href="/" className="pixel-button pixel-button--ghost">
          Back to the desk
        </Link>
      </div>
    </div>
  );
}
