"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const WIDTH = 700;
const HEIGHT = 220;
const POINTS = 80;

function generateWave(time: number, active: boolean) {
  const pts: { x: number; y: number }[] = [];

  for (let i = 0; i < POINTS; i++) {
    const x = (WIDTH / (POINTS - 1)) * i;

    let y =
      HEIGHT / 2 +
      Math.sin(i * 0.35 + time) * (active ? 42 : 26) +
      Math.sin(i * 0.15 + time * 1.5) * (active ? 30 : 18) +
      Math.cos(i * 0.8 + time * 0.5) * (active ? 15 : 8);

    if (Math.random() > 0.965) {
      y -= 45 + Math.random() * 35;
    }

    pts.push({ x, y });
  }

  return pts;
}

export default function EEGMonitor() {

  const [tick, setTick] = useState(0);

  const [hovered, setHovered] = useState(false);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {

    const id = setInterval(() => {
      setTick((t) => t + 0.18);
    }, 70);

    return () => clearInterval(id);

  }, []);

  const points = useMemo(
    () => generateWave(tick, hovered),
    [tick, hovered]
  );

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: hovered ? 1.02 : 1,
      }}
      transition={{
        duration: 0.25,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => {

        const rect = e.currentTarget.getBoundingClientRect();

        setMouse({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });

      }}
      className={`relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#07111fd9] p-6 backdrop-blur-2xl transition-all duration-300 ${
        hovered
          ? "shadow-[0_0_80px_rgba(0,255,255,.35)]"
          : "shadow-[0_0_45px_rgba(34,211,238,.12)]"
      }`}
    >

      <div
        className="pointer-events-none absolute rounded-full blur-[70px] transition-all duration-100"
        style={{
          left: mouse.x - 120,
          top: mouse.y - 120,
          width: 240,
          height: 240,
          background:
            "radial-gradient(circle, rgba(0,255,255,.28), transparent 70%)",
        }}
      />      <div className="mb-6 flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
            LIVE EEG
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            Neural Activity
          </h3>

        </div>

        <div className="flex items-center gap-3">

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: hovered ? 0.4 : 1,
              repeat: Infinity,
            }}
            className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]"
          />

          <span className="font-semibold text-green-300">
            LIVE
          </span>

        </div>

      </div>

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative">

        <motion.div
          animate={{
            x: ["-120%", "120%"],
          }}
          transition={{
            repeat: Infinity,
            duration: hovered ? 0.8 : 2.5,
            ease: "linear",
          }}
          className="absolute inset-y-0 z-20 w-24 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-xl"
        />

        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="relative z-10 h-44 w-full overflow-visible"
        >

          <defs>

            <linearGradient
              id="waveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#00F5FF" />
              <stop offset="35%" stopColor="#3B82F6" />
              <stop offset="65%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#FF4FD8" />
            </linearGradient>

            <filter id="waveGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

          </defs>

          <motion.path
            d={path}
            animate={{ d: path }}
            transition={{
              duration: 0.06,
              ease: "linear",
            }}
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#waveGlow)"
          />

          <motion.circle
            r="6"
            fill="#00F5FF"
            filter="url(#waveGlow)"
            animate={{
              cx: [0, WIDTH],
            }}
            transition={{
              repeat: Infinity,
              duration: hovered ? 1.2 : 2.5,
              ease: "linear",
            }}
            cy={HEIGHT / 2}
          />

        </svg>

        <div className="absolute right-4 top-3 flex flex-col gap-2 text-[10px] uppercase tracking-[0.25em] text-gray-500">

          <span>Gamma</span>
          <span>Beta</span>
          <span>Alpha</span>
          <span>Theta</span>
          <span>Delta</span>

        </div>

      </div>      <div className="mb-6 flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
            LIVE EEG
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            Neural Activity
          </h3>

        </div>

        <div className="flex items-center gap-3">

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: hovered ? 0.4 : 1,
              repeat: Infinity,
            }}
            className="h-3 w-3 rounded-full bg-green-400 shadow-[0_0_15px_#22c55e]"
          />

          <span className="font-semibold text-green-300">
            LIVE
          </span>

        </div>

      </div>

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative">

        <motion.div
          animate={{
            x: ["-120%", "120%"],
          }}
          transition={{
            repeat: Infinity,
            duration: hovered ? 0.8 : 2.5,
            ease: "linear",
          }}
          className="absolute inset-y-0 z-20 w-24 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-xl"
        />

        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="relative z-10 h-44 w-full overflow-visible"
        >

          <defs>

            <linearGradient
              id="waveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#00F5FF" />
              <stop offset="35%" stopColor="#3B82F6" />
              <stop offset="65%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#FF4FD8" />
            </linearGradient>

            <filter id="waveGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

          </defs>

          <motion.path
            d={path}
            animate={{ d: path }}
            transition={{
              duration: 0.06,
              ease: "linear",
            }}
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#waveGlow)"
          />

          <motion.circle
            r="6"
            fill="#00F5FF"
            filter="url(#waveGlow)"
            animate={{
              cx: [0, WIDTH],
            }}
            transition={{
              repeat: Infinity,
              duration: hovered ? 1.2 : 2.5,
              ease: "linear",
            }}
            cy={HEIGHT / 2}
          />

        </svg>

        <div className="absolute right-4 top-3 flex flex-col gap-2 text-[10px] uppercase tracking-[0.25em] text-gray-500">

          <span>Gamma</span>
          <span>Beta</span>
          <span>Alpha</span>
          <span>Theta</span>
          <span>Delta</span>

        </div>

      </div>      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="rounded-xl border border-cyan-400/15 bg-white/5 p-3 backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Neural Link
          </p>

          <p className="mt-2 font-semibold text-cyan-300">
            Connected
          </p>
        </div>

        <div className="rounded-xl border border-pink-400/15 bg-white/5 p-3 backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Signal
          </p>

          <motion.p
            key={hovered ? "hover" : "idle"}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="mt-2 font-semibold text-pink-300"
          >
            {hovered ? "99.9%" : "98.7%"}
          </motion.p>
        </div>

        <div className="rounded-xl border border-green-400/15 bg-white/5 p-3 backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
            Status
          </p>

          <motion.p
            animate={{
              color: hovered
                ? "#22d3ee"
                : "#86efac",
            }}
            className="mt-2 font-semibold"
          >
            {hovered
              ? "High Activity"
              : "Streaming"}
          </motion.p>
        </div>

      </div>

      <motion.div
        animate={{
          opacity: hovered
            ? [0.18, 0.3, 0.18]
            : [0.08, 0.16, 0.08],
          scale: hovered
            ? [1, 1.03, 1]
            : [1, 1.01, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.18),transparent_70%)]"
      />    </motion.div>

  );
}