"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link"
export default function Coffee() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    // Animation for the steam/air lines
    const steamVariants = {
        initial: { opacity: 0, y: 10 },
        animate: (i: number) => ({
            opacity: [0, 1, 0],
            y: [0, -20, -40],
            x: [0, 5, 10],
            transition: {
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut" as const,
            },
        }),
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center bg-white overflow-hidden py-20">
            {/* Hero Section with SVG and Large Text */}
            <div className="flex flex-col md:flex-row items-center justify-center md:pl-10">
                

                {/* Overlapping Text */}
                <div className=" inset-0 flex items-center justify-center pointer-events-none z-0">
                    <motion.h1
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-[20vw] font-black leading-none tracking-tighter uppercase select-none opacity-20"
                        style={{ color: "#EFDACC" }}
                    >
                        COffee
                    </motion.h1>
                </div>
                
                {/* Animated Coffee SVG */}
                <div className="relative z-10 w-64 h-64 md:w-80 md:h-80">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        {/* Steam / Air Blowing Lines */}
                        {[0, 1, 2].map((i) => (
                            <motion.path
                                key={i}
                                d={`M${40 + i * 8} 35 Q${45 + i * 8} 25 ${40 + i * 8} 15`}
                                stroke="#EFDACC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                custom={i}
                                variants={steamVariants}
                                initial="initial"
                                animate="animate"
                            />
                        ))}

                        {/* Coffee Cup Body */}
                        <path
                            d="M30 45H70L65 75C64.5 80 60 84 55 84H45C40 84 35.5 80 35 75L30 45Z"
                            fill="#EFDACC"
                        />
                        
                        {/* Cup Handle */}
                        <path
                            d="M70 50C78 50 82 55 82 60C82 65 78 70 70 70"
                            stroke="#EFDACC"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />

                        {/* Plate / Saucer */}
                        <rect x="25" y="88" width="50" height="3" rx="1.5" fill="#EFDACC" opacity="0.6" />
                    </svg>
                </div>
            </div>

            {/* Content Section */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative z-10 mx-auto w-full px-6 md:px-16"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 mt-20 md:mt-32 gap-12 items-center">

                    {/* Left Column */}
                    <div className="md:col-span-7 lg:col-span-6">
                        <motion.span
                            variants={itemVariants}
                            className="text-[#C1643B] font-mono tracking-[0.3em] uppercase text-xs mb-6 block"
                        >
                            The Aussie Brunch
                        </motion.span>
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1]"
                        >
                            Fresh and tasty recipes inspired by the Australian brunch scene
                        </motion.h2>

                        <motion.div
                            variants={itemVariants}
                            className="h-0.5 w-24 bg-slate-900 mb-8"
                        />
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-5 lg:col-span-4 lg:col-start-8">
                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-slate-800 font-medium leading-tight mb-6"
                        >
                            Aussie vibes in the heart of Annecy.
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-slate-500 leading-relaxed mb-8"
                        >
                            At Haven, brunch means <span className="text-slate-900 font-semibold">colourful, generous and creative plates</span>,
                            prepared with local and seasonal ingredients. Every season brings its own brunch!
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            whileHover={{ x: 10 }}
                            className="inline-flex items-center gap-6 group cursor-pointer"
                        >
                            <Link href="/menu">
                            <span className="text-sm font-black tracking-widest text-slate-900 uppercase">
                                Discover the Concept
                            </span>
                            </Link>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 group-hover:border-[#C1643B] transition-colors">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" className="group-hover:translate-x-1 transition-transform">
                                    <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer labels */}
                <motion.div
                    variants={itemVariants}
                    className="mt-24 flex flex-wrap gap-x-12 gap-y-4 text-[10px] font-mono uppercase tracking-[0.4em] text-slate-400"
                >
                    {["Local Sourcing", "Seasonal Menu", "Chef Crafted", "Annecy, FR"].map((text) => (
                        <span key={text} className="hover:text-[#C1643B] transition-colors cursor-default">{text}</span>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}