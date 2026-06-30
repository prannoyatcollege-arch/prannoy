 "use client";

import {
  Cpu,
  ShieldCheck,
  BrainCircuit,
  Globe2,
  Mail,
  ArrowUp,
  ExternalLink,
} from "lucide-react";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-500/20 bg-[#020b0a]">

      {/* Background Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-8 py-20">

        <div className="grid gap-14 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-[0_0_35px_rgba(34,197,94,.45)]">

                <Cpu className="h-8 w-8 text-white" />

              </div>

              <div>

                <h2 className="text-3xl font-black text-white">
                  PRITHVEX AI
                </h2>

                <p className="text-sm text-emerald-400">
                  Powered by ENVIREX
                </p>

              </div>

            </div>

            <p className="mt-8 leading-8 text-slate-400">

              AI Powered Supply Chain Intelligence Platform
              built for Predictive Analytics, Calibration,
              Explainability and Digital Twin Simulation.

            </p>

          </div>

          {/* Modules */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-white">
              Modules
            </h3>

            <ul className="space-y-4 text-slate-400">

              <li className="hover:text-emerald-400">Forecast Engine</li>

              <li className="hover:text-emerald-400">Calibration</li>

              <li className="hover:text-emerald-400">Explainability</li>

              <li className="hover:text-emerald-400">Digital Twin</li>

              <li className="hover:text-emerald-400">Executive Reports</li>

            </ul>

          </div>

          {/* AI Stack */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-white">

              AI Stack

            </h3>

            <div className="space-y-5">

              <Tech icon={<BrainCircuit />} text="Machine Learning" />

              <Tech icon={<ShieldCheck />} text="Calibration Engine" />

              <Tech icon={<Globe2 />} text="Digital Twin" />

              <Tech icon={<Cpu />} text="AI Decision System" />

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-white">

              Connect

            </h3>

            <div className="space-y-5">

              <Social icon= <ExternalLink /> text="GitHub Repository" />

              <Social icon=<ExternalLink /> text="LinkedIn" />

              <Social icon={<Mail />} text="Contact Team" />

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-12 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          <div>

            <p className="text-slate-400">

              © 2026 PRITHVEX AI • Powered by ENVIREX

            </p>

            <p className="mt-2 text-sm text-slate-500">

              Predict • Calibrate • Explain • Simulate

            </p>

          </div>

          <motion.a

            whileHover={{
              scale: 1.08,
            }}

            href="#"

            className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_25px_rgba(34,197,94,.3)]"

          >

            <ArrowUp className="text-emerald-400" />

          </motion.a>

        </div>

      </div>

    </footer>
  );
}

function Tech({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-slate-300">

      <div className="text-emerald-400">
        {icon}
      </div>

      <span>{text}</span>

    </div>
  );
}

function Social({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <button className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-slate-300 transition hover:border-emerald-500/40 hover:bg-emerald-500/10">

      <div className="text-emerald-400">
        {icon}
      </div>

      <span>{text}</span>

    </button>
  );
}