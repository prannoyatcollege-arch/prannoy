import { NextResponse } from "next/server";
import { fetchML } from "@/lib/mlClient";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await fetchML("/api/events");
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
}
