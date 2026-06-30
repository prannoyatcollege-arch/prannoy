"use client";

import { motion } from "framer-motion";

export default function ScanLines() {
  return (
    <motion.div
      animate={{
        y: ["-100%", "100%"],
      }}
      transition={{
        repeat: Infinity,
        duration: 8,
        ease: "linear",
      }}
      className="pointer-events-none fixed left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
    />
  );
}