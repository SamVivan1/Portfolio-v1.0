"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Mail, UserCheck, Calendar, GraduationCap, Globe2, ExternalLink } from 'lucide-react';
import BlurText from "./reactbits/BlurText";
import MagicBento from "./reactbits/MagicBento";
import TechStack from "./about/TechStack";

// --- 1. DATA DENGAN LINK ---
const ABOUT_DATA = {
  intro: {
    name: "Muhammad Bintang Panji Kusuma",
    description: "A passionate Computer Engineering student at Universitas Syiah Kuala with a deep interest in DevOps, Homelab systems, and Web Development. I love building modern interfaces with smooth animations and efficient backend systems."
  },
  contact: {
    location: "Banda Aceh, Aceh, Indonesia",
    googleMaps: "https://www.google.com/maps/search/Banda+Aceh",
    email: "bintang10panji@gmail.com",
    linkedin: "https://linkedin.com/in/muhammad-bintang-panji-kusuma-57abb32a2",
    github: "https://github.com/SamVivan1"
  },
  status: {
    availability: "Open for internship & entry-level opportunities",
    expectedGraduation: "2027 - Bachelor of Computer Engineering"
  },
  education: {
    degree: "Bachelor of Computer Engineering",
    university: "Universitas Syiah Kuala",
    universityUrl: "https://usk.ac.id",
    gpa: "GPA: 3.48/4.0"
  },
  experience: [
    {
      title: "Personal Homelab Infrastructure",
      description: "Built self-hosted setup using arr ecosystem and CasaOS with Docker orchestration.",
      link: "#" // Tambahkan link project jika ada
    },
    {
      title: "Portfolio Website Development",
      description: "Developed portfolio with Next.js + TypeScript, featuring dynamic animations.",
      link: "https://github.com/SamVivan1"
    }
  ],
  languages: [
    { name: "Bahasa Indonesia", level: "Native" },
    { name: "English", level: "Advanced" },
    { name: "Japanese", level: "Beginner" }
  ]
};

// --- 2. DEFINISI KOMPONEN INTERAKTIF ---

const Intro = () => (
  <p className="text-white text-base md:text-lg leading-relaxed">
    I'm <span className="text-purple-400 font-bold">{ABOUT_DATA.intro.name}</span>, {ABOUT_DATA.intro.description}
  </p>
);

const ContactInfo = () => (
  <div className="space-y-4 text-sm md:text-base text-gray-300">
    {/* Location */}
    <a href={ABOUT_DATA.contact.googleMaps} target="_blank" rel="noopener noreferrer" 
       className="flex items-center gap-3 hover:text-purple-400 transition-colors group">
      <MapPin size={18} className="text-purple-400 shrink-0" />
      <span>{ABOUT_DATA.contact.location}</span>
    </a>
    
    {/* Email */}
    <a href={`mailto:${ABOUT_DATA.contact.email}`} 
       className="flex items-center gap-3 hover:text-purple-400 transition-colors group">
      <Mail size={18} className="text-purple-400 shrink-0" />
      <span>{ABOUT_DATA.contact.email}</span>
    </a>

    {/* LinkedIn */}
    <a href={ABOUT_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer"
       className="flex items-center gap-3 hover:text-purple-400 transition-colors group">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 shrink-0">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
      <span className="truncate">LinkedIn Profile</span>
      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>

    {/* GitHub */}
    <a href={ABOUT_DATA.contact.github} target="_blank" rel="noopener noreferrer"
       className="flex items-center gap-3 hover:text-purple-400 transition-colors group">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 shrink-0">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
      <span>GitHub Profile</span>
      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  </div>
);

const ProfessionalStatus = () => (
  <div className="space-y-5 text-sm md:text-base text-gray-300">
    <div className="flex items-start gap-3">
      <UserCheck size={20} className="text-purple-400 shrink-0 mt-1" />
      <div>
        <p className="text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">Availability</p>
        <p>{ABOUT_DATA.status.availability}</p>
      </div>
    </div>
    <div className="flex items-start gap-3">
      <Calendar size={20} className="text-purple-400 shrink-0 mt-1" />
      <div>
        <p className="text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">Graduation</p>
        <p>{ABOUT_DATA.status.expectedGraduation}</p>
      </div>
    </div>
  </div>
);

const Education = () => (
  <div className="text-sm md:text-base text-gray-300 space-y-2">
    <div className="flex items-center gap-3 mb-2">
      <GraduationCap size={22} className="text-purple-400" />
      <p className="font-bold text-white text-lg">{ABOUT_DATA.education.degree}</p>
    </div>
    <a href={ABOUT_DATA.education.universityUrl} target="_blank" rel="noopener noreferrer"
       className="hover:text-purple-400 transition-colors flex items-center gap-2 group">
      {ABOUT_DATA.education.university}
      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
    <p className="text-purple-400 font-black text-xl mt-4">{ABOUT_DATA.education.gpa}</p>
  </div>
);

const ExperienceSection = () => (
  <div className="space-y-6 text-sm md:text-base text-gray-300">
    {ABOUT_DATA.experience.map((exp, i) => (
      <div key={i} className="relative pl-6 border-l-2 border-purple-500/20 group">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#120F17] group-hover:scale-125 transition-transform" />
        <p className="font-bold text-white text-base flex items-center gap-2">
          {exp.title}
        </p>
        <p className="mt-2 leading-relaxed opacity-80 text-sm">{exp.description}</p>
      </div>
    ))}
  </div>
);

const Languages = () => (
  <div className="space-y-4 text-sm md:text-base text-gray-300">
    <div className="flex items-center gap-2 mb-2">
      <Globe2 size={18} className="text-purple-400" />
      <span className="font-semibold uppercase text-xs tracking-widest text-purple-400">Fluency</span>
    </div>
    {ABOUT_DATA.languages.map((lang, i) => (
      <div key={i} className="flex justify-between border-b border-white/5 pb-2">
        <span className="font-bold text-white">{lang.name}</span>
        <span className="text-purple-300/80 italic text-sm">{lang.level}</span>
      </div>
    ))}
  </div>
);

export { Intro, ContactInfo, ProfessionalStatus, Education, ExperienceSection, Languages };

export default function About() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0a0a0c]" />;

  return (
    <div className="min-h-screen pt-20 pb-0 selection:bg-purple-500/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center mb-20 w-full">
          <BlurText
            text="About Me"
            delay={150}
            animateBy="words"
            direction="bottom"
            className="flex justify-center text-5xl md:text-7xl font-black text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          />
          <p className="text-gray-500 mt-6 text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
             Computer Engineering • DevOps • Fullstack
          </p>
        </div>

        <MagicBento 
          enableStars={true}
          enableSpotlight={true}
          glowColor="168, 85, 247"
          enableTilt={true}
        />
      </div>
      <TechStack/>
    </div>
  );
}