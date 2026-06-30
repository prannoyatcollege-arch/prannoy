"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const links = [
  "Overview",
  "Calibration",
  "Forecast",
  "Explainability",
  "Digital Twin",
  "Architecture",
  "Research",
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-emerald-500/20 bg-[#041312]/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-500/20 p-3">
            <Cpu className="h-7 w-7 text-emerald-400" />
          </div>

          <div>
            <h1 className="text-xl font-black text-white">
              PRITHVEX AI
            </h1>

            <p className="text-xs text-emerald-400">
              Command Center
            </p>
          </div>
        </div>

        <div className="hidden gap-8 lg:flex">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm text-slate-300 transition hover:text-emerald-400"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}