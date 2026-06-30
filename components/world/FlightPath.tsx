"use client";

import { motion } from "framer-motion";

export default function FlightPath() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 600"
    >
      <defs>
        <linearGradient id="flight" x1="0" x2="1">
          <stop offset="0%" stopColor="#22c55e"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>

      <path
        d="M140 260 C260 120 520 140 760 300"
        stroke="url(#flight)"
        strokeWidth="2"
        fill="none"
        opacity=".3"
      />

      <motion.circle
        r="5"
        fill="#22c55e"
        animate={{
          offsetDistance:["0%","100%"]
        }}
        transition={{
          repeat:Infinity,
          duration:6,
          ease:"linear"
        }}
        style={{
          offsetPath:"path('M140 260 C260 120 520 140 760 300')"
        }}
      />

    </svg>
  );
}