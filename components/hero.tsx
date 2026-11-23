"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen w-full flex flex-col justify-between px-4 sm:px-5 md:px-6 pt-28 sm:pt-32 pb-8 sm:pb-2 overflow-hidden select-none"
        >
            <div className="mx-auto max-w-[1770px]"></div>

            {/* CENTER: Editorial Tagline */}
            <div className="relative z-10 pointer-events-auto mx-auto max-w-2xl lg:max-w-4xl text-center px-4 my-auto py-8">
                <p className="font-neue-montreal text-lg sm:text-2xl md:text-3xl lg:text-[2.1rem] font-normal leading-[1.3] tracking-tight text-neutral-200">
                    <span className="font-apparel italic text-white font-normal">Full Stack Developer</span> for modern web apps{" "}
                    <br className="hidden sm:inline" />
                    and immersive digital experiences.
                </p>
            </div>

            {/* BOTTOM: Giant Name + Social Links */}
            <div className="relative z-10 pointer-events-auto w-full pb-0 mb-0">
                <h1 className="w-full flex flex-col items-center justify-center text-center md:flex-row md:items-baseline md:justify-between md:text-left md:whitespace-nowrap text-[clamp(4.2rem,20vw,7.5rem)] md:text-[clamp(3.2rem,16.2vw,21rem)] leading-[0.95] md:leading-[0.8] tracking-[-0.04em] text-white max-w-[1770px] mx-auto">
                    <span className="font-sans font-normal tracking-tight">
                        Aditya
                    </span>
                    <span className="font-apparel italic font-normal tracking-tight text-neutral-100">
                        Sonkar
                    </span>
                </h1>

                {/* Social Links below the name */}
                {/* Social Links below the name */}
                <div className="w-full flex items-center justify-center pt-4 sm:pt-6 text-xs sm:text-xl font-sans tracking-wide text-neutral-400">
                    <Link
                        href="https://github.com/aditya-sonkar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-300 hover:text-white transition-colors duration-200"
                    >
                        <span>GitHub</span>
                    </Link>
                    <span className="mx-2 text-neutral-500">/</span>
                    <Link
                        href="https://linkedin.com/in/sonkaraditya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-300 hover:text-white transition-colors duration-200"
                    >
                        <span>LinkedIn</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
