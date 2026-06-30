"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
}

export default function TiltCard({ children }: TiltCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const shadowX = useTransform(rotateY, [-20, 20], [-40, 40]);
  const shadowY = useTransform(rotateX, [-20, 20], [40, -40]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateYValue = ((x / rect.width) - 0.5) * 20;
    const rotateXValue = -((y / rect.height) - 0.5) * 20;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        boxShadow: `${shadowX.get()}px ${shadowY.get()}px 80px rgba(34,211,238,.25)`
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}