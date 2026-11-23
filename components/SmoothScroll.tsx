"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Awwwards-grade Lenis configuration using physical Lerp inertia
    const lenis = new Lenis({
      lerp: 0.075,           // Luxury physical gliding inertia (Dennis Snellenberg / Locomotive style)
      wheelMultiplier: 0.85, // Softens harsh mouse wheel ticks into butter
      touchMultiplier: 1.5,
      smoothWheel: true,
      autoRaf: false,        // CRITICAL: Disables internal RAF loop so GSAP ticker doesn't double-tick!
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis RAF with GSAP ticker for 60/120fps fluid scrolling
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
