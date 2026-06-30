 "use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            setLoading(false);
          }, 900);

          return 100;
        }

        return p + 1;
      });
    }, 28);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 0.8,
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#020b0a]"
        >
          {/* Background */}

          <div className="absolute inset-0">

            <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[180px]" />

            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `
                linear-gradient(rgba(34,197,94,.12) 1px,transparent 1px),
                linear-gradient(90deg,rgba(34,197,94,.12) 1px,transparent 1px)
              `,
                backgroundSize: "55px 55px",
              }}
            />

          </div>

          {/* Content */}

          <div className="relative z-20 flex flex-col items-center">

            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mb-8"
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_80px_rgba(34,197,94,.5)]">

                <span className="text-6xl">🧠</span>

              </div>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-green-300 bg-clip-text text-7xl font-black text-transparent"
            >
              PRITHVEX.OS
            </motion.h1>

            <p className="mt-3 tracking-[0.45em] text-emerald-400 uppercase">
              Powered by ENVIREX
            </p>

            <p className="mt-8 text-slate-300">
              Initializing AI Command Center...
            </p>

            {/* Progress */}

            <div className="mt-10 h-2 w-[420px] overflow-hidden rounded-full bg-slate-800">

              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-green-400"
                animate={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <motion.div
              key={progress}
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              className="mt-6 text-5xl font-black text-white"
            >
              {progress}%
            </motion.div>

            <p className="mt-3 text-sm tracking-[0.3em] text-slate-400 uppercase">

              {progress < 20 && "Loading Neural Engine"}

              {progress >= 20 &&
                progress < 40 &&
                "Connecting Global Supply Network"}

              {progress >= 40 &&
                progress < 60 &&
                "Initializing Forecast Models"}

              {progress >= 60 &&
                progress < 80 &&
                "Loading Calibration Engine"}

              {progress >= 80 &&
                progress < 100 &&
                "Activating Digital Twin"}

              {progress === 100 &&
                "WELCOME TO PRITHVEX"}

            </p>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}