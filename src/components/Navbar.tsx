"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="m-3 sm:m-4 md:m-5">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-3 py-3 sm:py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-filter backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-white font-bold text-[25px]">Portfolio</h1>
          </div>
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-10">
            <li className="text-gray-300 hover:text-white font-bold">
              <a href="#hero">Home</a>
            </li>
            <li className="text-gray-300 hover:text-white font-bold">About</li>
            <li className="text-gray-300 hover:text-white font-bold">
              Projects
            </li>
            <li className="text-gray-300 hover:text-white font-bold">
              Contact
            </li>
          </ul>
          <div className="hidden md:flex items-center space-x-4 font-semibold bg-purple-600 hover:bg-purple-700 px-3 py-2 text-white rounded-2xl transition-colors duration-250">
            <a href="https://instagram.com/bintang.panjii" target="_blank">
              Contact me
            </a>
          </div>
          {/* Hamburger button for mobile */}
          <button
            className="md:hidden flex items-center text-white"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Mobile dropdown menu */}
        <div
          className={`md:hidden mt-2 rounded-2xl border border-white/20 bg-white/10 backdrop-filter backdrop-blur-md p-4 flex flex-col items-end gap-4 transition-all duration-500 ease-in-out transform
            ${
              open
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
            }`}
          style={{ willChange: "opacity, transform" }}
        >
          <ul className="flex flex-col gap-2 w-full">
            <li className="text-gray-300 hover:text-white font-bold">
              <a href="#hero" onClick={() => setOpen(false)}>
                Home
              </a>
            </li>
            <li className="text-gray-300 hover:text-white font-bold">About</li>
            <li className="text-gray-300 hover:text-white font-bold">
              Projects
            </li>
            <li className="text-gray-300 hover:text-white font-bold">
              Contact
            </li>
          </ul>
          <button className="w-full font-semibold bg-purple-600 hover:bg-purple-700 px-3 py-2 text-white rounded-2xl transition-colors duration-250">
            Contact me
          </button>
        </div>
      </div>
    </nav>
  );
}
