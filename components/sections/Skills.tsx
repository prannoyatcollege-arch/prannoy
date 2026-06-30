"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Brain,
  Globe,
  Wrench,
  GitBranch,
} from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Programming",
    color: "cyan",
    items: ["Java", "Python", "C++", "JavaScript", "PHP"],
  },
  {
    icon: Globe,
    title: "Web Development",
    color: "pink",
    items: ["HTML", "CSS", "Tailwind", "React", "Next.js"],
  },
  {
    icon: Database,
    title: "Database",
    color: "yellow",
    items: ["MySQL", "MongoDB", "Oracle SQL"],
  },
  {
    icon: Brain,
    title: "AI & Research",
    color: "violet",
    items: ["Machine Learning", "EEG", "Deep Learning Basics"],
  },
  {
    icon: GitBranch,
    title: "Tools",
    color: "green",
    items: ["Git", "GitHub", "VS Code", "Figma", "Canva"],
  },
  {
    icon: Wrench,
    title: "Currently Exploring",
    color: "orange",
    items: ["MERN Stack", "Next.js", "GSAP", "Framer Motion"],
  },
];

const colors = {
  cyan: "border-cyan-400/20 hover:border-cyan-400/60 text-cyan-300",
  pink: "border-pink-400/20 hover:border-pink-400/60 text-pink-300",
  yellow: "border-yellow-400/20 hover:border-yellow-400/60 text-yellow-300",
  violet: "border-violet-400/20 hover:border-violet-400/60 text-violet-300",
  green: "border-green-400/20 hover:border-green-400/60 text-green-300",
  orange: "border-orange-400/20 hover:border-orange-400/60 text-orange-300",
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="text-center">
          <p className="tracking-[0.4em] uppercase text-cyan-300 text-sm">
            Skills
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Technologies I’m{" "}
            <span className="text-pink-400">Learning</span>{" "}
            &{" "}
            <span className="text-cyan-400">Building With</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`
                  rounded-2xl border bg-white/5 p-7
                  backdrop-blur-xl transition-all duration-300
                  hover:bg-white/10
                  ${colors[skill.color as keyof typeof colors]}
                `}
              >
                {/* ICON */}
                <Icon size={38} className="mb-5" />

                {/* TITLE */}
                <h3 className="text-2xl font-bold text-white">
                  {skill.title}
                </h3>

                {/* TAGS */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300 hover:bg-white/20 transition"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}