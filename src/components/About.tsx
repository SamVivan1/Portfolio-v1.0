"use client";

import Image from "next/image";
import {
  FaGraduationCap,
  FaBriefcase,
  FaLanguage,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCalendarAlt,
  FaCertificate,
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFedora,
  SiUbuntu,
  SiArchlinux,
  SiDocker,
  SiNodedotjs,
  SiPython,
  SiExpress,
  SiGithub,
  SiNpm,
  SiArduino,
} from "react-icons/si";
import LogoLoop from "./reactbits/LogoLoop";
import BlurText from "./reactbits/BlurText";

export default function About() {
  const techLogos: Array<{
    node: JSX.Element;
    title: string;
    href: string;
  }> = [
    { node: <SiFedora />, title: "Fedora", href: "https://fedoraproject.org" },
    { node: <SiUbuntu />, title: "Ubuntu", href: "https://ubuntu.com" },
    {
      node: <SiArchlinux />,
      title: "Arch Linux",
      href: "https://archlinux.org",
    },
    { node: <SiDocker />, title: "Docker", href: "https://docker.com" },
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    {
      node: <SiTailwindcss />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    {
      node: <SiTypescript />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    { node: <SiPython />, title: "Python", href: "https://www.python.org" },
    { node: <SiExpress />, title: "Express.js", href: "https://expressjs.com" },
    { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
    { node: <SiNpm />, title: "NPM", href: "https://www.npmjs.com" },
    { node: <SiArduino />, title: "Arduino", href: "https://www.arduino.cc" },
  ];

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <BlurText
        text="About Me"
        delay={150}
        animateBy="words"
        direction="bottom"
        onAnimationComplete={handleAnimationComplete}
        className="justify-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-12 sm:mb-8 lg:mb-20 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
      />

      {/* Intro Section */}

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

      {/* Contact & Professional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Contact Information */}
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

        {/* Professional Status */}
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
      </div>

      {/* Education & Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Education */}
        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md backdrop-filter border border-white/10 hover:shadow-purple-600/20 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          <div className="flex items-center gap-3 mb-4">
            <FaGraduationCap className="text-2xl text-purple-400" />
            <h3 className="text-2xl font-semibold text-purple-400">
              Education
            </h3>
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
              Specialization: Network Administration, Web Dev, and Cloud
              Computing
            </p>
            <p className="text-purple-300 mt-4 font-medium">GPA: 2.9/4.0</p>
          </div>
        </div>

        {/* Experience */}
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
                qBittorrent, and CasaOS with Docker orchestration and AI agents
                for automation.
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
                featuring glassmorphism design, dynamic animations, and Spotify
                API integration.
              </p>
            </div>
            <div>
              <p className="text-gray-300 font-medium">Cybersecurity Labs</p>
              <p className="text-gray-400 text-sm">2024</p>
              <p className="text-gray-400 mt-1">
                WPA3-EAP simulation, network attack-defense scenarios, and
                protocol analysis using Nmap and Wireshark.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Languages */}
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

      {/* Key Skills & Competencies */}
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

      {/* Tech Stack */}
      <div className="mt-10 text-center">
        <h3 className="text-3xl font-bold text-purple-400 mb-8">Tech Stack</h3>
        <div
          style={{ height: "180px", position: "relative", overflow: "hidden" }}
        >
          <LogoLoop
            logos={techLogos as any}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={60}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#0b0b0b"
            ariaLabel="Tech stack logos"
          />
        </div>
      </div>
    </div>
  );
}
