"use client";

import React from "react";

const Intro = () => {
  return (
    <div className="p-8 mb-8 rounded-2xl bg-white/5 backdrop-blur-md backdrop-filter border border-white/10 hover:shadow-purple-600/20 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-gray-300 shadow-lg">
      <p className="leading-relaxed text-lg sm:text-xl text-center max-w-3xl mx-auto">
        I'm{" "}
        <span className="text-purple-400 font-semibold">
          Muhammad Bintang Panji Kusuma
        </span>
        , a passionate{" "}
        <span className="text-purple-300">Computer Engineering student</span>{" "}
        with a deep interest in{" "}
        <span className="text-purple-300">
          DevOps, Homelab systems, and Web Development
        </span>
        . I love building modern interfaces with smooth animations and
        efficient backend systems. Currently, I'm exploring cloud-native
        deployments, Docker, and automation in self-hosted environments.
      </p>
    </div>
  );
};

export default React.memo(Intro);
