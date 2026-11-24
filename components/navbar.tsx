"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const navItems = [
    { href: "/services", label: "Services" },
    { href: "/selected_work", label: "Selected Work" },
    { href: "https://drive.google.com/file/d/1vXcEH8w0oxCG27yIqam7U89YOeVWuvHD/view?usp=drive_link", label: "Resume" },
    { href: "/contact", label: "Contact" },
]

function NavText({ children }: { children: React.ReactNode }) {
    return (
        <span className="relative block overflow-hidden">
            <motion.span
                initial="rest"
                animate="rest"
                whileHover="hover"
                className="relative block overflow-hidden"
            >

                <motion.span
                    variants={{
                        rest: { y: "0%" },
                        hover: { y: "-100%" },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="block"
                >
                    {children}
                </motion.span>

                <motion.span
                    aria-hidden="true"
                    variants={{
                        rest: { y: "100%" },
                        hover: { y: "0%" },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 block"
                >
                    {children}
                </motion.span>
            </motion.span>
        </span>
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 w-full z-50 font-nunito uppercase">
            <nav className="flex w-full items-start px-6 py-9">
                <div className="flex flex-1 gap-8 items-center">
                    <motion.div
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        className="inline-flex items-center font-bold text-base sm:text-base md:text-sm tracking-wider"
                    >
                        <Link href="/" className="inline-flex items-center">
                            <span>A</span>

                            <motion.span
                                variants={{
                                    rest: { width: 0 },
                                    hover: { width: 43 },
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="inline-block overflow-hidden whitespace-nowrap"
                            >
                                DITYA
                            </motion.span>

                            <span className="ml-1">S</span>

                            <motion.span
                                variants={{
                                    rest: { width: 0 },
                                    hover: { width: 50 },
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
                                className="inline-block overflow-hidden whitespace-nowrap"
                            >
                                ONKAR
                            </motion.span>
                        </Link>
                        <motion.img
                            src="/name_gif.gif"
                            alt=""
                            variants={{
                                rest: { width: 0, opacity: 0, marginLeft: 0 },
                                hover: { width: 40, opacity: 1, marginLeft: 2 },
                            }}
                            transition={{ duration: 0.3 }}
                            className=" h-8 object-contain invert"
                        />
                    </motion.div>

                </div>

                <div className="ml-auto flex items-start gap-6 md:gap-12">

                    <span className="hidden sm:inline-block whitespace-nowrap pt-0.5 text-[10px] opacity-100">
                        [Available for work November, 2026]
                    </span>

                    <ul className="hidden sm:flex shrink-0 flex-col gap-2 opacity-100 text-left">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                {item.label === "Resume" ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="uppercase inline-block"
                                    >
                                        <NavText>{item.label}</NavText>
                                    </a>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const id = item.href.replace("/", "").replace("#", "");
                                            const el = document.getElementById(id);
                                            if (el) el.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="uppercase inline-block"
                                    >
                                        <NavText>{item.label}</NavText>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="sm:hidden relative z-50 text-sm uppercase tracking-widest text-neutral-200 hover:text-white font-semibold pt-0.5"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? "Close" : "Menu"}
                    </button>

                </div>

            </nav>

            {/* Mobile Fullscreen Animated Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-between px-6 pt-32 pb-12 sm:hidden pointer-events-auto"
                    >
                        <div className="flex flex-col gap-8 pt-4">
                            {navItems.map((item, idx) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.06, duration: 0.3 }}
                                >
                                    {item.label === "Resume" ? (
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setIsOpen(false)}
                                            className="block text-3xl font-light tracking-tight text-white hover:text-neutral-400 transition-colors uppercase"
                                        >
                                            {item.label}
                                        </a>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsOpen(false);
                                                const id = item.href.replace("/", "").replace("#", "");
                                                const el = document.getElementById(id);
                                                if (el) el.scrollIntoView({ behavior: "smooth" });
                                            }}
                                            className="block text-3xl font-light tracking-tight text-white hover:text-neutral-400 transition-colors text-left uppercase"
                                        >
                                            {item.label}
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2 border-t border-neutral-800 pt-6">
                            <span className="text-[11px] text-neutral-400 tracking-wider">
                                [AVAILABLE FOR WORK NOVEMBER, 2026]
                            </span>
                            <span className="text-xs text-neutral-500 font-sans normal-case">
                                Aditya Sonkar — Full Stack Developer
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}


