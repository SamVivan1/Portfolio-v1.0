"use client";

import React, { useMemo } from "react";
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
  SiGithub,
  SiNpm,
  SiArduino,
} from "react-icons/si";
import LogoLoop from "../reactbits/LogoLoop";

const TechStack = () => {
  const techLogos = useMemo(
    () => [
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
      { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
      { node: <SiNpm />, title: "NPM", href: "https://www.npmjs.com" },
      { node: <SiArduino />, title: "Arduino", href: "https://www.arduino.cc" },
    ],
    []
  );

  return (
    <div className="mt-10 text-center">
      <h3 className="text-3xl font-bold text-purple-400 mb-20">Tech Stack</h3>
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
  );
};

export default React.memo(TechStack);
