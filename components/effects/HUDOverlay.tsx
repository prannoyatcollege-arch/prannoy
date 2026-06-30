"use client";

export default function HUDOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">

      <div className="absolute left-6 top-6 h-24 w-24 border-l border-t border-emerald-500/30" />
      <div className="absolute right-6 top-6 h-24 w-24 border-r border-t border-emerald-500/30" />
      <div className="absolute bottom-6 left-6 h-24 w-24 border-l border-b border-emerald-500/30" />
      <div className="absolute bottom-6 right-6 h-24 w-24 border-r border-b border-emerald-500/30" />

    </div>
  );
}