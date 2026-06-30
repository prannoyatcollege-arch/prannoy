"use client";

import {
  FileText,
  Download,
  Presentation,
  FileSpreadsheet,
} from "lucide-react";

type CardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  button: string;
};

function ReportCard({
  icon,
  title,
  description,
  button,
}: CardProps) {
  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-[#07141f]/70 p-8 backdrop-blur-xl transition duration-300 hover:scale-105 hover:border-emerald-400">

      <div className="mb-6 text-emerald-400">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-4 text-slate-400">
        {description}
      </p>

      <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 font-semibold text-white transition hover:shadow-[0_0_25px_rgba(34,197,94,.5)]">
        {button}
      </button>

    </div>
  );
}

export default function Reports() {
  return (
    <section
      id="reports"
      className="bg-[#02110f] px-8 py-24"
    >

      <div className="mx-auto max-w-7xl">

        <h2 className="text-center text-6xl font-black text-white">
          Reports & Downloads
        </h2>

        <p className="mt-4 text-center text-slate-400">
          Export AI reports and download project resources.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          <ReportCard
            icon={<Download size={40} />}
            title="Calibration Report"
            description="Reliability diagrams, ECE, confidence intervals."
            button="Download PDF"
          />

          <ReportCard
            icon={<FileSpreadsheet size={40} />}
            title="Forecast Report"
            description="Demand forecasting and prediction intervals."
            button="Download PDF"
          />

          <ReportCard
            icon={<Presentation size={40} />}
            title="Architecture"
            description="Understand how PRITHVEX AI works."
            button="View Solution"
          />

          <ReportCard
            icon={<FileText size={40} />}
            title="Executive Report"
            description="Generate a complete management report."
            button="Generate Report"
          />

        </div>

      </div>

    </section>
  );
}