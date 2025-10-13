"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import Navbar from "./Navbar";

// Dynamic imports for components not needed immediately
const Hero = dynamic(() => import("./Hero"), { ssr: true });
const Projects = dynamic(() => import("./Projects"), { ssr: true });
const Experience = dynamic(() => import("./Experience"), { ssr: true });
const Background = dynamic(() => import("./reactbits/Background"), {
  ssr: false,
});
const CursorSplash = dynamic(() => import("./reactbits/CursorSplash"), {
  ssr: false,
});
const Footer = dynamic(() => import("./Footer"), { ssr: true });

const About = dynamic(() => import("./About"), { ssr: true });
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type ScrollSmootherInstance = ReturnType<typeof ScrollSmoother.create>;

export default function App() {
  const smoothWrapper = useRef<HTMLDivElement>(null);
  const smoothContent = useRef<HTMLDivElement>(null);
  const smootherInstance = useRef<ScrollSmootherInstance | null>(null);

  useEffect(() => {
    // Pastikan ScrollTrigger dan ScrollSmoother terdaftar di client-side
    if (typeof window !== "undefined") {
      // Inisialisasi ScrollSmoother
      smootherInstance.current = ScrollSmoother.create({
        wrapper: smoothWrapper.current!,
        content: smoothContent.current!,
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      });

      return () => {
        if (smootherInstance.current) {
          smootherInstance.current.kill();
        }
      };
    }
  }, []);

  const handleNavigation = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section && smootherInstance.current) {
      smootherInstance.current.scrollTo(section, true);
    }
  };

  return (
    <div
      ref={smoothWrapper}
      className="min-h-screen w-full relative overflow-hidden text-white bg-gradient-to-br from-[#0a0a0f] via-[#120b1a] to-[#0d0d13] bg-[length:400%_400%] animate-gradient-x"
    >
      {/* Background layer (z-index: -20) */}
      <Background />

      {/* Cursor effect layer (z-index: 10) */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <CursorSplash />
      </div>

      {/* Konten utama (z-index: 10) */}
      <Navbar onNavigate={handleNavigation} />
      <div ref={smoothContent} className="relative z-20 mt-20 md:mt-0">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="footer">
          <Footer />
        </section>
      </div>
    </div>
  );
}
