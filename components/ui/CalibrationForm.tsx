"use client";

import { useState } from "react";

export default function CalibrationForm() {

const [module,setModule]=useState("Calibration");

const pdfMap:any={

Calibration:"/docs/calibration.pdf",

Forecast:"/docs/research-paper.pdf",

Explainability:"/docs/explainability.pdf",

"Digital Twin":"/docs/architecture.pdf",

Architecture:"/docs/methodology.pdf",

};

return(

<div className="mb-10 rounded-3xl border border-emerald-500/20 bg-[#07141f]/80 p-8">

<h2 className="mb-8 text-3xl font-black text-white">

Calibration Session

</h2>

<div className="grid gap-6 md:grid-cols-2">

<div>

<label className="mb-2 block text-emerald-300">

Available Module

</label>

<select

value={module}

onChange={(e)=>setModule(e.target.value)}

className="w-full rounded-xl bg-[#041312] p-4 text-white"

>

<option>Calibration</option>

<option>Forecast</option>

<option>Explainability</option>

<option>Digital Twin</option>

<option>Architecture</option>

</select>

</div>

<div>

<label className="mb-2 block text-emerald-300">

Workstation

</label>

<select className="w-full rounded-xl bg-[#041312] p-4 text-white">

<option>Mumbai Port</option>

<option>Singapore Hub</option>

<option>Hamburg</option>

<option>Dubai</option>

<option>Los Angeles</option>

</select>

</div>

<div>

<label className="mb-2 block text-emerald-300">

Product

</label>

<select className="w-full rounded-xl bg-[#041312] p-4 text-white">

<option>Steel Coil</option>

<option>Semiconductors</option>

<option>Medicine</option>

<option>Electronics</option>

<option>Food</option>

</select>

</div>

<div>

<label className="mb-2 block text-emerald-300">

Region

</label>

<select className="w-full rounded-xl bg-[#041312] p-4 text-white">

<option>Asia Pacific</option>

<option>Europe</option>

<option>North America</option>

<option>Middle East</option>

<option>Global</option>

</select>

</div>

<div>

<label className="mb-2 block text-emerald-300">

Engineer

</label>

<input

defaultValue="Prannoy"

className="w-full rounded-xl bg-[#041312] p-4 text-white"

/>

</div>

<div>

<label className="mb-2 block text-emerald-300">

Shipment ID

</label>

<input

defaultValue="SHP-24091"

className="w-full rounded-xl bg-[#041312] p-4 text-white"

/>

</div>

<div>

<label className="mb-2 block text-emerald-300">

Date

</label>

<input

type="date"

className="w-full rounded-xl bg-[#041312] p-4 text-white"

/>

</div>

<div>

<label className="mb-2 block text-emerald-300">

Time

</label>

<input

type="time"

className="w-full rounded-xl bg-[#041312] p-4 text-white"

/>

</div>

</div>

<div className="mt-8 flex flex-wrap gap-4">

<button className="rounded-xl bg-emerald-500 px-6 py-3 font-bold">

Load Module

</button>

<a

href={pdfMap[module]}

target="_blank"

className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-white"

>

Open Documentation

</a>

<a

href={pdfMap[module]}

download

className="rounded-xl border border-white/20 px-6 py-3 text-white"

>

Download PDF

</a>

<button

onClick={()=>window.print()}

className="rounded-xl border border-yellow-400 px-6 py-3 text-yellow-300"

>

Print Report

</button>

</div>
<div className="mt-12 grid gap-8 lg:grid-cols-[1fr_420px]">

<div>

</div>

<div className="rounded-3xl border border-emerald-500/20 bg-[#041312] p-8">

<p className="tracking-[.35em] uppercase text-emerald-400">

Live Report Preview

</p>

<h2 className="mt-4 text-3xl font-black text-white">

Executive Calibration Report

</h2>

<div className="mt-8 space-y-5">

<Row
label="Module"
value={module}
/>

<Row
label="AI Confidence"
value="94%"
/>

<Row
label="Calibration Error"
value="2.1%"
/>

<Row
label="Prediction Interval"
value="±2.8%"
/>

<Row
label="Status"
value="READY"
/>

<Row
label="Risk Level"
value="MEDIUM"
/>

</div>

<div className="mt-10 rounded-2xl border border-emerald-500/20 bg-black/30 p-5">

<p className="text-sm leading-7 text-slate-300">

PRITHVEX AI Recommendation

<br/><br/>

Continue calibration.

Supplier stability is high.

Demand volatility remains within the acceptable confidence interval.

No recalibration required.

</p>

</div>

</div>

</div>

</div>

);

}
function Row({
label,
value,
}:{
label:string;
value:string;
}){

return(

<div className="flex items-center justify-between border-b border-white/10 pb-3">

<p className="text-slate-400">

{label}

</p>

<p className="font-bold text-white">

{value}

</p>

</div>

);

}