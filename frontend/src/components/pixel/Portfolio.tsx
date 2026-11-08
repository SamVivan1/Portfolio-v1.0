"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CHAPTERS } from "../../data/portfolio";
import {
  chapterForProgress,
  progressForChapter,
  progressFromScroll,
  scrollToChapter,
} from "../../lib/chapters";
import { useReducedMotion } from "../../hooks/useMotionPreference";
import CommandPalette from "./CommandPalette";
import DeskContent from "./chapters/DeskContent";
import RackContent from "./chapters/RackContent";
import RoofContent from "./chapters/RoofContent";
import WorkshopContent from "./chapters/WorkshopContent";
import Hud from "./Hud";
import PixelStage from "./PixelStage";
import QuickView from "./QuickView";
import PixelPanel from "./ui/PixelPanel";

export default function Portfolio() {
  const reduced = useReducedMotion();
  const progressRef = useRef(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activePanel, setActivePanel] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const syncScroll = useCallback(() => {
    const progress = progressFromScroll();
    progressRef.current = progress;
    document.documentElement.style.setProperty(
      "--scroll-progress",
      progress.toFixed(4)
    );

    const panel = CHAPTERS.findIndex(
      (chapter) =>
        progress >= chapter.scroll[0] && progress <= chapter.scroll[1]
    );
    setActivePanel(panel);

    const chapter = chapterForProgress(progress);
    setActiveChapter((current) => (current === chapter ? current : chapter));
    const hash = `#${CHAPTERS[chapter].id}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }, []);

  useLayoutEffect(() => {
    if (reduced) return;

    const initialHash = window.location.hash.replace("#", "");
    const initialIndex = CHAPTERS.findIndex(
      (chapter) => chapter.id === initialHash
    );

    const applyInitialChapter = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (initialIndex > 0 && max > 0) {
        window.scrollTo(0, progressForChapter(initialIndex) * max);
      }
      syncScroll();
    };

    applyInitialChapter();
    const frame = window.requestAnimationFrame(applyInitialChapter);
    return () => window.cancelAnimationFrame(frame);
  }, [reduced, syncScroll]);

  useEffect(() => {
    if (reduced) return;

    const onScroll = () => syncScroll();
    const onResize = () => syncScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, syncScroll]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setQuickViewOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = useCallback(
    (index: number) => {
      const target = index < 0 ? 0 : index;
      scrollToChapter(target, reduced);
      setActiveChapter(target);
      setActivePanel(target);
      window.history.replaceState(null, "", `#${CHAPTERS[target].id}`);
    },
    [reduced]
  );

  if (reduced) return null;

  return (
    <div className="cinematic-shell">
      <div className="scroll-track" aria-hidden="true" />

      <div className="pixel-stage">
        <PixelStage
          progressRef={progressRef}
          activeChapter={activeChapter}
        />
        <div className="stage-vignette" aria-hidden="true" />
        <div className="stage-scanlines" aria-hidden="true" />
      </div>

      <button
        type="button"
        className="skip-link"
        onClick={() => setQuickViewOpen(true)}
      >
        Skip the journey — open the resume
      </button>

      <Hud
        activeChapter={activeChapter}
        onNavigate={navigate}
        onQuickView={() => setQuickViewOpen(true)}
        onCommand={() => setPaletteOpen(true)}
      />

      <main className="chapter-stage" id="main-content">
        <PixelPanel
          id="desk"
          title="SPAWN POINT"
          meta="01 / 04"
          side="left"
          active={activePanel === 0}
          footer={<span className="panel-footnote">The desk · Banda Aceh</span>}
        >
          <DeskContent
            onQuickView={() => setQuickViewOpen(true)}
            onNext={() => navigate(1)}
          />
        </PixelPanel>

        <PixelPanel
          id="rack"
          title="THE RACK"
          meta="02 / 04"
          side="right"
          active={activePanel === 1}
          footer={
            <span className="panel-footnote">
              Self-hosted · Docker · CasaOS · n8n
            </span>
          }
        >
          <RackContent
            onQuickView={() => setQuickViewOpen(true)}
            onNext={() => navigate(2)}
          />
        </PixelPanel>

        <PixelPanel
          id="workshop"
          title="THE WORKSHOP"
          meta="03 / 04"
          side="left"
          active={activePanel === 2}
          className="chapter-panel--wide"
          footer={
            <span className="panel-footnote">
              GitHub live data · ProtoPrime3D
            </span>
          }
        >
          <WorkshopContent idPrefix="cinematic" />
        </PixelPanel>

        <PixelPanel
          id="roof"
          title="THE ROOF"
          meta="04 / 04"
          side="right"
          active={activePanel === 3}
          footer={
            <span className="panel-footnote">
              Banda Aceh · UTC+7 · open to remote
            </span>
          }
        >
          <RoofContent onTop={() => navigate(0)} />
        </PixelPanel>
      </main>

      <div className="scroll-cue" aria-hidden="true">
        <span>scroll to walk</span>
        <span className="scroll-cue__arrow">↓</span>
      </div>

      <p className="sr-only" aria-live="polite">
        Chapter {activeChapter + 1} of {CHAPTERS.length}:{" "}
        {CHAPTERS[activeChapter].label}
      </p>

      <QuickView
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigate}
        onQuickView={() => setQuickViewOpen(true)}
      />
    </div>
  );
}
