"use client";

import { motion } from "framer-motion";

const logs = [
  "> Initializing Neural Engine...",
  "> Loading Supply Chain Graph...",
  "> Calibrating Confidence...",
  "> Connecting Satellites...",
  "> Monitoring 148 Suppliers...",
  "> Ready.",
];

export default function Terminal() {
  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-black p-6 font-mono">
      {logs.map((log, i) => (
        <motion.p
          key={log}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: i * 0.4,
          }}
          className="mb-2 text-green-400"
        >
          {log}
        </motion.p>
      ))}
    </div>
  );
}