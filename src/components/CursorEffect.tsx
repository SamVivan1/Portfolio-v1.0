"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export default function CursorEffect() {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState<boolean | string>(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Throttled cursor position update for better performance
  const updateCursorPosition = useCallback((e: MouseEvent) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    });
  }, []);

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    setIsHovering(true);
    // Add special effect for specific elements
    if (target.closest(".project-card") || target.closest(".hero-photo")) {
      setIsHovering("special");
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Track cursor position with throttling
    window.addEventListener("mousemove", updateCursorPosition, {
      passive: true,
    });
    window.addEventListener("mouseout", handleMouseOut);

    // Track hover states on interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .project-card, .hero-photo'
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter, {
        passive: true,
      });
      element.addEventListener("mouseleave", handleMouseLeave, {
        passive: true,
      });
    });

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("mouseout", handleMouseOut);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    updateCursorPosition,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseOut,
  ]);

  if (!isVisible) return null;

  return (
    <>
      {/* Cursor aura utama - diperbesar */}
      <div
        ref={cursorRef}
        className="cursor-trail fixed pointer-events-none z-50 transition-all duration-150 ease-out"
        style={{
          left: cursorPosition.x - 20,
          top: cursorPosition.y - 20,
          transform: isHovering ? "scale(1.6)" : "scale(1)",
        }}
      >
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/35 to-pink-500/35 blur-sm ${
            isHovering === "special" ? "animate-ping" : "animate-pulse"
          }`}
          style={{ animationDuration: "2s" }}
        ></div>
      </div>

      {/* Cursor aura kedua - lebih besar */}
      <div
        className="fixed pointer-events-none z-40 transition-all duration-200 ease-out"
        style={{
          left: cursorPosition.x - 35,
          top: cursorPosition.y - 35,
          transform: isHovering ? "scale(1.3)" : "scale(1)",
        }}
      >
        <div
          className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400/20 to-violet-400/20 blur-md animate-pulse"
          style={{ animationDelay: "0.2s", animationDuration: "3s" }}
        ></div>
      </div>

      {/* Cursor aura ketiga - terbesar */}
      <div
        className="fixed pointer-events-none z-30 transition-all duration-250 ease-out"
        style={{
          left: cursorPosition.x - 50,
          top: cursorPosition.y - 50,
          transform: isHovering ? "scale(1.1)" : "scale(1)",
        }}
      >
        <div
          className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-300/12 to-pink-300/12 blur-lg animate-pulse"
          style={{ animationDelay: "0.4s", animationDuration: "4s" }}
        ></div>
      </div>

      {/* Cursor trail effect - diperbesar */}
      <div
        className="fixed pointer-events-none z-45 transition-all duration-300 ease-out"
        style={{
          left: cursorPosition.x - 15,
          top: cursorPosition.y - 15,
          transform: isHovering ? "scale(2)" : "scale(1)",
        }}
      >
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/25 to-pink-600/25 blur-sm animate-ping"
          style={{ animationDuration: "1.5s" }}
        ></div>
      </div>

      {/* Interactive hover effect - diperbesar */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-100 ease-out"
          style={{
            left: cursorPosition.x - 25,
            top: cursorPosition.y - 25,
          }}
        >
          <div
            className={`w-16 h-16 rounded-full border-2 ${
              isHovering === "special"
                ? "border-purple-400/70 animate-spin"
                : "border-purple-400/40 animate-pulse"
            }`}
            style={{
              animationDuration: isHovering === "special" ? "1.5s" : "2.5s",
            }}
          ></div>
        </div>
      )}

      {/* Special effect for project cards and hero photo - diperbesar */}
      {isHovering === "special" && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-150 ease-out"
          style={{
            left: cursorPosition.x - 40,
            top: cursorPosition.y - 40,
          }}
        >
          <div
            className="w-24 h-24 rounded-full border border-purple-300/35 animate-spin"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute inset-3 w-18 h-18 rounded-full border border-pink-300/25 animate-spin"
            style={{ animationDuration: "2.5s", animationDirection: "reverse" }}
          ></div>
        </div>
      )}
    </>
  );
}
