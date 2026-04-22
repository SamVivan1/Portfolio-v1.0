"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Registrasi Plugin GSAP
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Dynamic imports
const Hero = dynamic(() => import("./Hero"), { ssr: true });
const Projects = dynamic(() => import("./Projects"), { ssr: true });
const Experience = dynamic(() => import("./Experience"), { ssr: true });
const About = dynamic(() => import("./About"), { ssr: true });
const Footer = dynamic(() => import("./Footer"), { ssr: true });

// Plasma harus client-side only karena menggunakan WebGL/OGL
const Plasma = dynamic(() => import("./reactbits/Plasma"), {
  ssr: false,
});

type ScrollSmootherInstance = ReturnType<typeof ScrollSmoother.create>;

export default function App() {
  const smoothWrapper = useRef<HTMLDivElement>(null);
  const smoothContent = useRef<HTMLDivElement>(null);
  const smootherInstance = useRef<ScrollSmootherInstance | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Deteksi Perangkat (Mobile vs Desktop)
  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  // 2. Inisialisasi ScrollSmoother (Hanya Desktop)
  useEffect(() => {
    if (typeof window !== "undefined" && !isMobile) {
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
          smootherInstance.current = null;
        }
      };
    }
  }, [isMobile]);

  // 3. Logic Navigasi Adaptif
  const handleNavigation = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      if (smootherInstance.current && !isMobile) {
        smootherInstance.current.scrollTo(section, true);
      } else {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    /**
     * WRAPPER UTAMA
     * bg-[#050505] sebagai fallback jika shader gagal load
     */
    <div
      ref={smoothWrapper}
      className="min-h-screen w-full relative text-white bg-[#050505] overflow-x-hidden"
    >
      {/* LAYER 0: PLASMA BACKGROUND (Fixed)
        Menggunakan z-[-1] agar berada di belakang smooth-content
      */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {(!isMobile) && (
          <Plasma 
            color="#6366f1" // Indigo/Purple vibes
            speed={1.5} 
            scale={1} 
            opacity={1} 
            mouseInteractive={true}
          />
        )}
      </div>

      {/* LAYER 1: NAVBAR (Fixed)
        Harus di luar smooth-content agar tidak ikut ter-scroll
      */}
      <Navbar onNavigate={handleNavigation} />

      {/* LAYER 2: SCROLL CONTENT
        bg-transparent adalah KUNCI agar Plasma terlihat.
      */}
      <div 
        ref={smoothContent} 
        className="relative z-10 w-full flex flex-col bg-transparent"
      >
        <section id="hero" className="min-h-screen flex items-center justify-center">
          <Hero />
        </section>
        
        <section id="about" className="py-20">
          <About />
        </section>
        
        <section id="experience" className="py-20">
          <Experience/>
        </section>
        
        <section id="projects" className="py-20">
          <Projects />
        </section>
        
        <section id="footer">
          <Footer />
        </section>
      </div>
    </div>
  );
}