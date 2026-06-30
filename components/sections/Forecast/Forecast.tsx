"use client";
import { useState } from "react";
import NeonSlider from "@/components/ui/NeonSlider";
import { motion } from "framer-motion";
import CalibrationForm from "@/components/ui/CalibrationForm";
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Truck,
} from "lucide-react";
function GlassMetric({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-white/10 bg-[#07141f]/80 p-6 backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center justify-between">

        <p className="text-sm uppercase tracking-wider text-slate-400">
          {title}
        </p>

        <div className="h-3 w-3 animate-pulse rounded-full bg-green-400" />

      </div>

      <h2 className={`text-5xl font-black ${color}`}>
        {value}
      </h2>
    </motion.div>
  );
}

export default function Forecast() {
    const [demand, setDemand] = useState(72);
const [weather, setWeather] = useState(30);
const [fuel, setFuel] = useState(45);
const [inventory, setInventory] = useState(80);
const [supplier, setSupplier] = useState(88);
const [port, setPort] = useState(25);

const confidence = Math.max(
  60,
  Math.min(
    99,
    supplier +
      inventory / 5 -
      weather / 4 -
      port / 5 -
      fuel / 8
  )
);

const risk = Math.min(
  100,
  weather + port + fuel / 2
);
    return (
<section
id="forecast"
className="relative overflow-hidden bg-[#020b0a] py-24 px-8"
>

<div className="absolute inset-0">

<img
src="/images/world-map.png"
className="absolute inset-0 h-full w-full object-cover opacity-[0.05]"
/>

<div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"/>

</div>

<div className="relative mx-auto max-w-7xl">

<motion.div
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
transition={{duration:.8}}
>

<p className="tracking-[.4em] uppercase text-cyan-400">
Forecast Intelligence
</p>

<h1 className="mt-4 text-6xl font-black text-white">
AI Forecast Simulator
</h1>

</motion.div>

<div className="mt-16 grid items-start gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
{/* LEFT */}
<div className="sticky top-28">

<div className="rounded-3xl border border-cyan-500/20 bg-[#07141f]/80 p-8 backdrop-blur-xl max-h-[900px] overflow-y-auto">

<div className="mb-8 flex items-center justify-between">

<h2 className="text-3xl font-black text-white">
  Simulation Controls
</h2>

<div className="h-3 w-3 animate-pulse rounded-full bg-green-400"/>

</div>

<CalibrationForm />

<div className="space-y-8">

<NeonSlider
label="Demand"
color="#22c55e"
value={demand}
setValue={setDemand}
/>

<NeonSlider
label="Weather Severity"
color="#ec4899"
value={weather}
setValue={setWeather}
/>

<NeonSlider
label="Fuel Cost"
color="#facc15"
value={fuel}
setValue={setFuel}
/>

<NeonSlider
label="Inventory Buffer"
color="#8b5cf6"
value={inventory}
setValue={setInventory}
/>

<NeonSlider
label="Supplier Health"
color="#06b6d4"
value={supplier}
setValue={setSupplier}
/>

<NeonSlider
label="Port Congestion"
color="#fb923c"
value={port}
setValue={setPort}
/>

</div>

<div className="mt-10 rounded-2xl border border-emerald-500/20 bg-black/20 p-6">

<p className="text-sm uppercase tracking-[.3em] text-emerald-400">

AI Forecast Confidence

</p>

<div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">

<motion.div

animate={{
width:`${confidence}%`
}}

transition={{
duration:.8
}}

className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500"

/>

</div>

<h2 className="mt-4 text-5xl font-black text-white">

{confidence.toFixed(0)}%

</h2>

</div>

</div>
</div>

{/* RIGHT */}

<div className="relative z-20 lg:pl-4">
<div className="space-y-8">

  {/* KPI Row */}

  <div className="grid gap-6 md:grid-cols-3">

    <GlassMetric
      title="AI Confidence"
      value={`${confidence.toFixed(0)}%`}
      color="text-green-400"
    />

    <GlassMetric
      title="Global Risk"
      value={`${risk.toFixed(0)}%`}
      color="text-red-400"
    />

    <GlassMetric
      title="Demand"
      value={`${demand}%`}
      color="text-cyan-400"
    />

  </div>

  {/* Forecast Graph */}

  <div className="relative rounded-3xl border border-cyan-500/20 bg-[#07141f]/80 p-8">
    <div className="mb-8 flex items-center justify-between">

      <div>

        <h2 className="text-3xl font-black text-white">
          Live Forecast
        </h2>

        <p className="text-slate-400">
          30 Day Prediction
        </p>

      </div>

      <div className="flex items-center gap-3">

        <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"/>

        <span className="text-emerald-400">
          LIVE
        </span>

      </div>

    </div>

    <div className="flex h-[360px] items-end gap-3">

      {[35,42,55,48,61,74,58,86,79,64,82,95].map((v,i)=>(

        <motion.div

          key={i}

          initial={{height:0}}

          animate={{
            height:`${v+(demand/8)}%`
          }}

          transition={{
            duration:.6,
            delay:i*.05
          }}

          className="relative flex-1 rounded-t-xl bg-gradient-to-t from-emerald-500 via-cyan-400 to-blue-400"

        >

          <motion.div

            animate={{
              y:[0,-8,0],
              opacity:[.3,1,.3]
            }}

            transition={{
              repeat:Infinity,
              delay:i*.15
            }}

            className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_#22d3ee]"

          />

        </motion.div>

      ))}

    </div>

  </div>

  {/* Heat Map */}

  <div className="grid gap-6 lg:grid-cols-3">

    <div className="rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-8">

      <h2 className="mb-8 text-2xl font-black text-white">

        Risk Heat Map

      </h2>

      <div className="grid grid-cols-7 gap-3">

        {[
          "#22c55e",
          "#22c55e",
          "#84cc16",
          "#eab308",
          "#f97316",
          "#ef4444",
          "#ef4444",
        ].map((c,i)=>(

          <motion.div

            key={i}

            animate={{
              scale:[1,1.18,1],
              opacity:[.5,1,.5]
            }}

            transition={{
              repeat:Infinity,
              delay:i*.2
            }}

            className="h-14 rounded-xl"

            style={{
              background:c,
              boxShadow:`0 0 20px ${c}`
            }}

          />

        ))}

      </div>

    </div>

    <div className="rounded-3xl border border-cyan-500/20 bg-[#07141f]/80 p-8">

      <h2 className="text-2xl font-black text-white">

        AI Recommendation

      </h2>

      <div className="mt-8 space-y-5">

        <p className="text-green-400">
          ✓ Increase inventory by 18%
        </p>

        <p className="text-cyan-400">
          ✓ Route via Singapore
        </p>

        <p className="text-yellow-400">
          ✓ Reduce weather exposure
        </p>

        <p className="text-red-400">
          ✓ Monitor fuel prices
        </p>

        <div className="mt-8 rounded-xl bg-black/20 p-4">

          <p className="text-sm text-slate-400">

            AI Confidence

          </p>

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

function Card({
icon,
title,
value,
color,
}:any){

return(

<motion.div

whileHover={{
y:-8,
scale:1.03
}}

className="rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-8 backdrop-blur-xl"

>

<div className={color}>

{icon}

</div>

<h3 className="mt-6 text-xl font-bold text-white">

{title}

</h3>

<h1 className={`mt-5 text-5xl font-black ${color}`}>

{value}

</h1>

</motion.div>

);

}