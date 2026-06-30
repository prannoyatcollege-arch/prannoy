"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function HeroBrain() {
  const { theme } = useTheme();

  return (
    <div className="relative flex items-center justify-center">

      {/* SOFT BACKGROUND BLEND GLOW (IMPORTANT FOR MERGING) */}
      <div
        className={`
          absolute w-[700px] h-[700px] rounded-full blur-3xl opacity-40
          ${theme === "dark"
            ? "bg-[radial-gradient(circle,#00f5ff33,#ff00ff22,transparent)]"
            : "bg-[radial-gradient(circle,#cfe8ff66,#ffffff22,transparent)]"
          }
        `}
      />

      {/* BRAIN IMAGE (MAIN) */}
      <Image
        src="/brain-base.png"
        alt="Neural Brain"
        width={650}
        height={650}
        className="relative z-10 mix-blend-screen"
      />

      {/* NEURAL ENERGY LINES OVERLAY */}
      <div
        className={`
          absolute inset-0 animate-pulse mix-blend-screen
          ${theme === "dark"
            ? "bg-[radial-gradient(circle_at_center,transparent_30%,#00f5ff22_50%,#ff00ff22_70%,transparent_85%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_30%,#60a5fa22_55%,#ffffff22_75%,transparent_90%)]"
          }
        `}
      />

      {/* NEURAL RINGS (DEPTH EFFECT) */}
      <div className="absolute w-[520px] h-[520px] rounded-full border border-cyan-400/20 animate-pulse" />
      <div className="absolute w-[600px] h-[600px] rounded-full border border-purple-400/10 animate-ping" />

    </div>
  );
}