"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { CHAPTERS } from "../../data/portfolio";
import { CaseStudy } from "../../data/caseStudies";
import {
  chapterForProgress,
  progressForChapter,
  progressFromScroll,
  scrollToChapter,
} from "../../lib/chapters";
import { useReducedMotion } from "../../hooks/useMotionPreference";
import { useAmbientSound } from "../../hooks/useAmbientSound";
import { track } from "../../lib/analytics";
import CommandPalette from "./CommandPalette";
import DeskContent from "./chapters/DeskContent";
import HomelabContent from "./chapters/HomelabContent";
import RoofContent from "./chapters/RoofContent";
import WorkshopContent from "./chapters/WorkshopContent";
import Hud from "./Hud";
import PixelStage from "./PixelStage";
import QuickView from "./QuickView";
import CaseStudyDialog from "./pages/CaseStudyDialog";
import HomelabDialog from "./pages/HomelabDialog";
import PixelPanel from "./ui/PixelPanel";

export default function Portfolio() {
  const reduced = useReducedMotion();
  const progressRef = useRef(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activePanel, setActivePanel] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(
    null
  );
  const [architectureOpen, setArchitectureOpen] = useState(false);
  const {
    audioRef,
    enabled: soundEnabled,
    started: soundStarted,
    toggle: toggleSound,
  } = useAmbientSound();

  const openQuickView = useCallback(() => {
    track("quickview_open");
    setQuickViewOpen(true);
  }, []);

  const openPalette = useCallback(() => {
    track("palette_open");
    setPaletteOpen(true);
  }, []);

  const openCaseStudy = useCallback((study: CaseStudy) => {
    track("case_study_open", { slug: study.slug });
    setActiveCaseStudy(study);
  }, []);

  const openArchitecture = useCallback(() => {
    track("homelab_architecture_open");
    setArchitectureOpen(true);
  }, []);

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
    if (activeChapter === 1) track("homelab_view");
  }, [activeChapter]);

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

      <audio
        ref={audioRef}
        src="/assets/audio/homelab-night.mp3"
        loop
        preload="none"
        aria-hidden="true"
      />

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
        onClick={openQuickView}
      >
        Skip the journey — open the resume
      </button>

      <Hud
        activeChapter={activeChapter}
        onNavigate={navigate}
        onQuickView={openQuickView}
        onCommand={openPalette}
        soundEnabled={soundEnabled}
        soundStarted={soundStarted}
        onToggleSound={toggleSound}
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
            onQuickView={openQuickView}
            onNext={() => navigate(1)}
          />
        </PixelPanel>

        <PixelPanel
          id="homelab"
          title="THE HOMELAB"
          meta="02 / 04"
          side="right"
          active={activePanel === 1}
          footer={
            <span className="panel-footnote">
              Ubuntu 26.04 LTS · Docker · Jellyfin · n8n
            </span>
          }
        >
          <HomelabContent
            onQuickView={openQuickView}
            onOpenArchitecture={openArchitecture}
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
          <WorkshopContent
            idPrefix="cinematic"
            onOpenCaseStudy={openCaseStudy}
          />
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
        onQuickView={openQuickView}
      />
      <CaseStudyDialog
        study={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
      <HomelabDialog
        open={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
      />
    </div>
  );
}
