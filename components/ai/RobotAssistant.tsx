"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, MessageCircle, Send, Bot, Loader2 } from "lucide-react";
import { useML } from "@/lib/MLContext";

interface Message {
  role: "user" | "agent";
  text: string;
  confidence?: number;
  grounded?: boolean;
}

const QUICK_QUESTIONS = [
  "What is the current ML forecast?",
  "What is the global risk level?",
  "What is the optimal order quantity?",
  "What are the top feature importances?",
  "How calibrated is the model?",
  "What should I do to reduce risk?",
];

export default function RobotAssistant() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"welcome" | "chat">("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [querying, setQuerying] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { kpi } = useML();

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (question?: string) => {
    const q = question ?? input.trim();
    if (!q || querying) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setQuerying(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: data.answer ?? "I encountered an error. Please ensure the ML backend is running.",
          confidence: data.confidence,
          grounded: data.grounded,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          text: "⚠️ Cannot reach the ML backend. Please start the Python server with `python -m uvicorn backend.main:app --reload`.",
          grounded: false,
        },
      ]);
    }
    setQuerying(false);
  };

  return (
    <>
      {/* FAB button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-[999] flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-[#07141f] shadow-[0_0_40px_rgba(34,197,94,.5)]"
      >
        <MessageCircle className="h-9 w-9 text-emerald-400" />
        {kpi && (
          <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-[1000]"
          >
            <motion.div
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 120 }}
              className="w-[820px] max-w-[95vw] rounded-3xl border border-emerald-500/20 bg-[#041312] shadow-[0_0_80px_rgba(34,197,94,.15)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse" />
                    <Bot className="h-12 w-12 text-emerald-400" />
                  </div>
                  <div>
                    <p className="tracking-[.3em] uppercase text-emerald-400 text-xs">PRITHVEX AI</p>
                    <h2 className="text-xl font-black text-white">AI Insights Agent</h2>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {kpi && (
                    <div className="text-right">
                      <p className="text-xs text-slate-400">ML Active</p>
                      <p className="text-sm font-bold text-emerald-400">
                        {kpi.confidence_pct}% confidence
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode(mode === "welcome" ? "chat" : "welcome")}
                      className="rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5"
                    >
                      {mode === "welcome" ? "Chat Mode" : "Welcome"}
                    </button>
                    <button onClick={() => setOpen(false)} className="rounded-xl border border-white/10 p-2 hover:bg-white/5">
                      <X className="text-white h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {mode === "welcome" ? (
                  <WelcomeView
                    kpi={kpi}
                    onClose={() => setOpen(false)}
                    onChat={() => setMode("chat")}
                    onQuestion={(q) => { setMode("chat"); sendMessage(q); }}
                  />
                ) : (
                  <ChatView
                    messages={messages}
                    input={input}
                    setInput={setInput}
                    querying={querying}
                    onSend={sendMessage}
                    bottomRef={bottomRef}
                    quickQuestions={QUICK_QUESTIONS}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WelcomeView({
  kpi,
  onClose,
  onChat,
  onQuestion,
}: {
  kpi: any;
  onClose: () => void;
  onChat: () => void;
  onQuestion: (q: string) => void;
}) {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-8">
      <div className="flex-shrink-0 flex justify-center lg:block">
        <motion.div animate={{ y: [0, -12, 0], rotate: [0, 2, 0, -2, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
          <Image
            src="/images/robot.png"
            alt="Robot"
            width={220}
            height={220}
            className="max-w-[220px] drop-shadow-[0_0_60px_rgba(34,197,94,.8)]"
            style={{ width: "100%", height: "auto" }}
          />
        </motion.div>
      </div>

      <div className="flex-1">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          className="text-4xl font-black text-white">
          Hello 👋
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-4 leading-7 text-slate-300">
          I am <span className="font-bold text-emerald-400">PRITHVEX AI</span>, your grounded supply-chain intelligence agent.
          All my answers are backed by live ML predictions — no hallucinations.
        </motion.p>

        {kpi && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label="ML Forecast" value={`$${kpi.base_forecast.toLocaleString()}`} color="emerald" />
            <Stat label="Risk Level" value={kpi.global_risk} color={kpi.global_risk === "HIGH" ? "red" : kpi.global_risk === "MEDIUM" ? "yellow" : "green"} />
            <Stat label="Confidence" value={`${kpi.confidence_pct}%`} color="cyan" />
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onChat}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-bold text-white hover:opacity-90 transition"
          >
            Ask AI Agent
          </button>
          <button
            onClick={() => { document.querySelector("#overview")?.scrollIntoView({ behavior: "smooth" }); onClose(); }}
            className="rounded-xl border border-white/20 px-6 py-3 text-white hover:bg-white/5 transition"
          >
            Explore Dashboard
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {QUICK_QUESTIONS.slice(0, 4).map((q, i) => (
            <button
              key={i}
              onClick={() => onQuestion(q)}
              className="text-left rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-white hover:bg-emerald-500/20 transition"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {(["Overview", "Forecast", "Calibration", "Explainability", "Digital Twin", "Knowledge Center"] as const).map((label) => (
            <NavButton
              key={label}
              text={label}
              href={`#${label.toLowerCase().replace(" ", "-")}`}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const QUICK_QUESTIONS = [
  "What is the current ML forecast?",
  "What is the global risk level?",
  "What is the optimal order quantity?",
  "What are the top feature importances?",
  "How calibrated is the model?",
  "What should I do to reduce risk?",
];

function ChatView({
  messages, input, setInput, querying, onSend, bottomRef, quickQuestions,
}: {
  messages: Message[];
  input: string;
  setInput: (v: string) => void;
  querying: boolean;
  onSend: (q?: string) => void;
  bottomRef: React.RefObject<HTMLDivElement>;
  quickQuestions: string[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Quick questions */}
      {messages.length === 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-3">Quick questions</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => onSend(q)}
                className="text-left rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-white hover:bg-emerald-500/20 transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="h-[320px] overflow-y-auto space-y-4 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "agent" && (
              <div className="mr-2 mt-1">
                <Bot className="h-6 w-6 text-emerald-400 flex-shrink-0" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl p-4 text-sm leading-6 ${
                m.role === "user"
                  ? "bg-emerald-500/20 text-white border border-emerald-500/20"
                  : "bg-[#07141f] text-slate-200 border border-white/10"
              }`}
            >
              <span dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, "<strong class='text-emerald-400'>$1</strong>") }} />
              {m.role === "agent" && m.grounded !== undefined && (
                <div className="mt-2 flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${m.grounded ? "bg-green-400" : "bg-yellow-400"}`} />
                  <span className="text-xs text-slate-400">
                    {m.grounded ? `ML-grounded${m.confidence ? ` · ${m.confidence}% confidence` : ""}` : "Backend offline"}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
        {querying && (
          <div className="flex justify-start">
            <div className="mr-2"><Bot className="h-6 w-6 text-emerald-400" /></div>
            <div className="rounded-2xl bg-[#07141f] border border-white/10 p-4">
              <Loader2 className="h-5 w-5 text-emerald-400 animate-spin" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="Ask about forecasts, risk, calibration, recommendations…"
          className="flex-1 rounded-2xl border border-white/10 bg-[#07141f] px-5 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-500/50"
        />
        <button
          onClick={() => onSend()}
          disabled={querying || !input.trim()}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 font-bold text-white disabled:opacity-50 transition hover:opacity-90"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      <p className="text-center text-xs text-slate-500">
        🤖 All answers grounded in live ML model predictions · No hallucinations
      </p>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: "text-emerald-400", red: "text-red-400", yellow: "text-yellow-400",
    green: "text-green-400", cyan: "text-cyan-400",
  };
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`mt-1 text-lg font-black ${colorMap[color] ?? "text-white"}`}>{value}</p>
    </div>
  );
}

function NavButton({ text, href, onClose }: { text: string; href: string; onClose: () => void }) {
  return (
    <button
      onClick={() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }}
      className="w-full rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-left text-sm font-semibold text-white hover:bg-emerald-500/20 transition"
    >
      {text}
    </button>
  );
}