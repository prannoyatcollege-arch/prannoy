"use client";

import { useTheme } from "../../theme/ThemeProvider";
import Image from "next/image";

export default function BrainVisual() {
  const { theme } = useTheme();

  return (
    <div className="relative flex items-center justify-center">

      {/* BASE BRAIN */}
      <Image
        src="/brain-base.png"
        alt="Neural Brain"
        width={600}
        height={600}
        className="relative z-10"
      />

      {/* GLOW LAYER */}
      <div
        className={`
          absolute inset-0 blur-3xl opacity-70 transition-all duration-700
          ${theme === "dark"
            ? "bg-[radial-gradient(circle,#00f5ff55,#ff00ff33,transparent)]"
            : "bg-[radial-gradient(circle,#cfe8ff88,#ffffff33,transparent)]"
          }
        `}
      />

      {/* ENERGY LAYER */}
      <div
        className={`
          absolute inset-0 animate-pulse mix-blend-screen transition-all duration-700
          ${theme === "dark"
            ? "bg-gradient-to-r from-cyan-400/20 via-pink-500/20 to-purple-500/20"
            : "bg-gradient-to-r from-blue-200/20 via-white/30 to-blue-100/20"
          }
        `}
      />

    </div>
  );
}