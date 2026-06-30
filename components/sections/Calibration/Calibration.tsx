"use client";

import { motion } from "framer-motion";
import AIGauge from "@/components/ui/AIGauge";
import Image from "next/image";
import {
  ShieldCheck,
  Target,
  Brain,
  Activity,
} from "lucide-react";

export default function Calibration() {
  return (
    <section
      id="calibration"
      className="relative overflow-hidden bg-[#031211] py-24 px-8"
    >
      <div className="absolute inset-0">

        <img
          src="/images/calibration.png"
          className="absolute right-0 top-0 h-full opacity-[0.07]"
        />

      </div>

      <div className="relative mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="tracking-[.45em] uppercase text-emerald-400">
            Calibration Intelligence
          </p>

          <h2 className="mt-4 text-6xl font-black text-white">
            Confidence Calibration
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">

          <AIGauge
            title="ECE"
            value={96}
          />

          <AIGauge
            title="Coverage"
            value={94}
            color="#06b6d4"
          />

          <AIGauge
            title="Reliability"
            value={97}
          />

          <AIGauge
            title="Confidence"
            value={95}
          />

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">

          <GlassCard
            icon={<ShieldCheck size={40} />}
            title="Reliability Diagram"
          />

          <GlassCard
            icon={<Target size={40} />}
            title="Prediction Interval"
          />

          <GlassCard
            icon={<Brain size={40} />}
            title="Expected Calibration Error"
          />

          <GlassCard
            icon={<Activity size={40} />}
            title="Confidence Histogram"
          />

        </div>

      </div>
    </section>
  );
}

function GlassCard({
  icon,
  title,
}: any) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      className="rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-8 backdrop-blur-xl"
    >
      {/* Icon */}
      <div className="text-emerald-400">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mt-6 text-3xl font-bold text-white">
        {title}
      </h3>

      {/* Visualization */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-500/10">

        <Image
          src={
            title === "Reliability Diagram"
              ? "/images/calibration-reliability.png"
              : title === "Prediction Interval"
              ? "/images/calibration-prediction.png"
              : title === "Expected Calibration Error"
              ? "/images/calibration-ece.png"
              : "/images/calibration-histogram.png"
          }
          alt={title}
          width={900}
          height={600}
          className="h-64 w-full object-cover transition duration-500 hover:scale-105"
        />

      </div>

      {/* Status */}
      <div className="mt-6 flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">
            AI Visualization
          </p>

          <p className="mt-1 text-emerald-400 font-semibold">
            Live Monitoring
          </p>
        </div>

        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-300">
          ● LIVE
        </div>

      </div>

    </motion.div>
  );
}