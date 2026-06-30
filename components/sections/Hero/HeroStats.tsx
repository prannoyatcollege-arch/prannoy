export default function HeroStats() {
  return (
    <div className="mt-14 grid grid-cols-3 gap-8">

      <div>
        <h2 className="text-5xl font-black text-emerald-400">
          148
        </h2>

        <p className="text-slate-400">
          Active Predictions
        </p>
      </div>

      <div>
        <h2 className="text-5xl font-black text-cyan-400">
          94%
        </h2>

        <p className="text-slate-400">
          AI Confidence
        </p>
      </div>

      <div>
        <h2 className="text-5xl font-black text-green-400">
          21
        </h2>

        <p className="text-slate-400">
          Countries
        </p>
      </div>

    </div>
  );
}