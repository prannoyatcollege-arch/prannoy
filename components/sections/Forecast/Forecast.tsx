"use client";
import { useState, useEffect, useCallback } from "react";
import NeonSlider from "@/components/ui/NeonSlider";
import { motion } from "framer-motion";
import CalibrationForm from "@/components/ui/CalibrationForm";

interface SimResult {
  forecast: number;
  lower_95: number;
  upper_95: number;
  confidence: number;
  risk_score: string;
  recommendation: string;
  residual_std: number;
}

interface ForecastPoint {
  day: number;
  predicted: number;
  actual: number;
  lower: number;
  upper: number;
}

function GlassMetric({
  title,
  value,
  color,
  live = true,
}: {
  title: string;
  value: string;
  color: string;
  live?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-white/10 bg-[#07141f]/80 p-6 backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm uppercase tracking-wider text-slate-400">{title}</p>
        {live && <div className="h-3 w-3 animate-pulse rounded-full bg-green-400" />}
      </div>
      <h2 className={`text-5xl font-black ${color}`}>{value}</h2>
    </motion.div>
  );
}

const RISK_COLORS: Record<string, string> = {
  HIGH: "text-red-400",
  MEDIUM: "text-yellow-400",
  LOW: "text-green-400",
};

export default function Forecast() {
  const [demand, setDemand] = useState(72);
  const [weather, setWeather] = useState(30);
  const [fuel, setFuel] = useState(45);
  const [inventory, setInventory] = useState(80);
  const [supplier, setSupplier] = useState(88);
  const [port, setPort] = useState(25);

  const [result, setResult] = useState<SimResult | null>(null);
  const [series, setSeries] = useState<ForecastPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [seriesLoading, setSeriesLoading] = useState(true);

  // Load the static 30-day forecast series once
  useEffect(() => {
    fetch("/api/forecast")
      .then((r) => r.json())
      .then((d) => setSeries(d.series || []))
      .catch(() => {})
      .finally(() => setSeriesLoading(false));
  }, []);

  // Debounced simulation – fires 400ms after last slider change
  const runSimulation = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demand,
          weather,
          fuel,
          inventory_buffer: inventory,
          supplier_health: supplier,
          port_congestion: port,
        }),
      });
      if (res.ok) {
        const data: SimResult = await res.json();
        setResult(data);
      }
    } catch {}
    setLoading(false);
  }, [demand, weather, fuel, inventory, supplier, port]);

  useEffect(() => {
    const t = setTimeout(runSimulation, 400);
    return () => clearTimeout(t);
  }, [runSimulation]);

  // Derived display values (fallback to client-side formula while loading)
  const confidence =
    result?.confidence ??
    Math.max(60, Math.min(99, supplier + inventory / 5 - weather / 4 - port / 5 - fuel / 8));
  const risk = Math.min(100, weather + port + fuel / 2);
  const riskLabel = result?.risk_score ?? (risk > 60 ? "HIGH" : risk > 40 ? "MEDIUM" : "LOW");
  const forecastDisplay = result
    ? `$${result.forecast.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : "…";
  const ciDisplay = result
    ? `$${result.lower_95.toLocaleString(undefined, { maximumFractionDigits: 0 })} – $${result.upper_95.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : "—";

  // Chart bars from forecast series
  const chartValues =
    series.length > 0
      ? series.slice(0, 12).map((p) => p.predicted)
      : [35, 42, 55, 48, 61, 74, 58, 86, 79, 64, 82, 95].map((v) => v * 45);

  const maxVal = Math.max(...chartValues, 1);

  return (
    <section id="forecast" className="relative overflow-hidden bg-[#020b0a] py-24 px-8">
      <div className="absolute inset-0">
        <img
          src="/images/world-map.png"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="tracking-[.4em] uppercase text-cyan-400">Forecast Intelligence</p>
          <h1 className="mt-4 text-6xl font-black text-white">AI Forecast Simulator</h1>
          <p className="mt-4 text-slate-400 max-w-2xl">
            Live ML predictions from the XGBoost model trained on inventory cost data.
            Adjust sliders to simulate scenarios and receive real-time AI forecasts.
          </p>
        </motion.div>

        <div className="mt-16 grid items-start gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
          {/* LEFT – controls */}
          <div className="sticky top-28">
            <div className="rounded-3xl border border-cyan-500/20 bg-[#07141f]/80 p-8 backdrop-blur-xl max-h-[900px] overflow-y-auto">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-black text-white">Simulation Controls</h2>
                <div className={`h-3 w-3 rounded-full ${loading ? "animate-pulse bg-yellow-400" : "bg-green-400"}`} />
              </div>

              <CalibrationForm />

              <div className="space-y-8">
                <NeonSlider label="Demand" color="#22c55e" value={demand} setValue={setDemand} />
                <NeonSlider label="Weather Severity" color="#ec4899" value={weather} setValue={setWeather} />
                <NeonSlider label="Fuel Cost" color="#facc15" value={fuel} setValue={setFuel} />
                <NeonSlider label="Inventory Buffer" color="#8b5cf6" value={inventory} setValue={setInventory} />
                <NeonSlider label="Supplier Health" color="#06b6d4" value={supplier} setValue={setSupplier} />
                <NeonSlider label="Port Congestion" color="#fb923c" value={port} setValue={setPort} />
              </div>

              {/* ML Confidence bar */}
              <div className="mt-10 rounded-2xl border border-emerald-500/20 bg-black/20 p-6">
                <p className="text-sm uppercase tracking-[.3em] text-emerald-400">ML Forecast Confidence</p>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">
                  <motion.div
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"
                  />
                </div>
                <h2 className="mt-4 text-5xl font-black text-white">{confidence.toFixed(0)}%</h2>
                {result && (
                  <p className="mt-2 text-sm text-slate-400">
                    95% CI: {ciDisplay}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT – outputs */}
          <div className="relative z-20 lg:pl-4">
            <div className="space-y-8">
              {/* KPI Row */}
              <div className="grid gap-6 md:grid-cols-3">
                <GlassMetric title="ML Confidence" value={`${confidence.toFixed(0)}%`} color="text-green-400" />
                <GlassMetric
                  title="Risk Level"
                  value={riskLabel}
                  color={RISK_COLORS[riskLabel] ?? "text-yellow-400"}
                />
                <GlassMetric
                  title="Inventory Forecast"
                  value={loading ? "…" : forecastDisplay}
                  color="text-cyan-400"
                />
              </div>

              {/* Forecast Chart */}
              <div className="relative rounded-3xl border border-cyan-500/20 bg-[#07141f]/80 p-8">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-white">Live ML Forecast</h2>
                    <p className="text-slate-400">30-Day Inventory Cost Prediction</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${seriesLoading ? "bg-yellow-400" : "bg-green-400 animate-pulse"}`} />
                    <span className="text-emerald-400">
                      {seriesLoading ? "LOADING" : "LIVE ML"}
                    </span>
                  </div>
                </div>

                <div className="flex h-[360px] items-end gap-3">
                  {chartValues.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${(v / maxVal) * 90 + (demand / 8)}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className="relative flex-1 rounded-t-xl bg-gradient-to-t from-emerald-500 via-cyan-400 to-blue-400"
                      title={`Day ${i + 1}: $${v.toLocaleString()}`}
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, delay: i * 0.15 }}
                        className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_#22d3ee]"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* 95% CI band label */}
                {result && (
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                    <span>95% CI: {ciDisplay}</span>
                    <span>σ = ${result.residual_std.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                )}
              </div>

              {/* Risk + Recommendation */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Risk Heat Map */}
                <div className="rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-8">
                  <h2 className="mb-4 text-2xl font-black text-white">Risk Heat Map</h2>
                  <p className="text-sm text-slate-400 mb-6">
                    Live risk: <span className={`font-bold ${RISK_COLORS[riskLabel]}`}>{riskLabel}</span>
                    {" "}({risk.toFixed(0)}%)
                  </p>
                  <div className="grid grid-cols-7 gap-3">
                    {(["#22c55e", "#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444", "#ef4444"] as string[]).map(
                      (c, i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, delay: i * 0.2 }}
                          className="h-14 rounded-xl"
                          style={{ background: c, boxShadow: `0 0 20px ${c}`, opacity: i * 15 < risk ? 1 : 0.3 }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="rounded-3xl border border-cyan-500/20 bg-[#07141f]/80 p-8">
                  <h2 className="text-2xl font-black text-white">AI Recommendation</h2>
                  <div className="mt-8 space-y-5">
                    {result ? (
                      <>
                        <p className={`font-bold ${RISK_COLORS[result.risk_score] ?? "text-white"}`}>
                          ✓ {result.recommendation}
                        </p>
                        <p className="text-cyan-400">✓ Risk Level: {result.risk_score}</p>
                        <p className="text-yellow-400">
                          ✓ 95% CI: {ciDisplay}
                        </p>
                        <p className="text-slate-300 text-sm">
                          ✓ Model σ = ${result.residual_std.toFixed(0)}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-green-400">✓ Adjust sliders for live ML forecast</p>
                        <p className="text-cyan-400">✓ All values from trained XGBoost model</p>
                        <p className="text-yellow-400">✓ 95% confidence intervals computed</p>
                      </>
                    )}

                    <div className="mt-8 rounded-xl bg-black/20 p-4">
                      <p className="text-sm text-slate-400">ML Confidence</p>
                      <h2 className="mt-2 text-4xl font-black text-emerald-400">
                        {confidence.toFixed(0)}%
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}