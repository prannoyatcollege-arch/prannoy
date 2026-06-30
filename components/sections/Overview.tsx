 "use client";

import AIGauge from "@/components/ui/AIGauge";
import { motion } from "framer-motion";
import MetricCard from "@/components/ui/MetricCard";


export default function Overview() {
  return (
<section
id="overview"
className="relative overflow-hidden py-24 px-8"
>

<div className="absolute inset-0">

<img
src="/images/brain.png"
className="absolute right-0 top-0 h-full opacity-[0.05]"
/>

<div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent"/>

</div>

<div className="relative mx-auto max-w-7xl">

<motion.div

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

transition={{duration:.8}}

>

<p className="tracking-[.45em] uppercase text-emerald-400">

Executive Dashboard

</p>

<h1 className="mt-4 text-6xl font-black text-white">

AI Command Center

</h1>

<p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">

Monitor calibration, uncertainty, explainability and worldwide
supply-chain disruptions in one unified AI platform.

</p>

</motion.div>

{/* KPI */}

<div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

<MetricCard
title="AI Confidence"
value={94}
status="good"
/>

<MetricCard
title="Supply Health"
value={87}
status="good"
/>

<MetricCard
title="Global Risk"
value={72}
status="danger"
/>

<MetricCard
title="Calibration"
value={96}
status="good"
/>

<MetricCard
title="Forecast Accuracy"
value={92}
status="good"
/>

<MetricCard
title="ESG Score"
value={84}
status="warning"
/>

</div>

{/* Gauges */}

<div className="mt-16 grid gap-8 lg:grid-cols-3">

<AIGauge

title="AI Confidence"

value={94}

/>

<AIGauge

title="Supply Health"

value={87}

color="#06b6d4"

/>

<AIGauge

title="Global Risk"

value={72}

color="#f97316"

/>

</div>

{/* AI Feed */}

<div className="mt-20 rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-8 backdrop-blur-xl">

<div className="mb-8 flex items-center justify-between">

<h2 className="text-3xl font-black text-white">

Live AI Feed

</h2>

<div className="flex items-center gap-3">

<div className="h-3 w-3 animate-pulse rounded-full bg-green-400"/>

LIVE

</div>

</div>

<div className="space-y-6">

<Event
title="Demand Forecast Updated"
time="2 sec ago"
color="text-green-400"
/>

<Event
title="Cyclone Risk Increased"
time="14 sec ago"
color="text-red-400"
/>

<Event
title="Port Congestion Detected"
time="27 sec ago"
color="text-orange-400"
/>

<Event
title="Prediction Interval Recalibrated"
time="1 min ago"
color="text-cyan-400"
/>

<Event
title="SHAP Explanation Updated"
time="3 min ago"
color="text-purple-400"
/>

</div>
</div>

</div>

</section>

);
}
function Event({
  title,
  time,
  color,
}: {
  title: string;
  time: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-6 py-4">

      <div className="flex items-center gap-4">

        <div
          className={`h-3 w-3 rounded-full animate-pulse ${color.replace(
            "text",
            "bg"
          )}`}
        />

        <p className="text-white">
          {title}
        </p>

      </div>

      <p className={color}>
        {time}
      </p>

    </div>
  );
}