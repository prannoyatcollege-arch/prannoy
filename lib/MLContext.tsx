"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/* ── Types ─────────────────────────────────────────────────────────────────── */
export interface KPI {
  base_forecast: number;
  lower_95: number;
  upper_95: number;
  residual_std: number;
  optimal_order_qty: number;
  min_inventory_cost: number;
  global_risk: string;
  recommendation: string;
  confidence_pct: number;
}

interface MLContextValue {
  kpi: KPI | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/* ── Context ────────────────────────────────────────────────────────────────── */
const MLContext = createContext<MLContextValue>({
  kpi: null,
  loading: true,
  error: null,
  refresh: () => {},
});

export function MLProvider({ children }: { children: ReactNode }) {
  const [kpi, setKpi] = useState<KPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/kpi");
      if (!res.ok) throw new Error(`KPI fetch failed: ${res.status}`);
      const data: KPI = await res.json();
      setKpi(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <MLContext.Provider value={{ kpi, loading, error, refresh: load }}>
      {children}
    </MLContext.Provider>
  );
}

export const useML = () => useContext(MLContext);
