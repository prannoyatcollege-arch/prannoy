"use client";

import { motion } from "framer-motion";

export default function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">

      {/* Pink */}
      <motion.div
        animate={{
          x: [-100, 120, -100],
          y: [-40, 40, -40],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-0 top-0 h-[650px] w-[650px] rounded-full bg-pink-500/15 blur-[160px]"
      />

      {/* Purple */}
      <motion.div
        animate={{
          x: [120, -120, 120],
          y: [50, -30, 50],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-20 h-[700px] w-[700px] rounded-full bg-violet-500/15 blur-[180px]"
      />

      {/* Blue */}
      <motion.div
        animate={{
          y: [-60, 60, -60],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[170px]"
      />

    </div>
  );
}