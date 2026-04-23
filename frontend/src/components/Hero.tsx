"use client";
import { useEffect, useRef } from "react";
import Shuffle from "./reactbits/Shuffle";
import BorderGlow from './reactbits/BorderGlow';
import { base } from "motion/react-client";

export default function Hero() {
  const modelRef = useRef(null);

  useEffect(() => {
    // Import library secara dinamis
    import("@google/model-viewer").catch(console.error);

    // Logic Follow Cursor (Parallax)
    const handleMouseMove = (e) => {
      if (!modelRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const baseAngle = 25; // Default menengok ke arah biodata (kiri)
      const range = 40;      // Jangkauan gerak (sensitivitas)

      // Menghitung rotasi berdasarkan posisi mouse (semakin besar angka, semakin jauh menengok)
      // Kita batasi agar tidak berputar 360 derajat, hanya sekitar kursor
      const yaw = baseAngle - (clientX / innerWidth - 0.5) * range; // Horizontal swing

      const basePitch = 75; // Posisi mata (tinggi kamera)
      const pitchRange = 20;
      const pitch = basePitch - (clientY / innerHeight - 0.5) * pitchRange; // Vertical swing (offset 75 agar dari atas)

      modelRef.current.cameraOrbit = `${yaw}deg ${pitch}deg 105%`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-10 gap-8 md:gap-12 pt-16 sm:pt-20 md:pt-0 overflow-hidden"
    >
      {/* 1. AREA MODEL 3D (KANAN DI DESKTOP) */}
      <div className="relative order-1 md:order-2 w-full md:w-[500px] h-[400px] md:h-[500px] flex justify-center items-center">
        {/* @ts-ignore */}
        <model-viewer
          ref={modelRef}
          src="/assets/linux.glb"
          alt="Linux Mascot"
          loading="eager"
          shadow-intensity="1"
          environment-preset="city"
          camera-orbit="0deg 75deg 105%"
          interaction-prompt="none"
          // "camera-controls" dihapus agar tidak bisa di-drag manual
          style={{ 
            width: '150%', 
            height: '150%', 
            outline: 'none',
            backgroundColor: 'transparent' 
          }}
        >
        </model-viewer>
        
        {/* Glow effect di belakang model */}
        <div className="absolute inset-0 bg-blue-500/5 blur-[120px] -z-10 rounded-full" />
      </div>

      {/* 2. AREA BIODATA (KIRI DI DESKTOP - TIDAK DIUBAH) */}
      <div className="flex flex-col items-start max-w-xl w-full md:w-auto order-2 md:order-1 mb-8 md:mb-0">
        <Shuffle
          text="Muhammad Bintang Panji Kusuma"
          tag="h1"
          className="text-5xl font-extrabold text-white mb-6"
          style={{
            fontFamily: "inherit",
            fontSize: "3rem",
            fontWeight: "800",
            color: "#ffffff",
            textAlign: "left",
            lineHeight: "1.2",
          }}
          shuffleDirection="right"
          duration={0.4}
          stagger={0.05}
          scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
          animationMode="evenodd"
          triggerOnHover={true}
          threshold={0.2}
          rootMargin="-50px"
          onShuffleComplete={() => console.log("Name shuffle completed!")}
        />
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Hello! I'm a
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
            {" "} Computer Engineering {" "}
          </span>
          student at
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
            {" "} Syiah Kuala University {" "}
          </span>
          with a deep passion for
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 font-semibold">
            {" "} Linux {" "}
          </span>
          , open-source technology, and system tinkering. I love experimenting
          with homelabs, container setups, and
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">
            {" "} automation {" "}
          </span>
          tools to create efficient and scalable environments that bring ideas
          to life.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 ">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#110818"
            borderRadius={20}
            glowRadius={80}
            glowIntensity={1}
            coneSpread={45}
            animated={true}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
          >
            <div className="py-3 px-5">
              <a target="_blank" rel="noopener noreferrer" href="/Sertifikat/Muhammad_Bintang_Panji_Kusuma_CV.pdf" className="text-white">
                Download CV
              </a>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}