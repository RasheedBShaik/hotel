"use client";
import { motion, Variants } from "framer-motion"; // 1. Import the type

const ExperienceSketch = () => {
  const experiencePath = "M10 150 Q 50 10, 100 100 T 190 50"; 

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full object-cover scale-110" 
        preserveAspectRatio="none"
      >
        <motion.path
          d={experiencePath}
          stroke="#EFDACC" 
          strokeWidth="0.5"
          fill="transparent"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export function ExperienceSection() {
  // 2. Add the Variants type here
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // 3. Add the Variants type here
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#C1643B] text-white py-24">
      <ExperienceSketch />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-20 mx-auto w-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12"
      >
        <div className="md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-5">
          
          <motion.h3 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tight"
          >
            Ce printemps chez Haven <br/> 
            <span className="italic font-extralight text-[#C1643B]">Connection.</span>
          </motion.h3>
        </div>

        <div className="md:col-start-8 md:col-span-5 lg:col-span-4 flex flex-col justify-center">
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl leading-relaxed mb-10"
          >
            From the rhythmic hiss of the steam wand to the warmth of the morning sun 
            hitting the oak wood, every detail at <span className="font-medium">Haven</span> is intentional. 
            We’ve built a sanctuary where time slows down and the world stays outside.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 font-bold text-sm tracking-widest cursor-pointer group"
          >
            <div className="h-[1px] w-12 bg-[#C1643B] group-hover:w-20 transition-all duration-500"></div>
            EXPLORE OUR MENU
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}