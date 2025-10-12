"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      originalX: number;
      originalY: number;
    }> = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      generateParticles();
    };

    const generateParticles = () => {
      particles = [];
      const rect = canvas.getBoundingClientRect();
      const isSmallScreen = window.innerWidth < 768;
      const densityFactor = isSmallScreen ? 12000 : 8000;
      const maxParticles = isSmallScreen ? 50 : 150;
      const numParticles = Math.min(
        Math.floor((rect.width * rect.height) / densityFactor),
        maxParticles
      );
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * (isSmallScreen ? 1 : 1.5) + 0.5,
          speedX: (Math.random() - 0.5) * (isSmallScreen ? 0.1 : 0.2),
          speedY: (Math.random() - 0.5) * (isSmallScreen ? 0.1 : 0.2),
          opacity: Math.random() * 0.5 + 0.2,
          originalX: Math.random() * rect.width,
          originalY: Math.random() * rect.height,
        });
      }
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    };

    resizeCanvas();
    window.addEventListener("resize", debouncedResize);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = rect.width;
        if (p.x > rect.width) p.x = 0;
        if (p.y < 0) p.y = rect.height;
        if (p.y > rect.height) p.y = 0;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3
        );
        gradient.addColorStop(0, `rgba(168, 85, 247, ${p.opacity})`);
        gradient.addColorStop(0.7, `rgba(168, 85, 247, ${p.opacity * 0.3})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* blur ungu lembut */}
      <div className="absolute w-[600px] h-[600px] bg-purple-700/20 blur-[150px] rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-fuchsia-600/20 blur-[120px] rounded-full bottom-[0px] right-[50px] animate-[pulse_8s_ease-in-out_infinite]"></div>

      {/* canvas partikel */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      ></canvas>
    </div>
  );
}
