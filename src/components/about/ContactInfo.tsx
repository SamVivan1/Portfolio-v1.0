"use client";

import React from "react";
import { FaMapMarkerAlt, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md backdrop-filter border border-white/10 hover:shadow-purple-600/20 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
      <h3 className="text-2xl font-semibold text-purple-400 mb-6">
        Contact Information
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-300">
          <FaMapMarkerAlt className="text-purple-400 text-xl flex-shrink-0" />
          <span>Banda Aceh, Aceh, Indonesia</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <FaEnvelope className="text-purple-400 text-xl flex-shrink-0" />
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=bintang10panji@gmail.com"
            className="hover:text-purple-300 transition-colors"
          >
            bintang10panji@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-3 text-gray-300">
          <FaLinkedin className="text-purple-400 text-xl flex-shrink-0" />
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/muhammad-bintang-panji-kusuma-57abb32a2"
            className="hover:text-purple-300 transition-colors break-all"
          >
            linkedin.com/in/muhammad-bintang-panji-kusuma-57abb32a2
          </a>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <FaGithub className="text-purple-400 text-xl flex-shrink-0" />
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/SamVivan1"
            className="hover:text-purple-300 transition-colors"
          >
            github.com/SamVivan1
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContactInfo);
