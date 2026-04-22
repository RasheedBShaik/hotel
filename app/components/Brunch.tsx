"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link"
export default function AussieBrunch() {
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

    // Advanced "Drifting" Smoke Effect
    const smokeVariants: Variants = {
        initial: { opacity: 0, y: 20, scale: 0.8 },
        animate: (i: number) => ({
            opacity: [0, 0.7, 0.4, 0], // Fades in, lingers, then vanishes
            y: [0, -30, -60],          // Rises higher
            x: [0, 10, -5, 5],         // Swirls/Drifts left and right
            scale: [0.8, 1.2, 1.5],    // Expands as it dissipates
            transition: {
                duration: 3.5,         // Slower, more graceful movement
                repeat: Infinity,
                delay: i * 1.1,        // Heavily staggered for a constant flow
                ease: "linear" as const,
            },
        }),
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center bg-white overflow-hidden py-20">
            {/* Hero Section */}
            <div className="relative flex flex-col md:flex-row items-center justify-center md:pr-10">
                
                {/* Animated Breakfast SVG */}
                <div className="relative z-10 w-72 h-72 md:w-96 md:h-96">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        
                        {/* Organic Smoke/Steam Swirls */}
                        {[0, 1, 2].map((i) => (
                            <motion.path
                                key={i}
                                // Organic S-curves for steam
                                d={`M${35 + i * 15} 50 C${40 + i * 15} 40, ${30 + i * 15} 35, ${35 + i * 15} 25`}
                                stroke="#EFDACC"
                                strokeWidth="1"
                                strokeLinecap="round"
                                custom={i}
                                variants={smokeVariants}
                                initial="initial"
                                animate="animate"
                            />
                        ))}

                        {/* Plate Layers */}
                        <circle cx="50" cy="65" r="30" stroke="#EFDACC" strokeWidth="1.5" opacity="0.4" />
                        <circle cx="50" cy="65" r="26" fill="#EFDACC" fillOpacity="0.05" />

                        {/* Eggs - Minimalist Style */}
                        <g >
                            <circle cx="42" cy="60" r="9" fill="#EFDACC" />
                            <circle cx="42" cy="60" r="3.5" fill="#C1643B" />
                            
                            <circle cx="56" cy="68" r="9" fill="#EFDACC" />
                            <circle cx="56" cy="68" r="3.5" fill="#C1643B" />
                        </g>

                        {/* Crispy Bacon */}
                        <path 
                            d="M32 75 Q40 72, 48 75 T64 75" 
                            stroke="#EFDACC" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                        />
                        <path 
                            d="M35 81 Q42 78, 49 81 T60 81" 
                            stroke="#EFDACC" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            opacity="0.6"
                        />
                    </svg>
                </div>

                {/* Overlapping Text */}
                <div className="inset-0 flex items-center justify-center pointer-events-none z-0">
                    <motion.h1
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-[22vw] font-black leading-none tracking-tighter uppercase select-none opacity-20"
                        style={{ color: "#EFDACC" }}
                    >
                        Brunch
                    </motion.h1>
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
                    <div className="md:col-span-7 lg:col-span-6">
                        <motion.span variants={itemVariants} className="text-[#C1643B] font-mono tracking-[0.3em] uppercase text-xs mb-6 block">
                            The Aussie Brunch
                        </motion.span>
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1]">
                            Fresh and tasty recipes inspired by the Australian brunch scene
                        </motion.h2>
                        <motion.div variants={itemVariants} className="h-0.5 w-24 bg-slate-900 mb-8" />
                    </div>

                    <div className="md:col-span-5 lg:col-span-4 lg:col-start-8">
                        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-800 font-medium leading-tight mb-6">
                            Aussie vibes in the heart of Annecy.
                        </motion.p>
                        <motion.p variants={itemVariants} className="text-lg text-slate-500 leading-relaxed mb-8">
                            At Haven, brunch means <span className="text-slate-900 font-semibold">colourful, generous and creative plates</span>, prepared with local and seasonal ingredients.
                        </motion.p>
                        <motion.div variants={itemVariants} whileHover={{ x: 10 }} className="inline-flex items-center gap-6 group cursor-pointer">
                            <Link href="/menu">
                            <span className="text-sm font-black tracking-widest text-slate-900 uppercase">Discover the Concept</span>
                            </Link>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 group-hover:border-[#C1643B] transition-colors">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" className="group-hover:translate-x-1 transition-transform">
                                    <path d="M1 7H17M17 7L11 1M17 7L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div variants={itemVariants} className="mt-24 flex flex-wrap gap-x-12 gap-y-4 text-[10px] font-mono uppercase tracking-[0.4em] text-slate-400">
                    {["Local Sourcing", "Seasonal Menu", "Chef Crafted", "Annecy, FR"].map((text) => (
                        <span key={text} className="hover:text-[#C1643B] transition-colors cursor-default">{text}</span>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}