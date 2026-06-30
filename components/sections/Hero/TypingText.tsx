"use client";

import { TypeAnimation } from "react-type-animation";

export default function TypingText() {
  return (
    <TypeAnimation
      sequence={[
        "B.Tech CSE Undergraduate",
        1800,
        "AI & ML Enthusiast",
        1800,
        "EEG Researcher",
        1800,
        "Full Stack Developer",
        1800,
        "IEEE CIS Senior Coordinator",
        1800,
        "Open Source Contributor",
        1800,
      ]}
      wrapper="span"
      speed={45}
      repeat={Infinity}
      className="font-bold text-cyan-300"
    />
  );
}