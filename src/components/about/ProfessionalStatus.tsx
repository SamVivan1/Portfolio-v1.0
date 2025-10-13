"use client";

import React from "react";
import { FaCalendarAlt, FaBriefcase, FaCertificate } from "react-icons/fa";

const ProfessionalStatus = () => {
  return (
    <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md backdrop-filter border border-white/10 hover:shadow-purple-600/20 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
      <h3 className="text-2xl font-semibold text-purple-400 mb-6">
        Professional Status
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3 text-gray-300">
          <FaCalendarAlt className="text-purple-400 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="font-medium text-purple-300">Availability</p>
            <p>Open for internship & entry-level opportunities</p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-gray-300">
          <FaBriefcase className="text-purple-400 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="font-medium text-purple-300">
              Work Authorization
            </p>
            <p>Indonesian citizen, eligible for work in Indonesia</p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-gray-300">
          <FaCertificate className="text-purple-400 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="font-medium text-purple-300">
              Expected Graduation
            </p>
            <p>2027 - Bachelor of Computer Engineering</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfessionalStatus);
