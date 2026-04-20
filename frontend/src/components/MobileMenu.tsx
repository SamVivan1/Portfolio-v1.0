"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Code, Send } from "lucide-react";

interface MobileMenuProps {
  onNavigate: (sectionId: string) => void;
  setOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onNavigate, setOpen }) => {
  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setOpen(false);
  };

  const menuItems = [
    { id: "hero", label: "Home", icon: <Home size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={18} /> },
    { id: "projects", label: "Projects", icon: <Code size={18} /> },
  ];

  return (
    <div className="w-full overflow-hidden">
      <ul className="flex flex-col gap-1 w-full">
        {menuItems.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="w-full"
          >
            <button
              onClick={() => handleNavigate(item.id)}
              className="flex items-center gap-4 w-full p-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 group"
            >
              <span className="text-purple-400 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="font-bold text-lg">{item.label}</span>
            </button>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 pt-4 border-t border-white/10"
      >
        <a
          href="https://instagram.com/bintang.panjii"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full font-bold bg-purple-600 hover:bg-purple-500 py-4 text-white rounded-xl shadow-[0_10px_20px_rgba(147,51,234,0.3)] transition-all active:scale-95"
        >
          <Send size={18} />
          Contact me
        </a>
      </motion.div>
    </div>
  );
};

export default React.memo(MobileMenu);