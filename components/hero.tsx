"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen w-full flex flex-col justify-between px-2 sm:px-3 md:px-4 pt-28 sm:pt-32 pb-8 sm:pb-2 overflow-hidden select-none"
        >
            <div className="mx-auto max-w-[1770px]"></div>

            {/* CENTER: Editorial Tagline */}
            <div className="relative z-10 pointer-events-auto mx-auto max-w-2xl lg:max-w-4xl text-center px-4 my-auto py-8">
                <p className="font-neue-montreal text-[1.35rem] sm:text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.4rem] font-normal leading-[1.35] tracking-tight text-neutral-200">
                    <span className="font-apparel italic text-white font-normal">Full Stack Developer</span> for modern web apps{" "}
                    <br className="hidden sm:inline" />
                    and immersive digital experiences.
                </p>
            </div>

            {/* BOTTOM: Giant Name + Social Links (ArtiomYakushev style) */}
            <div className="relative z-10 pointer-events-auto w-full pb-0 mb-0">
                <h1
                    style={{ fontSize: "clamp(4.5rem, 17.2vw, 23.5rem)" }}
                    className="w-full flex flex-col sm:flex-row items-center sm:items-baseline justify-center whitespace-nowrap leading-[0.9] sm:leading-[0.76] tracking-[-0.05em] text-white mx-auto gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-10"
                >
                    <span className="font-sans font-normal tracking-[-0.05em]">
                        Aditya
                    </span>
                    <span className="font-apparel italic font-normal tracking-[-0.02em] text-white">
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
