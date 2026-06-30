"use client";

import { motion } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  Sparkles,
  BarChart3,
} from "lucide-react";

const features = [
  { name: "Cyclone Risk", value: 34, color: "#ef4444" },
  { name: "Port Congestion", value: 27, color: "#f97316" },
  { name: "Weather Impact", value: 18, color: "#eab308" },
  { name: "Supplier Health", value: 14, color: "#22c55e" },
  { name: "Inventory", value: 9, color: "#06b6d4" },
];

export default function Explainability() {
  return (
    <section
      id="explainability"
      className="relative overflow-hidden bg-[#020b0a] py-24 px-8"
    >
      <div className="absolute inset-0">
        <img
          src="/images/brain.png"
          className="absolute right-0 top-0 h-full opacity-[0.06]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">

        <p className="uppercase tracking-[.4em] text-cyan-400">
          Explainable AI
        </p>

        <h1 className="mt-4 text-6xl font-black text-white">
          AI Decision Intelligence
        </h1>

        <div className="mt-16 grid gap-8 lg:grid-cols-[420px_1fr]">

          {/* Left */}

          <div className="rounded-3xl border border-cyan-500/20 bg-[#07141f]/80 p-8">

            <div className="flex items-center gap-4">

              <Brain className="h-10 w-10 text-cyan-400"/>

              <h2 className="text-3xl font-black text-white">
                AI Explanation
              </h2>

            </div>

            <div className="mt-10 space-y-6">

              <Info
                icon={<ShieldCheck />}
                title="Prediction Confidence"
                value="96.2%"
              />

              <Info
                icon={<Sparkles />}
                title="Calibration"
                value="Excellent"
              />

              <Info
                icon={<BarChart3 />}
                title="Prediction Interval"
                value="±2.4%"
              />

            </div>

          </div>

          {/* Right */}

          <div className="rounded-3xl border border-cyan-500/20 bg-[#07141f]/80 p-8">

            <h2 className="mb-10 text-3xl font-black text-white">
              SHAP Feature Importance
            </h2>

            <div className="space-y-8">

              {features.map((item, i) => (

                <div key={i}>

                  <div className="mb-2 flex justify-between">

                    <span className="text-white">
                      {item.name}
                    </span>

                    <span style={{ color: item.color }}>
                      {item.value}%
                    </span>

                  </div>

                  <div className="h-3 rounded-full bg-slate-800">

                    <motion.div

                      initial={{ width: 0 }}

                      whileInView={{
                        width: `${item.value * 2.5}%`,
                      }}

                      transition={{
                        duration: .8,
                        delay: i * .15,
                      }}

                      className="h-full rounded-full"

                      style={{
                        background: item.color,
                        boxShadow: `0 0 20px ${item.color}`,
                      }}

                    />

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-12 rounded-2xl border border-emerald-500/20 bg-black/20 p-6">

              <p className="text-lg text-slate-300">

                🤖 AI concluded that the current disruption is primarily driven
                by <span className="font-bold text-red-400">Cyclone Risk</span>
                and <span className="font-bold text-orange-400">Port Congestion</span>.
                Re-routing through Singapore reduces predicted delays by 18%.

              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

function Info({ icon, title, value }: any) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5">

      <div className="flex items-center gap-4">

        <div className="text-cyan-400">
          {icon}
        </div>

        <span className="text-white">
          {title}
        </span>

      </div>

      <span className="font-bold text-emerald-400">
        {value}
      </span>

    </div>
  );
}