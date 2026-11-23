"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface FeaturedProject {
    id: string;
    title: string;
    date: string;
    description: string;
    category: string;
    colors: string[];
    link: string;
    isRightAligned?: boolean;
    images: { src: string; alt: string }[];
    video?: { src: string; poster?: string };
}

interface RemainingProject {
    id: string;
    number: string;
    title: string;
    date: string;
    tech: string;
    link: string;
    videoSrc?: string;
}

const featuredProjects: FeaturedProject[] = [
    {
        id: "shipnex-live",
        title: "Shipnex Logistics Platform",
        date: "June 2026",
        description:
            "A modern logistics experience built to move businesses forward through smarter shipping, real-time visibility, and seamless digital interactions..",
        category: "Web",
        colors: ["#211e1f", "#e9decb"],
        link: "/showcase/erbdesignco",
        isRightAligned: false,
        images: [
            {
                src: "",
                alt: "Project preview 1",
            },
            {
                src: "",
                alt: "Project preview 2",
            },
        ],
        video: {
            src: "/projects/shipnex/shipnex_proj_vid.mp4",

        },
    },
    {
        id: "citadel-iam",
        title: "Citadel IAM Platform",
        date: "July 2026",
        description:
            "Empowering real estate visionaries with a digital experience that elevates luxury and amplifies ambition.",
        category: "Web",
        colors: ["#af8d4d", "#f0ede1"],
        link: "/showcase/the-mills-group",
        isRightAligned: true,
        images: [
            {
                src: "",
                alt: "Project preview 1",
            },
            {
                src: "",
                alt: "Project preview 2",
            },
        ],
        video: {
            src: "/projects/citadel/citadel.mp4",
        },
    },
    {
        id: "lead-magnet",
        title: "Lead Magnet (Thumbstack Technologies) ",
        date: "January 2025",
        description:
            "An identity management platform engineered for granular access control, intelligent policy evaluation, and secure enterprise governance.",
        category: "Web",
        colors: ["#0a0a0a", "#f8f8f8"],
        link: "/showcase/brookiejennfilm",
        isRightAligned: false,
        images: [
            {
                src: "",
                alt: "Project preview 1",
            },
            {
                src: "",
                alt: "Project preview 2",
            },
        ],
        video: {
            src: "/projects/citadel/citadel.mp4"
        },
    },
];

const remainingProjects: RemainingProject[] = [
    {
        id: "shipnex",
        number: "01",
        title: "Shipnex",
        date: "June 2026",
        tech: "NextJS",
        link: "/showcase/soul-waves-vinyl",
        videoSrc: "",
    },
    {
        id: "citadel",
        number: "02",
        title: "Citadel IAM",
        date: "July 2026",
        tech: "NextJS",
        link: "/showcase/bluebird-hardwater",
        videoSrc: "",
    },
    {
        id: "SeatFlow",
        number: "03",
        title: "SeatFlow",
        date: "May 2026",
        tech: "NextJS",
        link: "/showcase/brookiejennfilm",
        videoSrc: "",
    },
    {
        id: "lead_magnet",
        number: "04",
        title: "Lead Magnet",
        date: "September 2026",
        tech: "NextJS",
        link: "/showcase/the-mills-group",
        videoSrc: "",
    },
    {
        id: "shelfspace",
        number: "05",
        title: "Shelfspace",
        date: "August 2026",
        tech: "NextJS",
        link: "/showcase/create-radical",
        videoSrc: "",
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        // Section has white / #e6e7e0 background directly
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            id="selected_work"
            aria-labelledby="featured-heading"
            className="w-full bg-[#e6e7e0] text-[#0a0a0a] px-6 py-8 md:px-16 md:py-14 overflow-hidden select-none"
        >
            <div className="max-w-[1770px] mx-auto">
                {/* Clean Editorial "Selected work" Header */}
                <div className="w-full mb-8 md:mb-12">
                    <h2
                        ref={headerRef}
                        id="featured-heading"
                        className="w-full text-[clamp(2.75rem,8vw,8rem)] font-sans font-semibold tracking-[-0.03em] text-[#0a0a0a] leading-[0.9] whitespace-nowrap"
                    >
                        Selected work
                    </h2>
                </div>

                {/* Featured Showcase Projects */}
                <div className="flex flex-col gap-24 md:gap-36 mb-24 md:mb-20">
                    {featuredProjects.map((project) => (
                        <article
                            key={project.id}
                            className="w-full"
                            aria-labelledby={`project-${project.id}`}
                        >
                            <div
                                className={`flex flex-col lg:flex-row gap-10 md:gap-16 items-start justify-between ${project.isRightAligned ? "lg:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Project Information */}
                                <div className="w-full lg:w-[38%] flex flex-col justify-between self-stretch">
                                    <div>
                                        <h5 className="text-xs uppercase tracking-widest text-neutral-600 font-mono mb-3">
                                            {project.date}
                                        </h5>
                                        <h2
                                            id={`project-${project.id}`}
                                            className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal tracking-tight text-[#0a0a0a] leading-[1.1]"
                                        >
                                            {project.title}
                                        </h2>
                                        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mt-4 font-sans font-normal max-w-lg">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Project Link / Arrow Button */}
                                    <div className="mt-8 pt-6 border-t border-[#0a0a0a]/15 flex items-center justify-end">
                                        {/* Iconic Diagonal Arrow Icon */}
                                        <a
                                            href={project.link}
                                            aria-label={`View case study for ${project.title}`}
                                            className="group p-2 -mr-2 rounded-full hover:bg-black/5 transition-colors"
                                        >
                                            <svg
                                                width="40"
                                                height="42"
                                                viewBox="0 0 48 50"
                                                fill="#0a0a0a"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                            >
                                                <path d="M33.9547 41.6812L0.160156 5.88553L5.7121 0L39.5067 35.7999V4.24673H47.3595V50H4.16902V41.6812H33.9547Z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Project Assets (Images + Video Preview) */}
                                <div className="w-full lg:w-[58%] flex flex-col gap-4">
                                    {project.video && (
                                        <div className="w-full aspect-video bg-[#0a0a0a] rounded-sm overflow-hidden shadow-sm relative">
                                            <video
                                                autoPlay
                                                playsInline
                                                loop
                                                muted
                                                poster={project.video.poster}
                                                className="w-full h-full object-cover"
                                            >
                                                <source src={project.video.src} type="video/mp4" />
                                            </video>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 sm:grid-cols-8 gap-4">
                                        {project.images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="w-full sm:w-24 aspect-square bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 rounded-sm overflow-hidden relative group flex items-center justify-center transition-colors hover:border-[#0a0a0a]/30"
                                            >
                                                {img.src ? (
                                                    <img
                                                        src={img.src}
                                                        alt={img.alt}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 group-hover:text-neutral-600 transition-colors">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 mb-1">
                                                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                                            <circle cx="9" cy="9" r="2" />
                                                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                                        </svg>
                                                        <span className="text-[9px] font-mono tracking-wider uppercase opacity-50">Img {idx + 1}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Remaining Compact Showcases List */}
                <div className="w-full border-t border-[#0a0a0a]/20 pt-10 md:pt-14">
                    <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-600 mb-6">
                        Archive / Recent Showcases
                    </h3>

                    <ul className="flex flex-col divide-y divide-[#0a0a0a]/15">
                        {remainingProjects.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={item.link}
                                    aria-label={`View case study for ${item.title}`}
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 md:py-6 gap-4 hover:px-2 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-6 sm:gap-10">
                                        <span className="text-xs font-mono text-neutral-500 font-semibold">
                                            {item.number}
                                        </span>
                                        <h4 className="text-xl sm:text-2xl md:text-3xl font-sans font-normal tracking-tight text-[#0a0a0a] group-hover:text-neutral-700 transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-6 md:gap-12 pl-12 sm:pl-0">
                                        <span className="text-xs font-mono uppercase text-neutral-600">
                                            {item.date}
                                        </span>
                                        <span className="hidden md:inline-block text-xs font-mono uppercase text-neutral-500">
                                            {item.tech}
                                        </span>

                                        <div className="hidden sm:flex items-center justify-center w-16 h-10 md:w-20 md:h-12 bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 rounded overflow-hidden shadow-xs relative shrink-0">
                                            {item.videoSrc ? (
                                                <video
                                                    autoPlay
                                                    playsInline
                                                    loop
                                                    muted
                                                    className="w-full h-full object-cover"
                                                >
                                                    <source src={item.videoSrc} type="video/mp4" />
                                                </video>
                                            ) : (
                                                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider opacity-60">Vid</span>
                                            )}
                                        </div>

                                        <div className="p-1 text-[#0a0a0a] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                            <svg
                                                width="32"
                                                height="34"
                                                viewBox="0 0 48 50"
                                                fill="#0a0a0a"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5 md:w-6 md:h-6"
                                            >
                                                <path d="M33.9547 41.6812L0.160156 5.88553L5.7121 0L39.5067 35.7999V4.24673H47.3595V50H4.16902V41.6812H33.9547Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
