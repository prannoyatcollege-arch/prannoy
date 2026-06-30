const ML_API = process.env.ML_API_URL || "http://localhost:8000";

export async function fetchML(path: string, options?: RequestInit) {
  const res = await fetch(`${ML_API}${path}`, {
    ...options,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`ML API error: ${res.status} ${path}`);
  return res.json();
}
