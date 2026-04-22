"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const GlassSurface = dynamic(() => import("./reactbits/GlassSurface"), { ssr: false });
const DesktopMenu = dynamic(() => import("./DesktopMenu"));
const MobileMenu = dynamic(() => import("./MobileMenu"));

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      onNavigate(sectionId);
      setOpen(false);
    },
    [onNavigate]
  );

  return (
    // Gunakan pointer-events-none di container luar agar tidak memblokir klik di area kosong
    <nav className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <div className="m-3 sm:m-4 md:m-5 pointer-events-auto">
        <GlassSurface
          width="100%" 
          height="auto"
          borderRadius={24} // Sedikit dikecilkan untuk mobile agar tidak terlalu bulat
          opacity={0.93}
          backgroundOpacity={0.1}
          blur={11}
          brightness={50}
          saturation={1}
          greenOffset={10}
          blueOffset={20}
          displace={0.5}
          distortionScale={-180}
          borderWidth={0.07}
          className="relative px-4 py-1 sm:py-2 border border-white/10"
        >
          {/* Container diketatkan min-height-nya untuk mobile agar tidak memakan banyak tempat */}
          <div className="flex justify-between items-center w-full min-h-[50px] md:min-h-[60px]">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={40} // Ukuran logo mobile lebih kecil
                height={30}
                className="shadow-lg md:w-[40px] md:h-[30px]"
              />
              <h1 className="text-white font-black text-[18px] md:text-[22px] tracking-tight">
                Portfolio
              </h1>
            </div>

            <DesktopMenu onNavigate={handleNavigate} />

            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center font-bold bg-white px-6 py-2.5 text-black rounded-full transition-shadow hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              <a href="https://instagram.com/bintang.panjii" target="_blank" rel="noopener noreferrer">
                Contact me
              </a>
            </motion.div>

            <button
              className="md:hidden flex items-center text-white p-2"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              <motion.div
                animate={open ? { rotate: 90 } : { rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {/* Icon Burger lebih proporsional */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2.5" 
                    d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </motion.div>
            </button>
          </div>
        </GlassSurface>

        {/* Mobile Menu - Diberikan jarak yang cukup dari Navbar utama */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2" // Jarak antar navbar dan menu drop-down
            >
              <GlassSurface 
                width="100%" 
                height="auto" 
                borderRadius={20} 
                displace={0.2} 
                opacity={0.8} // Ditingkatkan agar konten menu mobile lebih terbaca
                blur={40}
              >
                 <div className="p-4">
                    <MobileMenu onNavigate={handleNavigate} setOpen={setOpen} />
                 </div>
              </GlassSurface>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);