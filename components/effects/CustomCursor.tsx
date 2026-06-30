"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 450,
    damping: 35,
  });

  const y = useSpring(mouseY, {
    stiffness: 450,
    damping: 35,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      style={{
        x,
        y,
      }}
      className="
      pointer-events-none
      fixed
      left-0
      top-0
      z-[99999]
      h-6
      w-6
      rounded-full
      border
      border-cyan-400
      bg-cyan-400/20
      backdrop-blur-xl
      shadow-[0_0_30px_rgba(34,211,238,.8)]
      "
    />
  );
}