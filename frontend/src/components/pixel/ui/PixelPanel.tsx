"use client";

import { ReactNode, useRef } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMobileSheet } from "../../../hooks/useMobileSheet";

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
  const panelRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { sheet, setSheet } = useMobileSheet(panelRef, barRef);
  const collapsed = sheet === "collapsed";

  return (
    <article
      ref={panelRef}
      id={id}
      data-sheet={sheet}
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
      <div className="pixel-panel__bar" ref={barRef}>
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
          onClick={() => setSheet(collapsed ? "half" : "collapsed")}
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
