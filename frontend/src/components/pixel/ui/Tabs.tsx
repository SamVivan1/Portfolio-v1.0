"use client";

import { ReactNode, useRef, useState } from "react";
import clsx from "clsx";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  label: string;
  defaultId?: string;
  className?: string;
  idPrefix?: string;
}

export default function Tabs({
  tabs,
  label,
  defaultId,
  className,
  idPrefix = "tabs",
}: TabsProps) {
  const [active, setActive] = useState(defaultId ?? tabs[0]?.id);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const next = refs.current[index];
    if (!next) return;
    next.focus();
    setActive(tabs[index].id);
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusTab((index + 1) % tabs.length);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusTab((index - 1 + tabs.length) % tabs.length);
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      focusTab(tabs.length - 1);
    }
  };

  return (
    <div className={clsx("pixel-tabs", className)}>
      <div role="tablist" aria-label={label} className="pixel-tabs__list">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            className={clsx(
              "pixel-tabs__tab",
              active === tab.id && "is-active"
            )}
            onClick={() => setActive(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${idPrefix}-panel-${tab.id}`}
          aria-labelledby={`${idPrefix}-tab-${tab.id}`}
          hidden={active !== tab.id}
          className="pixel-tabs__panel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
