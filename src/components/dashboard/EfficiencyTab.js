import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function EfficiencyTab({ metrics }) {
  return (
    <div className="space-y-6 animate-slideUp">
      <div className="card">
        <div className="overline">Overall Efficiency Score</div>
        <div className="text-3xl font-mono font-bold text-white mt-2">{metrics.efficiency_score} / 100</div>
        <div className="text-sm text-ink-600 mt-1">Up 3.2 points since last month. Bottlenecks identified in logistics layer.</div>
      </div>
      <div className="card h-[340px]">
        <div className="overline">Efficiency trend</div>
        <div className="h-[260px] mt-4">
          <ResponsiveContainer>
            <LineChart data={metrics.monthly_series}>
              <CartesianGrid stroke="#27272A" vertical={false} />
              <XAxis dataKey="month" stroke="#71717A" tickLine={false} axisLine={false} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
              <YAxis stroke="#71717A" tickLine={false} axisLine={false} style={{ fontFamily: "JetBrains Mono", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#121214", border: "1px solid #27272A", borderRadius: 0 }} />
              <Legend wrapperStyle={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#A1A1AA" }} />
              <Line type="monotone" dataKey="efficiency" stroke="#CCFF00" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
