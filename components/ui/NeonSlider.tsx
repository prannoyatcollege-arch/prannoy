"use client";

import * as Slider from "@radix-ui/react-slider";

export default function NeonSlider({
label,
color,
value,
setValue,
}:any){

return(

<div className="space-y-3">

<div className="flex justify-between">

<p className="text-white">

{label}

</p>

<p style={{color}}>

{value}

%

</p>

</div>

<Slider.Root

value={[value]}

max={100}

step={1}

onValueChange={(v)=>setValue(v[0])}

className="relative flex h-5 w-full items-center"

>

<Slider.Track className="relative h-2 grow rounded-full bg-slate-700">

<Slider.Range

className="absolute h-full rounded-full"

style={{background:color}}

/>

</Slider.Track>

<Slider.Thumb

className="block h-6 w-6 rounded-full border-2 border-white shadow-[0_0_20px]"

style={{

background:color,

boxShadow:`0 0 25px ${color}`

}}

/>

</Slider.Root>

</div>

);

}
<div className="rounded-3xl bg-[#07141f]/80 p-8">

<h2 className="text-3xl font-black text-white">

Simulation Controls

</h2>

<NeonSlider
label="Demand"
color="#22c55e"
/>

<NeonSlider
label="Weather"
color="#ec4899"
/>

<NeonSlider
label="Fuel"
color="#facc15"
/>

<NeonSlider
label="Inventory"
color="#8b5cf6"
/>

<NeonSlider
label="Supplier"
color="#06b6d4"
/>

<NeonSlider
label="Port Congestion"
color="#fb923c"
/>

</div>