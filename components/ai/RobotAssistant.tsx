"use client";
import { useEffect, useState } from "react";
 
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, MessageCircle } from "lucide-react";

export default function RobotAssistant() {

const [open,setOpen]=useState(false);

useEffect(() => {

  const timer = setTimeout(() => {

    setOpen(true);

  },1200);

  return ()=>clearTimeout(timer);

},[]);

return(

<>

<motion.button

whileHover={{scale:1.08}}

whileTap={{scale:.95}}

onClick={()=>setOpen(true)}

className="fixed bottom-8 right-8 z-[999] flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-[#07141f] shadow-[0_0_40px_rgba(34,197,94,.5)]"

>

<MessageCircle className="h-9 w-9 text-emerald-400"/>

</motion.button>

<AnimatePresence>

{open && (

<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

exit={{opacity:0}}

className="fixed bottom-6 right-6 z-[1000]"

>

<motion.div

initial={{
opacity:0,
x:120,
}}

animate={{
opacity:1,
x:0,
}}

exit={{
opacity:0,
x:120,
}}

className="w-[900px] rounded-3xl border border-emerald-500/20 bg-[#041312] p-10"

>

<div className="flex justify-end">

<button onClick={()=>setOpen(false)}>

<X className="text-white"/>

</button>

</div>

<div className="flex flex-col items-center gap-6">

<div className="flex items-center justify-center">

<motion.div
animate={{
y:[0,-12,0],
rotate:[0,2,0,-2,0]
}}
transition={{
repeat:Infinity,
duration:4
}}
>

<Image
src="/images/robot.png"
alt="Robot"
width={380}
height={380}
style={{
  width: "100%",
  height: "auto",
}}
className="max-w-[380px] drop-shadow-[0_0_60px_rgba(34,197,94,.8)]"
/>
</motion.div>

</div>

<div>

<p className="tracking-[.4em] uppercase text-emerald-400">

PRITHVEX AI

</p>

<motion.h1
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.8 }}
className="mt-3 text-5xl font-black text-white"
>
Hello 👋
</motion.h1>

<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.6 }}
className="mt-8 leading-8 text-slate-300"
>
I am <span className="font-bold text-emerald-400">PRITHVEX AI</span>.

<br /><br />

Welcome to the AI Supply Chain Intelligence Platform.

<br /><br />

May I guide you through the dashboard?
</motion.p>

<div className="mt-8 flex gap-5">

<button
onClick={()=>{
document.querySelector("#overview")?.scrollIntoView({
behavior:"smooth"
});

setOpen(false);
}}
className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-bold text-white"
>

Yes, Guide Me

</button>

<button
onClick={()=>setOpen(false)}
className="rounded-xl border border-white/20 px-8 py-4 text-white"
>

Explore Later

</button>

</div>

 
<div className="mt-10 space-y-4">

<NavButton
text="Overview"
href="#overview"
onClose={()=>setOpen(false)}
/>

<NavButton
text="Forecast"
href="#forecast"
onClose={()=>setOpen(false)}
/>

<NavButton
text="Calibration"
href="#calibration"
onClose={()=>setOpen(false)}
/>

<NavButton
text="Explainability"
href="#explainability"
onClose={()=>setOpen(false)}
/>

<NavButton
text="Digital Twin"
href="#digital-twin"
onClose={()=>setOpen(false)}
/>

<NavButton
text="Knowledge Center"
href="#research"
onClose={()=>setOpen(false)}
/>

</div>

</div>

</div>

</motion.div>

</motion.div>

)}

</AnimatePresence>

</>

);

}
function NavButton({
  text,
  href,
  onClose,
}: {
  text: string;
  href: string;
  onClose: () => void;
}) {
  return (
    <button
      onClick={() => {
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth",
        });

        onClose();
      }}
      className="w-full rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-4 text-left font-semibold text-white transition-all duration-300 hover:bg-emerald-500/20"
    >
      {text}
    </button>
  );
}