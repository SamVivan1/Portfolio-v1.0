"use client";

import React from "react";
import { FaLanguage } from "react-icons/fa";

const Languages = () => {
  return (
    <div className="p-8 mb-8 rounded-2xl bg-white/5 backdrop-blur-md backdrop-filter border border-white/10 hover:shadow-purple-600/20 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-gray-300">
      <div className="flex items-center gap-3 mb-4">
        <FaLanguage className="text-2xl text-purple-400" />
        <h3 className="text-2xl font-semibold text-purple-400">Languages</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-medium text-purple-300">Bahasa Indonesia</p>
          <p className="text-gray-400">Native proficiency</p>
        </div>
        <div>
          <p className="font-medium text-purple-300">English</p>
          <p className="text-gray-400">
            Advanced (Professional & Conversational)
          </p>
        </div>
        <div>
          <p className="font-medium text-purple-300">Japanese</p>
          <p className="text-gray-400">
            Beginner (for internship preparation)
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Languages);
