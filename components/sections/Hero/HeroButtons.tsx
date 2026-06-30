"use client";

import { motion } from "framer-motion";

export default function HeroButtons() {
  return (
    <div className="mt-12 flex flex-wrap gap-6">

      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 35px #22c55e",
        }}
        whileTap={{ scale: .95 }}
        className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-bold text-white"
      >
        🚀 Launch PRITHVEX AI
      </motion.button>

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        className="rounded-xl border border-emerald-400 px-8 py-4 text-emerald-300"
      >
        🌍 Digital Twin
      </motion.button>

    </div>
  );
}