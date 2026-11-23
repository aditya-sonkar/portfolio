"use client";

import React from "react";
import Link from "next/link";

export default function Contact() {
    return (
        <section
            id="contact"
            className="w-full bg-[#0a0a0a] text-[#e6e7e0] px-6 md:px-16 pt-10 md:pt-14 pb-6 md:pb-8 relative overflow-hidden select-none"
        >
            <div className="w-full max-w-[1770px] mx-auto flex flex-col gap-6 md:gap-8">
                {/* Main Headline & Subtitle - Left Aligned */}
                <div className="w-full flex flex-col gap-4 md:gap-6">
                    <p className="text-sm sm:text-base font-sans font-medium text-neutral-400 tracking-normal">
                        Still here?
                    </p>
                    <h2 className="w-full text-[clamp(2.75rem,7.5vw,7.5rem)] font-sans font-medium tracking-[-0.03em] leading-[0.95] text-[#e6e7e0]">
                        Got a project to ship?
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl font-sans text-neutral-400 max-w-2xl font-normal leading-relaxed">
                        Drop a quick line about what you&apos;re crafting — let&apos;s build something exceptional.
                    </p>

                    {/* CTA Button */}
                    <div className="pt-2">
                        <a
                            href="mailto:adityasonkar1204@gmail.com"
                            className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#18181b] hover:bg-[#27272a] text-[#e6e7e0] hover:text-white border border-white/15 font-sans font-medium text-sm sm:text-base transition-all duration-200 active:scale-[0.98] w-fit shadow-lg shadow-black/40"
                        >
                            Start a project
                        </a>
                    </div>
                </div>

                {/* Bottom Simple Text Links & Colophon */}
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs sm:text-sm font-sans">
                    <p className="text-neutral-400 hidden md:block">
                        © 2026 Aditya Sonkar
                    </p>

                    {/* Clean Text Links */}
                    <div className="flex items-center gap-6 sm:gap-8">
                        <a
                            href="mailto:adityasonkar1204@gmail.com"
                            className="text-neutral-400 hover:text-white transition-colors"
                        >
                            Email
                        </a>
                        <Link
                            href="https://linkedin.com/in/sonkaraditya"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors"
                        >
                            LinkedIn
                        </Link>
                        <Link
                            href="https://github.com/aditya-sonkar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors"
                        >
                            GitHub
                        </Link>
                    </div>

                    <p className="text-neutral-400 hidden md:block">
                        Designed in Mumbai
                    </p>

                    {/* Mobile Only: Single bottom line for Copyright & Location */}
                    <div className="w-full flex items-center justify-between text-neutral-400 md:hidden pt-2">
                        <span>© 2026 Aditya Sonkar</span>
                        <span>Designed in Mumbai</span>
                    </div>
                </div>
            </div>
        </section>
    );
}