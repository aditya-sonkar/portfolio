"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const aboutText =
    "I design and build full stack web applications that look and feel right, and I put the same obsession into the frontend interfaces and the backend code underneath. I am based in Mumbai.";

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            if (!textRef.current || !sectionRef.current) return;

            // 1. Move text container smoothly up from below to the top mark
            gsap.fromTo(
                textRef.current,
                {
                    y: 70,
                },
                {
                    y: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 25%",
                        scrub: 1,
                    },
                }
            );

            // 2. Initial grey to white word-by-word reveal as user scrolls
            const words = textRef.current.querySelectorAll(".reveal-word");
            if (words.length > 0) {
                gsap.fromTo(
                    words,
                    {
                        color: "#525252",
                    },
                    {
                        color: "#ffffff",
                        stagger: 0.1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: textRef.current,
                            start: "top 90%",
                            end: "center 65%",
                            scrub: 1,
                        },
                    }
                );
            }
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            id="about"
            className="w-full min-h-screen text-white px-6 md:px-16 py-20 sm:py-28 md:py-36 lg:py-44 flex items-center justify-center relative z-10"
        >
            <div className="max-w-[1770px] w-full mx-auto flex flex-col lg:flex-row items-start gap-10 lg:gap-16 xl:gap-20">

                {/* 1. Left: Portrait Headshot Image */}
                <div className="w-full sm:w-[380px] lg:w-[440px] xl:w-[480px] shrink-0">
                    <div className="w-full aspect-[4/5] overflow-hidden rounded-sm bg-[#121212] shadow-sm">
                        <Image
                            src="/images/aditya_img.jpg"
                            alt="Aditya Sonkar"
                            width={520}
                            height={650}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* 2. Right: Editorial Typography */}
                <div className="flex-1 flex flex-col justify-start">
                    <p
                        ref={textRef}
                        className="font-neue-montreal text-[1.85rem] sm:text-[2.25rem] md:text-4xl lg:text-[2.85rem] xl:text-[3.35rem] font-normal leading-[1.22] tracking-tight selection:bg-white selection:text-black"
                    >
                        {aboutText.split(" ").map((word, idx) => (
                            <React.Fragment key={idx}>
                                <span className="reveal-word text-[#525252]">
                                    {word}
                                </span>{" "}
                            </React.Fragment>
                        ))}
                    </p>
                </div>

            </div>
        </section>
    );
}