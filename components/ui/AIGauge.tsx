"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
interface AIGaugeProps {
  title: string;
  value: number;
  color?: string;
}

export default function AIGauge({
  title,
  value,
  color = "#22c55e",
}: AIGaugeProps) {
  const angle = value * 1.8 - 90;
  const [displayValue, setDisplayValue] = useState(value);

useEffect(() => {

    const interval = setInterval(() => {

        setDisplayValue(v => {

            const next =
                value +
                Math.floor(Math.random() * 9) -
                2;

            return Math.max(
                0,
                Math.min(100, next)
            );

        });

    }, 1200);

    return () => clearInterval(interval);

}, [value]);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="rounded-3xl border border-white/10 bg-[#07141f]/70 p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(34,197,94,.15)]"
    >
      <div className="flex flex-col items-center">

        <svg width="220" height="140" viewBox="0 0 220 140">

          <defs>
            <filter id="glow">

<feGaussianBlur
stdDeviation="4"
result="coloredBlur"
/>

<feMerge>

<feMergeNode in="coloredBlur"/>

<feMergeNode in="SourceGraphic"/>

</feMerge>

</filter>
            <linearGradient id="gauge" x1="0" x2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          <path
            d="M30 110 A80 80 0 0 1 190 110"
            fill="none"
            stroke="#1e293b"
            strokeWidth="12"
          />

          <motion.path
    initial={{
        strokeDashoffset:252,
    }}
    animate={{
        strokeDashoffset:252-displayValue*2.52,
    }}
    transition={{
        duration:1.4,
    }}
            d="M30 110 A80 80 0 0 1 190 110"
            fill="none"
          stroke="url(#gauge)"
filter="url(#glow)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="252"
             
          />
<motion.g
    initial={{
        rotate: angle,
    }}
    animate={{
        rotate: [
            angle - 1.8,
            angle + 1.5,
            angle - 0.8,
            angle + 0.6,
            angle,
        ],
    }}
    transition={{
        duration: 0.7,
        repeat: Infinity,
        ease: "easeInOut",
    }}
    style={{
        transformOrigin: "110px 110px",
    }}
>

    {/* Needle Shadow */}
    <line
        x1="112"
        y1="112"
        x2="112"
        y2="28"
        stroke="rgba(0,0,0,.4)"
        strokeWidth="6"
        strokeLinecap="round"
    />

    {/* Main Needle */}
    <line
        x1="110"
        y1="110"
        x2="110"
        y2="26"
        stroke="#ffffff"
filter="url(#glow)"
        strokeWidth="4"
        strokeLinecap="round"
    />

    {/* Needle Tip */}
    <circle
        cx="110"
        cy="26"
        r="4"
        fill="#ffffff"
    />

</motion.g>

     <motion.circle
    cx="110"
    cy="110"
    r="11"
    fill="#031312"
    stroke={color}
    strokeWidth="5"
/>

<motion.circle
    cx="110"
    cy="110"
    r="7"
    fill={color}
    animate={{
        scale: [1, 1.25, 1],
    }}
    transition={{
        duration: 0.8,
        repeat: Infinity,
    }}
/>

<motion.circle
    cx="110"
    cy="110"
    r="18"
    fill="transparent"
    stroke={color}
    strokeWidth="2"
    animate={{
        r: [18, 28, 18],
        opacity: [0.6, 0, 0.6],
    }}
    transition={{
        duration: 2,
        repeat: Infinity,
    }}
/>
        {Array.from({length:30}).map((_,i)=>{

const a=(i*180)/30;

const r1=82;

const r2=90;

const rad=(a-90)*Math.PI/180;

return(

<line


key={i}

x1={110+r1*Math.cos(rad)}

y1={110+r1*Math.sin(rad)}

x2={110+r2*Math.cos(rad)}

y2={110+r2*Math.sin(rad)}

stroke="#22c55e"

strokeOpacity=".45"

/>

);

})}
</svg>

        <p className="mt-2 text-sm uppercase tracking-widest text-emerald-300">
          {title}
        </p>

        <motion.h2
          animate={{ opacity: [0.6, 1] }}
          className="mt-2 text-5xl font-black text-white"
        >
          {displayValue}%
        </motion.h2>

      </div>
    </motion.div>
  );
}