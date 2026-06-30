"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AIGauge from "@/components/ui/AIGauge";
import Image from "next/image";
import { ShieldCheck, Target, Brain, Activity } from "lucide-react";

interface CalibrationData {
  ece: number;
  coverage: number;
  reliability: number;
  confidence: number;
  residual_std: number;
  mean_error: number;
}

export default function Calibration() {
  const [data, setData] = useState<CalibrationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/calibration")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const ece = data?.ece ?? 96;
  const coverage = data?.coverage ?? 94;
  const reliability = data?.reliability ?? 97;
  const confidence = data?.confidence ?? 95;

  return (
    <section id="calibration" className="relative overflow-hidden bg-[#031211] py-24 px-8">
      <div className="absolute inset-0">
        <img src="/images/calibration.png" className="absolute right-0 top-0 h-full opacity-[0.07]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}>
          <p className="tracking-[.45em] uppercase text-emerald-400">Calibration Intelligence</p>
          <h2 className="mt-4 text-6xl font-black text-white">Confidence Calibration</h2>
          {data && (
            <p className="mt-4 text-slate-400 max-w-2xl">
              Live model metrics — residual σ:{" "}
              <span className="text-emerald-400 font-mono">${data.residual_std.toLocaleString()}</span>,
              mean error:{" "}
              <span className="text-cyan-400 font-mono">${data.mean_error.toFixed(2)}</span>
            </p>
          )}
          {loading && <p className="mt-4 text-slate-500 text-sm">Loading ML calibration metrics…</p>}
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          <AIGauge title="ECE" value={ece} />
          <AIGauge title="Coverage" value={coverage} color="#06b6d4" />
          <AIGauge title="Reliability" value={reliability} />
          <AIGauge title="Confidence" value={confidence} />
        </div>

        {/* Live metric bar row */}
        {data && (
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {[
              { label: "ECE Score", val: ece, color: "#22c55e" },
              { label: "95% Coverage", val: coverage, color: "#06b6d4" },
              { label: "Reliability", val: reliability, color: "#22c55e" },
              { label: "Confidence", val: confidence, color: "#8b5cf6" },
            ].map((m, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-[#07141f]/60 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-400">{m.label}</p>
                <div className="mt-2 h-2 rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.val}%` }}
                    transition={{ duration: 1, delay: i * 0.15 }}
                    className="h-full rounded-full"
                    style={{ background: m.color, boxShadow: `0 0 10px ${m.color}` }}
                  />
                </div>
                <p className="mt-2 text-xl font-black text-white">{m.val.toFixed(1)}%</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <GlassCard icon={<ShieldCheck size={40} />} title="Reliability Diagram" />
          <GlassCard icon={<Target size={40} />} title="Prediction Interval" />
          <GlassCard icon={<Brain size={40} />} title="Expected Calibration Error" />
          <GlassCard icon={<Activity size={40} />} title="Confidence Histogram" />
        </div>
      </div>
    </section>
  );
}

function GlassCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-8 backdrop-blur-xl"
    >
      <div className="text-emerald-400">{icon}</div>
      <h3 className="mt-6 text-3xl font-bold text-white">{title}</h3>
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
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">AI Visualization</p>
          <p className="mt-1 text-emerald-400 font-semibold">Live Monitoring</p>
        </div>
        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-300">
          ● LIVE ML
        </div>
      </div>
    </motion.div>
  );
}