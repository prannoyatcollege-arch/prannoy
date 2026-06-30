"use client";

import { motion } from "framer-motion";
import {
Microscope,
Brain,
ShieldCheck,
Globe,
BookOpen,
FileText,
} from "lucide-react";

const cards = [
{
icon:Microscope,
title:"Research Paper",
desc:"IEEE publication and calibrated uncertainty framework.",
file:"/docs/research-paper.pdf",
},

{
icon:Brain,
title:"Explainable AI",
desc:"SHAP feature importance and transparent predictions.",
file:"/docs/explainability.pdf",
},

{
icon:ShieldCheck,
title:"Calibration",
desc:"ECE Reliability Diagram and Prediction Interval.",
file:"/docs/calibration.pdf",
},

{
icon:Globe,
title:"Digital Twin",
desc:"Interactive global supply chain simulation.",
file:"/docs/architecture.pdf",
},

{
icon:BookOpen,
title:"Documentation",
desc:"Architecture methodology and implementation.",
file:"/docs/methodology.pdf",
},

{
icon:FileText,
title:"Executive Report",
desc:"Business ready AI insights and recommendations.",
file:"/docs/executive-report.pdf",
},
];

export default function Research(){

return(

<section
id="research"
className="relative overflow-hidden bg-[#031211] py-24 px-8"
>

<div className="mx-auto max-w-7xl">

<p className="uppercase tracking-[.4em] text-cyan-400">

Research & Documentation

</p>

<h1 className="mt-4 text-6xl font-black text-white">

Knowledge Center

</h1>

<div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

{cards.map((card,i)=>{

const Icon=card.icon;

return(

<motion.div

key={i}

whileHover={{
y:-8,
scale:1.03
}}

className="rounded-3xl border border-white/10 bg-[#07141f]/80 p-8 backdrop-blur-xl"

>

<div className="flex items-center justify-between">

<Icon className="h-10 w-10 text-emerald-400"/>

<div className="h-3 w-3 animate-pulse rounded-full bg-green-400"/>

</div>

<div className="mt-5 inline-flex rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-300">

VERIFIED

</div>

<h2 className="mt-5 text-3xl font-black text-white">

{card.title}

</h2>

<p className="mt-4 leading-7 text-slate-400">

{card.desc}

</p>

<div className="mt-8 flex gap-3">

<a
href={card.file}
target="_blank"
rel="noopener noreferrer"
className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 font-bold text-white transition hover:scale-105"
>

View

</a>

<a
href={card.file}
download
className="rounded-xl border border-white/20 px-5 py-3 text-white transition hover:bg-white/10"
>

Download

</a>

</div>

</motion.div>

);

})}

</div>

</div>

</section>

);

}