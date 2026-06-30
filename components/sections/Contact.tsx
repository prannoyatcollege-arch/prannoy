"use client";

import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const EMAIL = "prannoyatcollege@gmail.com";

const GITHUB = "https://github.com/PiyushRajan2007/ENVIREX-AI";

const LINKEDIN = "https://www.linkedin.com/feed/";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 px-8"
    >
      <div className="mx-auto max-w-7xl">

        <p className="uppercase tracking-[6px] text-cyan-300">
          CONTACT
        </p>

        <h2 className="mt-4 text-5xl font-black text-white">
  Connect with
  <span className="text-emerald-400"> PRITHVEX AI</span>
</h2>
        <div className="mt-20 grid gap-12 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-cyan-400/20 bg-[#07111f]/70 p-8 backdrop-blur-xl"
          >
            <p className="mb-8 font-mono text-cyan-300">
              &gt; INITIALIZING CONNECTION...
            </p>

            <div className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none transition focus:border-cyan-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none transition focus:border-cyan-400"
              />

              <textarea
                rows={6}
                placeholder="Your Message..."
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none transition focus:border-cyan-400"
              />

              <button
                className="flex items-center gap-3 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-8 py-4 transition hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(0,255,255,.35)]"
              >
                <Send size={18} />
                SEND MESSAGE
              </button>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-pink-400/20 bg-white/5 p-8 backdrop-blur-xl"
          >

            <h3 className="text-3xl font-bold">
              Connect With Me
            </h3>

            <p className="mt-6 leading-8 text-gray-300">
Explore the PRITHVEX AI platform, access our source code,
connect with the team, or reach out for collaboration,
research discussions, and supply-chain AI innovations.
</p>

            <div className="mt-12 space-y-6">
<a
  href={`mailto:${EMAIL}`}
  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400"
>

  <Mail className="text-emerald-300" />

  <div>

    <p className="font-semibold text-white">
      Contact Team
    </p>

    <p className="text-sm text-gray-400">
      {EMAIL}
    </p>

  </div>

</a>

             <a
  href={GITHUB}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-emerald-400"
>

  <FaGithub className="text-2xl text-emerald-300" />

  <div>

    <p className="font-semibold text-white">
      GitHub Repository
    </p>

    <p className="text-sm text-gray-400">
      ENVIREX-AI Source Code
    </p>

  </div>

</a>

             <a
  href={LINKEDIN}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400"
>

  <FaLinkedin className="text-2xl text-cyan-300" />

  <div>

    <p className="font-semibold text-white">
      LinkedIn
    </p>

    <p className="text-sm text-gray-400">
      Connect with the Team
    </p>

  </div>

</a>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}