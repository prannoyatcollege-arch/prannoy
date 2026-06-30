"use client";

import Image from "next/image";
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
function RiskCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: "red" | "green" | "cyan" | "yellow";
}) {
  const colors = {
    red: "bg-red-500",
    green: "bg-green-500",
    cyan: "bg-cyan-500",
    yellow: "bg-yellow-400",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative h-[150px] rounded-2xl border border-emerald-500/20 bg-[#07141f]/80 p-6 backdrop-blur-xl hover:shadow-[0_0_40px_rgba(34,197,94,.25)] transition-all duration-500"
    >

        <div className="absolute right-5 top-5 flex gap-2">

<div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_20px_#22c55e]" />

<div
className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_20px_#06b6d4]"
style={{animationDelay:"0.3s"}}
/>

<div
className="h-2.5 w-2.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_20px_#facc15]"
style={{animationDelay:"0.6s"}}
/>

</div>
      <div className="flex items-center justify-between">
        <p className="text-slate-400">{title}</p>

        <div
          className={`h-3 w-3 rounded-full animate-pulse ${colors[color]}`}
        />
      </div>

      <h2 className="mt-4 text-5xl font-black text-white">
        {value}
      </h2>
    </motion.div>
  );
}

function Event({ text }: { text: string }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="rounded-xl border border-white/10 bg-black/20 p-4 text-slate-300"
    >
      {text}
    </motion.div>
  );
}

export default function DigitalTwin() {
  return (
    <section
      id="digital-twin"
      className="relative overflow-hidden bg-[#020b0a] py-24 px-8"
    >
      <div className="mx-auto max-w-7xl">

        <p className="uppercase tracking-[0.4em] text-emerald-400">
          Live Global Monitoring
        </p>

        <h1 className="mt-4 text-6xl font-black text-white">
          Digital Twin
        </h1>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* LEFT MAP */}

          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-6">

           <Image
    src="/images/world-map.png"
    alt="World Map"
    fill
    priority
    className="object-cover opacity-70"
/>
            <svg
className="absolute inset-0 h-full w-full pointer-events-none"
>

<path
d="M110 170 C260 330 520 220 760 420"
stroke="#22c55e"
strokeWidth="2"
fill="none"
opacity=".35"
/>

<path
d="M720 210 C610 120 420 90 250 200"
stroke="#06b6d4"
strokeWidth="2"
fill="none"
opacity=".35"
/>

</svg>
            <FlightPath/>

<Radar/>
<motion.div

animate={{rotate:360}}

transition={{

repeat:Infinity,

duration:8,

ease:"linear"

}}

className="absolute right-10 top-10 h-40 w-40 rounded-full border border-cyan-400/20"

/>

<motion.div

animate={{rotate:360}}

transition={{

repeat:Infinity,

duration:8,

ease:"linear"

}}

className="absolute right-[122px] top-[122px] h-20 w-1 origin-bottom bg-gradient-to-t from-cyan-400 to-transparent"

/>

            {/* Cities */}

            {cities.map((city) => (
              <motion.div
                key={city.name}
                className="absolute"
                style={{
                  left: city.x,
                  top: city.y,
                }}
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                }}
              >
                <p
className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/70 px-2 py-1 text-[11px] font-semibold text-white"
>

{city.name}

</p>

               <motion.div

animate={{
scale:[1,1.5,1],
opacity:[0.5,1,0.5]
}}

transition={{
repeat:Infinity,
duration:2
}}

className="relative h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_25px_#22c55e]"

>

<div className="absolute inset-0 rounded-full border border-emerald-300 animate-ping"/>

</motion.div>

               
              </motion.div>
            ))}

            {/* Plane 1 */}

            <motion.div
              className="absolute z-30 text-2xl drop-shadow-[0_0_12px_white]"
              animate={{
                left: ["13%", "76%"],
                top: ["40%", "57%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ✈️
            </motion.div>

            {/* Plane 2 */}

            <motion.div
              className="absolute text-xl"
             animate={{
left:["61%","76%"],
top:["60%","67%"]
}}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ✈️
            </motion.div>

            {/* Ship */}

            <motion.div
              className="absolute text-xl"
              animate={{
             left:["60%","82%"],
top:["55%","40%"],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              🚢
            </motion.div>

          </div>

          {/* RIGHT PANEL */}

          <div className="space-y-6">

            <RiskCard
              title="Global Risk"
              value="72%"
              color="red"
            />

            <RiskCard
              title="Active Suppliers"
              value="148"
              color="green"
            />

            <RiskCard
              title="Ships Active"
              value="42"
              color="cyan"
            />

            <RiskCard
              title="Flights Active"
              value="18"
              color="yellow"
            />

            <div className="relative h-full w-full">
              <h2 className="mb-6 text-2xl font-bold text-white">
                Live AI Events
              </h2>

              <div className="space-y-4">

                <Event text="🌪 Cyclone detected near Singapore" />

                <Event text="🚢 Port congestion increased in Hamburg" />

                <Event text="📈 Demand forecast updated" />

                <Event text="🤖 AI recalibrated uncertainty interval" />

                <Event text="🌧 Heavy rainfall alert in Mumbai" />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}