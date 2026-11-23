"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const education = [
    {
        degree: "• B.E. in Computer Engineering",
        college: "Lokmanya Tilak College of Engineering, Navi Mumbai",
        year: "2023 – 2026",
    },
    {
        degree: "• Diploma in Computer Engineering",
        college: "Vidyalankar Polytechnic",
        year: "2019 – 2022",
    },
];

const techStack = [

    "TypeScript",
    "JavaScript",
    "Java",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Prisma",
    "Redis",
    "Docker",
    "Tailwind CSS",
    "Git",
];

const experience = [
    {
        role: "Full Stack Developer Intern",
        company: "DevionX Technologies",
        duration: "Jan 2026 - Jun 2026",
    },
];

const help = [
    "End-to-end Web Design and Implementation",
    "UI/UX Design",
    "Brand Identity",
    "Graphic Design",
    "3D Product Renderings",
    "and more",
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const floatRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !iconRef.current) return;

        const rows = gsap.utils.toArray<HTMLElement>(".exp-row");
        const headings = gsap.utils.toArray<HTMLElement>(".exp-heading");
        const contents = gsap.utils.toArray<HTMLElement>(".exp-content");

        // 1. Subtle idle floating animation (alive creature effect) - only active when section is in view
        if (floatRef.current && containerRef.current) {
            gsap.to(floatRef.current, {
                y: -4,
                rotation: 2,
                duration: 2.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play pause resume pause",
                },
            });
        }

        const activateRow = (index: number) => {
            const isDesktop = window.innerWidth >= 768;
            const shift = isDesktop ? 20 : 0;

            // Move icon to this row
            gsap.to(iconRef.current, {
                y: rows[index].offsetTop + 4,
                duration: 0.3,
                ease: "power3.out",
                overwrite: "auto",
            });

            // Translate headings and contents
            rows.forEach((_, i) => {
                const isActive = i === index;

                // Left heading translates -20px if active, 0 if inactive (GPU composited)
                gsap.to(headings[i], {
                    x: isActive ? -shift : 0,
                    opacity: isActive ? 1 : 0.78,
                    duration: 0.3,
                    ease: "power3.out",
                    overwrite: "auto",
                });

                // Right content translates +20px if active, 0 if inactive (GPU composited)
                gsap.to(contents[i], {
                    x: isActive ? shift : 0,
                    opacity: isActive ? 1 : 0.78,
                    duration: 0.3,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            });
        };

        // Activate first row on load
        activateRow(0);

        // 2. ScrollTrigger: Scroll karte hi active row change hogi aur translate hogi
        rows.forEach((row, i) => {
            ScrollTrigger.create({
                trigger: row,
                start: i === 0 ? "top 80%" : "top 55%",
                end: i === rows.length - 1 ? "bottom 20%" : "bottom 55%",
                onEnter: () => activateRow(i),
                onEnterBack: () => activateRow(i),
            });
        });

        ScrollTrigger.refresh();
    }, { scope: containerRef });

    return (
        <section className="flex flex-col px-6 py-16 md:px-16 md:py-24">

            {/* Main Centered Container */}
            <div
                ref={containerRef}
                className="relative max-w-5xl mx-auto w-full flex flex-col gap-12 md:gap-16 md:-translate-x-12"
            >
                {/* Center Track: Exact 50% center pe icon rahega */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-24 pointer-events-none">
                    <div ref={iconRef} className="absolute left-1/2 -translate-x-1/2 top-0">
                        <div ref={floatRef}>
                            <Image
                                src="/images/experience_icon.png"
                                alt="Active Indicator"
                                width={184}
                                height={92}
                                className="w-20 max-w-none h-auto object-contain brightness-95"
                            />
                        </div>
                    </div>
                </div>

                {/* 1. Education */}
                <div className="exp-row flex flex-col md:flex-row items-start group">
                    <div className="exp-heading w-full md:w-1/2 md:pr-32 md:text-right">
                        <h2 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-tight font-medium">
                            EDUCATION
                        </h2>
                    </div>

                    <div className="exp-content w-full md:w-1/2 md:pl-32 flex flex-col gap-7">
                        {education.map((item) => (
                            <div key={item.degree} className="space-y-1.5">
                                <p className="text-base sm:text-lg md:text-xl font-medium">{item.degree}</p>
                                <p className="text-sm sm:text-base md:text-[17px] opacity-90">— {item.college}</p>
                                <p className="text-xs sm:text-[13px] font-mono text-neutral-300">[{item.year}]</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Tech Stack */}
                <div className="exp-row flex flex-col md:flex-row items-start group">
                    <div className="exp-heading w-full md:w-1/2 md:pr-32 md:text-right">
                        <h2 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-tight font-medium">
                            Stack
                        </h2>
                    </div>

                    <div className="exp-content w-full md:w-1/2 md:pl-32">
                        <p className="text-base sm:text-lg md:text-xl leading-relaxed font-normal">
                            {techStack.join(" / ")}
                        </p>
                    </div>
                </div>

                {/* 3. Experience */}
                <div className="exp-row flex flex-col md:flex-row items-start group">
                    <div className="exp-heading w-full md:w-1/2 md:pr-32 md:text-right">
                        <h2 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-tight font-medium">
                            Experience
                        </h2>
                    </div>

                    <div className="exp-content w-full md:w-1/2 md:pl-32 flex flex-col gap-6">
                        {experience.map((item) => (
                            <div key={item.role} className="space-y-1.5">
                                <p className="text-base sm:text-lg md:text-xl font-medium">{item.role} — {item.company}</p>
                                <p className="text-xs sm:text-[13px] font-mono text-neutral-300">[{item.duration}]</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. I Can Help You With */}
                <div className="exp-row flex flex-col md:flex-row items-start group">
                    <div className="exp-heading w-full md:w-1/2 md:pr-32 md:text-right">
                        <h2 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-tight font-medium">
                            I can help you with
                        </h2>
                    </div>

                    <div className="exp-content w-full md:w-1/2 md:pl-32">
                        <p className="text-base sm:text-lg md:text-xl leading-relaxed font-normal">
                            {help.join(", ")}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}