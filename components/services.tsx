"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ServiceItem {
    id: string;
    title: string;
    description: string;
    frameworks: string[];
}

const servicesData: ServiceItem[] = [
    {
        id: "website-design",
        title: "Website Design",
        description:
            "Website designs that blend clean aesthetics with unconventional typography, drawing inspiration from streetwear, skate, and surf cultures. Modern, purposeful, and designed to elevate visual identity through sleek, adaptive layouts.",
        frameworks: ["Adobe Photoshop", "Adobe Illustrator", "Figma"],
    },
    {
        id: "website-development",
        title: "Website Development",
        description:
            "Custom designs brought to life through Next.js web development. Creating seamless, high-performance websites that bring life back into digital.",
        frameworks: ["NextJS", "NodeJS", "Javascript", "ReactJS"],
    },
    {
        id: "website-animations",
        title: "Website Animations",
        description:
            "Immersive animations that elevate user experience, add dynamic interactions, and highlight key content in a way that feels natural and elevates brand identity. Framer Motion, GSAP and Three.js.",
        frameworks: ["Framer Motion", "GSAP"],
    },
    {
        id: "full-stack-development",
        title: "Full-Stack Development",
        description:
            "Front-end and back-end development, creating a complete and scalable solution for your digital platform. Ensures a cohesive experience from interface to architecture.",
        frameworks: ["NextJS", "NodeJS", "Javascript", "ReactJS"],
    },
    {
        id: "digital-experience-consulting",
        title: "CMS Integration",
        description:
            "Consulting services to help elevate your brand’s digital presence by integrating modern typography, custom animations, and thoughtful UX design.",
        frameworks: ["Strapi", "UI/UX", "Development Stack"],
    },
];

export default function Services() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeId, setActiveId] = useState<string | null>(null);

    const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const iconRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

    // GSAP animation for the lines sweeping corner-to-corner (staggered)
    useGSAP(
        () => {
            const validLines = lineRefs.current.filter(Boolean);
            if (validLines.length === 0) return;

            gsap.fromTo(
                validLines,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.2,
                    ease: "power3.inOut",
                    stagger: 0.1,
                    transformOrigin: "left center",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reset",
                    },
                }
            );
        },
        { scope: containerRef }
    );

    // Toggle Accordion
    const toggleService = (id: string) => {
        const isOpening = activeId !== id;
        const prevId = activeId;

        if (prevId && accordionRefs.current[prevId]) {
            gsap.to(accordionRefs.current[prevId], {
                height: 0,
                opacity: 0,
                duration: 0.35,
                ease: "power2.inOut",
            });
            if (iconRefs.current[prevId]) {
                gsap.to(iconRefs.current[prevId], {
                    rotate: 0,
                    opacity: 0,
                    duration: 0.25,
                    ease: "power2.out",
                });
            }
        }

        if (isOpening) {
            setActiveId(id);
            if (accordionRefs.current[id]) {
                gsap.fromTo(
                    accordionRefs.current[id],
                    { height: 0, opacity: 0 },
                    {
                        height: "auto",
                        opacity: 1,
                        duration: 0.45,
                        ease: "power3.out",
                    }
                );
            }
            if (iconRefs.current[id]) {
                gsap.to(iconRefs.current[id], {
                    rotate: 90,
                    opacity: 1,
                    duration: 0.25,
                    ease: "power2.out",
                });
            }
        } else {
            setActiveId(null);
        }
    };

    const handleMouseEnter = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
        if (activeId !== id && iconRefs.current[id]) {
            gsap.to(iconRefs.current[id], { opacity: 1, duration: 0.2 });
        }
        const title = e.currentTarget.querySelector(".service-title");
        if (title) {
            gsap.to(title, { x: 8, duration: 0.25, ease: "power2.out" });
        }
    };

    const handleMouseLeave = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
        if (activeId !== id && iconRefs.current[id]) {
            gsap.to(iconRefs.current[id], { opacity: 0, duration: 0.2 });
        }
        const title = e.currentTarget.querySelector(".service-title");
        if (title) {
            gsap.to(title, { x: 0, duration: 0.25, ease: "power2.out" });
        }
    };

    return (
        <section
            ref={containerRef}
            id="services"
            aria-labelledby="services-heading"
            className="relative z-10 w-full bg-[#0a0a0a] text-[#e6e7e0] fill-[#e6e7e0] py-8 md:py-14 px-6 md:px-16 overflow-hidden selection:bg-[#e6e7e0] selection:text-[#0a0a0a]"
        >
            <div className="max-w-[1770px] mx-auto">
                <div className="w-full mb-6 md:mb-10">
                    <h2
                        id="services-heading"
                        className="w-full text-[clamp(2.75rem,8vw,8rem)] font-sans font-semibold tracking-[-0.03em] leading-[0.9] text-[#e6e7e0] whitespace-nowrap"
                    >
                        Services
                    </h2>
                </div>

                {/* --- SERVICES LIST --- */}
                <ul className="w-full flex flex-col list-none p-0 m-0">

                    {/* --- COMPACT LEGEND BAR --- */}
                    <li className="flex justify-between items-center text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 pb-1.5">
                        <span>Service Name</span>
                        <div className="flex items-center gap-1.5">
                            <span>Click to get more info</span>
                        </div>
                    </li>

                    {/* --- SERVICE ITEMS --- */}
                    {servicesData.map((service, index) => {
                        return (
                            <li key={service.id} className="relative w-full">

                                {/* Divider Line */}
                                <div
                                    ref={(el) => {
                                        lineRefs.current[index] = el;
                                    }}
                                    className="w-full h-[1px] bg-[#e6e7e0] origin-left"
                                    style={{ width: "100%" }}
                                />

                                {/* Compact Clickable Row */}
                                <div
                                    onMouseEnter={(e) => handleMouseEnter(service.id, e)}
                                    onMouseLeave={(e) => handleMouseLeave(service.id, e)}
                                    onClick={() => toggleService(service.id)}
                                    className="relative w-full py-3.5 sm:py-4 md:py-5 cursor-pointer select-none transition-colors"
                                >

                                    {/* Title and Icon */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="service-title text-lg sm:text-xl md:text-[22px] lg:text-[24px] font-sans font-medium tracking-normal text-[#e6e7e0]">
                                            {service.title}
                                        </h3>

                                        {/* Icon */}
                                        <div
                                            ref={(el) => {
                                                iconRefs.current[service.id] = el;
                                            }}
                                            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center opacity-0 transition-opacity"
                                            style={{ transformOrigin: "center" }}
                                        >
                                            <svg
                                                viewBox="0 0 48 50"
                                                fill="inherit"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                            >
                                                <path d="M33.9547 41.6812L0.160156 5.88553L5.7121 0L39.5067 35.7999V4.24673H47.3595V50H4.16902V41.6812H33.9547Z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Collapsible Info */}
                                    <div
                                        ref={(el) => {
                                            accordionRefs.current[service.id] = el;
                                        }}
                                        className="h-0 opacity-0 overflow-hidden"
                                    >
                                        <div className="pt-3 pb-2 max-w-3xl">
                                            <p className="text-xs sm:text-sm md:text-[15px] font-light leading-relaxed text-[#e6e7e0]/80 mb-3">
                                                {service.description}
                                            </p>

                                            {/* Framework Badges */}
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {service.frameworks.map((framework) => (
                                                    <div
                                                        key={framework}
                                                        className="px-2.5 py-0.5 rounded-full border border-[#e6e7e0]/25 bg-[#0a0a0a] text-[#e6e7e0] text-[10px] sm:text-xs font-mono uppercase tracking-wider"
                                                    >
                                                        <span>{framework}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
