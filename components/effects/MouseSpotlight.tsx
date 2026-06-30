"use client";

import { useEffect, useState } from "react";

export default function MouseSpotlight() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        background: `radial-gradient(circle 250px at ${mouse.x}px ${mouse.y}px,
          rgba(34,211,238,0.12),
          transparent 70%)`,
      }}
    />
  );
}