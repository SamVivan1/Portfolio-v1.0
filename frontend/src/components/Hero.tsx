import Image from "next/image";
import Shuffle from "./reactbits/Shuffle";

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-30 flex flex-col md:flex-row items-center justify-center min-h-screen px-4 md:px-10 gap-8 md:gap-12 pt-16 sm:pt-20 md:pt-0"
    >
      {/* Foto: Tampil di atas pada mobile, di kanan pada desktop */}
      <div className="relative order-1 md:order-2 mx-auto md:mx-0 group mt-0 md:mt-0">
        {/* Aura border ungu berjalan - lapisan terluar */}
        <div
          className="absolute -inset-3 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-40 blur-sm animate-pulse group-hover:opacity-60 group-hover:blur-md transition-all duration-500"
          style={{
            background:
              "linear-gradient(45deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4), rgba(168, 85, 247, 0.4))",
            backgroundSize: "200% 200%",
            animation: "gradientShift 3s ease infinite",
          }}
        ></div>

        {/* Aura border kedua - lapisan tengah */}
        <div
          className="absolute -inset-2 rounded-full border border-purple-400/30 opacity-0 group-hover:opacity-50 group-hover:animate-spin transition-all duration-700"
          style={{ animationDuration: "8s" }}
        ></div>

        {/* Aura border ketiga - lapisan dalam */}
        <div
          className="absolute -inset-1 rounded-full border border-pink-400/20 opacity-0 group-hover:opacity-40 group-hover:animate-spin transition-all duration-1000"
          style={{ animationDuration: "12s", animationDirection: "reverse" }}
        ></div>

        {/* Container foto utama - glassmorphic bersih */}
        <div className="hero-photo relative w-[250px] h-[250px] md:w-[400px] md:h-[400px] flex items-center overflow-hidden justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur-xl shadow-2xl group-hover:scale-105 group-hover:shadow-purple-500/20 group-hover:border-purple-400/40 transition-all duration-500">
          <Image
            src="/assets/profile.png"
            alt="Profile Photo"
            width={400}
            height={400}
            className="object-contain w-auto h-full rounded-xl group-hover:scale-110 transition-transform duration-500"
            priority
          />
          <div className="absolute bottom-0 w-[80%] h-12 bg-gradient-to-t from-black/20 to-transparent rounded-b-full blur-sm"></div>

          {/* Efek shimmer subtle saat hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
        </div>

        {/* Border berputar yang muncul saat hover */}
        <div
          className="absolute inset-0 rounded-full border border-purple-400/20 opacity-0 group-hover:opacity-60 group-hover:animate-spin transition-opacity duration-500"
          style={{ animationDuration: "6s" }}
        ></div>
        <div
          className="absolute inset-1 rounded-full border border-pink-400/15 opacity-0 group-hover:opacity-40 group-hover:animate-spin transition-opacity duration-500"
          style={{ animationDuration: "4s", animationDirection: "reverse" }}
        ></div>
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
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/Sertifikat/Muhammad_Bintang_Panji_Kusuma_CV.pdf"
            download
            className="group relative w-full sm:w-auto px-6 py-3 min-w-[160px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-lg lg:blur-md blur-0 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-center gap-2">
              <span className="text-white font-medium">Download CV</span>
              <svg
                className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
