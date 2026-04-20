"use client";

import React from "react";

const Skills = () => {
  return (
    <div className="p-8 mb-8 rounded-2xl bg-white/5 backdrop-blur-md backdrop-filter border border-white/10 hover:shadow-purple-600/20 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
      <h3 className="text-2xl font-semibold text-purple-400 mb-6">
        Key Skills & Competencies
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
        <div>
          <p className="font-medium text-purple-300 mb-2">
            Frontend Development
          </p>
          <p className="text-sm text-gray-400">
            React, Next.js, TypeScript, Tailwind CSS
          </p>
        </div>
        <div>
          <p className="font-medium text-purple-300 mb-2">
            DevOps & Infrastructure
          </p>
          <p className="text-sm text-gray-400">
            Docker, Linux (Fedora/Ubuntu/Arch), Self-hosting, Automation
          </p>
        </div>
        <div>
          <p className="font-medium text-purple-300 mb-2">
            Cybersecurity & IoT
          </p>
          <p className="text-sm text-gray-400">
            Network Security, Pentesting, Arduino, IoT Systems
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Skills);
