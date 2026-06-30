"use client";

export default function Particles() {
  return (
    <>
      {/* Left Glow */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      {/* Right Glow */}
      <div className="absolute bottom-10 right-20 h-80 w-80 rounded-full bg-blue-600/20 blur-[150px]" />

      {/* Center Glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[180px]" />
    </>
  );
}