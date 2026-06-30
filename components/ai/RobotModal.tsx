"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props{
open:boolean;
onClose:()=>void;
}

export default function RobotModal({
open,
onClose,
}:Props){

return(

<AnimatePresence>

{open && (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
exit={{opacity:0}}
className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-xl"
>

<motion.div

initial={{scale:.8,y:80}}

animate={{scale:1,y:0}}

exit={{scale:.8,y:80}}

transition={{duration:.5}}

className="relative w-[900px] overflow-hidden rounded-3xl border border-emerald-500/20 bg-[#041312] p-10"

>

<button

onClick={onClose}

className="absolute right-6 top-5 text-3xl text-white"

>

×

</button>

<div className="grid grid-cols-2 gap-10">

<div className="flex items-center justify-center">

<Image

src="/images/robot.png"

alt="robot"

width={420}

height={420}

className="drop-shadow-[0_0_60px_rgba(34,197,94,.8)]"

/>

</div>

<div>

<p className="mb-3 text-emerald-400">

PRITHVEX AI

</p>

<h1 className="mb-6 text-5xl font-black text-white">

Hello,

</h1>

<p className="leading-8 text-slate-300">

I am PRITHVEX AI.

Welcome to the Supply Chain Intelligence Platform.

I can guide you through

Demand Forecasting,

Calibration,

Explainability,

Digital Twin,

Architecture

and Executive Analytics.

</p>

<div className="mt-10 flex gap-4">

<button className="rounded-xl bg-emerald-500 px-7 py-4 font-bold text-white">

Start Tour

</button>

<button className="rounded-xl border border-emerald-400 px-7 py-4 text-emerald-300">

Skip

</button>

</div>

</div>

</div>

</motion.div>

</motion.div>

)}

</AnimatePresence>

);

}