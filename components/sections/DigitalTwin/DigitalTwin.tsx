"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FlightPath from "@/components/world/FlightPath";
import Radar from "@/components/world/Radar";

const cities = [
  { name: "Los Angeles", x: "12%", y: "82%" },
  { name: "Hamburg", x: "50%", y: "56%" },
  { name: "Dubai", x: "63%", y: "92%" },
  { name: "Mumbai", x: "67%", y: "99%" },
  { name: "Singapore", x: "77%", y: "75%" },
  { name: "Shanghai", x: "84%", y: "77%" },
];

interface DTEvent { icon: string; text: string }
interface DTData {
  global_risk_pct: number;
  active_suppliers: number;
  ships_active: number;
  flights_active: number;
  risk_level: string;
  events: DTEvent[];
}

const RISK_COLORS: Record<string, "red" | "yellow" | "green"> = {
  HIGH: "red",
  MEDIUM: "yellow",
  LOW: "green",
};

function RiskCard({ title, value, color }: { title: string; value: string; color: "red" | "green" | "cyan" | "yellow" }) {
  const colors = { red: "bg-red-500", green: "bg-green-500", cyan: "bg-cyan-500", yellow: "bg-yellow-400" };
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative h-[150px] rounded-2xl border border-emerald-500/20 bg-[#07141f]/80 p-6 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(34,197,94,.25)] transition-all duration-500"
    >
      <div className="absolute right-5 top-5 flex gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_20px_#22c55e]" />
        <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_20px_#06b6d4]" style={{ animationDelay: "0.3s" }} />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_20px_#facc15]" style={{ animationDelay: "0.6s" }} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-slate-400">{title}</p>
        <div className={`h-3 w-3 rounded-full animate-pulse ${colors[color]}`} />
      </div>
      <h2 className="mt-4 text-5xl font-black text-white">{value}</h2>
    </motion.div>
  );
}

function EventCard({ icon, text }: { icon: string; text: string }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300 flex items-start gap-3"
    >
      <span className="text-lg">{icon}</span>
      <span>{text}</span>
    </motion.div>
  );
}

export default function DigitalTwin() {
  const [data, setData] = useState<DTData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/digital-twin")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));

    // Refresh every 30s for "live" feel
    const interval = setInterval(() => {
      fetch("/api/digital-twin")
        .then((r) => r.json())
        .then(setData)
        .catch(() => {});
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  const riskPct = data?.global_risk_pct ?? 72;
  const suppliers = data?.active_suppliers ?? 148;
  const ships = data?.ships_active ?? 42;
  const flights = data?.flights_active ?? 18;
  const riskLevel = data?.risk_level ?? "HIGH";
  const riskColor = RISK_COLORS[riskLevel] ?? "red";

  const events: DTEvent[] = data?.events ?? [
    { icon: "🌪", text: "Cyclone detected near Singapore" },
    { icon: "🚢", text: "Port congestion increased in Hamburg" },
    { icon: "📈", text: "Demand forecast updated" },
    { icon: "🤖", text: "AI recalibrated uncertainty interval" },
    { icon: "🌧", text: "Heavy rainfall alert in Mumbai" },
  ];

  return (
    <section id="digital-twin" className="relative overflow-hidden bg-[#020b0a] py-24 px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-4 mb-2">
          <p className="uppercase tracking-[0.4em] text-emerald-400">Live Global Monitoring</p>
          {!loading && (
            <span className="text-xs text-green-400 border border-green-500/20 rounded-full px-3 py-1 animate-pulse">
              ● ML CONNECTED
            </span>
          )}
          {loading && (
            <span className="text-xs text-yellow-400 border border-yellow-500/20 rounded-full px-3 py-1">
              ● CONNECTING…
            </span>
          )}
        </div>

        <h1 className="mt-4 text-6xl font-black text-white">Digital Twin</h1>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Map */}
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-6">
            <Image src="/images/world-map.png" alt="World Map" fill priority className="object-cover opacity-70" />
            <svg className="absolute inset-0 h-full w-full pointer-events-none">
              <path d="M110 170 C260 330 520 220 760 420" stroke="#22c55e" strokeWidth="2" fill="none" opacity=".35" />
              <path d="M720 210 C610 120 420 90 250 200" stroke="#06b6d4" strokeWidth="2" fill="none" opacity=".35" />
            </svg>
            <FlightPath />
            <Radar />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute right-10 top-10 h-40 w-40 rounded-full border border-cyan-400/20"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute right-[122px] top-[122px] h-20 w-1 origin-bottom bg-gradient-to-t from-cyan-400 to-transparent"
            />

            {cities.map((city) => (
              <motion.div
                key={city.name}
                className="absolute"
                style={{ left: city.x, top: city.y }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <p className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 px-2 py-1 text-[11px] font-semibold text-white">
                  {city.name}
                </p>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="relative h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_25px_#22c55e]"
                >
                  <div className="absolute inset-0 rounded-full border border-emerald-300 animate-ping" />
                </motion.div>
              </motion.div>
            ))}

            {/* Plane 1 */}
            <motion.div
              className="absolute z-30 text-2xl drop-shadow-[0_0_12px_white]"
              animate={{ left: ["13%", "76%"], top: ["40%", "57%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >✈️</motion.div>

            {/* Plane 2 */}
            <motion.div
              className="absolute text-xl"
              animate={{ left: ["61%", "76%"], top: ["60%", "67%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >✈️</motion.div>

            {/* Ship */}
            <motion.div
              className="absolute text-xl"
              animate={{ left: ["60%", "82%"], top: ["55%", "40%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >🚢</motion.div>

            {/* Risk overlay */}
            <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 backdrop-blur-sm px-4 py-2 border border-white/10">
              <p className="text-xs text-slate-400">ML Risk Assessment</p>
              <p className={`text-lg font-black ${riskColor === "red" ? "text-red-400" : riskColor === "yellow" ? "text-yellow-400" : "text-green-400"}`}>
                {riskLevel} — {riskPct}%
              </p>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-6">
            <RiskCard title="Global Risk (ML)" value={`${riskPct}%`} color={riskColor} />
            <RiskCard title="Active Suppliers" value={`${suppliers}`} color="green" />
            <RiskCard title="Ships Active" value={`${ships}`} color="cyan" />
            <RiskCard title="Flights Active" value={`${flights}`} color="yellow" />

            <div>
              <h2 className="mb-4 text-2xl font-bold text-white">
                Live AI Events{" "}
                <span className="text-sm text-emerald-400 font-normal ml-2">from ML pipeline</span>
              </h2>
              <div className="space-y-3">
                {events.map((e, i) => (
                  <EventCard key={i} icon={e.icon} text={e.text} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}