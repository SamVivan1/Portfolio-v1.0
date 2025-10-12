"use client";

import { useEffect, useRef } from "react";
import Hero from "./Hero";
import Navbar from "./Navbar";
import About from "./About";
import Footer from "./Footer";
import Skills from "./Projects";
import Experience from "./Experience";
import CursorEffect from "./CursorEffect";

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
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

      // Regenerate particles with new dimensions
      generateParticles();
    };

    const generateParticles = () => {
      particles = [];
      const rect = canvas.getBoundingClientRect();
      const numParticles = Math.floor((rect.width * rect.height) / 8000); // Responsive particle count

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * 1.5 + 0.5, // Smaller base size
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.2, // Lower opacity for better performance
          originalX: Math.random() * rect.width,
          originalY: Math.random() * rect.height,
        });
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.forEach((p) => {
        // Smooth movement with boundary checking
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around screen instead of bouncing for smoother effect
        if (p.x < 0) p.x = rect.width;
        if (p.x > rect.width) p.x = 0;
        if (p.y < 0) p.y = rect.height;
        if (p.y > rect.height) p.y = 0;

        // Create gradient with consistent size
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3 // Reduced multiplier for better performance
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
    <div className="min-h-screen w-full relative overflow-hidden text-white bg-gradient-to-br from-[#0a0a0f] via-[#120b1a] to-[#0d0d13] bg-[length:400%_400%] animate-gradient-x">
      {/* efek blur ungu lembut */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-purple-700/20 blur-[150px] rounded-full top-[-100px] left-[-100px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-fuchsia-600/20 blur-[120px] rounded-full bottom-[0px] right-[50px] animate-[pulse_8s_ease-in-out_infinite]"></div>
      </div>
      {/* Canvas partikel */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      ></canvas>

      {/* Konten utama */}
      <Navbar />
      <div className="relative z-10 mt-20 md:mt-0">
        <Hero />
        <Experience />
        <Skills />
      </div>

      {/* Cursor Effect */}
      <CursorEffect />
    </div>
  );
}
