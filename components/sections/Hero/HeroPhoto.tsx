"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroPhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: .8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative flex justify-center"
    >
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[550px] w-[550px] rounded-full border border-emerald-500/20"
      />

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <Image
          src="/images/brain.png"
          alt="Brain"
          width={520}
          height={520}
          priority
          className="drop-shadow-[0_0_90px_rgba(34,197,94,.7)]"
        />
      </motion.div>
    </motion.div>
  );
}