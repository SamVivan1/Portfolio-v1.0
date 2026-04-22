"use client";

import React from "react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import BlurText from "./reactbits/BlurText";
import FadeContent from "./reactbits/FadeContent";

// --- DATA EXPERIENCE ---
interface Certificate {
  logo: string;
  name: string;
  link: string;
}

interface Experience {
  year: string;
  title: string;
  tag: string;
  desc: string;
  certs: Certificate[];
}

const experiences: Experience[] = [
  {
    year: "May 30, 2024",
    title: "Understanding the Internet",
    tag: "SOI Asia",
    desc: "Comprehensive introduction to the Internet, covering evolution, technical foundations, and global coordination.",
    certs: [
      {
        logo: "https://inxignia-admin.soi.asia/media/assertion-ee60ab39039267e51ec9d5d840e89681.png",
        name: "Certificate",
        link: "https://inxignia.soi.asia/public/assertions/m26AYBDLRQetb77bI3XDtw",
      },
    ],
  },
  {
    year: "Dec 17, 2024",
    title: "APIE Camp",
    tag: "SOI Asia",
    desc: "5-day intensive program focused on network design, deployment, and hands-on training in configuring hardware.",
    certs: [
      {
        logo: "https://inxignia-admin.soi.asia/media/assertion-3776219191aacf883b39a056e7174262.png",
        name: "Certificate",
        link: "https://inxignia.soi.asia/public/assertions/LvCIwk06SAaa8MwvHB1TdA",
      },
    ],
  },
  {
    year: "Jun 13, 2025",
    title: "Service Design",
    tag: "SOI Asia",
    desc: "Exploration of service design methodologies to support business domains and entrepreneurial challenges.",
    certs: [
      {
        logo: "https://inxignia-admin.soi.asia/media/uploads/badges/assertion-7x3K4JAIQNCbidRPAmdhnw.png",
        name: "Certificate",
        link: "https://inxignia.soi.asia/public/assertions/7x3K4JAIQNCbidRPAmdhnw",
      },
    ],
  },
  {
    year: "Jul 31, 2025",
    title: "APIE Advanced Camp",
    tag: "SOI Asia",
    desc: "International collaboration to design, deploy, and operate prototype web services for scalability and security.",
    certs: [
      {
        logo: "https://inxignia-admin.soi.asia/media/uploads/badges/assertion-9lk3kQQJSQmIch1IPTnhGw.png",
        name: "Certificate",
        link: "https://inxignia.soi.asia/public/assertions/9lk3kQQJSQmIch1IPTnhGw",
      },
    ],
  },
  {
    year: "Aug 29, 2025",
    title: "Junior Network Administrator",
    tag: "VSGA - DTS",
    desc: "BNSP-certified program based on SKKNI standards for configuring and managing computer networks.",
    certs: [
      {
        logo: "https://digitalent.komdigi.go.id/assets/img/digitalent-mobile.png",
        name: "Certificate",
        link: "/Sertifikat/Sertifikat_MUHAMMAD BINTANG PANJI KUSUMA_Junior Network Administrator.pdf",
      },
    ],
  },
];

// --- SUB-COMPONENT: TIMELINE CARD ---
const TimelineCard = ({ item, index }: { item: Experience; index: number }) => (
  <div className="relative group pl-8 pb-12 last:pb-0">
    {/* Garis Vertikal Timeline (Penghubung antar dot) */}
    <div className="absolute left-[11px] top-2 h-full w-[2px] bg-gradient-to-b from-purple-500/50 via-fuchsia-500/20 to-transparent group-last:h-8" />
    
    {/* Dot Timeline */}
    <div className="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-125 transition-transform duration-300">
      <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
    </div>

    <FadeContent delay={index * 100}>
      <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 p-6 rounded-2xl hover:bg-white/[0.07] hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg border border-purple-500/30">
            {item.tag}
          </span>
          <span className="text-xs font-mono text-gray-400">{item.year}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
          {item.title}
        </h3>

        <p className="mt-3 text-gray-400 text-sm md:text-base leading-relaxed">
          {item.desc}
        </p>

        {/* Certificates */}
        <div className="mt-6 flex flex-wrap gap-3">
          {item.certs.map((cert, i) => (
            <a
              key={i}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/5 border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-xs text-gray-300 hover:text-white"
            >
              <Image src={cert.logo} alt="badge" width={18} height={18} className="object-contain" />
              <span>View Credential</span>
              <FaExternalLinkAlt size={10} className="text-purple-500" />
            </a>
          ))}
        </div>
      </div>
    </FadeContent>
  </div>
);

export default function ProfessionalTimeline() {
  // Bagi data menjadi dua kolom untuk Desktop
  const leftCol = experiences.filter((_, i) => i % 2 === 0);
  const rightCol = experiences.filter((_, i) => i % 2 !== 0);

  return (
    <section id="experience" className="relative py-24 px-6 min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Animasi */}
        <div className="mb-20 text-center w-full flex flex-col items-center justify-center">
          <BlurText
            text="Professional Journey"
            className="text-4xl md:text-6xl font-black text-center text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          />
        </div>

        {/* Grid Container (2 Kolom di Desktop, 1 Kolom di Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0 items-start">
          
          {/* Kolom Kiri */}
          <div className="flex flex-col">
            {leftCol.map((item, idx) => (
              <TimelineCard key={idx} item={item} index={idx} />
            ))}
          </div>

          {/* Kolom Kanan */}
          <div className="flex flex-col lg:mt-20"> {/* Offset sedikit agar tidak sejajar kaku */}
            {rightCol.map((item, idx) => (
              <TimelineCard key={idx} item={item} index={idx} />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}