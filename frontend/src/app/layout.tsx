import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Silkscreen } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const analyticsSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
const analyticsWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Muhammad Bintang Panji Kusuma — DevOps, Homelab & Web",
  description:
    "Computer Engineering student at Universitas Syiah Kuala. DevOps, homelab infrastructure, web development, and ProtoPrime3D — a 3D printing workshop in Banda Aceh.",
  keywords: [
    "Muhammad Bintang Panji Kusuma",
    "SamVivan1",
    "portfolio",
    "DevOps",
    "homelab",
    "Docker",
    "computer engineering",
    "Universitas Syiah Kuala",
    "Banda Aceh",
    "ProtoPrime3D",
    "3D printing",
  ],
  authors: [{ name: "Muhammad Bintang Panji Kusuma" }],
  creator: "Muhammad Bintang Panji Kusuma",
  other: {
    "darkreader-lock": "",
  },
  openGraph: {
    title: "Muhammad Bintang Panji Kusuma — DevOps, Homelab & Web",
    description:
      "A pixel-art homelab portfolio: live GitHub projects, verified credentials, a 3D printing workshop, and a downloadable CV.",
    type: "profile",
    locale: "en_US",
    siteName: "Bintang — Pixel Homelab",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Bintang's pixel-art homelab portfolio, with a desk, CRT monitor, and rain outside.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Bintang Panji Kusuma — DevOps, Homelab & Web",
    description:
      "Computer Engineering student. DevOps, homelab, web. A pixel-art portfolio you can walk through.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#08070f",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Bintang Panji Kusuma",
  alternateName: "SamVivan1",
  jobTitle: "Computer Engineering Student",
  description:
    "Computer Engineering student at Universitas Syiah Kuala focused on DevOps, homelab infrastructure, and web development.",
  url: "https://github.com/SamVivan1",
  email: "mailto:bintang10panji@gmail.com",
  sameAs: [
    "https://github.com/SamVivan1",
    "https://www.linkedin.com/in/muhammad-bintang-panji-kusuma-a558b821b/",
    "https://instagram.com/bintang.panjii",
    "https://protoprime3d.my.id",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Syiah Kuala",
    url: "https://usk.ac.id",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Banda Aceh",
    addressRegion: "Aceh",
    addressCountry: "ID",
  },
  knowsAbout: [
    "DevOps",
    "Homelab infrastructure",
    "Docker",
    "Computer networking",
    "Web development",
    "3D printing",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="apple-touch-icon"
          href="/android-launchericon-192-192.png"
        />
        <meta name="theme-color" content="#08070f" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {analyticsSrc && analyticsWebsiteId ? (
          <script
            defer
            src={analyticsSrc}
            data-website-id={analyticsWebsiteId}
          />
        ) : null}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('reduced');}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} antialiased`}
      >
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
