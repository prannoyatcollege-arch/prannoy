"use client";

import { motion } from "framer-motion";

export default function Radar(){

return(

<div className="absolute left-12 top-12 h-44 w-44 rounded-full border border-emerald-500/20">

<motion.div

animate={{
rotate:360
}}

transition={{
repeat:Infinity,
duration:4,
ease:"linear"
}}

className="absolute inset-0"

>

<div className="absolute left-1/2 top-1/2 h-[2px] w-24 origin-left -translate-y-1/2 bg-gradient-to-r from-emerald-400 to-transparent"/>

</motion.div>

</div>

);

}