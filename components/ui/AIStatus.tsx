"use client";

import { motion } from "framer-motion";

const items = [
  "AI Engine Online",
  "Forecast Running",
  "Calibration Active",
  "Explainability Ready",
  "Satellite Connected",
];

export default function AIStatus() {
  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-6">
      <h3 className="text-xl font-bold text-white">
        PRITHVEX Status
      </h3>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between"
          >
            <span className="text-slate-300">
              {item}
            </span>

            <motion.div
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className="h-3 w-3 rounded-full bg-green-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}