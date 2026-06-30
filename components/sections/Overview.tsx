"use client";

import AIGauge from "@/components/ui/AIGauge";
import { motion } from "framer-motion";
import MetricCard from "@/components/ui/MetricCard";
import { useML } from "@/lib/MLContext";
import { useEffect, useState } from "react";

export default function Overview() {
  const { kpi, loading, error } = useML();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Derive percentage metrics from KPI
  const confidence = kpi?.confidence_pct ?? 94;
  const globalRiskNum =
    kpi?.global_risk === "HIGH" ? 72 : kpi?.global_risk === "MEDIUM" ? 48 : 28;
  const supplyHealth = kpi
    ? Math.max(0, Math.min(100, 100 - globalRiskNum * 0.5))
    : 87;
  const forecastAccuracy = kpi ? Math.min(99, confidence + 2) : 92;

  const feedItems = kpi
    ? [
        {
          title: `ML Forecast: $${kpi.base_forecast.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
          time: `${elapsed}s ago`,
          color: "text-green-400",
        },
        {
          title: `Risk Level: ${kpi.global_risk} — ${kpi.recommendation}`,
          time: `${elapsed}s ago`,
          color: kpi.global_risk === "HIGH" ? "text-red-400" : kpi.global_risk === "MEDIUM" ? "text-yellow-400" : "text-green-400",
        },
        {
          title: `Optimal EOQ: ${kpi.optimal_order_qty} units → $${kpi.min_inventory_cost.toLocaleString()}`,
          time: `${elapsed}s ago`,
          color: "text-cyan-400",
        },
        {
          title: `95% CI: $${kpi.lower_95.toLocaleString(undefined, { maximumFractionDigits: 0 })} – $${kpi.upper_95.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
          time: `${elapsed}s ago`,
          color: "text-purple-400",
        },
        {
          title: `Model σ = ${kpi.residual_std.toFixed(2)} · Confidence ${kpi.confidence_pct}%`,
          time: `${elapsed}s ago`,
          color: "text-emerald-400",
        },
      ]
    : [
        { title: "Demand Forecast Updated", time: "2 sec ago", color: "text-green-400" },
        { title: "Cyclone Risk Increased", time: "14 sec ago", color: "text-red-400" },
        { title: "Port Congestion Detected", time: "27 sec ago", color: "text-orange-400" },
        { title: "Prediction Interval Recalibrated", time: "1 min ago", color: "text-cyan-400" },
        { title: "SHAP Explanation Updated", time: "3 min ago", color: "text-purple-400" },
      ];

  return (
    <section id="overview" className="relative overflow-hidden py-24 px-8">
      <div className="absolute inset-0">
        <img src="/images/brain.png" className="absolute right-0 top-0 h-full opacity-[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="tracking-[.45em] uppercase text-emerald-400">Executive Dashboard</p>
          <h1 className="mt-4 text-6xl font-black text-white">AI Command Center</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Monitor calibration, uncertainty, explainability and worldwide supply-chain disruptions in one
            unified AI platform — powered by a live XGBoost ML model.
          </p>
          {loading && <p className="mt-3 text-sm text-yellow-400 animate-pulse">Connecting to ML backend…</p>}
          {error && <p className="mt-3 text-sm text-red-400">⚠️ ML backend offline — showing defaults. Start the Python server to activate live predictions.</p>}
          {kpi && !loading && (
            <p className="mt-3 text-sm text-emerald-400">
              ✓ ML pipeline connected · forecast ${kpi.base_forecast.toLocaleString()} · risk {kpi.global_risk}
            </p>
          )}
        </motion.div>

        {/* KPI Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <MetricCard title="AI Confidence" value={Math.round(confidence)} status="good" />
          <MetricCard title="Supply Health" value={Math.round(supplyHealth)} status="good" />
          <MetricCard title="Global Risk" value={globalRiskNum} status={globalRiskNum > 60 ? "danger" : "warning"} />
          <MetricCard title="Calibration" value={96} status="good" />
          <MetricCard title="Forecast Accuracy" value={Math.round(forecastAccuracy)} status="good" />
          <MetricCard title="ESG Score" value={84} status="warning" />
        </div>

        {/* Gauges */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <AIGauge title="AI Confidence" value={Math.round(confidence)} />
          <AIGauge title="Supply Health" value={Math.round(supplyHealth)} color="#06b6d4" />
          <AIGauge title="Global Risk" value={globalRiskNum} color="#f97316" />
        </div>

        {/* Live AI Feed */}
        <div className="mt-20 rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-8 backdrop-blur-xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-black text-white">Live ML Feed</h2>
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${kpi ? "animate-pulse bg-green-400" : "bg-yellow-400"}`} />
              <span className={kpi ? "text-emerald-400" : "text-yellow-400"}>
                {kpi ? "ML LIVE" : "CONNECTING"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {feedItems.map((item, i) => (
              <Event key={i} title={item.title} time={item.time} color={item.color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Event({ title, time, color }: { title: string; time: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-6 py-4">
      <div className="flex items-center gap-4">
        <div className={`h-3 w-3 rounded-full animate-pulse ${color.replace("text", "bg")}`} />
        <p className="text-white">{title}</p>
      </div>
      <p className={`text-sm ${color}`}>{time}</p>
    </div>
  );
}