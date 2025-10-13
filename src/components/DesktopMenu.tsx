"use client";

import React from "react";

interface DesktopMenuProps {
  onNavigate: (sectionId: string) => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ onNavigate }) => {
  return (
    <ul className="hidden md:flex space-x-10">
      <li className="text-gray-300 hover:text-white font-bold">
        <button onClick={() => onNavigate("hero")}>Home</button>
      </li>
      <li className="text-gray-300 hover:text-white font-bold">
        <button onClick={() => onNavigate("about")}>About</button>
      </li>
      <li className="text-gray-300 hover:text-white font-bold">
        <button onClick={() => onNavigate("experience")}>Experience</button>
      </li>
      <li className="text-gray-300 hover:text-white font-bold">
        <button onClick={() => onNavigate("projects")}>Projects</button>
      </li>
    </ul>
  );
};

export default React.memo(DesktopMenu);
