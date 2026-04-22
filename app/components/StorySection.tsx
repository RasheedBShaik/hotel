"use client";

import { motion, Variants } from "framer-motion";

export default function StorySection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center bg-[#FAF9F6] overflow-hidden py-24">
            
            {/* 1. BACKGROUND SVG ANIMATION (Z-0) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -12" result="goo" />
                        </filter>
                    </defs>
                    <g filter="url(#goo)">
                        <motion.circle
                            cx="25%" cy="35%" r="180" fill="#C1643B"
                            animate={{ cx: ["25%", "35%", "20%", "25%"], scale: [1, 1.1, 0.9, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle
                            cx="75%" cy="65%" r="220" fill="#EFDACC"
                            animate={{ cx: ["75%", "60%", "80%", "75%"], scale: [1, 0.9, 1.1, 1] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </g>
                </svg>
            </div>

            {/* 2. CONTENT LAYER (Z-10) */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative z-10 mx-auto w-full px-6 md:px-16"
            >
                {/* Main Box: Reduced padding to ensure content fits */}
                <div className="flex flex-col md:flex-row items-center gap-10 bg-[#C1643B] p-8 md:p-16 lg:p-24 text-white shadow-2xl relative overflow-hidden min-h-125">
                    
                    {/* Subtle Internal Shine (Lower Z-index than text) */}
                    <motion.div 
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                    />

                    {/* Left Column */}
                    <div className="flex-1 z-20">
                        <motion.div
                            variants={itemVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter"
                        >
                            A warm place, <br />
                            a passionate team… <br />
                            <span className="italic font-light opacity-80">
                                a story to share.
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Column - Explicitly styled for visibility */}
                    <div className="flex-1 z-20 flex flex-col justify-center">
                        <motion.div variants={itemVariants} className="max-w-xl space-y-6">
                            <p className="text-lg md:text-xl leading-relaxed font-medium text-white">
                                Where passion and people are at the centre of everything.
                                From the careful selection of our beans to the local ingredients on your plate,
                                let’s share together a love for flavour and craftsmanship.
                            </p>  
                            <div className="h-px w-12 bg-white/40" />
                            
                            {/* Added extra text to fill space as requested previously */}
                            <p className="text-sm md:text-base opacity-90 leading-relaxed font-light">
                                Every harvest is a new chapter. We partner with local farmers to ensure 
                                that what ends up in your cup is as sustainable as it is delicious.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Link */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 flex justify-center lg:justify-start"
                >
                    <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.4em] group cursor-pointer text-slate-900">
                        <span className="h-px w-8 bg-[#C1643B] group-hover:w-16 transition-all duration-500"></span>
                        FOLLOW THE JOURNEY
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}