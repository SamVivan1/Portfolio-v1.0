"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

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
    <main className="error-page">
      <section className="error-page__panel" aria-labelledby="error-title">
        <div className="error-page__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-pixel.svg"
            alt=""
            width={32}
            height={32}
            className="error-page__logo"
            aria-hidden="true"
          />
          <span>BSP://HOMELAB</span>
        </div>

        <p className="error-page__eyebrow">SYSTEM FAULT · 500</p>
        <h1 id="error-title" className="error-page__title">
          The homelab hit an unexpected state.
        </h1>
        <p className="error-page__copy">
          Something failed while rendering this room. Try the request again;
          if it keeps happening, walk back to the desk and open the resume.
        </p>

        <div className="error-page__actions">
          <button
            type="button"
            onClick={reset}
            className="pixel-button pixel-button--primary"
          >
            <RotateCcw size={15} aria-hidden="true" />
            Try again
          </button>
          <Link href="/" className="pixel-button pixel-button--ghost">
            <ArrowLeft size={15} aria-hidden="true" />
            Back to the desk
          </Link>
        </div>

        {error.digest ? (
          <p className="error-page__meta">Reference: {error.digest}</p>
        ) : null}
      </section>
    </main>
  );
}
