"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Outer Glow */}

      <motion.div
        animate={{
          x: mouse.x - 25,
          y: mouse.y - 25,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-14 w-14 rounded-full bg-cyan-400/20 blur-xl"
      />

      {/* Neon Ring */}

      <motion.div
        animate={{
          x: mouse.x - 12,
          y: mouse.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 30,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-6 w-6 rounded-full border-2 border-cyan-300"
      />

      {/* Core */}

      <motion.div
        animate={{
          x: mouse.x - 3,
          y: mouse.y - 3,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 40,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_#22d3ee]"
      />
    </>
  );
}