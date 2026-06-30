"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: "8%", y: "18%" },
  { x: "22%", y: "42%" },
  { x: "35%", y: "22%" },
  { x: "48%", y: "62%" },
  { x: "60%", y: "30%" },
  { x: "74%", y: "58%" },
  { x: "88%", y: "18%" },
  { x: "82%", y: "74%" },
  { x: "18%", y: "74%" },
];

export default function NeuralBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Glow */}

      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[180px]" />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
          linear-gradient(rgba(34,197,94,.25) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,197,94,.25) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Horizontal Scanner */}

      <motion.div
        animate={{
          y: ["-10%", "110%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear",
        }}
        className="absolute left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70"
      />

      {/* Nodes */}

      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: node.x,
            top: node.y,
          }}
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
          }}
        >
          <div className="h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_25px_#22c55e]" />
        </motion.div>
      ))}

      {/* Floating Particles */}

      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
          initial={{
            x: Math.random() * 1600,
            y: Math.random() * 900,
          }}
          animate={{
            y: [null, -120],
            opacity: [0, 1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 5,
          }}
        />
      ))}

    </div>
  );
}