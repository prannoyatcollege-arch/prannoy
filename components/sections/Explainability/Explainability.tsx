"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, ShieldCheck, Sparkles, BarChart3 } from "lucide-react";

interface Feature {
  name: string;
  value: number;
}

interface ExplainData {
  features: Feature[];
  prediction_confidence: number;
  calibration_label: string;
  prediction_interval: string;
  narrative: string;
}

const FEATURE_COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#8b5cf6"];

export default function Explainability() {
  const [data, setData] = useState<ExplainData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/explainability")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const features: Feature[] = data?.features ?? [
    { name: "Cyclone Risk", value: 34 },
    { name: "Port Congestion", value: 27 },
    { name: "Weather Impact", value: 18 },
    { name: "Supplier Health", value: 14 },
    { name: "Inventory", value: 9 },
  ];

  const predConf = data?.prediction_confidence ?? 96.2;
  const calibLabel = data?.calibration_label ?? "Excellent";
  const predInterval = data?.prediction_interval ?? "±2.4%";

  return (
    <section id="explainability" className="relative overflow-hidden bg-[#020b0a] py-24 px-8">
      <div className="absolute inset-0">
        <img src="/images/brain.png" className="absolute right-0 top-0 h-full opacity-[0.06]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <p className="uppercase tracking-[.4em] text-cyan-400">Explainable AI</p>
        <h1 className="mt-4 text-6xl font-black text-white">AI Decision Intelligence</h1>
        {loading && <p className="mt-4 text-slate-500 text-sm">Loading ML feature importances…</p>}

        <div className="mt-16 grid gap-8 lg:grid-cols-[420px_1fr]">
          {/* Left */}
          <div className="rounded-3xl border border-cyan-500/20 bg-[#07141f]/80 p-8">
            <div className="flex items-center gap-4">
              <Brain className="h-10 w-10 text-cyan-400" />
              <h2 className="text-3xl font-black text-white">AI Explanation</h2>
            </div>

            <div className="mt-10 space-y-6">
              <Info
                icon={<ShieldCheck />}
                title="Prediction Confidence"
                value={`${predConf.toFixed(1)}%`}
                live
              />
              <Info
                icon={<Sparkles />}
                title="Calibration"
                value={calibLabel}
                live
              />
              <Info
                icon={<BarChart3 />}
                title="Prediction Interval"
                value={predInterval}
                live
              />
            </div>

            {data && (
              <div className="mt-8 rounded-2xl border border-cyan-500/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">
                  Top Feature Drivers
                </p>
                {data.features.slice(0, 3).map((f, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-slate-300">{f.name}</span>
                    <span className="text-sm font-bold" style={{ color: FEATURE_COLORS[i] }}>
                      {f.value}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right */}
          <div className="rounded-3xl border border-cyan-500/20 bg-[#07141f]/80 p-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-white">SHAP Feature Importance</h2>
              <span className="text-xs text-emerald-400 border border-emerald-500/20 rounded-full px-3 py-1">
                {data ? "● LIVE ML" : "● LOADING"}
              </span>
            </div>

            <div className="space-y-8">
              {features.map((item, i) => (
                <div key={i}>
                  <div className="mb-2 flex justify-between">
                    <span className="text-white">{item.name}</span>
                    <span style={{ color: FEATURE_COLORS[i % FEATURE_COLORS.length] }}>
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(item.value * 2.5, 100)}%` }}
                      transition={{ duration: 0.8, delay: i * 0.15 }}
                      className="h-full rounded-full"
                      style={{
                        background: FEATURE_COLORS[i % FEATURE_COLORS.length],
                        boxShadow: `0 0 20px ${FEATURE_COLORS[i % FEATURE_COLORS.length]}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-emerald-500/20 bg-black/20 p-6">
              <p className="text-lg text-slate-300">
                {data ? (
                  <span dangerouslySetInnerHTML={{ __html: data.narrative }} />
                ) : (
                  <>
                    🤖 AI concluded that the current disruption is primarily driven by{" "}
                    <span className="font-bold text-red-400">Cyclone Risk</span> and{" "}
                    <span className="font-bold text-orange-400">Port Congestion</span>.
                    Re-routing through Singapore reduces predicted delays by 18%.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ icon, title, value, live }: { icon: React.ReactNode; title: string; value: string; live?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-center gap-4">
        <div className="text-cyan-400">{icon}</div>
        <span className="text-white">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {live && <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />}
        <span className="font-bold text-emerald-400">{value}</span>
      </div>
    </div>
  );
}