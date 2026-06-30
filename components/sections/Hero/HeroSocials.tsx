"use client";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function HeroSocials() {
  return (
    <div className="mt-10 flex gap-5">

      {[FaGithub, FaLinkedin, FaInstagram].map((Icon, index) => (

        <div
          key={index}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-cyan-400/20 bg-white/5 transition hover:scale-110 hover:border-pink-500 hover:bg-pink-500/10"
        >
          <Icon
            size={24}
            className="text-cyan-300"
          />
        </div>

      ))}

    </div>
  );
}