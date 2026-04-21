import { AlertTriangle, CheckCircle2 } from "lucide-react";

export const COLORS = ["#CCFF00", "#FF9900", "#66D9EF", "#A1A1AA", "#3F3F46"];

export function currencyK(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export const ALERTS = [
  { t: "Stockout risk", c: "SKU-22841 · Mumbai DC · Cover 3.2d", icon: AlertTriangle, level: "text-red-400" },
  { t: "OEE below target", c: "Plant B · Line 4 · 71% vs target 82%", icon: AlertTriangle, level: "text-amber-400" },
  { t: "Savings milestone", c: "Q4 target of $3.2M crossed", icon: CheckCircle2, level: "text-volt" },
  { t: "Quality SPC", c: "CPK restored to 1.42 on Line 2", icon: CheckCircle2, level: "text-volt" },
];

export const PROJECTS = [
  { name: "Altura · S&OP transformation", owner: "Anaya R.", status: "On track", pct: 72 },
  { name: "Northline · DMAIC wave 2", owner: "Rohan M.", status: "At risk", pct: 54 },
  { name: "Verdera · Scope 3 baseline", owner: "Priya V.", status: "On track", pct: 88 },
  { name: "Kairos · Network redesign", owner: "Daniel K.", status: "Kick-off", pct: 12 },
];
