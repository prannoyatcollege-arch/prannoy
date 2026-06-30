"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { ArrowUpRight } from "lucide-react";

interface Props{
title:string;
value:number;
suffix?:string;
color?:string;
status?:"good"|"warning"|"danger";
}

export default function MetricCard({
title,
value,
suffix="%",
color="#22c55e",
status="good",
}:Props){

const led=
status==="good"
?"bg-green-400"
:status==="warning"
?"bg-yellow-400"
:"bg-red-500";

return(

<motion.div
whileHover={{
y:-6,
scale:1.02
}}
className="relative rounded-3xl border border-white/10 bg-[#07141f]/80 p-6 backdrop-blur-xl"
>

 
<div className="absolute right-5 top-5 flex items-center gap-2">

<motion.div

animate={{
opacity:[1,.3,1],
scale:[1,.7,1]
}}

transition={{
repeat:Infinity,
duration:.8
}}

className={`h-3 w-3 rounded-full ${led}`}

/>

<p className="text-xs uppercase text-slate-400">

LIVE

</p>

</div>

<div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl"/>

<p className="text-sm uppercase tracking-[.3em] text-emerald-300">

{title}

</p>

<div className="mt-5 flex items-end justify-between">

<h2 className="text-5xl font-black text-white">

<CountUp

end={value}

duration={2}

/>

{suffix}

</h2>

<div className="rounded-xl bg-emerald-500/10 p-3">

<ArrowUpRight className="text-emerald-400"/>

</div>

</div>

<motion.div

animate={{
width:["35%","100%","35%"]
}}

transition={{
repeat:Infinity,
duration:3
}}

className="mt-6 h-[3px] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"

/>

</motion.div>

);

}