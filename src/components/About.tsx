"use client";

import dynamic from "next/dynamic";
import BlurText from "./reactbits/BlurText";

const Intro = dynamic(() => import("./about/Intro"));
const ContactInfo = dynamic(() => import("./about/ContactInfo"));
const ProfessionalStatus = dynamic(() => import("./about/ProfessionalStatus"));
const Education = dynamic(() => import("./about/Education"));
const ExperienceSection = dynamic(() => import("./about/ExperienceSection"));
const Languages = dynamic(() => import("./about/Languages"));
const Skills = dynamic(() => import("./about/Skills"));
const TechStack = dynamic(() => import("./about/TechStack"));

export default function About() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <BlurText
        text="About Me"
        delay={150}
        animateBy="words"
        direction="bottom"
        onAnimationComplete={handleAnimationComplete}
        className="justify-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-12 sm:mb-8 lg:mb-20 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
      />

      <Intro />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ContactInfo />
        <ProfessionalStatus />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Education />
        <ExperienceSection />
      </div>

      <Languages />

      <Skills />

      <TechStack />
    </div>
  );
}
