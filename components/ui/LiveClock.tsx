"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-xl border border-emerald-500/20 bg-[#07141f]/80 px-5 py-3 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-widest text-slate-400">
        System Time
      </p>

      <h3 className="mt-1 text-2xl font-bold text-emerald-400">
        {time}
      </h3>
    </div>
  );
}