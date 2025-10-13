"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer
      id="contact"
      className="relative w-full text-white py-16 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Glass full-width footer card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 w-[90%] md:w-[85%] backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl px-6 md:px-12 py-10 shadow-[0_0_50px_rgba(255,255,255,0.05)] flex flex-col items-center"
      >
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 text-center">
          Let's Connect
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-center max-w-2xl mb-8 leading-relaxed">
          Got a question, collaboration idea, or opportunity? I’d love to hear
          from you. Drop me an email or reach out through one of my platforms
          below.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 mb-8">
          {[
            {
              icon: <FaGithub />,
              url: "https://github.com/SamVivan1",
              label: "GitHub",
            },
            {
              icon: <FaLinkedin />,
              url: "https://www.linkedin.com/in/muhammad-bintang-panji-kusuma-a558b821b/",
              label: "LinkedIn",
            },
            {
              icon: <FaInstagram />,
              url: "https://instagram.com/bintang.panjii",
              label: "Instagram",
            },
            {
              icon: <FaEnvelope />,
              url: "mailto:bintangpanjik@gmail.com",
              label: "Email",
            },
          ].map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={{ scale: 1.2 }}
              className="text-2xl text-gray-400 hover:text-white transition-all"
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Copyright inside card */}
        <div className="text-center text-xs text-gray-500 tracking-wide">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-400 font-medium">
              Muhammad Bintang Panji Kusuma
            </span>{" "}
            — All Rights Reserved
          </p>
          <p className="mt-1 text-gray-600">
            Built with Next.js, TailwindCSS, and spend a lot of time
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default React.memo(Footer);
