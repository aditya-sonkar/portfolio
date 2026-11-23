"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Services from "@/components/services";
import Projects from "@/components/projects";
import Contact from "@/components/contact";

const LiquidShader = dynamic(() => import("@/components/LiquidShader"), {
  ssr: false,
});

// Register GSAP plugins on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !bgRef.current || !overlayRef.current) return;

    // 1. Zoom in the liquid shader background smoothly as user scrolls
    gsap.to(bgRef.current, {
      scale: 1.25,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // 2. Fade background to pure solid black as user scrolls into About
    gsap.to(overlayRef.current, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "20% top", // Starts fading smoothly as About enters the screen
        end: "50% top",   // Reaches 100% solid pure black as About fills the viewport
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <main className="relative bg-[#0a0a0a] text-white selection:bg-[#e6e7e0] selection:text-[#0a0a0a]">
      <Navbar />

      {/* Hero + About Continuous Liquid Shader Container */}
      <div ref={containerRef} className="relative w-full overflow-hidden">
        {/* Continuous WebGL Liquid Shader Background spanning both Hero & About */}
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 origin-center"
        >
          <LiquidShader imageSrc="/veil.webp" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-0" />
        </div>

        {/* Blackout overlay that fades in only after About has been seen */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#0a0a0a] opacity-0 pointer-events-none z-[1]"
        />

        {/* Bottom gradient feather for a seamless transition into Experience */}
        <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-b from-transparent to-[#0a0a0a] pointer-events-none z-[2]" />

        {/* Foreground Content: Both Hero & About sit directly on top of the shader */}
        <div className="relative z-10">
          <Hero />
          <About />
        </div>
      </div>

      {/* From Experience onward: 100% Pure Solid Black */}
      <Projects />
      <Experience />
      <Services />



      <Contact />
    </main>
  );
}
