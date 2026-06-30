"use client";

import { motion } from "framer-motion";

const nodes = Array.from({ length: 45 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: i * 0.08,
}));

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[#031312]" />

      {/* Radial Glow */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[180px]" />

      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-green-500/10 blur-[180px]" />

      {/* Neural Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16,185,129,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_#22c55e]"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.8, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            delay: node.delay,
          }}
        />
      ))}

      {/* Neural Lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        preserveAspectRatio="none"
      >
        {nodes.slice(0, 30).map((node, i) => {
          const next = nodes[(i + 3) % nodes.length];

          return (
            <motion.line
              key={i}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${next.x}%`}
              y2={`${next.y}%`}
              stroke="#22c55e"
              strokeWidth="1"
              animate={{
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: i * 0.08,
              }}
            />
          );
        })}
      </svg>

      {/* Horizontal Scanner */}
      <motion.div
        className="absolute left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
        animate={{
          y: ["0%", "100vh"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Vertical Scanner */}
      <motion.div
        className="absolute top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
        animate={{
          x: ["0%", "100vw"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,10,10,.92)_100%)]" />

    </div>
  );
}