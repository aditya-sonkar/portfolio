"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            if (!textRef.current) return;

            const words = textRef.current.querySelectorAll(".reveal-word");

            gsap.fromTo(
                words,
                {
                    opacity: 0.15,
                    filter: "blur(10px)",
                },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    stagger: 0.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 75%",
                        end: "center 60%",
                        scrub: 1,
                    },
                }
            );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="about"
            className="w-full min-h-screen text-white px-6 md:px-16 py-32 md:py-48 flex items-center justify-center relative z-10"
        >
            <div className="max-w-[1770px] w-full mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-14">

                {/* 1. Left: Clean Pure Image */}
                <div className="w-full lg:w-auto shrink-0">
                    <Image
                        src="/images/aditya_img.jpg"
                        alt="Aditya Sonkar"
                        width={540}
                        height={365}
                        className="w-full sm:w-[480px] lg:w-[540px] h-auto object-cover"
                        priority
                    />
                </div>

                {/* 2. Right: Editorial Scroll-Reveal Typography adjusted right next to the image */}
                <div className="flex-1 flex flex-col justify-center">
                    <p
                        ref={textRef}
                        className="font-neue-montreal text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-normal leading-[1.22] tracking-tight text-neutral-100 selection:bg-white selection:text-black"
                    >
                        <span className="reveal-word inline-block mr-3">I'm</span>
                        <span className="reveal-word inline-block mr-3">a</span>
                        <span className="reveal-word inline-block mr-3 text-white">
                            Full Stack developer
                        </span>
                        <span className="reveal-word inline-block mr-3">passionate</span>
                        <span className="reveal-word inline-block mr-3">about</span>
                        <span className="reveal-word inline-block mr-3">building</span>
                        <span className="reveal-word inline-block mr-3">modern</span>
                        <span className="reveal-word inline-block mr-3">digital</span>
                        <span className="reveal-word inline-block mr-3">experiences</span>
                        <span className="reveal-word inline-block mr-3">that</span>
                        <span className="reveal-word inline-block mr-3">balance</span>
                        <span className="reveal-word inline-block mr-3">thoughtful</span>
                        <span className="reveal-word inline-block mr-3 font-apparel italic text-white">
                            design
                        </span>
                        <span className="reveal-word inline-block mr-3">with</span>
                        <span className="reveal-word inline-block mr-3">powerful</span>
                        <span className="reveal-word inline-block mr-3">functionality.</span>
                        <span className="reveal-word inline-block mr-3">From</span>
                        <span className="reveal-word inline-block mr-3">crafting</span>
                        <span className="reveal-word inline-block mr-3">intuitive</span>
                        <span className="reveal-word inline-block mr-3">interfaces</span>
                        <span className="reveal-word inline-block mr-3">to</span>
                        <span className="reveal-word inline-block mr-3">developing</span>
                        <span className="reveal-word inline-block mr-3">reliable</span>
                        <span className="reveal-word inline-block mr-3">backend</span>
                        <span className="reveal-word inline-block mr-3">systems,</span>
                        <span className="reveal-word inline-block mr-3">I</span>
                        <span className="reveal-word inline-block mr-3">turn</span>
                        <span className="reveal-word inline-block mr-3">ideas</span>
                        <span className="reveal-word inline-block mr-3">into</span>
                        <span className="reveal-word inline-block mr-3">seamless,</span>
                        <span className="reveal-word inline-block mr-3">scalable,</span>
                        <span className="reveal-word inline-block mr-3">and</span>
                        <span className="reveal-word inline-block mr-3">engaging</span>
                        <span className="reveal-word inline-block mr-3">web</span>
                        <span className="reveal-word inline-block mr-3">applications.</span>
                    </p>
                </div>

            </div>
        </section>
    );
}