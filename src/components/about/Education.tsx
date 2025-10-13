"use client";

import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {
  return (
    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md backdrop-filter border border-white/10 hover:shadow-purple-600/20 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
      <div className="flex items-center gap-3 mb-4">
        <FaGraduationCap className="text-2xl text-purple-400" />
        <h3 className="text-2xl font-semibold text-purple-400">Education</h3>
      </div>
      <div className="space-y-3">
        <p className="text-gray-300 font-medium">
          Bachelor of Computer Engineering
        </p>
        <p className="text-gray-400">
          Universitas Syiah Kuala (Digital Talent Scholarship)
        </p>
        <p className="text-gray-400">2024 – Present</p>
        <p className="text-gray-400">
          Specialization: Network Administration, Web Dev, and Cloud Computing
        </p>
        <p className="text-purple-300 mt-4 font-medium">GPA: 2.9/4.0</p>
      </div>
    </div>
  );
};

export default React.memo(Education);
