"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
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
  
  // --- PERUBAHAN DIMULAI DI SINI ---

  // 1. State untuk melacak status perangkat mobile
  const [isMobile, setIsMobile] = useState(false);

  // 2. useEffect untuk mendeteksi ukuran layar
  useEffect(() => {
    // Fungsi untuk memeriksa dan mengatur state isMobile
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768); // Anda bisa sesuaikan breakpoint 768px
    };

    // Jalankan pengecekan saat komponen pertama kali dimuat
    checkDeviceType();

    // Tambahkan event listener untuk memantau perubahan ukuran window
    window.addEventListener("resize", checkDeviceType);

    // Cleanup: hapus event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []); // Dependensi kosong agar hanya berjalan sekali saat mount

  useEffect(() => {
    // Pastikan ScrollTrigger dan ScrollSmoother terdaftar di client-side
    // 3. Tambahkan kondisi !isMobile sebelum inisialisasi ScrollSmoother
    if (typeof window !== "undefined" && !isMobile) {
      // Inisialisasi ScrollSmoother hanya jika bukan perangkat mobile
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
          smootherInstance.current = null; // Set ke null setelah di-kill
        }
      };
    }
  }, [isMobile]); // Tambahkan isMobile sebagai dependensi

  const handleNavigation = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    
    // 4. Buat navigasi adaptif
    if (section) {
      // Jika di desktop dan ScrollSmoother aktif, gunakan GSAP
      if (smootherInstance.current && !isMobile) {
        smootherInstance.current.scrollTo(section, true);
      } else {
        // Jika di mobile, gunakan metode scroll bawaan browser
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // 5. Terapkan kelas animasi secara kondisional
  const containerClasses = `min-h-screen w-full relative overflow-hidden text-white bg-gradient-to-br from-[#0a0a0f] via-[#120b1a] to-[#0d0d13] bg-[length:400%_400%] ${!isMobile ? 'animate-gradient-x' : ''}`;
  
  // --- PERUBAHAN SELESAI DI SINI ---

  return (
    <div
      ref={smoothWrapper}
      className={containerClasses} // Menggunakan kelas yang sudah dikondisikan
    >
      {/* 6. Render komponen Background & CursorSplash secara kondisional */}
      {!isMobile && <Background />}

      <div className="fixed inset-0 pointer-events-none z-10">
        {!isMobile && <CursorSplash />}
      </div>

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