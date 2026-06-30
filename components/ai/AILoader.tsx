"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  "Initializing Neural Engine...",
  "Loading Forecast Model...",
  "Calibrating AI...",
  "Connecting Digital Twin...",
  "Loading Explainability...",
  "Launching PRITHVEX AI...",
];

export default function AILoader(){

const [progress,setProgress]=useState(0);

useEffect(()=>{

const t=setInterval(()=>{

setProgress(v=>{

if(v>=100){

clearInterval(t);

return 100;

}

return v+2;

});

},60);

return()=>clearInterval(t);

},[]);

return(

<div className="rounded-3xl border border-emerald-500/20 bg-[#07141f] p-8">

<h2 className="text-3xl font-black text-white">

Launching AI

</h2>

<div className="mt-8 h-4 overflow-hidden rounded-full bg-slate-800">

<motion.div

animate={{width:`${progress}%`}}

className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-purple-500"

/>

</div>

<p className="mt-4 text-emerald-300">

{steps[Math.min(Math.floor(progress/20),5)]}

</p>

<h1 className="mt-6 text-6xl font-black text-white">

{progress}%

</h1>

</div>

);

}