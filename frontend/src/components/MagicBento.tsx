"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';

// PERBAIKAN: Cara memanggil Named Exports dengan dynamic import
const Intro = dynamic(() => import('./About').then(mod => mod.Intro), { ssr: false });
const ContactInfo = dynamic(() => import('./About').then(mod => mod.ContactInfo), { ssr: false });
const ProfessionalStatus = dynamic(() => import('./About').then(mod => mod.ProfessionalStatus), { ssr: false });
const Education = dynamic(() => import('./About').then(mod => mod.Education), { ssr: false });
const ExperienceSection = dynamic(() => import('./About').then(mod => mod.ExperienceSection), { ssr: false });
const Languages = dynamic(() => import('./About').then(mod => mod.Languages), { ssr: false });
export interface BentoProps {
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '168, 85, 247'; // Menggunakan ungu sesuai tema Anda
const MOBILE_BREAKPOINT = 768;

// --- Helper: Particle Creation ---
const createParticleElement = (x: number, y: number, color: string): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute; width: 4px; height: 4px; border-radius: 50%;
    background: rgba(${color}, 1); box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none; z-index: 100; left: ${x}px; top: ${y}px;
  `;
  return el;
};

// --- Sub-Component: ParticleCard ---
const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children, className = '', disableAnimations = false, style,
  particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true, enableMagnetism = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach(p => p.remove());
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const p = createParticleElement(Math.random() * width, Math.random() * height, glowColor);
        cardRef.current.appendChild(p);
        particlesRef.current.push(p);

        gsap.fromTo(p, { scale: 0, opacity: 0 }, { 
          scale: 1, opacity: 1, duration: 0.3, 
          onComplete: () => {
            gsap.to(p, {
              x: "+=" + (Math.random() - 0.5) * 50,
              y: "+=" + (Math.random() - 0.5) * 50,
              duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut"
            });
          }
        });
      }, i * 150);
      timeoutsRef.current.push(timeoutId);
    }
  }, [particleCount, glowColor]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || disableAnimations) return;

    const onEnter = () => { isHoveredRef.current = true; animateParticles(); };
    const onLeave = () => { 
      isHoveredRef.current = false; 
      clearAllParticles();
      gsap.to(el, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.5 });
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        gsap.to(el, {
          rotateX: ((y - centerY) / centerY) * -10,
          rotateY: ((x - centerX) / centerX) * 10,
          duration: 0.2
        });
      }
      if (enableMagnetism) {
        gsap.to(el, { x: (x - centerX) * 0.1, y: (y - centerY) * 0.1, duration: 0.3 });
      }
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      clearAllParticles();
    };
  }, [disableAnimations, animateParticles, clearAllParticles, enableTilt, enableMagnetism]);

  return <div ref={cardRef} className={`${className} relative overflow-hidden`} style={style}>{children}</div>;
};

// --- Sub-Component: GlobalSpotlight ---
const GlobalSpotlight: React.FC<{ gridRef: React.RefObject<HTMLDivElement | null>; glowColor: string; radius: number; }> = ({ gridRef, glowColor, radius }) => {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll('.card');
      cards.forEach(card => {
        const c = card as HTMLElement;
        const rect = c.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const dist = Math.hypot(e.clientX - (rect.left + rect.width/2), e.clientY - (rect.top + rect.height/2));
        
        c.style.setProperty('--glow-x', `${x}%`);
        c.style.setProperty('--glow-y', `${y}%`);
        c.style.setProperty('--glow-intensity', dist < radius ? "1" : "0");
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [gridRef, radius]);
  return null;
};

const MagicBento: React.FC<BentoProps> = ({
  enableStars = true, enableSpotlight = true, enableBorderGlow = true,
  disableAnimations = false, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT, enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR, enableMagnetism = true
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mapping komponen di dalam body fungsi untuk memastikan sub-komponen sudah termuat
  const BENTO_COMPONENTS = [
    { label: "Overview", component: <Intro />, color: '#120F17' },
    { label: "Connect", component: <ContactInfo />, color: '#120F17' },
    { label: "Status", component: <ProfessionalStatus />, color: '#120F17' },
    { label: "Education", component: <Education />, color: '#120F17' },
    { label: "Journey", component: <ExperienceSection />, color: '#120F17' },
    { label: "Languages", component: <Languages />, color: '#120F17' },
  ];

  if (!mounted) return <div className="min-h-[600px]" />; // Placeholder saat hidrasi

  return (
    <div className="bento-section w-full max-w-6xl mx-auto p-4" ref={gridRef}>
      <style>{`
        .bento-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 1rem; }
        @media (min-width: 768px) { .bento-grid { grid-template-columns: repeat(4, 1fr); } }
        .card { 
          background: #120F17; border: 1px solid rgba(255,255,255,0.08); 
          border-radius: 28px; min-height: 280px; position: relative; transition: border 0.3s;
        }
        .card:hover { border-color: rgba(${glowColor}, 0.5); }
        .card--border-glow::after {
          content: ''; position: absolute; inset: 0; padding: 1.5px; border-radius: inherit;
          background: radial-gradient(${spotlightRadius}px circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, var(--glow-intensity)), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: exclude; pointer-events: none;
        }
        @media (min-width: 1024px) {
          .card:nth-child(1) { grid-column: span 2; }
          .card:nth-child(5) { grid-column: span 2; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(${glowColor}, 0.3); border-radius: 10px; }
      `}</style>

      {enableSpotlight && <GlobalSpotlight gridRef={gridRef} glowColor={glowColor} radius={spotlightRadius} />}

      <div className="bento-grid">
        {BENTO_COMPONENTS.map((item, index) => (
          <ParticleCard
            key={index}
            className={`card p-7 ${enableBorderGlow ? 'card--border-glow' : ''}`}
            disableAnimations={disableAnimations}
            particleCount={particleCount}
            glowColor={glowColor}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
          >
            <div className="relative z-10 h-full flex flex-col">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-purple-500/70 mb-5">
                {item.label}
              </span>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                {item.component}
              </div>
            </div>
          </ParticleCard>
        ))}
      </div>
    </div>
  );
};

export default MagicBento;