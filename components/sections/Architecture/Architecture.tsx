"use client";

import { motion } from "framer-motion";
import {
Database,
Brain,
ShieldCheck,
BarChart3,
Globe,
Cpu,
ArrowRight
} from "lucide-react";

const steps=[
{
icon:Database,
title:"Global Data Sources",
color:"text-cyan-400"
},
{
icon:Brain,
title:"Forecast Model",
color:"text-green-400"
},
{
icon:ShieldCheck,
title:"Calibration",
color:"text-yellow-400"
},
{
icon:BarChart3,
title:"Explainability",
color:"text-pink-400"
},
{
icon:Globe,
title:"Digital Twin",
color:"text-blue-400"
},
{
icon:Cpu,
title:"Decision Engine",
color:"text-emerald-400"
}
];

export default function Architecture(){

return(

<section
id="architecture"
className="relative overflow-hidden bg-[#031211] py-24 px-8"
>

<div className="mx-auto max-w-7xl">

<p className="uppercase tracking-[.4em] text-emerald-400">
AI Architecture
</p>

<h1 className="mt-4 text-6xl font-black text-white">
PRITHVEX Pipeline
</h1>

<div className="mt-20 flex flex-wrap items-center justify-center gap-8">

{steps.map((item,i)=>{

const Icon=item.icon;

return(

<div
key={i}
className="flex items-center"
>

<motion.div

whileHover={{
y:-10,
scale:1.05
}}

className="w-[210px] rounded-3xl border border-white/10 bg-[#07141f]/80 p-8 text-center backdrop-blur-xl"

>

<Icon
className={`mx-auto h-12 w-12 ${item.color}`}
/>

<h2 className="mt-6 text-xl font-bold text-white">

{item.title}

</h2>

</motion.div>

{i<steps.length-1 && (

<motion.div

animate={{
x:[0,10,0]
}}

transition={{
repeat:Infinity,
duration:1.2
}}

className="mx-5"

>

<ArrowRight
className="text-emerald-400"
/>

</motion.div>

)}

</div>

);

})}

</div>

</div>

</section>

);

}