"use client";

import dynamic from "next/dynamic";
import Navbar from "./Navbar";

// Dynamic imports for components not needed immediately
const Hero = dynamic(() => import("./Hero"), { ssr: true });
const Skills = dynamic(() => import("./Projects"), { ssr: true });
const Experience = dynamic(() => import("./Experience"), { ssr: true });
const Background = dynamic(() => import("./Animation/Background"), {
  ssr: false,
});
const CursorSplash = dynamic(() => import("./Animation/CursorSplash"), {
  ssr: false,
});

export default function App() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden text-white bg-gradient-to-br from-[#0a0a0f] via-[#120b1a] to-[#0d0d13] bg-[length:400%_400%] animate-gradient-x">
      {/* Background layer (z-index: -20) */}
      <Background />

      {/* Cursor effect layer (z-index: 10) */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <CursorSplash />
      </div>

      {/* Konten utama (z-index: 10) */}
      <Navbar />
      <div className="relative z-20 mt-20 md:mt-0">
        <Hero />
        <Experience />
        <Skills />
      </div>
    </div>
  );
}
