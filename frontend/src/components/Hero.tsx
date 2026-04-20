import Image from "next/image";
import Shuffle from "./reactbits/Shuffle";
import BorderGlow from './reactbits/BorderGlow';
import ProfileCard from "./reactbits/ProfileCard";


export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-30 flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-10 gap-8 md:gap-12 pt-16 sm:pt-20 md:pt-0"
    >
      {/* Foto: Tampil di atas pada mobile, di kanan pada desktop */}
      <div className="relative order-1 md:order-2 mx-auto md:mx-0 group mt-0 md:mt-0">
        
        {/* Aura lama kamu (opsional, bisa dibuang jika ProfileCard sudah cukup pendar) */}
      

        {/* 4. Ganti container foto lama dengan ProfileCard */}
    <ProfileCard
  name="SamVivan"
  title="Computer Engineering Student"
  handle="bintang.panjii"
  status="Available for projects"
  contactText="Contact Me"
  avatarUrl="./assets/profilecard.png"
  showUserInfo
  enableTilt={true}
  enableMobileTilt
  onContactClick={() => window.open('https://instagram.com/bintang.panjii', '_blank')}
  behindGlowColor="rgba(125, 190, 255, 0.67)"
  iconUrl="/assets/iconpattern.png"
  behindGlowEnabled
  innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
/>
      </div>

      {/* Bio: Tampil di bawah pada mobile, di kiri pada desktop */}
      <div className="flex flex-col items-start max-w-xl w-full md:w-auto order-2 md:order-1 mb-8 md:mb-0">
        <Shuffle
          text="Muhammad Bintang Panji Kusuma"
          tag="h1"
          className="text-5xl font-extrabold text-white mb-6"
          style={{
            fontFamily: "inherit",
            fontSize: "3rem",
            fontWeight: "800",
            color: "#ffffff",
            textAlign: "left",
            lineHeight: "1.2",
          }}
          shuffleDirection="right"
          duration={0.4}
          stagger={0.05}
          scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
          animationMode="evenodd"
          triggerOnHover={true}
          threshold={0.2}
          rootMargin="-50px"
          onShuffleComplete={() => console.log("Name shuffle completed!")}
        />
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Hello! I'm a
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">
            {" "}
            Computer Engineering{" "}
          </span>
          student at
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold">
            {" "}
            Syiah Kuala University{" "}
          </span>
          with a deep passion for
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 font-semibold">
            {" "}
            Linux{" "}
          </span>
          , open-source technology, and system tinkering. I love experimenting
          with homelabs, container setups, and
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold">
            {" "}
            automation{" "}
          </span>
          tools to create efficient and scalable environments that bring ideas
          to life.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 ">
          <BorderGlow
  edgeSensitivity={30}
  glowColor="40 80 80"
  backgroundColor="#110818"
  borderRadius={20}
  glowRadius={80}
  glowIntensity={1}
  coneSpread={45}
  animated={true}
  colors={['#c084fc', '#f472b6', '#38bdf8']}
>
  <div className="py-3 px-5 bg">
    <a target="_blank" rel="noopener noreferrer" href="/Sertifikat/Muhammad_Bintang_Panji_Kusuma_CV.pdf">
      Download CV
    </a>
  </div>
</BorderGlow>
        </div>
      </div>
    </section>
  );
}
