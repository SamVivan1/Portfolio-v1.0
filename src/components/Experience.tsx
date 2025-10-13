import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import FadeContent from "./reactbits/FadeContent";
import BlurText from "./reactbits/BlurText";

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
    tag: "SOI Asia (School on Internet Asia)",
    desc: "The Understanding the Internet course offers a comprehensive introduction to the Internet, covering its historical evolution, technical foundations, operational structure, standardization processes, and the global coordination behind Internet governance.",
    certs: [
      {
        logo: "https://inxignia-admin.soi.asia/media/assertion-ee60ab39039267e51ec9d5d840e89681.png",
        name: "Certificate ",
        link: "https://inxignia.soi.asia/public/assertions/m26AYBDLRQetb77bI3XDtw",
      },
    ],
  },
  {
    year: "Dec 17, 2024",
    title: "APIE Camp",
    tag: "SOI Asia (School on Internet Asia)",
    desc: "The APIE Camp is a 5-day, onsite program that delivers a project-based, intensive curriculum focused on network design and deployment. The camp includes hands-on training in configuring switches and routers, virtualization, network security, DNS, IoT, and cloud integration.",
    certs: [
      {
        logo: "https://inxignia-admin.soi.asia/media/assertion-3776219191aacf883b39a056e7174262.png",
        name: "Certificate ",
        link: "https://inxignia.soi.asia/public/assertions/LvCIwk06SAaa8MwvHB1TdA",
      },
    ],
  },
  {
    year: "Jun 13, 2025",
    title: "Service Design",
    tag: "SOI Asia (School on Internet Asia)",
    desc: "SOI Asia Online Course: Service Design introduces what service design is and how its methodologies can support business domains and entrepreneurial challenges, with a focus on cases from Japan and around the world. Learners explore ideas that intersect with fields such as accounting, IT, marketing, and philosophy.",
    certs: [
      {
        logo: "https://inxignia-admin.soi.asia/media/uploads/badges/assertion-7x3K4JAIQNCbidRPAmdhnw.png",
        name: "Certificate ",
        link: "https://inxignia.soi.asia/public/assertions/7x3K4JAIQNCbidRPAmdhnw",
      },
    ],
  },
  {
    year: "Jul 31, 2025",
    title: "APIE Advanced Camp: Service Deployment",
    tag: "SOI Asia (School on Internet Asia)",
    desc: "The APIE Advanced Camp: Service Deployment is a 5-day intensive, in-person training program in which participants collaborate in international teams to design, deploy, and operate a prototype web service that fulfills the requirements of scalability, high availability, and security. The program features hands-on training in key technical areas, including computer architecture (containers), SQL databases, monitoring, security hardening, and the integration of these components.",
    certs: [
      {
        logo: "https://inxignia-admin.soi.asia/media/uploads/badges/assertion-9lk3kQQJSQmIch1IPTnhGw.png",
        name: "Certificate ",
        link: "https://inxignia.soi.asia/public/assertions/9lk3kQQJSQmIch1IPTnhGw",
      },
    ],
  },
  {
    year: " Aug 29, 2025",
    title: "Junior Network Administrator",
    tag: "Vocational School Graduate Academy",
    desc: "Junior Network Administrator — A training program under the Vocational School Graduate Academy – Digital Talent Scholarship 2025, based on Indonesia's National Work Competency Standards (SKKNI). Participants learn to configure and manage computer networks. Successful graduates earn a BNSP-certified Junior Network Administrator credential.",
    certs: [
      {
        logo: "https://digitalent.komdigi.go.id/assets/img/digitalent-mobile.png",
        name: "Certificate ",
        link: "/Sertifikat/Sertifikat_MUHAMMAD BINTANG PANJI KUSUMA_Junior Network Administrator.pdf",
      },
    ],
  },
];
const handleAnimationComplete = () => {
  console.log("Animation completed!");
};
export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-white"
    >
      <BlurText
        text="The Journey So Far"
        delay={150}
        animateBy="words"
        direction="bottom"
        onAnimationComplete={handleAnimationComplete}
        className="justify-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-12 sm:mb-16 lg:mb-20 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Timeline Line - hidden on mobile, visible on lg+ */}
        <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-purple-500 via-fuchsia-600 to-indigo-700 transform -translate-x-1/2 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.6)]"></div>

        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`mb-12 sm:mb-16 lg:mb-20 flex flex-col lg:flex-row items-center ${
              index % 2 === 0 ? "lg:justify-start" : "lg:justify-end"
            }`}
          >
            <FadeContent
              blur={true}
              duration={700}
              easing="ease-out"
              initialOpacity={0}
            >
              {
                <div
                  className={`backdrop-blur-md backdrop-filer relative bg-white/10 border border-white/10 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg w-full lg:w-[45%] xl:w-[42%] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] ${
                    index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
                  }`}
                >
                  {/* Tag */}
                  <span className="text-xs bg-purple-700/40 text-purple-300 px-3 py-1 rounded-full shadow-inner">
                    {exp.tag}
                  </span>

                  {/* Year + Title */}
                  <h3 className="text-purple-400 font-bold mt-3 text-sm sm:text-base lg:text-lg">
                    {exp.year}
                  </h3>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white mt-1 drop-shadow-[0_0_5px_rgba(147,51,234,0.6)]">
                    {exp.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-300 mt-3 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {exp.desc}
                  </p>

                  {/* Certificates */}
                  {exp.certs.length > 0 && (
                    <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-3">
                      {exp.certs.map((cert, i) => (
                        <a
                          key={i}
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 sm:gap-3 hover:text-purple-300 transition text-sm sm:text-base"
                        >
                          <Image
                            src={cert.logo}
                            alt={cert.name}
                            width={32}
                            height={32}
                            className="object-contain rounded-md"
                          />
                          <span className="flex items-center gap-1">
                            {cert.name}{" "}
                            <FaExternalLinkAlt
                              size={10}
                              className="sm:w-3 sm:h-3"
                            />
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              }
            </FadeContent>

            {/* Timeline Dot - hidden on mobile, visible on lg+ */}
            <div className="hidden lg:block absolute left-1/2 w-6 h-6 bg-gradient-to-tr from-fuchsia-600 to-purple-400 rounded-full transform -translate-x-1/2 shadow-[0_0_15px_rgba(168,85,247,0.7)] border border-purple-300/30"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
