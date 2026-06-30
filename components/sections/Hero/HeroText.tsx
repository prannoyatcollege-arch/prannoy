 "use client";

import { motion } from "framer-motion";

export default function HeroText() {
  return (
    <section className="flex min-h-screen items-start justify-center pt-24 px-6">

      <motion.img
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        src="/images/prithvex-hero.png"
        alt="PRITHVEX Hero"
        className="w-full max-w-[1600px] object-contain"
      />

    </section>
  );
}