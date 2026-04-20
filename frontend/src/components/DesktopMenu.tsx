"use client";

import React, { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

interface DesktopMenuProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const DesktopMenu: React.FC<DesktopMenuProps> = ({ onNavigate }) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isFirstHover, setIsFirstHover] = useState(true);

  const handleMouseLeave = () => {
    setHoveredTab(null);
    setIsFirstHover(true);
  };

  const handleMouseEnter = (id: string) => {
    if (hoveredTab !== null) {
      setIsFirstHover(false);
    }
    setHoveredTab(id);
  };

  return (
    <LayoutGroup id="nav-group">
      <ul 
        className="hidden md:flex items-center space-x-1"
        onMouseLeave={handleMouseLeave}
      >
        {NAV_ITEMS.map((item) => (
          <li
            key={item.id}
            className="relative px-5 py-2.5"
            onMouseEnter={() => handleMouseEnter(item.id)}
          >
            <button
              onClick={() => onNavigate(item.id)}
              className={`relative z-10 text-sm font-bold tracking-wide transition-colors duration-500 ${
                hoveredTab === item.id ? "text-white" : "text-white/50"
              }`}
            >
              {item.label}
            </button>

            {hoveredTab === item.id && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 z-0 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                
                // Logic Zoomify & Liquid Stretch
                initial={isFirstHover ? { opacity: 0, scale: 0.7, transformOrigin: 'center' } : false}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                }}
                
                transition={{
                  // Gerakan Layout (Liquid Flow)
                  layout: {
                    type: "spring",
                    stiffness: 350, // Lebih kaku agar terasa ada 'tension'
                    damping: 35,    // Damping tinggi agar berhenti dengan lembut (seperti liquid kental)
                    restDelta: 0.001
                  },
                  // Animasi Zoom (Initial masuk)
                  opacity: { duration: 0.2 },
                  scale: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15, // Lebih bouncy sedikit saat pertama muncul
                    duration: isFirstHover ? 0.4 : 0 
                  }
                }}
                
                // Efek Squash & Stretch saat berpindah
                style={{
                   willChange: "transform, opacity",
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </LayoutGroup>
  );
};

export default React.memo(DesktopMenu);