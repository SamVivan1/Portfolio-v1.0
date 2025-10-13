import React, { useState, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

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
    },
    [onNavigate]
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="m-3 sm:m-4 md:m-5">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-3 py-3 sm:py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-filter backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-white font-bold text-[25px]">Portfolio</h1>
          </div>
          <DesktopMenu onNavigate={handleNavigate} />
          <div className="hidden md:flex items-center space-x-4 font-semibold bg-purple-600 hover:bg-purple-700 px-3 py-2 text-white rounded-2xl transition-colors duration-250">
            <a href="https://instagram.com/bintang.panjii" target="_blank">
              Contact me
            </a>
          </div>
          <button
            className="md:hidden flex items-center text-white"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {open && <MobileMenu onNavigate={handleNavigate} setOpen={setOpen} />}
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
