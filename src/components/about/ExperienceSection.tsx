"use client";

import React from "react";
import { FaBriefcase } from "react-icons/fa";

const Experience = () => {
  return (
    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md backdrop-filter border border-white/10 hover:shadow-purple-600/20 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
      <div className="flex items-center gap-3 mb-4">
        <FaBriefcase className="text-2xl text-purple-400" />
        <h3 className="text-2xl font-semibold text-purple-400">
          Experience & Projects
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-gray-300 font-medium">
            Personal Homelab Infrastructure
          </p>
          <p className="text-gray-400 text-sm">2024 - Present</p>
          <p className="text-gray-400 mt-1">
            Built self-hosted Netflix-like setup using arr ecosystem,
            qBittorrent, and CasaOS with Docker orchestration and AI agents for
            automation.
          </p>
        </div>
        <div>
          <p className="text-gray-300 font-medium">
            Portfolio Website Development
          </p>
          <p className="text-gray-400 text-sm">2024</p>
          <p className="text-gray-400 mt-1">
            Developed portfolio with{" "}
            <span className="text-purple-300">Next.js + TypeScript</span>,
            featuring glassmorphism design, dynamic animations, and Spotify API
            integration.
          </p>
        </div>
        <div>
          <p className="text-gray-300 font-medium">Cybersecurity Labs</p>
          <p className="text-gray-400 text-sm">2024</p>
          <p className="text-gray-400 mt-1">
            WPA3-EAP simulation, network attack-defense scenarios, and protocol
            analysis using Nmap and Wireshark.
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Experience);
