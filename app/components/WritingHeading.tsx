"use client";

import { motion } from "framer-motion";
import { ReactNode, ElementType } from "react";

interface RevealHeadingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  as?: ElementType; // Allows switching between h1, h2, div, etc.
  bgColor?: string; // Must match the background of your section
}

export default function RevealHeading({
  children,
  className = "",
  duration = 2,
  delay = 0,
  as: Component = "h1",
  bgColor = "bg-white",
}: RevealHeadingProps) {
  return (
    <div className="relative inline-block overflow-hidden align-bottom">
      {/* The Text Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, delay }}
      >
        <Component
          className={`font-black tracking-tight select-none ${className}`}
          style={{ fontFamily: "var(--font-din-text), sans-serif" }}
        >
          {children}
        </Component>
      </motion.div>

      {/* The Reveal Mask */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "102%" }} // 102% ensures no sub-pixel lines remain
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.45, 0, 0.55, 1],
        }}
        className={`absolute inset-0 z-10 ${bgColor}`}
      />
    </div>
  );
}