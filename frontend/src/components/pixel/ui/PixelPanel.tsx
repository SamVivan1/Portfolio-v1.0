"use client";

import { ReactNode, useState } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PixelPanelProps {
  id: string;
  title: string;
  meta?: string;
  side: "left" | "right" | "center";
  active: boolean;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function PixelPanel({
  id,
  title,
  meta,
  side,
  active,
  children,
  footer,
  className,
}: PixelPanelProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <article
      id={id}
      className={clsx(
        "chapter-panel",
        `chapter-panel--${side}`,
        active && "is-active",
        collapsed && "is-collapsed",
        className
      )}
      aria-hidden={!active}
      inert={!active}
    >
      <div className="pixel-panel__bar">
        <span className="pixel-panel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="pixel-panel__title">{title}</span>
        {meta ? <span className="pixel-panel__meta">{meta}</span> : null}
        <button
          type="button"
          className="pixel-panel__collapse"
          onClick={() => setCollapsed((value) => !value)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand panel" : "Collapse panel"}
        >
          {collapsed ? (
            <ChevronUp size={14} aria-hidden="true" />
          ) : (
            <ChevronDown size={14} aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="pixel-panel__body">{children}</div>
      {footer ? <div className="pixel-panel__footer">{footer}</div> : null}
    </article>
  );
}
