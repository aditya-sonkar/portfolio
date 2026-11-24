"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
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
        link: "https://shipnex-live.vercel.app/",
        isRightAligned: false,
        images: [
            {
                src: "https://res.cloudinary.com/fqbuycsc/image/upload/q_auto,f_auto/v1795445347/shipnex_path_img.png",
                alt: "Project preview 1",
            },
            {
                src: "https://res.cloudinary.com/fqbuycsc/image/upload/q_auto,f_auto/v1795445347/shipnex_img_2.png",
                alt: "Project preview 2",
            },
        ],
        video: {
            src: "https://res.cloudinary.com/fqbuycsc/video/upload/q_auto,f_auto/v1795445325/shipnex_proj_vid.mp4",
            poster: "https://res.cloudinary.com/fqbuycsc/image/upload/q_auto,f_auto/v1795445347/shipnex_path_img.png",
        },
    },
    {
        id: "citadel-iam",
        title: "Citadel IAM Platform",
        date: "July 2026",
        description:
            "An identity management platform engineered for granular access control, intelligent policy evaluation, and secure enterprise governance.",
        category: "Web",
        colors: ["#af8d4d", "#f0ede1"],
        link: "https://citadel-iam.vercel.app/",
        isRightAligned: true,
        images: [
            {
                src: "https://res.cloudinary.com/fqbuycsc/image/upload/q_auto,f_auto/v1795445336/citadel_cta.png",
                alt: "Project preview 1",
            },
            {
                src: "https://res.cloudinary.com/fqbuycsc/image/upload/q_auto,f_auto/v1795445336/citadel_dashboard.png",
                alt: "Project preview 2",
            },
        ],
        video: {
            src: "https://res.cloudinary.com/fqbuycsc/video/upload/q_auto,f_auto/v1795445021/citadel.mp4",
            poster: "https://res.cloudinary.com/fqbuycsc/image/upload/q_auto,f_auto/v1795445336/citadel_dashboard.png",
        },
    },
    {
        id: "lead-magnet",
        title: "Lead Magnet (Thumbstack Technologies) ",
        date: "September 2026",
        description:
            "A responsive lead-generation platform featuring an interactive multi-step Shopify quote estimator, dynamic pricing calculations, and seamless lead capture.",
        category: "Web",
        colors: ["#0a0a0a", "#f8f8f8"],
        link: "https://leadmagnet-live.vercel.app/",
        isRightAligned: false,
        images: [
            {
                src: "https://res.cloudinary.com/fqbuycsc/image/upload/q_auto,f_auto/v1795445337/leadmagnet_img1.png",
                alt: "Project preview 1",
            },
            {
                src: "https://res.cloudinary.com/fqbuycsc/image/upload/q_auto,f_auto/v1795445336/leadmagnet_img2.png",
                alt: "Project preview 2",
            },
        ],
        video: {
            src: "https://res.cloudinary.com/fqbuycsc/video/upload/q_auto,f_auto/v1795444987/lead_magnet.mp4",
            poster: "https://res.cloudinary.com/fqbuycsc/image/upload/q_auto,f_auto/v1795445337/leadmagnet_img1.png",
        },
    },
];

const remainingProjects: RemainingProject[] = [
    {
        id: "SeatFlow",
        number: "01",
        title: "SeatFlow",
        date: "May 2026",
        tech: "NextJS",
        link: "https://seatflow-live.vercel.app/",
        videoSrc: "",
    },

    {
        id: "shipnex",
        number: "02",
        title: "Shipnex",
        date: "June 2026",
        tech: "NextJS",
        link: "https://shipnex-live.vercel.app/",
        videoSrc: "",
    },
    {
        id: "citadel",
        number: "02",
        title: "Citadel IAM",
        date: "July 2026",
        tech: "NextJS",
        link: "https://citadel-iam.vercel.app/",
        videoSrc: "",
    },
    {
        id: "shelfspace",
        number: "04",
        title: "Shelfspace",
        date: "August 2026",
        tech: "NextJS",
        link: "https://shelfspace-live.vercel.app/",
        videoSrc: "",
    },
    {
        id: "lead_magnet",
        number: "05",
        title: "Lead Magnet",
        date: "September 2026",
        tech: "NextJS",
        link: "https://leadmagnet-live.vercel.app/",
        videoSrc: "",
    },

];

function ProjectVideo({ src, poster }: { src: string; poster?: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Auto-play smoothly when visible, pause when scrolled out of view
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={poster}
            className="w-full h-full object-cover"
        />
    );
}

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
                        Selected Work
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
                                        <span className="block text-xs uppercase tracking-widest text-neutral-700 font-mono mb-3">
                                            {project.date}
                                        </span>
                                        <h3
                                            id={`project-${project.id}`}
                                            className="text-3xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-[#0a0a0a] leading-[1.1]"
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed mt-4 sm:mt-5 font-sans font-normal max-w-xl">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Project Link / Arrow Button */}
                                    <div className="mt-6 flex items-center justify-end">
                                        {/* Iconic Diagonal Arrow Link */}
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View live project for ${project.title}`}
                                            className="group inline-block cursor-pointer text-[#0a0a0a]"
                                        >
                                            <svg
                                                width="48"
                                                height="50"
                                                viewBox="0 0 48 50"
                                                fill="#0a0a0a"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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
                                            <ProjectVideo src={project.video.src} poster={project.video.poster} />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-4">
                                        {project.images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="w-full sm:w-48 md:w-56 aspect-video bg-[#0a0a0a] rounded-sm overflow-hidden relative group border border-[#0a0a0a]/10 shadow-xs transition-transform duration-300"
                                            >
                                                {img.src && (
                                                    <Image
                                                        src={img.src}
                                                        alt={img.alt}
                                                        width={1200}
                                                        height={675}
                                                        quality={100}
                                                        loading="lazy"
                                                        className="w-full h-full object-cover transition-transform duration-500"
                                                    />
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
                    <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-700 mb-6">
                        Archive / Recent Showcases
                    </h3>

                    <ul className="flex flex-col divide-y divide-[#0a0a0a]/15">
                        {remainingProjects.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 md:py-6 gap-4 hover:px-2 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-center gap-6 sm:gap-10">
                                        <span className="text-xs font-mono text-neutral-700 font-semibold">
                                            {item.number}
                                        </span>
                                        <h4 className="text-xl sm:text-2xl md:text-3xl font-sans font-medium tracking-tight text-[#0a0a0a] group-hover:text-neutral-700 transition-colors">
                                            {item.title}
                                        </h4>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-6 md:gap-12 pl-12 sm:pl-0">
                                        <span className="text-xs font-mono uppercase text-neutral-700">
                                            {item.date}
                                        </span>
                                        <span className="hidden md:inline-block text-xs font-mono uppercase text-neutral-700">
                                            {item.tech}
                                        </span>

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
