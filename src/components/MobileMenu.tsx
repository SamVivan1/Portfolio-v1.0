"use client";

import React from "react";

interface MobileMenuProps {
  onNavigate: (sectionId: string) => void;
  setOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onNavigate, setOpen }) => {
  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setOpen(false);
  };

  return (
    <div
      className={`md:hidden mt-2 rounded-2xl border border-white/20 bg-white/10 backdrop-filter backdrop-blur-md p-4 flex flex-col items-end gap-4 transition-all duration-500 ease-in-out transform`}
      style={{ willChange: "opacity, transform" }}
    >
      <ul className="flex flex-col gap-2 w-full">
        <li className="text-gray-300 hover:text-white font-bold">
          <button onClick={() => handleNavigate("hero")}>Home</button>
        </li>
        <li className="text-gray-300 hover:text-white font-bold">
          <button onClick={() => handleNavigate("about")}>About</button>
        </li>
        <li className="text-gray-300 hover:text-white font-bold">
          <button onClick={() => handleNavigate("experience")}>
            Experience
          </button>
        </li>
        <li className="text-gray-300 hover:text-white font-bold">
          <button onClick={() => handleNavigate("projects")}>Projects</button>
        </li>
      </ul>
      <button className="w-full font-semibold bg-purple-600 hover:bg-purple-700 px-3 py-2 text-white rounded-2xl transition-colors duration-250">
        Contact me
      </button>
    </div>
  );
};

export default React.memo(MobileMenu);
